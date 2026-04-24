"use client";

import { useState, useEffect } from "react";

const messages = [
  "Livraison offerte sur toutes les commandes",
  "Pour tout filet acheté — une paire de rênes offerte",
];

export function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % messages.length);
        setVisible(true);
      }, 400);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-ink text-on-ink text-center py-2.5 px-5">
      <p
        className="text-xs tracking-wide transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {messages[index]}
      </p>
    </div>
  );
}
