import { Resend } from "resend";
import { NextResponse } from "next/server";
import { escapeHtml } from "@/lib/prices";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const body = await req.json();
  const { firstName, lastName, email, phone, message } = body;

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json({ error: "Champs obligatoires manquants." }, { status: 400 });
  }

  const safe = {
    firstName: escapeHtml(String(firstName).slice(0, 100)),
    lastName:  escapeHtml(String(lastName).slice(0, 100)),
    email:     escapeHtml(String(email).slice(0, 200)),
    phone:     phone ? escapeHtml(String(phone).slice(0, 30)) : "",
    message:   escapeHtml(String(message).slice(0, 5000)),
  };

  const { error } = await resend.emails.send({
    from: "Elekka Contact <contact@elekka-sellier.fr>",
    to: "elekka.sellier@gmail.com",
    replyTo: safe.email,
    subject: `Nouveau message de ${safe.firstName} ${safe.lastName}`,
    html: `
      <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #0a0a0a;">
        <div style="background: #0a0a0a; padding: 32px 40px;">
          <p style="color: #fafaf9; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; margin: 0;">Elekka — Nouveau message</p>
        </div>

        <div style="padding: 40px; border: 1px solid #e5e5e5; border-top: none;">

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 32px;">
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #737373; width: 140px;">Prénom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${safe.firstName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #737373;">Nom</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;">${safe.lastName}</td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #737373;">Email</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px;"><a href="mailto:${safe.email}" style="color: #0a0a0a;">${safe.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #737373;">Téléphone</td>
              <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5; font-size: 14px; color: ${safe.phone ? "#0a0a0a" : "#a3a3a3"};">${safe.phone || "Non renseigné"}</td>
            </tr>
          </table>

          <div>
            <p style="font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; color: #737373; margin: 0 0 12px;">Message</p>
            <p style="font-size: 14px; line-height: 1.7; color: #0a0a0a; margin: 0; white-space: pre-wrap;">${safe.message}</p>
          </div>

          <div style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #e5e5e5;">
            <a href="mailto:${safe.email}" style="display: inline-block; background: #0a0a0a; color: #fafaf9; text-decoration: none; padding: 14px 28px; font-size: 13px; letter-spacing: 0.05em;">
              Répondre à ${safe.firstName}
            </a>
          </div>

        </div>

        <div style="padding: 20px 40px;">
          <p style="font-size: 11px; color: #a3a3a3; margin: 0;">Elekka · Formulaire de contact · ${new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
      </div>
    `,
  });

  if (error) {
    return NextResponse.json({ error: "Erreur lors de l'envoi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
