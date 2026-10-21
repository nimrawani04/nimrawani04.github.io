import { useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  ShoppingBag,
  Globe,
  ClipboardList,
  ShieldCheck,
  Map,
  Cpu,
  ExternalLink,
  ChevronRight,
  X,
  Heart,
  Languages,
  Car,
  Accessibility,
  Sparkles,
  Bot,
  FolderOpen,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  category: string;
  description: string[];
  summary: string;
  tech: string[];
  github?: string;
  link?: string;
  icon: React.ReactNode;
  color: string;
  date: string;
}

// 1. BEST / FEATURED PROJECTS (The 6 designated by the user)
const featuredProjects: ProjectItem[] = [
  {
    id: "cuk-exam",
    title: "CUK Examination Management System",
    subtitle: "Secure Examination Administration Platform",
    badge: "Security & ERP",
    category: "Web & ERP",
    summary: "Role-based exam administration system with automated paper handling workflows and Supabase RLS security.",
    description: [
      "Collaboratively developed a confidential role-based examination management platform for university faculty, department heads, and controllers.",
      "Engineered automated examination administration workflows with strict paper handling protocols to eliminate leakage risks.",
      "Implemented Supabase Row-Level Security (RLS) policies, session-based authentication, and real-time audit logging for high-stakes academic records.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://secure-exam-flow.vercel.app/",
    icon: <ClipboardList className="w-4 h-4" />,
    color: "#f59e0b",
    date: "Mar 2026",
  },
  {
    id: "2ai-conf",
    title: "2AI Conference Website",
    subtitle: "Official International Applied AI Conference",
    badge: "Public Conference",
    category: "Web & ERP",
    summary: "Official applied AI conference website with responsive speaker rosters, schedules, and paper submissions.",
    description: [
      "Served as design team lead and frontend engineer on the official website for the 2026 International Conference on Applied AI.",
      "Engineered high-performance, accessible responsive interfaces for keynote speakers, paper submissions, committee rosters, and schedules.",
      "Optimized cross-device compatibility, modern visual aesthetics, and Core Web Vitals for an international academic audience.",
    ],
    tech: ["TypeScript", "JavaScript", "CSS3", "HTML5"],
    github: "https://github.com/nimrawani04",
    link: "https://2ai-conference.org/",
    icon: <Globe className="w-4 h-4" />,
    color: "#22d3ee",
    date: "Jun 2026",
  },
  {
    id: "bis-ai",
    title: "BIS AI",
    subtitle: "Product Safety & Standards Verification Assistant",
    badge: "Hackathon Winner",
    category: "AI & ML",
    summary: "AI product verification platform with multilingual RAG queries and offline-first PWA architecture.",
    description: [
      "Built an AI-driven product verification platform inspired by Bureau of Indian Standards (BIS) to assess product authenticity and Indian compliance.",
      "Constructed a Retrieval-Augmented Generation (RAG) pipeline delivering multilingual, source-verified regulatory answers.",
      "Architected as an offline-capable Progressive Web App (PWA) with client-side caching and low-latency vector queries.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PWA", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://bis-ai.vercel.app/",
    icon: <ShieldCheck className="w-4 h-4" />,
    color: "#3b82f6",
    date: "Feb 2025",
  },
  {
    id: "cuk-academics",
    title: "CUK Academics",
    subtitle: "Full-Stack Academic Management Portal",
    badge: "University Portal",
    category: "Web & ERP",
    summary: "University-wide portal with role-based student/teacher dashboards, attendance tracking, and marks management.",
    description: [
      "Designed and deployed a university-scale academic portal featuring personalized role-based dashboards for students, teachers, and administrators.",
      "Engineered real-time modules for daily attendance tracking, internal marks management, official departmental notices, and exam workflows.",
      "Structured a normalized PostgreSQL schema on Supabase with optimistic UI updates and responsive data tables.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://ds-cuk.vercel.app/",
    icon: <GraduationCap className="w-4 h-4" />,
    color: "#4ade80",
    date: "Jan 2026",
  },
  {
    id: "gaash-ai",
    title: "GaashAI",
    subtitle: "Multilingual AI Translation & Voice Assistant",
    badge: "Regional AI & NLP",
    category: "AI & ML",
    summary: "Conversational assistant bridging Kashmiri, Urdu, and English with document OCR and speech synthesis.",
    description: [
      "Developed a multilingual conversational assistant bridging Kashmiri, Urdu, and English communication and local language preservation.",
      "Integrated OCR document parsing to detect and translate Kashmiri and Urdu script directly from physical books and images.",
      "Implemented speech synthesis streams, bi-directional RTL text alignment, and persistent conversational session states.",
    ],
    tech: ["React", "TypeScript", "AI APIs", "OCR", "Voice API"],
    github: "https://github.com/nimrawani04",
    icon: <Languages className="w-4 h-4" />,
    color: "#8b5cf6",
    date: "May 2025",
  },
  {
    id: "her-space",
    title: "Her Space",
    subtitle: "Comprehensive Women's Health & Wellness Platform",
    badge: "HealthTech & AI",
    category: "AI & ML",
    summary: "Privacy-first health ecosystem combining cycle tracking, pregnancy care, and AI health support.",
    description: [
      "Created an empathetic digital ecosystem combining cycle tracking, pregnancy care, mental wellness logs, and AI-powered health advice.",
      "Enforced client-side encryption and strict privacy controls for sensitive medical logs and personal wellness metrics.",
      "Integrated community resources, verified mentorship pathways, safety tools, and natural-language health queries.",
    ],
    tech: ["React", "TypeScript", "Supabase", "AI APIs", "Tailwind CSS"],
    github: "https://github.com/nimrawani04",
    icon: <Heart className="w-4 h-4" />,
    color: "#f43f5e",
    date: "Apr 2025",
  },
];

// 2. OTHER WORKS / OTHER PROJECTS (Including Companion AI + Rasta AI + Karawan + Sign Bridge India + Araaz + Smart House)
const otherProjects: ProjectItem[] = [
  {
    id: "companion-ai",
    title: "Companion AI",
    subtitle: "Personalized AI Companion & Smart Assistant",
    badge: "Conversational AI",
    category: "AI & ML",
    summary: "Personalized companion with contextual memory, multi-turn dialogues, routine planning, and streaming responses.",
    description: [
      "Engineered an intelligent conversational companion leveraging LLM context windows, custom prompt engineering, and proactive assistance.",
      "Equipped with contextual memory, multi-turn dialogues, study and routine planning, and streaming responses.",
      "Built with cross-device sync and clean mobile-first UI for seamless everyday productivity.",
    ],
    tech: ["React", "TypeScript", "AI APIs", "Supabase", "Tailwind CSS"],
    github: "https://github.com/nimrawani04",
    icon: <Bot className="w-4 h-4" />,
    color: "#06b6d4",
    date: "2026",
  },
  {
    id: "rasta-ai",
    title: "Rasta AI",
    subtitle: "Multi-Domain Assistance Platform",
    badge: "2nd Place Hackathon",
    category: "AI & ML",
    summary: "Multi-domain AI platform for document comprehension, crop intelligence, and multimodal guidance.",
    description: [
      "Award-winning platform structured across four specialized domains: document understanding, crop intelligence, youth services, and guided assistance.",
      "Integrated multimodal voice and text queries with high-efficiency RAG pipelines for contextual local guidance in Kashmir.",
    ],
    tech: ["React", "TypeScript", "AI APIs", "Supabase", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://cursor-hackathon-roan.vercel.app/",
    icon: <Map className="w-4 h-4" />,
    color: "#10b981",
    date: "Mar 2025",
  },
  {
    id: "karawan",
    title: "Karawan",
    subtitle: "Intercity Carpooling Platform for Kashmir",
    badge: "Logistics",
    category: "Web & ERP",
    summary: "Peer-to-peer ride-sharing platform with route discovery, seat booking, and in-ride messaging.",
    description: [
      "Peer-to-peer carpooling platform connecting commuters across Kashmir valleys with route discovery, seat booking, and ride publishing.",
      "Features real-time booking updates, route overlays with Maps API, and in-ride chat communication channels.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Maps API"],
    github: "https://github.com/nimrawani04",
    icon: <Car className="w-4 h-4" />,
    color: "#14b8a6",
    date: "Jun 2025",
  },
  {
    id: "sign-bridge",
    title: "Sign Bridge India",
    subtitle: "Real-Time ISL Communication Platform",
    badge: "Vision AI",
    category: "AI & ML",
    summary: "Bidirectional sign language translation using MediaPipe pose detection and a 3D avatar rig.",
    description: [
      "Browser-based accessibility platform delivering bidirectional translation between Indian Sign Language (ISL) and text/speech.",
      "Integrates MediaPipe Vision AI for real-time hand/pose detection and a 3D WebGL avatar for rendering sign animations.",
    ],
    tech: ["React", "TypeScript", "MediaPipe", "3D Avatar", "WebGL"],
    github: "https://github.com/nimrawani04",
    icon: <Accessibility className="w-4 h-4" />,
    color: "#38bdf8",
    date: "Jul 2025",
  },
  {
    id: "araaz",
    title: "Araaz E-Commerce",
    subtitle: "Modern Storefront with Form Automation",
    badge: "Commercial",
    category: "Web & ERP",
    summary: "Responsive storefront featuring product showcases, automated Web3Forms order routing, and Vercel hosting.",
    description: [
      "Modern, fast storefront featuring responsive product catalog showcases, automated Web3Forms order/inquiry routing, and Vercel CDN deployment.",
    ],
    tech: ["HTML5", "CSS3", "JavaScript", "Web3Forms", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://araaaz.vercel.app/",
    icon: <ShoppingBag className="w-4 h-4" />,
    color: "#a855f7",
    date: "Dec 2024",
  },
  {
    id: "smart-house",
    title: "Smart House Arduino",
    subtitle: "IoT Automation & Sensor Prototype",
    badge: "IoT & Hardware",
    category: "IoT & Hardware",
    summary: "Home automation prototype integrating ultrasonic and infrared sensors for automated device control.",
    description: [
      "Microcontroller-powered smart home automation prototype integrating ultrasonic and infrared sensors for automated appliance triggering and environment monitoring.",
    ],
    tech: ["Arduino", "C++", "IR Sensors", "Ultrasonic"],
    github: "https://github.com/nimrawani04",
    icon: <Cpu className="w-4 h-4" />,
    color: "#f97316",
    date: "Nov 2024",
  },
];

interface ProjectMarqueeProps {
  onOpenCookingGame?: () => void;
  onOpenMemoryLab?: () => void;
  onOpenBugDungeon?: () => void;
  onOpenCityQuest?: () => void;
  onOpenEducationCampus?: () => void;
}

export const ProjectMarquee = ({}: ProjectMarqueeProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<"featured" | "other">("featured");
  const [expandedProject, setExpandedProject] = useState<ProjectItem | null>(null);

  const currentList = activeTab === "featured" ? featuredProjects : otherProjects;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-16 sm:py-20 bg-[#090D14] w-full overflow-hidden text-left"
    >
      <a id="portfolio-summary" className="sr-only" aria-hidden="true" />

      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-cyan-500/25 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Selected Work</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white uppercase">
            My{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-xs sm:text-sm mt-1.5 font-medium">
            Core systems, specialized applications, and technical builds
          </p>

          {/* Sleek, Compact 2-Option Pill Switcher */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-900/90 border border-slate-800 mt-5 shadow-lg">
            <button
              onClick={() => setActiveTab("featured")}
              className={`relative px-4 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "featured"
                  ? "text-cyan-300"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {activeTab === "featured" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Featured Projects</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-cyan-500/15 text-cyan-300 font-mono">
                  {featuredProjects.length}
                </span>
              </span>
            </button>

            <button
              onClick={() => setActiveTab("other")}
              className={`relative px-4 sm:px-6 py-2 rounded-lg text-xs font-bold transition-all duration-200 flex items-center gap-2 ${
                activeTab === "other"
                  ? "text-cyan-300"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {activeTab === "other" && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-slate-800 border border-cyan-500/30 rounded-lg shadow-sm"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <FolderOpen className="w-3.5 h-3.5 text-cyan-400" />
                <span>Other Works</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/60 text-slate-300 font-mono">
                  {otherProjects.length}
                </span>
              </span>
            </button>
          </div>
        </div>

        {/* Compact, High-Density Uniform Grid (3 cols on desktop, 2 on tablet, 1 on mobile) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5"
          >
            {currentList.map((project) => (
              <div
                key={project.id}
                onClick={() => setExpandedProject(project)}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-800/80 bg-slate-900/50 hover:bg-slate-900/90 backdrop-blur-sm p-4 sm:p-5 transition-all duration-250 hover:border-slate-700 hover:shadow-lg hover:-translate-y-0.5 cursor-pointer overflow-hidden"
              >
                {/* Thin top accent indicator on hover */}
                <div
                  className="absolute top-0 inset-x-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ background: project.color }}
                />

                <div>
                  {/* Top Row: Icon + Title + Actions */}
                  <div className="flex items-start justify-between gap-3 mb-2.5">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105"
                        style={{
                          background: project.color + "18",
                          border: `1px solid ${project.color}35`,
                          color: project.color,
                        }}
                      >
                        {project.icon}
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-cyan-400 transition-colors truncate leading-tight">
                          {project.title}
                        </h3>
                        <p
                          className="text-[11px] font-medium truncate mt-0.5"
                          style={{ color: project.color + "d0" }}
                        >
                          {project.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Action links in top-right */}
                    <div
                      className="flex items-center gap-1.5 flex-shrink-0"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                          title="GitHub Repository"
                        >
                          <FaGithub className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-md hover:bg-cyan-500/20 text-cyan-400 hover:text-cyan-300 transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Summary Text (Concise 2 lines) */}
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                    {project.summary}
                  </p>
                </div>

                {/* Bottom Row: Tech Tags + Detail Prompt */}
                <div className="pt-2.5 border-t border-slate-850 flex items-center justify-between gap-2 mt-auto">
                  <div className="flex flex-wrap gap-1 items-center overflow-hidden">
                    {project.tech.slice(0, 3).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-850"
                      >
                        {t}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[9px] font-mono text-slate-500 px-1">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] font-semibold text-slate-500 group-hover:text-cyan-400 transition-colors flex items-center gap-0.5 flex-shrink-0">
                    <span>Details</span>
                    <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Expanded Project Details Modal */}
      {expandedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          onClick={() => setExpandedProject(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[480px] md:max-w-[520px] max-h-[85vh] relative rounded-2xl shadow-2xl flex flex-col p-5 sm:p-6 overflow-y-auto scrollbar-none text-left"
            style={{
              border: `1px solid ${expandedProject.color}45`,
              background: `linear-gradient(145deg, ${expandedProject.color}15, #0a0f1a 45%, #0d1117)`,
            }}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: expandedProject.color + "22",
                    color: expandedProject.color,
                    border: `1px solid ${expandedProject.color}40`,
                  }}
                >
                  {expandedProject.icon}
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-base sm:text-lg font-black leading-tight truncate"
                    style={{ color: expandedProject.color }}
                  >
                    {expandedProject.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-tight truncate mt-0.5">
                    {expandedProject.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExpandedProject(null)}
                className="p-1 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0 ml-2"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Badges */}
            <div className="flex items-center gap-2 mb-3.5">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                {expandedProject.category}
              </span>
              {expandedProject.badge && (
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border"
                  style={{
                    color: expandedProject.color,
                    background: expandedProject.color + "15",
                    borderColor: expandedProject.color + "35",
                  }}
                >
                  {expandedProject.badge}
                </span>
              )}
              <span className="text-[10px] font-mono text-slate-500 ml-auto font-semibold">
                {expandedProject.date}
              </span>
            </div>

            {/* Description bullets */}
            <div className="space-y-2 mb-4 overflow-y-auto scrollbar-none">
              {expandedProject.description.map((line, i) => (
                <p
                  key={i}
                  className="text-xs sm:text-sm text-slate-300 leading-relaxed flex gap-2"
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: expandedProject.color }}
                  />
                  <span>{line}</span>
                </p>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 mb-4 pt-2 border-t border-slate-800/80">
              {expandedProject.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-semibold"
                  style={{ color: expandedProject.color }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex gap-2.5 pt-2">
              {expandedProject.link && (
                <a
                  href={expandedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2 font-bold rounded-xl text-xs transition-transform hover:scale-102 shadow-md flex-1 text-center"
                  style={{
                    background: expandedProject.color,
                    color: "#090D14",
                  }}
                >
                  <span>Launch Live Demo</span>{" "}
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {expandedProject.github && (
                <a
                  href={expandedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 text-slate-200 font-bold rounded-xl text-xs hover:bg-slate-700 transition-colors border border-slate-700 shadow-md flex-1 text-center"
                >
                  <span>View Repository</span>{" "}
                  <FaGithub className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
