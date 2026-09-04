import { useState, useEffect, useRef } from "react";
import { 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Award, 
  Terminal, 
  CheckCircle2, 
  XCircle, 
  HelpCircle,
  Play,
  RotateCcw,
  GraduationCap
} from "lucide-react";
import "../css/EducationCampus.css";
import { certificates, achievements } from "../data.js";


// ==========================================
// 🎵 WEB AUDIO SYNTHESIZER SOUND ENGINE
// ==========================================
let audioCtx: AudioContext | null = null;
let ambientOsc1: OscillatorNode | null = null;
let ambientOsc2: OscillatorNode | null = null;
let ambientFilter: BiquadFilterNode | null = null;
let ambientGain: GainNode | null = null;

const initAudioEngine = () => {
  if (audioCtx) return;
  const AC = window.AudioContext || (window as any).webkitAudioContext;
  audioCtx = new AC();

  ambientGain = audioCtx.createGain();
  ambientGain.gain.setValueAtTime(0.06, audioCtx.currentTime);

  ambientFilter = audioCtx.createBiquadFilter();
  ambientFilter.type = "lowpass";
  ambientFilter.frequency.setValueAtTime(350, audioCtx.currentTime);

  ambientGain.connect(ambientFilter);
  ambientFilter.connect(audioCtx.destination);
  
  startAmbientLoop("school");
};

const stopAudioEngine = () => {
  if (ambientOsc1) { try { ambientOsc1.stop(); } catch(e){} ambientOsc1 = null; }
  if (ambientOsc2) { try { ambientOsc2.stop(); } catch(e){} ambientOsc2 = null; }
  if (audioCtx) { try { audioCtx.close(); } catch(e){} audioCtx = null; }
};

const startAmbientLoop = (theme: "school" | "univ") => {
  if (!audioCtx) return;
  
  if (ambientOsc1) { try { ambientOsc1.stop(); } catch(e){} }
  if (ambientOsc2) { try { ambientOsc2.stop(); } catch(e){} }

  ambientOsc1 = audioCtx.createOscillator();
  ambientOsc2 = audioCtx.createOscillator();

  if (theme === "school") {
    // Cozy warm academic minor chord (nostalgic)
    ambientOsc1.type = "triangle";
    ambientOsc1.frequency.setValueAtTime(146.83, audioCtx.currentTime); // D3
    ambientOsc2.type = "sine";
    ambientOsc2.frequency.setValueAtTime(174.61, audioCtx.currentTime); // F3
    if (ambientFilter) ambientFilter.frequency.setValueAtTime(350, audioCtx.currentTime);
  } else {
    // Modern sleek clean electronic fifths (productive)
    ambientOsc1.type = "sine";
    ambientOsc1.frequency.setValueAtTime(261.63, audioCtx.currentTime); // C4
    ambientOsc2.type = "triangle";
    ambientOsc2.frequency.setValueAtTime(392.00, audioCtx.currentTime); // G4
    if (ambientFilter) ambientFilter.frequency.setValueAtTime(700, audioCtx.currentTime);
  }

  if (ambientGain) {
    ambientOsc1.connect(ambientGain);
    ambientOsc2.connect(ambientGain);
  }

  ambientOsc1.start();
  ambientOsc2.start();
};

const playSFX = (type: string) => {
  if (!audioCtx || audioCtx.state === "suspended") return;
  const now = audioCtx.currentTime;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  if (type === "correct") {
    // Beautiful correct high pitch chiming chord
    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(1046.50, now + 0.35); // C6
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.35);
  } else if (type === "incorrect") {
    // Flat low buzzy sound
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(120, now);
    osc.frequency.linearRampToValueAtTime(80, now + 0.25);
    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.25);
  } else if (type === "click") {
    // Clean mechanical typewriter/arcade click
    osc.type = "sine";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.08);
  } else if (type === "sweep") {
    // Smooth riser/sweep sound for university transition
    osc.type = "sine";
    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 1.2);
    gain.gain.setValueAtTime(0.06, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 1.2);
  } else if (type === "fanfare") {
    // Bright celebratory academic triad
    [261.63, 329.63, 392.00, 523.25].forEach((freq, idx) => {
      setTimeout(() => {
        if (!audioCtx) return;
        const o = audioCtx.createOscillator();
        const g = audioCtx.createGain();
        o.type = "sine";
        o.frequency.setValueAtTime(freq, audioCtx.currentTime);
        g.gain.setValueAtTime(0.07, audioCtx.currentTime);
        g.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
        o.connect(g);
        g.connect(audioCtx.destination);
        o.start();
        o.stop(audioCtx.currentTime + 0.8);
      }, idx * 120);
    });
  }
};

// ==========================================
// 🗺️ CAMPUS GEOGRAPHY DATA SYSTEMS
// ==========================================
interface SchoolLocation {
  id: string;
  name: string;
  task: string;
  emoji: string;
  top: string;
  left: string;
  color: string;
  badge: string;
  badgeEmoji: string;
  description: string;
  instructions: string;
}

const SCHOOL_LOCATIONS: SchoolLocation[] = [
  {
    id: "classroom",
    name: "Classroom Block",
    task: "Solve Equations",
    emoji: "🏫",
    top: "18%",
    left: "18%",
    color: "#b71c1c",
    badge: "Logic Prodigy",
    badgeEmoji: "🧠",
    description: "Welcome to the school classroom block. Equations animate directly on the cozy glowing blackboard. Training core logical and mathematical models powers all engineering solutions.",
    instructions: "Look at the balanced equation on the chalkboard. Click the correct value or missing operator card that logically fits the expression."
  },
  {
    id: "artroom",
    name: "Art Room",
    task: "Arrange Gradients",
    emoji: "🎨",
    top: "15%",
    left: "58%",
    color: "#ff8f00",
    badge: "Creative Visionary",
    badgeEmoji: "✨",
    description: "Step into the Art Room, layered with glowing sketchbooks, paint jars, and warm lights. Designers match color transitions and gradients to achieve premium visual styles.",
    instructions: "A series of red/orange gradient color blocks are scrambled. Click two color boxes to swap them. Sort them from darkest shade to lightest shade to win!"
  },
  {
    id: "playground",
    name: "Playground",
    emoji: "⚽",
    task: "Catch Rhythm Balls",
    top: "60%",
    left: "15%",
    color: "#2e7d32",
    badge: "Star Athlete",
    badgeEmoji: "🏆",
    description: "The sunset filters beautifully over the grassy playground paths. Energetic timing exercises develop precise coordination and high speed processing.",
    instructions: "A soccer ball moves along the path. Press the 'CATCH' button or your spacebar exactly when the ball aligns with the glowing dash circle in the center!"
  },
  {
    id: "stadium",
    name: "Indoor Stadium",
    task: "Precision Reflex Stop",
    emoji: "🏟️",
    top: "58%",
    left: "48%",
    color: "#1565c0",
    badge: "Stadium Champion",
    badgeEmoji: "⚡",
    description: "Under high stadium lights and cheering echo, sports speed training begins. Perfect reaction time and absolute focus unlock maximum performance awards.",
    instructions: "The needle is sweeping back and forth on the indicator. Click the 'STOP' button precisely when the needle hits the neon green critical zone in the middle."
  },
  {
    id: "library",
    name: "School Library",
    task: "Library Riddles",
    emoji: "📚",
    top: "36%",
    left: "35%",
    color: "#4e342e",
    badge: "Scholar of Secrets",
    badgeEmoji: "📖",
    description: "A cozy academia sanctuary with rainy windows, moving ladders, and glowing bookshelves. Exploring books unlocks mysterious hidden technical categories.",
    instructions: "Read the cryptic subject riddle shown in the notebook. Drag your cursor or select the book spine from the shelf that accurately represents that study field."
  },
  {
    id: "laboratory",
    name: "Laboratory",
    task: "Synthesize Serum",
    emoji: "🔬",
    top: "40%",
    left: "75%",
    color: "#00695c",
    badge: "Alchemist of Code",
    badgeEmoji: "🧪",
    description: "Bubbling flasks, test tubes, and chemical reactions fill the lab bench. Activating chemical elements in sequences synthesizes our ambition serum.",
    instructions: "Observe the mixing sequence recipe shown in the prompt. Click the bubbling color flasks in the exact ordered sequence to compile the mixture successfully."
  }
];

interface UnivLocation {
  id: string;
  name: string;
  task: string;
  emoji: string;
  top: string;
  left: string;
  color: string;
  certification: string;
  certEmoji: string;
  description: string;
  instructions: string;
}

const UNIV_LOCATIONS: UnivLocation[] = [
  {
    id: "ailab",
    name: "AI Lab",
    task: "Connect Neural Layers",
    emoji: "🧠",
    top: "20%",
    left: "20%",
    color: "#0284c7",
    certification: "Microsoft AI Specialist",
    certEmoji: "🤖",
    description: "Step into the futuristic Artificial Intelligence Lab. Compute server screens display model topologies. Map neural architectures to deep intelligence workflows.",
    instructions: "Map the system inputs on the left column to the correct neural networks / models on the right column by clicking one from each side to connect them."
  },
  {
    id: "dsalab",
    name: "DSA Lab",
    task: "Tree Sorting Node Clicker",
    emoji: "💻",
    top: "16%",
    left: "58%",
    color: "#06b6d4",
    certification: "NIT algorithms Scholar",
    certEmoji: "🌳",
    description: "The central engineering setup is filled with heaps and trees. Restructure code systems, manage memory, and sort database search structures.",
    instructions: "A series of database tree nodes with random values are generated. Click the circular nodes in strictly ascending numerical order to balance the structure."
  },
  {
    id: "codingclass",
    name: "Coding Classroom",
    task: "Supabase Syntax Debugger",
    emoji: "⌨️",
    top: "68%",
    left: "15%",
    color: "#3b82f6",
    certification: "Full-Stack Web Architect",
    certEmoji: "⚡",
    description: "Pristine white classroom block equipped with coding terminals. Debug full-stack React portals, resolve query glitches, and secure databases.",
    instructions: "A React or SQL query snippet is rendered in the compiler with a syntax mistake. Read the code and select the card containing the correct fix."
  },
  {
    id: "researchlib",
    name: "Research Library",
    task: "Query Search Index",
    emoji: "☕",
    top: "40%",
    left: "35%",
    color: "#64748b",
    certification: "Information Architect",
    certEmoji: "📑",
    description: "A sleek modern study-cafe hybrid environment. Query massive technical knowledge bases, index references, and explore RAG document pipelines.",
    instructions: "The system asks for a target database search pattern. Click the correct SQL or GraphQL query syntax among the choices to retrieve the data."
  },
  {
    id: "innovation",
    name: "Innovation Hub",
    task: "Milestone Launch Sequence",
    emoji: "🚀",
    top: "45%",
    left: "75%",
    color: "#0f766e",
    certification: "SynerTech Innovation Award",
    certEmoji: "🥇",
    description: "The Presentation Hall and launching studio. Assemble final project workflows, compile pipelines, and pitch full-scale software deployments.",
    instructions: "Four project milestones are displayed in a scrambled order. Click them in the correct chronological development sequence to launch the platform!"
  }
];

