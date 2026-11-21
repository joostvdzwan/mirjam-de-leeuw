# Kantlijn: handoff for Next.js and Cursor

The blog of Coachingpraktijk De Leeuw. Everything needed to build it in the existing
Next.js (App Router) site with Cursor: the design as clean static HTML/CSS, tokens,
a component spec, a content model with validation, two example articles, photos,
screenshots, and a rules file that keeps Cursor on-brand.

## What's inside

```
kantlijn-handoff/
├── README.md                     ← you are here
├── .cursor/rules/kantlijn.mdc    ← rules Cursor applies to all blog files
├── design/
│   ├── tokens.css                ← colours, type, spacing, rules, radii (plain CSS variables)
│   ├── tokens.tailwind.css       ← the same tokens as a Tailwind v4 @theme
│   ├── components.md             ← every component: markup, behaviour, accessibility
│   ├── content-model.md          ← frontmatter fields, MDX components, writing rules
│   ├── content-schema.ts         ← Zod schema + helpers (validated against the examples)
│   ├── seo-and-safety.md         ← metadata, JSON-LD, crawlability, fonts, AVG, crisis lines
│   ├── reference/                ← the design as static pages (open index.html in a browser)
│   │   ├── index.html                                  front page
│   │   ├── artikel-wat-is-psych-k.html                 PSYCH-K article (no photo)
│   │   ├── artikel-waarom-ik-een-eigen-praktijk-begon.html  story article (photo)
│   │   ├── styles.css · reference.js · img/
│   └── screenshots/              ← mobile (390px) and desktop (1280px), plus booking states
├── content/kantlijn/
│   ├── wat-is-psych-k.mdx
│   ├── waarom-ik-een-eigen-praktijk-begon.mdx
│   └── _upcoming.json            ← titles shown as "binnenkort" on the front page
└── public/kantlijn/              ← photos (avatar, portrait, practice, walk, Singelpark)
```

All reference pages are responsive: resize the browser to see the mobile layout, and
the desktop margin column (kantlijn) from 1060px.

## Setup

1. **Copy into the repo root:** `design/`, `content/`, `public/kantlijn/` and `.cursor/rules/kantlijn.mdc`.
   Keep `design/` in the repo. Cursor needs it while building and it documents the blog later.
2. **Install:** `zod` and `gray-matter`, plus an MDX pipeline. Use whatever the site already
   uses. If nothing yet: `next-mdx-remote` (its RSC `compileMDX` reads frontmatter and
   custom components), or Velite if you prefer typed content collections. Add
   `rehype-slug` for heading ids.
3. **Fonts:** `next/font/google` for Lora (400, 500, italic) and DM Sans (400, 500, 600), with
   `variable: "--font-lora"` / `"--font-dm-sans"` on `<html>`. These are self-hosted at build
   time, so nothing loads from Google for visitors. The reference HTML links Google Fonts
   only so it previews in a browser.
4. Open the project in Cursor. The rules file activates for `app/blog/**`,
   `components/kantlijn/**` and `content/kantlijn/**`.

## Build order, with prompts for Cursor

Work one step at a time and compare each result with the matching screenshot before
moving on. Attach the files named in each prompt with `@`.

**1. Tokens and base styles**
> Using @design/tokens.css (or @design/tokens.tailwind.css if we use Tailwind v4) and
> @design/reference/styles.css, set up the Kantlijn styling for `/blog`: tokens, base
> typography, rules and buttons. Load Lora and DM Sans with next/font as CSS variables
> `--font-lora` and `--font-dm-sans`. Don't change styling outside `/blog`.

