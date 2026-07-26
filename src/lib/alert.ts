import { Resend } from "resend";

const ADMIN_EMAIL = "java.jungle2014@gmail.com";

export async function alertAdmin(subject: string, context: Record<string, unknown>) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const rows = Object.entries(context)
      .map(([k, v]) => `<tr><td style="padding:6px 12px;font-weight:600;color:#737373;white-space:nowrap">${k}</td><td style="padding:6px 12px;font-family:monospace;word-break:break-all">${String(v ?? "—")}</td></tr>`)
      .join("");

    await resend.emails.send({
      from: "Elekka Alerts <contact@elekka-sellier.fr>",
      to: ADMIN_EMAIL,
      subject: `⚠️ Elekka — ${subject}`,
      html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#0a0a0a">
        <div style="background:#b91c1c;padding:24px 32px">
          <p style="color:#fff;font-size:11px;letter-spacing:.18em;text-transform:uppercase;margin:0">Elekka — Alerte système</p>
        </div>
        <div style="padding:32px;border:1px solid #e5e5e5;border-top:none">
          <h2 style="font-size:20px;font-weight:700;margin:0 0 8px">${subject}</h2>
          <p style="color:#737373;font-size:13px;margin:0 0 24px">${new Date().toLocaleString("fr-FR", { timeZone: "Europe/Paris" })}</p>
          <table style="width:100%;border-collapse:collapse;background:#f9f9f9;font-size:13px">${rows}</table>
        </div>
        <div style="padding:16px 32px">
          <p style="font-size:11px;color:#a3a3a3;margin:0">Elekka · Système d'alerte automatique</p>
        </div>
      </div>`,
    });
  } catch {
    // Ne jamais faire échouer le flux principal à cause d'une alerte
  }
}
