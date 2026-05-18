import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Volume2, VolumeX, Home, CheckCircle2, Star, ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "@/css/CookingGame.css";

// -------------------------------------------------------------
// 1. DATA DEFINITIONS & SCHEMAS (DATA-DRIVEN METHOD)
// -------------------------------------------------------------

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: "frontend" | "backend" | "database" | "tool";
  color: string;
  soundType: "powder" | "sauce" | "spice" | "oil";
}

interface Recipe {
  id: string;
  name: string;
  dishName: string;
  emoji: string;
  description: string;
  longDescription: string;
  ingredients: string[];
  features: string[];
  github: string;
  demo: string;
  screenshot: string;
  xpGain: number;
  instructions: string[];
}

const INGREDIENTS: Ingredient[] = [
  // Frontend
  { id: "react", name: "React Flour", emoji: "🌾", category: "frontend", color: "#61dafb", soundType: "powder" },
  { id: "html", name: "HTML Sugar", emoji: "🍬", category: "frontend", color: "#e34f26", soundType: "powder" },
  { id: "css", name: "CSS Frosting", emoji: "🧁", category: "frontend", color: "#1572b6", soundType: "powder" },
  { id: "js", name: "JavaScript Sugar", emoji: "🍯", category: "frontend", color: "#f7df1e", soundType: "powder" },
  { id: "ts", name: "TypeScript Pepper", emoji: "🌶️", category: "frontend", color: "#3178c6", soundType: "spice" },
  { id: "tailwind", name: "Tailwind Seasoning", emoji: "🧂", category: "frontend", color: "#06b6d4", soundType: "spice" },
  // Backend Logic
  { id: "nodejs", name: "Node.js Spice", emoji: "🍂", category: "backend", color: "#339933", soundType: "spice" },
  { id: "express", name: "Express.js Yeast", emoji: "🥖", category: "backend", color: "#808080", soundType: "powder" },
  { id: "python", name: "Python Beans", emoji: "🫘", category: "backend", color: "#3776ab", soundType: "powder" },
  { id: "ai", name: "AI Syrup", emoji: "🔮", category: "backend", color: "#8b5cf6", soundType: "sauce" },
  { id: "apis", name: "APIs Syrup", emoji: "🍯", category: "backend", color: "#f97316", soundType: "sauce" },
  // Databases
  { id: "supabase", name: "Supabase Syrup", emoji: "⚡", category: "database", color: "#3ecf8e", soundType: "sauce" },
  { id: "postgres", name: "PostgreSQL Salt", emoji: "🧂", category: "database", color: "#4169e1", soundType: "spice" },
  { id: "sql", name: "SQL Sauce", emoji: "🍾", category: "database", color: "#00758f", soundType: "sauce" },
  { id: "firebase", name: "Firebase Syrup", emoji: "🍯", category: "database", color: "#ffca28", soundType: "sauce" },
  // Tools
  { id: "docker", name: "Docker Oil", emoji: "🛢️", category: "tool", color: "#2496ed", soundType: "oil" },
  { id: "vercel", name: "Vercel Powder", emoji: "🧁", category: "tool", color: "#ffffff", soundType: "powder" },
  { id: "github", name: "GitHub Seeds", emoji: "🌱", category: "tool", color: "#181717", soundType: "spice" },
  { id: "figma", name: "Figma Glaze", emoji: "🎨", category: "tool", color: "#f24e1e", soundType: "sauce" },
  { id: "arduino", name: "Arduino Chips", emoji: "🔌", category: "tool", color: "#00979d", soundType: "spice" },
  { id: "web3forms", name: "Web3Forms Nectar", emoji: "✉️", category: "tool", color: "#6366f1", soundType: "sauce" },
  { id: "firecrawler", name: "Firecrawler Oil", emoji: "🕷️", category: "tool", color: "#f43f5e", soundType: "oil" },
];

