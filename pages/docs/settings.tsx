import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { Settings, BatteryCharging, Flame, Bell, Moon } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'continuity-policies', title: 'Continuity Policies', level: 2 },
  { id: 'battery-protection', title: 'Battery Health & Cutoff Thresholds', level: 2 },
  { id: 'thermal-limits', title: 'Thermal Limits & Throttling Alerts', level: 2 },
  { id: 'menu-bar-customization', title: 'Menu Bar Customization', level: 2 },
];

export default function SettingsDocs() {
  return (
    <DocLayout
      title="Preferences & Power Settings"
      category="Configuration"
      description="Configure lidZen's sleep policies, battery reserve percentages, thermal safety cutoffs, and menu bar indicators."
      toc={toc}
    >
      <section id="continuity-policies">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Continuity Policies</h2>
        <p>
          Open <strong>lidZen Preferences</strong> (<code>⌘,</code>) to configure how clamshell mode handles different power states:
        </p>

        <div className="my-5 space-y-3">
          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Always On (Ac & Battery)</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              Clamshell continuity is active at all times, regardless of power source.
            </p>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">AC Power Only (Recommended)</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              Only activates clamshell continuity when plugged into a charger or Thunderbolt dock. On battery, normal macOS sleep applies.
            </p>
          </div>

          <div className="rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-4">
            <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Smart Task-Aware Mode</h4>
            <p className="mt-1 text-xs text-slate-600 dark:text-zinc-400">
              Keeps the Mac awake only while monitored background tasks (e.g. downloads, compiler threads, audio) are active, then lets the Mac sleep when tasks finish.
            </p>
          </div>
        </div>
      </section>

      <section id="battery-protection" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Battery Health & Cutoff Thresholds</h2>
        <p>
          To prevent completely depleting your MacBook battery when left unplugged in a backpack:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-slate-700 dark:text-zinc-300 mt-2">
          <li><strong>Low Battery Cutoff Slider:</strong> Default: <code>15%</code>. Once battery capacity drops below this value, lidZen automatically yields power assertions and allows macOS to sleep safely.</li>
          <li><strong>Emergency Hibernation:</strong> Can be configured to write RAM contents to disk (hibernation) if battery discharges below 5%.</li>
        </ul>
      </section>

      <section id="thermal-limits" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Thermal Limits & Throttling Alerts</h2>
        <p>
          lidZen monitors the Apple Silicon package temperature sensor array (GPU clusters, CPU performance cores, and neural engine).
        </p>
        <Callout type="warning" title="Thermal Safety Ceiling">
          The safety ceiling is set to 90°C by default. If your closed Mac reaches this temperature for more than 45 continuous seconds, lidZen sounds an alert and can throttle background workers automatically.
        </Callout>
      </section>

      <section id="menu-bar-customization" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Menu Bar Customization</h2>
        <p>
          Choose what telemetry displays directly in your macOS menu bar:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-zinc-300 mt-2">
          <li>Icon only (minimal).</li>
          <li>Icon + Live Watt Draw (e.g. <code>⚡ 6.8W</code>).</li>
          <li>Icon + SoC Temperature (e.g. <code>🌡️ 54°C</code>).</li>
          <li>Icon + Fan RPM (e.g. <code>🌀 2400</code>).</li>
        </ul>
      </section>
    </DocLayout>
  );
}
