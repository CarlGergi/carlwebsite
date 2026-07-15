"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Brass hairline across the very top that fills with reading progress. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent/70"
      style={{ scaleX }}
    />
  );
}
