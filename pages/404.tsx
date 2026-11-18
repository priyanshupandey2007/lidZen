import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, Home, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>404 — Page Not Found · lidZen</title>
        <meta name="description" content="The page you're looking for doesn't exist or has been moved." />
      </Head>

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-[#07090e] px-4 transition-colors">
        {/* Multi-layered ambient glow */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {/* Primary emerald radial glow */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full opacity-15 dark:opacity-20"
            style={{
              background: 'radial-gradient(circle, rgba(16,185,129,0.35) 0%, rgba(16,185,129,0.08) 40%, transparent 70%)',
            }}
          />
          {/* Secondary deep indigo ambient */}
          <div
            className="absolute left-1/3 top-1/3 h-[500px] w-[500px] rounded-full opacity-10 dark:opacity-15"
            style={{
              background: 'radial-gradient(circle, rgba(79,70,229,0.3) 0%, transparent 60%)',
            }}
          />
          {/* Soft teal accent ring */}
          <div
            className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, rgba(45,212,191,0.4) 0%, transparent 60%)',
            }}
          />
        </div>

        {/* Subtle grid texture overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.015] dark:opacity-[0.015]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        {/* Central glass card */}
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-md"
        >
          {/* Outer glow ring on card */}
          <div className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-b from-emerald-400/15 via-transparent to-transparent" />

          <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mx-auto mb-6 relative"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-emerald-400/20 blur-xl animate-pulse" />
              </div>
              <Link href="/" className="relative z-10 inline-flex items-center justify-center h-14 w-14 rounded-2xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#0c0e14] shadow-lg mx-auto hover:scale-105 transition-transform">
                <Image
                  src="/logo.png"
                  alt="lidZen logo"
                  width={36}
                  height={36}
                  className="object-cover drop-shadow-[0_0_8px_rgba(45,212,191,0.4)]"
                />
              </Link>
            </motion.div>

            {/* Status code badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 shadow-sm dark:shadow-[0_0_20px_rgba(16,185,129,0.12)] font-mono mb-5"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              404 · Page Not Found
            </motion.div>

            {/* Large status number */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-4"
            >
              <span className="text-7xl sm:text-8xl font-extrabold tracking-tighter text-slate-900 dark:text-white select-none leading-none">
                404
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-3"
            >
              This page slipped into the void.
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm text-slate-600 dark:text-zinc-400 leading-relaxed mb-8 max-w-xs mx-auto"
            >
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
              Maybe the URL is off, or it was swallowed by clamshell mode.
            </motion.p>

            {/* Action buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-col items-center gap-3"
            >
              {/* Primary: Return Home */}
              <Link
                href="/"
                className="group relative inline-flex items-center justify-center gap-2.5 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 px-7 py-3 text-sm font-semibold shadow-md dark:shadow-[0_0_25px_rgba(255,255,255,0.22)] transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] w-full max-w-[220px]"
              >
                <Home size={16} className="-mt-0.5" />
                <span>Return Home</span>
              </Link>

              {/* Secondary: Go Back */}
              <button
                onClick={() => router.back()}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.04] dark:bg-white/[0.04] px-6 py-2.5 text-xs font-medium text-slate-700 dark:text-zinc-400 backdrop-blur-xl transition-all duration-300 hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.08] dark:hover:bg-white/[0.08] hover:text-black dark:hover:text-white hover:scale-[1.02] active:scale-[0.98] w-full max-w-[220px]"
              >
                <ArrowLeft size={14} />
                <span>Go Back</span>
              </button>
            </motion.div>

            {/* Support link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.06]"
            >
              <a
                href="mailto:support@lidzen.app"
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-500 dark:text-zinc-500 hover:text-slate-800 dark:hover:text-zinc-300 transition-colors"
              >
                <MessageCircle size={12} />
                Think this is a mistake? Contact support
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Bottom corner branding */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono text-slate-400 dark:text-zinc-600">
          <span>lidZen v2.4</span>
          <span>·</span>
          <span>macOS Clamshell Continuity</span>
        </div>
      </div>
    </>
  );
}
