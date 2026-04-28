"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, X, Star, MapPin } from "lucide-react";
import { videoTestimonials } from "@/lib/product";

const reviews = [
  {
    name: "Ramesh Patil",
    location: "Nashik, Maharashtra",
    crop: "Grapes",
    text: "Switched to Panchratna two seasons ago. My vines are stronger, the soil is softer, and yield is up nearly 20%.",
  },
  {
    name: "Sunita Devi",
    location: "Meerut, UP",
    crop: "Vegetables",
    text: "Earlier I used urea and DAP. Now I use Panchratna and my tomatoes taste sweeter. City buyers pay more for organic.",
  },
  {
    name: "Karthik Reddy",
    location: "Warangal, Telangana",
    crop: "Cotton",
    text: "The soil in my field was getting hard. After one full cycle the soil feels alive again. Highly recommended.",
  },
  {
    name: "Manjit Singh",
    location: "Ludhiana, Punjab",
    crop: "Wheat",
    text: "Chemical fertilizers were costing too much. Panchratna cut my input cost and my wheat still grew tall and healthy.",
  },
];

const posters = [
  "/media/products/panchratna-01.jpg",
  "/media/products/panchratna-02.jpg",
  "/media/products/panchratna-04.jpg",
];

export default function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const active = openIndex !== null ? videoTestimonials[openIndex] : null;

  return (
    <section className="section bg-gray-50">
      <div className="container-px">
        <div className="max-w-2xl">
          <span className="section-eyebrow">Farmer Stories</span>
          <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            What real farmers say after one season
          </h2>
        </div>

        {/* Video tiles */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videoTestimonials.map((t, i) => (
            <motion.button
              key={t.farmer}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={() => setOpenIndex(i)}
              className="group relative overflow-hidden rounded-xl text-left ring-1 ring-gray-200 transition hover:ring-gray-300"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={posters[i % posters.length]}
                  alt={`${t.farmer} — ${t.crop} farmer`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/85 via-gray-900/20 to-transparent" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-gray-900 shadow-lg ring-1 ring-black/5 transition group-hover:scale-105">
                    <Play className="h-5 w-5 translate-x-0.5 fill-gray-900" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/70">
                    {t.crop}
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold">
                    {t.farmer}
                  </div>
                  <div className="mt-0.5 inline-flex items-center gap-1 text-xs text-white/80">
                    <MapPin className="h-3 w-3" /> {t.location}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Written reviews */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reviews.map((r, i) => (
            <motion.div
              key={r.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-xl border border-gray-200 bg-white p-6"
            >
              <div className="flex">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className="h-4 w-4 fill-orange-500 text-orange-500"
                  />
                ))}
              </div>
              <p className="mt-4 text-sm leading-relaxed text-gray-700">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="mt-5 border-t border-gray-100 pt-4">
                <div className="text-sm font-semibold text-gray-900">{r.name}</div>
                <div className="mt-0.5 text-xs text-gray-500">
                  {r.crop} · {r.location}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {active && (
        <div
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gray-950/90 p-4"
        >
          <button
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-xl bg-black shadow-2xl"
          >
            <video
              ref={videoRef}
              key={active.video}
              src={active.video}
              autoPlay
              controls
              playsInline
              className="h-auto max-h-[80vh] w-full bg-black"
            />
            <div className="bg-gray-900 p-5 text-white">
              <div className="font-display text-base font-semibold">{active.farmer}</div>
              <div className="text-xs text-gray-400">
                {active.crop} · {active.location}
              </div>
              <p className="mt-2 text-sm italic text-gray-200">
                &ldquo;{active.quote}&rdquo;
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
