import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Volume2, VolumeX, Home, CheckCircle2, Star, ArrowRight, ExternalLink, HelpCircle } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "@/css/CookingGame.css";

// -------------------------------------------------------------
// 1. DATA DEFINITIONS & SCHEMAS
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
  { id: "nextjs", name: "Next.js Yeast", emoji: "🍞", category: "frontend", color: "#ffffff", soundType: "powder" },
  { id: "tailwind", name: "Tailwind Seasoning", emoji: "🧂", category: "frontend", color: "#06b6d4", soundType: "spice" },
  // Backend Logic
  { id: "nodejs", name: "Node.js Spice", emoji: "🍂", category: "backend", color: "#339933", soundType: "spice" },
  { id: "express", name: "Express.js Yeast", emoji: "🥖", category: "backend", color: "#808080", soundType: "powder" },
  { id: "python", name: "Python Beans", emoji: "🫘", category: "backend", color: "#3776ab", soundType: "powder" },
  { id: "ai", name: "AI Syrup", emoji: "🔮", category: "backend", color: "#8b5cf6", soundType: "sauce" },
  { id: "apis", name: "APIs Syrup", emoji: "🍯", category: "backend", color: "#f97316", soundType: "sauce" },
  // Databases
  { id: "mongodb", name: "MongoDB Herbs", emoji: "🌿", category: "database", color: "#47a248", soundType: "spice" },
  { id: "postgres", name: "PostgreSQL Salt", emoji: "🧂", category: "database", color: "#4169e1", soundType: "spice" },
  { id: "sql", name: "SQL Sauce", emoji: "🍾", category: "database", color: "#00758f", soundType: "sauce" },
  { id: "firebase", name: "Firebase Syrup", emoji: "🍯", category: "database", color: "#ffca28", soundType: "sauce" },
  // Tools
  { id: "docker", name: "Docker Oil", emoji: "🛢️", category: "tool", color: "#2496ed", soundType: "oil" },
  { id: "vercel", name: "Vercel Powder", emoji: "🧁", category: "tool", color: "#ffffff", soundType: "powder" },
  { id: "github", name: "GitHub Seeds", emoji: "🌱", category: "tool", color: "#181717", soundType: "spice" },
  { id: "figma", name: "Figma Glaze", emoji: "🎨", category: "tool", color: "#f24e1e", soundType: "sauce" },
  { id: "framer", name: "Framer Motion Sparkles", emoji: "✨", category: "tool", color: "#ea580c", soundType: "spice" },
  { id: "threejs", name: "Three.js Glitz", emoji: "🧪", category: "tool", color: "#049ef4", soundType: "sauce" },
];

