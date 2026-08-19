"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  gold?: boolean;
  motionProps?: HTMLMotionProps<"div">;
}

export default function GlassPanel({ children, className = "", gold = false, motionProps }: GlassPanelProps) {
  return (
    <motion.div
      className={`relative overflow-hidden rounded-3xl backdrop-blur-xl ${
        gold
          ? "bg-[rgba(197,160,89,0.07)] border border-[rgba(197,160,89,0.2)]"
          : "bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.09)]"
      } ${className}`}
      {...motionProps}
    >
      <div className="pointer-events-none absolute -top-32 -left-32 w-64 h-64 rounded-full bg-white/[0.03] blur-3xl" />
      {children}
    </motion.div>
  );
}
