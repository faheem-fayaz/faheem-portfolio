```
import { useState, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  Copy,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Menu,
  Minus,
  Terminal,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Toaster } from "@/components/ui/sonner";
import { projects } from "@/lib/portfolioData";

const RESUME_URL =
  "https://customer-assets-m6fa6gv7.emergentagent.net/job_ff8d6c68-9a76-4291-8388-915dbb0caa7d/artifacts/h4ahs5ze_Resume%20%282%29.pdf";
const EMAIL = "faheemmfayazz@gmail.com";

const experience = [
  {
    index: "01",
    company: "BalanX Bio",
    role: "Software Development Intern",
    period: "Nov 2025 — Jun 2026",
    summary:
      "Backend systems for authentication, AI ingestion, health data, and connected-device workflows.",
    details: [
      "Built APIs with TypeScript, Node.js, Express.js, and Prisma across core product workflows.",
      "Implemented an AI gateway and emotion-ingestion flows with validation, timeout handling, and structured errors.",
      "Developed verification workflows and health-summary APIs, plus a Next.js internal dashboard with Git/GitHub integration.",
    ],
    stack: ["TypeScript", "Node.js", "Express", "Prisma", "Next.js"],
  },
  {
    index: "02",
    company: "Almuqeet Systems",
    role: "Software Development Intern",
    period: "Sep 2025 — Oct 2025",
    summary:
      "A secure library management system designed around clear roles, reliable data, and validated APIs.",
    details: [
      "Developed a Library Management System with C#, ASP.NET Core MVC, and SQL Server.",
      "Implemented role-based admin and user modules with authentication and 12+ secured endpoints.",
      "Designed normalized relational structures, automated workflows, and validated API behavior with Postman.",
    ],
    stack: ["C#", "ASP.NET Core", "SQL Server", "Postman"],
  },
];

const skillGroups = [
  { label: "LANGUAGES", items: ["Python", "TypeScript", "Java", "C#", "SQL"] },
  { label: "BACKEND", items: ["FastAPI", "Node.js", "Express.js", "Spring Boot", "ASP.NET Core MVC"] },
  { label: "DATA", items: ["PostgreSQL", "MySQL", "SQL Server", "Prisma", "Dapper"] },
  { label: "SECURITY + AI", items: ["JWT", "RBAC", "2FA / OTP", "AI API Integration", "Async Processing"] },
  { label: "TOOLS", items: ["Git", "GitHub", "Docker", "Postman", "VS Code"] },
];

type TerminalLine = { command: string; output: string[] };

const terminalResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  faheem --contact       Open an email draft",
    "  faheem --architecture  Show engineering focus",
    "  curl /api/v1/resume    Return profile snapshot",
    "  clear                  Clear command history",
    "Natural language also works: show my work, what do you use, contact me",
  ],
  "faheem --architecture": [
    "focus = [REST APIs, auth systems, AI integrations]",
    "principles = [explicit contracts, secure defaults, observable failures]",
    "stack = [Python, TypeScript, Java, C#]",
  ],
  "curl /api/v1/resume": [
    '{ "name": "Faheem Fayaz",',
    '  "role": "Backend Developer",',
    '  "location": "Srinagar, India",',
    '  "status": "open to opportunities" }',
  ],
};

const terminalSectionRoutes: Array<{ keywords: string[]; section: string; label: string }> = [
  { keywords: ["project", "projects", "work", "creator", "library", "hostel", "show my work", "what have you built", "your projects"], section: "work", label: "selected systems" },
  { keywords: ["skill", "skills", "stack", "technology", "technologies", "what do you use", "tech stack", "tools"], section: "skills", label: "technical range" },
  { keywords: ["experience", "internship", "career", "where did you work", "background"], section: "experience", label: "impact log" },
  { keywords: ["about", "philosophy", "tell me about yourself", "who are you"], section: "about", label: "engineering point of view" },
  { keywords: ["resume", "cv", "download resume", "see your resume"], section: "resume", label: "resume" },
  { keywords: ["contact", "email", "how can i contact you", "contact me", "send email"], section: "contact", label: "open channel" },
];

const navItems = [
  ["01", "About", "about"],
  ["02", "Experience", "experience"],
  ["03", "Work", "work"],
  ["04", "Contact", "contact"],
];

function scrollToSection(id: string, closeMenu?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  closeMenu?.();
}

function TerminalWidget() {
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<TerminalLine[]>([]);

  const runCommand = (rawCommand: string) => {
    const nextCommand = rawCommand.trim().toLowerCase();
    if (!nextCommand) return;
    if (nextCommand === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }
    if (nextCommand === "faheem --contact") {
window.location.href =
  "mailto:" +
  EMAIL +
  "?subject=Opportunity%20to%20work%20together&body=Hi%20Faheem%2C%0A%0AI%27d%20like%20to%20connect%20about...";
    }
    const matchedRoute = terminalSectionRoutes.find(({ keywords }) => keywords.some((keyword) => nextCommand.includes(keyword)));
    const output = terminalResponses[nextCommand] ?? (matchedRoute
      ? [`navigating to #${matchedRoute.section}`, `loaded: ${matchedRoute.label}`]
      : [
          `command not found: ${nextCommand}`,
          "try `help` to see the available commands",
        ]);
    setHistory((current) => [...current, { command: nextCommand, output }]);
    setCommand("");
    if (matchedRoute) window.setTimeout(() => scrollToSection(matchedRoute.section), 80);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") runCommand(command);
  };

  return (
    <div className="terminal-window" data-testid="hero-terminal-widget">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3" data-testid="terminal-window-header">
        <div className="flex items-center gap-2" data-testid="terminal-window-controls">
          <span className="terminal-dot bg-[#ff5f57]" data-testid="terminal-window-close-dot" />
          <span className="terminal-dot bg-[#febc2e]" data-testid="terminal-window-minimize-dot" />
          <span className="terminal-dot bg-[#28c840]" data-testid="terminal-window-maximize-dot" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-500" data-testid="terminal-window-title">
          faheem@portfolio:~
        </span>
        <Terminal size={14} className="text-emerald-400" aria-hidden="true" />
      </div>
      <div className="min-h-[285px] p-5 font-mono text-xs leading-6 sm:min-h-[322px]" data-testid="terminal-output">
        <div className="flex gap-2" data-testid="terminal-intro-line">
          <span className="text-emerald-400" data-testid="terminal-intro-prompt">$</span>
          <span className="text-slate-300" data-testid="terminal-intro-command">whoami</span>
        </div>
        <p className="pl-4 text-slate-500" data-testid="terminal-intro-response">faheem.fayaz — backend developer</p>
        <div className="mt-2 flex gap-2" data-testid="terminal-status-line">
          <span className="text-emerald-400" data-testid="terminal-status-prompt">$</span>
          <span className="text-slate-300" data-testid="terminal-status-command">systemctl status portfolio</span>
        </div>
        <p className="pl-4 text-emerald-300" data-testid="terminal-status-response">● active (running) · open to opportunities</p>
        {history.map((entry, entryIndex) => (
          <div className="mt-2" key={`${entry.command}-${entryIndex}`} data-testid={`terminal-history-entry-${entryIndex}`}>
            <div className="flex gap-2" data-testid={`terminal-history-command-${entryIndex}`}>
              <span className="text-emerald-400">$</span>
              <span className="text-slate-300">{entry.command}</span>
            </div>
            {entry.output.map((line, lineIndex) => (
              <p className="pl-4 text-slate-400" key={`${line}-${lineIndex}`} data-testid={`terminal-history-output-${entryIndex}-${lineIndex}`}>
                {line}
              </p>
            ))}
          </div>
        ))}
        <div className="mt-2 flex items-center gap-2" data-testid="terminal-command-line">
          <span className="terminal-cursor" data-testid="terminal-cursor" />
          <span className="text-emerald-400" data-testid="terminal-command-prompt">$</span>
          <input
            aria-label="Terminal command"
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent text-slate-200 outline-none placeholder:text-slate-700"
            data-testid="terminal-command-input"
            onChange={(event) => setCommand(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type help and press enter"
            value={command}
          />
        </div>
      </div>
      <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3" data-testid="terminal-command-suggestions">
        {['help', 'faheem --architecture', 'curl /api/v1/resume'].map((suggestion) => (
          <button
            className="terminal-chip"
            data-testid={`terminal-suggestion-${suggestion.replaceAll(" ", "-").replaceAll("/", "-")}`}
            key={suggestion}
            onClick={() => runCommand(suggestion)}
            type="button"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="section-label" data-testid={`section-label-${number}`}>
      <span data-testid={`section-label-number-${number}`}>{number}</span>
      <span data-testid={`section-label-title-${number}`}>{children}</span>
      <span className="h-px flex-1 bg-slate-800" data-testid={`section-label-rule-${number}`} />
    </div>
  );
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    toast.success("Email copied to clipboard");
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="min-h-svh overflow-x-hidden bg-[#090A0F] text-slate-100" data-testid="portfolio-page">
      <Toaster position="bottom-right" richColors />
      <header className="sticky top-0 z-50 border-b border-white/[0.07] bg-[#090A0F]/85 backdrop-blur-xl" data-testid="site-header">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10" data-testid="header-inner">
          <a className="group flex items-center gap-3" data-testid="header-brand-link" href="#top" onClick={() => scrollToSection("top")}>
            <span className="flex h-8 w-8 items-center justify-center border border-emerald-400/60 font-mono text-xs text-emerald-400 transition-transform duration-300 group-hover:rotate-45" data-testid="header-brand-mark">ff</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-300" data-testid="header-brand-name">Faheem Fayaz</span>
          </a>
          <nav className="hidden items-center gap-7 md:flex" data-testid="desktop-navigation">
            {navItems.map(([number, label, id]) => (
              <a className="nav-link" data-testid={`desktop-nav-${id}-link`} href={`#${id}`} key={id} onClick={() => scrollToSection(id)}>
                <span className="mr-1 text-emerald-400/70">{number}</span>{label}
              </a>
            ))}
          </nav>
          <div className="hidden items-center gap-3 md:flex" data-testid="header-actions">
            <a className="header-social-link" data-testid="header-github-link" href="https://github.com/faheem-fayaz" rel="noreferrer" target="_blank" aria-label="Faheem on GitHub"><Github size={15} /></a>
            <a className="header-social-link" data-testid="header-linkedin-link" href="https://linkedin.com/in/faheem-fayaz" rel="noreferrer" target="_blank" aria-label="Faheem on LinkedIn"><Linkedin size={15} /></a>
            <a className="ml-2 inline-flex h-9 items-center gap-2 border border-emerald-400/50 px-3 font-mono text-[10px] uppercase tracking-[0.13em] text-emerald-300 transition-colors duration-300 hover:bg-emerald-400 hover:text-[#090A0F]" data-testid="header-resume-download-link" href={RESUME_URL} rel="noreferrer" target="_blank"><Download size={13} /> Resume</a>
          </div>
          <button className="flex h-10 w-10 items-center justify-center border border-slate-700 text-slate-300 md:hidden" data-testid="mobile-menu-toggle-button" onClick={() => setMobileMenuOpen((open) => !open)} type="button" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-white/[0.07] bg-[#0d1017] px-5 py-5 md:hidden" data-testid="mobile-navigation-panel">
            <nav className="grid gap-1" data-testid="mobile-navigation">
              {navItems.map(([number, label, id]) => (
                <a className="flex items-center justify-between border-b border-white/[0.06] py-3 font-mono text-xs uppercase tracking-[0.15em] text-slate-300" data-testid={`mobile-nav-${id}-link`} href={`#${id}`} key={id} onClick={() => scrollToSection(id, () => setMobileMenuOpen(false))}>
                  <span><span className="mr-3 text-emerald-400">{number}</span>{label}</span><ChevronRight size={15} />
                </a>
              ))}
              <a className="mt-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-emerald-300" data-testid="mobile-resume-download-link" href={RESUME_URL} rel="noreferrer" target="_blank"><Download size={14} /> Download resume</a>
            </nav>
          </div>
        )}
      </header>

      <main id="top" data-testid="portfolio-main">
        <section className="relative border-b border-white/[0.07]" data-testid="hero-section">
          <div className="hero-grid absolute inset-0 opacity-35" data-testid="hero-grid-background" />
          <div className="mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 sm:px-8 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20 lg:px-10 lg:pb-28 lg:pt-28" data-testid="hero-content">
            <div className="relative z-10" data-testid="hero-copy-column">
              <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-emerald-400" data-testid="hero-kicker"><span className="status-pulse" data-testid="hero-status-dot" /> Available for backend opportunities <span className="text-slate-600" data-testid="hero-kicker-separator">/</span> Srinagar, IN</div>
              <h1 className="max-w-4xl font-heading text-[clamp(3.3rem,8vw,7.5rem)] font-semibold leading-[0.86] tracking-[-0.07em] text-slate-100" data-testid="hero-heading">Backend<br /><span className="text-emerald-400" data-testid="hero-heading-accent">systems</span><br />with intent.</h1>
              <p className="mt-9 max-w-xl font-body text-lg leading-relaxed text-slate-400 sm:text-xl" data-testid="hero-description">I’m Faheem Fayaz — a backend developer building dependable APIs, secure authentication flows, and AI-integrated products that hold up beyond the demo.</p>
              <div className="mt-10 flex flex-wrap items-center gap-4" data-testid="hero-actions">
                <Button className="group h-12 rounded-none bg-emerald-400 px-5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#07110d] hover:bg-emerald-300" data-testid="hero-contact-button" onClick={() => scrollToSection("contact")}><Mail size={15} /> Start a conversation <ArrowDownRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:translate-y-1" /></Button>
                <a className="inline-flex h-12 items-center gap-2 border border-slate-700 px-5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-300 transition-colors duration-300 hover:border-slate-400 hover:text-white" data-testid="hero-resume-download-link" href={RESUME_URL} rel="noreferrer" target="_blank"><Download size={15} /> View resume</a>
              </div>
              <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-white/[0.08] pt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500" data-testid="hero-metadata-row">
                <span data-testid="hero-metadata-years"><strong className="text-slate-200">2021–25</strong> B.Tech CSE</span>
                <span data-testid="hero-metadata-focus"><strong className="text-slate-200">12+</strong> secured endpoints</span>
                <span data-testid="hero-metadata-mode"><strong className="text-slate-200">async</strong> by default</span>
              </div>
            </div>
            <motion.div className="relative z-10 self-end lg:pb-3" data-testid="hero-terminal-column" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="mb-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600" data-testid="hero-terminal-caption"><span data-testid="hero-terminal-caption-label">live profile shell</span><span data-testid="hero-terminal-caption-status">tty/01</span></div>
              <TerminalWidget />
            </motion.div>
          </div>
          <div className="mx-auto flex max-w-7xl justify-end px-5 pb-5 sm:px-8 lg:px-10" data-testid="hero-scroll-cue"><a className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600 transition-colors hover:text-emerald-400" data-testid="hero-scroll-link" href="#about" onClick={() => scrollToSection("about")}>Scroll to inspect <ArrowDownRight size={13} /></a></div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:px-10 lg:py-32" id="about" data-testid="about-section">
          <SectionLabel number="01" children="Engineering point of view" />
          <div className="mt-12 grid gap-14 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24" data-testid="about-content-grid">
            <div data-testid="about-intro-column"><p className="font-editorial text-3xl italic leading-tight text-slate-300 sm:text-4xl" data-testid="about-quote">“Good backend work is quiet: clear contracts, secure defaults, and failures that tell you exactly what happened.”</p><p className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400" data-testid="about-quote-attribution">— working principle / 001</p></div>
            <div className="grid gap-8 sm:grid-cols-2" data-testid="about-principles-grid">
              <div className="border-l border-emerald-400/60 pl-5" data-testid="about-principle-contracts"><h2 className="font-heading text-xl font-semibold tracking-tight text-slate-100" data-testid="about-principle-contracts-title">Contracts before complexity.</h2><p className="mt-3 font-body leading-relaxed text-slate-400" data-testid="about-principle-contracts-copy">I design APIs that are easy to validate, reason about, and hand over — from request shape to structured errors.</p></div>
              <div className="border-l border-sky-400/60 pl-5" data-testid="about-principle-security"><h2 className="font-heading text-xl font-semibold tracking-tight text-slate-100" data-testid="about-principle-security-title">Security as a starting point.</h2><p className="mt-3 font-body leading-relaxed text-slate-400" data-testid="about-principle-security-copy">JWT, role-based access, 2FA, verification workflows — the permission model belongs in the architecture, not the final checklist.</p></div>
              <div className="border-l border-amber-400/60 pl-5" data-testid="about-principle-integration"><h2 className="font-heading text-xl font-semibold tracking-tight text-slate-100" data-testid="about-principle-integration-title">Integrations that behave.</h2><p className="mt-3 font-body leading-relaxed text-slate-400" data-testid="about-principle-integration-copy">AI services need the same discipline as any dependency: timeouts, validation, observable failures, and a useful fallback path.</p></div>
              <div className="border-l border-slate-600 pl-5" data-testid="about-principle-learning"><h2 className="font-heading text-xl font-semibold tracking-tight text-slate-100" data-testid="about-principle-learning-title">Always close to the system.</h2><p className="mt-3 font-body leading-relaxed text-slate-400" data-testid="about-principle-learning-copy">Across Python, TypeScript, Java, and C#, I stay curious about the data, the runtime, and the humans who depend on both.</p></div>
            </div>
          </div>
          <div className="mt-20 grid border-y border-white/[0.08] sm:grid-cols-3" data-testid="about-metrics-row">
            <div className="border-b border-white/[0.08] py-7 sm:border-b-0 sm:border-r sm:pr-8" data-testid="about-metric-backend"><p className="font-mono text-4xl text-slate-100" data-testid="about-metric-backend-value">05</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.17em] text-slate-500" data-testid="about-metric-backend-label">backend ecosystems</p></div>
            <div className="border-b border-white/[0.08] py-7 sm:border-b-0 sm:px-8 sm:border-r" data-testid="about-metric-projects"><p className="font-mono text-4xl text-slate-100" data-testid="about-metric-projects-value">02</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.17em] text-slate-500" data-testid="about-metric-projects-label">systems shipped</p></div>
            <div className="py-7 sm:pl-8" data-testid="about-metric-focus"><p className="font-mono text-4xl text-emerald-400" data-testid="about-metric-focus-value">∞</p><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.17em] text-slate-500" data-testid="about-metric-focus-label">questions worth asking</p></div>
          </div>
        </section>

        <section className="border-y border-white/[0.07] bg-[#0d1017] scroll-mt-24" id="experience" data-testid="experience-section">
          <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32" data-testid="experience-inner"><SectionLabel number="02" children="Impact log" /><div className="mt-14" data-testid="experience-list">{experience.map((item) => (<article className="group grid gap-8 border-b border-white/[0.08] py-10 first:pt-0 last:border-b-0 lg:grid-cols-[110px_0.75fr_1.25fr] lg:gap-10" data-testid={`experience-item-${item.index}`} key={item.index}><div className="font-mono text-xs text-emerald-400" data-testid={`experience-index-${item.index}`}>/ {item.index}</div><div data-testid={`experience-summary-${item.index}`}><h2 className="font-heading text-2xl font-semibold tracking-tight text-slate-100" data-testid={`experience-company-${item.index}`}>{item.company}</h2><p className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500" data-testid={`experience-role-${item.index}`}>{item.role}</p><p className="mt-5 font-mono text-[10px] uppercase tracking-[0.15em] text-emerald-400/80" data-testid={`experience-period-${item.index}`}>{item.period}</p></div><div data-testid={`experience-detail-${item.index}`}><p className="max-w-xl font-body text-lg leading-relaxed text-slate-300" data-testid={`experience-description-${item.index}`}>{item.summary}</p><ul className="mt-6 grid gap-3" data-testid={`experience-bullets-${item.index}`}>{item.details.map((detail, detailIndex) => (<li className="flex gap-3 font-body text-sm leading-relaxed text-slate-500" data-testid={`experience-bullet-${item.index}-${detailIndex}`} key={detail}><Check className="mt-1 shrink-0 text-emerald-400" size={14} /><span>{detail}</span></li>))}</ul><div className="mt-7 flex flex-wrap gap-2" data-testid={`experience-stack-${item.index}`}>{item.stack.map((technology) => (<Badge className="rounded-none border border-slate-700 bg-transparent font-mono text-[10px] font-normal uppercase tracking-[0.1em] text-slate-400" data-testid={`experience-tech-${item.index}-${technology.toLowerCase().replaceAll(" ", "-")}`} key={technology} variant="outline">{technology}</Badge>))}</div></div></article>))}</div></div>
        </section>

        <section className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:px-10 lg:py-32" id="work" data-testid="work-section"><SectionLabel number="03" children="Selected systems" /><div className="mt-12 grid gap-5 lg:grid-cols-2" data-testid="project-grid">{projects.map((project) => (<motion.article className="project-card" data-testid={`project-card-${project.number}`} key={project.number} whileHover={{ y: -5 }} transition={{ duration: 0.25 }}><div className="flex items-start justify-between" data-testid={`project-header-${project.number}`}><span className={`project-number ${project.accent === "sky" ? "text-sky-400" : "text-emerald-400"}`} data-testid={`project-number-${project.number}`}>{project.number}</span><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600" data-testid={`project-type-${project.number}`}>{project.type}</span></div><h2 className="mt-16 font-heading text-3xl font-semibold tracking-tight text-slate-100" data-testid={`project-name-${project.number}`}>{project.name}</h2><p className="mt-4 max-w-md font-body leading-relaxed text-slate-400" data-testid={`project-description-${project.number}`}>{project.description}</p><div className="mt-10 border-t border-white/[0.08] pt-5" data-testid={`project-architecture-${project.number}`}><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600" data-testid={`project-architecture-label-${project.number}`}>architecture</p><p className="mt-2 font-mono text-sm text-slate-300" data-testid={`project-architecture-value-${project.number}`}>{project.architecture}</p></div><div className="mt-6 grid grid-cols-3 gap-px border border-white/[0.08] bg-white/[0.08]" data-testid={`project-metrics-${project.number}`}>{project.metrics.map((metric, metricIndex) => (<div className="bg-[#12151E] p-3" data-testid={`project-metric-${project.number}-${metricIndex}`} key={metric.label}><p className={`font-mono text-base ${project.accent === "sky" ? "text-sky-400" : "text-emerald-400"}`} data-testid={`project-metric-value-${project.number}-${metricIndex}`}>{metric.value}</p><p className="mt-1 font-mono text-[9px] uppercase tracking-[0.1em] text-slate-600" data-testid={`project-metric-label-${project.number}-${metricIndex}`}>{metric.label}</p></div>))}</div><div className="mt-7 flex flex-wrap items-center justify-between gap-4" data-testid={`project-footer-${project.number}`}><div className="flex flex-wrap gap-2" data-testid={`project-tags-${project.number}`}>{project.tags.map((tag) => (<span className="border border-slate-700 px-2 py-1 font-mono text-[10px] text-slate-500" data-testid={`project-tag-${project.number}-${tag.toLowerCase().replaceAll(" ", "-")}`} key={tag}>{tag}</span>))}</div><div className="flex flex-wrap items-center gap-4" data-testid={`project-links-${project.number}`}><Link className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:text-white" data-testid={`project-case-study-link-${project.number}`} to={`/work/${project.slug}`}>Case study <ChevronRight size={13} /></Link><a className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.14em] text-slate-300 transition-colors hover:text-emerald-400" data-testid={`project-github-link-${project.number}`} href={project.repository} rel="noreferrer" target="_blank">Repository <ArrowUpRight size={13} /></a></div></div></motion.article>))}</div></section>

        <section className="border-y border-white/[0.07] bg-[#0d1017] scroll-mt-24" id="skills" data-testid="skills-section"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-28" data-testid="skills-inner"><div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24"><div data-testid="skills-intro"><SectionLabel number="04" children="Technical range" /><h2 className="mt-10 max-w-sm font-heading text-4xl font-semibold leading-[0.95] tracking-[-0.05em] text-slate-100" data-testid="skills-heading">The tools are different.<br /><span className="text-slate-500">The thinking stays.</span></h2><p className="mt-6 max-w-sm font-body leading-relaxed text-slate-400" data-testid="skills-description">A practical stack shaped by building real workflows, not collecting logos.</p></div><div className="grid gap-px border border-white/[0.08] bg-white/[0.08] sm:grid-cols-2" data-testid="skills-grid">{skillGroups.map((group, groupIndex) => (<div className="bg-[#0d1017] p-6" data-testid={`skill-group-${groupIndex}`} key={group.label}><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-emerald-400" data-testid={`skill-group-label-${groupIndex}`}>{group.label}</p><div className="mt-5 flex flex-wrap gap-x-5 gap-y-3" data-testid={`skill-group-items-${groupIndex}`}>{group.items.map((skill) => (<span className="font-body text-sm text-slate-300" data-testid={`skill-item-${groupIndex}-${skill.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-")}`} key={skill}>{skill}</span>))}</div></div>))}</div></div></div></section>

        <section className="mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 lg:px-10 lg:py-32" id="resume" data-testid="resume-section"><SectionLabel number="05" children="The short version" /><div className="mt-12 grid gap-12 lg:grid-cols-[1fr_0.72fr] lg:items-end" data-testid="resume-content"><div data-testid="resume-copy"><p className="max-w-2xl font-heading text-4xl font-semibold leading-[0.98] tracking-[-0.05em] text-slate-100 sm:text-6xl" data-testid="resume-heading">A computer science graduate who likes the part where systems become real.</p><p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-slate-400" data-testid="resume-description">Explore the full resume for the complete timeline, technologies, and project detail. It is concise by design; this site is the expanded context.</p></div><div className="border border-white/[0.1] bg-[#0d1017] p-6 sm:p-8" data-testid="resume-card"><div className="flex items-start justify-between" data-testid="resume-card-header"><div><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-emerald-400" data-testid="resume-card-label">document / 2026</p><p className="mt-3 font-heading text-xl text-slate-100" data-testid="resume-card-title">Faheem_Fayaz_Resume.pdf</p></div><Download className="text-slate-500" size={20} aria-hidden="true" /></div><div className="my-8 h-px bg-white/[0.08]" data-testid="resume-card-rule" /><div className="flex items-center justify-between gap-4" data-testid="resume-card-footer"><span className="font-mono text-[10px] uppercase tracking-[0.14em] text-slate-500" data-testid="resume-card-meta">PDF / 1.2 MB</span><a className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-emerald-300 transition-colors hover:text-white" data-testid="resume-card-download-link" href={RESUME_URL} rel="noreferrer" target="_blank">Open document <ExternalLink size={13} /></a></div></div></div></section>

        <section className="border-t border-white/[0.07] bg-[#0d1017] scroll-mt-24" id="contact" data-testid="contact-section"><div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 lg:px-10 lg:py-32" data-testid="contact-inner"><SectionLabel number="06" children="Open channel" /><div className="mt-12 grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-end" data-testid="contact-content"><div data-testid="contact-copy"><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-emerald-400" data-testid="contact-kicker">Have a system to build?</p><h2 className="mt-5 max-w-3xl font-heading text-5xl font-semibold leading-[0.9] tracking-[-0.06em] text-slate-100 sm:text-7xl" data-testid="contact-heading">Let’s make the<br /><span className="text-emerald-400">backend count.</span></h2><p className="mt-7 max-w-lg font-body text-lg leading-relaxed text-slate-400" data-testid="contact-description">For roles, collaborations, or a thoughtful conversation about backend engineering, I’m one email away.</p><div className="mt-9 flex flex-wrap gap-4" data-testid="contact-actions"><a className="inline-flex h-12 items-center gap-2 bg-emerald-400 px-5 font-mono text-[11px] uppercase tracking-[0.15em] text-[#07110d] transition-colors hover:bg-emerald-300" data-testid="contact-email-draft-link" href={`mailto:${EMAIL}?subject=Opportunity%20to%20work%20together`}><Mail size={15} /> Email Faheem <ArrowUpRight size={15} /></a><button className="inline-flex h-12 items-center gap-2 border border-slate-700 px-5 font-mono text-[11px] uppercase tracking-[0.15em] text-slate-300 transition-colors hover:border-slate-400 hover:text-white" data-testid="contact-copy-email-button" onClick={copyEmail} type="button">{copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy email"}</button></div></div><div className="border-l border-slate-700 pl-6" data-testid="contact-details"><p className="font-mono text-[10px] uppercase tracking-[0.17em] text-slate-600" data-testid="contact-details-label">Direct / social</p><a className="mt-4 block font-heading text-xl text-slate-200 transition-colors hover:text-emerald-400" data-testid="contact-email-address-link" href={`mailto:${EMAIL}`}>{EMAIL}</a><div className="mt-8 grid gap-4" data-testid="contact-social-links"><a className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono text-xs uppercase tracking-[0.13em] text-slate-400 transition-colors hover:text-white" data-testid="contact-github-link" href="https://github.com/faheem-fayaz" rel="noreferrer" target="_blank"><span className="flex items-center gap-3"><Github size={15} /> GitHub</span><ArrowUpRight size={13} /></a><a className="flex items-center justify-between border-b border-white/[0.08] pb-3 font-mono text-xs uppercase tracking-[0.13em] text-slate-400 transition-colors hover:text-white" data-testid="contact-linkedin-link" href="https://linkedin.com/in/faheem-fayaz" rel="noreferrer" target="_blank"><span className="flex items-center gap-3"><Linkedin size={15} /> LinkedIn</span><ArrowUpRight size={13} /></a></div></div></div></div></section>
      </main>

      <footer className="border-t border-white/[0.07]" data-testid="site-footer"><div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10" data-testid="footer-inner"><p className="font-mono text-[10px] uppercase tracking-[0.15em] text-slate-600" data-testid="footer-copyright">© 2026 Faheem Fayaz / built with intent</p><button className="flex items-center gap-2 self-start font-mono text-[10px] uppercase tracking-[0.15em] text-slate-500 transition-colors hover:text-emerald-400 sm:self-auto" data-testid="footer-back-to-top-button" onClick={() => scrollToSection("top")} type="button">Back to top <ArrowUpRight size={13} /></button></div></footer>
    </div>
  );
}
```
