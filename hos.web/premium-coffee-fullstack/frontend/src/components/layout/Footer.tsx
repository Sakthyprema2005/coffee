"use client";

import Link from "next/link";
import { Coffee, Instagram, Twitter, Youtube, ArrowUp, Mail, MapPin, Phone } from "lucide-react";

const sections = [
  { heading: "Menu", items: ["Signature Blends", "Single Origins", "Cold Brew Bar", "Seasonal Specials", "Pairing Menu"] },
  { heading: "Visit", items: ["Our Story", "Roastery Tours", "Barista Training", "Events & Tastings", "Gift Cards"] },
  { heading: "Connect", items: ["Wholesale Inquiry", "Press & Media", "Careers", "Sustainability", "Contact Us"] },
];

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative bg-[#040201] border-t border-white/[0.07] overflow-hidden">
      {/* Top gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-1 bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-full bg-[var(--gold)]/15 border border-[var(--gold)]/35 flex items-center justify-center text-[var(--gold)]">
                <Coffee className="w-5 h-5" />
              </div>
              <span className="text-2xl font-heading font-bold text-white tracking-wide">
                Lumina <span className="italic font-light text-[var(--gold)]">Café</span>
              </span>
            </div>
            <p className="text-gray-500 text-sm font-light leading-relaxed max-w-xs mb-7">
              A sanctuary for those who believe a great cup of coffee is not just a drink — it is a moment, a memory, a ritual.
            </p>

            <div className="flex flex-col gap-3 text-sm text-gray-500 mb-8">
              <div className="flex items-start gap-3"><MapPin className="w-4 h-4 text-[var(--gold)] mt-0.5 shrink-0" /><span>12 Crescent Lane, Banjara Hills, Hyderabad 500034</span></div>
              <div className="flex items-center gap-3"><Phone className="w-4 h-4 text-[var(--gold)] shrink-0" /><a href="tel:+914023456789" className="hover:text-white transition-colors">+91 40 2345 6789</a></div>
              <div className="flex items-center gap-3"><Mail className="w-4 h-4 text-[var(--gold)] shrink-0" /><a href="mailto:hello@luminacafe.in" className="hover:text-white transition-colors">hello@luminacafe.in</a></div>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Youtube, href: "#", label: "YouTube" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.09] flex items-center justify-center text-gray-500 hover:text-[var(--gold)] hover:border-[var(--gold)]/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav Columns */}
          {sections.map((sec) => (
            <div key={sec.heading}>
              <h4 className="text-[10px] uppercase tracking-[0.3em] text-gray-600 font-semibold mb-5">{sec.heading}</h4>
              <ul className="flex flex-col gap-3">
                {sec.items.map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-gray-500 hover:text-white text-sm font-light transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-white/[0.06]">
          <p className="text-gray-600 text-[11px] uppercase tracking-widest">
            © {new Date().getFullYear()} Lumina Café. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-[11px] uppercase tracking-widest text-gray-600">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <button onClick={scrollTop} className="w-9 h-9 rounded-full bg-[var(--gold)]/10 border border-[var(--gold)]/25 flex items-center justify-center text-[var(--gold)] hover:bg-[var(--gold)]/20 transition-all" aria-label="Back to top">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
