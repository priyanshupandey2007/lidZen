import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  BookOpen,
  Zap,
  Download,
  Info,
  Layers,
  Monitor,
  FolderTree,
  Settings,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';

export const docNavGroups = [
  {
    title: 'Getting Started',
    items: [
      { href: '/docs', label: 'Overview', icon: BookOpen },
      { href: '/docs/getting-started', label: 'Quickstart', icon: Zap },
      { href: '/docs/installation', label: 'Installation & Permissions', icon: Download },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { href: '/docs/introduction', label: 'Architecture & Sleep Assertions', icon: Info },
      { href: '/docs/features', label: 'Continuity & Performance Radar', icon: Layers },
    ],
  },
  {
    title: 'Usage Guides',
    items: [
      { href: '/docs/window', label: 'Window & Display Management', icon: Monitor },
      { href: '/docs/file-management', label: 'Path Tracing & Culprit Inspector', icon: FolderTree },
    ],
  },
  {
    title: 'Reference & Help',
    items: [
      { href: '/docs/settings', label: 'Settings & Power Rules', icon: Settings },
      { href: '/docs/troubleshooting', label: 'Troubleshooting & Logs', icon: AlertTriangle },
      { href: '/docs/faq', label: 'FAQ', icon: HelpCircle },
    ],
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export default function Sidebar({ mobileOpen, onCloseMobile }: SidebarProps) {
  const router = useRouter();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 border-r border-black/[0.06] dark:border-white/[0.08] bg-slate-100/50 dark:bg-[#09090c]/60 backdrop-blur-xl p-5 sticky top-16 h-[calc(100dvh-4rem)] min-h-0 overflow-y-auto transition-dimensions">
        <div className="space-y-7">
          {docNavGroups.map((group) => (
            <div key={group.title}>
              <h3 className="px-3 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-mono">
                {group.title}
              </h3>
              <ul className="mt-2 space-y-1">
                {group.items.map((item) => {
                  const isActive = router.pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-accent-500/10 text-accent-700 dark:text-accent-300 border border-accent-500/30 font-semibold'
                            : 'text-slate-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white border border-transparent'
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-accent-500' : 'text-slate-400 dark:text-zinc-500'} />
                        <span>{item.label}</span>
                        {isActive && <ChevronRight size={14} className="ml-auto text-accent-500" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom helper card */}
        <div className="mt-10 rounded-2xl border border-black/5 dark:border-white/5 bg-black/[0.02] dark:bg-white/[0.02] p-4 text-xs">
          <p className="font-semibold text-slate-900 dark:text-white">Need help?</p>
          <p className="mt-1 text-slate-500 dark:text-zinc-400 leading-relaxed">
            Reach out via GitHub or join our community Discord.
          </p>
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1.5 text-accent-600 dark:text-accent-300 hover:underline font-medium"
          >
            <span>GitHub Repository</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onCloseMobile} />
          <div className="relative flex w-4/5 max-w-xs flex-col border-r border-black/10 dark:border-white/10 bg-white dark:bg-[#0d0d12] p-5 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-black/10 dark:border-white/10">
              <span className="text-sm font-bold text-slate-900 dark:text-white">Documentation</span>
              <button
                onClick={onCloseMobile}
                className="rounded-lg p-1 text-slate-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 flex-1 overflow-y-auto space-y-6">
              {docNavGroups.map((group) => (
                <div key={group.title}>
                  <h3 className="px-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-500 font-mono">
                    {group.title}
                  </h3>
                  <ul className="mt-2 space-y-1">
                    {group.items.map((item) => {
                      const isActive = router.pathname === item.href;
                      const Icon = item.icon;
                      return (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            onClick={onCloseMobile}
                            className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium transition ${
                              isActive
                                ? 'bg-accent-500/10 text-accent-700 dark:text-accent-300 font-semibold'
                                : 'text-slate-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                            }`}
                          >
                            <Icon size={16} />
                            <span>{item.label}</span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
