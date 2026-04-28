"use client";

import { Star } from "lucide-react";
import Reveal, { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import AnimatedCounter from "@/components/motion/AnimatedCounter";
import { site } from "@/lib/site";

const reviews = [
  {
    name: "Ramesh Patil",
    location: "Nashik, Maharashtra",
    crop: "Grapes",
    text: "I switched to Panchratna two seasons ago. My vines are stronger, the soil is softer, and my yield is up nearly 20%. Worth every rupee.",
    rating: 5,
  },
  {
    name: "Sunita Devi",
    location: "Meerut, UP",
    crop: "Vegetables",
    text: "Earlier I used urea and DAP. Now I use Panchratna and my tomatoes taste sweeter. City buyers pay more for organic.",
    rating: 5,
  },
  {
    name: "Karthik Reddy",
    location: "Warangal, Telangana",
    crop: "Cotton",
    text: "The soil in my field was getting hard. After one full cycle with Panchratna, the soil feels alive again. Highly recommended.",
    rating: 5,
  },
  {
    name: "Manjit Singh",
    location: "Ludhiana, Punjab",
    crop: "Wheat",
    text: "Chemical fertilizers were costing me too much. Panchratna cut my input cost and my wheat still grew tall and healthy.",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="section relative overflow-hidden bg-brand-950 text-white">
      <div className="mesh-bg-dark absolute inset-0 opacity-90" aria-hidden />
      <div className="absolute inset-0 opacity-25 leaf-pattern" aria-hidden />

      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-200 ring-1 ring-white/10 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-brand-400" />
              From real farmers
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold sm:text-4xl md:text-5xl">
              Trusted by farmers across India
            </h2>
            <p className="mt-4 text-brand-200">
              Over <strong className="text-white">{site.stats.farmers}</strong> farmers have
              switched to Panchratna. Here&apos;s what a few of them say.
            </p>
          </div>
        </Reveal>

        {/* Animated stats row */}
        <Reveal delay={0.1}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: 1200, suffix: "+", label: "Active farmers" },
              { value: 30, suffix: "%", label: "Avg. yield gain" },
              { value: 10, suffix: "+", label: "States served" },
              { value: 4.8, decimals: 1, suffix: "★", label: "Farmer rating" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl bg-white/5 p-5 text-center ring-1 ring-white/10 backdrop-blur"
              >
                <div className="font-display text-3xl font-extrabold text-orange-300 sm:text-4xl">
                  <AnimatedCounter
                    value={s.value}
                    decimals={s.decimals ?? 0}
                    suffix={s.suffix}
                  />
                </div>
                <div className="mt-1 text-xs text-brand-200">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <StaggerContainer className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {reviews.map((r) => (
            <StaggerItem
              key={r.name}
              className="group rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/10 hover:ring-orange-400/30"
            >
              <div className="flex gap-0.5">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-orange-400 text-orange-400 transition group-hover:scale-110"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-brand-100">&ldquo;{r.text}&rdquo;</p>
              <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-brand-700 font-bold text-white shadow-soft">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-semibold">{r.name}</div>
                  <div className="text-xs text-brand-300">
                    {r.crop} · {r.location}
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
