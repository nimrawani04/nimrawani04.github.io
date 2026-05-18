import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Volume2, VolumeX, Home, CheckCircle2, Star, ArrowRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import "@/css/CookingGame.css";

// -------------------------------------------------------------
// 1. DATA DEFINITIONS
// -------------------------------------------------------------

interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: "frontend" | "backend" | "database" | "tool";
  color: string;
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
}

const INGREDIENTS: Ingredient[] = [
  // Frontend
  { id: "react", name: "React Flour", emoji: "🌾", category: "frontend", color: "#61dafb" },
  { id: "html", name: "HTML Sugar", emoji: "🍬", category: "frontend", color: "#e34f26" },
  { id: "css", name: "CSS Frosting", emoji: "🧁", category: "frontend", color: "#1572b6" },
  { id: "js", name: "JavaScript Sugar", emoji: "🍯", category: "frontend", color: "#f7df1e" },
  { id: "ts", name: "TypeScript Pepper", emoji: "🌶️", category: "frontend", color: "#3178c6" },
  { id: "nextjs", name: "Next.js Yeast", emoji: "🍞", category: "frontend", color: "#ffffff" },
  { id: "tailwind", name: "Tailwind Seasoning", emoji: "🧂", category: "frontend", color: "#06b6d4" },
  // Backend Logic
  { id: "nodejs", name: "Node.js Spice", emoji: "🍂", category: "backend", color: "#339933" },
  { id: "express", name: "Express.js Yeast", emoji: "🥖", category: "backend", color: "#808080" },
  { id: "python", name: "Python Beans", emoji: "🫘", category: "backend", color: "#3776ab" },
  { id: "ai", name: "AI Syrup", emoji: "🔮", category: "backend", color: "#8b5cf6" },
  { id: "apis", name: "APIs Syrup", emoji: "🍯", category: "backend", color: "#f97316" },
  // Databases
  { id: "mongodb", name: "MongoDB Herbs", emoji: "🌿", category: "database", color: "#47a248" },
  { id: "postgres", name: "PostgreSQL Salt", emoji: "🧂", category: "database", color: "#4169e1" },
  { id: "sql", name: "SQL Sauce", emoji: "🍾", category: "database", color: "#00758f" },
  { id: "firebase", name: "Firebase Syrup", emoji: "🍯", category: "database", color: "#ffca28" },
  // Tools
  { id: "docker", name: "Docker Oil", emoji: "🛢️", category: "tool", color: "#2496ed" },
  { id: "vercel", name: "Vercel Powder", emoji: "🧁", category: "tool", color: "#ffffff" },
  { id: "github", name: "GitHub Seeds", emoji: "🌱", category: "tool", color: "#181717" },
  { id: "figma", name: "Figma Glaze", emoji: "🎨", category: "tool", color: "#f24e1e" },
  { id: "framer", name: "Framer Motion Sparkles", emoji: "✨", category: "tool", color: "#ea580c" },
  { id: "threejs", name: "Three.js Glitz", emoji: "🧪", category: "tool", color: "#049ef4" },
];

