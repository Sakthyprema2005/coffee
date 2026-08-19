"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimatedButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit";
}

export default function AnimatedButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: AnimatedButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-[0.2em] transition-all duration-300 overflow-hidden";

  const variants = {
    primary: "bg-gradient-to-r from-[var(--gold-light)] via-[var(--gold)] to-[var(--gold-dark)] text-black shadow-lg hover:shadow-[var(--gold)]/30",
    secondary: "bg-white/[0.07] backdrop-blur-xl border border-white/15 text-white hover:bg-white/[0.14] hover:border-white/25",
    ghost: "border border-[var(--gold)]/50 text-[var(--gold)] hover:bg-[var(--gold)] hover:text-black",
  };

  const content = (
    <motion.span
      className={`${base} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.04, y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.span>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return (
    <button type={type} onClick={onClick}>
      {content}
    </button>
  );
}
