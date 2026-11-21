# Search, AI assistants, trust and safety

Kantlijn has two jobs: own the Dutch search term "psych-k", and tell Mirjam's GGZ
story honestly. Both depend on the details below. They are part of the design, not
extras.

## 1. Answer-first, in the HTML

- The **reader question** (bubble) and **short answer** are server-rendered text in the
  first ~600px of the HTML, directly under the `h1`. Never inject them with JS, and never
  hide them behind an animation that starts at `opacity: 0` without JS. The CSS animation
  only runs when the `first-visit` class is present.
- Headings are real questions where it fits ("Wat zegt onderzoek over PSYCH-K?"). AI
  assistants and Google lift question/answer pairs.
- The FAQ answers are always in the DOM (no accordion).
- The short answer starts with its subject, so it can be quoted on its own.

## 2. Metadata (App Router `generateMetadata`)

```ts
export async function generateMetadata({ params }) {
  const a = await getArticle(params.slug);
  const url = `https://coachingpraktijk.deleeuw.nl/blog/${a.slug}`;
  return {
    title: `${a.title} · Kantlijn`,
    description: a.standfirst,
    alternates: { canonical: url },
    authors: [{ name: "Mirjam de Leeuw", url: "https://coachingpraktijk.deleeuw.nl/over-mirjam" }],
    openGraph: { type: "article", url, title: a.title, description: a.standfirst, locale: "nl_NL",
                 publishedTime: a.published, modifiedTime: a.updated, siteName: "Coachingpraktijk De Leeuw" },
  };
}
```

Set `<html lang="nl">`.

## 3. Structured data (JSON-LD, one `<script>` per page)

See the `<head>` of the reference articles for full examples. Per article: a
**BlogPosting** (headline, description, datePublished, dateModified, image, author as a
**Person** with `@id` pointing to the about page, publisher, isPartOf Blog "Kantlijn") and a
**BreadcrumbList**. The front page gets a **Blog** object. The "Over Mirjam" page should hold
the full **Person** (`@id` `…/over-mirjam#mirjam`, jobTitle, `sameAs` links to her register
entry and LinkedIn, `knowsAbout`, `worksFor` the practice as a LocalBusiness with address in
Leiden).

FAQPage markup: Google shows FAQ rich results only for a small set of authoritative sites,
so it brings little in search. The visible Q&A text is what counts for Google and AI
assistants. Adding FAQPage is harmless; it is not required.

## 4. Crawlability

- Every navigation is a real `<a href>` (cards, breadcrumb, related, filters with their
  own URLs). Client-side filtering is an enhancement on top.
- `app/sitemap.ts` includes `/blog`, both track pages and every published article, with
  `lastModified = updated`.
- `robots.ts` allows everything except drafts. Don't block AI crawlers unless Mirjam
  decides to: being cited is goal A.
- `/blog/rss.xml` (optional).
- Submit the sitemap to Google Search Console **and** Bing Webmaster Tools (several AI assistants use Bing's index).

## 5. Open Graph images

`app/blog/[slug]/opengraph-image.tsx` (1200×630): cream background, italic "Kantlijn" top
left with a 2px rule, the reader question as the blue bubble, the track label and "nr.
02". Load Lora and DM Sans from local files in the route.

## 6. Fonts and privacy

- Load Lora (400, 500, italic 400/500) and DM Sans (400, 500, 600) with `next/font/google`.
  next/font downloads them at build time and serves them from your own domain, so
  visitors' IP addresses are never sent to Google. Expose them as CSS variables
  `--font-lora` and `--font-dm-sans` (tokens.css picks those up).
- Analytics: cookieless and EU-hosted (for example Plausible or Simple Analytics), or none.
  Never record form field contents.

## 7. Booking form (AVG / GDPR)

- **Legal basis:** consent (the checkbox) for contact. Link to a real privacy statement
  covering: who processes the data (Mirjam, plus the email/hosting provider), purpose,
  retention period (e.g. deleted after 3 months if no follow-up), rights, contact.
- **Health information:** the optional "eerste zin" field can contain it (special
  category data). Hence the hint text asking people not to share details. Treat the field
  as sensitive: send it by email only, don't store it in a database or logs, and make sure
  the email provider has a data processing agreement (verwerkersovereenkomst).
- **Abuse:** a honeypot field, server-side validation, rate limiting per IP.
- **Never promise a response time** in the UI that Mirjam can't keep. `[termijn]` must be
  filled in by her (for example "twee werkdagen").

## 8. Safety lines (fixed copy; don't edit per article)

- Footer, the "Goed om te weten" box and the booking dialog contain:
  "Acute nood? Bel 112 of je huisarts(enpost). Denk je aan zelfdoding? Bel 113 of gratis 0800-0113."
- "Goed om te weten" also states that coaching and PSYCH-K are not therapy and don't replace medical or psychological care.
- Every Mijn verhaal article links to "Wanneer je wél naar de GGZ moet" (in the related list or the body).

## 9. Trust signals (E-E-A-T)

- **Author on every article:** photo, name, credentials with a link to the register, years in the GGZ, link to the about page.
- **Dates:** published and "Laatst nagelezen op" (updated), both as `<time datetime>`.
- **Sources:** numbered and linked. Prefer primary sources (research, government reports such as IBO Mentale Gezondheid, Trimbos, NZa).
- **Honesty about limits:** the PSYCH-K pillar says plainly that independent research is limited. Keep that tone; it builds trust and is better for a health-adjacent topic.

## 10. Accessibility checklist

- Contrast: all text tokens pass WCAG AA on cream. `--color-muted` is never used on sand.
- Touch targets ≥ 44px (filter buttons, icon buttons, footnote refs get padding).
- Focus visible everywhere (2px grachtwater outline). On client navigation, focus the `h1`.
- Section numbers and decorative upcoming numbers are `aria-hidden`; the reader bubble has a hidden "Vraag:" prefix.
- One `h1` per page; heading levels don't skip.
- `prefers-reduced-motion`: no animation at all.
- Booking dialog: native `<dialog>`, labelled by its title, errors announced via `aria-describedby` and focus moves to the first invalid field.
