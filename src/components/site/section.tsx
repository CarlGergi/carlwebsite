"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type SectionProps = {
  id: string;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  className?: string;
};

/**
 * Shared section primitive: a brass dash draws in ahead of a quiet title.
 * Deliberately understated — the content carries the section.
 */
export function Section({
  id,
  title,
  description,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`section-spacing ${className}`}>
      <div className="container-shell">
        <ScrollReveal>
          <header className="mb-8 md:mb-10">
            <h2 className="flex items-center gap-3 text-lg font-semibold tracking-tight text-text">
              <motion.span
                aria-hidden="true"
                className="inline-block h-px bg-accent"
                initial={{ width: 0 }}
                whileInView={{ width: "1.5rem" }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
              />
              {title}
            </h2>
            {description && (
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-muted">
                {description}
              </p>
            )}
          </header>
        </ScrollReveal>

        {children}
      </div>
    </section>
  );
}

/** Small in-section label used to group blocks within a section. */
export function SubHeading({ children }: { children: string }) {
  return (
    <h3 className="mb-5 mt-12 text-[0.8rem] font-medium text-text-dim first:mt-0">
      {children}
    </h3>
  );
}
