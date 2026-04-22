"use client";
import { motion, AnimatePresence } from "motion/react";
import { X, Heart } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: Props) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="auth-backdrop"
            className="fixed inset-0 z-[60] bg-ink/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="auth-modal"
            className="fixed inset-0 z-[61] flex items-center justify-center p-5"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-full max-w-[440px] bg-paper shadow-2xl overflow-hidden">

              {/* Bandeau noir en haut */}
              <div className="bg-ink px-8 pt-8 pb-6 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Image
                    src="/brand/ek-monogram.png"
                    alt="EK"
                    width={40}
                    height={40}
                    className="invert [mix-blend-mode:screen] h-8 w-auto"
                  />
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="press text-on-ink-muted hover:text-on-ink transition-colors p-1"
                  aria-label="Fermer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Contenu */}
              <div className="px-8 py-8 space-y-6">

                {/* Icône + titre */}
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="w-14 h-14 rounded-full border border-line flex items-center justify-center">
                    <Heart size={22} weight="regular" className="text-muted" />
                  </div>
                  <div>
                    <h2 className="display text-2xl md:text-3xl">
                      Vos favoris,<br />
                      <span className="text-muted">toujours avec vous.</span>
                    </h2>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-muted leading-relaxed text-center max-w-[34ch] mx-auto">
                  Créez un compte Elekka pour sauvegarder vos articles favoris et les retrouver depuis n'importe quel appareil.
                </p>

                {/* Boutons */}
                <div className="flex flex-col gap-3 pt-2">
                  <Link
                    href="/compte"
                    onClick={onClose}
                    className="press w-full flex items-center justify-center bg-ink text-on-ink py-4 text-sm font-medium tracking-wide hover:bg-ink-soft transition-colors"
                  >
                    Se connecter ou créer un compte
                  </Link>
                  <button
                    type="button"
                    onClick={onClose}
                    className="press w-full py-3 text-sm text-muted hover:text-ink transition-colors border border-line hover:border-ink"
                  >
                    Continuer sans compte
                  </button>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
