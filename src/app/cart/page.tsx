"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/store/cart";
import { formatINR } from "@/lib/utils";
import { site } from "@/lib/site";

export default function CartPage() {
  const [mounted, setMounted] = useState(false);
  const items = useCart((s) => s.items);
  const subtotal = useCart((s) => s.subtotal());
  const savings = useCart((s) => s.savings());
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);

  useEffect(() => setMounted(true), []);

  const shipping = subtotal >= site.shipping.freeAbove || subtotal === 0 ? 0 : site.shipping.flatFee;
  const total = subtotal + shipping;
  const toFreeShipping = Math.max(0, site.shipping.freeAbove - subtotal);

  if (!mounted) {
    return <div className="container-px py-20" />;
  }

  if (items.length === 0) {
    return (
      <section className="section">
        <div className="container-px">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100">
              <ShoppingBag className="h-9 w-9" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-brand-950">
              Your cart is empty
            </h1>
            <p className="mt-3 text-brand-900/70">
              Looks like you haven&apos;t added Panchratna yet. Let&apos;s change that.
            </p>
            <Link href="/product/panchratna" className="btn-primary btn-lg mt-8">
              Shop Panchratna
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container-px">
        <div className="flex items-end justify-between">
          <div>
            <span className="eyebrow">Your Cart</span>
            <h1 className="mt-3 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
              Review your order
            </h1>
          </div>
          <Link href="/product/panchratna" className="hidden text-sm font-medium text-brand-700 hover:text-brand-800 md:block">
            ← Continue shopping
          </Link>
        </div>

        {toFreeShipping > 0 && (
          <div className="mt-6 rounded-2xl bg-accent/10 px-5 py-3 text-sm text-accent-dark ring-1 ring-accent/20">
            🚚 Add <strong>{formatINR(toFreeShipping)}</strong> more for free shipping!
          </div>
        )}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr,380px]">
          <div className="space-y-4">
            {items.map((item) => (
              <div
                key={item.packId}
                className="flex gap-4 rounded-2xl bg-white p-4 ring-1 ring-brand-100 sm:p-5"
              >
                <div className="relative flex h-24 w-24 flex-none items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 to-orange-50/40 ring-1 ring-brand-100 sm:h-28 sm:w-28">
                  <Image
                    src={item.image}
                    alt={item.productName}
                    fill
                    sizes="112px"
                    className="object-contain p-2"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-display text-lg font-semibold text-brand-950">
                          {item.productName}
                        </div>
                        <div className="text-xs text-brand-700/80">{item.packLabel}</div>
                      </div>
                      <button
                        onClick={() => removeItem(item.packId)}
                        className="rounded-full p-1.5 text-brand-500 hover:bg-red-50 hover:text-red-600"
                        aria-label="Remove"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="font-semibold text-brand-900">
                        {formatINR(item.price)}
                      </span>
                      <span className="text-xs text-brand-600 line-through">
                        {formatINR(item.mrp)}
                      </span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-full ring-1 ring-brand-200">
                      <button
                        onClick={() => updateQty(item.packId, item.quantity - 1)}
                        className="inline-flex h-9 w-9 items-center justify-center text-brand-700 hover:text-brand-900"
                        aria-label="Decrease"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="min-w-8 text-center text-sm font-semibold text-brand-900">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQty(item.packId, item.quantity + 1)}
                        className="inline-flex h-9 w-9 items-center justify-center text-brand-700 hover:text-brand-900"
                        aria-label="Increase"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="font-display text-lg font-bold text-brand-900">
                      {formatINR(item.price * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card p-6">
              <h2 className="font-display text-xl font-bold text-brand-950">
                Order summary
              </h2>

              <dl className="mt-5 space-y-2.5 text-sm">
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
                    {shipping === 0 ? (
                      <span className="text-brand-600">Free</span>
                    ) : (
                      formatINR(shipping)
                    )}
                  </dd>
                </div>
                <div className="mt-3 flex justify-between border-t border-brand-100 pt-3 text-base">
                  <dt className="font-display font-semibold text-brand-950">Total</dt>
                  <dd className="font-display text-lg font-bold text-brand-950">
                    {formatINR(total)}
                  </dd>
                </div>
              </dl>

              <Link href="/checkout" className="btn-primary btn-lg mt-6 w-full">
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </Link>

              <p className="mt-4 text-center text-xs text-brand-700/70">
                Cash on Delivery available · Delivered in {site.shipping.deliveryDays}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
