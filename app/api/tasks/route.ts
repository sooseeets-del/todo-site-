import { NextResponse } from "next/server";
import { supabaseAdmin, toTask } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 } as const;

export async function GET(req: Request) {
  const user = getSessionUser();
  if (!user) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search")?.trim() ?? "";
    const status = searchParams.get("status") ?? "all"; // all | active | done
    const sort = searchParams.get("sort") ?? "created"; // created | dueDate | priority

    // Always filter by owner: users can only read their own tasks.
    const db = supabaseAdmin();
    let q = db.from("taskflow_tasks").select("*").eq("user_id", user.id);
    if (status === "active") q = q.eq("completed", false);
    if (status === "done") q = q.eq("completed", true);
    if (search) q = q.ilike("title", `%${search}%`);

    const { data, error } = await q;
    if (error) throw error;

    let rows = data ?? [];
    if (sort === "dueDate") {
      rows = [...rows].sort((a, b) => {
        const da = a.due_date ? new Date(a.due_date).getTime() : Infinity;
        const dbv = b.due_date ? new Date(b.due_date).getTime() : Infinity;
        return da - dbv;
      });
    } else if (sort === "priority") {
      rows = [...rows].sort(
        (a, b) =>
          (PRIORITY_ORDER[a.priority as keyof typeof PRIORITY_ORDER] ?? 1) -
          (PRIORITY_ORDER[b.priority as keyof typeof PRIORITY_ORDER] ?? 1)
      );
    } else {
      rows = [...rows].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    }

    return NextResponse.json({ tasks: rows.map(toTask) });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not load tasks." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  const user = getSessionUser();
  if (!user) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  try {
    const { title, description, priority, dueDate, category } =
      await req.json();

    if (!title?.trim())
      return NextResponse.json(
        { error: "Title is required." },
        { status: 400 }
      );
    if (priority && !["low", "medium", "high"].includes(priority))
      return NextResponse.json({ error: "Invalid priority." }, { status: 400 });

    const db = supabaseAdmin();
    const { data: row, error } = await db
      .from("taskflow_tasks")
      .insert({
        user_id: user.id,
        title: title.trim(),
        description: description?.trim() ?? "",
        priority: priority ?? "medium",
        due_date: dueDate || null,
        category: category?.trim() ?? "",
        completed: false,
      })
      .select("*")
      .single();
    if (error || !row) throw error;

    return NextResponse.json({ task: toTask(row) }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not create task." },
      { status: 500 }
    );
  }
}
