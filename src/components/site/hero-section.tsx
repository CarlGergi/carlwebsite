"use client";

import { motion } from "framer-motion";
import { Typewriter } from "@/components/ui/typewriter";
import { DotGlobe } from "@/components/ui/dot-globe";

const greetings = [
  "hey, glad you're here.",
  "marhaba — welcome in.",
  "let's build something good.",
];

const fadeUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
};

const ease = [0.25, 0.1, 0.25, 1] as [number, number, number, number];

export function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-[82svh] items-center py-16"
    >
      {/* Ambient ember drift — screen blend keeps the black pure; masked so
          the warm cast never tints the globe on the right */}
      <video
        className="screen-media pointer-events-none absolute inset-0 h-full w-full object-cover opacity-25 mix-blend-screen motion-reduce:hidden"
        style={{
          maskImage:
            "linear-gradient(90deg, black 0%, black 40%, transparent 72%)",
          WebkitMaskImage:
            "linear-gradient(90deg, black 0%, black 40%, transparent 72%)",
        }}
        src="/ambient.mp4"
        autoPlay
        muted
        loop
        playsInline
        aria-hidden="true"
      />

      <div className="container-shell relative grid w-full items-center gap-12 md:grid-cols-[1.2fr_1fr] md:gap-16">
        {/* ── Intro ── */}
        <div>
          <motion.p
            {...fadeUp}
            transition={{ duration: 0.5, ease }}
            className="eyebrow mb-5"
          >
            toronto, canada
          </motion.p>

          <motion.h1
            {...fadeUp}
            transition={{ delay: 0.1, duration: 0.6, ease }}
            className="text-3xl font-semibold tracking-tight text-text md:text-4xl"
          >
            <Typewriter phrases={greetings} />
          </motion.h1>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.25, duration: 0.6, ease }}
            className="mt-6 max-w-lg text-base font-medium leading-relaxed text-text md:text-lg"
          >
            I&apos;m Carl — I study Computer Science and Economics at the
            University of Toronto.
          </motion.p>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.4, duration: 0.6, ease }}
            className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted md:text-[15px]"
          >
            I build software end to end — hackathon projects, client
            platforms, and AI systems of my own. Take a look around.
          </motion.p>

          <motion.div
            {...fadeUp}
            transition={{ delay: 0.55, duration: 0.6, ease }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="https://github.com/CarlGergi"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/carlgergi"
              target="_blank"
              rel="noreferrer"
              className="btn-ghost"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <a href="mailto:carlgergi@outlook.com" className="btn-ghost">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Email
            </a>
          </motion.div>

          <motion.p
            {...fadeUp}
            transition={{ delay: 0.7, duration: 0.6, ease }}
            className="mono mt-8 flex items-center gap-2 text-xs text-text-dim"
          >
            <span className="status-dot" aria-hidden="true" />
            software developer intern @ deloitte
          </motion.p>
        </div>

        {/* ── Constellation globe ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.9, ease }}
          className="mx-auto w-full max-w-[280px] md:max-w-[380px]"
        >
          <DotGlobe />
        </motion.div>
      </div>
    </section>
  );
}
