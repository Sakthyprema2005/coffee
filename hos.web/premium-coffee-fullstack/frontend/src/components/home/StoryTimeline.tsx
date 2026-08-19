"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "Select & Source",
    desc: "We travel to high-altitude micro-lots in Colombia, Ethiopia, and Sumatra, hand-selecting only the finest 3% of each harvest.",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=600&auto=format&fit=crop&q=80",
    label: "Origin · Farm",
  },
  {
    num: "02",
    title: "Hand Roast",
    desc: "Each batch is micro-roasted in our solar-powered roastery at dawn, ensuring peak aroma and flavor clarity in every bean.",
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    label: "Roastery · Daily",
  },
  {
    num: "03",
    title: "Precision Brew",
    desc: "Our baristas calibrate grind, temperature, and extraction time for each origin's unique flavor profile, every single pour.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80",
    label: "Bar · Precision",
  },
  {
    num: "04",
    title: "Savor & Experience",
    desc: "From porcelain to palate — a ceremony designed to engage all your senses in our immersive flagship café.",
    img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80",
    label: "Cup · Ceremony",
  },
];

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".timeline-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
              end: "bottom 20%",
            },
          }
        );
      });

      // Animated line
      gsap.fromTo(
        ".timeline-line",
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="relative py-32 overflow-hidden bg-[#060302] border-t border-white/[0.05]">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[var(--gold)]/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="text-center mb-24">
          <span className="text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.35em] block mb-4">
            From Farm to Cup
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight">
            The Art of <span className="text-gradient-gold italic">Our Process</span>
          </h2>
        </div>

        {/* Connecting timeline line */}
        <div className="hidden lg:block relative mb-0">
          <div className="timeline-line absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)]/30 to-transparent mx-16" />
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <div
              key={i}
              className="timeline-card group relative rounded-3xl overflow-hidden border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm hover:border-[var(--gold)]/30 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={step.img}
                  alt={step.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#060302] via-transparent to-transparent" />

                {/* Step Number */}
                <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-[rgba(197,160,89,0.15)] border border-[var(--gold)]/40 flex items-center justify-center">
                  <span className="text-[var(--gold)] text-[10px] font-black">{step.num}</span>
                </div>

                {/* Label pill */}
                <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                  <span className="text-[9px] text-gray-300 uppercase tracking-widest">{step.label}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-[var(--gold)] transition-colors">{step.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{step.desc}</p>
              </div>

              {/* Bottom hover accent */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
