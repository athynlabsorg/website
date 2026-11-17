import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Share-card image. Satori can't read Tailwind tokens, so the spec §6 hex values are repeated here.
const SNOW = "#FFFFFF";
const SPRUCE = "#0B2B1F";
const EVERGREEN = "#14704A";
const ALPENGLOW = "#F7B49A";

export const alt = "Athyn Labs: we build software that pays attention.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const [bricolage, serif] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/bricolage-800.ttf")),
    readFile(join(process.cwd(), "assets/fonts/instrument-serif-italic.ttf")),
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
          padding: "72px 80px",
          background: SNOW,
          color: SPRUCE,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="56" height="43" viewBox="0 0 34 26">
            <path d="M1 25 L12 6 L18 15 L23 9 L33 25 Z" fill={SPRUCE} />
            <path d="M12 6 L15.5 12 L13 11 L10.5 13 Z" fill={SNOW} />
            <circle cx="27" cy="5" r="3.5" fill={ALPENGLOW} />
          </svg>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: 40, letterSpacing: "-0.03em" }}>
            athyn
            <span style={{ fontFamily: "InstrumentSerif", color: EVERGREEN, marginLeft: 10 }}>labs</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
          <div style={{ fontFamily: "Bricolage", fontSize: 100, letterSpacing: "-0.045em" }}>We build software that</div>
          <div style={{ fontFamily: "InstrumentSerif", fontSize: 120, color: EVERGREEN, letterSpacing: "-0.02em" }}>
            pays attention.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: bricolage, weight: 800, style: "normal" },
        { name: "InstrumentSerif", data: serif, weight: 400, style: "italic" },
      ],
    },
  );
}
