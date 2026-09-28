import type { Transition, Variants } from "framer-motion";

/** Shared ease for entrances: quick, gentle, never bouncy. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Micro-interactions (buttons, toggles, hovers): 150–250ms. */
export const micro: Transition = { duration: 0.2, ease: EASE_OUT };

/** Entrances (sections, cards, pages): 400–700ms. */
export const entrance: Transition = { duration: 0.55, ease: EASE_OUT };

/** Gentle spring for checkboxes, pills, toasts. */
export const springSoft: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 28,
};

/** Container that staggers children by 60–100ms. */
export const staggerParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Child of a stagger container: fade-up entrance. */
export const fadeUpChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: entrance },
};

/** Standalone fade-up (for elements outside a stagger container). */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: entrance },
};

/** Scroll-reveal viewport config: animate once on entry. */
export const viewportOnce = { once: true, margin: "-64px" } as const;

/** List item enter/exit for AnimatePresence task lists. */
export const listItem = {
  initial: { opacity: 0, y: 14, scale: 0.99 },
  animate: { opacity: 1, y: 0, scale: 1, transition: entrance },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.22, ease: EASE_OUT } },
} as const;

/** Card hover lift: 4px + stronger glow (transform/opacity only). */
export const cardHover = {
  y: -4,
  transition: micro,
};
