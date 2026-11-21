import "server-only";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { TRACK_FALLBACK_PHOTO, assertKantlijnConfig } from "./config";
import {
  type ArticleMeta,
  type Track,
  type Upcoming,
  articleSchema,
  assertNoPlaceholders,
  isProductionDeploy,
  upcomingSchema,
} from "./schema";

const CONTENT_DIR = join(process.cwd(), "content/kantlijn");
const WORDS_PER_MINUTE = 220;

export type TocEntry = { id: string; title: string; n: number };

export type Article = ArticleMeta & {
  body: string;
  readingMinutes: number;
  toc: TocEntry[];
};

/** A row in the index: a published article (a link) or an upcoming title (muted). */
export type IndexItem =
  | { kind: "published"; article: Article }
  | { kind: "upcoming"; item: Upcoming };

const showDrafts = () => !isProductionDeploy() && process.env.KANTLIJN_SHOW_DRAFTS === "1";

/** Same ids rehype-slug generates for the h2s, in the same order. */
function tocFromBody(body: string): TocEntry[] {
  const slugger = new GithubSlugger();
  return body
    .split("\n")
    .filter((line) => /^#{1,6}\s/.test(line))
    .map((line) => {
      const level = line.match(/^#+/)![0].length;
      const title = line.replace(/^#+\s+/, "").trim();
      return { level, title, id: slugger.slug(title) };
    })
    .filter((h) => h.level === 2)
    .map((h, i) => ({ id: h.id, title: h.title, n: i + 1 }));
}

/** Counts everything a reader reads on the page: short answer, body and FAQ. */
function readingMinutesFor(meta: ArticleMeta, body: string) {
  const faq = meta.faq.map((f) => `${f.q} ${f.a}`).join(" ");
  const prose = `${meta.shortAnswer} ${body} ${faq}`.replace(/<[^>]+>/g, " ").replace(/[#*_>`-]/g, " ");
  const words = prose.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

function parseArticle(file: string): Article {
  const raw = readFileSync(join(CONTENT_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const result = articleSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Kantlijn: invalid frontmatter in ${file}\n${result.error.message}`);
  }
  const meta = result.data;
  if (`${meta.slug}.mdx` !== file) {
    throw new Error(`Kantlijn: ${file} has slug "${meta.slug}"; the file name must match`);
  }
  if (!meta.draft) assertNoPlaceholders(meta.slug, raw);

  return {
    ...meta,
    body: content,
    readingMinutes: meta.readingMinutes ?? readingMinutesFor(meta, content),
    toc: tocFromBody(content),
  };
}

/** All published articles, newest number first. */
export const getArticles = cache((): Article[] => {
  assertKantlijnConfig();
  return readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parseArticle)
    .filter((a) => !a.draft || showDrafts())
    .sort((a, b) => b.number - a.number);
});

export const getArticle = cache((slug: string): Article | undefined =>
  getArticles().find((a) => a.slug === slug)
);

const allUpcoming = cache((): Upcoming[] => {
  const raw = readFileSync(join(CONTENT_DIR, "_upcoming.json"), "utf8");
  const published = new Set(getArticles().map((a) => a.slug));
  return upcomingSchema
    .parse(JSON.parse(raw))
    .filter((u) => !published.has(u.slug))
    .sort((a, b) => a.number - b.number);
});

/** Published articles in number order, optionally for one track. */
export function getPublished(track?: Track): Article[] {
  return getArticles()
    .filter((a) => !track || a.track === track)
    .sort((a, b) => a.number - b.number);
}

/** The first few planned titles, optionally for one track. */
export function getUpcoming(track?: Track, limit = 3): Upcoming[] {
  return allUpcoming()
    .filter((u) => !track || u.track === track)
    .slice(0, limit);
}

/** Published and upcoming entries together, in number order, optionally for one track. */
const getIndex = cache((track?: Track): IndexItem[] => {
  const items: IndexItem[] = [
    ...getArticles().map((article) => ({ kind: "published" as const, article })),
    ...allUpcoming().map((item) => ({ kind: "upcoming" as const, item })),
  ];
  return items
    .filter((i) => !track || (i.kind === "published" ? i.article.track : i.item.track) === track)
    .sort((a, b) => numberOf(a) - numberOf(b));
});

/** The lead carries a photo where possible; `ownPhoto` is false when it is the track fallback. */
export type Lead = Article & { ownPhoto: boolean };

/** The newest published article, optionally within a track. */
export function getLead(track?: Track): Lead | undefined {
  const lead = [...getArticles()]
    .filter((a) => !track || a.track === track)
    .sort((a, b) => b.published.localeCompare(a.published))[0];
  return lead && withFallbackPhoto(lead);
}

/** One published note, dressed like a lead (for the site's "Lees in Kantlijn" blocks). */
export function getFeatured(slug: string): Lead | undefined {
  const article = getArticle(slug);
  return article && withFallbackPhoto(article);
}

function withFallbackPhoto(a: Article): Lead {
  return { ...a, photo: a.photo ?? TRACK_FALLBACK_PHOTO[a.track], ownPhoto: Boolean(a.photo) };
}

/** Related slugs resolved to index rows; unknown slugs are dropped. */
export function getRelated(slugs: string[]): IndexItem[] {
  const index = getIndex();
  return slugs.flatMap((slug) => {
    const hit = index.find((i) => (i.kind === "published" ? i.article.slug : i.item.slug) === slug);
    return hit ? [hit] : [];
  });
}

function numberOf(i: IndexItem) {
  return i.kind === "published" ? i.article.number : i.item.number;
}
