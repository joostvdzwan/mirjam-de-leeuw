import Image from "next/image";
import Link from "next/link";
import { ViewTransition } from "react";
import { KANTLIJN } from "@/lib/kantlijn/config";
import { type Lead, getLead, getPublished, getUpcoming } from "@/lib/kantlijn/content";
import { TRACKS, TRACK_SLUGS, type Track, nr } from "@/lib/kantlijn/schema";
import NotesIndex from "./NotesIndex";
import MessageThread from "./MessageThread";
import { CtaBand } from "./CtaBand";
import { AccentTitle, DateTime, minutes, nowrap } from "./text";

function Masthead() {
  return (
    <section className="masthead">
      <h1 className="masthead__title">{KANTLIJN.name}</h1>
      <p className="masthead__intro">{nowrap(KANTLIJN.intro)}</p>
    </section>
  );
}

/** Real links per track; Link keeps the scroll position and swaps the list in place. */
function TrackFilter({ value }: { value?: Track }) {
  const options = [
    { label: "Alles", href: KANTLIJN.basePath, track: undefined },
    ...TRACK_SLUGS.map((t) => ({ label: TRACKS[t].label, href: `${KANTLIJN.basePath}/${t}`, track: t })),
  ];
  return (
    <nav className="track-filter" aria-label="Filter op onderwerp">
      {options.map((o) => (
        <Link
          key={o.href}
          href={o.href}
          data-track={o.track}
          aria-current={o.track === value ? "page" : undefined}
          scroll={false}
          replace
        >
          <span>{nowrap(o.label)}</span>
        </Link>
      ))}
    </nav>
  );
}

function LeadStory({ article }: { article: Lead }) {
  const photo = article.photo;
  const image = photo && (
    <div className="lead-story__photo">
      <Image
        className="lead-story__img"
        src={photo.src}
        alt={photo.alt}
        fill
        priority
        sizes="(min-width: 760px) 520px, 100vw"
        style={{ objectPosition: photo.focus }}
      />
    </div>
  );
  return (
    <article className={photo ? "lead-story" : "lead-story lead-story--no-photo"} data-track={article.track}>
      <p className="label">Lees eerst</p>
      <Link className="lead-story__link" href={`/blog/${article.slug}`}>
        {image && article.ownPhoto ? (
          <ViewTransition name={`kl-photo-${article.slug}`}>{image}</ViewTransition>
        ) : (
          image
        )}
        <MessageThread question={article.readerQuestion} slug={article.slug} published={article.published} reply />
        <p className="lead-story__track">
          {nowrap(TRACKS[article.track].label)} · nr. {nr(article.number)}
        </p>
        <ViewTransition name={`kl-title-${article.slug}`}>
          <h2 className="lead-story__title">
            <AccentTitle title={article.title} accent={article.titleAccent} />
          </h2>
        </ViewTransition>
        <p className="lead-story__standfirst">{nowrap(article.standfirst)}</p>
        <p className="meta">
          <DateTime iso={article.published} /> · {minutes(article.readingMinutes)}
        </p>
      </Link>
    </article>
  );
}

function AuthorCard() {
  const { author } = KANTLIJN;
  return (
    <section className="author-card" aria-label="Over de schrijver">
      <Image
        className="author-card__img"
        src="/kantlijn/mirjam-portret.jpg"
        alt="Portret van Mirjam de Leeuw"
        width={112}
        height={146}
        sizes="112px"
      />
      <div>
        <p className="label">Wie schrijft hier?</p>
        <p className="author-card__name">{author.name}</p>
        <p className="author-card__bio">{author.cardBio}</p>
        <Link className="link-action" href={author.aboutPath}>
          Meer over Mirjam
        </Link>
      </div>
    </section>
  );
}

/** Inline, so the lead's thread only "arrives" on the first front page view of a session. */
function FrontVisitScript() {
  const code = `try{var r=document.documentElement;if(sessionStorage.getItem("kl-seen-front")){r.classList.remove("kl-first-front")}else{r.classList.add("kl-first-front");sessionStorage.setItem("kl-seen-front","1")}}catch(e){}`;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function FrontPage({ track }: { track?: Track }) {
  const lead = getLead(track);
  return (
    <>
      <FrontVisitScript />
      <main id="main-content">
        <div className="container">
          <Masthead />
          <TrackFilter value={track} />
          <ViewTransition name="kl-front">
            <div className="front">
              {lead ? <LeadStory article={lead} /> : <div />}
              <div>
                <NotesIndex published={getPublished(track)} leadSlug={lead?.slug} upcoming={getUpcoming(track)} />
                <AuthorCard />
              </div>
            </div>
          </ViewTransition>
        </div>
        <CtaBand
          line="Iets gelezen dat bleef hangen?"
          accent="Dan praten we er graag verder over."
          text="In een gratis kennismaking van 30 minuten vertel je wat er speelt, en kijken we samen of mijn manier van werken bij je past."
        />
      </main>
    </>
  );
}
