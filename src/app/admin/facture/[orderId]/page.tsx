import { notFound } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

type OrderItem = {
  name: string; colourLabel: string; size: string; qty: number; priceEUR: number;
};

type Address = {
  firstName: string; lastName: string; email?: string; phone?: string;
  line1: string; line2?: string; postalCode: string; city: string; country: string;
};

type Order = {
  id: number;
  order_number: string;
  created_at: string;
  total_eur: number;
  shipping_address: Address;
  items: OrderItem[];
};

function supabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function formatEUR(n: number) {
  return n.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " €";
}

export default async function FacturePage({
  params,
  searchParams,
}: {
  params: Promise<{ orderId: string }>;
  searchParams: Promise<{ pwd?: string }>;
}) {
  const { orderId } = await params;
  const { pwd } = await searchParams;

  if (pwd !== process.env.ADMIN_PASSWORD) return notFound();

  const supabase = supabaseAdmin();
  const { data: order } = await supabase
    .from("orders")
    .select("id, order_number, created_at, total_eur, shipping_address, items")
    .eq("id", orderId)
    .single();

  if (!order) return notFound();

  const o = order as Order;
  const addr = o.shipping_address;
  const invoiceNumber = `FACT-${o.order_number}`;
  const invoiceDate = formatDate(o.created_at);

  const rows = (o.items ?? []).map((item: OrderItem) => `
    <tr>
      <td class="td-left">${item.name}<br><span class="meta">${item.colourLabel}${item.size ? ` · Taille ${item.size}` : ""}</span></td>
      <td class="td-right">${item.qty}</td>
      <td class="td-right">${formatEUR(item.priceEUR)}</td>
      <td class="td-right">${formatEUR(item.priceEUR * item.qty)}</td>
    </tr>`).join("");

  const html = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Facture ${invoiceNumber}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 13px;
      color: #0a0a0a;
      background: #f5f5f5;
    }

    .page {
      width: 210mm;
      min-height: 297mm;
      background: #fff;
      margin: 24px auto;
      padding: 16mm 18mm;
      box-shadow: 0 2px 24px rgba(0,0,0,0.10);
    }

    /* ─── Header ─────────────────────────────────── */
    .header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding-bottom: 10mm;
      border-bottom: 2px solid #0a0a0a;
      margin-bottom: 10mm;
    }

    .brand-name {
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -.03em;
      text-transform: uppercase;
    }

    .brand-sub {
      font-size: 10px;
      letter-spacing: .18em;
      text-transform: uppercase;
      color: #737373;
      margin-top: 4px;
    }

    .invoice-meta {
      text-align: right;
    }

    .invoice-title {
      font-size: 20px;
      font-weight: 700;
      letter-spacing: -.01em;
      margin-bottom: 6px;
    }

    .invoice-number {
      font-size: 13px;
      font-family: monospace;
      color: #0a0a0a;
      font-weight: 600;
    }

    .invoice-date {
      font-size: 12px;
      color: #737373;
      margin-top: 4px;
    }

    /* ─── Parties ─────────────────────────────────── */
    .parties {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10mm;
      margin-bottom: 10mm;
    }

    .party-label {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: .2em;
      text-transform: uppercase;
      color: #737373;
      margin-bottom: 5px;
    }

    .party-name {
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .party-line {
      font-size: 12px;
      color: #444;
      line-height: 1.7;
    }

    /* ─── Table articles ─────────────────────────── */
    .table-wrap {
      margin-bottom: 8mm;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead tr {
      background: #0a0a0a;
      color: #fff;
    }

    th {
      font-size: 9px;
      font-weight: 700;
      letter-spacing: .15em;
      text-transform: uppercase;
      padding: 8px 10px;
    }

    th:first-child { text-align: left; }
    th:not(:first-child) { text-align: right; }

    tbody tr { border-bottom: 1px solid #e5e5e5; }
    tbody tr:last-child { border-bottom: none; }

    td { padding: 10px 10px; vertical-align: top; }

    .td-left { text-align: left; font-size: 13px; }
    .td-right { text-align: right; font-size: 13px; font-variant-numeric: tabular-nums; }

    .meta { font-size: 11px; color: #737373; }

    /* ─── Totaux ────────────────────────────────── */
    .totals {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 10mm;
    }

    .totals-box {
      width: 220px;
      border: 1px solid #e5e5e5;
    }

    .totals-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 12px;
      font-size: 12px;
      border-bottom: 1px solid #e5e5e5;
    }

    .totals-row:last-child { border-bottom: none; }

    .totals-total {
      background: #0a0a0a;
      color: #fff;
      font-weight: 700;
      font-size: 13px;
    }

    .totals-total .label { color: #fff; }

    /* ─── Footer ─────────────────────────────────── */
    .footer {
      border-top: 1px solid #e5e5e5;
      padding-top: 6mm;
      font-size: 10px;
      color: #a3a3a3;
      line-height: 1.7;
    }

    /* ─── Bouton impression (masqué à l'impression) */
    .print-bar {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin: 0 auto 16px;
      width: 210mm;
    }

    .btn-print {
      background: #0a0a0a;
      color: #fff;
      border: none;
      padding: 10px 28px;
      font-size: 13px;
      font-weight: 600;
      cursor: pointer;
      letter-spacing: .04em;
    }

    .btn-print:hover { background: #333; }

    @media print {
      body { background: #fff; }
      .page { margin: 0; box-shadow: none; padding: 12mm 14mm; }
      .print-bar { display: none !important; }
    }
  </style>
</head>
<body>

  <div class="print-bar">
    <button class="btn-print" onclick="window.print()">⬇ Télécharger / Imprimer</button>
  </div>

  <div class="page">

    <!-- Header -->
    <div class="header">
      <div>
        <div class="brand-name">Elekka</div>
        <div class="brand-sub">Maison française · Bridons en cuir</div>
      </div>
      <div class="invoice-meta">
        <div class="invoice-title">Facture</div>
        <div class="invoice-number">${invoiceNumber}</div>
        <div class="invoice-date">${invoiceDate}</div>
      </div>
    </div>

    <!-- Vendeur / Client -->
    <div class="parties">
      <div>
        <div class="party-label">Vendeur</div>
        <div class="party-name">Elekka</div>
        <div class="party-line">
          elekka-sellier.fr<br>
          contact@elekka-sellier.fr<br>
          France
        </div>
      </div>
      <div>
        <div class="party-label">Facturé à</div>
        <div class="party-name">${addr.firstName} ${addr.lastName}</div>
        <div class="party-line">
          ${addr.line1}${addr.line2 ? `<br>${addr.line2}` : ""}<br>
          ${addr.postalCode} ${addr.city}<br>
          ${addr.country}${addr.email ? `<br>${addr.email}` : ""}
        </div>
      </div>
    </div>

    <!-- Articles -->
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Article</th>
            <th>Qté</th>
            <th>Prix unitaire</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
    </div>

    <!-- Totaux -->
    <div class="totals">
      <div class="totals-box">
        <div class="totals-row">
          <span class="label" style="color:#737373">Sous-total</span>
          <span>${formatEUR(o.total_eur)}</span>
        </div>
        <div class="totals-row">
          <span class="label" style="color:#737373">Livraison</span>
          <span>Offerte</span>
        </div>
        <div class="totals-row totals-total">
          <span class="label">Total</span>
          <span>${formatEUR(o.total_eur)}</span>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="footer">
      TVA non applicable, art. 293 B du CGI · Paiement reçu le ${invoiceDate}<br>
      Référence commande : ${o.order_number} · Facture n° ${invoiceNumber}
    </div>

  </div>

</body>
</html>`;

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      suppressHydrationWarning
    />
  );
}
