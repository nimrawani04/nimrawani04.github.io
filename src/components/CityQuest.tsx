import { useState, useEffect, useRef, useCallback } from "react";
import { ArrowLeft, Car, Award, Award as TrophyIcon, Sparkles, Navigation, Volume2, VolumeX, Square } from "lucide-react";
import "../css/CityQuest.css";

// Checkpoint data model matching actual portfolio data
interface Checkpoint {
  id: string;
  x: number;
  y: number;
  type: 'award' | 'cert' | 'event';
  title: string;
  subtitle?: string;
  desc: string;
  details?: Record<string, string>;
  link?: string;
}

const CHECKPOINTS: Checkpoint[] = [
  // AWARDS PLAZA (Gold Neon - Northeast)
  {
    id: "logo-design",
    x: 2200,
    y: 500,
    type: "award",
    title: "1st Position – Logo Designing",
    subtitle: "Cyber Conclave 2025 · CUK",
    desc: "Recognized for creative conceptualization, visual design thinking, and high-impact graphic communication.",
    details: {
      Category: "Design Competition",
      Venue: "Central University of Kashmir",
      Skills: "UI/UX, Visual Branding, Typography"
    }
  },
  {
    id: "foss-build",
    x: 2500,
    y: 600,
    type: "award",
    title: "1st Position – Open Build Challenge",
    subtitle: "FOSS NIT Srinagar & FOSS United",
    desc: "Awarded top honor for demonstrating rapid problem-solving, clean software architecture, and collaborative open-source product construction under intense competitive constraints.",
    details: {
      Host: "FOSS United & NIT Srinagar",
      Focus: "Open Source Collaboration",
      Outcome: "Production-ready Web Build"
    }
  },
  {
    id: "synertech",
    x: 2150,
    y: 950,
    type: "award",
    title: "1st Position – SynerTech 2026",
    subtitle: "Kashmir College of Engineering & Tech",
    desc: "Collaboratively designed and engineered a full-scale academic CRM with role-based auth, an AI assistant, and a native Android helper app.",
    details: {
      Year: "2026",
      Project: "Academic CRM Portal",
      Tech: "React, Firebase, Android, AI APIs"
    }
  },
  {
    id: "cursor-hackathon",
    x: 2600,
    y: 1050,
    type: "award",
    title: "2nd Position – Cursor Kashmir Hackathon",
    subtitle: "v0 / Next-Gen AI Track",
    desc: "Built Raasta AI—a localized multimodal crop intelligence, education pathfinder, and document simplifying platform with voice navigation.",
    details: {
      Rank: "2nd Position (Silver Medalist)",
      Project: "Raasta – Multimodal AI",
      Platform: "Vercel, Supabase, NextJS"
    },
    link: "https://cursor-hackathon-roan.vercel.app/"
  },
  {
    id: "girls-leading-tech",
    x: 2350,
    y: 1300,
    type: "award",
    title: "4th Rank – Portfolio BuildSprint 1.0",
    subtitle: "Girls Leading Tech · EmpowerHer 2.0",
    desc: "Achieved national recognition for high technical proficiency, outstanding visual aesthetics, and creative layout structures in front-end design.",
    details: {
      Initiative: "EmpowerHer 2.0",
      Focus: "Frontend Innovation",
      Rank: "Top 4 Nationally"
    }
  },

  // CERTIFICATE AVENUE (Blue/Cyan Neon - West)
  {
    id: "ms-ai-concepts",
    x: 400,
    y: 500,
    type: "cert",
    title: "Microsoft AI Concepts Certified",
    subtitle: "Microsoft Credentials · 2026",
    desc: "Validates mastery of foundational artificial intelligence, computer vision models, responsible generative AI, and prompt engineering principles.",
    details: {
      Issuer: "Microsoft Learn",
      Focus: "Generative AI & Computer Vision",
      Skills: "Responsible AI, Deep Learning Models"
    },
    link: "https://learn.microsoft.com/api/achievements/share/en-gb/NimraWani-9486/WV44L35N?sharingId=B856B6811014E40C"
  },
  {
    id: "ms-ml-concepts",
    x: 350,
    y: 750,
    type: "cert",
    title: "Microsoft ML Concepts Certified",
    subtitle: "Microsoft Credentials · 2026",
    desc: "Certifies knowledge in training predictive models, linear regression, classification schemes, cluster groupings, and modern neural network layers.",
    details: {
      Issuer: "Microsoft",
      Core: "Machine Learning Frameworks",
      Mathematics: "Linear/Logistic Regression, K-Means"
    },
    link: "https://learn.microsoft.com/api/achievements/share/en-gb/NimraWani-9486/KC8WHGGB?sharingId=B856B6811014E40C"
  },
  {
    id: "ibm-ai",
    x: 650,
    y: 900,
    type: "cert",
    title: "IBM AI Fundamentals Specialist",
    subtitle: "IBM SkillsBuild Credentials",
    desc: "Covers standard architectures of neural networks, NLP structures, ethical algorithms, computer vision pipelines, and production machine learning.",
    details: {
      Issuer: "IBM SkillsBuild",
      Credly: "Verified Badge",
      Technologies: "Neural Nets, NLP, ML Ethics"
    },
    link: "https://www.credly.com/badges/a36fcbd9-3963-4a4a-b29b-19ff4792aaf1/linked_in_profile"
  },
  {
    id: "oracle-ai",
    x: 450,
    y: 1150,
    type: "cert",
    title: "OCI AI Foundations Associate",
    subtitle: "Oracle Cloud Infrastructure 2025",
    desc: "Global industry certificate verifying cloud-based AI deployment, sequence models, LLMs, and large language model vector databases.",
    details: {
      Issuer: "Oracle",
      Cloud: "OCI AI Infrastructure",
      Skills: "LLMs, Sequence Models, ML Ops"
    },
    link: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=C982AECE9426EA178736DD1F01312EA6B7ECF089391F6FDDCF9CCBCC6CB1A243"
  },
  {
    id: "google-cloud-ml",
    x: 750,
    y: 600,
    type: "cert",
    title: "Prepare Data for ML APIs",
    subtitle: "Google Cloud Credentials",
    desc: "Validates backend proficiency in data pipelines, TensorFlow modeling, Google Cloud Dataflow, and leveraging pre-trained cognitive REST APIs.",
    details: {
      Issuer: "Google Cloud",
      Frameworks: "TensorFlow, Google Dataflow",
      APIs: "Cloud Natural Language, Speech-to-Text"
    },
    link: "https://www.credly.com/badges/0c570f0b-e9e3-4228-962c-c6b06ac28f8c/linked_in_profile"
  },
  {
    id: "techbairn-dsa",
    x: 700,
    y: 1050,
    type: "cert",
    title: "DSA in Modern Product Engineering",
    subtitle: "TechBairn Certified",
    desc: "Rigorous curriculum focused on advanced algorithms, complex graph paths, memory optimization, and structured analytical problem-solving.",
    details: {
      Program: "Data Structures & Algorithms",
      Host: "TechBairn",
      Skills: "Time-Complexity, Graphs, Dynamic Programming"
    }
  },

  // EVENT ARENA (Purple/Pink Neon - South)
  {
    id: "experience-lead",
    x: 1000,
    y: 2100,
    type: "event",
    title: "Campus Lead",
    subtitle: "Open Source Global Connect · Dec 2025 – Present",
    desc: "Spearheading regional student contribution initiatives, organizing Git/GitHub workshops, and acting as a bridge to open-source hubs.",
    details: {
      Organization: "Open Source Global Connect",
      Role: "Campus Lead / Student Director",
      KeyActivities: "Mentoring contributors, Technical Workshops"
    }
  },
  {
    id: "experience-intern",
    x: 1500,
    y: 2500,
    type: "event",
    title: "Student Intern",
    subtitle: "NIT Srinagar · Dec 2025 – Feb 2026",
    desc: "Conducted collaborative engineering research in algorithms, full-stack prototyping, and applied computing under professor mentorship.",
    details: {
      Institution: "National Institute of Technology, Srinagar",
      Type: "Academic Internship",
      Domain: "Applied CS & Algorithm Optimization"
    }
  },
  {
    id: "experience-mentor",
    x: 2000,
    y: 2200,
    type: "event",
    title: "Social Winter of Code Mentor",
    subtitle: "SWOC 2026 · Jan – Mar 2026",
    desc: "Mentored global student contributors in frontend development, pull request reviews, and cooperative modular web design.",
    details: {
      Program: "Social Winter of Code (SWOC)",
      Impact: "Reviewed 50+ PRs",
      Topics: "React, TypeScript, CSS Best Practices"
    }
  },
  {
    id: "event-standardathon",
    x: 1500,
    y: 1950,
    type: "event",
    title: "Standard-a-Thon & Hackathons",
    subtitle: "Cyber Conclave & FOSS NIT",
    desc: "Engaged in competitive debugging challenges (resolving memory leaks in C), rapid prototyping (BIS Product Safety chatbot), and cryptographic hunts.",
    details: {
      Activities: "Standard-a-Thon, Debugging, Treasure Hunts",
      Events: "Cyber Conclave 2025, National Tech Day",
      Focus: "Rapid Coding & Systems Analysis"
    }
  }
];

