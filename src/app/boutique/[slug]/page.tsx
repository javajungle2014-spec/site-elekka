import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { ProductDetailClient } from "@/components/boutique/product-detail-client";
import { RenesProductDetail } from "@/components/boutique/renes-product-detail";
import { LicolProductDetail } from "@/components/boutique/licol-product-detail";
import { EnrenementProductDetail } from "@/components/boutique/enrenement-product-detail";
import { productSchema, breadcrumbSchema } from "@/lib/structured-data";

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
    openGraph: {
      title: `${product.name} — Elekka`,
      description: product.description,
      type: "website",
      url: `https://elekka-sellier.fr/boutique/${slug}`,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const jsonLd = [productSchema(product), breadcrumbSchema([
    { name: "Accueil", url: "https://elekka-sellier.fr" },
    { name: "Boutique", url: "https://elekka-sellier.fr/boutique" },
    { name: product.name, url: `https://elekka-sellier.fr/boutique/${product.slug}` },
  ])];

  const schema = (
    <>
      {jsonLd.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );

  if (product.category === "Rênes")        return <>{schema}<RenesProductDetail product={product} /></>;
  if (product.category === "Licoles")      return <>{schema}<LicolProductDetail product={product} /></>;
  if (product.category === "Enrênements") return <>{schema}<EnrenementProductDetail product={product} /></>;

  return <>{schema}<ProductDetailClient product={product} /></>;
}
