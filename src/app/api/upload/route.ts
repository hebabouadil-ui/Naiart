import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";
import { cloudinaryEnabled, signUpload } from "@/lib/cloudinary";

/**
 * Returns a short-lived Cloudinary signature so the admin browser can
 * upload an image directly to Cloudinary. Admin-only.
 */
export async function POST() {
  if (!(await isAdmin())) {
    return NextResponse.json({ ok: false, error: "Unauthorized" }, { status: 401 });
  }
  if (!cloudinaryEnabled) {
    return NextResponse.json(
      { ok: false, error: "Cloudinary is not configured." },
      { status: 503 },
    );
  }
  return NextResponse.json({ ok: true, ...signUpload() });
}
