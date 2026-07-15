"use client";

import { Section, SubHeading } from "@/components/site/section";
import { LogoTile } from "@/components/site/logo-tile";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { experiences, education, activities, clubs } from "@/data/site-content";

export function ExperienceSection() {
  return (
    <Section
      id="experience"
      title="Experience"
      description="Internships, my degree, and what I do outside of class."
    >
      {/* Work experience */}
      <div className="space-y-4">
        {experiences.map((exp) => (
          <ScrollReveal key={exp.title}>
            <div className="card card-hover group p-6 md:p-7">
              <div className="flex items-start gap-4">
                <span className="inline-block transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
                  <LogoTile logo={exp.logo} name={exp.title} />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="text-base font-semibold tracking-tight text-text">
                      {exp.title}
                    </h4>
                    <span className="mono text-xs text-text-dim">
                      {exp.period}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-text-muted">
                    {exp.role} · {exp.location}
                  </p>
                </div>
              </div>

              {exp.bullets.length > 0 && (
                <ul className="mt-5 space-y-2">
                  {exp.bullets.map((bullet, j) => (
                    <li
                      key={j}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
                    >
                      <span
                        className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-text-dim"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}

              {exp.tags.length > 0 && (
                <p className="mono mt-4 text-xs text-text-dim">
                  {exp.tags.join(" · ")}
                </p>
              )}
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Education */}
      <SubHeading>Education</SubHeading>
      <ScrollReveal>
        <div className="card card-hover group p-6 md:p-7">
          <div className="flex items-start gap-4">
            <span className="inline-block transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
              <LogoTile logo={education[0].logo} name={education[0].school} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h4 className="text-base font-semibold tracking-tight text-text">
                  {education[0].school}
                </h4>
                <span className="mono text-xs text-text-dim">
                  {education[0].period}
                </span>
              </div>
              <p className="mt-0.5 text-sm text-text-muted">
                {education[0].degree}
              </p>
            </div>
          </div>

          <ul className="mt-5 space-y-2">
            {education[0].details.map((detail, j) => (
              <li
                key={j}
                className="flex items-start gap-2.5 text-sm leading-relaxed text-text-muted"
              >
                <span
                  className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-text-dim"
                  aria-hidden="true"
                />
                {detail}
              </li>
            ))}
          </ul>

          <p className="mono mt-4 text-xs text-text-dim">
            {clubs.join(" · ")}
          </p>
        </div>
      </ScrollReveal>

      {/* Leadership & Activities */}
      <SubHeading>Leadership & activities</SubHeading>
      <div className="grid gap-4 md:grid-cols-3">
        {activities.map((act, i) => (
          <ScrollReveal key={act.title} delay={i * 0.07}>
            <div className="card card-hover h-full p-5">
              <p className="mono text-[11px] text-text-dim">{act.period}</p>
              <h4 className="mt-2 text-sm font-semibold text-text">
                {act.role}
              </h4>
              <p className="text-sm text-text-muted">{act.org}</p>
              <p className="mt-2.5 text-[13px] leading-relaxed text-text-muted">
                {act.bullets[0]}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
