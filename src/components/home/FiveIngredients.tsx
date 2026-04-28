"use client";

import {
  Waves,
  Mountain,
  Zap,
  Dna,
  Droplets,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { panchratna } from "@/lib/product";

const ICONS: Record<string, LucideIcon> = {
  Waves,
  Mountain,
  Zap,
  Dna,
  Droplets,
  Sparkles,
};

export default function FiveIngredients() {
  return (
    <section className="section bg-gray-50">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Composition</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Six bio-active ingredients in one bottle
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            Pancharatna is a precise blend of seaweed, humic and fulvic acids, amino
            acids, vitamins, and natural auxins — every component plays a specific role.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {panchratna.ingredients.map((ing, i) => {
            const Icon = ICONS[ing.icon] ?? Sparkles;
            return (
              <motion.div
                key={ing.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-extrabold tracking-tight text-gray-900">
                      {ing.percent}
                      <span className="text-sm text-gray-500">%</span>
                    </div>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-base font-semibold text-gray-900">
                  {ing.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{ing.role}</p>

                {/* Subtle composition bar — single solid color */}
                <div className="mt-5 h-1 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-brand-600"
                    style={{ width: `${Math.min(100, ing.percent * 8)}%` }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
