import { NextResponse } from "next/server";
import { prisma, dbEnabled } from "@/lib/db";
import { isAdmin } from "@/lib/admin-auth";

type Ctx = { params: Promise<{ id: string }> };

export async function PATCH(req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!dbEnabled) {
    return NextResponse.json(
      { ok: false, error: "Database not configured." },
      { status: 503 },
    );
  }
  const { id } = await params;
  const body = await req.json().catch(() => ({}));

  const data: Record<string, unknown> = {};
  for (const k of [
    "title",
    "price",
    "collection",
    "medium",
    "dimensions",
    "description",
    "story",
    "images",
    "availability",
    "stock",
    "featured",
    "limited",
    "newArrival",
    "archived",
    "orientation",
    "year",
  ]) {
    if (k in body) data[k] = body[k];
  }
  if ("price" in data) data.price = Number(data.price) || 0;
  if ("stock" in data) data.stock = Number(data.stock) || 0;

  const updated = await prisma.artwork.update({ where: { id }, data });
  return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!dbEnabled) {
    return NextResponse.json(
      { ok: false, error: "Database not configured." },
      { status: 503 },
    );
  }
  const { id } = await params;
  await prisma.artwork.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
