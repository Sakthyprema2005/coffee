"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const milestones = [
  {
    year: "2012",
    title: "First Micro-Lot Import",
    desc: "Established direct relations with smallholder farmers in Huila, Colombia."
  },
  {
    year: "2017",
    title: "World Barista Championship",
    desc: "Awarded gold for innovative cold extraction technique in Milan."
  },
  {
    year: "2024",
    title: "Zero Carbon Roastery",
    desc: "100% solar powered roastery with eco-conscious closed-loop roasting."
  }
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      ".story-content",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );

    gsap.fromTo(
      imgRef.current,
      { opacity: 0, scale: 0.9 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 65%",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-32 relative bg-[#050201] text-white overflow-hidden border-t border-white/5"
    >
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Story Narrative */}
          <div className="lg:col-span-6 story-content">
            <span className="text-[var(--gold)] text-xs font-semibold uppercase tracking-[0.3em] block mb-3">
              Heritage & Craft
            </span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight mb-8">
              A Decade of <br />
              <span className="text-[var(--gold)] italic">Uncompromising Quality</span>
            </h2>
            <p className="text-gray-300 text-lg font-light leading-relaxed mb-8">
              Lumina was born out of a single obsession: to transform coffee from a routine morning caffeine fix into an extraordinary sensory journey. From cloud forests to your cup, every bean tells a story of terroir and dedication.
            </p>

            {/* Timeline Milestones */}
            <div className="space-y-6 mb-12">
              {milestones.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-[var(--gold)]/30 transition-all"
                >
                  <span className="text-2xl font-heading font-bold text-[var(--gold)]">
                    {item.year}
                  </span>
                  <div>
                    <h4 className="font-heading font-bold text-white text-lg">
                      {item.title}
                    </h4>
                    <p className="text-gray-400 text-sm font-light mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-8 pt-4 border-t border-white/10">
              <div>
                <span className="text-4xl font-heading font-extrabold text-[var(--gold)]">15+</span>
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Awards Won</p>
              </div>
              <div className="h-10 w-[1px] bg-white/10" />
              <div>
                <span className="text-4xl font-heading font-extrabold text-[var(--gold)]">100%</span>
                <p className="text-xs uppercase tracking-widest text-gray-400 mt-1">Organic Micro-Lots</p>
              </div>
            </div>
          </div>

          {/* Luxury Image Showcase */}
          <div className="lg:col-span-6 relative" ref={imgRef}>
            <div className="relative rounded-3xl overflow-hidden border border-white/15 p-3 glass-panel">
              <img
                src="https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=1000&auto=format&fit=crop"
                alt="Master Barista pouring espresso"
                className="w-full h-[520px] object-cover rounded-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              {/* Floating Glass Badge */}
              <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl border border-white/20 flex items-center justify-between">
                <div>
                  <h5 className="font-heading text-xl font-bold text-white">
                    Master Pour-Over Session
                  </h5>
                  <p className="text-xs text-gray-300 font-light mt-1">
                    Daily live extraction demos at 11 AM & 4 PM
                  </p>
                </div>
                <CheckCircle2 className="w-8 h-8 text-[var(--gold)] flex-shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
