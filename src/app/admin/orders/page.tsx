import { ShoppingBag } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { getOrders } from "@/lib/admin-data";
import { StatusPill } from "../_components/StatusPill";
import { EmptyState } from "../_components/EmptyState";

export const dynamic = "force-dynamic";
export const metadata = { title: "Orders · Admin" };

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function OrdersPage() {
  const orders = await getOrders(200);

  return (
    <div className="space-y-6">
      <header className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
            Orders
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {orders.length === 0
              ? "No orders yet"
              : `Showing ${orders.length} most recent ${orders.length === 1 ? "order" : "orders"}`}
          </p>
        </div>
      </header>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {orders.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No orders yet"
            description="Once a customer checks out, the order will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/60 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">Ship to</th>
                  <th className="px-5 py-3 text-right">Subtotal</th>
                  <th className="px-5 py-3 text-right">Total</th>
                  <th className="px-5 py-3">Payment</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((o) => (
                  <tr key={o.id} className="align-top transition hover:bg-gray-50/60">
                    <td className="px-5 py-4">
                      <div className="font-mono text-xs font-medium text-gray-900">
                        #{o.order_code}
                      </div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        {dateFmt.format(new Date(o.created_at))}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="font-medium text-gray-900">{o.customer_name}</div>
                      <div className="text-xs text-gray-500">{o.customer_phone}</div>
                      {o.customer_email && (
                        <div className="text-xs text-gray-400">{o.customer_email}</div>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <ul className="space-y-0.5">
                        {o.items.map((it, idx) => (
                          <li key={idx} className="text-xs text-gray-700">
                            <span className="font-medium text-gray-900">{it.volume}</span>
                            <span className="text-gray-400"> × </span>
                            {it.quantity}
                            <span className="text-gray-400"> · </span>
                            {formatINR(it.price)}
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-5 py-4">
                      <div className="text-xs text-gray-700">{o.shipping_address1}</div>
                      {o.shipping_address2 && (
                        <div className="text-xs text-gray-500">{o.shipping_address2}</div>
                      )}
                      <div className="mt-0.5 text-xs text-gray-500">
                        {o.shipping_city}, {o.shipping_state} - {o.shipping_pincode}
                      </div>
                    </td>
                    <td className="px-5 py-4 text-right text-xs text-gray-700">
                      {formatINR(o.subtotal)}
                      {o.shipping_fee > 0 && (
                        <div className="text-[11px] text-gray-400">
                          + {formatINR(o.shipping_fee)} shipping
                        </div>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-gray-900">
                      {formatINR(o.total)}
                    </td>
                    <td className="px-5 py-4 text-xs uppercase tracking-wide text-gray-500">
                      {o.payment_method}
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill value={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
