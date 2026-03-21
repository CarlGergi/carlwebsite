"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from "framer-motion";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/consulting", label: "Consulting" },
  { href: "/experience", label: "Experience" },
  { href: "/contact", label: "Contact" },
];

export function SiteNav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? "glass-nav py-3" : "py-4 md:py-5"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-shell">
          <nav className="flex items-center justify-between">
            <Link
              href="/"
              className="group flex items-center gap-3"
              data-hover
            >
              <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-accent to-accent-cyan font-display text-xs font-bold text-white transition-transform duration-300 group-hover:scale-105 md:h-10 md:w-10 md:text-sm">
                CG
              </div>
              <span className="hidden text-sm font-semibold tracking-tight text-text sm:block">
                Carl Gergi
              </span>
            </Link>

            {/* Desktop nav */}
            <div className="hidden items-center gap-0.5 rounded-full border border-border bg-bg-raised/60 p-1 backdrop-blur-sm lg:flex">
              {navItems.map((item) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-hover
                    className={`relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300 ${
                      isActive ? "text-text" : "text-text-muted hover:text-text"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute inset-0 rounded-full bg-bg-elevated/60 border border-border"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative z-10">{item.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="relative z-[60] flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
              aria-label="Toggle menu"
            >
              <motion.span
                className="block h-0.5 w-5 bg-text"
                animate={
                  mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
              <motion.span
                className="block h-0.5 w-5 bg-text"
                animate={
                  mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }
                }
                transition={{ duration: 0.3 }}
              />
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-bg/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center gap-1">
              {navItems.map((item, i) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(item.href);

                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`block rounded-2xl px-8 py-3 font-display text-2xl font-bold tracking-tight transition-colors ${
                        isActive ? "gradient-text" : "text-text-muted"
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
    </>
  );
}
