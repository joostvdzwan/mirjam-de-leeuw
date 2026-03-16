import type { Metadata } from "next";
import { Lora, DM_Sans } from "next/font/google";
import "./globals.css";
import content from "@/content/nl.json";

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
  openGraph: {
    title: content.siteTitle,
    description: content.siteDescription,
    locale: "nl_NL",
    type: "website",
    siteName: "Praktijk De Leeuw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Praktijk De Leeuw",
    description: content.siteDescription,
    url: "https://praktijkdeleeuw.nl",
    email: "info@praktijkdeleeuw.nl",
    areaServed: {
      "@type": "City",
      name: "Leiden",
    },
    serviceType: [
      "Wandelcoaching",
      "Online coaching",
      "Gezinsbegeleiding",
    ],
    priceRange: "€95 - €105",
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
        {children}
      </body>
    </html>
  );
}
