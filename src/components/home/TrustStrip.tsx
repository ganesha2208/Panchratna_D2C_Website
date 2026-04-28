import { site } from "@/lib/site";

const stats = [
  { value: site.stats.farmers, label: "Indian farmers" },
  { value: site.stats.states, label: "States served" },
  { value: site.stats.yieldGain, label: "Avg. yield gain" },
  { value: `${site.stats.rating}/5`, label: "Farmer rating" },
];

export default function TrustStrip() {
  return (
    <section className="border-b border-gray-200 bg-gray-50">
      <div className="container-px grid grid-cols-2 gap-y-6 py-10 md:grid-cols-4 md:gap-y-0 md:py-12">
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div className="font-display text-3xl font-extrabold tracking-tight text-gray-900 md:text-4xl">
              {s.value}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
