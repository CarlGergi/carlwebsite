"use client";

import { useEffect, useRef } from "react";
import { themeInk } from "@/lib/theme-ink";

/**
 * A mirror made of dust: renders the visitor's in-progress message as a
 * cloud of particles that continuously re-forms as they type. On send, the
 * words burst into embers and reform as a farewell. Idle shows a prompt.
 * Reduced motion snaps to each state without the morph.
 */

const IDLE_TEXT = "say hi";
const SENT_TEXT = "sent — talk soon";
const POOL = 1500;

type Mote = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  alpha: number;
  targetAlpha: number;
  size: number;
  brass: boolean;
  phase: number;
  vx: number;
  vy: number;
};

function makeRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

/** Greedy word-wrap sized to fit the canvas; long messages shrink the type. */
function layoutText(
  ctx: CanvasRenderingContext2D,
  text: string,
  w: number,
  h: number,
  fontFamily: string,
): { lines: string[]; fontSize: number } {
  const clean = text.trim().replace(/\s+/g, " ");
  const len = clean.length;
  let fontSize =
    len <= 8 ? w / 5.5 : len <= 24 ? w / 8 : len <= 48 ? w / 10.5 : w / 13;
  fontSize = Math.min(fontSize, h / 4);

  const maxLines = 4;
  for (;;) {
    ctx.font = `700 ${fontSize}px ${fontFamily}`;
    const lines: string[] = [];
    let line = "";
    for (const word of clean.split(" ")) {
      const probe = line ? `${line} ${word}` : word;
      if (ctx.measureText(probe).width <= w * 0.92 || !line) {
        line = probe;
      } else {
        lines.push(line);
        line = word;
      }
    }
    if (line) lines.push(line);
    if (lines.length <= maxLines || fontSize < 14) {
      if (lines.length > maxLines) {
        lines.length = maxLines;
        lines[maxLines - 1] += "…";
      }
      return { lines, fontSize };
    }
    fontSize *= 0.85;
  }
}

function sampleTargets(
  text: string,
  w: number,
  h: number,
  fontFamily: string,
): [number, number][] {
  const off = document.createElement("canvas");
  off.width = w;
  off.height = h;
  const octx = off.getContext("2d");
  if (!octx) return [];

  const { lines, fontSize } = layoutText(octx, text, w, h, fontFamily);
  octx.fillStyle = "#fff";
  octx.textAlign = "center";
  octx.textBaseline = "middle";
  octx.font = `700 ${fontSize}px ${fontFamily}`;
  const lineH = fontSize * 1.15;
  const startY = h / 2 - ((lines.length - 1) * lineH) / 2;
  lines.forEach((l, i) => octx.fillText(l, w / 2, startY + i * lineH));

  const data = octx.getImageData(0, 0, w, h).data;
  const step = Math.max(2, Math.round(w / 200));
  const targets: [number, number][] = [];
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 128) targets.push([x, y]);
    }
  }
  // Thin deterministically to the pool size
  if (targets.length > POOL) {
    const rand = makeRand(11);
    const keep = targets.filter(() => rand() < POOL / targets.length);
    return keep.slice(0, POOL);
  }
  return targets;
}

export function MessageDust({ text, sent }: { text: string; sent: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef(text);
  const sentRef = useRef(sent);
  textRef.current = text;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rand = makeRand(29);
    let w = 0;
    let h = 0;

    const motes: Mote[] = Array.from({ length: POOL }, () => ({
      x: 0,
      y: 0,
      tx: 0,
      ty: 0,
      alpha: 0,
      targetAlpha: 0,
      size: 0.7 + rand() * 1.1,
      brass: rand() < 0.1,
      phase: rand() * Math.PI * 2,
      vx: 0,
      vy: 0,
    }));

    const fontFamily = () =>
      getComputedStyle(document.body).fontFamily || "sans-serif";

    const retarget = (value: string) => {
      const targets = sampleTargets(
        value || IDLE_TEXT,
        canvas.clientWidth,
        canvas.clientHeight,
        fontFamily(),
      );
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        if (i < targets.length) {
          m.tx = targets[i][0];
          m.ty = targets[i][1];
          m.targetAlpha = 1;
          // Fresh motes enter from a random nearby scatter
          if (m.alpha <= 0.01) {
            m.x = m.tx + (rand() - 0.5) * 160;
            m.y = m.ty + (rand() - 0.5) * 160;
          }
        } else {
          m.targetAlpha = 0;
        }
      }
      if (reduced) {
        for (const m of motes) {
          m.x = m.tx;
          m.y = m.ty;
          m.alpha = m.targetAlpha;
        }
      }
    };

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      retarget(textRef.current);
    };
    resize();

    let raf = 0;
    let visible = false;
    let t = 0;

    const draw = () => {
      const { ink, brass } = themeInk();
      ctx.clearRect(0, 0, w * dpr, h * dpr);
      for (const m of motes) {
        // Burst velocity decays; morph spring pulls toward target
        m.vx *= 0.92;
        m.vy *= 0.92;
        m.x += m.vx + (m.tx - m.x) * 0.085;
        m.y += m.vy + (m.ty - m.y) * 0.085;
        m.alpha += (m.targetAlpha - m.alpha) * 0.08;
        if (m.alpha < 0.015) continue;

        const shimmer = 0.85 + Math.sin(t * 1.6 + m.phase) * 0.15;
        ctx.fillStyle = m.brass
          ? `rgba(${brass}, ${m.alpha * shimmer})`
          : `rgba(${ink}, ${m.alpha * 0.85 * shimmer})`;
        ctx.beginPath();
        ctx.arc(m.x * dpr, m.y * dpr, m.size * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      t += 0.016;
    };

    const tick = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible && !reduced && !raf) raf = requestAnimationFrame(tick);
      if (!visible && raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(canvas);
    if (reduced) draw();

    // ── React to prop changes without re-running the whole effect ──
    let debounce = 0;
    let lastText = textRef.current;
    let lastSent = sentRef.current;
    const watch = window.setInterval(() => {
      if (sent !== undefined && sentRef.current !== lastSent) {
        lastSent = sentRef.current;
        if (lastSent) {
          // Send-off: burst, then reform as the farewell
          for (const m of motes) {
            m.vx = (rand() - 0.5) * 14;
            m.vy = (rand() - 0.5) * 14 - 3;
          }
          window.setTimeout(() => retarget(SENT_TEXT), 700);
        }
      }
      if (textRef.current !== lastText && !lastSent) {
        lastText = textRef.current;
        window.clearTimeout(debounce);
        debounce = window.setTimeout(() => retarget(lastText), 140);
      }
    }, 80);

    window.addEventListener("resize", resize);
    return () => {
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.clearInterval(watch);
      window.clearTimeout(debounce);
      if (raf) cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep the sent ref fresh for the watcher above
  sentRef.current = sent;

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="h-[280px] w-full md:h-[320px]"
        role="img"
        aria-label="Your message, rendered as particles while you type"
      />
      <p className="eyebrow mt-1 text-center" style={{ display: "block" }}>
        your words, in dust — start typing
      </p>
    </div>
  );
}
