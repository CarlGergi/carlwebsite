import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/site-content";
import { PageShell } from "@/components/site/page-shell";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <PageShell>
      <section className="container-shell pt-8 pb-4 md:pt-16">
        <div className="mb-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-text"
            data-hover
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M12 7H2m0 0l4-4M2 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All projects
          </Link>
        </div>

        <div className="max-w-3xl">
          {project.event && (
            <div className="mb-4">
              <span className="rounded-full bg-accent/[0.06] border border-accent/[0.08] px-3 py-1 text-xs font-semibold text-text-muted">
                {project.event}
              </span>
            </div>
          )}

          <h1 className="font-display text-4xl font-bold tracking-tight text-text md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-4 text-lg text-text-muted md:text-xl">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-spacing">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <p className="mb-8 text-base leading-relaxed text-text-muted sm:text-lg">
              {project.description}
            </p>

            <div className="space-y-4">
              {project.bullets.map((bullet, i) => (
                <div
                  key={i}
                  className="flex gap-4 rounded-xl border border-border bg-bg-raised p-5"
                >
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/[0.06] border border-accent/[0.08] font-display text-xs font-bold text-text-muted">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>

            {project.href !== "#" && project.href !== "/contact" && (
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                data-hover
                className="btn-glow mt-10 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-8 py-4 text-sm font-semibold text-white"
              >
                {project.cta}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2 7h10m0 0L8 3m4 4L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>

          {/* Next project */}
          <div className="mx-auto mt-20 max-w-3xl">
            <div className="glow-divider" />
            <div className="pt-10">
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-text-dim">
                Next project
              </p>
              <Link
                href={`/projects/${nextProject.slug}`}
                data-hover
                className="group inline-flex items-center gap-3"
              >
                <span className="font-display text-2xl font-bold tracking-tight text-text-muted transition-colors group-hover:text-text md:text-3xl">
                  {nextProject.title}
                </span>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-text-dim transition-all group-hover:translate-x-1 group-hover:text-text-muted">
                  <path d="M4 10h12m0 0l-5-5m5 5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
