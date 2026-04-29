import type { Product } from "./products";

const BASE = "https://elekka-sellier.fr";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Elekka",
    url: BASE,
    logo: `${BASE}/brand/ek-monogram.png`,
    contactPoint: {
      "@type": "ContactPoint",
      email: "elekka.sellier@gmail.com",
      contactType: "customer service",
      availableLanguage: "French",
    },
    sameAs: [],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Elekka",
    url: BASE,
    description: "Bridons en cuir conçus par des cavaliers, pour des cavaliers. Qualité, technicité, prix juste.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/boutique?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: { "@type": "Brand", name: "Elekka" },
    url: `${BASE}/boutique/${product.slug}`,
    offers: {
      "@type": "Offer",
      price: product.priceEUR,
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      url: `${BASE}/boutique/${product.slug}`,
      seller: { "@type": "Organization", name: "Elekka" },
    },
    material: "Cuir pleine fleur",
    category: product.category,
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
