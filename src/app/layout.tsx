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

const SITE_URL = "https://praktijkdeleeuw.nl";

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
    "gezinsbegeleiding",
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
  icons: {
    icon: [
      { url: "/favicon-mirjam/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-mirjam/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-mirjam/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon-mirjam/favicon-128x128.png", sizes: "128x128", type: "image/png" },
      { url: "/favicon-mirjam/favicon-196x196.png", sizes: "196x196", type: "image/png" },
    ],
    apple: [
      { url: "/favicon-mirjam/apple-touch-icon-57x57.png", sizes: "57x57" },
      { url: "/favicon-mirjam/apple-touch-icon-60x60.png", sizes: "60x60" },
      { url: "/favicon-mirjam/apple-touch-icon-72x72.png", sizes: "72x72" },
      { url: "/favicon-mirjam/apple-touch-icon-76x76.png", sizes: "76x76" },
      { url: "/favicon-mirjam/apple-touch-icon-114x114.png", sizes: "114x114" },
      { url: "/favicon-mirjam/apple-touch-icon-120x120.png", sizes: "120x120" },
      { url: "/favicon-mirjam/apple-touch-icon-144x144.png", sizes: "144x144" },
      { url: "/favicon-mirjam/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/favicon-mirjam/apple-touch-icon-167x167.png", sizes: "167x167" },
      { url: "/favicon-mirjam/apple-touch-icon-180x180.png", sizes: "180x180" },
    ],
  },
  manifest: "/manifest.webmanifest",
  other: {
    "msapplication-TileColor": "#FFFFFF",
    "msapplication-TileImage": "/favicon-mirjam/mstile-144x144.png",
    "msapplication-square70x70logo": "/favicon-mirjam/mstile-70x70.png",
    "msapplication-square150x150logo": "/favicon-mirjam/mstile-150x150.png",
    "msapplication-wide310x150logo": "/favicon-mirjam/mstile-310x150.png",
    "msapplication-square310x310logo": "/favicon-mirjam/mstile-310x310.png",
    "application-name": "Coachingpraktijk De Leeuw",
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
    image: `${SITE_URL}/favicon-mirjam/android-chrome-512x512.png`,
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
      "Gezinsbegeleiding",
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
