"use client";

import Link from "next/link";
import { HeroSection } from "@/components/site/hero-section";
import { PageShell } from "@/components/site/page-shell";
import { projects, strategyItems, experiences } from "@/data/site-content";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";
import { SpotlightCard } from "@/components/ui/spotlight-card";

const allSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Supabase",
  "Docker",
  "Tailwind CSS",
  "Figma",
  "PowerBI",
  "Flask",
];

export default function Home() {
  const latestExp = experiences[0];

  return (
    <PageShell>
      <HeroSection />

      {/* Skill marquee */}
      <div className="py-6">
        <Marquee items={allSkills} />
      </div>

      {/* ── Bento grid ── */}
      <section className="section-spacing">
        <div className="container-shell">
          <ScrollReveal>
            <div className="mb-10 text-center">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-muted">
                What I do
              </p>
              <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-text sm:text-4xl md:text-5xl">
                I build software{" "}
                <span className="gradient-text">
                  that solves real problems.
                </span>
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {/* Development — spans 2 cols */}
            <ScrollReveal delay={0.1} className="md:col-span-2">
              <SpotlightCard className="gradient-border gradient-border-hover card h-full rounded-[1.25rem]">
              <Link
                href="/projects"
                data-hover
                className="group block h-full overflow-hidden p-6 md:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/[0.08] bg-accent/[0.06]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-text-muted"
                  >
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                  </svg>
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-text md:text-2xl">
                  Development
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-text-muted">
                  Full-stack applications, AI-powered tools, and production
                  systems. I work across the stack — from database design and
                  APIs to frontend interfaces and deployment.
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {projects.slice(0, 3).map((p) => (
                    <span key={p.slug} className="tag-pill text-[11px]">
                      {p.title}
                    </span>
                  ))}
                  <span className="tag-pill text-[11px]">
                    +{projects.length - 3} more
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-text">
                  View projects
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M2 7h10m0 0L8 3m4 4L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              </SpotlightCard>
            </ScrollReveal>

            {/* About — CS + Econ */}
            <ScrollReveal delay={0.15}>
              <SpotlightCard className="gradient-border gradient-border-hover card h-full rounded-[1.25rem]">
              <Link
                href="/about"
                data-hover
                className="group block h-full overflow-hidden p-6 md:p-8"
              >
                <p className="font-display text-lg font-bold leading-snug text-text md:text-xl">
                  CS and Economics, with an AI focus.{" "}
                  <span className="gradient-text">Building from both.</span>
                </p>
                <p className="mt-4 text-sm leading-relaxed text-text-muted">
                  CS gives me the skills to build real software. Economics gives
                  me the thinking to understand markets, industries, and what
                  problems are actually worth solving.
                </p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-text">
                  About me
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M2 7h10m0 0L8 3m4 4L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              </SpotlightCard>
            </ScrollReveal>

            {/* Experience snapshot */}
            <ScrollReveal delay={0.2}>
              <SpotlightCard className="gradient-border gradient-border-hover card h-full rounded-[1.25rem]">
              <Link
                href="/experience"
                data-hover
                className="group block h-full overflow-hidden p-6 md:p-8"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="dot-accent" />
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-text-dim">
                    Experience
                  </span>
                </div>
                <h3 className="mb-1 font-display text-lg font-bold text-text">
                  {latestExp.title}
                </h3>
                <p className="mb-1 text-sm text-text-muted">{latestExp.role}</p>
                <p className="mb-3 text-xs text-text-dim">{latestExp.period}</p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {latestExp.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag-pill text-[11px]">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-text">
                  View experience
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M2 7h10m0 0L8 3m4 4L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              </SpotlightCard>
            </ScrollReveal>

            {/* Consulting — spans 2 cols */}
            <ScrollReveal delay={0.25} className="md:col-span-2">
              <SpotlightCard className="gradient-border gradient-border-hover card h-full rounded-[1.25rem]">
              <Link
                href="/consulting"
                data-hover
                className="group block h-full overflow-hidden p-6 md:p-8"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg border border-accent/[0.08] bg-accent/[0.06]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-text-muted"
                  >
                    <path d="M2 20h.01" />
                    <path d="M7 20v-4" />
                    <path d="M12 20v-8" />
                    <path d="M17 20V8" />
                    <path d="M22 4v16" />
                  </svg>
                </div>
                <h3 className="mb-2 font-display text-xl font-bold text-text md:text-2xl">
                  Consulting
                </h3>
                <p className="mb-5 text-sm leading-relaxed text-text-muted">
                  Market sizing, financial modeling, and case competitions. I
                  work with teams to research industries, analyze data, and
                  deliver clear recommendations to real clients.
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {strategyItems.map((s) => (
                    <span key={s.title} className="tag-pill text-[11px]">
                      {s.org.split(" — ")[0].split(" (")[0]}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-text">
                  View consulting work
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    <path
                      d="M2 7h10m0 0L8 3m4 4L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
              </SpotlightCard>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Featured projects ── */}
      <section className="section-spacing pt-0">
        <div className="container-shell">
          <div className="mb-8 flex items-end justify-between">
            <ScrollReveal>
              <div>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="dot-accent" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                    Featured
                  </span>
                </div>
                <h2 className="font-display text-2xl font-bold tracking-tight text-text sm:text-3xl md:text-5xl">
                  Recent work
                </h2>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link
                href="/projects"
                data-hover
                className="link-hover hidden text-sm font-medium text-text-muted hover:text-text sm:block"
              >
                See all
              </Link>
            </ScrollReveal>
          </div>

          <div className="space-y-4">
            {projects.slice(0, 3).map((project, i) => (
              <ScrollReveal key={project.slug} delay={i * 0.1}>
                <Link
                  href={`/projects/${project.slug}`}
                  data-hover
                  className="gradient-border gradient-border-hover card group relative block overflow-hidden p-5 md:p-7"
                >
                  <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="mb-1.5 flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl font-bold tracking-tight text-text md:text-2xl">
                          {project.title}
                        </h3>
                        {project.event && (
                          <span className="rounded-full bg-accent/8 px-2.5 py-0.5 text-[11px] font-semibold text-text-muted">
                            {project.event}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-text-muted">
                        {project.tagline}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-text-muted transition-all duration-300 group-hover:gap-3 group-hover:text-text">
                      Details
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path
                          d="M2 7h10m0 0L8 3m4 4L8 11"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
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
