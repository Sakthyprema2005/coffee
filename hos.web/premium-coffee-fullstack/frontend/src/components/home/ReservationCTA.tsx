"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Users, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ReservationCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", date: "", time: "", guests: "2" });

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".reserve-reveal",
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 75%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section ref={sectionRef} id="reserve" className="relative py-32 overflow-hidden bg-[#060302] border-t border-white/[0.05]">
      {/* BG layers */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=1600&auto=format&fit=crop&q=70')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#060302] via-[rgba(6,3,2,0.85)] to-[#060302]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[var(--gold)]/[0.07] rounded-full blur-[130px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Copy */}
          <div className="reserve-reveal">
            <span className="text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.35em] block mb-4">Private Reservation</span>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold leading-tight mb-6">
              Reserve Your <span className="italic text-gradient-gold">Perfect Moment</span>
            </h2>
            <p className="text-gray-400 text-base font-light leading-relaxed mb-10 max-w-md">
              Every table at Lumina is a curated stage. From intimate tête-à-têtes to private tastings — let us craft an experience tailored entirely to you.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { icon: Calendar, label: "Open Every Day", sub: "7:00 AM – 11:00 PM" },
                { icon: Clock, label: "Reservation Duration", sub: "90 min per session" },
                { icon: Users, label: "Private Events", sub: "Up to 40 guests" },
              ].map(({ icon: Icon, label, sub }, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[var(--gold)]/20 transition-all">
                  <div className="w-10 h-10 rounded-xl bg-[var(--gold)]/10 border border-[var(--gold)]/25 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-[var(--gold)]" />
                  </div>
                  <div>
                    <div className="text-white text-sm font-semibold">{label}</div>
                    <div className="text-gray-500 text-xs">{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Form */}
          <div className="reserve-reveal">
            <div className="relative rounded-3xl p-8 md:p-10 bg-white/[0.04] backdrop-blur-xl border border-white/[0.1]">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--gold)]/[0.06] to-transparent pointer-events-none" />

              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="font-heading text-3xl font-bold text-white mb-2">Reservation Received</h3>
                  <p className="text-gray-400">We'll confirm your table via email within minutes, {form.name}.</p>
                </motion.div>
              ) : (
                <>
                  <h3 className="font-heading text-2xl font-bold text-white mb-8 relative z-10">Book a Table</h3>
                  <form onSubmit={onSubmit} className="relative z-10 flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        name="name"
                        value={form.name}
                        onChange={handle}
                        required
                        placeholder="Full Name"
                        className="w-full bg-white/[0.05] border border-white/[0.1] text-white placeholder-gray-600 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-[var(--gold)]/50 transition"
                      />
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handle}
                        required
                        placeholder="Email Address"
                        className="w-full bg-white/[0.05] border border-white/[0.1] text-white placeholder-gray-600 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-[var(--gold)]/50 transition"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handle}
                        required
                        className="w-full bg-white/[0.05] border border-white/[0.1] text-gray-300 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-[var(--gold)]/50 transition [color-scheme:dark]"
                      />
                      <input
                        name="time"
                        type="time"
                        value={form.time}
                        onChange={handle}
                        required
                        className="w-full bg-white/[0.05] border border-white/[0.1] text-gray-300 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-[var(--gold)]/50 transition [color-scheme:dark]"
                      />
                    </div>

                    <select
                      name="guests"
                      value={form.guests}
                      onChange={handle}
                      className="w-full bg-white/[0.05] border border-white/[0.1] text-gray-300 rounded-xl px-5 py-3.5 text-sm outline-none focus:border-[var(--gold)]/50 transition [color-scheme:dark]"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? "Guest" : "Guests"}</option>
                      ))}
                    </select>

                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold)] to-[var(--gold-dark)] text-black font-black uppercase tracking-widest text-[12px] py-4 rounded-xl shadow-xl shadow-[var(--gold)]/25 mt-2"
                    >
                      Confirm Reservation
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>

                    <p className="text-gray-600 text-[10px] text-center">No card required · Free cancellation up to 2h before</p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
