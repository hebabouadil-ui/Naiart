import type { MetadataRoute } from "next";
import { artworks, collections, journal } from "@/lib/data";

const base = "https://naiart.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = [
    "",
    "/shop",
    "/collections",
    "/about",
    "/commission",
    "/journal",
    "/contact",
    "/account",
    "/cart",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const artworkRoutes = artworks.map((a) => ({
    url: `${base}/artwork/${a.slug}`,
    lastModified: new Date(a.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const collectionRoutes = collections.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const journalRoutes = journal.map((p) => ({
    url: `${base}/journal/${p.slug}`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...artworkRoutes,
    ...collectionRoutes,
    ...journalRoutes,
  ];
}
