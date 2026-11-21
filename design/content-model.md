# Content model

Every article is one MDX file in `content/kantlijn/<slug>.mdx`. The frontmatter holds
everything the template renders outside the prose; the MDX body holds the prose itself.
A TypeScript/Zod version of this schema is in `content-schema.ts`. Validate at build
time and fail the build on a missing required field.

## Frontmatter fields

| Field | Type | Required | Rules |
|---|---|---|---|
| `title` | string | yes | The H1, plain text. ≤ 70 characters. Also the `<title>` (with " · Kantlijn"). |
| `titleAccent` | string | yes | The exact words in `title` set in italic track colour. Must occur in `title`. One phrase, 1–3 words. |
| `slug` | string | yes | URL part: `/blog/<slug>`. Lowercase, hyphens. Never change after publishing (or add a redirect). |
| `number` | number | yes | The "nr." shown in breadcrumb and index. Assigned in publishing order, never reused. Displayed with two digits (`01`). |
| `track` | `"psych-k"` \| `"mijn-verhaal"` | yes | Drives colour (grachtwater / kastanje), breadcrumb and filter. |
| `readerQuestion` | string | yes | The one chat bubble. A real question a reader types into Google or an AI assistant, in their words. ≤ 90 characters. Ends with "?". |
| `shortAnswer` | string | yes | 40–60 words. Starts with the subject ("PSYCH-K is…", "Ik ben weggegaan omdat…") so it still makes sense when quoted on its own. No links, no markdown. |
| `standfirst` | string | yes | One or two sentences for the front page and meta description. ≤ 160 characters. |
| `published` | ISO date | yes | `2026-11-03` |
| `updated` | ISO date | yes | Date of the last content review. Shown in the author block ("Laatst nagelezen op"). |
| `readingMinutes` | number | no | If omitted, compute from word count (≈ 220 words/min, round up). |
| `photo` | object | no | `{ src, alt, caption, focus }`. Story articles (`mijn-verhaal`) should have one; PSYCH-K articles usually don't. `focus` is a CSS object-position like `"50% 18%"`. |
| `limits` | string | yes | First sentence of the "Goed om te weten" box. The crisis line (112/113) is added by the template, never written per article. |
| `faqTitle` | string | yes | Real, descriptive heading: "Veelgestelde vragen over PSYCH-K". The kicker "Andere eerste zinnen" is added by the template. |
| `faq` | array of `{ q, a }` | yes (≥ 2) | Questions in the reader's words; answers in Mirjam's voice, 1–3 sentences, plain text. |
| `sources` | array of string | no | Numbered in order; referenced from the body with `<Voetnoot n={1} />`. |
| `cta` | object | yes | `{ line, accent }`, for example `{ line: "Herken je iets van jezelf?", accent: "Laten we praten." }`. |
| `related` | array of slug | yes (3) | Unpublished slugs are allowed: they render as muted "binnenkort" rows. |
| `pillar` | slug | no | For cluster articles: the pillar they belong to (internal linking and breadcrumb). |
| `draft` | boolean | no | Drafts are excluded from the build, sitemap and index, but listed as "binnenkort" if referenced. |

## MDX body: allowed elements

Use plain Markdown for paragraphs, `##` headings, lists and emphasis. The first
paragraph after the first `##` automatically gets the drop cap. Section numbers are
added automatically to every `##`.

| Component | Use |
|---|---|
| `<Kantlijn note="…">paragraph or list</Kantlijn>` | A margin note beside the wrapped block. One per section at most. 1–2 sentences, Mirjam's aside. |
| `<Kantlijn action note="…">…</Kantlijn>` | The soft call to book, as a margin note. One per article, around two-thirds of the way down. |
| `<Citaat accent="Alleen te komen.">Je hoeft niets voor te bereiden. </Citaat>` | Pull quote. The children come first, then `accent` in italic track colour, then the optional `after` text: `<Citaat accent="voordat" after=" ik iets moest invullen.">Ik wilde weer kunnen luisteren </Citaat>`. Max one per 600 words. |
| `<Foto src alt caption focus />` | Wide photo spanning text and margin. Story articles only. |
| `<Stappen>` + a numbered Markdown list | Numbered rule list (track-coloured numbers). |
| `<Voetnoot n={1} />` | Footnote reference at the end of a sentence; links to `sources[n-1]`. |
| `<Nowrap>PSYCH-K</Nowrap>` | Not needed by hand: a remark plugin wraps every "PSYCH-K" automatically (see components.md). |

## Index-only entries (upcoming articles)

The front page lists upcoming titles. Keep them in `content/kantlijn/_upcoming.json`:

```json
[
  { "slug": "hoe-gaat-een-psych-k-sessie", "number": 3, "track": "psych-k", "title": "Hoe gaat een PSYCH-K-sessie?" },
  { "slug": "wat-een-wachtlijst-met-je-doet", "number": 4, "track": "mijn-verhaal", "title": "Wat een wachtlijst met je doet" }
]
```

When an article is published, remove its entry here; the MDX file takes over.

## Writing rules (for Mirjam and for anyone generating drafts)

- **Reader question:** a question someone actually asks, not a slogan. Check it against the keyword list in the blog strategy doc.
- **Short answer:** answer first, nuance after. Never "Dat hangt ervan af" as the opening.
- **Mijn verhaal articles:** apply the screenshot test. Any sentence that could be screenshotted on its own (card sentence, pull quote, margin note) must still be fair to the GGZ and the people in it.
- **No health details about clients**, even anonymised, unless they consented in writing.
- **Placeholders in square brackets** (`[aantal]`, `[Mirjam: …]`) must not reach production: `assertNoPlaceholders` in `content-schema.ts` fails the production build while any remain (Markdown links are ignored).
