import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pagina niet gevonden — Coachingpraktijk De Leeuw",
  description:
    "De pagina die je zoekt bestaat niet of is verplaatst. Ga terug naar de homepagina.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="flex min-h-screen items-center justify-center bg-cream px-6 py-20"
    >
      <div className="mx-auto max-w-xl text-center">
        <p className="heading-sm heading-sm-medium mb-4 text-sage-dark">404</p>
        <h1 className="display-md display-md-regular mb-6 text-brown">
          Deze pagina bestaat niet meer
        </h1>
        <p className="body-lg body-lg-regular mb-10 text-brown-muted">
          Misschien is de link verplaatst of verouderd. Geen zorgen — ga terug
          naar de homepagina en je vindt vast wat je zocht.
        </p>
        <Link
          href="/"
          className="label-md label-md-medium inline-block rounded-full bg-sage-dark px-6 py-3 text-white transition-colors hover:bg-sage"
        >
          Terug naar home
        </Link>
      </div>
    </main>
  );
}
