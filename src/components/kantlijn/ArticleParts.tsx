import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { KANTLIJN } from "@/lib/kantlijn/config";
import type { Article, IndexItem } from "@/lib/kantlijn/content";
import { trackPath } from "@/lib/kantlijn/seo";
import { TRACKS, nr } from "@/lib/kantlijn/schema";
import MessageThread from "./MessageThread";
import { NoteRow } from "./NotesIndex";
import { Avatar, ChevronDown } from "./primitives";
import ShareButton from "./ShareButton";
import { AccentTitle, DateTime, minutes, nowrap } from "./text";

/** Under the shared site header: reading progress (below 1280px; the rail takes over above) and the section identity. */
export function ArticleHead() {
  return (
    <>
      <div
        className="progress"
        role="progressbar"
        aria-label="Leesvoortgang"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={0}
        data-progressbar
      >
        <div className="progress__bar" />
      </div>
      <div className="container article-head">
        <div className="masthead-strip">
          <Link className="masthead-strip__title" href={KANTLIJN.basePath}>
            {KANTLIJN.name}
          </Link>
          <p className="masthead-strip__intro">{nowrap(KANTLIJN.stripIntro)}</p>
        </div>
      </div>
    </>
  );
}

export function ArticleHero({ article }: { article: Article }) {
  const { photo } = article;
  return (
    <header className={photo ? "article-hero" : "article-hero article-hero--no-photo"}>
      {photo && (
        <figure className="article-hero__photo">
          <ViewTransition name={`kl-photo-${article.slug}`}>
            <div className="article-hero__frame">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                priority
                sizes="(min-width: 1060px) 380px, 100vw"
                style={{ objectPosition: photo.focus }}
              />
            </div>
          </ViewTransition>
          {photo.caption && <figcaption className="caption">{photo.caption}</figcaption>}
        </figure>
      )}
      {!photo && (
        <p className="article-hero__number" aria-hidden="true">
          {nr(article.number)}
        </p>
      )}
      <div className="article-hero__text">
        <nav className="breadcrumb" aria-label="Kruimelpad">
          <Link href={KANTLIJN.basePath}>{KANTLIJN.name}</Link>
          <span aria-hidden="true">›</span>
          <Link href={trackPath(article.track)}>{nowrap(TRACKS[article.track].label)}</Link>
          <span aria-hidden="true">·</span>
          <span>nr. {nr(article.number)}</span>
        </nav>
        <ViewTransition name={`kl-title-${article.slug}`}>
          <h1 className="article-title" tabIndex={-1}>
            <AccentTitle title={article.title} accent={article.titleAccent} />
          </h1>
        </ViewTransition>
        <MessageThread question={article.readerQuestion} slug={article.slug} published={article.published} />
        <div className="short-answer">
          <p className="short-answer__label">Kort antwoord</p>
          <p className="short-answer__text">{nowrap(article.shortAnswer)}</p>
        </div>
        <div className="byline">
          <Avatar size={32} />
          <p>
            Door <Link href={KANTLIJN.author.aboutPath}>{KANTLIJN.author.name}</Link>
            <br />
            <DateTime iso={article.published} /> · {minutes(article.readingMinutes)}
          </p>
          <ShareButton />
        </div>
      </div>
    </header>
  );
}

const tocEntries = (article: Article) => [
  ...article.toc.map((e) => ({ id: e.id, n: String(e.n).padStart(2, "0"), title: e.title })),
  { id: "faq", n: String(article.toc.length + 1).padStart(2, "0"), title: "Veelgestelde vragen" },
];

function TocList({ article }: { article: Article }) {
  return (
    <ol>
      {tocEntries(article).map((entry) => (
        <li key={entry.id}>
          <span>{entry.n}</span>
          <a href={`#${entry.id}`}>{nowrap(entry.title)}</a>
        </li>
      ))}
    </ol>
  );
}

/**
 * Two outputs from the same data; CSS shows one (display: none hides the other from screen readers too).
 * The desktop list sits in the right column, and from 1280px becomes the rail in the left margin.
 */
