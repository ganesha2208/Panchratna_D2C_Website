import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-700">
      <div className="container-px py-16">
        <div className="grid gap-10 md:grid-cols-12 md:gap-12">
          {/* Brand block */}
          <div className="md:col-span-4">
            <div className="inline-flex items-center">
              <Image
                src="/media/logo/logo.png"
                alt="Green Raise Agro Pvt Ltd"
                width={160}
                height={54}
                className="h-10 w-auto"
              />
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-gray-600">
              Rise Pancharatna is a 100% organic broad-spectrum growth promoter from
              Green Raise Agro — built for Indian farmers, soil and incomes.
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
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-900"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </a>
              ))}
            </div>
          </div>

          {/* Sitemap columns */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Shop
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/product/panchratna">
                  Pancharatna
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/cart">
                  Cart
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/checkout">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Company
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/contact">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/legal/shipping">
                  Shipping
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/legal/returns">
                  Returns &amp; Refunds
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/legal/privacy">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link className="text-gray-600 hover:text-gray-900" href="/legal/terms">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact column */}
          <div className="md:col-span-2">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-900">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-none text-gray-400" strokeWidth={1.75} />
                <span className="text-gray-600">{site.contact.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-none text-gray-400" strokeWidth={1.75} />
                <a className="text-gray-600 hover:text-gray-900" href={`tel:${site.contact.phone}`}>
                  {site.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-none text-gray-400" strokeWidth={1.75} />
                <a
                  className="text-gray-600 hover:text-gray-900"
                  href={`mailto:${site.contact.email}`}
                >
                  {site.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-gray-200 pt-6 text-xs text-gray-500 md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} {site.legalName}. All rights reserved.</span>
          <span>{site.brandTagline}</span>
        </div>
      </div>
    </footer>
  );
}
