"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisible = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { opacity: 0 });

    const onMove = (e: MouseEvent) => {
      if (!isVisible.current) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
        isVisible.current = true;
      }
      gsap.to(dot, { x: e.clientX - 4, y: e.clientY - 4, duration: 0.08 });
      gsap.to(ring, { x: e.clientX - 18, y: e.clientY - 18, duration: 0.3, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
      isVisible.current = false;
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('a, button, input, select, textarea, [data-cursor="pointer"]');
      if (isInteractive) {
        gsap.to(ring, { scale: 1.8, borderColor: "rgba(197,160,89,0.8)", background: "rgba(197,160,89,0.08)", duration: 0.25 });
        gsap.to(dot, { scale: 0.5, background: "var(--gold)", duration: 0.25 });
      } else {
        gsap.to(ring, { scale: 1, borderColor: "rgba(255,255,255,0.3)", background: "transparent", duration: 0.25 });
        gsap.to(dot, { scale: 1, background: "var(--gold)", duration: 0.25 });
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden lg:block">
      <div
        ref={dotRef}
        style={{ position: "fixed", top: 0, left: 0, width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", willChange: "transform" }}
      />
      <div
        ref={ringRef}
        style={{ position: "fixed", top: 0, left: 0, width: 36, height: 36, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.3)", willChange: "transform", backdropFilter: "blur(1px)" }}
      />
    </div>
  );
}