export function TableOfContents({ article }: { article: Article }) {
  return (
    <>
      <nav className="toc-side is-side" aria-labelledby="toc-title">
        <h2 id="toc-title">In dit artikel</h2>
        <ol className="toc-rail">
          {tocEntries(article).map((entry) => (
            <li key={entry.id} data-state="ahead">
              <a href={`#${entry.id}`}>
                <span className="toc-rail__node" aria-hidden="true" />
                <span className="toc-rail__n">{entry.n}</span>
                <span className="toc-rail__label">{nowrap(entry.title)}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>
      <details className="toc">
        <summary>
          In dit artikel
          <ChevronDown />
        </summary>
        <TocList article={article} />
      </details>
    </>
  );
}

export function KnowWell({ limits }: { limits: string }) {
  return (
    <aside className="know-well is-side" aria-labelledby="goed-om-te-weten">
      <h2 id="goed-om-te-weten">Goed om te weten</h2>
      <p>
        {nowrap(limits)} {KANTLIJN.crisisLine}
      </p>
    </aside>
  );
}

export function Faq({ title, items }: { title: string; items: Article["faq"] }) {
  return (
    <section className="faq" aria-labelledby="faq">
      <p className="faq__kicker">Andere eerste zinnen</p>
      <h2 id="faq">{nowrap(title)}</h2>
      {items.map((item) => (
        <div className="faq__item" key={item.q}>
          <h3>{nowrap(item.q)}</h3>
          <p>{nowrap(item.a)}</p>
        </div>
      ))}
    </section>
  );
}

export function AuthorBlock({ updated }: { updated: string }) {
  const { author } = KANTLIJN;
  return (
    <section className="author-block" aria-label="Over de schrijver">
      <div className="author-block__row">
        <Image
          className="author-block__img"
          src="/kantlijn/mirjam-portret.jpg"
          alt={author.name}
          width={112}
          height={144}
          sizes="(min-width: 1060px) 112px, 84px"
        />
        <div>
          <p className="author-block__name">{author.name}</p>
          <p className="author-block__bio">
            {author.role} ·{" "}
            <a href={author.registerUrl} rel="noopener" target="_blank">
              {author.registration}
            </a>
            . {author.ggz}
          </p>
        </div>
      </div>
      <p className="author-block__review">
        Ik schrijf elk artikel zelf en lees het elk jaar opnieuw na. Laatst nagelezen op{" "}
        <DateTime iso={updated} />.
      </p>
      <Link className="link-action" href={author.aboutPath}>
        Meer over Mirjam
      </Link>
    </section>
  );
}

const URL_RE = /(https?:\/\/[^\s)]+)/g;

function SourceText({ text }: { text: string }) {
  return text.split(URL_RE).map((part, i) =>
    i % 2 === 1 ? (
      <a key={i} href={part} rel="noopener" target="_blank">
        {part}
      </a>
    ) : (
      <span key={i}>{nowrap(part)}</span>
    )
  );
}

export function Sources({ sources }: { sources: string[] }) {
  if (!sources.length) return null;
  return (
    <section className="sources" id="bronnen" aria-labelledby="h-bronnen">
      <h2 id="h-bronnen">Bronnen</h2>
      <ol>
        {sources.map((source, i) => (
          <li key={i} id={`bron-${i + 1}`}>
            <SourceText text={source} />{" "}
            <a href={`#ref-${i + 1}`} aria-label="Terug naar de tekst">
              ↩
            </a>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function RelatedNotes({ items }: { items: IndexItem[] }) {
  if (!items.length) return null;
  return (
    <section className="related" aria-labelledby="lees-ook">
      <h2 className="section-label" id="lees-ook">
        Lees ook
      </h2>
      <ol className="notes-index">
        {items.map((entry) => (
          <NoteRow key={entry.kind === "published" ? entry.article.slug : entry.item.slug} entry={entry} />
        ))}
      </ol>
    </section>
  );
}
