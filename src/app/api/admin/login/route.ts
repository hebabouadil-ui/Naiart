import { NextResponse } from "next/server";
import {
  checkAdminCredentials,
  createAdminSession,
  clearAdminSession,
} from "@/lib/admin-auth";

export async function POST(req: Request) {
  const { email, password } = await req.json().catch(() => ({}));
  if (!email || !password || !checkAdminCredentials(email, password)) {
    return NextResponse.json(
      { ok: false, error: "Invalid credentials." },
      { status: 401 },
    );
  }
  await createAdminSession();
  return NextResponse.json({ ok: true });
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ ok: true });
}
