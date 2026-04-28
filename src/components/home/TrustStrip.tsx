"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Truck, Leaf, HeartHandshake } from "lucide-react";

const items = [
  { icon: Leaf, title: "100% Organic", sub: "No chemicals. No residues." },
  { icon: ShieldCheck, title: "Certified Quality", sub: "FCO & Jaivik Bharat" },
  { icon: Truck, title: "Fast Delivery", sub: "3–7 days across India" },
  { icon: HeartHandshake, title: "Farmer Support", sub: "Free agri-advisory" },
];

export default function TrustStrip() {
  return (
    <section className="relative border-y border-brand-100 bg-white">
      <div className="container-px grid grid-cols-2 gap-4 py-8 md:grid-cols-4 md:py-10">
        {items.map(({ icon: Icon, title, sub }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.08, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-gradient-to-br from-brand-50 to-brand-100 text-brand-700 ring-1 ring-brand-100 transition group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-orange-50 group-hover:to-orange-100 group-hover:text-orange-600">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <div className="font-semibold text-brand-900">{title}</div>
              <div className="text-xs text-brand-700/70">{sub}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
