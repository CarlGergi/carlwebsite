"use client";

import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { projects } from "@/data/site-content";

function Thumbnail({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border bg-bg-raised transition-colors duration-300 group-hover:border-border-hover">
      <Image
        src={image}
        alt={`${title} preview`}
        fill
        sizes="(max-width: 640px) 100vw, 288px"
        className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
      />
    </div>
  );
}

export function ProjectsSection() {
  return (
    <Section
      id="projects"
      title="Projects"
      description="Hackathon wins, client work, and personal builds — each one started as a real problem."
    >
      <div>
        {projects.map((project, i) => (
          <ScrollReveal key={project.slug}>
            <div className="group relative border-t border-border py-8 transition-colors last:border-b md:py-10">
              <div
                className={
                  project.image
                    ? "grid gap-5 sm:grid-cols-[1fr_16rem] sm:items-start md:gap-10 md:grid-cols-[1fr_18rem]"
                    : "grid gap-5"
                }
              >
                {/* ── Text ── */}
                <div>
                  <div className="flex items-center gap-3.5">
                    <span className="mono text-xs tabular-nums text-text-dim transition-colors duration-200 group-hover:text-accent">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-lg font-semibold tracking-tight text-text md:text-xl">
                      <Link
                        href={`/projects/${project.slug}`}
                        className="focus-visible:outline-none"
                      >
                        {/* Stretched link — the whole row is clickable */}
                        <span className="absolute inset-0 z-0" aria-hidden="true" />
                        {project.title}
                      </Link>
                    </h3>
                    {project.event && (
                      <span className="mono hidden text-[11px] text-text-dim sm:inline">
                        {project.event}
                      </span>
                    )}
                    {/* Open-project affordance — visible at rest, brass on hover */}
                    <span
                      aria-hidden="true"
                      className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border text-text-dim transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:border-accent/60 group-hover:text-accent"
                    >
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M7 17L17 7M17 7H8m9 0v9" />
                      </svg>
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 6).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-md border border-border bg-bg-elevated px-2 py-0.5 text-[11px] font-medium text-text-muted"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 6 && (
                      <span className="rounded-md border border-border bg-bg-elevated px-2 py-0.5 text-[11px] font-medium text-text-dim">
                        +{project.tags.length - 6}
                      </span>
                    )}
                  </div>

                  <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted">
                    {project.tagline}
                  </p>

                  {/* Links sit above the stretched row link */}
                  <div className="relative z-10 mt-5 flex flex-wrap items-center gap-2.5">
                    {project.repo && (
                      <a
                        href={project.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-pill"
                      >
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        GitHub
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-pill"
                      >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        Demo
                      </a>
                    )}
                    {project.devpost && (
                      <a
                        href={project.devpost}
                        target="_blank"
                        rel="noreferrer"
                        className="btn-pill"
                      >
                        Devpost
                      </a>
                    )}
                    {project.href.startsWith("http") &&
                      project.href !== project.repo &&
                      project.href !== project.demo && (
                        <a
                          href={project.href}
                          target="_blank"
                          rel="noreferrer"
                          className="btn-pill"
                        >
                          <svg
                            width="11"
                            height="11"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                          >
                            <path d="M7 17L17 7M17 7H8m9 0v9" />
                          </svg>
                          Website
                        </a>
                      )}
                    <span className="ml-1 inline-flex items-center gap-1 text-xs font-medium text-text-muted transition-colors duration-200 group-hover:text-accent">
                      View project
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </div>
                </div>

                {/* ── Thumbnail (right side, only when the project has one) ── */}
                {project.image && (
                  <Thumbnail image={project.image} title={project.title} />
                )}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
