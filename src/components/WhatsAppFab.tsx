"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function WhatsAppFab() {
  return (
    <motion.a
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      href={site.contact.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg ring-1 ring-black/5 transition-colors hover:bg-[#1ebe57] md:bottom-6 md:right-6"
    >
      <MessageCircle className="h-5 w-5" />
    </motion.a>
  );
}
