import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout, CodeBlock } from '../../components/DocComponents';
import { Cpu, Power, Zap, AlertTriangle } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'macos-power-model', title: 'The macOS Power Management Model', level: 2 },
  { id: 'clamshell-limitations', title: 'Why Clamshell Mode is Restricted', level: 2 },
  { id: 'how-lidzen-works', title: 'How lidZen Works Internally', level: 2 },
  { id: 'thermal-safeguards', title: 'Hardware & Thermal Safeguards', level: 2 },
];

export default function Introduction() {
  return (
    <DocLayout
      title="Architecture & Sleep Assertions"
      category="Core Concepts"
      description="Deep dive into how macOS power management handles lid closures, sleep assertions, and how lidZen provides execution continuity."
      toc={toc}
    >
      <section id="macos-power-model">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">The macOS Power Management Model</h2>
        <p>
          macOS utilizes the <strong>IOPowerManagement</strong> kernel subsystem to coordinate hardware states. When a MacBook lid sensor registers a close event, macOS transitions the system from <code>S0 (Active)</code> to <code>S3 (Suspend to RAM)</code> or <code>S4 (Safe Sleep / Hibernation)</code>.
        </p>
        <p className="mt-3">
          During this transition:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-zinc-300 mt-2">
          <li>Userland thread scheduling is suspended.</li>
          <li>Network adapters (WiFi/Ethernet) enter low-power beacon or sleep mode.</li>
          <li>Apple Silicon unified memory clocks throttle down to idle retention voltages.</li>
          <li>Active TCP connections, Docker daemons, and SSH tunnels drop.</li>
        </ul>
      </section>

      <section id="clamshell-limitations" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Why Clamshell Mode is Restricted</h2>
        <p>
          Apple officially supports "Closed-Display Mode" (clamshell) only when three hardware conditions are satisfied simultaneously:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-slate-700 dark:text-zinc-300 mt-2">
          <li>The Mac is plugged into AC power.</li>
          <li>An external mouse/keyboard (wired or Bluetooth) is paired.</li>
          <li>An external monitor is connected and receiving a video signal.</li>
        </ol>
        <p className="mt-3">
          If you disconnect any of these, macOS immediately puts the laptop to sleep, frustrating developers compiling large projects or running long AI workflows on the go.
        </p>
      </section>

      <section id="how-lidzen-works" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">How lidZen Works Internally</h2>
        <p>
          lidZen solves this problem by holding a specialized <code>PreventUserIdleSystemSleep</code> assertion using the public <code>IOPMAssertionCreateWithName</code> C API.
        </p>

        <CodeBlock
          language="c"
          fileName="Core assertion logic (simplified)"
          code={`IOPMAssertionID assertionID;
IOReturn result = IOPMAssertionCreateWithName(
    kIOPMAssertionTypePreventUserIdleSystemSleep,
    kIOPMAssertionLevelOn,
    CFSTR("lidZen Clamshell Continuity Active"),
    &assertionID
);`}
        />

        <Callout type="success" title="Independent Display Sleep">
          Crucially, lidZen allows <code>PreventUserIdleDisplaySleep</code> to remain OFF. This means your display backlight, OLED panel, and Liquid Retina screen switch completely off, eliminating screen burn-in and saving battery, while CPU and networking remain 100% active.
        </Callout>
      </section>

      <section id="thermal-safeguards" className="pt-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Hardware & Thermal Safeguards</h2>
        <p>
          A common concern with closed laptops is heat dissipation. On modern MacBook Pro and Air models, heat is primarily exhausted through the rear hinge vents, which remain unobstructed when the lid is shut.
        </p>
        <p className="mt-2">
          Nonetheless, lidZen includes intelligent thermal tripwires:
        </p>
        <ul className="list-disc pl-5 space-y-1.5 text-slate-700 dark:text-zinc-300 mt-2">
          <li><strong>Thermal tripwire:</strong> If SoC package temp exceeds 92°C, lidZen auto-suspends continuity to avoid thermal throttling.</li>
          <li><strong>Battery threshold cutoff:</strong> Automatically enables standard macOS sleep if battery falls below user-configured limit (e.g. 15%).</li>
        </ul>
      </section>
    </DocLayout>
  );
}
