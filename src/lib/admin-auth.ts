import "server-only";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

/**
 * Lightweight server-side admin session via a signed, HTTP-only cookie.
 * Credentials are validated against env vars (with safe demo defaults so
 * the dashboard keeps working before production secrets are configured).
 */

const COOKIE = "naiart_admin";
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@naiart.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "atelier";

function secret() {
  const s = process.env.AUTH_SECRET ?? "naiart-dev-secret-change-me";
  return new TextEncoder().encode(s);
}

export function checkAdminCredentials(email: string, password: string) {
  return (
    email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() &&
    password === ADMIN_PASSWORD
  );
}

export async function createAdminSession() {
  const token = await new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());

  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

/** Returns true if the current request carries a valid admin cookie. */
export async function isAdmin(): Promise<boolean> {
  try {
    const jar = await cookies();
    const token = jar.get(COOKIE)?.value;
    if (!token) return false;
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}
