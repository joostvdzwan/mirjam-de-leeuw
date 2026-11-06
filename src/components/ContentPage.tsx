import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Briefcase,
  Check,
  EnvelopeSimple,
  GraduationCap,
  IdentificationCard,
  Phone,
  UsersThree,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import content from "@/content/nl.json";
import JsonLd from "./JsonLd";
import MotionFadeIn from "./motion/MotionFadeIn";
import { StaggerContainer, StaggerItem } from "./motion/MotionStagger";
import seatedPhoto from "@/assets/mirjam-portret-zittend.jpg";
import {
  type ContentSection,
  type PageSlug,
  getPage,
  getPriceCard,
  pageGroup,
  pageImages,
  pagePath,
  sectionParagraphs,
} from "@/lib/content-pages";
import {
  PERSON_ID,
  breadcrumbJsonLd,
  graph,
  serviceJsonLd,
} from "@/lib/structured-data";
import { SITE_NAME, absoluteUrl } from "@/lib/site";

const { contentPage, aboutPractice, aboutMe, contact } = content;

const credentialIcons: Icon[] = [
  GraduationCap,
  IdentificationCard,
  Briefcase,
  UsersThree,
];

export function contentPageMetadata(slug: PageSlug): Metadata {
  const page = getPage(slug);
  const path = pagePath(slug);
  const images = [
    { url: "/opengraph-image", width: 1200, height: 630, alt: page.metaTitle },
  ];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: path },
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: path,
      type: slug === "over-mirjam" ? "profile" : "website",
      locale: "nl_NL",
      siteName: SITE_NAME,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: page.metaTitle,
      description: page.metaDescription,
      images,
    },
  };
}

function pageJsonLd(slug: PageSlug) {
  const page = getPage(slug);
  const path = pagePath(slug);
  const breadcrumb = breadcrumbJsonLd([
    { name: contentPage.homeLabel, path: "/" },
    { name: page.label, path },
  ]);

  if (slug === "over-mirjam") {
    return graph(
      {
        "@type": "ProfilePage",
        url: absoluteUrl(path),
        name: page.metaTitle,
        mainEntity: { "@id": PERSON_ID },
      },
      breadcrumb
    );
  }

  return graph(
    serviceJsonLd({
      name: page.heading,
      description: page.metaDescription,
      path,
      price: getPriceCard(page.priceCard)?.price,
    }),
    breadcrumb
  );
}

