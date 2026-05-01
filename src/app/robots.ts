import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://praktijkdeleeuw.nl/sitemap.xml",
    host: "https://praktijkdeleeuw.nl",
  };
}
