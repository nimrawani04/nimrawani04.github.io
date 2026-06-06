import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Cpu, Sparkles, FileText, CheckCircle, Code, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GalleryView } from "./GalleryView";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface FolderProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Folder = ({ isOpen, onClose }: FolderProps) => {
  const [activeTab, setActiveTab] = useState<"whoami" | "skills" | "gallery">("whoami");

  const tabs = [
    { id: "whoami" as const, label: "WHO AM I?", icon: <User className="w-4 h-4" /> },
    { id: "skills" as const, label: "SKILLS", icon: <Cpu className="w-4 h-4" /> },
    { id: "gallery" as const, label: "GALLERY", icon: <ImageIcon className="w-4 h-4" /> },
  ];

  const skillCategories = [
    {
      title: "Frontend Development",
      color: "from-cyan-500 to-blue-500",
      glow: "rgba(34, 211, 238, 0.35)",
      borderColor: "border-cyan-500/30",
      skills: ["React", "TypeScript", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Next.js", "Framer Motion", "PWA"],
    },
    {
      title: "Backend & Database",
      color: "from-emerald-500 to-teal-500",
      glow: "rgba(16, 185, 129, 0.35)",
      borderColor: "border-emerald-500/30",
      skills: ["Supabase", "PostgreSQL", "REST APIs", "SQL", "Web3Forms", "Node.js (Basic)"],
    },
    {
      title: "AI & Machine Learning",
      color: "from-purple-500 to-indigo-500",
      glow: "rgba(139, 92, 246, 0.35)",
      borderColor: "border-purple-500/30",
      skills: ["Python", "TensorFlow", "RAG Pipelines", "AI Chatbot Design", "NLP Models", "OCI AI Foundations", "Google Cloud ML APIs"],
    },
    {
      title: "Core & Hardware",
      color: "from-amber-500 to-orange-500",
      glow: "rgba(245, 158, 11, 0.35)",
      borderColor: "border-amber-500/30",
      skills: ["C++", "Arduino", "Embedded Systems", "Data Structures", "Algorithms", "Git & GitHub", "Vite", "Linux Basics"],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md p-4 md:p-6 overflow-hidden">
          {/* Modal Overlay / Backdrop click */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 cursor-zoom-out"
          />

          {/* Folder Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.1 }}
            className="relative w-full max-w-4xl bg-slate-900/98 border border-slate-800 rounded-3xl shadow-2xl p-4 md:p-6 overflow-hidden font-sans text-left my-4 max-h-[92vh] flex flex-col"
          >
            {/* Top Glowing Effect */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-cyan-500/10 blur-[60px] pointer-events-none" />

            {/* Folder Header Row (Tab bar + Close Button) */}
            <div className="flex items-end justify-between border-b border-slate-800/80 pb-0.5">
              {/* Folder Tabs (No scroll, since we only have 2 tabs they will fit easily) */}
              <div className="flex items-end gap-1.5 pt-1 overflow-visible">
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative flex items-center gap-2 px-5 md:px-7 py-2.5 text-xs md:text-sm font-bold tracking-wider rounded-t-xl transition-all duration-300 ${
                        isActive
                          ? "bg-slate-800/90 text-cyan-400 border-t border-x border-cyan-500/40 shadow-[0_-5px_15px_-5px_rgba(6,182,212,0.15)]"
                          : "text-slate-400 hover:text-slate-200 bg-slate-900/40 border-t border-x border-transparent hover:bg-slate-800/30"
                      }`}
                    >
                      {/* Physical folder-like skew cutout */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute inset-x-0 -bottom-[3px] h-[3px] bg-cyan-400"
                        />
                      )}
                      {tab.icon}
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-full bg-slate-800/60 hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-all border border-slate-700/50 hover:border-red-500/30 mb-2 mr-1 shadow-inner"
                title="Close Folder"
              >
                <X className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Folder Paper Content Container (Eliminated scrollbars, styled beautifully) */}
            <div className="relative flex-grow bg-slate-800/10 border-x border-b border-slate-800/80 rounded-b-2xl p-5 md:p-6 overflow-y-auto scrollbar-none max-h-[75vh]">
              
              <AnimatePresence mode="wait">
                {activeTab === "whoami" && (
                  <motion.div
                    key="whoami"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                        <Sparkles className="w-5 h-5 text-cyan-400" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-slate-100 tracking-tight">
                          ABOUT <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">NIMRA WANI</span>
                        </h3>
                        <p className="text-[10px] text-cyan-400/80 uppercase tracking-widest font-semibold mt-0.5">Who Am I / Identity Module</p>
                      </div>
                    </div>

                    {/* About Content */}
                    <div className="space-y-4 text-slate-300 leading-relaxed text-xs md:text-sm">
                      <div className="p-4 md:p-5 bg-slate-900/50 border border-slate-800/60 rounded-2xl relative overflow-hidden">
                        {/* Futuristic background grid accent */}
                        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-25 pointer-events-none" />
                        
                        <div className="relative space-y-4 z-10">
                          <p>
                            I’m a web developer with a passion for creating dynamic, responsive, and visually engaging digital experiences. I enjoy transforming ideas into interactive, high-performing web applications through clean code, intuitive design, and technical precision. My work focuses on building solutions that are both functional and user-centered, combining creativity with strong development practices. I’m constantly exploring new tools and frameworks to enhance performance, design, and user experience.
                          </p>
                          <p>
                            Beyond web development, I’m deeply interested in Artificial Intelligence and Machine Learning. I’m fascinated by how intelligent systems can learn, adapt, and make decisions that mirror human thinking. This interest drives me to study algorithms, neural networks, and data-driven models that expand the possibilities of modern technology. I’m especially drawn to exploring how AI and ML can be integrated into web solutions to create smarter, more adaptive, and efficient digital platforms.
                          </p>
                          <p>
                            At the foundation of my work is a strong enthusiasm for mathematical innovation. I view mathematics as a powerful tool for reasoning, optimization, and discovery. It shapes the way I approach problems and design solutions, allowing me to connect logic with creativity. By combining my skills in web development, AI, and mathematics, I aim to build intelligent, scalable, and forward-thinking technologies that contribute to meaningful innovation.
                          </p>
                        </div>
                      </div>

                      {/* Unified Terminal Credentials Status Bar - Very Compact */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-900/40 border border-slate-850 p-3 rounded-xl text-center">
                        <div className="flex flex-col py-1">
                          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Degree</span>
                          <span className="text-xs font-bold text-slate-200 mt-0.5">B.Tech CSE</span>
                        </div>
                        <div className="flex flex-col py-1 border-l border-slate-850 md:border-l">
                          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Institution</span>
                          <span className="text-xs font-bold text-slate-200 mt-0.5">CUK Ganderbal</span>
                        </div>
                        <div className="flex flex-col py-1 border-l border-slate-850 md:border-l">
                          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Expected</span>
                          <span className="text-xs font-bold text-slate-200 mt-0.5">July 2027</span>
                        </div>
                        <div className="flex flex-col py-1 border-l border-slate-850 md:border-l">
                          <span className="text-[9px] font-black uppercase text-slate-500 tracking-wider">Location</span>
                          <span className="text-xs font-bold text-slate-200 mt-0.5">Srinagar, J&K</span>
                        </div>
                      </div>

                      {/* Row for Resume and Availability */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
                            Status: <span className="text-emerald-400">Open to Projects / Internships</span>
                          </span>
                        </div>
                        
                        <a href="/nimrawani_Resume.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                          <Button className="w-full sm:w-auto justify-center bg-slate-900 hover:bg-slate-850 border border-slate-850 text-cyan-400 text-xs font-bold py-4 px-5 rounded-xl group transition-all">
                            <span className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                              View Physical Resume
                            </span>
                          </Button>
                        </a>
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "skills" && (
                  <motion.div
                    key="skills"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="space-y-5"
                  >
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                        <Cpu className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-black text-slate-100 tracking-tight">
                          TECH <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">ABILITIES</span>
                        </h3>
                        <p className="text-[10px] text-emerald-400/80 uppercase tracking-widest font-semibold mt-0.5">Skills Matrix & Technical Stack</p>
                      </div>
                    </div>

                    {/* Skill Cards Grid (Upgraded visually to resemble Premium React Bits elements) */}
                    <div className="grid sm:grid-cols-2 gap-4 pt-1">
                      {skillCategories.map((cat, idx) => (
                        <motion.div
                          key={cat.title}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05, duration: 0.35 }}
                          className={`group relative p-4 bg-slate-900/60 border ${cat.borderColor} hover:bg-slate-900/90 rounded-2xl transition-all duration-300 shadow-md flex flex-col justify-between overflow-hidden`}
                        >
                          {/* Top Glow bar accent */}
                          <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${cat.color} opacity-80`} />

                          {/* Hover background radial glow */}
                          <div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{
                              background: `radial-gradient(120px circle at 50% 50%, ${cat.glow}, transparent 70%)`,
                            }}
                          />

                          <div className="relative z-10">
                            <h4 className="text-xs md:text-sm font-black tracking-wider text-slate-200 mb-3 uppercase flex items-center justify-between">
                              <span>{cat.title}</span>
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
                            </h4>

                            <div className="flex flex-wrap gap-1.5">
                              {cat.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2.5 py-1 rounded-lg bg-slate-950/60 hover:bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-slate-300 hover:text-white text-[10px] md:text-xs font-semibold cursor-default transition-all duration-200 flex items-center gap-1.5"
                                >
                                  <span className="w-1 h-1 rounded-full bg-cyan-400" />
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === "gallery" && (
                  <motion.div
                    key="gallery"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <GalleryView />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
