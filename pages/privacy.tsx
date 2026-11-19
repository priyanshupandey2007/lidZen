import Head from 'next/head';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — lidZen</title>
        <meta
          name="description"
          content="lidZen Privacy Policy: Zero telemetry, zero analytics tracking, 100% on-device local execution for macOS power users."
        />
        <link rel="canonical" href="https://lidzenmac.vercel.app/privacy" />
      </Head>

      <Header />

      <main className="min-h-screen bg-slate-50 dark:bg-[#07090e] pt-28 pb-20 text-slate-900 dark:text-zinc-100 transition-colors">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb / Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white mb-6 transition"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>

          {/* Header Card */}
          <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 p-8 sm:p-10 backdrop-blur-xl shadow-xl mb-10">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono mb-4">
              <ShieldCheck size={14} /> Zero-Telemetry Commitment
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400 font-mono">
              Last updated: November 19, 2026 · Effective Date: November 19, 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
            {/* 1. Core Philosophy */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <Lock size={18} className="text-emerald-600 dark:text-emerald-400" />
                1. Our Core Principle: Zero Telemetry
              </h2>
              <p>
                lidZen is engineered with a strict <strong>zero-telemetry, offline-first</strong> philosophy. We believe that what you run on your Mac is your business and yours alone. 
                lidZen does <strong>not</strong> collect, transmit, log, or store your personal files, background process names, shell history, terminal output, IP addresses, or device identifiers.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">0% Telemetry</span>
                  No background phone-home or pingbacks.
                </div>
                <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">100% On-Device</span>
                  All power assertions run in local macOS user-space.
                </div>
                <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">No Account Needed</span>
                  No registration, login, or tracking cookies.
                </div>
              </div>
            </section>

            {/* 2. What the App Does Locally */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <HardDrive size={18} className="text-emerald-600 dark:text-emerald-400" />
                2. Local System Processing
              </h2>
              <p>
                To provide clamshell continuity and live process diagnostics, the lidZen macOS application interfaces with native macOS Apple APIs (IOKit, Mach task ports, and System Configuration).
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><strong>IOKit Power Assertions:</strong> Manages temporary <code>NoIdleSleepAssertion</code> requests to prevent sleep during lid closure.</li>
                <li><strong>Process Inspection:</strong> Queries active CPU, thermal, and memory metrics solely to display live statistics in the Menu Bar HUD.</li>
                <li><strong>Thermal Guard:</strong> Evaluates SoC temperatures locally against your configured thresholds without sending alerts externally.</li>
              </ul>
              <p className="mt-3 text-xs text-slate-500 dark:text-zinc-400">
                All data computed during operation stays in volatile memory (RAM) and evaporates when the application terminates.
              </p>
            </section>

            {/* 3. Website & Payment Processing */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <Server size={18} className="text-emerald-600 dark:text-emerald-400" />
                3. Website & Payment Information
              </h2>
              <p>
                When you visit <strong>lidzenmac.vercel.app</strong> or purchase a license:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><strong>No Advertising Cookies:</strong> We do not use third-party tracking pixels, marketing cookies, or fingerprinting scripts.</li>
                <li><strong>Functional Local Storage:</strong> We store non-sensitive display preferences (such as your preferred theme <code>dark/light</code>, language code, and currency) locally in your browser’s <code>localStorage</code>.</li>
                <li><strong>Payment Processing:</strong> Transactions are handled securely by Stripe. We never see or store your full credit card number or billing CVV. Stripe operates under PCI-DSS Level 1 compliance.</li>
              </ul>
            </section>

            {/* 4. Contact */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <EyeOff size={18} className="text-emerald-600 dark:text-emerald-400" />
                4. Contact & Inquiries
              </h2>
              <p>
                If you have questions regarding this Privacy Policy or lidZen’s zero-telemetry architecture, please open an issue or reach out via our official GitHub repository:
              </p>
              <p className="mt-3 font-mono text-xs">
                <a
                  href="https://github.com/priyanshupandey2007/lidZen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  github.com/priyanshupandey2007/lidZen
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
