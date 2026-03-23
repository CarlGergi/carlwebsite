"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Magnetic } from "@/components/ui/magnetic";

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

const achievements = [
  "Dean\u2019s List Scholar",
  "3.87 CGPA",
  "AI Focus",
];

export function HeroSection() {
  return (
    <section className="container-shell relative pb-8 pt-4 md:pb-12 md:pt-8">
      <div className="hero-glow" />

      <div className="relative grid items-center gap-10 md:grid-cols-[1fr_auto] md:gap-14 lg:gap-20">
        {/* ── Content ── */}
        <div>
          {/* Eyebrow */}
          <motion.div
            className="mb-5 flex items-center gap-2.5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="dot-accent" />
            <span className="text-xs font-medium uppercase tracking-widest text-text-muted md:text-sm">
              Toronto &middot; University of Toronto
            </span>
          </motion.div>

          {/* Name */}
          <h1 className="text-shimmer relative font-display text-[clamp(2.5rem,8vw,6rem)] font-bold leading-[0.95] tracking-tight">
            <AnimatedLine text="Carl Gergi." startIndex={0} />
          </h1>

          {/* Subtitle */}
          <motion.p
            className="mt-5 text-base leading-relaxed text-text-muted md:text-lg md:whitespace-nowrap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
          >
            Second-year{" "}
            <span className="font-semibold text-text">Computer Science</span>{" "}
            and{" "}
            <span className="font-semibold text-text">Economics</span> with an{" "}
            <span className="font-semibold text-text">AI focus</span> at the{" "}
            <span className="font-semibold text-text">
              University of Toronto
            </span>
            .
          </motion.p>

          {/* Description */}
          <motion.p
            className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted md:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.7 }}
          >
            3.87 CGPA. Dean&apos;s List Scholar. I build full-stack software,
            compete at hackathons, and take on consulting projects.
          </motion.p>

          {/* Achievement badges */}
          <motion.div
            className="mt-5 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.55, duration: 0.6 }}
          >
            {achievements.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-accent/[0.15] bg-accent/[0.06] px-3 py-1 text-[11px] font-semibold tracking-wide text-accent-hover"
              >
                {badge}
              </span>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.7 }}
          >
            <Magnetic strength={0.2}>
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
            </Magnetic>
            <Magnetic strength={0.2}>
            <Link
              href="/contact"
              data-hover
              className="inline-flex items-center justify-center rounded-full border border-border bg-bg-raised/40 px-6 py-3.5 text-sm font-semibold text-text backdrop-blur-sm transition-all duration-300 hover:border-border-hover hover:bg-bg-elevated/50 sm:px-8 sm:py-4"
            >
              Get in touch
            </Link>
            </Magnetic>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.6 }}
          >
            <a
              href="https://github.com/CarlGergi"
              target="_blank"
              rel="noreferrer"
              data-hover
              className="text-text-dim transition-colors hover:text-text-muted"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/carlgergi"
              target="_blank"
              rel="noreferrer"
              data-hover
              className="text-text-dim transition-colors hover:text-text-muted"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="mailto:carlgergi@outlook.com"
              data-hover
              className="text-text-dim transition-colors hover:text-text-muted"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ── Photo — desktop ── */}
        <motion.div
          className="hidden md:block"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.8,
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-accent-coral/10 to-transparent opacity-50 blur-3xl" />
            <div className="gradient-border relative overflow-hidden rounded-2xl">
              <Image
                src="/carl.jpg"
                alt="Carl Gergi"
                width={280}
                height={350}
                className="relative h-[350px] w-[280px] object-cover"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
