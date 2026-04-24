"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Star, CheckCircle } from "@phosphor-icons/react";
import Link from "next/link";

type TokenData = {
  firstName: string;
  email: string;
  orderNumber: string;
};

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: 5 }).map((_, i) => {
        const n = i + 1;
        return (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            onMouseEnter={() => setHovered(n)}
            onMouseLeave={() => setHovered(0)}
            className="press transition-transform hover:scale-110"
          >
            <Star
              size={32}
              weight={(hovered || value) >= n ? "fill" : "regular"}
              className={(hovered || value) >= n ? "text-ink" : "text-muted-soft"}
            />
          </button>
        );
      })}
    </div>
  );
}

function AvisForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) { setError("Lien invalide."); setLoading(false); return; }
    fetch(`/api/avis?token=${token}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) { setError(data.error); }
        else {
          setTokenData(data);
          setName(data.firstName);
        }
        setLoading(false);
      });
  }, [token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { setError("Veuillez sélectionner une note."); return; }
    if (text.trim().length < 10) { setError("Votre avis est trop court (10 caractères minimum)."); return; }
    setSubmitting(true);
    setError("");
    const res = await fetch("/api/avis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, rating, text, name }),
    });
    const json = await res.json();
    if (json.success) { setSuccess(true); }
    else { setError(json.error ?? "Une erreur est survenue."); }
    setSubmitting(false);
  }

  if (loading) {
    return <div className="py-20 text-center text-sm text-muted">Chargement…</div>;
  }

  if (success) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 border border-line rounded-full flex items-center justify-center">
            <CheckCircle size={28} weight="light" className="text-ink" />
          </div>
        </div>
        <div className="space-y-3">
          <h1 className="display text-3xl md:text-4xl">Merci, {tokenData?.firstName}.</h1>
          <p className="text-sm text-muted leading-relaxed max-w-[38ch] mx-auto">
            Votre avis a bien été reçu. Vous allez recevoir un email avec votre code de réduction <strong>-25 €</strong> sur votre prochain filet.
          </p>
        </div>
        <Link
          href="/boutique"
          className="press inline-flex items-center gap-2 text-sm underline underline-offset-4 text-muted hover:text-ink transition-colors"
        >
          Découvrir la collection
        </Link>
      </div>
    );
  }

  if (error && !tokenData) {
    return (
      <div className="text-center space-y-4">
        <p className="text-sm text-muted">{error}</p>
        <Link href="/" className="press text-sm underline underline-offset-4 text-muted hover:text-ink transition-colors">
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-2">
        <p className="kicker text-muted">Commande {tokenData?.orderNumber}</p>
        <h1 className="display text-3xl md:text-4xl">
          Votre avis<br />
          <span className="text-muted">compte pour nous.</span>
        </h1>
        <p className="text-sm text-muted leading-relaxed max-w-[42ch]">
          Partagez votre expérience et recevez <strong className="text-ink">-25 €</strong> sur votre prochain filet en remerciement.
        </p>
      </div>

      {/* Note */}
      <div className="space-y-3">
        <label className="text-xs text-muted tracking-wide">Votre note *</label>
        <StarPicker value={rating} onChange={setRating} />
      </div>

      {/* Avis */}
      <div className="space-y-2">
        <label className="text-xs text-muted tracking-wide">Votre avis *</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Partagez votre expérience avec le filet, la qualité, le confort de votre cheval…"
          rows={5}
          className="w-full bg-transparent border border-line p-4 text-sm focus:outline-none focus:border-ink transition-colors resize-none placeholder:text-muted-soft"
        />
      </div>

      {/* Nom */}
      <div className="space-y-2">
        <label className="text-xs text-muted tracking-wide">Votre prénom (affiché publiquement)</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-transparent border-b border-line py-2.5 text-sm focus:outline-none focus:border-ink transition-colors"
        />
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="press w-full flex items-center justify-center bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50"
      >
        {submitting ? "Envoi en cours…" : "Envoyer mon avis"}
      </button>

      <p className="text-xs text-muted text-center">
        Votre avis sera publié après modération.
      </p>
    </form>
  );
}

export default function AvisPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[520px]">
        <Suspense fallback={<div className="py-20 text-center text-sm text-muted">Chargement…</div>}>
          <AvisForm />
        </Suspense>
      </div>
    </div>
  );
}
