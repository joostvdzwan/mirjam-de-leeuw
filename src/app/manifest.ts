import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Coachingpraktijk De Leeuw",
    short_name: "De Leeuw",
    description: "Coaching in Leiden",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF7F2",
    theme_color: "#5E6B52",
    lang: "nl-NL",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icons/icon-maskable-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
