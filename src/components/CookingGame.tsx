import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaVolumeUp, FaVolumeMute, FaArrowLeft, FaAward } from "react-icons/fa";
import "../css/CookingGame.css";

// 1. Audio Synthesizer using Web Audio API
let audioCtx: AudioContext | null = null;
let ambientSizzleNode: AudioWorkletNode | ScriptProcessorNode | null = null;

const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  }
};

const playSFX = (type: "clink" | "splash" | "ignite" | "success" | "bubble") => {
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === "clink") {
      // Metallic utensil tap sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.05);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } 
    else if (type === "splash") {
      // Liquid splash or powder puff sound
      const bufferSize = audioCtx.sampleRate * 0.15;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;
      const filter = audioCtx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(400, now);
      filter.frequency.exponentialRampToValueAtTime(80, now + 0.15);
      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start(now);
      noise.stop(now + 0.15);
    }
    else if (type === "ignite") {
      // Heavy gas burner ignition click
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(60, now);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.1);
    }
    else if (type === "bubble") {
      // Soft single bubble popping sound
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    }
    else if (type === "success") {
      // Beautiful five-star reward metallic chime chords
      const frequencies = [523.25, 659.25, 783.99, 1046.50]; // C Major
      frequencies.forEach((freq, idx) => {
        const osc = audioCtx!.createOscillator();
        const gain = audioCtx!.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.12, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx!.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 1.2);
      });
    }
  } catch (e) {
    console.warn("Web Audio API not supported or context suspended:", e);
  }
};

const startAmbientSizzle = () => {
  try {
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    // Create synthesized ambient noise for stove bubbling/sizzling
    const bufferSize = audioCtx.sampleRate * 2;
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = audioCtx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;

    const filter = audioCtx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(600, audioCtx.currentTime);

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    noise.start();

    ambientSizzleNode = noise as any;
  } catch (e) {
    console.warn(e);
  }
};

const stopAmbientSizzle = () => {
  if (ambientSizzleNode) {
    try {
      (ambientSizzleNode as any).stop();
    } catch (e) {}
    ambientSizzleNode = null;
  }
};

// 2. Data Definitions
interface ProjectDish {
  id: string;
  title: string;
  dishName: string;
  tag: string;
  icon: string;
  desc: string;
  requiredIngs: string[];
  ingredientsView: string[];
  github: string;
  demo: string;
  xp: number;
  features: string[];
}

const DISHES: ProjectDish[] = [
  {
    id: "bis-ai",
    title: "BIS AI Safety Assistant",
    dishName: "AI Safety Curry 🍛",
    tag: "AI & RAG Pipeline",
    icon: "🍛",
    desc: "A production-grade AI-powered safety verification assistant built for product compliance standard analysis.",
    requiredIngs: ["React", "TypeScript", "Python", "Tailwind CSS"],
    ingredientsView: ["React Flour", "TypeScript Pepper", "Python Broth", "Tailwind Seasoning"],
    github: "https://github.com/nimrawani04",
    demo: "https://nimrawani.vercel.app/",
    xp: 150,
    features: [
      "AI-powered RAG pipeline search",
      "Offline PWA verification capabilities",
      "Dynamic standard cross-referencing",
      "Tailwind responsive layout grid"
    ]
  },
  {
    id: "raasta",
    title: "Raasta AI Crop Platform",
    dishName: "AI Crop Ramen 🍜",
    tag: "Multi-Domain Intelligence",
    icon: "🍜",
    desc: "Agricultural multi-domain artificial intelligence advisor providing predictive crop health analysis.",
    requiredIngs: ["Next.js", "Python", "MongoDB", "Tailwind CSS"],
    ingredientsView: ["Next.js Essence", "Python Broth", "MongoDB Green Glaze", "Tailwind Seasoning"],
    github: "https://github.com/nimrawani04",
    demo: "https://nimrawani.vercel.app/",
    xp: 150,
    features: [
      "Computer vision predictive crop diagnosing",
      "Interactive crop calendar tracking scheduler",
      "Fast next-gen Next.js serverside rendering",
      "Secure persistent database clusters"
    ]
  },
  {
    id: "cuk-portal",
    title: "Academic Portal CUK",
    dishName: "Portal Vegetable Soup 🥣",
    tag: "Full-Stack System",
    icon: "🥣",
    desc: "A highly resilient university dashboard featuring secure dual-role administrative portals.",
    requiredIngs: ["React", "JavaScript", "SQL/PostgreSQL", "CSS"],
    ingredientsView: ["React Flour", "JavaScript Sugar", "SQL Salt", "CSS Frosting"],
    github: "https://github.com/nimrawani04",
    demo: "https://nimrawani.vercel.app/",
    xp: 120,
    features: [
      "Role-based secure administration portals",
      "Highly responsive student profile dashboard",
      "Persistent PostgreSQL course registry tables",
      "Smooth classic CSS layouts & theme adjustments"
    ]
  },
  {
    id: "araaz",
    title: "Araaz E-Commerce Hub",
    dishName: "Araaz Stacked Burger 🍔",
    tag: "Responsive Retail",
    icon: "🍔",
    desc: "An ultra-premium highly responsive online storefront integrated with serverless triggers.",
    requiredIngs: ["React", "JavaScript", "Firebase", "CSS"],
    ingredientsView: ["React Flour", "JavaScript Sugar", "Firebase Syrup", "CSS Frosting"],
    github: "https://github.com/nimrawani04",
    demo: "https://nimrawani.vercel.app/",
    xp: 120,
    features: [
      "Intuitive global state checkout shopping carts",
      "Firebase realtime catalog sync databases",
      "Integrated secure authentication middleware",
      "Sleek professional modern animations and grids"
    ]
  }
];

