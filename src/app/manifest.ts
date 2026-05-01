import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coachingpraktijk De Leeuw",
    short_name: "De Leeuw",
    description: "Coaching & gezinsbegeleiding in Leiden",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#5E6B52",
    lang: "nl-NL",
    icons: [
      {
        src: "/favicon-mirjam/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/favicon-mirjam/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
