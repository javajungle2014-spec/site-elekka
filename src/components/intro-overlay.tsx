"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";

export function IntroOverlay() {
  const [show, setShow] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("intro_shown")) {
      setShow(false);
      return;
    }
    sessionStorage.setItem("intro_shown", "1");

    const tExit = setTimeout(() => setExiting(true), 2000);
    const tRemove = setTimeout(() => setShow(false), 2000 + 1400);
    return () => { clearTimeout(tExit); clearTimeout(tRemove); };
  }, []);

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
        style={{ opacity: 0 }}
      >
        <Image
          src="/brand/ek-monogram.png"
          alt=""
          width={56}
          height={56}
          priority
          placeholder="empty"
          className="w-auto mx-auto" style={{ height: "120px", marginBottom: "-12px", mixBlendMode: "screen", filter: "invert(1)" }}
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        style={{ opacity: 0 }}
      >
        <Image
          src="/brand/elekka-wordmark.jpg"
          alt="Elekka"
          width={320}
          height={87}
          priority
          placeholder="empty"
          className="h-20 w-auto" style={{ mixBlendMode: "screen", filter: "invert(1)" }}
        />
      </motion.div>

      <motion.p
        className="kicker text-on-ink-muted tracking-[0.22em] text-sm"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
      >
        Maison française · Bridons en cuir
      </motion.p>
    </motion.div>
  );
}
