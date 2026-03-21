import Link from "next/link";

export function Footer() {
  return (
    <footer className="container-shell pb-12 pt-8">
      <div className="glow-divider mb-8" />
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="dot-accent" />
          <p className="text-sm text-text-dim">
            Carl Gergi &mdash; Toronto, Canada
          </p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {[
            ["About", "/about"],
            ["Projects", "/projects"],
            ["Consulting", "/consulting"],
            ["Experience", "/experience"],
            ["Contact", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="link-hover text-text-muted transition-colors hover:text-text"
              data-hover
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
