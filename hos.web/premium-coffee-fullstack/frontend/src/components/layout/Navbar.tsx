"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Search, ShoppingBag, Menu, X } from "lucide-react";
import Lenis from "lenis";
import gsap from "gsap";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "Our Story" },
  { href: "#features", label: "Why Us" },
  { href: "#menu", label: "Menu" },
  { href: "#gallery", label: "Gallery" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#reserve", label: "Reserve" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartCount] = useState(2);
  const navRef = useRef<HTMLElement>(null);

  // Lenis smooth scroll (singleton at layout level)
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.4, smoothWheel: true, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  // Scroll shrink
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // GSAP entrance
  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(navRef.current, { y: -80, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 });
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[rgba(6,3,2,0.85)] backdrop-blur-2xl border-b border-white/[0.07] py-3 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-black/70 to-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/40 flex items-center justify-center text-[var(--gold)] group-hover:bg-[var(--gold)] group-hover:text-black transition-all duration-300"
            >
              <Coffee className="w-5 h-5" />
            </motion.div>
            <span className="text-2xl font-heading font-bold text-white tracking-wide">
              Lumina <span className="italic font-light text-[var(--gold)]">Café</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-xs uppercase tracking-[0.18em] font-medium text-gray-400 hover:text-white transition-colors duration-300 group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[var(--gold)] group-hover:w-full transition-all duration-300 rounded-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all" aria-label="Search">
              <Search className="w-[18px] h-[18px]" />
            </button>
            <button className="relative p-2.5 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-all" aria-label="Cart">
              <ShoppingBag className="w-[18px] h-[18px]" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[var(--gold)] text-[8px] font-bold text-black flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <motion.a
              href="#reserve"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black text-[10px] uppercase tracking-[0.2em] font-bold px-6 py-2.5 rounded-full shadow-lg shadow-[var(--gold)]/20 transition-all"
            >
              Book Table
            </motion.a>
            <button
              className="lg:hidden p-2.5 text-white hover:text-[var(--gold)] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[200] bg-[#060302] flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center text-white hover:text-[var(--gold)] border border-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <ul className="flex flex-col items-center gap-8 text-center">
              {links.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-4xl font-heading font-bold text-white hover:text-[var(--gold)] transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.a
              href="#reserve"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-14 bg-gradient-to-r from-[var(--gold)] to-[var(--gold-dark)] text-black font-bold uppercase tracking-widest text-xs px-10 py-4 rounded-full"
            >
              Book A Table
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
