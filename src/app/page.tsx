"use client";

import { HeroSection } from "@/components/site/hero-section";
import { AboutSection } from "@/components/site/about-section";
import { ProjectsSection } from "@/components/site/projects-section";
import { ConsultingSection } from "@/components/site/consulting-section";
import { ExperienceSection } from "@/components/site/experience-section";
import { ContactSection } from "@/components/site/contact-section";
import { PageShell } from "@/components/site/page-shell";
import { ParticleReveal } from "@/components/site/particle-reveal";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <ParticleReveal />
      <ProjectsSection />
      <ExperienceSection />
      <ConsultingSection />
      <AboutSection />
      <ContactSection />
    </PageShell>
  );
}
