import { Fragment, type ReactNode } from "react";
import { splitTitle } from "@/lib/kantlijn/schema";

/** "PSYCH-K" (with a compound like "-sessie" and trailing punctuation) never breaks at a hyphen. */
const PSYCH_K = /(PSYCH-K(?:-\p{L}+)?[?.,!:]?)/gu;

export function nowrap(text: string): ReactNode {
  const parts = text.split(PSYCH_K);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} className="nowrap">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

/** Title with its accent phrase set in italic and the track colour. */
export function AccentTitle({ title, accent }: { title: string; accent: string }) {
  const { before, after } = splitTitle(title, accent);
  return (
    <>
      {nowrap(before)}
      <span className="accent">{nowrap(accent)}</span>
      {nowrap(after)}
    </>
  );
}

const dateFormat = new Intl.DateTimeFormat("nl-NL", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "Europe/Amsterdam",
});

export const formatDate = (iso: string) => dateFormat.format(new Date(`${iso}T12:00:00`));

export function DateTime({ iso }: { iso: string }) {
  return <time dateTime={iso}>{formatDate(iso)}</time>;
}

export const minutes = (n: number) => `${n} min lezen`;

const weekdayFormat = new Intl.DateTimeFormat("nl-NL", { weekday: "long", timeZone: "UTC" });

/**
 * When the reader's question "came in": an evening a few days before publication.
 * Derived from the slug, so it looks arbitrary but is identical on every render.
 */
export function messageTime(slug: string, published: string) {
  let h = 2166136261;
  for (const c of slug) h = Math.imul(h ^ c.charCodeAt(0), 16777619) >>> 0;
  const day = new Date(`${published}T12:00:00Z`);
  day.setUTCDate(day.getUTCDate() - (1 + (h % 5)));
  const minutes = (19 + ((h >>> 4) % 4)) * 60 + ((h >>> 8) % 60);
  const clock = (m: number) => `${String(Math.floor(m / 60) % 24).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
  const weekday = weekdayFormat.format(day);
  return {
    day: weekday.charAt(0).toUpperCase() + weekday.slice(1),
    time: clock(minutes),
    /** When the reader opened Mirjam's reply, a few minutes later. */
    readAt: clock(minutes + 3 + ((h >>> 14) % 9)),
    iso: `${day.toISOString().slice(0, 10)}T${clock(minutes)}`,
  };
}
