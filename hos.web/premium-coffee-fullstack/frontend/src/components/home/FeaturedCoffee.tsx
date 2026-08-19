"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Star, ShoppingBag } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamEffect from "@/components/ui/SteamEffect";

gsap.registerPlugin(ScrollTrigger);

const coffees = [
  {
    id: "01",
    name: "Lumina Signature",
    origin: "Colombia · Huila",
    altitude: "1,850m",
    roast: "Light-Medium",
    notes: ["Jasmine", "Caramel", "Stone Fruit"],
    score: 92,
    price: "₹420 / cup",
    img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=700&auto=format&fit=crop&q=85",
    bg: "#1a0f03",
  },
  {
    id: "02",
    name: "Ethiopian Midnight",
    origin: "Ethiopia · Yirgacheffe",
    altitude: "2,200m",
    roast: "Light",
    notes: ["Blueberry", "Dark Chocolate", "Bergamot"],
    score: 94,
    price: "₹480 / cup",
    img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=700&auto=format&fit=crop&q=85",
    bg: "#0d0508",
  },
  {
    id: "03",
    name: "Sumatra Eclipse",
    origin: "Indonesia · Mandheling",
    altitude: "1,500m",
    roast: "Dark",
    notes: ["Dark Caramel", "Cedar", "Earthy"],
    score: 89,
    price: "₹390 / cup",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=700&auto=format&fit=crop&q=85",
    bg: "#100804",
  },
];

export default function FeaturedCoffee() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  const next = () => setActive((p) => (p + 1) % coffees.length);
  const prev = () => setActive((p) => (p - 1 + coffees.length) % coffees.length);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".coffee-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const c = coffees[active];

  return (
    <section ref={sectionRef} id="menu" className="relative py-32 border-t border-white/[0.05] overflow-hidden" style={{ background: c.bg, transition: "background 0.7s ease" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-[#060302] via-transparent to-[#060302] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--gold)]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="coffee-reveal flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.35em] block mb-4">Signature Menu</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold">
              Our <span className="italic text-gradient-gold">Finest</span> Coffees
            </h2>
          </div>
          <div className="flex gap-3">
            <button onClick={prev} className="w-12 h-12 rounded-full border border-white/15 text-white hover:border-[var(--gold)] hover:text-[var(--gold)] transition-all flex items-center justify-center">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <button onClick={next} className="w-12 h-12 rounded-full bg-[var(--gold)] text-black hover:bg-[var(--gold-light)] transition-all flex items-center justify-center shadow-lg shadow-[var(--gold)]/25">
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Coffee Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={c.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
          >
            {/* Left – Image */}
            <div className="relative h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-white/[0.08]">
              <img src={c.img} alt={c.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <SteamEffect />

              {/* Score badge */}
              <div className="absolute top-6 right-6 w-16 h-16 rounded-full bg-[rgba(197,160,89,0.15)] border border-[var(--gold)]/40 backdrop-blur-md flex flex-col items-center justify-center">
                <span className="text-[var(--gold)] text-lg font-black font-heading leading-none">{c.score}</span>
                <span className="text-[7px] text-gray-400 uppercase tracking-wider">Score</span>
              </div>

              {/* Bottom overlay info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/[0.07] backdrop-blur-md bg-black/40">
                <div className="text-gray-400 text-[10px] uppercase tracking-widest mb-1">{c.origin}</div>
                <div className="text-white font-heading text-2xl font-bold">{c.name}</div>
              </div>
            </div>

            {/* Right – Details */}
            <div>
              <div className="flex gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[var(--gold)] text-[var(--gold)]" />
                ))}
                <span className="text-gray-500 text-xs ml-2 self-center">({c.score} cupping score)</span>
              </div>

              <h3 className="font-heading text-4xl sm:text-5xl font-black text-white mb-2">{c.name}</h3>
              <p className="text-[var(--gold)] text-sm uppercase tracking-widest font-medium mb-8">{c.origin} · {c.altitude}</p>

              {/* Flavor Notes */}
              <div className="mb-8">
                <div className="text-[9px] uppercase tracking-widest text-gray-600 mb-3">Flavor Profile</div>
                <div className="flex flex-wrap gap-2">
                  {c.notes.map((note) => (
                    <span key={note} className="px-4 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-sm text-white/80 backdrop-blur-sm">
                      {note}
                    </span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-10">
                {[{ label: "Altitude", val: c.altitude }, { label: "Roast Level", val: c.roast }].map((d) => (
                  <div key={d.label} className="rounded-2xl bg-white/[0.04] border border-white/[0.07] p-4">
                    <div className="text-[9px] uppercase tracking-widest text-gray-600 mb-1">{d.label}</div>
                    <div className="text-white font-semibold font-heading">{d.val}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-6">
                <div>
                  <div className="text-[9px] uppercase tracking-widest text-gray-600 mb-0.5">Starting From</div>
                  <div className="text-3xl font-heading font-black text-[var(--gold)]">{c.price}</div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold)] to-[var(--gold-dark)] text-black font-bold uppercase tracking-widest text-[11px] px-7 py-4 rounded-full shadow-xl shadow-[var(--gold)]/20"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Order Now
                </motion.button>
              </div>

              {/* Progress dots */}
              <div className="flex gap-2 mt-10">
                {coffees.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`rounded-full transition-all duration-300 ${i === active ? "w-8 h-2 bg-[var(--gold)]" : "w-2 h-2 bg-white/20"}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