function SectionItems({ section }: { section: ContentSection }) {
  if (!section.items) return null;

  if (section.variant === "credentials") {
    return (
      <StaggerContainer className="grid gap-4 sm:grid-cols-2">
        {section.items.map((item, i) => {
          const ItemIcon = credentialIcons[i % credentialIcons.length];
          return (
            <StaggerItem key={item} variant="scaleIn">
              <div className="flex h-full flex-col gap-4 rounded-2xl border border-sage/25 bg-cream p-6">
                <span className="inline-flex size-12 items-center justify-center rounded-full bg-sage/10 text-sage-dark">
                  <ItemIcon size={24} aria-hidden="true" />
                </span>
                <p className="body-md body-md-medium text-brown">{item}</p>
              </div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    );
  }

  return (
    <ul className="space-y-4 rounded-2xl border border-sage/25 bg-cream p-6 md:p-8">
      {section.items.map((item) => (
        <li
          key={item}
          className="body-lg body-lg-regular flex gap-3 text-brown-muted"
        >
          <Check
            size={22}
            weight="bold"
            className="mt-[0.2em] shrink-0 text-sage"
            aria-hidden="true"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

function PageSection({ section }: { section: ContentSection }) {
  const paragraphs = sectionParagraphs(section);

  return (
    <MotionFadeIn>
      <h2 className="heading-lg heading-lg-medium mb-5 text-brown">
        {section.heading}
      </h2>
      {paragraphs.length > 0 && (
        <div className="space-y-4">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="body-lg body-lg-regular text-brown-muted">
              {paragraph}
            </p>
          ))}
        </div>
      )}
      <SectionItems section={section} />
      {section.quote && (
        <blockquote className="mt-8 border-l-4 border-sage py-2 pl-6">
          <p className="quote text-brown">{section.quote}</p>
        </blockquote>
      )}
    </MotionFadeIn>
  );
}

function Aside({ slug }: { slug: PageSlug }) {
  const page = getPage(slug);
  const priceCard = getPriceCard(page.priceCard);

  return (
    <aside className="space-y-6 lg:sticky lg:top-28">
      {priceCard && (
        <MotionFadeIn className="rounded-2xl border border-sage/25 bg-cream p-6 md:p-8">
          <p className="label-md label-md-medium mb-2 uppercase tracking-[0.12em] text-sage-dark">
            {contentPage.priceLabel}
          </p>
          <p className="heading-md heading-md-medium text-brown">
            {priceCard.title}
          </p>
          <p className="mt-2 text-brown">
            <span className="display-sm display-sm-medium">{priceCard.price}</span>{" "}
            <span className="body-sm body-sm-regular text-brown-muted">
              {priceCard.unit} · {priceCard.subtitle}
            </span>
          </p>
          <p className="body-sm body-sm-regular mt-2 mb-6 text-brown-muted">
            {content.pricing.intro}
          </p>
          <Link
            href="/#contact"
            className="label-md label-md-medium inline-flex w-full items-center justify-center rounded-full bg-sage-dark px-6 py-3.5 text-white transition-colors hover:bg-sage"
          >
            {priceCard.cta}
          </Link>
        </MotionFadeIn>
      )}

      <MotionFadeIn
        delay={0.1}
        className="rounded-2xl border border-brown/5 bg-cream p-6 md:p-8"
      >
        <p className="heading-md heading-md-medium mb-2 text-brown">
          {contentPage.ctaHeading}
        </p>
        <p className="body-sm body-sm-regular mb-5 text-brown-muted">
          {contentPage.ctaText}
        </p>
        {!priceCard && (
          <Link
            href="/#contact"
            className="label-md label-md-medium mb-5 inline-flex w-full items-center justify-center rounded-full bg-sage-dark px-6 py-3.5 text-white transition-colors hover:bg-sage"
          >
            {contentPage.ctaButton}
          </Link>
        )}
        <ul className="space-y-3">
          <li>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="body-sm body-sm-medium flex items-center gap-3 text-sage-dark transition-colors hover:text-sage"
            >
              <Phone size={20} aria-hidden="true" />
              <span>
                <span className="sr-only">{contentPage.phoneLabel}: </span>
                {contact.phone}
              </span>
            </a>
          </li>
          <li>
            <a
              href={`mailto:${contact.email}`}
              className="body-sm body-sm-medium flex items-center gap-3 text-sage-dark transition-colors hover:text-sage"
            >
              <EnvelopeSimple size={20} aria-hidden="true" />
              <span>
                <span className="sr-only">{contentPage.emailLabel}: </span>
                {contact.email}
              </span>
            </a>
          </li>
        </ul>
      </MotionFadeIn>

      {slug !== "over-mirjam" && (
        <MotionFadeIn delay={0.2}>
          <Link
            href={pagePath("over-mirjam")}
            className="group flex items-center gap-4 rounded-2xl border border-brown/5 bg-cream p-4 pr-6 transition-colors hover:border-sage/30"
          >
            <Image
              src={seatedPhoto}
              alt=""
              className="photo-warm size-16 shrink-0 rounded-full object-cover object-top"
              sizes="64px"
            />
            <span className="min-w-0 flex-1">
              <span className="body-md body-md-medium block text-brown">
                {aboutMe.heading}
              </span>
              <span className="body-sm body-sm-regular block text-brown-muted">
                {contentPage.credentialLine}
              </span>
            </span>
            <ArrowRight
              size={20}
              className="shrink-0 text-sage-dark transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
            <span className="sr-only">{contentPage.aboutLabel}</span>
          </Link>
        </MotionFadeIn>
      )}

      <p className="body-xs body-xs-regular px-1 text-brown-muted">
        <span className="body-xs-medium text-brown">
          {aboutPractice.disclaimer.heading}
        </span>{" "}
        {aboutPractice.disclaimer.text}
      </p>
    </aside>
  );
}

export default function ContentPage({ slug }: { slug: PageSlug }) {
  const page = getPage(slug);

  return (
    <main id="main-content" className="bg-cream">
      <JsonLd data={pageJsonLd(slug)} />

      <section className="pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <MotionFadeIn variant="fadeIn">
              <nav aria-label="Kruimelpad" className="mb-4">
                <ol className="body-xs body-xs-regular flex gap-2 text-brown-muted">
                  <li>
                    <Link href="/" className="transition-colors hover:text-sage-dark">
                      {contentPage.homeLabel}
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page">{page.label}</li>
                </ol>
              </nav>
              <p className="heading-sm heading-sm-medium mb-3 text-sage-dark">
                {page.eyebrow}
              </p>
            </MotionFadeIn>
            <h1 className="display-lg display-lg-regular mb-8 text-balance text-brown">
              {page.heading}
            </h1>
            <MotionFadeIn delay={0.15}>
              <p className="body-lg body-lg-regular max-w-xl text-brown-muted">
                {page.intro}
              </p>
            </MotionFadeIn>
          </div>
          <div className="relative max-w-sm sm:max-w-md lg:col-span-5 lg:max-w-none">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-3xl border border-sage/50"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-3xl">
              <Image
                src={pageImages[page.image]}
                alt={page.imageAlt}
                className="photo-warm aspect-4/5 h-auto w-full object-cover object-top"
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 38vw, 448px"
                placeholder="blur"
                quality={85}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 lg:grid-cols-12 lg:gap-16">
          <div className="space-y-14 lg:col-span-7">
            {page.sections.map((section) => (
              <PageSection key={section.heading} section={section} />
            ))}
          </div>
          <div className="lg:col-span-5">
            <Aside slug={slug} />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          {page.faq.length > 0 && (
            <MotionFadeIn className="mb-20 lg:w-7/12">
              <h2 className="display-md display-md-regular mb-10 text-brown">
                {contentPage.faqHeading}
              </h2>
              <dl>
                {page.faq.map((item) => (
                  <div
                    key={item.question}
                    className="border-t border-brown/10 py-6 last:border-b"
                  >
                    <dt className="heading-md heading-md-medium mb-2 text-brown">
                      {item.question}
                    </dt>
                    <dd className="body-lg body-lg-regular text-brown-muted">
                      {item.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </MotionFadeIn>
          )}

          <MotionFadeIn className="mb-20 rounded-3xl bg-sage-dark p-8 text-cream md:p-12">
            <h2 className="display-sm display-sm-regular mb-4">
              {contentPage.ctaHeading}
            </h2>
            <p className="body-lg body-lg-regular mb-8 max-w-xl opacity-90">
              {contentPage.ctaText}
            </p>
            <Link
              href="/#contact"
              className="label-md label-md-medium inline-flex items-center justify-center rounded-full bg-cream px-8 py-3.5 text-sage-dark transition-colors hover:bg-white"
            >
              {contentPage.ctaButton}
            </Link>
          </MotionFadeIn>

          <h2 className="heading-md heading-md-medium mb-6 text-brown">
            {contentPage.relatedHeading}
          </h2>
          <StaggerContainer className="grid gap-4 md:grid-cols-3">
            {page.related.map((relatedSlug) => {
              const related = getPage(relatedSlug);
              return (
                <StaggerItem key={relatedSlug}>
                  <Link
                    href={pagePath(relatedSlug)}
                    className="group flex h-full flex-col rounded-2xl border border-brown/5 bg-sand p-6 transition-all duration-300 hover:-translate-y-1 hover:border-sage/30 hover:shadow-lg"
                  >
                    <span className="label-md label-md-medium mb-2 uppercase tracking-[0.12em] text-sage-dark">
                      {pageGroup(relatedSlug)}
                    </span>
                    <span className="heading-md heading-md-medium mb-2 text-brown">
                      {related.label}
                    </span>
                    <span className="body-sm body-sm-regular mb-6 text-brown-muted">
                      {related.summary}
                    </span>
                    <ArrowRight
                      size={20}
                      className="mt-auto text-sage-dark transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </Link>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
