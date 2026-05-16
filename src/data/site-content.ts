// ─── Projects (Dev / Product) ───

export type Project = {
  title: string;
  slug: string;
  tagline: string;
  description: string;
  tags: string[];
  bullets: string[];
  cta: string;
  href: string;
  event?: string;
  repo?: string;
  demo?: string;
  devpost?: string;
  image?: string;
  gradient: string;
};

export const projects: Project[] = [
  {
    title: "Argus",
    slug: "argus",
    tagline:
      "An intelligence service of one — a multi-agent pipeline that files a 90-second competitive briefing to your inbox every morning",
    description:
      "Most competitive intelligence is a tab you forget to open. Argus is the opposite — a self-hosted, single-user system that wakes up every morning, researches your tracked competitors across nine source types, and delivers a newsroom-style briefing before you've finished coffee. A ten-minute onboarding builds a \"company brain\" (ICP, strategic bets, weaknesses), and from then on an eight-stage pipeline runs autonomously: collect → extract → pattern-detect → score for salience → draft → critique → write → deliver.",
    tags: [
      "Next.js 15",
      "React 19",
      "FastAPI",
      "Postgres",
      "pgvector",
      "Claude API",
      "OpenAI Embeddings",
      "Playwright",
      "Resend",
    ],
    bullets: [
      "Designed an eight-stage autonomous pipeline that pulls fresh content nightly from careers pages, press releases, GitHub, news, SEC filings, Reddit/HN, app stores, Product Hunt, and Wayback diffs — deduplicated at the DB layer via content hashing so daily runs settle to about a minute.",
      "Orchestrated five Claude tiers per their strengths — Haiku for high-volume signal extraction, Sonnet for cross-time pattern detection over a rolling 180-day window, and Opus for a strategist/adversarial-critic pair that drafts and prunes brief items before the final writer composes prose.",
      "Built a salience engine that embeds every signal and scores it against the company brain via cosine similarity, plus a weekly Learning Agent that ingests per-item feedback (useful / noise / wrong / missed) and adjusts the weights so the briefing sharpens over time.",
      "Shipped the full product surface end-to-end: onboarding chat, daily brief, historical archive, an Ask-Argus chat over signals + briefs + brain, settings to edit the brain and watchlist, plus the FastAPI + APScheduler worker and Resend delivery layer.",
    ],
    cta: "View on GitHub",
    href: "https://github.com/CarlGergi/ArgusAI",
    event: "Personal Project",
    repo: "https://github.com/CarlGergi/ArgusAI",
    gradient:
      "linear-gradient(135deg, #0b1220 0%, #1e293b 30%, #334155 60%, #0f172a 100%)",
  },
  {
    title: "Finora",
    slug: "finora",
    tagline:
      "A voice-first AI budgeting companion that replaces guilt with genuine conversation",
    description:
      "Budgeting apps talk at you. Finora talks with you. Built at the Anthropic Hackathon, Finora is a voice-first financial assistant powered by Claude Sonnet 4 that listens to how students actually spend, sees receipts through computer vision, and helps make real-time spending decisions — with empathy instead of judgment. Students don't need another spreadsheet. They need a conversation.",
    tags: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "Claude API",
      "ElevenLabs",
      "Tailwind CSS",
    ],
    bullets: [
      "Built a voice-first budgeting assistant where students speak naturally and receive empathetic, budget-aware guidance powered by Claude Sonnet 4 with ElevenLabs TTS — replacing rigid forms with real conversation.",
      "Implemented Finora Vision using Claude's computer vision to analyze photos of receipts, menus, and price tags, delivering instant affordability breakdowns against the user's live budget.",
      "Designed an Angel vs. Devil debate system that generates dual-perspective reasoning (emotional vs. logical) on any purchase, helping students pause, reflect, and make intentional spending decisions.",
      "Built a serverless backend on Supabase Edge Functions with voice-driven budget setup, smart expense tracking, and shareable spending reports — all orchestrated through natural language.",
    ],
    cta: "Watch the demo",
    href: "https://youtu.be/zAN5Ru6b67E",
    event: "Anthropic Hackathon",
    repo: "https://github.com/CarlGergi/anthropichackaton",
    demo: "https://youtu.be/zAN5Ru6b67E",
    devpost: "https://devpost.com/software/finora-ifouqv",
    image: "https://img.youtube.com/vi/zAN5Ru6b67E/maxresdefault.jpg",
    gradient:
      "linear-gradient(135deg, #0f172a 0%, #1e1b4b 35%, #312e81 65%, #1e3a5f 100%)",
  },
  {
    title: "TD Threat Denied",
    slug: "td-threat-denied",
    tagline:
      "A 6-agent AI pipeline that verdicts phishing emails in under 30 seconds — no clicks, no risk",
    description:
      "The instinct when you get a suspicious email is to click and check. That's exactly what attackers want. TD Threat Denied flips the model: forward any suspicious email, and six specialized AI agents — sender authentication, URL forensics, social engineering analysis, template matching, and campaign detection — deliver a verdict before you ever touch a link.",
    tags: [
      "Python",
      "FastAPI",
      "Next.js",
      "Claude API",
      "SendGrid",
      "SQLAlchemy",
      "SQLite",
    ],
    bullets: [
      "Built an email-native phishing verification system — users forward suspicious emails and receive a clear verdict in under 30 seconds, eliminating the instinct to click risky links to check legitimacy.",
      "Designed a 6-agent AI pipeline where five specialist agents (sender check, URL forensics, content analysis, template matching, campaign matching) feed structured reports into a managing agent that renders a weighted verdict with a confidence score.",
      "Engineered the inbound email infrastructure using SendGrid Inbound Parse with custom MX records and a FastAPI backend, including a custom parser to extract original sender data from forwarded Gmail headers.",
      "Built an analyst review dashboard in Next.js for low-confidence cases, allowing human analysts to review AI reasoning, override verdicts, and trigger replies manually via Gmail SMTP.",
    ],
    cta: "Watch the demo",
    href: "https://www.youtube.com/watch?v=H3lH_ozz0hU",
    event: "GenAI Genesis Hackathon",
    repo: "https://github.com/tabetant/threatdenied",
    demo: "https://www.youtube.com/watch?v=H3lH_ozz0hU",
    devpost: "https://devpost.com/software/td-threat-denied",
    image: "https://img.youtube.com/vi/H3lH_ozz0hU/maxresdefault.jpg",
    gradient:
      "linear-gradient(135deg, #1c1917 0%, #7f1d1d 30%, #b45309 60%, #292524 100%)",
  },
  {
    title: "Auri",
    slug: "auri",
    tagline:
      "A conversational AI concierge that reimagines the hotel guest experience from check-in to checkout",
    description:
      "What if checking into a hotel felt like talking to a friend? Auri is a conversational AI agent that manages the entire guest journey — check-in, ID verification, payments, and room requests — across emails, kiosks, calls, and messaging. Built for the TechTO Hackathon, where we delivered a working POC with sub-500ms voice latency and were selected as finalists.",
    tags: ["React", "TypeScript", "Vite", "ElevenLabs", "Tailwind CSS", "WebSockets"],
    bullets: [
      "Built a conversational AI agent that adds a new dimension to hospitality — guests simply talk, and the agent handles check-in, ID verification, payments, and in-stay requests end-to-end.",
      "Implemented multilingual support across multiple mediums including emails, kiosks, phone calls, and messaging for seamless guest communication.",
      "Delivered a real-time audio pipeline using WebSockets to stream speech to the LLM and back with under 500ms latency, and demoed a working proof of concept.",
    ],
    cta: "Visit the site",
    href: "https://loud-tweak-592173.framer.app/",
    event: "TechTO Hackathon — Finalist",
    repo: "https://github.com/CarlGergi/auri",
    gradient:
      "linear-gradient(135deg, #022c22 0%, #064e3b 35%, #0d9488 65%, #134e4a 100%)",
  },
  {
    title: "DurhamOne Canada",
    slug: "durhamone",
    tagline:
      "A full-stack platform with dynamic content management, built for a real nonprofit client",
    description:
      "DurhamONE is a youth-focused nonprofit serving the Durham Region whose mission is to empower youth and families through accessible programs, community events, and spaces. Their existing site was built on WordPress — outdated, not mobile-responsive, and not Francophone-ready. Through UofT's Web Development Club, our team built a full redesign: a modern Next.js platform with six public pages, an authenticated admin portal, social and document embeds, and Vercel deployment at durham1.ca.",
    tags: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "Neon",
      "NextAuth.js",
      "UploadThing",
      "Emotion",
      "Ionicons",
      "Vercel",
    ],
    bullets: [
      "Built a full site redesign and SSR platform via Next.js for a youth nonprofit, replacing an outdated WordPress site with a modern, Francophone-ready responsive UI.",
      "Developed an auth-protected admin CRUD portal for non-technical staff to manage content, with Canva and Instagram API integrations for dynamic social and document embeds.",
      "Engineered file uploads with UploadThing and deployed the platform on Vercel at durham1.ca across six public pages: Home, Events, About Us, Partners, Reports, and Social.",
    ],
    cta: "Get in touch",
    href: "/contact",
    event: "UofT Web Dev Club",
    gradient:
      "linear-gradient(135deg, #052e16 0%, #166534 35%, #15803d 65%, #0f172a 100%)",
  },
  {
    title: "Weather2Wear",
    slug: "weather2wear",
    tagline:
      "An intelligent outfit recommendation engine driven by real-time weather data",
    description:
      "Built as a team project for CSC207 (Software Design) at the University of Toronto. Weather2Wear bridges the gap between your weather app and your wardrobe — it pulls real-time and multi-day forecasts from external APIs, then generates contextual clothing recommendations based on temperature, precipitation, and wind conditions.",
    tags: ["Java"],
    event: "CSC207 — UofT",
    bullets: [
      "Developed a weather-driven outfit recommendation application by integrating real-time and multi-day forecasts from external weather APIs.",
      "Generated clothing suggestions based on temperature, precipitation, and wind conditions to help users dress appropriately.",
    ],
    cta: "View project",
    href: "#",
    repo: "https://github.com/Sketchy2/team-project-CSC207",
    gradient:
      "linear-gradient(135deg, #0c1445 0%, #1e3a8a 35%, #3b82f6 65%, #1e293b 100%)",
  },
];

