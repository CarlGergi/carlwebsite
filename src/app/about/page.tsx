"use client";

import Image from "next/image";
import { PageShell } from "@/components/site/page-shell";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { Marquee } from "@/components/ui/marquee";
import { skillGroups } from "@/data/site-content";
import { motion } from "framer-motion";

const allSkills = skillGroups.flatMap((g) => g.skills);

const focuses = [
  {
    label: "Software Engineering",
    desc: "Full-stack development across React, Next.js, Python, and PostgreSQL. I build applications end-to-end — from database design and APIs to frontend interfaces and deployment.",
  },
  {
    label: "AI & Machine Learning",
    desc: "Building AI-powered tools with Claude, NLP pipelines, and computer vision. I work with LLMs to solve real problems, not just wrap APIs.",
  },
  {
    label: "Strategy & Consulting",
    desc: "Market sizing, financial modeling, and competitive analysis for real clients. I present data-driven recommendations to stakeholders and executives.",
  },
];

export default function AboutPage() {
  return (
    <PageShell>
      {/* ── Hero ── */}
      <section className="container-shell pt-8 md:pt-16">
        <div className="max-w-3xl">
          <motion.div
            className="mb-4 flex items-center gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="dot-accent" />
            <span className="text-sm font-medium uppercase tracking-widest text-text-muted">
              About
            </span>
          </motion.div>

          <motion.h1
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-text md:text-7xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            A bit about me.
          </motion.h1>
        </div>
      </section>

      {/* ── Photo + intro ── */}
      <section className="container-shell pt-12 md:pt-16">
        <div className="mx-auto max-w-4xl">
          <div className="grid items-start gap-10 md:grid-cols-[280px_1fr] md:gap-14">
            <ScrollReveal>
              <div className="relative mx-auto w-fit md:mx-0">
                <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-accent/15 via-accent-coral/8 to-transparent opacity-60 blur-2xl" />
                <div className="gradient-border relative overflow-hidden rounded-2xl">
                  <Image
                    src="/carl.jpg"
                    alt="Carl Gergi"
                    width={280}
                    height={360}
                    className="relative h-[360px] w-[280px] object-cover"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <div className="space-y-5">
                <p className="font-display text-2xl font-bold leading-snug tracking-tight text-text md:text-3xl">
                  I study Computer Science and Economics at the University of
                  Toronto, with a focus in AI.
                </p>
                <div className="space-y-4 text-[15px] leading-relaxed text-text-muted sm:text-base">
                  <p>
                    I&apos;m interested in the full lifecycle of building
                    something — from understanding the problem to writing the
                    code to shipping it. Most of what I&apos;ve built has come
                    from hackathons, internships, and client work where the
                    output had to actually function.
                  </p>
                  <p>
                    On the business side, I work on consulting engagements and
                    case competitions — market analysis, financial modeling, and
                    presenting recommendations to real clients. I chose CS and
                    Economics because they complement each other: one lets me
                    build, the other helps me understand what&apos;s worth
                    building.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── What I focus on ── */}
      <section className="container-shell pt-16 md:pt-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                What I focus on
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 md:grid-cols-3">
            {focuses.map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.1}>
                <div className="card h-full p-6">
                  <h3 className="mb-3 font-display text-lg font-bold text-text">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {item.desc}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Skills ── */}
      <div className="pt-16 pb-4 md:pt-20">
        <Marquee items={allSkills} />
      </div>

      <section className="container-shell pb-16 pt-4 md:pb-20">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Technical toolkit
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {skillGroups.map((group, i) => (
              <ScrollReveal key={group.title} delay={i * 0.1}>
                <div className="card h-full p-5">
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

      {/* ── Beyond the code ── */}
      <section className="container-shell pb-12 md:pb-16">
        <div className="mx-auto max-w-4xl">
          <ScrollReveal>
            <div className="mb-8 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Beyond the code
              </h2>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <div className="card p-6 md:p-8">
              <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                Outside of school and work, I enjoy playing football, tennis,
                and padel, and I go skiing whenever I get the chance.
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Football", "Tennis", "Padel", "Skiing"].map((sport) => (
                  <span
                    key={sport}
                    className="tag-pill hover-lift"
                  >
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </PageShell>
  );
}
