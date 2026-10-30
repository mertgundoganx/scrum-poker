// Lightweight Web Audio chimes — no asset files, no network, works offline.
// Sounds are synthesized on the fly so the app stays fully self-contained.

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!ctx) ctx = new AC();
    // Autoplay policies suspend the context until a user gesture; resume opportunistically.
    if (ctx.state === 'suspended') ctx.resume().catch(() => {});
    return ctx;
  } catch {
    return null;
  }
}

/** Prime/resume the audio context from within a user gesture (e.g. a click). */
export function primeAudio(): void {
  getCtx();
}

function tone(ac: AudioContext, freq: number, startAt: number, duration: number, gain: number) {
  const osc = ac.createOscillator();
  const g = ac.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0, startAt);
  g.gain.linearRampToValueAtTime(gain, startAt + 0.015);
  g.gain.exponentialRampToValueAtTime(0.0001, startAt + duration);
  osc.connect(g);
  g.connect(ac.destination);
  osc.start(startAt);
  osc.stop(startAt + duration + 0.02);
}

/** Gentle two-note nudge — played when only one voter is left. */
export function playLastVoter(): void {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  tone(ac, 587.33, t, 0.18, 0.14);        // D5
  tone(ac, 783.99, t + 0.12, 0.22, 0.14); // G5
}

/** Brighter ascending arpeggio — played when votes are revealed. */
export function playReveal(): void {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  tone(ac, 523.25, t, 0.16, 0.15);         // C5
  tone(ac, 659.25, t + 0.1, 0.16, 0.15);   // E5
  tone(ac, 783.99, t + 0.2, 0.28, 0.16);   // G5
}

/** Short low double-buzz — the "nudge" attention grab. */
export function playNudge(): void {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  tone(ac, 196, t, 0.12, 0.2);        // G3
  tone(ac, 185, t + 0.13, 0.16, 0.2); // ~F#3
}

/** Soft bell, two notes ringing out — played once when the countdown timer runs out. */
export function playChime(): void {
  const ac = getCtx();
  if (!ac) return;
  const t = ac.currentTime;
  tone(ac, 880, t, 0.9, 0.1);           // A5
  tone(ac, 1318.51, t + 0.18, 1.1, 0.08); // E6
}
