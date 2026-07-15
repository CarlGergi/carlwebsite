"use client";

import { useEffect, useRef } from "react";
import { themeInk } from "@/lib/theme-ink";

/**
 * A slowly rotating constellation globe: dots joined by faint lines, drawn
 * on canvas in the site's dot-grid language. Brass signals travel along the
 * edges like data moving through the network. Drag to spin. Renders a single
 * static frame when the user prefers reduced motion, and pauses entirely
 * while off-screen.
 */

type Point = { x: number; y: number; z: number };

function buildPoints(count: number): Point[] {
  const pts: Point[] = [];
  // Fibonacci sphere — evenly spread points, no clustering at the poles
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pts.push({ x: Math.cos(t) * r, y, z: Math.sin(t) * r });
  }
  return pts;
}

/**
 * The sphere rotates rigidly, so which dots sit near each other never
 * changes — compute the constellation edges once up front.
 */
function buildEdges(pts: Point[], maxDist: number): [number, number][] {
  const edges: [number, number][] = [];
  const maxSq = maxDist * maxDist;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
      const dz = pts[i].z - pts[j].z;
      if (dx * dx + dy * dy + dz * dz < maxSq) edges.push([i, j]);
    }
  }
  return edges;
}

export function DotGlobe({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Day-by-day GitHub contribution levels (0–4), mapped onto the sphere —
  // no re-render on arrival, the draw loop just picks them up
  const levelsRef = useRef<Uint8Array | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("https://github-contributions-api.jogruber.de/v4/CarlGergi?y=last")
      .then((r) => r.json())
      .then((data: { contributions: { level: number }[] }) => {
        if (cancelled || !data?.contributions?.length) return;
        const levels = new Uint8Array(data.contributions.length);
        data.contributions.forEach((c, i) => (levels[i] = c.level));
        levelsRef.current = levels;
      })
      .catch(() => {}); // decorative fallback: the plain constellation
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const points = buildPoints(420);
    const edges = buildEdges(points, 0.24);
    // Reusable projection buffers — avoid allocating per frame
    const projX = new Float32Array(points.length);
    const projY = new Float32Array(points.length);
    const projZ = new Float32Array(points.length);

    // Brass signals that travel the constellation like packets. Each hops to
    // a random edge sharing its arrival node, so paths wander organically.
    // Seeded LCG instead of Math.random keeps renders reproducible.
    let seed = 7;
    const rand = () => {
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      return seed / 0x7fffffff;
    };
    type Signal = { edge: number; t: number; speed: number; forward: boolean };
    const signals: Signal[] = Array.from({ length: 7 }, () => ({
      edge: Math.floor(rand() * edges.length),
      t: rand(),
      speed: 0.006 + rand() * 0.008,
      forward: rand() > 0.5,
    }));
    // Brass pulse rings that bloom where a signal lands
    type Pulse = { node: number; r: number; alpha: number };
    const pulses: Pulse[] = [];

    const hopSignal = (s: Signal) => {
      const arrival = s.forward ? edges[s.edge][1] : edges[s.edge][0];
      pulses.push({ node: arrival, r: 2, alpha: 0.55 });
      const nextEdges: number[] = [];
      for (let e = 0; e < edges.length; e++) {
        if (e !== s.edge && (edges[e][0] === arrival || edges[e][1] === arrival))
          nextEdges.push(e);
      }
      s.edge = nextEdges.length
        ? nextEdges[Math.floor(rand() * nextEdges.length)]
        : Math.floor(rand() * edges.length);
      s.forward = edges[s.edge][0] === arrival;
      s.t = 0;
      s.speed = 0.006 + rand() * 0.008;
    };

    // Pointer position over the canvas (CSS px) — powers proximity glow
    let hoverX = -9999;
    let hoverY = -9999;
    const highlight = new Float32Array(points.length);

    let rotY = 0.6;
    let velY = 0.0032;
    // Second axis: vertical drag tilts the sphere; it carries momentum and
    // then eases back home so the composition always recovers
    const baseTilt = -0.32;
    let rotX = baseTilt;
    let velX = 0;
    let raf = 0;
    let visible = true;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const size = canvas.clientWidth;
      canvas.width = size * dpr;
      canvas.height = size * dpr;
    };
    resize();

    const draw = () => {
      const size = canvas.width;
      const cx = size / 2;
      const cy = size / 2;
      const radius = size * 0.42;
      ctx.clearRect(0, 0, size, size);

      const { ink, brass } = themeInk();
      const sinY = Math.sin(rotY);
      const cosY = Math.cos(rotY);
      const sinT = Math.sin(rotX);
      const cosT = Math.cos(rotX);

      // Project every point once, then draw edges beneath dots
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        // rotate around Y, then tilt around X
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y2 = p.y * cosT - z1 * sinT;
        const z2 = p.y * sinT + z1 * cosT;
        projX[i] = cx + x1 * radius;
        projY[i] = cy - y2 * radius;
        projZ[i] = (z2 + 1) / 2; // 0 = back, 1 = front
      }

      // Proximity glow — nodes near the pointer wake up (squared-distance
      // early-out keeps this cheap at 60fps)
      const hx = hoverX * dpr;
      const hy = hoverY * dpr;
      const reach = 80 * dpr;
      const reachSq = reach * reach;
      for (let i = 0; i < points.length; i++) {
        if (projZ[i] < 0.45) {
          highlight[i] = 0;
          continue;
        }
        const dx = projX[i] - hx;
        const dy = projY[i] - hy;
        const dSq = dx * dx + dy * dy;
        highlight[i] =
          dSq < reachSq ? ((reach - Math.sqrt(dSq)) / reach) ** 2 : 0;
      }

      // Constellation lines — brighter as they face the viewer; edges near
      // the pointer warm to brass
      ctx.lineWidth = 1 * dpr;
      for (const [a, b] of edges) {
        const depth = (projZ[a] + projZ[b]) / 2;
        if (depth < 0.35) continue; // skip far-side clutter
        const hl = highlight[a] + highlight[b];
        if (hl > 0.04) {
          ctx.strokeStyle = `rgba(${brass}, ${Math.min(0.6, (depth - 0.35) * 0.16 + hl * 0.3)})`;
        } else {
          ctx.strokeStyle = `rgba(${ink}, ${(depth - 0.35) * 0.16})`;
        }
        ctx.beginPath();
        ctx.moveTo(projX[a], projY[a]);
        ctx.lineTo(projX[b], projY[b]);
        ctx.stroke();
      }

      // Each node is one day of the last year; contribution level sets its
      // presence — quiet days stay stone, heavy commit days burn brass
      const levels = levelsRef.current;
      for (let i = 0; i < points.length; i++) {
        const depth = projZ[i];
        const hl = highlight[i];
        const lv = levels ? levels[i % levels.length] : 0;
        const alpha = Math.min(1, 0.1 + depth * 0.42 + lv * 0.1 + hl * 0.5);
        ctx.fillStyle =
          hl > 0.05 || lv >= 3
            ? `rgba(${brass}, ${alpha})`
            : `rgba(${ink}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(
          projX[i],
          projY[i],
          (1 + depth * 0.9 + lv * 0.28 + hl * 0.9) * dpr,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }

      // Signal-arrival pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.r += 0.7 * dpr;
        p.alpha *= 0.93;
        const depth = projZ[p.node];
        if (p.alpha < 0.02 || depth < 0.35) {
          pulses.splice(i, 1);
          continue;
        }
        ctx.strokeStyle = `rgba(${brass}, ${p.alpha * depth})`;
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.arc(projX[p.node], projY[p.node], p.r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Traveling brass signals, with a short comet tail behind each
      for (const s of signals) {
        const [a, b] = edges[s.edge];
        const from = s.forward ? a : b;
        const to = s.forward ? b : a;
        const depth = projZ[from] + (projZ[to] - projZ[from]) * s.t;
        if (depth > 0.3) {
          const sx = projX[from] + (projX[to] - projX[from]) * s.t;
          const sy = projY[from] + (projY[to] - projY[from]) * s.t;
          const glow = (depth - 0.3) / 0.7;
          const tailT = Math.max(0, s.t - 0.35);
          const tx = projX[from] + (projX[to] - projX[from]) * tailT;
          const ty = projY[from] + (projY[to] - projY[from]) * tailT;
          const grad = ctx.createLinearGradient(tx, ty, sx, sy);
          grad.addColorStop(0, `rgba(${brass}, 0)`);
          grad.addColorStop(1, `rgba(${brass}, ${glow * 0.55})`);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 1.2 * dpr;
          ctx.beginPath();
          ctx.moveTo(tx, ty);
          ctx.lineTo(sx, sy);
          ctx.stroke();
          ctx.fillStyle = `rgba(${brass}, ${0.25 + glow * 0.75})`;
          ctx.beginPath();
          ctx.arc(sx, sy, (1.4 + glow * 1.3) * dpr, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    // Time-based motion: speed stays constant even when frames drop, so the
    // rotation glides instead of stuttering under load
    let lastTime = 0;
    const tick = (now: number) => {
      const dt = lastTime ? Math.min(2, (now - lastTime) / 16.67) : 1;
      lastTime = now;
      if (!dragging) {
        // snap back to the one true idle speed quickly after a drag
        velY += (0.0032 - velY) * 0.08 * dt;
        if (Math.abs(velY - 0.0032) < 0.0002) velY = 0.0032;
        // vertical momentum bleeds off, then the tilt glides home
        velX *= 1 - 0.06 * dt;
        rotX += (baseTilt - rotX) * 0.015 * dt;
      }
      rotY += velY * dt;
      rotX += velX * dt;
      for (const s of signals) {
        s.t += s.speed * dt;
        if (s.t >= 1) hopSignal(s);
      }
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    // Pause while scrolled out of view; reset the clock on resume so the
    // first frame back never applies a huge stale delta
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced && !raf) {
        lastTime = 0;
        raf = requestAnimationFrame(tick);
      }
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverX = e.clientX - rect.left;
      hoverY = e.clientY - rect.top;
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = dx * 0.0025;
      rotY += dx * 0.005;
      velX = dy * 0.0025;
      rotX += dy * 0.005;
    };
    const onUp = () => {
      dragging = false;
    };
    const onHoverLeave = () => {
      hoverX = -9999;
      hoverY = -9999;
    };

    canvas.addEventListener("pointerdown", onDown);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerup", onUp);
    canvas.addEventListener("pointercancel", onUp);
    canvas.addEventListener("pointerleave", onHoverLeave);
    window.addEventListener("resize", resize);

    if (reduced) {
      draw();
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerup", onUp);
      canvas.removeEventListener("pointercancel", onUp);
      canvas.removeEventListener("pointerleave", onHoverLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`aspect-square w-full cursor-grab touch-pan-y active:cursor-grabbing ${className ?? ""}`}
      aria-label="A rotating constellation of the last year of GitHub activity — each node is a day, bright nodes are commit days"
      role="img"
    />
  );
}
