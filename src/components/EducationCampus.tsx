import { useState, useEffect } from "react";
import { ArrowLeft, Volume2, VolumeX } from "lucide-react";
import "../css/EducationCampus.css";

// --- WEB AUDIO SOUNDSCAPE ---
let audioCtx: AudioContext | null = null;
let ambientOsc: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;

const initAudio = () => {
  if (audioCtx) return;
  const AC = window.AudioContext || (window as any).webkitAudioContext;
  audioCtx = new AC();
  ambientOsc = audioCtx.createOscillator();
  ambientGain = audioCtx.createGain();
  ambientOsc.type = "sine";
  ambientOsc.frequency.value = 174.61;
  ambientGain.gain.value = 0.06;
  ambientOsc.connect(ambientGain);
  ambientGain.connect(audioCtx.destination);
  ambientOsc.start();
};

const stopAudio = () => {
  if (ambientOsc) { try { ambientOsc.stop(); } catch(e){} ambientOsc = null; }
  if (audioCtx) { try { audioCtx.close(); } catch(e){} audioCtx = null; }
};

const playSFX = (type: string) => {
  if (!audioCtx || audioCtx.state === "suspended") return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  if (type === "bell") {
    osc.type = "sine"; osc.frequency.value = 880;
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(now + 0.6);
  } else if (type === "page") {
    osc.type = "triangle"; osc.frequency.value = 300;
    osc.frequency.exponentialRampToValueAtTime(150, now + 0.15);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(now + 0.15);
  } else if (type === "chime") {
    [523.25, 659.25, 783.99].forEach((f, i) => {
      setTimeout(() => {
        if (!audioCtx) return;
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = "sine"; o.frequency.value = f;
        g.gain.setValueAtTime(0.08, audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(); o.stop(audioCtx.currentTime + 0.8);
      }, i * 120);
    });
  } else {
    osc.type = "sine"; osc.frequency.value = 440;
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
    osc.connect(gain); gain.connect(audioCtx.destination);
    osc.start(); osc.stop(now + 0.2);
  }
};

// --- CAMPUS ZONES ---
interface Prop { id: string; icon: string; label: string; sfx: string; top: string; left: string; text: string; }
interface Zone { tag: string; title: string; icon: string; defaultText: string; props: Prop[]; }

const ZONES: Zone[] = [
  {
    tag: "DPS Srinagar (2009 – 2023)",
    title: "The Foundation Years",
    icon: "🏫",
    defaultText: "You stand at the entrance of Delhi Public School, Srinagar. Warm afternoon sunlight fills the corridors. Handwritten notes cover classroom boards. The air smells of chalk dust and freshly sharpened pencils. These hallways nurtured the earliest sparks of curiosity, discipline, and the dream of building digital worlds.",
    props: [
      { id: "dps-chalk", icon: "📝", label: "Chalkboard Notes", sfx: "page", top: "18%", left: "15%", text: "The chalkboard is covered in handwritten equations from mathematics and science classes. Here, logical thinking was first exercised. Algebra, geometry, and basic physics problems trained a young mind to think in patterns and structures — the foundation of programming." },
      { id: "dps-computer", icon: "🖥️", label: "Computer Lab", sfx: "chime", top: "45%", left: "55%", text: "The school computer lab had rows of CRT monitors. Here, QBasic programs ran for the first time — simple loops printing patterns, basic input/output programs, and the magical feeling of making a machine do something creative. This is where coding began." },
      { id: "dps-book", icon: "📚", label: "School Library", sfx: "page", top: "72%", left: "30%", text: "The school library was a refuge. From science encyclopedias to early tech magazines, reading here developed curiosity beyond the classroom. Self-learning habits formed during long afternoon library sessions shaped the research-driven mindset used today." }
    ]
  },
  {
    tag: "CUK — Year 1-2 (2023 – 2025)",
    title: "The Engineering Awakening",
    icon: "🎓",
    defaultText: "The campus shifts to Central University of Kashmir. Modern corridors replace school hallways. Laptops glow in lecture rooms. The atmosphere buzzes with ambition. Here, formal computer engineering education began — data structures, algorithms, databases, and the intensity of building real software systems.",
    props: [
      { id: "cuk-lecture", icon: "🏛️", label: "Lecture Hall", sfx: "bell", top: "20%", left: "20%", text: "Large lecture halls where Data Structures, Algorithms, and Database Management Systems were taught. Professors walked through binary trees, hash maps, and PostgreSQL queries. The theoretical foundations that power every real-world application were built here." },
      { id: "cuk-lab", icon: "💻", label: "Coding Lab", sfx: "chime", top: "50%", left: "60%", text: "The university coding lab was the battleground. Late-night sessions debugging React components, integrating Supabase backends, and deploying academic portals on Vercel. The Academic Portal CUK was born in these labs — a full-stack system with role-based auth, attendance tracking, and exam workflows." },
      { id: "cuk-canteen", icon: "☕", label: "Campus Canteen", sfx: "page", top: "75%", left: "35%", text: "Between intense coding sessions, the campus canteen became a space for collaboration. Ideas were discussed over tea. Hackathon strategies were planned on napkins. Team dynamics were built here — the social side of engineering that turned individual coders into collaborative builders." }
    ]
  },
  {
    tag: "Labs & Research (2024 – 2026)",
    title: "The Innovation Workshop",
    icon: "🔬",
    defaultText: "You enter the technology labs and research wing. Digital screens display project architectures. Whiteboards are covered with system diagrams. This zone represents hands-on technical exploration — AI experiments, full-stack prototyping, internships, and the transition from classroom learner to real-world builder.",
    props: [
      { id: "lab-ai", icon: "🧠", label: "AI Research Station", sfx: "chime", top: "22%", left: "18%", text: "The AI research station contains notebooks filled with neural network architectures, NLP experiments, and computer vision pipelines. Certifications from Microsoft AI, IBM SkillsBuild, Google Cloud ML, and Oracle AI Foundations were earned through deep study of machine learning fundamentals and responsible AI principles." },
      { id: "lab-code", icon: "⚡", label: "Project Terminal", sfx: "bell", top: "48%", left: "55%", text: "The project terminal displays live deployments: BIS AI (product safety chatbot with RAG pipeline), Raasta AI (multimodal crop intelligence and education platform), and the CUK Examination Management System. Each project pushed the boundaries of full-stack engineering and AI integration." },
      { id: "lab-intern", icon: "📋", label: "NIT Srinagar Desk", sfx: "page", top: "73%", left: "32%", text: "This desk represents the internship at National Institute of Technology, Srinagar. Collaborative research in algorithms, full-stack prototyping, and applied computing under professor mentorship. The experience bridged academic theory with industry-grade engineering practices." }
    ]
  },
  {
    tag: "Campus Life & Growth (2025+)",
    title: "The Collaborative Garden",
    icon: "🌳",
    defaultText: "The path leads to the campus garden — a reflective space surrounded by cherry blossom trees and quiet benches. This zone represents extracurricular growth, leadership, mentorship, competitions, and the personal philosophy that education is not just about grades but about becoming a better human and creator.",
    props: [
      { id: "gar-lead", icon: "🎖️", label: "Leadership Post", sfx: "chime", top: "20%", left: "25%", text: "Campus Lead at Open Source Global Connect — spearheading student contribution initiatives, organizing Git/GitHub workshops, and mentoring junior developers. Leading was about empowering others, not authority. Organizing technical panels and fostering community sharing created lasting impact." },
      { id: "gar-mentor", icon: "🤝", label: "Mentorship Bench", sfx: "bell", top: "50%", left: "55%", text: "Social Winter of Code (SWOC 2026) Mentor — guiding global student contributors in frontend development, pull request reviews, and cooperative web design. Every code review was a teaching moment. Every merged PR was a shared victory." },
      { id: "gar-trophy", icon: "🏆", label: "Achievement Garden", sfx: "chime", top: "75%", left: "35%", text: "The achievement garden displays victories: 1st Position in Cyber Conclave Logo Design, 1st in FOSS Open Build Challenge, 1st in SynerTech 2026, and 2nd in Cursor Kashmir Hackathon. Each trophy represents teamwork, persistence, and the joy of building under pressure." }
    ]
  }
];

export default function EducationCampus({ onBack }: { onBack: () => void }) {
  const [started, setStarted] = useState(false);
  const [zoneIndex, setZoneIndex] = useState(0);
  const [activeText, setActiveText] = useState("");
  const [activeProp, setActiveProp] = useState<string | null>(null);
  const [musicOn, setMusicOn] = useState(false);
  const [gateOpen, setGateOpen] = useState(true);

  const zone = ZONES[zoneIndex];

  const handleToggleMusic = () => {
    if (!musicOn) {
      initAudio();
      if (audioCtx?.state === "suspended") audioCtx.resume();
      setMusicOn(true);
    } else {
      stopAudio();
      setMusicOn(false);
    }
  };

  const handleStart = () => {
    initAudio();
    if (audioCtx?.state === "suspended") audioCtx.resume();
    setMusicOn(true);
    setGateOpen(false);
    setTimeout(() => { setStarted(true); setGateOpen(true); }, 1600);
  };

  const navigateZone = (idx: number) => {
    setGateOpen(false);
    setTimeout(() => {
      setZoneIndex(idx);
      setActiveProp(null);
      setActiveText("");
      setGateOpen(true);
    }, 1600);
  };

  const selectProp = (prop: Prop) => {
    setActiveProp(prop.id);
    playSFX(prop.sfx);
    let idx = 0, typed = "";
    const interval = setInterval(() => {
      typed += prop.text[idx];
      setActiveText(typed);
      idx++;
      if (idx >= prop.text.length) clearInterval(interval);
    }, 8);
  };

  useEffect(() => {
    return () => { stopAudio(); };
  }, []);

  // Generate leaves
  const leaves = Array.from({ length: 12 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    tx: `${-80 + Math.random() * 160}px`,
    rot: `${Math.random() * 360}deg`,
    dur: `${14 + Math.random() * 10}s`,
    delay: `${Math.random() * 8}s`,
    type: i % 3 === 0 ? "cherry" : i % 3 === 1 ? "green" : "gold"
  }));

  if (!started) {
    return (
      <div className="ec-viewport">
        <div className="ec-sunlight" />
        <div className="ec-vignette" />
        <div className="ec-leaf-container">
          {leaves.map((l, i) => (
            <span key={i} className={`ec-leaf ${l.type}`} style={{ left: l.left, "--tx": l.tx, "--rot": l.rot, "--dur": l.dur, "--delay": l.delay } as any} />
          ))}
        </div>
        <div className="ec-transition-gate">
          <div className={`ec-gate-half ec-gate-top ${gateOpen ? "open" : ""}`}>
            <span className="ec-gate-label">EDUCATION CAMPUS</span>
          </div>
          <div className={`ec-gate-half ec-gate-bottom ${gateOpen ? "open" : ""}`}>
            <span className="ec-gate-label">NIMRA WANI</span>
          </div>
        </div>
        <div className="ec-entrance-scene">
          <div className="ec-campus-gates">
            <div className="ec-gate-arch" />
            <div className="ec-gate-arch" />
            <div className="ec-gate-arch" />
          </div>
          <div className="ec-entrance-title">
            <h2>🎓 EDUCATION CAMPUS</h2>
            <p>Walk through the academic world that shaped Nimra's journey — from school corridors in DPS Srinagar, through engineering labs at CUK, to research stations and leadership gardens. Every classroom, lab, and pathway represents growth.</p>
            <button className="ec-enter-btn" onClick={handleStart}>ENTER CAMPUS 🎓</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ec-viewport">
      <div className="ec-sunlight" />
      <div className="ec-vignette" />
      <div className="ec-leaf-container">
        {leaves.map((l, i) => (
          <span key={i} className={`ec-leaf ${l.type}`} style={{ left: l.left, "--tx": l.tx, "--rot": l.rot, "--dur": l.dur, "--delay": l.delay } as any} />
        ))}
      </div>
      <div className="ec-dust-container">
        {Array.from({ length: 14 }).map((_, i) => (
          <span key={i} className="ec-dust" style={{ left: `${Math.random() * 100}%`, "--tx": `${-100 + Math.random() * 200}px`, "--dur": `${10 + Math.random() * 12}s`, "--delay": `${Math.random() * 5}s` } as any} />
        ))}
      </div>
      <div className="ec-transition-gate">
        <div className={`ec-gate-half ec-gate-top ${gateOpen ? "open" : ""}`}>
          <span className="ec-gate-label">TRANSITIONING</span>
        </div>
        <div className={`ec-gate-half ec-gate-bottom ${gateOpen ? "open" : ""}`}>
          <span className="ec-gate-label">LOADING ZONE</span>
        </div>
      </div>

      {/* Ambient hint */}
      <div className="ec-ambient-hint">
        <Volume2 size={10} style={{ color: "#66bb6a" }} />
        <span>CAMPUS AMBIENCE</span>
        <div className="ec-sound-waves">
          <span className="ec-wave-bar" style={{ "--dur": "0.6s" } as any} />
          <span className="ec-wave-bar" style={{ "--dur": "0.85s" } as any} />
          <span className="ec-wave-bar" style={{ "--dur": "0.5s" } as any} />
        </div>
      </div>

      {/* HUD Header */}
      <header className="ec-hud-header">
        <div className="ec-hud-title">
          <div className="ec-hud-logo">🎓</div>
          <div className="ec-hud-title-text">
            <h3>Education Campus</h3>
            <span>Academic journey explorer</span>
          </div>
        </div>
        <div className="ec-hud-controls">
          <button className="ec-control-btn" onClick={handleToggleMusic} title={musicOn ? "Mute" : "Play"}>
            {musicOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
          </button>
          <button className="ec-control-btn" onClick={onBack} title="Back to Arcade">
            <ArrowLeft size={14} />
          </button>
        </div>
      </header>

      {/* Zone Nav */}
      <nav className="ec-zone-nav">
        <div className="ec-zone-line" />
        {ZONES.map((z, idx) => (
          <div key={idx} className={`ec-zone-node ${zoneIndex === idx ? "active" : ""}`} onClick={() => navigateZone(idx)}>
            <div className="ec-zone-dot">{z.icon}</div>
            <div className="ec-zone-label">{z.title.split(" ").slice(1).join(" ")}</div>
          </div>
        ))}
      </nav>

      {/* Main Scene */}
      <div className="ec-scene-container">
        <div className="ec-room-wrapper">
          <div className="ec-room-card">
            {/* Left: Story */}
            <div className="ec-story-side">
              <div>
                <span className="ec-zone-tag">{zone.tag}</span>
                <h1 className="ec-zone-title">{zone.title}</h1>
              </div>
              <div className="ec-story-text">
                <p>{activeText || zone.defaultText}</p>
              </div>
              <div className="ec-prompt-bar">
                <span className="ec-prompt-blink" />
                <span>{activeProp ? `INSIGHT: ${zone.props.find(p => p.id === activeProp)?.label}` : "Tap visual elements to explore"}</span>
              </div>
            </div>

            {/* Right: Interactive Visual */}
            <div className="ec-visual-side">
              {/* Zone 0: School */}
              {zoneIndex === 0 && (
                <div className="ec-interactive-canvas">
                  <div className="ec-chalkboard" style={{ top: "6%", right: "6%" }}>
                    <div className="ec-chalk-text">{"a² + b² = c²\nF = ma\nE = mc²\n∫ dx = x + C"}</div>
                  </div>
                  <div className="ec-window-light" style={{ position: "absolute", top: "5%", left: "8%" }} />
                  {zone.props.map(p => (
                    <div key={p.id} className="ec-clickable-prop" style={{ top: p.top, left: p.left }} onClick={() => selectProp(p)}>
                      <span className="ec-prop-icon">{p.icon}</span>
                      <span className="ec-target-ping" />
                      <span className="ec-prop-label">{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Zone 1: University */}
              {zoneIndex === 1 && (
                <div className="ec-interactive-canvas">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className="ec-floating-paper" style={{ top: `${15 + i * 25}%`, left: `${8 + i * 18}%`, "--rot": `${-10 + i * 8}deg`, "--dur": `${5 + i * 2}s`, "--delay": `${i * 0.6}s` } as any} />
                  ))}
                  <div style={{ position: "absolute", top: "8%", right: "8%" }}>
                    <div className="ec-bookshelf">
                      {["#e57373","#64b5f6","#81c784","#ffb74d","#ba68c8","#4dd0e1"].map((c,i) => (
                        <div key={i} className="ec-book" style={{ background: c, height: `${18 + Math.random() * 14}px` }} />
                      ))}
                    </div>
                  </div>
                  {zone.props.map(p => (
                    <div key={p.id} className="ec-clickable-prop" style={{ top: p.top, left: p.left }} onClick={() => selectProp(p)}>
                      <span className="ec-prop-icon">{p.icon}</span>
                      <span className="ec-target-ping" />
                      <span className="ec-prop-label">{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Zone 2: Labs */}
              {zoneIndex === 2 && (
                <div className="ec-interactive-canvas">
                  <div style={{ position: "absolute", top: "6%", right: "6%" }}>
                    <div className="ec-lab-screen">
                      <div className="ec-lab-code">{"const app = express();\napp.use(cors());\nconst ai = new OpenAI();\nawait supabase\n  .from('students')\n  .select('*');\nconsole.log('deployed');"}</div>
                    </div>
                  </div>
                  {zone.props.map(p => (
                    <div key={p.id} className="ec-clickable-prop" style={{ top: p.top, left: p.left }} onClick={() => selectProp(p)}>
                      <span className="ec-prop-icon">{p.icon}</span>
                      <span className="ec-target-ping" />
                      <span className="ec-prop-label">{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
              {/* Zone 3: Garden */}
              {zoneIndex === 3 && (
                <div className="ec-interactive-canvas">
                  <div className="ec-garden-bg" />
                  <div style={{ position: "absolute", top: "8%", right: "10%" }}>
                    <div className="ec-trophy-case">
                      <span className="ec-trophy-item">🥇</span>
                      <span className="ec-trophy-item">🥇</span>
                      <span className="ec-trophy-item">🥈</span>
                    </div>
                  </div>
                  {zone.props.map(p => (
                    <div key={p.id} className="ec-clickable-prop" style={{ top: p.top, left: p.left }} onClick={() => selectProp(p)}>
                      <span className="ec-prop-icon">{p.icon}</span>
                      <span className="ec-target-ping" />
                      <span className="ec-prop-label">{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
