import type { Metadata } from "next";
import Image from "next/image";
import { Leaf, Users, Target, Sparkles, Award, HeartHandshake } from "lucide-react";
import CTA from "@/components/home/CTA";
import { site } from "@/lib/site";
import AnimatedCounter from "@/components/motion/AnimatedCounter";

export const metadata: Metadata = {
  title: "About Green Raise Agro",
  description:
    "Nourishing the Green — raising the standard of agricultural excellence. Meet the team behind Rise Pancharatna.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-white to-orange-50/40">
        <div className="leaf-pattern absolute inset-0" aria-hidden />
        <div className="container-px relative py-16 md:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="eyebrow-orange">Our Story</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold text-brand-950 sm:text-5xl md:text-6xl">
              Nourishing the Green.<br />
              <span className="bg-gradient-to-r from-brand-600 to-orange-500 bg-clip-text text-transparent">
                Raising the standard.
              </span>
            </h1>
            <p className="mt-6 text-lg text-brand-900/75">
              {site.legalName} is an Indian agri-inputs company on a mission to help
              farmers grow more — and grow better — with scientifically-formulated organic
              solutions. Rise Pancharatna is our flagship product.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr,1fr]">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-gradient-to-br from-brand-100 to-orange-50 ring-1 ring-brand-100 shadow-card">
                <Image
                  src="/media/team/founders.jpg"
                  alt="Founders of Green Raise Agro"
                  fill
                  sizes="(max-width: 1024px) 100vw, 560px"
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 hidden rounded-2xl bg-white p-5 shadow-card ring-1 ring-brand-100 md:block">
                <div className="font-display text-3xl font-extrabold text-orange-600">
                  {site.stats.farmers}
                </div>
                <div className="text-xs text-brand-700">Farmers served</div>
              </div>
            </div>
            <div>
              <span className="eyebrow">Why we exist</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl">
                Built by agri-experts. Trusted by farmers.
              </h2>
              <p className="mt-5 text-brand-900/80">
                Green Raise Agro was born from a simple belief: Indian farmers deserve
                world-class inputs that improve yield <em>and</em> soil health at the same
                time. Over-reliance on chemical fertilizers has exhausted our fields, raised
                costs, and pushed margins down.
              </p>
              <p className="mt-4 text-brand-900/80">
                Rise Pancharatna is our answer. A broad-spectrum organic growth promoter
                that combines six nature-derived bio-actives to strengthen roots, boost
                flowering, improve fruit quality, and bring back that healthy green &ldquo;kalokhi&rdquo;
                every farmer wants to see in their field.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <CounterStat value={1200} suffix="+" label="Active farmers" />
                <CounterStat value={30} suffix="%" label="Avg. yield gain" />
                <CounterStat value={10} suffix="+" label="States served" />
                <CounterStat value={site.stats.rating} decimals={1} suffix="★" label="Farmer rating" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-b from-white to-brand-50/40">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow-orange">What we stand for</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl md:text-5xl">
              Four values, no compromises
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Leaf, title: "100% Organic", text: "Every bottle is chemical-free, residue-free, and safe for the whole family." },
              { icon: Users, title: "Farmer-First", text: "Every decision is judged by one question — does this help the farmer?" },
              { icon: Target, title: "Proven Results", text: "We run field trials across crops and climates before we ship a single bottle." },
              { icon: Sparkles, title: "Transparent", text: "The composition on our label is exactly what's inside. No hidden fillers." },
            ].map(({ icon: Icon, title, text }) => (
              <div key={title} className="card p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 text-white shadow-soft">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-brand-950">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-900/70">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-px">
          <div className="mx-auto max-w-2xl text-center">
            <span className="eyebrow">Leadership</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-brand-950 sm:text-4xl md:text-5xl">
              The people behind Pancharatna
            </h2>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <TeamCard
              src="/media/team/director-ajay-jadhav.jpg"
              name="Ajay Jadhav"
              role="Director"
              bio="Agri-entrepreneur with decades of experience building sustainable input networks for Indian farmers."
              featured
            />
            <TeamCard
              src="/media/team/staff-1.jpg"
              name="Our Agri-Advisory Team"
              role="Field Experts"
              bio="On-ground agronomists who train farmers, run field trials, and solve crop-level problems in real time."
            />
            <TeamCard
              src="/media/team/staff-2.jpg"
              name="Distribution & Support"
              role="Customer Success"
              bio="The team that makes sure Pancharatna reaches your village on time — and that every farmer gets expert help."
            />
          </div>
        </div>
      </section>

      <section className="section bg-gradient-to-br from-brand-900 to-brand-950 text-white">
        <div className="container-px">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-orange-300 ring-1 ring-white/10">
                Now direct-to-farmer
              </span>
              <h2 className="mt-5 font-display text-3xl font-extrabold sm:text-4xl md:text-5xl">
                From trusted distributor<br />to your doorstep.
              </h2>
              <p className="mt-6 text-brand-200">
                For years, Rise Pancharatna has reached farms through our distributor
                network across India. Now we&apos;re bringing it directly to you — skip the
                middlemen, get fresh stock delivered, and get free advice from our
                agri-experts whenever you need it.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                {[
                  { icon: Award, label: "FCO Certified" },
                  { icon: HeartHandshake, label: "Direct support" },
                  { icon: Leaf, label: "100% Organic" },
                  { icon: Target, label: "Proven on farms" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 rounded-xl bg-white/5 p-3 ring-1 ring-white/10"
                  >
                    <Icon className="h-5 w-5 text-orange-400" />
                    <span className="text-sm font-medium">{label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl ring-1 ring-white/10">
                <Image
                  src="/media/brochure/brochure.jpg"
                  alt="Nourishing the Green — brochure"
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />
    </>
  );
}

function CounterStat({
  value,
  suffix,
  decimals,
  label,
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div className="card p-4 text-center transition hover:-translate-y-0.5 hover:shadow-card">
      <div className="font-display text-2xl font-extrabold text-brand-600 sm:text-3xl">
        <AnimatedCounter value={value} suffix={suffix} decimals={decimals ?? 0} />
      </div>
      <div className="mt-0.5 text-[11px] text-brand-700/70">{label}</div>
    </div>
  );
}

function TeamCard({
  src,
  name,
  role,
  bio,
  featured = false,
}: {
  src: string;
  name: string;
  role: string;
  bio: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`group overflow-hidden rounded-3xl bg-white shadow-soft ring-1 ring-brand-100 transition hover:-translate-y-1 hover:shadow-card ${
        featured ? "md:col-span-1" : ""
      }`}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={src}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950/70 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-orange-300">
            {role}
          </div>
          <div className="font-display text-xl font-bold">{name}</div>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-relaxed text-brand-900/70">{bio}</p>
      </div>
    </div>
  );
}
