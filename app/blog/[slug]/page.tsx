import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPost, posts } from "@/lib/blog";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPost(params.slug);
  if (!post) return { title: "Post not found — TaskFlow" };
  return { title: `${post.title} — TaskFlow Blog`, description: post.excerpt };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="mx-auto w-full max-w-3xl px-4 pb-20 pt-14">
      <Link
        href="/blog"
        className="transition-subtle inline-flex min-h-[44px] items-center text-sm text-muted hover:text-ink"
      >
        ← All posts
      </Link>
      <h1 className="font-display mt-4 text-balance text-3xl leading-tight tracking-tight text-ink sm:text-4xl">
        {post.title}
      </h1>
      <p className="mt-3 text-sm text-muted">
        {post.date} · {post.readTime}
      </p>
      <div className="mt-8 grid gap-5">
        {post.body.map((para, i) => (
          <p
            key={i}
            className={`leading-relaxed text-muted ${i === 0 ? "text-lg text-ink" : ""}`}
          >
            {para}
          </p>
        ))}
      </div>
      <div className="card mt-12 p-8 text-center">
        <h2 className="font-display text-xl text-ink">Put it into practice</h2>
        <p className="mt-2 text-sm text-muted">
          Create a free TaskFlow account and plan your first day.
        </p>
        <Link
          href="/signup"
          className="btn btn-primary mt-6 inline-flex px-8 font-medium"
        >
          Get started free
        </Link>
      </div>
    </article>
  );
}
