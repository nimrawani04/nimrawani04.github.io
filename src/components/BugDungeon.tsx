import { useState, useEffect, useRef, useCallback } from "react";
import { 
  ArrowLeft, 
  Terminal as TerminalIcon, 
  Cpu, 
  Layers, 
  GitBranch, 
  Wrench, 
  Volume2, 
  VolumeX, 
  Play, 
  CheckCircle, 
  AlertOctagon, 
  Sparkles, 
  Activity, 
  CornerDownLeft,
  Info
} from "lucide-react";
import "../css/BugDungeon.css";

// Interface for server room data models
interface ServerRoom {
  id: string;
  name: string;
  bugType: "loop" | "timeout" | "css" | "merge";
  title: string;
  warningMessage: string;
  realStory: {
    headline: string;
    body: string;
    diagnostics: string;
    learned: string;
  };
}

const SERVER_ROOMS: ServerRoom[] = [
  {
    id: "infinite-loop",
    name: "Server Core #01",
    bugType: "loop",
    title: "Infinite Loop Beast",
    warningMessage: "CRITICAL: System execution thread blocked. CPU usage 100%. Node running infinitely without release condition.",
    realStory: {
      headline: "The Infinite Event Loop Freeze",
      body: "During the development of a recursive data mapping utility for our B.Tech academic portal dashboard, an incorrect exit condition was passed during state initialization, causing the entire browser window to completely lock up and crash for our student users.",
      diagnostics: "The recursion index index++ was checking for total elements in the database, but since an async query was returning undefined on delay, the loop condition was evaluating as undefined < length (always false).",
      learned: "Always implement hard limits (max iterations or break guardrails) on any recursive routines and handle undefined/null states proactively before executing loops."
    }
  },
  {
    id: "api-timeout",
    name: "Database Gateway #02",
    bugType: "timeout",
    title: "API Timeout Ghost",
    warningMessage: "ERROR: 504 Gateway Timeout. Concurrent requests piling up. Pipeline failing to resolve within latency threshold.",
    realStory: {
      headline: "The Concurrent Request Congestion",
      body: "While testing the BIS AI Safety platform under simulated concurrent user traffic, the retrieval augmented generation (RAG) vector search pipeline took longer than 10 seconds to respond, vaporizing requests before they could complete and returning network timeouts.",
      diagnostics: "Every chat message was re-fetching massive vector embedding layers without caching, overwhelming the third-party endpoint during peak usage.",
      learned: "Introduced lazy loading caching layers, limited RAG query token size, added explicit timeout thresholds of 5000ms with smooth retry fallbacks in the frontend."
    }
  },
  {
    id: "css-chaos",
    name: "Interface Grid #03",
    bugType: "css",
    title: "CSS Chaos Monster",
    warningMessage: "WARNING: Layout parameters distorted. Elements overlapping on high-resolution viewports. Flex boundaries compromised.",
    realStory: {
      headline: "The Viewport Height Layout Crash",
      body: "When first rendering the Cottage-Core Kitchen mini-game on 16:9 displays, standard padding parameters pushed the project easel and recipe book beneath the visible bottom boundary of the screen, forcing annoying visual scrollbars and breaking the cozy one-screen immersive aesthetic.",
      diagnostics: "Relying on traditional layout margins combined with viewport height (vh) calculations was pushing absolute containers outside of parent borders on narrow heights.",
      learned: "Leveraged flexbox grid allocations, used CSS min(85vh, 650px) caps, and isolated margins cleanly using box-sizing border-box rules for a unified layout."
    }
  },
  {
    id: "merge-conflict",
    name: "Git Repository #04",
    bugType: "merge",
    title: "Merge Conflict Skeleton",
    warningMessage: "BLOCKED: Git push rejected. Merge conflict detected at remote branch auth synchronization.",
    realStory: {
      headline: "The Concurrent Authentication Collision",
      body: "During a collaborative sprint for the secure university examination portal system, two developers pushed structural changes to the Supabase Row Level Security (RLS) policies simultaneously, resulting in a complex Git merge conflict that blocked the CI/CD pipeline.",
      diagnostics: "Branch A was referencing secure database ports on standard cluster environments, whereas Branch B had updated to custom database clusters, leading to conflicting process.env references.",
      learned: "Maintain strict git flow structures, communicate before pushing database configuration changes, and always merge the main branch into feature branches locally first to resolve differences before pushing."
    }
  }
];

// Web Audio API Synthesizer for procedural industrial atmosphere (No external audio files)
class DungeonAudioEngine {
  ctx: AudioContext | null = null;
  ambientHum: OscillatorNode | null = null;
  humGain: GainNode | null = null;
  soundEnabled = false;

