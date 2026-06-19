import type { MetadataRoute } from "next";
import { appConfig } from "@/shared/config/app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/pricing", "/blog", "/blog/*", "/coaches", "/gear"],
      disallow: [
        "/plan",
        "/plan/*",
        "/progress",
        "/coach",
        "/community",
        "/community/*",
        "/profile",
        "/login",
        "/signup",
        "/onboarding",
        "/design-system",
      ],
    },
    sitemap: `${appConfig.appUrl.replace(/\/$/, "")}/sitemap.xml`,
  };
}
