"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  GraduationCap,
  ShoppingBag,
  Globe,
  ClipboardList,
  BookOpen,
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
  LayoutGrid,
  SlidersHorizontal,
  Sparkles,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectItem {
  title: string;
  subtitle: string;
  category: "Web & ERP" | "AI & ML" | "IoT & Hardware";
  description: string[];
  tech: string[];
  github?: string;
  link?: string;
  icon: React.ReactNode;
  color: string;
  date: string; // Added for timeline chronological order
}

const projectsList: ProjectItem[] = [
  {
    title: "Smart House using Arduino",
    subtitle: "IoT Home Automation System",
    category: "IoT & Hardware",
    description: [
      "Developed an Arduino-based home automation system.",
      "Integrated infrared and ultrasonic sensors for automated device control.",
      "Implemented real-time monitoring and smart automation features.",
    ],
    tech: ["Arduino", "C++", "Infrared Sensors", "Ultrasonic Sensors"],
    github: "https://github.com/nimrawani04",
    icon: <Cpu className="w-5 h-5" />,
    color: "#f97316",
    date: "Nov 2024",
  },
  {
    title: "Araaz E-Commerce Website",
    subtitle: "Full-Stack E-Commerce Platform",
    category: "Web & ERP",
    description: [
      "Developed a responsive e-commerce platform with product showcase pages.",
      "Integrated inquiry and contact workflows using Web3Forms.",
      "Deployed and optimized the application on Vercel.",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Web3Forms", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://araaaz.vercel.app/",
    icon: <ShoppingBag className="w-5 h-5" />,
    color: "#a855f7",
    date: "Dec 2024",
  },
  {
    title: "Academic Portal System",
    subtitle: "Full-Stack Academic Management System",
    category: "Web & ERP",
    description: [
      "Developed role-based portals for students, faculty members and administrators.",
      "Built attendance tracking, marks management, notices, resources and academic record modules.",
      "Implemented real-time academic workflows for managing day-to-day university operations.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "#4ade80",
    date: "Jan 2025",
  },
  {
    title: "BIS AI",
    subtitle: "Team Project · AI Product Verification Assistant",
    category: "AI & ML",
    description: [
      "Developed an AI assistant for product verification and standards compliance.",
      "Implemented multilingual chatbot interactions with source-backed responses.",
      "Built scalable backend workflows and Progressive Web App functionality.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://bis-ai.vercel.app/",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "#3b82f6",
    date: "Feb 2025",
  },
  {
    title: "Rasta AI",
    subtitle: "Team Project · AI-Powered Assistant Platform",
    category: "AI & ML",
    description: [
      "Built an AI-powered platform for document analysis and information retrieval.",
      "Integrated multilingual voice and text interactions using LLMs.",
      "Secured 2nd Position at the Cursor Kashmir Hackathon.",
    ],
    tech: ["React", "TypeScript", "AI APIs", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://cursor-hackathon-roan.vercel.app/",
    icon: <Map className="w-5 h-5" />,
    color: "#10b981",
    date: "Mar 2025",
  },
  {
    title: "Her Space",
    subtitle: "Women's Health Support Platform",
    category: "AI & ML",
    description: [
      "Developed a comprehensive platform combining health tracking, pregnancy planning, research resources, and AI-powered health support.",
      "Integrated mentorship, career opportunities, women-focused travel, professional discovery, and community experiences.",
      "Built resources for health awareness, research discovery, mental wellness, safety, and personalized support in one ecosystem.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "AI APIs",
      "Tailwind CSS",
      "Vercel",
    ],
    github: "https://github.com/nimrawani04",
    icon: <Heart className="w-5 h-5" />,
    color: "#f43f5e",
    date: "Apr 2025",
  },
  {
    title: "GaashAI",
    subtitle: "Multilingual AI Translation & Conversational Assistant",
    category: "AI & ML",
    description: [
      "Developed a multilingual AI assistant supporting Kashmiri, Urdu, and English communication and translation.",
      "Integrated OCR-based image recognition to extract and translate text from images and documents.",
      "Implemented voice input, text-to-speech, RTL support, and persistent chat sessions.",
    ],
    tech: [
      "React",
      "TypeScript",
      "AI APIs",
      "OCR",
      "Voice API",
      "Tailwind CSS",
      "Vercel",
    ],
    github: "https://github.com/nimrawani04",
    icon: <Languages className="w-5 h-5" />,
    color: "#8b5cf6",
    date: "May 2025",
  },
  {
    title: "Karawan",
    subtitle: "Team Project · Intercity Carpooling Platform for Kashmir",
    category: "Web & ERP",
    description: [
      "Developed a peer-to-peer carpooling platform connecting people travelling along the same routes across Kashmir.",
      "Enabled users to offer rides by publishing their route, date, available seats, and fare, while others can discover and join suitable rides.",
      "Implemented real-time ride search, bookings, in-ride chat, notifications, ratings, and cross-platform mobile support.",
    ],
    tech: [
      "React",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Maps API",
      "Tailwind CSS",
      "Vercel",
    ],
    github: "https://github.com/nimrawani04",
    icon: <Car className="w-5 h-5" />,
    color: "#14b8a6",
    date: "Jun 2025",
  },
  {
    title: "Sign Bridge India",
    subtitle: "Real-Time Indian Sign Language Communication Platform",
    category: "AI & ML",
    description: [
      "Developed a browser-based platform for real-time bidirectional translation between Indian Sign Language and spoken/written language.",
      "Integrated MediaPipe Vision AI for real-time sign recognition and a 3D avatar for generating ISL signs from text and speech.",
      "Implemented ISL grammar conversion, interactive gloss editing, bilingual support, and privacy-focused local processing.",
    ],
    tech: [
      "React",
      "TypeScript",
      "MediaPipe",
      "3D Avatar",
      "WebGL",
      "Tailwind CSS",
      "Vercel",
    ],
    github: "https://github.com/nimrawani04",
    icon: <Accessibility className="w-5 h-5" />,
    color: "#06b6d4",
    date: "Jul 2025",
  },
  {
    title: "CUK Acadex",
    subtitle: "Team Project · University ERP Platform",
    category: "Web & ERP",
    description: [
      "Contributed the Academic Portal System as a core module of the university ERP platform.",
      "Developed academic management features including attendance, marks, notices and student records.",
      "Implemented real-time academic workflows.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://ds-cuk.vercel.app/",
    icon: <BookOpen className="w-5 h-5" />,
    color: "#ec4899",
    date: "Jan 2026",
  },
  {
    title: "CUK Examination Management System",
    subtitle: "Secure Examination Administration Platform",
    category: "Web & ERP",
    description: [
      "Developed a role-based exam management system for faculty, HODs and administrators.",
      "Automated examination workflows including paper handling and leak prevention.",
      "Implemented secure access controls and administrative tools for confidential examination operations.",
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://secure-exam-flow.vercel.app/",
    icon: <ClipboardList className="w-5 h-5" />,
    color: "#f59e0b",
    date: "Mar 2026",
  },
  {
    title: "2AI Conference Website",
    subtitle: "Official International Conference Website",
    category: "Web & ERP",
    description: [
      "Designed and developed the complete frontend and user experience of the conference website.",
      "Built responsive interfaces for speakers, events, schedules and conference information.",
      "Optimized accessibility, performance and cross-device compatibility for public deployment.",
    ],
    tech: ["JavaScript", "TypeScript", "CSS", "HTML"],
    github: "https://github.com/nimrawani04",
    link: "https://2ai-conference.org/",
    icon: <Globe className="w-5 h-5" />,
    color: "#22d3ee",
    date: "Jun 2026",
  },
];

interface ProjectMarqueeProps {
  onOpenCookingGame: () => void;
  onOpenMemoryLab: () => void;
  onOpenBugDungeon: () => void;
  onOpenCityQuest: () => void;
  onOpenEducationCampus: () => void;
}

// Layout constants for Timeline (percent along the track).
const PAD_START = 8;
const PAD_END = 92;
const HEAD_START = 4;
const HEAD_END = 96;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
const smoothstep = (x: number) => x * x * (3 - 2 * x);

export const ProjectMarquee = ({
  onOpenCookingGame,
  onOpenMemoryLab,
  onOpenBugDungeon,
  onOpenCityQuest,
  onOpenEducationCampus,
}: ProjectMarqueeProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineScrollRef = useRef<HTMLDivElement>(null);
  const [expandedTile, setExpandedTile] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filtering projects based on chosen category
  const filteredProjects = useMemo(() => {
    return selectedCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const count = filteredProjects.length;

  // Timeline position mapping
  const positions = useMemo(() => {
    if (count === 0) return [];
    if (count === 1) return [50];
    return filteredProjects.map((_, i) =>
      r2(PAD_START + (PAD_END - PAD_START) * (i / (count - 1)))
    );
  }, [filteredProjects, count]);

  // Motion values for the horizontal timeline progress line and dot sweep
  const head = useMotionValue(0);
  const lit = useMotionValue(0);
  const headPct = useTransform(head, (v) =>
    r2(HEAD_START + (HEAD_END - HEAD_START) * v)
  );
  const headStr = useTransform(headPct, (p) => `${p}%`);

  const [activeCount, setActiveCount] = useState(0);
  const lastActive = useRef(-1);

  useEffect(() => {
    if (viewMode !== "timeline") return;

    let raf = 0;
    let start = 0;
    const SWEEP = 6000;
    const HOLD = 1500;
    const FADE = 850;
    const GAP = 550;
    const TOTAL = SWEEP + HOLD + FADE + GAP;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) % TOTAL;

      let p: number;
      let l: number;
      if (t < SWEEP) {
        p = smoothstep(t / SWEEP);
        l = Math.min(1, t / 450);
      } else if (t < SWEEP + HOLD) {
        p = 1;
        l = 1;
      } else if (t < SWEEP + HOLD + FADE) {
        p = 1;
        l = 1 - (t - SWEEP - HOLD) / FADE;
      } else {
        p = 0;
        l = 0;
      }

      head.set(p);
      lit.set(l);

      const reach = HEAD_START + (HEAD_END - HEAD_START) * p;
      let c = 0;
      for (const pos of positions) if (pos <= reach) c++;
      if (c !== lastActive.current) {
        lastActive.current = c;
        setActiveCount(c);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [viewMode, positions, head, lit]);

  // Convert vertical mouse wheel to horizontal scroll for the timeline
  useEffect(() => {
    const el = timelineScrollRef.current;
    if (!el || viewMode !== "timeline") return;
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollLeft += e.deltaY;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [viewMode]);

  const handleTileClick = (project: ProjectItem) => {
    setExpandedTile(expandedTile === project.title ? null : project.title);
  };

  const expandedProject = expandedTile
    ? projectsList.find((p) => p.title === expandedTile)
    : null;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative pt-20 sm:pt-28 md:pt-36 pb-16 bg-[#0C0C0C] w-full overflow-hidden"
    >
      <a id="portfolio-summary" className="sr-only" aria-hidden="true" />

      {/* Header & Controls */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-8 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/20 bg-cyan-500/10 text-cyan-400 text-xs font-bold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>All 12 Featured Projects</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Featured{" "}
          <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">
            Projects
          </span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm mt-2 max-w-xl mx-auto uppercase tracking-widest font-semibold">
          Explore all {filteredProjects.length} projects • Tap any card for details
        </p>

        {/* View Switcher & Category Filters */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-4 border-t border-slate-800/80">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none w-full sm:w-auto">
            {["All", "Web & ERP", "AI & ML", "IoT & Hardware"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedCategory === cat
                    ? "bg-slate-800 text-cyan-400 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {cat} {cat === "All" ? `(${projectsList.length})` : ""}
              </button>
            ))}
          </div>

          {/* Grid vs Timeline View Mode Toggle */}
          <div className="flex items-center gap-1 bg-slate-900/80 border border-slate-800 p-1 rounded-xl ml-auto">
            <button
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "grid"
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid View ({filteredProjects.length})</span>
            </button>
            <button
              onClick={() => setViewMode("timeline")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                viewMode === "timeline"
                  ? "bg-cyan-500 text-slate-950 shadow-md"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Timeline</span>
            </button>
          </div>
        </div>
      </div>

      {/* VIEW MODE 1: GRID VIEW (Default & Mobile Friendly - ALL 12 PROJECTS ALWAYS VISIBLE) */}
      {viewMode === "grid" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 animate-fade-in">
            {filteredProjects.map((project, idx) => (
              <div
                key={`grid-${project.title}-${idx}`}
                onClick={() => handleTileClick(project)}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/80 bg-slate-900/80 hover:bg-slate-850/90 backdrop-blur-md p-5 transition-all duration-300 hover:border-cyan-500/30 hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.2)] cursor-pointer animate-fade-in"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className="p-2.5 rounded-xl transition-transform group-hover:scale-110"
                      style={{
                        background: project.color + "18",
                        border: `1px solid ${project.color}35`,
                        color: project.color,
                      }}
                    >
                      {project.icon}
                    </div>

                    <span
                      className="text-[9px] uppercase font-extrabold tracking-wider px-2 py-0.5 rounded-full border"
                      style={{
                        color: project.color,
                        background: project.color + "12",
                        borderColor: project.color + "25",
                      }}
                    >
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-400 transition-colors leading-snug">
                    {project.title}
                  </h3>

                  <p
                    className="text-xs font-semibold mt-1"
                    style={{ color: project.color + "dd" }}
                  >
                    {project.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 mt-2.5 leading-relaxed line-clamp-3">
                    {project.description[0]}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/60">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {project.tech.slice(0, 4).map((techItem) => (
                      <span
                        key={techItem}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-350 border border-slate-800 font-medium"
                      >
                        {techItem}
                      </span>
                    ))}
                    {project.tech.length > 4 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-950 text-slate-500">
                        +{project.tech.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between gap-2 mt-2">
                    <span className="text-xs font-bold text-cyan-400 group-hover:text-cyan-300 flex items-center gap-1">
                      View details <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-800"
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
                          className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 transition-colors border border-cyan-500/30"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW MODE 2: TIMELINE VIEW (Horizontal Scrolling & Swipeable) */}
      {viewMode === "timeline" && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 select-none animate-fade-in">
          <div
            className={cn(
              "flex w-full flex-col rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-2xl relative"
            )}
          >
            {/* Header bar */}
            <div className="flex items-start justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-400/70">
                  Development Roadmap
                </p>
                <h3 className="mt-1 text-sm sm:text-base font-semibold text-white">
                  Chronological Project Journey
                </h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/60 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-emerald-400"
                    animate={{ scale: [1, 2.4], opacity: [0.6, 0] }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-[11px] font-medium tabular-nums text-zinc-300">
                  {activeCount} / {count} active
                </span>
              </div>
            </div>

            {/* Timeline stage with full custom scrollability */}
            <div
              ref={timelineScrollRef}
              className="relative overflow-x-auto touch-pan-x w-full"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "rgba(124,108,255,0.3) transparent",
              }}
            >
              <div className="relative" style={{ minWidth: `${Math.max(920, count * 155)}px`, height: "380px" }}>
                {/* Track + progress fill */}
                <div
                  className="pointer-events-none absolute inset-x-0 top-1/2 h-px -translate-y-1/2"
                  style={{
                    maskImage:
                      "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
                    WebkitMaskImage:
                      "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
                  }}
                >
                  <div className="absolute inset-0 bg-white/10" />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: headStr,
                      opacity: lit,
                      background:
                        "linear-gradient(to right, rgba(124,108,255,0.15), #7c6cff 60%, #5b8cff)",
                      boxShadow: "0 0 12px rgba(91,140,252,0.55)",
                    }}
                  />
                </div>

                {/* Comet head */}
                <motion.div
                  className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                  style={{ left: headStr, opacity: lit }}
                >
                  <motion.span
                    className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(91,140,252,0.55), transparent 70%)",
                    }}
                    animate={{ scale: [1, 2.1], opacity: [0.7, 0] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span
                    className="block h-2.5 w-2.5 rounded-full bg-white"
                    style={{ boxShadow: "0 0 10px 2px rgba(124,108,255,0.9)" }}
                  />
                </motion.div>

                {/* Milestones rendering */}
                {filteredProjects.map((project, i) => {
                  const side: "top" | "bottom" = i % 2 === 0 ? "top" : "bottom";
                  const active = i < activeCount;
                  const left = positions[i] || 50;
                  const isTop = side === "top";

                  return (
                    <div key={`timeline-${project.title}-${i}`}>
                      {/* Milestone Card */}
                      <div
                        className="absolute z-10 w-[140px] sm:w-[155px] -translate-x-1/2 cursor-pointer"
                        style={
                          isTop
                            ? { left: `${left}%`, bottom: "calc(50% + 28px)" }
                            : { left: `${left}%`, top: "calc(50% + 28px)" }
                        }
                        onClick={() => handleTileClick(project)}
                      >
                        <motion.div
                          className="relative overflow-hidden rounded-xl border p-3 backdrop-blur-sm group hover:scale-[1.02] transition-transform duration-200"
                          initial={false}
                          animate={{
                            y: active ? (isTop ? -4 : 4) : 0,
                            borderColor: active
                              ? `${project.color}73`
                              : "rgba(255,255,255,0.08)",
                            backgroundColor: active
                              ? "rgba(19,19,30,0.92)"
                              : "rgba(13,13,20,0.65)",
                            boxShadow: active
                              ? `0 14px 34px -14px ${project.color}88`
                              : "0 0px 0px 0px rgba(0,0,0,0)",
                          }}
                          transition={{ duration: 0.55, ease: EASE_OUT }}
                        >
                          <motion.span
                            className="absolute inset-x-3 top-0 h-px"
                            style={{
                              background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
                            }}
                            animate={{ opacity: active ? 1 : 0 }}
                            transition={{ duration: 0.5, ease: EASE_OUT }}
                          />

                          <div className="flex items-center gap-1.5 mb-1">
                            <span
                              className="flex items-center justify-center w-5 h-5 rounded-md"
                              style={{
                                background: active ? `${project.color}22` : "rgba(255,255,255,0.05)",
                                color: active ? project.color : "#71717a",
                              }}
                            >
                              {project.icon}
                            </span>
                            <span
                              className={cn(
                                "text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500",
                                active ? "text-violet-400" : "text-zinc-500"
                              )}
                            >
                              {project.category}
                            </span>
                          </div>

                          <span
                            className={cn(
                              "block text-[12px] sm:text-[13px] font-semibold leading-tight transition-colors duration-500 truncate",
                              active ? "text-white" : "text-zinc-300"
                            )}
                          >
                            {project.title}
                          </span>

                          <span
                            className={cn(
                              "mt-1 block text-[10px] leading-snug transition-colors duration-500 line-clamp-2",
                              active ? "text-zinc-400" : "text-zinc-500"
                            )}
                          >
                            {project.subtitle}
                          </span>

                          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <ChevronRight
                              className="w-3 h-3"
                              style={{ color: project.color }}
                            />
                          </div>
                        </motion.div>
                      </div>

                      {/* Connector Line */}
                      <motion.div
                        className="absolute z-0 w-px -translate-x-1/2"
                        style={
                          isTop
                            ? { left: `${left}%`, bottom: "50%", height: "28px" }
                            : { left: `${left}%`, top: "50%", height: "28px" }
                        }
                        initial={false}
                        animate={{
                          backgroundColor: active
                            ? `${project.color}80`
                            : "rgba(255,255,255,0.09)",
                        }}
                        transition={{ duration: 0.5, ease: EASE_OUT }}
                      />

                      {/* Dot on Center Track */}
                      <div
                        className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${left}%` }}
                      >
                        {active && (
                          <motion.span
                            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
                            style={{ background: `${project.color}35` }}
                            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
                            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                          />
                        )}
                        <motion.div
                          className="relative flex h-3 w-3 items-center justify-center rounded-full border"
                          initial={false}
                          animate={{
                            borderColor: active
                              ? `${project.color}e6`
                              : "rgba(255,255,255,0.2)",
                            backgroundColor: active ? project.color : "#0b0b10",
                            boxShadow: active
                              ? `0 0 10px 1px ${project.color}b3`
                              : "0 0 0 0 rgba(0,0,0,0)",
                          }}
                          transition={{ duration: 0.45, ease: EASE_OUT }}
                        >
                          <motion.span
                            className="h-1 w-1 rounded-full bg-white"
                            initial={false}
                            animate={{ opacity: active ? 1 : 0, scale: active ? 1 : 0.4 }}
                            transition={{ duration: 0.4, ease: EASE_OUT }}
                          />
                        </motion.div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scroll Hint Footer */}
            <div className="flex items-center justify-center gap-2 px-4 pb-3 pt-1 border-t border-white/5">
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
                ← Swipe or scroll horizontally to explore all shipped projects →
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Expanded project overlay — renders above everything, never clipped */}
      {expandedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
          onClick={() => setExpandedTile(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[340px] sm:max-w-[420px] md:max-w-[500px] h-auto max-h-[85vh] relative rounded-2xl shadow-2xl flex flex-col p-5 sm:p-6 overflow-y-auto scrollbar-none whitespace-normal text-left"
            style={{
              border: `1px solid ${expandedProject.color}60`,
              background: `linear-gradient(145deg, ${expandedProject.color}15, #0a0f1a 40%, #0d1117)`,
              animation: "fadeScaleIn 0.25s ease-out",
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="p-2 rounded-xl flex-shrink-0"
                  style={{
                    background: expandedProject.color + "20",
                    color: expandedProject.color,
                    border: `1px solid ${expandedProject.color}35`,
                  }}
                >
                  {expandedProject.icon}
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-base sm:text-lg font-extrabold leading-tight truncate"
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
                onClick={() => setExpandedTile(null)}
                className="p-1.5 rounded-lg hover:bg-white/10 text-slate-400 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Description bullets */}
            <div className="flex-1 space-y-2 mb-4 overflow-y-auto scrollbar-none">
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
            <div className="flex flex-wrap gap-1.5 mb-4">
              {expandedProject.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-mono font-semibold"
                  style={{
                    background: expandedProject.color + "18",
                    border: `1px solid ${expandedProject.color}30`,
                    color: expandedProject.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action links */}
            <div className="flex gap-2.5 pt-2 border-t border-slate-800">
              {expandedProject.link && (
                <a
                  href={expandedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2 font-bold rounded-xl text-xs transition-transform hover:scale-105 shadow-md flex-1 text-center"
                  style={{
                    background: expandedProject.color,
                    color: "#0a0f1a",
                  }}
                >
                  <span>Live Demo</span> <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
              {expandedProject.github && (
                <a
                  href={expandedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 px-4 py-2 bg-slate-800 text-slate-200 font-bold rounded-xl text-xs hover:bg-slate-700 transition-colors border border-slate-700 shadow-md flex-1 text-center"
                >
                  <span>GitHub</span> <FaGithub className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
