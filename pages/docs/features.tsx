import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { Layers, Bot, Music, Terminal, Activity, Shield, Flame } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'clamshell-engine', title: 'Clamshell Continuity Engine', level: 2 },
  { id: 'deep-path-inspector', title: 'Deep Path Inspector', level: 2 },
  { id: 'smart-process-suspension', title: 'Smart Process Suspension (Pause & Resume)', level: 2 },
  { id: 'watt-thermal-radar', title: 'Real-time Watt & Thermal Radar', level: 2 },
  { id: 'agent-worker-keepalive', title: 'AI Agent & Worker Keepalive', level: 2 },
];

export default function Features() {
  return (
    <DocLayout
      title="Features & Capabilities"
      category="Core Concepts"
      description="Detailed overview of lidZen's core features: clamshell continuity, deep path diagnostics, non-destructive process suspension, and thermal monitoring."
      toc={toc}
    >
      <section id="clamshell-engine">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Clamshell Continuity Engine</h2>
        <p>
          The continuity engine maintains an uninterrupted runtime environment for all background applications.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-5">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">No Hardware Dongles</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              No need to carry HDMI dummy plugs, headless ghost emulators, or fake displays.
            </p>
          </div>
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Battery or AC Power</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              Functions seamlessly whether plugged into a 140W MagSafe charger or running entirely on battery power in a cafe.
            </p>
          </div>
        </div>
      </section>

      <section id="deep-path-inspector" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Deep Path Inspector</h2>
        <p>
          Activity Monitor only tells you that <code>node</code> is using 100% CPU. It doesn't tell you <em>which</em> script, project directory, or container owns that process.
        </p>
        <p className="mt-3">
          lidZen inspects the command-line arguments and working directory of every active process:
        </p>
        <CodeBlock
          language="text"
          fileName="lidZen Inspector Output"
          code={`[PID 48219] node (94.2% CPU · 14.1W)
Binary:  /Users/developer/.nvm/versions/node/v20.10.0/bin/node
Script:  /Users/developer/projects/agency-agent/node_modules/esbuild/bin/esbuild
Parent:  zsh (PID 31092) -> VS Code Terminal (Window: client-dashboard)`}
        />
      </section>

      <section id="smart-process-suspension" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Smart Process Suspension (Pause & Resume)</h2>
        <p>
          Unlike destructive termination (<code>kill -9</code> / <code>SIGKILL</code>) that causes data loss and dropped sockets, lidZen leverages non-destructive macOS Mach task suspension:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-zinc-300 mt-2">
          <li><strong>Non-destructive SIGSTOP:</strong> Freezes thread execution immediately, dropping CPU consumption and thermal output to 0%.</li>
          <li><strong>State & Memory Preservation:</strong> Keeps memory heap allocations, unsaved document buffers, and open socket descriptors intact.</li>
          <li><strong>Instant Resumption (SIGCONT):</strong> Single-click resumption via Mach <code>task_resume</code> awakens threads instantaneously without having to relaunch the application or reload project files.</li>
        </ol>
      </section>

      <section id="watt-thermal-radar" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Real-time Watt & Thermal Radar</h2>
        <p>
          Direct integration with Apple Silicon System Management Controller (SMC) provides:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-zinc-300 mt-2">
          <li>SoC CPU & GPU watt consumption.</li>
          <li>Individual performance core (P-Core) and efficiency core (E-Core) frequency states.</li>
          <li>Dual fan RPM indicators.</li>
          <li>Battery discharge rate percentage per hour.</li>
        </ul>
      </section>

      <section id="agent-worker-keepalive" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">AI Agent & Worker Keepalive</h2>
        <p>
          Autonomous agents running with local LLMs (e.g. Ollama, llama.cpp, Python scripts) or cloud APIs (Claude, OpenAI) can take hours to execute complex coding instructions.
        </p>
        <Callout type="tip" title="Overnight Refactors">
          Leave your autonomous coding agents running overnight with your laptop closed on your desk. You will wake up to completed pull requests and tests without your Mac shutting off midway.
        </Callout>
      </section>
    </DocLayout>
  );
}
