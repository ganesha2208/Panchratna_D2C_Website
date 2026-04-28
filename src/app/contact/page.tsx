import type { Metadata } from "next";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Talk to our farmer-advisors. We answer product, usage, and shipping questions in English and Hindi.",
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 via-white to-orange-50/40">
        <div className="container-px py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-orange">We&apos;re here to help</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold text-brand-950 sm:text-5xl">
              Talk to a farmer-advisor
            </h1>
            <p className="mt-5 text-lg text-brand-900/70">
              Questions about dosage, crop specifics, shipping to your village, or bulk
              pricing? Our team answers in English, Hindi, and Marathi.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-px">
          <div className="grid gap-10 lg:grid-cols-[1fr,1.5fr]">
            <div className="space-y-4">
              <a
                href={`tel:${site.contact.phone}`}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-brand-100 transition hover:shadow-card"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    Phone
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-brand-950">
                    {site.contact.phone}
                  </div>
                  <div className="text-xs text-brand-700/70">Mon–Sat, 9 AM – 7 PM</div>
                </div>
              </a>

              <a
                href={site.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-brand-100 transition hover:shadow-card"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] ring-1 ring-[#25D366]/20">
                  <MessageCircle className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    WhatsApp
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-brand-950">
                    {site.contact.whatsapp}
                  </div>
                  <div className="text-xs text-brand-700/70">Fastest response</div>
                </div>
              </a>

              <a
                href={`mailto:${site.contact.email}`}
                className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-brand-100 transition hover:shadow-card"
              >
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    Email
                  </div>
                  <div className="mt-1 font-display text-lg font-semibold text-brand-950">
                    {site.contact.email}
                  </div>
                  <div className="text-xs text-brand-700/70">We reply within 24 hrs</div>
                </div>
              </a>

              <div className="flex items-start gap-4 rounded-2xl bg-white p-5 ring-1 ring-brand-100">
                <div className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                    Address
                  </div>
                  <div className="mt-1 text-sm text-brand-900">{site.contact.address}</div>
                </div>
              </div>
            </div>

            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
