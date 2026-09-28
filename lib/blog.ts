export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  body: string[];
};

export const posts: Post[] = [
  {
    slug: "five-minute-daily-plan",
    title: "The 5-minute daily plan that actually sticks",
    excerpt:
      "A tiny evening ritual — capture, prioritize, schedule — that keeps your TaskFlow dashboard honest.",
    date: "Sep 20, 2026",
    readTime: "4 min read",
    body: [
      "Most planning systems fail because they take longer than the work itself. The fix is a five-minute ritual you run every evening.",
      "First, capture: dump everything on your mind into TaskFlow as plain titles. Don't organize yet — just get it out of your head.",
      "Second, prioritize: mark each task low, medium, or high. Be honest — if everything is high priority, nothing is. Aim for at most three high-priority tasks per day.",
      "Third, schedule: give tomorrow's tasks a due date. Anything without a date quietly becomes overdue, and TaskFlow's red highlight will make sure you notice.",
      "Do this for a week and your dashboard turns from a guilt list into a plan you trust.",
    ],
  },
  {
    slug: "stop-missing-deadlines",
    title: "Why you keep missing deadlines (and how to stop)",
    excerpt:
      "Deadlines slip for three predictable reasons. Here's the system that fixes all three.",
    date: "Sep 14, 2026",
    readTime: "5 min read",
    body: [
      "Missed deadlines almost always come down to three causes: the task was never written down, it had no date, or it was buried under less important work.",
      "Writing everything down removes the first failure mode. Your brain is for having ideas, not storing them — capture every commitment the moment it appears.",
      "Every task needs a due date, even a rough one. A task without a date is a wish. In TaskFlow, dateless tasks sit quietly while dated ones get the amber due-today and red overdue treatments they deserve.",
      "Finally, sort by priority before you sort by date. An urgent-but-trivial task should never outrank important work just because it arrived first.",
      "Fix those three habits and missed deadlines become rare exceptions instead of the norm.",
    ],
  },
  {
    slug: "priority-matrix-simplified",
    title: "Priorities without the matrix: low, medium, high",
    excerpt:
      "You don't need a 2x2 Eisenhower grid. Three levels, used honestly, beat any framework.",
    date: "Sep 6, 2026",
    readTime: "3 min read",
    body: [
      "Productivity frameworks fail when they demand more maintenance than the tasks themselves. Three priority levels are enough for daily life.",
      "High means: moves the needle today, has a real consequence if skipped. Keep it to three or fewer per day.",
      "Medium means: genuine work that can slide a day without pain. This is where most tasks live, and that's fine.",
      "Low means: nice to have. Errands, someday ideas, polish. Do them when energy is low or time opens up.",
      "Review weekly: anything that's been medium for three weeks is either secretly low — or secretly high and scaring you. Decide which.",
    ],
  },
  {
    slug: "mobile-productivity-setup",
    title: "Setting up TaskFlow on your phone in 60 seconds",
    excerpt:
      "Your planner is only useful if it's with you. Here's the fastest mobile setup.",
    date: "Aug 28, 2026",
    readTime: "2 min read",
    body: [
      "A planner that lives only on your laptop can't capture tasks as life happens. The fix takes about a minute.",
      "Open TaskFlow in your phone's browser, sign in, and add it to your home screen. On most phones that's Share/Add to Home Screen — now it launches like a native app.",
      "Turn on the habit of capturing immediately: idea in the shower, assignment from a friend, groceries while cooking. Ten seconds in the add-task bar beats a forgotten task every time.",
      "Because everything syncs to the cloud, what you capture on the bus is waiting on your desktop when you sit down.",
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
