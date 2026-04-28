"use client";

import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/motion/Reveal";
import MagneticButton from "@/components/motion/MagneticButton";

export default function CTA() {
  return (
    <section className="section">
      <div className="container-px">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-6 py-14 text-center text-white shadow-card md:px-12 md:py-20">
            {/* Animated mesh + blobs */}
            <div className="mesh-bg-dark absolute inset-0 opacity-60" aria-hidden />
            <div
              className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-400 blur-3xl opacity-30 animate-blob"
              aria-hidden
            />
            <div
              className="absolute -left-20 -bottom-20 h-60 w-60 rounded-full bg-orange-400 blur-3xl opacity-30 animate-blob"
              style={{ animationDelay: "-6s" }}
              aria-hidden
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-5xl">
                Ready to grow{" "}
                <span className="bg-gradient-to-r from-orange-300 to-orange-200 bg-clip-text text-transparent">
                  healthier crops?
                </span>
              </h2>
              <p className="mt-5 text-brand-100">
                Start with a single bottle. Feel the difference in one season. Join 1,200+
                farmers who are building better soil — and better incomes — with Panchratna.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <MagneticButton
                  href="/product/panchratna"
                  className="btn inline-flex items-center gap-2 rounded-full bg-white px-8 py-4 font-semibold text-brand-800 shadow-xl hover:bg-brand-50"
                >
                  <span className="inline-flex items-center gap-2">
                    Order Panchratna <ArrowRight className="h-5 w-5" />
                  </span>
                </MagneticButton>
                <a
                  href={`tel:${site.contact.phone}`}
                  className="btn inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" /> Talk to us
                </a>
              </div>
              <p className="mt-6 text-sm text-brand-200">
                Cash on Delivery · Free shipping above ₹{site.shipping.freeAbove} ·
                Delivered in {site.shipping.deliveryDays}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
