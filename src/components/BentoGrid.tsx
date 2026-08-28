import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Award, GraduationCap, Trophy, ExternalLink, Calendar, ChevronLeft, ChevronRight, Sparkles, Code, MapPin } from "lucide-react";
import { MagicBento } from "./MagicBento";
import { Badge } from "./ui/badge";
import { CertificateBannerSlider, type BannerVariant } from "./BannerAlert";

export const BentoGrid = () => {
  const experiences = [
    {
      title: "Web Developer",
      org: "Central University of Kashmir Department of IT",
      period: "Jun 2026 – Present · 1 mo",
      skills: ["Web Design", "Responsive Web Design", "UI/UX", "Frontend Development", "Usability", "Accessibility", "Responsiveness"]
    },
    {
      title: "Design Team Lead",
      org: "Central University of Kashmir Department of IT",
      period: "Jun 2026 – Present · 1 mo",
      skills: ["Team Leadership", "Branding & Visual Identity", "Event Branding", "Design Thinking", "Team Management", "Product Design"]
    },
    {
      title: "Google Student Ambassador",
      org: "Google · Internship",
      period: "May 2026 – Present · 1 mo",
      skills: ["Technical Leadership", "Public Speaking", "Community Engagement", "Developer Relations", "Event Management"]
    },
    {
      title: "Mentor",
      org: "GirlScript Summer of Code",
      period: "May 2026 – Present · 1 mo",
      skills: ["Mentorship", "Open Source", "Git & GitHub", "Technical Writing", "Collaboration"]
    },
    {
      title: "Campus Lead",
      org: "Open Source Connect",
      period: "Dec 2025 – Present · 6 mos",
      skills: ["Leadership", "Communication", "Community Building", "Collaboration", "Public Relations", "GitHub Actions", "Community Outreach"]
    },
    {
      title: "Project Mentor",
      org: "Social Winter of Code (SWOC)",
      period: "Jan 2026 – Mar 2026 · 3 mos",
      skills: ["Web development", "Web Design", "Frontend Dev", "CSS3", "JavaScript", "Code Review", "Git Workflow"]
    },
    {
      title: "Student Intern",
      org: "National Institute of Technology Srinagar · Internship",
      period: "Dec 2025 – Feb 2026 · 3 mos",
      location: "Srinagar, Jammu & Kashmir, India · Hybrid",
      skills: ["Machine Learning", "Deep Learning", "Neural Networks", "Python", "Applied Algorithms"]
    }
  ];

  // Education data (simplified to show only institute, degree, years, and stream)
  const education = [
    {
      institute: "Central University of Kashmir, Ganderbal",
      degree: "B.Tech in Computer Engineering",
      years: "2023 – 2027",
      stream: "Computer Science Engineering"
    },
    {
      institute: "Delhi Public School, Srinagar",
      degree: "Senior Secondary Education (High School)",
      years: "2009 – 2023",
      stream: "Medical + Mathematics Stream"
    }
  ];

  // Certifications data
  const certifications = [
    {
      title: "Frappe Framework Workshop",
      provider: "FOSS NIT Srinagar & FOSS United",
      year: "Aug 2026",
      desc: "Hands-on workshop focused on building business applications using Frappe and ERPNext, understanding Site architectures, DocTypes, and server/client scripting.",
      link: "/gallery/frappe_cert.jpg",
      tags: ["Frappe Framework", "ERPNext", "Python", "Full-Stack Dev"],
      variant: "info" as BannerVariant,
    },
    {
      title: "Introduction to Artificial Intelligence Concepts",
      provider: "Microsoft",
      year: "Jan 2026",
      desc: "Mastered fundamental concepts of AI, including machine learning basics, generative AI applications, and core principles of responsible AI development and deployment.",
      link: "https://learn.microsoft.com/api/achievements/share/en-gb/NimraWani-9486/WV44L35N?sharingId=B856B6811014E40C",
      tags: ["Artificial Intelligence", "Generative AI", "Responsible AI", "Computer Vision"],
      variant: "success" as BannerVariant,
    },
    {
      title: "Introduction to Machine Learning Concepts",
      provider: "Microsoft",
      year: "Jan 2026",
      desc: "Explored advanced statistical modeling techniques, focusing on linear regression algorithms, data classification methodologies, and neural network foundations.",
      link: "https://learn.microsoft.com/api/achievements/share/en-gb/NimraWani-9486/KC8WHGGB?sharingId=B856B6811014E40C",
      tags: ["Machine Learning", "Linear Regression", "Classification", "Clustering", "Deep Learning"],
      variant: "success" as BannerVariant,
    },
    {
      title: "Artificial Intelligence Fundamentals",
      provider: "IBM SkillsBuild",
      year: "Dec 2025",
      desc: "Comprehensive study covering the core philosophy of AI, neural networks architecture, deep learning paradigms, and the ethical considerations of modern AI.",
      link: "https://www.credly.com/badges/a36fcbd9-3963-4a4a-b29b-19ff4792aaf1/public_url",
      tags: ["AI Ethics", "ML / DL Models", "Neural Networks", "NLP / Computer Vision"],
      variant: "warning" as BannerVariant,
    },
    {
      title: "Oracle Cloud Infrastructure 2025 AI Associate",
      provider: "Oracle",
      year: "Dec 2025",
      desc: "Validated expertise in utilizing OCI services for developing, deploying, and managing scalable artificial intelligence and machine learning applications.",
      link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C982AECE9426EA178736DD1F01312EA6B7ECF089391F6FDDCF9CCBCC6CB1A243",
      tags: ["Cloud Computing", "AI Foundations", "Oracle Cloud (OCI)", "Deep Learning"],
      variant: "error" as BannerVariant,
    },
    {
      title: "Prepare Data for ML APIs on Google Cloud",
      provider: "Google Cloud",
      year: "Dec 2025",
      desc: "Specialized in data preprocessing techniques, utilizing TensorFlow and Google Cloud tools to optimize datasets for sophisticated machine learning models.",
      link: "https://www.credly.com/badges/0c570f0b-e9e3-4228-962c-c6b06ac28f8c/public_url",
      tags: ["Python", "TensorFlow", "Google Cloud ML APIs", "Dataflow Caching"],
      variant: "success" as BannerVariant,
    },
    {
      title: "DSA in Modern Product Engineering",
      provider: "TechBairn",
      year: "Dec 2025",
      desc: "Intensive training on advanced data structures, optimization algorithms, and modern problem-solving frameworks tailored for scalable software engineering.",
      tags: ["DSA", "Data Structures", "Algorithms", "Problem Solving"],
      variant: "info" as BannerVariant,
    },
    {
      title: "Python for AI (5-Day Workshop)",
      provider: "NIT Srinagar",
      year: "Nov 2025",
      desc: "Hands-on implementation of Python libraries including NumPy, Pandas, and Scikit-Learn for data manipulation and predictive modeling.",
      tags: ["Python", "NumPy", "Pandas", "Scikit-Learn"],
      variant: "warning" as BannerVariant,
    }
  ];

  // Awards/Honors data
  const awards = [
    {
      title: "1st Position – Logo Designing",
      event: "Cyber Conclave 2025, CUK",
      desc: "Recognized for creative vision, branding principles, and visual layout structures. Demonstrated an exceptional ability to translate complex conceptual ideas into cohesive, minimalist graphic representations that effectively captured the event's core technological theme.",
      icon: "🏆"
    },
    {
      title: "1st Position – Open Build Challenge",
      event: "FOSS NIT Srinagar & FOSS United",
      desc: "Collaborative building challenge focusing on open source technology stack implementation under tight deadlines. Engineered an innovative solution with a highly optimized architecture, showcasing strong problem-solving skills and effective team synchronization.",
      icon: "💻"
    },
    {
      title: "1st Position – SynerTech 2026",
      event: "Kashmir College of Eng. & Tech.",
      desc: "Developed a CRM-based Academic Management Portal with AI chat helper and fully-functional Android companion. Integrated seamless cross-platform syncing and intelligent automation to streamline university administrative workflows efficiently.",
      icon: "⚡"
    },
    {
      title: "2nd Position – Cursor Kashmir Hackathon",
      event: "Cursor Kashmir (Vercel v0 Track)",
      desc: "Constructed Rasta AI, an AI assistant leveraging document parsing, voice synthesis, and multi-domain models. Built a robust Retrieval-Augmented Generation pipeline tailored to assist users with accurate, context-aware insights in real-time.",
      icon: "🤖"
    },
    {
      title: "4th Rank – Portfolio BuildSprint 1.0",
      event: "Girls Leading Tech (EmpowerHer 2.0)",
      desc: "Honored for excellence in coding, responsive design patterns, and creative presentation. Delivered a high-performance web portfolio that balanced aesthetic appeal with strict web accessibility standards and semantic structural integrity.",
      icon: "⭐"
    }
  ];

  // Participations & Hackathons data
  const participations = [
    {
      title: "Standard-a-Thon Hackathon",
      event: "FOSS Club, NIT Srinagar",
      desc: "Developed BIS AI, an AI-powered assistant with RAG pipeline, multilingual support, and offline accessibility.",
      icon: "🤖"
    },
    {
      title: "Coding Challenge",
      event: "Tech Summit 2025",
      desc: "Competitive coding event focused on problem-solving, logical reasoning, and teamwork.",
      icon: "💻"
    },
    {
      title: "Code Debugging Challenge",
      event: "Cyber Conclave 2025, CUK",
      desc: "Solved debugging challenges in C, emphasizing analytical thinking and error resolution.",
      icon: "⚡"
    },
    {
      title: "Technical Treasure Hunt",
      event: "Cyber Conclave 2025, CUK",
      desc: "Team-based challenge requiring decision-making, time management, and critical thinking.",
      icon: "🎯"
    },
    {
      title: "National Tech Day Coding",
      event: "National Tech Day 2024",
      desc: "Competitive coding event focused on problem-solving, debugging, and logical reasoning under time constraints.",
      icon: "⭐"
    }
  ];

  // Honors & Participations Carousel state (0 = Honors, 1 = Participations)
  const [honorsSlide, setHonorsSlide] = useState(0);

  const nextHonors = () => {
    setHonorsSlide((prev) => (prev + 1) % 2);
  };

  const prevHonors = () => {
    setHonorsSlide((prev) => (prev - 1 + 2) % 2);
  };

  // Expanded experience skills tracking state
  const [expandedSkillsIdxs, setExpandedSkillsIdxs] = useState<number[]>([]);

  const toggleSkills = (idx: number) => {
    setExpandedSkillsIdxs((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4 items-stretch">
      
      {/* ================= COLUMN 1: EXPERIENCE TIMELINE ================= */}
      <div className="flex flex-col h-full md:col-span-1">
        <MagicBento className="flex-1 flex flex-col justify-between border-slate-800/80 bg-slate-900/40 p-4 md:p-5">
          <div>
            <div className="flex items-center gap-3 mb-5 border-b border-slate-800/60 pb-3">
              <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/20">
                <Briefcase className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-100 uppercase">Experience</h3>
                <p className="text-[9px] text-slate-400 tracking-wider">Professional timeline and roles</p>
              </div>
            </div>

            <div className="relative border-l border-slate-800 pl-4 ml-2.5 space-y-5">
              {experiences.map((exp, idx) => {
                const isSkillsExpanded = expandedSkillsIdxs.includes(idx);
                const visibleSkills = isSkillsExpanded ? exp.skills : exp.skills.slice(0, 2);
                const remainingCount = exp.skills.length - 2;

                return (
                  <div key={idx} className="relative group">
                    {/* Timeline node */}
                    <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-slate-900 border border-cyan-500/50 group-hover:border-cyan-400 group-hover:scale-110 transition-all duration-300 shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
                    
                    <div className="space-y-0.5">
                      <h4 className="text-xs md:text-sm font-bold text-slate-100 group-hover:text-cyan-400 transition-colors leading-snug">
                        {exp.title}
                      </h4>
                      <p className="text-[10px] font-semibold text-cyan-500/90 leading-normal">{exp.org}</p>
                      
                      <p className="text-[9px] text-slate-400 flex items-center gap-1">
                        <Calendar className="w-2.5 h-2.5 text-cyan-500" />
                        {exp.period}
                      </p>

                      {exp.location && (
                        <p className="text-[8px] text-slate-500 flex items-center gap-0.5 mt-0.5">
                          <MapPin className="w-2.5 h-2.5 text-slate-600" />
                          {exp.location}
                        </p>
                      )}

                      {/* Interactive click-to-expand Skills Badges Area */}
                      <div className="mt-2 text-[9px] leading-relaxed">
                        <div 
                          onClick={() => toggleSkills(idx)}
                          className="flex flex-wrap items-center gap-1 bg-slate-950/40 hover:bg-slate-900/40 p-1.5 rounded border border-slate-850 hover:border-cyan-500/30 transition-all cursor-pointer select-none"
                          title="Click to toggle remaining skills"
                        >
                          <Code className="w-3 h-3 text-cyan-500 flex-shrink-0" />
                          <span className="text-slate-400 font-bold mr-0.5">Skills:</span>
                          
                          <div className="flex flex-wrap gap-1 items-center">
                            {visibleSkills.map((skill, sIdx) => (
                              <Badge key={sIdx} variant="secondary" className="bg-slate-900 text-cyan-450/90 border border-slate-800 text-[8px] px-1 py-0.2 rounded font-semibold transition-colors">
                                {skill}
                              </Badge>
                            ))}
                            
                            {!isSkillsExpanded && remainingCount > 0 && (
                              <span className="text-cyan-400 hover:text-cyan-300 font-black text-[8px] bg-cyan-500/10 px-1 py-0.2 rounded border border-cyan-500/20 transition-all ml-1 flex-shrink-0">
                                +{remainingCount} skills
                              </span>
                            )}

                            {isSkillsExpanded && (
                              <span className="text-emerald-400 hover:text-emerald-350 font-black text-[8px] bg-emerald-500/10 px-1 py-0.2 rounded border border-emerald-500/20 transition-all ml-1 flex-shrink-0">
                                - Hide
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </MagicBento>
      </div>

      {/* ================= COLUMN 2: EDUCATION + CREDENTIALS STACKED ================= */}
      <div className="flex flex-col gap-6 h-full md:col-span-1">
        
        {/* Education (Highly Compact: No details, only institute, degree, years, stream) */}
        <MagicBento className="border-slate-800/80 bg-slate-900/40 flex-1 flex flex-col justify-between p-4 md:p-5">
          <div className="h-full flex flex-col justify-between flex-1">
            <div>
              <div className="flex items-center gap-3 mb-4 border-b border-slate-800/60 pb-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-100 uppercase">Education</h3>
                  <p className="text-[9px] text-slate-400 tracking-wider">Academic milestones</p>
                </div>
              </div>
            </div>

            <div className="flex-grow flex flex-col justify-around py-1">
              {education.map((edu, idx) => (
                <div key={idx} className="group p-3 bg-slate-900/60 border border-slate-850 rounded-xl hover:border-emerald-500/20 hover:bg-slate-855/40 transition-all duration-300">
                  <h4 className="text-[11px] md:text-xs font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-tight">
                    {edu.institute}
                  </h4>
                  <div className="flex flex-col mt-1 space-y-0.5 text-[9px] md:text-[10px]">
                    <span className="font-semibold text-emerald-500/90">{edu.degree}</span>
                    <span className="text-slate-400 font-medium">{edu.stream}</span>
                    <span className="text-slate-500 font-bold mt-1 inline-block border border-slate-800 px-1.5 py-0.5 rounded bg-slate-950/40 w-fit">
                      {edu.years}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MagicBento>

        {/* Credentials Banner Slider */}
        <MagicBento 
          className="border-slate-800/80 bg-slate-900/40 flex flex-col justify-between relative overflow-hidden flex-1 p-4 md:p-5"
        >
          <CertificateBannerSlider certificates={certifications} />
        </MagicBento>
      </div>

      {/* ================= COLUMN 3: HONORS & COMPETITIONS ================= */}
      <div className="flex flex-col h-full md:col-span-1">
        <MagicBento className="flex-1 flex flex-col justify-between border-slate-800/80 bg-slate-900/40 p-4 md:p-5 relative overflow-hidden">
          <div className="h-full flex flex-col justify-between flex-1">
            <div className="flex-grow flex flex-col">
              <div className="flex items-center justify-between mb-5 border-b border-slate-800/60 pb-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
                    <Trophy className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-100 uppercase transition-colors duration-300">
                      {honorsSlide === 0 ? "Honors & Awards" : "Participations"}
                    </h3>
                    <p className="text-[9px] text-slate-400 tracking-wider transition-colors duration-300">
                      {honorsSlide === 0 ? "Rankings and competitive honors" : "Hackathons & technical contests"}
                    </p>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex gap-1">
                  <button 
                    onClick={prevHonors}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-850 hover:bg-slate-800 hover:text-amber-400 border border-slate-800 transition-all text-slate-400"
                    title="Previous Slide"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  <button 
                    onClick={nextHonors}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-slate-850 hover:bg-slate-800 hover:text-amber-400 border border-slate-800 transition-all text-slate-400"
                    title="Next Slide"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Slider Wrapper */}
              <div className="relative flex-grow flex flex-col justify-center py-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={honorsSlide}
                    initial={{ opacity: 0, x: 15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -15 }}
                    transition={{ duration: 0.25 }}
                    className="flex flex-col justify-between gap-3 h-full flex-grow"
                  >
                    {(honorsSlide === 0 ? awards : participations).map((item, idx) => (
                      <div 
                        key={idx} 
                        className="group relative p-2.5 bg-slate-900/60 border border-slate-855 rounded-xl hover:border-amber-500/20 hover:bg-slate-850/40 transition-all duration-300 flex items-start gap-2 flex-1 overflow-hidden"
                      >
                        <span className="text-lg pt-0.5 select-none">{item.icon}</span>
                        <div className="space-y-0.5 flex-1 min-w-0">
                          <h4 className="text-[11px] md:text-xs font-bold text-slate-100 group-hover:text-amber-450 transition-colors leading-tight">
                            {item.title}
                          </h4>
                          <p className="text-[8px] font-black text-amber-500/80 uppercase tracking-widest">{item.event}</p>
                          <p className="text-[9px] text-slate-400 leading-normal group-hover:text-slate-350 transition-colors">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Dots Indicator at the bottom */}
            <div className="flex items-center justify-between border-t border-slate-850 pt-2.5 mt-3">
              <div className="flex gap-1">
                {[0, 1].map((dotIdx) => (
                  <button
                    key={dotIdx}
                    onClick={() => setHonorsSlide(dotIdx)}
                    className={`w-1 h-1 rounded-full transition-all duration-300 ${
                      dotIdx === honorsSlide ? "w-2.5 bg-amber-400" : "bg-slate-700 hover:bg-slate-650"
                    }`}
                  />
                ))}
              </div>
              <span className="text-[8px] font-black tracking-wider text-slate-500 uppercase transition-colors duration-300">
                {honorsSlide === 0 ? "Honors" : "Participations"} ({(honorsSlide === 0 ? awards : participations).length} items)
              </span>
            </div>

          </div>
        </MagicBento>
      </div>

    </div>
  );
};
