"use client";

import { useEffect, useRef, useState } from "react";

type TypewriterProps = {
  phrases: string[];
  /** ms per typed character */
  typeSpeed?: number;
  /** ms per deleted character */
  deleteSpeed?: number;
  /** ms to hold a completed phrase before deleting */
  holdTime?: number;
  className?: string;
};

export function Typewriter({
  phrases,
  typeSpeed = 65,
  deleteSpeed = 35,
  holdTime = 2200,
  className,
}: TypewriterProps) {
  const [text, setText] = useState("");
  const [reducedMotion, setReducedMotion] = useState(false);
  const state = useRef({ phrase: 0, char: 0, deleting: false });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true);
      setText(phrases[0]);
      return;
    }

    // First phrase greets the visitor by their own time of day
    const hour = new Date().getHours();
    const timeGreeting =
      hour < 5
        ? "up late? same."
        : hour < 12
          ? "good morning."
          : hour < 18
            ? "good afternoon."
            : "good evening.";
    const list = [timeGreeting, ...phrases];

    let timer: number;

    const tick = () => {
      const s = state.current;
      const current = list[s.phrase];
      let delay = s.deleting ? deleteSpeed : typeSpeed;

      if (!s.deleting) {
        s.char++;
        if (s.char === current.length) {
          s.deleting = true;
          delay = holdTime;
        }
      } else {
        s.char--;
        if (s.char === 0) {
          s.deleting = false;
          s.phrase = (s.phrase + 1) % list.length;
          delay = 350;
        }
      }

      setText(current.slice(0, s.char));
      timer = window.setTimeout(tick, delay);
    };

    timer = window.setTimeout(tick, 400);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={className}>
      {text}
      {!reducedMotion && (
        <span className="cursor-blink" style={{ height: "1em" }} aria-hidden="true" />
      )}
      {/* Screen readers get the first phrase once, not every keystroke */}
      <span className="sr-only">{phrases[0]}</span>
    </span>
  );
}
