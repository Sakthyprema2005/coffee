"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  {
    src: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=800&auto=format&fit=crop&q=80",
    label: "The Pour",
    span: "col-span-2 row-span-2",
    aspect: "aspect-square",
  },
  {
    src: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    label: "Single Origin",
    span: "",
    aspect: "aspect-video",
  },
  {
    src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&auto=format&fit=crop&q=80",
    label: "Morning Ritual",
    span: "",
    aspect: "aspect-video",
  },
  {
    src: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80",
    label: "Artisanal",
    span: "col-span-2",
    aspect: "aspect-[16/7]",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray<HTMLElement>(".gallery-item");
      gsap.fromTo(
        items,
        { opacity: 0, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="relative py-32 bg-[#060302] border-t border-white/[0.05] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[var(--gold)]/[0.02] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        <div className="text-center mb-16">
          <span className="text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.35em] block mb-4">Our Atmosphere</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold">
            A World of <span className="italic text-gradient-gold">Coffee</span>
          </h2>
        </div>

        {/* Masonry grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((img, i) => (
            <div
              key={i}
              className={`gallery-item relative overflow-hidden rounded-3xl border border-white/[0.07] cursor-pointer ${img.span} ${img.aspect}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                src={img.src}
                alt={img.label}
                className="w-full h-full object-cover transition-transform duration-700"
                style={{ transform: hovered === i ? "scale(1.1)" : "scale(1)" }}
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent transition-opacity duration-300"
                style={{ opacity: hovered === i ? 1 : 0.4 }}
              />

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: hovered === i ? 1 : 0, y: hovered === i ? 0 : 10 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 right-0 p-5"
              >
                <span className="text-[9px] uppercase tracking-widest text-[var(--gold)] block mb-0.5">{`0${i + 1}`}</span>
                <span className="text-white font-heading text-xl font-bold">{img.label}</span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
