"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  className?: string;
};

/**
 * Scroll reveal that is visible by default. JavaScript only ever ADDS the
 * entrance animation: server HTML and no-JS renders show content as-is.
 * Once within 100px of the viewport, it fades up a single time.
 */
export default function Reveal({ children, delay = 0, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "hidden" | "shown">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("shown");
          io.disconnect();
        } else {
          setState((s) => (s === "idle" ? "hidden" : s));
        }
      },
      { rootMargin: "-100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={state === "shown" ? { animationDelay: `${delay}s` } : undefined}
      className={`${className} ${
        state === "shown" ? "animate-rise" : state === "hidden" ? "opacity-0" : ""
      }`}
    >
      {children}
    </div>
  );
}
