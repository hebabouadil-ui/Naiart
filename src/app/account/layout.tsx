import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collector Account",
  description:
    "Your private collector account — order history, saved works, and profile.",
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
