import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Volume2, VolumeX, Home, CheckCircle2, Star, ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "@/css/CookingGame.css";

// -------------------------------------------------------------
// 1. DATA DEFINITIONS & SCHEMAS (AUTHENTIC PORTFOLIO ONLY)
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
// 2. SYNTHESIZED WEB AUDIO ENGINE (LO-FI CAFE ATMOSPHERE)
// -------------------------------------------------------------

class KitchenAudio {
  private ctx: AudioContext | null = null;
  private sizzleNode: AudioScheduledSourceNode | null = null;
  private ventNode: OscillatorNode | null = null;
  private ambientCrackNode: AudioScheduledSourceNode | null = null;
  private rainNode: AudioScheduledSourceNode | null = null;
  private lofiBeatTimer: any = null;
  private cozyTimer: any = null;

  public init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Audio context not supported", e);
    }
  }

  public startAmbientLoop() {
    if (!this.ctx) return;
    this.stopAmbientLoop();

    // Incredibly soft, subconscious grounding sine hum to avoid any buzz or drone noise
    const vent = this.ctx.createOscillator();
    const ventGain = this.ctx.createGain();
    vent.type = "sine";
    vent.frequency.setValueAtTime(60, this.ctx.currentTime);
    ventGain.gain.setValueAtTime(0.0002, this.ctx.currentTime); // Reduced dramatically to be virtually silent and cozy
    vent.connect(ventGain);
    ventGain.connect(this.ctx.destination);
    vent.start();
    this.ventNode = vent;
  }

  public stopAmbientLoop() {
    if (this.ventNode) {
      try { this.ventNode.stop(); } catch (e) {}
      this.ventNode = null;
    }
  }

  public playDial() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
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
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.05);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(800, this.ctx.currentTime); // Soften the clink

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.2);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.2);
  }

  public playPowder() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(70, this.ctx.currentTime + 0.35);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(300, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  public playSauce() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = "sine";
    osc.frequency.setValueAtTime(280, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.25);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(500, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  public playSpice() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    for (let i = 0; i < 3; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(800 + i * 150, now + i * 0.05);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now + i * 0.05);

      gain.gain.setValueAtTime(0.02, now + i * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.05);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now + i * 0.05);
      osc.stop(now + i * 0.05 + 0.05);
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
    filter.frequency.setValueAtTime(2500, now);
    filter.Q.setValueAtTime(1.5, now);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, now);
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
    const filter = this.ctx.createBiquadFilter();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(110, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(180, this.ctx.currentTime + 0.25);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(250, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  public playChime() {
    if (!this.ctx) return;
    const time = this.ctx.currentTime;
    const frequencies = [392.00, 523.25, 659.25, 783.99, 1046.50]; // Lowered octave for warmth
    frequencies.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = "sine";
      osc.frequency.setValueAtTime(f, time + idx * 0.12);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(700, time + idx * 0.12);

      gain.gain.setValueAtTime(0.03, time + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.12 + 0.6);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time + idx * 0.12);
      osc.stop(time + idx * 0.12 + 0.6);
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
    
    const freq = intensity === "low" ? 1500 : intensity === "medium" ? 2200 : 3000;
    const volume = intensity === "low" ? 0.02 : intensity === "medium" ? 0.04 : 0.08;

    filter.frequency.setValueAtTime(freq, this.ctx.currentTime);
    filter.Q.setValueAtTime(intensity === "low" ? 1.8 : 1.2, this.ctx.currentTime);

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

    let currentStep = 0;

    // Beautiful, calm, lighthearted chord progression (maj9, add9, sus4 - very sweet and cozy)
    // 8-step sequence, played slowly (every 1800ms) for a extremely calm and peaceful vibe
    const progression = [
      // Step 0: Cmaj9 chord (C3 bass, E4 + G4 + B4 + D5 arpeggio)
      { bass: 130.81, treble: [329.63, 392.00, 493.88, 587.33] },
      // Step 1: E5 soft melody
      { bass: null, treble: [659.25] },
      
      // Step 2: Am9 chord (A2 bass, C4 + E4 + G4 + B4 arpeggio)
      { bass: 110.00, treble: [261.63, 329.63, 392.00, 493.88] },
      // Step 3: C5 soft melody
      { bass: null, treble: [523.25] },
      
      // Step 4: Fmaj9 chord (F2 bass, A3 + C4 + E4 + G4 arpeggio)
      { bass: 87.31, treble: [220.00, 261.63, 329.63, 392.00] },
      // Step 5: A4 soft melody
      { bass: null, treble: [440.00] },
      
      // Step 6: G11/Gsus4 chord (G2 bass, B3 + D4 + F4 + A4 arpeggio)
      { bass: 98.00, treble: [246.94, 293.66, 349.23, 440.00] },
      // Step 7: B4 soft melody
      { bass: null, treble: [493.88] }
    ];

    const playStep = () => {
      if (!this.ctx) return;
      
      if (this.ctx.state === "suspended") {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const current = progression[currentStep];

      // 1. Play warm acoustic marimba bass note with a very low-pass filter
      if (current.bass !== null) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();

        bassOsc.type = "triangle";
        bassOsc.frequency.setValueAtTime(current.bass, now);

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(120, now); // Warm, pillowy bass tone

        bassGain.gain.setValueAtTime(0.016, now);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        bassOsc.connect(filter);
        filter.connect(bassGain);
        bassGain.connect(this.ctx.destination);
        
        bassOsc.start(now);
        bassOsc.stop(now + 2.4);
      }

      // 2. Play cute, pure crystal music box chimes with a lowpass filter
      if (current.treble && current.treble.length > 0) {
        current.treble.forEach((freq, idx) => {
          if (!this.ctx) return;
          const chimeOsc = this.ctx.createOscillator();
          const chimeGain = this.ctx.createGain();
          const filter = this.ctx.createBiquadFilter();

          chimeOsc.type = "sine"; // Pure sine wave for sweet, round music-box tones

          // Strumming delay for chords
          const noteDelay = current.bass !== null ? idx * 0.08 : 0;
          const noteTime = now + noteDelay;

          chimeOsc.frequency.setValueAtTime(freq, noteTime);

          filter.type = "lowpass";
          filter.frequency.setValueAtTime(650, noteTime); // Filters out any metallic high whistle, keeping it very warm and round

          // Beautifully subtle volume levels for a peaceful cozy vibe
          const volume = current.bass !== null ? 0.0025 : 0.0035;
          chimeGain.gain.setValueAtTime(volume, noteTime);
          chimeGain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 2.2);

          chimeOsc.connect(filter);
          filter.connect(chimeGain);
          chimeGain.connect(this.ctx.destination);

          chimeOsc.start(noteTime);
          chimeOsc.stop(noteTime + 2.5);
        });
      }

      currentStep = (currentStep + 1) % progression.length;
      this.cozyTimer = setTimeout(playStep, 1800); // 1.8 seconds per step - incredibly relaxed, calm, and subtle pacing
    };

    playStep();
  }

  public stopCozyMusic() {
    if (this.cozyTimer) {
      clearTimeout(this.cozyTimer);
      this.cozyTimer = null;
    }
  }
}

