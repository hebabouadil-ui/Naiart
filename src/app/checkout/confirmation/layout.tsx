import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description:
    "Thank you for your acquisition. Your certificate of authenticity and white-glove shipping details will follow by email.",
};

export default function ConfirmationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
