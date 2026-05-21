import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, Code } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { MagicBento } from "./MagicBento";
import { Badge } from "./ui/badge";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  className?: string;
}

export const ProjectCard = ({ title, description, tech, link, github, className = "" }: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <MagicBento 
      className={`${className} cursor-pointer select-none transition-all duration-300 ${
        isExpanded ? "ring-1 ring-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.1)]" : "hover:border-slate-700/80"
      }`}
    >
      <div 
        className="flex flex-col h-full justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Header Row: Title + Expand Chevron Indicator */}
        <div className="flex items-center justify-between gap-3 w-full py-1">
          <h3 className="text-base md:text-lg font-bold text-slate-100 hover:text-cyan-400 transition-colors leading-tight">
            {title}
          </h3>
          
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className={`w-7 h-7 flex items-center justify-center rounded-full bg-slate-950/60 border text-slate-400 group-hover:text-cyan-400 border-slate-800 transition-colors shadow-inner`}
          >
            <ChevronDown className={`w-4 h-4 transition-colors ${isExpanded ? "text-cyan-400" : "text-slate-400"}`} />
          </motion.div>
        </div>

        {/* Expandable Specifications Area */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ 
                height: "auto", 
                opacity: 1, 
                marginTop: 14,
                transition: {
                  height: { duration: 0.3, ease: "easeOut" },
                  opacity: { duration: 0.25, delay: 0.05 }
                }
              }}
              exit={{ 
                height: 0, 
                opacity: 0, 
                marginTop: 0,
                transition: {
                  height: { duration: 0.25, ease: "easeIn" },
                  opacity: { duration: 0.15 }
                }
              }}
              className="overflow-hidden w-full text-left"
            >
              {/* Description */}
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed mb-4 border-l-2 border-cyan-500/30 pl-3">
                {description}
              </p>

              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {tech.map((item, i) => (
                  <Badge 
                    key={i} 
                    variant="secondary" 
                    className="bg-slate-950/60 text-cyan-400/90 hover:bg-slate-950 hover:text-cyan-300 border border-slate-850 text-[10px] font-semibold tracking-wide"
                  >
                    {item}
                  </Badge>
                ))}
              </div>

              {/* Demo and Code Links */}
              <div className="flex items-center gap-4 border-t border-slate-800/60 pt-3.5">
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} // Prevent collapsing when clicking link
                    className="text-[11px] font-black uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1.5 group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
                    Live Demo
                  </a>
                )}
                {github && (
                  <a
                    href={github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} // Prevent collapsing when clicking link
                    className="text-[11px] font-black uppercase tracking-wider text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5 group"
                  >
                    <FaGithub className="w-3.5 h-3.5 group-hover:scale-105 transition-transform" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MagicBento>
  );
};
