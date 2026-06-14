import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Selection",
  description:
    "Review the original works you have selected from the Naïa Lemaire collection — each delivered with a signed certificate of authenticity and white-glove shipping.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
