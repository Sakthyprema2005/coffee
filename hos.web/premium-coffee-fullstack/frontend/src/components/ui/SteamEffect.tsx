"use client";

export default function SteamEffect({ className = "" }: { className?: string }) {
  const steamLines = [
    { left: "42%", height: "60px", delay: "0s", duration: "3.8s", width: "2px" },
    { left: "48%", height: "80px", delay: "0.8s", duration: "4.5s", width: "3px" },
    { left: "54%", height: "50px", delay: "1.6s", duration: "3.2s", width: "2px" },
    { left: "38%", height: "45px", delay: "2.2s", duration: "4.0s", width: "1.5px" },
    { left: "60%", height: "55px", delay: "0.4s", duration: "3.6s", width: "2px" },
  ];

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {steamLines.map((s, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            bottom: "30%",
            left: s.left,
            width: s.width,
            height: s.height,
            background: "linear-gradient(to top, rgba(255,255,255,0.6), rgba(255,255,255,0.15), transparent)",
            borderRadius: "9999px",
            filter: "blur(2px)",
            animation: `steam ${s.duration} ease-in-out ${s.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
