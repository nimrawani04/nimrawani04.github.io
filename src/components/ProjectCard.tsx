import { ExternalLink, Github } from "lucide-react";
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
  return (
    <MagicBento className={className}>
      <div className="flex flex-col h-full justify-between">
        <div>
          <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
          <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{description}</p>
        </div>
        <div>
          <div className="flex flex-wrap gap-2 mb-4">
            {tech.map((item, i) => (
              <Badge key={i} variant="secondary" className="text-xs">
                {item}
              </Badge>
            ))}
          </div>
          <div className="flex gap-3">
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors flex items-center gap-1 text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Demo
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-glow transition-colors flex items-center gap-1 text-sm"
              >
                <Github className="w-4 h-4" />
                Code
              </a>
            )}
          </div>
        </div>
      </div>
    </MagicBento>
  );
};
