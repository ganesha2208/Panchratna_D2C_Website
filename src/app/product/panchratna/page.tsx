import type { Metadata } from "next";
import ProductGallery from "@/components/product/ProductGallery";
import BuyBox from "@/components/product/BuyBox";
import ProductDetails from "@/components/product/ProductDetails";
import Dosage from "@/components/product/Dosage";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";
import { panchratna } from "@/lib/product";

export const metadata: Metadata = {
  title: `${panchratna.name} — ${panchratna.tagline}`,
  description: panchratna.shortDescription,
};

export default function ProductPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50/40 to-white pt-8 md:pt-12">
        <div className="container-px">
          <nav className="mb-6 text-xs text-brand-700/70">
            <a href="/" className="hover:text-brand-800">Home</a> ·{" "}
            <span className="text-brand-900">Panchratna Organic Fertilizer</span>
          </nav>
          <div className="grid gap-10 pb-12 lg:grid-cols-2 lg:gap-16 lg:pb-20">
            <ProductGallery images={panchratna.images} video={panchratna.video} />
            <BuyBox />
          </div>
        </div>
      </section>

      <ProductDetails />
      <Dosage />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
