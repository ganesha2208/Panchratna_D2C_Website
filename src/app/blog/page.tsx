import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Farm Blog — Organic Farming Tips",
  description:
    "Practical organic farming tips, crop guides, and success stories from Indian farmers using Panchratna.",
};

const posts = [
  {
    slug: "why-chemical-fertilizers-hurt-soil",
    title: "Why chemical fertilizers quietly hurt your soil every season",
    excerpt:
      "Urea, DAP and potash give a short-term boost but reduce organic matter, beneficial microbes, and long-term yield. Here's what the science says.",
    date: "Apr 10, 2026",
    readTime: "6 min",
    category: "Soil Science",
    emoji: "🌱",
  },
  {
    slug: "panchratna-for-paddy",
    title: "How to use Panchratna on paddy for 20% better yield",
    excerpt:
      "Timing, dosage, and irrigation tips specific to rice cultivation — with lessons from farmers in Andhra Pradesh and Punjab.",
    date: "Apr 02, 2026",
    readTime: "8 min",
    category: "Crop Guide",
    emoji: "🌾",
  },
  {
    slug: "organic-vegetable-profit",
    title: "Organic vegetables fetch 30–40% more in city mandis — here's how",
    excerpt:
      "Meet Sunita Devi from Meerut, who switched her tomato and brinjal farm to organic and doubled her margin.",
    date: "Mar 20, 2026",
    readTime: "5 min",
    category: "Success Story",
    emoji: "🍅",
  },
  {
    slug: "soil-health-test",
    title: "5 signs your soil is exhausted (and what to do about it)",
    excerpt:
      "You don't need a lab to tell if your soil is in trouble. Here are five field-level checks any farmer can do in 10 minutes.",
    date: "Mar 12, 2026",
    readTime: "4 min",
    category: "Soil Science",
    emoji: "🔍",
  },
  {
    slug: "sugarcane-organic",
    title: "Sugarcane farmers: the hidden cost of over-fertilization",
    excerpt:
      "Why piling on urea stops growing sugar content after a point — and how a lower-input organic approach protects margins.",
    date: "Mar 05, 2026",
    readTime: "7 min",
    category: "Crop Guide",
    emoji: "🎋",
  },
  {
    slug: "kitchen-garden",
    title: "Starting an organic kitchen garden: a weekend guide",
    excerpt:
      "You don't need a farm. Here's how to grow chemical-free vegetables in your backyard or terrace with just 1 kg of Panchratna.",
    date: "Feb 22, 2026",
    readTime: "6 min",
    category: "Home Garden",
    emoji: "🏡",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-50 via-white to-orange-50/40">
        <div className="container-px py-16 md:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-orange">Farm Blog</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold text-brand-950 sm:text-5xl">
              Tips, guides & farmer stories
            </h1>
            <p className="mt-5 text-lg text-brand-900/70">
              Practical organic farming advice — written for Indian conditions, Indian crops,
              and Indian farmers.
            </p>
          </div>
        </div>
      </section>

      <section className="section pt-4">
        <div className="container-px">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl bg-white ring-1 ring-brand-100 transition hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-brand-100 to-earth-100 text-7xl">
                  {p.emoji}
                  <span className="absolute left-4 top-4 rounded-full bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-brand-700 ring-1 ring-brand-100">
                    {p.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center gap-3 text-xs text-brand-700/70">
                    <span>{p.date}</span>
                    <span>·</span>
                    <span className="inline-flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {p.readTime}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-lg font-semibold text-brand-950 group-hover:text-brand-700">
                    {p.title}
                  </h2>
                  <p className="mt-2 flex-1 text-sm text-brand-900/70">{p.excerpt}</p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-brand-700">
                    Read more <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-center text-sm text-brand-700/70">
            Full articles coming soon. Want to contribute a farmer story? Email us at{" "}
            <a className="text-brand-700 underline" href="mailto:support@greenraiseagro.com">
              support@greenraiseagro.com
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
