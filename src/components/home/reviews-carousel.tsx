"use client";

import { useEffect, useRef, useState } from "react";
import { Star, ArrowLeft, ArrowRight } from "@phosphor-icons/react";

type Review = {
  id: number;
  name: string;
  location: string | null;
  rating: number;
  text: string;
  photo_url: string | null;
  order_date: string | null;
};

const CARD_WIDTH = 320 + 24; // largeur + margin

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          weight={i < rating ? "fill" : "regular"}
          className={i < rating ? "text-ink" : "text-muted-soft"}
        />
      ))}
    </div>
  );
}

function Avatar({ name, photoUrl }: { name: string; photoUrl: string | null }) {
  const initials = name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
  if (photoUrl) {
    return (
      <img src={photoUrl} alt={name} className="w-10 h-10 rounded-full object-cover shrink-0" />
    );
  }
  return (
    <div className="w-10 h-10 rounded-full bg-ink text-on-ink flex items-center justify-center text-xs font-semibold shrink-0">
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="w-[320px] shrink-0 bg-paper border border-line p-6 flex flex-col gap-4 mx-3">
      <StarRating rating={review.rating} />
      <p className="text-sm text-ink leading-relaxed flex-1">"{review.text}"</p>
      <div className="flex items-center gap-3 border-t border-line pt-4">
        <Avatar name={review.name} photoUrl={review.photo_url} />
        <div>
          <p className="text-sm font-semibold">{review.name}</p>
          <p className="text-xs text-muted">
            {review.location && `${review.location} · `}
            {review.order_date
              ? `Commande de ${new Date(review.order_date).toLocaleDateString("fr-FR", { month: "long", year: "numeric" })}`
              : ""}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ReviewsCarousel() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const trackRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    fetch("/api/reviews")
      .then((r) => r.json())
      .then((data) => setReviews(data.reviews ?? []));
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const track = trackRef.current;
    if (!track) return;

    function animate() {
      if (!pausedRef.current && track) {
        posRef.current += 0.5;
        const half = track.scrollWidth / 2;
        if (posRef.current >= half) posRef.current = 0;
        track.style.transform = `translateX(-${posRef.current}px)`;
      }
      animRef.current = requestAnimationFrame(animate);
    }

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, [reviews]);

  function slide(direction: "prev" | "next") {
    pausedRef.current = true;
    posRef.current += direction === "next" ? CARD_WIDTH : -CARD_WIDTH;
    if (posRef.current < 0) posRef.current = 0;
    const track = trackRef.current;
    if (track) {
      const half = track.scrollWidth / 2;
      if (posRef.current >= half) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
    }
    setTimeout(() => { pausedRef.current = false; }, 2000);
  }

  if (reviews.length === 0) return null;

  const doubled = [...reviews, ...reviews];

  return (
    <section className="pt-12 pb-12 md:pt-16 md:pb-14 overflow-hidden">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 mb-10 flex items-end justify-between">
        <div>
          <p className="kicker text-muted mb-3">Avis clients</p>
          <h2 className="display text-3xl md:text-4xl">
            Ils ont fait confiance<br />
            <span className="text-muted">à Elekka.</span>
          </h2>
        </div>

        {/* Flèches */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => slide("prev")}
            className="press w-10 h-10 border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors"
            aria-label="Précédent"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            type="button"
            onClick={() => slide("next")}
            className="press w-10 h-10 border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors"
            aria-label="Suivant"
          >
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div
        className="relative"
        onMouseEnter={() => { pausedRef.current = true; }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-paper to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-paper to-transparent" />

        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: "max-content" }}
        >
          {doubled.map((review, i) => (
            <ReviewCard key={`${review.id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