const SHELF_INGREDIENTS = [
  { id: "React", label: "React Flour", icon: "🌾", type: "frontend" },
  { id: "Next.js", label: "Next.js Essence", icon: "🏺", type: "frontend" },
  { id: "JavaScript", label: "JavaScript Sugar", icon: "🧂", type: "frontend" },
  { id: "TypeScript", label: "TypeScript Pepper", icon: "🫙", type: "frontend" },
  { id: "CSS", label: "CSS Frosting", icon: "🧁", type: "styling" },
  { id: "Tailwind CSS", label: "Tailwind Seasoning", icon: "🌶️", type: "styling" },
  { id: "SQL/PostgreSQL", label: "SQL Salt", icon: "🧂", type: "database" },
  { id: "MongoDB", label: "MongoDB Green Glaze", icon: "🍯", type: "database" },
  { id: "Firebase", label: "Firebase Syrup", icon: "🫙", type: "database" },
  { id: "Python", label: "Python Broth", icon: "🫕", type: "backend" }
];

export default function CookingGame({ onBack }: { onBack: () => void }) {
  const [activeUtensil, setActiveUtensil] = useState<string | null>(null);
  const [activeRecipeIdx, setActiveRecipeIdx] = useState<number>(0);
  const [potContents, setPotContents] = useState<string[]>([]);
  const [stoveOn, setStoveOn] = useState(false);
  const [cookingProgress, setCookingProgress] = useState(0);
  const [dialogue, setDialogue] = useState("Greetings, Chef! 🍳 Select a project recipe from the menu wall to start cooking!");
  const [revealedProject, setRevealedProject] = useState<ProjectDish | null>(null);
  const [scoreStars, setScoreStars] = useState(5);
  const [musicOn, setMusicOn] = useState(false);

  const activeRecipe = DISHES[activeRecipeIdx];

  // 1. Synthesize stove hum bubbles when stove is running
  useEffect(() => {
    let bubbleInterval: any;
    if (stoveOn) {
      startAmbientSizzle();
      bubbleInterval = setInterval(() => {
        playSFX("bubble");
      }, 350);
    } else {
      stopAmbientSizzle();
    }
    return () => {
      clearInterval(bubbleInterval);
      stopAmbientSizzle();
    };
  }, [stoveOn]);

  // 2. Handle cooking countdown simulation
  useEffect(() => {
    let timer: any;
    if (stoveOn && cookingProgress < 100) {
      timer = setTimeout(() => {
        setCookingProgress(prev => {
          const next = prev + 10;
          if (next >= 100) {
            handleCompleteRecipe();
          }
          return next;
        });
      }, 300);
    }
    return () => clearTimeout(timer);
  }, [stoveOn, cookingProgress]);

  // 3. Dialogue updates on recipe changes
  useEffect(() => {
    setDialogue(`Now Cooking: ${activeRecipe.title}. Step 1: Select a cooking utensil! Step 2: Ladel in the required tech stack.`);
    setPotContents([]);
    setStoveOn(false);
    setCookingProgress(0);
  }, [activeRecipeIdx]);

  // 4. Utensil selection
  const handleSelectUtensil = (utensil: string) => {
    playSFX("clink");
    setActiveUtensil(utensil);
    setDialogue(`Great! Placed your ${utensil} on the stove. Now grab the technical ingredients from the shelves!`);
  };

  // 5. Add ingredient to pot
  const handleAddIngredient = (ingId: string, ingLabel: string) => {
    if (!activeUtensil) {
      setDialogue("Whoops! Grab a cooking utensil from the tool rack first so you have somewhere to put your ingredients!");
      playSFX("clink");
      return;
    }
    if (stoveOn) {
      setDialogue("The stove burner is currently fully active! Wait for the dish to plate before adding more ingredients.");
      return;
    }

    playSFX("splash");
    setPotContents(prev => [...prev, ingId]);
    
    const isRequired = activeRecipe.requiredIngs.includes(ingId);
    if (isRequired) {
      setDialogue(`Splendid! Added ${ingLabel} into the ${activeUtensil}. The recipe checklist updates!`);
    } else {
      setDialogue(`Oh? You threw in ${ingLabel} which isn't on the recipe. This might alter the final star rating!`);
    }
  };

  // 6. Stove ignition knob trigger
  const handleIgniteStove = () => {
    if (!activeUtensil) {
      setDialogue("Please choose a utensil from the hanging rack before lighting the burner!");
      return;
    }
    
    // Check if at least all required ingredients are added
    const missing = activeRecipe.requiredIngs.filter(ing => !potContents.includes(ing));
    if (missing.length > 0) {
      setDialogue(`Wait! The pot is missing recipe items: ${missing.join(", ")}. Gather them first!`);
      return;
    }

    playSFX("ignite");
    setStoveOn(true);
    setDialogue("Burner Ignited! 🔥 Sizzling and bubbling starting. The ingredients are marrying together!");
  };

  // 7. Complete Recipe scoring and reveal
  const handleCompleteRecipe = () => {
    setStoveOn(false);
    
    // Score system based on incorrect extra ingredients and correctness
    const extras = potContents.filter(ing => !activeRecipe.requiredIngs.includes(ing));
    let calculatedStars = 5;
    if (extras.length === 1) calculatedStars = 4.5;
    else if (extras.length === 2) calculatedStars = 4;
    else if (extras.length >= 3) calculatedStars = 3;

    setScoreStars(calculatedStars);
    setRevealedProject(activeRecipe);
    playSFX("success");
  };

  const handleCloseReveal = () => {
    setRevealedProject(null);
    setPotContents([]);
    setCookingProgress(0);
    setActiveUtensil(null);
    setDialogue("Amazing job, Chef! Explore other developer recipes on the menu wall to continue leveling up!");
  };

  const toggleMusic = () => {
    if (!musicOn) {
      setMusicOn(true);
      // Play a soft background ambient hum using Web Audio API
      initAudio();
      try {
        const osc = audioCtx!.createOscillator();
        const gain = audioCtx!.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, audioCtx!.currentTime); // low harmonic A3
        gain.gain.setValueAtTime(0.04, audioCtx!.currentTime);
        osc.connect(gain);
        gain.connect(audioCtx!.destination);
        osc.start();
      } catch(e){}
    } else {
      setMusicOn(false);
    }
  };

  return (
    <div className="ck-viewport">
      <div className="ck-vignette" />

      {/* Hanging spot light and shade */}
      <div className="ck-pendant-light">
        <div className="ck-light-shade" />
        <div className="ck-light-glow" />
      </div>

      {/* Rainy window view */}
      <div className="ck-window-backdrop">
        <div className="ck-city-lights" />
        <div className="ck-rain-overlay" />
        <div className="ck-rain-drops" />
      </div>

      {/* HUD Controller */}
      <header className="ck-hud-header">
        <div className="ck-hud-title">
          <div className="ck-hud-logo">🍳</div>
          <div className="ck-hud-title-text">
            <h3>Nimra's Kitchen</h3>
            <span>Game 1 — Project Simulator</span>
          </div>
        </div>

        <div className="ck-hud-controls">
          <button className="ck-control-btn" onClick={toggleMusic} title="Toggle Ambience">
            {musicOn ? <FaVolumeUp /> : <FaVolumeMute />}
          </button>
          <button className="ck-control-btn" onClick={onBack} title="Return to Arcade">
            <FaArrowLeft />
          </button>
        </div>
      </header>

      {/* Hanging Utensils Hook Rack */}
      <section className="ck-utensil-rack">
        <div className="ck-rack-bar" />
        {[
          { id: "Bubbling Pot 🍲", label: "Pot", icon: "🍲" },
          { id: "Sizzling Pan 🍳", label: "Pan", icon: "🍳" },
          { id: "Mixing Bowl 🥣", label: "Bowl", icon: "🥣" }
        ].map(item => (
          <div 
            key={item.label}
            className="ck-rack-hook"
            onClick={() => handleSelectUtensil(item.id)}
            style={{ opacity: activeUtensil === item.id ? 1 : 0.6 }}
          >
            <span className="ck-rack-hook-chain text-slate-600 -mt-2 text-xs">🔗</span>
            <span className="ck-rack-tool">{item.icon}</span>
            <span className="ck-rack-label">{item.label}</span>
          </div>
        ))}
      </section>

      {/* Physical Restaurant Orders / Projects Board */}
      <section className="ck-orders-board">
        <div className="ck-board-header">Recipe Menu</div>
        <div className="flex flex-col gap-2">
          {DISHES.map((dish, idx) => (
            <div
              key={dish.id}
              className={`ck-menu-card ${activeRecipeIdx === idx ? "active" : ""}`}
              onClick={() => setActiveRecipeIdx(idx)}
            >
              <span className="ck-menu-card-icon">{dish.icon}</span>
              <div className="ck-menu-card-details">
                <span className="ck-menu-card-title">{dish.dishName}</span>
                <span className="ck-menu-card-xp">+{dish.xp} XP</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Immersive Cookbook Panel */}
      <section className="ck-recipe-book-panel">
        <div className="ck-book-pin" />
        <div className="ck-recipe-tag">{activeRecipe.tag}</div>
        <h2 className="ck-recipe-title">{activeRecipe.dishName}</h2>
        <p className="ck-recipe-desc">"{activeRecipe.desc}"</p>

        <div className="ck-recipe-ingredients-box">
          <h4 className="ck-recipe-ingredients-title">Ingredients Checklist:</h4>
          <div className="ck-recipe-ingredients-list">
            {activeRecipe.requiredIngs.map((ing, idx) => {
              const checked = potContents.includes(ing);
              const label = activeRecipe.ingredientsView[idx];
              return (
                <span key={ing} className={`ck-recipe-ing-tag ${checked ? "checked" : ""}`}>
                  {checked ? "✓" : "☐"} {label}
                </span>
              );
            })}
          </div>
        </div>

        <div className="ck-recipe-instructions">
          <h4 className="ck-recipe-instructions-title">Cooking Instructions:</h4>
          <div className="ck-recipe-ins-step">
            1. Select a cooking utensil from the rack to act as your cooking anchor.
          </div>
          <div className="ck-recipe-ins-step">
            2. Tap and pour the tech stack ingredients from shelves into the cooker.
          </div>
          <div className="ck-recipe-ins-step">
            3. Turn the stove dial to ignite burner when checklist is completed!
          </div>
        </div>
      </section>

      {/* Realistic Ingredient Storage Shelves */}
      <section className="ck-storage-shelves">
        {/* Top Shelf: Front-End Flours & Spices */}
        <div className="ck-shelf-level">
          {SHELF_INGREDIENTS.filter(i => i.type === "frontend" || i.type === "styling").map(ing => (
            <div 
              key={ing.id} 
              className="ck-jar-container"
              onClick={() => handleAddIngredient(ing.id, ing.label)}
            >
              <span className="ck-jar-icon">{ing.icon}</span>
              <span className="ck-jar-badge">{ing.label}</span>
            </div>
          ))}
          <div className="ck-shelf-wood" />
        </div>

        {/* Bottom Shelf: Back-End, Databases & Broths */}
        <div className="ck-shelf-level">
          {SHELF_INGREDIENTS.filter(i => i.type === "database" || i.type === "backend").map(ing => (
            <div 
              key={ing.id} 
              className="ck-jar-container"
              onClick={() => handleAddIngredient(ing.id, ing.label)}
            >
              <span className="ck-jar-icon">{ing.icon}</span>
              <span className="ck-jar-badge">{ing.label}</span>
            </div>
          ))}
          <div className="ck-shelf-wood" />
        </div>
      </section>

      {/* Interactive Subtitles Narration */}
      <section className="ck-dialogue-box">
        <span className="ck-dialogue-blink" />
        <p className="ck-dialogue-text">{dialogue}</p>
      </section>

      {/* Main Countertop & Stove Station */}
      <section className="ck-countertop">
        <div className="ck-marble-gloss" />
        
        {/* Active Stove Station */}
        <div className="ck-stove-station">
          <div className="ck-stove-grates" />
          <div className={`ck-burner-ring ${stoveOn ? "ignited" : ""}`}>
            <div className="ck-stove-flames" />
          </div>

          {/* Interactive Knob */}
          <div className="ck-stove-knob-wrapper">
            <div 
              className="ck-stove-knob"
              onClick={handleIgniteStove}
              style={{ transform: stoveOn ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              <div className="ck-knob-pointer" />
            </div>
            <span className={`ck-knob-label ${stoveOn ? "active" : ""}`}>
              {stoveOn ? "Ignited 🔥" : "Turn Dial"}
            </span>
          </div>
        </div>

        {/* Active Placed Utensil */}
        {activeUtensil && (
          <div className="ck-active-utensil">
            {activeUtensil.split(" ").pop()}
          </div>
        )}

        {/* Steam and Bubbles VFX Layer */}
        {stoveOn && (
          <>
            <div className="ck-steam-container">
              <div className="ck-steam-waft" style={{ "--tx": "8px" } as any} />
              <div className="ck-steam-waft" style={{ "--tx": "-6px", animationDelay: "0.8s" } as any} />
              <div className="ck-steam-waft" style={{ "--tx": "12px", animationDelay: "1.4s" } as any} />
            </div>
            <div className="ck-bubbles-container">
              <div className="ck-boiling-bubble" style={{ left: "20%", animationDelay: "0.1s" }} />
              <div className="ck-boiling-bubble" style={{ left: "45%", animationDelay: "0.4s" }} />
              <div className="ck-boiling-bubble" style={{ left: "70%", animationDelay: "0.7s" }} />
            </div>
          </>
        )}
      </section>

      {/* Immersive Fullscreen Project Reveal Overlay */}
      <AnimatePresence>
        {revealedProject && (
          <div className="ck-reveal-overlay">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="ck-reveal-card"
            >
              {/* Header */}
              <div className="ck-reveal-header">
                <h2>🍲 {revealedProject.title} Plated!</h2>
                <div className="ck-reveal-stars">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <span 
                      key={idx}
                      className={idx < Math.floor(scoreStars) ? "ck-star-gold" : "ck-star-gray"}
                    >
                      ★
                    </span>
                  ))}
                  <span className="text-[10px] text-orange-400 font-bold ml-2">({scoreStars} Stars)</span>
                </div>
              </div>

              {/* Body */}
              <div className="ck-reveal-body">
                {/* Left Column: Description & Features */}
                <div className="ck-reveal-desc-box">
                  <h4>Chef's Culinary Notes</h4>
                  <p>{revealedProject.desc}</p>

                  <h4 className="mt-4">Key Recipe Highlights</h4>
                  <ul className="list-disc pl-4 text-[10px] text-slate-400 space-y-1.5 mt-2">
                    {revealedProject.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                {/* Right Column: Spec card */}
                <div className="ck-reveal-spec-box">
                  <div className="ck-reveal-spec-item">
                    <h5>Gourmet Dish Class</h5>
                    <p>{revealedProject.dishName}</p>
                  </div>

                  <div className="ck-reveal-spec-item">
                    <h5>Required Ingredient Stack</h5>
                    <div className="ck-spec-tag-list mt-1">
                      {revealedProject.requiredIngs.map(ing => (
                        <span key={ing} className="ck-spec-tag">{ing}</span>
                      ))}
                    </div>
                  </div>

                  <div className="ck-reveal-actions mt-4">
                    <a 
                      href={revealedProject.github} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="ck-action-btn-secondary"
                    >
                      <FaGithub /> GitHub
                    </a>
                    <a 
                      href={revealedProject.demo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="ck-action-btn-primary"
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="ck-reveal-footer">
                <div className="ck-reveal-xp-badge">
                  <FaAward /> Earned +{revealedProject.xp} XP to Nimra's Arcade Hub!
                </div>
                <button className="ck-reveal-close" onClick={handleCloseReveal}>
                  Close Kitchen
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
