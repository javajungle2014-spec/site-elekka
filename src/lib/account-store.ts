import { createClient } from "./supabase";

export type OrderItem = {
  slug: string;
  name: string;
  colourLabel: string;
  size: string;
  qty: number;
  priceEUR: number;
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  line1: string;
  line2?: string;
  city: string;
  postalCode: string;
  country: string;
};

export type OrderStatus = "en_preparation" | "expediee" | "livree" | "annulee";

export type Order = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  totalEUR: number;
  trackingNumber: string | null;
  carrier: string | null;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
};

export type Profile = {
  firstName: string;
  lastName: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  postalCode: string;
  country: string;
  referralCode: string | null;
};

export type UserPromotion = {
  id: string;
  code: string;
  label: string | null;
  discountType: "percent" | "eur";
  discountValue: number;
  validUntil: string | null;
  used: boolean;
  createdAt: string;
};

export async function fetchOrders(userId: string): Promise<Order[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map((row) => ({
    id: row.id,
    orderNumber: row.order_number ?? `ELK-${row.id + 79}`,
    createdAt: row.created_at,
    status: row.status as OrderStatus,
    totalEUR: Number(row.total_eur),
    trackingNumber: row.tracking_number ?? null,
    carrier: row.carrier ?? null,
    shippingAddress: row.shipping_address as ShippingAddress,
    items: row.items as OrderItem[],
  }));
}

export async function fetchProfile(userId: string): Promise<Profile> {
  const supabase = createClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();
  return {
    firstName: data?.first_name ?? "",
    lastName: data?.last_name ?? "",
    phone: data?.phone ?? "",
    addressLine1: data?.address_line1 ?? "",
    addressLine2: data?.address_line2 ?? "",
    city: data?.city ?? "",
    postalCode: data?.postal_code ?? "",
    country: data?.country ?? "France",
    referralCode: data?.referral_code ?? null,
  };
}

export async function upsertProfile(userId: string, profile: Profile): Promise<void> {
  const supabase = createClient();
  await supabase.from("profiles").upsert({
    id: userId,
    first_name: profile.firstName,
    last_name: profile.lastName,
    phone: profile.phone,
    address_line1: profile.addressLine1,
    address_line2: profile.addressLine2,
    city: profile.city,
    postal_code: profile.postalCode,
    country: profile.country,
    updated_at: new Date().toISOString(),
  });
}

export async function fetchPromotions(userId: string): Promise<UserPromotion[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_promotions")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });
  if (error) return [];
  return (data ?? []).map((row) => ({
    id: row.id,
    code: row.code,
    label: row.label ?? null,
    discountType: row.discount_type as "percent" | "eur",
    discountValue: Number(row.discount_value),
    validUntil: row.valid_until ?? null,
    used: Boolean(row.used),
    createdAt: row.created_at,
  }));
}
