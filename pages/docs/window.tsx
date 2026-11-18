import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { Monitor, Tv, Layout, Sparkles } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'display-detection', title: 'Display State Detection', level: 2 },
  { id: 'external-monitors', title: 'External Monitor Configurations', level: 2 },
  { id: 'virtual-displays', title: 'Virtual Displays & Headless Mode', level: 2 },
  { id: 'window-preservation', title: 'Window Position Preservation', level: 2 },
];

export default function WindowDocs() {
  return (
    <DocLayout
      title="Window & Display Management"
      category="Usage Guides"
      description="Manage how macOS arranges windows, renders headless desktop spaces, and behaves when connecting or disconnecting external monitors."
      toc={toc}
    >
      <section id="display-detection">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Display State Detection</h2>
        <p>
          macOS normally recalibrates all display resolutions and reshuffles windows whenever a display connects or disconnects. lidZen monitors CoreGraphics display reconfiguration events:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-zinc-300 mt-2">
          <li><strong>Lid Closed with Monitor:</strong> Internal display sleep, video signal directed solely to external display at full native refresh rate (120Hz / 144Hz ProMotion).</li>
          <li><strong>Lid Closed without Monitor:</strong> True headless mode. Window arrangement is cached in memory so when you open the lid later, every app returns to its exact original monitor coordinate.</li>
        </ul>
      </section>

      <section id="external-monitors" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">External Monitor Configurations</h2>
        <p>
          lidZen works seamlessly with:
        </p>
        <div className="grid gap-3 sm:grid-cols-3 my-4">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 text-center">
            <Monitor size={22} className="mx-auto text-accent-500 dark:text-accent-400 mb-2" />
            <h5 className="font-semibold text-slate-900 dark:text-white text-xs">Thunderbolt Displays</h5>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-zinc-400">Apple Studio Display, Pro Display XDR, LG UltraFine.</p>
          </div>
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 text-center">
            <Tv size={22} className="mx-auto text-cool-500 dark:text-cool-300 mb-2" />
            <h5 className="font-semibold text-slate-900 dark:text-white text-xs">HDMI 2.1 & DisplayPort</h5>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-zinc-400">4K & 8K high-refresh rate gaming and productivity monitors.</p>
          </div>
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4 text-center">
            <Layout size={22} className="mx-auto text-signal-500 dark:text-signal-400 mb-2" />
            <h5 className="font-semibold text-slate-900 dark:text-white text-xs">Sidecar & AirPlay</h5>
            <p className="mt-1 text-[11px] text-slate-600 dark:text-zinc-400">Wirelessly stream or extend desktops to iPad and Apple TV.</p>
          </div>
        </div>
      </section>

      <section id="virtual-displays" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Virtual Displays & Headless Mode</h2>
        <p>
          For remote workers accessing their MacBook over Screen Sharing, VNC, or Jump Desktop with the lid closed:
        </p>
        <Callout type="tip" title="Virtual Framebuffer Emulation">
          lidZen can create a virtual HiDPI Retina display buffer (up to 3840x2160 @ 60Hz) so remote desktop sessions maintain sharp text rendering even without physical screens connected.
        </Callout>
      </section>

      <section id="window-preservation" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Window Position Preservation</h2>
        <p>
          One of the most annoying quirks in macOS is windows collapsing into a single chaotic pile after waking up from clamshell sleep.
        </p>
        <p className="mt-2">
          lidZen takes a snapshot of your window layout before sleep and restores every window, tool palette, and browser window to its exact monitor space upon wake.
        </p>
      </section>
    </DocLayout>
  );
}
