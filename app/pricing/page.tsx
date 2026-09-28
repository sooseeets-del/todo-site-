import Link from "next/link";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Pricing — TaskFlow",
  description:
    "TaskFlow pricing: a generous free plan for daily planning, with Pro and Team plans for power users.",
};

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    text: "Everything you need for simple daily planning.",
    cta: "Get started",
    href: "/signup",
    featured: false,
    features: [
      "Unlimited tasks",
      "Priority, due date & category",
      "Search, filter & sort",
      "Overdue & due-today highlights",
      "Cloud sync on all devices",
    ],
  },
  {
    name: "Pro",
    price: "$5",
    period: "per month",
    text: "For power users who live in their task list.",
    cta: "Start free trial",
    href: "/signup",
    featured: true,
    features: [
      "Everything in Free",
      "Reminders & notifications",
      "Subtasks & recurring tasks",
      "Calendar view",
      "Priority support",
    ],
  },
  {
    name: "Team",
    price: "$9",
    period: "per user / month",
    text: "Plan together with shared lists.",
    cta: "Contact us",
    href: "/about",
    featured: false,
    features: [
      "Everything in Pro",
      "Shared lists & collaboration",
      "Team dashboard",
      "Roles & permissions",
      "SSO (coming soon)",
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="mx-auto w-full max-w-[1100px] px-4 pb-20 pt-14">
      <div className="relative text-center">
        <h1 className="font-display text-balance text-3xl font-normal tracking-tight text-ink sm:text-5xl">
          Simple, honest <span className="text-accent">pricing</span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-muted">
          Start free. Upgrade only if you need more. No credit card required
          for the free plan.
        </p>
      </div>

      <div className="mt-12 grid gap-4 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 0.07}>
            <div
              className={`relative flex h-full flex-col rounded-card border p-6 sm:p-8 ${
                p.featured
                  ? "border-border bg-surface shadow-soft"
                  : "border-border bg-surface hover:border-muted"
              }`}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-ink px-3 py-1 text-xs font-semibold text-bg">
                  Most popular
                </span>
              )}
              <h2 className="font-display text-lg font-semibold text-ink">{p.name}</h2>
              <p className="mt-4">
                <span className="font-display tabular text-4xl font-normal text-ink">{p.price}</span>
                <span className="ml-1 text-sm text-muted">{p.period}</span>
              </p>
              <p className="mt-2 text-sm text-muted">{p.text}</p>
              <Link
                href={p.href}
                className={`btn mt-6 font-medium ${p.featured ? "btn-primary" : "btn-outline"}`}
              >
                {p.cta}
              </Link>
              <ul className="mt-6 grid gap-2.5">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2 text-sm text-muted">
                    <Check size={16} strokeWidth={2} aria-hidden="true" className="mt-0.5 shrink-0 text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      <p className="mt-10 text-center text-sm text-muted">
        All plans include private-by-default tasks, mobile support, and cloud
        backup. Questions? Read the <Link href="/blog" className="text-ink underline underline-offset-4">blog</Link> or{" "}
        <Link href="/about" className="text-ink underline underline-offset-4">about us</Link>.
      </p>
    </div>
  );
}
