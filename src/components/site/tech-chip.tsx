"use client";

import {
  siPython,
  siCplusplus,
  siTypescript,
  siJavascript,
  siR,
  siReact,
  siNextdotjs,
  siFastapi,
  siFlask,
  siTailwindcss,
  siSpringboot,
  siGit,
  siDocker,
  siSupabase,
  siPostgresql,
  siPostman,
  siFigma,
  siOpenjdk,
  type SimpleIcon,
} from "simple-icons";

/** Known brand icons, keyed by the exact names used in site-content. */
const ICONS: Record<string, SimpleIcon> = {
  Java: siOpenjdk,
  Python: siPython,
  "C++": siCplusplus,
  TypeScript: siTypescript,
  JavaScript: siJavascript,
  R: siR,
  React: siReact,
  "Next.js": siNextdotjs,
  FastAPI: siFastapi,
  Flask: siFlask,
  "Tailwind CSS": siTailwindcss,
  "Spring Boot": siSpringboot,
  Git: siGit,
  Docker: siDocker,
  Supabase: siSupabase,
  PostgreSQL: siPostgresql,
  Postman: siPostman,
  Figma: siFigma,
};

/**
 * One technology as an icon + name chip. Falls back to a mono initial when
 * no brand icon exists (SQL, PowerBI, …). Monochrome by design — the icon
 * warms to full text color on hover, no brand colors.
 */
export function TechChip({ name }: { name: string }) {
  const icon = ICONS[name];
  return (
    <div className="card card-hover group/chip flex items-center gap-2.5 px-3.5 py-2.5">
      {icon ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="shrink-0 text-text-dim transition-all duration-200 group-hover/chip:scale-110 group-hover/chip:text-text"
        >
          <path d={icon.path} />
        </svg>
      ) : (
        <span
          aria-hidden="true"
          className="mono flex h-4 w-4 shrink-0 items-center justify-center text-[11px] font-semibold text-text-dim transition-colors duration-200 group-hover/chip:text-text"
        >
          {name[0]}
        </span>
      )}
      <span className="text-[13px] font-medium text-text-muted transition-colors duration-200 group-hover/chip:text-text">
        {name}
      </span>
    </div>
  );
}