  init() {
    if (this.ctx) return;
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;
      this.ctx = new AudioContextClass();

      // Deep mechanical sub-bass rumble (45Hz)
      this.ambientHum = this.ctx.createOscillator();
      this.ambientHum.type = "sine";
      this.ambientHum.frequency.setValueAtTime(45, this.ctx.currentTime);

      this.humGain = this.ctx.createGain();
      this.humGain.gain.setValueAtTime(0.0, this.ctx.currentTime);

      this.ambientHum.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);
      this.ambientHum.start();
      
      this.soundEnabled = true;
    } catch (e) {
      console.warn("Dungeon Web Audio API not supported", e);
    }
  }

  setVolume(vol: number) {
    if (!this.ctx || !this.humGain || !this.soundEnabled) return;
    this.humGain.gain.setTargetAtTime(vol * 0.18, this.ctx.currentTime, 0.1);
  }

  playClick() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "triangle";
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(10, now + 0.04);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.05);
  }

  playErrorAlarm() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    // Oscillating high-alarm sound (siren sweep)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(550, now);
    osc.frequency.linearRampToValueAtTime(700, now + 0.15);
    osc.frequency.linearRampToValueAtTime(550, now + 0.3);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  playWaterDrip() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = "sine";
    osc.frequency.setValueAtTime(1100, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.08);

    gain.gain.setValueAtTime(0.03, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.09);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.1);
  }

  playElectricSpark() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    // Quick burst of high-passed white noise
    const bufferSize = this.ctx.sampleRate * 0.08;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(2500, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.05, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);

    noiseNode.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noiseNode.start(now);
    noiseNode.stop(now + 0.09);
  }

  playResolveChime() {
    if (!this.ctx || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    // Arpeggio chord in major key
    const chord = [293.66, 369.99, 440.00, 587.33, 739.99]; // D Major arpeggio
    chord.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + i * 0.06);
      gain.gain.setValueAtTime(0, now + i * 0.06);
      gain.gain.linearRampToValueAtTime(0.04, now + i * 0.06 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.06 + 0.9);
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      osc.start(now + i * 0.06);
      osc.stop(now + i * 0.06 + 1.0);
    });
  }

  stop() {
    if (this.ambientHum) { try { this.ambientHum.stop(); } catch(e){} }
    if (this.ctx) { try { this.ctx.close(); } catch(e){} }
  }
}

