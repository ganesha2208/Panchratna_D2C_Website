"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, ShoppingCart, Zap, ShieldCheck, Truck, Check, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn, formatINR } from "@/lib/utils";
import { useCart } from "@/store/cart";
import { panchratna } from "@/lib/product";
import { site } from "@/lib/site";

export default function BuyBox() {
  const router = useRouter();
  const [packId, setPackId] = useState(panchratna.packSizes[1].id);
  const [qty, setQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const pack = panchratna.packSizes.find((p) => p.id === packId)!;
  const addItem = useCart((s) => s.addItem);

  const savings = pack.mrp - pack.price;
  const discountPct = Math.round((savings / pack.mrp) * 100);

  const handleAdd = () => {
    addItem(
      {
        productSlug: panchratna.slug,
        productName: panchratna.brandName,
        packId: pack.id,
        packLabel: pack.label,
        weight: pack.volume,
        price: pack.price,
        mrp: pack.mrp,
        image: panchratna.images[0].src,
      },
      qty,
    );
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1800);
  };

  const handleBuyNow = () => {
    handleAdd();
    setTimeout(() => router.push("/checkout"), 100);
  };

  return (
    <div>
      <div className="text-xs font-semibold uppercase tracking-wider text-orange-600">
        {panchratna.category}
      </div>
      <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight text-brand-950 sm:text-4xl lg:text-5xl">
        {panchratna.brandName}
      </h1>
      <p className="mt-3 text-base text-brand-900/75 sm:text-lg">{panchratna.tagline}</p>

      <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
        <div className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-3 py-1 ring-1 ring-orange-100">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-orange-400 text-orange-400" />
          ))}
          <span className="ml-1 font-semibold text-brand-900">{panchratna.rating}</span>
        </div>
        <span className="text-brand-700">
          {panchratna.reviewCount.toLocaleString("en-IN")} farmer reviews
        </span>
        <span className="text-brand-300">·</span>
        <span className="inline-flex items-center gap-1 font-semibold text-brand-600">
          <Check className="h-3.5 w-3.5" /> In stock
        </span>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {panchratna.certifications.map((c) => (
          <span
            key={c}
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 ring-1 ring-brand-100"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            {c}
          </span>
        ))}
      </div>

      <div className="mt-8 flex items-baseline gap-3">
        <div className="font-display text-4xl font-extrabold text-brand-950">
          {formatINR(pack.price)}
        </div>
        <div className="text-base text-brand-600 line-through">{formatINR(pack.mrp)}</div>
        <div className="rounded-md bg-orange-100 px-2 py-0.5 text-xs font-bold uppercase text-orange-700">
          Save {discountPct}%
        </div>
      </div>
      <p className="mt-1 text-xs text-brand-700/70">
        Inclusive of all taxes · You save {formatINR(savings)}
      </p>

      <div className="mt-8">
        <div className="mb-3 flex items-center justify-between text-sm">
          <span className="font-semibold text-brand-900">Select pack size</span>
          <span className="text-brand-600">Available: 1L · 5L · 10L</span>
        </div>
        <div className="grid gap-3 sm:grid-cols-3">
          {panchratna.packSizes.map((p) => {
            const selected = p.id === packId;
            return (
              <button
                key={p.id}
                onClick={() => setPackId(p.id)}
                disabled={!p.inStock}
                className={cn(
                  "relative rounded-2xl border-2 p-4 text-left transition",
                  selected
                    ? "border-orange-500 bg-orange-50/50 shadow-soft"
                    : "border-brand-100 bg-white hover:border-brand-300",
                )}
              >
                {p.badge && (
                  <span className="absolute -top-2 left-4 rounded-full bg-orange-500 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    {p.badge}
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <div className="font-display text-xl font-extrabold text-brand-950">
                    {p.volume}
                  </div>
                  {selected && (
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-white">
                      <Check className="h-3 w-3" />
                    </div>
                  )}
                </div>
                <div className="mt-2 flex items-baseline gap-1.5">
                  <span className="text-base font-bold text-brand-900">
                    {formatINR(p.price)}
                  </span>
                  <span className="text-xs text-brand-600 line-through">
                    {formatINR(p.mrp)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center gap-6">
        <div className="text-sm font-semibold text-brand-900">Quantity</div>
        <div className="inline-flex items-center rounded-full ring-1 ring-brand-200">
          <button
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="inline-flex h-10 w-10 items-center justify-center text-brand-700 hover:text-brand-900"
            aria-label="Decrease"
          >
            <Minus className="h-4 w-4" />
          </button>
          <span className="min-w-10 text-center font-semibold text-brand-900">{qty}</span>
          <button
            onClick={() => setQty(qty + 1)}
            className="inline-flex h-10 w-10 items-center justify-center text-brand-700 hover:text-brand-900"
            aria-label="Increase"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={handleAdd} className="btn-secondary btn-lg flex-1">
          {justAdded ? (
            <>
              <Check className="h-5 w-5" /> Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" /> Add to Cart
            </>
          )}
        </button>
        <button onClick={handleBuyNow} className="btn-accent btn-lg flex-1">
          <Zap className="h-5 w-5" /> Buy Now
        </button>
      </div>

      <div className="mt-8 grid gap-4 rounded-2xl bg-gradient-to-br from-brand-50/80 to-orange-50/40 p-5 ring-1 ring-brand-100 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <Truck className="mt-0.5 h-5 w-5 flex-none text-brand-600" />
          <div className="text-xs">
            <div className="font-semibold text-brand-900">Free Delivery</div>
            <div className="text-brand-700/70">On orders above ₹{site.shipping.freeAbove}</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 flex-none text-brand-600" />
          <div className="text-xs">
            <div className="font-semibold text-brand-900">Quality Assured</div>
            <div className="text-brand-700/70">FCO & ISO Certified</div>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white">
            ₹
          </div>
          <div className="text-xs">
            <div className="font-semibold text-brand-900">Cash on Delivery</div>
            <div className="text-brand-700/70">Available across India</div>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center text-sm">
        <Link href="/cart" className="text-brand-700 underline-offset-4 hover:underline">
          View your cart →
        </Link>
      </div>
    </div>
  );
}
