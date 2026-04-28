"use client";

import { panchratna } from "@/lib/product";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

export default function Benefits() {
  return (
    <section className="section relative bg-white">
      <div className="grid-pattern absolute inset-0 opacity-30" aria-hidden />
      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Benefits · फायदे</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl md:text-5xl">
              What farmers see in their fields
            </h2>
            <p className="mt-5 text-brand-900/70">
              Real, visible results across every stage — from germination to harvest.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {panchratna.benefits.map((b, i) => (
            <StaggerItem
              key={b.title}
              className={`group relative overflow-hidden rounded-3xl p-7 transition hover:-translate-y-1 ${
                i === 0
                  ? "bg-gradient-to-br from-brand-700 via-brand-600 to-brand-900 text-white shadow-card"
                  : "card hover:shadow-card"
              }`}
            >
              {/* Animated background glow */}
              {i === 0 && (
                <div className="absolute inset-0 opacity-30">
                  <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-orange-400 blur-3xl" />
                  <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-brand-300 blur-3xl" />
                </div>
              )}

              <div className="relative">
                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl text-3xl shadow-soft transition group-hover:scale-110 group-hover:rotate-6 ${
                    i === 0
                      ? "bg-white/15 ring-1 ring-white/25"
                      : "bg-orange-50 ring-1 ring-orange-100"
                  }`}
                >
                  {b.icon}
                </div>
                <h3
                  className={`mt-5 font-display text-xl font-bold ${
                    i === 0 ? "text-white" : "text-brand-950"
                  }`}
                >
                  {b.title}
                </h3>
                <div
                  className={`mt-1 text-sm ${i === 0 ? "text-brand-200" : "text-orange-600"}`}
                >
                  {b.marathi}
                </div>
                <p
                  className={`mt-3 text-sm leading-relaxed ${
                    i === 0 ? "text-brand-100" : "text-brand-900/70"
                  }`}
                >
                  {b.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
