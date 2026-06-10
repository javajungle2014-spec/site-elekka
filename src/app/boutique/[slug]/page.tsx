import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { ProductDetailClient } from "@/components/boutique/product-detail-client";
import { RenesProductDetail } from "@/components/boutique/renes-product-detail";
import { LicolProductDetail } from "@/components/boutique/licol-product-detail";
import { EnrenementProductDetail } from "@/components/boutique/enrenement-product-detail";
import { productSchema, breadcrumbSchema, faqSchema } from "@/lib/structured-data";
import { productFaq } from "@/lib/product-faq";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Produit introuvable" };
  return {
    title: product.name,
    description: product.description,
    ...(product.hidden && { robots: { index: false, follow: false } }),
    openGraph: {
      title: `${product.name} — Elekka`,
      description: product.description,
      type: "website",
      url: `https://elekka-sellier.fr/boutique/${slug}`,
      ...(product.colours[0]?.images?.[0] && {
        images: [{ url: `https://elekka-sellier.fr${product.colours[0].images[0]}`, width: 1200, height: 630 }],
      }),
    },
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ couleur?: string }>;
}) {
  const { slug } = await params;
  const { couleur } = await searchParams;
  const product = getProduct(slug);
  if (!product) notFound();

  const validColour = product.colours.find(c => c.key === couleur)?.key;

  const faqItems = productFaq[product.slug] ?? [];
  const jsonLd = [
    productSchema(product),
    breadcrumbSchema([
      { name: "Accueil", url: "https://elekka-sellier.fr" },
      { name: "Boutique", url: "https://elekka-sellier.fr/boutique" },
      { name: product.name, url: `https://elekka-sellier.fr/boutique/${product.slug}` },
    ]),
    ...(faqItems.length > 0 ? [faqSchema(faqItems)] : []),
  ];

  const schema = (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );

  if (product.category === "Rênes")        return <>{schema}<RenesProductDetail product={product} initialColour={validColour as import("@/lib/products").ColourKey | undefined} /></>;
  if (product.category === "Licols")      return <>{schema}<LicolProductDetail product={product} /></>;
  if (product.category === "Enrênements") return <>{schema}<EnrenementProductDetail product={product} /></>;

  return <>{schema}<ProductDetailClient product={product} /></>;
}
