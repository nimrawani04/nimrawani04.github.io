"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  ExternalLink,
  X,
  ChevronRight,
  GraduationCap,
  ShoppingBag,
  Globe,
  ClipboardList,
  BookOpen,
  ShieldCheck,
  Map,
  Cpu,
  Heart,
  Languages,
  Car,
  Accessibility,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

/* ── Types ────────────────────────────────────────────────────────────── */

interface ProjectMilestone {
  date: string;
  title: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
  color: string;
  details: string[];
  icon: React.ReactNode;
}

interface ProjectTimelineProps {
  onOpenCookingGame: () => void;
  onOpenMemoryLab: () => void;
  onOpenBugDungeon: () => void;
  onOpenCityQuest: () => void;
  onOpenEducationCampus: () => void;
}

/* ── Milestone data ───────────────────────────────────────────────────── */

const PROJECT_MILESTONES: ProjectMilestone[] = [
  {
    date: "Nov 2024",
    title: "Smart House – Arduino",
    description: "IoT-based home automation prototype with multi-sensor integration.",
    tech: ["Arduino", "C++", "IR Sensors", "Ultrasonic"],
    github: "https://github.com/nimrawani04",
    color: "#f97316",
    details: [
      "Designed IoT-based home automation with multiple sensors.",
      "Intelligent environmental control via infrared & ultrasonic sensors.",
      "First hardware project bridging software and physical computing.",
    ],
    icon: <Cpu className="w-4 h-4" />,
  },
  {
    date: "Dec 2024",
    title: "Araaz E-Commerce",
    description: "Modern responsive e-commerce with automated contact handling.",
    tech: ["HTML", "CSS", "JS", "Web3Forms", "Vercel"],
    github: "https://github.com/nimrawani04",
    live: "https://araaaz.vercel.app/",
    color: "#a855f7",
    details: [
      "Fully responsive e-commerce website with modern UI/UX.",
      "Automated contact form handling via Web3Forms.",
      "Performance-optimized with lazy-loaded product images.",
    ],
    icon: <ShoppingBag className="w-4 h-4" />,
  },
  {
    date: "Jan 2025",
    title: "Academic Portal – CUK",
    description: "Full-stack portal with role-based auth and attendance tracking.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    github: "https://github.com/nimrawani04",
    color: "#4ade80",
    details: [
      "Role-based portals for students, faculty, and administrators.",
      "Attendance tracking, marks management, and exam workflows.",
      "Real-time academic data sync with Supabase.",
    ],
    icon: <GraduationCap className="w-4 h-4" />,
  },
  {
    date: "Feb 2025",
    title: "BIS AI",
    description: "AI product safety assistant with RAG pipeline & multilingual support.",
    tech: ["React", "TypeScript", "Supabase", "PWA"],
    github: "https://github.com/nimrawani04",
    live: "https://bis-ai.vercel.app/",
    color: "#3b82f6",
    details: [
      "AI-powered product verification against BIS standards.",
      "RAG pipeline for context-aware responses.",
      "Offline-first PWA with multilingual NLP support.",
    ],
    icon: <ShieldCheck className="w-4 h-4" />,
  },
  {
    date: "Mar 2025",
    title: "Rasta AI",
    description: "Multi-domain AI platform — documents, crops, youth services.",
    tech: ["React", "TypeScript", "Supabase", "Voice API"],
    github: "https://github.com/nimrawani04",
    live: "https://cursor-hackathon-roan.vercel.app/",
    color: "#10b981",
    details: [
      "Four AI domains: documents, crops, youth, and guidance.",
      "Won 2nd place at Cursor Kashmir Hackathon.",
      "Voice & text multimodal interaction.",
    ],
    icon: <Map className="w-4 h-4" />,
  },
  {
    date: "Apr 2025",
    title: "Her Space",
    description: "Women's health tracking, AI coaching, and community platform.",
    tech: ["React", "TypeScript", "Supabase", "AI APIs"],
    github: "https://github.com/nimrawani04",
    color: "#f43f5e",
    details: [
      "Health tracking, pregnancy planning, and AI-powered support.",
      "Mentorship, career opportunities, and community features.",
      "Strict privacy controls for sensitive health data.",
    ],
    icon: <Heart className="w-4 h-4" />,
  },
  {
    date: "May 2025",
    title: "GaashAI",
    description: "Multilingual AI for Kashmiri, Urdu & English with OCR + voice.",
    tech: ["React", "TypeScript", "OCR", "Voice API"],
    github: "https://github.com/nimrawani04",
    color: "#8b5cf6",
    details: [
      "Kashmiri, Urdu, and English translation with OCR.",
      "Voice input and speech synthesis with RTL support.",
      "Persistent chat sessions and dialect dictionary lookups.",
    ],
    icon: <Languages className="w-4 h-4" />,
  },
  {
    date: "Jun 2025",
    title: "Karawan",
    description: "Intercity carpooling across Kashmir with real-time messaging.",
    tech: ["React", "TypeScript", "Supabase", "Maps API"],
    github: "https://github.com/nimrawani04",
    color: "#14b8a6",
    details: [
      "Peer-to-peer ride sharing across Kashmir valleys.",
      "Real-time search, bookings, messaging, and ratings.",
      "Dual booking portals for drivers and passengers.",
    ],
    icon: <Car className="w-4 h-4" />,
  },
  {
    date: "Jul 2025",
    title: "Sign Bridge India",
    description: "Real-time ISL translation with MediaPipe + 3D avatar.",
    tech: ["React", "MediaPipe", "WebGL", "3D Avatar"],
    github: "https://github.com/nimrawani04",
    color: "#06b6d4",
    details: [
      "Real-time bidirectional sign language translation.",
      "MediaPipe Vision AI for hands/pose tracking in-browser.",
      "3D avatar animation renderer for ISL signs.",
    ],
    icon: <Accessibility className="w-4 h-4" />,
  },
  {
    date: "Jan 2026",
    title: "CUK Acadex",
    description: "University-wide student & teacher portals with role dashboards.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    github: "https://github.com/nimrawani04",
    live: "https://ds-cuk.vercel.app/",
    color: "#ec4899",
    details: [
      "Dual portals for students and teachers.",
      "Role-based dashboards with attendance and marks.",
      "Seamless cross-role data flow and notices.",
    ],
    icon: <BookOpen className="w-4 h-4" />,
  },
  {
    date: "Mar 2026",
    title: "CUK Exam System",
    description: "Secure exam management with RBAC and real-time data handling.",
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
    github: "https://github.com/nimrawani04",
    live: "https://secure-exam-flow.vercel.app/",
    color: "#f59e0b",
    details: [
      "Secure role-based access control for exam workflows.",
      "Real-time exam scheduling and monitoring.",
      "Row-level security with optimistic UI updates.",
    ],
    icon: <ClipboardList className="w-4 h-4" />,
  },
  {
    date: "Jun 2026",
    title: "2AI Conference Website",
    description: "Official 2026 International Conference on Applied AI site.",
    tech: ["JavaScript", "TypeScript", "CSS", "HTML"],
    github: "https://github.com/nimrawani04",
    live: "https://2ai-conference.org/",
    color: "#22d3ee",
    details: [
      "Official website for international AI conference.",
      "Clean modern UI with responsive, accessible design.",
      "Built for a global academic audience.",
    ],
    icon: <Globe className="w-4 h-4" />,
  },
];

