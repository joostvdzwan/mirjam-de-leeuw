/**
 * Kantlijn — content schema (Zod).
 * Copy to e.g. `src/lib/kantlijn/schema.ts`. Parse every MDX frontmatter with
 * `articleSchema.parse(data)` at build time so a missing field fails the build.
 */
import { z } from "zod";

export const track = z.enum(["psych-k", "mijn-verhaal"]);
export type Track = z.infer<typeof track>;

export const TRACKS: Record<Track, { label: string; slug: Track }> = {
  "psych-k": { label: "Over PSYCH-K", slug: "psych-k" },
  "mijn-verhaal": { label: "Mijn verhaal", slug: "mijn-verhaal" },
};

const isoDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use YYYY-MM-DD");

const wordCount = (s: string) => s.trim().split(/\s+/).length;

export const articleSchema = z
  .object({
    title: z.string().min(3).max(70),
    titleAccent: z.string().min(2),
    slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    number: z.number().int().positive(),
    track,
    readerQuestion: z.string().max(90).endsWith("?"),
    shortAnswer: z
      .string()
      .refine((s) => wordCount(s) >= 25 && wordCount(s) <= 70, "Short answer: aim for 40–60 words"),
    standfirst: z.string().max(160),
    published: isoDate,
    updated: isoDate,
    readingMinutes: z.number().int().positive().optional(),
    photo: z
      .object({
        src: z.string(),
        alt: z.string().min(5),
        caption: z.string().optional(),
        focus: z.string().default("50% 50%"),
      })
      .optional(),
    limits: z.string().min(10),
    faqTitle: z.string().min(5),
    faq: z.array(z.object({ q: z.string().endsWith("?"), a: z.string().min(2) })).min(2),
    sources: z.array(z.string()).default([]),
    cta: z.object({ line: z.string(), accent: z.string() }),
    related: z.array(z.string()).length(3),
    pillar: z.string().optional(),
    draft: z.boolean().default(false),
  })
  .refine((a) => a.title.includes(a.titleAccent), {
    message: "titleAccent must be a phrase that occurs in title",
    path: ["titleAccent"],
  })
  .refine((a) => a.updated >= a.published, { message: "updated cannot be before published", path: ["updated"] });

export type Article = z.infer<typeof articleSchema>;

export const upcomingSchema = z.array(
  z.object({ slug: z.string(), number: z.number().int().positive(), track, title: z.string() })
);
export type Upcoming = z.infer<typeof upcomingSchema>[number];

/** Production guard: no "[placeholder]" text may be published. */
export function assertNoPlaceholders(slug: string, text: string) {
  const hit = text.match(/\[[^\]\n]{2,160}\](?!\()/); // "[aantal]", "[Mirjam: …]" — but not Markdown links
  if (hit && process.env.NODE_ENV === "production") {
    throw new Error(`Kantlijn: placeholder ${hit[0]} still in "${slug}"`);
  }
}

/** Splits the title into before / accent / after for <ArticleTitle>. */
export function splitTitle(title: string, accent: string) {
  const i = title.indexOf(accent);
  return { before: title.slice(0, i), accent, after: title.slice(i + accent.length) };
}

/** Two-digit display number: 1 → "01". */
export const nr = (n: number) => String(n).padStart(2, "0");
