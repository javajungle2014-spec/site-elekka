"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@phosphor-icons/react";

const SPRING = "cubic-bezier(0.16, 1, 0.3, 1)";

type Word = { text: string; muted?: boolean; italic?: boolean };
type Line = Word[];

const headlineLines: Line[] = [
  [{ text: "Pensé pour" }],
  [{ text: "le cheval.", muted: true }],
  [{ text: "Conçu pour" }, { text: " vous.", italic: true }],
];

let _wi = 0;
const linesWithDelays = headlineLines.map((line) =>
  line.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((word) => ({
        word,
        delay: 0.35 + _wi++ * 0.1,
        muted: segment.muted,
        italic: segment.italic,
      }))
  )
);

export function HomeHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <section
        className="relative flex flex-col overflow-hidden -mt-16 md:-mt-20"
        style={{ height: "100dvh", backgroundColor: "#0f1210" }}
        aria-label="Elekka — Bridons en cuir"
      >
        {/* ── Background ─────────────────────────────────────────────────────── */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/brand/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.82] contrast-[1.05] saturate-[0.9]"
            style={{ objectPosition: "55% 32%" }}
          />

          {/* Left vignette — darkens text area */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/88 via-black/55 to-black/10" />
          {/* Top vignette — blends behind transparent header */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-transparent" />
          {/* Bottom vignette — grounds the content area */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        </div>

        {/* ── Brand strip ────────────────────────────────────────────────────── */}
        <div
          className="relative z-20 flex items-center justify-center pt-24 md:pt-32"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 1.4s ${SPRING} 0s`,
          }}
        >
          <div className="flex items-center gap-5">
            <div className="w-12 md:w-24 h-px bg-white/20" />
            <span className="text-white/55 text-[9px] md:text-[10px] tracking-[0.45em] uppercase font-medium">
              Maison française · Bridons en cuir
            </span>
            <div className="w-12 md:w-24 h-px bg-white/20" />
          </div>
        </div>

        {/* ── Main content ───────────────────────────────────────────────────── */}
        <div className="relative z-20 flex-1 flex flex-col justify-end pb-14 md:pb-20 px-5 md:px-10">
          <div className="mx-auto max-w-[1400px] w-full">

            {/* Kicker */}
            <p
              className="kicker text-white/45 mb-5"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(14px)",
                transition: `opacity 0.8s ${SPRING} 0.25s, transform 0.8s ${SPRING} 0.25s`,
              }}
            >
              Collection 2026
            </p>

            {/* Headline — words slide up word by word */}
            <h1
              className="display text-[3.2rem] md:text-[5.5rem] xl:text-[6.75rem] text-white mb-7 leading-none"
              aria-label="Pensé pour le cheval. Conçu pour vous."
            >
              {linesWithDelays.map((words, lineIdx) => (
                <div key={lineIdx} className="overflow-hidden">
                  <div className="flex flex-wrap gap-x-[0.28em]">
                    {words.map(({ word, delay, muted, italic }) => (
                      <span
                        key={`${lineIdx}-${word}-${delay}`}
                        className="inline-block"
                        style={{
                          opacity: visible ? 1 : 0,
                          transform: visible ? "translateY(0)" : "translateY(108%)",
                          transition: `opacity 0.65s ${SPRING} ${delay}s, transform 0.65s ${SPRING} ${delay}s`,
                        }}
                      >
                        <span
                          className={[
                            muted ? "text-white/38" : "",
                            italic ? "italic font-light" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                        >
                          {word}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </h1>

            {/* Description */}
            <p
              className="text-white/52 text-sm md:text-base max-w-[46ch] mb-8 leading-relaxed"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.8s ${SPRING} 1.15s, transform 0.8s ${SPRING} 1.15s`,
              }}
            >
              Même exigence, même technologie, même qualité que les grandes
              maisons — sans leur marge.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap items-center gap-3"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.8s ${SPRING} 1.35s, transform 0.8s ${SPRING} 1.35s`,
              }}
            >
              <Link
                href="/boutique"
                className="group inline-flex items-center gap-3 bg-white text-ink px-6 py-4 text-sm tracking-wide press hover:bg-white/90"
              >
                Voir la collection
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
              <Link
                href="/a-propos"
                className="inline-flex items-center gap-2 px-2 py-4 text-sm tracking-wide text-white/55 underline underline-offset-[6px] decoration-white/25 hover:text-white press"
              >
                L'histoire de la marque
              </Link>
            </div>

          </div>
        </div>

        {/* ── Scroll hint ────────────────────────────────────────────────────── */}
        <div
          className="absolute bottom-7 right-8 z-20 hidden md:flex flex-col items-center gap-2"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 1s ${SPRING} 1.8s`,
          }}
        >
          <span className="text-white/30 text-[9px] tracking-[0.35em] uppercase rotate-90 origin-center mb-4">
            Scroll
          </span>
          <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent" />
        </div>

      </section>

      {/* Marquee strap */}
      <MarqueeStrap />
    </>
  );
}

function MarqueeStrap() {
  const items = [
    "Conçu par des cavaliers pour des cavaliers",
    "Moins de pression. Plus de connexion.",
    "Conçu pour gagner.",
    "Pensé pour le cheval. Pas pour le marketing.",
    "Livraison gratuite en France & en Europe",
    "Tu payes le produit. Pas la marque.",
  ];
  const track = [...items, ...items];
  return (
    <div className="border-y border-line overflow-hidden" aria-hidden>
      <div className="marquee-track flex gap-12 py-5 whitespace-nowrap will-change-transform">
        {track.map((t, i) => (
          <span
            key={i}
            className="text-sm tracking-[0.18em] uppercase text-muted flex items-center gap-12"
          >
            {t}
            <span className="inline-block h-1 w-1 bg-muted/50 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
