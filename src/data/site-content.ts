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
};

export const projects: Project[] = [
  {
    title: "Finora",
    slug: "finora",
    tagline: "Voice-first AI budgeting companion that makes financial decisions feel human",
    description:
      "Traditional budgeting tools are cold, rigid, and disconnected from the emotional reality of student life. Finora replaces guilt with conversation — a voice-first financial assistant powered by Claude Sonnet 4 that listens, sees, thinks, and helps students make real-time spending decisions with confidence instead of anxiety.",
    tags: ["React", "TypeScript", "Vite", "Supabase", "Claude API", "ElevenLabs", "Tailwind CSS"],
    bullets: [
      "Built a voice-first budgeting assistant where students speak naturally and receive empathetic, budget-aware guidance powered by Claude Sonnet 4 with ElevenLabs TTS — replacing rigid forms with real conversation.",
      "Implemented Finora Vision using Claude's computer vision to analyze photos of receipts, menus, and price tags, delivering instant affordability breakdowns against the user's live budget.",
      "Designed an Angel vs. Devil debate system that generates dual-perspective reasoning (emotional vs. logical) on any purchase, helping students pause, reflect, and make intentional spending decisions.",
      "Built a serverless backend on Supabase Edge Functions with voice-driven budget setup, smart expense tracking, and shareable spending reports — all orchestrated through natural language.",
    ],
    cta: "Watch the demo",
    href: "https://youtu.be/zAN5Ru6b67E",
    event: "Anthropic Hackathon",
  },
  {
    title: "Auri",
    slug: "auri",
    tagline: "Conversational AI agent for end-to-end hotel guest interactions",
    description:
      "The brief was to build the next generation of human–computer interaction. We built Auri: a conversational AI agent that manages end-to-end guest interactions — check-in, ID verification, payments, and in-stay requests — with multilingual support across emails, kiosks, calls, and messaging. We delivered and demoed a working POC.",
    tags: ["React", "Tailwind", "WebSockets", "ElevenLabs"],
    bullets: [
      "Built a conversational AI agent that adds a new dimension to hospitality — guests simply talk, and the agent handles check-in, ID verification, payments, and in-stay requests end-to-end.",
      "Implemented multilingual support across multiple mediums including emails, kiosks, phone calls, and messaging for seamless guest communication.",
      "Delivered a real-time audio pipeline using WebSockets to stream speech to the LLM and back with under 500ms latency, and demoed a working proof of concept.",
    ],
    cta: "Visit the site",
    href: "https://loud-tweak-592173.framer.app/",
    event: "TechTO Hackathon — Finalist",
  },
  {
    title: "TD Threat Denied",
    slug: "td-threat-denied",
    tagline: "Zero-friction email phishing verification powered by a 6-agent AI pipeline",
    description:
      "The problem with phishing isn't a lack of security — it's a lack of instant verification. Users forward any suspicious email and receive a verdict (FRAUD, LEGITIMATE, or UNDER REVIEW) in under 30 seconds. Six specialized AI agents analyze sender authenticity, URL forensics, social engineering patterns, template matching, and known campaigns before a managing agent renders the final verdict.",
    tags: ["Python", "FastAPI", "Next.js", "Claude API", "SendGrid", "SQLAlchemy", "SQLite"],
    bullets: [
      "Built an email-native phishing verification system — users forward suspicious emails and receive a clear verdict in under 30 seconds, eliminating the instinct to click risky links to check legitimacy.",
      "Designed a 6-agent AI pipeline where five specialist agents (sender check, URL forensics, content analysis, template matching, campaign matching) feed structured reports into a managing agent that renders a weighted verdict with a confidence score.",
      "Engineered the inbound email infrastructure using SendGrid Inbound Parse with custom MX records and a FastAPI backend, including a custom parser to extract original sender data from forwarded Gmail headers.",
      "Built an analyst review dashboard in Next.js for low-confidence cases, allowing human analysts to review AI reasoning, override verdicts, and trigger replies manually via Gmail SMTP.",
    ],
    cta: "Watch the demo",
    href: "https://www.youtube.com/watch?v=H3lH_ozz0hU",
    event: "GenAI Genesis Hackathon",
  },
  {
    title: "DurhamOne Canada",
    slug: "durhamone",
    tagline: "Full-stack website and admin platform for a real client",
    description:
      "Built through UofT Web Dev Club for DurhamOne Canada. A full-stack website with dynamic embeds, scalable asset storage on Cloudflare R2, and an authenticated admin portal with CRUD operations for content management.",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Cloudflare R2"],
    bullets: [
      "Building a full-stack website for DurhamOne Canada using Next.js, Prisma, and PostgreSQL, including dynamic embeds and scalable asset storage via Cloudflare R2.",
      "Developed authenticated admin portal with CRUD operations for content management, integrating Canva and Instagram APIs for dynamic updates.",
    ],
    cta: "Get in touch",
    href: "/contact",
    event: "UofT Web Dev Club",
  },
  {
    title: "Weather2Wear",
    slug: "weather2wear",
    tagline: "Weather-based outfit recommendation application",
    description:
      "An application that integrates real-time and multi-day weather forecasts from external APIs to generate clothing recommendations based on temperature, precipitation, and wind conditions.",
    tags: ["Java"],
    bullets: [
      "Developed a weather-driven outfit recommendation application by integrating real-time and multi-day forecasts from external weather APIs.",
      "Generated clothing suggestions based on temperature, precipitation, and wind conditions to help users dress appropriately.",
    ],
    cta: "View project",
    href: "#",
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
    tags: ["Competitor Analysis", "SWOT/VRIO", "Go-to-Market Strategy", "Financial Modeling"],
  },
  {
    title: "National Case Competition",
    role: "Delegate — \"The Ridge Reset\" Strategy",
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
    period: "May 2025 — Present",
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
  {
    school: "Collège Notre Dame De Jamhour",
    degree: "High School Diploma — Mathematics & Economics",
    period: "Graduated Jun 2024",
    details: ["First Prize for Academic Excellence"],
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
    title: "Web Developer",
    role: "Web Developer",
    org: "UofT Web Dev Club",
    period: "Sep 2025 — Present",
    bullets: [
      "Building full-stack client projects with a student dev team using Next.js, Prisma, and PostgreSQL.",
    ],
  },
  {
    title: "Co-Founder & Project Lead",
    role: "Co-Founder & Project Lead",
    org: "The Young Readers Society",
    period: "Jun 2023 — Aug 2024",
    bullets: [
      "Co-founded a nonprofit distributing 5,000+ books; developed inventory tracking systems for 20+ volunteers and was featured on national television.",
    ],
  },
];

// ─── Skills ───

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Java", "Python", "TypeScript", "JavaScript", "SQL", "R"],
  },
  {
    title: "Frameworks",
    skills: ["React", "Next.js", "FastAPI", "Flask", "Tailwind CSS", "Spring Boot"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "Docker", "Supabase", "PostgreSQL", "Postman", "PowerBI", "Figma"],
  },
];

// ─── Stats ───

export const heroStats = [
  { value: "3.87", label: "CGPA" },
  { value: "100K+", label: "Transactions Processed" },
  { value: "5,000+", label: "Books Distributed" },
];

// ─── Social ───

export const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/in/carlgergi" },
  { label: "GitHub", href: "https://github.com/CarlGergi" },
  { label: "Email", href: "mailto:carlgergi@outlook.com" },
  { label: "Phone", href: "tel:+16477186560" },
];
