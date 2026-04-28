"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useCart } from "@/store/cart";

export default function CartIcon() {
  const [mounted, setMounted] = useState(false);
  const total = useCart((s) => s.totalItems());

  useEffect(() => setMounted(true), []);

  return (
    <Link
      href="/cart"
      aria-label="Cart"
      className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition hover:bg-brand-100 hover:text-brand-800"
    >
      <ShoppingBag className="h-5 w-5" />
      {mounted && total > 0 && (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white shadow ring-2 ring-white">
          {total}
        </span>
      )}
    </Link>
  );
}
