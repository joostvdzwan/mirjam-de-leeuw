import Link from "next/link";
import SectionWrapper from "./SectionWrapper";
import MotionFadeIn from "./motion/MotionFadeIn";
import KantlijnQuestion, { SiteAccentTitle, trackInk } from "./KantlijnQuestion";
import { getLead, getPublished, getUpcoming } from "@/lib/kantlijn/content";
import { TRACKS, nr } from "@/lib/kantlijn/schema";
import { articlePath } from "@/lib/kantlijn/seo";
import { KANTLIJN } from "@/lib/kantlijn/config";

type Row =
  | { kind: "published"; slug: string; number: number; title: string; meta: string; ink: string }
  | { kind: "upcoming"; number: number; title: string };

/** Home page section: the newest note from Kantlijn, two more rows and the way in. */
export default function KantlijnTeaser() {
  const lead = getLead();
  if (!lead) return null;

  const rows: Row[] = [
    ...getPublished()
      .filter((a) => a.slug !== lead.slug)
      .map((a) => ({
        kind: "published" as const,
        slug: a.slug,
        number: a.number,
        title: a.title,
        meta: `${TRACKS[a.track].label} · ${a.readingMinutes} min lezen`,
        ink: trackInk[a.track],
      })),
    ...getUpcoming(undefined, 2).map((u) => ({
      kind: "upcoming" as const,
      number: u.number,
      title: u.title,
    })),
  ].slice(0, 2);

  return (
    <SectionWrapper id="kantlijn" background="sand">
      <div className="grid items-center gap-14 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] md:gap-16 lg:gap-24">
        <MotionFadeIn className="md:order-2">
          <Link href={articlePath(lead.slug)} className="group block">
            <KantlijnQuestion article={lead} />
            <p className={`body-sm body-sm-medium mt-5 ${trackInk[lead.track]}`}>
              {TRACKS[lead.track].label} · nr. {nr(lead.number)}
            </p>
            <h3 className="mt-2 font-[family-name:var(--font-heading)] text-[28px] leading-[1.12] tracking-[-0.015em] text-brown underline decoration-transparent decoration-1 underline-offset-[6px] transition-colors group-hover:decoration-current md:text-[34px]">
              <SiteAccentTitle article={lead} />
            </h3>
            <p className="body-md body-md-regular mt-3 text-brown-muted">
              {lead.readingMinutes} min lezen
            </p>
          </Link>
        </MotionFadeIn>

        <MotionFadeIn className="md:order-1">
          <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">Uit Kantlijn</p>
          <h2 id="kantlijn-heading" className="display-md display-md-regular mb-4 text-brown">
            Notities van <em className="font-[family-name:var(--font-heading)]">Mirjam</em>
          </h2>
          <p className="body-lg body-lg-regular max-w-md text-brown-muted">
            Korte stukken over PSYCH-K, over werken met mensen en over wat ik meenam uit de GGZ.
            Elke notitie begint bij een vraag die ik vaak krijg.
          </p>

          {rows.length > 0 && (
            <ol className="mt-10 border-t border-brown/15">
              {rows.map((row) =>
                row.kind === "published" ? (
                  <li key={row.slug} className="border-b border-brown/15">
                    <Link
                      href={articlePath(row.slug)}
                      className="group flex gap-4 py-4"
                    >
                      <span className={`w-9 shrink-0 font-[family-name:var(--font-heading)] text-2xl leading-none ${row.ink}`}>
                        {nr(row.number)}
                      </span>
                      <span>
                        <span className="block font-[family-name:var(--font-heading)] text-xl leading-snug text-brown underline decoration-transparent underline-offset-4 transition-colors group-hover:decoration-current">
                          {row.title}
                        </span>
                        <span className="body-sm body-sm-regular mt-1 block text-brown-muted">{row.meta}</span>
                      </span>
                    </Link>
                  </li>
                ) : (
                  <li key={row.number} className="flex gap-4 border-b border-brown/15 py-4">
                    <span className="w-9 shrink-0" aria-hidden="true" />
                    <span>
                      <span className="block font-[family-name:var(--font-heading)] text-xl leading-snug text-brown-muted">
                        {row.title}
                      </span>
                      <span className="body-sm body-sm-regular mt-1 block text-brown-muted">Binnenkort</span>
                    </span>
                  </li>
                )
              )}
            </ol>
          )}

          <Link
            href={KANTLIJN.basePath}
            className="label-md label-md-medium mt-8 inline-flex min-h-11 items-center gap-2 text-sage-dark underline decoration-1 underline-offset-4 transition-colors hover:text-brown"
          >
            Alle notities in Kantlijn
            <span aria-hidden="true">→</span>
          </Link>
        </MotionFadeIn>
      </div>
    </SectionWrapper>
  );
}