// ─── Strategy & Analysis ───

export type StrategyItem = {
  title: string;
  role: string;
  org: string;
  period: string;
  location: string;
  description: string;
  bullets: string[];
  tags: string[];
};

export const strategyItems: StrategyItem[] = [
  {
    title: "Management Consulting",
    role: "Student Consultant",
    org: "Viridian Management Consulting",
    period: "Sep 2025 — Present",
    location: "Toronto, ON",
    description:
      "Student consulting group at UofT that works with real clients on market analysis, competitive strategy, and go-to-market planning.",
    bullets: [
      "Spearheaded a Competitor Benchmark Analysis for a new product launch, evaluating 7 major market competitors across pricing, marketing tactics, and distribution channels.",
      "Conducted SWOT and VRIO analyses, utilizing statistical hypothesis testing and standard deviation to isolate market gaps, project ROI, and define highly targeted primary/secondary markets.",
      "Co-authored an executive presentation and go-to-market report, detailing a 5-year implementation timeline, KPI tracking, and a comprehensive Risk Scoring Matrix to mitigate internal/external launch threats.",
    ],
    tags: [
      "Competitor Analysis",
      "SWOT/VRIO",
      "Go-to-Market Strategy",
      "Financial Modeling",
    ],
  },
  {
    title: "National Case Competition",
    role: 'Delegate — "The Ridge Reset" Strategy',
    org: "NCC25 — Over the Ridge Roasters",
    period: "May 2025",
    location: "Toronto, ON",
    description:
      "National case competition focused on developing a sustainability plan for a specialty coffee roaster. Our team addressed packaging waste, carbon emissions, supply chain transparency, and Gen Z engagement with detailed financial projections.",
    bullets: [
      "Developed a branded sustainability plan targeting packaging waste, carbon emissions, supply chain transparency, and Gen Z engagement.",
      "Designed core initiatives: QR-code-enabled direct trade (40% target by Year 2), compostable/refillable packaging, and Typhoon T-7 energy-efficient roasters.",
      "Delivered a 10-minute executive pitch with financial modeling, projecting 85% waste reduction, 50% emissions cut, and 100,000+ trees planted within 3 years.",
    ],
    tags: ["Sustainability", "Financial Modeling", "Pitching"],
  },
  {
    title: "Business & Entrepreneurship",
    role: "Participant — CTO of EcoBin+",
    org: "Oxford University Summer Program",
    period: "Jul 2023",
    location: "Oxford, UK",
    description:
      "Two-week intensive at Oxford focused on startup strategy, product development, and market analysis. Served as CTO in a 3-person team developing EcoBin+, and presented a full business proposal to a faculty review panel.",
    bullets: [
      "Completed a two-week intensive program focused on startup strategy, product development, and market analysis.",
      "Served as CTO in a 3-person team that developed EcoBin+, a smart recycling bin using AI and IoT for automated waste identification and sorting.",
      "Led technical design, pricing strategy, and implementation planning; presented a full business proposal including SWOT, PESTLE, and £1M funding breakdown to a faculty review panel.",
    ],
    tags: ["Startups", "Product Strategy", "Business Planning"],
  },
];

