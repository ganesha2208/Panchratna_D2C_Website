import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type OrderRow = {
  id: string;
  order_code: string;
  created_at: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address1: string;
  shipping_address2: string | null;
  shipping_city: string;
  shipping_state: string;
  shipping_pincode: string;
  shipping_notes: string | null;
  items: Array<{
    pack_label: string;
    volume: string;
    quantity: number;
    price: number;
    line_total: number;
  }>;
  subtotal: number;
  shipping_fee: number;
  total: number;
  payment_method: string;
  status: string;
};

export type LeadRow = {
  id: string;
  created_at: string;
  name: string;
  phone: string | null;
  email: string | null;
  city: string | null;
  message: string | null;
  status: string;
};

const ORDER_COLUMNS =
  "id, order_code, created_at, customer_name, customer_phone, customer_email, shipping_address1, shipping_address2, shipping_city, shipping_state, shipping_pincode, shipping_notes, items, subtotal, shipping_fee, total, payment_method, status";

const LEAD_COLUMNS =
  "id, created_at, name, phone, email, city, message, status";

export async function getOrders(limit = 100): Promise<OrderRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("orders")
    .select(ORDER_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as OrderRow[];
}

export async function getLeads(limit = 100): Promise<LeadRow[]> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("contact_leads")
    .select(LEAD_COLUMNS)
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw error;
  return (data ?? []) as LeadRow[];
}

export type DashboardMetrics = {
  totalOrders: number;
  pendingOrders: number;
  totalRevenue: number;
  newLeads: number;
  recentOrders: OrderRow[];
  recentLeads: LeadRow[];
};

export async function getDashboardMetrics(): Promise<DashboardMetrics> {
  const supabase = createAdminClient();

  const [
    { count: totalOrders },
    { count: pendingOrders },
    { data: revenueRows },
    { count: newLeads },
    { data: recentOrders },
    { data: recentLeads },
  ] = await Promise.all([
    supabase.from("orders").select("id", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("id", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("orders").select("total"),
    supabase
      .from("contact_leads")
      .select("id", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("orders")
      .select(ORDER_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("contact_leads")
      .select(LEAD_COLUMNS)
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const totalRevenue =
    (revenueRows ?? []).reduce<number>(
      (sum, r: { total?: number }) => sum + (r.total ?? 0),
      0,
    );

  return {
    totalOrders: totalOrders ?? 0,
    pendingOrders: pendingOrders ?? 0,
    totalRevenue,
    newLeads: newLeads ?? 0,
    recentOrders: (recentOrders ?? []) as OrderRow[],
    recentLeads: (recentLeads ?? []) as LeadRow[],
  };
}
