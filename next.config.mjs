/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Don't let lint warnings block a production deploy (Vercel runs lint on build).
  eslint: { ignoreDuringBuilds: true },
  images: {
    // Load remote art directly in the browser instead of through Vercel's
    // optimizer — avoids 403s/limits when hotlinking Unsplash on deploy.
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
};

export default nextConfig;
