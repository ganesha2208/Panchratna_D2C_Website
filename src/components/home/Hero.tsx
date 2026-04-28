"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, TrendingUp, Star } from "lucide-react";
import { site } from "@/lib/site";
import MagneticButton from "@/components/motion/MagneticButton";

const HeroScene = dynamic(() => import("@/components/three/HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <Image
        src="/media/products/main.png"
        alt="Rise Pancharatna"
        width={520}
        height={520}
        priority
        className="h-auto w-[80%] max-w-md animate-float object-contain drop-shadow-2xl"
      />
    </div>
  ),
});

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Animated gradient mesh */}
      <div className="mesh-bg absolute inset-0" aria-hidden />
      <div className="grid-pattern absolute inset-0 opacity-40" aria-hidden />

      {/* Floating blobs */}
      <div className="blob -top-32 -right-24 h-[520px] w-[520px] bg-brand-300" aria-hidden />
      <div
        className="blob -bottom-40 -left-24 h-[460px] w-[460px] bg-orange-300"
        style={{ animationDelay: "-6s" }}
        aria-hidden
      />

      <div className="container-px relative pt-12 pb-16 md:pt-16 md:pb-24 lg:pt-20 lg:pb-32">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr,1fr]">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6, ease }}
              className="eyebrow-orange"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-500" />
              Broad Spectrum Growth Promoter · 100% Organic
            </motion.div>

            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.03] text-brand-950 sm:text-5xl lg:text-[4.25rem]">
              {[
                "Stronger roots.",
                "Bigger harvests.",
              ].map((line, i) => (
                <motion.span
                  key={line}
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.1, duration: 0.7, ease }}
                >
                  {line}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.7, ease }}
                className="gradient-text block"
              >
                Pure power in every drop.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.7, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-brand-900/75 sm:text-lg"
            >
              Meet <strong className="text-brand-800">Rise Pancharatna</strong> — an organic
              liquid bio-stimulant made from six nature-powered ingredients. Seaweed,
              humic &amp; fulvic acids, amino acids, vitamins, and auxins working together to
              make every crop healthier, greener, and more profitable.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.7, ease }}
              className="mt-8 flex flex-wrap gap-3"
            >
              <MagneticButton href="/product/panchratna" className="btn-accent btn-lg">
                <span className="inline-flex items-center gap-2">
                  Shop Pancharatna <ArrowRight className="h-5 w-5" />
                </span>
              </MagneticButton>
              <Link href="/about" className="btn-secondary btn-lg">
                Our story
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease }}
              className="mt-10 grid max-w-md grid-cols-3 gap-3"
            >
              {[
                { icon: TrendingUp, label: "+20–30%", sub: "Yield boost" },
                { icon: ShieldCheck, label: "100%", sub: "Organic & safe" },
                { icon: Sparkles, label: "6-in-1", sub: "Bio-active blend" },
              ].map(({ icon: Icon, label, sub }) => (
                <div
                  key={label}
                  className="glass rounded-2xl p-3.5 transition hover:-translate-y-0.5 hover:shadow-card"
                >
                  <Icon className="h-5 w-5 text-orange-500" />
                  <div className="mt-2 font-display text-lg font-bold text-brand-900">
                    {label}
                  </div>
                  <div className="text-[11px] text-brand-700/70">{sub}</div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="mt-8 flex flex-wrap items-center gap-4 text-sm text-brand-800/80"
            >
              <div className="flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-orange-400 text-orange-400" />
                  ))}
                </div>
                <span className="font-semibold text-brand-900">{site.stats.rating}/5</span>
                <span>({site.stats.reviews.toLocaleString("en-IN")}+ farmers)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D scene */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.9, ease }}
            className="relative"
          >
            <div className="relative mx-auto aspect-square w-full max-w-lg">
              <div className="absolute inset-8 animate-pulse-glow rounded-full bg-gradient-to-br from-brand-500/20 via-brand-400/10 to-orange-400/30 blur-2xl" />
              <div className="absolute inset-0">
                <HeroScene />
              </div>

              {/* Floating glass badges */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9, duration: 0.6, ease }}
                className="absolute left-0 top-10 rotate-[-4deg] glass p-3 md:-left-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-xl">
                    🌱
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-600">Stronger</div>
                    <div className="font-display text-sm font-bold text-brand-900">Roots</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.05, duration: 0.6, ease }}
                className="absolute right-0 top-24 rotate-[6deg] glass p-3 md:-right-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-50 text-xl">
                    🌸
                  </div>
                  <div>
                    <div className="text-[10px] text-orange-600">Better</div>
                    <div className="font-display text-sm font-bold text-brand-900">
                      Flowering
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6, ease }}
                className="absolute bottom-10 left-6 rotate-[4deg] glass p-3 md:left-0"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-50 text-xl">
                    🍎
                  </div>
                  <div>
                    <div className="text-[10px] text-brand-600">Bigger</div>
                    <div className="font-display text-sm font-bold text-brand-900">Fruits</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.35, duration: 0.6, ease }}
                className="absolute -bottom-2 right-6 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-700 p-4 text-white shadow-xl md:right-0"
              >
                <div className="text-[10px] uppercase tracking-wider text-brand-200">
                  Available in
                </div>
                <div className="font-display text-lg font-bold">1L · 5L · 10L</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
