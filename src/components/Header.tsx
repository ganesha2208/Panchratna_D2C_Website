"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import CartIcon from "./CartIcon";
import { site } from "@/lib/site";

const nav = [
  { href: "/product/panchratna", label: "Product" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="hidden border-b border-gray-200 bg-gray-50 text-gray-700 md:block">
        <div className="container-px flex h-9 items-center justify-between text-xs">
          <span>
            Free shipping on orders over ₹{site.shipping.freeAbove} · Cash on Delivery available
          </span>
          <a
            href={`tel:${site.contact.phone}`}
            className="inline-flex items-center gap-1.5 font-medium hover:text-gray-900"
          >
            <Phone className="h-3.5 w-3.5" /> {site.contact.phone}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? "border-b border-gray-200 bg-white/90 backdrop-blur"
            : "border-b border-transparent bg-white"
        }`}
      >
        <div className="container-px flex h-16 items-center justify-between gap-6 md:h-[72px]">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link
              href="/product/panchratna"
              className="btn-primary btn-sm hidden md:inline-flex"
            >
              Shop now
            </Link>
            <CartIcon />
            <button
              aria-label="Open menu"
              onClick={() => setOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-50 bg-gray-900/50 lg:hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <Logo />
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-700 hover:bg-gray-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50"
                >
                  {n.label}
                </Link>
              ))}
            </nav>

            <Link
              href="/product/panchratna"
              onClick={() => setOpen(false)}
              className="btn-primary btn-md mt-6 w-full"
            >
              Shop Panchratna
            </Link>
            <a
              href={`tel:${site.contact.phone}`}
              className="btn-secondary btn-md mt-3 w-full"
            >
              <Phone className="h-4 w-4" /> {site.contact.phone}
            </a>
          </div>
        </div>
      )}
    </>
  );
}
