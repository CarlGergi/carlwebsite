"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion, useScroll } from "framer-motion";
import { themeInk } from "@/lib/theme-ink";

/**
 * Pinned scrollytelling centerpiece: ~1,600 warm ember particles rise out of
 * scatter and converge into "CARL GERGI" as scroll progress advances,
 * cooling from ember to stone as they lock. Once formed, the name is alive:
 * a brass shimmer wave sweeps through the letters, brass sparks twinkle, and
 * the particles scatter away from the pointer and spring back — you can run
 * your hand through the name. Reduced motion renders the finished state.
 */

const NAME = "CARL GERGI";

// Palette endpoints for the ember → stone cool-down
const EMBER = [217, 166, 72] as const;
const STONE = [237, 236, 232] as const;
const INK_LIGHT = [28, 25, 23] as const;

type Particle = {
  sx: number; // scatter position
  sy: number;
  tx: number; // target position (a pixel of the name)
  ty: number;
  ox: number; // pointer-repulsion offset (springs back to 0)
  oy: number;
  size: number;
  brass: boolean;
  phase: number;
  speed: number;
};

// Seeded LCG — deterministic scatter, no hydration surprises
function makeRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
}

function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function buildParticles(
  width: number,
  height: number,
  fontFamily: string,
): Particle[] {
  const off = document.createElement("canvas");
  off.width = width;
  off.height = height;
  const octx = off.getContext("2d");
  if (!octx) return [];

  octx.fillStyle = "#fff";
  octx.textAlign = "center";
  octx.textBaseline = "middle";

  const narrow = width < 700;
  if (narrow) {
    const size = width / 4.2;
    octx.font = `700 ${size}px ${fontFamily}`;
    const [first, last] = NAME.split(" ");
    octx.fillText(first, width / 2, height / 2 - size * 0.58);
    octx.fillText(last, width / 2, height / 2 + size * 0.58);
  } else {
    const size = width / 7.2;
    octx.font = `700 ${size}px ${fontFamily}`;
    octx.fillText(NAME, width / 2, height / 2);
  }

  const data = octx.getImageData(0, 0, width, height).data;
  const step = Math.max(3, Math.round(width / 260));
  const targets: [number, number][] = [];
  for (let y = 0; y < height; y += step) {
    for (let x = 0; x < width; x += step) {
      if (data[(y * width + x) * 4 + 3] > 128) targets.push([x, y]);
    }
  }

  const rand = makeRand(41);
  const MAX = 1700;
  const keep =
    targets.length > MAX
      ? targets.filter(() => rand() < MAX / targets.length)
      : targets;

  return keep.map(([tx, ty]) => ({
    sx: rand() * width,
    sy: rand() * height,
    tx,
    ty,
    ox: 0,
    oy: 0,
    size: 0.8 + rand() * 1.1,
    brass: rand() < 0.09,
    phase: rand() * Math.PI * 2,
    speed: 0.6 + rand() * 1.2,
  }));
}

export function ParticleReveal() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion() ?? false;

  // p hits 1 while ~45vh of the pin remains, so the locked name holds on
  // screen for a beat before the section releases
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start 0.75", "end 1.45"],
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles: Particle[] = [];
    let raf = 0;
    let visible = false;
    let time = 0;
    // Pointer position in canvas CSS-pixel space; far away = inactive
    let px = -9999;
    let py = -9999;

    const setup = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      const fontFamily =
        getComputedStyle(document.body).fontFamily || "sans-serif";
      particles = buildParticles(w, h, fontFamily);
    };

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cssW = canvas.clientWidth;
      ctx.clearRect(0, 0, w, h);
      const { ink, brass, light } = themeInk();
      const p = reduced ? 1 : scrollYProgress.get();
      const pe = easeInOutCubic(Math.min(1, Math.max(0, p)));
      const loose = 1 - pe;
      const locked = pe > 0.92;

      // Diagonal brass shimmer wave — sweeps through every ~4.5s once formed
      const waveWidth = cssW * 0.09;
      const wavePos = ((time % 4.5) / 4.5) * cssW * 1.5 - cssW * 0.25;

      const REPEL_R = 90;
      const REPEL_MAX = 30;

      for (const pt of particles) {
        const wobX = Math.sin(time * pt.speed + pt.phase) * 9 * loose;
        const wobY = Math.cos(time * pt.speed * 0.8 + pt.phase) * 9 * loose;

        // Pointer repulsion — only meaningful once the name has formed
        let rx = 0;
        let ry = 0;
        if (locked && !reduced) {
          const dx = pt.tx - px;
          const dy = pt.ty - py;
          const d = Math.hypot(dx, dy);
          if (d < REPEL_R && d > 0.01) {
            const f = ((REPEL_R - d) / REPEL_R) ** 2 * REPEL_MAX;
            rx = (dx / d) * f;
            ry = (dy / d) * f;
          }
        }
        // Spring the offset toward its target so it flows, not snaps
        pt.ox += (rx - pt.ox) * 0.16;
        pt.oy += (ry - pt.oy) * 0.16;

        const baseX = pt.sx + (pt.tx - pt.sx) * pe + wobX + pt.ox;
        const baseY = pt.sy + (pt.ty - pt.sy) * pe + wobY + pt.oy;
        const x = baseX * dpr;
        const y = baseY * dpr;

        if (pt.brass) {
          const twinkle = locked
            ? 0.75 + Math.sin(time * 2 + pt.phase) * 0.25
            : 1;
          ctx.fillStyle = `rgba(217, 166, 72, ${(0.45 + pe * 0.55) * twinkle})`;
        } else {
          // Cool from ember to stone as the name locks
          const target = light ? INK_LIGHT : STONE;
          const r = EMBER[0] + (target[0] - EMBER[0]) * pe;
          const g = EMBER[1] + (target[1] - EMBER[1]) * pe;
          const b = EMBER[2] + (target[2] - EMBER[2]) * pe;
          let alpha = 0.3 + pe * 0.58;
          if (locked) {
            const waveD = Math.abs((pt.tx + pt.ty) * 0.6 - wavePos);
            if (waveD < waveWidth) {
              alpha = Math.min(1, alpha + (1 - waveD / waveWidth) * 0.5);
            }
          }
          ctx.fillStyle = `rgba(${r | 0}, ${g | 0}, ${b | 0}, ${alpha})`;
        }
        ctx.beginPath();
        ctx.arc(x, y, pt.size * dpr, 0, Math.PI * 2);
        ctx.fill();
      }
      time += 0.016;
    };

    const tick = () => {
      draw();
      if (visible && !reduced) raf = requestAnimationFrame(tick);
    };

    setup();

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

    const onPointer = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      px = e.clientX - rect.left;
      py = e.clientY - rect.top;
    };
    const onPointerEnd = () => {
      px = -9999;
      py = -9999;
    };
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("pointerdown", onPointer, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerEnd);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        if (reduced) draw();
      }, 200);
    };
    window.addEventListener("resize", onResize);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerdown", onPointer);
      document.documentElement.removeEventListener(
        "pointerleave",
        onPointerEnd,
      );
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, [reduced, scrollYProgress]);

  return (
    <div ref={wrapRef} className="relative h-[220vh]">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <div className="container-shell">
          <canvas
            ref={canvasRef}
            className="h-[46vh] w-full md:h-[52vh]"
            role="img"
            aria-label={NAME}
          />
        </div>
      </div>
    </div>
  );
}
