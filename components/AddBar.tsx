"use client";

import { useState } from "react";

type Props = {
  onAdd: (title: string) => void;
  saving: boolean;
};

/** One wide field with an inline Add button. Always visible. */
export default function AddBar({ onAdd, saving }: Props) {
  const [title, setTitle] = useState("");
  const [shakeKey, setShakeKey] = useState(0);

  function submit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!title.trim()) {
      setShakeKey((k) => k + 1);
      return;
    }
    onAdd(title.trim());
    setTitle("");
  }

  return (
    <form onSubmit={submit} noValidate aria-label="Add a task">
      <label htmlFor="add-task-input" className="sr-only">
        Task title
      </label>
      <div
        key={shakeKey}
        className={`flex gap-2 ${shakeKey > 0 ? "animate-shake" : ""}`}
      >
        <input
          id="add-task-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a task…"
          maxLength={120}
          autoComplete="off"
          className="field flex-1"
        />
        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary shrink-0 px-6 disabled:opacity-60"
        >
          {saving ? "Adding…" : "Add"}
        </button>
      </div>
    </form>
  );
}
