import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const docSequence = [
  { href: '/docs', title: 'Documentation Overview' },
  { href: '/docs/getting-started', title: 'Getting Started' },
  { href: '/docs/installation', title: 'Installation & Permissions' },
  { href: '/docs/introduction', title: 'Architecture & Sleep Assertions' },
  { href: '/docs/features', title: 'Features & Capabilities' },
  { href: '/docs/window', title: 'Window & Display Management' },
  { href: '/docs/file-management', title: 'Deep Path Diagnostics' },
  { href: '/docs/settings', title: 'Preferences & Power Settings' },
  { href: '/docs/troubleshooting', title: 'Troubleshooting Guide' },
  { href: '/docs/faq', title: 'Frequently Asked Questions' },
];

export default function PrevNextNav() {
  const router = useRouter();
  const currentIndex = docSequence.findIndex((d) => d.href === router.pathname);

  const prev = currentIndex > 0 ? docSequence[currentIndex - 1] : null;
  const next =
    currentIndex >= 0 && currentIndex < docSequence.length - 1
      ? docSequence[currentIndex + 1]
      : null;

  return (
    <nav className="mt-16 flex flex-col gap-4 border-t border-black/[0.06] dark:border-white/[0.08] pt-8 sm:flex-row sm:items-center sm:justify-between">
      {prev ? (
        <Link
          href={prev.href}
          className="group flex flex-col items-start gap-1 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.02] p-4 text-left transition hover:border-black/10 dark:hover:border-white/10 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] sm:max-w-[48%]"
        >
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-500 font-mono">
            <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1 text-accent-500" />
            Previous
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex flex-col items-end gap-1 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.01] dark:bg-white/[0.02] p-4 text-right transition hover:border-black/10 dark:hover:border-white/10 hover:bg-black/[0.03] dark:hover:bg-white/[0.05] sm:max-w-[48%] ml-auto"
        >
          <span className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-zinc-500 font-mono">
            Next
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1 text-accent-500" />
          </span>
          <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-accent-600 dark:group-hover:text-accent-300 transition-colors">
            {next.title}
          </span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
