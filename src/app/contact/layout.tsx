import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Reach the atelier of Naïa Lemaire in Arles, Provence. Enquiries about original works, commissions, exhibitions and press.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
