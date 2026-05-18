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
    top: "22%",
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
    top: "16%",
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
    top: "68%",
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
    top: "72%",
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
    top: "40%",
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
    top: "45%",
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

  // Permanent Report Card scores
  const [classroomScore, setClassroomScore] = useState(0);
  const [artroomScore, setArtroomScore] = useState(0);
  const [playgroundScore, setPlaygroundScore] = useState(0);
  const [stadiumScore, setStadiumScore] = useState(0);
  const [libraryScore, setLibraryScore] = useState(5); // star count
  const [laboratoryScore, setLaboratoryScore] = useState(5); // star count

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
  const [libraryAttempts, setLibraryAttempts] = useState(0);
  const [labAttempts, setLabAttempts] = useState(0);

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
  const aiLinks = [
    { input: "Scan Image Data", model: "CNN Pipeline" },
    { input: "Synthesize Voice", model: "RNN WaveNet" },
    { input: "Predict House Rent", model: "Linear Regression" }
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
  const correctMilestoneOrder = ["Concept Ideation", "React Prototype", "Beta Testing", "Vercel Deploy"];

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

  // ----------------------------------------
  // MINI-GAME INTIALIZERS & ACTION LOGIC
  // ----------------------------------------

  const generateClassroomQuestion = (index: number) => {
    const coefficients = [2, 3, 4, 5, 6, 7];
    const multipliers = [3, 4, 5, 6, 8];
    const A = coefficients[index % coefficients.length];
    const B = multipliers[Math.floor(Math.random() * multipliers.length)];
    const targetVal = A * B + 5;
    
    const expr = `${A} * [X] + 5 = ${targetVal}`;
    const opt = [B, B + 2, Math.max(1, B - 1), B + 4].sort(() => Math.random() - 0.5);

    setChalkQuestion({ expression: expr, answer: B, options: opt });
  };

  const initializeSchoolMiniGame = (id: string) => {
    if (id === "classroom") {
      setClassroomQuestionIndex(0);
      setClassroomCorrectCount(0);
      generateClassroomQuestion(0);
    }
    else if (id === "artroom") {
      setArtroomAttempts(0);
      // Scramble color array
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
      let dir = 4;
      let cur = 0;
      
      if (rhythmInterval.current) clearInterval(rhythmInterval.current);
      rhythmInterval.current = setInterval(() => {
        cur += dir;
        if (cur >= 100 || cur <= 0) dir = -dir;
        setRhythmBallPos(cur);
      }, 30);
    }
    else if (id === "stadium") {
      setStadiumAttempts(0);
      setStadiumHits(0);
      setStadiumNeedlePos(0);
      let d = 5;
      let c = 0;

      if (stadiumInterval.current) clearInterval(stadiumInterval.current);
      stadiumInterval.current = setInterval(() => {
        c += d;
        if (c >= 100 || c <= 0) d = -d;
        setStadiumNeedlePos(c);
      }, 22);
    }
    else if (id === "library") {
      setLibraryAttempts(0);
      // Riddle selection
      const riddles = [
        { question: "I talk of matrices, vectors, structural calculations, and absolute infinite equations.", answer: "Mathematics" },
        { question: "I explore loops, binary compilers, data logic nodes, and dynamic system builders.", answer: "Computer Science" },
        { question: "I look at cosmic pathways, gravity fields, and the cold vast dark particles of galaxies.", answer: "Astrophysics" }
      ];
      const r = riddles[Math.floor(Math.random() * riddles.length)];
      setLibRiddle(r);
    }
    else if (id === "laboratory") {
      setLabAttempts(0);
      // Sequence chemical colors
      const seq = ["Hydrogen", "Oxygen", "Nitrogen"].sort(() => Math.random() - 0.5);
      setLabTargetSeq(seq);
      setLabCurrentSeq([]);
    }
  };

  const initializeUnivMiniGame = (id: string) => {
    if (id === "ailab") {
      setAiMatches({});
      setSelectedAiInput(null);
      setSelectedAiModel(null);
    }
    else if (id === "dsalab") {
      // Scramble Tree values
      const nums = [12, 28, 45, 62, 88].map((v, i) => ({ id: i, value: v, sorted: false }));
      nums.sort(() => Math.random() - 0.5);
      setDsaNodes(nums);
      setDsaExpectedIndex(0);
    }
    else if (id === "codingclass") {
      const bugs = [
        {
          code: "const [data, setData] = useStae(null);\nuseEffect(() => {\n  fetchData();\n}, []);",
          options: [
            "Change useStae to useState",
            "Change useEffect to useMemo",
            "Change fetch to await fetch"
          ],
          answer: "Change useStae to useState"
        },
        {
          code: "supabase\n  .from('exam')\n  .select('*')\n  .equ('id', 12);",
          options: [
            "Change .from to .table",
            "Change .equ to .eq",
            "Change select('*') to select(all)"
          ],
          answer: "Change .equ to .eq"
        }
      ];
      const selected = bugs[Math.floor(Math.random() * bugs.length)];
      setDebugSnippet(selected);
    }
    else if (id === "researchlib") {
      const queries = [
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
        }
      ];
      const selected = queries[Math.floor(Math.random() * queries.length)];
      setResearchQuery(selected);
    }
    else if (id === "innovation") {
      // Scramble milestones
      const list = [...correctMilestoneOrder].sort(() => Math.random() - 0.5);
      setScrambledMilestones(list);
    }
  };

  // ----------------------------------------
  // PLAY INTERACTIONS
  // ----------------------------------------

  // 1. Math block option click (Chalkboard Quiz cumulative flow)
  const handleChalkAnswer = (val: number) => {
    if (classroomQuestionIndex >= 6 || gameSuccess) return;

    const isCorrect = val === chalkQuestion.answer;
    let nextCorrectCount = classroomCorrectCount;

    if (isCorrect) {
      playSFX("click");
      nextCorrectCount = classroomCorrectCount + 1;
      setClassroomCorrectCount(nextCorrectCount);
      setIncorrectFlash("CORRECT! +20 XP");
      setPoints(prev => prev + 20);
      setXp(prev => prev + 30);
      setTimeout(() => setIncorrectFlash(null), 1200);
    } else {
      playSFX("incorrect");
      setPoints(prev => Math.max(0, prev - 5));
      setXp(prev => Math.max(0, prev - 10));
      setIncorrectFlash("WRONG ATTEMPT! -10 XP");
      setTimeout(() => setIncorrectFlash(null), 1200);
    }

    const nextIndex = classroomQuestionIndex + 1;
    setClassroomQuestionIndex(nextIndex);

    if (nextIndex < 6) {
      setTimeout(() => {
        generateClassroomQuestion(nextIndex);
      }, 1300);
    } else {
      setTimeout(() => {
        const finalCorrect = nextCorrectCount;
        setClassroomScore(finalCorrect);
        setSchoolCompleted(prev => ({ ...prev, classroom: true }));
        setEarnedBadges(prev => {
          if (!prev.includes("Logic Prodigy")) return [...prev, "Logic Prodigy"];
          return prev;
        });
        const rewardPoints = finalCorrect * 35;
        triggerSuccessAward(rewardPoints, "Logic Prodigy", "🧠");
      }, 1300);
    }
  };

  // 2. Color gradient block click
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
    let balanced = true;
    for (let i = 0; i < scrambledColors.length; i++) {
      if (scrambledColors[i].color !== correctColorOrder[i]) {
        balanced = false;
      }
    }

    if (balanced) {
      const creativityPercent = Math.max(60, 100 - artroomAttempts * 8);
      setArtroomScore(creativityPercent);
      setSchoolCompleted(prev => ({ ...prev, artroom: true }));
      setEarnedBadges(prev => {
        if (!prev.includes("Creative Visionary")) return [...prev, "Creative Visionary"];
        return prev;
      });
      triggerSuccessAward(180, "Creative Visionary", "✨");
    } else {
      playSFX("incorrect");
      setArtroomAttempts(prev => prev + 1);
      setPoints(prev => Math.max(0, prev - 10));
      setXp(prev => Math.max(0, prev - 15));
      setIncorrectFlash("HARMONY FAILED! TRY AGAIN! -15 XP");
      setTimeout(() => setIncorrectFlash(null), 1500);
    }
  };

  // 3. Rhythm play hit (Playground football Ground catches)
  const handleRhythmHit = () => {
    if (playgroundAttempts >= 5 || gameSuccess) return;

    // Forgiving hitbox: center center range is 30% to 70%
    const isHit = rhythmBallPos >= 30 && rhythmBallPos <= 70;
    let nextHits = rhythmHits;
    
    if (isHit) {
      playSFX("click");
      nextHits = rhythmHits + 1;
      setRhythmHits(nextHits);
      setFootballSnapped(true);
      setPoints(prev => prev + 25);
      setXp(prev => prev + 35);
      setIncorrectFlash("NICE CATCH! ⚽ +35 XP");
      setTimeout(() => {
        setFootballSnapped(false);
        setIncorrectFlash(null);
      }, 1200);
    } else {
      playSFX("incorrect");
      setFootballMissed(true);
      setPoints(prev => Math.max(0, prev - 5));
      setXp(prev => Math.max(0, prev - 10));
      setIncorrectFlash("MISSED BALL! -10 XP");
      setTimeout(() => {
        setFootballMissed(false);
        setIncorrectFlash(null);
      }, 1200);
    }

    const nextAttempts = playgroundAttempts + 1;
    setPlaygroundAttempts(nextAttempts);

    if (nextAttempts >= 5) {
      clearInterval(rhythmInterval.current);
      setTimeout(() => {
        setPlaygroundScore(nextHits);
        setSchoolCompleted(prev => ({ ...prev, playground: true }));
        setEarnedBadges(prev => {
          if (!prev.includes("Star Athlete")) return [...prev, "Star Athlete"];
          return prev;
        });
        const rewardPoints = nextHits * 40;
        triggerSuccessAward(rewardPoints, "Star Athlete", "🏆");
      }, 1400);
    }
  };

  // Keyboard spacebar support for rhythm catch & basket shoots
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (phase === "school_game" && activeSchoolLoc?.id === "playground" && !gameSuccess) {
          e.preventDefault();
          handleRhythmHit();
        }
        else if (phase === "school_game" && activeSchoolLoc?.id === "stadium" && !gameSuccess) {
          e.preventDefault();
          handleBasketShoot();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, rhythmBallPos, activeSchoolLoc, gameSuccess, stadiumNeedlePos, stadiumAttempts]);

  // 4. Indoor Stadium (Basket Shot Challenge shoot trigger)
  const handleBasketShoot = () => {
    if (stadiumAttempts >= 5 || gameSuccess) return;

    const isBasket = stadiumNeedlePos >= 40 && stadiumNeedlePos <= 60;
    let nextHits = stadiumHits;

    if (isBasket) {
      playSFX("click");
      nextHits = stadiumHits + 1;
      setStadiumHits(nextHits);
      setPoints(prev => prev + 30);
      setXp(prev => prev + 40);
      setIncorrectFlash("SWISH! BASKET SCORED! 🏀 +40 XP");
      setTimeout(() => setIncorrectFlash(null), 1200);
    } else {
      playSFX("incorrect");
      setPoints(prev => Math.max(0, prev - 5));
      setXp(prev => Math.max(0, prev - 10));
      setIncorrectFlash("MISSED SHOT! -10 XP");
      setTimeout(() => setIncorrectFlash(null), 1200);
    }

    const nextAttempts = stadiumAttempts + 1;
    setStadiumAttempts(nextAttempts);

    if (nextAttempts >= 5) {
      clearInterval(stadiumInterval.current);
      setTimeout(() => {
        setStadiumScore(nextHits);
        setSchoolCompleted(prev => ({ ...prev, stadium: true }));
        setEarnedBadges(prev => {
          if (!prev.includes("Stadium Champion")) return [...prev, "Stadium Champion"];
          return prev;
        });
        const rewardPoints = nextHits * 40;
        triggerSuccessAward(rewardPoints, "Stadium Champion", "⚡");
      }, 1400);
    }
  };

  // 5. Library riddles book spine select
  const handleLibrarySelect = (ans: string) => {
    if (ans === libRiddle.answer) {
      const starsEarned = Math.max(2, 5 - libraryAttempts);
      setLibraryScore(starsEarned);
      setSchoolCompleted(prev => ({ ...prev, library: true }));
      setEarnedBadges(prev => {
        if (!prev.includes("Scholar of Secrets")) return [...prev, "Scholar of Secrets"];
        return prev;
      });
      triggerSuccessAward(170, "Scholar of Secrets", "📖");
    } else {
      playSFX("incorrect");
      setLibraryAttempts(prev => prev + 1);
      setPoints(prev => Math.max(0, prev - 10));
      setXp(prev => Math.max(0, prev - 15));
      setIncorrectFlash("WRONG CATEGORY! -15 XP");
      setTimeout(() => setIncorrectFlash(null), 1200);
      const riddles = [
        { question: "I talk of matrices, vectors, structural calculations, and absolute infinite equations.", answer: "Mathematics" },
        { question: "I explore loops, binary compilers, data logic nodes, and dynamic system builders.", answer: "Computer Science" },
        { question: "I look at cosmic pathways, gravity fields, and the cold vast dark particles of galaxies.", answer: "Astrophysics" }
      ];
      const r = riddles[Math.floor(Math.random() * riddles.length)];
      setLibRiddle(r);
    }
  };

  // 6. Chemical flask selector click
  const handleChemicalClick = (name: string) => {
    playSFX("click");
    const nextSeq = [...labCurrentSeq, name];
    setLabCurrentSeq(nextSeq);

    let correctSoFar = true;
    for (let i = 0; i < nextSeq.length; i++) {
      if (nextSeq[i] !== labTargetSeq[i]) {
        correctSoFar = false;
      }
    }

    if (!correctSoFar) {
      playSFX("incorrect");
      setLabAttempts(prev => prev + 1);
      setPoints(prev => Math.max(0, prev - 10));
      setXp(prev => Math.max(0, prev - 15));
      setIncorrectFlash("CHEMICAL EXPLO! SEQUENCE RESET! -15 XP");
      setTimeout(() => setIncorrectFlash(null), 1200);
      setLabCurrentSeq([]);
    } else if (nextSeq.length === labTargetSeq.length) {
      const starsEarned = Math.max(2, 5 - labAttempts);
      setLaboratoryScore(starsEarned);
      setSchoolCompleted(prev => ({ ...prev, laboratory: true }));
      setEarnedBadges(prev => {
        if (!prev.includes("Alchemist of Code")) return [...prev, "Alchemist of Code"];
        return prev;
      });
      triggerSuccessAward(190, "Alchemist of Code", "🧪");
    }
  };

  // 7. AI network node connection
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
    const targetLink = aiLinks.find(l => l.input === inputVal);
    if (targetLink && targetLink.model === modelVal) {
      // Match found!
      const newMatches = { ...aiMatches, [inputVal]: modelVal };
      setAiMatches(newMatches);
      setSelectedAiInput(null);
      setSelectedAiModel(null);

      // Check if all matched
      if (Object.keys(newMatches).length === aiLinks.length) {
        setUnivCompleted(prev => ({ ...prev, ailab: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("Microsoft AI Specialist")) return [...prev, "Microsoft AI Specialist"];
          return prev;
        });
        triggerSuccessAward(220, "Microsoft AI Specialist", "🤖");
      }
    } else {
      playSFX("incorrect");
      setPoints(prev => Math.max(0, prev - 15));
      setXp(prev => Math.max(0, prev - 20));
      setIncorrectFlash("-20 XP / -15 Points");
      setTimeout(() => setIncorrectFlash(null), 1500);
      setSelectedAiInput(null);
      setSelectedAiModel(null);
    }
  };

  // 8. DSA search tree ascending select
  const handleDsaNodeClick = (nodeVal: number, idx: number) => {
    playSFX("click");
    // Find absolute sorted list order
    const sortedVals = [...dsaNodes].map(n => n.value).sort((a, b) => a - b);
    const expectedVal = sortedVals[dsaExpectedIndex];

    if (nodeVal === expectedVal) {
      // Correct node clicked in order
      const copy = [...dsaNodes];
      // Mark matching node as sorted
      const foundIdx = copy.findIndex(n => n.value === nodeVal);
      if (foundIdx !== -1) copy[foundIdx].sorted = true;
      setDsaNodes(copy);

      const nextExpected = dsaExpectedIndex + 1;
      setDsaExpectedIndex(nextExpected);

      if (nextExpected === dsaNodes.length) {
        // Balanced BST and array successfully
        setUnivCompleted(prev => ({ ...prev, dsalab: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("NIT algorithms Scholar")) return [...prev, "NIT algorithms Scholar"];
          return prev;
        });
        triggerSuccessAward(250, "NIT algorithms Scholar", "🌳");
      }
    } else {
      playSFX("incorrect");
      setPoints(prev => Math.max(0, prev - 15));
      setXp(prev => Math.max(0, prev - 20));
      setIncorrectFlash("-20 XP / -15 Points");
      setTimeout(() => setIncorrectFlash(null), 1500);
      
      // Reset index and scramble again
      initializeUnivMiniGame("dsalab");
    }
  };

  // 9. Coding debugging syntax cards selection
  const handleDebugSelect = (ans: string) => {
    if (ans === debugSnippet.answer) {
      setUnivCompleted(prev => ({ ...prev, codingclass: true }));
      setEarnedCerts(prev => {
        if (!prev.includes("Full-Stack Web Architect")) return [...prev, "Full-Stack Web Architect"];
        return prev;
      });
      triggerSuccessAward(240, "Full-Stack Web Architect", "⚡");
    } else {
      playSFX("incorrect");
      setPoints(prev => Math.max(0, prev - 15));
      setXp(prev => Math.max(0, prev - 20));
      setIncorrectFlash("-20 XP / -15 Points");
      setTimeout(() => setIncorrectFlash(null), 1500);
      initializeUnivMiniGame("codingclass");
    }
  };

  // 10. Research library catalog query selection
  const handleResearchSelect = (ans: string) => {
    if (ans === researchQuery.answer) {
      setUnivCompleted(prev => ({ ...prev, researchlib: true }));
      setEarnedCerts(prev => {
        if (!prev.includes("Information Architect")) return [...prev, "Information Architect"];
        return prev;
      });
      triggerSuccessAward(210, "Information Architect", "📑");
    } else {
      playSFX("incorrect");
      setPoints(prev => Math.max(0, prev - 15));
      setXp(prev => Math.max(0, prev - 20));
      setIncorrectFlash("-20 XP / -15 Points");
      setTimeout(() => setIncorrectFlash(null), 1500);
      initializeUnivMiniGame("researchlib");
    }
  };

  // 11. Project launch slide milestones click
  const handleMilestoneClick = (val: string) => {
    playSFX("click");
    // Find expected next item in ordered chronological sequence
    const nextExpectedPos = scrambledMilestones.findIndex((m, i) => correctMilestoneOrder[i] !== m);
    if (nextExpectedPos === -1) return; // All sorted

    const clickedPos = scrambledMilestones.indexOf(val);
    if (clickedPos === -1) return;

    // Verify if clicked is the expected one
    const expectedVal = correctMilestoneOrder[nextExpectedPos];
    if (val === expectedVal) {
      // Swap clicked position with expected position
      const copy = [...scrambledMilestones];
      const temp = copy[nextExpectedPos];
      copy[nextExpectedPos] = copy[clickedPos];
      copy[clickedPos] = temp;

      setScrambledMilestones(copy);

      // Verify if fully aligned
      let fullyAligned = true;
      for (let i = 0; i < copy.length; i++) {
        if (copy[i] !== correctMilestoneOrder[i]) {
          fullyAligned = false;
        }
      }

      if (fullyAligned) {
        setUnivCompleted(prev => ({ ...prev, innovation: true }));
        setEarnedCerts(prev => {
          if (!prev.includes("SynerTech Innovation Award")) return [...prev, "SynerTech Innovation Award"];
          return prev;
        });
        triggerSuccessAward(260, "SynerTech Innovation Award", "🥇");
      }
    } else {
      playSFX("incorrect");
      setPoints(prev => Math.max(0, prev - 20));
      setXp(prev => Math.max(0, prev - 25));
      setIncorrectFlash("-25 XP / -20 Points");
      setTimeout(() => setIncorrectFlash(null), 1500);
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
    setLibraryScore(5);
    setLaboratoryScore(5);

    setClassroomQuestionIndex(0);
    setClassroomCorrectCount(0);
    setPlaygroundAttempts(0);
    setStadiumAttempts(0);
    setStadiumHits(0);
    
    setGateOpen(false);
    setTimeout(() => {
      setPhase("entrance");
      startAmbientLoop("school");
      setGateOpen(true);
    }, 1500);
  };

  return (
    <div className={`ec-viewport ${phase.startsWith("univ") || phase === "graduated" ? "univ-theme" : "school-theme"}`}>
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
                <path d="M 18% 22% L 58% 16% L 75% 45% L 48% 72% L 15% 68% L 35% 40% Z" className="ec-pathway-line" />
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
              
              {/* Incorrect Flash Warning Alert */}
              {incorrectFlash && (
                <div className="ec-incorrect-flash-banner">
                  <span>❌</span>
                  <span>INCORRECT ATTEMPT! {incorrectFlash}</span>
                </div>
              )}

              <div className="ec-game-screen">
                
                {/* 1. Classroom Chalkboard logic math */}
                {activeSchoolLoc.id === "classroom" && (
                  <div className="ec-game-board-container">
                    <div className="ec-board-chalk-title">
                      Blackboard (Q {Math.min(6, classroomQuestionIndex + 1)}/6) - Correct: {classroomCorrectCount}/6
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
            
            {/* Cinematic Floating Top-Left Dashboard Return HUD (Visual cleanliness preserved) */}
            <div className="ec-floating-nav-container">
              <button className="ec-cinematic-back-btn" onClick={() => { playSFX("click"); setPhase("school_map"); }}>
                <span>←</span> Back to School Dashboard
              </button>
            </div>

            <div className="ec-report-notebook" style={{ margin: "2rem auto" }}>
              
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
                  <p>Academic Grade Report Card (2009 - 2023)</p>
                </div>
              </div>

              {/* Student Identification Meta Data */}
              <div className="ec-report-student-meta">
                <div className="ec-meta-row">STUDENT: <strong>Nimra Wani</strong></div>
                <div className="ec-meta-row">ROLL NO: <strong>DPS-2009-04</strong></div>
                <div className="ec-meta-row">SEMESTER: <strong>Primary to Secondary</strong></div>
                <div className="ec-meta-row">STATUS: <strong>{pathwayUnlocked ? "Alumni (Graduated)" : "Active Scholar"}</strong></div>
              </div>

              {/* 📘 SECTION 1: ACADEMIC PERFORMANCE */}
              <div className="ec-report-category-section">
                <h4 className="ec-category-header">📘 Academic Performance</h4>
                <div className="ec-report-activities-list">
                  
                  {/* Classroom Quiz Row */}
                  <div className="ec-report-row-card">
                    <div className="ec-report-row-header">
                      <div className="ec-row-title-container">
                        <span className="ec-row-icon-bubble">📝</span>
                        <span className="ec-row-subject-name">Classroom Quiz (Algebra)</span>
                      </div>
                      <span className={`ec-row-rating-badge ${
                        hasClassroom 
                          ? (classroomScore === 6 ? "badge-rating-excellent" : classroomScore >= 5 ? "badge-rating-outstanding" : classroomScore >= 4 ? "badge-rating-verygood" : "badge-rating-good") 
                          : "badge-rating-pending"
                      }`}>
                        {hasClassroom ? (classroomScore === 6 ? "Grade A+" : classroomScore >= 5 ? "Grade A" : classroomScore >= 4 ? "Grade B" : "Grade C") : "Pending"}
                      </span>
                    </div>
                    <div className="ec-report-row-stats">
                      <div className="ec-row-stat-group">
                        <span>Score:</span>
                        <strong>{hasClassroom ? `${classroomScore}/6 Algebra Solved` : "Incomplete"}</strong>
                      </div>
                      <div className="ec-row-stat-group">
                        <span className="ec-row-stars-glow">{hasClassroom ? (classroomScore === 6 ? "⭐⭐⭐⭐⭐" : classroomScore === 5 ? "⭐⭐⭐⭐✨" : classroomScore === 4 ? "⭐⭐⭐⭐" : classroomScore === 3 ? "⭐⭐⭐" : "⭐⭐") : "—"}</span>
                      </div>
                      <div className="ec-row-stat-group">
                        {hasClassroom && <span className="ec-row-stat-xp">+{classroomScore * 30 + 50} XP</span>}
                      </div>
                    </div>
                  </div>

                  {/* Science Laboratory Row */}
                  <div className="ec-report-row-card">
                    <div className="ec-report-row-header">
                      <div className="ec-row-title-container">
                        <span className="ec-row-icon-bubble">🧪</span>
                        <span className="ec-row-subject-name">Science Laboratory (Chemistry)</span>
                      </div>
                      <span className={`ec-row-rating-badge ${
                        hasLab 
                          ? (laboratoryScore === 5 ? "badge-rating-excellent" : laboratoryScore === 4 ? "badge-rating-outstanding" : "badge-rating-verygood") 
                          : "badge-rating-pending"
                      }`}>
                        {hasLab ? (laboratoryScore === 5 ? "Grade A+" : laboratoryScore === 4 ? "Grade A" : "Grade B") : "Pending"}
                      </span>
                    </div>
                    <div className="ec-report-row-stats">
                      <div className="ec-row-stat-group">
                        <span>Accuracy:</span>
                        <strong>{hasLab ? `${labPct}% Synthesis Accuracy` : "Incomplete"}</strong>
                      </div>
                      <div className="ec-row-stat-group">
                        <span className="ec-row-stars-glow">{hasLab ? (laboratoryScore === 5 ? "⭐⭐⭐⭐⭐" : laboratoryScore === 4 ? "⭐⭐⭐⭐" : "⭐⭐⭐") : "—"}</span>
                      </div>
                      <div className="ec-row-stat-group">
                        {hasLab && <span className="ec-row-stat-xp">+190 XP</span>}
                      </div>
                    </div>
                  </div>

                  {/* School Library Row */}
                  <div className="ec-report-row-card">
                    <div className="ec-report-row-header">
                      <div className="ec-row-title-container">
                        <span className="ec-row-icon-bubble">📚</span>
                        <span className="ec-row-subject-name">School Library (Logic & Riddles)</span>
                      </div>
                      <span className={`ec-row-rating-badge ${
                        hasLibrary 
                          ? (libraryScore === 5 ? "badge-rating-excellent" : libraryScore === 4 ? "badge-rating-outstanding" : "badge-rating-verygood") 
                          : "badge-rating-pending"
                      }`}>
                        {hasLibrary ? (libraryScore === 5 ? "Grade A+" : libraryScore === 4 ? "Grade A" : "Grade B") : "Pending"}
                      </span>
                    </div>
                    <div className="ec-report-row-stats">
                      <div className="ec-row-stat-group">
                        <span>Research:</span>
                        <strong>{hasLibrary ? `${libraryScore}/5 Hidden Books Found` : "Incomplete"}</strong>
                      </div>
                      <div className="ec-row-stat-group">
                        <span className="ec-row-stars-glow">{hasLibrary ? (libraryScore === 5 ? "⭐⭐⭐⭐⭐" : libraryScore === 4 ? "⭐⭐⭐⭐" : "⭐⭐⭐") : "—"}</span>
                      </div>
                      <div className="ec-row-stat-group">
                        {hasLibrary && <span className="ec-row-stat-xp">+170 XP</span>}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <hr className="ec-report-divider" />

              {/* 🎨 SECTION 2: EXTRACURRICULAR ACTIVITIES */}
              <div className="ec-report-category-section">
                <h4 className="ec-category-header">🎨 Extracurricular Activities</h4>
                <div className="ec-report-activities-list">
                  
                  {/* Football Ground Row */}
                  <div className="ec-report-row-card">
                    <div className="ec-report-row-header">
                      <div className="ec-row-title-container">
                        <span className="ec-row-icon-bubble">⚽</span>
                        <span className="ec-row-subject-name">Football Ground (Soccer Snaps)</span>
                      </div>
                      <span className={`ec-row-rating-badge ${
                        hasPlayground 
                          ? (playgroundScore === 5 ? "badge-rating-excellent" : playgroundScore >= 3 ? "badge-rating-outstanding" : "badge-rating-verygood") 
                          : "badge-rating-pending"
                      }`}>
                        {hasPlayground ? (playgroundScore === 5 ? "Star Athlete" : playgroundScore >= 3 ? "Pro Striker" : "Active Play") : "Pending"}
                      </span>
                    </div>
                    <div className="ec-report-row-stats">
                      <div className="ec-report-row-stats-row">
                        <span>Performance: <strong>{hasPlayground ? `${playgroundScore}/5 Caught Catches` : "Incomplete"}</strong></span>
                      </div>
                      <div className="ec-row-stat-group">
                        <span className="ec-row-stars-glow">{hasPlayground ? (playgroundScore === 5 ? "⭐⭐⭐⭐⭐" : playgroundScore === 4 ? "⭐⭐⭐⭐" : playgroundScore === 3 ? "⭐⭐⭐" : "⭐⭐") : "—"}</span>
                        {hasPlayground && <span className="ec-row-stat-xp">+{playgroundScore * 40} XP</span>}
                      </div>
                    </div>
                  </div>

                  {/* Indoor Stadium Row */}
                  <div className="ec-report-row-card">
                    <div className="ec-report-row-header">
                      <div className="ec-row-title-container">
                        <span className="ec-row-icon-bubble">🏀</span>
                        <span className="ec-row-subject-name">Indoor Stadium (Basket Shot)</span>
                      </div>
                      <span className={`ec-row-rating-badge ${
                        hasStadium 
                          ? (stadiumScore === 5 ? "badge-rating-excellent" : stadiumScore >= 3 ? "badge-rating-outstanding" : "badge-rating-verygood") 
                          : "badge-rating-pending"
                      }`}>
                        {hasStadium ? (stadiumScore === 5 ? "Sports Excellence" : stadiumScore >= 3 ? "Varsity Player" : "Active Shooter") : "Pending"}
                      </span>
                    </div>
                    <div className="ec-report-row-stats">
                      <div className="ec-report-row-stats-row">
                        <span>Result: <strong>{hasStadium ? `${stadiumScore}/5 Baskets Score` : "Incomplete"}</strong></span>
                      </div>
                      <div className="ec-row-stat-group">
                        <span className="ec-row-stars-glow">{hasStadium ? (stadiumScore === 5 ? "⭐⭐⭐⭐⭐" : stadiumScore === 4 ? "⭐⭐⭐⭐" : stadiumScore === 3 ? "⭐⭐⭐" : "⭐⭐") : "—"}</span>
                        {hasStadium && <span className="ec-row-stat-xp">+{stadiumScore * 40} XP</span>}
                      </div>
                    </div>
                  </div>

                  {/* Art Room Row */}
                  <div className="ec-report-row-card">
                    <div className="ec-report-row-header">
                      <div className="ec-row-title-container">
                        <span className="ec-row-icon-bubble">🎨</span>
                        <span className="ec-row-subject-name">Art Room Harmony (Design)</span>
                      </div>
                      <span className={`ec-row-rating-badge ${
                        hasArt 
                          ? (artroomScore >= 90 ? "badge-rating-excellent" : artroomScore >= 80 ? "badge-rating-outstanding" : "badge-rating-verygood") 
                          : "badge-rating-pending"
                      }`}>
                        {hasArt ? (artroomScore >= 90 ? "Creative Distinction" : artroomScore >= 80 ? "Artisan Honors" : "Active Designer") : "Pending"}
                      </span>
                    </div>
                    <div className="ec-report-row-stats">
                      <div className="ec-report-row-stats-row">
                        <span>Expression: <strong>{hasArt ? `${artroomScore}% Gradients Match` : "Incomplete"}</strong></span>
                      </div>
                      <div className="ec-row-stat-group">
                        <span className="ec-row-stars-glow">{hasArt ? (artroomScore >= 90 ? "⭐⭐⭐⭐⭐" : artroomScore >= 80 ? "⭐⭐⭐⭐" : "⭐⭐⭐") : "—"}</span>
                        {hasArt && <span className="ec-row-stat-xp">+180 XP</span>}
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <hr className="ec-report-divider" />

              {/* 📅 SECTION 3: ATTENDANCE & PARTICIPATION MATRIX */}
              <div className="ec-report-category-section">
                <h4 className="ec-category-header">📅 Attendance & Participation</h4>
                <div className="ec-attendance-matrix-card">
                  <div className="ec-attendance-progress-row">
                    <div className="ec-attendance-progress-labels">
                      <span>MODULES ATTENDED</span>
                      <span>{attendancePercent}% ATTENDANCE</span>
                    </div>
                    <div className="ec-attendance-progress-bg">
                      <div className="ec-attendance-progress-bar" style={{ width: `${attendancePercent}%` }} />
                    </div>
                  </div>
                  <div className="ec-attendance-details-grid">
                    <div className="ec-attendance-detail-item">
                      <span>Completed Modules</span>
                      <strong>{completedCount} / 6 Activities</strong>
                    </div>
                    <div className="ec-attendance-detail-item">
                      <span>Participation Rating</span>
                      <strong style={{ color: completedCount === 6 ? "#16a34a" : completedCount >= 3 ? "#b58d3d" : "#ef4444" }}>
                        {attendanceRating}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>

              <hr className="ec-report-divider" />

              {/* Bottom Lined Performance Matrix Summary Panel */}
              <div className="ec-report-student-meta" style={{ marginTop: "1rem", borderTop: "none", borderBottom: "none", paddingTop: "0" }}>
                <div className="ec-meta-row">TOTAL SEMESTER XP: <strong>{calculatedSemesterXp} XP</strong></div>
                <div className="ec-meta-row">OVERALL PERCENT: <strong>{overallPercent}%</strong></div>
                <div className="ec-meta-row">ACADEMIC RANK: <strong style={{ color: "#b71c1c" }}>{finalGrade}</strong></div>
                <div className="ec-meta-row">SEMESTER EVALUATION: <strong>{semesterGPA}</strong></div>
              </div>

              {/* Dynamic Collectible Merit Badges Earned Section */}
              <div className="ec-report-badges-showcase">
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
                <div className="ec-principal-signature-block">
                  <span className="ec-principal-sig-line">Nimra Wani</span>
                  <span className="ec-principal-label">Approved by Principal – DPS Academic Board</span>
                </div>
                <div className="ec-official-dps-stamp">
                  <span className="ec-report-stamp-crest">🏫</span>
                  <span>DPS Srinagar</span>
                  <span>APPROVED</span>
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

              {/* Incorrect Flash Warning Alert */}
              {incorrectFlash && (
                <div className="ec-incorrect-flash-banner">
                  <span>❌</span>
                  <span>INCORRECT ATTEMPT! {incorrectFlash}</span>
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
      {phase === "univ_transcript" && (
        <div className="ec-progress-view">
          <div className="ec-report-notebook univ-transcript-style">
            
            <div className="ec-report-header">
              <div className="ec-report-dps-crest">🎓</div>
              <div className="ec-report-institution-info">
                <h3>Central University of Kashmir</h3>
                <p>Official Academic transcript & certifications (2023 - 2027)</p>
              </div>
            </div>

            <div className="ec-report-student-meta">
              <div className="ec-meta-row">ENGINEER: <strong>Nimra Wani</strong></div>
              <div className="ec-meta-row">CREDIT REF: <strong>CUK-BTECH-23</strong></div>
              <div className="ec-meta-row">DEPARTMENT: <strong>Computer Engineering</strong></div>
              <div className="ec-meta-row">GPA: <strong>4.0 Perfect Scale</strong></div>
            </div>

            {/* University marks grid */}
            <table className="ec-report-grades-table">
              <thead>
                <tr>
                  <th>Technical Core</th>
                  <th>Lab Work Module</th>
                  <th>Academic Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Artificial Intelligence models</td>
                  <td>AI Lab neural layer mapper</td>
                  <td className="ec-grade-bold">{univCompleted.ailab ? "Passed (10.0)" : "Pending Credit"}</td>
                </tr>
                <tr>
                  <td>Algorithms & Data Structures</td>
                  <td>DSA Lab Tree sorting clicker</td>
                  <td className="ec-grade-bold">{univCompleted.dsalab ? "Passed (10.0)" : "Pending Credit"}</td>
                </tr>
                <tr>
                  <td>Full-Stack web architectures</td>
                  <td>React Supabase bugs squasher</td>
                  <td className="ec-grade-bold">{univCompleted.codingclass ? "Passed (10.0)" : "Pending Credit"}</td>
                </tr>
                <tr>
                  <td>Database search engines</td>
                  <td>Research indexing SQL queries</td>
                  <td className="ec-grade-bold">{univCompleted.researchlib ? "Passed (10.0)" : "Pending Credit"}</td>
                </tr>
                <tr>
                  <td>Product launches & milestones</td>
                  <td>Innovation Hub presentation slide sequence</td>
                  <td className="ec-grade-bold">{univCompleted.innovation ? "Passed (10.0)" : "Pending Credit"}</td>
                </tr>
              </tbody>
            </table>

            {/* Badges showcase section */}
            <div className="ec-report-badges-showcase">
              <div className="ec-report-section-title">Professional Certifications Verified</div>
              <div className="ec-report-badges-flex">
                {earnedCerts.length === 0 ? (
                  <span style={{ fontSize: "0.68rem", color: "#38bdf8" }}>No professional certifications verified yet. Solve labs!</span>
                ) : (
                  earnedCerts.map(c => {
                    const loc = UNIV_LOCATIONS.find(l => l.certification === c);
                    return (
                      <div key={c} className="ec-report-badge-token" style={{ background: "rgba(56,189,248,0.08)" }}>
                        <span>{loc?.emoji}</span>
                        <span>{c}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            <button className="ec-report-close-btn" onClick={() => setPhase("univ_map")}>
              Return to Campus map ◄
            </button>
          </div>
        </div>
      )}

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

    </div>
  );
}
