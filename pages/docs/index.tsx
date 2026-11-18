import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { ArrowRight, Zap, Download, Layers, Shield, Terminal, Apple } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'welcome', title: 'Welcome to lidZen', level: 2 },
  { id: 'why-lidzen', title: 'Why lidZen?', level: 2 },
  { id: 'quick-navigation', title: 'Quick Navigation', level: 2 },
  { id: 'system-requirements', title: 'System Requirements', level: 2 },
];

export default function DocsIndex() {
  return (
    <DocLayout
      title="Documentation Overview"
      category="Getting Started"
      description="Welcome to lidZen — the macOS clamshell continuity engine and deep path performance inspector."
      toc={toc}
    >
      <section id="welcome">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Welcome to lidZen</h2>
        <p>
          <strong>lidZen</strong> is designed for Mac power users, developers, and creators who need their Mac to remain completely functional, performant, and monitored even when the MacBook lid is closed.
        </p>
        <p className="mt-3">
          Normally, macOS forces your MacBook into sleep state when closing the lid unless you have an external power adapter, keyboard, and external display connected. lidZen bypasses this restriction with zero kernel extensions, letting your AI coding agents, downloads, render jobs, and audio streams keep running uninterrupted.
        </p>

        <Callout type="tip" title="Zero-Kext Architecture">
          lidZen requires no kernel extensions or SIP modifications. Everything operates safely in userland via native macOS Sequoia IOKit power assertion APIs.
        </Callout>
      </section>

      <section id="why-lidzen" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why lidZen?</h2>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4.5">
            <div className="flex items-center gap-2.5 text-accent-600 dark:text-accent-300 font-semibold text-sm">
              <Zap size={16} />
              <span>Clamshell Continuity</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Run background tasks without an external monitor. Close your laptop and put it in your bag or dock while tasks run smoothly.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4.5">
            <div className="flex items-center gap-2.5 text-signal-500 dark:text-signal-400 font-semibold text-sm">
              <Terminal size={16} />
              <span>Deep Path Diagnostics</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Trace runaway heat and CPU spikes directly to specific folder paths, virtual environments, and browser tabs.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4.5">
            <div className="flex items-center gap-2.5 text-cool-600 dark:text-cool-300 font-semibold text-sm">
              <Layers size={16} />
              <span>Thermal & Watt Radar</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Real-time temperature and battery discharge tracking. Auto-throttle or sleep safety cutoffs to avoid overheating.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4.5">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-semibold text-sm">
              <Shield size={16} />
              <span>100% Private</span>
            </div>
            <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 leading-relaxed">
              Zero telemetry, analytics, or cloud reporting. Your processes and file paths remain strictly on your local machine.
            </p>
          </div>
        </div>
      </section>

      <section id="quick-navigation" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Quick Navigation</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/docs/getting-started"
            className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 p-4 text-sm font-medium text-slate-900 dark:text-white hover:border-accent-500/40 hover:bg-accent-500/5 transition group"
          >
            <span>Getting Started Quickstart</span>
            <ArrowRight size={16} className="text-accent-500 dark:text-accent-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs/installation"
            className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 p-4 text-sm font-medium text-slate-900 dark:text-white hover:border-accent-500/40 hover:bg-accent-500/5 transition group"
          >
            <span>Installation & Permissions</span>
            <ArrowRight size={16} className="text-accent-500 dark:text-accent-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs/file-management"
            className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 p-4 text-sm font-medium text-slate-900 dark:text-white hover:border-accent-500/40 hover:bg-accent-500/5 transition group"
          >
            <span>Deep Path Diagnostics</span>
            <ArrowRight size={16} className="text-accent-500 dark:text-accent-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/docs/window"
            className="flex items-center justify-between rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/5 p-4 text-sm font-medium text-slate-900 dark:text-white hover:border-accent-500/40 hover:bg-accent-500/5 transition group"
          >
            <span>Window & Displays</span>
            <ArrowRight size={16} className="text-accent-500 dark:text-accent-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>

      <section id="system-requirements" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">System Requirements</h2>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-zinc-300">
          <li><strong>Operating System:</strong> macOS 15.0 (Sequoia) or later.</li>
          <li><strong>Architecture:</strong> Apple Silicon (M1/M2/M3/M4, Pro, Max, Ultra) or Intel Core i5/i7/i9 (2018+).</li>
          <li><strong>Disk Footprint:</strong> 18 MB universal binary.</li>
          <li><strong>Memory:</strong> Less than 45 MB RAM when active in menu bar.</li>
        </ul>
      </section>
    </DocLayout>
  );
}
