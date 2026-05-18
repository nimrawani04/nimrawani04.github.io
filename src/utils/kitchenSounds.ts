/**
 * Kitchen sound effects using Web Audio API — no external files needed.
 * Each function synthesizes a short sound on the fly.
 */

let ctx: AudioContext | null = null;
const getCtx = () => {
  if (!ctx) ctx = new AudioContext();
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
};

/* ── Helpers ─────────────────────────────────── */

function playTone(freq: number, dur: number, type: OscillatorType = "sine", vol = 0.15) {
  const c = getCtx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  o.connect(g).connect(c.destination);
  o.start(); o.stop(c.currentTime + dur);
}

function noise(dur: number, vol = 0.06) {
  const c = getCtx();
  const buf = c.createBuffer(1, c.sampleRate * dur, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1);
  const src = c.createBufferSource();
  src.buffer = buf;
  const g = c.createGain();
  const filt = c.createBiquadFilter();
  filt.type = "bandpass"; filt.frequency.value = 3000; filt.Q.value = 0.5;
  g.gain.setValueAtTime(vol, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + dur);
  src.connect(filt).connect(g).connect(c.destination);
  src.start(); src.stop(c.currentTime + dur);
}

/* ── Sound Effects ───────────────────────────── */

/** Soft plop when adding ingredient to pot */
export function sfxAddIngredient() {
  const c = getCtx();
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = "sine";
  o.frequency.setValueAtTime(600, c.currentTime);
  o.frequency.exponentialRampToValueAtTime(200, c.currentTime + 0.12);
  g.gain.setValueAtTime(0.2, c.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.15);
  o.connect(g).connect(c.destination);
  o.start(); o.stop(c.currentTime + 0.15);
}

/** Buzzy error for wrong ingredient */
export function sfxWrongIngredient() {
  playTone(150, 0.15, "sawtooth", 0.12);
  setTimeout(() => playTone(120, 0.2, "sawtooth", 0.1), 100);
}

/** Quick click for UI interactions */
export function sfxClick() {
  playTone(800, 0.05, "sine", 0.08);
}

/** Sizzle sound when cooking starts */
export function sfxCookStart() {
  noise(1.5, 0.08);
  playTone(200, 0.3, "triangle", 0.06);
}

/** Ongoing sizzle loop pulsed during cooking — call once */
export function sfxSizzle() {
  noise(0.4, 0.04);
}

/** Rising chime when cooking completes */
export function sfxDishComplete() {
  const notes = [523, 659, 784, 1047]; // C5 E5 G5 C6
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.35, "sine", 0.15), i * 120);
  });
}

/** Achievement fanfare — ascending arpeggio */
export function sfxAchievement() {
  const notes = [392, 494, 587, 659, 784]; // G4 B4 D5 E5 G5
  notes.forEach((f, i) => {
    setTimeout(() => playTone(f, 0.3, "triangle", 0.12), i * 100);
  });
}

/** Combo sound — quick ascending pips */
export function sfxCombo(level: number) {
  const base = 400 + Math.min(level, 8) * 80;
  playTone(base, 0.08, "square", 0.06);
}

/* ── Background Music ────────────────────────── */

let bgNodes: { osc: OscillatorNode[]; gains: GainNode[]; master: GainNode } | null = null;
let bgPlaying = false;

/** Ambient kitchen loop — gentle pentatonic hum */
export function startBgMusic() {
  if (bgPlaying) return;
  const c = getCtx();
  const master = c.createGain();
  master.gain.value = 0.03;
  master.connect(c.destination);

  const freqs = [261.6, 293.7, 329.6, 392.0, 440.0]; // C4 pentatonic
  const oscs: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  freqs.forEach((f, i) => {
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.value = 0;
    o.connect(g).connect(master);
    o.start();
    oscs.push(o);
    gains.push(g);

    // Gentle fade-in/out cycle per note
    const cycle = () => {
      if (!bgPlaying) return;
      const now = c.currentTime;
      const dur = 3 + Math.random() * 4;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(0.6 + Math.random() * 0.4, now + dur * 0.4);
      g.gain.linearRampToValueAtTime(0, now + dur);
      setTimeout(cycle, (dur + 1 + Math.random() * 2) * 1000);
    };
    setTimeout(cycle, i * 1500 + Math.random() * 2000);
  });

  bgNodes = { osc: oscs, gains, master };
  bgPlaying = true;
}

export function stopBgMusic() {
  if (!bgPlaying || !bgNodes) return;
  bgPlaying = false;
  const c = getCtx();
  bgNodes.master.gain.linearRampToValueAtTime(0, c.currentTime + 1);
  const nodes = bgNodes;
  setTimeout(() => {
    nodes.osc.forEach((o) => { try { o.stop(); } catch {} });
    nodes.master.disconnect();
  }, 1200);
  bgNodes = null;
}

export function toggleBgMusic(): boolean {
  if (bgPlaying) { stopBgMusic(); return false; }
  startBgMusic(); return true;
}

export function isBgPlaying() { return bgPlaying; }
