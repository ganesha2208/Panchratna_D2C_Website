"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Truck, ShieldCheck, Lock, Check } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";
import { site } from "@/lib/site";
import { placeOrder } from "./actions";

type FormState = {
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

export default function CheckoutPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const savings = useCart((s) => s.savings());
  const clear = useCart((s) => s.clear);

  const [form, setForm] = useState<FormState>({
    fullName: "",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    pincode: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const shipping =
    subtotal >= site.shipping.freeAbove || subtotal === 0 ? 0 : site.shipping.flatFee;
  const total = subtotal + shipping;

  const requiredFields: (keyof FormState)[] = [
    "fullName",
    "phone",
    "address1",
    "city",
    "state",
    "pincode",
  ];
  const isValid = requiredFields.every((f) => form[f].trim().length > 0) &&
    /^[6-9]\d{9}$/.test(form.phone) &&
    /^\d{6}$/.test(form.pincode);

  const update = (k: keyof FormState, v: string) => setForm((s) => ({ ...s, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid || submitting) return;
    setSubmitting(true);
    setError(null);

    const result = await placeOrder({ items, customer: form });

    if (!result.ok) {
      setError(result.error);
      setSubmitting(false);
      return;
    }

    const orderPayload = {
      orderId: result.orderCode,
      createdAt: new Date().toISOString(),
      items,
      subtotal,
      shipping,
      total,
      savings,
      customer: form,
      paymentMethod: "COD",
      status: "pending",
    };
    if (typeof window !== "undefined") {
      sessionStorage.setItem("panchratna-last-order", JSON.stringify(orderPayload));
    }

    clear();
    router.push(`/order/success?id=${result.orderCode}`);
  };

  if (!mounted) return <div className="container-px py-20" />;

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container-px mx-auto max-w-md text-center">
          <h1 className="font-display text-3xl font-bold text-brand-950">
            No items to checkout
          </h1>
          <p className="mt-3 text-brand-900/70">Add a product to your cart first.</p>
          <Link href="/product/panchratna" className="btn-primary btn-lg mt-6">
            Shop Panchratna
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container-px">
        <div className="mx-auto max-w-3xl text-center">
          <span className="eyebrow">Checkout</span>
          <h1 className="mt-4 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
            Almost done — just a few details
          </h1>
          <p className="mt-3 text-brand-900/70">
            Cash on Delivery available across India. Pay when the package reaches you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-12 grid gap-8 lg:grid-cols-[1fr,380px]">
          <div className="space-y-6">
            <Section title="Delivery Address" icon={<Truck className="h-5 w-5" />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name *" value={form.fullName} onChange={(v) => update("fullName", v)} />
                <Field
                  label="Phone Number *"
                  type="tel"
                  value={form.phone}
                  onChange={(v) => update("phone", v.replace(/\D/g, "").slice(0, 10))}
                  hint="10-digit Indian mobile number"
                />
                <Field
                  label="Email (optional)"
                  type="email"
                  value={form.email}
                  onChange={(v) => update("email", v)}
                  className="sm:col-span-2"
                />
                <Field
                  label="Address Line 1 *"
                  value={form.address1}
                  onChange={(v) => update("address1", v)}
                  className="sm:col-span-2"
                  placeholder="House no., Street, Village/Area"
                />
                <Field
                  label="Address Line 2"
                  value={form.address2}
                  onChange={(v) => update("address2", v)}
                  className="sm:col-span-2"
                  placeholder="Landmark, Taluka (optional)"
                />
                <Field label="City *" value={form.city} onChange={(v) => update("city", v)} />
                <Field label="State *" value={form.state} onChange={(v) => update("state", v)} />
                <Field
                  label="Pincode *"
                  value={form.pincode}
                  onChange={(v) => update("pincode", v.replace(/\D/g, "").slice(0, 6))}
                />
                <Field
                  label="Notes (optional)"
                  value={form.notes}
                  onChange={(v) => update("notes", v)}
                  placeholder="Any delivery instructions"
                />
              </div>
            </Section>

            <Section title="Payment Method" icon={<Lock className="h-5 w-5" />}>
              <div className="flex items-start gap-3 rounded-2xl border-2 border-brand-600 bg-brand-50 p-5">
                <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-semibold text-brand-950">Cash on Delivery</div>
                  <div className="mt-1 text-xs text-brand-700/80">
                    Pay in cash or UPI when the package is delivered. No online payment required.
                  </div>
                </div>
              </div>
              <p className="mt-3 text-xs text-brand-700/70">
                Online payment (UPI, Card, Netbanking) will be available soon.
              </p>
            </Section>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-brand-950">Your order</h2>
              <ul className="mt-5 space-y-3 text-sm">
                {items.map((i) => (
                  <li key={i.packId} className="flex justify-between gap-3">
                    <div>
                      <div className="font-medium text-brand-900">{i.productName}</div>
                      <div className="text-xs text-brand-700/80">
                        {i.packLabel} × {i.quantity}
                      </div>
                    </div>
                    <div className="whitespace-nowrap font-medium text-brand-900">
                      {formatINR(i.price * i.quantity)}
                    </div>
                  </li>
                ))}
              </ul>

              <dl className="mt-5 space-y-2.5 border-t border-brand-100 pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-brand-700">Subtotal</dt>
                  <dd className="font-medium text-brand-900">{formatINR(subtotal)}</dd>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-brand-600">
                    <dt>You save</dt>
                    <dd className="font-medium">− {formatINR(savings)}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-brand-700">Shipping</dt>
                  <dd className="font-medium text-brand-900">
                    {shipping === 0 ? <span className="text-brand-600">Free</span> : formatINR(shipping)}
                  </dd>
                </div>
                <div className="mt-3 flex justify-between border-t border-brand-100 pt-3 text-base">
                  <dt className="font-display font-semibold text-brand-950">Total (COD)</dt>
                  <dd className="font-display text-lg font-bold text-brand-950">
                    {formatINR(total)}
                  </dd>
                </div>
              </dl>

              {error && (
                <div className="mt-6 rounded-xl bg-orange-50 p-3 text-sm text-orange-800 ring-1 ring-orange-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!isValid || submitting}
                className="btn-primary btn-lg mt-6 w-full"
              >
                {submitting ? "Placing order..." : `Place Order · ${formatINR(total)}`}
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-brand-700/70">
                <ShieldCheck className="h-3.5 w-3.5" /> Safe & secure checkout
              </div>
            </div>
          </aside>
        </form>
      </div>
    </section>
  );
}

function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-6 sm:p-8">
      <h2 className="flex items-center gap-3 font-display text-xl font-bold text-brand-950">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
          {icon}
        </span>
        {title}
      </h2>
      <div className="mt-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  hint,
  placeholder,
  className = "",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  hint?: string;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-sm font-medium text-brand-900">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-brand-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20"
      />
      {hint && <p className="mt-1 text-xs text-brand-700/70">{hint}</p>}
    </div>
  );
}
