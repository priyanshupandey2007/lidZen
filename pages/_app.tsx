import '../styles/globals.css';
import { useEffect } from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { getStoredTheme, applyThemeClass } from '../components/ThemeToggle';
import { LanguageProvider } from '../context/LanguageContext';
import { CurrencyProvider } from '../context/CurrencyContext';
import ContactModal, { openContactModal } from '../components/ContactModal';
import CompareStoryAnimation from '../components/CompareStoryAnimation';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
});

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

    // Intercept mailto: links so users on systems without a configured desktop mail client
    // are presented with a clean instant choice (Gmail web, Outlook web, or default mail client)
    const handleMailtoClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="mailto:"]') as HTMLAnchorElement | null;
      if (target) {
        e.preventDefault();
        const href = target.getAttribute('href') || '';
        const queryPart = href.split('?')[1] || '';
        const urlParams = new URLSearchParams(queryPart);
        const subject = urlParams.get('subject') || 'lidZen Support & Inquiry';
        openContactModal(subject);
      }
    };
    window.addEventListener('click', handleMailtoClick, true);

    applyThemeClass(getStoredTheme());

    return () => {
      window.removeEventListener('error', handleExtensionError, true);
      window.removeEventListener('unhandledrejection', handleRejection, true);
      window.removeEventListener('click', handleMailtoClick, true);
    };
  }, []);

  return (
    <LanguageProvider>
      <CurrencyProvider>
        <Head>
          <title>lidZen — Keep Your Mac Awake with the Lid Closed</title>
          <meta
            name="description"
            content="Keep your Mac awake with the lid closed. lidZen bypasses macOS sleep limits so AI agents, audio, and renders run overnight with zero battery drain."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        </Head>
        <div className={`${inter.variable} ${jetbrainsMono.variable} relative`}>
          <CompareStoryAnimation />
          <div className="relative z-10">
            <Component {...pageProps} />
          </div>
          <ContactModal />
        </div>
      </CurrencyProvider>
    </LanguageProvider>
  );
}
