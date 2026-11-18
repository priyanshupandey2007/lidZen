import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { Search, X, FileText, CornerDownLeft } from 'lucide-react';

export interface SearchDocItem {
  title: string;
  category: string;
  description: string;
  href: string;
  keywords: string[];
}

export const searchIndex: SearchDocItem[] = [
  {
    title: 'Documentation Overview',
    category: 'Getting Started',
    description: 'Welcome to lidZen — introduction to clamshell continuity and macOS performance diagnostics.',
    href: '/docs',
    keywords: ['overview', 'docs', 'intro', 'clamshell', 'mac', 'lidzen'],
  },
  {
    title: 'Getting Started with lidZen',
    category: 'Getting Started',
    description: 'Quickstart guide to set up lidZen, configure sleep assertions, and verify background task persistence.',
    href: '/docs/getting-started',
    keywords: ['quickstart', 'start', 'setup', 'first run', 'tutorial'],
  },
  {
    title: 'Installation & Permissions',
    category: 'Getting Started',
    description: 'Step-by-step DMG installation, zero-kext architecture, and required diagnostic permissions.',
    href: '/docs/installation',
    keywords: ['install', 'dmg', 'permissions', 'full disk access', 'download', 'security'],
  },
  {
    title: 'Introduction & Core Concepts',
    category: 'Core Concepts',
    description: 'How macOS power management works, clamshell modes, and sleep assertions vs execution continuity.',
    href: '/docs/introduction',
    keywords: ['concepts', 'power management', 'sleep', 'wake', 'iokit', 'kernel'],
  },
  {
    title: 'Features & Capabilities',
    category: 'Core Concepts',
    description: 'Comprehensive guide to clamshell continuity, background audio, agent worker threads, and memory radar.',
    href: '/docs/features',
    keywords: ['features', 'audio', 'agent', 'threads', 'clamshell', 'fan control'],
  },
  {
    title: 'Window & Display Management',
    category: 'Usage Guides',
    description: 'Controlling external displays, virtual headless displays, and multi-monitor clamshell behavior.',
    href: '/docs/window',
    keywords: ['window', 'display', 'external monitor', 'headless', 'hdmi', 'thunderbolt'],
  },
  {
    title: 'Deep Path File & Process Diagnostics',
    category: 'Usage Guides',
    description: 'Tracing runaway heat and CPU consumption down to exact file paths, Node modules, and Docker containers.',
    href: '/docs/file-management',
    keywords: ['path', 'files', 'process', 'docker', 'node', 'cpu', 'watt', 'diagnostics'],
  },
  {
    title: 'Preferences & Power Settings',
    category: 'Configuration',
    description: 'Configure menu bar indicators, battery threshold cutoffs, thermal warnings, and auto-wake rules.',
    href: '/docs/settings',
    keywords: ['settings', 'preferences', 'battery', 'threshold', 'config', 'menu bar'],
  },
  {
    title: 'Troubleshooting & Diagnostics Guide',
    category: 'Support',
    description: 'Solutions for sleep assertion conflicts, unresponsive processes, and permission resets.',
    href: '/docs/troubleshooting',
    keywords: ['troubleshoot', 'error', 'debug', 'logs', 'fix', 'reset'],
  },
  {
    title: 'Frequently Asked Questions',
    category: 'Support',
    description: 'Common questions about battery health, security, Apple Silicon support, and licensing.',
    href: '/docs/faq',
    keywords: ['faq', 'questions', 'battery health', 'license', 'price', 'intel', 'm1', 'm2', 'm3', 'm4'],
  },
];

interface SearchModalProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function SearchModal({ isOpen: controlledOpen, onClose: controlledClose }: SearchModalProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const handleClose = () => {
    if (controlledClose) controlledClose();
    setInternalOpen(false);
    setQuery('');
  };

  // Keyboard shortcut listener (CMD+K or CTRL+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setInternalOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Filter items
  const results = searchIndex.filter((item) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.keywords.some((k) => k.toLowerCase().includes(q))
    );
  });

  const handleSelect = (href: string) => {
    handleClose();
    router.push(href);
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[activeIndex]) {
        handleSelect(results[activeIndex].href);
      }
    }
  };

  return (
    <>
      {/* Trigger pill button */}
      <button
        onClick={() => setInternalOpen(true)}
        className="btn-action !px-3 !py-1.5 text-xs text-slate-600 dark:text-zinc-400"
      >
        <Search size={14} className="text-accent-500" />
        <span className="hidden sm:inline">Search docs…</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-lg border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 font-mono text-xs text-slate-600 dark:text-zinc-300">
          ⌘K
        </kbd>
      </button>

      {/* Modal Dialog */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 dark:bg-black/80 p-4 pt-20 backdrop-blur-md sm:pt-28"
          onClick={handleClose}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-black/15 dark:border-white/15 bg-white dark:bg-[#0c0c12] shadow-2xl backdrop-blur-2xl transition-all"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 border-b border-black/[0.06] dark:border-white/[0.08] px-4 py-3.5 bg-slate-50 dark:bg-[#0e0e16]">
              <Search size={18} className="text-accent-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search documentation, guides, and settings…"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={handleInputKeyDown}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:outline-none"
              />
              {query && (
                <button
                  onClick={() => setQuery('')}
                  className="rounded-lg p-1 text-slate-500 dark:text-zinc-400 hover:text-black dark:hover:text-white"
                >
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Results list */}
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length > 0 ? (
                <ul className="space-y-1">
                  {results.map((item, idx) => {
                    const isSelected = idx === activeIndex;
                    return (
                      <li key={item.href}>
                        <button
                          onClick={() => handleSelect(item.href)}
                          onMouseEnter={() => setActiveIndex(idx)}
                          className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition-all ${
                            isSelected
                              ? 'bg-accent-500/10 border border-accent-500/30'
                              : 'hover:bg-black/5 dark:hover:bg-white/5 border border-transparent'
                          }`}
                        >
                          <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-black/5 dark:bg-white/5 text-accent-600 dark:text-accent-300">
                            <FileText size={15} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-semibold text-slate-900 dark:text-white">
                                {item.title}
                              </span>
                              <span className="rounded-full bg-black/5 dark:bg-white/10 px-1.5 py-0.5 text-xs font-semibold text-slate-600 dark:text-zinc-400 font-mono">
                                {item.category}
                              </span>
                            </div>
                            <p className="mt-0.5 truncate text-xs text-slate-500 dark:text-zinc-400">
                              {item.description}
                            </p>
                          </div>
                          {isSelected && (
                            <CornerDownLeft size={14} className="shrink-0 text-accent-500 mt-1" />
                          )}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="py-10 text-center text-slate-500 dark:text-zinc-400">
                  <p className="text-sm font-medium">No documentation found for "{query}"</p>
                  <p className="mt-1 text-xs text-slate-500 dark:text-zinc-400">
                    Try searching for "clamshell", "permissions", "diagnostics", or "faq".
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-between border-t border-black/[0.06] dark:border-white/[0.08] px-4 py-2.5 text-xs text-slate-500 dark:text-zinc-400 bg-slate-50 dark:bg-black/40 font-mono">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Close</span>
              </div>
              <span className="text-accent-600 dark:text-accent-400 font-semibold">lidZen Docs</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
