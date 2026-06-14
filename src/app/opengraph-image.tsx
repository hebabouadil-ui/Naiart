import { ImageResponse } from "next/og";
import { BRAND } from "@/lib/data";

export const runtime = "edge";
export const alt = `${BRAND.full} — ${BRAND.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(120% 120% at 50% 0%, #1A1815 0%, #0E0D0B 70%)",
          color: "#F6F2EA",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            letterSpacing: 14,
            textTransform: "uppercase",
            color: "#D8B872",
          }}
        >
          {BRAND.signature}
        </div>
        <div style={{ fontSize: 150, fontStyle: "italic", marginTop: 8 }}>
          {BRAND.name}
        </div>
        <div
          style={{
            fontSize: 40,
            marginTop: 12,
            color: "rgba(246,242,234,0.75)",
          }}
        >
          {BRAND.tagline}
        </div>
        <div
          style={{
            marginTop: 40,
            width: 120,
            height: 2,
            background: "linear-gradient(90deg,#B8924A,#D8B872)",
          }}
        />
      </div>
    ),
    { ...size },
  );
}
