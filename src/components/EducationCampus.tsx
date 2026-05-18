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

  const initializeSchoolMiniGame = (id: string) => {
    if (id === "classroom") {
      // Logic balanced algebra equations
      const A = Math.floor(Math.random() * 10) + 2;
      const B = Math.floor(Math.random() * 5) + 1;
      const targetVal = A * B + 5;
      
      const expr = `${A} * [X] + 5 = ${targetVal}`;
      const opt = [B, B + 2, Math.max(1, B - 1), B + 4].sort(() => Math.random() - 0.5);

      setChalkQuestion({ expression: expr, answer: B, options: opt });
    }
    else if (id === "artroom") {
      // Scramble color array
      const list = correctColorOrder.map((c, i) => ({ id: i, color: c, order: i }));
      list.sort(() => Math.random() - 0.5);
      setScrambledColors(list);
      setSelectedColorIdx(null);
    }
    else if (id === "playground") {
      // Loop rhythm pos
      setRhythmHits(0);
      setRhythmBallPos(0);
      let dir = 3;
      let cur = 0;
      
      rhythmInterval.current = setInterval(() => {
        cur += dir;
        if (cur >= 100 || cur <= 0) dir = -dir;
        setRhythmBallPos(cur);
      }, 35);
    }
    else if (id === "stadium") {
      // Rapid sweep
      setReflexHits(0);
      setReflexVal(0);
      let d = 4;
      let c = 0;

      reflexInterval.current = setInterval(() => {
        c += d;
        if (c >= 100 || c <= 0) d = -d;
        setReflexVal(c);
      }, 25);
    }
    else if (id === "library") {
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

  // 1. Math block option click
  const handleChalkAnswer = (val: number) => {
    if (val === chalkQuestion.answer) {
      setSchoolCompleted(prev => ({ ...prev, classroom: true }));
      setEarnedBadges(prev => {
        if (!prev.includes("Logic Prodigy")) return [...prev, "Logic Prodigy"];
        return prev;
      });
      triggerSuccessAward(150, "Logic Prodigy", "🧠");
    } else {
      playSFX("incorrect");
      initializeSchoolMiniGame("classroom");
    }
  };

  // 2. Color gradient block click
  const handleArtColorClick = (idx: number) => {
    playSFX("click");
    if (selectedColorIdx === null) {
      setSelectedColorIdx(idx);
    } else {
      // Swap order
      const copy = [...scrambledColors];
      const tempOrder = copy[selectedColorIdx].order;
      copy[selectedColorIdx].order = copy[idx].order;
      copy[idx].order = tempOrder;

      // Sort display copy by final calculated order
      copy.sort((a, b) => a.order - b.order);

      // Verify correct order
      let balanced = true;
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].color !== correctColorOrder[i]) {
          balanced = false;
        }
      }

      if (balanced) {
        setSchoolCompleted(prev => ({ ...prev, artroom: true }));
        setEarnedBadges(prev => {
          if (!prev.includes("Creative Visionary")) return [...prev, "Creative Visionary"];
          return prev;
        });
        triggerSuccessAward(180, "Creative Visionary", "✨");
      } else {
        setScrambledColors(copy);
        setSelectedColorIdx(null);
      }
    }
  };

  // 3. Rhythm play hit
  const handleRhythmHit = () => {
    // Perfect zone is between 40% and 58%
    if (rhythmBallPos >= 40 && rhythmBallPos <= 58) {
      playSFX("click");
      const nextHits = rhythmHits + 1;
      setRhythmHits(nextHits);

      if (nextHits >= 4) {
        clearInterval(rhythmInterval.current);
        setSchoolCompleted(prev => ({ ...prev, playground: true }));
        setEarnedBadges(prev => {
          if (!prev.includes("Star Athlete")) return [...prev, "Star Athlete"];
          return prev;
        });
        triggerSuccessAward(200, "Star Athlete", "🏆");
      }
    } else {
      playSFX("incorrect");
      setRhythmHits(0);
    }
  };

  // Keyboard spacebar support for rhythm catch
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        if (phase === "school_game" && activeSchoolLoc?.id === "playground" && !gameSuccess) {
          e.preventDefault();
          handleRhythmHit();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase, rhythmBallPos, activeSchoolLoc, gameSuccess]);

  // 4. Reflex gauge indicator click
  const handleReflexHit = () => {
    // Perfect middle zone is 48% to 52%
    if (reflexVal >= 45 && reflexVal <= 55) {
      playSFX("click");
      const next = reflexHits + 1;
      setReflexHits(next);

      if (next >= 3) {
        clearInterval(reflexInterval.current);
        setSchoolCompleted(prev => ({ ...prev, stadium: true }));
        setEarnedBadges(prev => {
          if (!prev.includes("Stadium Champion")) return [...prev, "Stadium Champion"];
          return prev;
        });
        triggerSuccessAward(160, "Stadium Champion", "⚡");
      }
    } else {
      playSFX("incorrect");
      setReflexHits(0);
    }
  };

  // 5. Library riddles book spine select
  const handleLibrarySelect = (ans: string) => {
    if (ans === libRiddle.answer) {
      setSchoolCompleted(prev => ({ ...prev, library: true }));
      setEarnedBadges(prev => {
        if (!prev.includes("Scholar of Secrets")) return [...prev, "Scholar of Secrets"];
        return prev;
      });
      triggerSuccessAward(170, "Scholar of Secrets", "📖");
    } else {
      playSFX("incorrect");
      initializeSchoolMiniGame("library");
    }
  };

  // 6. Chemical flask selector click
  const handleChemicalClick = (name: string) => {
    playSFX("click");
    const nextSeq = [...labCurrentSeq, name];
    setLabCurrentSeq(nextSeq);

    // Verify order so far
    let correctSoFar = true;
    for (let i = 0; i < nextSeq.length; i++) {
      if (nextSeq[i] !== labTargetSeq[i]) {
        correctSoFar = false;
      }
    }

    if (!correctSoFar) {
      playSFX("incorrect");
      setLabCurrentSeq([]);
    } else if (nextSeq.length === labTargetSeq.length) {
      // Completed all sequence correctly
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
      // Reset index
      const reset = [...dsaNodes].map(n => ({ ...n, sorted: false }));
      setDsaNodes(reset);
      setDsaExpectedIndex(0);
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
      initializeUnivMiniGame("researchlib");
    }
  };

  // 11. Project launch slide milestones click
  const handleMilestoneClick = (val: string) => {
    playSFX("click");
    // Find expected next item in ordered chronological sequence
    const currentCorrectCount = scrambledMilestones.filter((m, i) => correctMilestoneOrder[i] === m).length;
    
    // Check if clicked val can be placed in first mismatched position
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

      // Verify if full launch accomplished
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
              <div className="ec-game-screen">
                
                {/* 1. Classroom Chalkboard logic math */}
                {activeSchoolLoc.id === "classroom" && (
                  <div className="ec-game-board-container">
                    <div className="ec-board-chalk-title">Blackboard Equations</div>
                    <div className="ec-board-chalk-expression">
                      {chalkQuestion.expression}
                    </div>
                    <div className="ec-board-options-grid">
                      {chalkQuestion.options.map((opt, i) => (
                        <button 
                          key={i} 
                          className="ec-board-option-btn"
                          onClick={() => handleChalkAnswer(opt)}
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
                    <div className="ec-stat-item" style={{ justifyContent: "center" }}>
                      <span>Selected: {selectedColorIdx !== null ? `Box ${selectedColorIdx + 1}` : "None"}</span>
                    </div>
                  </div>
                )}

                {/* 3. Playground Rhythm ball catcher */}
                {activeSchoolLoc.id === "playground" && (
                  <div style={{ textAlign: "center" }}>
                    <div className="ec-rhythm-court">
                      <div className="ec-rhythm-target-circle">
                        <div className="ec-rhythm-target-glow" />
                        🎯
                      </div>
                      <div className="ec-rhythm-ball" style={{ left: `${rhythmBallPos}%` }} />
                      <div className="ec-rhythm-hit-zone-meter">
                        <div className="ec-rhythm-hit-zone-sweet" />
                      </div>
                    </div>
                    <p style={{ fontSize: "0.62rem", margin: "10px 0 0 0", color: "#94a3b8" }}>
                      Accuracy: {rhythmHits} / 4 Success hits
                    </p>
                    <button className="ec-rhythm-action-btn" onClick={handleRhythmHit}>
                      CATCH ⚽
                    </button>
                  </div>
                )}

                {/* 4. Indoor Stadium Speed indicator stop */}
                {activeSchoolLoc.id === "stadium" && (
                  <div className="ec-reflex-arena">
                    <div className="ec-reflex-gauge-container">
                      <div className="ec-reflex-gauge-critical" />
                      <div className="ec-reflex-gauge-perfect" />
                      <div className="ec-reflex-gauge-needle" style={{ left: `${reflexVal}%` }} />
                    </div>
                    <p style={{ fontSize: "0.65rem", marginBottom: "1rem" }}>
                      Goal accuracy: {reflexHits} / 3 Hits
                    </p>
                    <button className="ec-rhythm-action-btn" onClick={handleReflexHit}>
                      STOP NEEDLE 🏟️
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
      {phase === "school_report" && (
        <div className="ec-progress-view">
          <div className="ec-report-notebook">
            
            <div className="ec-report-header">
              <div className="ec-report-dps-crest">🏫</div>
              <div className="ec-report-institution-info">
                <h3>Delhi Public School, Srinagar</h3>
                <p>Academic Grade Report card (2009 - 2023)</p>
              </div>
            </div>

            <div className="ec-report-student-meta">
              <div className="ec-meta-row">STUDENT: <strong>Nimra Wani</strong></div>
              <div className="ec-meta-row">ROLL NO: <strong>DPS-2009-04</strong></div>
              <div className="ec-meta-row">SEMESTER: <strong>Primary to Secondary</strong></div>
              <div className="ec-meta-row">STATUS: <strong>Graduate</strong></div>
            </div>

            {/* Grades matrix table */}
            <table className="ec-report-grades-table">
              <thead>
                <tr>
                  <th>Subject Block</th>
                  <th>Core Activity</th>
                  <th>Academic Grade</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Mathematics & logic</td>
                  <td>Classroom Block Equations</td>
                  <td className="ec-grade-bold">{schoolCompleted.classroom ? "A+ Perfect" : "Incomplete (E)"}</td>
                </tr>
                <tr>
                  <td>Visual Arts & Design</td>
                  <td>Art Room gradient arrangement</td>
                  <td className="ec-grade-bold">{schoolCompleted.artroom ? "A+ Perfect" : "Incomplete (E)"}</td>
                </tr>
                <tr>
                  <td>Physical Athletics</td>
                  <td>Playground Rhythm Sync</td>
                  <td className="ec-grade-bold">{schoolCompleted.playground ? "A+ Perfect" : "Incomplete (E)"}</td>
                </tr>
                <tr>
                  <td>Precision Reflexes</td>
                  <td>Indoor Stadium Goal stops</td>
                  <td className="ec-grade-bold">{schoolCompleted.stadium ? "A+ Perfect" : "Incomplete (E)"}</td>
                </tr>
                <tr>
                  <td>Curiosity & Research</td>
                  <td>School Library subject riddles</td>
                  <td className="ec-grade-bold">{schoolCompleted.library ? "A+ Perfect" : "Incomplete (E)"}</td>
                </tr>
                <tr>
                  <td>Applied Science logic</td>
                  <td>Laboratory sequence mixing</td>
                  <td className="ec-grade-bold">{schoolCompleted.laboratory ? "A+ Perfect" : "Incomplete (E)"}</td>
                </tr>
              </tbody>
            </table>

            {/* Badges showcase section */}
            <div className="ec-report-badges-showcase">
              <div className="ec-report-section-title">Academic Merit Badges Earned</div>
              <div className="ec-report-badges-flex">
                {earnedBadges.length === 0 ? (
                  <span style={{ fontSize: "0.68rem", color: "#7f0000" }}>No academic badges earned yet. Complete activities!</span>
                ) : (
                  earnedBadges.map(b => {
                    const loc = SCHOOL_LOCATIONS.find(l => l.badge === b);
                    return (
                      <div key={b} className="ec-report-badge-token">
                        <span>{loc?.badgeEmoji}</span>
                        <span>{b}</span>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Golden crest stamp signature */}
            <div className="ec-report-golden-seal">
              <span className="ec-report-golden-seal-icon">🏆</span>
              <span>DPS APPROVED</span>
            </div>

            <button className="ec-report-close-btn" onClick={() => setPhase("school_map")}>
              Return to school Campus ◄
            </button>
          </div>
        </div>
      )}

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
