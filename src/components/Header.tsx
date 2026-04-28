"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import { site } from "@/lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/product/panchratna", label: "Panchratna" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Farm Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll progress bar
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 220, damping: 30, mass: 0.4 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <div className="hidden bg-brand-900 text-white md:block">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <span>
            Free delivery on orders above ₹{site.shipping.freeAbove} · 100% organic
            guaranteed
          </span>
          <a
            href={`tel:${site.contact.phone}`}
            className="inline-flex items-center gap-1.5 hover:text-brand-200"
          >
            <Phone className="h-3.5 w-3.5" /> {site.contact.phone}
          </a>
        </div>
      </div>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? "border-b border-brand-100 bg-white/85 shadow-soft backdrop-blur-xl"
            : "border-b border-transparent bg-white/70 backdrop-blur-md"
        }`}
      >
        {/* Scroll progress */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress }}
          className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-orange-500"
        />

        <div className="container-px flex h-16 items-center justify-between gap-4 md:h-20">
          <Logo />
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="group relative rounded-full px-4 py-2 text-sm font-medium text-brand-800 transition hover:text-brand-900"
              >
                <span className="relative z-10">{n.label}</span>
                <span className="absolute inset-0 -z-0 scale-90 rounded-full bg-brand-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link
              href="/product/panchratna"
              className="btn-accent btn-sm hidden md:inline-flex"
            >
              Shop Now
            </Link>
            <CartIcon />
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full text-brand-800 lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm lg:hidden" onClick={() => setOpen(false)}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                aria-label="Close"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full text-brand-800 hover:bg-brand-50"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-xl px-4 py-3 text-base font-medium text-brand-800 hover:bg-brand-50"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <Link
              href="/product/panchratna"
              onClick={() => setOpen(false)}
              className="btn-accent btn-md mt-6 w-full"
            >
              Shop Panchratna
            </Link>
            <a
              href={`tel:${site.contact.phone}`}
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand-200 px-6 py-3 text-sm font-medium text-brand-800 hover:bg-brand-50"
            >
              <Phone className="h-4 w-4" /> {site.contact.phone}
            </a>
          </motion.div>
        </div>
      )}
    </>
  );
}
