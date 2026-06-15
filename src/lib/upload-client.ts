"use client";

/**
 * Uploads a file directly to Cloudinary using a server-signed request.
 * Returns the permanent secure URL, or null if Cloudinary isn't configured
 * (caller can then fall back to a local object URL for the demo).
 */
export async function uploadImage(file: File): Promise<string | null> {
  const sigRes = await fetch("/api/upload", { method: "POST" });
  if (!sigRes.ok) return null;
  const sig = await sigRes.json();
  if (!sig?.ok) return null;

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sig.apiKey);
  form.append("timestamp", String(sig.timestamp));
  form.append("signature", sig.signature);
  form.append("folder", sig.folder);

  const upRes = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    { method: "POST", body: form },
  );
  if (!upRes.ok) return null;
  const data = await upRes.json();
  return data.secure_url ?? null;
}
