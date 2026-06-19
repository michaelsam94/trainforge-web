import type { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/features/marketing/content/blog";
import { appConfig } from "@/shared/config/app";

const marketingPaths = ["", "/pricing", "/blog", "/coaches", "/gear", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = appConfig.appUrl.replace(/\/$/, "");
  const now = new Date();

  const staticEntries = marketingPaths.map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const blogEntries = getAllBlogSlugs().map((slug) => ({
    url: `${base}/blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
