"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeSlash, EnvelopeSimple, Lock, User, ArrowRight, Phone } from "@phosphor-icons/react";
import { upsertProfile } from "@/lib/account-store";
import { createClient } from "@/lib/supabase";
import { Dashboard } from "./dashboard";

// ── Input field ────────────────────────────────────────────────────────────────

function InputField({
  label, type = "text", value, onChange, placeholder, icon: Icon, required = true,
}: {
  label: string; type?: string; value: string;
  onChange: (v: string) => void; placeholder?: string;
  icon?: React.ElementType; required?: boolean;
}) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (show ? "text" : "password") : type;

  return (
    <div className="flex flex-col gap-2">
      <label className="kicker text-muted">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        )}
        <input
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className="w-full border-b border-line bg-transparent text-ink text-sm py-3 pr-4 outline-none focus:border-ink transition-colors placeholder:text-muted-soft pl-10"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-ink transition-colors press p-1"
          >
            {show ? <EyeSlash size={15} /> : <Eye size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Formulaire connexion ───────────────────────────────────────────────────────

function LoginForm({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetMode, setResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) { setError("Email ou mot de passe incorrect."); return; }
    onSuccess();
  }

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) { setError("Entrez votre email."); return; }
    setResetLoading(true); setError("");
    const supabase = createClient();
    const siteUrl = "https://elekka-sellier.fr";
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${siteUrl}/auth/callback?type=recovery`,
    });
    setResetLoading(false);
    setResetSent(true);
  }

  if (resetMode) {
    return (
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-1">Mot de passe oublié</h2>
          <p className="text-sm text-muted">Entrez votre email, vous recevrez un lien pour créer un nouveau mot de passe.</p>
        </div>
        {resetSent ? (
          <div className="space-y-4">
            <p className="text-sm text-muted border border-line px-4 py-3">Email envoyé à <strong>{email}</strong>. Vérifiez votre boîte mail.</p>
            <button type="button" onClick={() => { setResetMode(false); setResetSent(false); }} className="press text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors">
              Retour à la connexion
            </button>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-6">
            <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="votre@email.fr" icon={EnvelopeSimple} />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button type="submit" disabled={resetLoading}
              className="press group w-full flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50">
              {resetLoading ? "Envoi…" : "Envoyer le lien"}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
            </button>
            <button type="button" onClick={() => setResetMode(false)} className="press text-sm text-center w-full text-muted hover:text-ink underline underline-offset-4 transition-colors">
              Retour à la connexion
            </button>
          </form>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="votre@email.fr" icon={EnvelopeSimple} />
        <InputField label="Mot de passe" type="password" value={password} onChange={setPassword} placeholder="••••••••" icon={Lock} />
      </div>
      <div className="flex items-center justify-between text-xs text-muted">
        <label className="flex items-center gap-2 cursor-pointer hover:text-ink transition-colors">
          <input type="checkbox" className="accent-ink" /> Se souvenir de moi
        </label>
        <button type="button" onClick={() => setResetMode(true)} className="press hover:text-ink transition-colors underline underline-offset-4">
          Mot de passe oublié ?
        </button>
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="press group w-full flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50"
      >
        {loading ? "Connexion…" : "Se connecter"}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
      </button>
      <p className="text-xs text-center text-muted">
        Pas encore de compte ?{" "}
        <button type="button" onClick={onSwitch} className="press text-ink underline underline-offset-4 hover:text-muted transition-colors">
          Créer un compte
        </button>
      </p>
    </form>
  );
}

// ── Formulaire inscription ─────────────────────────────────────────────────────

function RegisterForm({ onSwitch, onSuccess }: { onSwitch: () => void; onSuccess: () => void }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) { setError("Numéro de téléphone requis."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    if (password.length < 8) { setError("8 caractères minimum."); return; }
    setError(""); setLoading(true);
    const supabase = createClient();
    const { data, error } = await supabase.auth.signUp({
      email, password,
      options: { data: { first_name: firstName, last_name: lastName } },
    });
    if (error) { setLoading(false); setError(error.message); return; }
    // Sauvegarde le téléphone dans profiles dès l'inscription
    if (data.user) {
      await upsertProfile(data.user.id, {
        firstName, lastName, phone,
        addressLine1: "", addressLine2: "", city: "", postalCode: "", country: "France", referralCode: null,
      });
      await fetch("/api/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, firstName, userId: data.user.id }),
      });
    }
    setLoading(false);
    onSuccess();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Prénom" value={firstName} onChange={setFirstName} placeholder="Lucas" icon={User} />
          <InputField label="Nom" value={lastName} onChange={setLastName} placeholder="Mourier" icon={User} />
        </div>
        <InputField label="Email" type="email" value={email} onChange={setEmail} placeholder="votre@email.fr" icon={EnvelopeSimple} />
        <InputField label="Téléphone" type="tel" value={phone} onChange={setPhone} placeholder="+33 6 00 00 00 00" icon={Phone} />
        <InputField label="Mot de passe" type="password" value={password} onChange={setPassword} placeholder="8 caractères minimum" icon={Lock} />
        <InputField label="Confirmer" type="password" value={confirm} onChange={setConfirm} placeholder="••••••••" icon={Lock} />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={loading}
        className="press group w-full flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50"
      >
        {loading ? "Création…" : "Créer mon compte"}
        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
      </button>
      <p className="text-xs text-center text-muted">
        Déjà un compte ?{" "}
        <button type="button" onClick={onSwitch} className="press text-ink underline underline-offset-4 hover:text-muted transition-colors">
          Se connecter
        </button>
      </p>
    </form>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

type AuthUser = { id: string; email: string; firstName: string };
type FormTab = "login" | "register";

export default function ComptePage() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [checking, setChecking] = useState(true);
  const [formTab, setFormTab] = useState<FormTab>("login");

  useEffect(() => {
    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? "",
          firstName: data.user.user_metadata?.first_name ?? "",
        });
      }
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email ?? "",
          firstName: session.user.user_metadata?.first_name ?? "",
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (checking) return null;

  // Connecté → dashboard complet
  if (user) {
    return <Dashboard userId={user.id} email={user.email} firstName={user.firstName} />;
  }

  // Non connecté → split layout login / register
  return (
    <div className="min-h-[calc(100vh-80px)] grid grid-cols-1 md:grid-cols-2">
      {/* Panneau gauche */}
      <div className="relative hidden md:flex flex-col justify-between bg-ink text-on-ink p-12 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)",
            backgroundSize: "24px 24px",
          }}
        />
        <div>
          <Image
            src="/brand/ek-monogram.png"
            alt="EK"
            width={56}
            height={56}
            className="invert [mix-blend-mode:screen] h-12 w-auto"
          />
        </div>
        <div className="space-y-6 relative z-10">
          <p className="kicker text-on-ink-muted">Elekka</p>
          <h2 className="display text-4xl xl:text-5xl leading-[0.95]">
            La qualité<br />des grandes<br />
            <span className="text-on-ink-muted">maisons.</span><br />
            Le prix<br />
            <span className="text-on-ink-muted">du juste.</span>
          </h2>
          <p className="text-sm text-on-ink-muted leading-relaxed max-w-[32ch]">
            Créez un compte pour suivre vos commandes, sauvegarder vos favoris et accéder à vos promotions.
          </p>
        </div>
        <div className="flex items-center gap-6 text-xs text-on-ink-muted relative z-10">
          <Link href="/boutique" className="hover:text-on-ink transition-colors press">Boutique</Link>
          <Link href="/a-propos" className="hover:text-on-ink transition-colors press">À propos</Link>
          <Link href="/#contact" className="hover:text-on-ink transition-colors press">Contact</Link>
        </div>
      </div>

      {/* Panneau droit */}
      <div className="flex flex-col justify-center px-6 md:px-16 py-24 md:py-0">
        <div className="w-full max-w-[380px] mx-auto">
          <div className="mb-10">
            <h1 className="display text-4xl md:text-5xl">
              {formTab === "login"
                ? <><span>Bon retour</span><br /><span className="text-muted">parmi nous.</span></>
                : <><span>Rejoindre</span><br /><span className="text-muted">Elekka.</span></>
              }
            </h1>
          </div>
          {formTab === "login" ? (
            <LoginForm
              onSwitch={() => setFormTab("register")}
              onSuccess={() => {
                const supabase = createClient();
                supabase.auth.getUser().then(({ data }) => {
                  if (data.user) {
                    setUser({
                      id: data.user.id,
                      email: data.user.email ?? "",
                      firstName: data.user.user_metadata?.first_name ?? "",
                    });
                  }
                });
              }}
            />
          ) : (
            <RegisterForm
              onSwitch={() => setFormTab("login")}
              onSuccess={() => setFormTab("login")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
