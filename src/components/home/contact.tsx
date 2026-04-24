"use client";

import { useState, useEffect } from "react";
import { ArrowRight, EnvelopeSimple, MapPin, Clock, CheckCircle } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase";
import { fetchProfile } from "@/lib/account-store";

type Status = "idle" | "submitting" | "success" | "error";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
};

type FormErrors = Partial<FormData>;

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState<FormData>({
    firstName: "", lastName: "", email: "", phone: "", message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Pré-remplissage si connecté
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      setIsLoggedIn(true);
      const profile = await fetchProfile(user.id);
      setForm((prev) => ({
        ...prev,
        firstName: profile.firstName || user.user_metadata?.first_name || "",
        lastName: profile.lastName || user.user_metadata?.last_name || "",
        email: user.email ?? "",
        phone: profile.phone || "",
      }));
    });
  }, []);

  function set(field: keyof FormData) {
    return (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function validate(): boolean {
    const next: FormErrors = {};
    if (!form.firstName.trim()) next.firstName = "Prénom requis.";
    if (!form.lastName.trim()) next.lastName = "Nom requis.";
    if (!form.email.trim()) next.email = "Email requis.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Email invalide.";
    if (!form.message.trim() || form.message.trim().length < 10) next.message = "Message trop court.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setStatus("idle");
    setForm({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    setErrors({});
  }

  const inputClass = (field?: string) =>
    `w-full bg-transparent border-b py-2.5 text-sm focus:outline-none transition-colors ${
      field ? "border-red-400 focus:border-red-500" : "border-line focus:border-ink"
    }`;

  return (
    <section id="contact" className="mt-24 md:mt-36 scroll-mt-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

          {/* Colonne gauche */}
          <div className="md:col-span-5">
            <p className="kicker text-muted">Contact</p>
            <h2 className="display mt-5 text-4xl md:text-5xl">
              Une question ?<br />
              <span className="text-muted">Écrivez-nous.</span>
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted leading-relaxed max-w-[42ch]">
              Conseil sur la taille, la coupe, une sellerie partenaire près de chez vous ou toutes autres demandes — on vous répond en personne et en moins de 48h.
            </p>
            <ul className="mt-10 space-y-5">
              <li className="flex items-center gap-4">
                <EnvelopeSimple size={18} className="text-ink" />
                <a href="mailto:elekka.sellier@gmail.com" className="text-sm text-ink underline underline-offset-4 decoration-line hover:decoration-ink">
                  elekka.sellier@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-4">
                <Clock size={18} className="text-ink" />
                <span className="text-sm text-muted">Réponse en moins de 48h</span>
              </li>
              <li className="flex items-center gap-4">
                <MapPin size={18} className="text-ink" />
                <span className="text-sm text-muted">France — expédition Europe</span>
              </li>
            </ul>
          </div>

          {/* Colonne droite */}
          <div className="md:col-span-7">
            <form onSubmit={onSubmit} noValidate className="border-t border-line pt-8">

              {/* Bandeau succès */}
              {status === "success" && (
                <div className="mb-6 flex items-center gap-3 bg-ink text-on-ink px-5 py-4 animate-[rise_0.5s_cubic-bezier(0.16,1,0.3,1)_forwards]">
                  <CheckCircle size={18} weight="fill" className="shrink-0" />
                  <div>
                    <p className="text-sm font-medium">Message envoyé — merci.</p>
                    <p className="text-xs text-on-ink-muted mt-0.5">Nous vous répondons en moins de 48h.</p>
                  </div>
                  <button type="button" onClick={reset} className="ml-auto text-xs text-on-ink-muted hover:text-on-ink underline underline-offset-4 press shrink-0">
                    Nouveau message
                  </button>
                </div>
              )}

              {status === "error" && (
                <p className="text-xs text-red-400 mb-4">Une erreur est survenue. Vérifiez votre connexion et réessayez.</p>
              )}

              {isLoggedIn && (
                <p className="text-xs text-muted mb-4 flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink shrink-0" />
                  Formulaire pré-rempli depuis votre compte.
                </p>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                {/* Prénom */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="firstName" className="text-xs text-ink tracking-wide">
                    Prénom <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="firstName" type="text" value={form.firstName}
                    onChange={set("firstName")} autoComplete="given-name"
                    className={inputClass(errors.firstName)}
                  />
                  {errors.firstName && <p className="text-xs text-red-400">{errors.firstName}</p>}
                </div>

                {/* Nom */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="lastName" className="text-xs text-ink tracking-wide">
                    Nom <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="lastName" type="text" value={form.lastName}
                    onChange={set("lastName")} autoComplete="family-name"
                    className={inputClass(errors.lastName)}
                  />
                  {errors.lastName && <p className="text-xs text-red-400">{errors.lastName}</p>}
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs text-ink tracking-wide">
                    Email <span className="text-red-400">*</span>
                  </label>
                  <input
                    id="email" type="email" value={form.email}
                    onChange={set("email")} autoComplete="email"
                    className={inputClass(errors.email)}
                  />
                  {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                </div>

                {/* Téléphone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs text-ink tracking-wide">Téléphone</label>
                  <input
                    id="phone" type="tel" value={form.phone}
                    onChange={set("phone")} autoComplete="tel"
                    placeholder="+33 6 00 00 00 00"
                    className={`${inputClass()} placeholder:text-muted-soft`}
                  />
                </div>

                {/* Message */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs text-ink tracking-wide">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    id="message" rows={4} value={form.message}
                    onChange={set("message")}
                    placeholder="Une taille, un conseil, une sellerie proche de chez vous…"
                    className={`${inputClass(errors.message)} resize-none leading-relaxed placeholder:text-muted-soft`}
                  />
                  {errors.message && <p className="text-xs text-red-400">{errors.message}</p>}
                </div>

                {/* Footer formulaire */}
                <div className="md:col-span-2 flex items-center justify-between pt-3 border-t border-line gap-4 flex-wrap">
                  <p className="text-xs text-muted">
                    Les champs marqués d'un <span className="text-red-400">*</span> sont obligatoires.
                  </p>
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="group inline-flex items-center gap-3 bg-ink text-on-ink px-6 py-3.5 text-sm tracking-wide press hover:bg-ink-soft disabled:opacity-60 disabled:cursor-wait"
                  >
                    {status === "submitting" ? "Envoi…" : status === "error" ? "Réessayer" : "Envoyer"}
                    <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </div>

              </div>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
