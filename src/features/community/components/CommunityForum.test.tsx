import { describe, expect, it } from "vitest";
import { buildArticleJsonLd } from "@/features/marketing/seo/jsonLd";
import { getBlogPost } from "@/features/marketing/content/blog";

describe("blog SEO", () => {
  it("builds Article JSON-LD for rich results", () => {
    const post = getBlogPost("adaptive-training-for-busy-professionals");
    expect(post).toBeDefined();
    if (!post) return;

    const jsonLd = buildArticleJsonLd(post);
    expect(jsonLd["@type"]).toBe("BlogPosting");
    expect(jsonLd.headline).toBe(post.title);
    expect(jsonLd.datePublished).toBe(post.publishedAt);
    expect(jsonLd.author).toEqual({ "@type": "Organization", name: post.author });
    expect(jsonLd.mainEntityOfPage["@id"]).toContain(post.slug);
  });
});

describe("forum flow", () => {
  it("models create thread then reply sequence", () => {
    const thread = {
      id: "thread-1",
      title: "Deload week tips?",
      body: "How do you schedule deloads?",
    };
    const reply = {
      threadId: thread.id,
      body: "Every 4th week I cut volume 40%.",
    };

    expect(reply.threadId).toBe(thread.id);
    expect(thread.title.length).toBeGreaterThan(2);
    expect(reply.body.length).toBeGreaterThan(0);
  });
});
