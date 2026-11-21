import Image from "next/image";
import type { Lead } from "@/lib/kantlijn/content";
import FitBubbles from "./kantlijn/FitBubbles";
import { REPLY_LINE } from "./kantlijn/MessageThread";
import { messageTime } from "./kantlijn/text";

/** The track colours from Kantlijn, for use in the site's Tailwind components. */
export const trackInk = {
  "psych-k": "text-[#2E434A]",
  "mijn-verhaal": "text-[#8E4A2E]",
} as const;

export const trackAccent = {
  "psych-k": "text-[#4F6E78]",
  "mijn-verhaal": "text-[#A85A3A]",
} as const;

const msg =
  "relative w-fit rounded-[20px] px-4 pt-[11px] pb-3 text-[17px] leading-[1.4] text-pretty md:text-lg " +
  "drop-shadow-[0_1px_1px_rgb(58_48_40/0.08)]";

/**
 * Kantlijn's signature, as used on the site: the photo, then the reader's question as a text
 * message and Mirjam's short reply. Same composition as the lead story on /blog.
 */
export default function KantlijnQuestion({
  article,
  sizes = "(min-width: 768px) 520px, 100vw",
}: {
  article: Lead;
  sizes?: string;
}) {
  const time = messageTime(article.slug, article.published);
  return (
    <>
      {article.photo ? (
        <div className="relative aspect-4/3 overflow-hidden">
          <Image
            src={article.photo.src}
            alt={article.photo.alt}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
            style={{ objectPosition: article.photo.focus }}
          />
        </div>
      ) : null}
      <div className={`${article.photo ? "mt-5" : ""} flex flex-col gap-1.5`}>
        <p className="mb-1.5 self-center text-xs text-brown-muted">
          <time dateTime={time.iso}>
            <span className="font-semibold">{time.day}</span> {time.time}
          </time>
        </p>
        <p
          data-msg
          className={`${msg} msg-tail-in ml-2 max-w-[90%] self-start bg-white text-brown`}
        >
          <span className="sr-only">Vraag van een lezer: </span>
          {article.readerQuestion}
        </p>
        <div className="mt-1 flex max-w-[90%] items-end gap-3.5 self-end">
          <p
            data-msg
            className={`${msg} msg-tail-out bg-[#4F6E78] text-cream antialiased`}
          >
            <span className="sr-only">Mirjam: </span>
            {REPLY_LINE}
          </p>
          <Image
            src="/kantlijn/mirjam-gezicht.jpg"
            alt=""
            width={28}
            height={28}
            sizes="28px"
            className="shrink-0 rounded-full"
          />
        </div>
        <p className="mt-0.5 self-end pr-[42px] text-xs text-brown-muted tabular-nums">Gelezen {time.readAt}</p>
        <FitBubbles />
      </div>
    </>
  );
}

/** Title with its accent phrase in italic and the track colour. */
export function SiteAccentTitle({ article }: { article: Lead }) {
  const i = article.title.indexOf(article.titleAccent);
  if (i < 0) return <>{article.title}</>;
  return (
    <>
      {article.title.slice(0, i)}
      <em className={trackAccent[article.track]}>{article.titleAccent}</em>
      {article.title.slice(i + article.titleAccent.length)}
    </>
  );
}
