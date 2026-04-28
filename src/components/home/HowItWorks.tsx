"use client";

import { motion } from "framer-motion";

const steps = [
  {
    n: "01",
    title: "Shake well",
    detail: "Give the bottle a thorough shake before use so nutrients mix evenly.",
  },
  {
    n: "02",
    title: "Mix with water",
    detail:
      "For drenching: 1–2 L per acre. For foliar spray: 2–3 ml per litre of water.",
  },
  {
    n: "03",
    title: "Apply to crops",
    detail:
      "Drench with irrigation water or spray in early morning / late evening.",
  },
  {
    n: "04",
    title: "See the change",
    detail: "Stronger roots within 7 days. Visible growth within 2 weeks.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section bg-white">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="section-eyebrow">How to use</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Four simple steps from bottle to harvest
          </h2>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden rounded-xl bg-gray-200 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white p-6 lg:p-8"
            >
              <div className="font-mono text-xs font-semibold tracking-wider text-brand-700">
                {s.n}
              </div>
              <h3 className="mt-3 font-display text-lg font-semibold text-gray-900">
                {s.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
