import type { ReactNode } from "react";

/**
 * The one shared container: navbar, hero, sections, and footer all
 * align to these exact edges. max-width 1120px, 24px side padding.
 */
export default function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1120px] px-6 ${className}`}>
      {children}
    </div>
  );
}
