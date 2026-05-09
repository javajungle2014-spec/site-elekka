"use client";

export function PerksMarquee() {
  const items = [
    "Livraison offerte",
    "Rênes plates offertes",
    "Cuir pleine fleur",
    "Paiement sécurisé",
    "Conçu par des cavaliers",
  ];
  const Loop = () => (
    <div className="flex items-center gap-14 shrink-0 px-7">
      {items.map((it, i) => (
        <span key={i} className="flex items-center gap-14">
          <span className="kicker-tight text-on-ink/85">{it}</span>
          <span className="w-[3px] h-[3px] rounded-full bg-on-ink/40" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="bg-ink text-on-ink py-3.5 overflow-hidden">
      <div className="flex marquee-track w-max">
        <Loop /><Loop />
      </div>
    </div>
  );
}
