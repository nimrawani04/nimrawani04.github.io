import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, MouseEvent } from "react";
import {
  ArrowLeft,
  Award,
  BookOpen,
  CheckCircle2,
  ChefHat,
  Code2,
  ExternalLink,
  Flame,
  Music2,
  ScrollText,
  Sparkles,
  Trophy,
  Utensils,
  VolumeX,
} from "lucide-react";
import "../css/CookingGame.css";
import CookingGameCover from "./CookingGameCover";
import {
  sfxAchievement,
  sfxAddIngredient,
  sfxClick,
  sfxCombo,
  sfxCookStart,
  sfxDishComplete,
  sfxSizzle,
  sfxWrongIngredient,
  stopBgMusic,
  toggleBgMusic,
} from "../utils/kitchenSounds";

const SKILL_META: Record<string, { icon: string; cap: string; label: string; ingredient: string }> = {
  HTML: { icon: "HTML", cap: "#e9652d", label: "#fff0dc", ingredient: "HTML Flour" },
  CSS: { icon: "CSS", cap: "#347fd2", label: "#e8f4ff", ingredient: "CSS Frosting" },
  JavaScript: { icon: "JS", cap: "#e6aa26", label: "#fff7d6", ingredient: "JS Sugar" },
  TypeScript: { icon: "TS", cap: "#6f5ad7", label: "#eeeaff", ingredient: "TypeScript Pepper" },
  React: { icon: "R", cap: "#61b86a", label: "#edfff0", ingredient: "React Flour" },
  Supabase: { icon: "SB", cap: "#b36b2c", label: "#fff2e6", ingredient: "Supabase Syrup" },
  PostgreSQL: { icon: "PG", cap: "#20a899", label: "#e8fffb", ingredient: "SQL Sauce" },
  Vercel: { icon: "V", cap: "#f29b23", label: "#fff2dd", ingredient: "Vercel Yeast" },
  Web3Forms: { icon: "W3", cap: "#cc6f3e", label: "#fff0e9", ingredient: "Web3 Spice" },
  PWA: { icon: "PWA", cap: "#8367cf", label: "#f3eeff", ingredient: "PWA Salt" },
  "AI APIs": { icon: "AI", cap: "#7fb13d", label: "#f4ffe6", ingredient: "AI Honey" },
  Firecrawler: { icon: "FC", cap: "#ef6d7b", label: "#fff0f2", ingredient: "Firecrawler Oil" },
  Arduino: { icon: "ARD", cap: "#159aa0", label: "#e8fffe", ingredient: "Arduino Yeast" },
  "C++": { icon: "C++", cap: "#4471bf", label: "#eef4ff", ingredient: "C++ Broth" },
  "Infrared Sensors": { icon: "IR", cap: "#ef6d7b", label: "#fff0f3", ingredient: "Sensor Garlic" },
  "Ultrasonic Sensors": { icon: "US", cap: "#6db447", label: "#f1ffe9", ingredient: "Sensor Garlic" },
};

const ico = (skill: string) => SKILL_META[skill]?.icon || skill.slice(0, 2).toUpperCase();

const PARTICLES = ["*", "+", "spark", "steam", "simmer", "glow"];
const COOK_PHASES = [
  { pct: 0, label: "Prepping", emoji: "Prep" },
  { pct: 20, label: "Chopping", emoji: "Cut" },
  { pct: 40, label: "Sauteing", emoji: "Sear" },
  { pct: 60, label: "Simmering", emoji: "Steam" },
  { pct: 80, label: "Seasoning", emoji: "Salt" },
  { pct: 95, label: "Plating", emoji: "Plate" },
];

const getPhase = (progress: number) =>
  [...COOK_PHASES].reverse().find((phase) => progress >= phase.pct) || COOK_PHASES[0];

interface Achievement {
  id: string;
  title: string;
  desc: string;
  icon: string;
  check: (ctx: AchCtx) => boolean;
}

interface AchCtx {
  stars: number;
  cooked: Set<string>;
  totalXP: number;
  perfectCount: number;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: "first-dish", title: "First Dish", desc: "Cook your very first recipe", icon: "Chef", check: (c) => c.cooked.size >= 1 },
  { id: "three-dishes", title: "Sous Chef", desc: "Cook 3 recipes", icon: "Trophy", check: (c) => c.cooked.size >= 3 },
  { id: "five-dishes", title: "Head Chef", desc: "Cook 5 recipes", icon: "Medal", check: (c) => c.cooked.size >= 5 },
  { id: "all-dishes", title: "Master Chef", desc: "Cook every recipe", icon: "Crown", check: (c) => c.cooked.size >= 8 },
  { id: "perfect", title: "Perfectionist", desc: "Get 5 stars on a recipe", icon: "Star", check: (c) => c.perfectCount >= 1 },
  { id: "triple-perfect", title: "Flawless Chef", desc: "Get 5 stars on 3 recipes", icon: "Spark", check: (c) => c.perfectCount >= 3 },
  { id: "xp-500", title: "XP Hunter", desc: "Earn 500+ total XP", icon: "XP", check: (c) => c.totalXP >= 500 },
  { id: "xp-1000", title: "XP Legend", desc: "Earn 1000+ total XP", icon: "Legend", check: (c) => c.totalXP >= 1000 },
];

