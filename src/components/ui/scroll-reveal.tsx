"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  distance?: number;
};

const directionMap = {
  up: { y: 1, x: 0 },
  down: { y: -1, x: 0 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function ScrollReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  distance = 40,
}: ScrollRevealProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const d = directionMap[direction];
  const dist = isMobile ? Math.min(distance, 20) : distance;
  const dur = isMobile ? 0.5 : 0.7;
  const del = isMobile ? Math.min(delay, 0.1) : delay;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: d.x * dist, y: d.y * dist }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: dur,
        delay: del,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
