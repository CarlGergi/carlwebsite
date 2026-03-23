import { ReactNode } from "react";
import Image from "next/image";

export function DeviceMockup({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Screen shell */}
      <div className="relative overflow-hidden rounded-t-xl border border-white/[0.08] bg-[#0c0c0c] shadow-2xl shadow-black/50">
        {/* macOS toolbar */}
        <div className="flex items-center gap-[6px] border-b border-white/[0.05] bg-[#1a1a1a]/80 px-3.5 py-[9px]">
          <span className="h-[10px] w-[10px] rounded-full bg-[#FF5F57]/80" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#FDBC40]/80" />
          <span className="h-[10px] w-[10px] rounded-full bg-[#33C748]/80" />
        </div>
        {/* Viewport */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#0c0c0c]">
          {children}
        </div>
      </div>
      {/* MacBook base / chin */}
      <div className="relative h-[10px] rounded-b-lg border-x border-b border-white/[0.06] bg-gradient-to-b from-[#2d2d2d] to-[#1c1c1c]">
        <div className="absolute bottom-0 left-1/2 h-[4px] w-[18%] -translate-x-1/2 translate-y-[2px] rounded-b-md bg-[#1a1a1a]" />
      </div>
    </div>
  );
}

export function ProjectScreen({
  image,
  title,
  gradient,
}: {
  image?: string;
  title: string;
  gradient: string;
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={`${title} preview`}
        fill
        sizes="(max-width: 768px) 100vw, 600px"
        className="object-cover object-top"
      />
    );
  }
  return (
    <div
      className="flex h-full w-full items-end p-6 md:p-8"
      style={{ background: gradient }}
    >
      <span className="select-none font-display text-xl font-bold text-white/20 md:text-3xl">
        {title}
      </span>
    </div>
  );
}
