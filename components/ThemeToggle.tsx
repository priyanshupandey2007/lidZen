import { useEffect, useState, useCallback } from 'react';
import { Sun, Moon } from 'lucide-react';

export function getStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function applyThemeClass(t: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (t === 'dark') {
    root.classList.add('dark');
    root.classList.remove('light');
  } else {
    root.classList.remove('dark');
    root.classList.add('light');
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  const syncTheme = useCallback(() => {
    const current = getStoredTheme();
    setTheme(current);
    applyThemeClass(current);
  }, []);

  useEffect(() => {
    setMounted(true);
    syncTheme();

    const handleThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent<'light' | 'dark'>;
      if (customEvent.detail) {
        setTheme(customEvent.detail);
        applyThemeClass(customEvent.detail);
      } else {
        syncTheme();
      }
    };

    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'theme' && (e.newValue === 'light' || e.newValue === 'dark')) {
        setTheme(e.newValue);
        applyThemeClass(e.newValue);
      }
    };

    window.addEventListener('lidzen-theme-change', handleThemeChange);
    window.addEventListener('storage', handleStorage);

    return () => {
      window.removeEventListener('lidzen-theme-change', handleThemeChange);
      window.removeEventListener('storage', handleStorage);
    };
  }, [syncTheme]);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    applyThemeClass(next);
    try {
      localStorage.setItem('theme', next);
    } catch {}

    // Notify all other ThemeToggle instances on the page (desktop & mobile)
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('lidzen-theme-change', { detail: next }));
    }
  };

  if (!mounted) {
    return <div className="h-8 w-8" />;
  }

  return (
    <button
      onClick={toggle}
      type="button"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      className="btn-icon h-8 w-8 text-slate-600 dark:text-zinc-400"
    >
      {theme === 'dark' ? (
        <Sun size={17} className="text-amber-400 transition-transform duration-200 hover:rotate-45" />
      ) : (
        <Moon size={17} className="text-indigo-600 transition-transform duration-200 hover:-rotate-12" />
      )}
    </button>
  );
}
