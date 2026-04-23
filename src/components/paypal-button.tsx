"use client";

import { useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase";

type Item = { name: string; colourLabel: string; size: string; priceEUR: number; quantity: number; slug: string };
type Address = { firstName: string; lastName: string; email: string; phone: string; line1: string; line2: string; city: string; postalCode: string; country: string };

type Props = {
  items: Item[];
  address: Address;
  promoCode: string | null;
  discountEUR: number;
  onValidate: () => boolean;
  onError: (msg: string) => void;
};

export function PayPalButton({ items, address, promoCode, discountEUR, onValidate, onError }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Refs pour toujours avoir les valeurs à jour dans les callbacks
  const itemsRef = useRef(items);
  const addressRef = useRef(address);
  const promoRef = useRef(promoCode);
  const discountRef = useRef(discountEUR);
  const validateRef = useRef(onValidate);
  const errorRef = useRef(onError);

  itemsRef.current = items;
  addressRef.current = address;
  promoRef.current = promoCode;
  discountRef.current = discountEUR;
  validateRef.current = onValidate;
  errorRef.current = onError;

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
    if (!clientId || !containerRef.current) return;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    let buttonsInstance: { close: () => void } | null = null;

    const initButtons = () => {
      if (!containerRef.current || !w.paypal) return;

      buttonsInstance = w.paypal.Buttons({
        style: { layout: "horizontal", color: "gold", shape: "rect", label: "paypal", height: 48 },

        onClick: (_data: unknown, actions: { reject: () => Promise<void>; resolve: () => Promise<void> }) => {
          if (!validateRef.current()) return actions.reject();
          return actions.resolve();
        },

        createOrder: async () => {
          const supabase = createClient();
          const { data } = await supabase.auth.getUser();
          const res = await fetch("/api/paypal/create-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              items: itemsRef.current,
              address: addressRef.current,
              userId: data.user?.id ?? null,
              promoCode: promoRef.current,
              discountEUR: discountRef.current,
            }),
          });
          const json = await res.json();
          if (!json.id) throw new Error(json.error ?? "Erreur PayPal");
          return json.id;
        },

        onApprove: async (data: { orderID: string }) => {
          const supabase = createClient();
          const { data: authData } = await supabase.auth.getUser();
          const res = await fetch("/api/paypal/capture-order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: data.orderID,
              items: itemsRef.current,
              address: addressRef.current,
              userId: authData.user?.id ?? null,
              discountEUR: discountRef.current,
              promoCode: promoRef.current,
            }),
          });
          const json = await res.json();
          if (!json.success) {
            errorRef.current(json.error ?? "Erreur lors de la capture PayPal");
            return;
          }
          window.location.href = "/checkout/success";
        },

        onError: () => {
          errorRef.current("Une erreur est survenue avec PayPal. Veuillez réessayer ou payer par carte.");
        },
      });

      if (buttonsInstance && containerRef.current) {
        (buttonsInstance as unknown as { render: (el: HTMLElement) => void }).render(containerRef.current);
      }
    };

    const existingScript = document.getElementById("paypal-sdk");
    if (existingScript) {
      if (w.paypal) initButtons();
      else existingScript.addEventListener("load", initButtons);
    } else {
      const script = document.createElement("script");
      script.id = "paypal-sdk";
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=EUR&locale=fr_FR`;
      script.addEventListener("load", initButtons);
      document.head.appendChild(script);
    }

    return () => {
      try { buttonsInstance?.close(); } catch {}
    };
  }, []);

  return <div ref={containerRef} />;
}
