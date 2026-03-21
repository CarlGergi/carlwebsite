"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type AnimatedCounterProps = {
  value: string;
  className?: string;
};

export function AnimatedCounter({ value, className }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayed, setDisplayed] = useState("0");

  useEffect(() => {
    if (!isInView) return;

    // Extract numeric part and suffix
    const match = value.match(/^([\d,.]+)(.*)$/);
    if (!match) {
      setDisplayed(value);
      return;
    }

    const numStr = match[1].replace(/,/g, "");
    const suffix = match[2];
    const target = parseFloat(numStr);
    const hasDecimal = numStr.includes(".");
    const duration = 1800;
    const start = performance.now();

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = target * eased;

      if (hasDecimal) {
        setDisplayed(current.toFixed(2) + suffix);
      } else {
        const formatted = Math.round(current).toLocaleString();
        setDisplayed(formatted + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className={className}>
      {isInView ? displayed : "0"}
    </span>
  );
}
