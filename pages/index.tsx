import { useState, useEffect, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Download,
  Apple,
  Sparkles,
  Terminal,
  Activity,
  Flame,
  Shield,
  Layers,
  Music,
  Bot,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  FolderTree,
  AlertTriangle,
  Fan,
  BatteryCharging,
  Cpu,
  Monitor,
  Check,
  Radio,
  ExternalLink,
  Zap,
  Gauge,
  Power,
  Sliders,
  Wifi,
} from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FAQAccordion from '../components/FAQAccordion';
import MacWindowButtons from '../components/MacWindowButtons';
import PricingCard from '../components/PricingCard';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

// Simulated culprits data for the live interactive inspector
type Culprit = {
  id: string;
  kind: 'docker' | 'tab' | 'process';
  name: string;
  path: string;
  cpu: number;
  temp: number;
  fan: number;
  drain: number;
};

const initialCulprits: Culprit[] = [
  {
    id: 'c1',
    kind: 'docker',
    name: 'postgres · docker-compose',
    path: '/usr/local/bin/docker · container: api-db (PID 39102)',
    cpu: 94,
    temp: 84,
    fan: 4810,
    drain: 14,
  },
  {
    id: 'c2',
    kind: 'tab',
    name: 'Figma — Heavy WebGL Canvas',
    path: 'com.figma.Desktop · helper(27104) · /Contents/MacOS/Figma Helper',
    cpu: 62,
    temp: 71,
    fan: 3120,
    drain: 8,
  },
  {
    id: 'c3',
    kind: 'process',
    name: 'node · vite dev server',
    path: '~/projects/web-app/node_modules/.bin/esbuild-darwin-arm64 (PID 51920)',
    cpu: 38,
    temp: 63,
    fan: 2240,
    drain: 4,
  },
  {
    id: 'c4',
    kind: 'process',
    name: 'python3 · train_model.py',
    path: '~/ml/scripts/train_model.py — epoch 41/100 (MPS acceleration)',
    cpu: 71,
    temp: 78,
    fan: 3960,
    drain: 11,
  },
];

