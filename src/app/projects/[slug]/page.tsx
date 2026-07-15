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
      {/* ── Header ── */}
      <section className="container-shell pb-10 pt-10 md:pt-14">
        <Link
          href="/#projects"
          className="mono inline-flex items-center gap-2 text-xs text-text-dim transition-colors hover:text-text"
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path
              d="M12 7H2m0 0l4-4M2 7l4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          all projects
        </Link>

        <div className="mt-8 max-w-3xl">
          {project.event && (
            <p className="eyebrow mb-3">{project.event.toLowerCase()}</p>
          )}

          <h1 className="text-3xl font-semibold tracking-tight text-text md:text-4xl">
            {project.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-text-muted md:text-lg">
            {project.tagline}
          </p>

          <p className="mono mt-5 text-xs leading-relaxed text-text-dim">
            {project.tags.join(" · ")}
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className="btn-primary"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch demo
              </a>
            )}
            {!project.demo &&
              project.href !== "#" &&
              project.href !== "/#contact" && (
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary"
                >
                  {project.cta}
                </a>
              )}
            {project.href === "/#contact" && (
              <Link href="/#contact" className="btn-primary">
                {project.cta}
              </Link>
            )}
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Repository
              </a>
            )}
            {project.devpost && (
              <a
                href={project.devpost}
                target="_blank"
                rel="noreferrer"
                className="btn-ghost"
              >
                Devpost
              </a>
            )}
          </div>
        </div>
      </section>

      <div className="container-shell">
        <div className="hairline" />
      </div>

      {/* ── Media: demo video (project images stay on the cards only) ── */}
      {youtubeId && (
        <section className="container-shell py-10">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-xl border border-border bg-bg-raised">
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
      <section className="container-shell pb-16 pt-6 md:pb-20">
        <div className="mx-auto max-w-3xl">
          <p className="text-sm leading-relaxed text-text-muted md:text-base">
            {project.description}
          </p>

          <h2 className="mono mt-10 text-xs text-text-dim">highlights</h2>

          <ul className="mt-4 space-y-3">
            {project.bullets.map((bullet, i) => (
              <li
                key={i}
                className="card card-hover group flex gap-3.5 p-5 text-sm leading-relaxed text-text-muted"
              >
                <span className="mono shrink-0 text-xs tabular-nums text-text-dim transition-colors duration-200 group-hover:text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {bullet}
              </li>
            ))}
          </ul>

          {/* Next project */}
          <div className="hairline mt-14" />
          <div className="pt-7">
            <p className="mono text-xs text-text-dim">next project</p>
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group mt-2 inline-flex items-center gap-2.5"
            >
              <span className="text-lg font-semibold tracking-tight text-text-muted transition-colors group-hover:text-text md:text-xl">
                {nextProject.title}
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="text-text-dim transition-transform group-hover:translate-x-1"
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
      </section>
    </PageShell>
  );
}
