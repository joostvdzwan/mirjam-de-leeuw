import { type ArticleMeta, type Track, assertNoPlaceholders } from "./schema";

/**
 * Blog-wide copy and facts. Bracketed values are gaps Mirjam still has to fill in;
 * production builds fail while any remain (see assertKantlijnConfig).
 */
export const KANTLIJN = {
  name: "Kantlijn",
  basePath: "/blog",
  intro:
    "Notities van Mirjam de Leeuw over PSYCH-K, over werken met mensen en over wat ik meenam uit de GGZ.",
  stripIntro: "Notities van Mirjam de Leeuw over PSYCH-K, werken met mensen en de GGZ",
  crisisLine:
    "Acute nood? Bel 112 of je huisarts(enpost). Denk je aan zelfdoding? Bel 113 of gratis 0800-0113.",
  bookingSafety:
    "Niet voor acute hulp. Bij nood: 112 of je huisarts(enpost). Bij gedachten aan zelfdoding: 113 of 0800-0113.",
  replyTime: "[termijn]",
  instagramUrl: null as string | null,
  author: {
    name: "Mirjam de Leeuw",
    aboutPath: "/over-mirjam",
    cardBio: "Coach in Leiden. Werkte 6,5 jaar in de jeugd-GGZ. SKJ-registratie 130005177.",
    role: "Coach in Leiden",
    registration: "SKJ-registratie 130005177",
    registerUrl: "https://skjeugd.nl",
    ggz: "Werkte 6,5 jaar in de jeugd-GGZ en daarna als gedragswetenschapper in een Jeugdteam.",
  },
  /** Fallback for the booking links when JavaScript is off. */
  contactFallback: "/#contact",
} as const;

/** Used for the front page lead when its article has no photo of its own. */
export const TRACK_FALLBACK_PHOTO: Partial<Record<Track, NonNullable<ArticleMeta["photo"]>>> = {
  "psych-k": {
    src: "/kantlijn/singelpark-bank.jpg",
    alt: "Een bankje aan het water in het Singelpark in Leiden",
    focus: "40% 60%",
  },
  "mijn-verhaal": {
    src: "/kantlijn/mirjam-praktijk.jpg",
    alt: "Mirjam in gesprek met een cliënt op de bank in haar praktijk",
    focus: "53% 5%",
  },
};

export function assertKantlijnConfig() {
  const { replyTime, author } = KANTLIJN;
  assertNoPlaceholders("config", [replyTime, author.cardBio, author.ggz].join(" "));
}
