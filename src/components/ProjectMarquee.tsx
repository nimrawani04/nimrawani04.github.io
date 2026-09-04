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
    title: "2AI Conference Website",
    subtitle: "Team Project · Official International Conference Website",
    category: "Web & ERP",
    description: [
      "Collaborated as a team on designing and developing the complete frontend and user experience of the conference website.",
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
];

interface ProjectMarqueeProps {
  onOpenCookingGame: () => void;
  onOpenMemoryLab: () => void;
  onOpenBugDungeon: () => void;
  onOpenCityQuest: () => void;
  onOpenEducationCampus: () => void;
}

export const ProjectMarquee = ({
  onOpenCookingGame,
  onOpenMemoryLab,
  onOpenBugDungeon,
  onOpenCityQuest,
  onOpenEducationCampus,
}: ProjectMarqueeProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [expandedTile, setExpandedTile] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Filtering projects based on chosen category
  const filteredProjects = useMemo(() => {
    return selectedCategory === "All"
      ? projectsList
      : projectsList.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

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

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-6 pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {["All", "Web & ERP", "AI & ML", "IoT & Hardware"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedCategory === cat
                    ? "bg-slate-800 text-cyan-400 border-cyan-500/40 shadow-[0_0_12px_rgba(6,182,212,0.15)]"
                    : "bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white"
                }`}
              >
                {cat} {cat === "All" ? `(${projectsList.length})` : ""}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GRID VIEW */}
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
