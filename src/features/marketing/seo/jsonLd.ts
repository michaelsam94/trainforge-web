import type { BlogPost } from "@/features/marketing/content/blog";
import { appConfig } from "@/shared/config/app";

type FaqItem = {
  question: string;
  answer: string;
};

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
    mainEntityOfPage: url,
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
    sameAs: ["https://michaelsam94.tech"],
  };
}

export function buildSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: appConfig.name,
    applicationCategory: "HealthApplication",
    operatingSystem: "Web",
    url: appConfig.appUrl,
    description:
      "AI personal trainer app for adaptive workouts, wearable recovery signals, and real-time coaching context.",
    featureList: [
      "Adaptive workout planning",
      "Wearable-aware recovery adjustments",
      "Conversational training explanations",
      "Progress tracking for strength, conditioning, mobility, and skills",
    ],
    audience: {
      "@type": "Audience",
      audienceType: "Busy professionals",
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    publisher: {
      "@type": "Organization",
      name: appConfig.name,
      url: appConfig.appUrl,
    },
  };
}

export function buildFaqJsonLd(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
