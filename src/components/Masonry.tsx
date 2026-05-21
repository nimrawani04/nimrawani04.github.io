import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectCard } from "./ProjectCard";

interface ProjectItem {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
}

interface MasonryProps {
  items: ProjectItem[];
}

export const Masonry = ({ items }: MasonryProps) => {
  const [columnsCount, setColumnsCount] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setColumnsCount(1); // Mobile
      } else if (width < 1024) {
        setColumnsCount(2); // Tablet
      } else {
        setColumnsCount(3); // Desktop
      }
    };

    // Set initial
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Split items into N columns
  const getColumns = () => {
    const columns: ProjectItem[][] = Array.from({ length: columnsCount }, () => []);
    items.forEach((item, index) => {
      columns[index % columnsCount].push(item);
    });
    return columns;
  };

  const columns = getColumns();

  return (
    <div className="w-full">
      <div 
        className="grid gap-6 items-start" 
        style={{ gridTemplateColumns: `repeat(${columnsCount}, minmax(0, 1fr))` }}
      >
        {columns.map((columnItems, colIdx) => (
          <div key={colIdx} className="flex flex-col gap-6">
            <AnimatePresence>
              {columnItems.map((item, itemIdx) => (
                <motion.div
                  key={`${item.title}-${colIdx}-${itemIdx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: itemIdx * 0.1,
                    type: "spring",
                    stiffness: 80 
                  }}
                  className="w-full"
                >
                  <ProjectCard
                    title={item.title}
                    description={item.description}
                    tech={item.tech}
                    link={item.link}
                    github={item.github || "https://github.com/nimrawani04"}
                    className="w-full h-auto cursor-default hover:scale-[1.01] hover:border-cyan-500/30 transition-all duration-300 shadow-md"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};
