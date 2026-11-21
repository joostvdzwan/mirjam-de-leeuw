import type { Metadata } from "next";
import FrontPage from "@/components/kantlijn/FrontPage";
import JsonLd from "@/components/JsonLd";
import { frontMetadata, trackJsonLd } from "@/lib/kantlijn/seo";

export const metadata: Metadata = frontMetadata("psych-k");

export default function PsychKTrackPage() {
  return (
    <>
      <JsonLd data={trackJsonLd("psych-k")} />
      <FrontPage track="psych-k" />
    </>
  );
}
