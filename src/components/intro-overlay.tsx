"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export function IntroOverlay() {
  const [show, setShow] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("intro_shown")) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("intro_shown", "1");

    // Logo visible immédiatement, contenu après 0.8s
    const tContent = setTimeout(() => setContentVisible(true), 800);
    // Auto-dismiss après 4s
    const tExit = setTimeout(() => setExiting(true), 4000);
    const tRemove = setTimeout(() => setShow(false), 4000 + 1400);
    return () => { clearTimeout(tContent); clearTimeout(tExit); clearTimeout(tRemove); };
  }, []);

  function dismiss() {
    setExiting(true);
    setTimeout(() => setShow(false), 1400);
  }

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-ink flex flex-col items-center justify-center gap-0"
      animate={exiting ? { y: "-100%" } : { y: 0 }}
      transition={exiting ? { duration: 1.4, ease: [0.76, 0, 0.24, 1] } : { duration: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="bg-ink"
      >
        <Image
          src="/brand/ek-monogram.png"
          alt=""
          width={56}
          height={56}
          priority
          placeholder="empty"
          className="w-auto mx-auto invert mix-blend-screen"
          style={{ height: "120px", marginBottom: "-12px" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="bg-ink"
      >
        <Image
          src="/brand/elekka-wordmark.jpg"
          alt="Elekka"
          width={320}
          height={87}
          priority
          placeholder="empty"
          className="h-20 w-auto invert mix-blend-screen"
        />
      </motion.div>

      <motion.p
        className="kicker text-on-ink-muted tracking-[0.22em] text-sm mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        Maison française · Bridons en cuir
      </motion.p>

      {contentVisible && (
        <motion.div
          className="flex flex-col items-center gap-5 px-5 text-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-on-ink-muted text-sm max-w-[34ch] leading-relaxed">
            Bridons en cuir pleine fleur · À partir de 99 €<br />
            Livraison offerte + rênes offertes pour tout filet.
          </p>
          <Link
            href="/boutique"
            onClick={dismiss}
            className="press inline-flex items-center gap-2 border border-on-ink-muted/40 text-on-ink text-xs tracking-[0.2em] uppercase px-6 py-3 hover:bg-on-ink/10 transition-colors"
          >
            Explorer la boutique
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1.5 6h9M6 1.5l4.5 4.5L6 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
          <button
            type="button"
            onClick={dismiss}
            className="text-on-ink-muted text-[11px] tracking-widest hover:text-on-ink transition-colors press"
          >
            Continuer sans entrer
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
