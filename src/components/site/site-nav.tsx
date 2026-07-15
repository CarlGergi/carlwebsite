"use client";

import Link from "next/link";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/site/theme-toggle";

const navItems = [
  { id: "home", label: "home" },
  { id: "projects", label: "projects" },
  { id: "experience", label: "experience" },
  { id: "consulting", label: "consulting" },
  { id: "about", label: "about" },
  { id: "contact", label: "contact" },
];

export function SiteNav() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("home");
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 24);
    setShowTop(latest > 600);
  });

  // ── Scroll-spy: highlight the section crossing the upper-middle band ──
  useEffect(() => {
    const ids = navItems.map((i) => i.id);
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return; // detail pages have no sections

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const topMost = ids.find((id) => visible.has(id));
        if (topMost) setActive(topMost);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));

    // Bottom guard: ensure the last section lights up when the page bottoms out
    const onScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4
      ) {
        setActive(ids[ids.length - 1]);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // ── Mobile menu: dialog semantics — scroll lock, Escape, focus trap ──
  useEffect(() => {
    if (!mobileOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        return;
      }
      if (e.key === "Tab") {
        const root = overlayRef.current;
        if (!root) return;
        const items = root.querySelectorAll<HTMLElement>("a[href]");
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const focusTimer = window.setTimeout(() => {
      overlayRef.current?.querySelector<HTMLElement>("a[href]")?.focus();
    }, 80);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      window.clearTimeout(focusTimer);
      hamburgerRef.current?.focus();
    };
  }, [mobileOpen]);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      const el = document.getElementById(id);
      // Only intercept when the section exists on this page (the single page).
      // On project detail pages we let the Link navigate to /#id normally.
      if (el) {
        e.preventDefault();
        setActive(id);
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", id === "home" ? "/" : `/#${id}`);
      }
      setMobileOpen(false);
    },
    [],
  );

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled ? "nav-solid" : ""
        }`}
      >
        <div className="container-shell">
          <nav className="flex h-14 items-center justify-between">
            <Link
              href="/#home"
              onClick={(e) => {
                handleNavClick(e, "home");
                // Small reward for the curious — a comet on demand
                window.dispatchEvent(new Event("launch-comet"));
              }}
              className="mono text-sm font-medium text-text"
              aria-label="Carl Gergi — home"
            >
              carl gergi
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-6 lg:flex">
              <ThemeToggle />
              {navItems.slice(1).map((item) => {
                const isActive = active === item.id;
                return (
                  <Link
                    key={item.id}
                    href={`/#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative text-sm transition-colors duration-200 ${
                      isActive ? "text-text" : "text-text-dim hover:text-text"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-underline"
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 right-0 h-px bg-accent/80"
                        transition={{ type: "spring", stiffness: 400, damping: 35 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile: theme toggle + hamburger */}
            <div className="flex items-center gap-2 lg:hidden">
              <ThemeToggle />
              <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen((o) => !o)}
              className="relative z-[60] flex h-11 w-11 flex-col items-center justify-center gap-1.5"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-haspopup="dialog"
            >
              <motion.span
                className="block h-px w-5 bg-text"
                animate={mobileOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
              />
              <motion.span
                className="block h-px w-5 bg-text"
                animate={
                  mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.25 }}
              />
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <nav className="flex flex-col items-center gap-2">
              {navItems.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.3 }}
                  >
                    <Link
                      href={item.id === "home" ? "/#home" : `/#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={`block px-8 py-2.5 text-2xl font-medium tracking-tight transition-colors ${
                        isActive ? "text-text" : "text-text-dim"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back to top */}
      <AnimatePresence>
        {showTop && (
          <motion.button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              history.replaceState(null, "", "/");
            }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
            className="card fixed bottom-5 right-5 z-50 flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:text-text"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
