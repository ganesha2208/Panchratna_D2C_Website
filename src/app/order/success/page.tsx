"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Package, Phone, Home } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { site } from "@/lib/site";

function OrderSuccessInner() {
  const sp = useSearchParams();
  const id = sp.get("id");
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem("panchratna-last-order");
      if (raw) setOrder(JSON.parse(raw));
    }
  }, []);

  return (
    <section className="section">
      <div className="container-px">
        <div className="mx-auto max-w-2xl">
          <div className="card overflow-hidden p-8 text-center sm:p-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-100">
              <CheckCircle2 className="h-12 w-12" />
            </div>
            <h1 className="mt-6 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
              Order placed successfully!
            </h1>
            <p className="mt-3 text-brand-900/70">
              Thank you for choosing Panchratna. Our team will call you shortly to confirm your order.
            </p>

            {id && (
              <div className="mt-8 inline-flex flex-col items-center rounded-2xl bg-brand-50 px-6 py-4 ring-1 ring-brand-100">
                <span className="text-xs uppercase tracking-wider text-brand-700">
                  Order ID
                </span>
                <span className="mt-1 font-display text-xl font-bold text-brand-950">
                  #{id}
                </span>
              </div>
            )}

            {order && (
              <div className="mt-8 rounded-2xl bg-white p-6 text-left ring-1 ring-brand-100">
                <div className="flex items-center gap-2 text-sm font-semibold text-brand-800">
                  <Package className="h-4 w-4" /> Order details
                </div>
                <ul className="mt-4 space-y-2 text-sm">
                  {order.items.map((i: any) => (
                    <li key={i.packId} className="flex justify-between">
                      <span className="text-brand-900">
                        {i.productName} — {i.packLabel} × {i.quantity}
                      </span>
                      <span className="font-medium text-brand-900">
                        {formatINR(i.price * i.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between border-t border-brand-100 pt-4 text-sm">
                  <span className="text-brand-700">Total (Cash on Delivery)</span>
                  <span className="font-display text-lg font-bold text-brand-950">
                    {formatINR(order.total)}
                  </span>
                </div>
                <div className="mt-4 rounded-xl bg-brand-50 p-4 text-xs text-brand-800">
                  Delivery to{" "}
                  <strong>
                    {order.customer.fullName}, {order.customer.city}, {order.customer.state} -{" "}
                    {order.customer.pincode}
                  </strong>
                  . Expected in {site.shipping.deliveryDays}.
                </div>
              </div>
            )}

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link href="/" className="btn-secondary btn-md">
                <Home className="h-4 w-4" /> Back to home
              </Link>
              <a href={`tel:${site.contact.phone}`} className="btn-primary btn-md">
                <Phone className="h-4 w-4" /> Call support
              </a>
            </div>
          </div>

          <p className="mt-6 text-center text-xs text-brand-700/70">
            A confirmation will be sent to your phone/WhatsApp shortly.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="container-px py-20" />}>
      <OrderSuccessInner />
    </Suspense>
  );
}
