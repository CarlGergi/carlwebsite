"use client";

import { PageIntro } from "@/components/site/page-intro";
import { PageShell } from "@/components/site/page-shell";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { experiences, education, activities } from "@/data/site-content";

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Experience"
        title="Experience."
        description="Where I've worked, what I've studied, and what I do outside of class."
      />

      {/* Work experience */}
      <section className="section-spacing">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Work Experience
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.1}>
                <div className="gradient-border card p-6 md:p-8">
                  <div className="mb-3 flex flex-wrap items-center gap-3">
                    <span className="gradient-text text-sm font-semibold">
                      {exp.period}
                    </span>
                    <span className="text-sm text-text-muted">
                      {exp.location}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl font-bold tracking-tight text-text">
                    {exp.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-text-muted">
                    {exp.role}
                  </p>

                  <div className="mt-5 space-y-3">
                    {exp.bullets.map((bullet, j) => (
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

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
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

      {/* Education */}
      <section className="section-spacing pt-0">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Education
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-5">
            {education.map((edu, i) => (
              <ScrollReveal key={edu.school} delay={i * 0.1}>
                <div className="card p-6 md:p-8">
                  <p className="mb-2 text-sm font-semibold gradient-text">
                    {edu.period}
                  </p>
                  <h3 className="font-display text-xl font-bold tracking-tight text-text md:text-2xl">
                    {edu.school}
                  </h3>
                  <p className="mt-1 text-sm text-text-muted">{edu.degree}</p>
                  <ul className="mt-4 space-y-2">
                    {edu.details.map((detail, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm text-text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership & Activities */}
      <section className="section-spacing pt-0">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Leadership & Activities
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {activities.map((act, i) => (
              <ScrollReveal key={act.title} delay={i * 0.08}>
                <div className="card p-5 h-full">
                  <p className="mb-2 text-xs font-semibold text-text-dim">
                    {act.period}
                  </p>
                  <h4 className="font-display text-lg font-bold text-text">
                    {act.role}
                  </h4>
                  <p className="text-sm text-text-muted">{act.org}</p>
                  <ul className="mt-3 space-y-1.5">
                    {act.bullets.map((b, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2 text-sm leading-relaxed text-text-muted"
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
