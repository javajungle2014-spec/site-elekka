import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const BASE = "https://elekka-sellier.fr";

export default function sitemap(): MetadataRoute.Sitemap {
  const productUrls = products.map((p) => ({
    url: `${BASE}/boutique/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    { url: BASE,                              lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE}/boutique`,                lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${BASE}/boutique/personnaliser`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/boutique/tetiere`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/boutique/muserolle`,      lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/boutique/frontal`,        lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...productUrls,
    { url: `${BASE}/a-propos`,                lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ressources`,              lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/ressources/blog`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/ressources/conseils`,     lastModified: new Date(), changeFrequency: "weekly",  priority: 0.6 },
    { url: `${BASE}/ressources/faq`,          lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/faq`,                     lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/cgv`,                     lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/mentions-legales`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE}/confidentialite`,         lastModified: new Date(), changeFrequency: "yearly",  priority: 0.3 },
  ];
}
