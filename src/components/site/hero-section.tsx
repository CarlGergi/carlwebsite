"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const letterVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: i * 0.04,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedLine({
  text,
  className,
  startIndex = 0,
}: {
  text: string;
  className?: string;
  startIndex?: number;
}) {
  return (
    <span className={`inline-block overflow-hidden ${className ?? ""}`}>
      <span className="inline-flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={startIndex + i}
            variants={letterVariants}
            initial="hidden"
            animate="visible"
            className="inline-block"
            style={{ whiteSpace: char === " " ? "pre" : undefined }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  );
}

export function HeroSection() {
  return (
    <section className="container-shell relative flex min-h-[85vh] flex-col justify-center pb-16 pt-8 md:min-h-[90vh] md:pb-12">
      {/* Backlit glow behind the headline */}
      <div className="hero-glow" />

      {/* Eyebrow */}
      <motion.div
        className="relative mb-6 flex items-center gap-2.5 md:mb-8 md:gap-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <span className="dot-accent" />
        <span className="text-xs font-medium tracking-widest uppercase text-text-muted md:text-sm">
          Toronto &middot; CS + Economics &middot; UofT
        </span>
      </motion.div>

      {/* Headline */}
      <h1 className="relative font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] font-bold tracking-tight">
        <AnimatedLine text="Carl Gergi." startIndex={0} />
      </h1>

      {/* Description */}
      <motion.p
        className="relative mt-6 max-w-xl text-base leading-relaxed text-text-muted md:mt-8 md:text-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 0.7 }}
      >
        Second-year at the University of Toronto, studying Computer Science
        and Economics. I build full-stack software, take on consulting
        projects, and compete at hackathons.
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4 md:mt-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.7 }}
      >
        <Link
          href="/projects"
          data-hover
          className="btn-glow group inline-flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg sm:px-8 sm:py-4"
        >
          View my work
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3 8h10m0 0L9 4m4 4L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <Link
          href="/contact"
          data-hover
          className="inline-flex items-center justify-center rounded-full border border-border bg-bg-raised/40 px-6 py-3.5 text-sm font-semibold text-text backdrop-blur-sm transition-all duration-300 hover:border-border-hover hover:bg-bg-elevated/50 sm:px-8 sm:py-4"
        >
          Get in touch
        </Link>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 md:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs tracking-widest uppercase text-text-dim">
            Scroll
          </span>
          <div className="h-8 w-px bg-gradient-to-b from-text-dim to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
