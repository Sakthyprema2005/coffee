"use client";

import { useEffect, useRef } from "react";
import { Flame, ShieldCheck, Award, Sparkles, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Flame,
    num: "01",
    title: "Micro-Batch Roasting",
    desc: "Roasted in sub-5kg batches every morning, capturing volatile aroma compounds at their peak.",
  },
  {
    icon: ShieldCheck,
    num: "02",
    title: "Direct-Trade Ethics",
    desc: "Every bean is sourced directly from smallholder farmers, paying 3× fair trade premium rates.",
  },
  {
    icon: Award,
    num: "03",
    title: "World-Class Baristas",
    desc: "Our team includes three former World Barista Championship finalists calibrating every pour.",
  },
  {
    icon: Sparkles,
    num: "04",
    title: "Sensory Sanctuary",
    desc: "Acoustics, velvet seating, curated playlists, and lighting — all tuned to enhance taste.",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".why-card");
      gsap.fromTo(
        items,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="relative py-32 bg-[#070302] border-t border-white/[0.05] overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--gold)]/[0.04] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-20">
          <span className="text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.35em] block mb-4">Why Lumina</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight">
            The Standard We <span className="italic text-gradient-gold">Never Compromise</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base sm:text-lg font-light max-w-xl mx-auto">
            Every decision at Lumina is guided by obsession with the finest cup possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, num, title, desc }, i) => (
            <div
              key={i}
              className="why-card group relative rounded-3xl p-7 bg-white/[0.03] border border-white/[0.08] hover:border-[var(--gold)]/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-8">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/[0.1] flex items-center justify-center group-hover:bg-[var(--gold)]/10 group-hover:border-[var(--gold)]/30 transition-all duration-300">
                    <Icon className="w-6 h-6 text-[var(--gold)]" />
                  </div>
                  <span className="text-4xl font-black font-heading text-white/[0.06] group-hover:text-[var(--gold)]/20 transition-colors">{num}</span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[var(--gold)] transition-colors duration-300">{title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{desc}</p>

                <div className="flex items-center gap-2 mt-6 text-[var(--gold)] text-[10px] uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
