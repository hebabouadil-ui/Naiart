import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artworks, getArtwork } from "@/lib/data";
import { ProductDetail } from "@/components/shop/ProductDetail";

export function generateStaticParams() {
  return artworks.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) return { title: "Artwork Not Found" };

  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} — Naiart`,
      description: artwork.description,
      type: "website",
      images: [{ url: artwork.images[0], alt: artwork.title }],
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtwork(slug);
  if (!artwork) notFound();

  const related = artworks
    .filter((a) => a.collection === artwork.collection && a.id !== artwork.id)
    .slice(0, 4);

  return <ProductDetail artwork={artwork} related={related} />;
}
