import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function PreviewGiftEmail({
  searchParams,
}: {
  searchParams: Promise<{ pwd?: string }>;
}) {
  const { pwd } = await searchParams;
  if (pwd !== process.env.ADMIN_PASSWORD) return notFound();

  const html = giftEmail({
    firstName: "Marie",
    code: "CADEAU-XXXX",
    amountEUR: 60,
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} suppressHydrationWarning />;
}

export function giftEmail({
  firstName,
  code,
  amountEUR,
}: {
  firstName: string;
  code: string;
  amountEUR: number;
}) {
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return `<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:sans-serif">
<div style="max-width:600px;margin:32px auto;color:#0a0a0a">

  <!-- Header -->
  <div style="background:#0a0a0a;padding:32px 40px">
    <p style="color:#fafaf9;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Un cadeau pour vous</p>
  </div>

  <!-- Corps -->
  <div style="padding:40px;border:1px solid #e5e5e5;border-top:none;background:#fff">
    <h2 style="font-size:26px;font-weight:700;letter-spacing:-.02em;margin:0 0 8px">Merci, ${firstName}.</h2>
    <p style="color:#737373;font-size:14px;line-height:1.7;margin:0 0 32px">
      Nous souhaitons vous remercier pour votre confiance. En témoignage de notre gratitude, voici un bon d'achat de <strong>${amountEUR} €</strong> à utiliser sur votre prochaine commande.
    </p>

    <!-- Code cadeau -->
    <div style="background:#f2f1ef;padding:28px;text-align:center;margin-bottom:32px">
      <p style="font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#737373;margin:0 0 14px">Votre bon d'achat</p>
      <p style="font-size:32px;font-weight:700;font-family:monospace;letter-spacing:.08em;margin:0 0 12px">${code}</p>
      <p style="font-size:13px;color:#737373;margin:0">−${amountEUR} € · Valable une fois · À saisir au moment du paiement</p>
    </div>

    <!-- CTA -->
    <div style="text-align:center;margin-bottom:36px">
      <a href="https://elekka-sellier.fr/boutique"
         style="display:inline-block;background:#0a0a0a;color:#fafaf9;text-decoration:none;padding:16px 36px;font-size:13px;font-weight:600;letter-spacing:.06em">
        Découvrir la boutique →
      </a>
    </div>

    <p style="font-size:14px;color:#737373;line-height:1.7;margin:0">
      Pour toute question : <a href="mailto:elekka.sellier@gmail.com" style="color:#0a0a0a">elekka.sellier@gmail.com</a>
    </p>
  </div>

  <!-- Footer -->
  <div style="padding:20px 40px">
    <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · ${date}</p>
  </div>

</div>
</body>
</html>`;
}
