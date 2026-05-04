"use client";

import { useState, type FormEvent } from "react";
import { socialLinks } from "@/data/site-content";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage(null);

    const form = e.currentTarget;
    const fd = new FormData(form);
    const body = {
      name: fd.get("name"),
      email: fd.get("email"),
      subject: fd.get("subject"),
      message: fd.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = (await res.json().catch(() => null)) as
        | { success?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.success) {
        setErrorMessage(data?.error ?? "Request failed");
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage("Network error — please try again.");
      setStatus("error");
    }
  }

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
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-text">
                      Name
                    </span>
                    <input
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-dim outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1.5 block text-sm font-medium text-text">
                      Email
                    </span>
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-dim outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                    />
                  </label>
                </div>

                <label className="mt-4 block">
                  <span className="mb-1.5 block text-sm font-medium text-text">
                    What&apos;s this about?
                  </span>
                  <select
                    name="subject"
                    className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                  >
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
                    name="message"
                    rows={5}
                    required
                    placeholder="Tell me about the opportunity or idea..."
                    className="w-full resize-none rounded-xl border border-border bg-bg px-4 py-3 text-sm text-text placeholder:text-text-dim outline-none transition-all focus:border-accent focus:ring-2 focus:ring-accent/10"
                  />
                </label>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  data-hover
                  className="btn-glow mt-6 w-full rounded-xl bg-gradient-to-r from-accent to-accent-cyan py-3.5 text-sm font-semibold text-white transition-all hover:shadow-lg disabled:opacity-60"
                >
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>

                {status === "sent" && (
                  <p className="mt-3 text-center text-sm font-medium text-green-400">
                    Message sent — I&apos;ll get back to you soon!
                  </p>
                )}
                {status === "error" && (
                  <p className="mt-3 text-center text-sm font-medium text-red-400">
                    {errorMessage ?? "Something went wrong."} Try emailing me
                    directly.
                  </p>
                )}
              </form>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
