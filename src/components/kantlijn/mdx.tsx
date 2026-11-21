import Image from "next/image";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypeSlug from "rehype-slug";
import { rehypeKantlijn, remarkNowrap } from "@/lib/kantlijn/plugins";
import { OpenBooking } from "./primitives";
import { nowrap } from "./text";

function Kantlijn({ note, action = false, children }: { note: string; action?: boolean; children: ReactNode }) {
  return (
    <div className="annotated">
      <aside className={action ? "margin-note margin-note--action is-side" : "margin-note is-side"}>
        <strong>Kantlijn · </strong>
        {nowrap(note)}
        {action && (
          <>
            <br />
            <OpenBooking>Plan een gratis kennismaking</OpenBooking>
          </>
        )}
      </aside>
      {children}
    </div>
  );
}

function Citaat({ accent, after, children }: { accent: string; after?: string; children: ReactNode }) {
  return (
    <figure className="pull-quote is-wide">
      <blockquote>
        {children} <span className="accent">{nowrap(accent)}</span>
        {after && nowrap(after)}
      </blockquote>
    </figure>
  );
}

function Foto({ src, alt, caption, focus = "50% 50%" }: { src: string; alt: string; caption?: string; focus?: string }) {
  return (
    <figure className="photo-wide is-wide">
      <div className="photo-wide__frame">
        <Image src={src} alt={alt} fill sizes="(min-width: 1060px) 928px, 100vw" style={{ objectPosition: focus }} />
      </div>
      {caption && <figcaption className="caption">{caption}</figcaption>}
    </figure>
  );
}

function Stappen({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

function Voetnoot({ n }: { n: number }) {
  return (
    <a className="footnote-ref" id={`ref-${n}`} href={`#bron-${n}`} aria-label={`Bron ${n}`}>
      {n}
    </a>
  );
}

function Nowrap({ children }: { children: ReactNode }) {
  return <span className="nowrap">{children}</span>;
}

const components = {
  Kantlijn,
  Citaat,
  Foto,
  Stappen,
  Voetnoot,
  Nowrap,
  ul: (props: ComponentPropsWithoutRef<"ul">) => <ul className="rule-list" {...props} />,
  ol: (props: ComponentPropsWithoutRef<"ol">) => <ol className="rule-list rule-list--numbered" {...props} />,
};

export async function ArticleBody({ source }: { source: string }) {
  const { content } = await compileMDX({
    source,
    components,
    options: {
      // Expressions like n={1} are needed; dangerous JS stays blocked.
      blockJS: false,
      mdxOptions: {
        remarkPlugins: [remarkNowrap],
        rehypePlugins: [rehypeSlug, rehypeKantlijn],
      },
    },
  });
  return content;
}
