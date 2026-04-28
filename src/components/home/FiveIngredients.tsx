"use client";

import dynamic from "next/dynamic";
import { panchratna } from "@/lib/product";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";

const IngredientOrbit = dynamic(
  () => import("@/components/three/IngredientOrbit"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="h-40 w-40 animate-pulse rounded-full bg-gradient-to-br from-brand-300/40 to-orange-300/40 blur-2xl" />
      </div>
    ),
  },
);

export default function FiveIngredients() {
  return (
    <section className="section relative overflow-hidden bg-gradient-to-b from-white via-brand-50/40 to-white">
      <div className="grid-pattern absolute inset-0 opacity-50" aria-hidden />
      <div
        className="blob -top-32 right-10 h-80 w-80 bg-orange-200"
        style={{ animationDelay: "-3s" }}
        aria-hidden
      />
      <div className="blob -bottom-24 left-0 h-80 w-80 bg-brand-200" aria-hidden />

      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-orange">Composition · घटक</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl md:text-5xl">
              Six nature-powered ingredients.<br />
              <span className="gradient-text">One powerful formula.</span>
            </h2>
            <p className="mt-5 text-brand-900/70">
              Every drop of Rise Pancharatna is scientifically balanced — bio-stimulants,
              hormones, and vitamins that plants absorb fast and use to their fullest.
            </p>
          </div>
        </Reveal>

        {/* 3D orbit visualisation */}
        <Reveal delay={0.15} className="relative mx-auto mt-12 hidden h-[480px] max-w-4xl md:block">
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-brand-50/60 via-white/40 to-orange-50/60 ring-1 ring-brand-100/60 backdrop-blur-sm" />
          <div className="relative h-full w-full">
            <IngredientOrbit />
          </div>
        </Reveal>

        <StaggerContainer
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {panchratna.ingredients.map((ing, i) => (
            <StaggerItem
              key={ing.name}
              className="group relative overflow-hidden rounded-3xl border border-brand-100 bg-white p-6 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-card"
            >
              <div className="absolute -top-6 -right-6 h-24 w-24 rounded-full bg-brand-50 transition group-hover:bg-orange-50" />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 text-2xl shadow-soft transition group-hover:scale-110 group-hover:rotate-6">
                    {ing.icon}
                  </div>
                  <div className="text-right">
                    <div className="font-display text-3xl font-extrabold text-orange-600">
                      {ing.percent}%
                    </div>
                    <div className="text-[10px] uppercase tracking-wider text-brand-500">
                      Composition
                    </div>
                  </div>
                </div>
                <h3 className="mt-5 font-display text-xl font-bold text-brand-950">
                  {ing.name}
                </h3>
                <div className="mt-0.5 text-sm text-brand-600">{ing.marathi}</div>
                <p className="mt-3 text-sm leading-relaxed text-brand-900/70">{ing.role}</p>

                {/* Composition bar */}
                <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-brand-50">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-brand-500 to-orange-500 transition-all duration-700 group-hover:opacity-90"
                    style={{ width: `${Math.min(100, ing.percent * 7)}%` }}
                  />
                </div>
              </div>
              <div className="absolute bottom-4 right-5 font-display text-5xl font-extrabold text-brand-100/80">
                {String(i + 1).padStart(2, "0")}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
