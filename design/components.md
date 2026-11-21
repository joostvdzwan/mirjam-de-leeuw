# Components

Next.js App Router. Server Components by default; only the five marked **client**
need `"use client"`. Every class name below exists in `reference/styles.css`, and every
component has a reference in `reference/*.html`. Match the screenshots in `screenshots/`.

Suggested location: `src/components/kantlijn/`. Styling: CSS Modules ported from
`reference/styles.css`, or Tailwind v4 with `tokens.tailwind.css`. Either way, values come
from the tokens only.

---

## Routes

| Route | File | Notes |
|---|---|---|
| `/blog` | `app/blog/page.tsx` | Front page: masthead, filter, lead story, index, author card, CTA band. |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | Article. `generateStaticParams` from the MDX files; `dynamicParams = false`. |
| `/blog/psych-k`, `/blog/mijn-verhaal` | same page as `/blog`, or `app/blog/[track]` with a filtered index | The breadcrumb links here. It must be a real URL, not only a client filter. |
| `/blog/rss.xml` | route handler | Optional but cheap. |
| OG images | `app/blog/[slug]/opengraph-image.tsx` | Render the reader question as the blue bubble plus "Kantlijn" (see seo-and-safety.md). |

The blog is **Kantlijn** on the page; the URL stays `/blog`.

---

## Front page (`/blog`)

### `<SiteHeader current="blog" />`
Reuse the site's existing header if there is one. On `/blog` and articles on desktop, the
"Kantlijn" nav item is set in italic Lora 18px (`aria-current="page"`). Mobile: brand plus menu button (44×44).

### `<Masthead />`
`h1` "Kantlijn", italic Lora 400, `--text-masthead`, line-height .86, letter-spacing -0.035em.
2px brown rule above, 1px rule below. The intro sentence is serif 18/20px. On ≥760px the
title and intro sit side by side. This is the only place the big masthead appears.

### `<TrackFilter value onChange />` — client
Three text buttons: Alles · Over PSYCH-K · Mijn verhaal, each in its track colour, with
`aria-pressed`. The active one is semibold and underlined (2px, offset 7px). Filtering
the index happens client-side for speed, **but** each track also has a real URL
(`/blog/psych-k`), and the buttons update the URL with `router.replace` (shallow) so
the state can be shared.

### `<LeadStory article />`
"Lees eerst" label, then a 4:5 photo (`next/image`, `sizes="(min-width: 760px) 40vw, 100vw"`,
`priority`), track line "Mijn verhaal · nr. 02", the title with its accent word, the italic
standfirst, and date · reading time. The whole block is one link. With the filter set,
the lead is the newest article in that track.

### `<NotesIndex items />`
An `<ol>` of rows. **Published** rows are links: number (Lora 30px, track colour),
title (Lora 24px), meta "Over PSYCH-K · 12 min lezen". **Upcoming** rows are not links:
muted number (`aria-hidden`), muted title, meta "· binnenkort". Rows are separated by
1px soft rules; the section starts with a 2px rule under the label "Alle notities".
Never render upcoming items as disabled buttons or links.

### `<AuthorCard />`
Portrait 112×146 (square corners), "Wie schrijft hier?", name, one-line bio, "Meer over Mirjam".

### `<CtaBand line accent text />`
Mobile: full-width photo (walk), then the sage block. ≥760px: photo and sage block side by
side inside the page width. Line in Lora 30–36px; the accent part in italic
`--color-on-sage-accent`. Button: cream pill, opens the booking dialog.

### `<SiteFooter />`
Always contains the crisis line: "Acute nood? Bel 112 of je huisarts(enpost). Denk je aan
zelfdoding? Bel 113 of gratis 0800-0113." Plus Instagram and privacy links.

---

## Article (`/blog/[slug]`)

Wrap the page in `<div data-track={article.track}>` so `--track` is set for everything inside.

### `<ArticleBar />` — client (mobile and tablet, < 1060px)
Sticky. "‹ Kantlijn" (italic Lora 24px) back link to `/blog`, share button (Web Share
API, else copy the link and show a status toast), 1px rule, and the 2px `<ReadingProgress />`.

### Desktop head (≥ 1060px)
`<SiteHeader />`, then `<MastheadStrip />` (italic "Kantlijn" 40px plus intro, 2px/1px
rules), and a fixed 2px `<ReadingProgress />` at the very top of the viewport.

