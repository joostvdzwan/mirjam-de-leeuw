import Link from "next/link";
import { ViewTransition } from "react";
import type { Article, IndexItem } from "@/lib/kantlijn/content";
import type { Upcoming } from "@/lib/kantlijn/schema";
import { TRACKS, nr } from "@/lib/kantlijn/schema";
import { minutes, nowrap } from "./text";
import { OpenBooking } from "./primitives";

export function NoteRow({ entry, morph = true }: { entry: IndexItem; morph?: boolean }) {
  if (entry.kind === "upcoming") {
    const { item } = entry;
    return (
      <li className="notes-index__item" data-track={item.track}>
        <div className="notes-index__upcoming">
          <span className="notes-index__num" aria-hidden="true">
            {nr(item.number)}
          </span>
          <span>
            <span className="notes-index__title">{nowrap(item.title)}</span>
            <span className="notes-index__meta">{TRACKS[item.track].label} · binnenkort</span>
          </span>
        </div>
      </li>
    );
  }

  const { article } = entry;
  const title = (
    <span className="notes-index__title">{nowrap(article.title)}</span>
  );
  return (
    <li className="notes-index__item" data-track={article.track}>
      <Link className="notes-index__link" href={`/blog/${article.slug}`}>
        <span className="notes-index__num">{nr(article.number)}</span>
        <span>
          {morph ? <ViewTransition name={`kl-title-${article.slug}`}>{title}</ViewTransition> : title}
          <span className="notes-index__meta">
            {TRACKS[article.track].label} · {minutes(article.readingMinutes)}
          </span>
        </span>
      </Link>
    </li>
  );
}

/** Published notes as rows, then a quiet "Binnenkort" list, then the invitation to ask. */
export default function NotesIndex({
  published,
  upcoming,
  title = "Alle notities",
  leadSlug,
}: {
  published: Article[];
  upcoming: Upcoming[];
  title?: string;
  /** The lead story owns the title's view transition, so its row must not claim it too. */
  leadSlug?: string;
}) {
  return (
    <div className="notes">
      {published.length > 0 && (
        <section aria-labelledby="notes-title">
          <h2 className="section-label" id="notes-title">
            {title}
          </h2>
          <ol className="notes-index">
            {published.map((article) => (
              <NoteRow key={article.slug} entry={{ kind: "published", article }} morph={article.slug !== leadSlug} />
            ))}
          </ol>
        </section>
      )}
      {upcoming.length > 0 && (
        <section className="notes-soon" aria-labelledby="notes-soon-title">
          <h2 className="notes-soon__label" id="notes-soon-title">
            Binnenkort
          </h2>
          <ul className="notes-soon__list">
            {upcoming.map((item) => (
              <li key={item.slug}>{nowrap(item.title)}</li>
            ))}
          </ul>
        </section>
      )}
      <OpenBooking className="notes-index__link notes-index__ask" mode="vraag">
        <span className="notes-index__num" aria-hidden="true">
          ?
        </span>
        <span>
          <span className="notes-index__title">Welke vraag zou jij hier willen lezen?</span>
          <span className="notes-index__meta">Stel je vraag</span>
        </span>
      </OpenBooking>
    </div>
  );
}
