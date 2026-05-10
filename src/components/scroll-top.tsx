"use client";
import { useEffect } from "react";

export function ScrollTop() {
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0);
  }, []);
  return null;
}
