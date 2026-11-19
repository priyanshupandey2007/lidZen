import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Menu, X, ArrowLeft, BookOpen, ExternalLink, Bookmark } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Breadcrumbs from './Breadcrumbs';
import PrevNextNav from './PrevNextNav';
import SearchModal from './SearchModal';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';

export interface TocItem {
  id: string;
  title: string;
  level?: 2 | 3;
}

interface DocLayoutProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  category?: string;
  toc?: TocItem[];
}

export default function DocLayout({
  children,
  title,
  description,
  category = 'Documentation',
  toc = [],
}: DocLayoutProps) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <>
      <Head>
        <title>{`${title} — lidZen Documentation`}</title>
        <meta
          name="description"
          content={description || `${title} - lidZen documentation and user guide.`}
        />
        <link rel="icon" href="/logo.png" />
      </Head>

      <Header />

      <div className="min-h-screen bg-slate-50 dark:bg-[#070709] text-slate-900 dark:text-zinc-100 pt-16 transition-colors">
        {/* Sub-header / Top Bar on mobile & desktop */}
        <div className="sticky top-14 z-30 border-b border-black/[0.06] dark:border-white/[0.08] bg-white/80 dark:bg-[#0c0c12]/85 px-4 py-2.5 backdrop-blur-xl md:px-6">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="flex items-center gap-1.5 rounded-lg border border-black/10 dark:border-white/10 px-2.5 py-1 text-xs font-medium text-slate-700 dark:text-zinc-300 lg:hidden hover:bg-black/5 dark:hover:bg-white/5"
              >
                <Menu size={15} />
                <span>Docs Menu</span>
              </button>
              <Breadcrumbs title={title} category={category} />
            </div>

            <div className="flex items-center gap-2">
              <SearchModal />
              <LanguageSelector />
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Main layout container */}
        <div className="mx-auto flex max-w-7xl">
          {/* Left Sidebar */}
          <Sidebar
            mobileOpen={mobileSidebarOpen}
            onCloseMobile={() => setMobileSidebarOpen(false)}
          />

          {/* Center Main Article */}
          <main className="min-w-0 flex-1 px-4 py-10 sm:px-8 lg:px-12 max-w-4xl">
            {/* Page header */}
            <header className="mb-10 pb-6 border-b border-black/[0.06] dark:border-white/[0.08]">
              <span className="text-xs font-semibold uppercase tracking-wider text-accent-600 dark:text-accent-400 font-mono">
                {category}
              </span>
              <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                {title}
              </h1>
              {description && (
                <p className="mt-3 text-base sm:text-lg text-slate-600 dark:text-zinc-400 leading-relaxed">
                  {description}
                </p>
              )}
            </header>

            {/* Document Content */}
            <article className="space-y-8 text-sm sm:text-base leading-relaxed text-slate-700 dark:text-zinc-300">
              {children}
            </article>

            {/* Prev/Next Navigation */}
            <PrevNextNav />
          </main>

          {/* Right Table of Contents (Desktop only) */}
          {toc.length > 0 && (
            <aside className="hidden xl:block w-64 shrink-0 py-10 pr-6 sticky top-28 h-[calc(100dvh-7rem)] min-h-0 overflow-y-auto transition-dimensions">
              <div className="border-l border-black/[0.06] dark:border-white/[0.08] pl-4">
                <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-mono">
                  <Bookmark size={13} className="text-accent-500" />
                  On this page
                </span>
                <ul className="mt-3 space-y-2 text-xs">
                  {toc.map((item) => (
                    <li key={item.id} className={item.level === 3 ? 'pl-3' : ''}>
                      <a
                        href={`#${item.id}`}
                        className="text-slate-500 dark:text-zinc-400 hover:text-accent-600 dark:hover:text-accent-300 transition-colors block py-0.5"
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-6 border-t border-black/[0.06] dark:border-white/[0.06] text-xs text-slate-500 dark:text-zinc-500 space-y-2">
                  <a
                    href="https://github.com/priyanshupandey2007/lidZen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition"
                  >
                    <span>Edit this page on GitHub</span>
                    <ExternalLink size={11} />
                  </a>
                </div>
              </div>
            </aside>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}
