import { useState, useEffect, useRef } from "react";
import { 
  Compass, 
  ArrowLeft, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Info, 
  CornerDownRight,
  Sparkles,
  Award,
  Terminal,
  MousePointerClick
} from "lucide-react";
import "../css/MemoryLab.css";

// -------------------------------------------------------------
// SOUNDSCAPE SYNTHESIZER (WEB AUDIO API)
// -------------------------------------------------------------
let audioCtx: AudioContext | null = null;
let ambientOsc: OscillatorNode | null = null;
let ambientGain: GainNode | null = null;
let pianoOscs: OscillatorNode[] = [];
let pianoGain: GainNode | null = null;

const initAudio = () => {
  if (audioCtx) return;
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  audioCtx = new AudioContextClass();
  
  // 1. Pulsing Ambient Drone (Low Frequency)
  ambientOsc = audioCtx.createOscillator();
  ambientGain = audioCtx.createGain();
  ambientOsc.type = "triangle";
  ambientOsc.frequency.value = 52.0; // G#1, low emotional hum
  ambientGain.gain.value = 0.08;
  
  ambientOsc.connect(ambientGain);
  ambientGain.connect(audioCtx.destination);
  ambientOsc.start();

  // 2. Piano Synthesizer Gain
  pianoGain = audioCtx.createGain();
  pianoGain.gain.value = 0.15;
  pianoGain.connect(audioCtx.destination);
};

const stopAudio = () => {
  if (ambientOsc) {
    try { ambientOsc.stop(); } catch(e){}
    ambientOsc = null;
  }
  pianoOscs.forEach(osc => {
    try { osc.stop(); } catch(e){}
  });
  pianoOscs = [];
  audioCtx = null;
};

// Play a synthesized cozy electric piano note
const playPianoNote = (freq: number, duration = 2.0) => {
  if (!audioCtx || audioCtx.state === "suspended") return;
  
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();
  
  osc.type = "sine";
  osc.frequency.value = freq;
  
  gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
  
  osc.connect(gain);
  if (pianoGain) {
    gain.connect(pianoGain);
  } else {
    gain.connect(audioCtx.destination);
  }
  
  osc.start();
  osc.stop(audioCtx.currentTime + duration);
  pianoOscs.push(osc);
};

// Programmatic sound effects
const playSFX = (type: "lamp" | "sip" | "chime" | "spark" | "rustle") => {
  if (!audioCtx || audioCtx.state === "suspended") return;

  const now = audioCtx.currentTime;
  
  if (type === "lamp") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(80, now + 0.15);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.15);
  } 
  else if (type === "sip") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(350, now);
    osc.frequency.exponentialRampToValueAtTime(600, now + 0.35);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.35);
  } 
  else if (type === "chime") {
    // Sparkle chime arpeggio
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((f, i) => {
      setTimeout(() => {
        if (!audioCtx) return;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(f, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 1.2);
      }, i * 150);
    });
  } 
  else if (type === "spark") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.08);
  }
  else if (type === "rustle") {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(250, now);
    osc.frequency.linearRampToValueAtTime(180, now + 0.25);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(now + 0.25);
  }
};

// -------------------------------------------------------------
// STORY CONTENT & CHAPTER DETAILS
// -------------------------------------------------------------
interface Chapter {
  tag: string;
  title: string;
  defaultText: string;
  props: {
    id: string;
    icon: string;
    label: string;
    sfx: "lamp" | "sip" | "chime" | "spark" | "rustle";
    top: string;
    left: string;
    text: string;
    action?: string;
  }[];
}

