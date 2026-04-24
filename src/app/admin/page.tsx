"use client";

import { useState, useEffect, useCallback } from "react";
import { Package, CaretLeft, Truck, Check, SignOut } from "@phosphor-icons/react";
import { formatPrice } from "@/lib/products";

type OrderStatus = "en_preparation" | "expediee" | "livree" | "annulee";

type OrderItem = {
  name: string; colourLabel: string; size: string; qty: number; priceEUR: number; slug: string;
};

type Address = {
  firstName: string; lastName: string; email?: string;
  line1: string; line2?: string; postalCode: string; city: string; country: string;
};

type Order = {
  id: number;
  order_number: string;
  created_at: string;
  status: OrderStatus;
  total_eur: number;
  tracking_number: string | null;
  shipping_address: Address;
  items: OrderItem[];
};

const STATUS_LABELS: Record<OrderStatus, string> = {
  en_preparation: "En préparation",
  expediee: "Expédiée",
  livree: "Livrée",
  annulee: "Annulée",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  en_preparation: "bg-amber-50 text-amber-700 border border-amber-200",
  expediee: "bg-blue-50 text-blue-700 border border-blue-200",
  livree: "bg-green-50 text-green-700 border border-green-200",
  annulee: "bg-gray-100 text-gray-400 border border-gray-200",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", {
    day: "numeric", month: "long", year: "numeric",
  });
}

// ── Écran de connexion ────────────────────────────────────────────────────────

