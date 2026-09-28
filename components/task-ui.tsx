import type { Task } from "@/lib/types";

export function isOverdue(t: Task): boolean {
  if (t.completed || !t.dueDate) return false;
  const d = new Date(t.dueDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  d.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

export function isDueToday(t: Task): boolean {
  if (t.completed || !t.dueDate) return false;
  const d = new Date(t.dueDate);
  const today = new Date();
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

export function formatDue(due?: string | null): string {
  if (!due) return "No due date";
  return new Date(due).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
