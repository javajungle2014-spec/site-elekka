"use client";

import { useState, useEffect, useCallback } from "react";
import { Package, CaretLeft, Truck, Check, SignOut, ChartBar, DownloadSimple, Warehouse, Plus, Minus } from "@phosphor-icons/react";
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
  carrier: string | null;
  shipping_address: Address;
  items: OrderItem[];
};

const CARRIERS = [
  { value: "colissimo", label: "La Poste / Colissimo" },
  { value: "chronopost", label: "Chronopost" },
  { value: "dpd", label: "DPD" },
  { value: "mondial-relay", label: "Mondial Relay" },
  { value: "ups", label: "UPS" },
  { value: "fedex", label: "FedEx" },
];

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
  const [carrier, setCarrier] = useState(order.carrier ?? "");
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
      body: JSON.stringify({ orderId: order.id, status, trackingNumber: tracking, carrier }),
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
              <label className="text-xs text-muted">Transporteur</label>
              <select
                value={carrier}
                onChange={(e) => setCarrier(e.target.value)}
                className="bg-transparent border-b border-line py-2.5 text-sm focus:outline-none focus:border-ink transition-colors"
              >
                <option value="">Sélectionner un transporteur</option>
                {CARRIERS.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
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

// ── Statistiques ─────────────────────────────────────────────────────────────

type Stats = {
  totalRevenue: number; totalOrders: number;
  monthRevenue: number; monthOrders: number;
  byStatus: { en_preparation: number; expediee: number; livree: number };
  months: { label: string; revenue: number; count: number }[];
  topItems: { name: string; count: number }[];
};

function StatsView({ password, onBack }: { password: string; onBack: () => void }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats", { headers: { Authorization: `Bearer ${password}` } })
      .then((r) => r.json())
      .then(setStats);
  }, [password]);

  if (!stats) return <div className="min-h-screen bg-paper flex items-center justify-center text-sm text-muted">Chargement…</div>;

  const maxRevenue = Math.max(...stats.months.map((m) => m.revenue), 1);

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-[900px] mx-auto px-5 md:px-10 py-10 space-y-10">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Elekka</p>
            <h1 className="text-3xl font-bold">Statistiques</h1>
          </div>
          <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors">
            <CaretLeft size={14} /> Commandes
          </button>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "CA total", value: `${stats.totalRevenue.toFixed(0)} €` },
            { label: "CA ce mois", value: `${stats.monthRevenue.toFixed(0)} €` },
            { label: "Commandes total", value: String(stats.totalOrders) },
            { label: "Commandes ce mois", value: String(stats.monthOrders) },
          ].map(({ label, value }) => (
            <div key={label} className="border border-line p-5">
              <p className="text-2xl font-bold font-mono">{value}</p>
              <p className="text-xs text-muted mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Graphique 6 mois */}
        <div className="border border-line p-6">
          <p className="text-xs tracking-widest uppercase text-muted mb-6">Chiffre d'affaires — 6 derniers mois</p>
          <div className="flex items-end gap-3 h-40">
            {stats.months.map((m) => (
              <div key={m.label} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs text-muted font-mono">{m.revenue > 0 ? `${m.revenue.toFixed(0)} €` : ""}</span>
                <div
                  className="w-full bg-ink transition-all"
                  style={{ height: `${Math.max((m.revenue / maxRevenue) * 100, m.revenue > 0 ? 4 : 0)}%` }}
                />
                <span className="text-[10px] text-muted">{m.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Statuts + Top articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-line p-6">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Par statut</p>
            <div className="space-y-3">
              {[
                { label: "En préparation", count: stats.byStatus.en_preparation, color: "bg-amber-400" },
                { label: "Expédiées", count: stats.byStatus.expediee, color: "bg-blue-400" },
                { label: "Livrées", count: stats.byStatus.livree, color: "bg-green-400" },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${color}`} />
                    <span className="text-muted">{label}</span>
                  </div>
                  <span className="font-mono font-semibold">{count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-line p-6">
            <p className="text-xs tracking-widest uppercase text-muted mb-4">Articles les plus commandés</p>
            <div className="space-y-3">
              {stats.topItems.length === 0 && <p className="text-sm text-muted">Aucune donnée</p>}
              {stats.topItems.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <span className="text-muted truncate">{item.name}</span>
                  <span className="font-mono font-semibold shrink-0 ml-2">{item.count} vendus</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Gestion des stocks ────────────────────────────────────────────────────────

type StockVariant = { id: number; colour: string; size: string; quantity: number };
type StockModel = { id: number; name: string; slug: string | null; stock_variants: StockVariant[] };
type StockCategory = { id: number; name: string; stock_models: StockModel[] };

function QuantityControl({ variant, password, onUpdate }: {
  variant: StockVariant; password: string; onUpdate: (id: number, qty: number) => void;
}) {
  const [qty, setQty] = useState(variant.quantity);
  const [saving, setSaving] = useState(false);

  async function save(newQty: number) {
    if (newQty < 0) return;
    setSaving(true);
    await fetch("/api/admin/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ action: "update-variant", variantId: variant.id, quantity: newQty }),
    });
    setQty(newQty);
    onUpdate(variant.id, newQty);
    setSaving(false);
  }

  const color = qty === 0 ? "text-red-500" : qty <= 3 ? "text-amber-500" : "text-green-600";

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => save(qty - 1)} disabled={qty === 0 || saving}
        className="w-7 h-7 border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors disabled:opacity-30">
        <Minus size={12} />
      </button>
      <span className={`font-mono text-sm font-semibold w-8 text-center ${color}`}>{qty}</span>
      <button type="button" onClick={() => save(qty + 1)} disabled={saving}
        className="w-7 h-7 border border-line flex items-center justify-center text-muted hover:text-ink hover:border-ink transition-colors">
        <Plus size={12} />
      </button>
    </div>
  );
}

function StockView({ password, onBack }: { password: string; onBack: () => void }) {
  const [categories, setCategories] = useState<StockCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [newCatName, setNewCatName] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [addingModel, setAddingModel] = useState<number | null>(null);
  const [newModelName, setNewModelName] = useState("");
  const [newModelSlug, setNewModelSlug] = useState("");
  const [addingVariant, setAddingVariant] = useState<number | null>(null);
  const [newVariantColour, setNewVariantColour] = useState("");
  const [newVariantSize, setNewVariantSize] = useState("");
  const [newVariantQty, setNewVariantQty] = useState("0");

  useEffect(() => {
    fetch("/api/admin/stock", { headers: { Authorization: `Bearer ${password}` } })
      .then((r) => r.json())
      .then((d) => { setCategories(d.categories ?? []); setLoading(false); });
  }, [password]);

  async function addCategory() {
    if (!newCatName.trim()) return;
    const res = await fetch("/api/admin/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ action: "add-category", name: newCatName.trim() }),
    });
    const json = await res.json();
    if (json.success) {
      setCategories((prev) => [...prev, { ...json.data, stock_models: [] }]);
      setNewCatName(""); setAddingCat(false);
    }
  }

  async function addModel(categoryId: number) {
    if (!newModelName.trim()) return;
    const res = await fetch("/api/admin/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ action: "add-model", categoryId, name: newModelName.trim(), slug: newModelSlug.trim() || null }),
    });
    const json = await res.json();
    if (json.success) {
      setCategories((prev) => prev.map((c) => c.id === categoryId
        ? { ...c, stock_models: [...c.stock_models, { ...json.data, stock_variants: [] }] }
        : c
      ));
      setNewModelName(""); setNewModelSlug(""); setAddingModel(null);
    }
  }

  async function addVariant(modelId: number, categoryId: number) {
    if (!newVariantColour.trim() || !newVariantSize.trim()) return;
    const res = await fetch("/api/admin/stock", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${password}` },
      body: JSON.stringify({ action: "add-variant", modelId, colour: newVariantColour.trim(), size: newVariantSize.trim(), quantity: parseInt(newVariantQty) || 0 }),
    });
    const json = await res.json();
    if (json.success) {
      setCategories((prev) => prev.map((c) => c.id === categoryId ? {
        ...c, stock_models: c.stock_models.map((m) => m.id === modelId
          ? { ...m, stock_variants: [...m.stock_variants, json.data] } : m)
      } : c));
      setNewVariantColour(""); setNewVariantSize(""); setNewVariantQty("0"); setAddingVariant(null);
    }
  }

  function updateVariantQty(categoryId: number, modelId: number, variantId: number, qty: number) {
    setCategories((prev) => prev.map((c) => c.id === categoryId ? {
      ...c, stock_models: c.stock_models.map((m) => m.id === modelId ? {
        ...m, stock_variants: m.stock_variants.map((v) => v.id === variantId ? { ...v, quantity: qty } : v)
      } : m)
    } : c));
  }

  if (loading) return <div className="min-h-screen bg-paper flex items-center justify-center text-sm text-muted">Chargement…</div>;

  return (
    <div className="min-h-screen bg-paper">
      <div className="max-w-[900px] mx-auto px-5 md:px-10 py-10 space-y-10">

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs tracking-widest uppercase text-muted mb-1">Elekka</p>
            <h1 className="text-3xl font-bold">Stock</h1>
          </div>
          <button type="button" onClick={onBack} className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors">
            <CaretLeft size={14} /> Commandes
          </button>
        </div>

        {/* Légende */}
        <div className="flex items-center gap-6 text-xs text-muted">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500" />En stock</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" />Stock faible (≤3)</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500" />Rupture</span>
        </div>

        {/* Catégories */}
        {categories.map((cat) => (
          <div key={cat.id} className="border border-line">
            <div className="bg-paper-2 px-5 py-3 border-b border-line">
              <p className="text-sm font-semibold tracking-wide">{cat.name}</p>
            </div>

            <div className="divide-y divide-line">
              {cat.stock_models.map((model) => (
                <div key={model.id} className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium">{model.name}</p>
                    <button type="button" onClick={() => { setAddingVariant(model.id); setAddingModel(null); }}
                      className="text-xs text-muted hover:text-ink underline underline-offset-4 transition-colors">
                      + Variante
                    </button>
                  </div>

                  {model.stock_variants.length === 0 && (
                    <p className="text-xs text-muted-soft italic">Aucune variante</p>
                  )}

                  <div className="space-y-2">
                    {model.stock_variants.map((v) => (
                      <div key={v.id} className="flex items-center justify-between gap-4">
                        <span className="text-sm text-muted">{v.colour} · {v.size}</span>
                        <QuantityControl variant={v} password={password}
                          onUpdate={(id, qty) => updateVariantQty(cat.id, model.id, id, qty)} />
                      </div>
                    ))}
                  </div>

                  {/* Formulaire ajout variante */}
                  {addingVariant === model.id && (
                    <div className="mt-4 pt-4 border-t border-line grid grid-cols-3 gap-2">
                      <input value={newVariantColour} onChange={(e) => setNewVariantColour(e.target.value)}
                        placeholder="Couleur" className="bg-transparent border-b border-line py-1.5 text-sm focus:outline-none focus:border-ink" />
                      <input value={newVariantSize} onChange={(e) => setNewVariantSize(e.target.value)}
                        placeholder="Taille" className="bg-transparent border-b border-line py-1.5 text-sm focus:outline-none focus:border-ink" />
                      <input value={newVariantQty} onChange={(e) => setNewVariantQty(e.target.value)}
                        type="number" min="0" placeholder="Qté" className="bg-transparent border-b border-line py-1.5 text-sm focus:outline-none focus:border-ink font-mono" />
                      <button type="button" onClick={() => addVariant(model.id, cat.id)}
                        className="col-span-2 bg-ink text-on-ink py-1.5 text-xs font-medium hover:bg-ink-soft transition-colors">
                        Ajouter
                      </button>
                      <button type="button" onClick={() => setAddingVariant(null)}
                        className="text-xs text-muted hover:text-ink transition-colors">
                        Annuler
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Ajouter un modèle */}
            {addingModel === cat.id ? (
              <div className="p-5 border-t border-line grid grid-cols-3 gap-2">
                <input value={newModelName} onChange={(e) => setNewModelName(e.target.value)}
                  placeholder="Nom du modèle" className="col-span-2 bg-transparent border-b border-line py-1.5 text-sm focus:outline-none focus:border-ink" />
                <input value={newModelSlug} onChange={(e) => setNewModelSlug(e.target.value)}
                  placeholder="Slug (optionnel)" className="col-span-3 bg-transparent border-b border-line py-1.5 text-sm focus:outline-none focus:border-ink text-muted" />
                <button type="button" onClick={() => addModel(cat.id)}
                  className="col-span-2 bg-ink text-on-ink py-1.5 text-xs font-medium hover:bg-ink-soft transition-colors">
                  Ajouter
                </button>
                <button type="button" onClick={() => setAddingModel(null)}
                  className="text-xs text-muted hover:text-ink transition-colors">
                  Annuler
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => { setAddingModel(cat.id); setAddingVariant(null); }}
                className="w-full p-3 text-xs text-muted hover:text-ink border-t border-line transition-colors flex items-center justify-center gap-1.5">
                <Plus size={12} /> Ajouter un modèle
              </button>
            )}
          </div>
        ))}

        {/* Ajouter une catégorie */}
        {addingCat ? (
          <div className="border border-line p-5 flex gap-3">
            <input value={newCatName} onChange={(e) => setNewCatName(e.target.value)}
              placeholder="Nom de la catégorie (ex: Rênes)" autoFocus
              className="flex-1 bg-transparent border-b border-line py-1.5 text-sm focus:outline-none focus:border-ink" />
            <button type="button" onClick={addCategory}
              className="bg-ink text-on-ink px-4 py-1.5 text-xs font-medium hover:bg-ink-soft transition-colors">
              Ajouter
            </button>
            <button type="button" onClick={() => setAddingCat(false)}
              className="text-xs text-muted hover:text-ink transition-colors">
              Annuler
            </button>
          </div>
        ) : (
          <button type="button" onClick={() => setAddingCat(true)}
            className="w-full border border-dashed border-line p-4 text-sm text-muted hover:text-ink hover:border-ink transition-colors flex items-center justify-center gap-2">
            <Plus size={14} /> Ajouter une catégorie
          </button>
        )}
      </div>
    </div>
  );
}

// ── Liste des commandes ───────────────────────────────────────────────────────

function ExportButton({ password }: { password: string }) {
  const now = new Date();
  const [month, setMonth] = useState(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`);

  function handleExport() {
    const url = `/api/admin/export?month=${month}`;
    const a = document.createElement("a");
    a.href = url;
    a.setAttribute("download", `elekka-commandes-${month}.csv`);
    a.setAttribute("data-auth", password);
    fetch(url, { headers: { Authorization: `Bearer ${password}` } })
      .then((res) => res.blob())
      .then((blob) => {
        const blobUrl = URL.createObjectURL(blob);
        a.href = blobUrl;
        a.click();
        URL.revokeObjectURL(blobUrl);
      });
  }

  // Générer les 12 derniers mois
  const months = Array.from({ length: 12 }).map((_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
    return { value, label };
  });

  return (
    <div className="flex items-center gap-2">
      <select
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="text-sm border-b border-line bg-transparent py-1 focus:outline-none text-muted"
      >
        {months.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
      <button
        type="button"
        onClick={handleExport}
        className="flex items-center gap-1.5 text-sm text-muted hover:text-ink transition-colors"
      >
        <DownloadSimple size={14} /> Exporter
      </button>
    </div>
  );
}

function OrdersList({
  orders, password, onSelect, onLogout, onStats, onStock,
}: {
  orders: Order[]; password: string; onSelect: (o: Order) => void; onLogout: () => void; onStats: () => void; onStock: () => void;
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
          <div className="flex items-center gap-4 flex-wrap justify-end">
            <ExportButton password={password} />
            <button
              type="button"
              onClick={onStats}
              className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              <ChartBar size={14} /> Statistiques
            </button>
            <button
              type="button"
              onClick={onStock}
              className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              <Warehouse size={14} /> Stock
            </button>
            <button
              type="button"
              onClick={onLogout}
              className="flex items-center gap-2 text-sm text-muted hover:text-ink transition-colors"
            >
              <SignOut size={14} /> Déconnexion
            </button>
          </div>
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
  const [showStats, setShowStats] = useState(false);
  const [showStock, setShowStock] = useState(false);
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

  if (showStats) {
    return <StatsView password={password} onBack={() => setShowStats(false)} />;
  }

  if (showStock) {
    return <StockView password={password} onBack={() => setShowStock(false)} />;
  }

  return (
    <OrdersList
      orders={orders}
      password={password}
      onSelect={setSelected}
      onLogout={handleLogout}
      onStats={() => setShowStats(true)}
      onStock={() => setShowStock(true)}
    />
  );
}