**2. Content layer**
> Create `lib/kantlijn` that reads @content/kantlijn/*.mdx with gray-matter, validates the
> frontmatter with @design/content-schema.ts, merges @content/kantlijn/_upcoming.json for
> unpublished titles, and exposes `getArticles()`, `getArticle(slug)`, `getIndex(track?)`.
> Call `assertNoPlaceholders` for every article in production builds.

**3. Front page**
> Build `app/blog/page.tsx` exactly like @design/reference/index.html, following
> @design/components.md (SiteHeader, Masthead, TrackFilter, LeadStory, NotesIndex,
> AuthorCard, CtaBand, SiteFooter). Track pages `/blog/psych-k` and `/blog/mijn-verhaal`
> render the same page filtered. Compare with @design/screenshots/index-mobiel.png and
> index-desktop.png.

**4. Article template**
> Build `app/blog/[slug]/page.tsx` like @design/reference/artikel-wat-is-psych-k.html and
> @design/reference/artikel-waarom-ik-een-eigen-praktijk-begon.html: ArticleBar,
> MastheadStrip, ArticleHero (breadcrumb, title with accent, reader question bubble,
> short answer, byline), TableOfContents, the MDX body with the kantlijn float layout,
> KnowWell, Faq, AuthorBlock, Sources, CtaBand, RelatedNotes. Use `generateStaticParams`
> with `dynamicParams = false`. The short answer and FAQ must be server-rendered.

**5. MDX components and plugins**
> In `mdx-components.tsx`, map `Kantlijn` (with `note` and `action`), `Citaat` (`accent`,
> `after`), `Foto`, `Stappen` and `Voetnoot` as specified in @design/components.md. Add:
> rehype-slug; a rehype plugin that numbers h2s (`<span class="num" aria-hidden>`) and adds
> `drop` to the first paragraph after the first h2; and a remark plugin that wraps every
> "PSYCH-K" in `<span class="nowrap">`.

**6. Client behaviour**
> Add the client pieces from @design/reference/reference.js as small React client
> components: the first-visit class (sessionStorage, respects reduced motion),
> ReadingProgress (measures `.article-body` only), share (Web Share API, copy fallback),
> and TrackFilter (updates the URL shallowly).

**7. Booking**
> Build BookingDialog per @design/components.md: native `<dialog>`, values kept when
> closed, validation with `aria-invalid` and focus on the first error, the confirmation
> state with the visitor's first sentence as the reader bubble. Submit through a Server
> Action that emails Mirjam (use our mail provider), with a honeypot and rate limiting.
> Don't store or log the message text. Compare with @design/screenshots/kennismaken-*.png.

**8. Search and sharing**
> Implement everything in @design/seo-and-safety.md: generateMetadata, JSON-LD
> (BlogPosting, Person, BreadcrumbList, Blog) as in the reference `<head>`, sitemap.ts,
> robots.ts, and an `opengraph-image.tsx` that shows the reader question as the blue
> bubble with "Kantlijn".

**9. Check**
> Compare every route with the screenshots at 390px and 1280px. Run Lighthouse
> (accessibility and SEO 100 expected), test keyboard-only navigation through an article
> and the booking dialog, and test with reduced motion on.

## Still needed from Mirjam

The production build stops while any of these remain:

- **About her:** years in the GGZ and her role there; registration, with a link to the register.
- **Booking:** how quickly she replies (`[termijn]`, used in the booking dialog).
- **Sources:** the source for each footnote.
- **FAQ answers:** number of sessions, online yes/no, waiting-list question, reimbursement, the difference from a psychologist.
- **Her own story:** the "moment dat je bijbleef" paragraph in her story article.
- **Privacy:** a privacy statement page (see seo-and-safety.md §7).

## Photos

`public/kantlijn/` holds web-ready versions, rendered from Figma at up to 2400px. For
production, export the originals from the Figma file (page "Merk · Fotografie" and the Cover):

| File | Figma source |
|---|---|
| `mirjam-portret.jpg`, `mirjam-avatar.jpg` | Import · alle foto's, node 2596:31 (portrait in brown blazer) |
| `mirjam-praktijk.jpg` | Cover, "Foto · JEL_4993_1" (the original is 5735×3816; this file is only the 640×900 crop) |
| `mirjam-wandeling.jpg` | Import · alle foto's, node 2596:50 (walk on the path) |
| `singelpark-bank.jpg` | Singelpark · september 2026, node 2395:7 (bench by the water) |

Export `mirjam-praktijk` again from the original in particular: at its current size it's
too small for the desktop hero on high-density screens.
