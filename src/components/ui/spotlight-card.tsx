"use client";

import { useRef, useState, useCallback, useEffect, ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
};

export function SpotlightCard({ children, className = "" }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState({ x: 0, y: 0, visible: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const handleMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  }, []);

  const handleLeave = useCallback(() => {
    setSpot((s) => ({ ...s, visible: false }));
  }, []);

  // On mobile, skip the spotlight effect entirely — no extra DOM, no listeners
  if (isMobile) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {/* Mouse-tracking spotlight */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(600px circle at ${spot.x}px ${spot.y}px, rgba(76, 110, 245, 0.06), transparent 40%)`,
        }}
      />
      {/* Spotlight border glow */}
      <div
        className="pointer-events-none absolute -inset-px z-0 rounded-[inherit] transition-opacity duration-500"
        style={{
          opacity: spot.visible ? 1 : 0,
          background: `radial-gradient(300px circle at ${spot.x}px ${spot.y}px, rgba(76, 110, 245, 0.12), transparent 40%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