const CHAPTERS: Chapter[] = [
  {
    tag: "Chapter I (2009 - 2023)",
    title: "The Spark of Curiosity",
    defaultText: "You have arrived at the childhood workspace in DPS Srinagar. Rain tap-dances gently against the cold window glass outside, while a single desk lamp lights up the desk. A sleeping vintage CRT monitor sits in the center. Select these memory artifacts to see what shaped Nimra's early roots.",
    props: [
      {
        id: "dps-lamp",
        icon: "💡",
        label: "Study Lamp",
        sfx: "lamp",
        top: "20%",
        left: "20%",
        text: "Under this warm study lamp in Delhi Public School Srinagar, curiosity took root. Toggling this light bulb brings memories of late-night reads, simple mathematics, playing around with basic computer logic, and nurturing childhood dreams to build digital worlds.",
        action: "TOGGLE_LAMP"
      },
      {
        id: "dps-crt",
        icon: "📺",
        label: "CRT Monitor",
        sfx: "spark",
        top: "40%",
        left: "50%",
        text: "The vintage CRT monitor is where it all started. Booting up QBasic, creating simple loops, and printing 'Hello World' on the terminal. The screen's electric scanlines and static hum represented the glowing gate to a future in technology.",
        action: "BOOT_MONITOR"
      },
      {
        id: "dps-keyboard",
        icon: "⌨️",
        label: "DPS Desk Keyboard",
        sfx: "rustle",
        top: "70%",
        left: "35%",
        text: "Every clunky keystroke felt like real magic. This keyboard was the vessel for initial coding trials, typing out early scripts, resolving local error codes, and developing high-speed tactile confidence.",
        action: "TYPE_KEYBOARD"
      }
    ]
  },
  {
    tag: "Chapter II (2023 - 2024)",
    title: "The Fire & Late-Night Coffee",
    defaultText: "The classroom transitions into a late-night server den. Scattered textbooks, steaming coffee mugs, and glowing monitors reflect sunset-orange and warm purples. Click these objects to recall the high-intensity learning phase of B.Tech Computer Engineering.",
    props: [
      {
        id: "eng-coffee",
        icon: "☕",
        label: "Steaming Coffee",
        sfx: "sip",
        top: "30%",
        left: "70%",
        text: "Steaming hot coffee was the silent partner in engineering learning. Tapping this mug recalls the flavor of 3:00 AM compiler debugging, balancing complex academic theories, and pushing forward through code exhaustion.",
        action: "SIP_COFFEE"
      },
      {
        id: "eng-book",
        icon: "📚",
        label: "B.Tech Textbook",
        sfx: "rustle",
        top: "60%",
        left: "20%",
        text: "Entering Central University of Kashmir (CUK) opened a universe of formal structures: Data Structures, Algorithms, role-based security layers, and relational PostgreSQL databases. Flipping these pages recalls the rigorous transition from casual coder to real software architect.",
        action: "FLIP_BOOK"
      },
      {
        id: "eng-files",
        icon: "📁",
        label: "Supabase Docs",
        sfx: "spark",
        top: "45%",
        left: "45%",
        text: "Flickering through early project files of Academic Portal CUK. Integrating Supabase backends, auth channels, and schema designs was an intense process of trial, error, and final, victorious database synchronizations.",
        action: "VIEW_FILES"
      }
    ]
  },
  {
    tag: "Chapter III (2024 - 2025)",
    title: "The Collaborative Synergy",
    defaultText: "The scene shifts into a glowing grid of interconnected nodes, trophies, and digital certificates. This memory captures team collaborations, hackathons, open-source leads, and community victories. Touch these artifacts to recall public achievements.",
    props: [
      {
        id: "syn-trophy",
        icon: "🏆",
        label: "Hackathon Trophy",
        sfx: "chime",
        top: "40%",
        left: "50%",
        text: "A perfect sweep of victories: 1st Position in Cyber Conclave, 1st in Open Build Challenge (FOSS United), and 2nd in the Cursor Kashmir Hackathon! Tapping this trophy unleashes celebratory dings recalling the rush of high-pressure building with incredible peers.",
        action: "PLAY_CELEBRATION"
      },
      {
        id: "syn-cert",
        icon: "📜",
        label: "Microsoft & Google Certs",
        sfx: "rustle",
        top: "20%",
        left: "25%",
        text: "Rigorous industry validations! Certificates from Microsoft AI, IBM SkillsBuild, Google Cloud ML APIs, and Oracle Foundations. Each credential represents a verified checkpoint in mastering neural architectures and modern pipelines.",
        action: "SPARK_CERTS"
      },
      {
        id: "syn-lead",
        icon: "👥",
        label: "Campus Lead Badge",
        sfx: "lamp",
        top: "65%",
        left: "75%",
        text: "Serving as Campus Lead at Open Source Global Connect and mentoring in Social Winter of Code (SWOC). Leading was never about authority; it was about empowering junior peers, organizing technical panels, and fostering community sharing.",
        action: "GLOW_LEAD"
      }
    ]
  },
  {
    tag: "Chapter IV (2026+)",
    title: "The Starry Horizon",
    defaultText: "A calm, infinite cosmic void opens up. Glowing holographic panels float in space, displaying developer philosophies. Look through these terminal frames to explore Nimra's visions, resilience, and personal design tenets.",
    props: [
      {
        id: "hor-holo1",
        icon: "🧬",
        label: "Design Tenet",
        sfx: "chime",
        top: "25%",
        left: "45%",
        text: "Philosophy: 'Code is meant to be human-centric and aesthetically satisfying.' Applications shouldn't just run efficiently—they should spark visual wonder and tell a beautiful story that connects with the visitor's emotions.",
        action: "HOLO_BURST"
      },
      {
        id: "hor-holo2",
        icon: "🌌",
        label: "Resilience",
        sfx: "spark",
        top: "55%",
        left: "20%",
        text: "Diagnostics: 'Every server crash, infinite loop beast, and rejected compile is simply a learning milestone in disguise.' Technical persistence under production fire builds the engineering intuition that separates coders from engineers.",
        action: "HOLO_BURST"
      },
      {
        id: "hor-holo3",
        icon: "💫",
        label: "Future Vision",
        sfx: "chime",
        top: "60%",
        left: "70%",
        text: "Looking forward: Building large-scale AI applications, exploring low-latency cloud ecosystems, and continuing to code with absolute passion and visual excellence. The horizon is bright, and the arcade has just begun!",
        action: "HOLO_BURST"
      }
    ]
  }
];