const CERTIFICATES = [
  { title: "Introduction to AI Concepts", org: "Microsoft", date: "Jan 2026" },
  { title: "Introduction to ML Concepts", org: "Microsoft", date: "Jan 2026" },
  { title: "AI Fundamentals", org: "IBM SkillsBuild", date: "Dec 2025" },
  { title: "OCI 2025 AI Foundations Associate", org: "Oracle", date: "Dec 2025" },
  { title: "Prepare Data for ML APIs", org: "Google Cloud", date: "Dec 2025" },
  { title: "DSA in Modern Product Engineering", org: "TechBairn", date: "Dec 2025" },
];

interface Recipe {
  id: string;
  name: string;
  type: string;
  desc: string;
  xp: number;
  ingredients: Record<string, number>;
  live?: string;
  github?: string;
}

const RECIPES: Recipe[] = [
  {
    id: "araaz",
    name: "Araaz E-commerce Burger",
    type: "Solo Project",
    xp: 120,
    desc: "Fully responsive e-commerce website with automated contact handling and modern UI/UX.",
    ingredients: { HTML: 2, CSS: 2, JavaScript: 2, Web3Forms: 1, Vercel: 1 },
    live: "https://araaaz.vercel.app/",
    github: "https://github.com/nimrawani04",
  },
  {
    id: "academic-portal",
    name: "Academic Portal Ramen",
    type: "Team Project",
    xp: 250,
    desc: "Full-stack academic portal with role-based auth, dashboards, attendance, marks, notices, and exams.",
    ingredients: { React: 2, TypeScript: 2, Supabase: 1, PostgreSQL: 1, Vercel: 1 },
    github: "https://github.com/nimrawani04",
  },
  {
    id: "bis-ai",
    name: "BIS AI Safety Salad",
    type: "Team Project",
    xp: 280,
    desc: "AI-powered product verification with RAG pipeline, multilingual support, and offline PWA.",
    ingredients: { React: 2, TypeScript: 2, Supabase: 1, PostgreSQL: 1, PWA: 1, Vercel: 1 },
    live: "https://bis-ai.vercel.app/",
    github: "https://github.com/nimrawani04",
  },
  {
    id: "rasta-ai",
    name: "Rasta AI Smart Ramen",
    type: "Team Project",
    xp: 350,
    desc: "Multi-domain AI platform with voice/text interaction, document understanding, and crop intelligence.",
    ingredients: { React: 2, TypeScript: 2, "AI APIs": 2, Firecrawler: 1, Supabase: 1, PostgreSQL: 1, Vercel: 1 },
    live: "https://cursor-hackathon-roan.vercel.app/",
    github: "https://github.com/nimrawani04",
  },
  {
    id: "2ai-conf",
    name: "2AI Conference Cupcake",
    type: "Collaborative",
    xp: 180,
    desc: "Official website for the 2026 International Conference on Applied AI.",
    ingredients: { JavaScript: 2, TypeScript: 2, CSS: 2, HTML: 2 },
    live: "https://2ai-conference.org/",
    github: "https://github.com/nimrawani04",
  },
  {
    id: "exam-system",
    name: "CUK Exam System Pasta",
    type: "Team Project",
    xp: 300,
    desc: "Secure examination management with role-based access and real-time data handling.",
    ingredients: { React: 2, TypeScript: 2, Supabase: 2, PostgreSQL: 2, Vercel: 1 },
    live: "https://secure-exam-flow.vercel.app/",
    github: "https://github.com/nimrawani04",
  },
  {
    id: "acadex",
    name: "CUK Acadex Stew",
    type: "Team Project",
    xp: 240,
    desc: "A university-wide academic portal with role-based dashboards for students and teachers. Features attendance, marks, notices, and exam information.",
    ingredients: { React: 2, TypeScript: 1.5, Supabase: 1, PostgreSQL: 1, Vercel: 1 },
    live: "https://ds-cuk.vercel.app/",
    github: "https://github.com/nimrawani04",
  },
  {
    id: "smart-house",
    name: "Smart House IoT Cake",
    type: "Solo Project",
    xp: 200,
    desc: "IoT-based home automation prototype with multiple sensors.",
    ingredients: { Arduino: 2, "C++": 2, "Infrared Sensors": 1, "Ultrasonic Sensors": 1 },
    github: "https://github.com/nimrawani04",
  },
];

const ALL_SKILLS = Array.from(new Set(RECIPES.flatMap((recipe) => Object.keys(recipe.ingredients))));

const shelfRows = [
  ALL_SKILLS.slice(0, 8),
  ALL_SKILLS.slice(8, 16),
];