// Sound Synthesizer Class using Web Audio API (Programmatic Synth - Zero Assets)
class AudioEngine {
  ctx: AudioContext | null = null;
  engineOsc1: OscillatorNode | null = null;
  engineOsc2: OscillatorNode | null = null;
  gainNode: GainNode | null = null;
  lowpassFilter: BiquadFilterNode | null = null;
  rainOsc: AudioWorkletNode | ScriptProcessorNode | null = null;
  rainGain: GainNode | null = null;
  ambientGain: GainNode | null = null;
  soundEnabled = false;

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();
      
      // Setup Lowpass filter for warm rumbling engine sound
      this.lowpassFilter = this.ctx.createBiquadFilter();
      this.lowpassFilter.type = "lowpass";
      this.lowpassFilter.frequency.setValueAtTime(150, this.ctx.currentTime);
      
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(0.0, this.ctx.currentTime);
      
      this.engineOsc1 = this.ctx.createOscillator();
      this.engineOsc1.type = "sawtooth";
      this.engineOsc1.frequency.setValueAtTime(40, this.ctx.currentTime);
      
      this.engineOsc2 = this.ctx.createOscillator();
      this.engineOsc2.type = "triangle";
      this.engineOsc2.frequency.setValueAtTime(80, this.ctx.currentTime);
      
      this.engineOsc1.connect(this.lowpassFilter);
      this.engineOsc2.connect(this.lowpassFilter);
      this.lowpassFilter.connect(this.gainNode);
      this.gainNode.connect(this.ctx.destination);
      
      this.engineOsc1.start();
      this.engineOsc2.start();

      // Setup rain/ambient background hiss
      this.setupAmbientRain();
      this.soundEnabled = true;
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  setupAmbientRain() {
    if (!this.ctx) return;
    // Synthesize procedural white/pink noise for soft rain ambience
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink filter model
      output[i] = (lastOut * 0.95 + white * 0.05);
      lastOut = output[i];
      output[i] *= 2.5; // boost slightly
    }
    
    const noiseNode = this.ctx.createBufferSource();
    noiseBuffer.copyToChannel ? noiseBuffer.copyToChannel(output, 0) : null;
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = "lowpass";
    rainFilter.frequency.setValueAtTime(800, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    noiseNode.connect(rainFilter);
    rainFilter.connect(this.rainGain);
    this.rainGain.connect(this.ctx.destination);
    noiseNode.start();
  }

  setVolume(vol: number) {
    if (!this.ctx || !this.gainNode || !this.soundEnabled) return;
    this.gainNode.gain.setTargetAtTime(vol * 0.12, this.ctx.currentTime, 0.1);
    if (this.rainGain) {
      this.rainGain.gain.setTargetAtTime(vol > 0 ? 0.012 : 0.0, this.ctx.currentTime, 0.2);
    }
  }

  setSpeed(speed: number, maxSpeed: number) {
    if (!this.ctx || !this.engineOsc1 || !this.engineOsc2 || !this.lowpassFilter || !this.soundEnabled) return;
    const ratio = Math.min(1, Math.max(0, Math.abs(speed) / maxSpeed));
    const baseFreq = 42 + ratio * 85;
    this.engineOsc1.frequency.setTargetAtTime(baseFreq, this.ctx.currentTime, 0.1);
    this.engineOsc2.frequency.setTargetAtTime(baseFreq * 2, this.ctx.currentTime, 0.1);
    this.lowpassFilter.frequency.setTargetAtTime(140 + ratio * 280, this.ctx.currentTime, 0.15);
  }