### `<ReadingProgress />` — client
Measures progress over `.article-body` only (not the FAQ, CTA or footer), throttled with
`requestAnimationFrame`. `role="progressbar"` with `aria-valuenow` on the mobile one; the
fixed desktop one is `aria-hidden`.

### `<ArticleHero article />`
Order: breadcrumb → title → reader question → short answer → byline.
- **Photo** (optional, story articles): full width at the top on mobile (360px high,
  `object-position` from `photo.focus`); on desktop a 420px column right of the text, 4:5.
- **`<Breadcrumb />`** "Kantlijn › Mijn verhaal · nr. 02", in track colour, as a `<nav>`, plus BreadcrumbList JSON-LD.
- **`<ArticleTitle />`** `h1`, Lora 400, 46px mobile / 68px desktop, line-height 1.0. The
  `titleAccent` phrase is italic in track colour with `white-space: nowrap`. Receives
  focus on client-side navigation (`tabIndex={-1}`).
- **`<ReaderQuestion />`** Label "Een vraag die ik vaak krijg" (13px, right-aligned),
  then THE bubble: grachtwater background, cream Lora 500, `border-radius: 22px 22px 6px 22px`,
  right-aligned, max 78% wide (380px on desktop). A visually hidden "Vraag:" prefix for
  screen readers. **This is the only chat bubble in an article**, on both tracks.
- **`<ShortAnswer />`** Between a 1px rule above and below: label "Kort antwoord" (sage,
  semibold 13px), then the answer in italic Lora 21/24px. **Server-rendered text, always in
  the initial HTML.** It is the snippet for Google and AI assistants.
- **`<Byline />`** Avatar 32px (photo, 2px cream gap, sage ring), "Door Mirjam de Leeuw"
  (links to the about page), `<time>` published date · reading time.

**Motion:** on the first visit to an article in a session, the bubble pops in (450ms,
`--ease-out`) and the short answer fades in after 380ms. Implement with a tiny inline
script that adds `first-visit` to `<html>` based on `sessionStorage`, plus CSS animations
under `@media (prefers-reduced-motion: no-preference)`. The content must already be
visible without JS. No typing dots.

### `<ArticleBody>` (the MDX content)
- **Mobile:** one column, 24px side padding.
- **Desktop:** a 640px text column, a 48px number gutter on the left, and the **kantlijn**:
  a 240px margin column on the right.
- Side items (`.is-side`) float right into the margin with a negative margin. They never
  overlap: a colliding item just moves down. Wide items (`.is-wide`: photos, quotes) span
  text and margin. See `.article-body` in styles.css.

MDX component map (`mdx-components.tsx`):

