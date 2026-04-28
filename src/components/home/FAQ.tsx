"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Reveal from "@/components/motion/Reveal";

const faqs = [
  {
    q: "Is Panchratna safe for all crops?",
    a: "Yes. Panchratna is formulated to work with cereals, vegetables, fruits, pulses, oilseeds, flowers, sugarcane, cotton, tea, and coffee. It is especially effective for long-term soil health.",
  },
  {
    q: "How much should I apply per acre?",
    a: "For drenching, mix 1–2 litres per acre with irrigation water every 20–25 days. For foliar spray, use 2–3 ml per litre of water and spray every 15 days. Detailed crop-specific dosage is on the product page.",
  },
  {
    q: "How is Panchratna different from urea or DAP?",
    a: "Urea and DAP are chemical fertilizers that boost growth quickly but degrade the soil over time. Panchratna is 100% organic — it feeds both the plant and the soil, so your fields get healthier every year.",
  },
  {
    q: "Does it work in the first season?",
    a: "Yes, most farmers see better plant health and yield within the first crop cycle. The biggest gains come when used consistently for 2–3 seasons, as the soil microbiome rebuilds.",
  },
  {
    q: "Can I use it with chemical fertilizers?",
    a: "Yes, you can phase out chemicals gradually. Many farmers start with a 50/50 mix in season one, then move fully organic. Our agri-advisors can help you plan — just call us.",
  },
  {
    q: "What are shipping and payment options?",
    a: "We deliver across India in 3–7 days. Currently we offer Cash on Delivery. Online payments will be added soon.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr,2fr]">
          <Reveal>
            <span className="eyebrow">Questions & Answers</span>
            <h2 className="mt-4 font-display text-3xl font-bold text-brand-950 sm:text-4xl">
              Common questions from{" "}
              <span className="gradient-text">farmers</span>
            </h2>
            <p className="mt-4 text-brand-900/70">
              Can&apos;t find your answer? Our team is happy to help — just call or message us.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="divide-y divide-brand-100 overflow-hidden rounded-3xl bg-gradient-to-b from-white to-brand-50/30 ring-1 ring-brand-100">
              {faqs.map((f, i) => {
                const isOpen = open === i;
                return (
                  <div key={f.q} className="group">
                    <button
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="flex w-full items-start gap-4 px-6 py-5 text-left transition hover:bg-brand-50/50"
                    >
                      <div className="flex-1 font-semibold text-brand-950">{f.q}</div>
                      <ChevronDown
                        className={`mt-1 h-5 w-5 flex-none text-brand-600 transition-transform duration-300 ${
                          isOpen ? "rotate-180 text-orange-500" : ""
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-6 pb-5 text-sm leading-relaxed text-brand-900/70">
                            {f.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
