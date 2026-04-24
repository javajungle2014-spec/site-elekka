"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeSlash, ArrowRight, CheckCircle } from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8) { setError("8 caractères minimum."); return; }
    if (password !== confirm) { setError("Les mots de passe ne correspondent pas."); return; }
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) { setError("Une erreur est survenue. Le lien a peut-être expiré."); return; }
    setDone(true);
    setTimeout(() => router.push("/compte"), 3000);
  }

  if (done) {
    return (
      <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5">
        <div className="w-full max-w-[380px] text-center space-y-6">
          <div className="flex justify-center">
            <div className="w-16 h-16 border border-line rounded-full flex items-center justify-center">
              <CheckCircle size={28} weight="light" className="text-ink" />
            </div>
          </div>
          <div>
            <h1 className="display text-3xl">Mot de passe mis à jour.</h1>
            <p className="text-sm text-muted mt-2">Redirection vers votre compte…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5">
      <div className="w-full max-w-[380px] space-y-8">
        <div>
          <p className="kicker text-muted mb-2">Elekka</p>
          <h1 className="display text-4xl">Nouveau<br /><span className="text-muted">mot de passe.</span></h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="kicker text-muted">Nouveau mot de passe</label>
            <div className="relative">
              <input
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="8 caractères minimum"
                required
                className="w-full border-b border-line bg-transparent text-sm py-3 pr-10 outline-none focus:border-ink transition-colors placeholder:text-muted-soft"
              />
              <button type="button" onClick={() => setShow((v) => !v)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-muted hover:text-ink press p-1">
                {show ? <EyeSlash size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="kicker text-muted">Confirmer</label>
            <input
              type={show ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full border-b border-line bg-transparent text-sm py-3 outline-none focus:border-ink transition-colors placeholder:text-muted-soft"
            />
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="press group w-full flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50"
          >
            {loading ? "Enregistrement…" : "Enregistrer"}
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </form>
      </div>
    </div>
  );
}
