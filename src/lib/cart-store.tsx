"use client";
import { createContext, useContext, useEffect, useState } from "react";
import type { ColourKey, Size } from "./products";

export type CartItem = {
  slug: string;
  name: string;
  priceEUR: number;
  colour: ColourKey;
  colourLabel: string;
  colourSwatch: string;
  size: Size;
  quantity: number;
};

type CartCtx = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">) => void;
  removeItem: (slug: string, colour: ColourKey, size: Size) => void;
  updateQty: (slug: string, colour: ColourKey, size: Size, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("elekka_cart");
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem("elekka_cart", JSON.stringify(items));
  }, [items]);

  function addItem(newItem: Omit<CartItem, "quantity">) {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.slug === newItem.slug && i.colour === newItem.colour && i.size === newItem.size
      );
      if (existing) {
        return prev.map((i) =>
          i.slug === newItem.slug && i.colour === newItem.colour && i.size === newItem.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setIsOpen(true);
  }

  function removeItem(slug: string, colour: ColourKey, size: Size) {
    setItems((prev) =>
      prev.filter((i) => !(i.slug === slug && i.colour === colour && i.size === size))
    );
  }

  function updateQty(slug: string, colour: ColourKey, size: Size, qty: number) {
    if (qty <= 0) { removeItem(slug, colour, size); return; }
    setItems((prev) =>
      prev.map((i) =>
        i.slug === slug && i.colour === colour && i.size === size ? { ...i, quantity: qty } : i
      )
    );
  }

  function clearCart() {
    setItems([]);
    localStorage.removeItem("elekka_cart");
  }

  const totalItems = items.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = items.reduce((s, i) => s + i.priceEUR * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, totalItems, totalPrice, isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false) }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
