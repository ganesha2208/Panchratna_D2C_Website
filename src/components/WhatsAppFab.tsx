"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { site } from "@/lib/site";

export default function WhatsAppFab() {
  return (
    <motion.a
      initial={{ opacity: 0, scale: 0.6, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 200, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
      href={site.contact.whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:bg-[#1ebe57] md:bottom-8 md:right-8"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30" />
      <span className="absolute -inset-1 -z-10 rounded-full bg-[#25D366]/30 blur-lg" />
    </motion.a>
  );
}
