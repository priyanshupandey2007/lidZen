import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="light scroll-smooth" suppressHydrationWarning>
      <Head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){
              // Intercept third-party extension crashes (e.g. Floto / Design QA M_ID error) before Next.js dev overlay captures them
              function swallowExtensionError(e) {
                try {
                  var msg = String((e && (e.message || (e.reason && e.reason.message))) || '');
                  var stack = String((e && (e.filename || (e.error && e.error.stack) || (e.reason && e.reason.stack))) || '');
                  if (msg.indexOf('M_ID') !== -1 || stack.indexOf('chrome-extension://') !== -1 || msg.indexOf('eppiocemhmnlbhjplcgkofciiegomcon') !== -1) {
                    if (e.stopImmediatePropagation) e.stopImmediatePropagation();
                    if (e.preventDefault) e.preventDefault();
                    return true;
                  }
                } catch(err) {}
              }
              window.addEventListener('error', swallowExtensionError, true);
              window.addEventListener('unhandledrejection', swallowExtensionError, true);

              try {
                var stored = localStorage.getItem('theme');
                if (stored === 'dark') {
                  document.documentElement.classList.add('dark');
                  document.documentElement.classList.remove('light');
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.classList.add('light');
                }
              } catch(e) {}
            })()`,
          }}
        />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="min-h-screen bg-slate-50 text-slate-900 dark:bg-surface dark:text-zinc-100 antialiased selection:bg-accent-400/30 selection:text-white" suppressHydrationWarning>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
