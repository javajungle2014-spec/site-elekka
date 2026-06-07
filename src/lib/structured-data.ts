import type { Product } from "./products";

const BASE = "https://elekka-sellier.fr";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Elekka",
    url: BASE,
    logo: `${BASE}/brand/ek-monogram.png`,
    description: "Marque française de bridons et sellerie en cuir pleine fleur. Qualité équestre, prix juste.",
    contactPoint: {
      "@type": "ContactPoint",
      email: "elekka.sellier@gmail.com",
      contactType: "customer service",
      availableLanguage: "French",
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Elekka",
    url: BASE,
    description: "Bridons en cuir pleine fleur conçus par des cavaliers. Qualité des grandes marques équestres, prix juste. Livraison offerte.",
    inLanguage: "fr-FR",
    potentialAction: {
      "@type": "SearchAction",
      target: `${BASE}/boutique?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function productSchema(product: Product, inStock?: boolean) {
  const availability = inStock === false
    ? "https://schema.org/OutOfStock"
    : "https://schema.org/InStock";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    brand: {
      "@type": "Brand",
      name: "Elekka",
    },
    url: `${BASE}/boutique/${product.slug}`,
    image: (() => {
      const firstClean = product.colours[0]?.images?.find(img => !img.includes("|"));
      return firstClean ? `${BASE}${firstClean}` : `${BASE}/brand/hero.jpg`;
    })(),
    offers: {
      "@type": "Offer",
      price: product.priceEUR,
      priceCurrency: "EUR",
      availability,
      url: `${BASE}/boutique/${product.slug}`,
      seller: {
        "@type": "Organization",
        name: "Elekka",
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "EUR",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          },
          cutOffTime: "16:00:00+01:00",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 1,
            maxValue: 2,
            unitCode: "DAY",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 2,
            maxValue: 5,
            unitCode: "DAY",
          },
        },
        doesNotShip: false,
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "FR",
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "FR",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 14,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/ReturnFeesCustomerResponsibility",
      },
    },
    material: "Cuir pleine fleur",
    category: product.category,
    sku: `ELK-${product.slug.toUpperCase()}`,
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

export function articleSchema(article: {
  title: string;
  description: string;
  slug: string;
  date: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    url: `${BASE}/ressources/conseils/${article.slug}`,
    datePublished: article.date,
    author: {
      "@type": "Person",
      name: "Lucas Mourier",
      jobTitle: "Fondateur d'Elekka",
    },
    publisher: {
      "@type": "Organization",
      name: "Elekka",
      logo: {
        "@type": "ImageObject",
        url: `${BASE}/brand/ek-monogram.png`,
      },
    },
    inLanguage: "fr-FR",
  };
}
