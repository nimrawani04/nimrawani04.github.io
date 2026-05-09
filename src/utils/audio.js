let audioCtx = null;
function getCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}

function playNote(freq, dur, type='square', vol=0.06, delay=0) {
  try {
    const ctx = getCtx();
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    g.gain.setValueAtTime(vol, ctx.currentTime + delay);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
    o.connect(g); g.connect(ctx.destination);
    o.start(ctx.currentTime + delay); o.stop(ctx.currentTime + delay + dur);
  } catch(e) {}
}

export function playClick() { playNote(660, 0.08, 'square', 0.06); playNote(880, 0.08, 'square', 0.04, 0.04); }

export function playExplore() {
  [523,659,784,1047].forEach((f,i) => playNote(f, 0.18, 'square', 0.05, i*0.08));
}

export function playAchievement() {
  [523,659,784,1047,1319].forEach((f,i) => playNote(f, 0.25, 'square', 0.07, i*0.1));
}

// Quest board open — chest unlock sound
export function playQuestOpen() {
  playNote(180, 0.15, 'sawtooth', 0.06, 0);
  playNote(220, 0.12, 'sawtooth', 0.05, 0.1);
  playNote(330, 0.1, 'square', 0.06, 0.18);
  playNote(440, 0.15, 'square', 0.05, 0.25);
  playNote(660, 0.2, 'square', 0.04, 0.35);
}

// Quest card select
export function playSelect() {
  playNote(440, 0.06, 'square', 0.05); playNote(660, 0.1, 'square', 0.05, 0.06);
}

let lastStepTime = 0;
export function playStep() {
  const now = Date.now(); if (now - lastStepTime < 200) return; lastStepTime = now;
  playNote(180 + Math.random()*80, 0.05, 'square', 0.025);
}

// --- BACKGROUND MUSIC ---
let musicInterval = null, masterGain = null;
const MELODY = [
  [262,0.25],[330,0.25],[392,0.25],[523,0.5],[0,0.15],
  [392,0.25],[330,0.25],[262,0.5],[0,0.15],
  [294,0.25],[370,0.25],[440,0.25],[587,0.5],[0,0.15],
  [440,0.25],[370,0.25],[294,0.5],[0,0.15],
  [330,0.25],[392,0.25],[523,0.25],[659,0.5],[0,0.15],
  [523,0.25],[392,0.25],[330,0.5],[0,0.3],
];

export function startMusic() {
  if (musicInterval) return;
  try {
    const ctx = getCtx();
    masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.03, ctx.currentTime);
    masterGain.connect(ctx.destination);
    let idx = 0, time = ctx.currentTime + 0.1;
    function schedule() {
      const now = ctx.currentTime;
      while (time < now + 2) {
        const [f, d] = MELODY[idx % MELODY.length];
        if (f > 0) {
          const o = ctx.createOscillator(), ng = ctx.createGain();
          o.type = 'triangle'; o.frequency.setValueAtTime(f, time);
          ng.gain.setValueAtTime(0.035, time);
          ng.gain.exponentialRampToValueAtTime(0.001, time + d * 0.85);
          o.connect(ng); ng.connect(masterGain); o.start(time); o.stop(time + d);
        }
        time += d; idx++;
      }
    }
    schedule(); musicInterval = setInterval(schedule, 800);
  } catch(e) {}
}

export function stopMusic() {
  if (musicInterval) { clearInterval(musicInterval); musicInterval = null; }
  if (masterGain) { try { masterGain.gain.setValueAtTime(0, masterGain.context.currentTime); } catch(e) {} masterGain = null; }
}
