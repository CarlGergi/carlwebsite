"use client";

type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-bg to-transparent" />

      <div className="marquee-track">
        {doubled.map((item, i) => (
          <div
            key={`${item}-${i}`}
            className="flex items-center gap-4 rounded-full border border-border bg-bg-raised/60 px-5 py-2.5 text-sm font-medium text-text-muted md:backdrop-blur-sm md:transition-all md:duration-300 md:hover:border-border-hover md:hover:text-text"
          >
            <span className="dot-accent" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
