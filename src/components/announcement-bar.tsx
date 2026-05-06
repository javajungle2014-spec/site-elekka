const messages = [
  "Livraison offerte sur toutes les commandes",
  "Pour tout filet acheté — une paire de rênes offerte",
];

const track = [...messages, ...messages];

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-on-ink overflow-hidden py-2.5" aria-label="Informations">
      <div className="marquee-track flex gap-16 whitespace-nowrap will-change-transform">
        {track.map((msg, i) => (
          <span key={i} className="text-xs tracking-[0.14em] uppercase text-on-ink flex items-center gap-16">
            {msg}
            <span className="inline-block h-1 w-1 bg-on-ink/40 rounded-full" />
          </span>
        ))}
      </div>
    </div>
  );
}
