"use client";

import { useEffect, useState } from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";

/** Dark is the default; light is remembered in localStorage. */
export function ThemeToggle() {
  const [light, setLight] = useState(false);

  // Read the class the no-flash script may have applied before hydration
  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
  }, []);

  const toggle = () => {
    const next = !light;
    setLight(next);
    document.documentElement.classList.toggle("light", next);
    try {
      localStorage.setItem("theme", next ? "light" : "dark");
    } catch {
      // private mode — theme just won't persist
    }
  };

  return (
    <button
      onClick={toggle}
      aria-label={light ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-text-dim transition-colors hover:border-border-hover hover:text-text"
    >
      {light ? (
        <IconMoon size={16} stroke={1.75} aria-hidden="true" />
      ) : (
        <IconSun size={16} stroke={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
