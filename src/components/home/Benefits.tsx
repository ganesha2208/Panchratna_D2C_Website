"use client";

import {
  Sprout,
  TrendingUp,
  Flower2,
  Apple,
  Leaf,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { panchratna } from "@/lib/product";

const ICONS: Record<string, LucideIcon> = {
  Sprout,
  TrendingUp,
  Flower2,
  Apple,
  Leaf,
};

export default function Benefits() {
  // Show four benefits, side-by-side. The fifth benefit is communicated in the hero.
  const items = panchratna.benefits.slice(0, 4);

  return (
    <section className="section bg-white">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Benefits</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Real, visible results across every stage of the crop
          </h2>
          <p className="mt-4 text-base leading-relaxed text-gray-600">
            From germination to harvest, Pancharatna nourishes both the plant and the
            soil — measurably and consistently.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((b, i) => {
            const Icon = ICONS[b.icon] ?? Leaf;
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-xl border border-gray-200 bg-white p-6 transition-shadow hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-700">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold text-gray-900">
                  {b.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {b.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
