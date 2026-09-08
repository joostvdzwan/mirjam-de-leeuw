import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://coachingpraktijk.deleeuw.nl/sitemap.xml",
    host: "https://coachingpraktijk.deleeuw.nl",
  };
}
