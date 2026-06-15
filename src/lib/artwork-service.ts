import "server-only";
import { prisma, dbEnabled } from "./db";
import { artworks as seed } from "./data";
import type { Artwork, CollectionSlug } from "./types";

/**
 * Server-side artwork access. Reads from Postgres when DATABASE_URL is set,
 * otherwise returns the bundled seed catalogue so the demo never breaks.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function toArtwork(row: any): Artwork {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    year: row.year,
    price: row.price,
    collection: row.collection as CollectionSlug,
    medium: row.medium,
    dimensions: row.dimensions,
    description: row.description,
    story: row.story ?? "",
    images: row.images?.length ? row.images : seed[0].images,
    dominantColor: row.dominantColor,
    colorName: row.colorName,
    availability: row.availability,
    stock: row.stock,
    featured: row.featured,
    limited: row.limited,
    newArrival: row.newArrival,
    popularity: row.popularity,
    createdAt:
      row.createdAt instanceof Date
        ? row.createdAt.toISOString().slice(0, 10)
        : String(row.createdAt),
    orientation: row.orientation,
  };
}

export async function getAllArtworks(): Promise<Artwork[]> {
  if (!dbEnabled) return seed;
  try {
    const rows = await prisma.artwork.findMany({
      where: { archived: false },
      orderBy: { createdAt: "desc" },
    });
    return rows.length ? rows.map(toArtwork) : seed;
  } catch {
    return seed;
  }
}

export async function getArtworkBySlug(slug: string): Promise<Artwork | undefined> {
  if (!dbEnabled) return seed.find((a) => a.slug === slug);
  try {
    const row = await prisma.artwork.findUnique({ where: { slug } });
    return row ? toArtwork(row) : seed.find((a) => a.slug === slug);
  } catch {
    return seed.find((a) => a.slug === slug);
  }
}

export async function getFeaturedArtworks(): Promise<Artwork[]> {
  const all = await getAllArtworks();
  const featured = all.filter((a) => a.featured);
  return featured.length ? featured : all.slice(0, 6);
}