  playChime() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const chord = [261.63, 329.63, 392.00, 493.88, 587.33]; // Cmaj9 glass chime
    chord.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.05);
      gain.gain.setValueAtTime(0, now + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.04, now + i * 0.05 + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.05 + 0.7);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.8);
    });
  }

  playFanfare() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50]; // Glorious golden arcade major chord
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(0.06, now + i * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 1.2);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 1.3);
    });
  }

  playExhaustPop() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(80, now);
    osc.frequency.exponentialRampToValueAtTime(10, now + 0.15);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(120, now);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  stop() {
    if (this.engineOsc1) { try { this.engineOsc1.stop(); } catch(e){} }
    if (this.engineOsc2) { try { this.engineOsc2.stop(); } catch(e){} }
    if (this.ctx) { try { this.ctx.close(); } catch(e){} }
  }
}

// Vehicle Blueprint Options
interface Vehicle {
  id: string;
  name: string;
  emoji: string;
  color: string;
  topSpeed: number;
  accel: number;
  handling: number;
  description: string;
}

const VEHICLES: Vehicle[] = [
  { id: "sports", name: "Phantom GTR", emoji: "🏎️", color: "#ef4444", topSpeed: 8.5, accel: 0.16, handling: 0.06, description: "A high-performance neon track sports car. Blazing speeds and wide tire drift slides." },
  { id: "bike", name: "cyberCycle", emoji: "🏍️", color: "#22c55e", topSpeed: 10.0, accel: 0.22, handling: 0.045, description: "A green Tron-style light cycle. Incredible acceleration, leaves trailing light streaks." },
  { id: "hover", name: "Hover Pod", emoji: "🛸", color: "#06b6d4", topSpeed: 7.2, accel: 0.13, handling: 0.05, description: "An anti-gravity float device. Hovers off the asphalt, drifting heavily on tight corners." },
  { id: "scooter", name: "Vespa Breeze", emoji: "🛵", color: "#a855f7", topSpeed: 5.5, accel: 0.10, handling: 0.08, description: "A cozy retro Italian scooter. Very tight, nimble handling. Perfect for leisurely city exploration." },
  { id: "suv", name: "Urban Crawler", emoji: "🚗", color: "#eab308", topSpeed: 6.8, accel: 0.12, handling: 0.065, description: "A sturdy, compact city vehicle. Excellent stability, fully immune to driving off-road slowdowns." }
];

