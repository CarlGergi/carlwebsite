"use client";

import { useEffect, useRef } from "react";
import { themeInk } from "@/lib/theme-ink";

/**
 * Background sky life, drawn on one fixed canvas:
 *  - fireflies: a few brass motes wandering organic paths, pulsing softly
 *  - constellation shards: every ~half minute a small fragment of connected
 *    stars drifts across the far background, rotating gently, and fades out
 * Skipped entirely under reduced motion; paused while the tab is hidden.
 */

type Firefly = {
  x: number;
  y: number;
  heading: number;
  speed: number;
  phase: number;
  blinkPhase: number;
};

type Shard = {
  pts: [number, number][]; // local coords
  edges: [number, number][];
  brassIdx: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  rotSpeed: number;
  age: number; // seconds
  ttl: number;
};

export function SkyLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    };
    resize();
    window.addEventListener("resize", resize);

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const flies: Firefly[] = Array.from(
      { length: window.innerWidth < 768 ? 4 : 7 },
      () => ({
        x: rand(0, window.innerWidth),
        y: rand(0, window.innerHeight),
        heading: rand(0, Math.PI * 2),
        speed: rand(0.15, 0.32),
        phase: rand(0, Math.PI * 2),
        blinkPhase: rand(0, Math.PI * 2),
      }),
    );

    const shards: Shard[] = [];
    let nextShardIn = 5; // first one arrives early

    const spawnShard = () => {
      const n = 4 + Math.floor(rand(0, 3));
      const pts: [number, number][] = Array.from({ length: n }, () => [
        rand(-60, 60),
        rand(-45, 45),
      ]);
      const edges: [number, number][] = [];
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const dx = pts[i][0] - pts[j][0];
          const dy = pts[i][1] - pts[j][1];
          if (Math.hypot(dx, dy) < 65) edges.push([i, j]);
        }
      }
      // Cross the viewport slowly, entering from a random side
      const fromLeft = Math.random() > 0.5;
      const speed = rand(0.25, 0.45);
      shards.push({
        pts,
        edges,
        brassIdx: Math.floor(rand(0, n)),
        x: fromLeft ? -90 : w + 90,
        y: rand(h * 0.1, h * 0.7),
        vx: fromLeft ? speed : -speed,
        vy: rand(-0.06, 0.06),
        rot: rand(0, Math.PI * 2),
        rotSpeed: rand(-0.0012, 0.0012),
        age: 0,
        ttl: (w + 180) / speed / 60, // seconds to cross
      });
    };

    let t = 0;
    let raf = 0;
    let running = true;

    const tick = () => {
      t += 1 / 60;
      const { ink, brass } = themeInk();
      ctx.clearRect(0, 0, w * dpr, h * dpr);

      // ── Fireflies ──
      for (const f of flies) {
        f.heading += rand(-0.03, 0.03);
        f.x += Math.cos(f.heading) * f.speed;
        f.y += Math.sin(f.heading) * f.speed;
        // Soft wrap
        if (f.x < -20) f.x = w + 20;
        if (f.x > w + 20) f.x = -20;
        if (f.y < -20) f.y = h + 20;
        if (f.y > h + 20) f.y = -20;

        // Pulse × slow blink cycle (fully dark part of the time)
        const pulse = 0.45 + 0.55 * Math.sin(t * 1.6 + f.phase);
        const blink = Math.max(0, Math.sin(t * 0.22 + f.blinkPhase));
        const b = Math.max(0, pulse) * Math.min(1, blink * 2.5);
        if (b < 0.02) continue;

        ctx.fillStyle = `rgba(${brass}, ${b * 0.16})`;
        ctx.beginPath();
        ctx.arc(f.x * dpr, f.y * dpr, 4 * dpr, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(${brass}, ${b * 0.75})`;
        ctx.beginPath();
        ctx.arc(f.x * dpr, f.y * dpr, 1.3 * dpr, 0, Math.PI * 2);
        ctx.fill();
      }

      // ── Constellation shards ──
      nextShardIn -= 1 / 60;
      if (nextShardIn <= 0 && shards.length < 2) {
        spawnShard();
        nextShardIn = rand(14, 26);
      }
      for (let i = shards.length - 1; i >= 0; i--) {
        const s = shards[i];
        s.age += 1 / 60;
        s.x += s.vx;
        s.y += s.vy;
        s.rot += s.rotSpeed;
        if (s.age > s.ttl) {
          shards.splice(i, 1);
          continue;
        }
        // Fade in for 6s, out for the last 6s
        const env = Math.min(1, s.age / 6, (s.ttl - s.age) / 6);
        if (env <= 0) continue;

        const cos = Math.cos(s.rot);
        const sin = Math.sin(s.rot);
        const px: number[] = [];
        const py: number[] = [];
        for (let k = 0; k < s.pts.length; k++) {
          const [lx, ly] = s.pts[k];
          px.push((s.x + lx * cos - ly * sin) * dpr);
          py.push((s.y + lx * sin + ly * cos) * dpr);
        }
        ctx.strokeStyle = `rgba(${ink}, ${0.09 * env})`;
        ctx.lineWidth = 1 * dpr;
        for (const [a, b2] of s.edges) {
          ctx.beginPath();
          ctx.moveTo(px[a], py[a]);
          ctx.lineTo(px[b2], py[b2]);
          ctx.stroke();
        }
        for (let k = 0; k < px.length; k++) {
          const isBrass = k === s.brassIdx;
          ctx.fillStyle = isBrass
            ? `rgba(${brass}, ${0.55 * env})`
            : `rgba(${ink}, ${0.32 * env})`;
          ctx.beginPath();
          ctx.arc(px[k], py[k], (isBrass ? 1.6 : 1.15) * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (running) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onVisibility = () => {
      running = document.visibilityState === "visible";
      if (running && !raf) raf = requestAnimationFrame(tick);
      if (!running && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