const RECIPES: Recipe[] = [
  {
    id: "bisai",
    name: "BIS AI Product Safety Assistant",
    dishName: "BIS Safety Soup 🍲",
    emoji: "🍲",
    description: "An intelligent, warm offline-ready PWA soup that automatically filters product safety.",
    longDescription: "A mission-critical compliance system using retrieval-augmented generation (RAG) and vector indexes, built to assist offline inspectors verify safety parameters.",
    ingredients: ["react", "ai", "apis", "figma", "docker"],
    features: [
      "Real-time RAG compliance vector index",
      "Offline inspection progressive storage PWA",
      "Compliance report audit builder"
    ],
    github: "https://github.com/nimrawani04/BIS-AI-Assistant",
    demo: "https://bis-safety.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
    xpGain: 500,
    instructions: [
      "Scoop React Flour into Boiling Pot for base structure.",
      "Drizzle AI Syrup into the mixture for compliance logic.",
      "Pour APIs Syrup for secure endpoint data retrieval.",
      "Glaze the setup using Figma Glaze mockups.",
      "Containerize using Docker Oil for uniform environment."
    ]
  },
  {
    id: "raasta",
    name: "Raasta AI Platform",
    dishName: "Raasta Crop Ramen 🍜",
    emoji: "🍜",
    description: "A rich, comforting bowl of deep-learning crop analysis and AI-guided assistance.",
    longDescription: "An advanced agricultural platform utilizing computer vision crop disease detection models, semantic chatbots, and custom crop analysis logs.",
    ingredients: ["python", "ai", "react", "apis", "tailwind"],
    features: [
      "Image processing crop health engine",
      "AI semantic chat bot guidance model",
      "Multi-document offline summarizer pipeline"
    ],
    github: "https://github.com/nimrawani04/Raasta",
    demo: "https://raasta-ai.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
    xpGain: 450,
    instructions: [
      "Add React Flour to lay high-fidelity visual noodles.",
      "Simmer Python Beans for the rich deep learning crop broth.",
      "Mix AI Syrup for semantic chat models.",
      "Pour APIs Syrup to bind backend image arrays.",
      "Season with Tailwind Seasoning for aesthetic styling."
    ]
  },
  {
    id: "portal",
    name: "Academic Portal System",
    dishName: "CUK Portal Cake 🍰",
    emoji: "🍰",
    description: "A decadent, multi-tiered security dashboard cake with sweet roles and automated credentials.",
    longDescription: "The central operations hub for the Central University of Kashmir (CUK). Automates result publication, semester registrations, roll-sheet generations, and grading tables.",
    ingredients: ["react", "ts", "postgres", "firebase", "figma"],
    features: [
      "Student registration & grading matrix",
      "Faculty examination generation board",
      "Role-based secure portal guards"
    ],
    github: "https://github.com/nimrawani04/CUK-Portal",
    demo: "https://cuk-portal.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
    xpGain: 400,
    instructions: [
      "Pour React Flour into the mixing bowl for portal frames.",
      "Enforce safety by adding TypeScript Pepper.",
      "Add PostgreSQL Salt for relational grade grids.",
      "Stir Firebase Syrup to rise user session controls.",
      "Decorate with sweet Figma Glaze assets."
    ]
  },
  {
    id: "araaz",
    name: "Araaz E-commerce",
    dishName: "Araaz Burger 🍔",
    emoji: "🍔",
    description: "A fully stacked, juicy responsive digital hamburger with multi-layered role authentication.",
    longDescription: "A high-performance full-stack e-commerce marketplace featuring robust state management, category filtering, a secure check-out workflow, and custom profile parameters.",
    ingredients: ["react", "css", "tailwind", "sql", "vercel"],
    features: [
      "Dynamic Shopping Cart & State Tracking",
      "Robust Admin Product Inventory dashboard",
      "Stripe secure check-out pipeline mockup"
    ],
    github: "https://github.com/nimrawani04/Araaz-Ecommerce",
    demo: "https://araaz-ecommerce.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=80",
    xpGain: 350,
    instructions: [
      "Toast buns made from React Flour.",
      "Butter patties with CSS Frosting layouts.",
      "Layer SQL Sauce for inventory database records.",
      "Sprinkle Tailwind Seasoning for responsive layout sizing.",
      "Plate using Vercel Powder for rapid cloud deployment."
    ]
  },
  {
    id: "smartattendance",
    name: "Smart Attendance System",
    dishName: "Attendance Sushi 🍣",
    emoji: "🍣",
    description: "A delicate, secure roll of biometric logs, class tracking, and instant role alerts.",
    longDescription: "A real-time administrative logs manager built to track student biometrics, schedule roll-calls, and trigger warning notifications to low-attendance students.",
    ingredients: ["react", "ts", "mongodb", "nodejs", "express"],
    features: [
      "Facial biometric parsing log integration",
      "Automatic PDF roll-sheet generator",
      "Twilio SMS warning warning notification system"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://cuk-portal.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&auto=format&fit=crop&q=80",
    xpGain: 380,
    instructions: [
      "Use React Flour to bind the rice base structure.",
      "Enforce student static records using TypeScript Pepper.",
      "Wrap with MongoDB Herbs seaweed for flexible document storage.",
      "Spice up the endpoint handlers with Node.js Spice.",
      "Rise server endpoints using Express.js Yeast."
    ]
  },
  {
    id: "aistudy",
    name: "AI Study Assistant",
    dishName: "AI Study Salad 🥗",
    emoji: "🥗",
    description: "A crisp, fresh salad containing semantic study guides, note cards, and document summarizers.",
    longDescription: "An intelligent visual study companion that parses long lecture transcripts, generates interactive flashcards, and answers context-specific exam queries.",
    ingredients: ["react", "ai", "framer", "vercel", "apis"],
    features: [
      "Smart transcript summarizer tool",
      "Interactive SVG flashcard practice game",
      "Vercel cloud static deployment pipeline"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://raasta-ai.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&auto=format&fit=crop&q=80",
    xpGain: 420,
    instructions: [
      "Toss React Flour greens as the base study helper.",
      "Pour AI Syrup dressing for parsing algorithms.",
      "Shake Framer Motion Sparkles for beautiful micro-animations.",
      "Garnish with APIs Syrup to connect study modules.",
      "Plate in Vercel Powder bowl."
    ]
  },
  {
    id: "iothome",
    name: "IoT Home System",
    dishName: "IoT Pizza 🍕",
    emoji: "🍕",
    description: "A highly connected, piping hot pizza monitoring sensor nodes and home appliances.",
    longDescription: "An embedded gateway web panel displaying telemetry logs from ESP8266 nodes, with remote relays toggled directly from the web client interface.",
    ingredients: ["python", "sql", "html", "css", "apis"],
    features: [
      "Real-time sensor telemetry logs dashboard",
      "Remote appliance relay toggle switches",
      "Database logs tracking utility system"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://araaz-ecommerce.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1558002038-1055907df827?w=600&auto=format&fit=crop&q=80",
    xpGain: 460,
    instructions: [
      "Roll out dough sweetened with HTML Sugar bases.",
      "Spread CSS Frosting cheese for interface overlays.",
      "Sprinkle Python Beans for hardware controller routines.",
      "Drizzle SQL Sauce to record telemetry timeseries logs.",
      "Connect nodes with APIs Syrup streams."
    ]
  },
  {
    id: "devops",
    name: "DevOps Dashboard & Monitoring",
    dishName: "DevOps Stew 🍲",
    emoji: "🍲",
    description: "A warm, robust stew tracking deployment latency, CPU logs, and pipeline containers.",
    longDescription: "A central administration monitoring console detailing continuous integration metrics, server latency, and cluster node states.",
    ingredients: ["ts", "docker", "postgres", "github", "vercel"],
    features: [
      "Live latency tracker graph arrays",
      "Dynamic cluster pod health alerts",
      "Automated continuous integration runners"
    ],
    github: "https://github.com/nimrawani04",
    demo: "https://bis-safety.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=600&auto=format&fit=crop&q=80",
    xpGain: 480,
    instructions: [
      "Heat Docker Oil in the stew pot to isolate servers.",
      "Season with PostgreSQL Salt for metrics databases.",
      "Stir TypeScript Pepper for static pipeline safety.",
      "Drop GitHub Seeds to trigger webhook integrations.",
      "Steam cook pipelines under Vercel Powder."
    ]
  }
];

const UTENSILS = [
  { id: "pot", name: "Boiling Pot", emoji: "🍲", mode: "boil" },
  { id: "pan", name: "Frying Pan", emoji: "🍳", mode: "fry" },
  { id: "saucepan", name: "Saucepan", emoji: "🫕", mode: "simmer" },
  { id: "mixer", name: "Mixer Bowl", emoji: "🥣", mode: "mix" },
  { id: "skillet", name: "Skillet", emoji: "🥘", mode: "sear" }
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
    // Fast high pitch clicks simulating shaking spices
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
    // Sizzling drops
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

  public startCookingLoop() {
    if (!this.ctx) return;
    this.stopCookingLoop();

    // Sizzling bubbling noise synth
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
    filter.frequency.setValueAtTime(2800, this.ctx.currentTime);
    filter.Q.setValueAtTime(0.8, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);

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
    const notes = [146.83, 185.00, 220.00, 293.66]; // D3, F#3, A3, D4 pentatonic chord loop
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
  
  // Stove & Compilation
  const [knobRotated, setKnobRotated] = useState(false);
  const [stoveOn, setStoveOn] = useState(false);
  const [cookProgress, setCookProgress] = useState(0);

  // Drag System States
  const [draggedIng, setDraggedIng] = useState<Ingredient | null>(null);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [isHoveringUtensil, setIsHoveringUtensil] = useState(false);
  const [isPouring, setIsPouring] = useState(false);

  // Particle systems
  const [droplets, setDroplets] = useState<Array<{ id: number; color: string; left: number }>>([]);
  const [sparks, setSparks] = useState<Array<{ id: number; emoji: string; dur: string }>>([]);

  // Utensil Contents Levels (Accumulative states)
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

    // Global cursor listener for drag-and-follow physics
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
    setTimeout(() => setToast(""), 2000);
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

  // 1. CHOOSE DISH RECIPE FROM TODAY'S MENU
  const handleSelectRecipe = (recipe: Recipe) => {
    playSFX("clink");
    setSelectedRecipe(recipe);
    setCookingState("recipe");
    setCollectedIngredients([]);
    setActiveUtensil(null);
    setWrongSelectionsCount(0);
    setKnobRotated(false);
    setStoveOn(false);
    setCookProgress(0);
    // Reset visual utensil levels
    setHasPowder(false);
    setHasFluid(false);
    setHasSprinkles(false);
    setHasAiGlow(false);
  };

  // 2. CHOOSE COOKWARE UTENSIL
  const handleSelectUtensil = (utensilId: string) => {
    playSFX("clink");
    setActiveUtensil(utensilId);
    triggerToast(`Cookware set: ${UTENSILS.find(u => u.id === utensilId)?.name} placed on preparation table!`);
  };

  // 3. TACTILE DRAG SYSTEM INGREDIENT PICKUP
  const handlePickupIngredient = (ing: Ingredient) => {
    if (!selectedRecipe) return;
    if (!activeUtensil) {
      triggerToast("⚠️ Place a cooking utensil from the bottom shelf first!");
      return;
    }
    playSFX("clink");
    setDraggedIng(ing);
    triggerToast(`Holding ${ing.name}. Move to center counter to pour!`);
  };

  // 4. MOUSE ENTER / LEAVE DETECTOR FOR PREPARATION COUNTER
  const handleCounterMouseEnter = () => {
    if (draggedIng) {
      setIsHoveringUtensil(true);
    }
  };

  const handleCounterMouseLeave = () => {
    setIsHoveringUtensil(false);
  };

  // 5. DROP/RELEASE TO POUR INGREDIENT VISUALLY
  const handlePourRelease = () => {
    if (!draggedIng || !selectedRecipe) return;

    if (!isHoveringUtensil) {
      // Released outside drop zone, put it back
      setDraggedIng(null);
      return;
    }

    // Trigger pouring animation
    setIsPouring(true);
    playSFX(draggedIng.soundType);

    // Populate visual pouring droplets
    const activeColor = draggedIng.color;
    const generatedDroplets = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      color: activeColor,
      left: 30 + Math.random() * 40
    }));
    setDroplets(generatedDroplets);

    // Clear droplets after animation completes
    setTimeout(() => {
      setDroplets([]);
      setIsPouring(false);
      
      // Complete selection verification
      const ingId = draggedIng.id;
      const isCorrect = selectedRecipe.ingredients.includes(ingId);
      
      // Update visual cookware levels based on ingredient categories
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
        setActiveFluidColor("#eab308"); // golden oil
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
          triggerToast(`⚠️ Warning! Wrong recipe component: added ${draggedIng.name}`);
        }
      }

      setDraggedIng(null);
      setIsHoveringUtensil(false);
    }, 600);
  };

  // 6. TURN STOVE KNOB
  const handleIgniteStove = () => {
    if (!selectedRecipe || !activeUtensil) return;
    const missing = selectedRecipe.ingredients.filter(ing => !collectedIngredients.includes(ing));
    if (missing.length > 0) {
      triggerToast("⚠️ Recipe unfinished! Add missing ingredients to the cookware first!");
      return;
    }

    playSFX("dial");
    setKnobRotated(true);
    setStoveOn(true);
    if (audioEngineRef.current) {
      audioEngineRef.current.startCookingLoop();
    }

    // Cook compilation ticks
    const interval = setInterval(() => {
      setCookProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          handleFinishCooking();
          return 100;
        }
        return prev + 4;
      });
    }, 150);
  };

  // 7. COMPILATION FINISHED
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

  // Calculate dynamics stars
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

      {/* Falling Rain backdrop */}
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
        <span>{musicOn ? "Synthesizer loop: On 🔊" : "Synthesizer loop: Off 🔇"}</span>
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
            <span>GAME 1 — Full-Stack Recipe Compiler</span>
          </div>
        </div>

        <div className="kg-hud-controls">
          <button className="kg-control-btn" onClick={onBack} title="Back to Selection Hub">
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
       * DRAGGED JAR FOLLOWING CURSOR
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
          <span className="text-[7px] font-black text-slate-400 mt-1 uppercase tracking-widest text-center max-w-[90%] truncate">
            {draggedIng.name}
          </span>
        </div>
      )}

      {/* -------------------------------------------------------------
       * SCREEN ROUTING
       * ------------------------------------------------------------- */}

      {/* STATE A: SELECTION MENU BOARD */}
      {cookingState === "menu" && (
        <div className="kg-menu-scene">
          <div className="kg-menu-board">
            <div className="kg-menu-header">
              <h2>TODAY'S MENU</h2>
              <p>Select a gourmet project dish below to review detailed technical stacks and follow instructions in the kitchen.</p>
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
              <h4>Skill Ingredients</h4>
              <p>Click an ingredient jar below to pick it up, then drag/drop it on the cookware counter</p>
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

          {/* COLUMN 2: CENTER COUNTER TABLE */}
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
                  Release / Click to Pour Ingredient 🍳
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
                      <div key={idx} className="mt-1">
                        {idx + 1}. {inst}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Page */}
                <div className="kg-page-right">
                  <span className="kg-recipe-ingredients-title">Stack Ingredients Required:</span>
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

              {/* Wooden Table surface */}
              <div className="kg-countertop">
                {activeUtensil ? (
                  <div className={`kg-placed-utensil ${stoveOn ? "cooking" : ""}`}>
                    <span className="kg-utensil-graphic">{getUtensilEmoji()}</span>
                    
                    {/* Visual Cookware level layers */}
                    <div className="kg-utensil-content-container">
                      {/* White Flour Level */}
                      <div className={`kg-powder-layer ${hasPowder ? "visible" : ""}`} />
                      
                      {/* Colored syrup/liquid level */}
                      <div 
                        className={`kg-fluid-layer ${hasFluid ? "visible" : ""}`} 
                        style={{ "--fluid-color": activeFluidColor } as any}
                      />

                      {/* Sprinkles on top */}
                      <div className={`kg-sprinkle-layer ${hasSprinkles ? "visible" : ""}`} />

                      {/* Holographic AI Glow */}
                      <div className={`kg-ai-layer-glow ${hasAiGlow ? "visible" : ""}`} />
                    </div>

                    {/* Steam rising particles */}
                    {stoveOn && (
                      <>
                        <div className="kg-steam-cloud" style={{ animationDelay: "0s", left: "25px" }} />
                        <div className="kg-steam-cloud" style={{ animationDelay: "0.6s", left: "55px" }} />
                        <div className="kg-steam-cloud" style={{ animationDelay: "1.2s", left: "85px" }} />
                      </>
                    )}

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
                  </div>
                ) : (
                  <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 bg-slate-950/80 p-5 rounded-xl border border-dashed border-slate-700/60 max-w-[80%] text-center">
                    🥣 SELECT A COOKING UTENSIL COOKWARE FROM THE BOTTOM SHELF TO BEGIN PREPARATION
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
                    className={`kg-utensil-rack-slot ${activeUtensil === utensil.id ? "selected" : ""}`}
                    onClick={() => handleSelectUtensil(utensil.id)}
                  >
                    <span className="kg-rack-icon">{utensil.emoji}</span>
                    <span className="kg-rack-label">{utensil.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* COLUMN 3: STOVE BURNING SLOT & POWER DIALS */}
          <div className="kg-stove-range">
            <div className="kg-stove-burners">
              {/* Burner 1: Active Cooking Slot */}
              <div className={`kg-burner-slot ${stoveOn ? "active" : ""}`}>
                <div className="kg-burner-ring" />
                
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

                {/* Status Indicator text overlay */}
                <div className="absolute top-4 font-black text-[8px] uppercase tracking-widest text-slate-500">
                  {stoveOn ? "Burner Active 🔥" : "Burner Ready"}
                </div>
              </div>

              {/* Burner 2: Showroom Slot */}
              <div className="kg-burner-slot">
                <div className="kg-burner-ring" />
                <div className="absolute top-4 font-black text-[8px] uppercase tracking-widest text-slate-600">
                  Burner Off
                </div>
              </div>
            </div>

            {/* Power Knobs rack */}
            <div className="kg-stove-controls-board">
              <div className="kg-stove-knobs-rack">
                
                {/* Knob 1: Power Knob */}
                <div className="kg-metallic-knob-container">
                  <div 
                    className="kg-metallic-knob"
                    style={{ transform: knobRotated ? "rotate(90deg)" : "rotate(0deg)" }}
                    onClick={handleIgniteStove}
                    title="Click to Turn/Ignite burner"
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

              {/* Compilation progress bar */}
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
