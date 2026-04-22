"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import Link from "next/link";

export type LimelightNavItem = {
  id: string;
  label: string;
  href: string;
};

type LimelightNavProps = {
  items: LimelightNavItem[];
  activeIndex: number;
  className?: string;
};

export function LimelightNav({ items, activeIndex, className }: LimelightNavProps) {
  const [isReady, setIsReady] = useState(false);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const barRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const bar = barRef.current;
    const activeEl = itemRefs.current[activeIndex];
    if (!bar || !activeEl || activeIndex < 0) return;

    const newLeft = activeEl.offsetLeft + activeEl.offsetWidth / 2 - bar.offsetWidth / 2;
    bar.style.left = `${newLeft}px`;

    if (!isReady) setTimeout(() => setIsReady(true), 50);
  }, [activeIndex, isReady, items]);

  return (
    <nav className={`relative flex items-center ${className ?? ""}`}>
      {items.map(({ id, label, href }, index) => (
        <Link
          key={id}
          ref={(el) => { itemRefs.current[index] = el; }}
          href={href}
          className={`relative z-20 px-4 py-2 text-sm tracking-wide transition-colors duration-200 ${
            activeIndex === index ? "text-ink" : "text-muted hover:text-ink"
          }`}
        >
          {label}
        </Link>
      ))}

      {/* Limelight — barre en bas + cône de lumière vers le haut */}
      {activeIndex >= 0 && (
        <div
          ref={barRef}
          className={`absolute bottom-0 z-10 w-8 h-[2px] rounded-full bg-ink ${
            isReady ? "transition-[left] duration-300 ease-in-out" : ""
          }`}
          style={{ left: "-999px" }}
        >
          {/* Cône lumineux remontant vers le texte */}
          <div className="absolute left-[-60%] bottom-[2px] w-[220%] h-10 pointer-events-none [clip-path:polygon(10%_100%,28%_0%,72%_0%,90%_100%)] bg-gradient-to-t from-ink/10 to-transparent" />
        </div>
      )}
    </nav>
  );
}
