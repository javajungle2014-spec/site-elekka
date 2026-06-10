import { NextResponse } from "next/server";
import { products } from "@/lib/products";

const BASE = "https://elekka-sellier.fr";

export const dynamic = "force-dynamic";

const GOOGLE_COLOR: Record<string, string> = {
  "havana-brown": "Brown",
  "noir": "Black",
  "dark-brown": "Brown",
};

const MPN_COLOR: Record<string, string> = {
  "havana-brown": "HB",
  "noir": "NO",
  "dark-brown": "DB",
};

const MPN_SIZE: Record<string, string> = {
  "Full": "FL",
  "Cob": "CO",
};

// Product type path per category
const PRODUCT_TYPE: Record<string, string> = {
  "Bridons": "Animaux et articles pour animaux > Articles pour chevaux > Équipement équestre > Bridons et filets",
  "Licoles": "Animaux et articles pour animaux > Articles pour chevaux > Équipement équestre > Licols",
  "Rênes": "Animaux et articles pour animaux > Articles pour chevaux > Équipement équestre > Rênes",
};

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildMpn(slug: string, colourKey: string, size: string | null): string {
  const base = slug.replace(/-/g, "").toUpperCase().slice(0, 6);
  const c = MPN_COLOR[colourKey] ?? "XX";
  const s = size ? (MPN_SIZE[size] ?? size.slice(0, 2).toUpperCase()) : "";
  return `ELK-${base}-${c}${s ? `-${s}` : ""}`;
}

export async function GET() {
  const visible = products.filter((p) => !p.hidden);

  const items: string[] = [];

  for (const p of visible) {
    const productType = PRODUCT_TYPE[p.category] ?? PRODUCT_TYPE["Bridons"];
    const itemGroupId = `elekka-${p.slug}`;
    const sizes = p.sizes.length > 0 ? p.sizes : [null];

    for (const colour of p.colours) {
      // Only include colours that have at least one image
      if (colour.images.length === 0) continue;

      const cleanImages = colour.images.filter((img) => !img.includes("|"));
      const [mainImg, ...restImgs] = cleanImages;
      const additionals = restImgs.slice(0, 2);

      const googleColor = GOOGLE_COLOR[colour.key] ?? colour.label;

      for (const size of sizes) {
        const variantId = size
          ? `elekka-${p.slug}-${colour.key}-${size.toLowerCase()}`
          : `elekka-${p.slug}-${colour.key}`;

        const titleSuffix = size ? ` — ${colour.label} · ${size}` : ` — ${colour.label}`;
        const linkParams = new URLSearchParams();
        linkParams.set("couleur", colour.key);
        if (size) linkParams.set("taille", size.toLowerCase());
        const productUrl = `${BASE}/boutique/${p.slug}?${linkParams.toString()}`;

        const mpn = buildMpn(p.slug, colour.key, size);

        items.push(`
    <item>
      <g:id>${escapeXml(variantId)}</g:id>
      <g:title><![CDATA[${p.name}${titleSuffix}]]></g:title>
      <g:description><![CDATA[${p.description}]]></g:description>
      <g:link>${escapeXml(productUrl)}</g:link>
      ${mainImg ? `<g:image_link>${BASE}${mainImg}</g:image_link>` : ""}
      ${additionals.map((img) => `<g:additional_image_link>${BASE}${img}</g:additional_image_link>`).join("\n      ")}
      <g:price>${p.priceEUR} EUR</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>Elekka</g:brand>
      <g:identifier_exists>false</g:identifier_exists>
      <g:mpn>${escapeXml(mpn)}</g:mpn>
      <g:product_type><![CDATA[${productType}]]></g:product_type>
      <g:google_product_category>1970</g:google_product_category>
      <g:material>Leather</g:material>
      <g:color>${escapeXml(googleColor)}</g:color>
      ${size ? `<g:size>${escapeXml(size)}</g:size>` : ""}
      <g:item_group_id>${escapeXml(itemGroupId)}</g:item_group_id>
      <g:adult>no</g:adult>
      <g:shipping>
        <g:country>FR</g:country>
        <g:price>0 EUR</g:price>
        <g:service>Standard</g:service>
      </g:shipping>
    </item>`);
      }
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Elekka — Catalogue produits</title>
    <link>${BASE}</link>
    <description>Bridons et sellerie Elekka</description>
    ${items.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
