import { createClient } from "@supabase/supabase-js";

// Server-side Supabase client for API routes.
// Per-user isolation is enforced in each route via the JWT cookie -> user_id filter.
function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set. Add it to .env.local.`);
  return v;
}

export function supabaseAdmin() {
  return createClient(required("SUPABASE_URL"), required("SUPABASE_ANON_KEY"), {
    auth: { persistSession: false },
  });
}

// Row -> frontend shape (keeps the UI untouched).
export function toTask(row: {
  id: string;
  title: string;
  description: string;
  priority: string;
  due_date: string | null;
  category: string;
  completed: boolean;
  created_at: string;
}) {
  return {
    _id: row.id,
    title: row.title,
    description: row.description,
    priority: row.priority,
    dueDate: row.due_date,
    category: row.category,
    completed: row.completed,
    createdAt: row.created_at,
  };
}
