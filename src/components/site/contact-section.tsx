"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { socialLinks } from "@/data/site-content";
import { MessageDust } from "@/components/ui/message-dust";
import { Section } from "@/components/site/section";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const loadedAt = useRef<number>(0);

  // Stamped after mount — used by the API's minimum-fill-time spam check
  useEffect(() => {
    loadedAt.current = Date.now();
  }, []);

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
      website: fd.get("website"),
      loadedAt: loadedAt.current,
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
    <Section
      id="contact"
      title="Contact"
      description="An internship, a project, a hackathon team, or just a good conversation — I'd like to hear about it."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        {/* Left — the visitor's message, mirrored in dust as they type */}
        <ScrollReveal>
          <div>
            <MessageDust text={message} sent={status === "sent"} />

            <a
              href="mailto:carlgergi@outlook.com"
              className="btn-ghost mt-8"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              carlgergi@outlook.com
            </a>

            <div className="mt-4 flex flex-wrap gap-2.5">
              {socialLinks
                .filter((link) => link.label !== "Email")
                .map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="btn-pill"
                >
                  {link.label}
                </a>
                ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Right — form */}
        <ScrollReveal delay={0.1}>
          <form onSubmit={handleSubmit} className="card p-6 md:p-7">
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-10000px",
                top: "auto",
                width: "1px",
                height: "1px",
                overflow: "hidden",
              }}
            >
              <label>
                Website
                <input
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  defaultValue=""
                />
              </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-text-muted">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={100}
                  placeholder="Your name"
                  className="field"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-medium text-text-muted">
                  Email
                </span>
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={200}
                  placeholder="you@company.com"
                  className="field"
                />
              </label>
            </div>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-text-muted">
                What&apos;s this about?
              </span>
              <select name="subject" className="field">
                <option>Internship opportunity</option>
                <option>Project collaboration</option>
                <option>Hackathon team</option>
                <option>Just saying hi</option>
              </select>
            </label>

            <label className="mt-4 block">
              <span className="mb-1.5 block text-xs font-medium text-text-muted">
                Message
              </span>
              <textarea
                name="message"
                rows={5}
                required
                maxLength={5000}
                placeholder="Tell me about the opportunity or idea..."
                className="field resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="btn-primary mt-6 w-full justify-center disabled:opacity-60"
            >
              {status === "sending" ? "Sending..." : "Send message"}
            </button>

            {/* Persistent live region so screen readers announce the result;
                spacing only appears when a message renders */}
            <div
              aria-live="polite"
              aria-atomic="true"
              className="text-center text-sm font-medium"
            >
              {status === "sent" && (
                <span className="mt-3 block text-text">
                  Message sent — I&apos;ll get back to you soon.
                </span>
              )}
              {status === "error" && (
                <span className="mt-3 block text-text">
                  {errorMessage
                    ? `${errorMessage} — try emailing me directly.`
                    : "Couldn't send — try emailing me directly."}
                </span>
              )}
            </div>
          </form>
        </ScrollReveal>
      </div>
    </Section>
  );
}
