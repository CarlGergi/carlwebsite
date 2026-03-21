import { ScrollReveal } from "@/components/ui/scroll-reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="max-w-2xl">
      <ScrollReveal>
        <div className="mb-3 flex items-center gap-2.5">
          <span className="dot-accent" />
          <span className="text-xs font-semibold uppercase tracking-widest text-text-muted">
            {eyebrow}
          </span>
        </div>
      </ScrollReveal>
      <ScrollReveal delay={0.1}>
        <h2 className="font-display text-3xl font-bold tracking-tight text-text md:text-5xl">
          {title}
        </h2>
      </ScrollReveal>
      {description && (
        <ScrollReveal delay={0.2}>
          <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
