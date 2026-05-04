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
        description="Hackathon wins, client work, and personal builds. Each one started with a real problem and ended with working software."
      />

      <section className="section-spacing">
        <div className="container-shell">
          <div className="space-y-0">
            {projects.map((project, i) => (
              <ScrollReveal key={project.slug} delay={0.06}>
                <Link
                  href={`/projects/${project.slug}`}
                  data-hover
                  className="group relative block"
                >
                  {/* Top divider line */}
                  {i === 0 && (
                    <div className="absolute inset-x-0 top-0 h-px bg-border" />
                  )}

                  <div className="relative py-10 md:py-14">
                    {/* Hover background glow */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-accent/[0.03] via-accent/[0.02] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                    <div className="relative">
                      {/* Row 1: Number + Event badge */}
                      <div className="mb-4 flex items-center gap-4">
                        <span className="font-display text-sm font-semibold tabular-nums text-text-dim transition-colors duration-300 group-hover:text-accent">
                          0{i + 1}
                        </span>
                        {project.event && (
                          <span className="rounded-full border border-border bg-bg-elevated px-3 py-0.5 text-[11px] font-semibold tracking-wide text-text-muted">
                            {project.event}
                          </span>
                        )}
                      </div>

                      {/* Row 2: Title + arrow */}
                      <div className="flex items-start justify-between gap-6">
                        <div className="min-w-0 flex-1">
                          <h3 className="mb-2 font-display text-3xl font-bold tracking-tight text-text transition-colors duration-300 group-hover:text-accent-hover md:text-4xl lg:text-5xl">
                            {project.title}
                          </h3>
                          <p className="max-w-2xl text-sm leading-relaxed text-text-muted sm:text-base">
                            {project.tagline}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="mt-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/30 bg-accent/[0.06] transition-all duration-300 group-hover:border-accent/60 group-hover:bg-accent/[0.12] md:h-12 md:w-12">
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 18 18"
                            fill="none"
                            className="text-accent/80 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                          >
                            <path
                              d="M5 13L13 5m0 0H6m7 0v7"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Row 3: Tags + links */}
                      <div className="mt-5 flex flex-col items-start gap-y-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-x-5">
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                          <div className="flex flex-wrap gap-1.5">
                            {project.tags.slice(0, 5).map((tag) => (
                              <span key={tag} className="tag-pill text-[11px]">
                                {tag}
                              </span>
                            ))}
                            {project.tags.length > 5 && (
                              <span className="tag-pill text-[11px]">
                                +{project.tags.length - 5}
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-4">
                            {project.demo && (
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-text-dim transition-colors group-hover:text-text-muted">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                                Demo
                              </span>
                            )}
                            {project.devpost && (
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-text-dim transition-colors group-hover:text-text-muted">
                                Devpost
                              </span>
                            )}
                            {project.repo && (
                              <span className="flex items-center gap-1.5 text-xs font-semibold text-text-dim transition-colors group-hover:text-text-muted">
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                >
                                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                </svg>
                                Code
                              </span>
                            )}
                          </div>
                        </div>

                        <span className="text-sm font-semibold text-text-muted transition-colors duration-300 group-hover:text-accent-hover">
                          View project
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom divider line */}
                  <div className="absolute inset-x-0 bottom-0 h-px bg-border transition-colors duration-300 group-hover:bg-accent/20" />
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
