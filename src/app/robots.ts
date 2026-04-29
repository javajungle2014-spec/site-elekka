import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/compte",
          "/checkout",
          "/api/",
          "/auth/",
          "/reset-password",
        ],
      },
    ],
    sitemap: "https://elekka-sellier.fr/sitemap.xml",
  };
}
