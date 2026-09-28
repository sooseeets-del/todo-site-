export type Priority = "low" | "medium" | "high";

export type Task = {
  _id: string;
  title: string;
  description?: string;
  priority: Priority;
  dueDate?: string | null;
  category?: string;
  completed: boolean;
  createdAt: string;
};

export type MeUser = { id: string; name: string; email: string };
