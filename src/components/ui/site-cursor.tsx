"use client";

import { useEffect, useRef } from "react";

/**
 * Cursor halo: the native pointer stays fully visible — this only adds a
 * brass ring that glides along behind it, blooming over interactive
 * elements and tightening on press. Easy to follow, quietly crafted.
 * Disabled for touch devices and reduced motion.
 */

const INTERACTIVE = 'a, button, select, [role="button"], canvas';
const NATIVE_CURSOR = "input, textarea";

export function SiteCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ring = ringRef.current;
    if (!ring) return;

    let x = -100;
    let y = -100;
    let rx = -100;
    let ry = -100;
    let scale = 1;
    let scaleTarget = 1;
    let opacity = 0;
    let opacityTarget = 0;
    let pressed = false;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      const t = e.target as Element | null;
      opacityTarget = t?.closest?.(NATIVE_CURSOR) ? 0 : 1;
      scaleTarget = t?.closest?.(INTERACTIVE) ? 1.5 : 1;
    };
    const onDown = () => {
      pressed = true;
    };
    const onUp = () => {
      pressed = false;
    };
    const onLeave = () => {
      opacityTarget = 0;
    };

    const tick = () => {
      rx += (x - rx) * 0.22;
      ry += (y - ry) * 0.22;
      const target = scaleTarget * (pressed ? 0.75 : 1);
      scale += (target - scale) * 0.18;
      opacity += (opacityTarget - opacity) * 0.2;

      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.opacity = String(opacity * 0.75);

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[100] h-9 w-9 rounded-full border border-accent/50 opacity-0"
    />
  );
}
