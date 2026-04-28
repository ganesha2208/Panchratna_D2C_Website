const PALETTE: Record<string, string> = {
  // orders
  pending: "bg-amber-50 text-amber-700 ring-amber-200",
  confirmed: "bg-blue-50 text-blue-700 ring-blue-200",
  shipped: "bg-indigo-50 text-indigo-700 ring-indigo-200",
  delivered: "bg-brand-50 text-brand-700 ring-brand-200",
  cancelled: "bg-red-50 text-red-700 ring-red-200",
  // leads
  new: "bg-amber-50 text-amber-700 ring-amber-200",
  contacted: "bg-blue-50 text-blue-700 ring-blue-200",
  closed: "bg-gray-100 text-gray-600 ring-gray-200",
};

export function StatusPill({ value }: { value: string }) {
  const cls = PALETTE[value] ?? "bg-gray-100 text-gray-700 ring-gray-200";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium uppercase tracking-wide ring-1 ring-inset ${cls}`}
    >
      {value}
    </span>
  );
}
