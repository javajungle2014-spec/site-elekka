import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { ProductDetailClient } from "@/components/boutique/product-detail-client";
import { RenesProductDetail } from "@/components/boutique/renes-product-detail";
import { LicolProductDetail } from "@/components/boutique/licol-product-detail";
import { EnrenementProductDetail } from "@/components/boutique/enrenement-product-detail";

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

  if (product.category === "Rênes")        return <RenesProductDetail product={product} />;
  if (product.category === "Licoles")      return <LicolProductDetail product={product} />;
  if (product.category === "Enrênements") return <EnrenementProductDetail product={product} />;

  return <ProductDetailClient product={product} />;
}
