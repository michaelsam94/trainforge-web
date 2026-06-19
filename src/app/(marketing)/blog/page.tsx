import Link from "next/link";
import type { Metadata } from "next";
import { blogPosts } from "@/features/marketing/content/blog";
import { Card } from "@/shared/ui";

export const metadata: Metadata = {
  title: "Blog",
  description: "Training science, recovery, and adaptive programming guides from TrainForge.",
  openGraph: {
    title: "TrainForge Blog",
    description: "Training science, recovery, and adaptive programming guides.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <main id="main-content" className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="display mb-4">TrainForge blog</h1>
      <p className="mb-8 text-muted">
        Practical guides on adaptive training, recovery, and building sustainable fitness habits.
      </p>
      <div className="space-y-4">
        {blogPosts.map((post) => (
          <Card key={post.slug} className="p-6">
            <Link href={`/blog/${post.slug}`} className="block">
              <h2 className="font-display text-xl font-bold">{post.title}</h2>
              <p className="mt-2 text-sm text-muted">{post.description}</p>
              <p className="mt-3 text-xs text-muted">
                {new Date(post.publishedAt).toLocaleDateString()} · {String(post.readingMinutes)} min read
              </p>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
