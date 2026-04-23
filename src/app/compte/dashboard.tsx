"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  House, Package, Heart, Tag, IdentificationCard,
  SignOut, CaretRight, Copy, Check, Truck, MapPin,
  ArrowUpRight, ShoppingBag, X,
} from "@phosphor-icons/react";
import { createClient } from "@/lib/supabase";
import { useFavorites } from "@/lib/favorites-store";
import { useCart } from "@/lib/cart-store";
import { products, formatPrice } from "@/lib/products";
import {
  fetchOrders, fetchProfile, upsertProfile, fetchPromotions,
  type Order, type Profile, type UserPromotion, type OrderStatus,
} from "@/lib/account-store";

// ── Types ─────────────────────────────────────────────────────────────────────

type DashTab = "overview" | "orders" | "favorites" | "promotions" | "profile";

// ── Constants ─────────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<OrderStatus, { label: string; cls: string }> = {
  en_preparation: { label: "En préparation", cls: "border border-line text-muted" },
  expediee: { label: "Expédiée", cls: "bg-ink-soft text-on-ink" },
  livree: { label: "Livrée", cls: "bg-ink text-on-ink" },
  annulee: { label: "Annulée", cls: "border border-line text-muted-soft" },
};

const TAB_ITEMS: { id: DashTab; label: string; Icon: React.ElementType }[] = [
  { id: "overview", label: "Aperçu", Icon: House },
  { id: "orders", label: "Commandes", Icon: Package },
  { id: "favorites", label: "Favoris", Icon: Heart },
  { id: "promotions", label: "Promotions", Icon: Tag },
  { id: "profile", label: "Mon profil", Icon: IdentificationCard },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatShortDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });
}

function formatOrderId(id: string) {
  return `#${id.slice(0, 8).toUpperCase()}`;
}

function isPromoActive(promo: UserPromotion) {
  return !promo.used && (!promo.validUntil || new Date(promo.validUntil) > new Date());
}

// ── Shared components ─────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const { label, cls } = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[11px] tracking-wide rounded-sm ${cls}`}>
      {label}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  async function handleCopy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      type="button"
      onClick={handleCopy}
      className="press inline-flex items-center gap-1.5 text-xs text-muted hover:text-ink transition-colors"
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copié !" : "Copier"}
    </button>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <p className="kicker text-muted mb-5">{children}</p>;
}

function EmptyState({ icon: Icon, message, cta }: { icon: React.ElementType; message: string; cta?: { label: string; href: string } }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <Icon size={40} weight="thin" className="text-muted-soft" />
      <p className="text-sm text-muted">{message}</p>
      {cta && (
        <Link href={cta.href} className="press text-sm underline underline-offset-4 text-ink hover:text-muted transition-colors">
          {cta.label}
        </Link>
      )}
    </div>
  );
}

// ── Onglet Aperçu ─────────────────────────────────────────────────────────────

