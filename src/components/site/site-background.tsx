"use client";

import { useEffect, useRef } from "react";
import { SkyLayer } from "@/components/ui/sky-layer";

/**
 * Fixed dot-grid backdrop with three motion layers:
 *  - a pointer-following spotlight that warms the dots near the cursor
 *  - a slow scroll parallax (the grid drifts at ~6% of scroll speed)
 *  - a rare brass comet that streaks across the sky at random moments
 * All are skipped for touch devices / reduced motion as appropriate.
 */
export function SiteBackground() {
  const gridRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const cometRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    const spot = spotRef.current;
    if (!grid || !spot) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    let raf = 0;
    let px = -300;
    let py = -300;

    const apply = () => {
      const offset = -window.scrollY * 0.06;
      // Fine grid and brass specks drift at different rates for depth;
      // the spotlight layer mirrors the fine grid so its dots line up.
      grid.style.backgroundPosition = `0px ${offset}px, 31px ${47 + offset * 1.6}px`;
      spot.style.backgroundPosition = `0px ${offset}px`;
      spot.style.setProperty("--spot-x", `${px}px`);
      spot.style.setProperty("--spot-y", `${py}px`);
      raf = 0;
    };

    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onScroll = () => {
      if (!reduced) schedule();
    };

    const onMove = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      spot.style.opacity = "1";
      schedule();
    };
    const onLeave = () => {
      spot.style.opacity = "0";
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (!coarse && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    // ── Rare brass comet: one streak every ~10–24s, random path ──
    const comet = cometRef.current;
    let cometTimer = 0;
    let launchHandler: (() => void) | null = null;
    if (comet && !reduced) {
      const launch = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // Start in the upper band, travel down-and-across
        const fromX = Math.random() * w * 0.7;
        const fromY = Math.random() * h * 0.35;
        const angle = 18 + Math.random() * 20; // degrees below horizontal
        const dist = w * (0.35 + Math.random() * 0.3);
        const rad = (angle * Math.PI) / 180;
        const toX = fromX + Math.cos(rad) * dist;
        const toY = fromY + Math.sin(rad) * dist;
        comet.style.transform = `rotate(${angle}deg)`;
        comet.animate(
          [
            { left: `${fromX}px`, top: `${fromY}px`, opacity: 0 },
            { opacity: 0.9, offset: 0.15 },
            { opacity: 0.9, offset: 0.75 },
            { left: `${toX}px`, top: `${toY}px`, opacity: 0 },
          ],
          { duration: 1300, easing: "cubic-bezier(0.2, 0.6, 0.4, 1)" },
        );
        cometTimer = window.setTimeout(launch, 10000 + Math.random() * 14000);
      };
      cometTimer = window.setTimeout(launch, 5000 + Math.random() * 6000);
      // Easter egg: clicking the nav wordmark launches one on demand
      launchHandler = launch;
      window.addEventListener("launch-comet", launchHandler);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
      if (cometTimer) window.clearTimeout(cometTimer);
      if (launchHandler)
        window.removeEventListener("launch-comet", launchHandler);
    };
  }, []);

  return (
    <>
      <div className="site-glow" aria-hidden="true" />
      <div ref={gridRef} className="site-grid" aria-hidden="true" />
      <div ref={spotRef} className="site-grid-spot" aria-hidden="true" />
      <div ref={cometRef} className="site-comet" aria-hidden="true" />
      <SkyLayer />
    </>
  );
}
