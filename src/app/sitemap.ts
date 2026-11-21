import type { MetadataRoute } from "next";
import { pagePath, pageSlugs } from "@/lib/content-pages";
import { KANTLIJN } from "@/lib/kantlijn/config";
import { getArticles } from "@/lib/kantlijn/content";
import { TRACK_SLUGS } from "@/lib/kantlijn/schema";
import { articlePath, trackPath } from "@/lib/kantlijn/seo";
import { absoluteUrl } from "@/lib/site";

const CONTENT_UPDATED = new Date("2026-11-06");
const LEGAL_UPDATED = new Date("2026-05-01");

export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getArticles();
  const blogUpdated = new Date(
    articles.reduce((latest, a) => (a.updated > latest ? a.updated : latest), "2026-01-01")
  );

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
      url: absoluteUrl(KANTLIJN.basePath),
      lastModified: blogUpdated,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...TRACK_SLUGS.map((track) => ({
      url: absoluteUrl(trackPath(track)),
      lastModified: blogUpdated,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    ...articles.map((a) => ({
      url: absoluteUrl(articlePath(a.slug)),
      lastModified: new Date(a.updated),
      changeFrequency: "monthly" as const,
      priority: 0.6,
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
