"use client";

import type { ColourKey } from "@/lib/products";

/* ─── Mapping cuir → classe CSS ─────────────────────────────────────── */
export const leatherClassByColour: Record<ColourKey, string> = {
  "havana-brown": "leather-havana-brown",
  "noir":         "leather-noir",
  "dark-brown":   "leather-dark-brown",
};

/* ─── Prix formaté ──────────────────────────────────────────────────── */
export function Price({ value, light = false }: { value: number; light?: boolean }) {
  return (
    <span className={`shrink-0 font-mono text-sm tabular-nums ${light ? "text-on-ink" : "text-ink"}`}>
      {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)}
    </span>
  );
}

/* ─── Illustration CSS filet ─────────────────────────────────────────── */
export function BridleIllustration({
  leatherClass,
  size = "hero",
}: {
  leatherClass: string;
  size?: "hero" | "card" | "thumb";
}) {
  const dimensions = {
    hero:  "h-[430px] w-[318px] sm:h-[520px] sm:w-[386px] xl:h-[620px] xl:w-[460px]",
    card:  "h-[300px] w-[222px] md:h-[370px] md:w-[274px]",
    thumb: "h-[126px] w-[94px]",
  }[size];
  const ring = {
    hero:  "border-[22px] sm:border-[28px] xl:border-[34px]",
    card:  "border-[16px] md:border-[20px]",
    thumb: "border-[7px]",
  }[size];
  const crown = {
    hero:  "border-x-[16px] border-t-[16px] sm:border-x-[21px] sm:border-t-[21px] xl:border-x-[25px] xl:border-t-[25px]",
    card:  "border-x-[12px] border-t-[12px] md:border-x-[15px] md:border-t-[15px]",
    thumb: "border-x-[5px] border-t-[5px]",
  }[size];
  const buckle = {
    hero:  "h-5 w-5 sm:h-6 sm:w-6 xl:h-7 xl:w-7",
    card:  "h-4 w-4 md:h-5 md:w-5",
    thumb: "h-2 w-2",
  }[size];

  return (
    <div className={`relative ${dimensions} drop-shadow-[0_30px_60px_rgb(10_10_10/0.12)]`}>
      <div className={`absolute left-[20%] top-[8%] h-[76%] w-[60%] rounded-full ${ring} ${leatherClass}`} />
      <div className={`absolute left-[34%] top-[1%] h-[24%] w-[32%] rounded-t-full border-transparent ${crown} ${leatherClass}`} />
      <div className={`absolute left-[5%] top-[43%] h-[7%] w-[90%] rounded-full ${leatherClass}`} />
      <div className={`absolute left-[15%] top-[58%] h-[6%] w-[70%] rounded-full ${leatherClass}`} />
      <div className="absolute left-[27%] top-[29%] h-[42%] w-[46%] rounded-full border border-ink/10" />
      <div className={`absolute left-[20%] top-[42%] rounded-full border border-ink/20 bg-paper shadow-sm ${buckle}`} />
      <div className={`absolute right-[20%] top-[42%] rounded-full border border-ink/20 bg-paper shadow-sm ${buckle}`} />
      <div className={`absolute left-[46%] top-[63%] h-[28%] w-[8%] rounded-full ${leatherClass}`} />
      <div className="absolute left-[38%] top-[73%] h-[9%] w-[24%] rounded-full border border-ink/20" />
    </div>
  );
}
