"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { springSoft } from "@/lib/motion";

type ToastItem = { id: number; message: string; kind: "success" | "error" };

const TOAST_MS = 3200;

const ToastContext = createContext<{ toast: (m: string, k?: ToastItem["kind"]) => void }>({
  toast: () => {},
});

export const useToast = () => useContext(ToastContext);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<ToastItem[]>([]);

  const toast = useCallback((message: string, kind: ToastItem["kind"] = "success") => {
    const id = nextId++;
    setItems((prev) => [...prev.slice(-2), { id, message, kind }]);
    setTimeout(() => setItems((prev) => prev.filter((t) => t.id !== id)), TOAST_MS);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-4 left-4 right-4 z-50 flex flex-col gap-2 sm:left-auto sm:w-full sm:max-w-sm sm:px-0"
      >
        <AnimatePresence>
          {items.map((t) => {
            const ok = t.kind === "success";
            return (
              <motion.div
                key={t.id}
                role="status"
                layout
                initial={{ opacity: 0, x: 64 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={springSoft}
                className={`relative overflow-hidden rounded-card border bg-surface px-4 py-3 text-sm text-ink shadow-soft ${
                  ok ? "border-accent" : "border-danger"
                }`}
              >
                <span className="flex items-center gap-2">
                  {ok ? (
                    <CheckCircle2 size={18} strokeWidth={1.8} className="shrink-0 text-accent" aria-hidden="true" />
                  ) : (
                    <AlertCircle size={18} strokeWidth={1.8} className="shrink-0 text-danger" aria-hidden="true" />
                  )}
                  {t.message}
                </span>
                {/* progress bar */}
                <motion.span
                  aria-hidden="true"
                  className={`absolute bottom-0 left-0 h-0.5 w-full origin-left ${
                    ok ? "bg-accent" : "bg-danger"
                  }`}
                  initial={{ scaleX: 1 }}
                  animate={{ scaleX: 0 }}
                  transition={{ duration: TOAST_MS / 1000, ease: "linear" }}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

