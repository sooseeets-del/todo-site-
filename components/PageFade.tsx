"use client";

import { useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

let hasNavigated = false;

/**
 * Quick 200ms fade between routes, no slide. The very first render is
 * never hidden (visible without JS); only client-side navigations fade.
 */
export default function PageFade({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduce = useReducedMotion();

  useEffect(() => {
    hasNavigated = true;
  }, [pathname]);

  return (
    <motion.div
      key={pathname}
      initial={hasNavigated ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
