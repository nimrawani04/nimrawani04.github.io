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

const certifications = [

  {
    title: "Introduction to Machine Learning Concepts",
    provider: "Microsoft",
    year: "Jan 2026",
    link: "https://learn.microsoft.com/api/achievements/share/en-gb/NimraWani-9486/KC8WHGGB?sharingId=B856B6811014E40C",
   tags: [
  "Machine Learning",
  "Linear Regression",
  "Classification",
  "Clustering",
  "Deep Learning"
]
  },
  
  {
    title: "Artificial Intelligence Fundamentals",
    provider: "IBM SkillsBuild",
    year: "Dec 2025",
    link: "https://www.credly.com/badges/a36fcbd9-3963-4a4a-b29b-19ff4792aaf1/public_url",
    tags: [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "AI Ethics",
  "Artificial Neural Networks",
  "Computer Vision",
  "Natural Language Processing",
  "AI Applications",
  "AI Capabilities",
],
  },
  
  {
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    provider: "Oracle",
    year: "Dec 2025",
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C982AECE9426EA178736DD1F01312EA6B7ECF089391F6FDDCF9CCBCC6CB1A243",
    tags: [
  "Artificial Intelligence",
  "Machine Learning",
  "Deep Learning",
  "Sequence Models",
  "Oracle Cloud Infrastructure",
  "OCI",
  "Cloud Computing"
],

  },
  {
    title: "Prepare Data for ML APIs on Google Cloud",
    provider: "Google Cloud",
    year: "Dec 2025",
    link: "https://www.credly.com/badges/0c570f0b-e9e3-4228-962c-c6b06ac28f8c/public_url",
    tags: [
  "Python",
  "TensorFlow",
  "Machine Learning",
  "Google Cloud",
  "Cloud Natural Language API",
  "Google Cloud Speech API",
  "Dataflow"
],

  },
  
  {
    title: "DSA in Modern Product Engineering",
    provider: "Dec TechBairn",
    year: "2025",
    tags: ["DSA", "Algorithms", "Problem Solving"],
  },

  {
    title: "Python for Artificial Intelligence (5-Day Workshop)",
    provider: "NIT Srinagar",
    year: "Nov 2025",
    tags: ["Python", "NumPy", "Pandas", "Scikit-Learn"],
  },
];

  

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
          I’m a <span className="text-primary font-semibold">Computer Science student</span>{" "}
          focused on building <span className="text-primary font-semibold">reliable</span>,{" "}
          <span className="text-primary font-semibold">scalable</span>, and{" "}
          <span className="text-primary font-semibold">user-centered</span>{" "}
          digital solutions through clean and structured development practices.
        </p>

        <p className="text-lg text-foreground/90 leading-relaxed mb-6">
          My interests include{" "}
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
          , with a focus on building intelligent and data-driven web
          applications.
        </p>

        <p className="text-lg text-foreground/90 leading-relaxed">
          I have a strong interest in{" "}
          <span className="text-primary font-semibold">mathematics</span> and{" "}
          <span className="text-primary font-semibold">logical reasoning</span>,
          which helps me understand algorithms and models more deeply. I value{" "}
          <span className="text-primary font-semibold">continuous learning</span>,{" "}
          <span className="text-primary font-semibold">collaboration</span>, and
          building <span className="text-primary font-semibold">
            future-ready solutions
          </span>.
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

       {/* Certifications Section */}