// ==========================================
// 🎮 REACT CORE VIEW COMPONENT
// ==========================================
export default function EducationCampus({ onBack }: { onBack: () => void }) {
  // Phase Routing
  const [phase, setPhase] = useState<
    "entrance" | "school_map" | "school_game" | "school_report" | "transitioning" | "univ_map" | "univ_game" | "univ_transcript" | "graduated"
  >("entrance");

  // Game state
  const [musicOn, setMusicOn] = useState(false);
  const [points, setPoints] = useState(0);
  const [xp, setXp] = useState(0);
  const [stars, setStars] = useState(0);
  
  const [earnedBadges, setEarnedBadges] = useState<string[]>([]);
  const [earnedCerts, setEarnedCerts] = useState<string[]>([]);

  const [schoolCompleted, setSchoolCompleted] = useState<Record<string, boolean>>({});
  const [univCompleted, setUnivCompleted] = useState<Record<string, boolean>>({});

  const [activeSchoolLoc, setActiveSchoolLoc] = useState<SchoolLocation | null>(null);
  const [activeUnivLoc, setActiveUnivLoc] = useState<UnivLocation | null>(null);

  // Success states
  const [gameSuccess, setGameSuccess] = useState(false);
  const [successPointsAwarded, setSuccessPointsAwarded] = useState(0);
  const [successBadgeAwarded, setSuccessBadgeAwarded] = useState("");
  const [successBadgeEmoji, setSuccessBadgeEmoji] = useState("");

  // Transition gate
  const [gateOpen, setGateOpen] = useState(true);

  // Custom visual particles
  const [particles, setParticles] = useState<any[]>([]);

  // Incorrect attempt popups
  const [incorrectFlash, setIncorrectFlash] = useState<string | null>(null);

  // Permanent Report Card scores (representing hits out of 5)
  const [classroomScore, setClassroomScore] = useState(0);
  const [artroomScore, setArtroomScore] = useState(0);
  const [playgroundScore, setPlaygroundScore] = useState(0);
  const [stadiumScore, setStadiumScore] = useState(0);
  const [libraryScore, setLibraryScore] = useState(0);
  const [laboratoryScore, setLaboratoryScore] = useState(0);

  // Permanent University Scores (representing hits out of 5)
  const [ailabScore, setAilabScore] = useState(0);
  const [dsalabScore, setDsalabScore] = useState(0);
  const [codingclassScore, setCodingclassScore] = useState(0);
  const [researchlibScore, setResearchlibScore] = useState(0);
  const [innovationScore, setInnovationScore] = useState(0);

  // Classroom Quiz
  const [classroomQuestionIndex, setClassroomQuestionIndex] = useState(0);
  const [classroomCorrectCount, setClassroomCorrectCount] = useState(0);

  // Playground (football grounds) attempts
  const [playgroundAttempts, setPlaygroundAttempts] = useState(0);
  const [footballSnapped, setFootballSnapped] = useState(false);
  const [footballMissed, setFootballMissed] = useState(false);

  // Indoor Stadium (basketball shot challenge)
  const [stadiumAttempts, setStadiumAttempts] = useState(0);
  const [stadiumHits, setStadiumHits] = useState(0);
  const [stadiumNeedlePos, setStadiumNeedlePos] = useState(0);
  const stadiumInterval = useRef<any>(null);

  const [artroomAttempts, setArtroomAttempts] = useState(0);

  // Library Riddles (School)
  const [libraryQuestionIndex, setLibraryQuestionIndex] = useState(0);
  const [libraryHits, setLibraryHits] = useState(0);
  const [libraryAttempts, setLibraryAttempts] = useState(0);

  // Chemical Synthesizer (School)
  const [labQuestionIndex, setLabQuestionIndex] = useState(0);
  const [labHits, setLabHits] = useState(0);
  const [labAttempts, setLabAttempts] = useState(0);
  const [labTargetChemical, setLabTargetChemical] = useState("");

  // University Coding Classroom Debugger
  const [codingQuestionIndex, setCodingQuestionIndex] = useState(0);
  const [codingCorrectCount, setCodingCorrectCount] = useState(0);

  // University Research Catalog Queries
  const [researchQuestionIndex, setResearchQuestionIndex] = useState(0);
  const [researchCorrectCount, setResearchCorrectCount] = useState(0);

  // University DSA node click mistakes tracking
  const [dsaMistakes, setDsaMistakes] = useState(0);

  // University Innovation Hub milestones sorting mistakes tracking
  const [innovationMistakes, setInnovationMistakes] = useState(0);

  // Cinematic Performance Result Screen overlay state
  const [currentResult, setCurrentResult] = useState<{
    activityName: string;
    emoji: string;
    scoreText: string;
    marks: number;
    stars: number;
    grade: string;
    xpGained: number;
    performance: string;
    badgeName: string;
    badgeEmoji: string;
    isUniv?: boolean;
    locationId: string;
  } | null>(null);

  // Certificate viewer overlay state
  const [selectedCertForView, setSelectedCertForView] = useState<any | null>(null);

  // ----------------------------------------
  // ACTIVE MINI-GAMES STATE ENGINE
  // ----------------------------------------

  // Math Chalkboard (School)
  const [chalkQuestion, setChalkQuestion] = useState({ expression: "", answer: 0, options: [0] });
  
  // Color Gradient (School)
  const [scrambledColors, setScrambledColors] = useState<{ id: number; color: string; order: number }[]>([]);
  const [selectedColorIdx, setSelectedColorIdx] = useState<number | null>(null);
  const correctColorOrder = ["#3e1212", "#b71c1c", "#e53935", "#ff8a80", "#ffebee"];

  // Rhythm Catch (School)
  const [rhythmBallPos, setRhythmBallPos] = useState(0);
  const [rhythmHits, setRhythmHits] = useState(0);
  const rhythmInterval = useRef<any>(null);

  // Reflex Sweep (School)
  const [reflexVal, setReflexVal] = useState(0);
  const [reflexHits, setReflexHits] = useState(0);
  const reflexInterval = useRef<any>(null);

  // Library Riddles (School)
  const [libRiddle, setLibRiddle] = useState({ question: "", answer: "" });
  const libraryOptions = ["Mathematics", "Physics", "Computer Science", "Chemistry", "Biology", "Astrophysics"];

  // Chemical Synthesizer (School)
  const [labTargetSeq, setLabTargetSeq] = useState<string[]>([]);
  const [labCurrentSeq, setLabCurrentSeq] = useState<string[]>([]);
  const labChemicals = [
    { name: "Hydrogen", color: "#e53935" },
    { name: "Oxygen", color: "#29b6f6" },
    { name: "Nitrogen", color: "#66bb6a" }
  ];

  // AI Net Linker (University)
  const [selectedAiInput, setSelectedAiInput] = useState<string | null>(null);
  const [selectedAiModel, setSelectedAiModel] = useState<string | null>(null);
  const [aiMatches, setAiMatches] = useState<Record<string, string>>({});
  const [aiMistakes, setAiMistakes] = useState(0);
  const aiLinks = [
    { input: "Scan Image Data", model: "CNN Pipeline" },
    { input: "Synthesize Voice", model: "RNN WaveNet" },
    { input: "Predict House Rent", model: "Linear Regression" },
    { input: "Translate Sentence", model: "Transformer NLP" },
    { input: "Cluster Customers", model: "K-Means Layer" }
  ];

  // DSA tree node bubble sort (University)
  const [dsaNodes, setDsaNodes] = useState<{ id: number; value: number; sorted: boolean }[]>([]);
  const [dsaExpectedIndex, setDsaExpectedIndex] = useState(0);

  // Coding debug cards (University)
  const [debugSnippet, setDebugSnippet] = useState({ code: "", options: [""], answer: "" });

  // Research Query index (University)
  const [researchQuery, setResearchQuery] = useState({ target: "", options: [""], answer: "" });

  // Innovation milestones slide (University)
  const [scrambledMilestones, setScrambledMilestones] = useState<string[]>([]);
  const correctMilestoneOrder = ["Concept Ideation", "React Prototype", "Beta Testing", "Vercel Deploy", "Market Launch"];

  // ----------------------------------------
  // LEAF/PARTICLE EFFECT GENERATOR
  // ----------------------------------------
  useEffect(() => {
    const list = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      tx: `${-100 + Math.random() * 200}px`,
      rot: `${Math.random() * 360}deg`,
      dur: `${10 + Math.random() * 10}s`,
      delay: `${Math.random() * 6}s`,
      type: i % 3 === 0 ? "cherry" : i % 3 === 1 ? "gold" : "code"
    }));
    setParticles(list);
  }, [phase]);

  // Audio lifecycle cleanup
  useEffect(() => {
    return () => { stopAudioEngine(); };
  }, []);

  // Keyboard spacebar support for rhythm catch & basket shoots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (phase === "school_game" && activeSchoolLoc?.id === "playground" && !currentResult) {
          e.preventDefault();
          handleRhythmHit();
        }
        else if (phase === "school_game" && activeSchoolLoc?.id === "stadium" && !currentResult) {
          e.preventDefault();
          handleBasketShoot();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, rhythmBallPos, activeSchoolLoc, currentResult, stadiumNeedlePos, stadiumAttempts, playgroundAttempts]);

  // ----------------------------------------
  // MUSIC & AUDIO TOGGLER
  // ----------------------------------------
  const handleToggleMusic = () => {
    if (!musicOn) {
      initAudioEngine();
      if (audioCtx?.state === "suspended") audioCtx.resume();
      setMusicOn(true);
    } else {
      stopAudioEngine();
      setMusicOn(false);
    }
  };

  // ----------------------------------------
  // PORTFOLIO AND LEVEL ROUTING
  // ----------------------------------------
  const handleEnterCampus = () => {
    playSFX("click");
    initAudioEngine();
    if (audioCtx?.state === "suspended") audioCtx.resume();
    setMusicOn(true);
    
    setGateOpen(false);
    setTimeout(() => {
      setPhase("school_map");
      setGateOpen(true);
    }, 1800);
  };

  const handleBackToMap = () => {
    playSFX("click");
    setGateOpen(false);
    
    // Clear rhythm / reflex intervals if running
    if (rhythmInterval.current) clearInterval(rhythmInterval.current);
    if (reflexInterval.current) clearInterval(reflexInterval.current);
    if (stadiumInterval.current) clearInterval(stadiumInterval.current);

    setTimeout(() => {
      if (phase === "school_game") {
        setPhase("school_map");
        setActiveSchoolLoc(null);
      } else {
        setPhase("univ_map");
        setActiveUnivLoc(null);
      }
      setGameSuccess(false);
      setGateOpen(true);
    }, 1800);
  };

  // ----------------------------------------
  // MINI GAME INITIATORS
  // ----------------------------------------
  const startSchoolGame = (loc: SchoolLocation) => {
    playSFX("click");
    setGateOpen(false);
    setTimeout(() => {
      setActiveSchoolLoc(loc);
      setPhase("school_game");
      setGateOpen(true);
      initializeSchoolMiniGame(loc.id);
    }, 1800);
  };

  const startUnivGame = (loc: UnivLocation) => {
    playSFX("click");
    setGateOpen(false);
    setTimeout(() => {
      setActiveUnivLoc(loc);
      setPhase("univ_game");
      setGateOpen(true);
      initializeUnivMiniGame(loc.id);
    }, 1800);
  };

  const triggerSuccessAward = (pointsVal: number, badgeName: string, badgeEmoji: string) => {
    playSFX("correct");
    setSuccessPointsAwarded(pointsVal);
    setSuccessBadgeAwarded(badgeName);
    setSuccessBadgeEmoji(badgeEmoji);
    setPoints(prev => prev + pointsVal);
    setXp(prev => prev + pointsVal * 1.5);
    setStars(prev => prev + 3);
    setGameSuccess(true);
  };

  const showPerformanceResult = (
    activityName: string,
    emoji: string,
    hits: number,
    total: number,
    locationId: string,
    badgeName: string,
    badgeEmoji: string,
    xpBase: number,
    isUniv?: boolean
  ) => {
    const marks = hits * 2;

    let grade = "F";
    let performance = "Academic Probation";
    if (hits === 5) { grade = "A+"; performance = isUniv ? "Research Pioneer" : "Academic Excellence"; }
    else if (hits === 4) { grade = "A"; performance = isUniv ? "System Architect" : "Outstanding Scholar"; }
    else if (hits === 3) { grade = "B+"; performance = isUniv ? "Solutions Developer" : "Honors Division"; }
    else if (hits === 2) { grade = "C"; performance = isUniv ? "Technical Apprentice" : "Passing Merit"; }
    else if (hits === 1) { grade = "D"; performance = isUniv ? "Needs Mentorship" : "Needs Tutoring"; }
    
    let starCount = 0;
    if (hits === 5) starCount = 5;
    else if (hits === 4) starCount = 4.5;
    else if (hits === 3) starCount = 4;
    else if (hits === 2) starCount = 3;
    else if (hits === 1) starCount = 2;
    else starCount = 0;

    const xpGained = hits * 30 + xpBase;

    playSFX("fanfare");

    setCurrentResult({
      activityName,
      emoji,
      scoreText: isUniv ? `${hits}/${total} Tasks Solved` : `${hits}/${total} Correct`,
      marks,
      stars: starCount,
      grade,
      xpGained,
      performance,
      badgeName,
      badgeEmoji,
      isUniv,
      locationId
    });
  };

  const handleCloseResultScreen = () => {
    if (!currentResult) return;

    const { locationId, marks, stars, xpGained, badgeName, badgeEmoji, isUniv } = currentResult;
    const hits = Math.round(marks / 2);

    if (isUniv) {
      if (locationId === "ailab") {
        setAilabScore(hits);
        setUnivCompleted(prev => ({ ...prev, ailab: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("Microsoft AI Specialist")) return [...prev, "Microsoft AI Specialist"];
          return prev;
        });
      } else if (locationId === "dsalab") {
        setDsalabScore(hits);
        setUnivCompleted(prev => ({ ...prev, dsalab: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("NIT algorithms Scholar")) return [...prev, "NIT algorithms Scholar"];
          return prev;
        });
      } else if (locationId === "codingclass") {
        setCodingclassScore(hits);
        setUnivCompleted(prev => ({ ...prev, codingclass: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("Full-Stack Web Architect")) return [...prev, "Full-Stack Web Architect"];
          return prev;
        });
      } else if (locationId === "researchlib") {
        setResearchlibScore(hits);
        setUnivCompleted(prev => ({ ...prev, researchlib: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("Information Architect")) return [...prev, "Information Architect"];
          return prev;
        });
      } else if (locationId === "innovation") {
        setInnovationScore(hits);
        setUnivCompleted(prev => ({ ...prev, innovation: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("SynerTech Innovation Award")) return [...prev, "SynerTech Innovation Award"];
          return prev;
        });
      }
      
      setPoints(prev => prev + hits * 40 + 50);
      setXp(prev => prev + xpGained);
      setStars(prev => prev + Math.floor(stars));
      setPhase("univ_map");
    } else {
      if (locationId === "classroom") {
        setClassroomScore(hits);
        setSchoolCompleted(prev => ({ ...prev, classroom: true }));
      } else if (locationId === "artroom") {
        setArtroomScore(hits);
        setSchoolCompleted(prev => ({ ...prev, artroom: true }));
      } else if (locationId === "playground") {
        setPlaygroundScore(hits);
        setSchoolCompleted(prev => ({ ...prev, playground: true }));
      } else if (locationId === "stadium") {
        setStadiumScore(hits);
        setSchoolCompleted(prev => ({ ...prev, stadium: true }));
      } else if (locationId === "library") {
        setLibraryScore(hits);
        setSchoolCompleted(prev => ({ ...prev, library: true }));
      } else if (locationId === "laboratory") {
        setLaboratoryScore(hits);
        setSchoolCompleted(prev => ({ ...prev, laboratory: true }));
      }

      setEarnedBadges(prev => {
        if (badgeName && !prev.includes(badgeName)) return [...prev, badgeName];
        return prev;
      });

      setPoints(prev => prev + hits * 30 + 30);
      setXp(prev => prev + xpGained);
      setStars(prev => prev + Math.floor(stars));
      setPhase("school_map");
    }

    setCurrentResult(null);
  };

  // ----------------------------------------
  // MINI-GAME INTIALIZERS & ACTION LOGIC
  // ----------------------------------------

  const generateClassroomQuestion = (index: number) => {
    const questions = [
      { expression: "2 × [X] + 4 = 10",  answer: 3, options: [3, 5, 1, 7] },
      { expression: "3 × [X] − 3 = 12",  answer: 5, options: [5, 2, 8, 4] },
      { expression: "[X] ÷ 4 + 1 = 3",   answer: 8, options: [8, 4, 12, 6] },
      { expression: "5 × [X] = 25",       answer: 5, options: [5, 3, 7, 10] },
      { expression: "[X]² = 49",          answer: 7, options: [7, 5, 9, 6] }
    ];
    const q = questions[index % questions.length];
    const shuffled = [...q.options].sort(() => Math.random() - 0.5);
    setChalkQuestion({ expression: q.expression, answer: q.answer, options: shuffled });
  };

  const initializeSchoolMiniGame = (id: string) => {
    if (id === "classroom") {
      setClassroomQuestionIndex(0);
      setClassroomCorrectCount(0);
      generateClassroomQuestion(0);
    }
    else if (id === "artroom") {
      setArtroomAttempts(0);
      const list = correctColorOrder.map((c, i) => ({ id: i, color: c, order: i }));
      list.sort(() => Math.random() - 0.5);
      setScrambledColors(list);
      setSelectedColorIdx(null);
    }
    else if (id === "playground") {
      setPlaygroundAttempts(0);
      setRhythmHits(0);
      setRhythmBallPos(0);
      setFootballSnapped(false);
      setFootballMissed(false);
      let dir = 3;
      let cur = 0;
      if (rhythmInterval.current) clearInterval(rhythmInterval.current);
      rhythmInterval.current = setInterval(() => {
        cur += dir;
        if (cur >= 98 || cur <= 2) dir = -dir;
        setRhythmBallPos(Math.max(2, Math.min(98, cur)));
      }, 28);
    }
    else if (id === "stadium") {
      setStadiumAttempts(0);
      setStadiumHits(0);
      setStadiumNeedlePos(0);
      let d = 4; // Slower sweep step
      let c = 0;

      if (stadiumInterval.current) clearInterval(stadiumInterval.current);
      stadiumInterval.current = setInterval(() => {
        c += d;
        if (c >= 100 || c <= 0) d = -d;
        setStadiumNeedlePos(c);
      }, 35); // Relaxed interval (35ms instead of 22ms)
    }
    else if (id === "library") {
      setLibraryQuestionIndex(0);
      setLibraryHits(0);
      setLibraryAttempts(0);
      const riddlesList = [
        { question: "I talk of matrices, vectors, structural calculations, and absolute infinite equations.", answer: "Mathematics" },
        { question: "I explore loops, binary compilers, data logic nodes, and dynamic system builders.", answer: "Computer Science" },
        { question: "I look at cosmic pathways, gravity fields, and the cold vast dark particles of galaxies.", answer: "Astrophysics" },
        { question: "I cover cell membranes, photosynthesis cycles, and the helix strands of human DNA.", answer: "Biology" },
        { question: "I examine historic treaties, ancient dynasties, and the ruins of long-lost civilizations.", answer: "History" }
      ];
      setLibRiddle(riddlesList[0]);
    }
    else if (id === "laboratory") {
      setLabQuestionIndex(0);
      setLabHits(0);
      setLabAttempts(0);
      const chemicals = ["Hydrogen", "Oxygen", "Nitrogen"];
      const target = Array.from({ length: 5 }).map(() => chemicals[Math.floor(Math.random() * 3)]);
      setLabTargetSeq(target);
      setLabCurrentSeq([]);
      setLabTargetChemical(target[0]);
    }
  };

  const initializeUnivMiniGame = (id: string) => {
    if (id === "ailab") {
      setAiMatches({});
      setSelectedAiInput(null);
      setSelectedAiModel(null);
      setAiMistakes(0);
    }
    else if (id === "dsalab") {
      const nums = [12, 28, 45, 62, 88].map((v, i) => ({ id: i, value: v, sorted: false }));
      nums.sort(() => Math.random() - 0.5);
      setDsaNodes(nums);
      setDsaExpectedIndex(0);
      setDsaMistakes(0);
    }
    else if (id === "codingclass") {
      setCodingQuestionIndex(0);
      setCodingCorrectCount(0);
      const codingBugs = [
        {
          code: "const [data, setData] = useStae(null);\nuseEffect(() => {\n  fetchData();\n}, []);",
          options: ["Change useStae to useState", "Change useEffect to useMemo", "Change fetch to await fetch"],
          answer: "Change useStae to useState"
        },
        {
          code: "supabase\n  .from('exam')\n  .select('*')\n  .equ('id', 12);",
          options: ["Change .from to .table", "Change .equ to .eq", "Change select('*') to select(all)"],
          answer: "Change .equ to .eq"
        },
        {
          code: "const element = <div class='card'>Hello</div>;",
          options: ["Change class to className", "Change div to Div", "Wrap it in React.createElement"],
          answer: "Change class to className"
        },
        {
          code: "const query = supabase.from('users').delete().eq('id', uid);",
          options: ["Ensure uid is defined", "Use deleteRow instead of delete", "Add SELECT at the beginning"],
          answer: "Ensure uid is defined"
        },
        {
          code: "useEffect(() => {\n  const sub = supabase.auth.onAuthStateChange();\n  return sub.unsubscribe();\n}, []);",
          options: ["Unsubscribe on cleanup correctly", "Change useEffect to useState", "Add auth dependency"],
          answer: "Unsubscribe on cleanup correctly"
        }
      ];
      setDebugSnippet(codingBugs[0]);
    }
    else if (id === "researchlib") {
      setResearchQuestionIndex(0);
      setResearchCorrectCount(0);
      const researchQueriesList = [
        {
          target: "Retrieve all products with status pending and score > 80",
          options: [
            "SELECT * FROM products WHERE status = 'pending' AND score > 80",
            "SELECT * FROM products MATCH status IN pending OR score > 80",
            "SELECT products WHERE status == pending && score => 80"
          ],
          answer: "SELECT * FROM products WHERE status = 'pending' AND score > 80"
        },
        {
          target: "Get title and tag from AI research station collection in GraphQL",
          options: [
            "query { ai_station { title tag } }",
            "select { ai_station { title, tag } }",
            "query ai_station [ title, tag ]"
          ],
          answer: "query { ai_station { title tag } }"
        },
        {
          target: "Order students by rank descending in SQL",
          options: [
            "SELECT * FROM students ORDER BY rank DESC",
            "SELECT * FROM students SORT BY rank DOWN",
            "SELECT ALL students ORDERING rank DESC"
          ],
          answer: "SELECT * FROM students ORDER BY rank DESC"
        },
        {
          target: "Find matching vector embeds in Supabase PGVector",
          options: [
            "SELECT * FROM documents ORDER BY embedding <=> vec_val LIMIT 5",
            "SELECT * FROM documents MATCH embedding WITH vec_val LIMIT 5",
            "SELECT VECTOR FROM documents NEAREST vec_val LIMIT 5"
          ],
          answer: "SELECT * FROM documents ORDER BY embedding <=> vec_val LIMIT 5"
        },
        {
          target: "Select distinct organizations from certificate table",
          options: [
            "SELECT DISTINCT org FROM certificates",
            "SELECT UNIQUE org FROM certificates",
            "SELECT FILTER org FROM certificates"
          ],
          answer: "SELECT DISTINCT org FROM certificates"
        }
      ];
      setResearchQuery(researchQueriesList[0]);
    }
    else if (id === "innovation") {
      setInnovationMistakes(0);
      const list = [...correctMilestoneOrder].sort(() => Math.random() - 0.5);
      setScrambledMilestones(list);
    }
  };

  // ----------------------------------------
  // PLAY INTERACTIONS
  // ----------------------------------------

  // 1. Math Classroom Quiz
  const handleChalkAnswer = (val: number) => {
    if (classroomQuestionIndex >= 5 || currentResult) return;

    const isCorrect = val === chalkQuestion.answer;
    let nextCorrectCount = classroomCorrectCount;

    if (isCorrect) {
      playSFX("correct");
      nextCorrectCount = classroomCorrectCount + 1;
      setClassroomCorrectCount(nextCorrectCount);
      setIncorrectFlash("correct:Correct! +30 XP");
    } else {
      playSFX("incorrect");
      setIncorrectFlash("wrong:Incorrect formula!");
    }
    setTimeout(() => setIncorrectFlash(null), 1000);

    const nextIndex = classroomQuestionIndex + 1;
    setClassroomQuestionIndex(nextIndex);

    if (nextIndex < 5) {
      setTimeout(() => generateClassroomQuestion(nextIndex), 1100);
    } else {
      setTimeout(() => {
        showPerformanceResult(
          "Classroom Quiz (Algebra)",
          "📝",
          nextCorrectCount,
          5,
          "classroom",
          "Logic Prodigy",
          "🧠",
          50,
          false
        );
      }, 1100);
    }
  };

  // 2. Art Room Harmony Color check
  const handleArtColorClick = (idx: number) => {
    playSFX("click");
    if (selectedColorIdx === null) {
      setSelectedColorIdx(idx);
    } else {
      if (selectedColorIdx === idx) {
        setSelectedColorIdx(null);
        return;
      }
      const copy = [...scrambledColors];
      const tempOrder = copy[selectedColorIdx].order;
      copy[selectedColorIdx].order = copy[idx].order;
      copy[idx].order = tempOrder;

      copy.sort((a, b) => a.order - b.order);
      setScrambledColors(copy);
      setSelectedColorIdx(null);
    }
  };

  const handleCheckArtRoom = () => {
    if (currentResult) return;

    let balanced = true;
    for (let i = 0; i < scrambledColors.length; i++) {
      if (scrambledColors[i].color !== correctColorOrder[i]) {
        balanced = false;
      }
    }

    const nextAttempts = artroomAttempts + 1;
    setArtroomAttempts(nextAttempts);

    if (balanced) {
      const hits = Math.max(1, 5 - artroomAttempts);
      showPerformanceResult(
        "Art Room Harmony",
        "🎨",
        hits,
        5,
        "artroom",
        "Creative Visionary",
        "✨",
        60,
        false
      );
    } else {
      if (nextAttempts >= 5) {
        showPerformanceResult(
          "Art Room Harmony",
          "🎨",
          1,
          5,
          "artroom",
          "Creative Visionary",
          "✨",
          60,
          false
        );
      } else {
        playSFX("incorrect");
        setIncorrectFlash(`HARMONY FAILED! Attempt ${nextAttempts}/5`);
        setTimeout(() => setIncorrectFlash(null), 1200);
      }
    }
  };

  // 3. Football Zone catch
  const handleRhythmHit = () => {
    if (playgroundAttempts >= 5 || currentResult) return;

    const isHit = rhythmBallPos >= 25 && rhythmBallPos <= 75;
    let nextHits = rhythmHits;

    if (isHit) {
      playSFX("correct");
      nextHits = rhythmHits + 1;
      setRhythmHits(nextHits);
      setFootballSnapped(true);
      setIncorrectFlash(`correct:Goal ${nextHits}/5!`);
      setTimeout(() => { setFootballSnapped(false); setIncorrectFlash(null); }, 1000);
    } else {
      playSFX("incorrect");
      setFootballMissed(true);
      setIncorrectFlash("wrong:Missed target!");
      setTimeout(() => { setFootballMissed(false); setIncorrectFlash(null); }, 1000);
    }

    const nextAttempts = playgroundAttempts + 1;
    setPlaygroundAttempts(nextAttempts);

    if (nextAttempts >= 5) {
      clearInterval(rhythmInterval.current);
      setTimeout(() => {
        showPerformanceResult(
          "Football Ground (Playground)",
          "⚽",
          nextHits,
          5,
          "playground",
          "Star Athlete",
          "🏆",
          40,
          false
        );
      }, 1100);
    }
  };

  // 4. Indoor Stadium Basketball shoot
  const handleBasketShoot = () => {
    if (stadiumAttempts >= 5 || currentResult) return;

    // Extremely forgiving 60% perfect sweet spot range
    const isBasket = stadiumNeedlePos >= 20 && stadiumNeedlePos <= 80;
    let nextHits = stadiumHits;

    if (isBasket) {
      playSFX("correct");
      nextHits = stadiumHits + 1;
      setStadiumHits(nextHits);
      setIncorrectFlash("correct:SWISH! BASKET! 🏀");
      setTimeout(() => setIncorrectFlash(null), 1000);
    } else {
      playSFX("incorrect");
      setIncorrectFlash("wrong:Clank! Missed!");
      setTimeout(() => setIncorrectFlash(null), 1000);
    }

    const nextAttempts = stadiumAttempts + 1;
    setStadiumAttempts(nextAttempts);

    if (nextAttempts >= 5) {
      clearInterval(stadiumInterval.current);
      setTimeout(() => {
        showPerformanceResult(
          "Indoor Stadium Basketball",
          "🏀",
          nextHits,
          5,
          "stadium",
          "Stadium Champion",
          "⚡",
          40,
          false
        );
      }, 1100);
    }
  };

  // 5. Library riddles book select
  const handleLibrarySelect = (ans: string) => {
    if (libraryQuestionIndex >= 5 || currentResult) return;

    const riddlesList = [
      { question: "I talk of matrices, vectors, structural calculations, and absolute infinite equations.", answer: "Mathematics" },
      { question: "I explore loops, binary compilers, data logic nodes, and dynamic system builders.", answer: "Computer Science" },
      { question: "I look at cosmic pathways, gravity fields, and the cold vast dark particles of galaxies.", answer: "Astrophysics" },
      { question: "I cover cell membranes, photosynthesis cycles, and the helix strands of human DNA.", answer: "Biology" },
      { question: "I examine historic treaties, ancient dynasties, and the ruins of long-lost civilizations.", answer: "History" }
    ];

    const isCorrect = ans === libRiddle.answer;
    let nextHits = libraryHits;

    if (isCorrect) {
      playSFX("correct");
      nextHits = libraryHits + 1;
      setLibraryHits(nextHits);
      setIncorrectFlash("correct:Correct book cataloged!");
    } else {
      playSFX("incorrect");
      setIncorrectFlash("wrong:Misfiled catalog shelf!");
    }
    setTimeout(() => setIncorrectFlash(null), 1000);

    const nextIndex = libraryQuestionIndex + 1;
    setLibraryQuestionIndex(nextIndex);

    if (nextIndex < 5) {
      setTimeout(() => setLibRiddle(riddlesList[nextIndex]), 1100);
    } else {
      setTimeout(() => {
        showPerformanceResult(
          "School Library Riddles",
          "📖",
          nextHits,
          5,
          "library",
          "Scholar of Secrets",
          "📖",
          50,
          false
        );
      }, 1100);
    }
  };

  // 6. Chemical flask selector target matching
  const handleChemicalClick = (name: string) => {
    if (labQuestionIndex >= 5 || currentResult) return;

    playSFX("click");
    const isCorrect = name === labTargetChemical;
    let nextHits = labHits;

    const nextSeq = [...labCurrentSeq, name];
    setLabCurrentSeq(nextSeq);

    if (isCorrect) {
      playSFX("correct");
      nextHits = labHits + 1;
      setLabHits(nextHits);
      setIncorrectFlash("correct:Synthesis Stable! 🧪");
    } else {
      playSFX("incorrect");
      setIncorrectFlash("wrong:Chemical Reaction volatile!");
    }
    setTimeout(() => setIncorrectFlash(null), 1000);

    const nextIndex = labQuestionIndex + 1;
    setLabQuestionIndex(nextIndex);

    if (nextIndex < 5) {
      const nextTarget = labTargetSeq[nextIndex];
      setTimeout(() => setLabTargetChemical(nextTarget), 1100);
    } else {
      setTimeout(() => {
        showPerformanceResult(
          "Science Lab (Chemistry)",
          "🧪",
          nextHits,
          5,
          "laboratory",
          "Alchemist of Code",
          "🧪",
          60,
          false
        );
      }, 1100);
    }
  };

  // 7. AI Lab network mapper connections
  const handleAiInputClick = (val: string) => {
    playSFX("click");
    setSelectedAiInput(val);
    if (selectedAiModel) {
      resolveAiConnection(val, selectedAiModel);
    }
  };

  const handleAiModelClick = (val: string) => {
    playSFX("click");
    setSelectedAiModel(val);
    if (selectedAiInput) {
      resolveAiConnection(selectedAiInput, val);
    }
  };

  const resolveAiConnection = (inputVal: string, modelVal: string) => {
    if (currentResult) return;

    const targetLink = aiLinks.find(l => l.input === inputVal);
    if (targetLink && targetLink.model === modelVal) {
      playSFX("correct");
      const newMatches = { ...aiMatches, [inputVal]: modelVal };
      setAiMatches(newMatches);
      setSelectedAiInput(null);
      setSelectedAiModel(null);

      if (Object.keys(newMatches).length === 5) {
        const hits = Math.max(1, 5 - aiMistakes);
        showPerformanceResult(
          "AI Neural Mapper Lab",
          "🧠",
          hits,
          5,
          "ailab",
          "Microsoft AI Specialist",
          "🤖",
          70,
          true
        );
      }
    } else {
      playSFX("incorrect");
      setAiMistakes(prev => prev + 1);
      setIncorrectFlash("wrong:Topological Mismatch!");
      setTimeout(() => setIncorrectFlash(null), 1000);
      setSelectedAiInput(null);
      setSelectedAiModel(null);
    }
  };

  // 8. DSA search tree sorting ascending
  const handleDsaNodeClick = (nodeVal: number, idx: number) => {
    if (currentResult) return;

    playSFX("click");
    const sortedVals = [...dsaNodes].map(n => n.value).sort((a, b) => a - b);
    const expectedVal = sortedVals[dsaExpectedIndex];

    if (nodeVal === expectedVal) {
      playSFX("correct");
      const copy = [...dsaNodes];
      const foundIdx = copy.findIndex(n => n.value === nodeVal);
      if (foundIdx !== -1) copy[foundIdx].sorted = true;
      setDsaNodes(copy);

      const nextExpected = dsaExpectedIndex + 1;
      setDsaExpectedIndex(nextExpected);

      if (nextExpected === 5) {
        const hits = Math.max(1, 5 - dsaMistakes);
        showPerformanceResult(
          "DSA Search Tree sorting",
          "💻",
          hits,
          5,
          "dsalab",
          "NIT algorithms Scholar",
          "🌳",
          80,
          true
        );
      }
    } else {
      playSFX("incorrect");
      setDsaMistakes(prev => prev + 1);
      setIncorrectFlash("wrong:BST Unbalanced! Sorting reset!");
      setTimeout(() => setIncorrectFlash(null), 1200);
      initializeUnivMiniGame("dsalab");
    }
  };

  // 9. Coding debugging syntax cards selection
  const handleDebugSelect = (ans: string) => {
    if (codingQuestionIndex >= 5 || currentResult) return;

    const codingBugs = [
      {
        code: "const [data, setData] = useStae(null);\nuseEffect(() => {\n  fetchData();\n}, []);",
        options: ["Change useStae to useState", "Change useEffect to useMemo", "Change fetch to await fetch"],
        answer: "Change useStae to useState"
      },
      {
        code: "supabase\n  .from('exam')\n  .select('*')\n  .equ('id', 12);",
        options: ["Change .from to .table", "Change .equ to .eq", "Change select('*') to select(all)"],
        answer: "Change .equ to .eq"
      },
      {
        code: "const element = <div class='card'>Hello</div>;",
        options: ["Change class to className", "Change div to Div", "Wrap it in React.createElement"],
        answer: "Change class to className"
      },
      {
        code: "const query = supabase.from('users').delete().eq('id', uid);",
        options: ["Ensure uid is defined", "Use deleteRow instead of delete", "Add SELECT at the beginning"],
        answer: "Ensure uid is defined"
      },
      {
        code: "useEffect(() => {\n  const sub = supabase.auth.onAuthStateChange();\n  return sub.unsubscribe();\n}, []);",
        options: ["Unsubscribe on cleanup correctly", "Change useEffect to useState", "Add auth dependency"],
        answer: "Unsubscribe on cleanup correctly"
      }
    ];

    const isCorrect = ans === debugSnippet.answer;
    let nextCorrectCount = codingCorrectCount;

    if (isCorrect) {
      playSFX("correct");
      nextCorrectCount = codingCorrectCount + 1;
      setCodingCorrectCount(nextCorrectCount);
      setIncorrectFlash("correct:Compiler Success!");
    } else {
      playSFX("incorrect");
      setIncorrectFlash("wrong:Syntax Compilation Error!");
    }
    setTimeout(() => setIncorrectFlash(null), 1000);

    const nextIndex = codingQuestionIndex + 1;
    setCodingQuestionIndex(nextIndex);

    if (nextIndex < 5) {
      setTimeout(() => setDebugSnippet(codingBugs[nextIndex]), 1100);
    } else {
      setTimeout(() => {
        showPerformanceResult(
          "React & Supabase Debugging",
          "⌨️",
          nextCorrectCount,
          5,
          "codingclass",
          "Full-Stack Web Architect",
          "⚡",
          70,
          true
        );
      }, 1100);
    }
  };

  // 10. Research library index query SQL
  const handleResearchSelect = (ans: string) => {
    if (researchQuestionIndex >= 5 || currentResult) return;

    const researchQueriesList = [
      {
        target: "Retrieve all products with status pending and score > 80",
        options: [
          "SELECT * FROM products WHERE status = 'pending' AND score > 80",
          "SELECT * FROM products MATCH status IN pending OR score > 80",
          "SELECT products WHERE status == pending && score => 80"
        ],
        answer: "SELECT * FROM products WHERE status = 'pending' AND score > 80"
      },
      {
        target: "Get title and tag from AI research station collection in GraphQL",
        options: [
          "query { ai_station { title tag } }",
          "select { ai_station { title, tag } }",
          "query ai_station [ title, tag ]"
        ],
        answer: "query { ai_station { title tag } }"
      },
      {
        target: "Order students by rank descending in SQL",
        options: [
          "SELECT * FROM students ORDER BY rank DESC",
          "SELECT * FROM students SORT BY rank DOWN",
          "SELECT ALL students ORDERING rank DESC"
        ],
        answer: "SELECT * FROM students ORDER BY rank DESC"
      },
      {
        target: "Find matching vector embeds in Supabase PGVector",
        options: [
          "SELECT * FROM documents ORDER BY embedding <=> vec_val LIMIT 5",
          "SELECT * FROM documents MATCH embedding WITH vec_val LIMIT 5",
          "SELECT VECTOR FROM documents NEAREST vec_val LIMIT 5"
        ],
        answer: "SELECT * FROM documents ORDER BY embedding <=> vec_val LIMIT 5"
      },
      {
        target: "Select distinct organizations from certificate table",
        options: [
          "SELECT DISTINCT org FROM certificates",
          "SELECT UNIQUE org FROM certificates",
          "SELECT FILTER org FROM certificates"
        ],
        answer: "SELECT DISTINCT org FROM certificates"
      }
    ];

    const isCorrect = ans === researchQuery.answer;
    let nextCorrectCount = researchCorrectCount;

    if (isCorrect) {
      playSFX("correct");
      nextCorrectCount = researchCorrectCount + 1;
      setResearchCorrectCount(nextCorrectCount);
      setIncorrectFlash("correct:Vector Retrospective Synced!");
    } else {
      playSFX("incorrect");
      setIncorrectFlash("wrong:Empty ResultSet / Syntax Glitch");
    }
    setTimeout(() => setIncorrectFlash(null), 1000);

    const nextIndex = researchQuestionIndex + 1;
    setResearchQuestionIndex(nextIndex);

    if (nextIndex < 5) {
      setTimeout(() => setResearchQuery(researchQueriesList[nextIndex]), 1100);
    } else {
      setTimeout(() => {
        showPerformanceResult(
          "Research Index Querying",
          "☕",
          nextCorrectCount,
          5,
          "researchlib",
          "Information Architect",
          "📑",
          60,
          true
        );
      }, 1100);
    }
  };

  // 11. Innovation Hub Slide Sequencer Swap milestones
  const handleMilestoneClick = (val: string) => {
    if (currentResult) return;

    playSFX("click");
    const nextExpectedPos = scrambledMilestones.findIndex((m, i) => correctMilestoneOrder[i] !== m);
    if (nextExpectedPos === -1) return;

    const clickedPos = scrambledMilestones.indexOf(val);
    if (clickedPos === -1) return;

    const expectedVal = correctMilestoneOrder[nextExpectedPos];
    if (val === expectedVal) {
      playSFX("correct");
      const copy = [...scrambledMilestones];
      const temp = copy[nextExpectedPos];
      copy[nextExpectedPos] = copy[clickedPos];
      copy[clickedPos] = temp;

      setScrambledMilestones(copy);

      let fullyAligned = true;
      for (let i = 0; i < copy.length; i++) {
        if (copy[i] !== correctMilestoneOrder[i]) {
          fullyAligned = false;
        }
      }

      if (fullyAligned) {
        const hits = Math.max(1, 5 - innovationMistakes);
        showPerformanceResult(
          "Innovation Hub Milestones",
          "🚀",
          hits,
          5,
          "innovation",
          "SynerTech Innovation Award",
          "🥇",
          80,
          true
        );
      }
    } else {
      playSFX("incorrect");
      setInnovationMistakes(prev => prev + 1);
      setIncorrectFlash("wrong:Out of logical lifecycle sequence!");
      setTimeout(() => setIncorrectFlash(null), 1000);
    }
  };

  // ----------------------------------------
  // TRANSITION FROM SCHOOL TO UNIVERSITY
  // ----------------------------------------
  const handleGraduateTransition = () => {
    playSFX("sweep");
    setGateOpen(false);
    setPhase("transitioning");
    
    setTimeout(() => {
      // Swap ambient chord loops
      startAmbientLoop("univ");
      setPhase("univ_map");
      setGateOpen(true);
    }, 2800);
  };

  const handleGraduateUniv = () => {
    playSFX("fanfare");
    setGateOpen(false);
    setTimeout(() => {
      setPhase("graduated");
      setGateOpen(true);
    }, 1800);
  };

  const resetAllProgress = () => {
    playSFX("click");
    setPoints(0);
    setXp(0);
    setStars(0);
    setEarnedBadges([]);
    setEarnedCerts([]);
    setSchoolCompleted({});
    setUnivCompleted({});

    setClassroomScore(0);
    setArtroomScore(0);
    setPlaygroundScore(0);
    setStadiumScore(0);
    setLibraryScore(0);
    setLaboratoryScore(0);

    setAilabScore(0);
    setDsalabScore(0);
    setCodingclassScore(0);
    setResearchlibScore(0);
    setInnovationScore(0);

    setClassroomQuestionIndex(0);
    setClassroomCorrectCount(0);

    setPlaygroundAttempts(0);
    setRhythmHits(0);

    setStadiumAttempts(0);
    setStadiumHits(0);
    
    setArtroomAttempts(0);

    setLibraryQuestionIndex(0);
    setLibraryHits(0);
    setLibraryAttempts(0);

    setLabQuestionIndex(0);
    setLabHits(0);
    setLabAttempts(0);

    setCodingQuestionIndex(0);
    setCodingCorrectCount(0);

    setResearchQuestionIndex(0);
    setResearchCorrectCount(0);

    setDsaMistakes(0);
    setInnovationMistakes(0);
    setAiMistakes(0);
    
    setGateOpen(false);
    setTimeout(() => {
      setPhase("entrance");
      startAmbientLoop("school");
      setGateOpen(true);
    }, 1500);
  };

  return (
    <div className={`ec-viewport ${phase.startsWith("univ") || phase === "graduated" ? "univ-theme" : "school-theme"}`}>
      {/* Rotate Device Warning Screen */}
      <div className="rotate-device">
        <div className="rotate-icon">📱</div>
        <h2>Rotate Your Device</h2>
        <p>
          Campus Quest is best experienced in landscape mode.
        </p>
      </div>

      <div className="ec-sunlight" />
      <div className="ec-vignette" />

      {/* Floating dynamic aesthetic leaves / cherry blossom / code blocks */}
      <div className="ec-particle-container">
        {particles.map(p => (
          <span 
            key={p.id} 
            className={`ec-particle ${phase.startsWith("univ") ? "code" : p.type === "code" ? "gold" : p.type}`}
            style={{ 
              left: p.left, 
              "--tx": p.tx, 
              "--rot": p.rot, 
              "--dur": p.dur, 
              "--delay": p.delay 
            } as any}
          >
            {phase.startsWith("univ") ? ["{ }", "1", "0", "< >", "[ ]", "AI", "C++", "JS"][p.id % 8] : ""}
          </span>
        ))}
      </div>

      {/* Cinematic Transition Gate Overlay */}
      <div className={`ec-transition-cover ${phase === "transitioning" ? "univ-transition" : ""}`}>
        <div className={`ec-transition-half ec-transition-top ${gateOpen ? "open" : ""}`}>
          <span className="ec-transition-text">
            {phase === "transitioning" ? "GRADUATING TO COLLEGE" : "CAMPUS QUEST"}
          </span>
        </div>
        <div className={`ec-transition-half ec-transition-bottom ${gateOpen ? "open" : ""}`}>
          <span className="ec-transition-text">
            {phase === "transitioning" ? "EVOLVING ROADWAYS" : "NIMRA'S JOURNEY"}
          </span>
        </div>
      </div>

      {/* Ambient Sound waves indicator HUD */}
      {phase !== "entrance" && (
        <div className="ec-ambient-indicator">
          <span>{phase.startsWith("univ") || phase === "graduated" ? "Cafe Ambience" : "School Sunset"}</span>
          <div className="ec-sound-waves">
            <span className="ec-sound-bar" style={{ animationDelay: "0.1s" }} />
            <span className="ec-sound-bar" style={{ animationDelay: "0.4s" }} />
            <span className="ec-sound-bar" style={{ animationDelay: "0.2s" }} />
          </div>
        </div>
      )}

      {/* HUD Header */}
      {phase !== "entrance" && phase !== "graduated" && (
        <header className="ec-hud">
          <div className="ec-hud-left">
            <div className="ec-hud-logo">🎓</div>
            <div className="ec-hud-journey">
              <h2>{phase.startsWith("univ") ? "University Level" : "DPS School Level"}</h2>
              <span>Journey Map Simulator</span>
            </div>
          </div>

          <div className="ec-hud-stats">
            <div className="ec-stat-item">
              <span className="ec-stat-icon">💯</span>
              <span>SCORE:</span>
              <span className="ec-stat-num">{points}</span>
            </div>
            <div className="ec-stat-item">
              <span className="ec-stat-icon">⚡</span>
              <span>XP:</span>
              <span className="ec-stat-num">{Math.floor(xp)}</span>
            </div>
            <div className="ec-stat-item">
              <span className="ec-stat-icon">⭐</span>
              <span>STARS:</span>
              <span className="ec-stat-num">{stars}</span>
            </div>
            <div className="ec-stat-item">
              <span className="ec-stat-icon">🏅</span>
              <span>REWARDS:</span>
              <span className="ec-stat-num">{phase.startsWith("univ") ? earnedCerts.length : earnedBadges.length}</span>
            </div>
          </div>

          <div className="ec-hud-right">
            <button className="ec-hud-btn" onClick={handleToggleMusic} title={musicOn ? "Mute Ambient Synth" : "Play Ambient Synth"}>
              {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
            </button>
            <button className="ec-hud-btn" onClick={onBack} title="Back to Arcade Hub">
              <ArrowLeft size={16} />
            </button>
          </div>
        </header>
      )}

      {/* ==========================================================
         STAGE 1: CINEMATIC ENTRANCE SCREEN
         ========================================================== */}
      {phase === "entrance" && (
        <div className="ec-entrance-view">
          <div className="ec-entrance-shield">
            <div className="ec-entrance-ring" />
            <div className="ec-entrance-ring-2" />
            <div className="ec-entrance-logo">
              <GraduationCap size={44} style={{ color: "#ffe082" }} />
            </div>
          </div>

          <div className="ec-entrance-title">
            <h1>CAMPUS QUEST</h1>
            <p className="ec-entrance-desc">
              Walk through the highly interactive educational campuses that shaped Nimra's software engineering and logical journey. Explore DPS Srinagar school corridors, play classic subject activities, receive digital report cards, and graduate into CUK university labs for technical certifications.
            </p>
          </div>

          <button className="ec-enter-arcade-btn" onClick={handleEnterCampus}>
            ENTER QUEST 🎮
          </button>
        </div>
      )}

      {/* ==========================================================
         STAGE 2: SCHOOL MAP NAVIGATION
         ========================================================== */}
      {phase === "school_map" && (
        <div className="ec-map-view">
          <div className="ec-map-container">
            <div className="ec-map-blueprint" />

            <div className="ec-map-header">
              <div className="ec-map-intro">
                <h3>DPS Srinagar Sunset Campus</h3>
                <p>Nostalgic corridors & foundation years (2009 - 2023). Tap any school building block to play activities.</p>
              </div>

              {/* Graduate button only visible when some school levels are completed */}
              {Object.keys(schoolCompleted).length >= 3 && (
                <div className="ec-map-graduate-action">
                  <button className="ec-graduate-btn" onClick={handleGraduateTransition}>
                    Graduate to University <Sparkles size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* School Campus visual interactive layout */}
            <div className="ec-map-canvas">
              {/* Dynamic pathway lines connecting the school block */}
              <svg className="ec-map-pathways" width="100%" height="100%">
                <path d="M 18% 18% L 58% 15% L 75% 40% L 48% 58% L 15% 60% L 35% 36% Z" className="ec-pathway-line" />
              </svg>

              {/* Aesthetic Wind tree foliage */}
              <span className="ec-map-tree" style={{ top: "35%", left: "10%" }}>🌳</span>
              <span className="ec-map-tree" style={{ top: "10%", left: "45%" }}>🌳</span>
              <span className="ec-map-tree" style={{ top: "50%", left: "55%" }}>🌸</span>
              <span className="ec-map-tree" style={{ top: "80%", left: "80%" }}>🌳</span>

              {/* Render School Map Interactive Buildings */}
              {SCHOOL_LOCATIONS.map(loc => {
                const isCompleted = schoolCompleted[loc.id];
                return (
                  <div 
                    key={loc.id} 
                    className="ec-map-building"
                    style={{ top: loc.top, left: loc.left }}
                    onClick={() => startSchoolGame(loc)}
                  >
                    <div className="ec-building-glow-ring" />
                    <div className="ec-building-structure">
                      <span>{loc.emoji}</span>
                      <span className={`ec-building-status-dot ${isCompleted ? "completed" : "pending"}`} />
                      <span className="ec-building-badge">{loc.task.split(" ")[0]}</span>
                    </div>
                    <div className="ec-building-info">
                      <h4 className="ec-building-name">{loc.name}</h4>
                      <p className="ec-building-task">{loc.task}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ec-map-footer">
              <div className="ec-map-instruction">
                <span className="ec-map-instruction-blink" />
                <span>Tap any active zone to trigger cinematic gameplay & earn badges</span>
              </div>
              <button 
                className={`ec-report-card-trigger-btn ${Object.keys(schoolCompleted).length > 0 ? "pulse-glow" : ""}`}
                onClick={() => { playSFX("click"); setPhase("school_report"); }}
              >
                🎒 Digital Report Card
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
         STAGE 3: ACTIVE SCHOOL GAME VIEW
         ========================================================== */}
      {phase === "school_game" && activeSchoolLoc && (
        <div className="ec-play-view">
          <div className="ec-play-card">
            
            {/* Quest lore details panel */}
            <div className="ec-quest-lore-panel">
              <div className="ec-quest-header">
                <span className="ec-quest-tag">School Quest Activity</span>
                <h3 className="ec-quest-title">{activeSchoolLoc.name}</h3>
              </div>

              <div className="ec-quest-lore-scroll">
                <p className="ec-quest-lore-text">{activeSchoolLoc.description}</p>
                <div className="ec-quest-instructions">
                  <h4>💡 Academic Guidelines:</h4>
                  <p>{activeSchoolLoc.instructions}</p>
                </div>
              </div>

              <div className="ec-quest-back-footer">
                <button className="ec-quest-back-btn" onClick={handleBackToMap}>
                  ◄ Abort Activity
                </button>
                <div className="ec-stat-item" style={{ fontSize: "0.6rem" }}>
                  <span>Award: {activeSchoolLoc.badge} Badge</span>
                </div>
              </div>
            </div>

            {/* Active game arena */}
            <div className="ec-game-interactive-arena">
              <button className="ec-mobile-abort-btn" onClick={handleBackToMap}>
                ◄ Quit Activity
              </button>
              
              {/* Colour-coded feedback flash banner */}
              {incorrectFlash && (
                <div
                  className="ec-incorrect-flash-banner"
                  style={{
                    background: incorrectFlash.startsWith("correct")
                      ? "rgba(22,163,74,0.88)" : "rgba(185,28,28,0.88)",
                    borderColor: incorrectFlash.startsWith("correct")
                      ? "#4ade80" : "#f87171"
                  }}
                >
                  <span>{incorrectFlash.replace(/^(correct|wrong):/, "")}</span>
                </div>
              )}


              <div className="ec-game-screen">
                
                {/* 1. Classroom Chalkboard logic math */}
                {activeSchoolLoc.id === "classroom" && (
                  <div className="ec-game-board-container">
                    <div className="ec-board-chalk-title">
                      Question {Math.min(6, classroomQuestionIndex + 1)} / 6
                      &nbsp;&nbsp;{Array.from({ length: 6 }).map((_, i) => (
                        <span key={i} style={{ opacity: i < classroomCorrectCount ? 1 : 0.2 }}>⭐</span>
                      ))}
                    </div>
                    <div className="ec-board-chalk-expression">
                      {chalkQuestion.expression}
                    </div>
                    <div className="ec-board-options-grid">
                      {chalkQuestion.options.map((opt, i) => (
                        <button 
                          key={i} 
                          className="ec-board-option-btn"
                          onClick={() => handleChalkAnswer(opt)}
                          disabled={classroomQuestionIndex >= 6 || gameSuccess}
                        >
                          X = {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. Art Room color gradient harmony swap */}
                {activeSchoolLoc.id === "artroom" && (
                  <div className="ec-art-easel">
                    <p className="ec-art-instruction">Arrange red gradient boxes dark to light:</p>
                    <div className="ec-art-color-strip">
                      {scrambledColors.map((item, idx) => (
                        <div 
                          key={item.id}
                          className={`ec-art-color-box ${selectedColorIdx === idx ? "selected" : ""}`}
                          style={{ background: item.color }}
                          onClick={() => handleArtColorClick(idx)}
                        />
                      ))}
                    </div>
                    <div className="ec-stat-item" style={{ justifyContent: "center", marginBottom: "0.5rem" }}>
                      <span>Selected: {selectedColorIdx !== null ? `Box ${selectedColorIdx + 1}` : "None"}</span>
                    </div>
                    <button className="ec-art-easel-submit-btn" onClick={handleCheckArtRoom}>
                      Submit Color Palette 🎨
                    </button>
                  </div>
                )}

                {/* 3. Playground Rhythm ball catcher */}
                {activeSchoolLoc.id === "playground" && (
                  <div style={{ textAlign: "center" }}>
                    <div className="ec-rhythm-court">
                      <div className={`ec-rhythm-target-circle ${(rhythmBallPos >= 30 && rhythmBallPos <= 70) ? "active-glow" : ""}`}>
                        <div className="ec-rhythm-target-glow" />
                        🎯
                      </div>
                      <div 
                        className={`ec-rhythm-ball ${footballSnapped ? "ec-ball-snapped" : ""} ${footballMissed ? "ec-ball-missed-fade" : ""}`} 
                        style={{ left: `${rhythmBallPos}%` }} 
                      />
                      <div className="ec-rhythm-hit-zone-meter">
                        <div className="ec-rhythm-hit-zone-sweet" style={{ left: "30%", width: "40%" }} />
                      </div>
                    </div>
                    <div className="ec-stadium-scoreboard" style={{ margin: "1rem 0 0.5rem 0" }}>
                      <span className="ec-scoreboard-label">CATCHES:</span>
                      <span className="ec-scoreboard-digit">{rhythmHits} / 5</span>
                      <span style={{ margin: "0 6px", color: "rgba(255,255,255,0.2)" }}>|</span>
                      <span className="ec-scoreboard-label">ATTEMPTS:</span>
                      <span className="ec-scoreboard-digit">{playgroundAttempts} / 5</span>
                    </div>
                    <button className="ec-rhythm-action-btn" onClick={handleRhythmHit} disabled={playgroundAttempts >= 5 || gameSuccess}>
                      CATCH ⚽
                    </button>
                  </div>
                )}

                {/* 4. Indoor Stadium Basket Shot Challenge */}
                {activeSchoolLoc.id === "stadium" && (
                  <div className="ec-basketball-court">
                    <div className="ec-basketball-header">
                      <div className="ec-stadium-scoreboard">
                        <span className="ec-scoreboard-label">BASKETS:</span>
                        <span className="ec-scoreboard-digit">{stadiumHits} / 5</span>
                        <span style={{ margin: "0 6px", color: "rgba(255,255,255,0.2)" }}>|</span>
                        <span className="ec-scoreboard-label">SHOTS:</span>
                        <span className="ec-scoreboard-digit">{stadiumAttempts} / 5</span>
                      </div>
                    </div>
                    
                    {/* Basketball Hoop Setup */}
                    <div className="ec-hoop-container">
                      <div className="ec-hoop-backboard">
                        <div className="ec-hoop-inner-square" />
                        <div className="ec-hoop-ring" />
                        <div className="ec-hoop-net" />
                      </div>
                      {/* Glowing Audience Lights in background */}
                      <div className="ec-audience-lights">
                        <span className="ec-audience-light" />
                        <span className="ec-audience-light" style={{ animationDelay: "0.3s" }} />
                        <span className="ec-audience-light" style={{ animationDelay: "0.6s" }} />
                      </div>
                    </div>

                    {/* Horizontal shoot gauge */}
                    <div className="ec-reflex-gauge-container" style={{ margin: "0 auto 1rem auto", width: "90%" }}>
                      <div className="ec-reflex-gauge-critical" />
                      <div className="ec-reflex-gauge-perfect" />
                      <div className="ec-reflex-gauge-needle" style={{ left: `${stadiumNeedlePos}%` }} />
                    </div>

                    <p style={{ fontSize: "0.6rem", color: "#94a3b8", marginBottom: "1rem" }}>
                      Aim for the center green sweet-spot! Press Space or Shoot.
                    </p>

                    <button className="ec-shoot-btn" onClick={handleBasketShoot} disabled={stadiumAttempts >= 5 || gameSuccess}>
                      SHOOT BASKET 🏀
                    </button>
                  </div>
                )}

                {/* 5. Library Subject Riddles */}
                {activeSchoolLoc.id === "library" && (
                  <div className="ec-library-reading-spot">
                    <div className="ec-lib-riddle-box">
                      "{libRiddle.question}"
                    </div>
                    <div className="ec-lib-shelf-grid">
                      {libraryOptions.map((opt, i) => (
                        <div 
                          key={i} 
                          className="ec-lib-book-spine"
                          onClick={() => handleLibrarySelect(opt)}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 6. Laboratory sequence mixer */}
                {activeSchoolLoc.id === "laboratory" && (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "0.7rem", color: "#ffe082", marginBottom: "1.2rem" }}>
                      Mix Recipe sequence: {labTargetSeq.join(" ➔ ")}
                    </p>
                    <div className="ec-lab-flask-dock">
                      {labChemicals.map(chem => {
                        const count = labCurrentSeq.filter(n => n === chem.name).length;
                        return (
                          <div 
                            key={chem.name} 
                            className={`ec-lab-flask-slot ${labCurrentSeq[labCurrentSeq.length - 1] === chem.name ? "active" : ""}`}
                            onClick={() => handleChemicalClick(chem.name)}
                          >
                            <div className="ec-flask-vessel">
                              <div className="ec-flask-liquid" style={{ background: chem.color, height: count > 0 ? "85%" : "40%" }} />
                            </div>
                            <span className="ec-flask-label">{chem.name}</span>
                          </div>
                        );
                      })}
                    </div>
                    <p style={{ fontSize: "0.6rem", color: "#94a3b8" }}>
                      Mixture tubes: {labCurrentSeq.length > 0 ? labCurrentSeq.join(" ➔ ") : "Empty"}
                    </p>
                  </div>
                )}

              </div>

              {/* Level complete congratulations screen overlay */}
              {gameSuccess && (
                <div className="ec-game-success-overlay">
                  <span className="ec-success-emblem">🏆</span>
                  <h3 className="ec-success-title">Quest Balanced!</h3>
                  <p className="ec-success-points">+{successPointsAwarded} Points Awarded to Grade Card</p>

                  <div className="ec-success-badge-reveal">
                    <span className="ec-reveal-badge-icon">{successBadgeEmoji}</span>
                    <span className="ec-reveal-badge-name">{successBadgeAwarded}</span>
                    <span className="ec-reveal-badge-type">DPS Srinagar Badge</span>
                  </div>

                  <button className="ec-success-continue-btn" onClick={handleBackToMap}>
                    Record Progress ➔
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
         STAGE 4: DPS SCHOOL DIGITAL REPORT CARD MODAL
         ========================================================== */}
      {/* ==========================================================
         STAGE 4: DPS SCHOOL DIGITAL REPORT CARD MODAL
         ========================================================== */}
      {phase === "school_report" && (() => {
        // Calculate report card metrics dynamically based on actual gameplay
        const calculatedSemesterXp = Math.floor(xp);
        
        let completedCount = 0;
        let percentSum = 0;
        
        // 📘 1. Academic Performance calculations
        const hasClassroom = schoolCompleted.classroom;
        const classroomPct = hasClassroom ? (classroomScore / 6) * 100 : 0;
        if (hasClassroom) { completedCount++; percentSum += classroomPct; }
        
        const hasLab = schoolCompleted.laboratory;
        const labPct = hasLab ? (laboratoryScore === 5 ? 96 : laboratoryScore === 4 ? 88 : laboratoryScore === 3 ? 75 : 50) : 0;
        if (hasLab) { completedCount++; percentSum += labPct; }
        
        const hasLibrary = schoolCompleted.library;
        const libraryPct = hasLibrary ? (libraryScore / 5) * 100 : 0;
        if (hasLibrary) { completedCount++; percentSum += libraryPct; }
        
        // 🎨 2. Extracurricular activities calculations
        const hasPlayground = schoolCompleted.playground;
        const playgroundPct = hasPlayground ? (playgroundScore / 5) * 100 : 0;
        if (hasPlayground) { completedCount++; percentSum += playgroundPct; }
        
        const hasStadium = schoolCompleted.stadium;
        const stadiumPct = hasStadium ? (stadiumScore / 5) * 100 : 0;
        if (hasStadium) { completedCount++; percentSum += stadiumPct; }
        
        const hasArt = schoolCompleted.artroom;
        const artPct = hasArt ? artroomScore : 0;
        if (hasArt) { completedCount++; percentSum += artPct; }
        
        // Overall Grade Performance
        const overallPercent = completedCount > 0 ? Math.round(percentSum / completedCount) : 0;
        
        // 📅 3. Attendance tracking percentages
        const attendancePercent = Math.round((completedCount / 6) * 100);
        let attendanceRating = "Low Engagement (Needs Improvement)";
        if (completedCount === 6) attendanceRating = "Excellent Attendance (100%)";
        else if (completedCount >= 4) attendanceRating = "Consistent Participation (80%)";
        else if (completedCount >= 3) attendanceRating = "Average Attendance (50%)";
        
        // Overall Semester Rank
        let finalGrade = "Pending Evaluation";
        let semesterGPA = "GPA: 0.0";
        if (completedCount >= 3) {
          if (overallPercent >= 90) {
            finalGrade = "Scholar Distinction 🥇";
            semesterGPA = "GPA: 4.0";
          } else if (overallPercent >= 75) {
            finalGrade = "Merit Student 🌟";
            semesterGPA = "GPA: 3.5";
          } else if (overallPercent >= 60) {
            finalGrade = "Active Scholar 🎓";
            semesterGPA = "GPA: 3.0";
          } else {
            finalGrade = "Needs Improvement 📝";
            semesterGPA = "GPA: 2.0";
          }
        }
        
        const pathwayUnlocked = Object.keys(schoolCompleted).length >= 3;

        // Dynamic Merit Badges list unlocked through actual performance benchmarks
        const dynamicBadges = [];
        if (schoolCompleted.playground && playgroundScore === 5) {
          dynamicBadges.push({ name: "Star Athlete", emoji: "⚽", desc: "Perfect soccer rhythm catches" });
        }
        if (schoolCompleted.stadium && stadiumScore === 5) {
          dynamicBadges.push({ name: "Sports Excellence", emoji: "🏀", desc: "5/5 Basketball hoops scored" });
        }
        if (schoolCompleted.artroom && artroomScore >= 90) {
          dynamicBadges.push({ name: "Creative Mind", emoji: "🎨", desc: `${artroomScore}% Creativity achieved` });
        }
        if (schoolCompleted.classroom && classroomScore === 6) {
          dynamicBadges.push({ name: "Logic Master", emoji: "🧠", desc: "6/6 Correct Algebra Quiz" });
        }
        if (schoolCompleted.library && libraryScore >= 4) {
          dynamicBadges.push({ name: "Library Explorer", emoji: "📚", desc: "All Library riddles solved" });
        }
        if (schoolCompleted.laboratory && laboratoryScore >= 4) {
          dynamicBadges.push({ name: "Science Pro", emoji: "🧪", desc: "Formulated Chemistry Serum" });
        }
        if (completedCount === 6) {
          dynamicBadges.push({ name: "Perfect Attendance", emoji: "📅", desc: "100% Activities completed" });
        }

        return (
          <div className="ec-progress-view" style={{ position: "relative" }}>
            
            {/* Cinematic Floating Top-Left Dashboard Return HUD */}
            <div className="ec-floating-nav-container">
              <button className="ec-cinematic-back-btn" onClick={() => { playSFX("click"); setPhase("school_map"); }}>
                <span>←</span> Back to School Dashboard
              </button>
            </div>

            <div className="ec-report-notebook" style={{ margin: "2rem auto", overflowY: "auto", maxHeight: "85vh" }}>
              
              {/* Elegant floating sparkle overlay particles */}
              <div className="ec-academic-sparkles">
                <div className="ec-sparkle-dot" style={{ top: "12%", left: "10%", animationDelay: "0.2s" }} />
                <div className="ec-sparkle-dot" style={{ top: "30%", left: "90%", animationDelay: "1.4s" }} />
                <div className="ec-sparkle-dot" style={{ top: "55%", left: "5%", animationDelay: "2.5s" }} />
                <div className="ec-sparkle-dot" style={{ top: "78%", left: "82%", animationDelay: "0.7s" }} />
              </div>

              {/* Large Centered DPS Academic Logo and Crest */}
              <div className="ec-report-header">
                <div className="ec-report-logo-crest">🏫</div>
                <div className="ec-report-institution-info">
                  <h3>Delhi Public School, Srinagar</h3>
                  <p>Official Scholastic Achievement Document (2009 - 2023)</p>
                </div>
              </div>

              {/* Student Identification Meta Data */}
              <div className="ec-report-student-meta">
                <div className="ec-meta-row">STUDENT: <strong>Nimra Wani</strong></div>
                <div className="ec-meta-row">ROLL NO: <strong>DPS-2009-04</strong></div>
                <div className="ec-meta-row">SEMESTER: <strong>Primary & Secondary Years</strong></div>
                <div className="ec-meta-row">STATUS: <strong>{pathwayUnlocked ? "Alumni (Graduated)" : "Active Scholar"}</strong></div>
              </div>

              {/* 📘 SECTION 1: ACADEMIC SUBJECTS TABLE */}
              <div className="ec-report-category-section">
                <h4 className="ec-category-header">📘 Section I: Academic Subjects</h4>
                <table className="ec-academic-table">
                  <thead>
                    <tr>
                      <th>Subject Domain & Scope</th>
                      <th>Score</th>
                      <th>Marks</th>
                      <th>Grade</th>
                      <th>Stars</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={hasClassroom ? (classroomScore >= 4 ? "ec-row-excellent" : "ec-row-average") : "ec-row-incomplete"}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <span>📝</span>
                            <strong>Classroom Algebra</strong>
                          </span>
                          <span style={{ fontSize: "0.55rem", opacity: 0.7, paddingLeft: "1.2rem" }}>Algebraic Equation Quizzes</span>
                        </div>
                      </td>
                      <td>{hasClassroom ? `${classroomScore} / 5 Correct` : "Incomplete"}</td>
                      <td>{hasClassroom ? `${classroomScore * 2} / 10` : "—"}</td>
                      <td>
                        <span className={`ec-table-grade-badge ${hasClassroom ? `grade-${classroomScore}` : "grade-0"}`}>
                          {hasClassroom ? (classroomScore === 5 ? "A+" : classroomScore === 4 ? "A" : classroomScore === 3 ? "B+" : classroomScore === 2 ? "C" : classroomScore === 1 ? "D" : "F") : "Pending"}
                        </span>
                      </td>
                      <td>
                        <span className="ec-row-stars-glow">
                          {hasClassroom ? (classroomScore === 5 ? "⭐⭐⭐⭐⭐" : classroomScore === 4 ? "⭐⭐⭐⭐✨" : classroomScore === 3 ? "⭐⭐⭐⭐" : classroomScore === 2 ? "⭐⭐⭐" : classroomScore === 1 ? "⭐⭐" : "☆") : "—"}
                        </span>
                      </td>
                    </tr>
                    <tr className={hasLab ? (laboratoryScore >= 4 ? "ec-row-excellent" : "ec-row-average") : "ec-row-incomplete"}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <span>🧪</span>
                            <strong>Science Laboratory</strong>
                          </span>
                          <span style={{ fontSize: "0.55rem", opacity: 0.7, paddingLeft: "1.2rem" }}>Chemical Synthesis Sequences</span>
                        </div>
                      </td>
                      <td>{hasLab ? `${laboratoryScore} / 5 Formulated` : "Incomplete"}</td>
                      <td>{hasLab ? `${laboratoryScore * 2} / 10` : "—"}</td>
                      <td>
                        <span className={`ec-table-grade-badge ${hasLab ? `grade-${laboratoryScore}` : "grade-0"}`}>
                          {hasLab ? (laboratoryScore === 5 ? "A+" : laboratoryScore === 4 ? "A" : laboratoryScore === 3 ? "B+" : laboratoryScore === 2 ? "C" : laboratoryScore === 1 ? "D" : "F") : "Pending"}
                        </span>
                      </td>
                      <td>
                        <span className="ec-row-stars-glow">
                          {hasLab ? (laboratoryScore === 5 ? "⭐⭐⭐⭐⭐" : laboratoryScore === 4 ? "⭐⭐⭐⭐✨" : laboratoryScore === 3 ? "⭐⭐⭐⭐" : laboratoryScore === 2 ? "⭐⭐⭐" : laboratoryScore === 1 ? "⭐⭐" : "☆") : "—"}
                        </span>
                      </td>
                    </tr>
                    <tr className={hasLibrary ? (libraryScore >= 4 ? "ec-row-excellent" : "ec-row-average") : "ec-row-incomplete"}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <span>📖</span>
                            <strong>Library & Riddles</strong>
                          </span>
                          <span style={{ fontSize: "0.55rem", opacity: 0.7, paddingLeft: "1.2rem" }}>Subject Riddle Researches</span>
                        </div>
                      </td>
                      <td>{hasLibrary ? `${libraryScore} / 5 Found` : "Incomplete"}</td>
                      <td>{hasLibrary ? `${libraryScore * 2} / 10` : "—"}</td>
                      <td>
                        <span className={`ec-table-grade-badge ${hasLibrary ? `grade-${libraryScore}` : "grade-0"}`}>
                          {hasLibrary ? (libraryScore === 5 ? "A+" : libraryScore === 4 ? "A" : libraryScore === 3 ? "B+" : libraryScore === 2 ? "C" : libraryScore === 1 ? "D" : "F") : "Pending"}
                        </span>
                      </td>
                      <td>
                        <span className="ec-row-stars-glow">
                          {hasLibrary ? (libraryScore === 5 ? "⭐⭐⭐⭐⭐" : libraryScore === 4 ? "⭐⭐⭐⭐✨" : libraryScore === 3 ? "⭐⭐⭐⭐" : libraryScore === 2 ? "⭐⭐⭐" : libraryScore === 1 ? "⭐⭐" : "☆") : "—"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 🎨 SECTION 2: CO-CURRICULAR ACTIVITIES TABLE */}
              <div className="ec-report-category-section" style={{ marginTop: "1.5rem" }}>
                <h4 className="ec-category-header">🎨 Section II: Co-Curricular Activities</h4>
                <table className="ec-academic-table">
                  <thead>
                    <tr>
                      <th>Activity Domain & Scope</th>
                      <th>Score</th>
                      <th>Marks</th>
                      <th>Grade</th>
                      <th>Stars</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className={hasPlayground ? (playgroundScore >= 4 ? "ec-row-excellent" : "ec-row-average") : "ec-row-incomplete"}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <span>⚽</span>
                            <strong>Football Ground</strong>
                          </span>
                          <span style={{ fontSize: "0.55rem", opacity: 0.7, paddingLeft: "1.2rem" }}>Soccer Rhythm Catching</span>
                        </div>
                      </td>
                      <td>{hasPlayground ? `${playgroundScore} / 5 Hits` : "Incomplete"}</td>
                      <td>{hasPlayground ? `${playgroundScore * 2} / 10` : "—"}</td>
                      <td>
                        <span className={`ec-table-grade-badge ${hasPlayground ? `grade-${playgroundScore}` : "grade-0"}`}>
                          {hasPlayground ? (playgroundScore === 5 ? "A+" : playgroundScore === 4 ? "A" : playgroundScore === 3 ? "B+" : playgroundScore === 2 ? "C" : playgroundScore === 1 ? "D" : "F") : "Pending"}
                        </span>
                      </td>
                      <td>
                        <span className="ec-row-stars-glow">
                          {hasPlayground ? (playgroundScore === 5 ? "⭐⭐⭐⭐⭐" : playgroundScore === 4 ? "⭐⭐⭐⭐✨" : playgroundScore === 3 ? "⭐⭐⭐⭐" : playgroundScore === 2 ? "⭐⭐⭐" : playgroundScore === 1 ? "⭐⭐" : "☆") : "—"}
                        </span>
                      </td>
                    </tr>
                    <tr className={hasStadium ? (stadiumScore >= 4 ? "ec-row-excellent" : "ec-row-average") : "ec-row-incomplete"}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <span>🏀</span>
                            <strong>Indoor Stadium</strong>
                          </span>
                          <span style={{ fontSize: "0.55rem", opacity: 0.7, paddingLeft: "1.2rem" }}>Reflex Basketball Shoots</span>
                        </div>
                      </td>
                      <td>{hasStadium ? `${stadiumScore} / 5 Baskets` : "Incomplete"}</td>
                      <td>{hasStadium ? `${stadiumScore * 2} / 10` : "—"}</td>
                      <td>
                        <span className={`ec-table-grade-badge ${hasStadium ? `grade-${stadiumScore}` : "grade-0"}`}>
                          {hasStadium ? (stadiumScore === 5 ? "A+" : stadiumScore === 4 ? "A" : stadiumScore === 3 ? "B+" : stadiumScore === 2 ? "C" : stadiumScore === 1 ? "D" : "F") : "Pending"}
                        </span>
                      </td>
                      <td>
                        <span className="ec-row-stars-glow">
                          {hasStadium ? (stadiumScore === 5 ? "⭐⭐⭐⭐⭐" : stadiumScore === 4 ? "⭐⭐⭐⭐✨" : stadiumScore === 3 ? "⭐⭐⭐⭐" : stadiumScore === 2 ? "⭐⭐⭐" : stadiumScore === 1 ? "⭐⭐" : "☆") : "—"}
                        </span>
                      </td>
                    </tr>
                    <tr className={hasArt ? (artroomScore >= 4 ? "ec-row-excellent" : "ec-row-average") : "ec-row-incomplete"}>
                      <td>
                        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                            <span>🎨</span>
                            <strong>Art Room Harmony</strong>
                          </span>
                          <span style={{ fontSize: "0.55rem", opacity: 0.7, paddingLeft: "1.2rem" }}>Color Palette Alignment</span>
                        </div>
                      </td>
                      <td>{hasArt ? `${artroomScore} / 5 Matches` : "Incomplete"}</td>
                      <td>{hasArt ? `${artroomScore * 2} / 10` : "—"}</td>
                      <td>
                        <span className={`ec-table-grade-badge ${hasArt ? `grade-${artroomScore}` : "grade-0"}`}>
                          {hasArt ? (artroomScore === 5 ? "A+" : artroomScore === 4 ? "A" : artroomScore === 3 ? "B+" : artroomScore === 2 ? "C" : artroomScore === 1 ? "D" : "F") : "Pending"}
                        </span>
                      </td>
                      <td>
                        <span className="ec-row-stars-glow">
                          {hasArt ? (artroomScore === 5 ? "⭐⭐⭐⭐⭐" : artroomScore === 4 ? "⭐⭐⭐⭐✨" : artroomScore === 3 ? "⭐⭐⭐⭐" : artroomScore === 2 ? "⭐⭐⭐" : artroomScore === 1 ? "⭐⭐" : "☆") : "—"}
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 📅 SECTION 3: ATTENDANCE & METRICS MATRIX */}
              <div className="ec-report-category-section" style={{ marginTop: "1.5rem" }}>
                <h4 className="ec-category-header">📅 Section III: Attendance & Academic Metrics</h4>
                <div className="ec-attendance-matrix-card" style={{ padding: "1.2rem" }}>
                  <div className="ec-attendance-progress-row">
                    <div className="ec-attendance-progress-labels">
                      <span>MODULES PARTICIPATION RATE</span>
                      <strong>{attendancePercent}% ATTENDANCE</strong>
                    </div>
                    <div className="ec-attendance-progress-bg">
                      <div className="ec-attendance-progress-bar" style={{ width: `${attendancePercent}%` }} />
                    </div>
                  </div>
                  <div className="ec-attendance-details-grid" style={{ marginTop: "1rem" }}>
                    <div className="ec-attendance-detail-item">
                      <span>Completed Modules</span>
                      <strong>{completedCount} / 6 Activities</strong>
                    </div>
                    <div className="ec-attendance-detail-item">
                      <span>Engagement Status</span>
                      <strong style={{ color: completedCount === 6 ? "#16a34a" : completedCount >= 3 ? "#b58d3d" : "#ef4444" }}>
                        {attendanceRating}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Lined Performance Matrix Summary Panel */}
              <div className="ec-report-category-section" style={{ marginTop: "1.5rem" }}>
                <h4 className="ec-category-header">📊 Section IV: Semester Summary Matrix</h4>
                <table className="ec-summary-matrix-table">
                  <tbody>
                    <tr>
                      <td>Total Earned XP: <strong>{calculatedSemesterXp} XP</strong></td>
                      <td>Overall Percentage: <strong>{completedCount > 0 ? `${Math.round(((
                        (classroomScore + laboratoryScore + libraryScore + playgroundScore + stadiumScore + artroomScore) / (completedCount * 5)
                      ) * 100))}%` : "0%"}</strong></td>
                    </tr>
                    <tr>
                      <td>Scholastic Rank: <strong style={{ color: "#b71c1c" }}>{finalGrade}</strong></td>
                      <td>Cumulative CGPA Equivalent: <strong>{semesterGPA}</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Dynamic Collectible Merit Badges Earned Section */}
              <div className="ec-report-badges-showcase" style={{ marginTop: "1.5rem" }}>
                <div className="ec-report-section-title">Academic Merit Badges Earned</div>
                <div className="ec-report-badges-flex">
                  {dynamicBadges.length === 0 ? (
                    <span style={{ fontSize: "0.68rem", color: "#7f0000", fontStyle: "italic" }}>
                      No academic merit badges earned yet. Complete activities to collect DPS prestige medals!
                    </span>
                  ) : (
                    dynamicBadges.map(b => (
                      <div key={b.name} className="ec-report-badge-token" style={{ boxShadow: "0 0 10px rgba(181, 141, 61, 0.18)" }}>
                        <span>{b.emoji}</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span>{b.name}</span>
                          <span style={{ fontSize: "0.5rem", opacity: 0.8, fontWeight: 500 }}>{b.desc}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Motivational Academic Quote Box */}
              <div className="ec-report-academic-quote-box">
                “Every achievement begins with curiosity and effort.”
              </div>

              {/* Principal Signature cursive & Gold Approved Crest stamp */}
              <div className="ec-report-embossed-seal-container">
                <div style={{ display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" }}>
                  <span style={{ fontSize: "0.55rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>ACADEMIC SESSION: <strong style={{ color: "#2c0b0b" }}>2009 - 2023</strong></span>
                  <span style={{ fontSize: "0.55rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>ISSUE AUTHORITY: <strong style={{ color: "#2c0b0b" }}>DPS Srinagar Senate</strong></span>
                  <span style={{ fontSize: "0.55rem", color: "#64748b", textTransform: "uppercase", fontWeight: 700 }}>DATE OF ISSUE: <strong style={{ color: "#2c0b0b" }}>May 19, 2026</strong></span>
                </div>
                
                <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
                  <div className="ec-principal-signature-block">
                    <span className="ec-principal-sig-line">Nimra Wani</span>
                    <span className="ec-principal-label">Approved by Principal</span>
                  </div>
                  <div className="ec-official-dps-stamp">
                    <span className="ec-report-stamp-crest">🏫</span>
                    <span>DPS Srinagar</span>
                    <span>APPROVED</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ==========================================================
         STAGE 5: UNIVERSITY MODERN MAP SCENE
         ========================================================== */}
      {phase === "univ_map" && (
        <div className="ec-map-view">
          <div className="ec-map-container">
            <div className="ec-map-blueprint" />

            <div className="ec-map-header">
              <div className="ec-map-intro">
                <h3>Central University of Kashmir Campus</h3>
                <p>Sleek modern white engineering blocks (2023 - 2027). Explore technically mature labs & code terminals.</p>
              </div>

              {/* Complete university graduation button */}
              {Object.keys(univCompleted).length >= 3 && (
                <div className="ec-map-graduate-action">
                  <button className="ec-graduate-btn" onClick={handleGraduateUniv}>
                    Graduate to engineer <Sparkles size={13} />
                  </button>
                </div>
              )}
            </div>

            {/* University interactive canvas */}
            <div className="ec-map-canvas">
              <svg className="ec-map-pathways" width="100%" height="100%">
                <path d="M 18% 22% L 58% 16% L 75% 45% L 48% 72% L 15% 68% L 35% 40% Z" className="ec-pathway-line" />
              </svg>

              {/* Modern Cyber aesthetic trees */}
              <span className="ec-map-tree" style={{ top: "35%", left: "10%" }}>🌲</span>
              <span className="ec-map-tree" style={{ top: "10%", left: "45%" }}>🌲</span>
              <span className="ec-map-tree" style={{ top: "50%", left: "55%" }}>🌸</span>
              <span className="ec-map-tree" style={{ top: "80%", left: "80%" }}>🌲</span>

              {/* Interactive modern university structures */}
              {UNIV_LOCATIONS.map(loc => {
                const isCompleted = univCompleted[loc.id];
                return (
                  <div 
                    key={loc.id} 
                    className="ec-map-building"
                    style={{ top: loc.top, left: loc.left }}
                    onClick={() => startUnivGame(loc)}
                  >
                    <div className="ec-building-glow-ring" />
                    <div className="ec-building-structure">
                      <span>{loc.emoji}</span>
                      <span className={`ec-building-status-dot ${isCompleted ? "completed" : "pending"}`} />
                      <span className="ec-building-badge">{loc.task.split(" ")[0]}</span>
                    </div>
                    <div className="ec-building-info">
                      <h4 className="ec-building-name">{loc.name}</h4>
                      <p className="ec-building-task">{loc.task}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ec-map-footer">
              <div className="ec-map-instruction">
                <span className="ec-map-instruction-blink" />
                <span>Tap neon terminals to unlock certification credits</span>
              </div>
              <button 
                className={`ec-report-card-trigger-btn ${Object.keys(univCompleted).length > 0 ? "pulse-glow" : ""}`}
                onClick={() => { playSFX("click"); setPhase("univ_transcript"); }}
              >
                🔬 Semester Transcript
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
         STAGE 6: ACTIVE UNIVERSITY GAME VIEW
         ========================================================== */}
      {phase === "univ_game" && activeUnivLoc && (
        <div className="ec-play-view">
          <div className="ec-play-card">
            
            {/* Quest details left panel */}
            <div className="ec-quest-lore-panel">
              <div className="ec-quest-header">
                <span className="ec-quest-tag">University Technical Activity</span>
                <h3 className="ec-quest-title">{activeUnivLoc.name}</h3>
              </div>

              <div className="ec-quest-lore-scroll">
                <p className="ec-quest-lore-text">{activeUnivLoc.description}</p>
                <div className="ec-quest-instructions">
                  <h4>💡 Engineering Guidelines:</h4>
                  <p>{activeUnivLoc.instructions}</p>
                </div>
              </div>

              <div className="ec-quest-back-footer">
                <button className="ec-quest-back-btn" onClick={handleBackToMap}>
                  ◄ Return to Campus
                </button>
                <div className="ec-stat-item" style={{ fontSize: "0.6rem" }}>
                  <span>Credit: {activeUnivLoc.certification}</span>
                </div>
              </div>
            </div>

            {/* University interactive active game arena */}
            <div className="ec-game-interactive-arena">
              <button className="ec-mobile-abort-btn" onClick={handleBackToMap}>
                ◄ Quit Activity
              </button>

              {/* Colour-coded feedback flash banner */}
              {incorrectFlash && (
                <div
                  className="ec-incorrect-flash-banner"
                  style={{
                    background: incorrectFlash.startsWith("correct")
                      ? "rgba(22,163,74,0.88)" : "rgba(185,28,28,0.88)",
                    borderColor: incorrectFlash.startsWith("correct")
                      ? "#4ade80" : "#f87171"
                  }}
                >
                  <span>{incorrectFlash.replace(/^(correct|wrong):/, "")}</span>
                </div>
              )}


              <div className="ec-game-screen">
                
                {/* 1. AI Net Linker */}
                {activeUnivLoc.id === "ailab" && (
                  <div className="ec-ai-network-link">
                    <div className="ec-ai-column">
                      <p style={{ fontSize: "0.62rem", color: "#ffe082" }}>System Inputs:</p>
                      {aiLinks.map(link => {
                        const isMatched = !!aiMatches[link.input];
                        return (
                          <div 
                            key={link.input}
                            className={`ec-ai-connector-node ${selectedAiInput === link.input ? "selected" : ""} ${isMatched ? "matched" : ""}`}
                            onClick={() => !isMatched && handleAiInputClick(link.input)}
                          >
                            {link.input}
                          </div>
                        );
                      })}
                    </div>
                    <div className="ec-ai-column">
                      <p style={{ fontSize: "0.62rem", color: "#ffe082" }}>Target Models:</p>
                      {aiLinks.map(link => {
                        const isMatched = Object.values(aiMatches).includes(link.model);
                        return (
                          <div 
                            key={link.model}
                            className={`ec-ai-connector-node ${selectedAiModel === link.model ? "selected" : ""} ${isMatched ? "matched" : ""}`}
                            onClick={() => !isMatched && handleAiModelClick(link.model)}
                          >
                            {link.model}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. DSA bubble node tree balance */}
                {activeUnivLoc.id === "dsalab" && (
                  <div className="ec-dsa-tree-canvas">
                    <p style={{ fontSize: "0.65rem", textAlign: "center", color: "#38bdf8", marginBottom: "1.2rem" }}>
                      Click values in strictly ascending numerical order:
                    </p>
                    <div className="ec-dsa-nodes-row">
                      {dsaNodes.map((node, i) => (
                        <div 
                          key={node.id} 
                          className={`ec-dsa-bubble-node ${node.sorted ? "completed" : ""}`}
                          onClick={() => handleDsaNodeClick(node.value, i)}
                        >
                          {node.value}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 3. Coding Classroom bugs squasher */}
                {activeUnivLoc.id === "codingclass" && (
                  <div className="ec-coding-deck">
                    <div className="ec-coding-header">
                      <span className="ec-coding-logo">src/App.tsx</span>
                      <span style={{ fontSize: "0.5rem", color: "#ef4444" }}>● ERROR</span>
                    </div>
                    <div className="ec-coding-window">
                      {debugSnippet.code}
                    </div>
                    <div style={{ padding: "0 1.2rem 1.2rem 1.2rem" }}>
                      {debugSnippet.options.map((opt, i) => (
                        <div 
                          key={i} 
                          className="ec-code-option-card"
                          onClick={() => handleDebugSelect(opt)}
                        >
                          ➔ {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Research Library Query selection */}
                {activeUnivLoc.id === "researchlib" && (
                  <div className="ec-coding-deck">
                    <div className="ec-coding-header">
                      <span className="ec-coding-logo">Database Search Query</span>
                      <span style={{ fontSize: "0.52rem", color: "#607d8b" }}>SQL Engine</span>
                    </div>
                    <div className="ec-coding-window" style={{ color: "#ffe082" }}>
                      Target: "{researchQuery.target}"
                    </div>
                    <div style={{ padding: "0 1.2rem 1.2rem 1.2rem" }}>
                      {researchQuery.options.map((opt, i) => (
                        <div 
                          key={i} 
                          className="ec-code-option-card"
                          onClick={() => handleResearchSelect(opt)}
                        >
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 5. Innovation milestones chronological sorter */}
                {activeUnivLoc.id === "innovation" && (
                  <div className="ec-art-easel">
                    <p className="ec-art-instruction">Chronological milestones swap sort:</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                      {scrambledMilestones.map((m, idx) => {
                        const isPlacedCorrectly = correctMilestoneOrder[idx] === m;
                        return (
                          <div 
                            key={m}
                            className="ec-code-option-card"
                            style={{ 
                              borderColor: isPlacedCorrectly ? "#4caf50" : "rgba(255,255,255,0.1)",
                              background: isPlacedCorrectly ? "rgba(76,175,80,0.15)" : "rgba(255,255,255,0.02)",
                              color: isPlacedCorrectly ? "#81c784" : "#38bdf8",
                              display: "flex",
                              justifyContent: "between",
                              alignItems: "center"
                            }}
                            onClick={() => handleMilestoneClick(m)}
                          >
                            <span>Stage {idx + 1}: {m}</span>
                            {isPlacedCorrectly && <span style={{ float: "right" }}>✓ Perfect</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>

              {/* College successfully complete screen overlay */}
              {gameSuccess && (
                <div className="ec-game-success-overlay">
                  <span className="ec-success-emblem">🛡️</span>
                  <h3 className="ec-success-title">Deployment Approved</h3>
                  <p className="ec-success-points">+{successPointsAwarded} Semester Credits Logged</p>

                  <div className="ec-success-badge-reveal">
                    <span className="ec-reveal-badge-icon">{activeUnivLoc.emoji}</span>
                    <span className="ec-reveal-badge-name">{successBadgeAwarded}</span>
                    <span className="ec-reveal-badge-type">CUK Certification</span>
                  </div>

                  <button className="ec-success-continue-btn" onClick={handleBackToMap}>
                    Record Progress ➔
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
         STAGE 7: COLLEGE SEMESTER TRANSCRIPT TRANSCRIPT MODAL
         ========================================================== */}
      {phase === "univ_transcript" && (() => {
        // Dynamic calculations for transcript GPA, Credits, CGPA
        const getLabGpa = (hits: number, completed: boolean) => {
          if (!completed) return { grade: "Pending", gpa: 0 };
          if (hits === 5) return { grade: "A+", gpa: 10.0 };
          if (hits === 4) return { grade: "A", gpa: 9.0 };
          if (hits === 3) return { grade: "B+", gpa: 8.0 };
          if (hits === 2) return { grade: "C", gpa: 6.0 };
          if (hits === 1) return { grade: "D", gpa: 4.0 };
          return { grade: "F", gpa: 0.0 };
        };

        const aiInfo = getLabGpa(ailabScore, !!univCompleted.ailab);
        const dsaInfo = getLabGpa(dsalabScore, !!univCompleted.dsalab);
        const codingInfo = getLabGpa(codingclassScore, !!univCompleted.codingclass);
        const researchInfo = getLabGpa(researchlibScore, !!univCompleted.researchlib);
        const innovationInfo = getLabGpa(innovationScore, !!univCompleted.innovation);

        let totalCredits = 0;
        let weightedGpaSum = 0;
        let completedCourses = 0;

        if (univCompleted.ailab) { totalCredits += 4; weightedGpaSum += aiInfo.gpa * 4; completedCourses++; }
        if (univCompleted.dsalab) { totalCredits += 4; weightedGpaSum += dsaInfo.gpa * 4; completedCourses++; }
        if (univCompleted.codingclass) { totalCredits += 3; weightedGpaSum += codingInfo.gpa * 3; completedCourses++; }
        if (univCompleted.researchlib) { totalCredits += 3; weightedGpaSum += researchInfo.gpa * 3; completedCourses++; }
        if (univCompleted.innovation) { totalCredits += 4; weightedGpaSum += innovationInfo.gpa * 4; completedCourses++; }

        const finalCgpa = totalCredits > 0 ? (weightedGpaSum / totalCredits).toFixed(2) : "0.00";

        let cgpaHonors = "Pending Complete Evaluation";
        if (completedCourses >= 3) {
          const cgpaVal = parseFloat(finalCgpa);
          if (cgpaVal >= 9.0) cgpaHonors = "Dean's Merit List 🏆";
          else if (cgpaVal >= 8.0) cgpaHonors = "First Class with Distinction 🌟";
          else if (cgpaVal >= 6.5) cgpaHonors = "First Class Honors 🎓";
          else if (cgpaVal >= 5.0) cgpaHonors = "Second Class Division 📝";
          else cgpaHonors = "Pass Class";
        }

        // Map labs to real certifications and achievements imported from data.js
        const realCertsEarned: typeof certificates = [];
        const realAchievementsEarned: typeof achievements = [];

        if (univCompleted.ailab) {
          const c1 = certificates.find(c => c.title.includes("OCI 2025 AI Foundations"));
          const c2 = certificates.find(c => c.title.includes("Introduction to AI Concepts"));
          const a1 = achievements.find(a => a.title.includes("Standard-a-Thon"));
          if (c1) realCertsEarned.push(c1);
          if (c2) realCertsEarned.push(c2);
          if (a1) realAchievementsEarned.push(a1);
        }
        if (univCompleted.dsalab) {
          const c1 = certificates.find(c => c.title.includes("DSA in Modern Product"));
          const c2 = certificates.find(c => c.title.includes("Introduction to ML Concepts"));
          const a1 = achievements.find(a => a.title.includes("Code Debugging"));
          if (c1) realCertsEarned.push(c1);
          if (c2) realCertsEarned.push(c2);
          if (a1) realAchievementsEarned.push(a1);
        }
        if (univCompleted.codingclass) {
          const c1 = certificates.find(c => c.title.includes("Prepare Data for ML"));
          const c2 = certificates.find(c => c.title.includes("AI Fundamentals"));
          const c3 = certificates.find(c => c.title.includes("Frappe Framework Workshop"));
          const a1 = achievements.find(a => a.title.includes("Open Build Challenge"));
          if (c1) realCertsEarned.push(c1);
          if (c2) realCertsEarned.push(c2);
          if (c3) realCertsEarned.push(c3);
          if (a1) realAchievementsEarned.push(a1);
        }
        if (univCompleted.researchlib) {
          const c1 = certificates.find(c => c.title.includes("Python for AI"));
          const a1 = achievements.find(a => a.title.includes("Coding Challenge"));
          if (c1) realCertsEarned.push(c1);
          if (a1) realAchievementsEarned.push(a1);
        }
        if (univCompleted.innovation) {
          const a1 = achievements.find(a => a.title.includes("Cursor Kashmir Hackathon"));
          const a2 = achievements.find(a => a.title.includes("Logo Designing"));
          if (a1) realCertsEarned.push(a1);
          if (a2) realAchievementsEarned.push(a2);
        }

        return (
          <div className="ec-progress-view" style={{ position: "relative" }}>
            
            {/* Cinematic Floating Return button */}
            <div className="ec-floating-nav-container">
              <button className="ec-cinematic-back-btn" onClick={() => { playSFX("click"); setPhase("univ_map"); }}>
                <span>←</span> Back to University Map
              </button>
            </div>

            <div className="ec-report-notebook univ-transcript-style" style={{ margin: "2rem auto", overflowY: "auto", maxHeight: "85vh" }}>
              
              {/* Floating aesthetic cyber spark particles */}
              <div className="ec-academic-sparkles">
                <div className="ec-sparkle-dot" style={{ top: "15%", left: "8%", animationDelay: "0.5s", background: "#38bdf8" }} />
                <div className="ec-sparkle-dot" style={{ top: "35%", left: "85%", animationDelay: "1.2s", background: "#60a5fa" }} />
                <div className="ec-sparkle-dot" style={{ top: "60%", left: "10%", animationDelay: "2.1s", background: "#34d399" }} />
                <div className="ec-sparkle-dot" style={{ top: "80%", left: "90%", animationDelay: "0.8s", background: "#a78bfa" }} />
              </div>

              {/* Large Centered CUK Crest Logo */}
              <div className="ec-report-header">
                <div className="ec-report-dps-crest">🎓</div>
                <div className="ec-report-institution-info">
                  <h3>Central University of Kashmir</h3>
                  <p>Official Technical Transcript & Certifications (2023 - 2027)</p>
                </div>
              </div>

              {/* Student Identification Meta Data */}
              <div className="ec-report-student-meta">
                <div className="ec-meta-row">ENGINEER: <strong>Nimra Wani</strong></div>
                <div className="ec-meta-row">CREDIT REF: <strong>CUK-BTECH-23</strong></div>
                <div className="ec-meta-row">DEPARTMENT: <strong>Computer Science & Engineering</strong></div>
                <div className="ec-meta-row">STATUS: <strong>{Object.keys(univCompleted).length >= 3 ? "Graduate Candidate" : "Undergrad Candidate"}</strong></div>
              </div>

              {/* 🔬 UNIVERSITY SEMESTER TRANSCRIPT TABLE */}
              <div className="ec-report-category-section">
                <h4 className="ec-category-header">🔬 Semester Academic Transcript</h4>
                <div style={{ overflowX: "auto" }}>
                  <table className="ec-academic-table">
                    <thead>
                      <tr>
                        <th>Course Module</th>
                        <th>Core Activity Lab Scope</th>
                        <th>Credits</th>
                        <th>Marks</th>
                        <th>Grade</th>
                        <th>GPA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>🧠</span>
                            <strong>Artificial Intelligence</strong>
                          </div>
                        </td>
                        <td>CNN & RNN Topology Linker</td>
                        <td>4.0</td>
                        <td>{univCompleted.ailab ? `${ailabScore * 2} / 10` : "—"}</td>
                        <td>
                          <span className={`ec-table-grade-badge ${univCompleted.ailab ? `grade-${ailabScore}` : ""}`}>
                            {aiInfo.grade}
                          </span>
                        </td>
                        <td>{univCompleted.ailab ? `${aiInfo.gpa.toFixed(1)}` : "—"}</td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>💻</span>
                            <strong>Data Structures & Algo</strong>
                          </div>
                        </td>
                        <td>BST Unbalanced Tree Sorter</td>
                        <td>4.0</td>
                        <td>{univCompleted.dsalab ? `${dsalabScore * 2} / 10` : "—"}</td>
                        <td>
                          <span className={`ec-table-grade-badge ${univCompleted.dsalab ? `grade-${dsalabScore}` : ""}`}>
                            {dsaInfo.grade}
                          </span>
                        </td>
                        <td>{univCompleted.dsalab ? `${dsaInfo.gpa.toFixed(1)}` : "—"}</td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>⌨️</span>
                            <strong>Full-Stack Coding</strong>
                          </div>
                        </td>
                        <td>React & Supabase Bugs Squash</td>
                        <td>3.0</td>
                        <td>{univCompleted.codingclass ? `${codingclassScore * 2} / 10` : "—"}</td>
                        <td>
                          <span className={`ec-table-grade-badge ${univCompleted.codingclass ? `grade-${codingclassScore}` : ""}`}>
                            {codingInfo.grade}
                          </span>
                        </td>
                        <td>{univCompleted.codingclass ? `${codingInfo.gpa.toFixed(1)}` : "—"}</td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>☕</span>
                            <strong>Research Library</strong>
                          </div>
                        </td>
                        <td>Database Search SQL Queries</td>
                        <td>3.0</td>
                        <td>{univCompleted.researchlib ? `${researchlibScore * 2} / 10` : "—"}</td>
                        <td>
                          <span className={`ec-table-grade-badge ${univCompleted.researchlib ? `grade-${researchlibScore}` : ""}`}>
                            {researchInfo.grade}
                          </span>
                        </td>
                        <td>{univCompleted.researchlib ? `${researchInfo.gpa.toFixed(1)}` : "—"}</td>
                      </tr>
                      <tr>
                        <td>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <span>🚀</span>
                            <strong>Innovation Hub</strong>
                          </div>
                        </td>
                        <td>Product Lifecycle Sequencer</td>
                        <td>4.0</td>
                        <td>{univCompleted.innovation ? `${innovationScore * 2} / 10` : "—"}</td>
                        <td>
                          <span className={`ec-table-grade-badge ${univCompleted.innovation ? `grade-${innovationScore}` : ""}`}>
                            {innovationInfo.grade}
                          </span>
                        </td>
                        <td>{univCompleted.innovation ? `${innovationInfo.gpa.toFixed(1)}` : "—"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* 📊 SUMMARY CALCULATOR MATRIX */}
              <div className="ec-report-category-section" style={{ marginTop: "1.5rem" }}>
                <h4 className="ec-category-header">📊 Credit Weighted GPA Summary</h4>
                <div style={{ overflowX: "auto" }}>
                  <table className="ec-summary-matrix-table">
                    <tbody>
                      <tr>
                        <td><strong>Total Completed Credits:</strong></td>
                        <td>{totalCredits} Credits Logged</td>
                        <td><strong>Calculated Weighted CGPA:</strong></td>
                        <td style={{ color: "#38bdf8", fontWeight: 700 }}>{finalCgpa} / 10.0 Scale</td>
                      </tr>
                      <tr>
                        <td><strong>Academic Status:</strong></td>
                        <td>{cgpaHonors}</td>
                        <td><strong>Course Completion Rate:</strong></td>
                        <td>{completedCourses} / 5 Modules ({Math.round((completedCourses / 5) * 100)}%)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Verified Professional Certifications Portfolio Integration */}
              <div className="ec-report-category-section" style={{ marginTop: "1.5rem" }}>
                <h4 className="ec-category-header">🏅 Section V: Verified Credentials Portfolio</h4>
                <p style={{ fontSize: "0.62rem", color: "#64748b", margin: "-6px 0 10px 0" }}>
                  Click any credential token below to open the official verified certificate frame.
                </p>
                <div className="ec-report-badges-flex">
                  {realCertsEarned.length === 0 ? (
                    <span style={{ fontSize: "0.68rem", color: "#38bdf8", fontStyle: "italic" }}>
                      No verified professional credentials loaded yet. Complete the AI, DSA, or Coding Labs!
                    </span>
                  ) : (
                    realCertsEarned.map(c => (
                      <div 
                        key={c.title} 
                        className="ec-report-badge-token" 
                        style={{ background: "rgba(56, 189, 248, 0.08)", borderColor: "rgba(56, 189, 248, 0.2)", cursor: "pointer" }}
                        onClick={() => { playSFX("click"); setSelectedCertForView(c); }}
                      >
                        <span>🛡️</span>
                        <div style={{ display: "flex", flexDirection: "column", gap: "1px" }}>
                          <span style={{ color: "#e2e8f0" }}>{c.title}</span>
                          <span style={{ fontSize: "0.5rem", opacity: 0.8, fontWeight: 500 }}>{c.org} • {c.date}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Hackathon Awards & Achievements Showcase */}
              <div className="ec-report-category-section" style={{ marginTop: "1.5rem" }}>
                <h4 className="ec-category-header">🏆 Section VI: Hackathon & Competitive Achievements</h4>
                <div className="ec-report-badges-flex" style={{ flexDirection: "column", gap: "8px" }}>
                  {realAchievementsEarned.length === 0 ? (
                    <span style={{ fontSize: "0.68rem", color: "#38bdf8", fontStyle: "italic" }}>
                      No hackathon or competition awards verified. Complete AI lab or innovation milestones!
                    </span>
                  ) : (
                    realAchievementsEarned.map(a => (
                      <div 
                        key={a.title} 
                        className="ec-achievement-list-card" 
                        style={{
                          background: "rgba(30, 41, 59, 0.4)",
                          border: "1px solid rgba(56, 189, 248, 0.15)",
                          borderRadius: "6px",
                          padding: "10px",
                          display: "flex",
                          gap: "10px",
                          alignItems: "center"
                        }}
                      >
                        <span style={{ fontSize: "1.2rem" }}>🥇</span>
                        <div>
                          <strong style={{ fontSize: "0.75rem", color: "#38bdf8" }}>{a.title}</strong>
                          <p style={{ fontSize: "0.65rem", color: "#94a3b8", marginTop: "2px", lineHeight: "1.3" }}>{a.desc}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Verification & Registrar Signatures with dynamic SVG seals */}
              <div className="ec-report-embossed-seal-container" style={{ marginTop: "2rem" }}>
                <div className="ec-principal-signature-block">
                  <span className="ec-principal-sig-line" style={{ color: "#38bdf8", fontFamily: "serif" }}>Nimra Wani</span>
                  <span className="ec-principal-label" style={{ color: "#94a3b8" }}>Registrar – Central University of Kashmir</span>
                </div>
                <div className="ec-official-dps-stamp" style={{ border: "2px solid #0284c7", color: "#38bdf8" }}>
                  <span className="ec-report-stamp-crest">🎓</span>
                  <span>CUK SENATE</span>
                  <span>VERIFIED</span>
                </div>
              </div>

            </div>
          </div>
        );
      })()}

      {/* ==========================================================
         STAGE 8: FINAL QUEST GRADUATED COMPLETION SCREEN
         ========================================================== */}
      {phase === "graduated" && (
        <div className="ec-graduated-view">
          <div className="ec-graduated-shield">
            <div className="ec-graduated-ring" />
            <div className="ec-graduated-emblem">🎖️</div>
          </div>

          <div className="ec-graduated-title">
            <h1>CONGRATULATIONS, ENGINEER!</h1>
            <p>Nimra's Campus Quest Accomplished</p>
          </div>

          <p className="ec-graduated-desc">
            You have successfully completed Nimra Wani's complete educational journey. From the nostalgic DPS Srinagar hallways where mathematical and logical foundations were first formed, to the professional CUK coding labs, Supabase architectures, AI topologies, and SynerTech launches, you balanced all logical modules perfectly!
          </p>

          <div style={{ display: "flex", gap: "1rem" }}>
            <button className="ec-finish-btn" onClick={onBack}>
              Finish Quest ◄
            </button>
            <button 
              className="ec-finish-btn" 
              onClick={resetAllProgress} 
              style={{ background: "rgba(239, 68, 68, 0.2)", borderColor: "#ef4444" }}
            >
              Restart Journey <RotateCcw size={13} style={{ marginLeft: "4px" }} />
            </button>
          </div>
        </div>
      )}

      {/* Cinematic Performance Result Overlay */}
      {currentResult && (
        <div className="ec-result-screen-overlay">
          <div className="ec-result-card animate-pop-in">
            <div className="ec-result-glow" />
            <div className="ec-result-ribbon">{currentResult.performance}</div>
            
            <div className="ec-result-emoji-spin">
              {currentResult.emoji}
            </div>

            <h3 className="ec-result-activity-name">{currentResult.activityName}</h3>
            
            <div className="ec-result-stars-container">
              {(() => {
                const totalStars = 5;
                const starVal = currentResult.stars;
                const fullStars = Math.floor(starVal);
                const hasHalf = starVal % 1 !== 0;
                
                return Array.from({ length: totalStars }).map((_, i) => {
                  if (i < fullStars) {
                    return <span key={i} className="ec-star ec-star-gold ec-star-pop">★</span>;
                  } else if (i === fullStars && hasHalf) {
                    return <span key={i} className="ec-star ec-star-half ec-star-pop">★</span>;
                  } else {
                    return <span key={i} className="ec-star ec-star-empty ec-star-fade">☆</span>;
                  }
                });
              })()}
            </div>

            <div className="ec-result-details-grid">
              <div className="ec-result-detail-item">
                <span>Core Score</span>
                <strong>{currentResult.scoreText}</strong>
              </div>
              <div className="ec-result-detail-item">
                <span>Earned Marks</span>
                <strong>{currentResult.marks} / 10</strong>
              </div>
              <div className="ec-result-detail-item">
                <span>Academic Grade</span>
                <strong style={{ color: currentResult.grade === "F" ? "#ef4444" : "#fbbf24" }}>{currentResult.grade}</strong>
              </div>
              <div className="ec-result-detail-item">
                <span>Semester XP</span>
                <strong style={{ color: "#34d399" }}>+{currentResult.xpGained} XP</strong>
              </div>
            </div>

            {currentResult.badgeName && (
              <div className="ec-result-badge-reveal">
                <span className="ec-reveal-badge-icon">{currentResult.badgeEmoji}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", textAlign: "left" }}>
                  <span className="ec-reveal-badge-name">{currentResult.badgeName}</span>
                  <span className="ec-reveal-badge-type">{currentResult.isUniv ? "CUK Credential" : "DPS Srinagar Badge"}</span>
                </div>
              </div>
            )}

            <button className="ec-result-claim-btn" onClick={handleCloseResultScreen}>
              Claim Rewards & Sync Data
            </button>
          </div>
        </div>
      )}

      {/* Digital Certificate Viewer Overlay */}
      {selectedCertForView && (
        <div className="ec-cert-viewer-overlay" onClick={() => setSelectedCertForView(null)}>
          <div className="ec-cert-container" onClick={e => e.stopPropagation()}>
            <button className="ec-cert-close-btn" onClick={() => setSelectedCertForView(null)}>×</button>
            <div className="ec-cert-frame">
              <div className="ec-cert-header">
                <span className="ec-cert-institution-logo">🎓</span>
                <h2 className="ec-cert-org">{selectedCertForView.org || "Central University of Kashmir"}</h2>
                <span className="ec-cert-subtitle">Department of Computer Science & Engineering</span>
              </div>

              <div className="ec-cert-body">
                <p className="ec-cert-award-text">This is to certify that</p>
                <h1 className="ec-cert-student-name">Nimra Wani</h1>
                <p className="ec-cert-fulfillment">has successfully completed the professional curriculum and laboratory examinations for</p>
                <h2 className="ec-cert-title">{selectedCertForView.title || selectedCertForView.name}</h2>
                <p className="ec-cert-skills">Specialization Areas: {selectedCertForView.skills || selectedCertForView.desc || "Systems Architect, Engineering Design"}</p>
              </div>

              <div className="ec-cert-footer">
                <div className="ec-cert-sign-block">
                  <span className="ec-cert-signature">Nimra Wani</span>
                  <span className="ec-cert-sign-label">Registrar Senate</span>
                </div>

                {/* Elegant Gold Seal */}
                <div className="ec-cert-gold-seal">
                  <div className="ec-gold-seal-inner">
                    <span>OFFICIAL</span>
                    <span>CREDENTIAL</span>
                  </div>
                  <div className="ec-seal-ribbon ribbon-left" />
                  <div className="ec-seal-ribbon ribbon-right" />
                </div>

                <div className="ec-cert-sign-block">
                  <span className="ec-cert-date-val">{selectedCertForView.date || "2025"}</span>
                  <span className="ec-cert-sign-label">Date of Issuance</span>
                </div>
              </div>

              <div className="ec-cert-verification">
                <span>Verification ID: CUK-CRED-{Math.floor(100000 + Math.random() * 900000)}</span>
                {selectedCertForView.link && (
                  <a href={selectedCertForView.link} target="_blank" rel="noopener noreferrer" className="ec-cert-verify-link">
                    Verify Credential Online ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
