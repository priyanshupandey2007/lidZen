import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { FolderTree, Terminal, AlertCircle, CheckCircle, Zap } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'path-tracing-engine', title: 'The Path Tracing Engine', level: 2 },
  { id: 'identifying-culprits', title: 'Identifying Thermal & Battery Culprits', level: 2 },
  { id: 'docker-containers', title: 'Docker Containers & Sub-processes', level: 2 },
  { id: 'browser-tab-isolation', title: 'Browser Tab & GPU Worker Isolation', level: 2 },
];

export default function FileManagement() {
  return (
    <DocLayout
      title="Deep Path Diagnostics & Culprit Inspector"
      category="Usage Guides"
      description="Trace runaway CPU spikes, fan noise, and rapid battery discharge to exact folder paths, Node packages, and browser worker threads."
      toc={toc}
    >
      <section id="path-tracing-engine">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The Path Tracing Engine</h2>
        <p>
          Generic process monitors inspect only the binary executable name (e.g. <code>node</code>, <code>python</code>, <code>java</code>, or <code>zsh</code>).
        </p>
        <p className="mt-3">
          lidZen's kernel event stream observer extracts:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-zinc-300 mt-2">
          <li><strong>Working Directory (CWD):</strong> Resolves symlinks to absolute paths on your APFS volume.</li>
          <li><strong>CLI Argument Vector:</strong> Full command-line flags and script parameters.</li>
          <li><strong>Process Hierarchy (PPID):</strong> Traces parent chains (e.g. VS Code → zsh → pnpm → esbuild).</li>
          <li><strong>Allocated Virtual Memory & Dirty Pages:</strong> Memory actually consuming physical RAM versus compressed swapped pages.</li>
        </ul>
      </section>

      <section id="identifying-culprits" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Identifying Thermal & Battery Culprits</h2>
        <p>
          In the lidZen UI, processes exceeding predefined thresholds are highlighted with severity badges:
        </p>

        <div className="my-5 space-y-3">
          <div className="rounded-xl border border-signal-500/30 bg-signal-500/10 p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-signal-600 dark:text-signal-400 text-xs uppercase tracking-wider">High Thermal Impact (&gt; 50% CPU or &gt; 10W)</span>
              <span className="text-xs text-signal-600 dark:text-signal-400 font-mono">Immediate Action</span>
            </div>
            <p className="mt-1 text-xs text-slate-700 dark:text-zinc-300">
              Runaway infinite loops, unoptimized WebGL shaders, or hanging compiler threads.
            </p>
          </div>

          <div className="rounded-xl border border-cool-500/30 bg-cool-500/10 p-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-cool-600 dark:text-cool-300 text-xs uppercase tracking-wider">Moderate Continuous Load (15% - 50% CPU)</span>
              <span className="text-xs text-cool-600 dark:text-cool-300 font-mono">Monitored</span>
            </div>
            <p className="mt-1 text-xs text-slate-700 dark:text-zinc-300">
              Active video encodes, streaming music encoders, or continuous file watchers.
            </p>
          </div>
        </div>
      </section>

      <section id="docker-containers" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Docker Containers & Sub-processes</h2>
        <p>
          When Docker Desktop or OrbStack runs on macOS, the host sees a generic <code>com.docker.backend</code> or <code>qemu-system</code> process.
        </p>
        <Callout type="tip" title="OrbStack & Docker Container Resolution">
          lidZen hooks into the local Docker socket (<code>/var/run/docker.sock</code>) to correlate the internal container ID, image name (e.g. <code>postgres:16-alpine</code>), and mapped port directly in your lidZen inspector card!
        </Callout>
      </section>

      <section id="browser-tab-isolation" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Browser Tab & GPU Worker Isolation</h2>
        <p>
          Modern Chromium browsers (Google Chrome, Brave, Arc) split each tab and extension into individual helper processes.
        </p>
        <p className="mt-2">
          lidZen parses the Chrome internal IPC pipes to display the actual website URL and page title (e.g. <code>Chrome Tab: Figma Heavy Canvas</code> or <code>Arc Tab: YouTube 4K stream</code>) instead of an incomprehensible PID.
        </p>
      </section>
    </DocLayout>
  );
}
