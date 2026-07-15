"use client";

import Image from "next/image";
import {
  IconBallFootball,
  IconBallTennis,
  IconMountain,
  IconPingPong,
  type Icon,
} from "@tabler/icons-react";
import { Section, SubHeading } from "@/components/site/section";
import { TechChip } from "@/components/site/tech-chip";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { skillGroups } from "@/data/site-content";

const sports: { label: string; Icon: Icon }[] = [
  { label: "Football", Icon: IconBallFootball },
  { label: "Tennis", Icon: IconBallTennis },
  { label: "Padel", Icon: IconPingPong },
  { label: "Skiing", Icon: IconMountain },
];

const focuses = [
  {
    label: "Software engineering",
    desc: "Full-stack development across React, Next.js, Python, and PostgreSQL — from database design and APIs to interfaces and deployment.",
  },
  {
    label: "AI & machine learning",
    desc: "AI-powered tools built with Claude, NLP pipelines, and computer vision. I work with LLMs to solve real problems, not just wrap APIs.",
  },
  {
    label: "Strategy & consulting",
    desc: "Market sizing, financial modeling, and competitive analysis for real clients, presented to stakeholders and executives.",
  },
];

export function AboutSection() {
  return (
    <Section id="about" title="About">
      <ScrollReveal>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
          {/* Hover: the portrait dissolves into embers */}
          <div className="group/portrait relative h-40 w-32 shrink-0 overflow-hidden rounded-lg border border-border">
            <Image
              src="/carl.jpg"
              alt="Carl Gergi"
              width={128}
              height={160}
              sizes="128px"
              className="h-40 w-32 object-cover"
            />
            <Image
              src="/carl-ember.png"
              alt=""
              aria-hidden="true"
              width={128}
              height={160}
              sizes="128px"
              className="absolute inset-0 h-40 w-32 object-cover opacity-0 transition-opacity duration-700 group-hover/portrait:opacity-100 motion-reduce:transition-none"
            />
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-text-muted md:text-[15px]">
            <p className="text-base font-medium text-text md:text-lg">
              I chose Computer Science and Economics because they complement
              each other — one lets me build, the other helps me understand
              what&apos;s worth building.
            </p>
            <p>
              I&apos;m interested in the full lifecycle of making something:
              understanding the problem, writing the code, and shipping it.
              Most of what I&apos;ve built has come from hackathons,
              internships, and client work where the output had to actually
              function.
            </p>
          </div>
        </div>
      </ScrollReveal>

      <SubHeading>What I focus on</SubHeading>
      <div className="grid gap-4 md:grid-cols-3">
        {focuses.map((item, i) => (
          <ScrollReveal key={item.label} delay={i * 0.07}>
            <div className="card card-hover h-full p-5">
              <h4 className="text-sm font-semibold text-text">{item.label}</h4>
              <p className="mt-2 text-[13px] leading-relaxed text-text-muted">
                {item.desc}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>

      <SubHeading>Away from the keyboard</SubHeading>
      <ScrollReveal>
        <div className="flex flex-wrap items-center gap-2.5">
          {sports.map(({ label, Icon: SportIcon }) => (
            <div
              key={label}
              className="card card-hover group/sport flex items-center gap-2.5 px-3.5 py-2.5"
            >
              <SportIcon
                size={16}
                stroke={1.75}
                aria-hidden="true"
                className="shrink-0 text-text-dim transition-all duration-200 group-hover/sport:scale-110 group-hover/sport:text-accent"
              />
              <span className="text-[13px] font-medium text-text-muted transition-colors duration-200 group-hover/sport:text-text">
                {label}
              </span>
            </div>
          ))}
          <span className="mono ml-1 text-xs text-text-dim">
            — whenever I get the chance
          </span>
        </div>
      </ScrollReveal>

      <SubHeading>Toolkit</SubHeading>
      <div className="space-y-6">
        {skillGroups.map((group, gi) => (
          <ScrollReveal key={group.title} delay={gi * 0.06}>
            <div>
              <p className="eyebrow mb-3">{group.title.toLowerCase()}</p>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <TechChip key={skill} name={skill} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
