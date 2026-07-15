"use client";

import { Section } from "@/components/site/section";
import { LogoTile } from "@/components/site/logo-tile";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { strategyItems } from "@/data/site-content";

export function ConsultingSection() {
  return (
    <Section
      id="consulting"
      title="Consulting & strategy"
      description="Client engagements, case competitions, and an entrepreneurship program at Oxford."
    >
      <div className="space-y-4">
        {strategyItems.map((item) => (
          <ScrollReveal key={item.title}>
            <div className="card card-hover group p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="inline-block transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <LogoTile logo={item.logo} name={item.org} dark={item.logoDark} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base font-semibold tracking-tight text-text">
                      {item.title}
                    </h4>
                    <span className="mono text-xs text-text-dim">
                      {item.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-text-muted">
                    {item.role} · {item.org}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text-muted">
                {item.description}
              </p>

              <ul className="mt-4 space-y-2">
                {item.bullets.map((bullet, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                  >
                    <span
                      className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-text-dim"
                      aria-hidden="true"
                    />
                    {bullet}
                  </li>
                ))}
              </ul>

              <p className="mono mt-4 text-xs text-text-dim">
                {item.tags.join(" · ")}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