<section id="certifications" className="py-24 px-6 bg-muted/20">
  <div className="max-w-6xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Certifications & <span className="text-gradient">Credentials</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert, i) => (
          <Card
            key={i}
            className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors"
          >
            <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
            <p className="text-primary font-semibold">{cert.provider}</p>
            <p className="text-muted-foreground text-sm mb-3">
              Issued {cert.year}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {cert.tags.map((tag, j) => (
                <Badge key={j} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {cert.link && (
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                View Credential
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </Card>
        ))}
      </div>
    </motion.div>
  </div>
</section>

       {/* Education Section */}
<section id="education" className="py-24 px-6">
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Education
      </h2>

      <div className="space-y-8">
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-2xl font-bold">
            B.Tech in Computer Engineering
          </h3>
          <p className="text-primary font-semibold">
            Central University of Kashmir, Ganderbal
          </p>
          <p className="text-muted-foreground">
            Oct 2023 – Jun 2027
          </p>
        </Card>

        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
          <h3 className="text-2xl font-bold">
            Senior Secondary Education
          </h3>
          <p className="text-primary font-semibold">
            Delhi Public School, Srinagar
          </p>
          <p className="text-muted-foreground">
            Mar 2009 – Mar 2023
          </p>
        </Card>
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
        Experience
      </h2>

      <div className="space-y-8">
        {/* Experience 1 */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
          <h3 className="text-2xl font-bold mb-1">
            Campus Lead
          </h3>
          <p className="text-primary font-semibold">
            Open Source Connect · Remote
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            Dec 2025 – Present
          </p>

          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li>
              Led and coordinated open-source awareness initiatives and student
              engagement activities.
            </li>
            <li>
              Promoted open-source culture, collaboration, and participation in
              technical events and hackathons.
            </li>
            <li>
              Acted as a bridge between students and the open-source community.
            </li>
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">Leadership</Badge>
            <Badge variant="secondary">Open Source</Badge>
            <Badge variant="secondary">Community Building</Badge>
          </div>
        </Card>

        {/* Experience 2 */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
          <h3 className="text-2xl font-bold mb-1">
            Student Intern
          </h3>
          <p className="text-primary font-semibold">
            National Institute of Technology Srinagar · Hybrid
          </p>
          <p className="text-muted-foreground text-sm mb-4">
            Dec 2025 – Present
          </p>

          <ul className="list-disc pl-5 text-muted-foreground space-y-2">
            <li>
              Gaining hands-on experience in applied computer science concepts
              through academic and practical exposure.
            </li>
            <li>
              Worked on problem-solving tasks, coding exercises, and technical
              discussions under faculty guidance.
            </li>
            <li>
              Strengthened foundations in programming, algorithms, and teamwork.
            </li>
          </ul>

          <div className="flex flex-wrap gap-2 mt-4">
            <Badge variant="secondary">Internship</Badge>
            <Badge variant="secondary">Problem Solving</Badge>
            <Badge variant="secondary">Programming</Badge>
          </div>
        </Card>
      </div>
    </motion.div>
  </div>
</section>


       {/* Awards & Recognitions Section */}
<section id="awards" className="py-24 px-6">
  <div className="max-w-5xl mx-auto">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">
        Awards & <span className="text-gradient">Recognitions</span>
      </h2>

      <div className="space-y-8">
        {/* Ranked / Winning Achievements */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
          <h3 className="text-2xl font-bold mb-6 text-primary">
            🏆 Competitive Achievements
          </h3>

          <ul className="space-y-4 text-muted-foreground">
            <li>
              <strong>1st Position – Logo Designing Competition</strong><br />
              Cyber Conclave 2025, Central University of Kashmir — Recognized for
              creativity, visual communication, and design thinking.
            </li>

            <li>
              <strong>First Rank – Open Build Challenge</strong><br />
              Organized by FOSS NIT Srinagar in collaboration with FOSS United —
              Demonstrated strong problem-solving and collaborative development skills.
            </li>
          </ul>
        </Card>

        {/* Participation & Involvement */}
        <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
          <h3 className="text-2xl font-bold mb-6 text-primary">
            🎯 Participation & Involvement
          </h3>

          <ul className="space-y-4 text-muted-foreground">
            <li>
              <strong>Coding Challenge – Tech Summit 2025</strong><br />
              Participated in a competitive coding event focused on logical thinking,
              problem-solving, and teamwork.
            </li>

            <li>
              <strong>Code Debugging Competition – Cyber Conclave 2025</strong><br />
              Actively participated in debugging challenges involving C programming
              and analytical problem-solving.
            </li>

            <li>
              <strong>Treasure Hunt – Cyber Conclave 2025</strong><br />
              Participated in a team-based challenge emphasizing decision-making,
              time management, and critical thinking.
            </li>

            <li>
  <strong>
    Coding Competition – National Technology Day 2024
  </strong><br />
  Participated in a competitive coding event, focusing on problem
  solving, debugging, logical reasoning, time management, and critical thinking.
</li>

            
          </ul>
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
