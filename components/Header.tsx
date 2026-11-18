import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import AppleLogo from './AppleLogo';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { useLanguage } from '../context/LanguageContext';
import { useCurrency } from '../context/CurrencyContext';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLanguage();
  const { buttonLabel } = useCurrency();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/#features', label: t.nav.features },
    { href: '/#diagnostics', label: t.nav.diagnostics },
    { href: '/#clamshell', label: t.nav.clamshell },
    { href: '/#pricing', label: 'Pricing' },
    { href: '/docs', label: t.nav.docs },
    { href: '/#download', label: t.nav.download },
  ];

  return (
    <header
      suppressHydrationWarning
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-[#06080A]/85 backdrop-blur-2xl shadow-sm py-3'
          : 'border-b border-transparent bg-transparent py-4 md:py-5'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        {/* Left Side: Brand & Nav grouped with clear spacing (Shoji layout) */}
        <div className="flex items-center gap-7 lg:gap-10 shrink-0">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="relative h-7 w-7 rounded-lg overflow-hidden group-hover:scale-105 transition-transform shadow-sm">
              <Image
                src="/logo.png"
                alt="lidZen"
                width={28}
                height={28}
                className="h-full w-full object-cover rounded-lg"
                priority
              />
            </div>
            <span className="text-base font-semibold tracking-tight text-slate-900 dark:text-white transition-colors">
              lidZen
            </span>
          </Link>

          {/* Desktop Nav - Shoji style: merged, unboxed, clean typography with quiet spacing */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-slate-600 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right CTA, Language Selector & Theme Toggle */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <LanguageSelector />
          <ThemeToggle />
          <Link
            href="/#pricing"
            className="group relative inline-flex items-center gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 px-4 py-2 text-xs font-semibold shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap"
          >
            <AppleLogo size={14} className="fill-current -mt-0.5" />
            <span>{buttonLabel}</span>
          </Link>
        </div>

        {/* Mobile / Tablet menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSelector />
          <ThemeToggle />
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-slate-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="border-b border-black/[0.08] dark:border-white/[0.08] bg-white/95 dark:bg-[#0c0e14]/95 px-4 py-5 backdrop-blur-2xl lg:hidden">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/#pricing"
              onClick={() => setMobileOpen(false)}
              className="mt-3 inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-100 px-4 py-2.5 text-xs font-semibold shadow-md transition-all"
            >
              <AppleLogo size={14} className="fill-current -mt-0.5" />
              <span>{buttonLabel}</span>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