| MDX | Renders | Notes |
|---|---|---|
| `##` | `<h2>` with a section number | A rehype plugin numbers the h2s and generates ids (slugified, Dutch). The number is `aria-hidden`; mobile shows it inline, desktop in the gutter. |
| first paragraph after the first `##` | `p.drop` | Drop cap via `::first-letter`, track colour. |
| paragraphs | `p` | Lora 18/20px, line-height 1.62/1.65. |
| `<Kantlijn note>` | `.annotated` > `aside.margin-note.is-side` + children | Note first in the DOM (so the float aligns with the paragraph's first line). On mobile it shows after the paragraph via flex order, inset 32px. Prefix "Kantlijn · " in semibold. Colour `--track-ink`. |
| `<Kantlijn action note>` | `.margin-note--action` | Sage rule, with a link "Plan een gratis kennismaking" that opens the booking dialog. |
| `<Citaat accent after?>` | `figure.pull-quote.is-wide` | Lora 31/44px, line-height 1.14. Renders children + `<span class="accent">{accent}</span>` + `after`. |
| `<Foto>` | `figure.photo-wide.is-wide` | `next/image`, caption 13px muted. |
| `<Stappen>` | `ol.rule-list.rule-list--numbered` | Rule between items, Lora numbers in track colour. |
| unordered list | `ul.rule-list` | Same rules, no numbers. |
| `<Voetnoot n>` | `a.footnote-ref` | `href="#bron-n"`, `id="ref-n"`, `aria-label="Bron n"`, superscript in track colour. Sources list items link back with ↩. |
| "PSYCH-K" anywhere | `<span class="nowrap">` | A small remark plugin wraps every occurrence so it never breaks at the hyphen. Lora has no non-breaking hyphen glyph, so don't use U+2011. |

### `<TableOfContents />`
Rendered by the template from the h2s, plus "Veelgestelde vragen". Two outputs from
the same data:
- **Mobile:** `<details class="toc">` "In dit artikel" with a chevron, collapsed, placed before the first h2.
- **Desktop:** `<nav class="toc-side is-side">` as the first float in the kantlijn.

CSS hides the one that doesn't apply (`display: none`, so screen readers get only one).

### `<KnowWell limits />`
"Goed om te weten": sand box with a 2px sage rule on top. It holds `limits` plus the fixed
crisis line (112 / huisarts(enpost) / 113 / 0800-0113). Required on every article, rendered
by the template after the body. On desktop it floats in the kantlijn beside the FAQ.

### `<Faq title items />`
Kicker "Andere eerste zinnen" (13px muted), the `h2` with the descriptive title, a 2px rule,
then items: `h3` question in italic Lora, the answer in Lora, a 1px rule between items.
**All answers are visible in the HTML.** No accordion.

### `<AuthorBlock article />`
2px rule; portrait 84×108 (112×144 on desktop); name; credentials with a link to the
register; "Werkte [aantal] jaar in de GGZ als [functie]."; "Ik schrijf elk artikel zelf en
lees het elk jaar opnieuw na. Laatst nagelezen op {updated}."; "Meer over Mirjam".

### `<CtaBand variant="article" />`
Full-width sage band, without a photo. Line plus accent from `cta`, the fixed explanation,
and a cream pill button that opens the booking dialog.

### `<Sources />`
`h2` "Bronnen" (14px semibold), `<ol>` with `id="bron-n"` and ↩ back links. Omit the section when there are no sources.

### `<RelatedNotes slugs />`
"Lees ook", using the same rows as `<NotesIndex>` (published = link, upcoming = muted). Three columns on desktop.

---

## `<BookingDialog />` — client

Native `<dialog>` opened with `showModal()`: focus trap, Escape and the backdrop come for
free. Bottom sheet on mobile (`margin: auto auto 0`, radius 20px top), centred on ≥760px.
Any element with `data-open-booking` or `<OpenBooking>` opens it. Focus moves to the title
on open and back to the trigger on close.

**Form state:** keep values in React state, so closing and reopening keeps what was typed.
Reset only after a successful send.

**Fields:**
1. **Naam** (`autocomplete="name"`), required.
2. **E-mailadres** (`type="email"`, `inputmode="email"`), required, validated.
3. **"Wat is jouw eerste zin?"** (optional textarea, Lora 17px). Hint: "Eén zin is genoeg. Je
   hoeft hier geen details over je gezondheid te delen; dat bespreken we liever in het gesprek."
4. **Consent checkbox**, required, linking to the privacy statement.

**Errors:** validate on submit, set `aria-invalid`, show the error text under the field,
and focus the first invalid field. Error colour `--color-error`.

**Submit:** a Server Action (or route handler) sends the email. On success, the dialog
shows the confirmation in the same panel:
- the visitor's own first sentence as the blue reader bubble, labelled "Jouw eerste zin";
- Mirjam's reply in italic Lora between rules, signed with her avatar;
- "Wat gebeurt er nu?" in three numbered steps;
- a button whose label depends on where the dialog was opened: "Terug naar het artikel" or "Terug naar Kantlijn".

**Always shows:** "Niet voor acute hulp. Bij nood: 112 of je huisarts(enpost). Bij gedachten aan zelfdoding: 113 of 0800-0113."

**Server side:**
- Add rate limiting and a honeypot field.
- Don't log the message body.
- Store nothing longer than needed (see seo-and-safety.md).

---

## Shared primitives

- **`<Avatar size>`:** the photo (`mirjam-avatar.jpg`) with `box-shadow: 0 0 0 2px var(--color-cream), 0 0 0 3.5px var(--color-sage)` and a margin matching the ring. Sizes 26 / 32 / 72.
- **`<Accent>`:** italic, track colour.
- **`<Nowrap>`:** `white-space: nowrap`.
- **Buttons:** `.btn--sage` (primary), `.btn--cream` (on sage), `.btn--outline`. Pill shape, min-height 52px (44px small).
- **Rules:** `--rule-strong` (2px brown) starts a section; `--rule` (1px brown) frames the
  short answer and bars; `--rule-soft` separates rows. Never use cards with shadows or
  rounded tinted boxes. The only tinted surfaces are the sage CTA band, the sand
  "Goed om te weten" box and the blue reader bubble.
