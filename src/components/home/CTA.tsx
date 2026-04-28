import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";

export default function CTA() {
  return (
    <section className="section">
      <div className="container-px">
        <div className="overflow-hidden rounded-2xl bg-gray-900 px-6 py-14 text-white sm:px-10 md:px-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-[2.75rem]">
              Try Pancharatna for one season.
              <br />
              Feel the difference in your fields.
            </h2>
            <p className="mt-5 text-base leading-relaxed text-gray-300">
              Cash on Delivery across India. Free shipping over ₹{site.shipping.freeAbove}.
              Delivered in {site.shipping.deliveryDays}.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/product/panchratna"
                className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-gray-900 transition-colors hover:bg-gray-100"
              >
                Order Pancharatna <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={`tel:${site.contact.phone}`}
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Phone className="h-4 w-4" /> Talk to us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
