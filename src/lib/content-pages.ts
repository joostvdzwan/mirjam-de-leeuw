import type { StaticImageData } from "next/image";
import content from "@/content/nl.json";
import psychkPhoto from "@/assets/mirjam-psychk-spiertest.jpg";
import walkingPhoto from "@/assets/mirjam-wandelcoaching.jpg";
import portraitPhoto from "@/assets/mirjam-portret-hero.jpg";
import seatedPhoto from "@/assets/mirjam-portret-zittend.jpg";
import conversationPhoto from "@/assets/mirjam-gesprek-jongere.jpg";

export type PageSlug = keyof typeof content.pages;

export interface ContentSection {
  heading: string;
  paragraphs?: string[];
  items?: string[];
  aboutMeParagraphs?: [number, number];
  quote?: string;
  variant?: "credentials";
}

export interface ContentPageData {
  label: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  heading: string;
  intro: string;
  image: keyof typeof pageImages;
  imageAlt: string;
  priceCard?: string;
  sections: ContentSection[];
  faq: { question: string; answer: string }[];
  related: PageSlug[];
}

export const pageImages = {
  psychk: psychkPhoto,
  walking: walkingPhoto,
  portrait: portraitPhoto,
  seated: seatedPhoto,
  conversation: conversationPhoto,
} satisfies Record<string, StaticImageData>;

export const pagePath = (slug: PageSlug) => `/${slug}`;

export function getPage(slug: PageSlug): ContentPageData {
  return content.pages[slug] as ContentPageData;
}

export const pageSlugs = Object.keys(content.pages) as PageSlug[];

export function sectionParagraphs(section: ContentSection): string[] {
  if (section.aboutMeParagraphs) {
    const [start, end] = section.aboutMeParagraphs;
    return content.aboutMe.paragraphs.slice(start, end);
  }
  return section.paragraphs ?? [];
}

export function pageGroup(slug: PageSlug) {
  return content.footerLinks.find((group) => group.links.includes(slug))
    ?.heading;
}

export function getPriceCard(title?: string) {
  return content.pricing.cards.find((card) => card.title === title);
}
