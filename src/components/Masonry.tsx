import { ReactNode } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  icon?: ReactNode;
}

interface MasonryProps {
  items: ProjectItem[];
}

export const Masonry = ({ items }: MasonryProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.4,
            delay: idx * 0.07,
            type: "spring",
            stiffness: 100,
          }}
        >
          <ProjectCard
            title={item.title}
            description={item.description}
            tech={item.tech}
            link={item.link}
            github={item.github || "https://github.com/nimrawani04"}
            icon={item.icon}
          />
        </motion.div>
      ))}
    </div>
  );
};
