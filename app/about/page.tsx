import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "About — TaskFlow",
  description:
    "TaskFlow is a simple daily planner built for students, freelancers, and anyone who wants calm, private task management.",
};

const values = [
  {
    title: "Simplicity first",
    text: "Most to-do tools are either too weak or too complex. TaskFlow sits in the middle: everything you need for daily planning, nothing that slows you down.",
  },
  {
    title: "Privacy always",
    text: "Your tasks are yours. Per-user accounts, hashed passwords, and strict data separation keep every dashboard private.",
  },
  {
    title: "Speed matters",
    text: "Pages load in under 3 seconds and every action feels instant — because a planner you wait for is a planner you abandon.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 pb-20 pt-14">
      <p className="text-sm font-semibold uppercase tracking-wide text-ink">
        About us
      </p>
      <h1 className="font-display mt-2 text-balance text-3xl font-normal tracking-tight text-ink sm:text-5xl">
        Planning should be <span className="text-accent">calm</span>, not chaotic.
      </h1>
      <p className="mt-5 leading-relaxed text-muted">
        TaskFlow started with a simple observation: people track tasks in
        notes apps, chats, or on paper — and important things slip through
        the cracks. Deadlines get missed, and there is no clear view of
        what is urgent.
      </p>
      <p className="mt-4 leading-relaxed text-muted">
        So we built the planner we always wanted: sign up in under a
        minute, capture tasks with priority and due date, and see at a
        glance what needs attention today. Tasks are stored securely in
        the cloud, so your plan survives refreshes, logouts, and new
        devices.
      </p>

      <h2 className="font-display mt-12 text-2xl font-normal text-ink">What we believe</h2>
      <div className="mt-6 grid gap-4">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={i * 0.06}>
            <div className="card p-6">
              <h3 className="font-display font-semibold text-ink">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <h2 className="font-display mt-12 text-2xl font-normal text-ink">Who it&apos;s for</h2>
      <ul className="mt-4 grid gap-2 text-muted">
        <li>
          <strong className="text-ink">Students</strong> — track assignments
          and deadlines without the overwhelm.
        </li>
        <li>
          <strong className="text-ink">Freelancers</strong> — manage client
          tasks and priorities in one place.
        </li>
        <li>
          <strong className="text-ink">Everyone else</strong> — a simple
          daily planner without the complexity.
        </li>
      </ul>

      <Reveal className="mt-12">
        <div className="card p-8 text-center">
          <h2 className="font-display text-xl font-normal text-ink">Try it free today</h2>
          <p className="mt-2 text-sm text-muted">
            No credit card. No setup. Just your tasks, organized.
          </p>
          <Link
            href="/signup"
            className="btn btn-primary mt-6 inline-flex px-8 font-medium"
          >
            Create free account
            <ArrowRight size={18} strokeWidth={1.8} aria-hidden="true" />
          </Link>
        </div>
      </Reveal>
    </div>
  );
}
