import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/data/site-content";
import { PageShell } from "@/components/site/page-shell";

function getYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|[?&]v=)([^&]+)/);
  return match ? match[1] : null;
}

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
  const youtubeId = project.demo ? getYouTubeId(project.demo) : null;

  return (
    <PageShell>
      {/* ── Hero ── */}
      <section className="container-shell pb-10 pt-8 md:pb-14 md:pt-16">
        <div className="mb-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-text-dim transition-colors hover:text-text-muted"
            data-hover
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M12 7H2m0 0l4-4M2 7l4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            All projects
          </Link>
        </div>

        <div className="max-w-3xl">
          {project.event && (
            <div className="mb-4">
              <span className="rounded-full border border-border bg-bg-elevated px-3.5 py-1 text-xs font-semibold tracking-wide text-text-muted">
                {project.event}
              </span>
            </div>
          )}

          <h1 className="font-display text-4xl font-bold tracking-tight text-text md:text-6xl">
            {project.title}
          </h1>

          <p className="mt-4 text-lg leading-relaxed text-text-muted md:text-xl">
            {project.tagline}
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="tag-pill">
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                data-hover
                className="btn-glow inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white transition-all"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch Demo
              </a>
            )}
            {!project.demo &&
              project.href !== "#" &&
              project.href !== "/contact" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  data-hover
                  className="btn-glow inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white transition-all"
                >
                  {project.cta}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      d="M2 7h10m0 0L8 3m4 4L8 11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}
            {project.href === "/contact" && (
              <Link
                href="/contact"
                data-hover
                className="btn-glow inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-6 py-3 text-sm font-semibold text-white transition-all"
              >
                {project.cta}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                >
                  <path
                    d="M2 7h10m0 0L8 3m4 4L8 11"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-text-muted transition-all hover:border-border-hover hover:bg-bg-elevated/50 hover:text-text"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View Repository
              </a>
            )}
            {project.devpost && (
              <a
                href={project.devpost}
                target="_blank"
                rel="noreferrer"
                data-hover
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-semibold text-text-muted transition-all hover:border-border-hover hover:bg-bg-elevated/50 hover:text-text"
              >
                Devpost
              </a>
            )}
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="container-shell">
        <div className="glow-divider" />
      </div>

      {/* ── YouTube embed ── */}
      {youtubeId && (
        <section className="container-shell py-10 md:py-14">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl border border-border bg-bg-raised">
            <div className="relative aspect-video">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
                className="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${project.title} demo`}
              />
            </div>
          </div>
        </section>
      )}

      {/* ── Content ── */}
      <section className="section-spacing pt-4">
        <div className="container-shell">
          <div className="mx-auto max-w-3xl">
            <p className="mb-10 text-base leading-relaxed text-text-muted sm:text-lg">
              {project.description}
            </p>

            <div className="mb-6 flex items-center gap-2.5">
              <span className="dot-accent" />
              <h2 className="text-xs font-semibold uppercase tracking-widest text-text-muted">
                Key Highlights
              </h2>
            </div>

            <div className="space-y-4">
              {project.bullets.map((bullet, i) => (
                <div
                  key={i}
                  className="group/bullet flex gap-4 rounded-xl border border-border bg-bg-raised/50 p-5 transition-all duration-300 hover:border-border-hover hover:bg-bg-raised"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-accent/[0.15] bg-accent/[0.08] font-display text-xs font-bold text-accent transition-all group-hover/bullet:bg-accent/[0.12]">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-text-muted sm:text-base">
                    {bullet}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Next project */}
          <div className="mx-auto mt-16 max-w-3xl">
            <div className="glow-divider" />
            <div className="flex items-center justify-between pt-8">
              <div>
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
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="text-text-dim transition-all group-hover:translate-x-1 group-hover:text-text-muted"
                  >
                    <path
                      d="M4 10h12m0 0l-5-5m5 5l-5 5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
