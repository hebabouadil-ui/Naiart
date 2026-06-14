import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description:
    "Browse the complete collection of original paintings by Naïa Lemaire — abstract, modern, landscape and portrait works on canvas and linen, available directly from the Arles atelier.",
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
