import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/account", "/checkout", "/cart"],
      },
    ],
    sitemap: "https://naiart.com/sitemap.xml",
    host: "https://naiart.com",
  };
}