export default function CityQuest({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<"elevator" | "garage" | "driving">("elevator");
  const [elevatorOpen, setElevatorOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle>(VEHICLES[0]);
  const [audioOn, setAudioOn] = useState(false);
  const [activeCard, setActiveCard] = useState<Checkpoint | null>(null);
  
  // Game metrics
  const [speedVal, setSpeedVal] = useState(0);
  const [discoveredCount, setDiscoveredCount] = useState(0);
  const [uncoveredSet, setUncoveredSet] = useState<Set<string>>(new Set());

  // Web Audio Hook
  const synthRef = useRef<AudioEngine | null>(null);

  // Keyboard driving input mapping
  const keysPressed = useRef<Record<string, boolean>>({});

  // Mobile virtual joystick tracking
  const [isMobile, setIsMobile] = useState(false);
  const joystickPos = useRef({ x: 0, y: 0 });
  const [joystickActive, setJoystickActive] = useState(false);
  const joystickKnobStyle = useRef<React.CSSProperties>({ transform: "translate(0px, 0px)" });

  // Refs for driving animation frames
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameId = useRef<number | null>(null);

  // Physics simulation variables
  const carState = useRef({
    x: 1500, // Spawn at center roundabout
    y: 1500,
    angle: -Math.PI / 2, // Head upwards
    speed: 0,
    drift: 0,
    skidmarks: [] as { x: number; y: number }[]
  });

  // Camera viewport smooth offsets
  const cameraState = useRef({ x: 1500, y: 1500, scale: 1 });

  // Weather/Particulate layers
  const rainDrops = useRef<{ x: number; y: number; vel: number }[]>([]);
  const explosions = useRef<{ x: number; y: number; size: number; max: number; color: string; particles: { x: number; y: number; vx: number; vy: number; alpha: number; size: number }[] }[]>([]);
  const confettiList = useRef<{ x: number; y: number; vx: number; vy: number; color: string; rot: number; rotSpeed: number }[]>([]);
  const trafficVehicles = useRef<{ x: number; y: number; angle: number; speed: number; emoji: string; color: string }[]>([]);

  // Sound triggers
  const handleToggleSound = useCallback(() => {
    if (!synthRef.current) return;
    if (audioOn) {
      synthRef.current.setVolume(0);
      setAudioOn(false);
    } else {
      synthRef.current.init();
      synthRef.current.setVolume(0.4);
      setAudioOn(true);
    }
  }, [audioOn]);

  // Initial gate sequence & mobile viewport check
  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsMobile(isTouch);

    // Dynamic metro elevator gate open animation
    const t1 = setTimeout(() => {
      setElevatorOpen(true);
    }, 1800);

    const t2 = setTimeout(() => {
      setPhase("garage");
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Initialize synthesized sound
  useEffect(() => {
    synthRef.current = new AudioEngine();
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  // Keyboard capture setups
  useEffect(() => {
    if (phase !== "driving") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeCard) return;
      keysPressed.current[e.key.toLowerCase()] = true;
      keysPressed.current[e.code.toLowerCase()] = true;

      // Synthesizer trigger on key hits
      if (synthRef.current && audioOn && (e.key === "w" || e.key === "ArrowUp")) {
        synthRef.current.init();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
      keysPressed.current[e.code.toLowerCase()] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [phase, activeCard, audioOn]);

  // Procedural map generator
  const isPointInRoad = useCallback((x: number, y: number): boolean => {
    // Roundabout in center
    const dx = x - 1500;
    const dy = y - 1500;
    const distToCenter = Math.sqrt(dx * dx + dy * dy);
    if (distToCenter >= 140 && distToCenter <= 280) return true;

    // Grid System
    // Horizontal major highways
    if (Math.abs(y - 1500) <= 90) return true;
    if (Math.abs(y - 500) <= 60) return true;
    if (Math.abs(y - 2500) <= 60) return true;

    // Vertical major Avenues
    if (Math.abs(x - 1500) <= 90) return true;
    if (Math.abs(x - 500) <= 60) return true;
    if (Math.abs(x - 2500) <= 60) return true;

    // Checkpoint parking slots
    for (const cp of CHECKPOINTS) {
      const cDist = Math.sqrt((x - cp.x) * (x - cp.x) + (y - cp.y) * (y - cp.y));
      if (cDist <= 75) return true;
    }

    return false;
  }, []);

  // Spawning local decorative traffic cars
  const spawnTraffic = useCallback(() => {
    const list = [];
    const emojis = ["🚗", "🚕", "🚙", "🚘", "🚌"];
    const colors = ["#ef4444", "#3b82f6", "#22c55e", "#f59e0b", "#ec4899"];
    
    // Spawn 15 traffic elements along major roads
    for (let i = 0; i < 16; i++) {
      const onVer = Math.random() > 0.5;
      let tx = 1500;
      let ty = 1500;
      let ta = 0;
      if (onVer) {
        tx = Math.random() > 0.5 ? 500 : Math.random() > 0.5 ? 1500 : 2500;
        ty = Math.random() * 2600 + 200;
        ta = Math.random() > 0.5 ? Math.PI / 2 : -Math.PI / 2;
      } else {
        tx = Math.random() * 2600 + 200;
        ty = Math.random() > 0.5 ? 500 : Math.random() > 0.5 ? 1500 : 2500;
        ta = Math.random() > 0.5 ? 0 : Math.PI;
      }
      list.push({
        x: tx,
        y: ty,
        angle: ta,
        speed: 2 + Math.random() * 2.5,
        emoji: emojis[i % emojis.length],
        color: colors[i % colors.length]
      });
    }
    trafficVehicles.current = list;
  }, []);

  // Start the physical road drive!
  const startDrive = () => {
    // Trigger pop exhaust rev sound
    if (synthRef.current && audioOn) {
      synthRef.current.init();
      synthRef.current.playExhaustPop();
      setTimeout(() => synthRef.current?.playExhaustPop(), 150);
    }
    
    setPhase("driving");
    
    // Setup rain drops
    const drops = [];
    for (let i = 0; i < 80; i++) {
      drops.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vel: 8 + Math.random() * 6
      });
    }
    rainDrops.current = drops;

    // Spawn AI Traffic
    spawnTraffic();
  };

  // Launch golden fireworks
  const triggerCelebrationFireworks = (x: number, y: number) => {
    if (synthRef.current && audioOn) {
      synthRef.current.playFanfare();
    }
    
    // Spawn 3 fireworks
    for (let f = 0; f < 3; f++) {
      const fx = x + (Math.random() * 180 - 90);
      const fy = y - 100 - (Math.random() * 100);
      const parts = [];
      const colors = ["#ffb703", "#fbbf24", "#fef08a", "#fff", "#f43f5e"];
      
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 2 + Math.random() * 5;
        parts.push({
          x: 0,
          y: 0,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: 2 + Math.random() * 4
        });
      }
      explosions.current.push({
        x: fx,
        y: fy,
        size: 0,
        max: 60 + Math.random() * 40,
        color: colors[f % colors.length],
        particles: parts
      });
    }

    // Spawn falling confetti
    const confs = [];
    const confColors = ["#ffb703", "#06b6d4", "#ec4899", "#22c55e", "#fb923c"];
    for (let c = 0; c < 60; c++) {
      confs.push({
        x: Math.random() * window.innerWidth,
        y: -10 - Math.random() * 80,
        vx: Math.random() * 3 - 1.5,
        vy: 2 + Math.random() * 3,
        color: confColors[c % confColors.length],
        rot: Math.random() * Math.PI,
        rotSpeed: 0.05 + Math.random() * 0.1
      });
    }
    confettiList.current = confs;
  };

  // Interactive checkpoint scanner chime
  const triggerCertificateScan = () => {
    if (synthRef.current && audioOn) {
      synthRef.current.playChime();
    }
  };

  // Mobile virtual joystick calculations
  const handleJoystickStart = (e: React.TouchEvent) => {
    setJoystickActive(true);
  };

  const handleJoystickMove = (e: React.TouchEvent) => {
    if (!joystickActive) return;
    const touch = e.touches[0];
    const joystickEl = document.getElementById("cq-joystick-bounds");
    if (!joystickEl) return;
    const rect = joystickEl.getBoundingClientRect();
    const jCenterX = rect.left + rect.width / 2;
    const jCenterY = rect.top + rect.height / 2;

    const dx = touch.clientX - jCenterX;
    const dy = touch.clientY - jCenterY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxRadius = 45;

    let targetX = dx;
    let targetY = dy;

    if (dist > maxRadius) {
      targetX = (dx / dist) * maxRadius;
      targetY = (dy / dist) * maxRadius;
    }

    joystickPos.current = { x: targetX / maxRadius, y: targetY / maxRadius };
    joystickKnobStyle.current = { transform: `translate(${targetX}px, ${targetY}px)` };
  };

  const handleJoystickEnd = () => {
    setJoystickActive(false);
    joystickPos.current = { x: 0, y: 0 };
    joystickKnobStyle.current = { transform: "translate(0px, 0px)" };
  };

  // Main high-performance Animation Driving Frame loop
  useEffect(() => {
    if (phase !== "driving") return;

    const updatePhysics = () => {
      const car = carState.current;
      const v = selectedVehicle;

      // Gather input controls (desktop or virtual joystick)
      let turnInput = 0;
      let driveInput = 0;

      if (activeCard) {
        // Stop car during modal
        car.speed *= 0.85;
      } else {
        if (isMobile) {
          turnInput = joystickPos.current.x * 1.0;
          // Invert y to match acceleration directions
          driveInput = -joystickPos.current.y;
        } else {
          // Keyboard inputs
          if (keysPressed.current["w"] || keysPressed.current["arrowup"]) driveInput = 1.0;
          if (keysPressed.current["s"] || keysPressed.current["arrowdown"]) driveInput = -0.7;
          if (keysPressed.current["a"] || keysPressed.current["arrowleft"]) turnInput = -1.0;
          if (keysPressed.current["d"] || keysPressed.current["arrowright"]) turnInput = 1.0;
        }
      }

      // Check current road surface (grass detection slows car down unless SUV crawler chosen)
      const onRoad = isPointInRoad(car.x, car.y);
      const limitMod = (onRoad || v.id === "suv") ? 1.0 : 0.45;

      // Handle acceleration & reverse
      const targetSpeed = driveInput * v.topSpeed * limitMod;
      if (driveInput !== 0) {
        car.speed += (targetSpeed - car.speed) * v.accel;
      } else {
        // Natural coasting drag
        car.speed *= 0.95;
      }

      // Steering calculations based on velocity speed
      if (Math.abs(car.speed) > 0.15) {
        const steerSpeed = turnInput * v.handling * Math.min(1.2, Math.abs(car.speed) / 3.0);
        car.angle += steerSpeed;
      }

      // Slide/drift physics
      const slideLimit = v.id === "hover" ? 0.35 : v.id === "sports" ? 0.20 : 0.08;
      const slideAmt = Math.abs(car.speed) > 4 ? turnInput * slideLimit * car.speed : 0;
      car.drift += (slideAmt - car.drift) * 0.15;

      // Apply positional displacement
      car.x += Math.cos(car.angle) * car.speed - Math.sin(car.angle) * car.drift;
      car.y += Math.sin(car.angle) * car.speed + Math.cos(car.angle) * car.drift;

      // Bound car to city limits (3000x3000px)
      car.x = Math.max(50, Math.min(2950, car.x));
      car.y = Math.max(50, Math.min(2950, car.y));

      // Synthesizer speed updating
      if (synthRef.current && audioOn) {
        synthRef.current.setSpeed(car.speed, v.topSpeed);
      }
      setSpeedVal(Math.round(Math.abs(car.speed) * 15));

      // Leave drift tire skidmarks
      if (Math.abs(car.drift) > 0.45 && onRoad) {
        car.skidmarks.push({
          x: car.x - Math.cos(car.angle) * 15,
          y: car.y - Math.sin(car.angle) * 15
        });
        if (car.skidmarks.length > 250) car.skidmarks.shift();
      }

      // Checkpoint landing detection
      if (!activeCard) {
        for (const cp of CHECKPOINTS) {
          const dx = car.x - cp.x;
          const dy = car.y - cp.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist <= 45) {
            // Trigger!
            setActiveCard(cp);
            
            // Decelerate immediately
            car.speed = 0;
            car.drift = 0;

            if (!uncoveredSet.has(cp.id)) {
              const updated = new Set(uncoveredSet);
              updated.add(cp.id);
              setUncoveredSet(updated);
              setDiscoveredCount(updated.size);
            }

            // Play specialized FX depending on district
            if (cp.type === "award") {
              triggerCelebrationFireworks(cp.x, cp.y);
            } else {
              triggerCertificateScan();
            }
            break;
          }
        }
      }

      // Update pedestrian AI traffic
      trafficVehicles.current.forEach((t) => {
        t.x += Math.cos(t.angle) * t.speed;
        t.y += Math.sin(t.angle) * t.speed;

        // Bounce traffic back at boundaries
        if (t.x < 100 || t.x > 2900 || t.y < 100 || t.y > 2900) {
          t.angle += Math.PI;
        }
      });

      // Update rain coordinates
      rainDrops.current.forEach((d) => {
        d.y += d.vel;
        d.x -= 2; // diagonal wind
        if (d.y > window.innerHeight) {
          d.y = -10;
          d.x = Math.random() * window.innerWidth;
        }
      });

      // Update custom particle explosions
      explosions.current.forEach((exp) => {
        exp.size += 1.8;
        exp.particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.08; // gravity
          p.alpha -= 0.015;
        });
      });
      explosions.current = explosions.current.filter((exp) => exp.size < exp.max);

      // Update falling confetti
      confettiList.current.forEach((c) => {
        c.y += c.vy;
        c.x += c.vx;
        c.rot += c.rotSpeed;
      });
      confettiList.current = confettiList.current.filter((c) => c.y < window.innerHeight);

      // Smooth camera chase following
      const cam = cameraState.current;
      cam.x += (car.x - cam.x) * 0.08;
      cam.y += (car.y - cam.y) * 0.08;
    };

    const drawGame = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Handle scaling to device pixel ratio
      const width = window.innerWidth;
      const height = window.innerHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const cam = cameraState.current;
      const car = carState.current;
      const v = selectedVehicle;

      // Clear Screen
      ctx.fillStyle = "#05060b";
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      // Render scrolling matrix transform
      ctx.translate(width / 2, height / 2);
      ctx.scale(cam.scale, cam.scale);
      ctx.translate(-cam.x, -cam.y);

      // 1. Draw grid parks / grasslands
      ctx.fillStyle = "#09121f";
      ctx.fillRect(0, 0, 3000, 3000);

      // Decorative boundary grids
      ctx.strokeStyle = "rgba(6, 182, 212, 0.04)";
      ctx.lineWidth = 1;
      const gridGap = 120;
      for (let g = 0; g <= 3000; g += gridGap) {
        ctx.beginPath();
        ctx.moveTo(g, 0);
        ctx.lineTo(g, 3000);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, g);
        ctx.lineTo(3000, g);
        ctx.stroke();
      }

      // Draw district background ambient glowing sectors
      // Certificate Avenue (Cyan Sector)
      ctx.fillStyle = "rgba(6, 182, 212, 0.02)";
      ctx.fillRect(0, 0, 1100, 1500);
      // Awards Plaza (Golden Sector)
      ctx.fillStyle = "rgba(255, 183, 3, 0.02)";
      ctx.fillRect(1900, 0, 1100, 1500);
      // Event Arena (Purple Sector)
      ctx.fillStyle = "rgba(236, 72, 153, 0.02)";
      ctx.fillRect(500, 1500, 2000, 1500);

      // 2. Draw roads
      ctx.fillStyle = "#1e293b";
      // Horizontal Avenues
      ctx.fillRect(0, 1410, 3000, 180);
      ctx.fillRect(0, 440, 3000, 120);
      ctx.fillRect(0, 2440, 3000, 120);

      // Vertical Streets
      ctx.fillRect(1410, 0, 180, 3000);
      ctx.fillRect(440, 0, 120, 3000);
      ctx.fillRect(2440, 0, 120, 3000);

      // Roundabout in center
      ctx.fillStyle = "#1e293b";
      ctx.beginPath();
      ctx.arc(1500, 1500, 280, 0, Math.PI * 2);
      ctx.fill();

      // Roundabout grass center island
      ctx.fillStyle = "#0c182b";
      ctx.beginPath();
      ctx.arc(1500, 1500, 140, 0, Math.PI * 2);
      ctx.fill();

      // Inner neon boundary for roundabout center
      ctx.strokeStyle = "#38bdf8";
      ctx.lineWidth = 4;
      ctx.shadowColor = "#38bdf8";
      ctx.shadowBlur = 15;
      ctx.beginPath();
      ctx.arc(1500, 1500, 140, 0, Math.PI * 2);
      ctx.stroke();
      ctx.shadowBlur = 0; // reset glow

      // 3. Draw road yellow/white lane stripes
      ctx.strokeStyle = "rgba(255, 255, 255, 0.15)";
      ctx.lineWidth = 3;
      ctx.setLineDash([20, 25]);
      // Horizontal lane lines
      ctx.beginPath();
      ctx.moveTo(0, 1500); ctx.lineTo(3000, 1500);
      ctx.moveTo(0, 500); ctx.lineTo(3000, 500);
      ctx.moveTo(0, 2500); ctx.lineTo(3000, 2500);
      // Vertical lane lines
      ctx.moveTo(1500, 0); ctx.lineTo(1500, 3000);
      ctx.moveTo(500, 0); ctx.lineTo(500, 3000);
      ctx.moveTo(2500, 0); ctx.lineTo(2500, 3000);
      ctx.stroke();
      ctx.setLineDash([]); // reset dash

      // 4. Draw tire skidmarks
      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 5;
      ctx.beginPath();
      car.skidmarks.forEach((mark, index) => {
        if (index === 0) ctx.moveTo(mark.x, mark.y);
        else ctx.lineTo(mark.x, mark.y);
      });
      ctx.stroke();

      // 5. Draw active glowing checkpoint rings
      CHECKPOINTS.forEach((cp) => {
        const themeColor = cp.type === "award" ? "#ffb703" : cp.type === "cert" ? "#06b6d4" : "#ec4899";
        const isDiscovered = uncoveredSet.has(cp.id);

        ctx.save();
        ctx.shadowColor = themeColor;
        ctx.shadowBlur = 20;

        // Outer pulsing ring
        const pulse = 45 + Math.sin(Date.now() * 0.005) * 5;
        ctx.strokeStyle = themeColor;
        ctx.lineWidth = isDiscovered ? 2 : 4;
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, pulse, 0, Math.PI * 2);
        ctx.stroke();

        // Inner glowing core
        ctx.fillStyle = isDiscovered ? "rgba(255, 255, 255, 0.1)" : `${themeColor}22`;
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 25, 0, Math.PI * 2);
        ctx.fill();

        // Pulsing core outline
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, 16 + Math.sin(Date.now() * 0.008) * 2, 0, Math.PI * 2);
        ctx.stroke();

        // Draw checkpoint icon abbreviation
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 9px 'Press Start 2P'";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const label = cp.type === "award" ? "🏆" : cp.type === "cert" ? "📜" : "🎪";
        ctx.fillText(label, cp.x, cp.y);

        ctx.restore();

        // Draw neat glowing floating road-sign above the checkpoint
        ctx.fillStyle = "rgba(15, 23, 42, 0.85)";
        ctx.strokeStyle = themeColor;
        ctx.lineWidth = 2;
        const textWidth = ctx.measureText(cp.title).width + 20;
        ctx.fillRect(cp.x - textWidth / 2, cp.y - 75, textWidth, 22);
        ctx.strokeRect(cp.x - textWidth / 2, cp.y - 75, textWidth, 22);

        ctx.fillStyle = "#ffffff";
        ctx.font = "7px 'Press Start 2P'";
        ctx.fillText(cp.title, cp.x, cp.y - 64);
      });

      // 6. Draw local traffic vehicles
      ctx.font = "24px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      trafficVehicles.current.forEach((t) => {
        ctx.save();
        ctx.translate(t.x, t.y);
        ctx.rotate(t.angle + Math.PI / 2); // face driving way
        ctx.fillText(t.emoji, 0, 0);
        ctx.restore();
      });

      // 7. Draw the user's active vehicle
      ctx.save();
      ctx.translate(car.x, car.y);
      ctx.rotate(car.angle);

      // Glowing headlights (vector light triangles)
      ctx.fillStyle = "rgba(255, 253, 208, 0.12)";
      ctx.beginPath();
      ctx.moveTo(20, 0);
      ctx.lineTo(120, -45);
      ctx.lineTo(120, 45);
      ctx.closePath();
      ctx.fill();

      // Sleek vector wheel frames
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(-16, -16, 8, 5); // wheels
      ctx.fillRect(-16, 11, 8, 5);
      ctx.fillRect(12, -16, 8, 5);
      ctx.fillRect(12, 11, 8, 5);

      // Neon glowing vehicle body chassis
      ctx.fillStyle = v.color;
      ctx.shadowColor = v.color;
      ctx.shadowBlur = 18;
      // Draw rectangular vehicle chassis with hood
      ctx.fillRect(-22, -13, 44, 26);
      
      // Windshield canopy glass
      ctx.fillStyle = "rgba(15, 23, 42, 0.75)";
      ctx.shadowBlur = 0; // reset
      ctx.fillRect(-8, -9, 18, 18);
      ctx.fillStyle = "#ffffff"; // light reflection highlight
      ctx.fillRect(2, -7, 4, 14);

      // Tail lights
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(-24, -10, 2, 4);
      ctx.fillRect(-24, 6, 2, 4);

      // Draw active vehicle emoji mascot sitting on top cinematically!
      ctx.font = "20px sans-serif";
      ctx.fillText(v.emoji, -2, 0);

      ctx.restore();

      // 8. Draw active 3D particle fireworks & celebratory sparks
      ctx.save();
      explosions.current.forEach((exp) => {
        // Sparks
        exp.particles.forEach((p) => {
          ctx.fillStyle = exp.color;
          ctx.globalAlpha = p.alpha;
          ctx.beginPath();
          ctx.arc(exp.x + p.x, exp.y + p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        });
      });
      ctx.restore();

      ctx.restore(); // Restore scrolling camera matrix

      // 9. Overlay Rain/Weather Filter on top screen context
      ctx.strokeStyle = "rgba(174, 219, 240, 0.16)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      rainDrops.current.forEach((d) => {
        ctx.moveTo(d.x, d.y);
        ctx.lineTo(d.x - 6, d.y + 14);
      });
      ctx.stroke();

      // Draw screen-locked Celebratory falling Confetti
      ctx.save();
      confettiList.current.forEach((c) => {
        ctx.fillStyle = c.color;
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rot);
        ctx.fillRect(-4, -6, 8, 12);
        ctx.restore();
      });
      ctx.restore();

      // Re-trigger loop frame
      animFrameId.current = requestAnimationFrame(updatePhysicsAndDraw);
    };

    const updatePhysicsAndDraw = () => {
      updatePhysics();
      drawGame();
    };

    animFrameId.current = requestAnimationFrame(updatePhysicsAndDraw);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [phase, selectedVehicle, activeCard, isPointInRoad, audioOn, uncoveredSet, spawnTraffic]);

  // Minimap Canvas Renderer
  const drawMinimap = useCallback(() => {
    const canvas = document.getElementById("cq-minimap") as HTMLCanvasElement | null;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, 120, 120);

    // Draw dark background grid
    ctx.fillStyle = "rgba(15, 23, 42, 0.9)";
    ctx.fillRect(0, 0, 120, 120);

    // Render themed district sectors on map
    // Certificate Avenue (Cyan - West)
    ctx.fillStyle = "rgba(6, 182, 212, 0.15)";
    ctx.fillRect(0, 0, 44, 60);
    // Awards Plaza (Gold - East)
    ctx.fillStyle = "rgba(255, 183, 3, 0.15)";
    ctx.fillRect(76, 0, 44, 60);
    // Event Arena (Purple - South)
    ctx.fillStyle = "rgba(236, 72, 153, 0.15)";
    ctx.fillRect(20, 60, 80, 60);

    // Scaledown matrix mapping (3000 to 120 px, factor of 25)
    ctx.fillStyle = "rgba(255, 255, 255, 0.18)";
    // Horizontal main highways
    ctx.fillRect(0, 56, 120, 8);
    ctx.fillRect(0, 18, 120, 5);
    ctx.fillRect(0, 98, 120, 5);
    // Vertical main streets
    ctx.fillRect(56, 0, 8, 120);
    ctx.fillRect(18, 0, 5, 120);
    ctx.fillRect(98, 0, 5, 120);

    // Draw central roundabout island
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(60, 60, 9, 0, Math.PI * 2);
    ctx.stroke();

    // Draw checkpoints
    CHECKPOINTS.forEach((cp) => {
      const themeColor = cp.type === "award" ? "#ffb703" : cp.type === "cert" ? "#06b6d4" : "#ec4899";
      const isDiscovered = uncoveredSet.has(cp.id);
      
      ctx.fillStyle = themeColor;
      ctx.beginPath();
      // Draw 2.5px circular checkpoint dots
      ctx.arc(cp.x / 25, cp.y / 25, isDiscovered ? 2.5 : 3.5, 0, Math.PI * 2);
      ctx.fill();

      // Outer pulsing ring for undiscovered targets
      if (!isDiscovered) {
        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(cp.x / 25, cp.y / 25, 5 + Math.sin(Date.now() * 0.005) * 1.5, 0, Math.PI * 2);
        ctx.stroke();
      }
    });

    // Draw player vehicle location indicator
    const car = carState.current;
    const px = car.x / 25;
    const py = car.y / 25;

    ctx.save();
    ctx.translate(px, py);
    ctx.rotate(car.angle);
    // Draw blinking red chevron arrow pointing direction
    ctx.fillStyle = "#ef4444";
    ctx.beginPath();
    ctx.moveTo(5, 0);
    ctx.lineTo(-4, -4);
    ctx.lineTo(-2, 0);
    ctx.lineTo(-4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }, [uncoveredSet]);

  // Request minimap loop
  useEffect(() => {
    if (phase !== "driving") return;
    let minimapFrameId: number;

    const tick = () => {
      drawMinimap();
      minimapFrameId = requestAnimationFrame(tick);
    };

    minimapFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(minimapFrameId);
  }, [phase, drawMinimap]);

  return (
    <div className="cq-viewport">
      
      {/* 1. FUTURISTIC ELEVATOR SCREEN */}
      {phase === "elevator" && (
        <div className="cq-metro-gate" aria-label="Futuristic Underground Metro Entrance Gate">
          <div className={`cq-metro-elevator-left ${elevatorOpen ? "open" : ""}`} />
          <div className={`cq-metro-elevator-right ${elevatorOpen ? "open" : ""}`} />
          <div className="cq-metro-hud">
            <Square size={38} className="text-cyan-500 animate-spin mb-4 inline-block" />
            <h2>ENTERING METRO STATION...</h2>
            <h1 className="text-5xl font-bold tracking-widest text-slate-100 glow-text mb-4">CITY QUEST</h1>
            <p className="text-xs text-cyan-400">CONNECTING SUBWAYS TO PORTFOLIO WORLD</p>
          </div>
        </div>
      )}

      {/* 2. CUSTOM GARAGE VEHICLE SHOWROOM */}
      {phase === "garage" && (
        <div className="cq-garage">
          <header className="cq-garage-header">
            <h1 className="flex items-center justify-center gap-3">
              <Car size={32} className="text-cyan-400" />
              NIMRA'S ARCADE
            </h1>
            <p>CHOOSE YOUR SHOWROOM RIDE TO EXPLORE THE PORTFOLIO ROAD</p>
          </header>

          <main className="cq-garage-showroom">
            {/* Showroom pedestal display */}
            <div className="cq-platform-container">
              <div className="cq-vehicle-avatar-wrapper">
                <span className="cq-vehicle-avatar">{selectedVehicle.emoji}</span>
              </div>
              
              {/* Spinning glowing neon stage */}
              <div className="cq-platform-ring" style={{ "--neon-cyan": selectedVehicle.color } as React.CSSProperties}>
                <Sparkles size={20} className="text-cyan-300 absolute -top-5 animate-pulse" />
              </div>
            </div>

            {/* Customizer Statistics sidebar */}
            <aside className="cq-garage-sidebar">
              <div>
                <h3 className="text-xs text-slate-400 mb-3 uppercase tracking-wider">Showroom Garage</h3>
                <div className="cq-vehicle-menu">
                  {VEHICLES.map((v) => (
                    <button
                      key={v.id}
                      className={`cq-vehicle-menu-item ${selectedVehicle.id === v.id ? "active" : ""}`}
                      onClick={() => setSelectedVehicle(v)}
                    >
                      <span className="emoji">{v.emoji}</span>
                      <span className="label" style={{ color: selectedVehicle.id === v.id ? "#fff" : "#cbd5e1" }}>{v.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Vehicle Stats Panel */}
              <div className="cq-specs-box">
                <h4 className="text-[10px] text-cyan-400 uppercase tracking-widest mb-3">{selectedVehicle.name}</h4>
                <p className="text-[8px] leading-relaxed text-slate-300 mb-4">{selectedVehicle.description}</p>
                
                <div className="cq-spec-row">
                  <span className="cq-spec-label">TOP SPEED</span>
                  <div className="cq-spec-bar-outer">
                    <div className="cq-spec-bar-inner" style={{ width: `${(selectedVehicle.topSpeed / 10.5) * 100}%`, background: selectedVehicle.color }} />
                  </div>
                </div>
                <div className="cq-spec-row">
                  <span className="cq-spec-label">ACCEL</span>
                  <div className="cq-spec-bar-outer">
                    <div className="cq-spec-bar-inner" style={{ width: `${(selectedVehicle.accel / 0.25) * 100}%`, background: selectedVehicle.color }} />
                  </div>
                </div>
                <div className="cq-spec-row">
                  <span className="cq-spec-label">HANDLING</span>
                  <div className="cq-spec-bar-outer">
                    <div className="cq-spec-bar-inner" style={{ width: `${(selectedVehicle.handling / 0.09) * 100}%`, background: selectedVehicle.color }} />
                  </div>
                </div>
              </div>
            </aside>
          </main>

          <footer className="cq-launch-panel">
            <button className="cq-btn-launch" onClick={startDrive}>
              ENTER CITY QUEST 🚀
            </button>
            <div className="mt-4">
              <button onClick={onBack} className="text-[8px] text-slate-400 underline hover:text-white">
                Return to Professional Portfolio
              </button>
            </div>
          </footer>
        </div>
      )}

      {/* 3. MAIN GAMEPLAY INTERACTIVE CANVAS DRIVE */}
      {phase === "driving" && (
        <div className="cq-drive-container">
          <canvas ref={canvasRef} className="cq-canvas" id="cq-game-canvas" />

          {/* Interactive HUD overlay */}
          <div className="cq-hud">
            {/* HUD TOP ROW */}
            <div className="cq-hud-top">
              <button className="cq-btn-exit" onClick={onBack}>
                <ArrowLeft size={12} />
                <span>EXIT</span>
              </button>

              <div className="cq-dashboard">
                <div className="cq-dashboard-stat">
                  <span>DISCOVERED</span>
                  <strong>{discoveredCount} / {CHECKPOINTS.length}</strong>
                </div>
                <div className="cq-dashboard-stat">
                  <span>SPEED</span>
                  <strong>{speedVal} KM/H</strong>
                </div>
                <div className="cq-dashboard-stat">
                  <span>VEHICLE</span>
                  <strong style={{ color: selectedVehicle.color }}>{selectedVehicle.name}</strong>
                </div>
              </div>
            </div>

            {/* MINIMAP CORNER WINDOW */}
            <div className="cq-minimap-wrapper" title="City Navigator Minimap">
              <canvas id="cq-minimap" className="cq-minimap-canvas" width={120} height={120} />
            </div>

            {/* HUD BOTTOM ROW */}
            <div className="cq-hud-bottom">
              
              {/* Virtual joystick controller for mobile/touch screens */}
              {isMobile ? (
                <div 
                  id="cq-joystick-bounds" 
                  className="cq-mobile-joystick"
                  onTouchStart={handleJoystickStart}
                  onTouchMove={handleJoystickMove}
                  onTouchEnd={handleJoystickEnd}
                >
                  <div className="cq-joystick-knob" style={joystickKnobStyle.current} />
                </div>
              ) : (
                <div className="cq-help-sign">
                  🚘 <strong>DRIVING CONTROLS:</strong>
                  <br />
                  Use <strong>W, A, S, D</strong> or <strong>ARROW KEYS</strong> to steer/drive.
                  <br />
                  Travel around to discover Awards Plaza, Certificate Ave, and Event Arena.
                </div>
              )}

              {/* Synthesized sound master toggle button */}
              <button 
                onClick={handleToggleSound} 
                className="cq-btn-exit" 
                style={{ pointerEvents: "auto", border: "1px solid #06b6d4" }}
                title={audioOn ? "Mute audio" : "Play audio"}
              >
                {audioOn ? <Volume2 size={15} className="text-cyan-400" /> : <VolumeX size={15} className="text-slate-400" />}
                <span>AUDIO</span>
              </button>
            </div>
          </div>

          {/* CHECKPOINT DISPLAY MODAL */}
          {activeCard && (
            <div className="cq-checkpoint-overlay">
              <div 
                className="cq-card" 
                style={{ 
                  "--border-color": activeCard.type === "award" ? "#ffb703" : activeCard.type === "cert" ? "#06b6d4" : "#ec4899",
                  "--glow-color": activeCard.type === "award" ? "rgba(255, 183, 3, 0.4)" : activeCard.type === "cert" ? "rgba(6, 182, 212, 0.4)" : "rgba(236, 72, 153, 0.4)",
                  "--bg-badge": activeCard.type === "award" ? "#ffb703" : activeCard.type === "cert" ? "#06b6d4" : "#ec4899",
                  "--theme-color": activeCard.type === "award" ? "#ffb703" : activeCard.type === "cert" ? "#06b6d4" : "#ec4899"
                } as React.CSSProperties}
              >
                <span className="cq-card-badge">
                  {activeCard.type === "award" ? "🏆 Award Unlocked" : activeCard.type === "cert" ? "📜 Certification" : "🎪 Event / Role"}
                </span>

                <h2 className="cq-card-title">{activeCard.title}</h2>
                {activeCard.subtitle && <h4 className="cq-card-subtitle">{activeCard.subtitle}</h4>}

                <p className="cq-card-desc">{activeCard.desc}</p>

                {activeCard.details && (
                  <div className="cq-card-details">
                    {Object.entries(activeCard.details).map(([key, val]) => (
                      <div className="cq-detail-row" key={key}>
                        <span>{key}:</span>
                        <strong>{val}</strong>
                      </div>
                    ))}
                  </div>
                )}

                <div className="cq-card-actions">
                  {activeCard.link && (
                    <a 
                      href={activeCard.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="cq-card-btn primary"
                    >
                      View Live Credential
                    </a>
                  )}
                  <button 
                    className="cq-card-btn secondary" 
                    onClick={() => {
                      // Resume driving controls
                      setActiveCard(null);
                      // Move car slightly away to prevent retriggering loop immediately
                      const car = carState.current;
                      car.x += Math.cos(car.angle) * 75;
                      car.y += Math.sin(car.angle) * 75;
                    }}
                  >
                    Resume Exploration 🏎️
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