export default function Home() {
  const { t } = useLanguage();
  const { buttonLabel, priceOneMac } = useCurrency();
  // Clamshell / Lid Sensor State:
  // false = Lid Open (tasks dispatched, display active)
  // true = Lid Closed (display off, continuity holding session alive)
  const [isLidClosed, setIsLidClosed] = useState(false);
  const [isManualOverride, setIsManualOverride] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [agentStep, setAgentStep] = useState(0);

  const agentSteps = [
    'Reading src/auth/session.ts…',
    'Running vitest suite (14 passing)…',
    'Committing patch: fix(auth): prevent sleep deadlock',
  ];

  // Physical Laptop Lid Sensor Hook:
  // Detects when the user physically closes the laptop lid or switches clamshell display modes
  useEffect(() => {
    const handleLidSensor = () => {
      // document.hidden or visibilityState === 'hidden' indicates the physical laptop lid was closed
      // or the display was powered down by clamshell event
      if (document.hidden || document.visibilityState === 'hidden') {
        setIsLidClosed(true); // Physical lid CLOSED
        setIsManualOverride(true); // Retain closed state while physically shut
      } else {
        setIsLidClosed(false); // Physical lid OPEN
        setIsManualOverride(false);
      }
    };

    // Listen to physical visibility and display changes
    document.addEventListener('visibilitychange', handleLidSensor);
    window.addEventListener('focus', () => {
      if (!document.hidden && document.visibilityState === 'visible') {
        setIsLidClosed(false);
      }
    });

    return () => {
      document.removeEventListener('visibilitychange', handleLidSensor);
    };
  }, []);

  // Automated live demonstration loop: smoothly alternates between Lid Open and Lid Closed
  // proving that tasks (AI agents, compiling, audio streaming) keep working uninterrupted in both states
  useEffect(() => {
    const interval = setInterval(() => {
      setIsLidClosed((prev) => !prev);
    }, 5500);

    return () => clearInterval(interval);
  }, []);

  const toggleLid = () => {
    setIsLidClosed((prev) => !prev);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setAgentStep((prev) => (prev + 1) % agentSteps.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [agentSteps.length]);

  // Diagnostics interactive inspector state: tracks paused (SIGSTOP) vs active tasks
  const [selectedId, setSelectedId] = useState<string>(initialCulprits[0].id);
  const [pausedIds, setPausedIds] = useState<Set<string>>(new Set());
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsScanning(false), 900);
    return () => clearTimeout(timer);
  }, []);

  const activeCulprits = useMemo(
    () => initialCulprits.filter((c) => !pausedIds.has(c.id)),
    [pausedIds]
  );

  const pausedCulprits = useMemo(
    () => initialCulprits.filter((c) => pausedIds.has(c.id)),
    [pausedIds]
  );

  const selectedCulprit = useMemo(() => {
    return initialCulprits.find((c) => c.id === selectedId) || initialCulprits[0];
  }, [selectedId]);

  const isSelectedPaused = useMemo(() => {
    return pausedIds.has(selectedCulprit.id);
  }, [pausedIds, selectedCulprit]);

  // Aggregate stats: paused tasks drop to 0% CPU and zero drain
  const aggregateStats = useMemo(() => {
    if (activeCulprits.length === 0) {
      return { cpu: 8, temp: 42, fan: 0, drain: 1.2 };
    }
    return activeCulprits.reduce(
      (acc, c) => ({
        cpu: Math.max(acc.cpu, c.cpu),
        temp: Math.max(acc.temp, c.temp),
        fan: Math.max(acc.fan, c.fan),
        drain: acc.drain + c.drain,
      }),
      { cpu: 0, temp: 0, fan: 0, drain: 0 }
    );
  }, [activeCulprits]);

  // Non-destructive process suspension (SIGSTOP) & resumption (SIGCONT) handler
  const handleTogglePause = (id: string) => {
    setPausedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        // Un-pause: send SIGCONT signal via Mach task_resume
        next.delete(id);
      } else {
        // Suspend: send SIGSTOP signal via Mach task_suspend
        next.add(id);
      }
      return next;
    });
  };

  // Master Global Resume All: restores all suspended background tasks simultaneously
  const handleResumeAll = () => {
    setPausedIds(new Set());
  };

  // Master Global Pause All: suspends all runaway tasks simultaneously
  const handlePauseAll = () => {
    setPausedIds(new Set(initialCulprits.map((c) => c.id)));
  };

  const handleResetInspector = () => {
    setPausedIds(new Set());
    setSelectedId(initialCulprits[0].id);
    setIsScanning(true);
    setTimeout(() => setIsScanning(false), 600);
  };

  return (
    <>
      <Head>
        <title>lidZen — Keep your Mac alive with the lid closed</title>
        <meta
          name="description"
          content="lidZen bypasses macOS clamshell limits so AI agents, automated workflows, and music keep running with the lid closed — while deep path diagnostics pinpoint what's making your Mac hot and drained."
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />

      <main className="relative min-h-screen bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-zinc-200 transition-colors duration-300 overflow-x-hidden selection:bg-accent-400/30 selection:text-white">
        {/* Multi-layered luxury glow: Emerald + Deep Indigo ambient light */}
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[680px] w-full max-w-7xl -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_20%,rgba(45,212,191,0.18),transparent_75%)] blur-2xl dark:opacity-100 opacity-60" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_30%_15%,rgba(99,102,241,0.12),transparent_70%)] blur-3xl dark:opacity-100 opacity-40" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-grid-faint [background-size:40px_40px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_20%,black,transparent_80%)] opacity-20 dark:opacity-35" />

        {/* ======================================================== */}
        {/* HERO SECTION                                            */}
        {/* ======================================================== */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              {/* Left Column: Editorial Headline & Actions */}
              <div className="text-center lg:text-left">
                {/* Badge */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  {t.hero.badge}
                </motion.div>

                {/* Main Heading: High-contrast pure white to silver in dark mode, obsidian in light mode */}
                <motion.h1
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.08 }}
                  className="mt-6 text-balance text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-[-0.035em] leading-[1.05]"
                >
                  <span className="text-slate-900 dark:text-white drop-shadow-sm dark:drop-shadow-[0_2px_14px_rgba(255,255,255,0.25)]">
                    {t.hero.titleLine1}
                  </span>
                  <br />
                  <span className="text-slate-700 dark:text-zinc-300">
                    {t.hero.titleLine2}
                  </span>
                </motion.h1>

                {/* Subtitle with guaranteed WCAG AA high contrast */}
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.16 }}
                  className="mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-slate-600 dark:text-zinc-300 mx-auto lg:mx-0"
                >
                  {t.hero.subtitle}
                </motion.p>

                {/* Polished Luxury CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.24 }}
                  className="mt-8 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
                >
                  <a
                    href="#pricing"
                    className="btn-primary group"
                  >
                    <Apple size={18} className="fill-current -mt-0.5" />
                    <span>{buttonLabel}</span>
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#diagnostics"
                    className="btn-secondary"
                  >
                    <Activity size={16} className="text-emerald-500 dark:text-emerald-400" />
                    <span>{t.hero.demoCta}</span>
                  </a>
                </motion.div>

                {/* Specs / trust line in crisp high-contrast */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7, delay: 0.32 }}
                  className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-zinc-400 lg:justify-start font-mono"
                >
                  <span className="flex items-center gap-2">
                    <Cpu size={14} className="text-emerald-500 dark:text-emerald-400" />
                    {t.hero.silicon}
                  </span>
                  <span className="flex items-center gap-2">
                    <Apple size={14} className="text-emerald-500 dark:text-emerald-400" />
                    {t.hero.os}
                  </span>
                  <span className="flex items-center gap-2">
                    <Shield size={14} className="text-emerald-500 dark:text-emerald-400" />
                    {t.hero.zeroKexts}
                  </span>
                </motion.div>
              </div>

              {/* Right Column: Authentic MacBook Pro Hardware Showcase matching Shoji (media_1795007445005_e4de613d.jpg) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative mx-auto w-full max-w-lg lg:max-w-none"
              >
                {/* Ambient breathing aura behind the MacBook */}
                <div className="pointer-events-none absolute -inset-6 rounded-full bg-emerald-400/15 dark:bg-emerald-400/20 blur-3xl opacity-60 animate-pulse" />

                {/* MacBook Pro Hardware Unit with 3D Closing/Opening Lid Animation */}
                <div className="relative mx-auto w-full max-w-[520px] sm:max-w-[560px]">
                  
                  {/* 3D PERSPECTIVE WRAPPER */}
                  <div style={{ perspective: 1200 }} className="relative w-full flex flex-col items-center">
                    {/* DISPLAY LID ASSEMBLY: Physically hinges down when closing, hinges up when opening */}
                    <motion.div
                      animate={{
                        rotateX: isLidClosed ? -78 : 0,
                        y: isLidClosed ? 14 : 0,
                        scale: isLidClosed ? 0.95 : 1,
                        boxShadow: isLidClosed
                          ? '0 10px 25px -5px rgba(0,0,0,0.45)'
                          : '0 25px 60px -15px rgba(0,0,0,0.5)',
                      }}
                      transition={{
                        duration: 0.75,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        transformOrigin: 'bottom center',
                        transformStyle: 'preserve-3d',
                      }}
                      onClick={toggleLid}
                      title={isLidClosed ? "Click MacBook to open lid" : "Click MacBook to close lid and test clamshell continuity"}
                      className="relative w-full rounded-t-[20px] sm:rounded-t-[24px] rounded-b-[2px] border-[2px] border-[#9ba2b0] dark:border-[#383d4c] bg-[#0c0d12] p-[6px] sm:p-[8px] pb-[8px] cursor-pointer group select-none transition-shadow z-20"
                    >
                      {/* Inner Retina Glass Display Screen / Closed Unibody Lid */}
                      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-[14px] sm:rounded-t-[16px] rounded-b-[2px] bg-gradient-to-b from-[#181c2b] via-[#101420] to-[#0a0c14] border border-white/5 flex flex-col justify-between">
                        
                        {!isLidClosed ? (
                          /* ================= STATE 1: PHYSICAL LID OPEN ================= */
                          <div className="relative h-full w-full flex flex-col justify-between animate-fadeIn">
                            {/* Authentic MacBook Pro Camera Notch */}
                            <div className="absolute left-1/2 top-0 -translate-x-1/2 z-40 h-3.5 sm:h-4 w-20 sm:w-24 rounded-b-lg bg-[#0c0d12] flex items-center justify-center gap-1.5 shadow-sm">
                              {/* Camera Lens with anti-reflective optical reflection */}
                              <div className="h-1.5 w-1.5 rounded-full bg-[#181f2c] border border-blue-400/30 ring-1 ring-black" />
                              {/* Green Active Camera / Sensor Dot */}
                              <div className="h-1 w-1 rounded-full bg-emerald-400 animate-pulse" />
                            </div>

                            {/* macOS Top Menu Bar */}
                            <div className="relative z-30 h-5 sm:h-6 w-full flex items-center justify-between px-3 text-[9px] sm:text-[10px] text-zinc-300 font-medium bg-black/40 backdrop-blur-md border-b border-white/5">
                              <div className="flex items-center gap-2.5">
                                <Apple size={10} className="fill-current -mt-0.5 text-zinc-200" />
                                <span className="font-semibold text-white">lidZen</span>
                                <span className="hidden sm:inline text-zinc-400">Continuity</span>
                                <span className="hidden sm:inline text-zinc-400">Diagnostics</span>
                                <span className="hidden sm:inline text-zinc-400">Window</span>
                              </div>
                              <div className="flex items-center gap-2 text-zinc-300 font-mono text-[9px]">
                                <span className="inline-flex items-center gap-1">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                  <span className="text-emerald-400 font-sans font-medium text-[8px] sm:text-[9px]">
                                    Lid Open · Tasks Running
                                  </span>
                                </span>
                                <Wifi size={10} className="text-zinc-400" />
                                <span className="text-[8px] sm:text-[9px]">100%</span>
                                <span>10:24 AM</span>
                              </div>
                            </div>

                            {/* Desktop Workspace with floating lidZen window */}
                            <div className="relative flex-1 p-3 sm:p-4 flex flex-col justify-center items-center overflow-hidden">
                              {/* Subtle atmospheric desktop wallpaper gradient glow */}
                              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-950/20 via-slate-900/30 to-sky-950/20 pointer-events-none" />

                              {/* Floating lidZen Terminal Window (matching Shoji window design) */}
                              <div className="relative z-20 w-full max-w-[360px] sm:max-w-[400px] rounded-xl border border-white/15 bg-black/85 backdrop-blur-xl shadow-2xl p-3 sm:p-3.5 transition-all">
                                {/* Window Header */}
                                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                                  <div className="flex items-center gap-1.5">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                                    <span className="ml-2 font-mono text-[10px] sm:text-[11px] text-zinc-300 font-medium truncate">
                                      Terminal — lidzen dispatch
                                    </span>
                                  </div>
                                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    <span>Lid Open</span>
                                  </span>
                                </div>

                                {/* Terminal Output */}
                                <div className="mt-2.5 space-y-1.5 font-mono text-[10px] sm:text-[11px] leading-relaxed">
                                  <div className="flex items-center gap-1.5 text-zinc-100">
                                    <span className="text-emerald-400 font-bold">$</span>
                                    <span>lidzen dispatch --tasks "agent + audio"</span>
                                  </div>
                                  <div className="flex items-center justify-between text-zinc-400 text-[9px] sm:text-[10px]">
                                    <span>✔ Worker thread: <span className="text-emerald-400">Agent refactor-auth</span></span>
                                    <span className="text-emerald-400 font-medium">Running</span>
                                  </div>
                                  <div className="flex items-center justify-between text-zinc-400 text-[9px] sm:text-[10px]">
                                    <span>✔ Audio route: <span className="text-sky-400">AirPlay (M83)</span></span>
                                    <span className="text-sky-400 font-medium">Playing</span>
                                  </div>
                                  <div className="pt-1 flex items-center justify-between border-t border-white/5 text-[9px] sm:text-[10px]">
                                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                      <Check size={11} /> Ready: Closing lid will not interrupt tasks
                                    </span>
                                    <span className="text-zinc-500 font-mono">0.0% leak</span>
                                  </div>
                                </div>
                              </div>

                              {/* Floating macOS Dock */}
                              <div className="mt-auto pt-2 z-20">
                                <div className="inline-flex items-center gap-2 rounded-xl bg-white/10 dark:bg-black/40 border border-white/15 px-2.5 py-1 backdrop-blur-xl shadow-lg">
                                  <div className="h-4 w-4 rounded-md bg-blue-500/80 flex items-center justify-center text-[7px] text-white font-bold"></div>
                                  <div className="h-4 w-4 rounded-md bg-zinc-900 border border-emerald-400/50 flex items-center justify-center relative">
                                    <span className="h-2 w-2 rounded-sm bg-emerald-400" />
                                    <span className="absolute -bottom-1 h-0.5 w-0.5 rounded-full bg-white" />
                                  </div>
                                  <div className="h-4 w-4 rounded-md bg-zinc-800 flex items-center justify-center text-[7px] text-emerald-400 font-mono">&gt;_</div>
                                  <div className="h-4 w-4 rounded-md bg-rose-500/80 flex items-center justify-center text-[7px] text-white">♫</div>
                                  <div className="h-4 w-4 rounded-md bg-sky-500/80 flex items-center justify-center text-[7px] text-white">🧭</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* ================= STATE 2: PHYSICAL LID CLOSED (CLAMSHELL) ================= */
                          <div className="relative h-full w-full rounded-t-[14px] sm:rounded-t-[16px] bg-gradient-to-b from-slate-200 via-slate-300 to-slate-400 dark:from-[#1b202c] dark:via-[#131622] dark:to-[#0a0d14] flex flex-col items-center justify-between p-4 transition-all duration-300 animate-fadeIn">
                            {/* Rear Composite Hinge */}
                            <div className="mx-auto h-1.5 w-36 sm:w-44 rounded-b-[2px] bg-zinc-900 dark:bg-black border-x border-zinc-700/60 shadow-inner" />

                            {/* Center Luminous Apple/lidZen Laser-Cut Emblem */}
                            <div className="relative flex flex-col items-center my-auto">
                              <div className="absolute h-20 w-20 rounded-full bg-emerald-400/25 blur-xl animate-pulse" />
                              <div className="relative z-10 flex flex-col items-center">
                                <Image
                                  src="/logo.png"
                                  alt="lidZen clamshell emblem"
                                  width={38}
                                  height={38}
                                  className="object-contain drop-shadow-[0_0_12px_rgba(45,212,191,0.65)] filter"
                                />
                                <div className="mt-2.5 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
                                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                  <span className="font-mono text-[10px] font-semibold text-slate-800 dark:text-zinc-200 uppercase tracking-widest">
                                    Clamshell Continuity Active
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Front notch alignment */}
                            <div className="mx-auto h-1 w-16 rounded-t-sm bg-zinc-400 dark:bg-black/90 shadow-inner" />
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Authentic MacBook Hinge Bar */}
                  <div className="mx-auto h-[5px] w-44 sm:w-56 rounded-t-[1px] bg-[#14161a] border-x border-zinc-700/60 shadow-inner" />

                  {/* Authentic Front MacBook Pro Unibody Base Chin (matching Shoji) */}
                  <div className="relative -mx-[2.5%] sm:-mx-[3%] h-3 sm:h-3.5 rounded-b-xl rounded-t-[2px] border-t border-white/50 dark:border-white/15 bg-gradient-to-b from-[#e3e6ec] via-[#cbd0db] to-[#a2a8b6] dark:from-[#323642] dark:via-[#242732] dark:to-[#171920] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] flex items-start justify-center">
                    {/* Centered Display Opening Thumb Scoop Notch */}
                    <div className="h-[6px] sm:h-[7px] w-16 sm:w-20 rounded-b-[4px] bg-[#1a1d24] shadow-inner" />
                    
                    {/* Left & Right Bottom Rubber Feet */}
                    <div className="absolute -bottom-[2px] left-8 sm:left-10 h-[2px] w-8 sm:w-10 rounded-b bg-[#101216]" />
                    <div className="absolute -bottom-[2px] right-8 sm:right-10 h-[2px] w-8 sm:w-10 rounded-b bg-[#101216]" />
                  </div>

                  {/* Interactive Status Pill & Live Telemetry Feed */}
                  <div className="mt-5 space-y-3">
                    {/* Click MacBook helper pill */}
                    <div className="flex items-center justify-center">
                      <button
                        type="button"
                        onClick={toggleLid}
                        className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:border-emerald-500/50 transition cursor-pointer select-none"
                      >
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                        </span>
                        <span>{isLidClosed ? t.hud.lidClosedPill : t.hud.lidOpenPill}</span>
                        <span className="text-[10px] opacity-75 font-normal">· {t.hud.clickMacbook}</span>
                      </button>
                    </div>

                    {/* Real-time Hardware Telemetry Bar */}
                    <div className="grid grid-cols-3 gap-2 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-black/[0.02] dark:bg-white/[0.02] py-2.5 px-3 text-center font-mono text-xs backdrop-blur-md">
                      <div>
                        <span className="text-slate-500 dark:text-zinc-400 text-xs block font-medium">{t.hud.powerDraw}</span>
                        <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                          {isLidClosed ? '3.4W' : '18.2W'}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-zinc-400 text-xs block font-medium">{t.hud.socTemp}</span>
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                          42°C
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 dark:text-zinc-400 text-xs block font-medium">{t.hud.fanSpeed}</span>
                        <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                          0 RPM ({t.hud.silent})
                        </span>
                      </div>
                    </div>

                    {/* Active Tasks Grid */}
                    <div className="grid sm:grid-cols-2 gap-2.5">
                      {/* Agent Worker Card */}
                      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="relative grid h-7 w-7 place-items-center rounded-xl bg-accent-500/20 text-accent-700 dark:text-accent-300">
                              <Bot size={15} />
                              <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent-400 ring-2 ring-slate-100 dark:ring-zinc-900" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-900 dark:text-white">Agent · refactor-auth</p>
                              <p className="text-[10px] text-slate-500 dark:text-zinc-400">Background Worker</p>
                            </div>
                          </div>
                          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                            {isLidClosed ? 'Active · lid shut' : 'Active'}
                          </span>
                        </div>
                        <div className="mt-2 rounded-lg border border-black/5 dark:border-white/5 bg-slate-100 dark:bg-[#06080e] p-1.5 font-mono text-[10px] text-slate-700 dark:text-zinc-300">
                          <p className="truncate text-accent-600 dark:text-accent-400 font-medium">
                            {agentSteps[agentStep]}
                          </p>
                        </div>
                      </div>

                      {/* Audio Stream Card */}
                      <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3 backdrop-blur-md">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="grid h-7 w-7 place-items-center rounded-xl bg-sky-500/20 text-sky-600 dark:text-sky-400">
                              <Music size={15} />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-slate-900 dark:text-white">Midnight City</p>
                              <p className="text-[10px] text-slate-500 dark:text-zinc-400">M83 · AirPlay</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-end gap-0.5 h-3">
                              <span className="w-0.5 h-2.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-eq-bar" />
                              <span className="w-0.5 h-1.5 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-eq-bar [animation-delay:0.2s]" />
                              <span className="w-0.5 h-3 bg-emerald-500 dark:bg-emerald-400 rounded-full animate-eq-bar [animation-delay:0.4s]" />
                            </div>
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              aria-label={isPlaying ? 'Pause' : 'Play'}
                              className="btn-icon h-6 w-6 rounded-full"
                            >
                              {isPlaying ? <Pause size={10} /> : <Play size={10} />}
                            </button>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500 dark:text-zinc-400 font-mono">
                          <span>Speakers</span>
                          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                            {isLidClosed ? 'Playing · lid shut' : 'Streaming (M83)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* FEATURES BENTO SECTION                                  */}
        {/* ======================================================== */}
        <section id="features" className="relative py-24 md:py-32 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            {/* Section Header */}
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono">
                {t.features.tag}
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 dark:text-white">
                {t.features.heading}
              </h2>
              <p className="mt-4 text-pretty text-slate-600 dark:text-zinc-300 md:text-lg leading-relaxed">
                {t.features.subheading}
              </p>
            </div>

            {/* Bento Grid */}
            <div className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-6">
              {/* Card 1: Clamshell Continuity (Large, spans 4 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6 }}
                className="group relative overflow-hidden rounded-3xl glass p-7 md:p-9 md:col-span-4"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                  <Layers size={14} />
                  Clamshell Continuity
                </div>
                <h3 className="mt-5 max-w-md text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl">
                  {t.features.c1Title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  {t.features.c1Desc}
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3.5">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-cool-400" />
                      <span className="text-xs font-mono">Agents</span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-900 dark:text-white">3 active</div>
                  </div>

                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3.5">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      <span className="text-xs font-mono">Audio</span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-900 dark:text-white">Streaming</div>
                  </div>

                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3.5">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                      <span className="text-xs font-mono">Jobs</span>
                    </div>
                    <div className="mt-2 text-sm font-bold text-slate-900 dark:text-white">12 queued</div>
                  </div>
                </div>

                <div className="pointer-events-none absolute -bottom-20 -right-10 h-56 w-56 rounded-full bg-accent-400/15 blur-3xl opacity-40 group-hover:opacity-100 transition-opacity" />
              </motion.div>

              {/* Card 2: Deep Path Diagnostics (Spans 2 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="group relative overflow-hidden rounded-3xl glass p-7 md:col-span-2"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-500/10 px-3.5 py-1 text-xs font-semibold text-rose-500 dark:text-rose-400">
                  <FolderTree size={14} />
                  Deep Path Diagnostics
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Trace heat & drain to the exact file path.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  No more guessing. See the precise process, tab, or container behind the heat.
                </p>

                <div className="mt-5 rounded-2xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-[#06080e] p-3 font-mono text-xs text-slate-900 dark:text-white">
                  <div className="text-slate-500 dark:text-zinc-500">~/projects/api</div>
                  <div className="mt-1 flex items-center justify-between text-rose-500 dark:text-rose-400 font-semibold">
                    <span className="truncate">node · docker-compose</span>
                    <span>94% CPU</span>
                  </div>
                </div>

                <div className="pointer-events-none absolute -top-12 -right-12 h-40 w-40 rounded-full bg-rose-500/15 blur-3xl" />
              </motion.div>

              {/* Card 3: Smart Pause & Process Suspension (Spans 2 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.16 }}
                className="group relative overflow-hidden rounded-3xl glass p-7 md:col-span-2"
              >
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-300">
                  <Pause size={13} />
                  Smart Pause & Suspend
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Freeze rogue apps without losing state.
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                  Non-destructive Mach task suspension halts CPU and battery drain instantly via <code className="text-amber-600 dark:text-amber-300 font-mono text-xs">SIGSTOP</code> — safely resume anytime with zero data loss.
                </p>
                <div className="mt-5 flex items-center gap-3">
                  <a
                    href="#diagnostics"
                    className="btn-action border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25"
                  >
                    <Pause size={13} />
                    <span>Pause culprits</span>
                  </a>
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">Mach SIGSTOP · Safe resume</span>
                </div>
              </motion.div>

              {/* Card 4: Real-time Thermal Map (Spans 2 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.24 }}
                className="rounded-3xl glass p-6 md:col-span-2"
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                  <Flame size={16} className="text-rose-500 dark:text-rose-400" />
                  <span>Real-time thermal map</span>
                </div>
                <div className="mt-5 grid grid-cols-3 gap-2.5">
                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-2.5 text-center">
                    <span className="text-xs text-rose-500 dark:text-rose-400 font-mono flex items-center justify-center gap-1">
                      <Flame size={12} /> Temp
                    </span>
                    <p className="mt-1 text-base font-bold text-slate-900 dark:text-white tabular-nums">82°C</p>
                  </div>
                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-2.5 text-center">
                    <span className="text-xs text-sky-600 dark:text-sky-400 font-mono flex items-center justify-center gap-1">
                      <Fan size={12} /> Fan
                    </span>
                    <p className="mt-1 text-base font-bold text-slate-900 dark:text-white tabular-nums">4,810 rpm</p>
                  </div>
                  <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-2.5 text-center">
                    <span className="text-xs text-rose-500 dark:text-rose-400 font-mono flex items-center justify-center gap-1">
                      <BatteryCharging size={12} /> Drain
                    </span>
                    <p className="mt-1 text-base font-bold text-slate-900 dark:text-white tabular-nums">−14%/h</p>
                  </div>
                </div>
              </motion.div>

              {/* Card 5: Ready in seconds (Spans 2 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.32 }}
                className="relative overflow-hidden rounded-3xl border border-emerald-500/25 bg-gradient-to-br from-emerald-500/10 via-emerald-500/[0.03] to-transparent p-6 md:col-span-2 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 font-mono">
                    Ready in seconds
                  </div>
                  <h3 className="mt-2 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                    Reclaim your Mac today.
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 dark:text-zinc-300 leading-relaxed">
                    Universal binary, 18 MB. No kernel extensions, zero telemetry.
                  </p>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">Instant DMG download</span>
                  <a
                    href="#download"
                    className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200 transition hover:scale-105 shadow-md"
                  >
                    <ArrowRight size={16} />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* INTERACTIVE DIAGNOSTICS PLAYGROUND                      */}
        {/* ======================================================== */}
        <section id="diagnostics" className="relative py-24 md:py-32 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono">
                Live interactive preview
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 dark:text-white">
                Point at the culprit. Pause it instantly.
              </h2>
              <p className="mt-4 text-pretty text-slate-600 dark:text-zinc-300 md:text-lg leading-relaxed">
                This is the real lidZen inspector — running on live interactive simulation. Click any process to trace its binary path, then suspend it safely with Mach <code className="text-amber-600 dark:text-amber-300 font-mono">SIGSTOP</code> signals and resume whenever you&apos;re ready.
              </p>
            </div>

            {/* Inspector Window */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="mt-12 overflow-hidden rounded-3xl glass-strong shadow-2xl"
            >
              {/* Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/[0.08] dark:border-white/[0.08] px-4 py-3 bg-slate-100 dark:bg-[#0c0e14]">
                <div className="flex items-center gap-3">
                  <MacWindowButtons />
                  <div className="flex items-center gap-1.5 text-xs font-mono font-medium text-slate-700 dark:text-zinc-300">
                    <Activity size={14} className="text-emerald-500 dark:text-emerald-400" />
                    <span>lidZen Inspector</span>
                  </div>
                </div>

                {/* Master Global Controls & Real-time Counters */}
                <div className="flex items-center gap-3 ml-auto">
                  {pausedIds.size > 0 && (
                    <button
                      onClick={handleResumeAll}
                      className="btn-action border-emerald-500/30 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25"
                      title="Resume all suspended background tasks (SIGCONT)"
                    >
                      <Play size={12} className="fill-current" />
                      <span>Resume All ({pausedIds.size})</span>
                    </button>
                  )}
                  {activeCulprits.length > 0 && (
                    <button
                      onClick={handlePauseAll}
                      className="btn-action border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300 hover:bg-amber-500/20"
                      title="Pause all runaway tasks (SIGSTOP)"
                    >
                      <Pause size={11} />
                      <span>Pause All</span>
                    </button>
                  )}

                  <div className="flex items-center gap-2 text-xs border-l border-black/10 dark:border-white/10 pl-3">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        isScanning
                          ? 'bg-rose-500 animate-ping'
                          : activeCulprits.length === 0
                          ? 'bg-emerald-400'
                          : 'bg-amber-400'
                      }`}
                    />
                    <span className="text-slate-700 dark:text-zinc-300 font-mono text-xs">
                      {isScanning
                        ? 'Scanning…'
                        : activeCulprits.length === 0
                        ? `All ${initialCulprits.length} tasks suspended`
                        : `${activeCulprits.length} active · ${pausedIds.size} paused`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Two Column Layout with Stable Min-Height */}
              <div className="grid lg:grid-cols-[1fr_1.1fr]">
                {/* Left: Culprits List */}
                <div className="relative border-b border-black/[0.08] dark:border-white/[0.08] p-4 lg:border-b-0 lg:border-r border-black/[0.08] dark:border-white/[0.08] min-h-[380px] transition-dimensions">
                  <div className="mb-3 flex items-center justify-between text-xs text-slate-500 dark:text-zinc-400 font-mono px-1">
                    <span>Background Tasks ({initialCulprits.length})</span>
                    <span className="text-xs text-slate-400 dark:text-zinc-500">Click to inspect</span>
                  </div>

                  <ul className="space-y-2">
                    <AnimatePresence>
                      {initialCulprits.map((item) => {
                        const isSelected = item.id === selectedId;
                        const isPaused = pausedIds.has(item.id);
                        return (
                          <motion.li
                            key={item.id}
                            layout
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.25 }}
                          >
                            <div
                              onClick={() => setSelectedId(item.id)}
                              className={`group flex w-full items-center gap-3 rounded-2xl border p-3.5 text-left transition-all cursor-pointer ${
                                isSelected
                                  ? isPaused
                                    ? 'border-amber-500/40 bg-amber-500/[0.08] shadow-[0_0_20px_rgba(245,158,11,0.1)]'
                                    : 'border-emerald-500/40 bg-emerald-500/[0.08] shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                  : isPaused
                                  ? 'border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.01] opacity-75 hover:opacity-100 hover:border-black/10 dark:hover:border-white/10 hover:bg-black/[0.03] dark:hover:bg-white/[0.03]'
                                  : 'border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.02] hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]'
                              }`}
                            >
                              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-black/5 dark:bg-white/5 ${
                                isPaused ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'
                              }`}>
                                {item.kind === 'docker' ? (
                                  <Layers size={18} className={isPaused ? 'text-amber-500 dark:text-amber-400' : 'text-rose-500 dark:text-rose-400'} />
                                ) : item.kind === 'tab' ? (
                                  <Monitor size={18} className={isPaused ? 'text-amber-500 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400'} />
                                ) : (
                                  <Terminal size={18} className={isPaused ? 'text-amber-500 dark:text-amber-400' : 'text-emerald-600 dark:text-emerald-400'} />
                                )}
                              </span>

                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                                    {item.name}
                                  </p>
                                  {isPaused && (
                                    <span className="shrink-0 rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.2 text-xs font-mono font-semibold text-amber-600 dark:text-amber-300">
                                      PAUSED
                                    </span>
                                  )}
                                </div>
                                <p className="truncate font-mono text-xs text-slate-500 dark:text-zinc-400">
                                  {item.path}
                                </p>
                              </div>

                              <div className="shrink-0 flex items-center gap-3">
                                <div className="text-right">
                                  <span className={`text-sm font-bold tabular-nums ${
                                    isPaused ? 'text-slate-400 dark:text-zinc-500 line-through' : 'text-rose-500 dark:text-rose-400'
                                  }`}>
                                    {isPaused ? '0%' : `${item.cpu}%`}
                                  </span>
                                  <span className="block text-xs text-slate-500 dark:text-zinc-400 font-mono">
                                    {isPaused ? 'SIGSTOP' : 'CPU'}
                                  </span>
                                </div>

                                {/* Individual quick toggle button */}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleTogglePause(item.id);
                                  }}
                                  className={`btn-action p-1.5 ${
                                    isPaused
                                      ? 'text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20 bg-emerald-500/10 border-emerald-500/30'
                                      : 'text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 bg-amber-500/10 border-amber-500/30'
                                  }`}
                                  title={isPaused ? 'Resume process (SIGCONT)' : 'Pause process (SIGSTOP)'}
                                  aria-label={isPaused ? `Resume ${item.name}` : `Pause ${item.name}`}
                                >
                                  {isPaused ? (
                                    <Play size={13} className="fill-current" />
                                  ) : (
                                    <Pause size={13} />
                                  )}
                                </button>
                              </div>
                            </div>
                          </motion.li>
                        );
                      })}
                    </AnimatePresence>
                  </ul>

                  {activeCulprits.length === 0 && (
                    <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/[0.06] p-3 text-center">
                      <p className="text-xs text-emerald-700 dark:text-emerald-300 font-semibold flex items-center justify-center gap-1.5">
                        <CheckCircle2 size={14} className="text-emerald-500 dark:text-emerald-400" />
                        All runaway processes safely suspended!
                      </p>
                      <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                        Zero CPU drain. Ready to resume anytime without lost state.
                      </p>
                    </div>
                  )}
                </div>

                {/* Right: Detailed Path & Instant Pause/Resume Controller */}
                <div className="relative p-5 md:p-7 min-h-[380px] transition-dimensions">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedCulprit.id + '-' + (isSelectedPaused ? 'paused' : 'active')}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-zinc-300 font-mono">
                          <FolderTree size={14} className="text-emerald-500 dark:text-emerald-400" />
                          Binary Path Trace
                        </span>
                        <span className={`text-xs font-semibold uppercase tracking-wider font-mono rounded-full px-2.5 py-0.5 border ${
                          isSelectedPaused
                            ? 'text-amber-700 dark:text-amber-300 border-amber-500/30 bg-amber-500/10'
                            : 'text-rose-600 dark:text-rose-400 border-rose-500/30 bg-rose-500/10'
                        }`}>
                          {isSelectedPaused ? 'Suspended (SIGSTOP)' : 'Thermal Culprit (Active)'}
                        </span>
                      </div>

                      {/* Path box */}
                      <div className="mt-2.5 rounded-2xl border border-black/10 dark:border-white/10 bg-slate-100 dark:bg-[#06080e] p-3.5 font-mono text-xs leading-relaxed text-slate-900 dark:text-white">
                        <span className="text-slate-500 dark:text-zinc-500 block">executable location:</span>
                        <span className="break-all text-slate-900 dark:text-zinc-300 font-medium">
                          {selectedCulprit.path}
                        </span>
                        <span className="text-slate-500 dark:text-zinc-500 block mt-1.5 border-t border-black/5 dark:border-white/5 pt-1.5 text-xs">
                          Mach Thread State:{' '}
                          <span className={isSelectedPaused ? 'text-amber-600 dark:text-amber-300 font-semibold' : 'text-emerald-600 dark:text-emerald-400 font-semibold'}>
                            {isSelectedPaused ? 'TASK_SUSPENDED (Execution paused, state preserved)' : 'TASK_RUNNING (Active CPU thread)'}
                          </span>
                        </span>
                      </div>

                      {/* Metric grid */}
                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-center">
                          <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">CPU Load</span>
                          <p className={`mt-1 text-lg font-bold tabular-nums ${
                            isSelectedPaused ? 'text-slate-400 dark:text-zinc-500' : 'text-rose-500 dark:text-rose-400'
                          }`}>
                            {isSelectedPaused ? '0%' : `${selectedCulprit.cpu}%`}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-center">
                          <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">Temp</span>
                          <p className={`mt-1 text-lg font-bold tabular-nums ${
                            isSelectedPaused ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'
                          }`}>
                            {isSelectedPaused ? '42°C' : `${selectedCulprit.temp}°C`}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-center">
                          <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">Fan Speed</span>
                          <p className={`mt-1 text-lg font-bold tabular-nums ${
                            isSelectedPaused ? 'text-slate-900 dark:text-white' : 'text-sky-600 dark:text-sky-400'
                          }`}>
                            {isSelectedPaused ? '0 RPM' : selectedCulprit.fan.toLocaleString()}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-3 text-center">
                          <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">Drain Rate</span>
                          <p className={`mt-1 text-lg font-bold tabular-nums ${
                            isSelectedPaused ? 'text-slate-400 dark:text-zinc-500' : 'text-rose-500 dark:text-rose-400'
                          }`}>
                            {isSelectedPaused ? '0.0%/h' : `${selectedCulprit.drain}%/h`}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons: Pause (SIGSTOP) vs Resume (SIGCONT) */}
                      <div className="mt-6 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => handleTogglePause(selectedCulprit.id)}
                          className={`btn-action px-5 py-2.5 ${
                            isSelectedPaused
                              ? 'border-emerald-500/40 bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/30'
                              : 'border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-300 hover:bg-amber-500/25'
                          }`}
                        >
                          {isSelectedPaused ? (
                            <>
                              <Play size={15} className="fill-current" />
                              <span>Resume process (SIGCONT)</span>
                            </>
                          ) : (
                            <>
                              <Pause size={15} />
                              <span>Pause process (SIGSTOP)</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={handleResetInspector}
                          className="btn-action border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 px-3.5 py-2.5 text-slate-700 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
                          title="Reset simulation to initial culprits"
                        >
                          <RotateCcw size={13} />
                          <span>Reset</span>
                        </button>

                        <span className="text-xs text-slate-500 dark:text-zinc-400 font-mono">
                          {isSelectedPaused
                            ? 'Paused safely · Zero lost state'
                            : 'Halts CPU instantly via Mach task_suspend'}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Bottom Aggregates Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/[0.08] dark:border-white/[0.08] px-5 py-3 text-xs text-slate-700 dark:text-zinc-300 bg-slate-100 dark:bg-[#0c0e14]">
                <div className="flex items-center gap-4 sm:gap-6 font-mono text-xs">
                  <span>
                    Aggregate CPU:{' '}
                    <strong className={activeCulprits.length > 0 ? 'text-rose-500 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}>
                      {aggregateStats.cpu}%
                    </strong>
                  </span>
                  <span>
                    Max Temp: <strong className="text-slate-900 dark:text-white">{aggregateStats.temp}°C</strong>
                  </span>
                  <span>
                    Fan: <strong className="text-slate-900 dark:text-white">{aggregateStats.fan} RPM</strong>
                  </span>
                  <span>
                    Discharge: <strong className="text-slate-900 dark:text-white">{aggregateStats.drain.toFixed(1)}%/h</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className={`h-2 w-2 rounded-full ${pausedIds.size > 0 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                  <span>
                    {pausedIds.size > 0
                      ? `${pausedIds.size} Mach task_suspend (SIGSTOP) active`
                      : 'Kernel telemetry probe active'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* CLAMSHELL MODE DEEP DIVE                                 */}
        {/* ======================================================== */}
        <section id="clamshell" className="relative py-24 md:py-32 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              {/* Left Silhouette Graphic */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div className="relative overflow-hidden rounded-3xl glass p-8 shadow-xl">
                  <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-400/10 to-transparent" />
                  <div className="relative flex flex-col items-center text-center">
                    {/* Authentic Closed MacBook Pro Clamshell Hardware - Seamlessly Merged into the Interface */}
                    <div className="relative flex flex-col items-center py-4 w-full">
                      {/* Ambient emerald continuity radial aura that bleeds softly into the card */}
                      <div className="pointer-events-none absolute -inset-6 rounded-full bg-emerald-400/15 blur-3xl opacity-70 dark:opacity-80 animate-pulse" />

                      {/* MacBook Pro Clamshell Unibody Assembly */}
                      <div className="relative w-72 sm:w-84 h-44 sm:h-50 rounded-[20px] sm:rounded-[22px] border border-black/[0.08] dark:border-white/15 bg-gradient-to-b from-slate-100 via-slate-200 to-slate-300 dark:from-[#1b202c] dark:via-[#131622] dark:to-[#0a0d14] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15),0_0_35px_rgba(52,211,153,0.12)] flex flex-col justify-between overflow-hidden transition-all duration-300">
                        {/* Rear Precision Anodized Hinge Bar */}
                        <div className="mx-auto h-1.5 w-36 sm:w-44 rounded-b-[2px] bg-zinc-900 dark:bg-black border-x border-zinc-700/60 shadow-inner" />

                        {/* Top Unibody Surface with Laser-Etched Emblem & Soft Breathing Glow */}
                        <div className="relative flex-1 flex flex-col items-center justify-center my-auto">
                          {/* Diffuse radial light on the metal lid */}
                          <div className="absolute h-24 w-24 rounded-full bg-emerald-400/20 blur-xl animate-pulse" />
                          <div className="relative z-10 flex flex-col items-center">
                            {/* Laser-etched metallic emblem */}
                            <div className="relative h-11 w-11 flex items-center justify-center">
                              <Image
                                src="/logo.png"
                                alt="lidZen clamshell emblem"
                                width={36}
                                height={36}
                                className="object-contain drop-shadow-[0_0_12px_rgba(45,212,191,0.65)] filter"
                              />
                            </div>
                            <div className="mt-2 flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-sm">
                              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="font-mono text-[10px] font-semibold text-slate-700 dark:text-zinc-300 uppercase tracking-widest">
                                Clamshell Active
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Left Edge: MagSafe 3 Port with Glowing Status LED */}
                        <div className="absolute left-2.5 top-4 flex items-center gap-1.5" title="MagSafe 3: Continuous power delivery">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.9)]" />
                          <span className="font-mono text-[8px] text-slate-500 dark:text-zinc-400 uppercase tracking-tight hidden sm:inline">
                            PWR
                          </span>
                        </div>

                        {/* Right Edge: Dual Thunderbolt 4 / USB-C Ports */}
                        <div className="absolute right-2.5 top-4 flex items-center gap-1 opacity-50">
                          <span className="h-1 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
                          <span className="h-1 w-2.5 rounded-full bg-zinc-400 dark:bg-zinc-700" />
                        </div>

                        {/* Front Unibody Seam & Iconic Display Thumb Notch */}
                        <div className="relative w-full h-3 border-t border-black/[0.08] dark:border-white/[0.08] bg-gradient-to-b from-slate-200 to-slate-300 dark:from-zinc-800/90 dark:to-zinc-900/90 flex items-start justify-center">
                          <div className="h-1.5 w-16 sm:w-20 rounded-b-sm bg-zinc-400/80 dark:bg-black/90 shadow-inner" />
                        </div>
                      </div>

                      {/* Natural Under-Chassis Contact Shadow */}
                      <div className="w-64 sm:w-76 h-3 rounded-full bg-black/15 dark:bg-black/80 blur-md -mt-1 z-10" />
                    </div>

                    <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-emerald-400" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      Continuity engine · active
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
                        <Bot size={14} className="text-emerald-500 dark:text-emerald-400" />
                        <span className="font-mono">AI Agent</span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>Compiling</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
                        <Music size={14} className="text-sky-600 dark:text-sky-400" />
                        <span className="font-mono">Audio stream</span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>Playing</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
                        <Terminal size={14} className="text-emerald-500 dark:text-emerald-400" />
                        <span className="font-mono">Build / CI</span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>Running</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] p-3">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-zinc-400 text-xs">
                        <Radio size={14} className="text-sky-600 dark:text-sky-400" />
                        <span className="font-mono">Cloud sync</span>
                      </div>
                      <div className="mt-1.5 flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white">
                        <span>48%</span>
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Right text & 6 cards */}
              <div>
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono">
                  Clamshell mode
                </span>
                <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 dark:text-white">
                  Close the lid. Your Mac keeps working.
                </h2>
                <p className="mt-4 max-w-xl text-pretty text-slate-600 dark:text-zinc-300 md:text-lg leading-relaxed">
                  lidZen holds your session in an active continuity state — no sleep assertions fighting, no suspension, no external monitor required. Whatever you left running stays running.
                </p>

                <div className="mt-8 grid gap-3 sm:grid-cols-2">
                  {[
                    {
                      icon: <Bot size={18} />,
                      title: 'AI coding agents',
                      desc: 'Let long-running agents finish refactors overnight with the lid shut.',
                    },
                    {
                      icon: <Music size={18} />,
                      title: 'Music & streams',
                      desc: 'Spotify, Apple Music, and YouTube keep playing to your speakers.',
                    },
                    {
                      icon: <Terminal size={18} />,
                      title: 'Automation & CI',
                      desc: 'Builds, renders, and pipelines run uninterrupted in the background.',
                    },
                    {
                      icon: <Radio size={18} />,
                      title: 'Large uploads',
                      desc: 'Cloud syncs and exports complete without keeping the lid open.',
                    },
                    {
                      icon: <Activity size={18} />,
                      title: 'Notifications',
                      desc: 'Slack, email, and calendar stay live so you never miss a ping.',
                    },
                    {
                      icon: <Sparkles size={18} />,
                      title: 'Anything you run',
                      desc: 'If it runs on your Mac, lidZen keeps it running — lid or no lid.',
                    },
                  ].map((item, idx) => (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.5, delay: idx * 0.05 }}
                      className="group rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.02] p-4 transition-all hover:border-black/15 dark:hover:border-white/15 hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                    >
                      <div className="flex items-center gap-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                          {item.icon}
                        </span>
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{item.title}</span>
                      </div>
                      <p className="mt-2.5 text-xs leading-relaxed text-slate-600 dark:text-zinc-300">{item.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* PRICING SECTION (Shoji Style)                            */}
        {/* ======================================================== */}
        <section id="pricing" className="relative py-24 md:py-32 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <PricingCard />
          </div>
        </section>

        {/* ======================================================== */}
        {/* FAQ ACCORDION SECTION                                   */}
        {/* ======================================================== */}
        <section id="faq" className="relative py-24 md:py-32 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="mx-auto max-w-6xl px-4 md:px-6">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 font-mono">
                Frequently asked questions
              </span>
              <h2 className="mt-3 text-balance text-3xl font-extrabold tracking-tight md:text-4xl text-slate-900 dark:text-white">
                Everything you need to know about lidZen
              </h2>
              <p className="mt-4 text-pretty text-slate-600 dark:text-zinc-300 md:text-lg leading-relaxed">
                Clear answers about sleep states, permissions, thermal management, and Mac support.
              </p>
            </div>

            <div className="mt-12">
              <FAQAccordion />
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* DOWNLOAD / FINAL CTA BANNER                             */}
        {/* ======================================================== */}
        <section id="download" className="relative py-24 md:py-32 border-t border-black/[0.08] dark:border-white/[0.08]">
          <div className="mx-auto max-w-5xl px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-[#0f1422] dark:via-[#090c15] dark:to-[#06080e] p-8 sm:p-14 text-center shadow-xl dark:shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(45,212,191,0.15),transparent_70%)]" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono">
                  <Apple size={14} className="fill-current" />
                  {t.download.version}
                </span>

                <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {t.download.heading}
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-pretty text-slate-600 dark:text-zinc-300 md:text-lg leading-relaxed">
                  {t.download.subheading}
                </p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <a
                    href="#pricing"
                    className="btn-primary group"
                  >
                    <Apple size={18} className="fill-current -mt-0.5" />
                    <span>{buttonLabel}</span>
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href="#pricing"
                    className="btn-secondary"
                  >
                    <span>One-time purchase · {priceOneMac}</span>
                  </a>
                </div>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-zinc-400 font-mono">
                  <span className="flex items-center gap-1.5">
                    <Shield size={14} className="text-emerald-500 dark:text-emerald-400" /> {t.download.noTelemetry}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Zap size={14} className="text-emerald-500 dark:text-emerald-400" /> {t.download.size}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Apple size={14} className="text-emerald-500 dark:text-emerald-400" /> {t.download.sequoia}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
