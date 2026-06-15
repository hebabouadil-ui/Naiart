import type { Metadata, Viewport } from "next";
import "./globals.css";
import { cormorant, inter, manrope, playfair } from "./fonts";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { Preloader } from "@/components/providers/Preloader";
import { Cursor } from "@/components/providers/Cursor";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { PageTransition } from "@/components/providers/PageTransition";
import { BRAND } from "@/lib/data";

const siteUrl = "https://naiart.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.full} — ${BRAND.tagline}`,
    template: `%s · ${BRAND.signature}`,
  },
  description:
    "The official online gallery of contemporary painter Rabia Nainia. Discover, explore, and acquire original paintings — abstract, modern, landscape, and portrait works from the Arles atelier.",
  keywords: [
    "original paintings",
    "contemporary art",
    "buy art online",
    "luxury art gallery",
    "abstract paintings",
    "Rabia Nainia",
    "Naiart",
    "art commission",
  ],
  authors: [{ name: BRAND.full }],
  creator: BRAND.full,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: BRAND.signature,
    title: `${BRAND.full} — ${BRAND.tagline}`,
    description:
      "Original paintings from the Arles atelier of Rabia Nainia. A luxury online gallery.",
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: BRAND.full }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.full} — ${BRAND.tagline}`,
    description: "Original paintings from the Arles atelier of Rabia Nainia.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
};

export const viewport: Viewport = {
  themeColor: "#0E0D0B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "VisualArtsEvent",
    name: BRAND.signature,
    url: siteUrl,
    creator: {
      "@type": "Person",
      name: BRAND.full,
      jobTitle: "Painter",
    },
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} ${manrope.variable}`}
    >
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Preloader />
          <Cursor />
          <SmoothScroll>
            <Navbar />
            <CartDrawer />
            <PageTransition>
              <main id="main">{children}</main>
              <Footer />
            </PageTransition>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
