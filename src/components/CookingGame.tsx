import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX, ArrowLeft, ExternalLink, Clock } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import "@/css/CookingGame.css";

/* ==========================================================================
   🎮 Redesigned Gourmet Recipes & Tech Stack Mapping
   ========================================================================== */
interface Ingredient {
  id: string;
  name: string;
  emoji: string;
  category: "Frontend" | "Backend" | "Tools";
}

interface ProjectRecipe {
  id: string;
  name: string;
  emoji: string;
  dishName: string;
  description: string;
  ingredients: string[]; // ids of required ingredients
  technologies: string[];
  features: string[];
  github?: string;
  live?: string;
  details: string;
}

const INGREDIENTS: Ingredient[] = [
  { id: "react", name: "React Flour", emoji: "🌾", category: "Frontend" },
  { id: "ts", name: "TypeScript Pepper", emoji: "🌶️", category: "Frontend" },
  { id: "tailwind", name: "Tailwind Frosting", emoji: "🍦", category: "Frontend" },
  { id: "redux", name: "Redux Yeast", emoji: "🍞", category: "Frontend" },
  
  { id: "sql", name: "SQL Sauce", emoji: "🥫", category: "Backend" },
  { id: "node", name: "Node Stock", emoji: "🍲", category: "Backend" },
  { id: "python", name: "Python Extract", emoji: "🧪", category: "Backend" },
  { id: "supabase", name: "Supabase Syrup", emoji: "🍯", category: "Backend" },
  
  { id: "docker", name: "Docker Oil", emoji: "🛢️", category: "Tools" },
  { id: "firebase", name: "Firebase Sugar", emoji: "🍬", category: "Tools" },
  { id: "git", name: "Git Salt", emoji: "🧂", category: "Tools" },
  { id: "fastapi", name: "FastAPI Spice", emoji: "🧂", category: "Tools" },
];

