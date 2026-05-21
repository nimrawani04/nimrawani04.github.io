import { useState, useEffect } from "react";
import { DecryptedText } from "@/components/DecryptedText";
import { Dock } from "@/components/Dock";
import { LetterGlitch } from "@/components/LetterGlitch";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import CookingGame from "@/components/CookingGame";
import CityQuest from "@/components/CityQuest";
import BugDungeon from "@/components/BugDungeon";
import MemoryLab from "@/components/MemoryLab";
import EducationCampus from "@/components/EducationCampus";
import { Folder } from "@/components/Folder";
import { Masonry } from "@/components/Masonry";
import { BentoGrid } from "@/components/BentoGrid";
import {
  Home,
  User,
  Briefcase,
  Code,
  Award,
  Mail,
  ExternalLink,
  Download,
  Gamepad2,
  Car,
  FolderOpen,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Index = () => {
  const [showGame, setShowGame] = useState(() => new URLSearchParams(window.location.search).has("kitchen") || new URLSearchParams(window.location.search).has("kitchengame"));
  const [showCityQuest, setShowCityQuest] = useState(() => new URLSearchParams(window.location.search).has("city") || new URLSearchParams(window.location.search).has("cityquest"));
  const [showBugDungeon, setShowBugDungeon] = useState(() => new URLSearchParams(window.location.search).has("dungeon") || new URLSearchParams(window.location.search).has("bugdungeon"));
  const [showMemoryLab, setShowMemoryLab] = useState(() => new URLSearchParams(window.location.search).has("memory") || new URLSearchParams(window.location.search).has("memorylab"));
  const [showEducationCampus, setShowEducationCampus] = useState(() => new URLSearchParams(window.location.search).has("education") || new URLSearchParams(window.location.search).has("campus"));
  const [showArcadeHub, setShowArcadeHub] = useState(false);
  const [isAboutFolderOpen, setIsAboutFolderOpen] = useState(false);

  // Reset scroll and disable main body scrolling when a game is active
  useEffect(() => {
    const isAnyGameActive = showGame || showCityQuest || showBugDungeon || showMemoryLab || showEducationCampus;
    if (isAnyGameActive) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showGame, showCityQuest, showBugDungeon, showMemoryLab, showEducationCampus]);

  const dockItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "#hero" },
    { 
      icon: <User className="w-5 h-5" />, 
      label: "About", 
      onClick: () => setIsAboutFolderOpen(true) 
    },
    {
      icon: <Code className="w-5 h-5" />,
      label: "Projects",
      href: "#projects",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Journey",
      href: "#journey",
    },
    { icon: <Mail className="w-5 h-5" />, label: "Contact", href: "#contact" },
    {
      icon: <Gamepad2 className="w-5 h-5" />,
      label: "Arcade",
      onClick: () => setShowArcadeHub(true),
    },
  ];
  const projects = [
    {
      title: "Academic Portal System – Central University of Kashmir",
      description:
        "Designed and developed a full-stack academic portal for students and faculty, featuring role-based authentication and personalized dashboards. Implemented core academic functionalities including attendance tracking, marks management, notices, and exam-related workflows with structured data handling and intuitive UI/UX.",
      tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
    },

    {
      title: "Araaz E-commerce Website",
      description:
        "Developed a fully responsive e-commerce website with automated contact handling using Web3Forms and deployed it on Vercel.",
      tech: ["HTML", "CSS", "JavaScript", "Web3Forms", "Vercel"],
      link: "https://araaaz.vercel.app/",
    },

    {
      title: "2AI Conference Website – 2026 International Conference on Applied Artificial Intelligence (Team Project)",
      description:
        "Collaborated on the design and development of the official conference website, focusing on crafting a clean, modern UI/UX and implementing a responsive, user-friendly frontend. Contributed to structuring content for accessibility and seamless navigation, ensuring an engaging experience for global attendees and researchers.",
      tech: ["JavaScript", "TypeScript", "CSS", "HTML"],
    },

    {
      title: "CUK Examination Management System (Team Project)",
      description:
        "Collaboratively developed a secure and scalable examination management system with role-based access control and real-time data handling. Contributed to authentication workflows, structured database design, and responsive UI to streamline exam scheduling, data management, and user interactions.",
      tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
      link: "https://secure-exam-flow.vercel.app/",
    },

    {
      title: "CUK Acadex (Team Project)",
      description:
        "Contributed to the development of a university-wide academic portal for Central University of Kashmir by building student and teacher portals with role-based dashboards. Implemented features enabling access to attendance, marks, notices, and exam-related information, focusing on structured data flow, usability, and responsive UI design.",
      tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "Vercel"],
      link: "https://ds-cuk.vercel.app/",
    },
    {
      title: "BIS AI – Product Safety Assistant (Team Project)",
      description:
        "Built an AI-powered product verification platform inspired by BIS standards, enabling users to check product authenticity and compliance with Indian regulations. Integrated an intelligent chatbot with multilingual support to provide real-time guidance and improve accessibility. Designed scalable backend workflows and a responsive PWA interface.",
      tech: ["React", "TypeScript", "Supabase", "PostgreSQL", "PWA", "Vercel"],
      link: "https://bis-ai.vercel.app/",
    },

    {
      title: "Raasta – AI Platform for Kashmir (Team Project)",
      description:
        "Collaboratively developed Raasta, a multi-domain AI platform for Kashmir, structured across Smjho, Zameen, Taleem, and Raah (document understanding, crop intelligence, education, and career guidance). Integrated voice/text interaction, multilingual navigation, and Firecrawler-powered scraping pipelines to deliver real-time, actionable information with a focus on accessibility and scalability.",
      tech: ["React", "TypeScript", "AI APIs", "Firecrawler", "Supabase", "PostgreSQL", "Vercel"],
      link: "https://cursor-hackathon-roan.vercel.app/",
    },

    {
      title: "Smart House using Arduino",
      description:
        "Designed an IoT-based home automation prototype integrating multiple sensors for intelligent environmental control.",
      tech: ["Arduino", "C++", "Infrared", "Ultrasonic Sensors"],
    },
  ];


  const handleClick = () => {
    window.open("/nimra-wani-resume.pdf");
  };
  if (showEducationCampus) {
    return <EducationCampus onBack={() => setShowEducationCampus(false)} />;
  }
  if (showMemoryLab) {
    return <MemoryLab onBack={() => setShowMemoryLab(false)} />;
  }
  if (showBugDungeon) {
    return <BugDungeon onBack={() => setShowBugDungeon(false)} />;
  }
  if (showCityQuest) {
    return <CityQuest onBack={() => setShowCityQuest(false)} />;
  }
  if (showGame) {
    return <CookingGame onBack={() => setShowGame(false)} />;
  }

  return (
    <div className="relative min-h-screen pb-32">
      <LetterGlitch
        glitchColors={[
          "rgba(99, 230, 190, 0.3)",
          "rgba(34, 211, 238, 0.3)",
          "rgba(56, 189, 248, 0.3)",
        ]}
        glitchSpeed={60}
      />

      <div className="relative z-10">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-screen flex items-center justify-center px-6"
        >
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="mb-6">
                <DecryptedText
                  text="NIMRA WANI"
                  className="text-5xl md:text-7xl font-bold text-gradient glow-text mb-4"
                  speed={30}
                  maxIterations={8}
                />
              </div>
              <motion.p
                className="text-xl md:text-2xl text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              >
                Computer Science Student | Full Stack Developer | AI/ML
                Enthusiast
              </motion.p>
              <motion.div
                className="flex gap-4 justify-center flex-wrap"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <a
                  href="https://github.com/nimrawani04"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="default" size="lg" className="gap-2">
                    <FaGithub className="w-5 h-5" />
                    GitHub
                  </Button>
                </a>
                <a
                  href="https://linkedin.com/in/nimra-wani-b32438359"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <FaLinkedin className="w-5 h-5" />
                    LinkedIn
                  </Button>
                </a>
                <Button
                  onClick={handleClick}
                  variant="secondary"
                  size="lg"
                  className="gap-2"
                >
                  <Download className="w-5 h-5" />
                  Resume
                </Button>
                <Button
                  onClick={() => setIsAboutFolderOpen(true)}
                  variant="outline"
                  size="lg"
                  className="gap-2 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 font-bold transition-all hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                >
                  <FolderOpen className="w-5 h-5 animate-pulse" />
                  About
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <Folder isOpen={isAboutFolderOpen} onClose={() => setIsAboutFolderOpen(false)} />

        {/* Projects Section */}
        <section id="projects" className="py-24 px-6 bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Featured <span className="text-gradient">Projects</span>
              </h2>
              <Masonry items={projects} />
            </motion.div>
          </div>
        </section>

        {/* Journey & Credentials Section (Bento Grid Dashboard) */}
        <section id="journey" className="py-24 bg-muted/10 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-12"
            >
              <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tight uppercase text-slate-100">
                  Credentials & <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400 bg-clip-text text-transparent">Journey</span>
                </h2>
                <p className="text-slate-400 text-sm max-w-2xl mx-auto uppercase tracking-widest font-semibold">
                  A high-fidelity layout showcasing experience, academics, achievements & certifications
                </p>
              </div>

              <BentoGrid />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 px-6 bg-muted/20">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                Get In <span className="text-gradient">Touch</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-12">
                I'm always open to discussing new projects, creative ideas, or
                opportunities to be part of your vision.
              </p>

              <div className="flex flex-col gap-4 items-center">
                <a href="mailto:nimrawani04@gmail.com">
                  <Button size="lg" className="gap-2 text-lg px-8">
                    <Mail className="w-5 h-5" />
                    nimrawani04@gmail.com
                  </Button>
                </a>

                <div className="flex gap-4 mt-4">
                  <a
                    href="https://github.com/nimrawani04"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <FaGithub className="w-5 h-5" />
                    </Button>
                  </a>
                  <a
                    href="https://linkedin.com/in/nimra-wani-b32438359"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <FaLinkedin className="w-5 h-5" />
                    </Button>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 px-6 border-t border-border/50">
          <div className="max-w-7xl mx-auto text-center text-muted-foreground">
            <p>
              © 2026 Nimra Wani.
            </p>
          </div>
        </footer>
      </div>

      {showArcadeHub && (
        <div className="fixed inset-0 z-50 flex sm:items-center items-start justify-center bg-slate-950/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-6xl bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden font-sans text-left my-8 sm:my-0"
          >
            {/* Close Button */}
            <button 
              onClick={() => setShowArcadeHub(false)} 
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all border border-slate-700"
              title="Close Arcade"
            >
              ✕
            </button>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">
                NIMRA'S ARCADE
              </h2>
              <p className="text-slate-400 text-sm mt-2 max-w-lg mx-auto">
                Step into an interactive portfolio sandbox! Choose your game mode to explore my skills, certifications, and career journey.
              </p>
            </div>

            {/* Selector Grid */}
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-1 gap-5 w-full max-w-6xl mx-auto pb-32">
              
              {/* Game 1: Cooking Kitchen */}
              <div 
                onClick={() => { setShowGame(true); setShowArcadeHub(false); }}
                className="group relative flex flex-col justify-between bg-gradient-to-br from-emerald-950/40 to-slate-900/90 border border-emerald-500/10 hover:border-emerald-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" role="img" aria-label="Cooking Pot">🍳</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Interactive Cooker
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    Nimra's Kitchen
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    Enter a beautiful 2.5D active kitchen setup! Select cookware, pick from 22 tech stack ingredients (React Flour, SQL Sauce, Tailwind Seasoning), ignite burners, turn control knobs, and compile recipes to plate delicious project showcases.
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-[10px] rounded transition-all group-hover:scale-[1.02] shadow-[0_4px_12px_rgba(16,185,129,0.2)]">
                    ENTER KITCHEN 🍳
                  </button>
                </div>
              </div>

              {/* Game 2: City Quest */}
              <div 
                onClick={() => { setShowCityQuest(true); setShowArcadeHub(false); }}
                className="group relative flex flex-col justify-between bg-gradient-to-br from-cyan-950/40 to-slate-900/90 border border-cyan-500/10 hover:border-cyan-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" role="img" aria-label="Sports Car">🏎️</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      2.5D Driving Game
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-cyan-400 transition-colors">
                    City Quest
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    Select a ride from the showroom garage (Phantom GTR, cyberCycle, Hover Pod) and explore a glowing neon sandbox city. Drive to discover achievements, certifications, events, and milestones with dynamic synthesized audio and fireworks!
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 px-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] rounded transition-all group-hover:scale-[1.02] shadow-[0_4px_12px_rgba(6,182,212,0.2)]">
                    DRIVE IN CITY 🏎️
                  </button>
                </div>
              </div>

              {/* Game 3: Bug Dungeon */}
              <div 
                onClick={() => { setShowBugDungeon(true); setShowArcadeHub(false); }}
                className="group relative flex flex-col justify-between bg-gradient-to-br from-red-950/40 to-slate-900/90 border border-red-500/10 hover:border-red-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(239,68,68,0.15)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" role="img" aria-label="Puzzle Piece">🧩</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full border border-red-500/20">
                      Debugging Puzzle
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-red-400 transition-colors">
                    Bug Dungeon
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    Descend into a mechanical server vault. Fix CPU-blocking infinite loop beasts, stabilize API gateway timeouts, resolve CSS layout overlapping, and settle Git merge conflicts to unlock real debugging journals!
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 px-3 bg-red-500 hover:bg-red-400 text-slate-950 font-bold text-[10px] rounded transition-all group-hover:scale-[1.02] shadow-[0_4px_12px_rgba(239,68,68,0.2)]">
                    DESCEND DUNGEON 🧩
                  </button>
                </div>
              </div>

              {/* Game 4: Memory Lab */}
              <div 
                onClick={() => { setShowMemoryLab(true); setShowArcadeHub(false); }}
                className="group relative flex flex-col justify-between bg-gradient-to-br from-violet-950/40 to-slate-900/90 border border-violet-500/10 hover:border-violet-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(139,92,246,0.15)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" role="img" aria-label="Brain">🧠</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded-full border border-violet-500/20">
                      Cinematic Narrative
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-violet-400 transition-colors">
                    Memory Lab
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    Step inside a surreal floating memory archive. Walk through chapters of Nimra's development journey—from school sparks in DPS Srinagar, CUK engineering days, coffee-fueled compiler struggles, to hackathon victories and dev philosophies!
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 px-3 bg-violet-500 hover:bg-violet-400 text-slate-950 font-bold text-[10px] rounded transition-all group-hover:scale-[1.02] shadow-[0_4px_12px_rgba(139,92,246,0.2)]">
                    ENTER LAB 🧠
                  </button>
                </div>
              </div>

              {/* Game 5: Education Campus */}
              <div 
                onClick={() => { setShowEducationCampus(true); setShowArcadeHub(false); }}
                className="group relative flex flex-col justify-between bg-gradient-to-br from-green-950/40 to-slate-900/90 border border-green-500/10 hover:border-green-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,197,94,0.15)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" role="img" aria-label="Graduation Cap">🎓</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest text-green-400 bg-green-500/10 px-2 py-0.5 rounded-full border border-green-500/20">
                      Campus Explorer
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-green-400 transition-colors">
                    Education Campus
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    Walk through an interactive academic world — from DPS Srinagar classrooms, CUK engineering labs, AI research stations, to leadership gardens. Experience how knowledge, curiosity, and ambition evolved!
                  </p>
                </div>
                <div className="mt-6">
                  <button className="w-full py-2 px-3 bg-green-500 hover:bg-green-400 text-slate-950 font-bold text-[10px] rounded transition-all group-hover:scale-[1.02] shadow-[0_4px_12px_rgba(34,197,94,0.2)]">
                    ENTER CAMPUS 🎓
                  </button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}

      <Dock items={dockItems} />
    </div>
  );
};

export default Index;
