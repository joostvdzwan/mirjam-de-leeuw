import type { Metadata } from "next";
import Link from "next/link";
import NotesIndex from "@/components/kantlijn/NotesIndex";
import { KANTLIJN } from "@/lib/kantlijn/config";
import { getPublished, getUpcoming } from "@/lib/kantlijn/content";

export const metadata: Metadata = {
  title: "Notitie niet gevonden · Kantlijn",
  robots: { index: false, follow: true },
};

export default function KantlijnNotFound() {
  return (
    <>
      <main id="main-content" className="container not-found">
        <p className="label">Niet gevonden</p>
        <h1 className="not-found__title">Deze notitie bestaat (nog) niet</h1>
        <p className="not-found__text">
          Misschien is de link veranderd, of schrijf ik er nog aan. Hieronder staat wat er al is.
        </p>
        <Link className="btn btn--outline btn--small" href={KANTLIJN.basePath}>
          Naar Kantlijn
        </Link>
        <div className="not-found__index">
          <NotesIndex published={getPublished()} upcoming={getUpcoming()} />
        </div>
      </main>
    </>
  );
}
