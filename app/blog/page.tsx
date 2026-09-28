import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { posts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — TaskFlow",
  description:
    "Practical guides to daily planning, priorities, and never missing a deadline.",
};

export default function BlogPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink">
        Blog
      </p>
      <h1 className="font-display mt-2 text-balance text-3xl tracking-tight text-ink sm:text-5xl">
        Plan better, <span className="text-accent">stress less</span>.
      </h1>
      <p className="mt-4 text-muted">
        Short, practical guides to getting things done with TaskFlow.
      </p>

      <div className="mt-10 grid gap-4">
        {posts.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i, 3) * 0.06}>
            <Link
              href={`/blog/${p.slug}`}
              className="card group block p-6"
            >
              <span className="flex items-center justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-ink">
                  {p.title}
                </h2>
                <ArrowRight
                  size={18}
                  strokeWidth={1.8}
                  aria-hidden="true"
                  className="shrink-0 text-muted transition-subtle group-hover:translate-x-1 group-hover:text-ink"
                />
              </span>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {p.excerpt}
              </p>
              <p className="mt-3 text-xs text-muted">
                {p.date} · {p.readTime}
              </p>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
