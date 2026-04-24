"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

function Tracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const ref = searchParams.get("ref");
    if (ref) {
      localStorage.setItem("referral_code", ref.toUpperCase());
    }
  }, [searchParams]);

  return null;
}

export function RefTracker() {
  return (
    <Suspense fallback={null}>
      <Tracker />
    </Suspense>
  );
}
