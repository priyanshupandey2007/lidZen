import '../styles/globals.css';
import { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { getStoredTheme, applyThemeClass } from '../components/ThemeToggle';
import { LanguageProvider } from '../context/LanguageContext';
import { CurrencyProvider } from '../context/CurrencyContext';

// Helper to safely calculate and set stable viewport units without layout thrashing
function updateViewportUnits() {
  if (typeof window === 'undefined') return;

  const vh = window.innerHeight * 0.01;
  const vw = window.innerWidth * 0.01;
  const root = document.documentElement;

  root.style.setProperty('--vh', `${vh}px`);
  root.style.setProperty('--vw', `${vw}px`);

  // Detect and set dvh fallback
  if (window.visualViewport) {
    const dvh = window.visualViewport.height * 0.01;
    root.style.setProperty('--dvh', `${dvh}px`);
  } else {
    root.style.setProperty('--dvh', `${vh}px`);
  }
}

export default function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Intercept and swallow third-party Chrome extension errors (such as Floto / Design QA M_ID crash)
    const handleExtensionError = (event: ErrorEvent) => {
      const msg = String(event?.message || '');
      const file = String(event?.filename || '');
      const stack = String(event?.error?.stack || '');
      if (
        file.includes('chrome-extension://') ||
        stack.includes('chrome-extension://') ||
        msg.includes('M_ID') ||
        msg.includes('Cannot read properties of undefined (reading \'M_ID\')')
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
        return true;
      }
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event?.reason;
      const stack = String(reason?.stack || '');
      const msg = String(reason?.message || '');
      if (
        stack.includes('chrome-extension://') ||
        msg.includes('M_ID')
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    window.addEventListener('error', handleExtensionError, true);
    window.addEventListener('unhandledrejection', handleRejection, true);

    // Initial calculation
    updateViewportUnits();
    applyThemeClass(getStoredTheme());

    let rafId: number | null = null;
    let resizeTimer: NodeJS.Timeout | null = null;
    let lastWidth = window.innerWidth;
    let lastHeight = window.innerHeight;

    const handleResize = () => {
      // Mark root as actively resizing to prevent transition jitter
      document.documentElement.classList.add('is-resizing');

      if (resizeTimer) clearTimeout(resizeTimer);

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const curWidth = window.innerWidth;
        const curHeight = window.innerHeight;

        // Ignore micro sub-pixel/jittery height changes (< 4px) caused by browser chrome/clamshell ticks
        if (Math.abs(curWidth - lastWidth) > 1 || Math.abs(curHeight - lastHeight) > 4) {
          updateViewportUnits();
          lastWidth = curWidth;
          lastHeight = curHeight;
        }
      });

      // Remove resizing class after layout has stabilized
      resizeTimer = setTimeout(() => {
        document.documentElement.classList.remove('is-resizing');
      }, 150);
    };

    const handleVisibilityChange = () => {
      // When display wakes up or lid opens (visibilitychange), stabilize layout after frame
      if (document.visibilityState === 'visible') {
        requestAnimationFrame(() => {
          updateViewportUnits();
        });
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange, { passive: true });

    return () => {
      window.removeEventListener('error', handleExtensionError, true);
      window.removeEventListener('unhandledrejection', handleRejection, true);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeTimer) clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.documentElement.classList.remove('is-resizing');
    };
  }, []);

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Head>
          <title>lidZen — Keep your Mac alive with the lid closed</title>
          <meta
            name="description"
            content="lidZen bypasses macOS clamshell limits so AI agents, automated workflows, and music keep running with the lid closed. Deep path diagnostics pinpoint what's making your Mac hot, loud, and drained."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </Head>
        <Component {...pageProps} />
      </CurrencyProvider>
    </LanguageProvider>
  );
}
