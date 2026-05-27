import type { MetadataRoute } from "next";
import { BUSINESS, SITE } from "@/lib/constants";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: BUSINESS.nameJa,
    short_name: BUSINESS.nameEn,
    description: SITE.description,
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#1A0F08",
    theme_color: "#FF6B1A",
    lang: "ja-JP",
    categories: ["automotive", "business", "lifestyle"],
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png", purpose: "any" },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "maskable",
      },
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
