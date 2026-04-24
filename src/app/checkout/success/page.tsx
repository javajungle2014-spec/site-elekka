"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Package, UserCircle } from "@phosphor-icons/react";
import { useCart } from "@/lib/cart-store";

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-[520px] text-center space-y-8">

        {/* Icône */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border border-line rounded-full flex items-center justify-center">
            <CheckCircle size={28} weight="light" className="text-ink" />
          </div>
        </div>

        {/* Message principal */}
        <div className="space-y-3">
          <p className="kicker text-muted">Commande confirmée</p>
          <h1 className="display text-4xl md:text-5xl">
            Merci.<br />
            <span className="text-muted">On s'en occupe.</span>
          </h1>
          <p className="text-sm text-muted leading-relaxed max-w-[38ch] mx-auto">
            Votre commande est confirmée. Vous allez recevoir un email de confirmation avec votre numéro de commande et le récapitulatif de votre achat.
          </p>
        </div>

        {/* Infos suivi */}
        <div className="border border-line p-5 text-left space-y-4">
          <div className="flex items-start gap-3">
            <Package size={16} className="text-muted shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium">Préparation en cours</p>
              <p className="text-xs text-muted mt-0.5">
                Vous recevrez un email avec votre numéro de suivi dès l'expédition.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 border-t border-line pt-4">
            <UserCircle size={16} className="text-muted shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Suivre votre commande</p>
              <p className="text-xs text-muted leading-relaxed">
                Connectez-vous à votre compte pour suivre le statut de votre commande en temps réel.
              </p>
              <p className="text-xs text-muted leading-relaxed">
                Pas encore de compte ? Créez-en un et ajoutez votre commande avec votre <span className="text-ink font-medium">numéro de commande</span> et votre <span className="text-ink font-medium">code postal</span>.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-3">
          <Link
            href="/compte"
            className="press group w-full flex items-center justify-between bg-ink text-on-ink px-6 py-4 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Accéder à mon compte
            <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <Link
            href="/boutique"
            className="press text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors"
          >
            Continuer les achats
          </Link>
        </div>

      </div>
    </div>
  );
}
