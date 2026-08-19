"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Coffee, Sparkles, Volume2, VolumeX, ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SteamEffect from "@/components/ui/SteamEffect";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [muted, setMuted] = useState(true);
  const mouseX = useRef(0);
  const mouseY = useRef(0);
  const parallaxRef = useRef<HTMLDivElement>(null);

  // Mouse parallax
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 25;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 15;
      if (parallaxRef.current) {
        gsap.to(parallaxRef.current, { x: mouseX.current, y: mouseY.current, duration: 1.2, ease: "power2.out" });
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  // GSAP scroll effects
  useEffect(() => {
    if (!sectionRef.current || !videoRef.current || !textRef.current) return;

    const ctx = gsap.context(() => {
      // Video parallax zoom
      gsap.to(videoRef.current, {
        scale: 1.25,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Text fade out on scroll
      gsap.to(textRef.current, {
        y: -80,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "70% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  return (
    <section ref={sectionRef} id="home" className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-[#060302]">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-50"
          style={{ transformOrigin: "center center" }}
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-coffee-being-poured-into-a-cup-4053-large.mp4" type="video/mp4" />
        </video>

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#060302] via-[rgba(6,3,2,0.5)] to-[rgba(6,3,2,0.7)]" />
        <div className="absolute inset-0 vignette" />

        {/* Gold ambient glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[500px] bg-[var(--gold)]/8 rounded-full blur-[140px]" style={{ animation: "float 8s ease-in-out infinite" }} />
        </div>
      </div>

      {/* Steam overlay */}
      <SteamEffect />

      {/* Video Controls */}
      <div className="absolute top-6 right-6 z-30">
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={toggleMute}
          className="w-10 h-10 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all"
          aria-label="Toggle sound"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>
      </div>

      {/* Main Content */}
      <div ref={textRef} className="relative z-20 flex flex-col items-center justify-center flex-1 text-center px-6 pt-36 pb-20">
        <div ref={parallaxRef}>
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-[rgba(197,160,89,0.12)] border border-[rgba(197,160,89,0.3)] text-[var(--gold)] text-[10px] font-semibold uppercase tracking-[0.3em]"
          >
            <Sparkles className="w-3.5 h-3.5" style={{ animation: "float 4s ease-in-out infinite" }} />
            Artisanal Micro-Lot Coffee
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl xl:text-[105px] font-heading font-black leading-[1.03] tracking-tight mb-8 max-w-[900px] mx-auto"
          >
            Crafted With{" "}
            <span className="italic text-gradient-gold">Passion.</span>
            <br />
            <span className="font-light italic text-white/90">Brewed To Perfection.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 1, ease: "easeOut" }}
            className="text-gray-400 text-base sm:text-lg md:text-xl max-w-xl mx-auto font-light leading-relaxed mb-12"
          >
            World-class single-origin beans, hand-roasted by master baristas. Every sip is a ceremony.
          </motion.p>

          {/* CTA Group */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href="#menu"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold)] to-[var(--gold-dark)] text-black font-bold uppercase tracking-[0.18em] text-[11px] px-9 py-4.5 rounded-full shadow-2xl shadow-[var(--gold)]/25 group"
            >
              <Coffee className="w-4 h-4" />
              Explore Signatures
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.a>

            <motion.a
              href="#reserve"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-white/[0.07] backdrop-blur-xl border border-white/15 text-white font-semibold uppercase tracking-[0.18em] text-[11px] px-9 py-4.5 rounded-full hover:bg-white/[0.13] transition-all"
            >
              Reserve Experience
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar – Stats + Scroll Prompt */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="relative z-20 border-t border-white/[0.07] px-6 sm:px-12 py-6 flex flex-col sm:flex-row justify-between items-center gap-6 max-w-7xl mx-auto w-full"
      >
        <div className="flex items-center gap-12">
          {[
            { val: "100%", label: "Single-Origin" },
            { val: "88+", label: "Cupping Score" },
            { val: "18h", label: "Slow Drip" },
          ].map((s, i) => (
            <div key={i}>
              <div className="text-2xl sm:text-3xl font-heading font-black text-[var(--gold)] leading-none">{s.val}</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-gray-500 mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <a href="#features" className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-gray-500 hover:text-[var(--gold)] transition-colors group">
          Scroll
          <ChevronDown className="w-4 h-4 text-[var(--gold)]" style={{ animation: "float 2s ease-in-out infinite" }} />
        </a>
      </motion.div>
    </section>
  );
}
