"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: "Lumina doesn't just serve coffee — it delivers an experience. The Ethiopian blend transported me. I could close my eyes and almost smell the blossoms on the farm.",
    author: "Mira Nair",
    role: "Food & Travel Writer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    text: "I've visited specialty cafés across Tokyo, Milan, and New York. Lumina stands shoulder to shoulder with the very best — the craft, the atmosphere, and the warmth are unparalleled.",
    author: "Arjun Mehta",
    role: "Specialty Coffee Enthusiast",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    text: "Their Sumatra Eclipse at 6am is my daily ritual. Rich, earthy, grounding — it's the anchor of my mornings. The team knows my order before I reach the counter.",
    author: "Priya Kapoor",
    role: "Architect & Design Curator",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testimonials-reveal",
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 78%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const prev = () => setActive((p) => (p - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((p) => (p + 1) % testimonials.length);

  const t = testimonials[active];

  return (
    <section ref={sectionRef} id="testimonials" className="relative py-32 bg-[#070302] border-t border-white/[0.05] overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold)]/[0.04] via-transparent to-transparent pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-[var(--gold)]/[0.04] blur-[120px] pointer-events-none rounded-full" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10">
        <div className="testimonials-reveal text-center mb-16">
          <span className="text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.35em] block mb-4">Our Community</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold">
            Words from Our <span className="italic text-gradient-gold">Patrons</span>
          </h2>
        </div>

        <div className="testimonials-reveal relative rounded-3xl bg-white/[0.03] border border-white/[0.08] p-10 md:p-16">
          {/* Quote Icon */}
          <Quote className="w-12 h-12 text-[var(--gold)]/25 mb-8 mx-auto" />

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45 }}
              className="text-center"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
              </div>

              <p className="text-gray-200 text-xl sm:text-2xl font-light leading-relaxed italic max-w-3xl mx-auto mb-12">
                "{t.text}"
              </p>

              <div className="flex flex-col items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.author}
                  className="w-14 h-14 rounded-full object-cover ring-2 ring-[var(--gold)]/30"
                />
                <div className="text-center">
                  <div className="text-white font-heading font-semibold text-lg">{t.author}</div>
                  <div className="text-gray-500 text-xs uppercase tracking-widest mt-0.5">{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-12">
            <button onClick={prev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`rounded-full transition-all duration-300 ${i === active ? "w-8 h-2 bg-[var(--gold)]" : "w-2 h-2 bg-white/20"}`}
                />
              ))}
            </div>

            <button onClick={next} className="w-10 h-10 rounded-full bg-[var(--gold)] flex items-center justify-center text-black hover:bg-[var(--gold-light)] transition-all">
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
