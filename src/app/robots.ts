import type { MetadataRoute } from "next";

import { appConfig } from "@/shared/config/app";

const baseUrl = appConfig.appUrl.replace(/\/$/, "");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/blog",
          "/blog/",
          "/coaches",
          "/gear",
          "/privacy",
          "/llms.txt",
        ],
        disallow: [
          "/api/",
          "/community",
          "/login",
          "/onboarding",
          "/plan",
          "/profile",
          "/progress",
          "/signup",
        ],
      },
    ],
    host: baseUrl,
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
