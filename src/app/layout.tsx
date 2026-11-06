import type { Metadata, Viewport } from "next";
import { Lora, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import content from "@/content/nl.json";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const SITE_URL = "https://coachingpraktijk.deleeuw.nl";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: content.siteTitle,
  description: content.siteDescription,
  keywords: [
    "wandelcoaching",
    "wandelcoaching Leiden",
    "coaching Leiden",
    "gezinscoaching",
    "coaching jongeren",
    "systeemgerichte coaching",
    "online coaching",
    "overprikkeling",
    "burn-out coaching",
  ],
  alternates: {
    canonical: "/",
    languages: { "nl-NL": "/" },
  },
  openGraph: {
    title: content.siteTitle,
    description: content.siteDescription,
    locale: "nl_NL",
    type: "website",
    siteName: "Coachingpraktijk De Leeuw",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: content.siteTitle,
    description: content.siteDescription,
  },
  applicationName: "Coachingpraktijk De Leeuw",
  appleWebApp: {
    title: "De Leeuw",
  },
};

export const viewport: Viewport = {
  themeColor: "#5E6B52",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Coachingpraktijk De Leeuw",
    description: content.siteDescription,
    url: SITE_URL,
    email: "mirjam@deleeuw.nl",
    image: `${SITE_URL}/opengraph-image`,
    logo: `${SITE_URL}/icons/icon-512.png`,
    inLanguage: "nl-NL",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Leiden",
      addressRegion: "Zuid-Holland",
      addressCountry: "NL",
    },
    areaServed: {
      "@type": "City",
      name: "Leiden",
    },
    serviceType: [
      "Wandelcoaching",
      "Online coaching",
    ],
    priceRange: "€110 - €125",
  };

  return (
    <html lang="nl-NL" className={`${lora.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-to-content">
          Ga naar inhoud
        </a>
        <Navigation />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
