"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Priority, Task } from "@/lib/types";

export type EditValues = {
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  category: string;
};

type Dialog =
  | { mode: "edit"; task: Task }
  | { mode: "delete"; task: Task };

type Props = {
  dialog: Dialog | null;
  saving: boolean;
  onClose: () => void;
  onSave: (task: Task, values: EditValues) => void;
  onConfirmDelete: (task: Task) => void;
};

function toDateInput(v?: string | null): string {
  if (!v) return "";
  const d = new Date(v);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

/** Small modal for editing a task or confirming deletion. */
export default function TaskDialog({ dialog, saving, onClose, onSave, onConfirmDelete }: Props) {
  const [values, setValues] = useState<EditValues>({
    title: "",
    description: "",
    priority: "medium",
    dueDate: "",
    category: "",
  });
  const [error, setError] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    if (dialog?.mode === "edit") {
      const t = dialog.task;
      setValues({
        title: t.title ?? "",
        description: t.description ?? "",
        priority: t.priority ?? "medium",
        dueDate: toDateInput(t.dueDate),
        category: t.category ?? "",
      });
      setError("");
    }
  }, [dialog]);

  useEffect(() => {
    if (!dialog) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [dialog, onClose]);

  if (!dialog) return null;
  const { task } = dialog;

  function set<K extends keyof EditValues>(key: K, v: EditValues[K]) {
    setValues((prev) => ({ ...prev, [key]: v }));
  }

  function submitEdit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!values.title.trim()) {
      setError("Title is required.");
      setShakeKey((k) => k + 1);
      return;
    }
    onSave(task, { ...values, title: values.title.trim() });
  }

  const label = "mb-1 block text-[15px] font-medium text-ink";

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={dialog.mode === "edit" ? `Edit ${task.title}` : `Delete ${task.title}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-overlay"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="card relative w-full max-w-[440px] p-6 sm:p-8"
      >
        {dialog.mode === "delete" ? (
          <div>
            <h2 className="font-display text-[24px] text-ink">Delete this task?</h2>
            <p className="mt-2 text-[15px] text-muted">
              &ldquo;{task.title}&rdquo; will be removed permanently.
            </p>
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="btn btn-outline px-5 text-[15px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => onConfirmDelete(task)}
                className="btn border border-danger px-5 text-[15px] text-danger transition-subtle hover:bg-danger hover:text-bg"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={submitEdit} noValidate>
            <h2 className="font-display text-[24px] text-ink">Edit task</h2>
            <div
              key={shakeKey}
              className={`mt-5 grid gap-4 ${shakeKey > 0 ? "animate-shake" : ""}`}
            >
              <div>
                <label htmlFor="dlg-title" className={label}>
                  Title
                </label>
                <input
                  id="dlg-title"
                  value={values.title}
                  onChange={(e) => set("title", e.target.value)}
                  maxLength={120}
                  autoFocus
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="dlg-desc" className={label}>
                  Description <span className="font-normal text-muted">(optional)</span>
                </label>
                <textarea
                  id="dlg-desc"
                  value={values.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={2}
                  maxLength={1000}
                  className="field py-2"
                />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="dlg-priority" className={label}>
                    Priority
                  </label>
                  <select
                    id="dlg-priority"
                    value={values.priority}
                    onChange={(e) => set("priority", e.target.value as Priority)}
                    className="field"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="dlg-due" className={label}>
                    Due date
                  </label>
                  <input
                    id="dlg-due"
                    type="date"
                    value={values.dueDate}
                    onChange={(e) => set("dueDate", e.target.value)}
                    className="field"
                  />
                </div>
                <div>
                  <label htmlFor="dlg-cat" className={label}>
                    Category
                  </label>
                  <input
                    id="dlg-cat"
                    value={values.category}
                    onChange={(e) => set("category", e.target.value)}
                    maxLength={40}
                    className="field"
                  />
                </div>
              </div>
              {error && (
                <p role="alert" className="text-[15px] text-danger">
                  {error}
                </p>
              )}
              <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="btn btn-outline px-5 text-[15px]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn-primary px-5 text-[15px] disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
