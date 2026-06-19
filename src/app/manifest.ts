import type { MetadataRoute } from "next";
import { appConfig } from "@/shared/config/app";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: appConfig.name,
    short_name: "TrainForge",
    description: appConfig.description,
    start_url: "/plan",
    scope: "/",
    display: "standalone",
    background_color: "#f7f8fa",
    theme_color: "#16c784",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
