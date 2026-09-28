import { NextResponse } from "next/server";
import { supabaseAdmin, toTask } from "@/lib/supabase";
import { getSessionUser } from "@/lib/auth";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const user = getSessionUser();
  if (!user) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  try {
    const body = await req.json();
    const update: Record<string, unknown> = { updated_at: new Date().toISOString() };

    if (body.title !== undefined) {
      if (!String(body.title).trim())
        return NextResponse.json(
          { error: "Title is required." },
          { status: 400 }
        );
      update.title = String(body.title).trim();
    }
    if (body.description !== undefined)
      update.description = String(body.description).trim();
    if (body.priority !== undefined) {
      if (!["low", "medium", "high"].includes(body.priority))
        return NextResponse.json({ error: "Invalid priority." }, { status: 400 });
      update.priority = body.priority;
    }
    if (body.dueDate !== undefined) update.due_date = body.dueDate || null;
    if (body.category !== undefined)
      update.category = String(body.category).trim();
    if (body.completed !== undefined) update.completed = Boolean(body.completed);

    const db = supabaseAdmin();
    // Always filter by owner: users can only modify their own tasks.
    const { data: row, error } = await db
      .from("taskflow_tasks")
      .update(update)
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select("*")
      .maybeSingle();
    if (error) throw error;
    if (!row) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    return NextResponse.json({ task: toTask(row) });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not update task." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const user = getSessionUser();
  if (!user) return NextResponse.json({ error: "Not logged in." }, { status: 401 });

  try {
    const db = supabaseAdmin();
    const { data: row, error } = await db
      .from("taskflow_tasks")
      .delete()
      .eq("id", params.id)
      .eq("user_id", user.id)
      .select("id")
      .maybeSingle();
    if (error) throw error;
    if (!row) return NextResponse.json({ error: "Task not found." }, { status: 404 });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Could not delete task." },
      { status: 500 }
    );
  }
}
