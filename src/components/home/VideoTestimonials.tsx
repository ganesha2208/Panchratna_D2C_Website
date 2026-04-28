"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play, X, MapPin, Sprout } from "lucide-react";
import { videoTestimonials } from "@/lib/product";
import Reveal from "@/components/motion/Reveal";

export default function VideoTestimonials() {
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

  const posters = [
    "/media/products/panchratna-01.jpg",
    "/media/products/panchratna-02.jpg",
    "/media/products/panchratna-04.jpg",
  ];

  return (
    <section className="section relative overflow-hidden bg-brand-950 text-white">
      <div className="mesh-bg-dark absolute inset-0 opacity-80" aria-hidden />
      <div className="absolute inset-0 opacity-15 leaf-pattern" aria-hidden />

      <div className="container-px relative">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300 ring-1 ring-white/10 backdrop-blur">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
              Farmer Voices
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
              Hear it straight from the field
            </h2>
            <p className="mt-5 text-brand-200">
              Real Marathi farmers. Real crops. Real results with Rise Pancharatna.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {videoTestimonials.map((t, i) => (
            <motion.button
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
              key={t.farmer}
              onClick={() => setOpenIndex(i)}
              className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-800 to-brand-950 text-left ring-1 ring-white/10 transition hover:ring-orange-400/40"
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={posters[i % posters.length]}
                  alt={`${t.farmer} — ${t.crop} farmer`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-orange-500/90 shadow-glow transition group-hover:scale-110 group-hover:bg-orange-500">
                    <Play className="h-6 w-6 fill-white text-white" />
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-orange-500/20 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-orange-200 ring-1 ring-orange-400/30">
                    <Sprout className="h-3 w-3" /> {t.crop}
                  </div>
                  <div className="mt-2 font-display text-lg font-bold leading-tight">
                    {t.farmer}
                  </div>
                  <div className="mt-1 flex items-center gap-1 text-xs text-brand-200">
                    <MapPin className="h-3 w-3" /> {t.location}
                  </div>
                </div>
              </div>

              <div className="p-5">
                <p className="text-sm italic leading-relaxed text-brand-100">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {active && (
        <div
          onClick={() => setOpenIndex(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
        >
          <button
            aria-label="Close"
            onClick={() => setOpenIndex(null)}
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-3xl overflow-hidden rounded-2xl bg-black shadow-2xl"
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
            <div className="bg-gradient-to-br from-brand-800 to-brand-950 p-5 text-white">
              <div className="font-display text-lg font-bold">{active.farmer}</div>
              <div className="text-sm text-brand-200">
                {active.crop} · {active.location}
              </div>
              <p className="mt-2 text-sm italic text-brand-100">&ldquo;{active.quote}&rdquo;</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
