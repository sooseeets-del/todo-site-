import type { Metadata } from "next";
import Link from "next/link";
import { MotionConfig } from "framer-motion";
import { Cloud, Flag, Lock } from "lucide-react";
import Container from "@/components/Container";
import Reveal from "@/components/Reveal";
import UnderlineDraw from "@/components/UnderlineDraw";
import CheckDraw from "@/components/CheckDraw";

// Server Component: static landing page, SEO-friendly, fast first load.
export const metadata: Metadata = {
  title: "TaskFlow — Never miss a deadline",
  description:
    "A simple daily planner. Sign up, add tasks with priority and due date, and see what is urgent at a glance.",
};

const previewRows = [
  { title: "Design review", due: "Overdue · was due yesterday", dot: "bg-danger", dueClass: "text-danger", done: false },
  { title: "Ship v1.0", due: "Due today", dot: "bg-warning", dueClass: "text-muted", done: false },
  { title: "Read chapter 4", due: "Due Friday", dot: "bg-border", dueClass: "text-muted", done: false },
  { title: "Prepare invoices", due: "Done", dot: "bg-accent", dueClass: "text-muted", done: true },
];

const features = [
  {
    icon: Lock,
    title: "Private by default",
    text: "Your tasks are yours alone, with strict per-user separation.",
  },
  {
    icon: Flag,
    title: "Urgency at a glance",
    text: "Overdue and due-today tasks surface themselves quietly.",
  },
  {
    icon: Cloud,
    title: "Saved everywhere",
    text: "Your plan survives refreshes, logouts, and new devices.",
  },
];

export default function LandingPage() {
  return (
    <MotionConfig reducedMotion="user">
    <Container className="pb-24">
      {/* 1 — Hero, centered */}
      <section aria-labelledby="hero-heading" className="mx-auto max-w-[720px] pt-20 text-center lg:pt-28">
        <p className="animate-rise text-[13px] font-medium tracking-wide text-muted">
          Simple daily planning
        </p>
        <h1
          id="hero-heading"
          style={{ animationDelay: "0.07s" }}
          className="animate-rise font-display mt-5 text-balance text-[40px] sm:text-[64px] lg:text-[72px]"
        >
          Never miss a{" "}
          <em className="relative text-accent">
            deadline
            <UnderlineDraw delay={0.9} />
          </em>{" "}
          again.
        </h1>
        <p
          style={{ animationDelay: "0.14s" }}
          className="animate-rise mx-auto mt-5 max-w-md text-pretty text-[18px] leading-relaxed text-muted"
        >
          TaskFlow is the calm planner that surfaces what&apos;s urgent.
        </p>
        <div
          style={{ animationDelay: "0.21s" }}
          className="animate-rise mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Link href="/signup" className="btn btn-primary px-7">
            Start planning free
          </Link>
          <Link
            href="#features"
            className="link-slide min-h-[44px] content-center text-[15px] text-muted transition-subtle hover:text-ink"
          >
            See what&apos;s included
          </Link>
        </div>
      </section>

      {/* 2 — Product preview: a clean card, nothing floats */}
      <section aria-label="Product preview" className="mx-auto mt-16 max-w-[640px] lg:mt-20">
        <div
          style={{ animationDelay: "0.15s" }}
          className="animate-rise card p-6 sm:p-8"
        >
          <p className="font-display text-[24px] text-ink">Good morning, Alex</p>
          <p className="mt-1 text-[13px] text-muted">Here is what needs attention.</p>
          <ul className="mt-5 grid gap-1">
            {previewRows.map((row, i) => (
                <li
                  key={row.title}
                  style={{ animationDelay: `${0.2 + i * 0.05}s` }}
                  className={`animate-rise flex items-center gap-3 rounded-input px-2 py-2.5 ${
                    row.done ? "opacity-50" : ""
                  }`}
                >
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    row.done ? "border-accent bg-accent" : "border-muted"
                  }`}
                >
                  {row.done && <CheckDraw delay={0.75} className="h-3 w-3 text-bg" />}
                </span>
                <span className="min-w-0 flex-1">
                  <span
                    className={`block truncate text-[15px] ${
                      row.done ? "text-muted line-through decoration-1" : "text-ink"
                    }`}
                  >
                    {row.title}
                  </span>
                </span>
                <span className={`shrink-0 text-[13px] ${row.dueClass}`}>{row.due}</span>
                <span aria-hidden="true" className={`h-1.5 w-1.5 shrink-0 rounded-full ${row.dot}`} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 3 — Three features, no boxes */}
      <section id="features" aria-labelledby="features-heading" className="mt-20 scroll-mt-24 lg:mt-32">
        <h2 id="features-heading" className="sr-only">
          Why TaskFlow
        </h2>
        <div className="grid gap-10 sm:grid-cols-3 sm:gap-8">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.06}>
              <f.icon size={20} strokeWidth={1.5} aria-hidden="true" className="text-ink" />
              <h3 className="mt-3 text-[17px] font-semibold text-ink">{f.title}</h3>
              <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{f.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 4 — Closing CTA */}
      <section aria-labelledby="cta-heading" className="mx-auto mt-20 max-w-[640px] text-center lg:mt-32">
        <Reveal>
          <h2
            id="cta-heading"
            className="font-display text-balance text-[40px] text-ink"
          >
            Plan tomorrow, tonight.
          </h2>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="mt-8">
            <Link href="/signup" className="btn btn-primary px-8">
              Start planning free
            </Link>
          </div>
        </Reveal>
      </section>
    </Container>
    </MotionConfig>
  );
}
