"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { panchratna } from "@/lib/product";
import { site } from "@/lib/site";
import type { CartItem } from "@/store/cart";

export type PlaceOrderResult =
  | { ok: true; orderCode: string }
  | { ok: false; error: string };

type CustomerInput = {
  fullName: string;
  phone: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  pincode: string;
  notes: string;
};

type OrderInput = {
  items: CartItem[];
  customer: CustomerInput;
};

// Recompute prices server-side from the canonical product catalog so the
// client cannot tamper with them. We trust packId, not the price the cart sent.
export async function placeOrder(input: OrderInput): Promise<PlaceOrderResult> {
  const { customer, items } = input;

  if (!items.length) return { ok: false, error: "Your cart is empty." };

  if (!customer.fullName.trim()) return { ok: false, error: "Full name is required." };
  if (!/^[6-9]\d{9}$/.test(customer.phone))
    return { ok: false, error: "Enter a valid 10-digit Indian mobile number." };
  if (!/^\d{6}$/.test(customer.pincode))
    return { ok: false, error: "Enter a valid 6-digit pincode." };
  if (!customer.address1.trim() || !customer.city.trim() || !customer.state.trim())
    return { ok: false, error: "Address, city and state are required." };

  const priced = items.map((i) => {
    const pack = panchratna.packSizes.find((p) => p.id === i.packId);
    if (!pack) throw new Error(`Unknown pack: ${i.packId}`);
    const qty = Math.max(1, Math.floor(i.quantity));
    return {
      product_slug: panchratna.slug,
      product_name: panchratna.name,
      pack_id: pack.id,
      pack_label: pack.label,
      volume: pack.volume,
      price: pack.price,
      mrp: pack.mrp,
      quantity: qty,
      line_total: pack.price * qty,
    };
  });

  const subtotal = priced.reduce((sum, p) => sum + p.line_total, 0);
  const shipping_fee =
    subtotal >= site.shipping.freeAbove ? 0 : site.shipping.flatFee;
  const total = subtotal + shipping_fee;

  const orderCode = "PR" + Date.now().toString(36).toUpperCase();

  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("orders").insert({
      order_code: orderCode,
      customer_name: customer.fullName.trim(),
      customer_phone: customer.phone.trim(),
      customer_email: customer.email.trim() || null,
      shipping_address1: customer.address1.trim(),
      shipping_address2: customer.address2.trim() || null,
      shipping_city: customer.city.trim(),
      shipping_state: customer.state.trim(),
      shipping_pincode: customer.pincode.trim(),
      shipping_notes: customer.notes.trim() || null,
      items: priced,
      subtotal,
      shipping_fee,
      total,
      payment_method: "cod",
      status: "pending",
    });
    if (error) {
      console.error("[orders] insert failed", error);
      return { ok: false, error: "We couldn't save your order. Please call us." };
    }
    return { ok: true, orderCode };
  } catch (err) {
    console.error("[orders] unexpected", err);
    return {
      ok: false,
      error: "Server is not configured yet. Please call us to place the order.",
    };
  }
}
