import type { Metadata } from "next";
import FrontPage from "@/components/kantlijn/FrontPage";
import JsonLd from "@/components/JsonLd";
import { blogJsonLd, frontMetadata } from "@/lib/kantlijn/seo";

export const metadata: Metadata = frontMetadata();

export default function KantlijnPage() {
  return (
    <>
      <JsonLd data={blogJsonLd()} />
      <FrontPage />
    </>
  );
}
