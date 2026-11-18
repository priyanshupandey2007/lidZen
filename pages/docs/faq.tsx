import Link from 'next/link';
import DocLayout, { TocItem } from '../../components/DocLayout';
import { Callout } from '../../components/DocComponents';
import FAQAccordion from '../../components/FAQAccordion';
import { HelpCircle, Shield, BatteryCharging, Apple, Key } from 'lucide-react';

const toc: TocItem[] = [
  { id: 'general-faq', title: 'General Questions', level: 2 },
  { id: 'security-faq', title: 'Security & Privacy', level: 2 },
  { id: 'hardware-faq', title: 'Battery & Hardware Impact', level: 2 },
  { id: 'licensing-faq', title: 'Licensing & Updates', level: 2 },
];

export default function FAQDocs() {
  return (
    <DocLayout
      title="Frequently Asked Questions"
      category="Support"
      description="Answers to common questions about lidZen's clamshell continuity, battery longevity, security model, and licenses."
      toc={toc}
    >
      <section id="general-faq">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">General Questions</h2>
        <FAQAccordion />
      </section>

      <section id="security-faq" className="pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Security & Privacy</h2>
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-base">Does lidZen phone home or send telemetry?</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>No.</strong> lidZen does not send any telemetry, usage analytics, crash logs, or network requests. Your running process names, paths, and hardware sensors are computed 100% locally on your device.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-base">Does lidZen require disabling SIP (System Integrity Protection)?</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              <strong>No.</strong> System Integrity Protection (SIP) remains fully enabled at all times. lidZen uses standard Apple public APIs and notarized binaries.
            </p>
          </div>
        </div>
      </section>

      <section id="hardware-faq" className="pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Battery & Hardware Impact</h2>
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-base">Will running my Mac with the lid closed harm the screen?</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              On all Apple Silicon MacBooks (M1 through M4), the Liquid Retina display backlight completely powers off when the lid is closed. Heat exhausts out through the rear hinge vents, completely away from the glass. In addition, lidZen's automatic thermal cutoff suspends background jobs if temperatures exceed 90°C.
            </p>
          </div>

          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-base">What is the battery impact when idle?</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              When lidZen is running with no heavy background tasks active, CPU utilization is under 0.2%, consuming less than 1.5% battery over an 8-hour period with the screen powered down.
            </p>
          </div>
        </div>
      </section>

      <section id="licensing-faq" className="pt-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Licensing & Updates</h2>
        <div className="space-y-4">
          <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-5">
            <h4 className="font-semibold text-slate-900 dark:text-white text-base">How does licensing work?</h4>
            <p className="mt-2 text-sm text-slate-600 dark:text-zinc-400 leading-relaxed">
              lidZen is a one-time purchase of $29 with a 14-day free trial. A single license can be activated on up to 3 personal Mac machines simultaneously. All minor and major updates within the current generation are included for free.
            </p>
          </div>
        </div>
      </section>
    </DocLayout>
  );
}
