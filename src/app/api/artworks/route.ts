import { NextResponse } from "next/server";
import { prisma, dbEnabled } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";
import { getAllArtworks } from "@/lib/artwork-service";

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET() {
  const items = await getAllArtworks();
  return NextResponse.json({ ok: true, items });
}

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!dbEnabled) {
    return NextResponse.json(
      { ok: false, error: "Database not configured." },
      { status: 503 },
    );
  }

  const body = await req.json().catch(() => null);
  if (!body?.title) {
    return NextResponse.json({ ok: false, error: "Title required." }, { status: 400 });
  }

  let slug = slugify(body.title);
  // ensure uniqueness
  if (await prisma.artwork.findUnique({ where: { slug } })) {
    slug = `${slug}-${Date.now().toString(36)}`;
  }

  const created = await prisma.artwork.create({
    data: {
      slug,
      title: body.title,
      year: Number(body.year) || new Date().getFullYear(),
      price: Number(body.price) || 0,
      collection: body.collection || "abstract",
      medium: body.medium || "",
      dimensions: body.dimensions || "",
      description: body.description || "",
      story: body.story || body.description || "",
      images: Array.isArray(body.images) ? body.images : [],
      dominantColor: body.dominantColor || "#B8924A",
      colorName: body.colorName || "Amber",
      availability: body.availability || "available",
      stock: Number(body.stock) || 1,
      featured: Boolean(body.featured),
      limited: Boolean(body.limited),
      newArrival: body.newArrival ?? true,
      orientation: body.orientation || "portrait",
    },
  });

  return NextResponse.json({ ok: true, item: created });
}