function confetti() {
  const colors = ["#ffcf57", "#ed6f75", "#8ac95d", "#f59a31", "#9d65ce", "#ffffff"];
  for (let i = 0; i < 55; i += 1) {
    const el = document.createElement("div");
    el.className = "cg-confetti";
    el.style.left = `${Math.random() * 100}vw`;
    el.style.background = colors[Math.floor(Math.random() * colors.length)];
    el.style.animationDelay = `${Math.random() * 1}s`;
    el.style.animationDuration = `${1.5 + Math.random() * 1.5}s`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 3500);
  }
}

const StarRating = ({ rating }: { rating: number }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="cg-star-rating" aria-label={`${rating.toFixed(1)} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, index) => (
        <span key={index} className={`cg-rate-star ${index < full ? "full" : index === full && half ? "half" : "empty"}`}>
          ★
        </span>
      ))}
      <span className="cg-rate-num">{rating.toFixed(1)}</span>
    </div>
  );
};

export default function CookingGame({ onBack }: { onBack: () => void }) {
  const [recipe, setRecipe] = useState<Recipe>(RECIPES.find((item) => item.id === "acadex") || RECIPES[0]);
  const [displayCase, setDisplayCase] = useState<"projects" | "achievements" | "certificates">("projects");
  const [pot, setPot] = useState<Record<string, number>>({});
  const [cooking, setCooking] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dishReady, setDishReady] = useState(false);
  const [, setTick] = useState(0);
  const forceUpdate = () => setTick(t => t + 1);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const [cooked, setCooked] = useState<Set<string>>(new Set());
  const [mistakes, setMistakes] = useState(0);
  const [earnedStars, setEarnedStars] = useState<Record<string, number>>({});
  const [perfectCount, setPerfectCount] = useState(0);
  const [newAch, setNewAch] = useState<Achievement | null>(null);
  const [unlockedAch, setUnlockedAch] = useState<Set<string>>(new Set());
  const [dragged, setDragged] = useState<string | null>(null);
  const [overPot, setOverPot] = useState(false);
  const [flies, setFlies] = useState<{ id: number; x: number; y: number; label: string }[]>([]);
  const [cookPhase, setCookPhase] = useState("");
  const [musicOn, setMusicOn] = useState(false);
  const [started, setStarted] = useState(false);
  const timerRef = useRef<number | null>(null);
  const comboRef = useRef<number | null>(null);
  const sizzleRef = useRef<number | null>(null);
  const flyId = useRef(0);

  const cupsIn = (skill: string) => pot[skill] || 0;
  const cupsNeeded = (skill: string) => recipe.ingredients[skill] || 0;
  const isDone = (skill: string) => cupsIn(skill) >= cupsNeeded(skill);
  const allDone = Object.keys(recipe.ingredients).every((skill) => isDone(skill));
  const requiredTotal = Object.values(recipe.ingredients).reduce((sum, amount) => sum + amount, 0);
  const potTotal = Object.values(pot).reduce((sum, amount) => sum + amount, 0);
  const totalXP = RECIPES.filter((item) => cooked.has(item.id)).reduce((sum, item) => sum + item.xp, 0);
  const chefLevel = Math.floor(totalXP / 300) + 1;
  const currentStars = earnedStars[recipe.id] || 0;

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  }, []);

  const selectRecipe = useCallback(
    (nextRecipe: Recipe) => {
      sfxClick();
      setRecipe(nextRecipe);
      setDisplayCase("projects");
      setPot({});
      setCooking(false);
      setProgress(0);
      setDishReady(false);
      setMistakes(0);
      setCookPhase("");
      if (timerRef.current) clearInterval(timerRef.current);
      if (sizzleRef.current) clearInterval(sizzleRef.current);
    },
    []
  );

  const addCup = (skill: string, e?: MouseEvent) => {
    if (cooking) return;
    if (!recipe.ingredients[skill]) {
      sfxWrongIngredient();
      setMistakes((count) => count + 1);
      showToast(`${skill} is not in this recipe`);
      return;
    }
    if (isDone(skill)) return;

    sfxAddIngredient();
    setPot((current) => ({ ...current, [skill]: (current[skill] || 0) + 1 }));
    setCombo((current) => {
      sfxCombo(current + 1);
      return current + 1;
    });

    if (comboRef.current) clearTimeout(comboRef.current);
    comboRef.current = window.setTimeout(() => setCombo(0), 1500);

    if (e) {
      const id = ++flyId.current;
      setFlies((current) => [...current, { id, x: e.clientX, y: e.clientY, label: ico(skill) }]);
      setTimeout(() => setFlies((current) => current.filter((item) => item.id !== id)), 700);
    }
  };

  const checkAchievements = (ctx: AchCtx, previous: Set<string>) => {
    for (const achievement of ACHIEVEMENTS) {
      if (!previous.has(achievement.id) && achievement.check(ctx)) {
        previous.add(achievement.id);
        setNewAch(achievement);
        sfxAchievement();
        setTimeout(() => setNewAch(null), 3500);
        break;
      }
    }
    setUnlockedAch(new Set(previous));
  };

  const startCooking = () => {
    if (!allDone || cooking) return;

    sfxCookStart();
    setCooking(true);
    setProgress(0);
    setCookPhase(COOK_PHASES[0].label);
    sizzleRef.current = window.setInterval(() => sfxSizzle(), 1800);

    let nextProgress = 0;
    timerRef.current = window.setInterval(() => {
      nextProgress += 1;
      setProgress(nextProgress);
      const phase = getPhase(nextProgress);
      setCookPhase(`${phase.emoji} ${phase.label}`);

      if (nextProgress >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        if (sizzleRef.current) {
          clearInterval(sizzleRef.current);
          sizzleRef.current = null;
        }

        sfxDishComplete();
        const stars = Math.max(1, 5 - mistakes * 0.5);
        const isPerfect = stars === 5;
        const newPerfects = perfectCount + (isPerfect ? 1 : 0);
        const bonus = combo > 3 ? 50 : 0;
        const newCooked = new Set(cooked);
        newCooked.add(recipe.id);
        const newXP = RECIPES.filter((item) => newCooked.has(item.id)).reduce((sum, item) => sum + item.xp, 0) + bonus;

        setCooking(false);
        setDishReady(true);
        setCookPhase("");
        setCooked(newCooked);
        setEarnedStars((current) => ({ ...current, [recipe.id]: stars }));
        setScore((current) => current + recipe.xp + bonus);
        if (isPerfect) setPerfectCount(newPerfects);
        confetti();
        showToast(`Dish ready: +${recipe.xp + bonus} XP, ${stars} stars`);
        checkAchievements({ stars, cooked: newCooked, totalXP: newXP, perfectCount: newPerfects }, new Set(unlockedAch));
      }
    }, 55);
  };

  const handleToggleMusic = () => {
    const on = toggleBgMusic();
    setMusicOn(on);
  };

  useEffect(
    () => () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (sizzleRef.current) clearInterval(sizzleRef.current);
      stopBgMusic();
    },
    []
  );

  const potItems = Object.entries(pot).flatMap(([skill, amount]) => Array(Math.ceil(amount)).fill(skill));
  const particles = useRef(
    Array.from({ length: 18 }, (_, index) => ({
      symbol: PARTICLES[index % PARTICLES.length],
      left: Math.random() * 100,
      dur: 10 + Math.random() * 12,
      delay: Math.random() * 10,
    }))
  );

  if (!started) {
    return (
      <CookingGameCover
        onBegin={() => setStarted(true)}
        onBack={onBack}
        onNavigate={(section) => {
          if (["about", "projects", "certifications", "awards", "contact", "experience"].includes(section)) {
            onBack();
            setTimeout(() => {
              const el = document.getElementById(section);
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }, 150);
          } else {
            const selectedRecipe = RECIPES.find((item) => item.id === section);
            if (selectedRecipe) {
              setRecipe(selectedRecipe);
              setPot({});
              setProgress(0);
              setMistakes(0);
            }
            setDisplayCase("projects");
            setStarted(true);
          }
        }}
      />
    );
  }

  return (
    <div className="cg" style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", boxSizing: "border-box", paddingBottom: "10px" }}>
      <div className="cg-kitchen-bg" />
      
      {/* Parquet Floor Planks */}
      <div className="cg-kitchen-floor" aria-hidden="true" />

      {/* SOLID OAK KITCHEN COUNTERTOP - INTEGRATES WORKSPACE CODES */}
      <div className="cg-kitchen-counter" aria-hidden="true">
        {/* Retro Kettle */}
        <div className="cg-prop-kettle" title="Vintage tea kettle" />
        
        {/* Retro Toaster with popping toast */}
        <div className="cg-prop-toaster" title="Cozy toaster">
          <div className="toast" />
        </div>
        
        {/* Spice Canisters */}
        <div className="cg-prop-canisters" title="Spice canisters">
          <div className="cg-prop-canister" />
          <div className="cg-prop-canister" />
        </div>
        
        {/* Potted Herb Plant */}
        <div className="cg-prop-potted-herb" title="Fresh herb plant">
          <div className="leaves">
            <span className="leaf" />
            <span className="leaf" />
            <span className="leaf" />
          </div>
        </div>
      </div>

      <div className="cg-particles" aria-hidden="true">
        {particles.current.map((particle, index) => (
          <span
            key={index}
            className="cg-particle"
            style={{ left: `${particle.left}%`, animationDuration: `${particle.dur}s`, animationDelay: `${particle.delay}s` }}
          >
            {particle.symbol}
          </span>
        ))}
      </div>

      <div className="cg-topbar" style={{ margin: "0.2rem auto", width: "calc(100% - 2rem)" }}>
        <button className="cg-icon-button cg-portfolio-button" onClick={onBack} title="Back to portfolio" aria-label="Back to portfolio">
          <ArrowLeft size={18} />
          <span>Portfolio</span>
        </button>
        <div className="cg-chef-pill">
          <span className="cg-chef-hat">
            <ChefHat size={30} />
          </span>
          <span>
            <strong>Chef Nimra</strong>
            <small>Full Stack Developer</small>
          </span>
        </div>
        <button className="cg-icon-button cg-music-toggle" onClick={handleToggleMusic} title={musicOn ? "Mute music" : "Play music"} aria-label={musicOn ? "Mute music" : "Play music"}>
          {musicOn ? <Music2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      <header className="cg-wood-sign" style={{ transform: "scale(0.85)", margin: "-0.6rem auto 0.2rem" }}>
        <span className="cg-chain left" aria-hidden="true" />
        <span className="cg-chain right" aria-hidden="true" />
        <h1>NIMRA'S</h1>
        <p>KITCHEN PORTFOLIO</p>
        <small>Cook • Create • Innovate</small>
      </header>

      <main className="cg-layout" style={{ height: "calc(100vh - 7rem)", overflow: "hidden", margin: "0 auto", boxSizing: "border-box" }}>
        
        {/* Left Column: Cozy Recipe Book Stand */}
        <aside className="cg-left-bookstand" style={{ height: "100%", justifyContent: "center" }}>
          <div className="cgc-menu-book-stand" style={{ padding: "0.3rem" }}>
            <div className="cgc-menu-book" style={{ minHeight: "13rem" }}>
              {/* Left Page */}
              <div className="cgc-book-page left-page" style={{ padding: "0.8rem 0.5rem" }}>
                <div className="cgc-page-title">
                  <h4 style={{ fontSize: "0.95rem", color: "#6d3516" }}>Recipe</h4>
                  <h4 style={{ fontSize: "0.95rem", color: "#6d3516" }}>Book</h4>
                </div>
                <div className="cgc-heart-divider" style={{ fontSize: "0.9rem" }}>♥</div>
                <div className="cgc-doodle-pot" style={{ marginTop: "0.5rem", width: "2.8rem" }}>
                  <span className="steam" />
                  <div className="pot-body" style={{ height: "1.5rem" }} />
                </div>
                <small style={{ fontSize: "0.58rem", marginTop: "0.6rem", color: "#a56d4b", textAlign: "center", fontWeight: "bold", display: "block", lineHeight: "1.2" }}>
                  Select a project to load its recipe!
                </small>
              </div>
              
              {/* Book Spine Rings */}
              <div className="cgc-book-spine" style={{ padding: "0.8rem 0" }}>
                <span className="ring" style={{ width: "8px", height: "8px" }} />
                <span className="ring" style={{ width: "8px", height: "8px" }} />
                <span className="ring" style={{ width: "8px", height: "8px" }} />
                <span className="ring" style={{ width: "8px", height: "8px" }} />
              </div>
              
              {/* Right Page: Recipes List */}
              <div className="cgc-book-page right-page" style={{ padding: "0.5rem 0.4rem" }}>
                <nav className="cgc-menu-nav" style={{ gap: "3px" }}>
                  {RECIPES.map((item) => (
                    <button
                      key={item.id}
                      className={`cgc-menu-nav-item ${recipe.id === item.id ? "active" : ""}`}
                      style={{ 
                        padding: "0.25rem 0.4rem", 
                        background: recipe.id === item.id ? "#ffe6bd" : "#fff9ec",
                        borderColor: recipe.id === item.id ? "#d99f6b" : "transparent",
                        width: "100%",
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        borderRadius: "0.25rem"
                      }}
                      onClick={() => {
                        sfxClick();
                        selectRecipe(item);
                      }}
                    >
                      <span className="icon" style={{ marginRight: "3px", fontSize: "0.65rem" }}>{cooked.has(item.id) ? "🍲" : "🍳"}</span>
                      <span className="text" style={{ fontSize: "0.66rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {item.name}
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </aside>

        {/* Center Column: Wall Spice Shelf & Cooking Stove/Pot */}
        <section className="cg-cookspace" style={{ height: "100%", justifyContent: "center", padding: 0 }}>
          <div className="cg-window-scene" aria-hidden="true">
            <span className="cg-window" />
            <span className="cg-curtain left" />
            <span className="cg-curtain right" />
            
            {/* Hanging wood rail pegs for tools */}
            <div className="cg-tool-rail">
              <span className="peg"><span className="tool ladle">🥄</span></span>
              <span className="peg"><span className="tool whisk">🧪</span></span>
              <span className="peg"><span className="tool spatula">🍳</span></span>
              <span className="peg"><span className="tool rolling-pin">🥖</span></span>
            </div>

            {/* Decorative Shelf with plant and coffee mugs */}
            <div className="cg-deco-shelf">
              <span className="pot-plant">🪴</span>
              <span className="mug pink">☕</span>
              <span className="mug yellow">☕</span>
            </div>
          </div>

          {/* WALL SPICE SHELVES - TECH JAR INGREDIENTS */}
          <div className="cg-wall-shelves-container" style={{ padding: "0.5rem 0.8rem", marginBottom: "0.4rem" }}>
            <div className="cg-wall-shelves-title" style={{ marginBottom: "0.3rem" }}>
              <span style={{ fontSize: "1rem" }}>Kitchen Pantry</span>
              <small style={{ fontSize: "0.62rem" }}>(Tap jars to add tech skills to the pot)</small>
            </div>
            <div className="cg-shelves" style={{ marginTop: "0.3rem", gap: "0.3rem" }}>
              {shelfRows.map((row, rowIndex) => (
                <div className="cg-shelf-row" style={{ display: "flex", justifyContent: "center", gap: "0.3rem", padding: "0.1rem 0.1rem 0.4rem" }} key={rowIndex}>
                  {row.map((skill) => {
                    const meta = SKILL_META[skill] || { cap: "#c98244", label: "#fff6e8", icon: ico(skill) };
                    const needed = Boolean(recipe.ingredients[skill]);
                    const done = needed && isDone(skill);
                    const cups = cupsIn(skill);
                    const style = { "--jar-cap": meta.cap, "--jar-label": meta.label } as CSSProperties;

                    return (
                      <button
                        key={skill}
                        className={`cg-jar ${needed && !done ? "needed" : ""} ${done ? "done" : ""}`}
                        draggable={needed && !done && !cooking}
                        onDragStart={() => setDragged(skill)}
                        onDragEnd={() => {
                          setDragged(null);
                          setOverPot(false);
                        }}
                        onClick={(event) => addCup(skill, event)}
                        title={needed ? `Need ${cupsNeeded(skill)} cup(s). Added ${cups}.` : "Not needed for this recipe"}
                        style={{
                          ...style,
                          minHeight: "3.8rem"
                        }}
                      >
                        {needed && cups > 0 && <span className="cg-jar-counter" style={{ width: "1rem", height: "1rem", fontSize: "0.58rem" }}>{cups}</span>}
                        <span className="cg-jar-cap" style={{ width: "2.4rem", height: "0.45rem", border: "1px solid rgba(83, 40, 18, 0.5)" }} aria-hidden="true" />
                        <span className="cg-jar-glass" style={{ width: "2.2rem", minHeight: "2.9rem", padding: "0.25rem 0.1rem 0.15rem", border: "1px solid rgba(99, 58, 33, 0.4)" }}>
                          <span className="cg-jar-label" style={{ minWidth: "1.3rem", maxHeight: "0.75rem", fontSize: "0.48rem", padding: "1px" }}>{meta.icon}</span>
                          <span className="cg-jar-name" style={{ fontSize: "0.48rem", marginTop: "0.1rem" }}>{SKILL_META[skill]?.ingredient || skill}</span>
                          <span className="cg-jar-amt" style={{ fontSize: "0.45rem", marginTop: "0.05rem" }}>{needed ? `${cupsNeeded(skill)} cup` : "pantry"}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* POT AND STOVE COOK STAGE */}
          <div className="cg-pot-stage" style={{ marginTop: "0.2rem", transform: "scale(0.85)", height: "8.5rem", marginBottom: "-0.6rem" }}>
            <span className="cg-dashed-path left" aria-hidden="true" />
            <span className="cg-dashed-path right" aria-hidden="true" />
            <div className={`cg-steam ${cooking ? "on" : potItems.length > 0 ? "warm" : ""}`} aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <div
              className={`cg-pot ${cooking ? "cooking" : ""}`}
              style={{ width: "14rem", height: "8.2rem", border: "0.25rem solid #8e2f36" }}
              onDragOver={(event) => {
                event.preventDefault();
                setOverPot(true);
              }}
              onDragLeave={() => setOverPot(false)}
              onDrop={(event) => {
                event.preventDefault();
                setOverPot(false);
                if (dragged) {
                  addCup(dragged);
                  setDragged(null);
                }
              }}
            >
              <div className={`cg-pot-zone ${overPot ? "over" : ""}`} />
              <div className="cg-soup-surface" style={{ left: "0.9rem", right: "0.9rem", top: "0.9rem", height: "2.6rem" }}>
                {potItems.length === 0 ? (
                  <span className="cg-pot-heart" style={{ fontSize: "2rem" }}>♥</span>
                ) : (
                  <div className={cooking ? "cg-pot-mixing-items" : "cg-pot-items"}>
                    {potItems.map((skill, index) => (
                      <span key={`${skill}-${index}`} className={cooking ? "cg-pot-mixing-item" : "cg-pot-item"}>
                        {ico(skill)}
                      </span>
                    ))}
                  </div>
                )}
                {cooking && (
                  <div className="cg-bubbles" aria-hidden="true">
                    <span />
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
              {cooking && <div className="cg-cook-phase" style={{ fontSize: "0.65rem", bottom: "0.8rem" }}>{cookPhase}</div>}
              {cooking && <div className="cg-mixing-spoon" style={{ height: "4.8rem", top: "-1.2rem" }} aria-hidden="true" />}
            </div>
          </div>

          <div className="cg-stove-body" style={{ width: "23rem", height: "5.5rem", marginTop: "-1.5rem" }}>
            <div className="cg-stove-top" style={{ height: "2.9rem" }}>
              <span className="cg-burner left" style={{ width: "3.4rem", height: "0.8rem", left: "2.2rem" }} />
              <span className="cg-burner active" style={{ width: "3.4rem", height: "0.8rem" }} />
              <span className="cg-burner right" style={{ width: "3.4rem", height: "0.8rem", right: "2.2rem" }} />
              <div className={`cg-flames ${cooking ? "on" : allDone ? "ready" : ""}`} aria-hidden="true">
                {Array.from({ length: 7 }, (_, index) => (
                  <span key={index} />
                ))}
              </div>
            </div>
            <div className="cg-stove-front" style={{ height: "2.2rem" }}>
              <span className={`cg-stove-knob ${cooking ? "on" : ""}`} style={{ width: "1.1rem", height: "1.1rem" }} />
              <span className="cg-stove-knob" style={{ width: "1.1rem", height: "1.1rem" }} />
              <span className="cg-stove-knob" style={{ width: "1.1rem", height: "1.1rem" }} />
              <span className="cg-stove-slot" />
            </div>
          </div>

        </section>

        {/* Right Column: Easel Board Active Recipe Display */}
        <aside className="cg-right-easel" style={{ height: "100%", justifyContent: "center" }}>
          <div className="cgc-easel-board" style={{ width: "100%", height: "auto", minHeight: "22rem" }}>
            <div className="cgc-easel-legs">
              <span className="leg left" style={{ height: "4.5rem", bottom: "-0.6rem" }} />
              <span className="leg center" style={{ height: "5.5rem", bottom: "-1rem" }} />
              <span className="leg right" style={{ height: "4.5rem", bottom: "-0.6rem" }} />
            </div>
            
            <div className="cgc-blackboard" style={{ position: "relative", height: "100%", width: "100%", padding: "0.8rem 0.6rem", display: "flex", flexDirection: "column", justifyContent: "space-between", gap: "0.4rem", boxSizing: "border-box" }}>
              <div className="cg-chalk-header" style={{ textAlign: "center", width: "100%" }}>
                <span className="cg-recipe-badge" style={{ display: "inline-block", background: "#f472b6", border: "1px solid #8e2f36", borderRadius: "999px", padding: "1px 8px", fontSize: "0.58rem", fontWeight: "bold", color: "#fff" }}>{recipe.type}</span>
                <h2 style={{ fontSize: "1.1rem", color: "#ffdcb5", margin: "2px 0 0", fontWeight: "900", lineHeight: "1.15" }}>{recipe.name}</h2>
                {currentStars > 0 && <StarRating rating={currentStars} />}
              </div>
              
              {cooked.has(recipe.id) && !cooking ? (
                /* Plated Cooked Dish View */
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", width: "100%", marginTop: "0.3rem", flex: 1 }}>
                  <span style={{ fontSize: "1.5rem" }}>🍲</span>
                  <span style={{ fontSize: "0.72rem", textTransform: "uppercase", color: "#6ebc59", fontWeight: "900" }}>Dish Plated Successfully!</span>
                  <div style={{ fontSize: "0.65rem", color: "#f7eed8", opacity: "0.85", textAlign: "center", lineHeight: "1.3", maxHeight: "4.5rem", overflowY: "auto" }}>
                    {recipe.desc}
                  </div>
                  
                  <div className="cg-dish-actions" style={{ display: "flex", flexDirection: "column", gap: "0.3rem", width: "100%", marginTop: "auto" }}>
                    {recipe.live && (
                      <a href={recipe.live} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "0.35rem 0.6rem", background: "#ec4899", border: "1.5px solid #9f3c50", borderRadius: "999px", color: "#fff", textDecoration: "none", fontSize: "0.7rem", fontWeight: "bold" }}>
                        <ExternalLink size={11} />
                        <span>View Live Demo</span>
                      </a>
                    )}
                    {recipe.github && (
                      <a href={recipe.github} target="_blank" rel="noopener noreferrer" className="outline" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: "4px", padding: "0.35rem 0.6rem", background: "transparent", border: "1.5px solid #fffbef", borderRadius: "999px", color: "#fffbef", textDecoration: "none", fontSize: "0.7rem", fontWeight: "bold" }}>
                        <Code2 size={11} />
                        <span>GitHub Repository</span>
                      </a>
                    )}
                    <button 
                      onClick={() => {
                        sfxClick();
                        setPot({});
                        setProgress(0);
                        // Temporarily reset cooked status in UI state to let them cook again if they want!
                        cooked.delete(recipe.id);
                        forceUpdate();
                      }}
                      style={{ background: "transparent", border: "none", color: "#ffe6b4", fontSize: "0.62rem", textDecoration: "underline", cursor: "pointer", fontWeight: "bold", marginTop: "2px" }}
                    >
                      Cook Recipe Again
                    </button>
                  </div>
                </div>
              ) : (
                /* Uncooked / Active Prep View */
                <>
                  <div className="cg-chalk-desc" style={{ fontSize: "0.66rem", color: "#f7eed8", opacity: "0.9", lineHeight: "1.25", textAlign: "center", borderBottom: "1px dashed rgba(255,255,255,0.15)", paddingBottom: "4px", width: "100%" }}>
                    {recipe.desc}
                  </div>

                  {/* Required tech specs checklist */}
                  <div className="cg-chalk-specs" style={{ width: "100%" }}>
                    <h3 style={{ fontSize: "0.68rem", textTransform: "uppercase", color: "#ffe6b4", margin: "0 0 3px", fontWeight: "bold", textAlign: "center" }}>Required Tech</h3>
                    <ul style={{ listStyle: "none", margin: "0", padding: "0", display: "flex", flexDirection: "column", gap: "3px" }}>
                      {Object.entries(recipe.ingredients).map(([skill, amount]) => {
                        const current = cupsIn(skill);
                        const full = current >= amount;

                        return (
                          <li key={skill} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "0.65rem", color: full ? "#6ebc59" : current > 0 ? "#ffd65c" : "#fff", opacity: full ? "0.85" : "1", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "1px" }}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: "3px" }}>
                              <span>{ico(skill)}</span>
                              <span>{SKILL_META[skill]?.ingredient || skill}</span>
                            </span>
                            <strong>{current} / {amount} cup</strong>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Cook button integrated right onto easel! */}
                  <div style={{ width: "100%", marginTop: "auto", paddingTop: "4px" }}>
                    {!cooking && allDone ? (
                      <button className="cgc-begin-btn cg-easel-cook-btn ready" onClick={startCooking} style={{ width: "100%", height: "2.2rem" }}>
                        <span>COOK IT!</span>
                      </button>
                    ) : (
                      <button className="cgc-begin-btn cg-easel-cook-btn" disabled style={{ width: "100%", height: "2.2rem", opacity: "0.5", filter: "saturate(0.5)" }}>
                        <span>{cooking ? cookPhase : `ADD CUPS (${potTotal}/${requiredTotal})`}</span>
                      </button>
                    )}

                    {/* Progress bar integrated on easel! */}
                    {(cooking || progress > 0) && (
                      <div className="cg-prog" style={{ width: "100%", background: "transparent", boxShadow: "none", padding: "4px 0 0", minHeight: "0" }}>
                        <div className="cg-prog-row" style={{ color: "#fff", fontSize: "0.58rem" }}>
                          <span>{cooking ? cookPhase : "Cooking Done"}</span>
                          <span>{progress}%</span>
                        </div>
                        <div className="cg-prog-bar" style={{ height: "0.4rem", marginTop: "1px" }}>
                          <div className="cg-prog-fill" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </aside>

      </main>

      {flies.map((item) => (
        <div key={item.id} className="cg-fly" style={{ left: item.x, top: item.y }}>
          {item.label}
        </div>
      ))}

      {toast && <div className="cg-toast">{toast}</div>}

      {dishReady && (
        <div className="cg-reveal" onClick={() => setDishReady(false)}>
          <div className="cg-dish" onClick={(event) => event.stopPropagation()}>
            <button className="cg-dish-close" onClick={() => setDishReady(false)} aria-label="Close dish reveal">
              ×
            </button>
            <span className="cg-dish-badge">{currentStars === 5 ? "Perfect Dish!" : "Dish Is Ready!"}</span>
            <h2>{recipe.name}</h2>
            <StarRating rating={currentStars} />
            {mistakes > 0 && <div className="cg-dish-mistakes">{mistakes} wrong ingredient{mistakes > 1 ? "s" : ""} added</div>}
            <div className="cg-dish-xp">+{recipe.xp} XP earned</div>
            <p>{recipe.desc}</p>
            <div className="cg-dish-tags">
              {Object.keys(recipe.ingredients).map((tag) => (
                <span key={tag}>
                  {ico(tag)} {SKILL_META[tag]?.ingredient || tag}
                </span>
              ))}
            </div>
            <div className="cg-dish-links">
              {recipe.live && (
                <a href={recipe.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={16} />
                  <span>Live Demo</span>
                </a>
              )}
              {recipe.github && (
                <a href={recipe.github} target="_blank" rel="noopener noreferrer" className="outline">
                  <Code2 size={16} />
                  <span>GitHub</span>
                </a>
              )}
              <button
                onClick={() => {
                  setDishReady(false);
                  setPot({});
                  setProgress(0);
                  setMistakes(0);
                }}
              >
                <ChefHat size={16} />
                <span>Cook Another</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {newAch && (
        <div className="cg-ach-popup">
          <Trophy size={34} />
          <div>
            <div className="cg-ach-title">Achievement Unlocked</div>
            <div className="cg-ach-name">{newAch.title}</div>
            <div className="cg-ach-desc">{newAch.desc}</div>
          </div>
        </div>
      )}
    </div>
  );
}
