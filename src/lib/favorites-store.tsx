"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { createClient } from "./supabase";

type FavCtx = {
  slugs: string[];
  toggle: (slug: string) => Promise<void>;
  isFavorite: (slug: string) => boolean;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  userId: string | null;
};

const FavContext = createContext<FavCtx | null>(null);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const supabase = createClient();

  // Récupère l'utilisateur connecté
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUserId(data.user?.id ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUserId(session?.user?.id ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  // Charge les favoris depuis Supabase si connecté, sinon localStorage
  useEffect(() => {
    if (userId) {
      supabase
        .from("favorites")
        .select("product_slug")
        .eq("user_id", userId)
        .then(({ data }) => {
          setSlugs(data?.map((r) => r.product_slug) ?? []);
        });
    } else {
      try {
        const stored = localStorage.getItem("elekka_favorites");
        if (stored) setSlugs(JSON.parse(stored));
      } catch {}
    }
  }, [userId]);

  async function toggle(slug: string) {
    const isFav = slugs.includes(slug);

    if (!userId) return; // Géré dans les composants via requireAuth

    // Connecté : Supabase
    if (isFav) {
      await supabase.from("favorites").delete().eq("user_id", userId).eq("product_slug", slug);
      setSlugs((prev) => prev.filter((s) => s !== slug));
    } else {
      await supabase.from("favorites").insert({ user_id: userId, product_slug: slug });
      setSlugs((prev) => [...prev, slug]);
    }
  }

  return (
    <FavContext.Provider value={{
      slugs,
      toggle,
      isFavorite: (slug) => slugs.includes(slug),
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      userId,
    }}>
      {children}
    </FavContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavContext);
  if (!ctx) throw new Error("useFavorites must be used within FavoritesProvider");
  return ctx;
}