// -------------------------------------------------------------
// 3. MAIN REACT COMPONENT
// -------------------------------------------------------------

export default function CookingGame({ onBack }: { onBack: () => void }) {
  const [introStep, setIntroStep] = useState<"black" | "hallway" | "ready">("black");
  const [cookingState, setCookingState] = useState<"menu" | "recipe" | "cooking" | "plated" | "showcase">("menu");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeUtensil, setActiveUtensil] = useState<string | null>(null);
  const [collectedIngredients, setCollectedIngredients] = useState<string[]>([]);
  const [wrongSelectionsCount, setWrongSelectionsCount] = useState(0);
  const [musicOn, setMusicOn] = useState(false);
  const [toast, setToast] = useState("");
  const [activePouringIngs, setActivePouringIngs] = useState<Array<{ id: number; emoji: string; x: number; y: number; color: string; type: string }>>([]);
  
  // Stove, Temperature & Compilation
  const [isStovePlaced, setIsStovePlaced] = useState(false); 
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
  const [droplets, setDroplets] = useState<Array<{ id: number; color: string; startX?: number; left?: number }>>([]);
  const [sparks, setSparks] = useState<Array<{ id: number; emoji: string; dur: string }>>([]);

  // Cookware Accumulative Visual Layers
  const [hasPowder, setHasPowder] = useState(false);
  const [hasFluid, setHasFluid] = useState(false);
  const [hasSprinkles, setHasSprinkles] = useState(false);
  const [hasAiGlow, setHasAiGlow] = useState(false);
  const [activeFluidColor, setActiveFluidColor] = useState("#ef4444");

  const audioEngineRef = useRef<KitchenAudio | null>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  const getContentsStyle = () => {
    if (activeUtensil === "pot") {
      return { width: "66px", height: "14px", bottom: "34px", borderRadius: "50%" };
    }
    if (activeUtensil === "saucepan") {
      return { width: "46px", height: "10px", bottom: "34px", borderRadius: "50%", transform: "translateX(10px)" };
    }
    if (activeUtensil === "pan") {
      return { width: "46px", height: "9px", bottom: "40px", borderRadius: "50%", transform: "translateX(13px)" };
    }
    if (activeUtensil === "skillet") {
      return { width: "56px", height: "12px", bottom: "38px", borderRadius: "50%", transform: "translateX(2px)" };
    }
    if (activeUtensil === "mixer") {
      return { width: "60px", height: "12px", bottom: "36px", borderRadius: "50%" };
    }
    return { width: "65px", height: "14px", bottom: "34px" };
  };

  // 1. Initialize sparkles & soundscapes
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

    // Trigger atmospheric audio loops immediately (Gesture satisfied via select click)
    if (audioEngineRef.current) {
      audioEngineRef.current.init();
      audioEngineRef.current.startAmbientLoop();
      audioEngineRef.current.startCozyMusic();
      setMusicOn(true);
    }

    // Progress cinematic intro steps
    const timer1 = setTimeout(() => {
      setIntroStep("hallway");
    }, 3500);

    const timer2 = setTimeout(() => {
      setIntroStep("ready");
    }, 7000);

    return () => {
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      clearTimeout(timer1);
      clearTimeout(timer2);
      if (audioEngineRef.current) {
        audioEngineRef.current.stopAmbientLoop();
        audioEngineRef.current.stopCozyMusic();
      }
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

  // SELECT DYNAMIC PORTFOLIO RECIPE
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

  // CHOOSE INITIAL COOKWARE UTENSIL
  const handleSelectUtensil = (utensilId: string) => {
    if (isStovePlaced) return;
    playSFX("clink");
    setActiveUtensil(utensilId);
    triggerToast(`${UTENSILS.find(u => u.id === utensilId)?.name} placed on preparation table!`);
  };

  // TACTILE JAR PICKUP
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

  // MOUSE HOVER EVENTS FOR PREP WORKSPACE
  const handleCounterMouseEnter = () => {
    if (draggedIng) {
      setIsHoveringUtensil(true);
    }
  };

  const handleCounterMouseLeave = () => {
    setIsHoveringUtensil(false);
  };

  // POUR RELEASE FOR DRAGGED INGREDIENTS
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

    // Spawn falling ingredient animation from current cursor coords to active utensil center!
    const utensilEl = document.querySelector(".kg-placed-utensil");
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight * 0.65;
    if (utensilEl) {
      const rect = utensilEl.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 3;
    }

    const newPouring = {
      id: Date.now(),
      emoji: draggedIng.emoji,
      x: mouseCoords.x,
      y: mouseCoords.y,
      color: draggedIng.color,
      type: draggedIng.soundType
    };
    setActivePouringIngs(prev => [...prev, newPouring]);

    // Trigger visual pouring droplets
    setIsPouring(true);
    playSFX(draggedIng.soundType);

    const activeColor = draggedIng.color;
    const generatedDroplets = Array.from({ length: 18 }).map((_, i) => ({
      id: Date.now() + i,
      color: activeColor,
      startX: (Math.random() - 0.5) * 60
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

  // INGREDIENTS COMPLETE - LIFT/FLOAT COOKWARE TO MOVE TO STOVE
  const handleStartUtensilTransfer = () => {
    if (!activeUtensil || isStovePlaced) return;
    if (!checkIsReadyToCook()) {
      triggerToast("⚠️ Add all required stack ingredients to the cookware first!");
      return;
    }
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

  // IGNITE STOVE & TEMPERATURE SPEED CONTROLLER
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

  // Dynamics star ratings (deducts 0.5 per wrong selection)
  const getDynamicStars = () => {
    const calculated = 5 - (wrongSelectionsCount * 0.5);
    return Math.max(1, calculated);
  };

  // Custom empty metallic utensil SVG drawer (starts completely empty, reflect lights naturally)
  const renderUtensilSVG = (utensilId: string, styleMode: "rack" | "island" | "stove") => {
    const isLarge = styleMode !== "rack";
    const size = isLarge ? 110 : 44;
    
    if (utensilId === "pot") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="kg-utensil-svg">
          <defs>
            <linearGradient id="silverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#94a3b8" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
            <linearGradient id="rimGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
          <rect x="5" y="42" width="12" height="6" rx="3" fill="#334155" />
          <rect x="83" y="42" width="12" height="6" rx="3" fill="#334155" />
          <path d="M15,35 L85,35 C85,35 83,75 50,75 C17,75 15,35 15,35 Z" fill="url(#silverGrad)" stroke="#334155" strokeWidth="2" />
          <path d="M48,37 L52,37 C52,37 51,73 50,73 C49,73 48,37 48,37 Z" fill="#ffffff" opacity="0.4" />
          <ellipse cx="50" cy="35" rx="35" ry="6" fill="url(#rimGrad)" stroke="#334155" strokeWidth="1.5" />
          <ellipse cx="50" cy="35" rx="33" ry="5.5" fill="#1e293b" />
        </svg>
      );
    }
    if (utensilId === "saucepan") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="kg-utensil-svg">
          <defs>
            <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c2410c" />
              <stop offset="50%" stopColor="#ea580c" />
              <stop offset="100%" stopColor="#7c2d12" />
            </linearGradient>
          </defs>
          <path d="M10,42 L42,42 L42,48 L10,48 Z" fill="#1e293b" stroke="#0f172a" strokeWidth="1" transform="rotate(-15 40 45)" />
          <path d="M35,38 L85,38 C85,38 83,70 60,70 C37,70 35,38 35,38 Z" fill="url(#copperGrad)" stroke="#7c2d12" strokeWidth="2" />
          <ellipse cx="60" cy="38" rx="25" ry="5" fill="#fdba74" stroke="#7c2d12" strokeWidth="1.5" />
          <ellipse cx="60" cy="38" rx="23" ry="4.5" fill="#2d130b" />
        </svg>
      );
    }
    if (utensilId === "pan") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="kg-utensil-svg">
          <defs>
            <linearGradient id="panGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="50%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>
          <path d="M5,42 L45,42 L45,47 L5,47 Z" fill="#0f172a" stroke="#000" strokeWidth="1.5" />
          <path d="M38,40 L88,40 C88,40 85,58 63,58 C41,58 38,40 38,40 Z" fill="url(#panGrad)" stroke="#1e293b" strokeWidth="2" />
          <ellipse cx="63" cy="40" rx="25" ry="4.5" fill="#64748b" stroke="#1e293b" strokeWidth="1.5" />
          <ellipse cx="63" cy="40" rx="23" ry="4" fill="#0f172a" />
        </svg>
      );
    }
    if (utensilId === "skillet") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="kg-utensil-svg">
          <defs>
            <linearGradient id="skilletGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
          </defs>
          <rect x="5" y="41" width="22" height="8" rx="4" fill="none" stroke="#0f172a" strokeWidth="3" />
          <path d="M22,38 L82,38 C82,38 80,68 52,68 C24,68 22,38 22,38 Z" fill="url(#skilletGrad)" stroke="#0f172a" strokeWidth="2" />
          <ellipse cx="52" cy="38" rx="30" ry="5.5" fill="#334155" stroke="#0f172a" strokeWidth="1.5" />
          <ellipse cx="52" cy="38" rx="28" ry="5" fill="#020617" />
        </svg>
      );
    }
    if (utensilId === "mixer") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="kg-utensil-svg">
          <defs>
            <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b91c1c" />
              <stop offset="50%" stopColor="#ef4444" />
              <stop offset="100%" stopColor="#7f1d1d" />
            </linearGradient>
          </defs>
          <path d="M18,34 L82,34 C82,34 78,72 50,72 C22,72 18,34 18,34 Z" fill="url(#bowlGrad)" stroke="#7f1d1d" strokeWidth="2" />
          <ellipse cx="50" cy="34" rx="32" ry="5.5" fill="#fca5a5" stroke="#7f1d1d" strokeWidth="1.5" />
          <ellipse cx="50" cy="34" rx="30" ry="5" fill="#fee2e2" />
        </svg>
      );
    }
    return null;
  };

  return (
    <div className="kg-viewport" onMouseUp={handlePourRelease}>
      {/* Rotate Device Warning Screen */}
      <div className="kg-rotate-device">
        <div className="kg-rotate-icon">📱</div>
        <h2>Rotate Your Device</h2>
        <p>
          This game is optimized for landscape mode for the best gameplay experience.
        </p>
      </div>

      <div className="kg-game-wrapper">
        <div className="kg-vignette" />

        {/* Falling Rain backdrop overlay */}
        <div className="kg-window-backdrop">
          <div className="kg-rain-overlay" />
          <div className="kg-rain-drops" />
        </div>

      {/* -------------------------------------------------------------
       * TACTILE FALLING INGREDIENT EMOJIS (MAGNETIC UTENSIL INTEGRATION)
       * ------------------------------------------------------------- */}
      <AnimatePresence>
        {activePouringIngs.map(p => {
          const utensilEl = document.querySelector(".kg-placed-utensil");
          let targetX = window.innerWidth / 2;
          let targetY = window.innerHeight * 0.65;
          if (utensilEl) {
            const rect = utensilEl.getBoundingClientRect();
            targetX = rect.left + rect.width / 2;
            targetY = rect.top + rect.height / 3;
          }
          return (
            <motion.div
              key={p.id}
              initial={{ 
                position: "fixed",
                left: p.x - 20, 
                top: p.y - 20, 
                scale: 1.1, 
                rotate: 0, 
                opacity: 1,
                zIndex: 9999,
                pointerEvents: "none"
              }}
              animate={{ 
                left: targetX - 16,
                top: targetY - 12,
                scale: [1.1, 0.8, 0.4],
                rotate: [0, -45, 20, -15],
                opacity: [1, 1, 0]
              }}
              transition={{ 
                duration: 0.58, 
                ease: "easeOut"
              }}
              onAnimationComplete={() => {
                setActivePouringIngs(prev => prev.filter(item => item.id !== p.id));
              }}
              className="text-2xl filter drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
            >
              {p.emoji}
            </motion.div>
          );
        })}
      </AnimatePresence>

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
       * CINEMATIC STAGED INTROS
       * ------------------------------------------------------------- */}
      {introStep === "black" && (
        <div className="kg-cinematic-intro-screen">
          <div className="kg-cinematic-intro-typography">
            <span className="text-4xl">🍳</span>
            <h1 className="kg-cinematic-title">Nimra’s Little Kitchen</h1>
            <p className="kg-cinematic-subtitle">GAME 1 — PORTFOLIO UNIVERSAL HUB</p>
            <div className="kg-cinematic-loading-dots">
              <span className="kg-loading-dot" style={{ animationDelay: "0s" }} />
              <span className="kg-loading-dot" style={{ animationDelay: "0.2s" }} />
              <span className="kg-loading-dot" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        </div>
      )}

      {introStep === "hallway" && (
        <div className="kg-hallway-backdrop-reveal">
          <div className="kg-hallway-shadows" />
          <div className="text-center font-bold tracking-widest text-violet-400 uppercase text-[9px] animate-pulse">
            🚶 walking into the cooking studio...
          </div>
        </div>
      )}

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
          {/* Live Stars indicator */}
          {selectedRecipe && (cookingState === "recipe" || cookingState === "cooking") && (
            <div className="kg-hud-live-stars flex items-center gap-1 bg-slate-950/60 border border-amber-500/20 px-2.5 py-1.5 rounded-xl">
              {Array.from({ length: 5 }).map((_, idx) => {
                const earned = getDynamicStars();
                const isActive = idx < Math.floor(earned);
                return (
                  <span key={idx} className="text-[10px] tracking-tight leading-none" style={{ color: isActive ? "#fbbf24" : "#334155", textShadow: isActive ? "0 0 8px rgba(251, 191, 36, 0.5)" : "none" }}>
                    ★
                  </span>
                );
              })}
            </div>
          )}

          {/* Compact glass equalizer Music Toggle */}
          <button 
            className={`kg-hud-music-pill ${musicOn ? "active" : ""}`}
            onClick={toggleSound}
            title={musicOn ? "Mute Cafe Mix" : "Play Cafe Mix"}
          >
            <div className="kg-hud-equalizer">
              <span className={`kg-eq-bar ${musicOn ? "animating" : ""}`} style={{ "--h": "6px", "--d": "0.1s" } as any} />
              <span className={`kg-eq-bar ${musicOn ? "animating" : ""}`} style={{ "--h": "11px", "--d": "0.3s" } as any} />
              <span className={`kg-eq-bar ${musicOn ? "animating" : ""}`} style={{ "--h": "5px", "--d": "0.2s" } as any} />
            </div>
            <span>{musicOn ? "Music: ON" : "Music: OFF"}</span>
          </button>

          <button className="kg-control-btn" onClick={onBack} title="Back to Selection Hub">
            <Home className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* -------------------------------------------------------------
       * TACTILE FLOATING/DRAGGED JAR FOLLOWING CURSOR
       * ------------------------------------------------------------- */}
       {draggedIng && (() => {
        const isWrongHovered = selectedRecipe && !selectedRecipe.ingredients.includes(draggedIng.id) && isHoveringUtensil;
        return (
          <div 
            className={`kg-dragged-active-jar ${isPouring ? "pouring" : ""} ${isWrongHovered ? "wrong-shake" : ""}`}
            style={{
              left: mouseCoords.x - 30,
              top: mouseCoords.y - 35,
              "--jar-glow": isWrongHovered ? "#ef4444" : draggedIng.color
            } as any}
          >
            <span className="text-3xl">{draggedIng.emoji}</span>
            <span className="text-[7.5px] font-black text-slate-400 mt-1 uppercase tracking-widest text-center max-w-[90%] truncate">
              {draggedIng.name}
            </span>
          </div>
        );
      })()}

      {/* -------------------------------------------------------------
       * TACTILE FLOATING/DRAGGED COOKWARE UTENSIL
       * ------------------------------------------------------------- */}
      {isTransferringUtensil && activeUtensil && (
        <div 
          className="kg-placed-utensil floating-transfer animate-pulse"
          style={{
            left: mouseCoords.x - 70,
            top: mouseCoords.y - 65
          }}
        >
          <div className="kg-utensil-svg-container">
            {renderUtensilSVG(activeUtensil, "island")}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
       * SCREEN ROUTING
       * ------------------------------------------------------------- */}

      {/* STATE A: SELECTION MENU BOARD - TODAY'S MENU */}
      {cookingState === "menu" && introStep === "ready" && (
        <div className="kg-menu-scene">
          <div className="kg-menu-board">
            <div className="kg-menu-header">
              <h2>🍴 TODAY’S MENU</h2>
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
      {(cookingState === "recipe" || cookingState === "cooking") && selectedRecipe && introStep === "ready" && (
        <div className="kg-workspace">
          
          {/* COLUMN 1: SKILL INGREDIENTS CABINET */}
          <div className="kg-ingredients-cabinet">
            <div className="kg-cabinet-header">
              <h4>Cabinet Ingredients</h4>
              <p style={{ opacity: 0.65, fontSize: "7.5px", marginTop: "4px", lineHeight: "1.3" }}>
                Click a jar to hold it, then release over cookware to pour.
              </p>
            </div>

            <div className="kg-shelves-container">
              {/* Frontend Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Frontend Flour & Base</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "frontend").map(ing => {
                    const isCompatible = selectedRecipe?.ingredients.includes(ing.id);
                    return (
                      <div 
                        key={ing.id}
                        className={`kg-ingredient-jar ${isCompatible ? "compatible-glow" : "incompatible-dim"}`}
                        style={{ "--jar-glow": ing.color } as any}
                        onClick={() => handlePickupIngredient(ing)}
                        title={`Click to pick up ${ing.name}`}
                      >
                        <span className="kg-jar-icon">{ing.emoji}</span>
                        <span className="kg-jar-label">{ing.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Backend Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Backend Spices & Logic</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "backend").map(ing => {
                    const isCompatible = selectedRecipe?.ingredients.includes(ing.id);
                    return (
                      <div 
                        key={ing.id}
                        className={`kg-ingredient-jar ${isCompatible ? "compatible-glow" : "incompatible-dim"}`}
                        style={{ "--jar-glow": ing.color } as any}
                        onClick={() => handlePickupIngredient(ing)}
                        title={`Click to pick up ${ing.name}`}
                      >
                        <span className="kg-jar-icon">{ing.emoji}</span>
                        <span className="kg-jar-label">{ing.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Database Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Database Salts & Syrups</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "database").map(ing => {
                    const isCompatible = selectedRecipe?.ingredients.includes(ing.id);
                    return (
                      <div 
                        key={ing.id}
                        className={`kg-ingredient-jar ${isCompatible ? "compatible-glow" : "incompatible-dim"}`}
                        style={{ "--jar-glow": ing.color } as any}
                        onClick={() => handlePickupIngredient(ing)}
                        title={`Click to pick up ${ing.name}`}
                      >
                        <span className="kg-jar-icon">{ing.emoji}</span>
                        <span className="kg-jar-label">{ing.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tools Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Hosting & DevOps Oils</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "tool").map(ing => {
                    const isCompatible = selectedRecipe?.ingredients.includes(ing.id);
                    return (
                      <div 
                        key={ing.id}
                        className={`kg-ingredient-jar ${isCompatible ? "compatible-glow" : "incompatible-dim"}`}
                        style={{ "--jar-glow": ing.color } as any}
                        onClick={() => handlePickupIngredient(ing)}
                        title={`Click to pick up ${ing.name}`}
                      >
                        <span className="kg-jar-icon">{ing.emoji}</span>
                        <span className="kg-jar-label">{ing.name}</span>
                      </div>
                    );
                  })}
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
                {/* Active drop highlighted radius around utensil while dragging */}
                {draggedIng && activeUtensil && !isStovePlaced && (
                  <div className="kg-utensil-glow-radius animate-pulse">
                    <span className="kg-glow-radius-text">DROP HERE</span>
                  </div>
                )}
                {activeUtensil && !isStovePlaced ? (
                  <div 
                    className={`kg-placed-utensil ${isTransferringUtensil ? "opacity-30" : ""}`}
                    onClick={handleStartUtensilTransfer}
                    title="Click to lift and drag to stove burner"
                  >
                    <div className="kg-utensil-svg-container">
                      {renderUtensilSVG(activeUtensil, "island")}
                    </div>
                    
                    {/* Visual Cookware level layers */}
                    <div className="kg-utensil-content-container">
                      <div className={`kg-powder-layer ${hasPowder ? "visible" : ""}`} style={getContentsStyle()} />
                      <div 
                        className={`kg-fluid-layer ${hasFluid ? "visible" : ""}`} 
                        style={{ ...getContentsStyle(), "--fluid-color": activeFluidColor } as any}
                      />
                      <div className={`kg-sprinkle-layer ${hasSprinkles ? "visible" : ""}`} style={getContentsStyle()} />
                      <div className={`kg-ai-layer-glow ${hasAiGlow ? "visible" : ""}`} style={{ ...getContentsStyle(), borderRadius: "50%" }} />
                    </div>

                    {/* Active Droplet streams falling when pouring */}
                    {isPouring && droplets.map(d => (
                      <div 
                        key={d.id} 
                        className="kg-pour-droplet"
                        style={{
                          left: `50%`,
                          "--start-x": `${(d as any).startX}px`,
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
                    <div className="kg-rack-svg-container">
                      {renderUtensilSVG(utensil.id, "rack")}
                    </div>
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
                    <div className="kg-utensil-svg-container">
                      {renderUtensilSVG(activeUtensil, "stove")}
                    </div>
                    
                    {/* Visual Cookware level layers */}
                    <div className="kg-utensil-content-container">
                      <div className={`kg-powder-layer ${hasPowder ? "visible" : ""}`} style={getContentsStyle()} />
                      <div 
                        className={`kg-fluid-layer ${hasFluid ? "visible" : ""}`} 
                        style={{ ...getContentsStyle(), "--fluid-color": activeFluidColor } as any}
                      />
                      <div className={`kg-sprinkle-layer ${hasSprinkles ? "visible" : ""}`} style={getContentsStyle()} />
                      <div className={`kg-ai-layer-glow ${hasAiGlow ? "visible" : ""}`} style={{ ...getContentsStyle(), borderRadius: "50%" }} />
                    </div>

                    {/* Floating circular compilation status overlay */}
                    {stoveOn && (
                      <div className="kg-stove-compilation-ring">
                        <div className="kg-ring-spinner" />
                        <span className="kg-ring-percent">{cookProgress}%</span>
                      </div>
                    )}
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
      {cookingState === "plated" && selectedRecipe && introStep === "ready" && (
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
                Your recipe compiled! There were {wrongSelectionsCount} incorrect technical components added, but your chef resilience plated it beautifully anyway! (Deducted 0.5 stars per mistake).
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
      {cookingState === "showcase" && selectedRecipe && introStep === "ready" && (
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
    </div>
  );
}
