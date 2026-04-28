"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck } from "lucide-react";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-gray-200 bg-white">
      <div className="container-px relative pt-12 pb-16 md:pt-20 md:pb-24 lg:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr,1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs font-medium text-gray-700">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-600" />
              100% Organic · Made in India
            </div>

            <h1 className="mt-6 font-display text-[2.5rem] font-extrabold leading-[1.05] tracking-[-0.03em] text-gray-900 sm:text-5xl lg:text-[3.75rem]">
              Healthier crops.
              <br />
              <span className="text-brand-700">Higher yields.</span>
              <br />
              Naturally.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-[1.65] text-gray-600 sm:text-lg">
              Rise Pancharatna is a 100% organic liquid bio-stimulant that strengthens
              roots, boosts flowering, and improves yield by 20–30%. Used by{" "}
              {site.stats.farmers} farmers across {site.stats.states} Indian states.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/product/panchratna" className="btn-primary btn-lg">
                Shop Pancharatna <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/about" className="btn-secondary btn-lg">
                Why organic
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-orange-500 text-orange-500"
                    />
                  ))}
                </div>
                <span className="font-semibold text-gray-900">{site.stats.rating}</span>
                <span>· {site.stats.reviews.toLocaleString("en-IN")} farmer reviews</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium text-gray-700">
                <ShieldCheck className="h-4 w-4 text-brand-700" />
                FCO &amp; Jaivik Bharat certified
              </div>
            </div>
          </motion.div>

          {/* Product visual */}
          <motion.div
            initial={{ opacity: 0, scale: reduce ? 1 : 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.8, ease }}
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-brand-50 to-white ring-1 ring-gray-200">
              {/* Soft circular spotlight behind product */}
              <div
                aria-hidden
                className="absolute inset-x-8 top-12 bottom-12 rounded-full bg-gradient-to-br from-brand-100 via-brand-50 to-white blur-xl"
              />
              <Image
                src="/media/products/main.png"
                alt="Rise Pancharatna — 100% Organic Liquid Bio-Stimulant"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 480px"
                className="relative object-contain p-8 md:p-12"
              />
            </div>

            {/* Pack-size pill */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-700 shadow-sm">
              Available in 1 L · 5 L · 10 L
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
