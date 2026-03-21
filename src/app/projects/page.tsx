"use client";

import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { PageShell } from "@/components/site/page-shell";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { projects } from "@/data/site-content";

export default function ProjectsPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="Projects"
        title="What I've built."
        description="Hackathon projects, client work, and personal builds. Each one involved solving a real problem with working software."
      />

      <section className="section-spacing">
        <div className="container-shell">
          <div className="space-y-5">
            {projects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.08}>
                <Link
                  href={`/projects/${project.slug}`}
                  data-hover
                  className="gradient-border gradient-border-hover card group relative block overflow-hidden p-6 md:p-8"
                >
                  {/* Big number */}
                  <span className="absolute right-4 top-2 font-display text-[5rem] font-bold leading-none text-bg-elevated/80 select-none md:right-6 md:top-3 md:text-[7rem]">
                    0{i + 1}
                  </span>

                  <div className="relative z-10">
                    {/* Event badge */}
                    {project.event && (
                      <div className="mb-3">
                        <span className="rounded-full bg-accent/[0.06] border border-accent/[0.08] px-3 py-1 text-xs font-semibold text-text-muted">
                          {project.event}
                        </span>
                      </div>
                    )}

                    <h3 className="mb-1 font-display text-2xl font-bold tracking-tight text-text md:text-3xl">
                      {project.title}
                    </h3>
                    <p className="mb-4 text-sm text-text-muted sm:text-base">
                      {project.tagline}
                    </p>

                    <div className="mb-5 flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="max-w-xl text-sm leading-relaxed text-text-muted">
                      {project.description}
                    </p>

                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-text">
                      Read more
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                        <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