/* ── Layout constants ─────────────────────────────────────────────────── */

const PAD_START = 6;
const PAD_END = 94;
const HEAD_START = 2;
const HEAD_END = 98;
const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const r2 = (n: number) => Math.round(n * 100) / 100;
const smoothstep = (x: number) => x * x * (3 - 2 * x);

/* ── Main component ───────────────────────────────────────────────────── */

export function ProjectTimeline({
  onOpenCookingGame,
  onOpenMemoryLab,
  onOpenBugDungeon,
  onOpenCityQuest,
  onOpenEducationCampus,
}: ProjectTimelineProps) {
  const milestones = PROJECT_MILESTONES;
  const count = milestones.length;

  const positions = useMemo(() => {
    if (count <= 1) return milestones.map(() => (PAD_START + PAD_END) / 2);
    return milestones.map((_, i) =>
      r2(PAD_START + (PAD_END - PAD_START) * (i / (count - 1)))
    );
  }, [milestones, count]);

  const head = useMotionValue(0);
  const lit = useMotionValue(0);
  const headPct = useTransform(head, (v) =>
    r2(HEAD_START + (HEAD_END - HEAD_START) * v)
  );
  const headStr = useTransform(headPct, (p) => `${p}%`);

  const [activeCount, setActiveCount] = useState(0);
  const lastActive = useRef(-1);
  const [selectedProject, setSelectedProject] = useState<ProjectMilestone | null>(null);

  useEffect(() => {
    let raf = 0;
    let start = 0;
    const SWEEP = 8000;
    const HOLD = 2000;
    const FADE = 1000;
    const GAP = 600;
    const TOTAL = SWEEP + HOLD + FADE + GAP;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const t = (ts - start) % TOTAL;

      let p: number;
      let l: number;
      if (t < SWEEP) {
        p = smoothstep(t / SWEEP);
        l = Math.min(1, t / 500);
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
  }, [positions, head, lit]);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-slate-100">
            Featured{" "}
            <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-slate-400 text-sm max-w-2xl mx-auto uppercase tracking-widest font-semibold">
            A timeline of shipped products — from IoT prototypes to AI platforms
          </p>
        </motion.div>

        {/* Timeline card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "flex w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60 backdrop-blur-md shadow-2xl",
            "min-h-[420px] sm:min-h-[480px]"
          )}
        >
          {/* Header bar */}
          <div className="flex items-start justify-between px-4 sm:px-6 pt-4 sm:pt-5 pb-2">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-violet-400/70">
                Development Journey
              </p>
              <h3 className="mt-1 text-sm sm:text-base font-semibold text-white">
                Building through 2024 – 2026
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
                {activeCount} / {count} shipped
              </span>
            </div>
          </div>

          {/* Timeline stage */}
          <div className="scrollbar-none relative flex-1 overflow-x-auto">
            <div className="relative h-full" style={{ minWidth: `${Math.max(900, count * 130)}px` }}>
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

              {/* Milestone nodes */}
              {milestones.map((m, i) => {
                const side: "top" | "bottom" = i % 2 === 0 ? "top" : "bottom";
                const active = i < activeCount;
                return (
                  <MilestoneNode
                    key={m.title}
                    milestone={m}
                    left={positions[i]}
                    side={side}
                    active={active}
                    onClick={() => setSelectedProject(m)}
                  />
                );
              })}
            </div>
          </div>

          {/* Scroll hint */}
          <div className="flex items-center justify-center gap-2 px-4 pb-3 pt-1">
            <span className="text-[10px] text-slate-500 uppercase tracking-widest font-medium">
              ← Scroll to explore all projects →
            </span>
          </div>
        </motion.div>
      </div>

      {/* Project detail modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ── Milestone Node ───────────────────────────────────────────────────── */

function MilestoneNode({
  milestone,
  left,
  side,
  active,
  onClick,
}: {
  milestone: ProjectMilestone;
  left: number;
  side: "top" | "bottom";
  active: boolean;
  onClick: () => void;
}) {
  const isTop = side === "top";
  return (
    <>
      {/* Card */}
      <div
        className="absolute z-10 w-[140px] sm:w-[150px] -translate-x-1/2 cursor-pointer"
        style={
          isTop
            ? { left: `${left}%`, bottom: "calc(50% + 28px)" }
            : { left: `${left}%`, top: "calc(50% + 28px)" }
        }
        onClick={onClick}
      >
        <motion.div
          className="relative overflow-hidden rounded-xl border p-2.5 sm:p-3 backdrop-blur-sm group"
          initial={false}
          animate={{
            y: active ? (isTop ? -4 : 4) : 0,
            borderColor: active
              ? `${milestone.color}73`
              : "rgba(255,255,255,0.08)",
            backgroundColor: active
              ? "rgba(19,19,30,0.92)"
              : "rgba(13,13,20,0.65)",
            boxShadow: active
              ? `0 14px 34px -14px ${milestone.color}88`
              : "0 0px 0px 0px rgba(0,0,0,0)",
          }}
          transition={{ duration: 0.55, ease: EASE_OUT }}
        >
          {/* Top highlight */}
          <motion.span
            className="absolute inset-x-3 top-0 h-px"
            style={{
              background: `linear-gradient(to right, transparent, ${milestone.color}, transparent)`,
            }}
            animate={{ opacity: active ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE_OUT }}
          />

          {/* Date + icon */}
          <div className="flex items-center gap-1.5 mb-1">
            <span
              className="flex items-center justify-center w-5 h-5 rounded-md"
              style={{
                background: active ? `${milestone.color}22` : "rgba(255,255,255,0.05)",
                color: active ? milestone.color : "#71717a",
              }}
            >
              {milestone.icon}
            </span>
            <span
              className={cn(
                "text-[9px] font-semibold uppercase tracking-[0.12em] transition-colors duration-500",
                active ? "text-violet-400" : "text-zinc-500"
              )}
            >
              {milestone.date}
            </span>
          </div>

          {/* Title */}
          <span
            className={cn(
              "block text-[12px] sm:text-[13px] font-semibold leading-tight transition-colors duration-500",
              active ? "text-white" : "text-zinc-300"
            )}
          >
            {milestone.title}
          </span>

          {/* Description */}
          <span
            className={cn(
              "mt-1 block text-[10px] leading-snug transition-colors duration-500 line-clamp-2",
              active ? "text-zinc-400" : "text-zinc-500"
            )}
          >
            {milestone.description}
          </span>

          {/* Hover arrow */}
          <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <ChevronRight
              className="w-3.5 h-3.5"
              style={{ color: milestone.color }}
            />
          </div>
        </motion.div>
      </div>

      {/* Connector line */}
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
            ? `${milestone.color}80`
            : "rgba(255,255,255,0.09)",
        }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
      />

      {/* Dot on track */}
      <div
        className="absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
        style={{ left: `${left}%` }}
      >
        {active && (
          <motion.span
            className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: `${milestone.color}59` }}
            animate={{ scale: [1, 2.2], opacity: [0.5, 0] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
          />
        )}
        <motion.div
          className="relative flex h-3 w-3 items-center justify-center rounded-full border"
          initial={false}
          animate={{
            borderColor: active
              ? `${milestone.color}e6`
              : "rgba(255,255,255,0.2)",
            backgroundColor: active ? milestone.color : "#0b0b10",
            boxShadow: active
              ? `0 0 10px 1px ${milestone.color}b3`
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
    </>
  );
}

/* ── Project detail modal ─────────────────────────────────────────────── */

function ProjectModal({
  project,
  onClose,
}: {
  project: ProjectMilestone;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-lg rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-md shadow-2xl overflow-hidden"
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: EASE_OUT }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(to right, transparent, ${project.color}, transparent)`,
          }}
        />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div
                className="flex items-center justify-center w-10 h-10 rounded-xl border"
                style={{
                  borderColor: `${project.color}45`,
                  background: `${project.color}1f`,
                  color: project.color,
                }}
              >
                {project.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-white leading-tight">
                  {project.title}
                </h3>
                <p className="text-[11px] font-semibold uppercase tracking-widest mt-0.5" style={{ color: project.color }}>
                  {project.date}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Description */}
          <p className="text-sm text-slate-300 leading-relaxed mb-4">
            {project.description}
          </p>

          {/* Details */}
          <div className="space-y-2 mb-5">
            {project.details.map((d, i) => (
              <div key={i} className="flex items-start gap-2 text-[13px] text-slate-400">
                <ChevronRight className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: project.color }} />
                <span>{d}</span>
              </div>
            ))}
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide border"
                style={{
                  color: project.color,
                  borderColor: `${project.color}30`,
                  background: `${project.color}12`,
                }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold text-white transition-all hover:scale-[1.02]"
                style={{ background: project.color }}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold border border-white/15 text-slate-300 hover:text-white hover:border-white/30 transition-all"
              >
                <FaGithub className="w-3.5 h-3.5" />
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default ProjectTimeline;
