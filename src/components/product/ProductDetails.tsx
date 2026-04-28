import Image from "next/image";
import { Check } from "lucide-react";
import { panchratna } from "@/lib/product";

export default function ProductDetails() {
  return (
    <section className="section bg-white">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="eyebrow">About Pancharatna</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl">
              A liquid bio-stimulant built from six natural ingredients
            </h2>
            <p className="mt-5 text-brand-900/80">{panchratna.longDescription}</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {panchratna.ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="flex items-center gap-3 rounded-xl bg-brand-50/60 px-3 py-2 ring-1 ring-brand-100"
                >
                  <span className="text-xl">{ing.icon}</span>
                  <div>
                    <div className="text-xs font-semibold text-brand-900">{ing.name}</div>
                    <div className="text-[10px] text-orange-600">{ing.percent}%</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-orange-50 ring-1 ring-brand-100">
              <Image
                src="/media/products/panchratna-03.jpg"
                alt="Pancharatna ingredient composition"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-3xl bg-white p-5 shadow-card ring-1 ring-brand-100 md:block">
              <div className="font-display text-3xl font-extrabold text-orange-600">38%</div>
              <div className="text-xs text-brand-700">Total bio-actives</div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <span className="eyebrow-orange">Results · फायदे</span>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl">
            Why farmers keep reordering
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {panchratna.benefits.map((b) => (
              <li
                key={b.title}
                className="flex items-start gap-3 rounded-2xl bg-brand-50/60 p-4 ring-1 ring-brand-100"
              >
                <div className="mt-0.5 flex h-7 w-7 flex-none items-center justify-center rounded-full bg-brand-600 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-brand-900">{b.title}</div>
                  <div className="text-xs text-orange-600">{b.marathi}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
