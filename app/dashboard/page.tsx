"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import AddBar from "@/components/AddBar";
import TaskCard from "@/components/TaskCard";
import CountUp from "@/components/CountUp";
import TaskDialog, { type EditValues } from "@/components/TaskDialog";
import Skeleton from "@/components/Skeleton";
import Container from "@/components/Container";
import { useToast } from "@/components/Toast";
import { isDueToday } from "@/components/task-ui";
import type { MeUser, Task } from "@/lib/types";

type StatusFilter = "all" | "active" | "done";
type SortKey = "created" | "dueDate" | "priority";

type Dialog =
  | { mode: "edit"; task: Task }
  | { mode: "delete"; task: Task };

export default function DashboardPage() {
  const [user, setUser] = useState<MeUser | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("created");
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const { toast } = useToast();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [meRes, taskRes] = await Promise.all([
        fetch("/api/auth/me"),
        fetch(
          `/api/tasks?search=${encodeURIComponent(search)}&status=${status}&sort=${sort}`
        ),
      ]);
      if (meRes.ok) {
        const d = await meRes.json();
        setUser(d.user);
      }
      if (taskRes.ok) {
        const d = await taskRes.json();
        setTasks(d.tasks ?? []);
      } else if (taskRes.status === 401) {
        window.location.href = "/login";
      } else {
        toast("Could not load tasks.", "error");
      }
    } catch {
      toast("Network error loading tasks.", "error");
    } finally {
      setLoading(false);
    }
  }, [search, status, sort, toast]);

  useEffect(() => {
    const t = setTimeout(load, search ? 250 : 0);
    return () => clearTimeout(t);
  }, [load, search]);

  async function create(title: string) {
    setSaving(true);
    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error ?? "Could not add task.", "error");
        return;
      }
      toast("Task added.");
      load();
    } catch {
      toast("Network error.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function saveEdit(task: Task, values: EditValues) {
    setSaving(true);
    try {
      const res = await fetch(`/api/tasks/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        toast(data.error ?? "Could not save.", "error");
        return;
      }
      setDialog(null);
      toast("Task updated.");
      load();
    } catch {
      toast("Network error.", "error");
    } finally {
      setSaving(false);
    }
  }

  async function toggle(t: Task) {
    try {
      const res = await fetch(`/api/tasks/${t._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !t.completed }),
      });
      if (!res.ok) {
        toast("Could not update task.", "error");
        return;
      }
      setTasks((prev) =>
        prev.map((x) => (x._id === t._id ? { ...x, completed: !x.completed } : x))
      );
      toast(t.completed ? "Marked as active." : "Marked as done.");
    } catch {
      toast("Network error.", "error");
    }
  }

  async function confirmDelete(t: Task) {
    try {
      const res = await fetch(`/api/tasks/${t._id}`, { method: "DELETE" });
      if (!res.ok) {
        toast("Could not delete task.", "error");
        return;
      }
      setDialog(null);
      setTasks((prev) => prev.filter((x) => x._id !== t._id));
      toast("Task deleted.");
    } catch {
      toast("Network error.", "error");
    }
  }

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.completed).length;
    const dueToday = tasks.filter((t) => isDueToday(t)).length;
    return { total, done, dueToday };
  }, [tasks]);

  const tabs: { key: StatusFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "done", label: "Done" },
  ];

  function focusAdd() {
    document.getElementById("add-task-input")?.focus();
  }

  return (
    <Container className="max-w-[800px] pb-20 pt-10">
      {/* header: serif greeting, one stats line */}
      <div className="animate-rise">
        <h1 className="font-display text-balance text-[32px] text-ink">
          {user ? `Good morning, ${user.name}` : "Your tasks"}
        </h1>
        <p className="tabular mt-1 text-[15px] text-muted">
          <CountUp value={stats.total} /> {stats.total === 1 ? "task" : "tasks"} ·{" "}
          <CountUp value={stats.done} /> done · <CountUp value={stats.dueToday} /> due today
        </p>
      </div>

      {/* add bar, always visible */}
      <div style={{ animationDelay: "0.06s" }} className="animate-rise mt-6">
        <AddBar onAdd={create} saving={saving} />
      </div>

      {/* filters: quiet text tabs */}
      <div
        style={{ animationDelay: "0.12s" }}
        className="animate-rise mt-6 flex flex-col gap-4"
      >
        <div role="tablist" aria-label="Status filter" className="flex gap-6">
          {tabs.map((t) => {
            const active = status === t.key;
            return (
              <button
                key={t.key}
                role="tab"
                aria-selected={active}
                onClick={() => setStatus(t.key)}
                className={`min-h-[44px] text-[15px] transition-subtle ${
                  active
                    ? "font-medium text-ink underline underline-offset-8"
                    : "text-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex-1">
            <label htmlFor="dash-search" className="sr-only">
              Search tasks
            </label>
            <input
              id="dash-search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks…"
              autoComplete="off"
              className="field"
            />
          </div>
          <div>
            <label htmlFor="dash-sort" className="sr-only">
              Sort tasks
            </label>
            <select
              id="dash-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="min-h-[44px] bg-transparent text-[15px] text-muted transition-subtle hover:text-ink"
            >
              <option value="created">Newest first</option>
              <option value="dueDate">By due date</option>
              <option value="priority">By priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* task list */}
      <section aria-label="Tasks" className="mt-4">
        {loading ? (
          <Skeleton count={3} />
        ) : tasks.length === 0 ? (
          <div className="animate-rise py-16 text-center">
            <p className="font-display text-[24px] text-ink">Nothing here yet.</p>
            <button onClick={focusAdd} className="btn btn-primary mt-6 px-6">
              Add your first task
            </button>
          </div>
        ) : (
          <motion.ul layout className="grid divide-y divide-border">
            <AnimatePresence initial={false}>
              {tasks.map((t) => (
                <TaskCard
                  key={t._id}
                  task={t}
                  onToggle={toggle}
                  onEdit={(task) => setDialog({ mode: "edit", task })}
                  onDelete={(task) => setDialog({ mode: "delete", task })}
                />
              ))}
            </AnimatePresence>
          </motion.ul>
        )}
      </section>

      {/* edit + delete modal */}
      <AnimatePresence>
        {dialog && (
          <TaskDialog
            dialog={dialog}
            saving={saving}
            onClose={() => setDialog(null)}
            onSave={saveEdit}
            onConfirmDelete={confirmDelete}
          />
        )}
      </AnimatePresence>
    </Container>
  );
}
