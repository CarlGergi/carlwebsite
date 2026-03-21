"use client";

import { motion } from "framer-motion";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="container-shell pt-8 pb-4 md:pt-16">
      <div className="max-w-3xl">
        <motion.div
          className="mb-4 flex items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="dot-accent" />
          <span className="text-sm font-medium tracking-widest uppercase text-text-muted">
            {eyebrow}
          </span>
        </motion.div>

        <motion.h1
          className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-text md:text-7xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {title}
        </motion.h1>

        <motion.p
          className="mt-6 max-w-xl text-lg leading-relaxed text-text-muted"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
}
