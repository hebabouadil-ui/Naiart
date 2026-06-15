import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Commission",
  description:
    "Commission an original painting by Rabia Nainia — a bespoke work conceived in dialogue with your space, story, and light, created in the Arles atelier.",
};

export default function CommissionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