// ─── Professional Experience ───

export type Experience = {
  title: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  tags: string[];
};

export const experiences: Experience[] = [
  {
    title: "Turnkey Systems",
    role: "Software Engineering Intern",
    period: "May 2025 — Aug 2025",
    location: "Beirut, Lebanon",
    bullets: [
      "Reduced financial reporting time by 60% by developing an NLP-powered chatbot (spaCy, Flask) that processes natural-language queries over 100K+ client transactions.",
      "Built a Python backend with PostgreSQL integration using SQLAlchemy, enabling intent-based filtering and automated transaction summarization.",
      "Built a React-based dashboard allowing non-technical teams to retrieve financial insights in under 3 seconds, driving strong cross-team adoption.",
    ],
    tags: ["Python", "PostgreSQL", "React", "NLP", "Flask"],
  },
  {
    title: "Expertise France",
    role: "Project Support Intern",
    period: "Mar 2024",
    location: "Beirut, Lebanon",
    bullets: [
      "Collaborated with engineering team on web platform redesign, delivering 15+ Figma wireframes and defining component architecture to streamline frontend implementation.",
      "Reduced design-to-dev handoff time by 30% through standardized technical documentation and Agile workflows.",
    ],
    tags: ["Figma", "UI/UX", "Agile", "Documentation"],
  },
];