function OverviewTab({
  firstName, orders, slugs, promotions, onTabChange,
}: {
  firstName: string;
  orders: Order[];
  slugs: string[];
  promotions: UserPromotion[];
  onTabChange: (tab: DashTab) => void;
}) {
  const activePromos = promotions.filter(isPromoActive);

  return (
    <div className="space-y-12">
      <div>
        <p className="kicker text-muted mb-2">Bienvenue</p>
        <h2 className="display text-4xl md:text-5xl">
          {firstName || "Cavalier"}.
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 md:gap-4">
        {([
          { label: "Commandes", value: orders.length, tab: "orders" as DashTab },
          { label: "Favoris", value: slugs.length, tab: "favorites" as DashTab },
          { label: "Promotions", value: activePromos.length, tab: "promotions" as DashTab },
        ] as const).map(({ label, value, tab }) => (
          <button
            key={tab}
            type="button"
            onClick={() => onTabChange(tab)}
            className="press border border-line p-4 md:p-6 text-left hover:border-ink transition-colors group"
          >
            <p className="font-mono text-2xl md:text-3xl text-ink mb-1">{value}</p>
            <p className="kicker text-muted group-hover:text-ink transition-colors text-[10px] md:text-[11px]">{label}</p>
          </button>
        ))}
      </div>

      {/* Dernière commande */}
      {orders.length > 0 && (
        <div>
          <SectionTitle>Dernière commande</SectionTitle>
          <button
            type="button"
            onClick={() => onTabChange("orders")}
            className="press w-full border border-line p-5 text-left hover:border-ink transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="text-sm font-semibold font-mono">{orders[0].orderNumber}</span>
                  <StatusBadge status={orders[0].status} />
                </div>
                <p className="text-xs text-muted">
                  {formatDate(orders[0].createdAt)} · {orders[0].items.length} article{orders[0].items.length > 1 ? "s" : ""}
                </p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="font-mono text-sm">{formatPrice(orders[0].totalEUR)}</span>
                <ArrowUpRight size={14} className="text-muted" />
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Favoris rapides */}
      {slugs.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-5">
            <SectionTitle>Mes favoris</SectionTitle>
            <button
              type="button"
              onClick={() => onTabChange("favorites")}
              className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors -mt-5"
            >
              Voir tout
            </button>
          </div>
          <div>
            {slugs.slice(0, 3).map((slug) => {
              const p = products.find((pr) => pr.slug === slug);
              if (!p) return null;
              return (
                <Link
                  key={slug}
                  href={`/boutique/${p.slug}`}
                  className="flex items-center justify-between py-3 border-b border-line hover:text-muted transition-colors press"
                >
                  <span className="text-sm">{p.name}</span>
                  <span className="font-mono text-sm text-muted">{formatPrice(p.priceEUR)}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Promo active */}
      {activePromos.length > 0 && (
        <div>
          <SectionTitle>Code promo disponible</SectionTitle>
          <div className="border border-line p-5 flex items-center justify-between gap-4">
            <div>
              {activePromos[0].label && (
                <p className="text-xs text-muted mb-1">{activePromos[0].label}</p>
              )}
              <span className="font-mono text-lg tracking-widest">{activePromos[0].code}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-ink">
                {activePromos[0].discountType === "percent"
                  ? `-${activePromos[0].discountValue}%`
                  : `-${formatPrice(activePromos[0].discountValue)}`}
              </span>
              <CopyButton text={activePromos[0].code} />
            </div>
          </div>
          {activePromos.length > 1 && (
            <button
              type="button"
              onClick={() => onTabChange("promotions")}
              className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors mt-3"
            >
              +{activePromos.length - 1} autre{activePromos.length > 2 ? "s" : ""} code{activePromos.length > 2 ? "s" : ""}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ── Onglet Commandes ──────────────────────────────────────────────────────────

function OrderRow({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-line last:border-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="press w-full py-5 flex items-center gap-4 text-left"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1.5">
            <span className="text-sm font-semibold font-mono">{order.orderNumber}</span>
            <StatusBadge status={order.status} />
          </div>
          <p className="text-xs text-muted">
            {formatDate(order.createdAt)} · {order.items.length} article{order.items.length > 1 ? "s" : ""}
          </p>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <span className="font-mono text-sm">{formatPrice(order.totalEUR)}</span>
          <CaretRight
            size={14}
            className={`text-muted transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {expanded && (
        <div className="pb-8 space-y-8">
          {/* Articles */}
          <div>
            <p className="kicker text-muted mb-4">Articles</p>
            <ul className="divide-y divide-line">
              {order.items.map((item, i) => (
                <li key={i} className="py-3 flex items-center justify-between gap-4">
                  <div>
                    <Link href={`/boutique/${item.slug}`} className="text-sm font-medium hover:text-muted transition-colors">
                      {item.name}
                    </Link>
                    <p className="text-xs text-muted mt-0.5">
                      {item.colourLabel} · Taille {item.size} · Qté {item.qty}
                    </p>
                  </div>
                  <span className="font-mono text-sm shrink-0">{formatPrice(item.priceEUR)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Suivi */}
          {order.trackingNumber && (
            <div>
              <p className="kicker text-muted mb-3">Numéro de suivi</p>
              <div className="flex items-center gap-2 text-sm">
                <Truck size={14} className="text-muted shrink-0" />
                <span className="font-mono">{order.trackingNumber}</span>
                <CopyButton text={order.trackingNumber} />
              </div>
            </div>
          )}

          {/* Adresse */}
          <div>
            <p className="kicker text-muted mb-3">Adresse de livraison</p>
            <div className="flex items-start gap-2 text-sm text-muted">
              <MapPin size={14} className="mt-0.5 shrink-0" />
              <div className="space-y-0.5">
                <p className="text-ink">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                <p>{order.shippingAddress.line1}</p>
                {order.shippingAddress.line2 && <p>{order.shippingAddress.line2}</p>}
                <p>{order.shippingAddress.postalCode} {order.shippingAddress.city}</p>
                <p>{order.shippingAddress.country}</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex items-center justify-between pt-4 border-t border-line">
            <p className="text-sm text-muted">Total commande</p>
            <p className="font-mono font-semibold">{formatPrice(order.totalEUR)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function ClaimOrderForm({ userId, onClaimed }: { userId: string; onClaimed: () => void }) {
  const [orderNumber, setOrderNumber] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const res = await fetch("/api/claim-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderNumber: orderNumber.toUpperCase(), postalCode, userId }),
    });
    const json = await res.json();
    if (json.success) {
      setStatus("success");
      setOrderNumber("");
      setPostalCode("");
      onClaimed();
    } else {
      setStatus("error");
      setError(json.error ?? "Erreur inconnue");
    }
  }

  return (
    <div className="border border-line p-5 mt-8">
      <p className="kicker text-muted mb-4">Ajouter une commande passée sans compte</p>
      {status === "success" ? (
        <p className="flex items-center gap-2 text-sm text-ink">
          <Check size={14} /> Commande ajoutée à votre compte.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted">Numéro de commande</label>
              <input
                value={orderNumber}
                onChange={(e) => { setOrderNumber(e.target.value.toUpperCase()); setStatus("idle"); }}
                placeholder="ELK-80"
                className="bg-transparent border-b border-line py-2.5 text-sm focus:outline-none focus:border-ink transition-colors placeholder:text-muted-soft font-mono"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-muted">Code postal de livraison</label>
              <input
                value={postalCode}
                onChange={(e) => { setPostalCode(e.target.value); setStatus("idle"); }}
                placeholder="75008"
                className="bg-transparent border-b border-line py-2.5 text-sm focus:outline-none focus:border-ink transition-colors placeholder:text-muted-soft"
              />
            </div>
          </div>
          {status === "error" && <p className="text-xs text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={status === "loading" || !orderNumber.trim() || !postalCode.trim()}
            className="press text-sm bg-ink text-on-ink px-5 py-2.5 hover:bg-ink-soft transition-colors disabled:opacity-40"
          >
            {status === "loading" ? "Vérification…" : "Ajouter"}
          </button>
        </form>
      )}
    </div>
  );
}

function OrdersTab({ orders, userId, onOrderClaimed }: { orders: Order[]; userId: string; onOrderClaimed: () => void }) {
  return (
    <div>
      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          message="Vous n'avez pas encore passé de commande."
          cta={{ label: "Découvrir la collection", href: "/boutique" }}
        />
      ) : (
        <>
          <SectionTitle>{orders.length} commande{orders.length > 1 ? "s" : ""}</SectionTitle>
          <div>
            {orders.map((order) => (
              <OrderRow key={order.id} order={order} />
            ))}
          </div>
        </>
      )}
      <ClaimOrderForm userId={userId} onClaimed={onOrderClaimed} />
    </div>
  );
}

// ── Onglet Favoris ────────────────────────────────────────────────────────────

function FavoritesTab() {
  const { slugs, toggle } = useFavorites();
  const { addItem } = useCart();
  const favoriteProducts = products.filter((p) => slugs.includes(p.slug));

  const favFamilies = [...new Set(favoriteProducts.map((p) => p.family))];
  const recommendations = products
    .filter((p) => !slugs.includes(p.slug) && favFamilies.includes(p.family))
    .slice(0, 3);
  const fallback = products
    .filter((p) => !slugs.includes(p.slug) && !recommendations.includes(p))
    .slice(0, 3 - recommendations.length);
  const allRecs = [...recommendations, ...fallback].slice(0, 3);

  if (favoriteProducts.length === 0) {
    return (
      <EmptyState
        icon={Heart}
        message="Aucun favori pour l'instant."
        cta={{ label: "Découvrir la collection", href: "/boutique" }}
      />
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <SectionTitle>{favoriteProducts.length} article{favoriteProducts.length > 1 ? "s" : ""}</SectionTitle>
        <ul className="space-y-3">
          {favoriteProducts.map((p) => (
            <li key={p.slug} className="border border-line p-4 md:p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="kicker text-muted mb-1">{p.family}</p>
                <Link href={`/boutique/${p.slug}`} className="text-sm font-semibold hover:text-muted transition-colors">
                  {p.name}
                </Link>
                <p className="font-mono text-sm mt-1.5">{formatPrice(p.priceEUR)}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      slug: p.slug,
                      name: p.name,
                      priceEUR: p.priceEUR,
                      colour: p.defaultColour,
                      colourLabel: p.colours.find((c) => c.key === p.defaultColour)?.label ?? "",
                      colourSwatch: p.colours.find((c) => c.key === p.defaultColour)?.swatch ?? "#000",
                      size: p.defaultSize,
                    })
                  }
                  className="press flex items-center gap-1.5 bg-ink text-on-ink px-3 py-2 text-xs hover:bg-ink-soft transition-colors"
                >
                  <ShoppingBag size={12} />
                  Ajouter
                </button>
                <button
                  type="button"
                  onClick={() => toggle(p.slug)}
                  className="press p-2 text-muted hover:text-ink transition-colors"
                  aria-label="Retirer des favoris"
                >
                  <X size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {allRecs.length > 0 && (
        <div>
          <SectionTitle>Pour vous</SectionTitle>
          <ul className="divide-y divide-line">
            {allRecs.map((p) => (
              <li key={p.slug} className="py-4 flex items-center justify-between gap-4">
                <div>
                  <p className="kicker text-muted mb-1">{p.family}</p>
                  <Link href={`/boutique/${p.slug}`} className="text-sm font-semibold hover:text-muted transition-colors">
                    {p.name}
                  </Link>
                  <p className="font-mono text-sm mt-1">{formatPrice(p.priceEUR)}</p>
                </div>
                <Link
                  href={`/boutique/${p.slug}`}
                  className="press flex items-center gap-1 text-xs text-muted hover:text-ink transition-colors shrink-0"
                >
                  Voir <ArrowUpRight size={12} />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Onglet Promotions ─────────────────────────────────────────────────────────

function PromotionsTab({ promotions }: { promotions: UserPromotion[] }) {
  if (promotions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
        <Tag size={40} weight="thin" className="text-muted-soft" />
        <p className="text-sm text-muted">Aucune promotion disponible pour le moment.</p>
        <p className="text-xs text-muted-soft max-w-[34ch] leading-relaxed">
          Vos codes de réduction apparaîtront ici dès qu'ils vous seront attribués.
        </p>
      </div>
    );
  }

  const now = new Date();

  return (
    <div>
      <SectionTitle>{promotions.filter(isPromoActive).length} code{promotions.filter(isPromoActive).length > 1 ? "s" : ""} actif{promotions.filter(isPromoActive).length > 1 ? "s" : ""}</SectionTitle>
      <ul className="space-y-4">
        {promotions.map((promo) => {
          const expired = promo.validUntil ? new Date(promo.validUntil) < now : false;
          const inactive = promo.used || expired;
          return (
            <li
              key={promo.id}
              className={`border p-5 md:p-6 transition-colors ${inactive ? "border-line opacity-50" : "border-line hover:border-ink"}`}
            >
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 min-w-0">
                  {promo.label && (
                    <p className="text-xs text-muted mb-2">{promo.label}</p>
                  )}
                  <div className="flex items-center gap-4 flex-wrap">
                    <span className="font-mono text-xl md:text-2xl tracking-widest text-ink">
                      {promo.code}
                    </span>
                    {!inactive && <CopyButton text={promo.code} />}
                  </div>
                  <div className="mt-3 text-xs text-muted space-y-0.5">
                    {promo.used && <p>Déjà utilisé</p>}
                    {expired && !promo.used && <p>Expiré</p>}
                    {!inactive && promo.validUntil && (
                      <p>
                        Valable jusqu'au{" "}
                        {new Date(promo.validUntil).toLocaleDateString("fr-FR", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    )}
                    {!inactive && !promo.validUntil && <p>Sans date d'expiration</p>}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-semibold text-ink text-lg">
                    {promo.discountType === "percent"
                      ? `-${promo.discountValue}%`
                      : `-${formatPrice(promo.discountValue)}`}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// ── Onglet Profil ─────────────────────────────────────────────────────────────

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between py-3.5 border-b border-line last:border-0 gap-4">
      <span className="kicker text-muted shrink-0">{label}</span>
      <span className={`text-sm text-right ${value ? "text-ink" : "text-muted-soft italic"}`}>
        {value || "Non renseigné"}
      </span>
    </div>
  );
}

function EditField({
  label, value, onChange, type = "text", placeholder, disabled,
}: {
  label: string; value: string; onChange?: (v: string) => void;
  type?: string; placeholder?: string; disabled?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="kicker text-muted">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        placeholder={placeholder}
        disabled={disabled}
        className="border-b border-line bg-transparent text-sm py-2.5 outline-none focus:border-ink transition-colors placeholder:text-muted-soft disabled:text-muted-soft disabled:cursor-not-allowed"
      />
    </div>
  );
}

function ProfileTab({ userId, email, authFirstName }: { userId: string; email: string; authFirstName: string }) {
  const [profile, setProfile] = useState<Profile>({
    firstName: "", lastName: "", phone: "",
    addressLine1: "", addressLine2: "", city: "", postalCode: "", country: "France",
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Profile>(profile);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    fetchProfile(userId).then((p) => {
      // Si le prénom est vide (utilisateur créé avant la table profiles),
      // on pré-remplit avec les données de l'auth
      const merged = { ...p, firstName: p.firstName || authFirstName };
      setProfile(merged);
      setDraft(merged);
      setLoading(false);
    });
  }, [userId, authFirstName]);

  function startEdit() {
    setDraft(profile);
    setEditing(true);
  }

  function cancelEdit() {
    setDraft(profile);
    setEditing(false);
  }

  function setDraftField<K extends keyof Profile>(key: K) {
    return (v: string) => setDraft((p) => ({ ...p, [key]: v }));
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await upsertProfile(userId, draft);
    setProfile(draft);
    setSaving(false);
    setSaved(true);
    setEditing(false);
    setTimeout(() => setSaved(false), 3000);
  }

  async function handleResetPassword() {
    const supabase = createClient();
    await supabase.auth.resetPasswordForEmail(email);
    setResetSent(true);
    setTimeout(() => setResetSent(false), 6000);
  }

  if (loading) {
    return <div className="py-20 text-center text-sm text-muted">Chargement…</div>;
  }

  // ── Mode lecture ──────────────────────────────────────────────────────────────
  if (!editing) {
    const hasAddress = profile.addressLine1 || profile.city || profile.postalCode;
    return (
      <div className="space-y-12 max-w-[520px]">
        {saved && (
          <p className="flex items-center gap-2 text-sm text-muted border border-line px-4 py-3">
            <Check size={14} /> Modifications enregistrées.
          </p>
        )}

        {/* Informations personnelles */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <SectionTitle>Informations personnelles</SectionTitle>
            <button
              type="button"
              onClick={startEdit}
              className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors -mt-5"
            >
              Modifier
            </button>
          </div>
          <div>
            <InfoRow label="Prénom" value={profile.firstName} />
            <InfoRow label="Nom" value={profile.lastName} />
            <InfoRow label="Email" value={email} />
            <InfoRow label="Téléphone" value={profile.phone} />
          </div>
        </div>

        {/* Adresse */}
        <div>
          <SectionTitle>Adresse de livraison</SectionTitle>
          {hasAddress ? (
            <div className="text-sm text-muted space-y-0.5 leading-relaxed">
              {profile.addressLine1 && <p className="text-ink">{profile.addressLine1}</p>}
              {profile.addressLine2 && <p>{profile.addressLine2}</p>}
              {(profile.postalCode || profile.city) && (
                <p>{[profile.postalCode, profile.city].filter(Boolean).join(" ")}</p>
              )}
              {profile.country && <p>{profile.country}</p>}
            </div>
          ) : (
            <p className="text-sm text-muted-soft italic">Aucune adresse enregistrée.</p>
          )}
        </div>

        {/* Sécurité */}
        <div className="border-t border-line pt-8">
          <SectionTitle>Sécurité</SectionTitle>
          {resetSent ? (
            <p className="text-sm text-muted flex items-center gap-2">
              <Check size={14} />
              Un email de réinitialisation a été envoyé à {email}.
            </p>
          ) : (
            <button
              type="button"
              onClick={handleResetPassword}
              className="press text-sm text-muted hover:text-ink underline underline-offset-4 transition-colors"
            >
              Réinitialiser mon mot de passe
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Mode édition ──────────────────────────────────────────────────────────────
  return (
    <div className="space-y-12 max-w-[520px]">
      <form onSubmit={handleSave} className="space-y-10">
        <div>
          <div className="flex items-center justify-between mb-2">
            <SectionTitle>Informations personnelles</SectionTitle>
            <button
              type="button"
              onClick={cancelEdit}
              className="press text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors -mt-5"
            >
              Annuler
            </button>
          </div>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <EditField label="Prénom" value={draft.firstName} onChange={setDraftField("firstName")} placeholder="Lucas" />
              <EditField label="Nom" value={draft.lastName} onChange={setDraftField("lastName")} placeholder="Mourier" />
            </div>
            <div className="flex flex-col gap-2">
              <EditField label="Email" value={email} type="email" disabled />
              <p className="text-xs text-muted-soft -mt-1">Pour changer d'adresse, contactez le support.</p>
            </div>
            <EditField label="Téléphone" value={draft.phone} onChange={setDraftField("phone")} type="tel" placeholder="+33 6 00 00 00 00" />
          </div>
        </div>

        <div>
          <SectionTitle>Adresse de livraison</SectionTitle>
          <div className="space-y-6">
            <EditField label="Adresse" value={draft.addressLine1} onChange={setDraftField("addressLine1")} placeholder="12 rue des Écuries" />
            <EditField label="Complément (optionnel)" value={draft.addressLine2} onChange={setDraftField("addressLine2")} placeholder="Appartement, bâtiment…" />
            <div className="grid grid-cols-2 gap-4">
              <EditField label="Code postal" value={draft.postalCode} onChange={setDraftField("postalCode")} placeholder="75008" />
              <EditField label="Ville" value={draft.city} onChange={setDraftField("city")} placeholder="Paris" />
            </div>
            <EditField label="Pays" value={draft.country} onChange={setDraftField("country")} placeholder="France" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="press flex items-center gap-2 bg-ink text-on-ink px-6 py-3.5 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50"
          >
            {saving ? "Enregistrement…" : "Enregistrer"}
          </button>
          <button
            type="button"
            onClick={cancelEdit}
            className="press text-sm text-muted hover:text-ink transition-colors"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

// ── Dashboard ─────────────────────────────────────────────────────────────────

type DashboardProps = {
  userId: string;
  email: string;
  firstName: string;
};

export function Dashboard({ userId, email, firstName }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<DashTab>("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [promotions, setPromotions] = useState<UserPromotion[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const { slugs } = useFavorites();

  const activePromoCount = promotions.filter(isPromoActive).length;

  useEffect(() => {
    Promise.all([fetchOrders(userId), fetchPromotions(userId)]).then(([o, p]) => {
      setOrders(o);
      setPromotions(p);
      setDataLoading(false);
    });
  }, [userId]);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
  }

  function TabContent() {
    if (dataLoading) {
      return (
        <div className="flex items-center justify-center py-20 text-sm text-muted">
          Chargement…
        </div>
      );
    }
    switch (activeTab) {
      case "overview":
        return (
          <OverviewTab
            firstName={firstName}
            orders={orders}
            slugs={slugs}
            promotions={promotions}
            onTabChange={setActiveTab}
          />
        );
      case "orders":
        return <OrdersTab orders={orders} userId={userId} onOrderClaimed={async () => {
          const [o] = await Promise.all([fetchOrders(userId)]);
          setOrders(o);
        }} />;
      case "favorites":
        return <FavoritesTab />;
      case "promotions":
        return <PromotionsTab promotions={promotions} />;
      case "profile":
        return <ProfileTab userId={userId} email={email} authFirstName={firstName} />;
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex flex-col md:flex-row">
      {/* ── Sidebar desktop ── */}
      <aside className="md:w-60 lg:w-64 shrink-0 md:sticky md:top-20 md:h-[calc(100vh-80px)] md:border-r md:border-line flex flex-col justify-between">
        <div>
          {/* Logo + user */}
          <div className="hidden md:block px-8 pt-8 pb-6 border-b border-line">
            <Image
              src="/brand/ek-monogram.png"
              alt="EK"
              width={32}
              height={32}
              className="h-7 w-auto mb-5"
            />
            <p className="text-sm font-semibold truncate">
              {firstName ? `${firstName}` : email.split("@")[0]}
            </p>
            <p className="text-xs text-muted mt-0.5 truncate">{email}</p>
          </div>

          {/* Nav desktop */}
          <nav className="hidden md:block py-3">
            {TAB_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              const badge = id === "promotions" && activePromoCount > 0 ? activePromoCount : null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`press w-full flex items-center gap-3 px-8 py-3 text-sm transition-colors ${
                    isActive ? "text-ink font-medium" : "text-muted hover:text-ink"
                  }`}
                >
                  <Icon size={15} weight={isActive ? "fill" : "regular"} />
                  {label}
                  {badge && (
                    <span className="ml-auto bg-ink text-on-ink text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Tab bar mobile */}
          <div className="md:hidden flex overflow-x-auto border-b border-line px-2 gap-0 pt-2">
            {TAB_ITEMS.map(({ id, label, Icon }) => {
              const isActive = activeTab === id;
              const badge = id === "promotions" && activePromoCount > 0 ? activePromoCount : null;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveTab(id)}
                  className={`press relative flex items-center gap-1.5 px-3 py-2.5 text-xs whitespace-nowrap transition-colors border-b-2 -mb-px ${
                    isActive ? "text-ink border-ink font-medium" : "text-muted border-transparent hover:text-ink"
                  }`}
                >
                  <Icon size={13} weight={isActive ? "fill" : "regular"} />
                  {label}
                  {badge && (
                    <span className="bg-ink text-on-ink text-[9px] w-3.5 h-3.5 rounded-full flex items-center justify-center">
                      {badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sign out desktop */}
        <div className="hidden md:block px-8 py-6 border-t border-line">
          <button
            type="button"
            onClick={handleSignOut}
            className="press flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
          >
            <SignOut size={14} />
            Se déconnecter
          </button>
        </div>
      </aside>

      {/* ── Contenu ── */}
      <main className="flex-1 px-5 md:px-12 lg:px-16 py-8 md:py-12 min-w-0">
        <TabContent />

        {/* Sign out mobile */}
        <div className="md:hidden mt-12 pt-6 border-t border-line">
          <button
            type="button"
            onClick={handleSignOut}
            className="press flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
          >
            <SignOut size={14} />
            Se déconnecter
          </button>
        </div>
      </main>
    </div>
  );
}
