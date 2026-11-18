import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { Check, ShieldCheck, Zap } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'first-launch', title: 'First Launch & Setup', level: 2 },
  { id: 'activating-clamshell', title: 'Activating Clamshell Mode', level: 2 },
  { id: 'menu-bar-overview', title: 'Menu Bar Status Overview', level: 2 },
  { id: 'verifying-continuity', title: 'Verifying Task Continuity', level: 2 },
];

export default function GettingStarted() {
  return (
    <DocLayout
      title="Getting Started with lidZen"
      category="Getting Started"
      description="Learn how to launch lidZen, enable your first clamshell continuity session, and monitor background tasks."
      toc={toc}
    >
      <section id="first-launch">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">First Launch & Setup</h2>
        <p>
          Once you have dragged <code>lidZen.app</code> to your <code>/Applications</code> folder and opened it, lidZen lives in your macOS menu bar as a sleek clamshell icon.
        </p>

        <div className="my-6 space-y-3">
          <div className="flex items-start gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500 text-ink-950 font-bold text-xs">
              1
            </span>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">Launch lidZen</p>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-zinc-400">Open lidZen from Spotlight or Applications. A menu bar status item will appear.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500 text-ink-950 font-bold text-xs">
              2
            </span>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">Grant Accessibility & Diagnostics</p>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-zinc-400">Allows lidZen to inspect runaway thread paths without needing root or Terminal access.</p>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent-500 text-ink-950 font-bold text-xs">
              3
            </span>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white text-sm">Select Your Preferred Policy</p>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-zinc-400">Choose between "Always Awake", "On Battery Safeguard", or "Smart Agent Continuity".</p>
            </div>
          </div>
        </div>
      </section>

      <section id="activating-clamshell" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Activating Clamshell Mode</h2>
        <p>
          Click the lidZen menu bar icon and toggle <strong>Clamshell Continuity</strong> to ON.
        </p>

        <CodeBlock
          language="bash"
          fileName="Terminal verification (optional)"
          code={`# Check active power assertions registered by lidZen
pmset -g assertions | grep lidZen`}
        />

        <Callout type="info" title="Automatic Display Off">
          When you close your MacBook lid with lidZen active, the built-in Liquid Retina display turns off completely to conserve power and reduce heat, while CPU, GPU, Neural Engine, and WiFi continue running at full speed.
        </Callout>
      </section>

      <section id="menu-bar-overview" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Menu Bar Status Overview</h2>
        <p>
          The lidZen menu bar item provides at-a-glance telemetry:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-zinc-300 mt-3">
          <li><strong>Continuity status:</strong> Glowing dot indicates active assertion.</li>
          <li><strong>Watt meter:</strong> Real-time system power draw (e.g. <code>4.2W</code> on idle, <code>28.5W</code> during compile).</li>
          <li><strong>Thermal status:</strong> SoC temperature and fan speeds.</li>
          <li><strong>Top Culprits:</strong> Immediate access to the heaviest runaway processes.</li>
        </ul>
      </section>

      <section id="verifying-continuity" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Verifying Task Continuity</h2>
        <p>
          To test lidZen:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-zinc-300 mt-2">
          <li>Start a test download or continuous ping in Terminal: <code>ping 1.1.1.1</code></li>
          <li>Close your MacBook lid.</li>
          <li>Wait 30 seconds and open the lid again.</li>
          <li>Observe that the ping count continued without dropping a single packet or sleep transition.</li>
        </ol>
      </section>
    </DocLayout>
  );
}
