import { NextResponse } from "next/server";
import { products } from "@/lib/products";

const BASE = "https://elekka-sellier.fr";

export const dynamic = "force-dynamic";

export async function GET() {
  const visible = products.filter((p) => !p.hidden);

  const items = visible.map((p) => {
    const colour = p.colours.find((c) => c.key === p.defaultColour) ?? p.colours[0];
    const image = colour?.images?.find((img) => !img.includes("|"));

    return `
    <item>
      <g:id>${p.slug}</g:id>
      <g:title><![CDATA[${p.name}]]></g:title>
      <g:description><![CDATA[${p.description}]]></g:description>
      <g:link>${BASE}/boutique/${p.slug}</g:link>
      ${image ? `<g:image_link>${BASE}${image}</g:image_link>` : ""}
      <g:price>${p.priceEUR} EUR</g:price>
      <g:availability>in stock</g:availability>
      <g:condition>new</g:condition>
      <g:brand>Elekka</g:brand>
      <g:identifier_exists>false</g:identifier_exists>
      <g:shipping>
        <g:country>FR</g:country>
        <g:price>0 EUR</g:price>
      </g:shipping>
    </item>`;
  }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Elekka — Catalogue produits</title>
    <link>${BASE}</link>
    <description>Bridons et sellerie Elekka</description>
    ${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
