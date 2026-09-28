"use client";

import { useEffect, useRef } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

/**
 * Number that counts up once. The final value is painted first, so the
 * stat is correct even if animation never runs; the effect rewinds to 0
 * and counts up a single time (600ms).
 */
export default function CountUp({ value }: { value: number }) {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const rounded = useTransform(mv, (v) => Math.round(v).toString());
  const played = useRef(false);

  useEffect(() => {
    if (reduce || played.current) {
      mv.set(value);
      return;
    }
    played.current = true;
    mv.set(0);
    const controls = animate(mv, value, { duration: 0.6, ease: "easeOut" });
    return () => controls.stop();
  }, [value, mv, reduce]);

  return <motion.span className="tabular">{rounded}</motion.span>;
}