// ─── Education ───

export type Education = {
  school: string;
  degree: string;
  period: string;
  details: string[];
};

export const education: Education[] = [
  {
    school: "University of Toronto",
    degree: "B.Sc. Double Major in Computer Science and Economics — AI Focus",
    period: "2024 — 2028 (Expected)",
    details: [
      "CGPA: 3.87 — Dean's List Scholar (2024–2025)",
      "Coursework: Data Structures & Algorithms, Software Design, OOP, Theory of Computation, Computer Organization, Discrete Mathematics, Microeconomics, Macroeconomics",
    ],
  },
];

// ─── Leadership & Activities ───

export type Activity = {
  title: string;
  role: string;
  org: string;
  period: string;
  bullets: string[];
};

export const activities: Activity[] = [
  {
    title: "Student Consultant",
    role: "Student Consultant",
    org: "Viridian Management Consulting",
    period: "Sep 2025 — Present",
    bullets: [
      "Working on client engagements involving competitor analysis, market sizing, and go-to-market strategy with a student consulting team.",
    ],
  },
  {
    title: "Web Developer",
    role: "Web Developer",
    org: "UofT Web Dev Club",
    period: "Sep 2025 — Present",
    bullets: [
      "Building full-stack client projects with a student dev team using Next.js, Prisma, and PostgreSQL.",
    ],
  },
  {
    title: "The Young Readers Society",
    role: "Member",
    org: "The Young Readers Society",
    period: "Jun 2023 — Aug 2024",
    bullets: [
      "Part of a nonprofit that distributed 5,000+ books to underserved communities, helping coordinate inventory tracking for 20+ volunteers. The initiative was featured on national television.",
    ],
  },
];

// ─── Club Memberships ───

export const clubs = [
  "Viridian Management Consulting",
  "UofT Web Dev Club",
  "Claude Builder Club",
  "Lebanese Student Association",
];

// ─── Skills ───

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Java", "Python", "C++", "TypeScript", "JavaScript", "SQL", "R"],
  },
  {
    title: "Frameworks",
    skills: [
      "React",
      "Next.js",
      "FastAPI",
      "Flask",
      "Tailwind CSS",
      "Spring Boot",
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      "Git",
      "Docker",
      "Supabase",
      "PostgreSQL",
      "Postman",
      "PowerBI",
      "Figma",
    ],
  },
];


// ─── Social ───

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/carlgergi" },
  { label: "GitHub", href: "https://github.com/CarlGergi" },
  { label: "Email", href: "mailto:carlgergi@outlook.com" },
  { label: "Phone", href: "tel:+16477186560" },
];
