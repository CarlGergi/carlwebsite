"use client";

import { useEffect, useRef } from "react";

const links: [string, string][] = [
  ["projects", "projects"],
  ["experience", "experience"],
  ["consulting", "consulting"],
  ["about", "about"],
  ["contact", "contact"],
];

/**
 * The sign-off: a brass light-stroke handwrites "Carl" once, the first time
 * the footer scrolls into view. Reduced motion shows the settled signature.
 */
function Signature() {
  const ref = useRef<HTMLVideoElement>(null);
  const played = useRef(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        if (reduced) {
          const showEnd = () => {
            video.currentTime = Math.max(0, video.duration - 0.1);
          };
          if (video.readyState >= 1) showEnd();
          else video.addEventListener("loadedmetadata", showEnd, { once: true });
        } else {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.4 },
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src="/signature.mp4"
      muted
      playsInline
      preload="metadata"
      onClick={() => {
        // Curiosity reward: watch it sign again
        const v = ref.current;
        if (!v) return;
        v.currentTime = 0;
        v.play().catch(() => {});
      }}
      className="screen-media mx-auto h-28 w-auto cursor-pointer mix-blend-screen md:h-36"
      style={{
        maskImage:
          "radial-gradient(ellipse 58% 65% at 50% 50%, black 40%, transparent 82%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 58% 65% at 50% 50%, black 40%, transparent 82%)",
      }}
      aria-label="Carl — handwritten signature"
    />
  );
}

export function Footer() {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      history.replaceState(null, "", `/#${id}`);
    }
  }

  return (
    <footer className="container-shell pb-10 pt-6">
      <Signature />
      <div className="hairline mb-7 mt-4" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="mono text-xs text-text-dim">
          © {new Date().getFullYear()} · toronto, canada
        </p>
        <nav className="flex flex-wrap gap-x-5 gap-y-2">
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`/#${id}`}
              onClick={(e) => handleClick(e, id)}
              className="text-xs text-text-dim transition-colors hover:text-text"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