export default function BugDungeon({ onBack }: { onBack: () => void }) {
  const [phase, setPhase] = useState<"elevator" | "dungeon">("elevator");
  const [elevatorOpen, setElevatorOpen] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  
  // Dungeon state tracking
  const [activeRoom, setActiveRoom] = useState<ServerRoom>(SERVER_ROOMS[0]);
  const [resolvedRooms, setResolvedRooms] = useState<Set<string>>(new Set());
  const [showStory, setShowStory] = useState(false);
  
  // Log entries inside typewriter console
  const [logs, setLogs] = useState<string[]>([]);

  // Web Audio Synth reference
  const synthRef = useRef<DungeonAudioEngine | null>(null);

  // Micro-sparks animation states
  const [sparksList, setSparksList] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);

  // Individual Puzzle Mechanics States
  // Loop puzzle alignment parameters
  const [loopNodeActive, setLoopNodeActive] = useState<number>(0);
  const [loopSpeed, setLoopSpeed] = useState<number>(1);
  const [loopCodeInput, setLoopCodeInput] = useState<string>("");

  // Timeout puzzle parameters
  const [timeoutLimit, setTimeoutLimit] = useState<number>(100);
  const [timeoutRetries, setTimeoutRetries] = useState<number>(1);
  const [apiFetching, setApiFetching] = useState<boolean>(false);

  // CSS puzzle alignment parameters
  const [cssDirection, setCssDirection] = useState<string>("row");
  const [cssJustify, setCssJustify] = useState<string>("center");
  const [cssAlign, setCssAlign] = useState<string>("center");

  // Merge Conflict puzzle selected option
  const [mergeOptionSelected, setMergeOptionSelected] = useState<string>("");

  // Handle synthesized sound toggles
  const handleToggleSound = useCallback(() => {
    if (!synthRef.current) return;
    if (audioOn) {
      synthRef.current.setVolume(0);
      setAudioOn(false);
    } else {
      synthRef.current.init();
      synthRef.current.setVolume(0.35);
      setAudioOn(true);
    }
  }, [audioOn]);

  // Initial door sequences
  useEffect(() => {
    const t1 = setTimeout(() => {
      setElevatorOpen(true);
    }, 1800);

    const t2 = setTimeout(() => {
      setPhase("dungeon");
    }, 3000);

    // Initial logs loading
    setLogs([
      "INITIALIZING DIAGNOSTIC TERMINAL MODULE...",
      "DIAGNOSTIC UNIT ONLINE. VERIFYING SECTOR INTEGRITY.",
      "WARNING: 4 SECTORS CORRUPTED BY RUNTIME EXCEPTIONS.",
      "PLEASE SELECT A SECTOR TERMINAL IN THE SIDEBAR TO INVESTIGATE..."
    ]);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      if (synthRef.current) {
        synthRef.current.stop();
      }
    };
  }, []);

  // Initialize synthesized sound Ref
  useEffect(() => {
    synthRef.current = new DungeonAudioEngine();
    return () => {
      if (synthRef.current) synthRef.current.stop();
    };
  }, []);

  // Ambient drip & electric sparks simulator loop
  useEffect(() => {
    if (phase !== "dungeon") return;

    const timer = setInterval(() => {
      // 1. Drip trigger (sound only)
      if (Math.random() > 0.6 && synthRef.current && audioOn) {
        synthRef.current.playWaterDrip();
      }

      // 2. Electric spark trigger
      if (Math.random() > 0.4 && !resolvedRooms.has(activeRoom.id)) {
        if (synthRef.current && audioOn) {
          synthRef.current.playElectricSpark();
        }
        
        // Spawn sparks in random UI element coordinate
        const container = document.getElementById("bd-puzzle-area");
        if (container) {
          const rect = container.getBoundingClientRect();
          const sx = Math.random() * rect.width;
          const sy = Math.random() * rect.height;
          
          const newSparks = [];
          for (let i = 0; i < 8; i++) {
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 4;
            newSparks.push({
              id: Date.now() + i + Math.random(),
              x: sx,
              y: sy,
              vx: Math.cos(angle) * velocity,
              vy: Math.sin(angle) * velocity
            });
          }
          setSparksList((prev) => [...prev, ...newSparks]);
          
          // Clear sparks soon
          setTimeout(() => {
            setSparksList((prev) => prev.filter((s) => !newSparks.includes(s)));
          }, 600);
        }
      }
    }, 1800);

    return () => clearInterval(timer);
  }, [phase, activeRoom, resolvedRooms, audioOn]);

  // Terminal console logger helper
  const addConsoleLog = (text: string, type: "info" | "err" | "success" = "info") => {
    const formatted = type === "err" ? `[ERR] ${text}` : type === "success" ? `[OK] ${text}` : `[SYS] ${text}`;
    setLogs((prev) => [...prev, formatted]);
    
    // Auto Scroll Logs container
    setTimeout(() => {
      const el = document.getElementById("bd-logs");
      if (el) el.scrollTop = el.scrollHeight;
    }, 50);
  };

  // Change Active server room terminal
  const selectRoom = (room: ServerRoom) => {
    if (synthRef.current && audioOn) synthRef.current.playClick();
    setActiveRoom(room);
    setShowStory(false);

    // Reset loop states
    setLoopCodeInput("");
    setLoopNodeActive(0);

    // Reset API state
    setApiFetching(false);

    // Reset CSS state
    setCssDirection("row");
    setCssJustify("center");
    setCssAlign("center");

    // Reset Merge states
    setMergeOptionSelected("");

    addConsoleLog(`CONNECTED TO PORT: ${room.name} (${room.title}).`);
    addConsoleLog(room.warningMessage, resolvedRooms.has(room.id) ? "success" : "err");
  };

  // Solve Action: Stabilizes the active room
  const handleResolveActiveRoom = () => {
    const updated = new Set(resolvedRooms);
    updated.add(activeRoom.id);
    setResolvedRooms(updated);

    if (synthRef.current && audioOn) {
      synthRef.current.playResolveChime();
    }

    addConsoleLog(`SUCCESS: CORRUPTED VECTOR IN ${activeRoom.name} FULLY RECOVERED!`, "success");
    addConsoleLog("SYSTEM STATE: STABLE. TRANSITION TO STORYBOARD RETRIEVAL SEQUENCE...", "info");

    // Pull overlay story panel
    setTimeout(() => {
      setShowStory(true);
    }, 1000);
  };

  // Puzzle Actions
  // 1. Loop beast breaker check
  const handleLoopInject = (code: string) => {
    if (synthRef.current && audioOn) synthRef.current.playClick();
    setLoopCodeInput(code);

    if (code === "break;") {
      addConsoleLog("BREAK condition injected. Intercepting spin thread...");
      setTimeout(() => {
        handleResolveActiveRoom();
      }, 1000);
    } else {
      if (synthRef.current && audioOn) synthRef.current.playErrorAlarm();
      addConsoleLog("INJECTION INVALID. Loop continuing endlessly...", "err");
    }
  };

  // 2. API Timeout recovery
  const handleApiRequest = () => {
    if (synthRef.current && audioOn) synthRef.current.playClick();
    setApiFetching(true);
    addConsoleLog(`ATTEMPTING ENDPOINT SYNC (Latency max: ${timeoutLimit}ms, Retries allowed: ${timeoutRetries})...`);

    setTimeout(() => {
      // If user increased latency threshold to high and retry limits reasonably
      if (timeoutLimit >= 3000 && timeoutRetries >= 3) {
        setApiFetching(false);
        addConsoleLog("GATEWAY HANDSHAKE RESOLVED. Status: 200 OK.", "success");
        handleResolveActiveRoom();
      } else {
        setApiFetching(false);
        if (synthRef.current && audioOn) synthRef.current.playErrorAlarm();
        addConsoleLog(`ERROR: Connection timed out before gateway response (limit set to ${timeoutLimit}ms).`, "err");
        addConsoleLog("DIAGNOSTIC: Re-configure timeout buffer slider to >= 3000ms & retry counts to >= 3.", "info");
      }
    }, 1200);
  };

  // 3. CSS Chaos Re-alignment check
  const handleCssCheck = () => {
    if (synthRef.current && audioOn) synthRef.current.playClick();

    if (cssDirection === "column" && cssJustify === "space-between" && cssAlign === "stretch") {
      addConsoleLog("LAYOUT FLEXBOX MATRIX MATCHED. Snapping components...", "success");
      setTimeout(() => {
        handleResolveActiveRoom();
      }, 800);
    } else {
      if (synthRef.current && audioOn) synthRef.current.playErrorAlarm();
      addConsoleLog("LAYOUT VERIFICATION FAILED. Grid elements overlapping.", "err");
      addConsoleLog("DIAGNOSTICS: Target parameters must read direction: column, justify: space-between, align: stretch.", "info");
    }
  };

  // 4. Git merge conflict resolution check
  const handleMergeCheck = (choice: string) => {
    if (synthRef.current && audioOn) synthRef.current.playClick();
    setMergeOptionSelected(choice);

    if (choice === "merged") {
      addConsoleLog("RESOLVING MERGE CONFLICT. Injecting consolidated RLS schema...");
      setTimeout(() => {
        handleResolveActiveRoom();
      }, 1000);
    } else {
      if (synthRef.current && audioOn) synthRef.current.playErrorAlarm();
      addConsoleLog("CONFLICT COLLISION RESOLUTION REJECTED. Branch head not stable.", "err");
      addConsoleLog("DIAGNOSTICS: You must select the Consolidated merged code process.env.DATABASE_PORT || 6543.", "info");
    }
  };

  return (
    <div className="bd-viewport">
      <div className="bd-scanlines" />

      {/* 1. MECHANICAL ELEVATOR INTRO */}
      {phase === "elevator" && (
        <div className="bd-elevator-gate" aria-label="Mechanical Elevator Loading Portal">
          <div className={`bd-elevator-top ${elevatorOpen ? "open" : ""}`}>
            <div className="border-b-4 border-dashed border-red-500 w-full h-2 absolute bottom-0 animate-pulse" />
          </div>
          <div className={`bd-elevator-bottom ${elevatorOpen ? "open" : ""}`}>
            <div className="border-t-4 border-dashed border-red-500 w-full h-2 absolute top-0 animate-pulse" />
          </div>
          <div className="bd-metro-hud z-[110] text-center">
            <Activity size={32} className="text-red-500 animate-pulse mb-4 inline-block" />
            <h2 className="text-xs tracking-widest text-red-500 animate-pulse mb-2">DESCENDING SYSTEM SHAFTS...</h2>
            <h1 className="text-5xl font-black tracking-widest text-slate-100 bd-glitch mb-3">BUG DUNGEON</h1>
            <p className="text-[9px] text-cyan-400 font-mono tracking-widest">LOADING DIAGNOSTIC GRID SECURITY LAYERS</p>
          </div>
        </div>
      )}

      {/* 2. MAIN INTERACTIVE DUNGEON INTERFACE */}
      {phase === "dungeon" && (
        <div className="bd-main">
          
          {/* SIDEBAR NAVIGATION TERMINALS */}
          <aside className="bd-sidebar">
            <div>
              <div className="flex items-center gap-2 text-red-500 font-bold mb-4 text-xs">
                <Cpu size={16} />
                <span>CHAMBER CORE</span>
              </div>

              <div className="bd-system-status">
                STATUS: {resolvedRooms.size === SERVER_ROOMS.length ? "STABLE" : "CORRUPTED"}
                <br />
                RECOVERED: {resolvedRooms.size} / {SERVER_ROOMS.length}
                <div className="w-full bg-slate-800 h-2 rounded overflow-hidden mt-2 border border-slate-700">
                  <div 
                    className="h-full bg-gradient-to-r from-red-500 to-emerald-500 transition-all duration-500" 
                    style={{ width: `${(resolvedRooms.size / SERVER_ROOMS.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="bd-room-list">
                {SERVER_ROOMS.map((room) => {
                  const isActive = activeRoom.id === room.id;
                  const isSolved = resolvedRooms.has(room.id);
                  return (
                    <button
                      key={room.id}
                      className={`bd-room-item ${isActive ? "active" : ""} ${isSolved ? "resolved" : ""}`}
                      onClick={() => selectRoom(room)}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="status-dot" />
                        <div className="flex flex-col">
                          <strong className="text-[10px]">{room.name}</strong>
                          <span className="text-[8px] text-slate-400 font-mono">{room.title}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* EXIT HUD AREA */}
            <div className="mt-4 border-t border-slate-800 pt-4 flex flex-col gap-2">
              <button 
                onClick={handleToggleSound} 
                className="w-full flex items-center justify-between border border-slate-800 bg-slate-900/60 rounded px-2 py-1.5 text-[8px] hover:text-white"
              >
                <div className="flex items-center gap-1.5">
                  {audioOn ? <Volume2 size={12} className="text-red-500" /> : <VolumeX size={12} className="text-slate-400" />}
                  <span>SYNTH AUDIO</span>
                </div>
                <strong>{audioOn ? "ON" : "OFF"}</strong>
              </button>
              
              <button 
                onClick={onBack} 
                className="w-full flex items-center gap-2 border border-red-500/20 bg-red-950/20 rounded px-2.5 py-1.5 text-[9px] font-bold text-red-400 hover:bg-red-500/20 hover:text-white transition-all"
              >
                <ArrowLeft size={12} />
                <span>EXIT DUNGEON</span>
              </button>
            </div>
          </aside>

          {/* MAIN TERMINAL CHAMBER */}
          <main className="bd-chamber">
            {/* Warning indicator flicker for unsolved corruption */}
            {!resolvedRooms.has(activeRoom.id) && <div className="bd-overlay-flicker" />}
            
            {/* Top diagnostic header banner */}
            <div className="bd-hud-top">
              <div className="flex items-center gap-3">
                <Activity size={18} className={resolvedRooms.has(activeRoom.id) ? "text-emerald-500 animate-pulse" : "text-red-500 animate-pulse"} />
                <div className="flex flex-col">
                  <h2 className="text-xs font-bold text-slate-200 tracking-wider uppercase font-mono">{activeRoom.name} // DIAGNOSTIC MODE</h2>
                  <p className="text-[8px] text-slate-400 mt-0.5">ADDRESSING COMPONENT: {activeRoom.title}</p>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-[9px] font-mono px-3 py-1 rounded-full ${resolvedRooms.has(activeRoom.id) ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border border-red-500/20 text-red-400"}`}>
                  {resolvedRooms.has(activeRoom.id) ? "● RESOLVED" : "▲ CORRUPTED"}
                </span>
              </div>
            </div>

            {/* Dynamic Room Interactive Terminal */}
            <div className="bd-terminal-view">
              
              {/* PUZZLE AREA WINDOW */}
              <div 
                className="bd-puzzle-frame" 
                id="bd-puzzle-area"
                style={{ 
                  "--theme-color": resolvedRooms.has(activeRoom.id) ? "#22c55e" : activeRoom.bugType === "loop" ? "#ef4444" : activeRoom.bugType === "timeout" ? "#a855f7" : activeRoom.bugType === "css" ? "#06b6d4" : "#f59e0b",
                  "--glow-color": resolvedRooms.has(activeRoom.id) ? "rgba(34, 197, 94, 0.2)" : activeRoom.bugType === "loop" ? "rgba(239, 68, 68, 0.2)" : activeRoom.bugType === "timeout" ? "rgba(168, 85, 247, 0.2)" : activeRoom.bugType === "css" ? "rgba(6, 182, 212, 0.2)" : "rgba(245, 158, 11, 0.2)"
                } as React.CSSProperties}
              >
                <div className="bd-crt-lines" />
                
                {/* Visual electric sparks generator */}
                {sparksList.map((spark) => (
                  <div 
                    key={spark.id} 
                    className="bd-spark" 
                    style={{ 
                      left: spark.x, 
                      top: spark.y, 
                      "--vx": `${spark.vx * 15}px`, 
                      "--vy": `${spark.vy * 15}px` 
                    } as React.CSSProperties} 
                  />
                ))}

                <header className="bd-puzzle-header">
                  <span>ROOM CHAMBER LOGIC GRID</span>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setShowStory(true)} 
                      disabled={!resolvedRooms.has(activeRoom.id)}
                      className="text-[8px] bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:hover:bg-slate-800 text-slate-300 font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-slate-700"
                    >
                      <Info size={10} />
                      <span>DIAGNOSTIC LOGS</span>
                    </button>
                  </div>
                </header>

                <div className="bd-puzzle-workspace font-mono" id="bd-puzzle-area">
                  
                  {/* PUZZLE RESOLVED STATE */}
                  {resolvedRooms.has(activeRoom.id) ? (
                    <div className="text-center p-6 max-w-sm">
                      <CheckCircle size={48} className="text-emerald-500 animate-bounce mb-3 inline-block" />
                      <h3 className="text-sm font-bold text-slate-100">SYSTEM SECURE</h3>
                      <p className="text-[9px] text-slate-400 mt-2 leading-relaxed">
                        Data flows restored. The underlying memory corridors of this component have been synchronized successfully.
                      </p>
                      <button 
                        onClick={() => setShowStory(true)} 
                        className="mt-4 px-4 py-2 border border-emerald-500 text-emerald-400 bg-emerald-950/20 hover:bg-emerald-500 hover:text-slate-950 rounded text-[9px] font-bold transition-all"
                      >
                        RECALL MEMORY RECORD 📜
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* LOOP PUZZLE CONTROLLER */}
                      {activeRoom.bugType === "loop" && (
                        <div className="flex flex-col items-center gap-4">
                          <div className={`bd-infinite-wheel ${loopCodeInput === "break;" ? "stabilized" : ""}`}>
                            <div className="text-[7px] text-red-500 uppercase tracking-widest text-center animate-pulse">
                              {loopCodeInput === "break;" ? "STABLE" : "INFINITE SPIN"}
                              <br />
                              <span className="text-[5px] text-slate-400">while(true)</span>
                            </div>
                            
                            {/* Outer orbital nodes representing code segments */}
                            <div className="bd-wheel-node top-0 left-[75px]" style={{ transform: "rotate(45deg)" }}>x++</div>
                            <div className="bd-wheel-node top-[75px] right-0">loop</div>
                            <div className="bd-wheel-node bottom-0 left-[75px]">cpu</div>
                            <div className="bd-wheel-node top-[75px] left-0">heap</div>
                          </div>

                          <div className="text-center">
                            <p className="text-[8px] text-slate-400 mb-2">INJECT CONDITIONAL STATEMENTS TO TERMINATE CYCLE:</p>
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleLoopInject("index = 0;")}
                                className="px-3 py-1.5 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[8px] rounded"
                              >
                                index = 0;
                              </button>
                              <button 
                                onClick={() => handleLoopInject("break;")}
                                className="px-3 py-1.5 border border-red-500/50 bg-red-950/20 hover:bg-red-500 hover:text-slate-950 text-red-400 text-[8px] font-bold rounded"
                              >
                                break;
                              </button>
                              <button 
                                onClick={() => handleLoopInject("continue;")}
                                className="px-3 py-1.5 border border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-200 text-[8px] rounded"
                              >
                                continue;
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* API TIMEOUT PUZZLE CONTROLLER */}
                      {activeRoom.bugType === "timeout" && (
                        <div className="flex flex-col items-center gap-5 w-full max-w-sm">
                          <div className="flex justify-between items-center w-full bg-slate-900/60 border border-slate-800 rounded p-3 text-[8px]">
                            <div className="flex flex-col gap-1 items-center">
                              <span>CLIENT REQ</span>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold bg-purple-500/20 text-purple-400 border border-purple-500/40 ${apiFetching ? "animate-pulse" : ""}`}>💻</div>
                            </div>
                            
                            {/* Animated connection wire */}
                            <div className="flex-1 h-1.5 bg-slate-800 mx-3 rounded relative overflow-hidden">
                              <div className={`h-full bg-purple-500 rounded transition-all duration-1000 ${apiFetching ? "w-full" : "w-0"}`} />
                            </div>

                            <div className="flex flex-col gap-1 items-center">
                              <span>GATEWAY</span>
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold bg-slate-800 text-slate-400 border border-slate-700 ${resolvedRooms.has(activeRoom.id) ? "bg-emerald-500/20 text-emerald-400 border-emerald-500" : ""}`}>☁️</div>
                            </div>
                          </div>

                          <div className="w-full flex flex-col gap-3.5">
                            <div>
                              <div className="flex justify-between text-[8px] text-slate-400 mb-1">
                                <span>TIMEOUT THRESHOLD LIMIT:</span>
                                <strong className="text-purple-400">{timeoutLimit}ms</strong>
                              </div>
                              <input 
                                type="range" 
                                min={100} 
                                max={5000} 
                                step={100}
                                value={timeoutLimit}
                                onChange={(e) => {
                                  if (synthRef.current && audioOn) synthRef.current.playClick();
                                  setTimeoutLimit(Number(e.target.value));
                                }}
                                className="w-full accent-purple-500 cursor-pointer"
                              />
                            </div>

                            <div>
                              <div className="flex justify-between text-[8px] text-slate-400 mb-1">
                                <span>CONNECTION ATTEMPT RETRIES:</span>
                                <strong className="text-purple-400">{timeoutRetries} TIMES</strong>
                              </div>
                              <input 
                                type="range" 
                                min={1} 
                                max={5} 
                                step={1}
                                value={timeoutRetries}
                                onChange={(e) => {
                                  if (synthRef.current && audioOn) synthRef.current.playClick();
                                  setTimeoutRetries(Number(e.target.value));
                                }}
                                className="w-full accent-purple-500 cursor-pointer"
                              />
                            </div>

                            <button 
                              onClick={handleApiRequest}
                              disabled={apiFetching}
                              className="w-full flex items-center justify-center gap-2 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 disabled:opacity-50 text-slate-100 font-bold text-[9px] rounded-lg shadow-lg transition-all"
                            >
                              <Play size={12} />
                              <span>SEND DISPATCH REQUEST</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* CSS CHAOS PUZZLE CONTROLLER */}
                      {activeRoom.bugType === "css" && (
                        <div className="flex flex-col md:flex-row items-center gap-6 w-full max-w-md">
                          
                          {/* Layout container preview box */}
                          <div 
                            className="w-full max-w-[200px] h-[160px] bg-slate-900/60 border border-slate-800 rounded p-2 transition-all duration-300 flex"
                            style={{
                              flexDirection: cssDirection as any,
                              justifyContent: cssJustify as any,
                              alignItems: cssAlign as any
                            }}
                          >
                            <div className="bd-css-box bg-cyan-500/10 border-cyan-500 text-cyan-400 text-[10px] w-10 h-10 flex items-center justify-center rounded m-1">A</div>
                            <div className="bd-css-box bg-cyan-500/10 border-cyan-500 text-cyan-400 text-[10px] w-10 h-10 flex items-center justify-center rounded m-1">B</div>
                            <div className="bd-css-box bg-cyan-500/10 border-cyan-500 text-cyan-400 text-[10px] w-10 h-10 flex items-center justify-center rounded m-1">C</div>
                          </div>

                          {/* CSS Control select items */}
                          <div className="flex-1 flex flex-col gap-2.5 w-full text-[8px]">
                            <div className="flex flex-col gap-1">
                              <span className="text-slate-400 font-mono">.container {`{`} flex-direction:</span>
                              <select 
                                value={cssDirection} 
                                onChange={(e) => {
                                  if (synthRef.current && audioOn) synthRef.current.playClick();
                                  setCssDirection(e.target.value);
                                }}
                                className="bg-slate-900 border border-slate-700 text-cyan-400 p-1 rounded outline-none font-mono"
                              >
                                <option value="row">row</option>
                                <option value="column">column</option>
                                <option value="row-reverse">row-reverse</option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1">
                              <span className="text-slate-400 font-mono">justify-content:</span>
                              <select 
                                value={cssJustify} 
                                onChange={(e) => {
                                  if (synthRef.current && audioOn) synthRef.current.playClick();
                                  setCssJustify(e.target.value);
                                }}
                                className="bg-slate-900 border border-slate-700 text-cyan-400 p-1 rounded outline-none font-mono"
                              >
                                <option value="center">center</option>
                                <option value="flex-start">flex-start</option>
                                <option value="space-between">space-between</option>
                              </select>
                            </div>

                            <div className="flex flex-col gap-1">
                              <span className="text-slate-400 font-mono">align-items:</span>
                              <select 
                                value={cssAlign} 
                                onChange={(e) => {
                                  if (synthRef.current && audioOn) synthRef.current.playClick();
                                  setCssAlign(e.target.value);
                                }}
                                className="bg-slate-900 border border-slate-700 text-cyan-400 p-1 rounded outline-none font-mono"
                              >
                                <option value="center">center</option>
                                <option value="stretch">stretch</option>
                                <option value="flex-end">flex-end</option>
                              </select>
                            </div>

                            <button 
                              onClick={handleCssCheck}
                              className="w-full mt-2 py-2 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold rounded text-[9px] shadow-lg transition-all"
                            >
                              COMPILE LAYOUT STYLES
                            </button>
                          </div>
                        </div>
                      )}

                      {/* MERGE CONFLICT PUZZLE CONTROLLER */}
                      {activeRoom.bugType === "merge" && (
                        <div className="flex flex-col gap-3 w-full max-w-md font-mono text-[7px] md:text-[8px]">
                          <div className="bg-slate-950 border border-slate-800 rounded p-2.5 text-slate-300 relative overflow-hidden">
                            <div className="text-red-500 font-bold mb-1 border-b border-red-500/20 pb-1 flex items-center justify-between">
                              <span>CONFLICT: Index.tsx ⚠</span>
                              <span className="text-[6px] tracking-wider text-slate-500">LINE 148-154</span>
                            </div>
                            <div>
                              <span className="text-red-400 font-bold">{`<<<<<<< HEAD`} (Local changes)</span>
                              <br />
                              <span className="bg-red-500/10 text-red-300 pl-2 block">const dbPort = process.env.PORT || 5432;</span>
                              <span className="text-slate-500">=======</span>
                              <br />
                              <span className="text-orange-400 font-bold">{`>>>>>>> feature/auth`} (Remote branches)</span>
                              <br />
                              <span className="bg-orange-500/10 text-orange-300 pl-2 block">const dbPort = process.env.DATABASE_PORT || 6543;</span>
                            </div>
                          </div>

                          <div className="text-center mb-1">
                            <span className="text-[7px] text-slate-400 flex items-center justify-center gap-1.5">
                              <Info size={11} className="text-orange-400" />
                              TASK: Choose resolved merged script reference standard database configuration.
                            </span>
                          </div>

                          <div className="flex flex-col gap-2">
                            <button 
                              onClick={() => handleMergeCheck("local")}
                              className={`text-left p-2 border rounded transition-all text-slate-300 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 ${mergeOptionSelected === "local" ? "border-red-500 text-red-400 bg-red-950/10" : "border-slate-800"}`}
                            >
                              <span>A. Keep Local (process.env.PORT || 5432)</span>
                            </button>
                            <button 
                              onClick={() => handleMergeCheck("remote")}
                              className={`text-left p-2 border rounded transition-all text-slate-300 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 ${mergeOptionSelected === "remote" ? "border-red-500 text-red-400 bg-red-950/10" : "border-slate-800"}`}
                            >
                              <span>B. Accept Remote (process.env.DATABASE_PORT || 6543)</span>
                            </button>
                            <button 
                              onClick={() => handleMergeCheck("merged")}
                              className={`text-left p-2 border rounded transition-all text-slate-300 bg-slate-900/60 hover:bg-slate-900 hover:border-slate-700 ${mergeOptionSelected === "merged" ? "border-emerald-500 text-emerald-400 bg-emerald-950/10" : "border-slate-800"}`}
                            >
                              <strong>C. Resolve conflict manually with accepted DB standard (DATABASE_PORT || 6543)</strong>
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                </div>
              </div>

              {/* LIVE CONSOLE LOGS CONSOLE */}
              <div className="bd-terminal-logs" id="bd-logs">
                {logs.map((log, index) => {
                  const isErr = log.startsWith("[ERR]");
                  const isSuccess = log.startsWith("[OK]");
                  return (
                    <div 
                      key={index} 
                      className={`bd-log-row ${isErr ? "err" : isSuccess ? "success" : ""}`}
                    >
                      {log}
                    </div>
                  );
                })}
              </div>

            </div>
          </main>

          {/* REAL STORYTELLING MODAL PANEL */}
          {showStory && (
            <div className="bd-story-overlay">
              <div 
                className="bd-story-card"
                style={{
                  "--theme-color": "#22c55e",
                  "--glow-color": "rgba(34, 197, 94, 0.3)"
                } as React.CSSProperties}
              >
                <h3 className="bd-story-headline">
                  <Wrench className="text-emerald-400" size={16} />
                  <span>{activeRoom.realStory.headline}</span>
                </h3>

                <div className="bd-story-body">
                  <p>{activeRoom.realStory.body}</p>
                  
                  <div className="bd-story-section">
                    <div className="bd-story-section-title">🔍 Diagnosis Log</div>
                    <p className="text-slate-300 font-mono text-[9px]">{activeRoom.realStory.diagnostics}</p>
                  </div>

                  <div className="bd-story-section">
                    <div className="bd-story-section-title">💡 Lessons Learned</div>
                    <p className="text-slate-300">{activeRoom.realStory.learned}</p>
                  </div>
                </div>

                <button 
                  className="bd-story-btn" 
                  onClick={() => setShowStory(false)}
                >
                  DISMISS LOGS & CONTINUE EXPLORING
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
