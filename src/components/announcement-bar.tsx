"use client";

import { useState, useEffect } from "react";

const messages = [
  "Livraison offerte sur toutes les commandes",
  "Pour tout filet acheté — une paire de rênes offerte",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [state, setState] = useState<"visible" | "exit" | "enter">("visible");

  useEffect(() => {
    const interval = setInterval(() => {
      setState("exit");
      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setState("enter");
        setTimeout(() => setState("visible"), 350);
      }, 350);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const transform =
    state === "exit" ? "translateX(-100%)" :
    state === "enter" ? "translateX(100%)" :
    "translateX(0)";

  return (
    <div className="bg-ink text-on-ink text-center py-2.5 px-5 overflow-hidden">
      <p
        className="text-xs tracking-wide"
        style={{
          transform,
          opacity: state === "visible" ? 1 : 0,
          transition: "transform 350ms ease, opacity 350ms ease",
        }}
      >
        {messages[index]}
      </p>
    </div>
  );
}
