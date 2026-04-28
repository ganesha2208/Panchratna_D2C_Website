import Link from "next/link";
import { ShoppingBag, Inbox, IndianRupee, Clock, ArrowUpRight } from "lucide-react";
import { formatINR } from "@/lib/utils";
import { getDashboardMetrics } from "@/lib/admin-data";
import { MetricCard } from "./_components/MetricCard";
import { StatusPill } from "./_components/StatusPill";
import { EmptyState } from "./_components/EmptyState";

export const dynamic = "force-dynamic";

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function AdminDashboard() {
  let metrics;
  try {
    metrics = await getDashboardMetrics();
  } catch (err) {
    return <SetupNeeded message={(err as Error).message} />;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of orders and contact leads.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Total orders"
          value={metrics.totalOrders}
          icon={ShoppingBag}
          accent="brand"
        />
        <MetricCard
          label="Pending orders"
          value={metrics.pendingOrders}
          icon={Clock}
          accent="amber"
        />
        <MetricCard
          label="Total revenue"
          value={formatINR(metrics.totalRevenue)}
          icon={IndianRupee}
          accent="indigo"
          hint="Across all paid + COD orders"
        />
        <MetricCard
          label="New leads"
          value={metrics.newLeads}
          icon={Inbox}
          accent="rose"
          hint="Awaiting first contact"
        />
      </div>

      <Section
        title="Recent orders"
        viewAll={{ href: "/admin/orders", label: "View all" }}
      >
        {metrics.recentOrders.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="No orders yet"
            description="Once a customer checks out, the order will appear here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3">Order</th>
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3 text-right">Total</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {metrics.recentOrders.map((o) => (
                  <tr key={o.id} className="transition hover:bg-gray-50/60">
                    <td className="px-5 py-3.5">
                      <div className="font-mono text-xs text-gray-900">#{o.order_code}</div>
                      <div className="mt-0.5 text-xs text-gray-500">
                        {dateFmt.format(new Date(o.created_at))}
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-gray-900">{o.customer_name}</div>
                      <div className="text-xs text-gray-500">{o.customer_phone}</div>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-gray-700">
                      {o.items
                        .map((i) => `${i.volume} × ${i.quantity}`)
                        .join(" · ")}
                    </td>
                    <td className="px-5 py-3.5 text-right font-medium text-gray-900">
                      {formatINR(o.total)}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill value={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>

      <Section
        title="Recent leads"
        viewAll={{ href: "/admin/leads", label: "View all" }}
      >
        {metrics.recentLeads.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No contact leads yet"
            description="Submissions from the contact form will land here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3">When</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Contact</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {metrics.recentLeads.map((l) => (
                  <tr key={l.id} className="transition hover:bg-gray-50/60">
                    <td className="whitespace-nowrap px-5 py-3.5 text-xs text-gray-500">
                      {dateFmt.format(new Date(l.created_at))}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-gray-900">{l.name}</td>
                    <td className="px-5 py-3.5">
                      {l.phone && <div className="text-xs text-gray-700">{l.phone}</div>}
                      {l.email && <div className="text-xs text-gray-500">{l.email}</div>}
                    </td>
                    <td className="px-5 py-3.5 max-w-md truncate text-xs text-gray-700">
                      {l.message ?? "—"}
                    </td>
                    <td className="px-5 py-3.5">
                      <StatusPill value={l.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Section>
    </div>
  );
}

function Section({
  title,
  viewAll,
  children,
}: {
  title: string;
  viewAll?: { href: string; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
        <h2 className="font-display text-base font-semibold tracking-tight text-gray-900">
          {title}
        </h2>
        {viewAll && (
          <Link
            href={viewAll.href}
            className="inline-flex items-center gap-1 text-xs font-medium text-brand-700 hover:text-brand-800"
          >
            {viewAll.label}
            <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function SetupNeeded({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
      <h2 className="font-display text-lg font-semibold text-amber-900">
        Supabase not configured
      </h2>
      <p className="mt-2 text-sm text-amber-800">
        Add your Supabase keys to <code className="rounded bg-white/60 px-1 py-0.5">.env.local</code>{" "}
        and restart the dev server. See <code className="rounded bg-white/60 px-1 py-0.5">SETUP_SUPABASE.md</code>.
      </p>
      <pre className="mt-4 overflow-x-auto rounded-lg bg-white p-3 text-xs text-amber-900 ring-1 ring-amber-200">
        {message}
      </pre>
    </div>
  );
}
