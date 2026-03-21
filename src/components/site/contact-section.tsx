"use client";

import { socialLinks } from "@/data/site-content";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function ContactSection() {
  return (
    <section className="section-spacing">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left */}
          <ScrollReveal>
            <div>
              <p className="font-display text-2xl font-bold leading-snug tracking-tight text-text sm:text-3xl md:text-5xl">
                Let&apos;s
                <br />
                <span className="gradient-text">connect.</span>
              </p>

              <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">
                Whether it&apos;s an internship, a project, a hackathon team,
                or just an interesting conversation — I&apos;d love to hear
                from you. Reach out through the form or email me directly.
              </p>

              <a
                href="mailto:carlgergi@outlook.com"
                data-hover
                className="btn-glow mt-8 inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-8 py-4 text-sm font-semibold text-white transition-all hover:shadow-lg"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                carlgergi@outlook.com
              </a>

              <div className="mt-8 flex flex-wrap gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={
                      link.href.startsWith("http") ? "_blank" : undefined
                    }
                    rel={
                      link.href.startsWith("http") ? "noreferrer" : undefined
                    }
                    data-hover
                    className="tag-pill"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Right - form */}
          <ScrollReveal delay={0.2}>
            <div className="gradient-border card p-6 md:p-8">
              <form>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-text">
                      Name
                    </span>
                    <input
                      type="text"
                      placeholder="Your name"
                      className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-dim outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-text">
                      Email
                    </span>
                    <input
                      type="email"
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-dim outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                    />
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="mb-1.5 block text-sm font-medium text-text">
                    What&apos;s this about?
                  </span>
                  <select className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10">
                    <option>Internship opportunity</option>
                    <option>Project collaboration</option>
                    <option>Hackathon team</option>
                    <option>Just saying hi</option>
                  </select>
                </label>

                <label className="mt-4 block">
                  <span className="mb-1.5 block text-sm font-medium text-text">
                    Message
                  </span>
                  <textarea
                    rows={5}
                    placeholder="Tell me about the opportunity or idea..."
                    className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-dim outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                  />
                </label>

                <button
                  type="submit"
                  data-hover
                  className="btn-glow mt-6 w-full rounded-xl bg-gradient-to-r from-accent to-accent-cyan py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg"
                >
                  Send message
                </button>
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
