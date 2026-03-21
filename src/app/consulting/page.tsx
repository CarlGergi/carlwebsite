"use client";

import { PageIntro } from "@/components/site/page-intro";
import { PageShell } from "@/components/site/page-shell";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { strategyItems } from "@/data/site-content";

export default function ConsultingPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Consulting"
        title="Consulting."
        description="Client projects, national case competitions, and an entrepreneurship program at Oxford. Market sizing, financial modeling, and strategic recommendations."
      />

      <section className="section-spacing">
        <div className="container-shell">
          <div className="space-y-6">
            {strategyItems.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="gradient-border card p-6 md:p-8">
                  <div className="mb-4 flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-accent/[0.06] border border-accent/[0.08] px-3 py-1 text-xs font-semibold text-text-muted">
                      {item.period}
                    </span>
                    <span className="text-sm text-text-muted">
                      {item.location}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold tracking-tight text-text md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-muted">
                    {item.role} &mdash; {item.org}
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
                    {item.description}
                  </p>

                  <div className="mt-5 space-y-3">
                    {item.bullets.map((bullet, j) => (
                      <div
                        key={j}
                        className="flex gap-3 rounded-lg border border-border bg-bg-elevated/40 p-4"
                      >
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/[0.06] border border-accent/[0.08] text-[10px] font-bold text-text-muted">
                          {j + 1}
                        </span>
                        <p className="text-sm leading-relaxed text-text-muted">
                          {bullet}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <span key={tag} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
