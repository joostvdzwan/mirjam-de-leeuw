import content from "@/content/nl.json";
import mirjamHero from "@/assets/mirjam-portret-hero.jpg";
import { SITE_NAME, SITE_URL, absoluteUrl } from "./site";

export const BUSINESS_ID = `${SITE_URL}/#praktijk`;
export const PERSON_ID = `${SITE_URL}/over-mirjam#mirjam`;

const toAmount = (price: string) => price.replace(/[^\d,.]/g, "").replace(",", ".");

export function personJsonLd() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Mirjam van der Zwan - de Leeuw",
    jobTitle: "Psycholoog (MSc) en coach",
    url: absoluteUrl("/over-mirjam"),
    image: absoluteUrl(mirjamHero.src),
    worksFor: { "@id": BUSINESS_ID },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Universiteit Leiden",
      sameAs: "https://www.universiteitleiden.nl",
    },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: "MSc Kinder- en Jeugdpsychologie",
        credentialCategory: "degree",
        recognizedBy: {
          "@type": "CollegeOrUniversity",
          name: "Universiteit Leiden",
        },
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: "SKJ-registratie 130005177",
        credentialCategory: "registration",
        recognizedBy: {
          "@type": "Organization",
          name: "Stichting Kwaliteitsregister Jeugd (SKJ)",
          url: "https://skjeugd.nl",
        },
      },
    ],
    knowsAbout: [
      "PSYCH-K®",
      "Kinder- en jeugdpsychologie",
      "Gezinsdynamiek",
      "Systeemgerichte coaching",
      "Wandelcoaching",
    ],
  };
}

export function businessJsonLd() {
  const { pricing, contact } = content;

  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: SITE_NAME,
    description: content.siteDescription,
    url: SITE_URL,
    email: contact.email,
    telephone: contact.phone.replace(/\s/g, ""),
    image: absoluteUrl(mirjamHero.src),
    logo: `${SITE_URL}/icons/icon-512.png`,
    inLanguage: "nl-NL",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Leiden",
      addressRegion: "Zuid-Holland",
      addressCountry: "NL",
    },
    areaServed: { "@type": "City", name: "Leiden" },
    serviceType: pricing.cards.map((card) => card.title),
    priceRange: "€95 - €125",
    founder: { "@id": PERSON_ID },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Coaching",
      itemListElement: pricing.cards.map((card) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: card.title },
        price: toAmount(card.price),
        priceCurrency: "EUR",
        description: `${card.subtitle}, ${card.unit}`,
      })),
    },
  };
}

export function serviceJsonLd({
  name,
  description,
  path,
  price,
}: {
  name: string;
  description: string;
  path: string;
  price?: string;
}) {
  return {
    "@type": "Service",
    name,
    description,
    url: absoluteUrl(path),
    serviceType: name,
    provider: { "@id": BUSINESS_ID },
    areaServed: { "@type": "City", name: "Leiden" },
    ...(price && {
      offers: {
        "@type": "Offer",
        price: toAmount(price),
        priceCurrency: "EUR",
      },
    }),
  };
}

export function breadcrumbJsonLd(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}
