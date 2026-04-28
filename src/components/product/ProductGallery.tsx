"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Maximize2, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Slide =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster: string; alt: string };

type Props = {
  images: { src: string; alt: string }[];
  video?: string;
};

export default function ProductGallery({ images, video }: Props) {
  const slides: Slide[] = [
    ...images.map((img) => ({ type: "image" as const, src: img.src, alt: img.alt })),
    ...(video
      ? [{ type: "video" as const, src: video, poster: images[0]?.src ?? "", alt: "Product video" }]
      : []),
  ];

  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  const current = slides[active];

  return (
    <>
      <div className="lg:sticky lg:top-24">
        <div className="group relative aspect-square overflow-hidden rounded-3xl bg-gradient-to-br from-brand-50 to-orange-50/40 ring-1 ring-brand-100">
          {current.type === "image" ? (
            <>
              <Image
                src={current.src}
                alt={current.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 560px"
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                priority={active === 0}
              />
              <button
                onClick={() => setLightbox(true)}
                aria-label="Enlarge image"
                className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-700 shadow-soft backdrop-blur transition hover:bg-white"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </>
          ) : (
            <video
              src={current.src}
              controls
              className="absolute inset-0 h-full w-full object-contain bg-black"
              poster={current.poster}
            />
          )}
          <div className="absolute left-4 top-4 rounded-full bg-brand-900/90 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            100% Organic
          </div>
        </div>

        <div className="mt-4 grid grid-cols-5 gap-2.5 md:grid-cols-6">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-brand-50 to-orange-50/40 ring-1 ring-brand-100 transition",
                active === i && "ring-2 ring-orange-500 ring-offset-2",
              )}
              aria-label={`View ${s.type} ${i + 1}`}
            >
              <Image
                src={s.type === "image" ? s.src : (s as any).poster}
                alt={s.alt}
                fill
                sizes="96px"
                className="object-contain p-1"
              />
              {s.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                  <Play className="h-5 w-5 fill-white text-white" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {lightbox && current.type === "image" && (
        <div
          onClick={() => setLightbox(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 animate-fade-in"
        >
          <button
            aria-label="Close"
            className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="relative h-[85vh] w-[90vw]">
            <Image
              src={current.src}
              alt={current.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </div>
        </div>
      )}
    </>
  );
}
