"use client";

import { PageIntro } from "@/components/site/page-intro";
import { PageShell } from "@/components/site/page-shell";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { experiences, education, activities, clubs } from "@/data/site-content";

export default function ExperiencePage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Experience"
        title="Experience."
        description="Where I've worked, what I've studied, and what I do outside of class."
      />

      {/* Work experience */}
      <section className="pb-10 pt-12 md:pb-14 md:pt-16">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Work Experience
              </h2>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {experiences.map((exp, i) => (
              <ScrollReveal key={exp.title} delay={i * 0.1}>
                <div className="gradient-border card p-6 md:p-8">
                  <div className="mb-2 flex flex-wrap items-center gap-3">
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

                  <ul className="mt-4 space-y-2">
                    {exp.bullets.map((bullet, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                        {bullet}
                      </li>
                    ))}
                  </ul>

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
      <section className="pb-8 md:pb-10">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Education
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span className="gradient-text text-sm font-semibold">
                  {education[0].period}
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-text">
                {education[0].school}
              </h3>
              <p className="mt-1 text-sm text-text-muted">
                {education[0].degree}
              </p>
              <ul className="mt-3 space-y-1.5">
                {education[0].details.map((detail, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-2 text-sm text-text-muted"
                  >
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/40" />
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Clubs inline */}
              <div className="mt-5 pt-5 border-t border-border">
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-dim">
                  Clubs & Involvement
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {clubs.map((club) => (
                    <span key={club} className="tag-pill">
                      {club}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Leadership & Activities */}
      <section className="pb-12 md:pb-16">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-6 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Leadership & Activities
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activities.map((act, i) => (
              <ScrollReveal key={act.title} delay={i * 0.08 + 0.1}>
                <div className="card h-full p-5">
                  <p className="mb-1.5 text-xs font-semibold text-text-dim">
                    {act.period}
                  </p>
                  <h4 className="font-display text-base font-bold text-text">
                    {act.role}
                  </h4>
                  <p className="text-sm text-text-muted">{act.org}</p>
                  <ul className="mt-2 space-y-1">
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
