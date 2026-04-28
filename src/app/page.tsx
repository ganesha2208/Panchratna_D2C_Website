import Hero from "@/components/home/Hero";
import TrustStrip from "@/components/home/TrustStrip";
import Benefits from "@/components/home/Benefits";
import FiveIngredients from "@/components/home/FiveIngredients";
import HowItWorks from "@/components/home/HowItWorks";
import VideoTestimonials from "@/components/home/VideoTestimonials";
import Testimonials from "@/components/home/Testimonials";
import FAQ from "@/components/home/FAQ";
import CTA from "@/components/home/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />
      <FiveIngredients />
      <Benefits />
      <HowItWorks />
      <VideoTestimonials />
      <Testimonials />
      <FAQ />
      <CTA />
    </>
  );
}
