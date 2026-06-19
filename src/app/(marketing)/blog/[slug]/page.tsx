import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getAllBlogSlugs,
  getBlogPost,
} from "@/features/marketing/content/blog";
import { buildArticleJsonLd } from "@/features/marketing/seo/jsonLd";
import { appConfig } from "@/shared/config/app";

export const revalidate = 3600;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  const url = `${appConfig.appUrl}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      url,
      tags: post.tags,
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = buildArticleJsonLd(post);

  return (
    <main id="main-content" className="mx-auto max-w-3xl px-4 py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <article>
        <header className="mb-8">
          <p className="text-sm text-muted">
            {new Date(post.publishedAt).toLocaleDateString()} · {String(post.readingMinutes)} min read
          </p>
          <h1 className="display mt-2">{post.title}</h1>
          <p className="mt-4 text-lg text-muted">{post.description}</p>
        </header>
        <div className="prose-spacing space-y-4 text-foreground">
          {post.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}
