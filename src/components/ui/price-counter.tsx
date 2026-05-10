"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export function PriceCounter({ value, suffix = " €" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const duration = 900;
    const start = performance.now();
    const frame = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplayed(Math.round(easeOut(t) * value * 100) / 100);
      if (t < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [isInView, value]);

  const formatted = new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: value % 1 !== 0 ? 2 : 0,
    maximumFractionDigits: value % 1 !== 0 ? 2 : 0,
  }).format(displayed);

  return <span ref={ref}>{formatted}{suffix}</span>;
}
