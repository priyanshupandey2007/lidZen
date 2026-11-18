import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { AlertTriangle, Terminal, RefreshCw, ShieldAlert } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'sleep-conflicts', title: 'Resolving Sleep Assertion Conflicts', level: 2 },
  { id: 'mac-sleeps-anyway', title: 'Mac Still Sleeps When Lid Closes', level: 2 },
  { id: 'resetting-permissions', title: 'Resetting TCC / Accessibility Permissions', level: 2 },
  { id: 'collecting-diagnostics', title: 'Collecting Diagnostic Logs', level: 2 },
];

export default function Troubleshooting() {
  return (
    <DocLayout
      title="Troubleshooting & Diagnostics Guide"
      category="Support"
      description="Step-by-step diagnostic procedures for resolving sleep assertion conflicts, unexpected suspension, and permissions issues."
      toc={toc}
    >
      <section id="sleep-conflicts">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Resolving Sleep Assertion Conflicts</h2>
        <p>
          Occasionally, third-party utilities (like Amphetamine, Caffeine, or outdated display emulators) can register competing assertions with the macOS power daemon.
        </p>

        <p className="mt-3">
          To inspect which applications are holding active power locks on your system, run:
        </p>
        <CodeBlock
          language="bash"
          fileName="Terminal"
          code={`pmset -g assertions`}
        />

        <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400">
          Look for <code>PreventUserIdleSystemSleep</code> entries. You should see <code>lidZen</code> listed with level <code>1</code>.
        </p>
      </section>

      <section id="mac-sleeps-anyway" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Mac Still Sleeps When Lid Closes</h2>
        <p>
          If your Mac enters sleep immediately upon closing the lid despite lidZen being turned ON, check the following common causes:
        </p>

        <div className="my-5 space-y-3">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">1. Battery Threshold Exceeded</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              If your current battery percentage is below the cutoff threshold configured in lidZen Preferences (default 15%), continuity is automatically bypassed for battery protection.
            </p>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">2. "AC Power Only" Mode Enabled</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              Verify in Preferences whether "AC Power Only" is toggled ON while running unplugged.
            </p>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">3. macOS Low Power Mode</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              System Settings &gt; Battery &gt; Low Power Mode may aggressively force display sleep overrides.
            </p>
          </div>
        </div>
      </section>

      <section id="resetting-permissions" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Resetting TCC / Accessibility Permissions</h2>
        <p>
          If lidZen is unable to read process paths or window titles, reset the macOS Privacy database for lidZen:
        </p>

        <CodeBlock
          language="bash"
          fileName="Terminal"
          code={`# Reset accessibility permissions for lidZen
tccutil reset Accessibility com.lidzen.mac

# Reset system events automation
tccutil reset AppleEvents com.lidzen.mac`}
        />
      </section>

      <section id="collecting-diagnostics" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Collecting Diagnostic Logs</h2>
        <p>
          If you need to report an issue to support, you can generate a redacted diagnostic bundle:
        </p>
        <p className="mt-2 text-zinc-300">
          In lidZen, go to <strong>Help &gt; Export Diagnostic Report</strong> or run:
        </p>
        <CodeBlock
          language="bash"
          fileName="Terminal"
          code={`log show --predicate 'subsystem == "com.lidzen.mac"' --info --last 10m`}
        />
      </section>
    </DocLayout>
  );
}
