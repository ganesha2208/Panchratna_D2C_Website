import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-brand-950 text-brand-100">
      <div className="absolute inset-0 opacity-[0.07]" aria-hidden>
        <div className="grain absolute inset-0" />
      </div>
      <div className="container-px relative py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="inline-flex items-center rounded-2xl bg-white p-3 shadow-soft">
              <Image
                src="/media/logo/logo.png"
                alt="Green Raise Agro Pvt Ltd"
                width={160}
                height={54}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-brand-200">
              Nourishing the Green. Raising the standard of agricultural excellence with
              Rise Pancharatna — our 100% organic broad-spectrum growth promoter.
            </p>
            <div className="mt-6 flex gap-2">
              {[
                { Icon: Facebook, href: site.social.facebook, label: "Facebook" },
                { Icon: Instagram, href: site.social.instagram, label: "Instagram" },
                { Icon: Youtube, href: site.social.youtube, label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 transition hover:bg-brand-600 hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Shop
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="hover:text-white" href="/product/panchratna">Panchratna</Link></li>
              <li><Link className="hover:text-white" href="/cart">Cart</Link></li>
              <li><Link className="hover:text-white" href="/checkout">Checkout</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link className="hover:text-white" href="/about">About Us</Link></li>
              <li><Link className="hover:text-white" href="/blog">Farm Blog</Link></li>
              <li><Link className="hover:text-white" href="/contact">Contact</Link></li>
              <li><Link className="hover:text-white" href="/legal/shipping">Shipping</Link></li>
              <li><Link className="hover:text-white" href="/legal/returns">Returns & Refunds</Link></li>
              <li><Link className="hover:text-white" href="/legal/privacy">Privacy Policy</Link></li>
              <li><Link className="hover:text-white" href="/legal/terms">Terms of Service</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-brand-300" />
                <span>{site.contact.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 flex-none text-brand-300" />
                <a className="hover:text-white" href={`tel:${site.contact.phone}`}>
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 flex-none text-brand-300" />
                <a className="hover:text-white" href={`mailto:${site.contact.email}`}>
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-brand-300 md:flex-row">
          <span>© {new Date().getFullYear()} Green Raise Agro Pvt Ltd. All rights reserved.</span>
          <span>Made with care for Indian farmers 🌱</span>
        </div>
      </div>
    </footer>
  );
}
