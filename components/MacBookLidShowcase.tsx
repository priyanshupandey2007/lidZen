import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Music2, Sparkles } from 'lucide-react';
import EqualizerBars from './EqualizerBars';
import MacWindowButtons from './MacWindowButtons';

const LID_CYCLE_MS = 7000;

export default function MacBookLidShowcase() {
  const [lidClosed, setLidClosed] = useState(false);
  const [manualOverride, setManualOverride] = useState(false);

  // Physical Clamshell / Laptop Lid Sensor
  useEffect(() => {
    const handleVisibility = () => {
      // document.hidden or visibilityState === 'hidden' indicates the physical laptop lid was closed
      if (document.hidden || document.visibilityState === 'hidden') {
        setLidClosed(true); // Physical lid CLOSED
        setManualOverride(true);
      } else {
        setLidClosed(false); // Physical lid OPEN
        setManualOverride(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  // Demo loop when physical lid is open and user hasn't overridden
  useEffect(() => {
    if (manualOverride) return;

    const start = setTimeout(() => setLidClosed(true), 1400);
    const loop = setInterval(() => {
      setLidClosed((prev) => !prev);
    }, LID_CYCLE_MS);
    return () => {
      clearTimeout(start);
      clearInterval(loop);
    };
  }, [manualOverride]);

  const toggleLid = () => {
    setManualOverride(true);
    setLidClosed((prev) => !prev);
  };

  return (
    <div className="relative mx-auto w-full max-w-lg cursor-pointer" onClick={toggleLid} title="Click to toggle lid state">
      <div className="absolute inset-0 -z-10 rounded-3xl bg-hero-glow blur-2xl" />

      <motion.div
        className="glass-strong relative overflow-hidden rounded-3xl p-6 md:p-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <div className="mb-4 flex items-center justify-between text-xs text-zinc-500">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-40" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Clamshell continuity
          </span>
          <span className="font-mono text-accent/80">{lidClosed ? 'LID CLOSED' : 'LID OPEN'}</span>
        </div>

        <div className="mac-perspective mx-auto w-full max-w-[320px]">
          <div className="preserve-3d relative">
            {/* Screen + lid */}
            <motion.div
              className="preserve-3d relative z-10 origin-bottom"
              animate={{ rotateX: lidClosed ? -88 : 0 }}
              transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="overflow-hidden rounded-t-xl border border-zinc-600/80 bg-zinc-900 shadow-inner">
                <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2">
                  <MacWindowButtons />
                </div>
                <motion.div
                  className="relative flex h-36 flex-col items-center justify-center gap-2 bg-gradient-to-b from-zinc-800 to-zinc-950 px-4"
                  animate={{ opacity: lidClosed ? 0 : 1 }}
                  transition={{ duration: 0.35 }}
                >
                  <Sparkles className="text-accent/70" size={28} />
                  <p className="text-center text-sm text-zinc-400">Close the lid — work keeps running</p>
                </motion.div>
              </div>
              {/* Lid bezel (back of screen) */}
              <div
                className="absolute inset-x-0 top-0 h-full rounded-t-xl bg-gradient-to-b from-zinc-700/90 to-zinc-800"
                style={{ transform: 'rotateX(180deg)', transformOrigin: 'bottom', backfaceVisibility: 'hidden' }}
              />
            </motion.div>

            {/* Base / keyboard */}
            <div className="relative -mt-[2px] rounded-b-xl border border-t-0 border-zinc-600/60 bg-gradient-to-b from-zinc-800 to-zinc-950 px-4 pb-4 pt-3">
              <div className="mb-2 h-1 w-16 rounded-full bg-zinc-600/50 mx-auto" />
              <div className="grid grid-cols-12 gap-1 opacity-40">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div key={i} className="h-1.5 rounded-sm bg-zinc-600/80" />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="min-h-[100px] transition-dimensions">
          <AnimatePresence mode="wait">
            {lidClosed && (
              <motion.div
                key="active-tasks"
                className="mt-6 grid gap-3 sm:grid-cols-2"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45 }}
              >
              <div className="glass rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-400">
                    <Music2 size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-100">Midnight City</p>
                    <p className="text-xs text-zinc-500">Apple Music · Playing</p>
                  </div>
                  <EqualizerBars />
                </div>
              </div>

              <div className="glass rounded-xl p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/15 text-violet-400">
                    <Bot size={18} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-100">Cursor Agent</p>
                    <p className="text-xs text-zinc-500">Refactoring auth module…</p>
                  </div>
                  <motion.span
                    className="h-2 w-2 rounded-full bg-violet-400"
                    animate={{ scale: [1, 1.35, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2 }}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}