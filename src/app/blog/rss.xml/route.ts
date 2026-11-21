import { KANTLIJN } from "@/lib/kantlijn/config";
import { getArticles } from "@/lib/kantlijn/content";
import { articlePath } from "@/lib/kantlijn/seo";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const articles = [...getArticles()].sort((a, b) => b.published.localeCompare(a.published));
  const items = articles
    .map((a) => {
      const url = absoluteUrl(articlePath(a.slug));
      return `<item>
  <title>${escape(a.title)}</title>
  <link>${url}</link>
  <guid isPermaLink="true">${url}</guid>
  <pubDate>${new Date(`${a.published}T09:00:00Z`).toUTCString()}</pubDate>
  <description>${escape(`${a.standfirst} ${a.shortAnswer}`)}</description>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${KANTLIJN.name} · ${escape(SITE_NAME)}</title>
  <link>${absoluteUrl(KANTLIJN.basePath)}</link>
  <atom:link href="${absoluteUrl(`${KANTLIJN.basePath}/rss.xml`)}" rel="self" type="application/rss+xml" />
  <description>${escape(KANTLIJN.intro)}</description>
  <language>nl-NL</language>
${items}
</channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
