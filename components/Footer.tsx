import Link from 'next/link';
import Image from 'next/image';
import { Cpu, ShieldCheck, Zap } from 'lucide-react';
import AppleLogo from './AppleLogo';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';

const footerGroups = [
  {
    title: 'Product',
    links: [
      { href: '/#features', label: 'Features' },
      { href: '/#diagnostics', label: 'Live Diagnostics' },
      { href: '/#clamshell', label: 'Clamshell Continuity' },
      { href: '/#pricing', label: 'Pricing' },
      { href: '/#download', label: 'Download' },
    ],
  },
  {
    title: 'Documentation',
    links: [
      { href: '/docs', label: 'Overview' },
      { href: '/docs/getting-started', label: 'Getting Started' },
      { href: '/docs/installation', label: 'Installation' },
      { href: '/docs/features', label: 'Core Features' },
      { href: '/docs/troubleshooting', label: 'Troubleshooting' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { href: '/docs/settings', label: 'Settings & Config' },
      { href: '/docs/file-management', label: 'Path Tracing' },
      { href: '/docs/faq', label: 'FAQ' },
      { href: 'mailto:support@lidzen.com?subject=lidZen%20Support%20%26%20Inquiry', label: 'Support & Queries' },
      { href: 'https://github.com/priyanshupandey2007/lidZen/releases', label: 'Changelog' },
      { href: '/privacy', label: 'Privacy Policy' },
      { href: '/terms', label: 'Terms & Conditions' },
    ],
  },
];

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="relative border-t border-black/[0.08] dark:border-white/[0.08] bg-slate-100 dark:bg-[#06080d] pt-16 pb-12 transition-colors">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand info */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="relative h-8 w-8 rounded-xl overflow-hidden shadow-sm">
                <Image
                  src="/logo.png"
                  alt="lidZen"
                  width={32}
                  height={32}
                  className="h-full w-full object-cover rounded-xl"
                />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">lidZen</span>
            </Link>
            <p className="mt-3.5 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-zinc-400">
              Clamshell continuity and deep path diagnostics for Mac power users. Keep AI agents, workflows, and music alive with the lid shut.
            </p>
            <p className="mt-2 text-xs text-slate-600 dark:text-zinc-400 font-mono">
              Support &amp; Queries:{' '}
              <a href="mailto:support@lidzen.com?subject=lidZen%20Support%20%26%20Inquiry" className="text-emerald-600 dark:text-emerald-400 hover:underline">
                support@lidzen.com
              </a>
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-3 py-1.5 text-xs text-slate-700 dark:text-zinc-300 font-mono">
              <AppleLogo size={14} className="text-emerald-600 dark:text-emerald-400" />
              <span>macOS 15+ (Sequoia) · Apple Silicon & Intel</span>
            </div>
          </div>

          {/* Nav groups */}
          {footerGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white font-mono">
                {group.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {group.links.map((link) => {
                  const isExternal = link.href.startsWith('mailto:') || link.href.startsWith('http');
                  return (
                    <li key={link.href + link.label}>
                      {isExternal ? (
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-slate-600 dark:text-zinc-400 transition hover:text-slate-900 dark:hover:text-white"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={link.href}
                          className="text-sm text-slate-600 dark:text-zinc-400 transition hover:text-slate-900 dark:hover:text-white"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-black/[0.06] dark:border-white/[0.06] pt-8 text-xs text-slate-600 dark:text-zinc-300 sm:flex-row font-mono">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <span>© {new Date().getFullYear()} lidZen Systems. {t.footer.rights}</span>
            <span className="text-black/20 dark:text-white/20">·</span>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white transition">Privacy</Link>
            <span className="text-black/20 dark:text-white/20">·</span>
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white transition">Terms</Link>
            <span className="text-black/20 dark:text-white/20">·</span>
            <a href="mailto:support@lidzen.com?subject=Grievance%20Redressal" className="hover:text-slate-900 dark:hover:text-white transition">Grievance</a>
            <span className="text-black/20 dark:text-white/20">·</span>
            <LanguageSelector />
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-emerald-600 dark:text-emerald-400" />
              {t.footer.zeroTelemetry}
            </span>
            <span className="flex items-center gap-1.5">
              <Zap size={14} className="text-emerald-600 dark:text-emerald-400" />
              {t.footer.binary}
            </span>
            <span className="flex items-center gap-1.5">
              <Cpu size={14} className="text-emerald-600 dark:text-emerald-400" />
              {t.footer.idle}
            </span>
          </div>
        </div>

        {/* Legal & Trademark Disclaimer */}
        <div className="mt-6 border-t border-black/[0.04] dark:border-white/[0.04] pt-4 text-[11px] leading-relaxed text-slate-600 dark:text-zinc-400 font-mono">
          <p>
            Apple, Mac, MacBook, macOS, Sequoia, Apple Silicon, and IOKit are trademarks of Apple Inc., registered in the U.S. and other countries. lidZen is an independent software utility developed by lidZen Systems and is not affiliated with, sponsored, or endorsed by Apple Inc. All checkout transactions and merchant billing are securely fulfilled by Dodo Payments Inc. as Merchant of Record.
          </p>
        </div>
      </div>
    </footer>
  );
}
