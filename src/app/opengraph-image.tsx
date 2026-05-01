import { ImageResponse } from "next/og";
import content from "@/content/nl.json";

export const runtime = "edge";

export const alt = content.siteTitle;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const [loraRegular, loraMedium] = await Promise.all([
    fetch(
      "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkqg.ttf"
    ).then((res) => res.arrayBuffer()),
    fetch(
      "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787zhuxJBkqg.ttf"
    ).then((res) => res.arrayBuffer()),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px 96px",
          backgroundColor: "#FAF7F2",
          fontFamily: "Lora",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: "#5E6B52",
            fontSize: 24,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 256 256"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M223.45 40.07a8 8 0 0 0-7.52-7.52C139.8 28 78.74 51 52.32 94.36c-18.49 30.31-19.1 67.55-2.33 105.32L37.94 211.7a8 8 0 0 0 11.32 11.32l11.92-12c19.65 8.2 36.81 11.69 50.46 11.69 22.2 0 40.34-9 53.83-26 28.85-37.61 30.18-90.45 24.34-156.55Z"
              fill="#7C8C6E"
            />
          </svg>
          <span>Coachingpraktijk De Leeuw</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 28,
            maxWidth: 920,
          }}
        >
          <div
            style={{
              fontFamily: "LoraMedium",
              fontSize: 76,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "#3B3229",
            }}
          >
            Coaching & Gezinsbegeleiding in Leiden
          </div>
          <div
            style={{
              fontSize: 32,
              lineHeight: 1.4,
              color: "#7A6F63",
              fontFamily: "Lora",
            }}
          >
            Wandelcoaching, online coaching en systeemgerichte
            gezinsbegeleiding voor jongeren, ouders en volwassenen.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#5E6B52",
            fontSize: 24,
            fontFamily: "Lora",
          }}
        >
          <span>praktijkdeleeuw.nl</span>
          <span style={{ fontStyle: "italic" }}>
            Kosteloos kennismakingsgesprek
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Lora",
          data: loraRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "LoraMedium",
          data: loraMedium,
          weight: 500,
          style: "normal",
        },
      ],
    }
  );
}