const RECIPES: Recipe[] = [
  {
    id: "portal",
    name: "Academic Portal System CUK",
    dishName: "CUK Portal Cake 🍰",
    emoji: "🍰",
    description: "Multi-tiered secure university panel built to automate semester registries and roll-sheets.",
    longDescription: "A highly resilient and secure central portals architecture developed for student dashboards, roll generation, and administrative examined grades tracking.",
    ingredients: ["react", "ts", "supabase", "postgres", "vercel"],
    features: [
      "Role-based secure portal dashboard guards",
      "Semester enrollment & result publishing loops",
      "Faculty grading matrix tables manager"
    ],
    github: "https://github.com/nimrawani04/CUK-Portal",
    demo: "https://cuk-portal.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
    xpGain: 500,
    instructions: [
      "Pour React Flour into Mixing Bowl to mold student portals.",
      "Shake TypeScript Pepper to secure type safety structures.",
      "Drizzle Supabase Syrup for automated credentials handling.",
      "Sprinkle PostgreSQL Salt for relational marks records.",
      "Bake under Vercel Powder static cloud serving."
    ]
  },
  {
    id: "araaz",
    name: "Araaz E-commerce Website",
    dishName: "Araaz Burger 🍔",
    emoji: "🍔",
    description: "Fully responsive multi-category digital marketplace featuring Web3Forms notifications.",
    longDescription: "A modern responsive full-stack shopping portal with active inventory listings and robust form submissions handling.",
    ingredients: ["html", "css", "js", "web3forms", "vercel"],
    features: [
      "Multi-category product search filters",
      "Web3Forms automated client contacts router",
      "Rapid responsive mobile rendering layouts"
    ],
    github: "https://github.com/nimrawani04/Araaz-Ecommerce",
    demo: "https://araaaz.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=80",
    xpGain: 400,
    instructions: [
      "Bake robust HTML Sugar buns for base markup.",
      "Butter CSS Frosting patties for custom layouts.",
      "Chop JavaScript Sugar pickles for UI controls.",
      "Pour Web3Forms Nectar for automated feedback forms.",
      "Toast on Vercel Powder static hosting."
    ]
  },
  {
    id: "twoai",
    name: "2AI Conference Website",
    dishName: "2AI Conference Coffee ☕",
    emoji: "☕",
    description: "The official academic summit website for Applied Artificial Intelligence (2AI 2026).",
    longDescription: "A highly accessible global portal developed to host research paper submissions, speaker grids, schedule tables, and event highlights.",
    ingredients: ["js", "ts", "css", "html"],
    features: [
      "Global researcher accessibility indexes",
      "Schedule timesheets and paper categories board",
      "Responsive speaker spotlight components"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://araaaz.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&auto=format&fit=crop&q=80",
    xpGain: 350,
    instructions: [
      "Brew HTML Sugar coffee grounds for page structure.",
      "Pour CSS Frosting cream for layout spacing.",
      "Blend JavaScript Sugar for speaker interactions.",
      "Stir TypeScript Pepper for static data lists."
    ]
  },
  {
    id: "exam",
    name: "CUK Examination Management System",
    dishName: "CUK Exam Stew 🍲",
    emoji: "🍲",
    description: "A secure, role-based system streamlining university exam sheets and schedules.",
    longDescription: "A scalable exam scheduling and roll-list automation system built with multi-user permissions, audit boards, and real-time database registers.",
    ingredients: ["react", "ts", "supabase", "postgres", "vercel"],
    features: [
      "Faculty examination paper publisher panel",
      "Student roll-sheet automatic generation",
      "Relational exam log tables audit records"
    ],
    github: "https://github.com/nimrawani04/CUK-Portal",
    demo: "https://secure-exam-flow.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
    xpGain: 460,
    instructions: [
      "Boil React Flour as robust exam system soup.",
      "Stir TypeScript Pepper to protect exam boundary rules.",
      "Drizzle Supabase Syrup for authentication states.",
      "Pour PostgreSQL Salt to secure time-tables archives.",
      "Steam cook using Vercel Powder."
    ]
  },
  {
    id: "acadex",
    name: "CUK Acadex Operations Portal",
    dishName: "CUK Acadex Sushi 🍣",
    emoji: "🍣",
    description: "Collaborative campus administrative portal for faculty and student registry tracking.",
    longDescription: "A university-wide system designed to unify roll calls, notifications, course grade records, and department schedules.",
    ingredients: ["react", "ts", "supabase", "postgres", "vercel"],
    features: [
      "Student attendance live log tracking",
      "Faculty department bulletin boards",
      "Rapid responsive campus grids"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://ds-cuk.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
    xpGain: 420,
    instructions: [
      "Wrap React Flour rice rolls around data bases.",
      "Slice TypeScript Pepper for safe student registries.",
      "Pour Supabase Syrup for secure login parameters.",
      "Simmer PostgreSQL Salt database metrics.",
      "Pack static sushi in Vercel Powder static box."
    ]
  },
  {
    id: "bisai",
    name: "BIS AI Compliance Assistant",
    dishName: "BIS Safety Soup 🍲",
    emoji: "🍲",
    description: "An offline-ready PWA compliance tool built on Indian safety regulation data.",
    longDescription: "An intelligent compliance system powered by vector indexing, RAG retrieval-augmented generation models, offline storage registers, and multilingual assistance.",
    ingredients: ["react", "ts", "supabase", "postgres", "vercel", "ai"],
    features: [
      "Compliance regulation RAG search engine",
      "Student inspect logs progressive PWA PouchDB",
      "AI standards bilingual assistant"
    ],
    github: "https://github.com/nimrawani04/BIS-AI-Assistant",
    demo: "https://bis-ai.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
    xpGain: 480,
    instructions: [
      "Add React Flour base stew base.",
      "Sprinkle TypeScript Pepper to define static rules.",
      "Pour Supabase Syrup to handle audit logs.",
      "Simmer PostgreSQL Salt relational tables.",
      "Mix AI Syrup for semantic RAG vector query analysis.",
      "Steam compile with Vercel Powder."
    ]
  },
  {
    id: "raasta",
    name: "Raasta – AI Platform for Kashmir",
    dishName: "Raasta Crop Ramen 🍜",
    emoji: "🍜",
    description: "Comforting agricultural deep learning crop diagnostic and educational assistant.",
    longDescription: "A multi-domain intelligence platform hosting agricultural computer vision classifiers, semantic local translation systems, and career route roadmaps.",
    ingredients: ["react", "ts", "supabase", "postgres", "vercel", "ai", "firecrawler"],
    features: [
      "Computer vision crop disease diagnostic",
      "Firecrawler educational scraping pipelines",
      "Semantic voice multilingual translations"
    ],
    github: "https://github.com/nimrawani04/Raasta",
    demo: "https://cursor-hackathon-roan.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
    xpGain: 490,
    instructions: [
      "Simmer React Flour wheat ramen noodles.",
      "Mix AI Syrup for computer vision classification.",
      "Drizzle Supabase Syrup for student portal data.",
      "Pour PostgreSQL Salt database metrics.",
      "Heat Firecrawler Oil to scrape resource lists.",
      "Bake inside Vercel Powder static bowl."
    ]
  },
  {
    id: "smartattendance",
    name: "Smart Attendance System",
    dishName: "Smart Attendance Salad 🥗",
    emoji: "🥗",
    description: "An automated administrative system tracking biometrics, logs, and notification alerts.",
    longDescription: "A high-performance student attendance tracker integrating ESP8266 RFID sensors, real-time logging hooks, and SMS reminders.",
    ingredients: ["react", "ts", "nodejs", "express", "postgres"],
    features: [
      "ESP8266 sensor biometric logging pipelines",
      "Automated low attendance SMS warning hooks",
      "Interactive analytics admin dashboard tables"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://cuk-portal.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
    xpGain: 430,
    instructions: [
      "Prepare React Flour base layers.",
      "Dice TypeScript Pepper for static model arrays.",
      "Pour PostgreSQL Salt for secure relational metrics.",
      "Garnish with Node.js Spice.",
      "Drizzle Express.js Yeast server sauce."
    ]
  },
  {
    id: "arduino",
    name: "IoT Smart House Automation",
    dishName: "Smart IoT Pizza 🍕",
    emoji: "🍕",
    description: "An embedded hardware gateway tracking environmental telemetry sensor nodes.",
    longDescription: "An IoT hardware prototype combining ESP8266 nodes, infrared and ultrasonic relays, and an interactive telemetry analytics control console.",
    ingredients: ["arduino", "html", "css"],
    features: [
      "ESP8266 telemetry node relays control",
      "Ultrasonic proximity sensory warnings",
      "Responsive analytics HTML gateway page"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://araaz-ecommerce.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
    xpGain: 370,
    instructions: [
      "Bake flat HTML Sugar crust sheets.",
      "Spread CSS Frosting cheese layouts.",
      "Sprinkle Arduino Chips embedded controller gates."
    ]
  }
];

const UTENSILS = [
  { id: "pot", name: "Large Pot", emoji: "🍲", mode: "boil" },
  { id: "saucepan", name: "Saucepan", emoji: "🫕", mode: "simmer" },
  { id: "pan", name: "Frying Pan", emoji: "🍳", mode: "fry" },
  { id: "skillet", name: "Skillet", emoji: "🥘", mode: "sear" },
  { id: "mixer", name: "Mixing Bowl", emoji: "🥣", mode: "mix" }
];

// -------------------------------------------------------------
// 2. SYNTHESIZED WEB AUDIO ENGINE
// -------------------------------------------------------------

class KitchenAudio {
  private ctx: AudioContext | null = null;
  private sizzleNode: AudioScheduledSourceNode | null = null;
  private loopOsc: OscillatorNode | null = null;

  public init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Audio context not supported", e);
    }
  }

  public playDial() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  public playClink() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(950, this.ctx.currentTime);
    osc.frequency.setValueAtTime(1300, this.ctx.currentTime + 0.02);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  public playPowder() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  public playSauce() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(350, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  public playSpice() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 4; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(1200 + i * 200, now + i * 0.05);
      gain.gain.setValueAtTime(0.05, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.04);
    }
  }

  public playOil() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(3500, now);
    filter.Q.setValueAtTime(2.0, now);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(now);
    noise.stop(now + 0.15);
  }

  public playCrack() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(90, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(200, this.ctx.currentTime + 0.25);
    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  public playChime() {
    if (!this.ctx) return;
    const time = this.ctx.currentTime;
    const frequencies = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    frequencies.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, time + idx * 0.1);
      gain.gain.setValueAtTime(0.05, time + idx * 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.1 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time + idx * 0.1);
      osc.stop(time + idx * 0.1 + 0.4);
    });
  }

  public startCookingLoop(intensity: "low" | "medium" | "high") {
    if (!this.ctx) return;
    this.stopCookingLoop();

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    
    // Low: slow deep bubble. High: aggressive sizzling
    const freq = intensity === "low" ? 1800 : intensity === "medium" ? 2800 : 3800;
    const volume = intensity === "low" ? 0.03 : intensity === "medium" ? 0.06 : 0.12;

    filter.frequency.setValueAtTime(freq, this.ctx.currentTime);
    filter.Q.setValueAtTime(intensity === "low" ? 1.5 : 0.8, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(volume, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    this.sizzleNode = noise;
  }

  public stopCookingLoop() {
    if (this.sizzleNode) {
      try {
        this.sizzleNode.stop();
      } catch (e) {}
      this.sizzleNode = null;
    }
  }

  public startCozyMusic() {
    if (!this.ctx) return;
    this.stopCozyMusic();
    const time = this.ctx.currentTime;
    const notes = [146.83, 185.00, 220.00, 293.66];
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(notes[0], time);
    gain.gain.setValueAtTime(0.015, time);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    this.loopOsc = osc;
  }

  public stopCozyMusic() {
    if (this.loopOsc) {
      try {
        this.loopOsc.stop();
      } catch (e) {}
      this.loopOsc = null;
    }
  }
}

// -------------------------------------------------------------
// 3. MAIN REACT COMPONENT
// -------------------------------------------------------------

export default function CookingGame({ onBack }: { onBack: () => void }) {
  const [cookingState, setCookingState] = useState<"menu" | "recipe" | "cooking" | "plated" | "showcase">("menu");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeUtensil, setActiveUtensil] = useState<string | null>(null);
  const [collectedIngredients, setCollectedIngredients] = useState<string[]>([]);
  const [wrongSelectionsCount, setWrongSelectionsCount] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [toast, setToast] = useState("");
  
  // Stove, Temperature & Compilation
  const [isStovePlaced, setIsStovePlaced] = useState(false); // Cookware physically on stove
  const [knobRotated, setKnobRotated] = useState(false);
  const [stoveOn, setStoveOn] = useState(false);
  const [heatLevel, setHeatLevel] = useState<"low" | "medium" | "high">("medium");
  const [cookProgress, setCookProgress] = useState(0);

  // Drag-and-Follow Jar Coordinates
  const [draggedIng, setDraggedIng] = useState<Ingredient | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHoveringUtensil, setIsHoveringUtensil] = useState(false);
  const [isPouring, setIsPouring] = useState(false);

  // Cookware Transfer Coordinate states (Move pot to stove)
  const [isTransferringUtensil, setIsTransferringUtensil] = useState(false);
  const [isHoveringStoveBurner, setIsHoveringStoveBurner] = useState(false);

  // Particle systems
  const [droplets, setDroplets] = useState<Array<{ id: number; color: string; left: number }>>([]);
  const [sparks, setSparks] = useState<Array<{ id: number; emoji: string; dur: string }>>([]);

  // Cookware Accumulative Visual Layers
  const [hasPowder, setHasPowder] = useState(false);
  const [hasFluid, setHasFluid] = useState(false);
  const [hasSprinkles, setHasSprinkles] = useState(false);
  const [hasAiGlow, setHasAiGlow] = useState(false);
  const [activeFluidColor, setActiveFluidColor] = useState("#ef4444");

  const audioEngineRef = useRef<KitchenAudio | null>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  // Initialize sparkles
  useEffect(() => {
    audioEngineRef.current = new KitchenAudio();
    const sparklesList = ["✨", "🌟", "⭐", "💫", "✨"];
    const generatedSparks = Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      emoji: sparklesList[i % sparklesList.length],
      dur: `${1.4 + Math.random() * 2.2}s`
    }));
    setSparks(generatedSparks);

    // Global cursor listener
    const handleGlobalMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
    };
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2200);
  };

  const playSFX = (type: "dial" | "clink" | "powder" | "sauce" | "spice" | "oil" | "crack" | "chime") => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.init();
    if (type === "dial") audioEngineRef.current.playDial();
    if (type === "clink") audioEngineRef.current.playClink();
    if (type === "powder") audioEngineRef.current.playPowder();
    if (type === "sauce") audioEngineRef.current.playSauce();
    if (type === "spice") audioEngineRef.current.playSpice();
    if (type === "oil") audioEngineRef.current.playOil();
    if (type === "crack") audioEngineRef.current.playCrack();
    if (type === "chime") audioEngineRef.current.playChime();
  };

  const toggleSound = () => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.init();
    if (musicOn) {
      audioEngineRef.current.stopCozyMusic();
      setMusicOn(false);
    } else {
      audioEngineRef.current.startCozyMusic();
      setMusicOn(true);
    }
  };

  // 1. SELECT DYNAMIC PORTFOLIO RECIPE
  const handleSelectRecipe = (recipe: Recipe) => {
    playSFX("clink");
    setSelectedRecipe(recipe);
    setCookingState("recipe");
    setCollectedIngredients([]);
    setActiveUtensil(null);
    setWrongSelectionsCount(0);
    setIsStovePlaced(false);
    setKnobRotated(false);
    setStoveOn(false);
    setHeatLevel("medium");
    setCookProgress(0);
    // Reset layers
    setHasPowder(false);
    setHasFluid(false);
    setHasSprinkles(false);
    setHasAiGlow(false);
  };

  // 2. CHOOSE INITIAL COOKWARE UTENSIL
  const handleSelectUtensil = (utensilId: string) => {
    if (isStovePlaced) return;
    playSFX("clink");
    setActiveUtensil(utensilId);
    triggerToast(`${UTENSILS.find(u => u.id === utensilId)?.name} placed on preparation table!`);
  };

  // 3. TACTILE JAR PICKUP
  const handlePickupIngredient = (ing: Ingredient) => {
    if (!selectedRecipe) return;
    if (!activeUtensil) {
      triggerToast("⚠️ Place a cooking utensil from the rack shelf first!");
      return;
    }
    if (isStovePlaced) {
      triggerToast("⚠️ The cookware is already placed on the stove burner!");
      return;
    }
    playSFX("clink");
    setDraggedIng(ing);
  };

  // 4. MOUSE HOVER EVENTS FOR PREP WORKSPACE
  const handleCounterMouseEnter = () => {
    if (draggedIng) {
      setIsHoveringUtensil(true);
    }
  };

  const handleCounterMouseLeave = () => {
    setIsHoveringUtensil(false);
  };

  // 5. POUR RELEASE FOR DRAGGED INGREDIENTS
  const handlePourRelease = () => {
    if (isTransferringUtensil) {
      handleCompleteUtensilTransfer();
      return;
    }

    if (!draggedIng || !selectedRecipe) return;

    if (!isHoveringUtensil) {
      setDraggedIng(null);
      return;
    }

    // Trigger visual pouring droplets
    setIsPouring(true);
    playSFX(draggedIng.soundType);

    const activeColor = draggedIng.color;
    const generatedDroplets = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      color: activeColor,
      left: 30 + Math.random() * 40
    }));
    setDroplets(generatedDroplets);

    setTimeout(() => {
      setDroplets([]);
      setIsPouring(false);
      
      const ingId = draggedIng.id;
      const isCorrect = selectedRecipe.ingredients.includes(ingId);
      
      // Update visual pot layers
      if (draggedIng.soundType === "powder") {
        setHasPowder(true);
      } else if (draggedIng.soundType === "sauce") {
        setHasFluid(true);
        setActiveFluidColor(draggedIng.color);
        if (ingId === "ai") {
          setHasAiGlow(true);
        }
      } else if (draggedIng.soundType === "spice") {
        setHasSprinkles(true);
      } else if (draggedIng.soundType === "oil") {
        setHasFluid(true);
        setActiveFluidColor("#d97706");
      }

      if (collectedIngredients.includes(ingId)) {
        triggerToast(`Added extra pinch of ${draggedIng.name}`);
      } else {
        setCollectedIngredients(prev => [...prev, ingId]);
        if (isCorrect) {
          triggerToast(`Successfully added ${draggedIng.name}!`);
        } else {
          setWrongSelectionsCount(prev => prev + 1);
          playSFX("crack");
          triggerToast(`⚠️ Added incorrect tech: ${draggedIng.name}`);
        }
      }

      setDraggedIng(null);
      setIsHoveringUtensil(false);
    }, 600);
  };

  // 6. INGREDIENTS COMPLETE - LIFT/FLOAT COOKWARE TO MOVE TO STOVE
  const handleStartUtensilTransfer = () => {
    if (!activeUtensil || isStovePlaced) return;
    playSFX("clink");
    setIsTransferringUtensil(true);
    triggerToast("Cookware floating! Move cursor to stove burner slot on the right to place it!");
  };

  const handleCompleteUtensilTransfer = () => {
    if (!isHoveringStoveBurner) {
      // Put it back
      setIsTransferringUtensil(false);
      return;
    }
    playSFX("clink");
    setIsStovePlaced(true);
    setIsTransferringUtensil(false);
    setIsHoveringStoveBurner(false);
    triggerToast("🍳 Cookware placed successfully on burner range! Ignition ready.");
  };

  // Check if all correct stack ingredients gathered
  const checkIsReadyToCook = () => {
    if (!selectedRecipe) return false;
    return selectedRecipe.ingredients.every(ing => collectedIngredients.includes(ing));
  };

  // 7. IGNITE STOVE & TEMPERATURE SPEED CONTROLLER
  const handleIgniteStove = () => {
    if (!selectedRecipe || !activeUtensil) return;
    if (!isStovePlaced) {
      triggerToast("⚠️ Place the cookware physically on the stove burner first!");
      return;
    }

    playSFX("dial");
    setKnobRotated(true);
    setStoveOn(true);
    if (audioEngineRef.current) {
      audioEngineRef.current.startCookingLoop(heatLevel);
    }

    // Progress bar tick rate depends on heat slider level
    // High heat: 25ms tick. Medium: 60ms tick. Low: 120ms tick
    const tickRate = heatLevel === "high" ? 30 : heatLevel === "medium" ? 70 : 130;

    const interval = setInterval(() => {
      setCookProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          handleFinishCooking();
          return 100;
        }
        return prev + 4;
      });
    }, tickRate);
  };

  // Dynamically update loops when slider heat changes
  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    const newHeat = val === 0 ? "low" : val === 1 ? "medium" : "high";
    setHeatLevel(newHeat);
    if (stoveOn && audioEngineRef.current) {
      audioEngineRef.current.startCookingLoop(newHeat);
    }
  };

  const handleFinishCooking = () => {
    if (audioEngineRef.current) {
      audioEngineRef.current.stopCookingLoop();
    }
    playSFX("chime");
    setCookingState("plated");
  };

  const handleExploreProjectShowcase = () => {
    playSFX("clink");
    setCookingState("showcase");
  };

  // Dynamics star ratings
  const getDynamicStars = () => {
    const calculated = 5 - (wrongSelectionsCount * 0.5);
    return Math.max(1, calculated);
  };

  const getUtensilEmoji = () => {
    return UTENSILS.find(u => u.id === activeUtensil)?.emoji || "🍳";
  };

  return (
    <div className="kg-viewport" onMouseUp={handlePourRelease}>
      <div className="kg-vignette" />

      {/* Falling Rain backdrop overlay */}
      <div className="kg-window-backdrop">
        <div className="kg-rain-overlay" />
        <div className="kg-rain-drops" />
      </div>

      {/* Floating Soundscape Toggle */}
      <div className="kg-soundscape-pill" onClick={toggleSound}>
        <div className="kg-sound-waves">
          <span className="kg-wave-bar" style={{ "--dur": "0.6s" } as any} />
          <span className="kg-wave-bar" style={{ "--dur": "0.8s" } as any} />
          <span className="kg-wave-bar" style={{ "--dur": "0.5s" } as any} />
          <span className="kg-wave-bar" style={{ "--dur": "0.9s" } as any} />
        </div>
        <span>{musicOn ? "Cozy Synth loop: On 🔊" : "Cozy Synth loop: Off 🔇"}</span>
      </div>

      {/* -------------------------------------------------------------
       * TOAST ALERTS OVERLAY
       * ------------------------------------------------------------- */}
      <AnimatePresence>
        {toast && (
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-950/90 border border-emerald-500/30 text-emerald-400 font-semibold px-4 py-2.5 rounded-xl text-xs tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.2)] z-50 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
       * HUD HEADER BAR
       * ------------------------------------------------------------- */}
      <div className="kg-hud-header">
        <div className="kg-hud-title">
          <div className="kg-hud-logo">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div className="kg-hud-title-text">
            <h3>NIMRA'S KITCHEN STUDIO</h3>
            <span>GAME 1 — Authentic Stack Recipe Simulator</span>
          </div>
        </div>

        <div className="kg-hud-controls">
          <button className="kg-control-btn" onClick={onBack} title="Back to Selection Hub">
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
       * TACTILE FLOATING/DRAGGED JAR FOLLOWING CURSOR
       * ------------------------------------------------------------- */}
      {draggedIng && (
        <div 
          className={`kg-dragged-active-jar ${isPouring ? "pouring" : ""}`}
          style={{
            left: mouseCoords.x - 30,
            top: mouseCoords.y - 35,
            "--jar-glow": draggedIng.color
          } as any}
        >
          <span className="text-3xl">{draggedIng.emoji}</span>
          <span className="text-[7.5px] font-black text-slate-400 mt-1 uppercase tracking-widest text-center max-w-[90%] truncate">
            {draggedIng.name}
          </span>
        </div>
      )}

      {/* -------------------------------------------------------------
       * TACTILE FLOATING/DRAGGED COOKWARE UTENSIL
       * ------------------------------------------------------------- */}
      {isTransferringUtensil && activeUtensil && (
        <div 
          className="kg-placed-utensil floating-transfer"
          style={{
            left: mouseCoords.x - 70,
            top: mouseCoords.y - 65
          }}
        >
          <span className="kg-utensil-graphic">{getUtensilEmoji()}</span>
        </div>
      )}

      {/* -------------------------------------------------------------
       * SCREEN ROUTING
       * ------------------------------------------------------------- */}

      {/* STATE A: SELECTION MENU BOARD - TODAY'S MENU */}
      {cookingState === "menu" && (
        <div className="kg-menu-scene">
          <div className="kg-menu-board">
            <div className="kg-menu-header">
              <h2>TODAY'S MENU</h2>
              <p>These dishes are generated directly from my actual portfolio projects. Choose a recipe to begin compilation.</p>
            </div>

            <div className="kg-recipe-cards-grid">
              {RECIPES.map(recipe => (
                <div 
                  key={recipe.id}
                  className="kg-recipe-card"
                  onClick={() => handleSelectRecipe(recipe)}
                >
                  <div className="kg-card-thumbnail-container">
                    <span className="kg-card-thumbnail-display">{recipe.emoji}</span>
                  </div>
                  <div>
                    <h3>{recipe.dishName}</h3>
                    <p>{recipe.description}</p>
                  </div>
                  <button className="kg-card-select-btn">
                    CHOOSE DISH 🍳
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATE B: ACTIVE KITCHEN SIMULATION (STOVE, CABINET, PREP ISLAND) */}
      {(cookingState === "recipe" || cookingState === "cooking") && selectedRecipe && (
        <div className="kg-workspace">
          
          {/* COLUMN 1: SKILL INGREDIENTS CABINET */}
          <div className="kg-ingredients-cabinet">
            <div className="kg-cabinet-header">
              <h4>Cabinet Ingredients</h4>
              <p>Click a jar to hold it, then release over the cookware to pour. Add actual project stack components only.</p>
            </div>

            <div className="kg-shelves-container">
              {/* Frontend Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Frontend Flour & Base</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "frontend").map(ing => (
                    <div 
                      key={ing.id}
                      className="kg-ingredient-jar"
                      style={{ "--jar-glow": ing.color } as any}
                      onClick={() => handlePickupIngredient(ing)}
                      title={`Click to pick up ${ing.name}`}
                    >
                      <span className="kg-jar-icon">{ing.emoji}</span>
                      <span className="kg-jar-label">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Backend Spices & Logic</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "backend").map(ing => (
                    <div 
                      key={ing.id}
                      className="kg-ingredient-jar"
                      style={{ "--jar-glow": ing.color } as any}
                      onClick={() => handlePickupIngredient(ing)}
                      title={`Click to pick up ${ing.name}`}
                    >
                      <span className="kg-jar-icon">{ing.emoji}</span>
                      <span className="kg-jar-label">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Database Salts & Syrups</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "database").map(ing => (
                    <div 
                      key={ing.id}
                      className="kg-ingredient-jar"
                      style={{ "--jar-glow": ing.color } as any}
                      onClick={() => handlePickupIngredient(ing)}
                      title={`Click to pick up ${ing.name}`}
                    >
                      <span className="kg-jar-icon">{ing.emoji}</span>
                      <span className="kg-jar-label">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Hosting & DevOps Oils</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "tool").map(ing => (
                    <div 
                      key={ing.id}
                      className="kg-ingredient-jar"
                      style={{ "--jar-glow": ing.color } as any}
                      onClick={() => handlePickupIngredient(ing)}
                      title={`Click to pick up ${ing.name}`}
                    >
                      <span className="kg-jar-icon">{ing.emoji}</span>
                      <span className="kg-jar-label">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* COLUMN 2: CENTER PREPARATION TABLE */}
          <div className="kg-cooking-island">
            <div 
              className="kg-island-main"
              ref={counterRef}
              onMouseEnter={handleCounterMouseEnter}
              onMouseLeave={handleCounterMouseLeave}
            >
              {/* Highlight drop zone when dragged element is active */}
              <div className={`kg-drop-zone-overlay ${draggedIng ? "active" : ""}`}>
                <div className="kg-drop-zone-text">
                  Release or Click to Pour Ingredient 🍳
                </div>
              </div>

              {/* Cookbook Details */}
              <div className="kg-leather-cookbook">
                <div className="kg-cookbook-spine" />
                
                {/* Left Page */}
                <div className="kg-page-left">
                  <span className="kg-recipe-title">{selectedRecipe.dishName}</span>
                  <p className="kg-recipe-desc">{selectedRecipe.longDescription}</p>
                  
                  <div className="kg-recipe-instructions">
                    Instructions:<br/>
                    {selectedRecipe.instructions.map((inst, idx) => (
                      <div key={idx} className="mt-1 text-[7.5px] leading-tight">
                        {idx + 1}. {inst}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Page */}
                <div className="kg-page-right">
                  <span className="kg-recipe-ingredients-title">Actual Project Stack Required:</span>
                  <div className="kg-ingredients-checklist">
                    {selectedRecipe.ingredients.map(ingId => {
                      const ingDetail = INGREDIENTS.find(i => i.id === ingId);
                      const isCollected = collectedIngredients.includes(ingId);
                      return (
                        <div key={ingId} className={`kg-ingredient-checklist-item ${isCollected ? "checked" : ""}`}>
                          <div className="kg-checkbox-circle">
                            {isCollected ? "✓" : ""}
                          </div>
                          <span>{ingDetail?.name || ingId}</span>
                        </div>
                      );
                    })}
                  </div>

                  {wrongSelectionsCount > 0 && (
                    <div className="mt-4 text-[7px] font-black text-red-500 uppercase tracking-widest animate-pulse">
                      ⚠️ Compilation Alert: {wrongSelectionsCount} incorrect ingredients added. Stars adjusted.
                    </div>
                  )}
                </div>
              </div>

              {/* Wooden Table prep surface */}
              <div className="kg-countertop">
                {activeUtensil && !isStovePlaced ? (
                  <div 
                    className={`kg-placed-utensil ${isTransferringUtensil ? "opacity-30" : ""}`}
                    onClick={handleStartUtensilTransfer}
                    title="Click to lift and drag to stove burner"
                  >
                    <span className="kg-utensil-graphic">{getUtensilEmoji()}</span>
                    
                    {/* Visual Cookware level layers */}
                    <div className="kg-utensil-content-container">
                      <div className={`kg-powder-layer ${hasPowder ? "visible" : ""}`} />
                      <div 
                        className={`kg-fluid-layer ${hasFluid ? "visible" : ""}`} 
                        style={{ "--fluid-color": activeFluidColor } as any}
                      />
                      <div className={`kg-sprinkle-layer ${hasSprinkles ? "visible" : ""}`} />
                      <div className={`kg-ai-layer-glow ${hasAiGlow ? "visible" : ""}`} />
                    </div>

                    {/* Active Droplet streams falling when pouring */}
                    {isPouring && droplets.map(d => (
                      <div 
                        key={d.id} 
                        className="kg-pour-droplet"
                        style={{
                          left: `${d.left}%`,
                          "--d-color": d.color
                        } as any}
                      />
                    ))}

                    <div className="kg-cooker-counter">
                      {UTENSILS.find(u => u.id === activeUtensil)?.name} ({collectedIngredients.length} added)
                    </div>

                    {/* Show Transfer Ready tag */}
                    {checkIsReadyToCook() && (
                      <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-emerald-500 text-slate-950 font-black text-[7.5px] px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_10px_rgba(16,185,129,0.4)] animate-bounce">
                        READY! CLICK TO LIFT TO STOVE
                      </div>
                    )}
                  </div>
                ) : isStovePlaced ? (
                  <div className="text-[8.5px] font-black uppercase tracking-widest text-emerald-400 bg-slate-950/80 p-5 rounded-xl border border-emerald-500/20 max-w-[80%] text-center">
                    🍲 COOKWARE TRANSFERRED SUCCESSFULLY TO STOVE BURNER ON THE RIGHT!
                  </div>
                ) : (
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-950/80 p-5 rounded-xl border border-dashed border-slate-700/60 max-w-[80%] text-center">
                    🥣 SELECT A COOKWARE UTENSIL FROM THE BOTTOM SHELF TO PLACE ON THE PREP TABLE
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Cookware Utensil Rack */}
            <div className="kg-utensil-shelf">
              <span className="kg-utensil-shelf-title">Utensil Rack Shelf</span>
              <div className="kg-utensil-rack">
                {UTENSILS.map(utensil => (
                  <div 
                    key={utensil.id}
                    className={`kg-utensil-rack-slot ${activeUtensil === utensil.id ? "selected" : ""} ${isStovePlaced ? "opacity-35 cursor-not-allowed" : ""}`}
                    onClick={() => handleSelectUtensil(utensil.id)}
                  >
                    <span className="kg-rack-icon">{utensil.emoji}</span>
                    <span className="kg-rack-label">{utensil.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: STOVE RANGE & IGNITION SYSTEM */}
          <div className="kg-stove-range">
            <div className="kg-stove-burners">
              {/* Active Burner Slot */}
              <div 
                className={`kg-burner-slot ${stoveOn ? "active" : ""} ${isTransferringUtensil ? "burner-highlight" : ""}`}
                onMouseEnter={() => { if (isTransferringUtensil) setIsHoveringStoveBurner(true); }}
                onMouseLeave={() => { setIsHoveringStoveBurner(false); }}
                onClick={() => { if (isTransferringUtensil) handleCompleteUtensilTransfer(); }}
              >
                <div className="kg-burner-ring" />
                
                {/* Visual rendering of cooker on stove */}
                {isStovePlaced && activeUtensil && (
                  <div className={`kg-placed-utensil cooking-${stoveOn ? heatLevel : "none"}`}>
                    <span className="kg-utensil-graphic">{getUtensilEmoji()}</span>
                    
                    {/* Visual Cookware level layers */}
                    <div className="kg-utensil-content-container">
                      <div className={`kg-powder-layer ${hasPowder ? "visible" : ""}`} />
                      <div 
                        className={`kg-fluid-layer ${hasFluid ? "visible" : ""}`} 
                        style={{ "--fluid-color": activeFluidColor } as any}
                      />
                      <div className={`kg-sprinkle-layer ${hasSprinkles ? "visible" : ""}`} />
                      <div className={`kg-ai-layer-glow ${hasAiGlow ? "visible" : ""}`} />
                    </div>
                  </div>
                )}

                {/* SVG burning fire flames */}
                {stoveOn && (
                  <div className="kg-burner-flames">
                    <span className="kg-flame-tongue" style={{ "--d": "0.3s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.55s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.42s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.62s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.38s" } as any} />
                  </div>
                )}

                {/* Steam rising particles */}
                {stoveOn && (
                  <>
                    <div className="kg-steam-cloud" style={{ animationDelay: "0s", left: "25px" }} />
                    <div className="kg-steam-cloud" style={{ animationDelay: "0.6s", left: "55px" }} />
                    <div className="kg-steam-cloud" style={{ animationDelay: "1.2s", left: "85px" }} />
                  </>
                )}

                <div className="absolute top-4 font-black text-[7.5px] uppercase tracking-widest text-slate-500">
                  {isTransferringUtensil ? "PLACE HERE 🟢" : stoveOn ? `ACTIVE STOVE 🔥 (${heatLevel})` : "BURNER RANGE"}
                </div>
              </div>

              {/* Showroom Burner Slot */}
              <div className="kg-burner-slot">
                <div className="kg-burner-ring" />
                <div className="absolute top-4 font-black text-[7.5px] uppercase tracking-widest text-slate-600">
                  Burner Off
                </div>
              </div>
            </div>

            {/* Power controls & slider */}
            <div className="kg-stove-controls-board">
              
              {/* Slider for Heat Level */}
              {isStovePlaced && (
                <div className="kg-heat-slider-container">
                  <div className="kg-heat-slider-title">
                    <span>Stove Heat Slider</span>
                    <span className="text-red-400 font-bold">{heatLevel.toUpperCase()}</span>
                  </div>
                  <input 
                    type="range"
                    min="0"
                    max="2"
                    step="1"
                    defaultValue="1"
                    className="kg-heat-slider-input"
                    onChange={handleSliderChange}
                  />
                  <div className="flex justify-between text-[6.5px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    <span>Simmer (Low)</span>
                    <span>Medium</span>
                    <span>Boil (High)</span>
                  </div>
                </div>
              )}

              <div className="kg-stove-knobs-rack">
                
                {/* Knob 1: Power Knob */}
                <div className="kg-metallic-knob-container">
                  <div 
                    className="kg-metallic-knob"
                    style={{ transform: knobRotated ? "rotate(90deg)" : "rotate(0deg)" }}
                    onClick={handleIgniteStove}
                    title="Click to ignite burner"
                  >
                    <div className="kg-knob-indicator" />
                  </div>
                  <span className={`kg-knob-label ${stoveOn ? "active" : ""}`}>
                    {stoveOn ? "ON 🔥" : "IGNITE"}
                  </span>
                </div>

                {/* Knob 2: Deco Temp knob */}
                <div className="kg-metallic-knob-container">
                  <div className="kg-metallic-knob" style={{ transform: "rotate(40deg)" }}>
                    <div className="kg-knob-indicator" />
                  </div>
                  <span className="kg-knob-label">TEMP</span>
                </div>
              </div>

              {/* Active Cooking progress bar */}
              {stoveOn && (
                <div className="w-full bg-slate-950/80 p-2.5 rounded-xl border border-emerald-500/20 text-center">
                  <span className="text-[7.5px] font-black text-emerald-400 uppercase tracking-widest block mb-1">
                    Compiling technology recipes...
                  </span>
                  <div className="w-full h-1 bg-slate-900 rounded overflow-hidden">
                    <div className="h-full bg-emerald-400 transition-all" style={{ width: `${cookProgress}%` }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* STATE C: PLATING REVEAL SCENE */}
      {cookingState === "plated" && selectedRecipe && (
        <div className="kg-plating-scene">
          {/* Sparlkes floating around */}
          {sparks.map(s => (
            <span
              key={s.id}
              className="kg-gold-sparkle"
              style={{
                left: `${12 + Math.random() * 75}%`,
                top: `${18 + Math.random() * 64}%`,
                "--dur": s.dur
              } as any}
            >
              {s.emoji}
            </span>
          ))}

          <div className="kg-gourmet-reveal-card">
            <span className="text-[8px] uppercase font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full tracking-widest">
              Gourmet Dish Prepared!
            </span>

            <div className="kg-plated-dish-display">
              {selectedRecipe.emoji}
            </div>

            <h3 className="kg-plated-title">{selectedRecipe.dishName} plated!</h3>
            
            {/* Stars rating based on accuracy */}
            <div className="kg-stars-row">
              {Array.from({ length: 5 }).map((_, idx) => {
                const earned = getDynamicStars();
                const isActive = idx < Math.floor(earned);
                const isHalf = !isActive && idx === Math.floor(earned) && (earned % 1 !== 0);
                return (
                  <span 
                    key={idx} 
                    className={`kg-star-item ${isActive ? "active" : isHalf ? "active opacity-70" : "cracked"}`}
                  >
                    ★
                  </span>
                );
              })}
            </div>

            {wrongSelectionsCount > 0 ? (
              <p className="kg-plated-desc">
                Your recipe compiled! There were {wrongSelectionsCount} incorrect technical components added, but your chef resilience plated it beautifully anyway!
              </p>
            ) : (
              <p className="kg-plated-desc">
                Perfect culinary engineering! Every required stack ingredient was combined flawlessly to construct this master portfolio dish.
              </p>
            )}

            <button className="kg-explore-dish-btn" onClick={handleExploreProjectShowcase}>
              SERVE & EXPLORE DISH <ArrowRight className="inline-block w-4 h-4 ml-1.5" />
            </button>
          </div>
        </div>
      )}

      {/* STATE D: PROJECT SHOWCASE BOARD HUD */}
      {cookingState === "showcase" && selectedRecipe && (
        <div className="kg-showcase-scene">
          <div className="kg-showcase-board">
            
            {/* Close Button */}
            <button className="kg-showcase-close-btn" onClick={() => setCookingState("menu")} title="Back to menu">
              ✕
            </button>

            {/* Left Col */}
            <div className="kg-showcase-left">
              <div>
                <div className="kg-showcase-dish-badge">
                  <span>{selectedRecipe.emoji}</span>
                  <span>{selectedRecipe.dishName}</span>
                </div>

                <h2 className="kg-showcase-title">{selectedRecipe.name}</h2>
                <p className="kg-showcase-desc">{selectedRecipe.longDescription}</p>

                <div className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
                  Signature Highlights:
                </div>
                <div className="kg-showcase-features-list">
                  {selectedRecipe.features.map((feat, idx) => (
                    <div key={idx} className="kg-feature-pill">
                      <span className="text-emerald-400">⚡</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies list */}
              <div>
                <div className="text-[8px] font-extrabold uppercase text-slate-600 tracking-wider mb-2">
                  Stack Ingredients recipe used:
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedRecipe.ingredients.map(ingId => {
                    const ingDetail = INGREDIENTS.find(i => i.id === ingId);
                    return (
                      <span 
                        key={ingId} 
                        className="text-[9px] font-black px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-300"
                      >
                        {ingDetail?.emoji} {ingDetail?.name || ingId}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right Col */}
            <div className="kg-showcase-right">
              {/* Image screenshot with XP indicator */}
              <div className="kg-showcase-screenshot-container">
                <img src={selectedRecipe.screenshot} alt={selectedRecipe.name} />
                
                {/* XP gain badge */}
                <div className="kg-xp-gain-badge">
                  + {selectedRecipe.xpGain} CHEF XP
                </div>
              </div>

              {/* Project links actions */}
              <div className="kg-showcase-actions">
                <a 
                  href={selectedRecipe.demo} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="kg-showcase-btn primary"
                >
                  <ExternalLink className="w-4 h-4" /> Live Recipe Demo
                </a>
                <a 
                  href={selectedRecipe.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="kg-showcase-btn secondary"
                >
                  <FaGithub className="w-4 h-4" /> Recipe Source
                </a>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
