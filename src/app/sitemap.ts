import type { MetadataRoute } from "next";
import { products } from "@/lib/products";
import { blog, conseils } from "@/lib/ressources";
import { SITE_URL } from "@/lib/site";

const BASE = SITE_URL;

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.filter((p) => !p.hidden).map((p) => ({
    url: `${BASE}/boutique/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const articleUrls = [
    ...conseils.map((a) => ({ a, path: `/ressources/conseils/${a.slug}`, priority: 0.7 })),
    ...blog.map((a) => ({ a, path: `/ressources/blog/${a.slug}`, priority: 0.6 })),
  ].map(({ a, path, priority }) => ({
    url: `${BASE}${path}`,
    lastModified: new Date(a.date),
    changeFrequency: "yearly" as const,
    priority,
  }));

  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/boutique`,                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/boutique/tetiere`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/boutique/muserolle`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/boutique/frontal`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...productUrls,
    { url: `${BASE}/a-propos`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ressources`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/ressources/blog`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/ressources/conseils`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/ressources/guide-bridon-complet`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ressources/elekka-vs-grandes-marques`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...articleUrls,
    { url: `${BASE}/faq`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/confidentialite`,         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
