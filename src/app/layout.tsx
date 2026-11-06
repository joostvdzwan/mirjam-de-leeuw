import type { Metadata, Viewport } from "next";
import { Lora, DM_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import content from "@/content/nl.json";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { businessJsonLd, graph, personJsonLd } from "@/lib/structured-data";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: content.siteTitle,
  description: content.siteDescription,
  keywords: [
    "PSYCH-K",
    "PSYCH-K coaching Leiden",
    "psycholoog coaching Leiden",
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
    siteName: SITE_NAME,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: content.siteTitle,
    description: content.siteDescription,
  },
  applicationName: SITE_NAME,
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
  return (
    <html lang="nl-NL" className={`${lora.variable} ${dmSans.variable}`}>
      <head>
        <JsonLd data={graph(businessJsonLd(), personJsonLd())} />
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
