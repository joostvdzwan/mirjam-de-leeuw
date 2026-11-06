import type { MetadataRoute } from "next";
import { pagePath, pageSlugs } from "@/lib/content-pages";
import { absoluteUrl } from "@/lib/site";

const CONTENT_UPDATED = new Date("2026-11-06");
const LEGAL_UPDATED = new Date("2026-05-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
    },
    ...pageSlugs.map((slug) => ({
      url: absoluteUrl(pagePath(slug)),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    {
      url: absoluteUrl("/privacy"),
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: absoluteUrl("/algemene-voorwaarden"),
      lastModified: LEGAL_UPDATED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
