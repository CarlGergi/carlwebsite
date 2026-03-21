"use client";

import Image from "next/image";
import Link from "next/link";
import { PageIntro } from "@/components/site/page-intro";
import { PageShell } from "@/components/site/page-shell";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";
import { skillGroups, socialLinks } from "@/data/site-content";

const allSkills = skillGroups.flatMap((g) => g.skills);

export default function AboutPage() {
  return (
    <PageShell>
      <PageIntro
        eyebrow="About"
        title="About me."
        description="Computer Science and Economics at the University of Toronto, with a focus in AI. A bit more about who I am and what I've been working on."
      />

      {/* The narrative */}
      <section className="section-spacing">
        <div className="container-shell">
          {/* Photo + intro statement */}
          <div className="mx-auto mb-12 grid max-w-3xl items-center gap-8 md:grid-cols-[auto_1fr]">
            <ScrollReveal>
              <div className="gradient-border relative mx-auto h-56 w-56 shrink-0 overflow-hidden rounded-2xl md:h-64 md:w-64">
                <Image
                  src="/carl.jpg"
                  alt="Carl Gergi"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="font-display text-2xl font-bold leading-snug tracking-tight text-text sm:text-3xl md:text-4xl md:leading-[1.2]">
                I like taking an idea and turning it into something real —
                software that actually works and solves a real problem.
              </p>
            </ScrollReveal>
          </div>

          <div className="mx-auto max-w-3xl space-y-8">

            <ScrollReveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-text-muted sm:text-lg sm:leading-relaxed">
                <p>
                  I&apos;m Carl — second year at the University of Toronto,
                  double majoring in Computer Science and Economics with a
                  focus in AI. I chose both because they complement each other:
                  CS lets me build things, and Economics helps me understand
                  the bigger picture around them.
                </p>
                <p>
                  I&apos;ve built AI-powered applications at hackathons
                  including Anthropic and TechTO, developed an NLP chatbot
                  that processes over 100K financial transactions during an
                  internship, and shipped full-stack platforms for real
                  clients through UofT&apos;s Web Dev Club.
                </p>
                <p>
                  On the consulting side, I&apos;ve worked at Viridian
                  Management Consulting doing market sizing and growth
                  analysis for clients, competed in a national case
                  competition with full financial modeling and executive
                  pitches, and completed an entrepreneurship program at
                  Oxford.
                </p>
                <p>
                  I enjoy the full range — from writing code to building
                  financial models to pitching in front of a panel. What
                  I care about most is doing work that&apos;s real, not
                  theoretical.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl border border-border bg-bg-raised p-6">
                <p className="text-sm leading-relaxed text-text-muted">
                  I&apos;m currently looking for internship opportunities in
                  software engineering, product development, or quantitative
                  roles where I can apply both my technical and analytical
                  background.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <div className="pb-4">
        <Marquee items={allSkills} />
      </div>

      <section className="section-spacing pt-4">
        <div className="container-shell">
          <ScrollReveal>
            <h3 className="mb-8 text-xs font-semibold uppercase tracking-widest text-text-muted">
              Technical toolkit
            </h3>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {skillGroups.map((group, i) => (
              <ScrollReveal key={group.title} delay={i * 0.1}>
                <div className="card p-5 h-full">
                  <h4 className="mb-4 font-display text-lg font-bold text-text">
                    {group.title}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span key={skill} className="tag-pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Connect */}
      <section className="section-spacing pt-0">
        <div className="container-shell">
          <ScrollReveal>
            <div className="gradient-border card p-6 text-center md:p-10">
              <p className="mx-auto max-w-md font-display text-xl font-bold text-text md:text-2xl">
                Want to connect?
              </p>
              <p className="mx-auto mt-3 max-w-sm text-sm text-text-muted">
                I&apos;m open to internships, project collaborations,
                hackathon teams, and interesting conversations.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                    data-hover
                    className="tag-pill"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <Link
                href="/contact"
                data-hover
                className="btn-glow mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-7 py-3.5 text-sm font-semibold text-white"
              >
                Get in touch
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </PageShell>
  );
}
