import type { MetadataRoute } from "next";
import { BRAND } from "@/lib/data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BRAND.full} — ${BRAND.signature}`,
    short_name: BRAND.signature,
    description:
      "The official online gallery of contemporary painter Naïa Lemaire.",
    start_url: "/",
    display: "standalone",
    background_color: "#0E0D0B",
    theme_color: "#0E0D0B",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
  };
}
