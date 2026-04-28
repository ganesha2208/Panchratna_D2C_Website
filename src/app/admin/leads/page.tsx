import { Inbox } from "lucide-react";
import { getLeads } from "@/lib/admin-data";
import { StatusPill } from "../_components/StatusPill";
import { EmptyState } from "../_components/EmptyState";

export const dynamic = "force-dynamic";
export const metadata = { title: "Leads · Admin" };

const dateFmt = new Intl.DateTimeFormat("en-IN", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Asia/Kolkata",
});

export default async function LeadsPage() {
  const leads = await getLeads(200);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-2xl font-semibold tracking-tight text-gray-900">
          Contact leads
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          {leads.length === 0
            ? "No leads yet"
            : `Showing ${leads.length} most recent ${leads.length === 1 ? "lead" : "leads"}`}
        </p>
      </header>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {leads.length === 0 ? (
          <EmptyState
            icon={Inbox}
            title="No contact leads yet"
            description="Submissions from the contact form will land here."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/60 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-3">When</th>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Phone</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">City</th>
                  <th className="px-5 py-3">Message</th>
                  <th className="px-5 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {leads.map((l) => (
                  <tr key={l.id} className="align-top transition hover:bg-gray-50/60">
                    <td className="whitespace-nowrap px-5 py-4 text-xs text-gray-500">
                      {dateFmt.format(new Date(l.created_at))}
                    </td>
                    <td className="px-5 py-4 font-medium text-gray-900">{l.name}</td>
                    <td className="px-5 py-4">
                      {l.phone ? (
                        <a
                          href={`tel:${l.phone}`}
                          className="text-xs text-gray-700 hover:text-brand-700"
                        >
                          {l.phone}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      {l.email ? (
                        <a
                          href={`mailto:${l.email}`}
                          className="text-xs text-gray-700 hover:text-brand-700"
                        >
                          {l.email}
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-xs text-gray-700">
                      {l.city ?? <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-5 py-4 max-w-md text-xs text-gray-700">
                      {l.message ? (
                        <p className="line-clamp-3 whitespace-pre-wrap">{l.message}</p>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4">
                      <StatusPill value={l.status} />
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