function LoginScreen({ onLogin }: { onLogin: (pwd: string) => void }) {
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onLogin(pwd);
    setError(true);
    setPwd("");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-paper px-5">
      <div className="w-full max-w-[360px] space-y-8">
        <div>
          <p className="text-xs tracking-widest uppercase text-muted mb-2">Elekka</p>
          <h1 className="text-3xl font-bold">Administration</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={pwd}
            onChange={(e) => { setPwd(e.target.value); setError(false); }}
            placeholder="Mot de passe"
            className="w-full border-b border-line bg-transparent py-3 text-sm focus:outline-none focus:border-ink transition-colors"
            autoFocus
          />
          {error && <p className="text-xs text-red-400">Mot de passe incorrect</p>}
          <button
            type="submit"
            className="w-full bg-ink text-on-ink py-3.5 text-sm font-medium hover:bg-ink-soft transition-colors"
          >
            Accéder
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Fiche commande ────────────────────────────────────────────────────────────

function OrderDetail({
  order, password, onBack, onUpdated,
}: {
  order: Order; password: string; onBack: () => void; onUpdated: (o: Order) => void;
}) {
  const [status, setStatus] = useState<OrderStatus>(order.status);
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function handleSave() {
    setSaving(true);
    const res = await fetch("/api/admin/update-order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${password}`,
      },
      body: JSON.stringify({ orderId: order.id, status, trackingNumber: tracking }),
    });
    const json = await res.json();
    if (json.success) {
      setSaved(true);
      onUpdated({ ...order, status, tracking_number: tracking || null });
      setTimeout(() => setSaved(false), 3000);
    }
    setSaving(false);
  }

  const addr = order.shipping_address;

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-[780px] mx-auto px-5 md:px-10 py-10">

        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors mb-10"
        >
          <CaretLeft size={14} /> Toutes les commandes
        </button>

        <div className="flex items-start justify-between gap-4 mb-10">
          <div>
            <p className="text-xs text-muted mb-1">{formatDate(order.created_at)}</p>
            <h1 className="text-3xl font-bold font-mono">{order.order_number}</h1>
          </div>
          <span className={`text-xs px-2.5 py-1 rounded-sm font-medium ${STATUS_COLORS[order.status]}`}>
            {STATUS_LABELS[order.status]}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">

          {/* Client */}
          <div className="border border-line p-5 space-y-3">
            <p className="text-xs tracking-widest uppercase text-muted">Client</p>
            <div className="text-sm space-y-1">
              <p className="font-semibold">{addr.firstName} {addr.lastName}</p>
              {addr.email && <p className="text-muted">{addr.email}</p>}
              <p className="text-muted mt-2">{addr.line1}</p>
              {addr.line2 && <p className="text-muted">{addr.line2}</p>}
              <p className="text-muted">{addr.postalCode} {addr.city}</p>
              <p className="text-muted">{addr.country}</p>
            </div>
            {addr.email && (
              <a
                href={`mailto:${addr.email}`}
                className="inline-block text-xs underline underline-offset-4 text-ink hover:text-muted transition-colors mt-2"
              >
                Envoyer un email
              </a>
            )}
          </div>

          {/* Articles */}
          <div className="border border-line p-5 space-y-3">
            <p className="text-xs tracking-widest uppercase text-muted">Articles</p>
            <ul className="space-y-2">
              {order.items.map((item, i) => (
                <li key={i} className="flex items-start justify-between gap-2 text-sm">
                  <div>
                    <p className="font-medium leading-snug">{item.name}</p>
                    <p className="text-xs text-muted">{item.colourLabel} · {item.size} · ×{item.qty}</p>
                  </div>
                  <span className="font-mono text-sm shrink-0">{formatPrice(item.priceEUR * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-line pt-3 flex justify-between font-semibold text-sm">
              <span>Total</span>
              <span className="font-mono">{formatPrice(order.total_eur)}</span>
            </div>
          </div>
        </div>

        {/* Mise à jour */}
        <div className="border border-line p-6 space-y-6">
          <p className="text-xs tracking-widest uppercase text-muted">Mettre à jour la commande</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">Statut</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as OrderStatus)}
                className="bg-transparent border-b border-line py-2.5 text-sm focus:outline-none focus:border-ink transition-colors"
              >
                {(Object.entries(STATUS_LABELS) as [OrderStatus, string][]).map(([key, label]) => (
                  <option key={key} value={key}>{label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs text-muted">Numéro de suivi</label>
              <div className="flex items-center gap-2">
                <Truck size={14} className="text-muted shrink-0" />
                <input
                  value={tracking}
                  onChange={(e) => {
                    setTracking(e.target.value);
                    if (e.target.value.trim()) setStatus("expediee");
                  }}
                  placeholder="Ex: 6Q06537706441"
                  className="flex-1 bg-transparent border-b border-line py-2.5 text-sm focus:outline-none focus:border-ink transition-colors placeholder:text-muted-soft font-mono"
                />
              </div>
              {tracking.trim() && (
                <p className="text-xs text-blue-600">Le statut passera automatiquement à "Expédiée"</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 bg-ink text-on-ink px-6 py-3 text-sm font-medium hover:bg-ink-soft transition-colors disabled:opacity-50"
            >
              {saving ? "Enregistrement…" : "Enregistrer"}
            </button>
            {saved && (
              <p className="flex items-center gap-1.5 text-sm text-muted">
                <Check size={13} /> Enregistré
                {status === "expediee" && tracking && " — email envoyé au client"}
              </p>
            )}
          </div>

          {status === "expediee" && tracking && (
            <p className="text-xs text-muted">
              Un email de notification avec le numéro de suivi sera envoyé au client.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Liste des commandes ───────────────────────────────────────────────────────

function OrdersList({
  orders, password, onSelect, onLogout,
}: {
  orders: Order[]; password: string; onSelect: (o: Order) => void; onLogout: () => void;
}) {
  const counts = {
    en_preparation: orders.filter((o) => o.status === "en_preparation").length,
    expediee: orders.filter((o) => o.status === "expediee").length,
    livree: orders.filter((o) => o.status === "livree").length,
  };

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-[900px] mx-auto px-5 md:px-10 py-10">

        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Elekka</p>
            <h1 className="text-3xl font-bold">Commandes</h1>
          </div>
          <button
            type="button"
            onClick={onLogout}
            className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
          >
            <SignOut size={14} /> Déconnexion
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {[
            { label: "En préparation", count: counts.en_preparation, color: "text-amber-600" },
            { label: "Expédiées", count: counts.expediee, color: "text-blue-600" },
            { label: "Livrées", count: counts.livree, color: "text-green-600" },
          ].map(({ label, count, color }) => (
            <div key={label} className="border border-line p-4">
              <p className={`text-2xl font-bold font-mono ${color}`}>{count}</p>
              <p className="text-xs text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Liste */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center py-20 gap-3 text-center">
            <Package size={40} weight="thin" className="text-muted-soft" />
            <p className="text-sm text-muted">Aucune commande pour l'instant.</p>
          </div>
        ) : (
          <div className="border border-line divide-y divide-line">
            {/* Header */}
            <div className="grid grid-cols-12 gap-4 px-5 py-3 text-xs tracking-widest uppercase text-muted bg-paper-2">
              <div className="col-span-2">Numéro</div>
              <div className="col-span-3">Client</div>
              <div className="col-span-3">Date</div>
              <div className="col-span-2 text-right">Montant</div>
              <div className="col-span-2 text-right">Statut</div>
            </div>

            {orders.map((order) => (
              <button
                key={order.id}
                type="button"
                onClick={() => onSelect(order)}
                className="w-full grid grid-cols-12 gap-4 px-5 py-4 text-left hover:bg-paper-2 transition-colors"
              >
                <div className="col-span-2 font-mono text-sm font-semibold">{order.order_number}</div>
                <div className="col-span-3 text-sm">
                  <p>{order.shipping_address.firstName} {order.shipping_address.lastName}</p>
                  {order.shipping_address.email && (
                    <p className="text-xs text-muted truncate">{order.shipping_address.email}</p>
                  )}
                </div>
                <div className="col-span-3 text-sm text-muted">{formatDate(order.created_at)}</div>
                <div className="col-span-2 text-right font-mono text-sm">{formatPrice(order.total_eur)}</div>
                <div className="col-span-2 flex justify-end">
                  <span className={`text-[11px] px-2 py-0.5 rounded-sm font-medium ${STATUS_COLORS[order.status as OrderStatus]}`}>
                    {STATUS_LABELS[order.status as OrderStatus]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page principale ───────────────────────────────────────────────────────────

export default function AdminPage() {
  const [password, setPassword] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selected, setSelected] = useState<Order | null>(null);
  const [authError, setAuthError] = useState(false);

  const loadOrders = useCallback(async (pwd: string) => {
    const res = await fetch("/api/admin/orders", {
      headers: { Authorization: `Bearer ${pwd}` },
    });
    if (res.status === 401) {
      setAuthError(true);
      setPassword(null);
      sessionStorage.removeItem("admin_pwd");
      return;
    }
    const json = await res.json();
    setOrders(json.orders ?? []);
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin_pwd");
    if (saved) {
      setPassword(saved);
      loadOrders(saved);
    }
  }, [loadOrders]);

  async function handleLogin(pwd: string) {
    const res = await fetch("/api/admin/orders", {
      headers: { Authorization: `Bearer ${pwd}` },
    });
    if (res.status === 401) {
      setAuthError(true);
      return;
    }
    setAuthError(false);
    sessionStorage.setItem("admin_pwd", pwd);
    setPassword(pwd);
    const json = await res.json();
    setOrders(json.orders ?? []);
  }

  function handleLogout() {
    sessionStorage.removeItem("admin_pwd");
    setPassword(null);
    setOrders([]);
    setSelected(null);
  }

  function handleOrderUpdated(updated: Order) {
    setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    setSelected(updated);
  }

  if (!password || authError) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (selected) {
    return (
      <OrderDetail
        order={selected}
        password={password}
        onBack={() => setSelected(null)}
        onUpdated={handleOrderUpdated}
      />
    );
  }

  return (
    <OrdersList
      orders={orders}
      password={password}
      onSelect={setSelected}
      onLogout={handleLogout}
    />
  );
}
