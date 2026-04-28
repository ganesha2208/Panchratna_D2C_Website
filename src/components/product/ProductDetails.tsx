import Image from "next/image";
import {
  Check,
  Waves,
  Mountain,
  Zap,
  Dna,
  Droplets,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { panchratna } from "@/lib/product";

const ICONS: Record<string, LucideIcon> = {
  Waves,
  Mountain,
  Zap,
  Dna,
  Droplets,
  Sparkles,
};

export default function ProductDetails() {
  return (
    <section className="section bg-white">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="section-eyebrow">About Pancharatna</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              A liquid bio-stimulant built from six natural ingredients
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-600">
              {panchratna.longDescription}
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {panchratna.ingredients.map((ing) => {
                const Icon = ICONS[ing.icon] ?? Sparkles;
                return (
                  <div
                    key={ing.name}
                    className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
                  >
                    <div className="flex h-9 w-9 flex-none items-center justify-center rounded-md bg-brand-50 text-brand-700">
                      <Icon className="h-4 w-4" strokeWidth={1.75} />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-gray-900">
                        {ing.name}
                      </div>
                      <div className="text-xs text-gray-500">{ing.percent}%</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-gray-200">
              <Image
                src="/media/products/panchratna-03.jpg"
                alt="Pancharatna ingredient composition"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm md:block">
              <div className="font-display text-3xl font-extrabold tracking-tight text-gray-900">
                38%
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-gray-500">
                Total bio-actives
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <span className="section-eyebrow">Results</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Why farmers keep reordering
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {panchratna.benefits.map((b) => (
              <li
                key={b.title}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
              >
                <div className="mt-0.5 flex h-6 w-6 flex-none items-center justify-center rounded-full bg-brand-700 text-white">
                  <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{b.title}</div>
                  <div className="mt-0.5 text-xs text-gray-500">{b.marathi}</div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