export default function MemoryLab({ onBack }: { onBack: () => void }) {
  const [started, setStarted] = useState(false);
  const [roomIndex, setRoomIndex] = useState(0);
  const [activeText, setActiveText] = useState("");
  const [activeProp, setActiveProp] = useState<string | null>(null);
  const [musicOn, setMusicOn] = useState(false);
  const [gateOpen, setGateOpen] = useState(true);
  
  // Interactive Room States
  const [lampOn, setLampOn] = useState(true);
  const [monitorState, setMonitorState] = useState<"off" | "booting" | "on">("off");
  const [keyboardText, setKeyboardText] = useState("");
  const [sipCount, setSipCount] = useState(0);
  const [flipCount, setFlipCount] = useState(0);
  const [trophySparks, setTrophySparks] = useState(false);
  const [holoActive, setHoloActive] = useState<Record<string, boolean>>({});

  const room = CHAPTERS[roomIndex];

  // 1. CRT monitor typing loop
  useEffect(() => {
    if (monitorState === "booting") {
      let current = "";
      const text = "[SYS] BOOTING SECTOR 01...\n[OK] LOAD MEMORY_CORE.DLL\n[OK] CONNECT CRT SCANLINES\n[OK] HELLO NIMRA!";
      let idx = 0;
      const interval = setInterval(() => {
        current += text[idx];
        setKeyboardText(current);
        idx++;
        if (idx >= text.length) {
          clearInterval(interval);
          setMonitorState("on");
        }
      }, 35);
      return () => clearInterval(interval);
    }
  }, [monitorState]);

  // 2. Play cozy piano arpeggios on room change
  useEffect(() => {
    if (started && musicOn) {
      // Gentle chord progression based on selected room
      // Room 0: Am, Room 1: Fmaj, Room 2: Cmaj, Room 3: Gmaj
      const progressions = [
        [220.0, 261.63, 329.63, 440.0], // A2, C3, E3, A3
        [174.61, 261.63, 349.23, 440.0], // F2, C3, F3, A3
        [261.63, 329.63, 392.00, 523.25], // C3, E3, G3, C4
        [196.00, 293.66, 392.00, 587.33]  // G2, D3, G3, B3
      ];
      const chords = progressions[roomIndex];
      chords.forEach((note, i) => {
        setTimeout(() => {
          playPianoNote(note, 2.5);
        }, i * 350);
      });
    }
  }, [roomIndex, started, musicOn]);

  // 3. Audio initialize/toggle
  const handleToggleMusic = () => {
    if (!musicOn) {
      initAudio();
      if (audioCtx && audioCtx.state === "suspended") {
        audioCtx.resume();
      }
      setMusicOn(true);
    } else {
      stopAudio();
      setMusicOn(false);
    }
  };

  const handleStart = () => {
    initAudio();
    if (audioCtx && audioCtx.state === "suspended") {
      audioCtx.resume();
    }
    setMusicOn(true);
    setGateOpen(false); // Slide doors shut dramatically!
    setTimeout(() => {
      setStarted(true);
      setGateOpen(true); // Slide doors open to reveal the first memory room!
    }, 1600);
  };

  const selectProp = (prop: typeof room.props[0]) => {
    setActiveProp(prop.id);
    playSFX(prop.sfx);

    // Typewriter subtitle animation
    let idx = 0;
    let typed = "";
    const interval = setInterval(() => {
      typed += prop.text[idx];
      setActiveText(typed);
      idx++;
      if (idx >= prop.text.length) {
        clearInterval(interval);
      }
    }, 10);

    // Specific interactive triggers
    if (prop.action === "TOGGLE_LAMP") {
      setLampOn(prev => !prev);
    } 
    else if (prop.action === "BOOT_MONITOR") {
      setMonitorState("booting");
      setKeyboardText("BOOTING SECTOR...");
    } 
    else if (prop.action === "TYPE_KEYBOARD") {
      setKeyboardText(prev => prev + "\n> typing dps_memory_sequence...");
    }
    else if (prop.action === "SIP_COFFEE") {
      setSipCount(prev => prev + 1);
    }
    else if (prop.action === "FLIP_BOOK") {
      setFlipCount(prev => prev + 1);
    }
    else if (prop.action === "PLAY_CELEBRATION") {
      setTrophySparks(true);
      setTimeout(() => setTrophySparks(false), 2000);
    }
    else if (prop.action === "HOLO_BURST") {
      setHoloActive(prev => ({ ...prev, [prop.id]: true }));
      setTimeout(() => {
        setHoloActive(prev => ({ ...prev, [prop.id]: false }));
      }, 2500);
    }
  };

  // Change room with nice door transition
  const navigateRoom = (nextIdx: number) => {
    setGateOpen(false);
    setTimeout(() => {
      setRoomIndex(nextIdx);
      setActiveProp(null);
      setActiveText("");
      setGateOpen(true);
    }, 1600);
  };

  // Generate steam waves array dynamically
  const steamWaves = [
    { id: 1, d: "0s" },
    { id: 2, d: "0.5s" },
    { id: 3, d: "1.2s" }
  ];

  if (!started) {
    return (
      <div className="ml-viewport">
        <div className="ml-vignette" />
        <div className="ml-stars" />
        
        {/* Programmatic Floating Dust Particles */}
        <div className="ml-dust-container">
          {Array.from({ length: 15 }).map((_, i) => (
            <span 
              key={i} 
              className="ml-dust" 
              style={{
                left: `${Math.random() * 100}%`,
                "--tx": `${-100 + Math.random() * 200}px`,
                "--dur": `${12 + Math.random() * 10}s`,
                "--delay": `${Math.random() * 6}s`
              } as any}
            />
          ))}
        </div>

        {/* Transition Gate Doors */}
        <div className="ml-transition-gate">
          <div className={`ml-gate-half ml-gate-top ${gateOpen ? "open" : ""}`}>
            <span className="ml-gate-label">MEMORY LAB</span>
          </div>
          <div className={`ml-gate-half ml-gate-bottom ${gateOpen ? "open" : ""}`}>
            <span className="ml-gate-label">NIMRA WANI</span>
          </div>
        </div>

        <div className="ml-entrance-scene">
          <div className="ml-hallway-lights">
            <span className="ml-hallway-ring" style={{ "--z": "-100px" } as any} />
            <span className="ml-hallway-ring" style={{ "--z": "0px" } as any} />
            <span className="ml-hallway-ring" style={{ "--z": "100px" } as any} />
          </div>

          <div className="ml-entrance-title">
            <h2>🧠 MEMORY LAB</h2>
            <p>
              Step inside a floating atmospheric memory archive. Explore the motivations, coffee-fueled late nights, school sparks, hackathons, and software engineering philosophies that shaped Nimra's path.
            </p>
            <button className="ml-enter-btn" onClick={handleStart}>
              START JOURNEY 🧠
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="ml-viewport">
      <div className="ml-vignette" />
      <div className="ml-stars" />

      {/* Programmatic Floating Dust Particles */}
      <div className="ml-dust-container">
        {Array.from({ length: 18 }).map((_, i) => (
          <span 
            key={i} 
            className="ml-dust" 
            style={{
              left: `${Math.random() * 100}%`,
              "--tx": `${-120 + Math.random() * 240}px`,
              "--dur": `${10 + Math.random() * 12}s`,
              "--delay": `${Math.random() * 5}s`
            } as any}
          />
        ))}
      </div>

      {/* Transition Gate Doors */}
      <div className="ml-transition-gate">
        <div className={`ml-gate-half ml-gate-top ${gateOpen ? "open" : ""}`}>
          <span className="ml-gate-label">TRANSITIONING MEMORY</span>
        </div>
        <div className={`ml-gate-half ml-gate-bottom ${gateOpen ? "open" : ""}`}>
          <span className="ml-gate-label">RETRIEVING ARCHIVE</span>
        </div>
      </div>

      {/* Ambient Audio Pill */}
      <div className="ml-ambient-hint">
        <Volume2 size={12} className="text-violet-400 animate-pulse" />
        <span>AMBIENT SOUNDSCAPE</span>
        <div className="ml-sound-waves">
          <span className="ml-wave-bar" style={{ "--dur": "0.6s" } as any} />
          <span className="ml-wave-bar" style={{ "--dur": "0.9s" } as any} />
          <span className="ml-wave-bar" style={{ "--dur": "0.5s" } as any} />
        </div>
      </div>

      {/* Top HUD Bar */}
      <header className="ml-hud-header">
        <div className="ml-hud-title">
          <div className="ml-hud-logo">
            <Compass className="w-5 h-5 animate-spin" style={{ animationDuration: "12s" }} />
          </div>
          <div className="ml-hud-title-text">
            <h3>Memory Lab</h3>
            <span>Chapter exploration hub</span>
          </div>
        </div>

        <div className="ml-hud-controls">
          <button 
            className="ml-control-btn"
            onClick={handleToggleMusic}
            title={musicOn ? "Mute soundtrack" : "Play soundtrack"}
          >
            {musicOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <button 
            className="ml-control-btn"
            onClick={onBack}
            title="Back to Arcade"
          >
            <ArrowLeft size={16} />
          </button>
        </div>
      </header>

      {/* Timeline Selector Nav */}
      <nav className="ml-timeline-hub">
        <div className="ml-timeline-line" />
        {CHAPTERS.map((ch, idx) => (
          <div 
            key={idx}
            className={`ml-timeline-node ${roomIndex === idx ? "active" : ""}`}
            onClick={() => navigateRoom(idx)}
          >
            <div className="ml-timeline-dot">
              {idx + 1}
            </div>
            <div className="ml-timeline-label">
              {idx === 0 ? "Curiosity" : idx === 1 ? "The Fire" : idx === 2 ? "Synergy" : "Horizon"}
            </div>
          </div>
        ))}
      </nav>

      {/* Active Scene Room View */}
      <div className="ml-scene-container">
        <div className="ml-room-wrapper">
          <div className="ml-room-card">
            
            {/* Left Column: Subtitle Story Screen */}
            <div className="ml-story-side">
              <div>
                <span className="ml-chapter-tag">{room.tag}</span>
                <h1 className="ml-chapter-title">{room.title}</h1>
              </div>

              <div className="ml-story-subtitles">
                <p>
                  {activeText || room.defaultText}
                </p>
              </div>

              {/* Subtitle Interaction Clue */}
              <div className="ml-prompt-bar">
                <span className="ml-prompt-blink" />
                <span>
                  {activeProp ? `INSIGHT: ${room.props.find(p => p.id === activeProp)?.label} resolved` : "Hover & Tap visual elements to explore insights"}
                </span>
              </div>
            </div>

            {/* Right Column: Interactive Graphic Panel */}
            <div className="ml-visual-side">
              
              {/* Chapter 1: The Spark Room */}
              {roomIndex === 0 && (
                <div className="ml-interactive-canvas">
                  {/* Rain Overlay */}
                  <div className="ml-room-rain-window" style={{ opacity: lampOn ? 0.85 : 0.96 }}>
                    <div className="ml-rain-drops" />
                  </div>

                  {/* Prop 1: Desk Lamp */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ top: "18%", left: "15%" }}
                    onClick={() => selectProp(room.props[0])}
                  >
                    <span className="ml-prop-icon">💡</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Study Lamp</span>
                  </div>

                  {/* Prop 2: Vintage CRT Screen */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ top: "35%", right: "12%", left: "auto" }}
                    onClick={() => selectProp(room.props[1])}
                  >
                    <div className="ml-vintage-monitor">
                      <div className={`ml-crt-screen ${monitorState !== "off" ? "on" : ""}`}>
                        <div className="ml-crt-text green">
                          {monitorState === "off" ? "[TAPPED SCREEN TO BOOT]" : keyboardText}
                        </div>
                      </div>
                    </div>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">CRT Monitor</span>
                  </div>

                  {/* Prop 3: DPS Keyboard */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ bottom: "10%", left: "30%" }}
                    onClick={() => selectProp(room.props[2])}
                  >
                    <span className="ml-prop-icon" style={{ fontSize: "2rem" }}>⌨️</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Vintage Keyboard</span>
                  </div>
                </div>
              )}

              {/* Chapter 2: The Fire & Coffee Room */}
              {roomIndex === 1 && (
                <div className="ml-interactive-canvas">
                  
                  {/* Floating Textbook Jars & Papers */}
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div 
                      key={i}
                      className="ml-floating-paper"
                      style={{
                        top: `${20 + i * 20}%`,
                        left: `${10 + i * 15}%`,
                        "--rot": `${-15 + i * 10}deg`,
                        "--dur": `${5 + i * 2}s`,
                        "--delay": `${i * 0.8}s`
                      } as any}
                    />
                  ))}

                  {/* Prop 1: Steaming Coffee */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ top: "25%", right: "18%" }}
                    onClick={() => selectProp(room.props[0])}
                  >
                    <div className="ml-prop-icon">
                      ☕
                      <div className="ml-steam-column">
                        {steamWaves.map((st) => (
                          <span key={st.id} className="ml-steam-waft" style={{ "--d": st.d } as any} />
                        ))}
                      </div>
                    </div>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">
                      {sipCount > 0 ? `Coffee Sip (${sipCount})` : "Sip Coffee"}
                    </span>
                  </div>

                  {/* Prop 2: B.Tech Textbook */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ bottom: "12%", left: "15%" }}
                    onClick={() => selectProp(room.props[1])}
                  >
                    <span className="ml-prop-icon" style={{ fontSize: "3.2rem" }}>📚</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">
                      {flipCount > 0 ? `Pages Flipped (${flipCount})` : "Textbook CUK"}
                    </span>
                  </div>

                  {/* Prop 3: Supabase Database Files */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ top: "45%", left: "40%" }}
                    onClick={() => selectProp(room.props[2])}
                  >
                    <span className="ml-prop-icon">📁</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Academic DB</span>
                  </div>
                </div>
              )}

              {/* Chapter 3: Collaborative Synergy Room */}
              {roomIndex === 2 && (
                <div className="ml-interactive-canvas">
                  
                  {/* Glowing Spark Network */}
                  <div className="ml-sparkle-node" style={{ top: "20%", left: "70%" }} />
                  <div className="ml-sparkle-node" style={{ bottom: "25%", left: "20%" }} />
                  <div className="ml-sparkle-node" style={{ top: "60%", left: "45%" }} />

                  {/* Prop 1: Trophy */}
                  <div 
                    className={`ml-clickable-prop ${trophySparks ? "animate-bounce" : ""}`}
                    style={{ top: "35%", left: "40%" }}
                    onClick={() => selectProp(room.props[0])}
                  >
                    <span className="ml-prop-icon">🏆</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">1st Position Trophy</span>
                  </div>

                  {/* Prop 2: Certificates Scroll */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ top: "15%", left: "15%" }}
                    onClick={() => selectProp(room.props[1])}
                  >
                    <span className="ml-prop-icon">📜</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Validations</span>
                  </div>

                  {/* Prop 3: Leadership Badge */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ bottom: "15%", right: "18%" }}
                    onClick={() => selectProp(room.props[2])}
                  >
                    <span className="ml-prop-icon">👥</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Campus Lead</span>
                  </div>
                </div>
              )}

              {/* Chapter 4: Starry Horizon Room */}
              {roomIndex === 3 && (
                <div className="ml-interactive-canvas">
                  
                  {/* Rotating Orbit rings */}
                  <div className="ml-cosmic-ring" style={{ width: "120px", height: "120px", top: "35%", left: "30%", "--dur": "10s" } as any} />
                  <div className="ml-cosmic-ring" style={{ width: "180px", height: "180px", top: "25%", left: "20%", "--dur": "16s" } as any} />

                  {/* Prop 1: Design Tenet Hologram */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ top: "15%", left: "38%" }}
                    onClick={() => selectProp(room.props[0])}
                  >
                    <span className="ml-prop-icon">🧬</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Philosophy</span>
                  </div>

                  {/* Prop 2: Resilience Hologram */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ bottom: "25%", left: "12%" }}
                    onClick={() => selectProp(room.props[1])}
                  >
                    <span className="ml-prop-icon">🌌</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Resilience</span>
                  </div>

                  {/* Prop 3: Horizon Future Hologram */}
                  <div 
                    className="ml-clickable-prop"
                    style={{ bottom: "20%", right: "12%" }}
                    onClick={() => selectProp(room.props[2])}
                  >
                    <span className="ml-prop-icon">💫</span>
                    <span className="ml-target-ping" />
                    <span className="ml-prop-label">Horizon</span>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>

      {/* Bottom Subtitle / Navigation HUD Bar */}
      <footer className="ml-hud-bottom">
        <div className="text-slate-500 font-mono text-[9px] tracking-wider uppercase">
          [System Security: CUK.MCORE // SECURED]
        </div>

        <div className="ml-room-nav">
          <button 
            className="ml-nav-btn"
            disabled={roomIndex === 0}
            onClick={() => navigateRoom(roomIndex - 1)}
          >
            ← PREV CHAPTER
          </button>
          <button 
            className="ml-nav-btn"
            disabled={roomIndex === CHAPTERS.length - 1}
            onClick={() => navigateRoom(roomIndex + 1)}
          >
            NEXT CHAPTER →
          </button>
        </div>
      </footer>
    </div>
  );
}
