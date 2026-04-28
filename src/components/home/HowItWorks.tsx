"use client";

import Reveal, { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

const steps = [
  {
    step: "01",
    title: "Shake well",
    marathi: "चांगले हलवा",
    detail: "Give the bottle a good shake before use so the nutrients mix perfectly.",
  },
  {
    step: "02",
    title: "Mix with water",
    marathi: "पाण्यात मिसळा",
    detail: "For drenching: 1–2 L per acre. For spraying: 2–3 ml per litre of water.",
  },
  {
    step: "03",
    title: "Apply to crops",
    marathi: "पिकावर वापरा",
    detail: "Drench with irrigation, or spray in early morning / late evening.",
  },
  {
    step: "04",
    title: "See the change",
    marathi: "बदल पहा",
    detail: "Stronger roots within 7 days. Visible growth & greener leaves in 2 weeks.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-orange-50/30 via-white to-white">
      <div
        className="blob top-20 -left-32 h-72 w-72 bg-orange-200 opacity-40"
        aria-hidden
      />
      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">How it works</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl md:text-5xl">
              Four simple steps.<br />
              <span className="gradient-text">Powerful results.</span>
            </h2>
          </div>
        </Reveal>

        <StaggerContainer className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {steps.map((s, i) => (
            <StaggerItem key={s.step} className="relative">
              <div className="group relative">
                <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 opacity-0 blur-xl transition group-hover:opacity-50" />
                <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 font-display text-xl font-bold text-white shadow-soft transition group-hover:scale-105">
                  {s.step}
                </div>
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-brand-950">
                {s.title}
              </h3>
              <div className="mt-0.5 text-sm text-orange-600">{s.marathi}</div>
              <p className="mt-3 text-sm leading-relaxed text-brand-900/70">{s.detail}</p>

              {i < steps.length - 1 && (
                <div className="absolute left-16 top-8 hidden h-px w-[calc(100%-4rem)] bg-gradient-to-r from-orange-300 via-orange-200 to-transparent lg:block" />
              )}
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