const RECIPES: Recipe[] = [
  {
    id: "araaz",
    name: "Araaz E-commerce",
    dishName: "Araaz Burger 🍔",
    emoji: "🍔",
    description: "A fully stacked, juicy responsive digital hamburger with multi-layered role authentication.",
    longDescription: "A high-performance full-stack e-commerce marketplace featuring robust state management, category filtering, a secure check-out workflow, and customizable user profile parameters.",
    ingredients: ["react", "css", "tailwind", "sql", "vercel"],
    features: [
      "Dynamic Shopping Cart & State Tracking",
      "Robust Admin Product Inventory dashboard",
      "Stripe secure check-out pipeline mockup"
    ],
    github: "https://github.com/nimrawani04/Araaz-Ecommerce",
    demo: "https://araaz-ecommerce.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=80",
    xpGain: 350
  },
  {
    id: "raasta",
    name: "Raasta AI Platform",
    dishName: "Raasta Crop Ramen 🍜",
    emoji: "🍜",
    description: "A rich, comforting bowl of deep-learning crop analysis and AI-guided assistant.",
    longDescription: "An advanced multi-domain platform utilizing cognitive AI, structured prompts, crop disease detection models, and custom summarizers tailored to simplify documentation tasks.",
    ingredients: ["python", "ai", "react", "apis", "tailwind"],
    features: [
      "Image processing crop health engine",
      "AI semantic chat bot guidance model",
      "Multi-document offline summarizer pipeline"
    ],
    github: "https://github.com/nimrawani04/Raasta",
    demo: "https://raasta-ai.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80",
    xpGain: 450
  },
  {
    id: "portal",
    name: "Academic Portal System",
    dishName: "Portal Dashboard Cake 🍰",
    emoji: "🍰",
    description: "A decadent, multi-tiered security dashboard cake with sweet roles and automated credentials.",
    longDescription: "The central operations hub for the Central University of Kashmir (CUK). Automates result publication, semester registrations, roll-sheet generations, and grading charts with zero human overhead.",
    ingredients: ["react", "ts", "postgres", "firebase", "figma"],
    features: [
      "Student registration & grading matrix",
      "Faculty examination generation board",
      "Role-based secure portal guards"
    ],
    github: "https://github.com/nimrawani04/CUK-Portal",
    demo: "https://cuk-portal.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=600&auto=format&fit=crop&q=80",
    xpGain: 400
  },
  {
    id: "bisai",
    name: "BIS AI Product Safety Assistant",
    dishName: "BIS Safety Soup 🍲",
    emoji: "🍲",
    description: "An intelligent, warm offline-ready PWA soup that automatically filters product safety.",
    longDescription: "A mission-critical compliance system using retrieval-augmented generation (RAG). Allows inspectors to verify product safety standards instantly using semantic lookup engines.",
    ingredients: ["react", "ai", "apis", "figma", "docker"],
    features: [
      "Real-time RAG compliance vector index",
      "Offline inspection progressive storage PWA",
      "Compliance report audit builder"
    ],
    github: "https://github.com/nimrawani04/BIS-AI-Assistant",
    demo: "https://bis-safety.vercel.app/",
    screenshot: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
    xpGain: 500
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
  private rainNode: AudioWorkletNode | ScriptProcessorNode | null = null;
  private sizzleNode: OscillatorNode | AudioWorkletNode | ScriptProcessorNode | null = null;
  private loopOsc: OscillatorNode | null = null;

  constructor() {
    // Lazy loaded on first user interaction
  }

  public init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (e) {
      console.warn("Web Audio API not supported", e);
    }
  }

  public playClick() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  public playDial() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(50, this.ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  public playSplash() {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.15);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.15);
  }

  public playChime() {
    if (!this.ctx) return;
    const time = this.ctx.currentTime;
    const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    frequencies.forEach((f, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(f, time + idx * 0.12);
      gain.gain.setValueAtTime(0.06, time + idx * 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, time + idx * 0.12 + 0.4);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(time + idx * 0.12);
      osc.stop(time + idx * 0.12 + 0.4);
    });
  }

  public startCookingAmbience() {
    if (!this.ctx) return;
    this.stopCookingAmbience();

    // Sizzle Synthesizer (White Noise filtered)
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
    filter.frequency.setValueAtTime(2500, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.0, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    this.sizzleNode = noise as any;
  }

  public stopCookingAmbience() {
    if (this.sizzleNode) {
      try {
        (this.sizzleNode as any).stop();
      } catch (e) {}
      this.sizzleNode = null;
    }
  }

  public startCozyMusic() {
    if (!this.ctx) return;
    this.stopCozyMusic();

    // Soft pentatonic background chord loop
    const time = this.ctx.currentTime;
    const notes = [130.81, 164.81, 196.00, 220.00]; // C3, E3, G3, A3
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
  const [started, setStarted] = useState(false);
  const [gateOpen, setGateOpen] = useState(true);
  const [musicOn, setMusicOn] = useState(false);
  const [toast, setToast] = useState("");
  
  // Game States
  const [cookingState, setCookingState] = useState<"menu" | "recipe" | "cooking" | "plated" | "showcase">("menu");
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [activeUtensil, setActiveUtensil] = useState<string | null>(null);
  const [collectedIngredients, setCollectedIngredients] = useState<string[]>([]);
  const [wrongSelectionsCount, setWrongSelectionsCount] = useState(0);
  const [stoveOn, setStoveOn] = useState(false);
  const [knobRotated, setKnobRotated] = useState(false);
  const [cookProgress, setCookProgress] = useState(0);
  
  // Particle Systems
  const [puffs, setPuffs] = useState<Array<{ id: number; x: number; y: number; tx: string; ty: string; color: string }>>([]);
  const [sparks, setSparks] = useState<Array<{ id: number; emoji: string; dur: string }>>([]);
  
  // Audio Engine ref
  const audioEngineRef = useRef<KitchenAudio | null>(null);

  // Initialize Audio
  useEffect(() => {
    audioEngineRef.current = new KitchenAudio();
    // Sparkle generator for plated dish
    const sparkleEmojis = ["✨", "🌟", "⭐", "💫", "✨"];
    const activeSparks = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      emoji: sparkleEmojis[i % sparkleEmojis.length],
      dur: `${1.5 + Math.random() * 2}s`
    }));
    setSparks(activeSparks);
  }, []);

  const triggerToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const playSFX = (type: "click" | "dial" | "splash" | "chime") => {
    if (!audioEngineRef.current) return;
    audioEngineRef.current.init();
    if (type === "click") audioEngineRef.current.playClick();
    if (type === "dial") audioEngineRef.current.playDial();
    if (type === "splash") audioEngineRef.current.playSplash();
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

  // 1. SELECT RECIPE DISH
  const selectRecipe = (recipe: Recipe) => {
    playSFX("click");
    setSelectedRecipe(recipe);
    setGateOpen(false);
    setTimeout(() => {
      setCookingState("recipe");
      setGateOpen(true);
      setCollectedIngredients([]);
      setActiveUtensil(null);
      setWrongSelectionsCount(0);
      setKnobRotated(false);
      setStoveOn(false);
      setCookProgress(0);
    }, 1600);
  };

  // 2. CHOOSE UTENSIL
  const handleSelectUtensil = (utensilId: string) => {
    playSFX("click");
    setActiveUtensil(utensilId);
    triggerToast(`Cookware set: ${UTENSILS.find(u => u.id === utensilId)?.name} placed!`);
  };

  // 3. COLLECT INGREDIENT FROM CABINET
  const handleCollectIngredient = (ingId: string, event: React.MouseEvent) => {
    if (!selectedRecipe) return;
    if (!activeUtensil) {
      triggerToast("⚠️ Place a cooking utensil on the counter first!");
      return;
    }
    if (collectedIngredients.includes(ingId)) {
      triggerToast("Ingredient already gathered inside cookware.");
      return;
    }

    // Trigger Puff Particles from cabinet jar to center counter
    const rect = event.currentTarget.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    
    // Spawn 8 puffs flying towards cooking utensil area
    const newPuffs = Array.from({ length: 8 }).map((_, i) => ({
      id: Date.now() + i,
      x: startX,
      y: startY,
      tx: `${(Math.random() - 0.5) * 160}px`,
      ty: `${-100 - Math.random() * 150}px`,
      color: INGREDIENTS.find(ing => ing.id === ingId)?.color || "#10b981"
    }));
    setPuffs(prev => [...prev, ...newPuffs]);
    setTimeout(() => {
      setPuffs(prev => prev.filter(p => !newPuffs.find(np => np.id === p.id)));
    }, 700);

    playSFX("splash");

    const isCorrect = selectedRecipe.ingredients.includes(ingId);
    if (isCorrect) {
      setCollectedIngredients(prev => [...prev, ingId]);
      triggerToast(`Added ${INGREDIENTS.find(ing => ing.id === ingId)?.name}!`);
    } else {
      // Deduct star rating count
      setWrongSelectionsCount(prev => prev + 1);
      setCollectedIngredients(prev => [...prev, ingId]);
      triggerToast(`⚠️ Wrong choice! Added ${INGREDIENTS.find(ing => ing.id === ingId)?.name} anyway...`);
    }
  };

  // 4. IGNITE STOVE KNOB
  const handleIgniteStove = () => {
    if (!selectedRecipe || !activeUtensil) return;
    const missingIngs = selectedRecipe.ingredients.filter(ing => !collectedIngredients.includes(ing));
    if (missingIngs.length > 0) {
      triggerToast("⚠️ Follow instructions! Missing recipe ingredients inside the cookware!");
      return;
    }

    playSFX("dial");
    setKnobRotated(true);
    setStoveOn(true);
    if (audioEngineRef.current) {
      audioEngineRef.current.startCookingAmbience();
    }

    // Start cooking progress simulation
    const interval = setInterval(() => {
      setCookProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          handleFinishCooking();
          return 100;
        }
        return prev + 5;
      });
    }, 150);
  };

  // 5. FINISH COOKING & PLATE
  const handleFinishCooking = () => {
    if (audioEngineRef.current) {
      audioEngineRef.current.stopCookingAmbience();
    }
    playSFX("chime");
    setCookingState("plated");
  };

  // 6. OPEN SHOWCASE SCREEN
  const handleExploreProject = () => {
    playSFX("click");
    setCookingState("showcase");
  };

  // Calculate Star Rating dynamically
  const getEarnedStars = () => {
    const totalStars = 5 - (wrongSelectionsCount * 0.5);
    return Math.max(1, totalStars);
  };

  const getUtensilEmoji = () => {
    return UTENSILS.find(u => u.id === activeUtensil)?.emoji || "🍳";
  };

  return (
    <div className="kg-viewport">
      <div className="kg-vignette" />
      <div className="kg-stars" />

      {/* Atmospheric Window Background with animated rain */}
      <div className="kg-window-backdrop">
        <div className="kg-rain-overlay" />
        <div className="kg-rain-drops" />
      </div>

      {/* Soundscape pill HUD */}
      <div className="kg-soundscape-pill" onClick={toggleSound}>
        <div className="kg-sound-waves">
          <span className="kg-wave-bar" style={{ "--dur": "0.6s" } as any} />
          <span className="kg-wave-bar" style={{ "--dur": "0.9s" } as any} />
          <span className="kg-wave-bar" style={{ "--dur": "0.5s" } as any} />
          <span className="kg-wave-bar" style={{ "--dur": "0.8s" } as any} />
        </div>
        <span>{musicOn ? "Music Ambient On 🔊" : "Music Ambient Off 🔇"}</span>
      </div>

      {/* -------------------------------------------------------------
       * HUD TOP HEADER BAR
       * ------------------------------------------------------------- */}
      <div className="kg-hud-header">
        <div className="kg-hud-title">
          <div className="kg-hud-logo">
            <Gamepad2 className="w-5 h-5" />
          </div>
          <div className="kg-hud-title-text">
            <h3>NIMRA'S KITCHEN</h3>
            <span>GAME 1 — Full-Stack Recipe Simulator</span>
          </div>
        </div>

        <div className="kg-hud-controls">
          <button className="kg-control-btn" onClick={onBack} title="Back to Selection Hub">
            <Home className="w-5 h-5" />
          </button>
        </div>
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
            className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-slate-950/90 border border-emerald-500/30 text-emerald-400 font-semibold px-4 py-2 rounded-lg text-xs tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.2)] z-50 flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------------------------------------------
       * FLYING INGREDIENT PUFF PARTICLES
       * ------------------------------------------------------------- */}
      {puffs.map(p => (
        <div
          key={p.id}
          className="kg-particle-puff"
          style={{
            left: p.x,
            top: p.y,
            "--tx": p.tx,
            "--ty": p.ty,
            "--p-color": p.color
          } as any}
        />
      ))}

      {/* -------------------------------------------------------------
       * MAIN SCREEN ROUTER
       * ------------------------------------------------------------- */}

      {/* STATE A: SELECTION MENU BOARD */}
      {cookingState === "menu" && (
        <div className="kg-menu-scene">
          <div className="kg-menu-board">
            <div className="kg-menu-header">
              <h2>CHOOSE A DISH RECIPE</h2>
              <p>Prepare gourmet development dishes to explore featured repositories, earn Chef XP, and test your stack recipes.</p>
            </div>

            <div className="kg-recipe-cards-grid">
              {RECIPES.map(recipe => (
                <div 
                  key={recipe.id} 
                  className="kg-recipe-card"
                  onClick={() => selectRecipe(recipe)}
                >
                  <div className="kg-card-thumbnail-container">
                    <span className="kg-card-thumbnail-display">{recipe.emoji}</span>
                  </div>
                  <div>
                    <h3>{recipe.dishName}</h3>
                    <p>{recipe.description}</p>
                  </div>
                  <button className="kg-card-select-btn">
                    COOK DISH 🍳
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STATE B: ACTIVE WORKSPACE (STOVE, CABINET, COOKBOOK) */}
      {(cookingState === "recipe" || cookingState === "cooking") && selectedRecipe && (
        <div className="kg-workspace">
          
          {/* COLUMN 1: INGREDIENT CABINET */}
          <div className="kg-ingredients-cabinet">
            <div className="kg-cabinet-header">
              <h4>Skill Ingredients</h4>
              <p>Gather technologies below to populate your active recipe cookware bowl</p>
            </div>

            <div className="kg-shelves-container">
              {/* Frontend Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Frontend Flour & Seasoning</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "frontend").map(ing => (
                    <div 
                      key={ing.id} 
                      className="kg-ingredient-jar"
                      style={{ "--jar-glow": ing.color } as any}
                      onClick={(e) => handleCollectIngredient(ing.id, e)}
                      title={ing.name}
                    >
                      <span className="kg-jar-icon">{ing.emoji}</span>
                      <span className="kg-jar-label">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Backend Spices & Yeasts</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "backend").map(ing => (
                    <div 
                      key={ing.id} 
                      className="kg-ingredient-jar"
                      style={{ "--jar-glow": ing.color } as any}
                      onClick={(e) => handleCollectIngredient(ing.id, e)}
                      title={ing.name}
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
                      onClick={(e) => handleCollectIngredient(ing.id, e)}
                      title={ing.name}
                    >
                      <span className="kg-jar-icon">{ing.emoji}</span>
                      <span className="kg-jar-label">{ing.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tools Shelf */}
              <div className="kg-shelf-row">
                <span className="kg-shelf-title">Hosting & Animation Oils</span>
                <div className="kg-shelf-wood">
                  {INGREDIENTS.filter(i => i.category === "tool").map(ing => (
                    <div 
                      key={ing.id} 
                      className="kg-ingredient-jar"
                      style={{ "--jar-glow": ing.color } as any}
                      onClick={(e) => handleCollectIngredient(ing.id, e)}
                      title={ing.name}
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
            <div className="kg-island-main">
              
              {/* Cookbook overlay */}
              <div className="kg-leather-cookbook">
                <div className="kg-cookbook-spine" />
                
                {/* Left Page */}
                <div className="kg-page-left">
                  <span className="kg-recipe-title">{selectedRecipe.dishName}</span>
                  <p className="kg-recipe-desc">{selectedRecipe.longDescription}</p>
                  
                  <div className="kg-recipe-instructions">
                    Instructions:<br/>
                    1. Choose a proper cookware from the shelf below.<br/>
                    2. Add required ingredients from the cabinet shelves.<br/>
                    3. Turn on the stove knob burner to start cooking.
                  </div>
                </div>

                {/* Right Page */}
                <div className="kg-page-right">
                  <span className="kg-recipe-ingredients-title">Recipe Ingredients:</span>
                  <div className="kg-ingredients-checklist">
                    {selectedRecipe.ingredients.map(ingId => {
                      const ingDetail = INGREDIENTS.find(ing => ing.id === ingId);
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

                  {/* Wrong additions warning tracker */}
                  {wrongSelectionsCount > 0 && (
                    <div className="mt-4 text-[8px] font-bold text-red-500 uppercase tracking-wider">
                      ⚠️ Accuracy Alert: {wrongSelectionsCount} incorrect ingredients added. Star rating adjusted.
                    </div>
                  )}
                </div>
              </div>

              {/* Wooden Countertop */}
              <div className="kg-countertop">
                {activeUtensil ? (
                  <div className="kg-placed-utensil">
                    <span className="kg-utensil-graphic">{getUtensilEmoji()}</span>
                    
                    {/* Steam Particle generator if stove is on */}
                    {stoveOn && (
                      <>
                        <div className="kg-steam-cloud" style={{ animationDelay: "0s", left: "30px" }} />
                        <div className="kg-steam-cloud" style={{ animationDelay: "0.5s", left: "55px" }} />
                        <div className="kg-steam-cloud" style={{ animationDelay: "1s", left: "80px" }} />
                      </>
                    )}

                    {/* Simmering liquid splash overlay */}
                    {collectedIngredients.length > 0 && (
                      <div 
                        className="kg-liquid-splash"
                        style={{ 
                          "--splash-color": INGREDIENTS.find(i => i.id === collectedIngredients[collectedIngredients.length - 1])?.color 
                        } as any}
                      />
                    )}

                    <div className="kg-cooker-counter">
                      Cookware Active ({collectedIngredients.length} ingredients)
                    </div>
                  </div>
                ) : (
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/60 p-4 rounded border border-dashed border-slate-700">
                    🍳 SELECT COOKWARE UTENSIL BELOW TO BEGIN RECIPE PREPARATION
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Cookware Utensil selector shelf */}
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

          {/* COLUMN 3: STOVE BURNING SLOTS */}
          <div className="kg-stove-range">
            <div className="kg-stove-burners">
              {/* Burner 1: Active Cooking Slot */}
              <div className={`kg-burner-slot ${stoveOn ? "active" : ""}`}>
                <div className="kg-burner-ring" />
                
                {/* SVG burning fire flames */}
                {stoveOn && (
                  <div className="kg-burner-flames">
                    <span className="kg-flame-tongue" style={{ "--d": "0.3s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.5s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.4s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.6s" } as any} />
                    <span className="kg-flame-tongue" style={{ "--d": "0.35s" } as any} />
                  </div>
                )}

                {/* Status Indicator text overlay */}
                <div className="absolute top-4 font-bold text-[8px] uppercase tracking-widest text-slate-500">
                  {stoveOn ? "Burner Active 🔥" : "Burner Ready"}
                </div>
              </div>

              {/* Burner 2: Showroom Slot */}
              <div className="kg-burner-slot">
                <div className="kg-burner-ring" />
                <div className="absolute top-4 font-bold text-[8px] uppercase tracking-widest text-slate-600">
                  Burner Off
                </div>
              </div>
            </div>

            {/* Dial Knob Board */}
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

                {/* Knob 2: Deco Knob */}
                <div className="kg-metallic-knob-container">
                  <div className="kg-metallic-knob" style={{ transform: "rotate(45deg)" }}>
                    <div className="kg-knob-indicator" />
                  </div>
                  <span className="kg-knob-label">TEMP</span>
                </div>
              </div>

              {/* Active Cooking progress bar */}
              {stoveOn && (
                <div className="w-full bg-slate-950/60 p-2 rounded border border-emerald-500/20 text-center">
                  <span className="text-[7px] font-extrabold text-emerald-400 uppercase tracking-widest block mb-1">
                    Baking Project compilation recipe...
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
                left: `${15 + Math.random() * 70}%`,
                top: `${20 + Math.random() * 65}%`,
                "--dur": s.dur
              } as any}
            >
              {s.emoji}
            </span>
          ))}

          <div className="kg-gourmet-reveal-card">
            <span className="text-[9px] uppercase font-black text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full tracking-widest">
              Gourmet Dish Prepared!
            </span>

            <div className="kg-plated-dish-display">
              {selectedRecipe.emoji}
            </div>

            <h3 className="kg-plated-title">{selectedRecipe.dishName} Ready!</h3>
            <p className="kg-plated-desc">
              Your technology recipe compiled beautifully. The ingredients combined to produce a gourmet project representation!
            </p>

            {/* Stars generated based on accuracy */}
            <div className="kg-stars-row">
              {Array.from({ length: 5 }).map((_, idx) => {
                const earned = getEarnedStars();
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

            <button className="kg-explore-dish-btn" onClick={handleExploreProject}>
              SERVE & EXPLORE DISH <ArrowRight className="inline-block w-4 h-4 ml-1" />
            </button>
          </div>
        </div>
      )}

      {/* STATE D: PROJECT SHOWCASE HUD */}
      {cookingState === "showcase" && selectedRecipe && (
        <div className="kg-showcase-scene">
          <div className="kg-showcase-board">
            
            {/* Close Button */}
            <button className="kg-showcase-close-btn" onClick={() => setCookingState("menu")} title="Back to cookbook menu">
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

                <div className="kg-showcase-features-title text-[9px] font-black text-slate-500 uppercase tracking-widest mb-2">
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

              {/* Technologies recipe badges */}
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
                        className="text-[9px] font-black px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-md text-slate-300"
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
              {/* Image screenshot */}
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
