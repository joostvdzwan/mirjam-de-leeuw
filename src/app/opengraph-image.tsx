import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt =
  "Coachingpraktijk De Leeuw — Mirjam van der Zwan - de Leeuw, psycholoog (MSc) en coach in Leiden";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const colors = {
  cream: "#FAF7F2",
  sageDark: "#5E6B52",
};

const PHOTO_WIDTH = 500;

export default async function OpenGraphImage() {
  const [loraMedium, dmSansMedium, portrait] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/lora-medium.ttf")),
    readFile(join(process.cwd(), "src/assets/fonts/dmsans-medium.ttf")),
    readFile(join(process.cwd(), "src/assets/og-portrait.jpg")),
  ]);

  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          backgroundColor: colors.sageDark,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 32,
            padding: "0 64px 0 80px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Lora",
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: colors.cream,
            }}
          >
            <span>Meer rust</span>
            <span>in je hoofd.</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              fontFamily: "DM Sans",
              fontSize: 30,
              color: colors.cream,
              opacity: 0.8,
            }}
          >
            <span>Coaching in Leiden · vanaf 16 jaar</span>
            <span>Psycholoog (MSc) en coach</span>
          </div>
        </div>

        <img
          src={portraitSrc}
          width={PHOTO_WIDTH}
          height={size.height}
          alt=""
          style={{ objectFit: "cover" }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Lora", data: loraMedium, weight: 500, style: "normal" },
        { name: "DM Sans", data: dmSansMedium, weight: 500, style: "normal" },
      ],
    }
  );
}
