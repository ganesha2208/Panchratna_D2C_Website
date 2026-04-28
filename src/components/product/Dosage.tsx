import { Droplets, SprayCan } from "lucide-react";
import { panchratna } from "@/lib/product";

const iconFor = (method: string) =>
  method.toLowerCase().includes("spray") ? SprayCan : Droplets;

export default function Dosage() {
  return (
    <section className="section bg-gradient-to-b from-white to-orange-50/30">
      <div className="container-px">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow-orange">Usage Guide · वापर</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl md:text-5xl">
            How to use Pancharatna
          </h2>
          <p className="mt-5 text-brand-900/70">
            Two simple methods. Use both for best results — most farmers see visible
            change within 2 weeks.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {panchratna.dosage.map((d, i) => {
            const Icon = iconFor(d.method);
            return (
              <div
                key={d.method}
                className="group relative overflow-hidden rounded-3xl bg-white p-8 shadow-soft ring-1 ring-brand-100 transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-50 transition group-hover:bg-orange-100" />
                <div className="relative">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-orange-600">
                    Method {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-soft">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-bold text-brand-950">
                        {d.method}
                      </h3>
                      <div className="text-sm text-brand-600">{d.marathi}</div>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-gradient-to-br from-brand-50 to-brand-100/40 p-5 ring-1 ring-brand-100">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-brand-700">
                      Recommended dosage
                    </div>
                    <div className="mt-1 font-display text-2xl font-extrabold text-brand-950">
                      {d.amount}
                    </div>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-brand-900/75">{d.when}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 rounded-3xl bg-brand-900 p-8 text-white md:p-10">
          <div className="text-[11px] font-bold uppercase tracking-wider text-brand-300">
            Suitable for
          </div>
          <h3 className="mt-2 font-display text-2xl font-bold">Almost every crop you grow</h3>
          <div className="mt-5 flex flex-wrap gap-2">
            {panchratna.crops.map((c) => (
              <span
                key={c}
                className="inline-flex rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-brand-100 ring-1 ring-white/10"
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