const RECIPES: ProjectRecipe[] = [
  {
    id: "raasta",
    name: "Raasta – AI Intelligence",
    dishName: "Raasta AI Crop Ramen 🍜",
    emoji: "🍜",
    description: "An advanced multi-domain crop intelligence and agricultural RAG assistant built for farmers and scientists.",
    ingredients: ["python", "react", "fastapi", "git"],
    technologies: ["Python", "React", "FastAPI", "RAG Pipeline", "AI Core"],
    features: [
      "AI crop disease diagnostics and treatment guide.",
      "Custom RAG search over extensive crop data files.",
      "Document simplifier generating plain-text summaries.",
      "Offline-first PWA caching for remote farming fields."
    ],
    github: "https://github.com/nimrawani04",
    live: "https://nimrawani.vercel.app/",
    details: "Raasta AI is designed to act as an offline-capable intelligent crop companion. Using advanced Retrieval-Augmented Generation (RAG) models, it queries unstructured agricultural text manuals, translating high-level agronomy papers into actionable insights for growers. The frontend was built with React for snappy responsive layouts, and the API backend runs on FastAPI, deployed efficiently using Git version-controlled pipelines."
  },
  {
    id: "portal",
    name: "Academic Portal System",
    dishName: "Academic Portal Burger 🍔",
    emoji: "🍔",
    description: "A secure student-faculty portal featuring role-based dashboards and database tracking.",
    ingredients: ["react", "sql", "supabase", "ts"],
    technologies: ["React", "TypeScript", "PostgreSQL", "Supabase Auth", "Row-Level Security"],
    features: [
      "Role-based authorization for admin, faculty, and students.",
      "Grade publishing and real-time class announcement pipelines.",
      "Automatic exam hall ticket and curriculum tracking.",
      "Protected databases utilizing Supabase row-level security."
    ],
    github: "https://github.com/nimrawani04",
    live: "https://nimrawani.vercel.app/",
    details: "The Academic Portal System streamlines operations for the Central University of Kashmir. By leveraging PostgreSQL database instances managed by Supabase, the app guarantees bulletproof relational data models. Security is managed via Supabase Auth and granular Row-Level Security policy checks, while the sleek interface is powered by React, TypeScript, and rich CSS dashboards."
  },
  {
    id: "bis",
    name: "BIS AI Safety PWA",
    dishName: "BIS AI Safety Soufflé 🍮",
    emoji: "🍮",
    description: "A fast, offline-first compliance checker utilizing AI prompts and RAG guidelines.",
    ingredients: ["python", "ts", "tailwind", "docker"],
    technologies: ["Python", "Tailwind CSS", "TypeScript", "Docker Container", "PWA Cache"],
    features: [
      "Real-time product safety compliance verification.",
      "RAG processing over national standards guidelines.",
      "Containerized deployment supporting automated cloud scaling.",
      "PWA setup with robust background caching strategies."
    ],
    github: "https://github.com/nimrawani04",
    live: "https://nimrawani.vercel.app/",
    details: "BIS AI is a containerized Progressive Web Application that lets compliance officers verify product specifications against official BIS standards. Deployed in isolated Docker containers, it guarantees seamless horizontal scaling. The visual system features premium styling using Tailwind CSS, while TypeScript structures client-side RAG search logic."
  },
  {
    id: "smarthouse",
    name: "Smart House IoT",
    dishName: "Smart House IoT Cake 🎂",
    emoji: "🎂",
    description: "An interactive, real-time IoT dashboard displaying live telemetry and smart controllers.",
    ingredients: ["node", "react", "redux", "firebase"],
    technologies: ["Node.js", "React.js", "Redux Toolkit", "Firebase Realtime DB", "Arduino Core"],
    features: [
      "Live sensor data streams showing telemetry logs.",
      "Interactive smart controllers for lights, alarms, and fans.",
      "Historical logs tracking environmental metrics.",
      "State sync handled via Redux Toolkit and Firebase DB."
    ],
    github: "https://github.com/nimrawani04",
    live: "https://nimrawani.vercel.app/",
    details: "This Smart House IoT project builds a beautiful live monitoring center. Connecting physical Arduino microcontrollers to a web UI, users can trigger relays, view temperature trends, and toggle security zones. State synchronization across multiple clients is handled via Redux Toolkit and Firebase's WebSockets."
  }
];

