"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Is Panchratna safe for all crops?",
    a: "Yes. Panchratna works with cereals, vegetables, fruits, pulses, oilseeds, flowers, sugarcane, cotton, tea, and coffee. It is especially effective for long-term soil health.",
  },
  {
    q: "How much should I apply per acre?",
    a: "For drenching, mix 1–2 litres per acre with irrigation water every 20–25 days. For foliar spray, use 2–3 ml per litre of water and spray every 15 days. Crop-specific dosage is listed on the product page.",
  },
  {
    q: "How is Panchratna different from urea or DAP?",
    a: "Urea and DAP are chemical fertilizers that boost growth quickly but degrade soil over time. Panchratna is 100% organic — it feeds both plant and soil, so fields get healthier every year.",
  },
  {
    q: "Does it work in the first season?",
    a: "Yes — most farmers see better plant health and yield within the first crop cycle. The biggest gains come when used consistently for 2–3 seasons, as the soil microbiome rebuilds.",
  },
  {
    q: "Can I use it with chemical fertilizers?",
    a: "Yes. Many farmers start with a 50/50 mix in season one, then move fully organic. Our agri-advisors can help you plan a transition — just call us.",
  },
  {
    q: "What are shipping and payment options?",
    a: "We deliver across India in 3–7 days. Currently we offer Cash on Delivery. Online payments are coming soon.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="section bg-white">
      <div className="container-px">
        <div className="grid gap-12 lg:grid-cols-[1fr,1.6fr] lg:gap-20">
          <div>
            <span className="section-eyebrow">Questions</span>
            <h2 className="font-display text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Frequently asked
            </h2>
            <p className="mt-4 text-base leading-relaxed text-gray-600">
              Can&apos;t find your answer here? Our team is happy to help — call or
              message us anytime.
            </p>
          </div>

          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={f.q}>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-medium text-gray-900">{f.q}</span>
                    <Plus
                      className={`h-5 w-5 flex-none text-gray-500 transition-transform duration-300 ${
                        isOpen ? "rotate-45 text-gray-900" : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-5 text-sm leading-relaxed text-gray-600">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
