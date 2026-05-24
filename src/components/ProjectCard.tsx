import { ReactNode } from "react";
import { ExternalLink, FolderOpen } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  icon?: ReactNode;
  className?: string;
}

export const ProjectCard = ({
  title,
  description,
  tech,
  link,
  github,
  icon,
  className = "",
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -7 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`group relative flex flex-col justify-between h-full rounded-lg
        bg-[hsl(222,40%,14%)] hover:bg-[hsl(222,40%,17%)]
        border border-slate-800/60 hover:border-cyan-500/30
        shadow-md hover:shadow-[0_10px_30px_-15px_rgba(6,182,212,0.15)]
        transition-all duration-300 p-7
        ${className}`}
    >
      {/* Top row: folder icon + action icons */}
      <div>
        <div className="flex items-center justify-between mb-7">
          <div className="text-cyan-400 transition-colors">
            {icon || <FolderOpen className="w-10 h-10" strokeWidth={1} />}
          </div>
          <div className="flex items-center gap-4">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`GitHub repository for ${title}`}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <FaGithub className="w-[22px] h-[22px]" />
              </a>
            )}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Live demo for ${title}`}
                className="text-slate-400 hover:text-cyan-400 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink className="w-[22px] h-[22px]" strokeWidth={1.5} />
              </a>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg md:text-xl font-bold text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug mb-3">
          {title}
        </h3>

        {/* Description */}
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tech.map((item, i) => (
          <span
            key={i}
            className="text-[12px] font-mono text-cyan-400/80 bg-cyan-500/10 border border-cyan-500/15 rounded-full px-3 py-1 tracking-wide"
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
