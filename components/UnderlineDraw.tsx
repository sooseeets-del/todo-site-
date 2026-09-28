"use client";

import { motion } from "framer-motion";

/**
 * Soft underline that draws itself (width 0 → 100%). Pure decoration:
 * if animation never runs, the headline text is unaffected.
 */
export default function UnderlineDraw({ delay = 0.9 }: { delay?: number }) {
  return (
    <motion.span
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="absolute -bottom-1 left-0 h-[3px] w-full origin-left rounded-full bg-accent"
    />
  );
}
