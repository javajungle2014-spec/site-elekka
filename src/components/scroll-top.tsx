"use client";
import { useEffect } from "react";

export function ScrollTop() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      // Attendre que la page soit entièrement rendue avant de scroller
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 96;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }, 150);
    }
  }, []);
  return null;
}
