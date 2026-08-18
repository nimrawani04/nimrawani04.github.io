import { useState, useEffect, useRef } from "react";
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
  Accessibility
} from "lucide-react";
import { FaGithub } from "react-icons/fa";

interface ProjectItem {
  title: string;
  subtitle: string;
  description: string[];
  tech: string[];
  github?: string;
  link?: string;
  icon: React.ReactNode;
  color: string;
}

interface ProjectMarqueeProps {
  onOpenCookingGame: () => void;
  onOpenMemoryLab: () => void;
  onOpenBugDungeon: () => void;
  onOpenCityQuest: () => void;
  onOpenEducationCampus: () => void;
}

const projectsList: ProjectItem[] = [
  {
    title: "Academic Portal System",
    subtitle: "Full-Stack Academic Management System",
    description: [
      "Developed role-based portals for students, faculty members and administrators.",
      "Built attendance tracking, marks management, notices, resources and academic record modules.",
      "Implemented real-time academic workflows for managing day-to-day university operations."
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    icon: <GraduationCap className="w-5 h-5" />,
    color: "#4ade80",
  },
  {
    title: "CUK Examination Management System",
    subtitle: "Secure Examination Administration Platform",
    description: [
      "Developed a role-based exam management system for faculty, HODs and administrators.",
      "Automated examination workflows including paper handling and leak prevention.",
      "Implemented secure access controls and administrative tools for confidential examination operations."
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://secure-exam-flow.vercel.app/",
    icon: <ClipboardList className="w-5 h-5" />,
    color: "#f59e0b",
  },
  {
    title: "2AI Conference Website",
    subtitle: "Official International Conference Website",
    description: [
      "Designed and developed the complete frontend and user experience of the conference website.",
      "Built responsive interfaces for speakers, events, schedules and conference information.",
      "Optimized accessibility, performance and cross-device compatibility for public deployment."
    ],
    tech: ["JavaScript", "TypeScript", "CSS", "HTML"],
    github: "https://github.com/nimrawani04",
    link: "https://2ai-conference.org/",
    icon: <Globe className="w-5 h-5" />,
    color: "#22d3ee",
  },
  {
    title: "CUK Acadex",
    subtitle: "Team Project · University ERP Platform",
    description: [
      "Contributed the Academic Portal System as a core module of the university ERP platform.",
      "Developed academic management features including attendance, marks, notices and student records.",
      "Implemented real-time academic workflows."
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://ds-cuk.vercel.app/",
    icon: <BookOpen className="w-5 h-5" />,
    color: "#ec4899",
  },
  {
    title: "BIS AI",
    subtitle: "Team Project · AI Product Verification Assistant",
    description: [
      "Developed an AI assistant for product verification and standards compliance.",
      "Implemented multilingual chatbot interactions with source-backed responses.",
      "Built scalable backend workflows and Progressive Web App functionality."
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://bis-ai.vercel.app/",
    icon: <ShieldCheck className="w-5 h-5" />,
    color: "#3b82f6",
  },
  {
    title: "Rasta AI",
    subtitle: "Team Project · AI-Powered Assistant Platform",
    description: [
      "Built an AI-powered platform for document analysis and information retrieval.",
      "Integrated multilingual voice and text interactions using LLMs.",
      "Secured 2nd Position at the Cursor Kashmir Hackathon."
    ],
    tech: ["React", "TypeScript", "AI APIs", "Supabase", "PostgreSQL", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://cursor-hackathon-roan.vercel.app/",
    icon: <Map className="w-5 h-5" />,
    color: "#10b981",
  },
  {
    title: "Araaz E-Commerce Website",
    subtitle: "Full-Stack E-Commerce Platform",
    description: [
      "Developed a responsive e-commerce platform with product showcase pages.",
      "Integrated inquiry and contact workflows using Web3Forms.",
      "Deployed and optimized the application on Vercel."
    ],
    tech: ["HTML", "CSS", "JavaScript", "Web3Forms", "Vercel"],
    github: "https://github.com/nimrawani04",
    link: "https://araaaz.vercel.app/",
    icon: <ShoppingBag className="w-5 h-5" />,
    color: "#a855f7",
  },
  {
    title: "Smart House using Arduino",
    subtitle: "IoT Home Automation System",
    description: [
      "Developed an Arduino-based home automation system.",
      "Integrated infrared and ultrasonic sensors for automated device control.",
      "Implemented real-time monitoring and smart automation features."
    ],
    tech: ["Arduino", "C++", "Infrared Sensors", "Ultrasonic Sensors"],
    github: "https://github.com/nimrawani04",
    icon: <Cpu className="w-5 h-5" />,
    color: "#f97316",
  },
  {
    title: "Her Space",
    subtitle: "Women's Health Support Platform",
    description: [
      "Developed a comprehensive platform combining health tracking, pregnancy planning, research resources, and AI-powered health support.",
      "Integrated mentorship, career opportunities, women-focused travel, professional discovery, and community experiences.",
      "Built resources for health awareness, research discovery, mental wellness, safety, and personalized support in one ecosystem."
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "AI APIs", "Tailwind CSS", "Vercel"],
    github: "https://github.com/nimrawani04",
    icon: <Heart className="w-5 h-5" />,
    color: "#f43f5e",
  },
  {
    title: "GaashAI",
    subtitle: "Multilingual AI Translation & Conversational Assistant",
    description: [
      "Developed a multilingual AI assistant supporting Kashmiri, Urdu, and English communication and translation.",
      "Integrated OCR-based image recognition to extract and translate text from images and documents.",
      "Implemented voice input, text-to-speech, RTL support, and persistent chat sessions."
    ],
    tech: ["React", "TypeScript", "AI APIs", "OCR", "Voice API", "Tailwind CSS", "Vercel"],
    github: "https://github.com/nimrawani04",
    icon: <Languages className="w-5 h-5" />,
    color: "#8b5cf6",
  },
  {
    title: "Karawan",
    subtitle: "Team Project · Intercity Carpooling Platform for Kashmir",
    description: [
      "Developed a peer-to-peer carpooling platform connecting people travelling along the same routes across Kashmir.",
      "Enabled users to offer rides by publishing their route, date, available seats, and fare, while others can discover and join suitable rides.",
      "Implemented real-time ride search, bookings, in-ride chat, notifications, ratings, and cross-platform mobile support."
    ],
    tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Maps API", "Tailwind CSS", "Vercel"],
    github: "https://github.com/nimrawani04",
    icon: <Car className="w-5 h-5" />,
    color: "#14b8a6",
  },
  {
    title: "Sign Bridge India",
    subtitle: "Real-Time Indian Sign Language Communication Platform",
    description: [
      "Developed a browser-based platform for real-time bidirectional translation between Indian Sign Language and spoken/written language.",
      "Integrated MediaPipe Vision AI for real-time sign recognition and a 3D avatar for generating ISL signs from text and speech.",
      "Implemented ISL grammar conversion, interactive gloss editing, bilingual support, and privacy-focused local processing."
    ],
    tech: ["React", "TypeScript", "MediaPipe", "3D Avatar", "WebGL", "Tailwind CSS", "Vercel"],
    github: "https://github.com/nimrawani04",
    icon: <Accessibility className="w-5 h-5" />,
    color: "#06b6d4",
  },
];

export const ProjectMarquee = ({
  onOpenCookingGame,
  onOpenMemoryLab,
  onOpenBugDungeon,
  onOpenCityQuest,
  onOpenEducationCampus
}: ProjectMarqueeProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  const [expandedTile, setExpandedTile] = useState<string | null>(null);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            const sectionTop = rect.top + window.scrollY;
            const currentOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
            setOffset(currentOffset);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Split projects into four parts for mobile (4 rows of 3), three for desktop (3 rows of 4)
  const quarterLength = Math.ceil(projectsList.length / 4);
  const thirdLength = Math.ceil(projectsList.length / 3);
  
  // For mobile: 4 rows
  const row1Mobile = projectsList.slice(0, quarterLength);
  const row2Mobile = projectsList.slice(quarterLength, quarterLength * 2);
  const row3Mobile = projectsList.slice(quarterLength * 2, quarterLength * 3);
  const row4Mobile = projectsList.slice(quarterLength * 3);
  
  // For desktop: 3 rows
  const row1Desktop = projectsList.slice(0, thirdLength);
  const row2Desktop = projectsList.slice(thirdLength, thirdLength * 2);
  const row3Desktop = projectsList.slice(thirdLength * 2);

  // Triple each for seamless loop
  const row1 = [...row1Mobile, ...row1Mobile, ...row1Mobile];
  const row2 = [...row2Mobile, ...row2Mobile, ...row2Mobile];
  const row3 = [...row3Mobile, ...row3Mobile, ...row3Mobile];
  const row4 = [...row4Mobile, ...row4Mobile, ...row4Mobile];
  const row1Desk = [...row1Desktop, ...row1Desktop, ...row1Desktop];
  const row2Desk = [...row2Desktop, ...row2Desktop, ...row2Desktop];
  const row3Desk = [...row3Desktop, ...row3Desktop, ...row3Desktop];

  const handleTileClick = (project: ProjectItem) => {
    setExpandedTile(expandedTile === project.title ? null : project.title);
  };

  const expandedProject = expandedTile ? projectsList.find(p => p.title === expandedTile) : null;

  const renderTile = (project: ProjectItem, idx: number, rowPrefix: string) => {
    return (
      <div
        key={`${rowPrefix}-${project.title}-${idx}`}
        onClick={() => handleTileClick(project)}
        className="w-[260px] h-[170px] sm:w-[320px] sm:h-[200px] md:w-[380px] md:h-[240px] lg:w-[420px] lg:h-[270px] flex-shrink-0 relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-300 shadow-lg group"
        style={{
          border: '1px solid rgba(255,255,255,0.05)',
          background: 'linear-gradient(145deg, #0f172a, #0a0f1a 50%, #0d1117)',
        }}
      >
        {/* Name face (always visible) */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 rounded-2xl">
          <div
            className="mb-3 p-2.5 sm:p-3 md:p-3.5 rounded-xl transition-colors duration-300"
            style={{
              background: project.color + '15',
              border: `1px solid ${project.color}30`,
              color: project.color,
            }}
          >
            {project.icon}
          </div>
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-white text-center leading-tight whitespace-normal px-2">
            {project.title}
          </h3>
          <p
            className="text-[9px] sm:text-[10px] md:text-xs mt-1 sm:mt-1.5 font-medium text-center whitespace-normal px-2"
            style={{ color: project.color + 'aa' }}
          >
            {project.subtitle}
          </p>
          <div className="flex items-center gap-1 mt-2 sm:mt-3 text-[9px] sm:text-[10px] md:text-xs text-slate-500 uppercase tracking-widest font-semibold group-hover:text-slate-300 transition-colors">
            <span>View details</span>
            <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative pt-24 sm:pt-32 md:pt-40 pb-10 bg-[#0C0C0C] w-full overflow-hidden"
    >
      <a id="portfolio-summary" className="sr-only" aria-hidden="true" />
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
          Featured <span className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">Projects</span>
        </h2>
        <p className="text-slate-400 text-sm mt-3 uppercase tracking-widest font-semibold">
          Scroll to explore • Click to view details
        </p>
      </div>

      {/* Mobile: 4 rows */}
      <div className="flex flex-col gap-2 sm:gap-3 w-full md:hidden">
        {/* Row 1: Scrolls RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-2 whitespace-nowrap"
            style={{
              transform: `translateX(calc(-33.333% + ${offset - 200}px))`,
              willChange: "transform",
            }}
          >
            {row1.map((project, idx) => renderTile(project, idx, "row1"))}
          </div>
        </div>

        {/* Row 2: Scrolls LEFT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-2 whitespace-nowrap"
            style={{
              transform: `translateX(calc(-33.333% - ${offset - 200}px))`,
              willChange: "transform",
            }}
          >
            {row2.map((project, idx) => renderTile(project, idx, "row2"))}
          </div>
        </div>

        {/* Row 3: Scrolls RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-2 whitespace-nowrap"
            style={{
              transform: `translateX(calc(-33.333% + ${offset - 150}px))`,
              willChange: "transform",
            }}
          >
            {row3.map((project, idx) => renderTile(project, idx, "row3"))}
          </div>
        </div>

        {/* Row 4: Scrolls LEFT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-2 whitespace-nowrap"
            style={{
              transform: `translateX(calc(-33.333% - ${offset - 150}px))`,
              willChange: "transform",
            }}
          >
            {row4.map((project, idx) => renderTile(project, idx, "row4"))}
          </div>
        </div>
      </div>

      {/* Desktop: 3 rows */}
      <div className="hidden md:flex flex-col gap-3 w-full">
        {/* Row 1: Scrolls RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 whitespace-nowrap"
            style={{
              transform: `translateX(calc(-33.333% + ${offset - 200}px))`,
              willChange: "transform",
            }}
          >
            {row1Desk.map((project, idx) => renderTile(project, idx, "row1-desk"))}
          </div>
        </div>

        {/* Row 2: Scrolls LEFT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 whitespace-nowrap"
            style={{
              transform: `translateX(calc(-33.333% - ${offset - 200}px))`,
              willChange: "transform",
            }}
          >
            {row2Desk.map((project, idx) => renderTile(project, idx, "row2-desk"))}
          </div>
        </div>

        {/* Row 3: Scrolls RIGHT */}
        <div className="overflow-hidden w-full">
          <div
            className="flex gap-3 whitespace-nowrap"
            style={{
              transform: `translateX(calc(-33.333% + ${offset - 150}px))`,
              willChange: "transform",
            }}
          >
            {row3Desk.map((project, idx) => renderTile(project, idx, "row3-desk"))}
          </div>
        </div>
      </div>

      {/* Expanded project overlay — renders above everything, never clipped */}
      {expandedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setExpandedTile(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[340px] sm:max-w-[400px] md:max-w-[480px] h-auto max-h-[80vh] relative rounded-2xl shadow-2xl flex flex-col p-4 sm:p-5 md:p-6 overflow-y-auto scrollbar-none whitespace-normal text-left"
            style={{
              border: `1px solid ${expandedProject.color}60`,
              background: `linear-gradient(145deg, ${expandedProject.color}12, #0a0f1a 40%, #0d1117)`,
              animation: 'fadeScaleIn 0.25s ease-out',
            }}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 min-w-0">
                <div
                  className="p-1.5 rounded-lg flex-shrink-0"
                  style={{ background: expandedProject.color + '20', color: expandedProject.color }}
                >
                  {expandedProject.icon}
                </div>
                <div className="min-w-0">
                  <h3
                    className="text-sm sm:text-base font-bold leading-tight truncate"
                    style={{ color: expandedProject.color }}
                  >
                    {expandedProject.title}
                  </h3>
                  <p className="text-[9px] sm:text-[10px] text-slate-400 leading-tight truncate">
                    {expandedProject.subtitle}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setExpandedTile(null)}
                className="p-1 rounded-md hover:bg-white/10 text-slate-500 hover:text-white transition-colors flex-shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Description bullets */}
            <div className="flex-1 space-y-1.5 mb-3 overflow-y-auto scrollbar-none">
              {expandedProject.description.map((line, i) => (
                <p key={i} className="text-[9px] sm:text-[10px] md:text-xs text-slate-300 leading-relaxed flex gap-1.5">
                  <span className="mt-[3px] w-1 h-1 rounded-full flex-shrink-0" style={{ background: expandedProject.color }} />
                  <span>{line}</span>
                </p>
              ))}
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {expandedProject.tech.map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] sm:text-[9px] px-2 py-0.5 rounded-full font-mono font-medium"
                  style={{
                    background: expandedProject.color + '15',
                    border: `1px solid ${expandedProject.color}25`,
                    color: expandedProject.color,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action links */}
            <div className="flex gap-2">
              {expandedProject.link && (
                <a
                  href={expandedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 font-bold rounded-lg text-[9px] sm:text-[10px] transition-colors shadow-sm"
                  style={{ background: expandedProject.color, color: '#0a0f1a' }}
                >
                  Live Demo <ExternalLink className="w-3 h-3" />
                </a>
              )}
              {expandedProject.github && (
                <a
                  href={expandedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 text-slate-200 font-bold rounded-lg text-[9px] sm:text-[10px] hover:bg-slate-700 transition-colors border border-slate-700 shadow-sm"
                >
                  GitHub <FaGithub className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
