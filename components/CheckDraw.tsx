"use client";

import { motion } from "framer-motion";

/**
 * Checkmark that draws itself via stroke offset. The surrounding checkbox
 * box always renders; only the stroke is animated.
 */
export default function CheckDraw({
  delay = 0.7,
  className = "h-3 w-3",
}: {
  delay?: number;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true" className={className}>
      <motion.path
        d="M2.5 6.2 5 8.5 9.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay, duration: 0.35, ease: "easeOut" }}
      />
    </svg>
  );
}
