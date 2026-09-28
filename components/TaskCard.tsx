"use client";

import { motion } from "framer-motion";
import { Check, Pencil, Trash2 } from "lucide-react";
import type { Task } from "@/lib/types";
import { formatDue, isDueToday, isOverdue } from "./task-ui";

type Props = {
  task: Task;
  onToggle: (t: Task) => void;
  onEdit: (t: Task) => void;
  onDelete: (t: Task) => void;
};

/** Quiet row: circle checkbox, title, muted due text, 6px status dot. */
export default function TaskCard({ task, onToggle, onEdit, onDelete }: Props) {
  const overdue = isOverdue(task);
  const dueToday = isDueToday(task);
  const done = task.completed;

  return (
    <motion.li
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, layout: { type: "spring", stiffness: 300, damping: 30 } }}
      className={`group flex items-center gap-1 rounded-input transition-subtle hover:bg-rowhover ${
        done ? "opacity-50" : ""
      }`}
    >
      {/* circle checkbox, 44px touch target */}
      <button
        type="button"
        role="checkbox"
        aria-checked={done}
        aria-label={done ? `Mark ${task.title} incomplete` : `Mark ${task.title} complete`}
        onClick={() => onToggle(task)}
        className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center"
      >
        <span
          aria-hidden="true"
          className={`flex h-5 w-5 items-center justify-center rounded-full border transition-subtle ${
            done ? "border-accent bg-accent" : "border-muted"
          }`}
        >
          {done && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <Check size={12} strokeWidth={3} className="text-bg" />
            </motion.span>
          )}
        </span>
      </button>

      {/* title + due */}
      <span className="min-w-0 flex-1 py-2">
        <span
          className={`block truncate text-[15px] ${
            done ? "text-muted line-through decoration-1" : "text-ink"
          }`}
        >
          {task.title}
        </span>
        <span className="mt-0.5 block text-[13px]">
          {overdue ? (
            <>
              <span className="font-medium text-danger">Overdue</span>
              <span className="text-muted"> · {formatDue(task.dueDate)}</span>
            </>
          ) : (
            <span className="text-muted">
              {task.dueDate ? formatDue(task.dueDate) : "No due date"}
              {dueToday && !done ? " · Due today" : ""}
            </span>
          )}
        </span>
      </span>

      {/* status dot: 6px, color never carries meaning alone */}
      {!done && (
        <span
          aria-hidden="true"
          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
            overdue ? "bg-danger" : dueToday ? "bg-warning" : "bg-border"
          }`}
        />
      )}

      {/* actions: hover-only on desktop, always visible on touch */}
      <span className="flex shrink-0 items-center transition-subtle focus-within:opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
        <button
          type="button"
          onClick={() => onEdit(task)}
          aria-label={`Edit ${task.title}`}
          title="Edit"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-input text-muted transition-subtle hover:text-ink"
        >
          <Pencil size={17} strokeWidth={1.5} aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(task)}
          aria-label={`Delete ${task.title}`}
          title="Delete"
          className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-input text-muted transition-subtle hover:text-danger"
        >
          <Trash2 size={17} strokeWidth={1.5} aria-hidden="true" />
        </button>
      </span>
    </motion.li>
  );
}
