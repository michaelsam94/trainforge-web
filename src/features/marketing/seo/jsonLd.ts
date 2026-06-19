import type { BlogPost } from "@/features/marketing/content/blog";
import { appConfig } from "@/shared/config/app";

export function buildArticleJsonLd(post: BlogPost) {
  const url = `${appConfig.appUrl}/blog/${post.slug}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: appConfig.name,
      url: appConfig.appUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  };
}

export function buildOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: appConfig.name,
    url: appConfig.appUrl,
    description: appConfig.description,
  };
}
