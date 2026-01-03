import { DecryptedText } from "@/components/DecryptedText";
import { Dock } from "@/components/Dock";
import { LetterGlitch } from "@/components/LetterGlitch";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Home,
  User,
  Briefcase,
  Code,
  Award,
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Download,
} from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const dockItems = [
    { icon: <Home className="w-5 h-5" />, label: "Home", href: "#hero" },
    { icon: <User className="w-5 h-5" />, label: "About", href: "#about" },
    {
      icon: <Code className="w-5 h-5" />,
      label: "Projects",
      href: "#projects",
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: "Experience",
      href: "#experience",
    },
    { icon: <Award className="w-5 h-5" />, label: "Awards", href: "#awards" },
    { icon: <Mail className="w-5 h-5" />, label: "Contact", href: "#contact" },
  ];

  const projects = [
    {
      title: "Araaz Commerce Website",
      description:
        "Developed a responsive e-commerce website with contact form integration using Web3Forms and deployed it on Vercel. Focused on user-friendly UI and clean front-end design principles.",
      tech: ["HTML", "CSS", "JavaScript", "Web3Forms", "Vercel"],
      link: "https://araaaz.vercel.app/",
    },
    {
      title: "Academic Portal",
      description:
        "Created a simple academic management portal for organizing and displaying student details, grades, and announcements with dynamic front-end interactions.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://nimrawani04.github.io/cukAcademicPortal/",
    },
    {
      title: "Smart House using Arduino",
      description:
        "Built a smart home prototype using Arduino, Servo, Infrared, and Ultrasonic sensors for automated environmental control.",
      tech: ["Arduino", "C++", "Sensors", "IoT"],
    },
    {
      title: "Simple Interest Calculator",
      description:
        "Developed a GUI-based calculator application using Java AWT to compute simple interest efficiently.",
      tech: ["Java", "AWT"],
    },
    {
      title: "Online Portfolio Website",
      description:
        "Designed and developed a personal portfolio showcasing projects and achievements using modern web technologies.",
      tech: ["HTML", "CSS", "JavaScript"],
      link: "https://nimrawani04.github.io/portfolio/",
    },
  ];

  const skills = {
    "Creative Design": ["Photoshop", "Illustrator", "Canva", "UI/UX"],
    "Web Development": ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
    Programming: ["C", "C++", "Java", "Python", "Arduino"],
    Content: ["Blogging", "Copywriting", "Social Media"],
    Core: [
      "Analytical Thinking",
      "Problem Solving",
      "Innovation",
      "Communication",
    ],
  };
  const handleClick = () => {
    window.open("/Resume.pdf");
  };
  return (
    <div className="relative min-h-screen">
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
                    <Github className="w-5 h-5" />
                    GitHub
                  </Button>
                </a>
                <a
                  href="https://linkedin.com/in/nimra-wani-b32438359"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" size="lg" className="gap-2">
                    <Linkedin className="w-5 h-5" />
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
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                About <span className="text-gradient">Me</span>
              </h2>
              <Card className="p-8 md:p-12 bg-card/50 backdrop-blur-sm border-border/50">
                <p className="text-lg text-foreground/90 leading-relaxed mb-6">
                  Passionate and motivated Computer Science student eager to
                  apply technical knowledge to real-world challenges. I'm
                  passionate about{" "}
                  <span className="text-primary font-semibold">
                    Artificial Intelligence
                  </span>
                  ,{" "}
                  <span className="text-primary font-semibold">
                    Machine Learning
                  </span>
                  , and{" "}
                  <span className="text-primary font-semibold">
                    Full Stack Web Development
                  </span>
                  , constantly exploring innovative ways to build scalable and
                  intelligent applications.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Committed to continuous learning, teamwork, and delivering
                  high-quality, impactful work.
                </p>
              </Card>
            </motion.div>
          </div>
        </section>

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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <ProjectCard {...project} className="h-full" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Skills & <span className="text-gradient">Expertise</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(skills).map(([category, items], i) => (
                  <motion.div
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                  >
                    <Card className="p-6 bg-card/50 backdrop-blur-sm border-border/50 h-full hover:border-primary/50 transition-colors">
                      <h3 className="text-xl font-bold mb-4 text-primary">
                        {category}
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill, j) => (
                          <Badge
                            key={j}
                            variant="secondary"
                            className="text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 px-6 bg-muted/20">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Experience & <span className="text-gradient">Education</span>
              </h2>

              <div className="space-y-8">
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        Currently Seeking Opportunities
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Gaining foundational experience through personal and
                        collaborative projects.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">AI/ML</Badge>
                        <Badge variant="secondary">
                          Full Stack Development
                        </Badge>
                        <Badge variant="secondary">Embedded Systems</Badge>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        B.Tech in Computer Science & Engineering
                      </h3>
                      <p className="text-primary font-semibold mb-2">
                        Central University of Kashmir, Ganderbal
                      </p>
                      <p className="text-muted-foreground">
                        Expected July 2027
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <Award className="w-6 h-6 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">
                        12th (CBSE) – Medical + Mathematics
                      </h3>
                      <p className="text-primary font-semibold mb-2">
                        Delhi Public School, Srinagar
                      </p>
                      <p className="text-muted-foreground">2022</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Awards Section */}
        <section id="awards" className="py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                Awards & <span className="text-gradient">Achievements</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🏆</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        1st Place – Logo Designing Competition
                      </h3>
                      <p className="text-primary font-semibold mb-2">
                        Central University of Kashmir
                      </p>
                      <p className="text-muted-foreground text-sm">
                        Cyber Concave 2025
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
                  <div className="flex items-start gap-4">
                    <div className="text-4xl">🥇</div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        First Rank – Open Build Challenge
                      </h3>
                      <p className="text-muted-foreground text-sm">
                        Organised by FOSS NIT Srinagar in collabration with <a href="https://fossunited.org/">FOSS
                        United</a>.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
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
                      <Github className="w-5 h-5" />
                    </Button>
                  </a>
                  <a
                    href="https://linkedin.com/in/nimra-wani-b32438359"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="icon">
                      <Linkedin className="w-5 h-5" />
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
              © 2025 Nimra Wani. Built with React, Tailwind CSS, and Framer
              Motion.
            </p>
          </div>
        </footer>
      </div>

      <Dock items={dockItems} />
    </div>
  );
};

export default Index;
