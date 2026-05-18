import { useState } from "react";
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
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Index = () => {
  const [showGame, setShowGame] = useState(() => new URLSearchParams(window.location.search).has("kitchen") || new URLSearchParams(window.location.search).has("cooking"));
  const [showCityQuest, setShowCityQuest] = useState(() => new URLSearchParams(window.location.search).has("city") || new URLSearchParams(window.location.search).has("cityquest"));
  const [showBugDungeon, setShowBugDungeon] = useState(() => new URLSearchParams(window.location.search).has("dungeon") || new URLSearchParams(window.location.search).has("bugdungeon"));
  const [showMemoryLab, setShowMemoryLab] = useState(() => new URLSearchParams(window.location.search).has("memory") || new URLSearchParams(window.location.search).has("memorylab"));
  const [showArcadeHub, setShowArcadeHub] = useState(false);
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
      title: "2AI Conference Website – 2026 International Conference on Applied Artificial Intelligence",
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
  const certifications = [
    {
      title: "Introduction to Artificial Intelligence Concepts",
      provider: "Microsoft",
      year: "Jan 2026",
      link: "https://learn.microsoft.com/api/achievements/share/en-gb/NimraWani-9486/WV44L35N?sharingId=B856B6811014E40C",
      tags: [
        "Artificial Intelligence",
        "Generative AI",
        "Responsible AI",
        "Computer Vision",
      ],
    },

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
        "Deep Learning",
      ],
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
      title:
        "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
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
        "Cloud Computing",
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
        "Dataflow",
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
                  I’m a{" "}
                  <span className="text-primary font-semibold">
                    Computer Science student
                  </span>{" "}
                  focused on building{" "}
                  <span className="text-primary font-semibold">reliable</span>,{" "}
                  <span className="text-primary font-semibold">scalable</span>,
                  and{" "}
                  <span className="text-primary font-semibold">
                    user-centered
                  </span>{" "}
                  digital solutions through clean and structured development
                  practices.
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
                  <span className="text-primary font-semibold">
                    mathematics
                  </span>{" "}
                  and{" "}
                  <span className="text-primary font-semibold">
                    logical reasoning
                  </span>
                  , which helps me understand algorithms and models more deeply.
                  I value{" "}
                  <span className="text-primary font-semibold">
                    continuous learning
                  </span>
                  ,{" "}
                  <span className="text-primary font-semibold">
                    collaboration
                  </span>
                  , and building{" "}
                  <span className="text-primary font-semibold">
                    future-ready solutions
                  </span>
                  .
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
                Certifications &{" "}
                <span className="text-gradient">Credentials</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {certifications.map((cert, i) => (
                  <Card
                    key={i}
                    className="p-6 bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors"
                  >
                    <h3 className="text-xl font-bold mb-1">{cert.title}</h3>
                    <p className="text-primary font-semibold">
                      {cert.provider}
                    </p>
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
                  <p className="text-muted-foreground">Oct 2023 – Jun 2027</p>
                </Card>

                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50">
                  <h3 className="text-2xl font-bold">
                    Senior Secondary Education
                  </h3>
                  <p className="text-primary font-semibold">
                    Delhi Public School, Srinagar
                  </p>
                  <p className="text-muted-foreground">Mar 2009 – Mar 2023</p>
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
                  <h3 className="text-2xl font-bold mb-1">Campus Lead</h3>
                  <p className="text-primary font-semibold">
                    Open Source Global Connect · Remote
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Dec 2025 – Present
                  </p>

                  <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    <li>
                      Led and coordinated open-source awareness initiatives, organizing technical sessions and student engagement activities.
                    </li>
                    <li>
                      Mentored students in open-source contributions and promoted collaborative development practices.
                    </li>
                    <li>
                      Acted as a bridge between students and the global open-source community.
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
                  <h3 className="text-2xl font-bold mb-1">Student Intern</h3>
                  <p className="text-primary font-semibold">
                    National Institute of Technology Srinagar · Hybrid
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Dec 2025 – Feb 2026
                  </p>

                  <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    <li>
                      Gained hands-on experience in applied computer science through coding exercises and problem-solving tasks.
                    </li>
                    <li>
                      Participated in technical discussions and academic mentorship under faculty guidance.
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

                {/* Experience 3 */}
                <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 card-glow-hover">
                  <h3 className="text-2xl font-bold mb-1">Mentor</h3>
                  <p className="text-primary font-semibold">
                    Social Winter of Code (SWOC) · Remote
                  </p>
                  <p className="text-muted-foreground text-sm mb-4">
                    Jan 2026 – Mar 2026
                  </p>

                  <ul className="list-disc pl-5 text-muted-foreground space-y-2">
                    <li>
                      Mentored contributors in front-end web development through structured, project-based learning.
                    </li>
                    <li>
                      Guided participants in open-source collaboration, code practices, and project contributions.
                    </li>
                    <li>
                      Supported learners in building real-world projects and improving development workflows.
                    </li>
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="secondary">Mentorship</Badge>
                    <Badge variant="secondary">Frontend Development</Badge>
                    <Badge variant="secondary">Open Source</Badge>
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
                      <strong>1st Position – Logo Designing Competition</strong>
                      <br />
                      Cyber Conclave 2025, Central University of Kashmir —
                      Recognized for creativity, visual communication, and
                      design thinking.
                    </li>

                    <li>
                      <strong>1st Position – Open Build Challenge</strong>
                      <br />
                      FOSS NIT Srinagar in collaboration with FOSS United —
                      Demonstrated strong problem-solving skills and collaborative development in a competitive build environment.
                    </li>

                    <li>
                      <strong>1st Position – SynerTech 2026</strong>
                      <br />
                      Kashmir College of Engineering and Technology —
                      Collaboratively developed a CRM-based Academic Management Portal with an AI-powered chatbot and Android application to streamline academic and administrative workflows through intelligent, real-time assistance.
                    </li>

                    <li>
                      <strong>2nd Position – Cursor Kashmir Hackathon (Vercel v0 Track)</strong>
                      <br />
                      Built <em>Rasta AI</em>, an AI platform for document simplification, crop insights, youth services, and AI-guided assistance, with voice/text interaction and multilingual support.
                    </li>

                    <li>
                      <strong>4th Rank – Portfolio BuildSprint 1.0</strong>
                      <br />
                      Girls Leading Tech — Demonstrated excellence in portfolio development under the EmpowerHer 2.0 initiative, highlighting technical proficiency, creativity, and continuous professional growth.
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
                      <strong>
                        Standard-a-Thon Hackathon – FOSS Club, NIT Srinagar
                      </strong>
                      <br />
                      Collaboratively developed <em>BIS AI</em>, an AI-powered assistant leveraging a RAG pipeline to provide source-cited responses from BIS data, with multilingual support, voice interaction, and offline accessibility.
                    </li>

                    <li>
                      <strong>Coding Challenge – Tech Summit 2025</strong>
                      <br />
                      Participated in a competitive coding event focused on problem-solving, logical reasoning, and teamwork.
                    </li>

                    <li>
                      <strong>
                        Code Debugging Competition – Cyber Conclave 2025
                      </strong>
                      <br />
                      Solved debugging challenges in C, emphasizing analytical thinking and error resolution.
                    </li>

                    <li>
                      <strong>Treasure Hunt – Cyber Conclave 2025</strong>
                      <br />
                      Engaged in a team-based challenge requiring decision-making, time management, and critical thinking.
                    </li>

                    <li>
                      <strong>
                        Coding Competition – National Technology Day 2024
                      </strong>
                      <br />
                      Participated in a competitive coding event focused on problem-solving, debugging, and logical reasoning under time constraints.
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
              © 2025 Nimra Wani. Built with React, Tailwind CSS, and Framer
              Motion.
            </p>
          </div>
        </footer>
      </div>

      {showArcadeHub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 overflow-y-auto">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-6xl bg-slate-900/95 border border-slate-800 rounded-2xl shadow-2xl p-6 md:p-8 overflow-hidden font-sans text-left"
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
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 w-full max-w-6xl mx-auto">
              
              {/* Game 1: Cooking Kitchen */}
              <div 
                onClick={() => { setShowGame(true); setShowArcadeHub(false); }}
                className="group relative flex flex-col justify-between bg-gradient-to-br from-emerald-950/40 to-slate-900/90 border border-emerald-500/10 hover:border-emerald-500/40 rounded-xl p-5 transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl" role="img" aria-label="Cooking Pot">🍳</span>
                    <span className="text-[8px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                      Project Simulator
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors">
                    Kitchen Portfolio
                  </h3>
                  <p className="text-[10px] text-slate-400 mt-2 leading-relaxed">
                    Enter a realistic, atmospheric kitchen. Select gourmet recipes representing featured projects, drop technical ingredients (React, Python, SQL) from glass jars into pans, and turn stove dial to cook and unlock complete showcases!
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

            </div>
          </motion.div>
        </div>
      )}

      <Dock items={dockItems} />
    </div>
  );
};

export default Index;
