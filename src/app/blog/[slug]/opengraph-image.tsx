import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getArticle, getArticles } from "@/lib/kantlijn/content";
import { TRACKS, nr } from "@/lib/kantlijn/schema";

export const alt = "Kantlijn, de blog van Coachingpraktijk De Leeuw";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

const colors = {
  cream: "#FAF7F2",
  brown: "#3B3229",
  inkSoft: "#5A5047",
  grachtwater: "#4F6E78",
  kastanje: "#A85A3A",
};

export default async function ArticleOpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  const [loraItalic, loraMedium, dmSans] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/lora-italic.woff")),
    readFile(join(process.cwd(), "src/assets/fonts/lora-medium.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/dmsans-medium.ttf")),
  ]);
  const track = article?.track ?? "psych-k";
  const trackColor = track === "psych-k" ? colors.grachtwater : colors.kastanje;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: colors.cream,
          padding: "56px 80px 64px",
          color: colors.brown,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: `2px solid ${colors.brown}`,
            paddingBottom: 18,
          }}
        >
          <span style={{ fontFamily: "Lora Italic", fontSize: 64, letterSpacing: "-0.03em" }}>Kantlijn</span>
          <span style={{ fontFamily: "DM Sans", fontSize: 26, color: trackColor }}>
            {article ? `${TRACKS[track].label} · nr. ${nr(article.number)}` : ""}
          </span>
        </div>

        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "flex-end" }}>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              columnGap: "0.26em",
              maxWidth: 860,
              backgroundColor: colors.grachtwater,
              color: colors.cream,
              borderRadius: "40px 40px 10px 40px",
              padding: "32px 44px",
              fontFamily: "Lora",
              fontSize: 50,
              lineHeight: 1.25,
            }}
          >
            {(article?.readerQuestion ?? "Notities van Mirjam de Leeuw").split(" ").map((word, i) => (
              <span key={i}>{word}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontFamily: "DM Sans", fontSize: 24, color: colors.inkSoft }}>
          <span>Mirjam de Leeuw</span>
          <span>Coachingpraktijk De Leeuw · Leiden</span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Lora Italic", data: loraItalic, style: "italic", weight: 400 },
        { name: "Lora", data: loraMedium, style: "normal", weight: 500 },
        { name: "DM Sans", data: dmSans, style: "normal", weight: 500 },
      ],
    }
  );
}