export default function CookingGame({ onBack }: { onBack: () => void }) {
  const [started, setStarted] = useState(false);
  const [activeRecipe, setActiveRecipe] = useState<ProjectRecipe | null>(null);
  const [addedIngredients, setAddedIngredients] = useState<string[]>([]);
  const [stoveKnob, setStoveKnob] = useState(1); // 0 = off, 1 = low, 2 = medium, 3 = high
  const [potShaking, setPotShaking] = useState(false);
  const [revealSteam, setRevealSteam] = useState(false);
  const [showcaseOpen, setShowcaseOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [stars, setStars] = useState(0);
  const [feedbackMsg, setFeedbackMsg] = useState("");

  // Synthesizer Audio Context Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const rainSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const fanOscRef = useRef<OscillatorNode | null>(null);
  const sizzleSourceRef = useRef<AudioBufferSourceNode | null>(null);
  const sizzleGainRef = useRef<GainNode | null>(null);
  const synthGainRef = useRef<GainNode | null>(null);
  const loFiIntervalRef = useRef<any>(null);

  // Initialize Web Audio Synthesizer Loop
  const initAudio = () => {
    if (audioCtxRef.current) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioCtxRef.current = ctx;

    // Master Gain for Synthesizer Loop
    const synthGain = ctx.createGain();
    synthGain.gain.value = 0.6;
    synthGain.connect(ctx.destination);
    synthGainRef.current = synthGain;

    // 1. Procedural Rain Noise (Bandpass Filtered White Noise)
    const bufferSize = 2 * ctx.sampleRate;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    const rainSource = ctx.createBufferSource();
    rainSource.buffer = noiseBuffer;
    rainSource.loop = true;

    const rainFilter = ctx.createBiquadFilter();
    rainFilter.type = "bandpass";
    rainFilter.frequency.value = 1000;
    rainFilter.Q.value = 0.4;

    const rainGain = ctx.createGain();
    rainGain.gain.value = 0.04;

    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(synthGain);
    rainSource.start();
    rainSourceRef.current = rainSource;

    // 2. Procedural Ventilation Fan Hum (Low Sawtooth filtered lowpass)
    const fanOsc = ctx.createOscillator();
    fanOsc.type = "sawtooth";
    fanOsc.frequency.value = 65; // C2

    const fanFilter = ctx.createBiquadFilter();
    fanFilter.type = "lowpass";
    fanFilter.frequency.value = 90;

    const fanGain = ctx.createGain();
    fanGain.gain.value = 0.08;

    fanOsc.connect(fanFilter);
    fanFilter.connect(fanGain);
    fanGain.connect(synthGain);
    fanOsc.start();
    fanOscRef.current = fanOsc;

    // 3. Procedural Pot Sizzling Noise
    const sizzleSource = ctx.createBufferSource();
    sizzleSource.buffer = noiseBuffer;
    sizzleSource.loop = true;

    const sizzleFilter = ctx.createBiquadFilter();
    sizzleFilter.type = "highpass";
    sizzleFilter.frequency.value = 5000;

    const sizzleGain = ctx.createGain();
    sizzleGain.gain.value = 0.0; // starts off

    sizzleSource.connect(sizzleFilter);
    sizzleFilter.connect(sizzleGain);
    sizzleGain.connect(synthGain);
    sizzleSource.start();
    sizzleSourceRef.current = sizzleSource;
    sizzleGainRef.current = sizzleGain;

    // 4. Procedural Late-Night Lo-Fi Keyboard Chords
    const chords = [
      [130.81, 155.56, 196.00, 233.08], // Cm7
      [174.61, 207.65, 261.63, 311.13], // Fm7
      [116.54, 146.83, 174.61, 207.65], // Bb7
      [155.56, 196.00, 233.08, 293.66], // Ebmaj7
    ];
    let chordIdx = 0;

    const playNextChord = () => {
      const freqs = chords[chordIdx];
      const now = ctx.currentTime;
      freqs.forEach(freq => {
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = freq;

        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.04, now + 1.2);
        oscGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.0);

        const filter = ctx.createBiquadFilter();
        filter.type = "lowpass";
        filter.frequency.value = 350;

        osc.connect(filter);
        filter.connect(oscGain);
        oscGain.connect(synthGain);
        osc.start(now);
        osc.stop(now + 6.0);
      });
      chordIdx = (chordIdx + 1) % chords.length;
    };

    playNextChord();
    loFiIntervalRef.current = setInterval(playNextChord, 6000);
  };

  const stopAudio = () => {
    if (loFiIntervalRef.current) clearInterval(loFiIntervalRef.current);
    try { rainSourceRef.current?.stop(); } catch(e){}
    try { fanOscRef.current?.stop(); } catch(e){}
    try { sizzleSourceRef.current?.stop(); } catch(e){}
    audioCtxRef.current?.close();
    audioCtxRef.current = null;
  };

  const toggleMute = () => {
    if (audioOn) {
      if (synthGainRef.current) synthGainRef.current.gain.value = 0;
      setAudioOn(false);
    } else {
      if (!audioCtxRef.current) {
        initAudio();
      } else {
        if (synthGainRef.current) synthGainRef.current.gain.value = 0.6;
      }
      setAudioOn(true);
    }
  };

  // Trigger brief procedural tactile sound effect (clicking, dropping)
  const playClink = (freq: number = 880, type: OscillatorType = "sine", vol: number = 0.08) => {
    const ctx = audioCtxRef.current;
    if (!ctx || !audioOn) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = type;
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(now);
    osc.stop(now + 0.4);
  };

  // Trigger stove sizzling level based on Knob and ingredients count
  useEffect(() => {
    if (!sizzleGainRef.current || !audioOn) return;
    if (stoveKnob === 0) {
      sizzleGainRef.current.gain.setTargetAtTime(0, audioCtxRef.current!.currentTime, 0.2);
    } else {
      const targetVol = 0.03 + (stoveKnob * 0.02) + (addedIngredients.length * 0.01);
      sizzleGainRef.current.gain.setTargetAtTime(targetVol, audioCtxRef.current!.currentTime, 0.2);
    }
  }, [stoveKnob, addedIngredients, audioOn]);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const handleStartJourney = () => {
    setStarted(true);
    setAudioOn(true);
    initAudio();
    playClink(440, "triangle", 0.1);
  };

  const handleSelectRecipe = (recipe: ProjectRecipe) => {
    setActiveRecipe(recipe);
    setAddedIngredients([]);
    setStars(0);
    setFeedbackMsg("");
    playClink(587.33, "sine", 0.08); // D5 clink
  };

  const handleAddIngredient = (ingId: string) => {
    if (!activeRecipe) return;
    if (addedIngredients.includes(ingId)) {
      setFeedbackMsg("That ingredient is already inside the pot!");
      playClink(220, "sawtooth", 0.05);
      return;
    }

    const nextIngredients = [...addedIngredients, ingId];
    setAddedIngredients(nextIngredients);
    setPotShaking(true);
    setFeedbackMsg("");
    
    // Play splash clink
    playClink(698.46, "sine", 0.1); // F5 splash sound
    setTimeout(() => setPotShaking(false), 400);

    // Dynamic Star Rating Calculation
    const required = activeRecipe.ingredients;
    const correctCount = nextIngredients.filter(id => required.includes(id)).length;
    const incorrectCount = nextIngredients.filter(id => !required.includes(id)).length;
    
    // Starting from 5 stars, deduct 0.5 stars for every wrong ingredient
    let calculated = 5 - (incorrectCount * 0.5);
    
    // Also scale down if not complete
    if (nextIngredients.length < required.length) {
      calculated = Math.max(1, (correctCount / required.length) * 5 - (incorrectCount * 0.5));
    }
    
    setStars(Math.max(1, Math.min(5, calculated)));
  };

  const handleTurnKnob = () => {
    const nextKnob = (stoveKnob + 1) % 4;
    setStoveKnob(nextKnob);
    playClink(330, "square", 0.04); // Switch click
  };

  const handleClearPot = () => {
    setAddedIngredients([]);
    setStars(0);
    setFeedbackMsg("Stove cleared! Ready to assemble recipe again.");
    playClink(293.66, "sine", 0.06);
  };

  const handleServeProject = () => {
    if (!activeRecipe) return;
    
    // Slide transition shut (Steam Overlay activate)
    setRevealSteam(true);
    playClink(523.25, "triangle", 0.15); // Celebrate C5

    setTimeout(() => {
      setShowcaseOpen(true);
    }, 1800);
  };

  const handleCloseShowcase = () => {
    setShowcaseOpen(false);
    setRevealSteam(false);
    setActiveRecipe(null);
    setAddedIngredients([]);
    setStars(0);
    setFeedbackMsg("");
  };

  return (
    <div className="cg-viewport">
      <div className="cg-vignette" />
      <div className="cg-ambient-glow" />

      {/* 🌧️ Late-Night Windows */}
      <div className="cg-window-frame">
        <div className="cg-window-glass" />
        <div className="cg-rain-streaks" />
        <div className="cg-city-lights">
          <span className="cg-city-dot" style={{ "--d": "1.2s" } as any} />
          <span className="cg-city-dot" style={{ "--d": "0.7s" } as any} />
          <span className="cg-city-dot" style={{ "--d": "1.9s" } as any} />
          <span className="cg-city-dot" style={{ "--d": "1.4s" } as any} />
        </div>
      </div>

      {/* 🎬 Scene 1: Dim Entrance Hallway */}
      <AnimatePresence>
        {!started && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cg-entrance-scene"
          >
            <div className="cg-entrance-panel">
              <span className="cg-entrance-logo" role="img" aria-label="Steaming Pot">🍳</span>
              <h2>NIMRA'S STUDIO KITCHEN</h2>
              <p>
                Step inside a late-night creative sanctuary. Gather tech stack ingredients to cook delicious software solutions, exploring code architecture, frameworks, and APIs metaphorically in a high-fidelity atmospheric workshop.
              </p>
              <button className="cg-start-btn" onClick={handleStartJourney}>
                ENTER STUDIO KITCHEN 🍳
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🎬 Scene 2: Main Kitchen Studio Interface */}
      {started && (
        <>
          {/* HUD Header */}
          <div className="cg-hud-header">
            <div className="cg-hud-info">
              <div className="cg-hud-avatar">👨‍🍳</div>
              <div className="cg-hud-titles">
                <h3>Nimra's Studio Kitchen</h3>
                <span>Creative Engineering Hub</span>
              </div>
            </div>
            
            <div className="cg-hud-controls">
              <button 
                onClick={toggleMute}
                className="cg-control-btn"
                title={audioOn ? "Mute Synthesizer" : "Unmute Ambiance"}
              >
                {audioOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>
              <button 
                onClick={onBack}
                className="cg-control-btn"
                title="Return to Arcade Hub"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Core Interactive Area */}
          <AnimatePresence mode="wait">
            {!activeRecipe ? (
              /* RECIPE WALL VIEW */
              <motion.div 
                key="wall"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="cg-recipe-wall-view"
              >
                <div className="cg-wall-header">
                  <h2>👨‍🍳 Select a Project Recipe</h2>
                  <p>Choose an elegant culinary dish. Each recipe represents a software application built with distinct frameworks, database layers, and deployment mechanisms.</p>
                </div>

                <div className="cg-recipe-grid">
                  {RECIPES.map(recipe => (
                    <div 
                      key={recipe.id}
                      onClick={() => handleSelectRecipe(recipe)}
                      className="cg-recipe-card"
                    >
                      <div>
                        <div className="cg-card-emoji">{recipe.emoji}</div>
                        <h3 className="cg-card-title">{recipe.name}</h3>
                        <p className="cg-card-desc">{recipe.description}</p>
                      </div>
                      <div>
                        <div className="cg-card-techs">
                          {recipe.technologies.slice(0, 3).map((tech, idx) => (
                            <span key={idx} className="cg-card-tech">{tech}</span>
                          ))}
                        </div>
                        <button className="cg-select-btn">
                          PREPARE DISH 📖
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              /* ACTIVE COOKING STUDIO VIEW */
              <motion.div 
                key="cooking"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="cg-workspace"
              >
                {/* 1. Left Sidebar: Cozy Cookbook */}
                <div className="cg-left-cookbook">
                  <div>
                    <span className="cg-book-tag">Recipe Card</span>
                    <h2 className="cg-book-title">{activeRecipe.dishName}</h2>
                    
                    <div className="cg-book-notes">
                      <strong>Chef Notes:</strong> Combine exactly the right dependencies inside the cooking pot. If you introduce unrelated packages or libraries, half-stars will be deducted for code bloat!
                    </div>

                    <h4 className="cg-step-title">Required Components</h4>
                    <div className="cg-checklist">
                      {activeRecipe.ingredients.map(ingId => {
                        const ing = INGREDIENTS.find(i => i.id === ingId);
                        const isDone = addedIngredients.includes(ingId);
                        return (
                          <div key={ingId} className={`cg-ingredient-todo ${isDone ? "done" : ""}`}>
                            <div className="cg-checkbox">
                              {isDone ? "✓" : ""}
                            </div>
                            <span>{ing?.name || ingId}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button 
                      onClick={() => setActiveRecipe(null)}
                      className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-bold text-xs transition"
                    >
                      ← RECIPE WALL
                    </button>
                  </div>
                </div>

                {/* 2. Central Island Counter */}
                <div className="cg-center-island">
                  {/* Ingredient Jars Cabinets */}
                  <div>
                    <h3 className="cg-cabinet-title">🗄️ Tech Cabinet</h3>
                    <div className="cg-ingredients-shelf">
                      {INGREDIENTS.map(ing => (
                        <div 
                          key={ing.id}
                          onClick={() => handleAddIngredient(ing.id)}
                          className="cg-ingredient-jar"
                          title={`Add ${ing.name} to Pot`}
                        >
                          <span className="cg-jar-emoji">{ing.emoji}</span>
                          <span className="cg-jar-name">{ing.name}</span>
                          <span className="cg-jar-category">{ing.category}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bubbling Pot Hub */}
                  <div className="cg-cooking-pot-station">
                    <div className="cg-steam-column">
                      <span className="cg-steam-waft" style={{ "--d": "0s" } as any} />
                      <span className="cg-steam-waft" style={{ "--d": "0.4s" } as any} />
                      <span className="cg-steam-waft" style={{ "--d": "0.2s" } as any} />
                    </div>

                    <div className={`cg-pot-wrapper ${potShaking ? "shake" : ""}`}>
                      <span className="cg-stew-pot" role="img" aria-label="Bubbling pot">🍲</span>
                      
                      {/* Active Flames underneath */}
                      {stoveKnob > 0 && (
                        <div className="cg-stove-flames">
                          <span className="cg-fire-particle" style={{ "--d": "0.1s", "--dur": "0.4s" } as any} />
                          <span className="cg-fire-particle" style={{ "--d": "0.3s", "--dur": "0.3s" } as any} />
                          <span className="cg-fire-particle" style={{ "--d": "0s", "--dur": "0.5s" } as any} />
                          <span className="cg-fire-particle" style={{ "--d": "0.2s", "--dur": "0.35s" } as any} />
                        </div>
                      )}
                    </div>

                    {/* Simple dynamic log feedback */}
                    <div className="text-center mt-4 min-h-[20px]">
                      {feedbackMsg && (
                        <p className="text-amber-400 text-xs tracking-wide bg-amber-500/10 px-4 py-1.5 rounded-full border border-amber-500/20 max-w-sm mx-auto">
                          {feedbackMsg}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Added ingredients overview logs */}
                  <div className="bg-slate-950/40 border border-slate-900 rounded-xl p-4 flex flex-wrap gap-2 items-center justify-center min-h-[50px]">
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mr-2">
                      Pot Contents:
                    </span>
                    {addedIngredients.length === 0 ? (
                      <span className="text-xs text-slate-600 italic">Empty pot</span>
                    ) : (
                      addedIngredients.map(ingId => {
                        const ing = INGREDIENTS.find(i => i.id === ingId);
                        return (
                          <span 
                            key={ingId} 
                            className="text-xs px-2.5 py-1 bg-slate-900 border border-slate-800 rounded-full text-slate-300 flex items-center gap-1.5"
                          >
                            <span>{ing?.emoji}</span>
                            <span>{ing?.name}</span>
                          </span>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* 3. Right Sidebar: Burners and Plating */}
                <div className="cg-right-stove">
                  <div>
                    <span className="cg-book-tag">Control Center</span>
                    <h3 className="text-lg font-bold text-slate-100 mt-1 mb-4">Stove Operations</h3>

                    <div className="cg-stove-control-panel">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block text-center">
                        Burner Dial
                      </span>
                      
                      <div className="cg-stove-dial-wrapper">
                        <div className="cg-stove-dial">
                          <div 
                            onClick={handleTurnKnob}
                            className="cg-dial-knob" 
                            style={{ transform: `rotate(${stoveKnob * 90}deg)` }}
                          />
                          <span className="cg-dial-label">
                            {stoveKnob === 0 && "OFF"}
                            {stoveKnob === 1 && "LOW"}
                            {stoveKnob === 2 && "MED"}
                            {stoveKnob === 3 && "MAX"}
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 leading-relaxed text-center bg-slate-950/40 p-2.5 rounded border border-slate-900/60">
                        Adjusting the heat modifies the synthesis bubbling volume!
                      </div>
                    </div>
                  </div>

                  {/* Star Rating Display */}
                  <div className="cg-star-plating-slot">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                      Recipe Fidelity Score
                    </span>
                    <div className="cg-stars-display">
                      {[1, 2, 3, 4, 5].map(index => {
                        const isHalf = stars === index - 0.5;
                        const isActive = stars >= index;
                        return (
                          <span 
                            key={index} 
                            className={`cg-star-cell ${isActive ? "active" : "inactive"}`}
                          >
                            {isHalf ? "⭐" : (isActive ? "★" : "☆")}
                          </span>
                        );
                      })}
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-2">
                      {stars === 5 && "Flawless code architecture! 👨‍🍳"}
                      {stars > 3 && stars < 5 && "Great dish, slightly bloated dependencies."}
                      {stars <= 3 && stars > 0 && "Fidelity checks incomplete."}
                      {stars === 0 && "Add items to begin baking!"}
                    </span>
                  </div>

                  {/* Actions BAR */}
                  <div className="cg-action-bar">
                    <button 
                      onClick={handleClearPot}
                      className="cg-action-btn secondary"
                      disabled={addedIngredients.length === 0}
                    >
                      Clear
                    </button>
                    <button 
                      onClick={handleServeProject}
                      className="cg-action-btn primary"
                      disabled={addedIngredients.length === 0}
                    >
                      Serve 🍽️
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      {/* ♨️ Full-Screen Steam Transition Overlay */}
      <div className={`cg-steam-reveal-transition ${revealSteam ? "active" : ""}`}>
        <div className="cg-reveal-steam-smoke" />
        <div className="cg-reveal-spinner">
          <span className="text-5xl block animate-spin">🍲</span>
          <h2>PLATING DIGITAL CREATION...</h2>
        </div>
      </div>

      {/* 🍽️ Project Showcase Drawer Panel Modal */}
      <AnimatePresence>
        {showcaseOpen && activeRecipe && (
          <div className="cg-showcase-overlay">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="cg-showcase-container"
            >
              <div className="cg-showcase-header">
                <div className="cg-showcase-title-area">
                  <h2>{activeRecipe.name}</h2>
                  <span>Project Plating Completed successfully</span>
                </div>
                <button 
                  onClick={handleCloseShowcase}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center cursor-pointer transition"
                  title="Close Project"
                >
                  ✕
                </button>
              </div>

              <div className="cg-showcase-grid">
                <div className="cg-showcase-body">
                  <p>{activeRecipe.details}</p>

                  <div className="cg-feature-list">
                    <h4>🛠️ Key Features</h4>
                    {activeRecipe.features.map((feat, idx) => (
                      <div key={idx} className="cg-feature-item">
                        <span className="cg-feature-dot" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cg-showcase-sidebar flex flex-col justify-between">
                  <div className="bg-slate-950/40 border border-slate-900 p-6 rounded-2xl">
                    <span className="text-[10px] uppercase font-bold text-amber-500 tracking-wider block mb-4">
                      Final Recipe Statistics
                    </span>
                    
                    <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-3">
                      <span className="text-xs text-slate-400 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> Est. Cook Time:
                      </span>
                      <span className="text-xs font-bold text-white">4 Weeks</span>
                    </div>

                    <div className="mb-4">
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider block mb-2">
                        Fidelity Rating
                      </span>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(index => (
                          <span 
                            key={index} 
                            className={`text-xl ${stars >= index ? "text-amber-500" : "text-slate-800"}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="cg-showcase-links mt-6">
                    {activeRecipe.github && (
                      <a 
                        href={activeRecipe.github}
                        target="_blank"
                        rel="noreferrer"
                        className="cg-link-btn secondary"
                      >
                        <FaGithub className="w-4 h-4" /> Github Repository
                      </a>
                    )}
                    {activeRecipe.live && (
                      <a 
                        href={activeRecipe.live}
                        target="_blank"
                        rel="noreferrer"
                        className="cg-link-btn primary"
                      >
                        <ExternalLink className="w-4 h-4" /> Visit Live Site
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
