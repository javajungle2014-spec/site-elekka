"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Lock, Tag } from "@phosphor-icons/react";
import { PayPalButton } from "@/components/paypal-button";
import { useCart } from "@/lib/cart-store";
import { formatPrice } from "@/lib/products";
import { createClient } from "@/lib/supabase";
import { fetchProfile } from "@/lib/account-store";

type Address = {
  firstName: string; lastName: string; email: string; phone: string;
  line1: string; line2: string; city: string; postalCode: string; country: string;
};
type Errors = Partial<Record<keyof Address, string>>;

type PromoState = {
  code: string;
  status: "idle" | "loading" | "valid" | "invalid";
  discountEUR: number;
  label: string;
  error: string;
};

function Field({
  label, value, onChange, type = "text", error, autoComplete, placeholder,
}: {
  label: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string; error?: string; autoComplete?: string; placeholder?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-ink tracking-wide">{label}</label>
      <input
        type={type} value={value} onChange={onChange}
        autoComplete={autoComplete} placeholder={placeholder}
        className={`bg-transparent border-b py-2.5 text-sm focus:outline-none transition-colors placeholder:text-muted-soft ${
          error ? "border-red-400 focus:border-red-500" : "border-line focus:border-ink"
        }`}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const router = useRouter();
  const [address, setAddress] = useState<Address>({
    firstName: "", lastName: "", email: "", phone: "",
    line1: "", line2: "", city: "", postalCode: "", country: "France",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  const [prefilled, setPrefilled] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [promo, setPromo] = useState<PromoState>({
    code: "", status: "idle", discountEUR: 0, label: "", error: "",
  });
  const [referral, setReferral] = useState<{ code: string; discountPercent: number; label: string } | null>(null);

  const referralDiscount = referral ? Math.round(totalPrice * referral.discountPercent / 100 * 100) / 100 : 0;
  const discountedTotal = Math.max(0, totalPrice - promo.discountEUR - referralDiscount);

  useEffect(() => {
    if (items.length === 0) router.replace("/boutique");
  }, [items, router]);

  // Détecter code de parrainage
  useEffect(() => {
    const code = localStorage.getItem("referral_code");
    if (!code) return;
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const res = await fetch("/api/referral/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ referralCode: code, currentUserId: data.user?.id ?? null }),
      });
      const json = await res.json();
      if (json.valid) {
        setReferral({ code, discountPercent: json.discountPercent, label: json.label });
      } else {
        localStorage.removeItem("referral_code");
      }
    });
  }, []);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data }) => {
      const user = data.user;
      if (!user) return;
      const profile = await fetchProfile(user.id);
      setAddress((prev) => ({
        ...prev,
        firstName: profile.firstName || user.user_metadata?.first_name || "",
        lastName: profile.lastName || user.user_metadata?.last_name || "",
        email: user.email ?? "",
        phone: profile.phone || "",
        line1: profile.addressLine1 || "",
        line2: profile.addressLine2 || "",
        city: profile.city || "",
        postalCode: profile.postalCode || "",
        country: profile.country || "France",
      }));
      setPrefilled(true);
    });
  }, []);

  function set(field: keyof Address) {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      setAddress((prev) => ({ ...prev, [field]: e.target.value }));
      if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!address.firstName.trim()) next.firstName = "Requis";
    if (!address.lastName.trim()) next.lastName = "Requis";
    if (!address.email.trim()) next.email = "Requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email)) next.email = "Email invalide";
    if (!address.line1.trim()) next.line1 = "Requis";
    if (!address.postalCode.trim()) next.postalCode = "Requis";
    if (!address.city.trim()) next.city = "Requis";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function applyPromo() {
    if (!promo.code.trim()) return;
    setPromo((p) => ({ ...p, status: "loading", error: "" }));
    try {
      const res = await fetch("/api/promo/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promo.code, totalEUR: totalPrice, items }),
      });
      const json = await res.json();
      if (json.valid) {
        setPromo((p) => ({
          ...p, status: "valid",
          discountEUR: json.discountEUR,
          label: json.label,
          code: json.code,
          error: "",
        }));
      } else {
        setPromo((p) => ({ ...p, status: "invalid", discountEUR: 0, label: "", error: json.error ?? "Code invalide" }));
      }
    } catch {
      setPromo((p) => ({ ...p, status: "invalid", error: "Erreur de connexion" }));
    }
  }

  function removePromo() {
    setPromo({ code: "", status: "idle", discountEUR: 0, label: "", error: "" });
  }

  async function handleStripeSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setCheckoutError(null);
    try {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items, address, userId: data.user?.id ?? null,
          promoCode: promo.status === "valid" ? promo.code : null,
          discountEUR: promo.discountEUR + referralDiscount,
          referralCode: referral?.code ?? null,
        }),
      });
      let json: { url?: string; error?: string };
      try { json = await res.json(); } catch {
        setCheckoutError(`Erreur serveur (${res.status}). Contactez-nous si le problème persiste.`);
        setLoading(false);
        return;
      }
      if (!res.ok || json.error || !json.url) {
        setCheckoutError(json.error || "Une erreur est survenue. Veuillez réessayer.");
        setLoading(false);
        return;
      }
      window.location.href = json.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : "Erreur inattendue.");
      setLoading(false);
    }
  }

  if (items.length === 0) return null;

  return (
    <div className="min-h-[calc(100vh-80px)] pt-24 md:pt-32 pb-24">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">

        <Link
          href="/boutique"
          className="inline-flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors press mb-10 md:mb-14"
        >
          <ArrowLeft size={14} />
          Retour à la boutique
        </Link>

        <h1 className="display text-3xl md:text-4xl mb-10 md:mb-14">
          Finaliser la commande
        </h1>

        <form onSubmit={handleStripeSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* ── Formulaire ── */}
            <div className="lg:col-span-7 space-y-10">

              {prefilled && (
                <p className="text-xs text-muted flex items-center gap-1.5">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-ink" />
                  Informations pré-remplies depuis votre compte.
                </p>
              )}

              {/* Contact */}
              <div>
                <p className="kicker text-muted mb-5">Contact</p>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Prénom *" value={address.firstName} onChange={set("firstName")} error={errors.firstName} autoComplete="given-name" />
                    <Field label="Nom *" value={address.lastName} onChange={set("lastName")} error={errors.lastName} autoComplete="family-name" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Email *" type="email" value={address.email} onChange={set("email")} error={errors.email} autoComplete="email" />
                    <Field label="Téléphone" type="tel" value={address.phone} onChange={set("phone")} autoComplete="tel" placeholder="+33 6 00 00 00 00" />
                  </div>
                </div>
              </div>

              {/* Adresse */}
              <div>
                <p className="kicker text-muted mb-5">Adresse de livraison</p>
                <div className="space-y-4">
                  <Field label="Adresse *" value={address.line1} onChange={set("line1")} error={errors.line1} autoComplete="address-line1" placeholder="12 rue des Écuries" />
                  <Field label="Complément (optionnel)" value={address.line2} onChange={set("line2")} autoComplete="address-line2" placeholder="Appartement, bâtiment…" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Code postal *" value={address.postalCode} onChange={set("postalCode")} error={errors.postalCode} autoComplete="postal-code" />
                    <Field label="Ville *" value={address.city} onChange={set("city")} error={errors.city} autoComplete="address-level2" />
                  </div>
                  <Field label="Pays" value={address.country} onChange={set("country")} autoComplete="country-name" />
                </div>
              </div>

              {/* CTA */}
              <div className="space-y-4 pt-2">
                {checkoutError && (
                  <p className="text-sm text-red-400 text-center">{checkoutError}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="press group w-full flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50"
                >
                  {loading ? "Redirection vers Stripe…" : "Payer par carte"}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                </button>

                <div className="flex items-center gap-3 py-1">
                  <div className="flex-1 border-t border-line" />
                  <span className="text-xs text-muted">ou</span>
                  <div className="flex-1 border-t border-line" />
                </div>

                <PayPalButton
                  items={items}
                  address={address}
                  promoCode={promo.status === "valid" ? promo.code : null}
                  discountEUR={promo.discountEUR}
                  onValidate={() => { const ok = validate(); if (ok) setCheckoutError(null); return ok; }}
                  onError={(msg) => setCheckoutError(msg)}
                />

                <p className="text-xs text-muted text-center">
                  En validant, vous acceptez nos conditions générales de vente.
                </p>
              </div>
            </div>

            {/* ── Récapitulatif ── */}
            <div className="lg:col-span-5 lg:order-2">
              <div className="bg-paper-2 p-6 lg:sticky lg:top-28 space-y-5">
                <p className="kicker text-muted">Récapitulatif</p>

                <ul className="divide-y divide-line">
                  {items.map((item) => (
                    <li
                      key={`${item.slug}-${item.colour}-${item.size}`}
                      className="py-3 flex items-start justify-between gap-3"
                    >
                      <div>
                        <p className="text-sm font-medium leading-snug">{item.name}</p>
                        <p className="text-xs text-muted mt-0.5">
                          {item.colourLabel} · {item.size} · Qté {item.quantity}
                        </p>
                      </div>
                      <span className="font-mono text-sm shrink-0">
                        {formatPrice(item.priceEUR * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Parrainage */}
                {referral && (
                  <div className="border-t border-line pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Tag size={13} className="text-green-600" />
                      <span className="text-sm font-medium text-green-600">Parrainage</span>
                    </div>
                    <span className="font-mono text-sm text-green-600">{referral.label}</span>
                  </div>
                )}

                {/* Code promo */}
                <div className="border-t border-line pt-4">
                  {promo.status === "valid" ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Tag size={13} className="text-green-600" />
                        <span className="text-sm font-medium text-green-600">{promo.code}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-green-600">{promo.label}</span>
                        <button
                          type="button"
                          onClick={removePromo}
                          className="text-xs text-muted hover:text-ink transition-colors"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promo.code}
                        onChange={(e) => setPromo((p) => ({ ...p, code: e.target.value.toUpperCase(), status: "idle", error: "" }))}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), applyPromo())}
                        placeholder="Code promo"
                        className="flex-1 bg-transparent border-b border-line py-2 text-sm focus:outline-none focus:border-ink transition-colors placeholder:text-muted-soft"
                      />
                      <button
                        type="button"
                        onClick={applyPromo}
                        disabled={promo.status === "loading" || !promo.code.trim()}
                        className="text-xs text-ink underline underline-offset-4 hover:text-muted transition-colors disabled:opacity-40"
                      >
                        {promo.status === "loading" ? "…" : "Appliquer"}
                      </button>
                    </div>
                  )}
                  {promo.status === "invalid" && (
                    <p className="text-xs text-red-400 mt-2">{promo.error}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">Livraison</span>
                    <span className="text-green-600 text-xs font-medium">Offerte</span>
                  </div>
                  {promo.status === "valid" && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted">Sous-total</span>
                      <span className="font-mono text-sm text-muted line-through">{formatPrice(totalPrice)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between font-mono font-semibold text-base border-t border-line pt-2">
                    <span>Total</span>
                    <span>{formatPrice(discountedTotal)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-muted border-t border-line pt-4">
                  <Lock size={12} className="shrink-0" />
                  Paiement 100% sécurisé — Stripe & PayPal
                </div>
              </div>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
