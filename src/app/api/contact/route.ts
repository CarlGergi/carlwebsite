import { NextResponse } from "next/server";
import { Resend } from "resend";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LIMITS = {
  name: 100,
  email: 200,
  subject: 150,
  message: 5000,
};

const MIN_FILL_MS = 2000;

const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const ipHits = new Map<string, number[]>();

function rateLimit(ip: string) {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (ipHits.get(ip) ?? []).filter((t) => t > windowStart);
  if (hits.length >= RATE_LIMIT_MAX) {
    ipHits.set(ip, hits);
    return false;
  }
  hits.push(now);
  ipHits.set(ip, hits);
  if (ipHits.size > 5000) {
    for (const [k, v] of ipHits) {
      const filtered = v.filter((t) => t > windowStart);
      if (filtered.length === 0) ipHits.delete(k);
      else ipHits.set(k, filtered);
    }
  }
  return true;
}

export async function POST(req: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("Contact form: RESEND_API_KEY is not set.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (!rateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let payload: {
    name?: string;
    email?: string;
    subject?: string;
    message?: string;
    website?: string;
    loadedAt?: number;
  };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  if (
    typeof payload.loadedAt === "number" &&
    Date.now() - payload.loadedAt < MIN_FILL_MS
  ) {
    return NextResponse.json({ success: true });
  }

  const name = payload.name?.toString().trim();
  const email = payload.email?.toString().trim();
  const subject = payload.subject?.toString().trim() || "New message";
  const message = payload.message?.toString().trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 },
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (
    name.length > LIMITS.name ||
    email.length > LIMITS.email ||
    subject.length > LIMITS.subject ||
    message.length > LIMITS.message
  ) {
    return NextResponse.json(
      { error: "Submission too long." },
      { status: 400 },
    );
  }

  const resend = new Resend(apiKey);
  const { data, error } = await resend.emails.send({
    from: "Contact Form <onboarding@resend.dev>",
    to: "carlgergi@outlook.com",
    subject: `[Portfolio] ${subject} — from ${name}`,
    replyTo: email,
    html: `
      <h2>New message from your portfolio</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Subject:</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
    `,
  });

  if (error) {
    console.error("Contact form: Resend error", error);
    return NextResponse.json(
      { error: error.message ?? "Failed to send message." },
      { status: 502 },
    );
  }

  return NextResponse.json({ success: true, id: data?.id });
}
