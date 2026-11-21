import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";
import { PERSON_ID, breadcrumbJsonLd, graph } from "@/lib/structured-data";
import { KANTLIJN } from "./config";
import type { Article } from "./content";
import { TRACKS, type Track } from "./schema";

const BLOG_URL = absoluteUrl(KANTLIJN.basePath);
const AUTHOR_URL = absoluteUrl(KANTLIJN.author.aboutPath);

export const articlePath = (slug: string) => `${KANTLIJN.basePath}/${slug}`;
export const trackPath = (track: Track) => `${KANTLIJN.basePath}/${track}`;

export function frontMetadata(track?: Track): Metadata {
  const path = track ? trackPath(track) : KANTLIJN.basePath;
  const title = track ? `${TRACKS[track].label} · Kantlijn` : `Kantlijn · ${SITE_NAME}`;
  return {
    title,
    description: KANTLIJN.intro,
    alternates: {
      canonical: path,
      types: { "application/rss+xml": `${KANTLIJN.basePath}/rss.xml` },
    },
    openGraph: {
      type: "website",
      url: path,
      title,
      description: KANTLIJN.intro,
      locale: "nl_NL",
      siteName: SITE_NAME,
    },
  };
}

export function articleMetadata(a: Article): Metadata {
  const path = articlePath(a.slug);
  return {
    title: `${a.title} · Kantlijn`,
    description: a.standfirst,
    alternates: { canonical: path },
    authors: [{ name: KANTLIJN.author.name, url: AUTHOR_URL }],
    openGraph: {
      type: "article",
      url: path,
      title: a.title,
      description: a.standfirst,
      locale: "nl_NL",
      publishedTime: a.published,
      modifiedTime: a.updated,
      authors: [AUTHOR_URL],
      siteName: SITE_NAME,
    },
    twitter: { card: "summary_large_image", title: a.title, description: a.standfirst },
  };
}

const author = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: KANTLIJN.author.name,
  url: AUTHOR_URL,
  jobTitle: "Coach",
  knowsAbout: ["PSYCH-K", "coaching", "GGZ"],
};

const publisher = { "@type": "Organization", name: SITE_NAME, url: SITE_URL };

export function blogJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: KANTLIJN.name,
    url: BLOG_URL,
    description: KANTLIJN.intro,
    inLanguage: "nl-NL",
    author: { "@type": "Person", "@id": PERSON_ID, name: KANTLIJN.author.name, url: AUTHOR_URL },
    publisher,
  };
}

export function articleJsonLd(a: Article) {
  const url = absoluteUrl(articlePath(a.slug));
  return graph(
    {
      "@type": "BlogPosting",
      "@id": `${url}#artikel`,
      headline: a.title,
      description: a.standfirst,
      inLanguage: "nl-NL",
      datePublished: a.published,
      dateModified: a.updated,
      mainEntityOfPage: url,
      image: `${url}/opengraph-image`,
      author,
      publisher,
      isPartOf: { "@type": "Blog", name: KANTLIJN.name, url: BLOG_URL },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: KANTLIJN.name, item: BLOG_URL },
        { "@type": "ListItem", position: 2, name: TRACKS[a.track].label, item: absoluteUrl(trackPath(a.track)) },
        { "@type": "ListItem", position: 3, name: a.title },
      ],
    },
  );
}

export function trackJsonLd(track: Track) {
  return graph(
    {
      "@type": "CollectionPage",
      name: `${TRACKS[track].label} · ${KANTLIJN.name}`,
      url: absoluteUrl(trackPath(track)),
      inLanguage: "nl-NL",
      isPartOf: { "@type": "Blog", name: KANTLIJN.name, url: BLOG_URL },
    },
    breadcrumbJsonLd([
      { name: KANTLIJN.name, path: KANTLIJN.basePath },
      { name: TRACKS[track].label, path: trackPath(track) },
    ]),
  );
}
