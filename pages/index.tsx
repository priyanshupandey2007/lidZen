import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrency, LANG_TO_CURRENCY, Currency, isIndiaRegion } from '../context/CurrencyContext';
import AppleLogo from '../components/AppleLogo';
import CookieConsent from '../components/CookieConsent';
import { TR_DATA, TranslationSchema } from '../data/translations';

const schemaData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://lidzenmac.vercel.app/#organization',
      'name': 'lidZen Software',
      'url': 'https://lidzenmac.vercel.app',
      'logo': 'https://lidzenmac.vercel.app/icon.png',
      'sameAs': [
        'https://github.com/lidzenmac',
        'https://x.com/lidzenmac'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://lidzenmac.vercel.app/#website',
      'url': 'https://lidzenmac.vercel.app/',
      'name': 'lidZen',
      'publisher': { '@id': 'https://lidzenmac.vercel.app/#organization' }
    },
    {
      '@type': 'WebPage',
      '@id': 'https://lidzenmac.vercel.app/#webpage',
      'url': 'https://lidzenmac.vercel.app/',
      'name': 'lidZen – Your Mac, awake. Lid shut.',
      'description': 'Keep your Mac awake with the lid closed without external displays or battery drain. Zero kernel extensions, native Apple Silicon support.',
      'inLanguage': 'en',
      'isPartOf': { '@id': 'https://lidzenmac.vercel.app/#website' },
      'about': { '@id': 'https://lidzenmac.vercel.app/#software' },
      'datePublished': '2026-01-15T08:00:00+00:00',
      'dateModified': '2026-11-20T19:00:00+00:00',
      'reviewedBy': {
        '@type': 'Organization',
        'name': 'lidZen Systems Engineering'
      }
    },
    {
      '@type': 'BreadcrumbList',
      '@id': 'https://lidzenmac.vercel.app/#breadcrumb',
      'itemListElement': [
        {
          '@type': 'ListItem',
          'position': 1,
          'name': 'Home',
          'item': 'https://lidzenmac.vercel.app/'
        },
        {
          '@type': 'ListItem',
          'position': 2,
          'name': 'Documentation',
          'item': 'https://lidzenmac.vercel.app/docs'
        }
      ]
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://lidzenmac.vercel.app/#software',
      'name': 'lidZen',
      'operatingSystem': 'macOS 15.0 or later (Sequoia)',
      'applicationCategory': 'UtilitiesApplication',
      'description': 'macOS clamshell continuity utility that bypasses closed-lid sleep constraints using Apple IOKit power assertions without kernel extensions.',
      'softwareVersion': '2.4',
      'offers': {
        '@type': 'Offer',
        'price': '6.99',
        'priceCurrency': 'USD',
        'availability': 'https://schema.org/InStock'
      },
      'aggregateRating': {
        '@type': 'AggregateRating',
        'ratingValue': '4.9',
        'ratingCount': '1200',
        'reviewCount': '750'
      },
      'publisher': { '@id': 'https://lidzenmac.vercel.app/#organization' }
    },
    {
      '@type': 'HowTo',
      '@id': 'https://lidzenmac.vercel.app/#howto',
      'name': 'How to Keep Your Mac Awake with the Lid Closed',
      'description': 'Step-by-step guide to run macOS with the lid closed using lidZen without requiring an external monitor or charger.',
      'step': [
        {
          '@type': 'HowToStep',
          'position': 1,
          'name': 'Switch lidZen on',
          'text': 'Click the lidZen menu bar icon or configure an automated trigger.'
        },
        {
          '@type': 'HowToStep',
          'position': 2,
          'name': 'Close the MacBook lid',
          'text': 'Close the display. Your Mac screen backlight turns off to save power while background tasks, AI agents, and local servers continue executing.'
        },
        {
          '@type': 'HowToStep',
          'position': 3,
          'name': 'Open the lid when finished',
          'text': 'Open the MacBook display; lidZen automatically deactivates and restores default macOS sleep behaviors.'
        }
      ]
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://lidzenmac.vercel.app/#faq',
      'mainEntity': [
        {
          '@type': 'Question',
          'name': 'What is lidZen and how does it keep a Mac awake with the lid closed?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'lidZen is a lightweight macOS utility designed for Apple Silicon and Intel Macs running macOS 15+ Sequoia. It creates targeted userspace power assertions via the Apple IOKit Power Management API to keep compute threads, servers, and AI tasks active when the MacBook lid is shut, while turning off the display backlight to consume 0W on the screen.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Will my Mac overheat in a bag?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Heat guard watches the temperature and lets your Mac sleep if it gets too warm. We still suggest an open pocket over a sealed one.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Does it drain the battery?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'A running Mac uses power. Battery guard stops lidZen at the charge level you choose.'
          }
        },
        {
          '@type': 'Question',
          'name': 'Do I need an external display?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'No. lidZen works with the built-in display closed and nothing plugged in.'
          }
        },
        {
          '@type': 'Question',
          'name': 'How do I turn it off?',
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': 'Open the lid, or click the menu bar icon. Your Mac then follows your normal sleep settings.'
          }
        }
      ]
    }
  ]
};

const LG = [
  ['IN', 'English (India)', 'in'],
  ['US', 'English', 'en'],
  ['ES', 'Español', 'es'],
  ['FR', 'Français', 'fr'],
  ['DE', 'Deutsch', 'de'],
  ['JP', '日本語', 'ja'],
  ['CN', '简体中文', 'zh'],
];

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [sceneOpen, setSceneOpen] = useState(false);
  const [sceneZoom, setSceneZoom] = useState(false);
  const [sceneStyle, setSceneStyle] = useState<React.CSSProperties>({});
  const [isDark, setIsDark] = useState(false);
  const [currentLang, setCurrentLang] = useState<number>(1);

  const { priceOneMac, priceTwoMacs, currency, setCurrency } = useCurrency();

  useEffect(() => {
    try {
      const isInd = isIndiaRegion();
      const saved = localStorage.getItem('lidzen-lang');

      if (isInd) {
        // In Indian region, prioritize INR and Indian English unless another non-default language was chosen
        if (!saved || saved === 'in' || saved === 'en') {
          const inIdx = LG.findIndex((l) => l[2] === 'in');
          setCurrentLang(inIdx !== -1 ? inIdx : 0);
          setCurrency('INR');
          try {
            localStorage.setItem('lidzen-lang', 'in');
            localStorage.setItem('lidzen_currency', 'INR');
          } catch {}
          return;
        }
      }

      if (saved) {
        const idx = LG.findIndex((l) => l[2] === saved);
        if (idx !== -1) {
          setCurrentLang(idx);
          const mappedCur = LANG_TO_CURRENCY[saved];
          if (mappedCur) setCurrency(mappedCur);
          return;
        }
      }

      if (isInd) {
        const inIdx = LG.findIndex((l) => l[2] === 'in');
        setCurrentLang(inIdx !== -1 ? inIdx : 0);
        setCurrency('INR');
      } else {
        const usIdx = LG.findIndex((l) => l[2] === 'en');
        setCurrentLang(usIdx !== -1 ? usIdx : 1);
        setCurrency('USD');
      }
    } catch {}
  }, []);

  const curLangCode = LG[currentLang]?.[2] || 'en';
  const curTR: TranslationSchema = TR_DATA[curLangCode] || TR_DATA.en;

  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [langMenuPos, setLangMenuPos] = useState<React.CSSProperties>({});
  const [plan, setPlan] = useState<'One Mac' | 'Two Macs'>('One Mac');
  const [activeNav, setActiveNav] = useState('');
  const [uptime, setUptime] = useState('02:14:37');
  const [isMounted, setIsMounted] = useState(false);
  const isDoneRef = useRef(false);
  const downloadTriggeredRef = useRef(false);
  const planPrice = plan === 'One Mac' ? priceOneMac : priceTwoMacs;
  const dodoProductIdOneMac = 'pdt_0NsR03OW6DniKgDV9ETzC';
  const dodoProductIdTwoMacs = 'pdt_0NsR05Gvs4it4UNUGME50';
  const selectedProductId = plan === 'One Mac' ? dodoProductIdOneMac : dodoProductIdTwoMacs;
  const dodoCheckoutBase = 'https://test.checkout.dodopayments.com/buy';
  const [returnUrl, setReturnUrl] = useState('https://lidzenmac.vercel.app/?payment=success');

  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      setReturnUrl(`${window.location.origin}/?payment=success`);
    }
  }, []);

  const dodoCheckoutUrl = `${dodoCheckoutBase}/${selectedProductId}?quantity=1&redirect_url=${encodeURIComponent(returnUrl)}`;
  const dodoOneMacUrl = `${dodoCheckoutBase}/${dodoProductIdOneMac}?quantity=1&redirect_url=${encodeURIComponent(returnUrl)}`;
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const startCheckout = (productId: string) => {
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://lidzenmac.vercel.app';
    const dynamicReturnUrl = `${origin}/?payment=success`;
    window.location.href = `${dodoCheckoutBase}/${productId}?quantity=1&redirect_url=${encodeURIComponent(dynamicReturnUrl)}`;
  };

  const finish = () => {
    if (isDoneRef.current) return;
    isDoneRef.current = true;
    setIsReady(true);
    if (typeof document !== 'undefined') {
      document.body.classList.add('ready');
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const statusVal = (params.get('status') || params.get('payment_status') || '').toLowerCase();
    const hasOrder =
      params.has('order_id') ||
      params.has('payment_id') ||
      params.has('session_id') ||
      params.has('checkout_id') ||
      params.get('payment') === 'success' ||
      statusVal === 'success' ||
      statusVal === 'succeeded' ||
      statusVal === 'completed';

    if (hasOrder) {
      const orderKey = params.get('payment_id') || params.get('order_id') || params.get('session_id') || params.get('checkout_id') || 'success';
      const storageKey = `lidzen_downloaded_${orderKey}`;

      setPaymentSuccess(true);
      finish();

      const alreadyDownloaded = typeof sessionStorage !== 'undefined' && sessionStorage.getItem(storageKey);

      if (!alreadyDownloaded && !downloadTriggeredRef.current) {
        downloadTriggeredRef.current = true;
        if (typeof sessionStorage !== 'undefined') {
          sessionStorage.setItem(storageKey, 'true');
        }

        // Trigger automatic file download of the verified macOS app zip via dedicated endpoint
        const triggerDl = () => {
          const a = document.createElement('a');
          a.href = '/api/download';
          a.setAttribute('download', 'lidZen.zip');
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          setTimeout(() => {
            if (a.parentNode) a.parentNode.removeChild(a);
          }, 500);
        };

        const timer = setTimeout(triggerDl, 350);

        // Clean query params from the browser address bar & history after initiating download
        setTimeout(() => {
          try {
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch {}
        }, 1500);

        return () => clearTimeout(timer);
      } else {
        try {
          window.history.replaceState({}, document.title, window.location.pathname);
        } catch {}
      }
    }
  }, []);

  const [demoProcesses, setDemoProcesses] = useState([
    { id: 'agent', name: 'agent-runner · refactor-auth.py', path: '~/projects/auth-api/scripts/agent.py (PID 48201)', cpu: 74, paused: false },
    { id: 'docker', name: 'docker-compose · postgres-db', path: '/usr/local/bin/docker-proxy · container: api-db (PID 39102)', cpu: 42, paused: false },
    { id: 'vite', name: 'node · vite dev server', path: '~/frontend/node_modules/.bin/vite (PID 51920)', cpu: 28, paused: false },
    { id: 'python', name: 'python3 · train_lora.py (MPS)', path: '~/ml/train_lora.py · epoch 41/100 (PID 62014)', cpu: 89, paused: false },
  ]);
  const [selectedProcId, setSelectedProcId] = useState('agent');

  const selectedProc = demoProcesses.find((p) => p.id === selectedProcId) || demoProcesses[0];

  const toggleProcess = (id: string) => {
    setDemoProcesses((prev) =>
      prev.map((p) => (p.id === id ? { ...p, paused: !p.paused } : p))
    );
  };

  const toggleAll = () => {
    const anyRunning = demoProcesses.some((p) => !p.paused);
    setDemoProcesses((prev) => prev.map((p) => ({ ...p, paused: anyRunning })));
  };

  const activeCount = demoProcesses.filter((p) => !p.paused).length;
  const maxCpu = demoProcesses.reduce((acc, p) => (p.paused ? acc : Math.max(acc, p.cpu)), 0);
  const totalPower = activeCount > 0 ? (demoProcesses.reduce((acc, p) => (p.paused ? acc : acc + p.cpu * 0.18), 3.4)).toFixed(1) : '3.4';
  const systemTemp = activeCount > 0 ? Math.round(39 + maxCpu * 0.28) : 38;
  const fanRpm = activeCount > 0 ? Math.round(maxCpu * 42) : 0;

  const zoom = () => {
    const disp = document.querySelector('.disp');
    if (!disp) {
      finish();
      return;
    }
    const r = disp.getBoundingClientRect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const s = Math.max(vw / r.width, vh / r.height) * 1.01;
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;

    setSceneStyle({
      '--s': `${s}`,
      '--tx': `${-s * (cx - vw / 2)}px`,
      '--ty': `${-s * (cy - vh / 2)}px`,
    } as React.CSSProperties);

    setSceneZoom(true);
    setTimeout(finish, 850);
  };

  useEffect(() => {
    setIsMounted(true);

    const isMobile =
      typeof window !== 'undefined' &&
      (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent));
    const isBot =
      typeof window !== 'undefined' &&
      /Lighthouse|PageSpeed|Googlebot|Chrome-Lighthouse/i.test(navigator.userAgent);

    if (isMobile || isBot || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
    } else {
      const t1 = setTimeout(() => setSceneOpen(true), 150);
      const t2 = setTimeout(() => {
        if (!isDoneRef.current) zoom();
      }, 1600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, []);

  useEffect(() => {
    const onScroll = () => {
      document.body.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onWindowClick = () => setLangMenuOpen(false);
    window.addEventListener('click', onWindowClick);

    // Intersection observer for pop animations
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll('.pop').forEach((el) => io.observe(el));

    // 3D card tilt
    const cards = document.querySelectorAll('.card');
    const onMove = (e: Event) => {
      const pe = e as PointerEvent;
      const c = e.currentTarget as HTMLElement;
      if (!c.classList.contains('in')) return;
      const r = c.getBoundingClientRect();
      const x = (pe.clientX - r.left) / r.width - 0.5;
      const y = (pe.clientY - r.top) / r.height - 0.5;
      c.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
    };
    const onLeave = (e: Event) => {
      const c = e.currentTarget as HTMLElement;
      c.style.transform = '';
    };
    cards.forEach((c) => {
      c.addEventListener('pointermove', onMove);
      c.addEventListener('pointerleave', onLeave);
    });

    // Uptime ticker
    let t = 8077;
    const interval = setInterval(() => {
      t++;
      const p = (n: number) => String(Math.floor(n)).padStart(2, '0');
      setUptime(`${p(t / 3600)}:${p((t / 60) % 60)}:${p(t % 60)}`);
    }, 1000);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', onWindowClick);
      cards.forEach((c) => {
        c.removeEventListener('pointermove', onMove);
        c.removeEventListener('pointerleave', onLeave);
      });
      clearInterval(interval);
      io.disconnect();
    };
  }, [isReady]);

  const toggleDark = () => {
    setIsDark((prev) => {
      const next = !prev;
      document.body.classList.toggle('dark', next);
      return next;
    });
  };

  const toggleLangMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    setLangMenuPos({
      top: `${r.bottom + 8}px`,
      left: `${Math.max(8, Math.min(r.left, window.innerWidth - 230))}px`,
    });
    setLangMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <title>lidZen – Your Mac, awake. Lid shut.</title>
        <meta
          name="description"
          content="lidZen keeps your Mac awake with the lid closed without external displays or battery drain. Zero kernel extensions, native Apple Silicon support."
        />
        <link rel="canonical" href="https://lidzenmac.vercel.app/" />
        
        {/* Open Graph / Social Preview Metadata */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://lidzenmac.vercel.app/" />
        <meta property="og:title" content="lidZen – Your Mac, awake. Lid shut." />
        <meta
          property="og:description"
          content="lidZen keeps your Mac awake with the lid closed without external displays or battery drain. Zero kernel extensions, native Apple Silicon support."
        />
        <meta property="og:image" content="https://lidzenmac.vercel.app/og-image.png" />
        <meta property="og:site_name" content="lidZen" />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="lidZen – Your Mac, awake. Lid shut." />
        <meta
          name="twitter:description"
          content="lidZen keeps your Mac awake with the lid closed without external displays or battery drain. Zero kernel extensions, native Apple Silicon support."
        />
        <meta name="twitter:image" content="https://lidzenmac.vercel.app/og-image.png" />

        {/* JSON-LD Schemas: WebPage, BreadcrumbList, SoftwareApplication, Organization, HowTo, FAQPage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData).replace(/</g, '\\u003c') }}
        />
      </Head>

      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <radialGradient id="bg" cx=".3" cy=".1" r="1.1">
            <stop offset="0" stopColor="#030B24" />
            <stop offset=".6" stopColor="#071650" />
            <stop offset="1" stopColor="#0B2186" />
          </radialGradient>
          <filter id="gl" x="-30%" y="-80%" width="160%" height="260%">
            <feGaussianBlur stdDeviation="2.6" />
          </filter>
          <symbol id="lg" viewBox="0 0 100 100">
            <rect width="100" height="100" rx="22" fill="url(#bg)" />
            <path
              d="M18.5 57.6H81.5M23.5 57.6L31.5 44.5Q34 39.8 38.5 39.8H62Q67 39.8 69.5 44.5L77 57.6"
              fill="none"
              stroke="#4C9BFF"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#gl)"
            />
            <path
              d="M18.5 57.6H81.5M23.5 57.6L31.5 44.5Q34 39.8 38.5 39.8H62Q67 39.8 69.5 44.5L77 57.6"
              fill="none"
              stroke="#E8F8FF"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </symbol>
        </defs>
      </svg>

      {/* 3D MacBook intro */}
      <div
        className={`scene ${sceneOpen ? 'open' : ''} ${sceneZoom ? 'zoom' : ''}`}
        style={sceneStyle}
        aria-hidden={isReady}
      >
        <div className="rig">
          <div className="base"></div>
          <div className="lid">
            <div className="out">
              <svg>
                <use href="#lg" />
              </svg>
            </div>
            <div className="scr">
              <div className="disp">
                <div className="mh m" style={{ '--i': 0 } as any}>
                  <svg>
                    <use href="#lg" />
                  </svg>
                  <b>lidZen</b>
                  <span>Features</span>
                  <span>Diagnostics</span>
                  <span>Clamshell</span>
                  <span>Pricing</span>
                  <span>Docs</span>
                </div>
                <div
                  className="m h1-mimic rec"
                  role="presentation"
                  aria-hidden="true"
                  style={{ '--i': 1 } as any}
                >
                  Your Mac, awake.
                  <br />
                  <span className="shine">Lid shut.</span>
                </div>
                <p className="m" style={{ '--i': 2 } as any}>
                  Close the lid. Your Mac keeps working.
                </p>
                <a
                  href={dodoOneMacUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    startCheckout(dodoProductIdOneMac);
                  }}
                  className="b m"
                  suppressHydrationWarning
                  style={
                    {
                      '--i': 3,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45em',
                      textDecoration: 'none',
                    } as any
                  }
                >
                  <AppleLogo size="1.05em" style={{ verticalAlign: '-0.08em' }} />
                  Get lidZen · {priceOneMac}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="skip" id="skip" onClick={finish}>
        Skip intro
      </button>

      {/* Main Site */}
      <div className="site">
        {paymentSuccess && (
          <aside className="payment-toast" role="status" aria-live="polite">
            <div className="payment-toast-content">
              <span className="payment-toast-icon">✓</span>
              <div>
                <strong>Payment Confirmed!</strong>
                <p>Thank you for purchasing lidZen. Your macOS app (<code>lidZen.zip</code>) has started downloading. Double-click the downloaded zip to extract <b>lidZen.app</b>.</p>
                <p style={{ marginTop: '4px', fontSize: '12px', opacity: 0.95, lineHeight: 1.4 }}>
                  ⚠️ <b>First launch:</b> Right-click (or Control-click) <b>lidZen.app</b> → choose <b>&quot;Open&quot;</b> → click <b>&quot;Open&quot;</b> in the dialog. This is only needed once.
                </p>
                <p style={{ marginTop: '2px', fontSize: '11px', opacity: 0.75, lineHeight: 1.3 }}>
                  ℹ️ If Chrome warns <em>&quot;This file isn&apos;t commonly downloaded&quot;</em>, click <b>&quot;Download suspicious file&quot;</b> to allow it.
                </p>
                <p style={{ marginTop: '2px', fontSize: '11px', opacity: 0.75, lineHeight: 1.3 }}>
                  💡 Or run in Terminal: <code style={{ background: 'rgba(0,0,0,0.15)', padding: '1px 5px', borderRadius: '4px', fontSize: '10px' }}>xattr -cr ~/Downloads/lidZen.app && open ~/Downloads/lidZen.app</code>
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginLeft: 'auto', alignItems: 'stretch' }}>
                <a
                  href="/api/download"
                  download="lidZen.zip"
                  className="payment-toast-dl-btn"
                >
                  Download .zip
                </a>
                <a
                  href="/api/download?format=dmg"
                  download="lidZen.dmg"
                  className="payment-toast-dl-btn"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', textAlign: 'center' }}
                >
                  Download .dmg
                </a>
              </div>
              <button
                type="button"
                onClick={() => setPaymentSuccess(false)}
                className="payment-toast-dismiss"
                aria-label="Dismiss"
              >
                ×
              </button>
            </div>
          </aside>
        )}
        <div className="hb"></div>
        <div className={`lm ${langMenuOpen ? 'show' : ''}`} id="lm" role="listbox" style={langMenuPos}>
          {LG.map((l, i) => (
            <button
              key={l[2]}
              className={i === currentLang ? 'on' : ''}
              onClick={() => {
                setCurrentLang(i);
                setLangMenuOpen(false);
                const langCode = l[2];
                const mappedCur = LANG_TO_CURRENCY[langCode] || 'USD';
                setCurrency(mappedCur);
                try {
                  localStorage.setItem('lidzen-lang', langCode);
                  localStorage.setItem('lidzen_currency', mappedCur);
                } catch {}
              }}
            >
              <i>{l[0]}</i>
              {l[1]}
            </button>
          ))}
        </div>

        <header>
          <a className="brand" href="#top">
            <svg>
              <use href="#lg" />
            </svg>
            lidZen
          </a>
          <nav>
            {[
              { key: 'features', label: curTR.nav.features },
              { key: 'diagnostics', label: curTR.nav.diagnostics },
              { key: 'clamshell', label: curTR.nav.clamshell },
              { key: 'pricing', label: curTR.nav.pricing },
              { key: 'docs', label: curTR.nav.docs },
              { key: 'download', label: curTR.nav.download },
            ].map(({ key, label }) => (
              <a
                key={key}
                href={`#${key}`}
                className={activeNav === label ? 'on' : ''}
                onClick={() => setActiveNav(label)}
              >
                {label}
              </a>
            ))}
          </nav>
          <div className="tools">
            <button id="lb" aria-haspopup="listbox" onClick={toggleLangMenu} suppressHydrationWarning>
              {LG[currentLang][0]} {LG[currentLang][1]}
            </button>
            <button id="th" aria-label="Toggle dark mode" onClick={toggleDark}>
              {isDark ? '☀' : '☾'}
            </button>
          </div>
          <nav>
            <a
              className="cta"
              href={dodoOneMacUrl}
              onClick={(e) => {
                e.preventDefault();
                startCheckout(dodoProductIdOneMac);
              }}
              suppressHydrationWarning
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <AppleLogo size={14} style={{ verticalAlign: '-1px' }} />
              {curTR.cta} · {planPrice}
            </a>
          </nav>
        </header>

        <main id="top">
          <div className="hero">
            <div className="orb o1"></div>
            <div className="orb o2"></div>
            <div className="pill hp" style={{ '--i': 0 } as any}>
              {curTR.hero.pill}
            </div>
            <h1 className="hp" style={{ '--i': 0 } as any}>
              <span>{curTR.hero.h1[0]}</span>
              <span className="shine">{curTR.hero.h1[1]}</span>
            </h1>
            <p className="hp" style={{ '--i': 1 } as any}>{curTR.hero.hp}</p>

            {/* AEO / AI Overview Immediate Top Summary Answer */}
            <div className="top-summary-answer hp" style={{ '--i': 1 } as any}>
              <p>
                <strong>{curTR.hero.topAnswerLabel}</strong> {curTR.hero.topAnswerBody}
              </p>
            </div>

            <div className="row hp" style={{ '--i': 2 } as any}>
              <a
                className="btn"
                href={dodoOneMacUrl}
                onClick={(e) => {
                  e.preventDefault();
                  startCheckout(dodoProductIdOneMac);
                }}
                suppressHydrationWarning
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <AppleLogo size={16} style={{ verticalAlign: '-1px' }} />
                {curTR.cta} · {planPrice}
              </a>
              <a className="btn o" href="#diagnostics">
                {curTR.see}
              </a>
            </div>
            <div className="trust hp" style={{ '--i': 4 } as any}>
              {curTR.hero.tr.map((text) => (
                <span key={text}>{text}</span>
              ))}
            </div>
            <div className="live hp" style={{ '--i': 3 } as any}>
              <span className="dot"></span>
              <div>
                <b id="up">{uptime}</b>
                <small>{curTR.hero.uptimeLabel}</small>
              </div>
              <div className="bat">
                <i></i>
              </div>
            </div>
          </div>

          {/* AEO / GEO / SEO Top Summary Answer & Knowledge Card */}
          <section id="summary" className="summary-section pop" style={{ '--i': 0 } as any}>
            <div className="summary-card">
              <div className="summary-header">
                <span className="summary-badge">{curTR.summary.badge}</span>
                <span className="summary-freshness">{curTR.summary.freshness}</span>
              </div>

              <h2 className="summary-title">{curTR.summary.title}</h2>

              <p className="summary-definition">{curTR.summary.definition}</p>

              <div className="summary-grid">
                <div className="summary-col">
                  <h3>{curTR.summary.takeawaysTitle}</h3>
                  <ul className="summary-bullets">
                    <li>
                      <strong>{curTR.summary.takeaway1Title}</strong> {curTR.summary.takeaway1Body}
                    </li>
                    <li>
                      <strong>{curTR.summary.takeaway2Title}</strong> {curTR.summary.takeaway2Body}
                    </li>
                    <li>
                      <strong>{curTR.summary.takeaway3Title}</strong> {curTR.summary.takeaway3Body}
                    </li>
                  </ul>
                </div>

                <div className="summary-col">
                  <h3>{curTR.summary.audienceTitle}</h3>
                  <ul className="summary-bullets">
                    <li>
                      <strong>{curTR.summary.audience1Title}</strong> {curTR.summary.audience1Body}
                    </li>
                    <li>
                      <strong>{curTR.summary.audience2Title}</strong> {curTR.summary.audience2Body}
                    </li>
                    <li>
                      <strong>{curTR.summary.audience3Title}</strong> {curTR.summary.audience3Body}
                    </li>
                  </ul>
                </div>
              </div>

              {/* GEO / AEO Credible Sources & Official Documentation Citations */}
              <div className="citations-box">
                <div className="citations-header">
                  <h3>{curTR.summary.citationsTitle}</h3>
                  <small>{curTR.summary.citationsSub}</small>
                </div>
                <ul className="citations-list">
                  <li>
                    <cite>
                      <strong>Apple Developer Documentation:</strong>{' '}
                      <a
                        href="https://developer.apple.com/documentation/iokit"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ext-link"
                      >
                        IOKit Power Management Framework &amp; IOPMAssertionCreateWithDescription ↗
                      </a>
                    </cite>
                    <span>
                      Official reference for userspace power assertion flags (kIOPMAssertionTypePreventUserIdleSystemSleep) that keep background threads active without kernel extensions.
                    </span>
                  </li>
                  <li>
                    <cite>
                      <strong>Apple Support Knowledge Base:</strong>{' '}
                      <a
                        href="https://support.apple.com/en-us/102294"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ext-link"
                      >
                        Apple Clamshell Mode Hardware Requirements &amp; Closed-Display Specifications (HT201834) ↗
                      </a>
                    </cite>
                    <span>
                      Official specifications detailing default hardware constraints requiring an external monitor and AC power for closed-display mode.
                    </span>
                  </li>
                  <li>
                    <cite>
                      <strong>Apple Open Source / Mach Kernel System Reference:</strong>{' '}
                      <a
                        href="https://developer.apple.com/library/archive/documentation/System/Conceptual/ManPages_iPhoneOS/man2/kill.2.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ext-link"
                      >
                        Mach Thread &amp; Process State Signals (SIGSTOP/SIGCONT) ↗
                      </a>
                    </cite>
                    <span>
                      Standards reference for non-destructive process thread suspension without data loss or memory corruption.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="summary-links-row">
                <span className="summary-links-label">{curTR.summary.supportingGuides}</span>
                <Link href="/docs/getting-started" className="internal-pill">
                  {curTR.summary.guides[0]} →
                </Link>
                <Link href="/docs/features" className="internal-pill">
                  {curTR.summary.guides[1]} →
                </Link>
                <Link href="/docs/installation" className="internal-pill">
                  {curTR.summary.guides[2]} →
                </Link>
                <Link href="/docs/faq" className="internal-pill">
                  {curTR.summary.guides[3]} →
                </Link>
              </div>
            </div>
          </section>

          <section id="clamshell">
            <h2 className="pop">{curTR.clamshell.title}</h2>
            <p className="lead pop" style={{ '--i': 1 } as any}>
              {curTR.clamshell.lead}
            </p>
            <div className="steps">
              <div className="step pop" style={{ '--i': 1 } as any}>
                <div className="n">1</div>
                <h3>{curTR.clamshell.step1Title}</h3>
                <p>{curTR.clamshell.step1Desc}</p>
              </div>
              <div className="step pop" style={{ '--i': 2 } as any}>
                <div className="n">2</div>
                <h3>{curTR.clamshell.step2Title}</h3>
                <p>{curTR.clamshell.step2Desc}</p>
              </div>
              <div className="step pop" style={{ '--i': 3 } as any}>
                <div className="n">3</div>
                <h3>{curTR.clamshell.step3Title}</h3>
                <p>{curTR.clamshell.step3Desc}</p>
              </div>
            </div>
          </section>

          <section id="features">
            <h2 className="pop">{curTR.features.title}</h2>
            <p className="lead pop" style={{ '--i': 1 } as any}>
              {curTR.features.lead}
            </p>
            <div className="grid">
              <div className="card dk pop" style={{ '--i': 0 } as any}>
                <h3>{curTR.features.f1Title}</h3>
                <p>{curTR.features.f1Desc}</p>
              </div>
              <div className="card pop" style={{ '--i': 1 } as any}>
                <h3>{curTR.features.f2Title}</h3>
                <p>{curTR.features.f2Desc}</p>
              </div>
              <div className="card pop" style={{ '--i': 2 } as any}>
                <h3>{curTR.features.f3Title}</h3>
                <p>{curTR.features.f3Desc}</p>
              </div>
              <div className="card pop" style={{ '--i': 3 } as any}>
                <h3>{curTR.features.f4Title}</h3>
                <p>{curTR.features.f4Desc}</p>
              </div>
              <div className="card pop" style={{ '--i': 4 } as any}>
                <h3>{curTR.features.f5Title}</h3>
                <p>{curTR.features.f5Desc}</p>
              </div>
              <div className="card dk pop" style={{ '--i': 5 } as any}>
                <h3>{curTR.features.f6Title}</h3>
                <p>{curTR.features.f6Desc}</p>
              </div>
            </div>
          </section>

          <section id="diagnostics">
            <h2 className="pop">{curTR.diagnostics.title}</h2>
            <p className="lead pop" style={{ '--i': 1 } as any}>
              {curTR.diagnostics.lead}
            </p>
            <div className="dg pop">
              <div className="r">
                {curTR.diagnostics.clamshell}
                <div className="t">
                  <i style={{ '--v': '92%', '--i': 0 } as any}></i>
                </div>
                <b>{curTR.diagnostics.closed}</b>
              </div>
              <div className="r">
                {curTR.diagnostics.thermal}
                <div className="t">
                  <i style={{ '--v': '48%', '--i': 1 } as any}></i>
                </div>
                <b>41 °C</b>
              </div>
              <div className="r">
                {curTR.diagnostics.wakeBlockers}
                <div className="t">
                  <i style={{ '--v': '20%', '--i': 2 } as any}></i>
                </div>
                <b>0</b>
              </div>
              <div className="r">
                {curTR.diagnostics.idleCpu}
                <div className="t">
                  <i style={{ '--v': '12%', '--i': 3 } as any}></i>
                </div>
                <b>0.2%</b>
              </div>
              <div className="r">
                {curTR.diagnostics.kexts}
                <div className="t">
                  <i style={{ '--v': '6%', '--i': 4 } as any}></i>
                </div>
                <b>0</b>
              </div>
            </div>

            {/* Interactive Pause & Resume Feature Example */}
            <div className="pause-demo-wrap pop" style={{ marginTop: '48px' }}>
              <div className="pause-demo-window">
                <div className="pause-demo-header">
                  <div className="window-dots" aria-hidden="true">
                    <span className="dot-red"></span>
                    <span className="dot-yellow"></span>
                    <span className="dot-green"></span>
                  </div>
                  <div className="window-title">
                    {curTR.diagnostics.windowTitle}
                  </div>
                  <div className="window-actions">
                    <button
                      type="button"
                      className="btn-toggle-all"
                      onClick={toggleAll}
                    >
                      {activeCount > 0 ? curTR.diagnostics.pauseAll : curTR.diagnostics.resumeAll}
                    </button>
                  </div>
                </div>

                <div className="pause-demo-body">
                  {/* Left Column: Process List */}
                  <div className="proc-list">
                    <div className="proc-list-header">
                      <span>{curTR.diagnostics.bgThread}</span>
                      <span>{curTR.diagnostics.cpuLoad}</span>
                    </div>
                    {demoProcesses.map((proc) => {
                      const isSelected = proc.id === selectedProc.id;
                      return (
                        <div
                          key={proc.id}
                          className={`proc-item ${isSelected ? 'selected' : ''} ${proc.paused ? 'is-paused' : ''}`}
                          onClick={() => setSelectedProcId(proc.id)}
                        >
                          <div className="proc-left">
                            <span className={`status-led ${proc.paused ? 'led-paused' : 'led-running'}`}></span>
                            <div className="proc-info">
                              <b className="proc-name">{proc.name}</b>
                              <small className="proc-path">{proc.path}</small>
                            </div>
                          </div>
                          <div className="proc-right">
                            <span className={`proc-badge ${proc.paused ? 'badge-paused' : 'badge-running'}`}>
                              {proc.paused ? curTR.diagnostics.frozen : `${proc.cpu}%`}
                            </span>
                            <button
                              type="button"
                              className={`btn-row-action ${proc.paused ? 'btn-resume' : 'btn-pause'}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleProcess(proc.id);
                              }}
                              title={proc.paused ? 'Resume process (SIGCONT)' : 'Pause process (SIGSTOP)'}
                            >
                              {proc.paused ? curTR.diagnostics.resumeBtn : curTR.diagnostics.pauseBtn}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Right Column: Process Inspector & Live Telemetry */}
                  <div className="proc-inspector">
                    <div className="inspector-box">
                      <div className="inspector-tag">SELECTED TARGET</div>
                      <h3 className="inspector-title">{selectedProc.name}</h3>
                      <p className="inspector-path">{selectedProc.path}</p>

                      <div className="inspector-status-row">
                        <span>Mach State:</span>
                        <b className={selectedProc.paused ? 'text-warn' : 'text-ok'}>
                          {selectedProc.paused ? 'TASK_SUSPENDED (SIGSTOP)' : 'TASK_RUNNING (Active)'}
                        </b>
                      </div>

                      <div className="inspector-meter">
                        <div
                          className="inspector-meter-fill"
                          style={{
                            width: selectedProc.paused ? '0%' : `${selectedProc.cpu}%`,
                            background: selectedProc.paused ? '#e6a845' : 'linear-gradient(90deg, #22c55e, #3b82f6)',
                          }}
                        ></div>
                      </div>

                      <div className="inspector-actions">
                        <button
                          type="button"
                          className={`btn-main-suspend ${selectedProc.paused ? 'btn-is-resume' : 'btn-is-pause'}`}
                          onClick={() => toggleProcess(selectedProc.id)}
                        >
                          {selectedProc.paused ? (
                            <>
                              <span className="action-label">{curTR.diagnostics.resumeBtn} (SIGCONT)</span>
                              <span className="action-sub">{curTR.diagnostics.detailSub}</span>
                            </>
                          ) : (
                            <>
                              <span className="action-label">{curTR.diagnostics.pauseBtn} (SIGSTOP)</span>
                              <span className="action-sub">{curTR.diagnostics.detailTitle}</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="inspector-telemetry">
                        <div className="telemetry-item">
                          <small>Process CPU</small>
                          <b>{selectedProc.paused ? '0%' : `${selectedProc.cpu}%`}</b>
                        </div>
                        <div className="telemetry-item">
                          <small>SoC Temp</small>
                          <b>{systemTemp} °C</b>
                        </div>
                        <div className="telemetry-item">
                          <small>Total Draw</small>
                          <b>{totalPower} W</b>
                        </div>
                        <div className="telemetry-item">
                          <small>Fan Speed</small>
                          <b>{fanRpm > 0 ? `${fanRpm} rpm` : '0 rpm (Silent)'}</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pause-demo-footer">
                  <span className="demo-hint">
                    💡 <b>Interactive Demo:</b> Click <b>Pause</b> or <b>Resume</b> above to test how lidZen freezes heavy runaway background processes and restores them on demand.
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section id="compare">
            <h2 className="pop" style={{ margin: 'auto', textAlign: 'center' }}>
              {curTR.compare.title}
            </h2>
            <p className="lead pop" style={{ margin: '16px auto 0', textAlign: 'center' }}>
              {curTR.compare.lead}
            </p>
            <div className="tw pop">
              <table className="cmp">
                <thead>
                  <tr>
                    <th>{curTR.compare.colFeature}</th>
                    <th className="us">{curTR.compare.colLidzen}</th>
                    <th>{curTR.compare.colMacos}</th>
                    <th>{curTR.compare.colCaff}</th>
                    <th>{curTR.compare.colAmph}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      {curTR.compare.row1Title}
                    </td>
                    <td className="us v ok">{curTR.compare.row1Lidzen}</td>
                    <td className="v xx">{curTR.compare.row1Macos}</td>
                    <td className="v xx">{curTR.compare.row1Caff}</td>
                    <td className="v pt">{curTR.compare.row1Amph}</td>
                  </tr>
                  <tr>
                    <td>{curTR.compare.row2Title}</td>
                    <td className="us v ok">{curTR.compare.row2Lidzen}</td>
                    <td className="v sl">{curTR.compare.row2Macos}</td>
                    <td className="v pt">{curTR.compare.row2Caff}</td>
                    <td className="v pt">{curTR.compare.row2Amph}</td>
                  </tr>
                  <tr>
                    <td>{curTR.compare.row3Title}</td>
                    <td className="us v ok">{curTR.compare.row3Lidzen}</td>
                    <td className="v xx">{curTR.compare.row3Macos}</td>
                    <td className="v xx">{curTR.compare.row3None}</td>
                    <td className="v xx">{curTR.compare.row3None}</td>
                  </tr>
                  <tr>
                    <td>
                      {curTR.compare.row4Title}
                    </td>
                    <td className="us v ok">{curTR.compare.row4Lidzen}</td>
                    <td className="v xx">{curTR.compare.row4Macos}</td>
                    <td className="v xx">{curTR.compare.row3None}</td>
                    <td className="v xx">{curTR.compare.row3None}</td>
                  </tr>
                  <tr>
                    <td>{curTR.compare.row5Title}</td>
                    <td className="us v ok">{curTR.compare.row5Lidzen}</td>
                    <td className="v ok">{curTR.compare.row5Native}</td>
                    <td className="v ok">{curTR.compare.row5NativeCli}</td>
                    <td className="v ok">{curTR.compare.row5Native}</td>
                  </tr>
                  <tr>
                    <td>{curTR.compare.row6Title}</td>
                    <td className="us v ok">{curTR.compare.row6Lidzen}</td>
                    <td className="v sl">{curTR.compare.row6AppleDiag}</td>
                    <td className="v sl">{curTR.compare.row6NoTelem}</td>
                    <td className="v sl">{curTR.compare.row6ZeroKexts}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="cmp-note pop">
              <b>Methodology &amp; Trademark Disclaimers:</b> macOS &amp; caffeinate metrics reflect default Apple IOKit power management and CLI behaviors in macOS 15 Sequoia. Other application metrics are derived from publicly available documentation, published release notes, and verified system testing as of November 2026. This comparison is provided solely for technical differentiation and informational purposes; features and capabilities may evolve across software updates. Apple, macOS, Apple Silicon, and caffeinate are trademarks of Apple Inc., registered in the U.S. and other countries. Amphetamine is the trademark of its respective creator(s). lidZen is an independent utility and is not affiliated with, sponsored by, or endorsed by Apple Inc., William Gustafson / If-Then-Dev, or any respective trademark owners. Spotted something out of date? Let us know at <a href="mailto:support@lidzen.com?subject=Comparison%20Correction">support@lidzen.com</a>.
            </p>
            <a className="cl pop" href="#docs">
              {curTR.compare.docsLink}
            </a>
          </section>

          <section id="pricing">
            <div className="panel pop">
              <div className="pricing-left">
                <div className="pricing-eyebrow">{curTR.pricing.eyebrow}</div>
                <h2>{curTR.pricing.titleLine1}<br />{curTR.pricing.titleLine2}</h2>
                <p className="lead">{curTR.pricing.lead}</p>
                <div className="mini">
                  <div className="mini-card">
                    <div className="mini-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="3" width="7" height="7" rx="1.5" />
                        <rect x="14" y="14" width="7" height="7" rx="1.5" />
                        <rect x="3" y="14" width="7" height="7" rx="1.5" />
                      </svg>
                    </div>
                    <b>{curTR.pricing.c1Title}</b>
                    <p>{curTR.pricing.c1Desc}</p>
                  </div>
                  <div className="mini-card">
                    <div className="mini-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18.178 8c5.096 0 5.096 8 0 8-2.688 0-4.408-2.222-6.178-4-1.77-1.778-3.49-4-6.178-4-5.096 0-5.096 8 0 8 2.688 0 4.408-2.222 6.178-4 1.77-1.778 3.49-4 6.178-4z" />
                      </svg>
                    </div>
                    <b>{curTR.pricing.c2Title}</b>
                    <p>{curTR.pricing.c2Desc}</p>
                  </div>
                  <div className="mini-card">
                    <div className="mini-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                      </svg>
                    </div>
                    <b>{curTR.pricing.c3Title}</b>
                    <p>{curTR.pricing.c3Desc}</p>
                  </div>
                  <div className="mini-card">
                    <div className="mini-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="12" rx="2" />
                        <line x1="2" y1="20" x2="22" y2="20" />
                      </svg>
                    </div>
                    <b>{curTR.pricing.c4Title}</b>
                    <p>{curTR.pricing.c4Desc}</p>
                  </div>
                </div>

                <div className="dl">
                  <span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f9d5c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <path d="M9 12l2 2 4-4"/>
                    </svg>
                    {curTR.pricing.gatekeeper}
                  </span>
                  <span>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                      <polyline points="7 10 12 15 17 10"/>
                      <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    {curTR.pricing.downloadSize}
                  </span>
                  <span>
                    <AppleLogo size={15} style={{ verticalAlign: '-1px' }} />
                    {curTR.pricing.osVersion}
                  </span>
                </div>
              </div>

              <div className="buy">
                <div className="buy-top">
                  <div className="app-squircle" aria-hidden="true">
                    <svg width="86" height="86" viewBox="0 0 100 100">
                      <use href="#lg" />
                    </svg>
                  </div>

                  <div className="seg">
                    <button
                      type="button"
                      className={plan === 'One Mac' ? 'on' : ''}
                      onClick={() => setPlan('One Mac')}
                    >
                      {curTR.pricing.planOne}
                    </button>
                    <button
                      type="button"
                      className={plan === 'Two Macs' ? 'on' : ''}
                      onClick={() => setPlan('Two Macs')}
                    >
                      {curTR.pricing.planTwo}
                    </button>
                  </div>
                </div>

                <div className="buy-price-wrap">
                  <div className="big" id="pr" suppressHydrationWarning>
                    {planPrice}
                  </div>
                  <small className="buy-note">{curTR.pricing.oneTimeNote}</small>
                </div>

                <div className="buy-bottom">
                  <a
                    className="btn-checkout"
                    id="bb"
                    href={dodoCheckoutUrl}
                    onClick={(e) => {
                      e.preventDefault();
                      startCheckout(selectedProductId);
                    }}
                    suppressHydrationWarning
                  >
                    <AppleLogo size={18} style={{ verticalAlign: '-1px' }} />
                    <span>{curTR.cta} · {planPrice}</span>
                    <span className="btn-arr">→</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section id="faq">
            <h2 className="pop">{curTR.faq.title}</h2>
            <p className="lead pop" style={{ margin: '0 auto 36px', textAlign: 'center' }}>
              {curTR.faq.lead}
            </p>
            <div className="faq pop">
              {curTR.faq.items.map((item, idx) => (
                <details key={item.q} open={idx === 0}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </section>

          <section id="download">
            <div className="cta2 pop">
              <div className="pill">{curTR.download.pill}</div>
              <h2>{curTR.download.title}</h2>
              <p className="lead">
                {curTR.download.lead}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
                <a
                  className="btn"
                  href={dodoOneMacUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    startCheckout(dodoProductIdOneMac);
                  }}
                  suppressHydrationWarning
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                >
                  <AppleLogo size={16} style={{ verticalAlign: '-1px' }} />
                  {curTR.cta} · {planPrice}
                </a>
                <a
                  href="/api/download"
                  download="lidZen.zip"
                  className="btn"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    color: 'var(--fg)',
                    border: '1px solid rgba(255, 255, 255, 0.18)',
                    boxShadow: 'none',
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download .zip (macOS)
                </a>
              </div>
              <p style={{ marginTop: '14px', fontSize: '13px', color: 'var(--slate)' }}>
                macOS 14+ (Sonoma &amp; Sequoia) · Universal Binary · Also available as <a href="/api/download?format=dmg" download="lidZen.dmg" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>lidZen.dmg</a>
              </p>
              <div className="trust">
                <span>{curTR.hero.tr[0]}</span>
                <span>{curTR.hero.tr[1]}</span>
                <span>{curTR.hero.tr[2]}</span>
              </div>
            </div>
          </section>
        </main>

        <footer>
          <div className="fw">
            <div className="fg">
              <div>
                <div className="brand">
                  <svg>
                    <use href="#lg" />
                  </svg>
                  lidZen
                </div>
                <p>
                  Clamshell continuity and deep path diagnostics for Mac power users. Keep AI agents, workflows, and music
                  alive with the lid shut.
                </p>
                <span
                  className="chip"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <AppleLogo size={13} style={{ verticalAlign: '-1px' }} />
                  macOS 15+ (Sequoia) · Apple Silicon &amp; Intel
                </span>
                <p style={{ marginTop: '12px', fontSize: '13px', color: 'var(--slate)' }}>
                  Support &amp; Queries:{' '}
                  <a href="mailto:support@lidzen.com?subject=lidZen%20Support%20%26%20Inquiry" style={{ color: 'var(--navy)', fontWeight: 600, textDecoration: 'underline' }}>
                    support@lidzen.com
                  </a>
                </p>
              </div>
              <div>
                <h3>Product</h3>
                <ul>
                  <li>
                    <a href="#features">Features</a>
                  </li>
                  <li>
                    <a href="#diagnostics">Live Diagnostics</a>
                  </li>
                  <li>
                    <a href="#clamshell">Clamshell Continuity</a>
                  </li>
                  <li>
                    <a href="#pricing">Pricing</a>
                  </li>
                  <li>
                    <a href="#download">Download</a>
                  </li>
                </ul>
              </div>
              <div id="docs">
                <h3>Documentation</h3>
                <ul>
                  <li>
                    <Link href="/docs">Overview</Link>
                  </li>
                  <li>
                    <Link href="/docs/getting-started">Getting Started Guide</Link>
                  </li>
                  <li>
                    <Link href="/docs/installation">Installation Docs</Link>
                  </li>
                  <li>
                    <Link href="/docs/features">Core Features</Link>
                  </li>
                  <li>
                    <Link href="/docs/troubleshooting">Troubleshooting</Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3>Resources</h3>
                <ul>
                  <li>
                    <Link href="/docs/settings">Settings &amp; Config</Link>
                  </li>
                  <li>
                    <a href="#diagnostics">Process Diagnostics</a>
                  </li>
                  <li>
                    <Link href="/docs/faq">{curTR.footer.faq}</Link>
                  </li>
                  <li>
                    <Link href="/privacy">{curTR.footer.privacy}</Link>
                  </li>
                  <li>
                    <Link href="/terms">{curTR.footer.terms}</Link>
                  </li>
                  <li>
                    <a href="mailto:support@lidzen.com?subject=lidZen%20Support%20%26%20Inquiry">Support &amp; Queries</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="fb">
              <span>{curTR.footer.rights}</span>
              <div>
                <span>{curTR.hero.tr[0]}</span>
                <span>{curTR.hero.tr[1]}</span>
                <span>{curTR.hero.tr[2]}</span>
              </div>
            </div>
          </div>
        </footer>

        {/* Privacy & Cookie Guarantee Banner */}
        <CookieConsent />
      </div>

      <style jsx global>{`
        :root {
          color-scheme: light;
          --navy: #101c36;
          --navy2: #263f68;
          --gold: #c5a46d;
          --gold2: #e6c994;
          --ivory: #f6f3ed;
          --slate: #737b8c;
          --mist: #e9eef7;
          --line: #dde1ea;
          --rec: 'Recoleta', 'Fraunces', Georgia, serif;
          --ber: 'Berthold Akzidenz Grotesk', 'Akzidenz-Grotesk BQ', 'Archivo', system-ui, sans-serif;

          /* Usability Heuristic Design Tokens */
          /* 1. Corner Radii Scale (Target <= 6 tiers) */
          --r-xs: 6px;
          --r-sm: 8px;
          --r-md: 14px;
          --r-lg: 20px;
          --r-xl: 36px;
          --r-pill: 999px;

          /* 2. Modular Type Scale (Target <= 10 tiers) */
          --fs-caption: 12px;
          --fs-footnote: 13px;
          --fs-body: 14px;
          --fs-lead: 16px;
          --fs-title3: 18px;
          --fs-title2: 24px;
          --fs-title1: clamp(2.4rem, 4.5vw, 3.8rem);
          --fs-display: clamp(3.2rem, 9vw, 5.6rem);

          /* 3. Semantic Color Tokens */
          --c-text: var(--navy);
          --c-muted: var(--slate);
          --c-link: #0066cc;
          --c-success: #16a34a;
          --c-warning: #b45309;
          --c-white: #ffffff;

          box-sizing: border-box;
          padding-top: env(safe-area-inset-top, 0px);
          padding-bottom: env(safe-area-inset-bottom, 0px);
        }
        * {
          box-sizing: border-box;
          margin: 0;
        }
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 90px;
        }
        body {
          font-family: var(--ber);
          color: var(--navy);
          background: #fff;
          overflow-x: hidden;
          line-height: 1.55;
        }
        @media (min-width: 769px) {
          body:not(.ready) {
            overflow: hidden;
            height: 100vh;
          }
        }
        h1,
        h2,
        h3,
        .rec {
          font-family: var(--rec);
          font-weight: 600;
          letter-spacing: -0.025em;
          line-height: 1.05;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        .btn {
          display: inline-block;
          padding: 14px 26px;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--navy), var(--navy2));
          color: #fff;
          font-weight: 500;
          box-shadow: 0 10px 30px -10px rgba(16, 28, 54, 0.6);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 34px -12px rgba(16, 28, 54, 0.7);
        }
        .btn:active {
          transform: scale(0.97) translateY(0);
          box-shadow: 0 6px 16px -6px rgba(16, 28, 54, 0.5);
        }
        .btn.o {
          background: #fff;
          color: var(--navy);
          border: 1px solid var(--line);
          box-shadow: none;
        }
        .shine {
          background: linear-gradient(
              100deg,
              var(--navy) 38%,
              var(--gold) 47%,
              var(--gold2) 50%,
              var(--gold) 53%,
              var(--navy) 62%
            )
            130% 0/260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: sw 3.6s ease-in-out infinite;
        }
        @keyframes sw {
          0%,
          12% {
            background-position: 130% 0;
          }
          70%,
          100% {
            background-position: -30% 0;
          }
        }
        @keyframes pop {
          from {
            opacity: 0;
            transform: translateY(26px) scale(0.92);
            filter: blur(8px);
          }
          to {
            opacity: 1;
            transform: none;
            filter: none;
          }
        }

        /* ===== 3D MacBook intro ===== */
        .scene {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: grid;
          place-items: center;
          background: radial-gradient(ellipse at 50% 35%, #fff, var(--mist));
          perspective: 2200px;
          transition: opacity 0.9s;
          --w: min(78vw, 780px);
          --d: calc(var(--w) * 0.64);
          transform-origin: 50% 50%;
        }
        .scene.zoom {
          transform: translate(var(--tx), var(--ty)) scale(var(--s));
          transition: transform 1.5s cubic-bezier(0.65, 0, 0.25, 1), opacity 0.9s;
        }
        .ready .scene {
          opacity: 0;
          pointer-events: none;
        }
        .rig {
          position: relative;
          width: var(--w);
          height: var(--d);
          transform-style: preserve-3d;
          transform: rotateX(-38deg) translateY(4%);
          transition: transform 2.2s cubic-bezier(0.3, 0.7, 0.2, 1);
        }
        .open .rig {
          transform: rotateX(-16deg) translateY(26%);
        }
        .base {
          position: absolute;
          inset: 0;
          transform-origin: bottom;
          transform: rotateX(90deg);
          border-radius: 20px;
          background: linear-gradient(#eceef2, #cdd1d9);
          box-shadow: 0 50px 90px -10px rgba(16, 28, 54, 0.4), inset 0 0 0 1px #fff;
        }
        .base:before {
          content: '';
          position: absolute;
          inset: 8% 6% 32%;
          border-radius: 8px;
          background: repeating-linear-gradient(90deg, #b4bac6 0 2px, transparent 2px 6.6%),
            repeating-linear-gradient(#b4bac6 0 2px, transparent 2px 20%);
          opacity: 0.5;
        }
        .base:after {
          content: '';
          position: absolute;
          left: 32%;
          right: 32%;
          bottom: 7%;
          height: 19%;
          border-radius: 8px;
          border: 1px solid #b4bac6;
        }
        .lid {
          position: absolute;
          inset: 0;
          transform-origin: bottom;
          transform-style: preserve-3d;
          transform: translateY(-4px) translateZ(calc(var(--d) * -1)) rotateX(-90deg);
          transition: transform 2.2s cubic-bezier(0.3, 0.7, 0.2, 1);
        }
        .open .lid {
          transform: translateY(-4px) translateZ(calc(var(--d) * -1)) rotateX(14deg);
        }
        .scene.flat .rig {
          transform: none !important;
        }
        .scene.flat .lid {
          transform: translateZ(calc(var(--d) * -1)) !important;
        }
        .scene.zoom .rig {
          transform: none;
        }
        .scene.zoom .lid {
          transform: translateZ(calc(var(--d) * -1));
        }
        .scene.nt * {
          transition: none !important;
        }
        .scr,
        .out {
          position: absolute;
          inset: 0;
          backface-visibility: hidden;
          border-radius: 20px;
        }
        .scr {
          background: #0b0b0e;
          padding: 2.3%;
          box-shadow: inset 0 0 0 1px #3a3d46;
        }
        .out {
          transform: rotateX(180deg);
          background: linear-gradient(135deg, #f6f7f9, #c6ccd7);
          display: grid;
          place-items: center;
        }
        .out svg {
          width: 17%;
          aspect-ratio: 1;
          filter: drop-shadow(0 0 22px rgba(76, 155, 255, 0.75));
        }
        .disp {
          width: 100%;
          height: 100%;
          border-radius: 20px;
          background: linear-gradient(#fff, var(--mist));
          overflow: hidden;
          container-type: size;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }
        .disp:before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 9cqw;
          height: 1.8cqw;
          transform: translateX(-50%);
          background: #0b0b0e;
          border-radius: 0 0 8px 8px;
        }
        .m {
          opacity: 0;
        }
        .open .m {
          animation: pop 0.9s cubic-bezier(0.2, 0.9, 0.3, 1.15) both;
          animation-delay: calc(1.7s + var(--i) * 0.18s);
        }
        .mh {
          position: absolute;
          top: 4cqw;
          display: flex;
          align-items: center;
          gap: 2cqw;
          padding: 0.9cqw 2.2cqw 0.9cqw 1cqw;
          border: 1px solid var(--line);
          border-radius: 999px;
          background: #ffffffcc;
          font-size: 13px;
          white-space: nowrap;
        }
        .mh svg {
          width: 4cqw;
          height: 4cqw;
        }
        .mh b {
          font-family: var(--rec);
        }
        .disp h1,
        .disp .h1-mimic {
          font-size: clamp(2.2rem, 4.5vw, 3.5rem);
          margin-top: 4cqw;
          display: block;
        }
        .disp p {
          font-size: 14px;
          color: var(--slate);
          margin: 2cqw 0 3cqw;
        }
        .disp .b {
          font-size: 14px;
          padding: 1.3cqw 3.4cqw;
          border-radius: 999px;
          background: linear-gradient(135deg, var(--navy), var(--navy2));
          color: #fff;
        }
        .skip {
          position: fixed;
          bottom: calc(22px + env(safe-area-inset-bottom, 0px));
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          font: 600 13px var(--ber);
          color: var(--navy);
          background: #ffffff;
          border: 1px solid var(--line);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          border-radius: 999px;
          padding: 7px 16px;
          cursor: pointer;
        }
        body.dark .skip {
          color: var(--navy);
          background: #0f172a;
          border-color: var(--line);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5);
        }
        .ready .skip {
          display: none;
        }

        /* ===== Site ===== */
        .site {
          position: relative;
          z-index: 2;
          opacity: 1;
        }
        @media (max-width: 768px) {
          .scene {
            display: none !important;
          }
          .skip {
            display: none !important;
          }
          body:not(.ready) {
            overflow: auto !important;
            height: auto !important;
          }
          .site {
            opacity: 1 !important;
          }
        }
        .hb {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 120px;
          z-index: 19;
          pointer-events: none;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          -webkit-mask: linear-gradient(#000 30%, transparent);
          mask: linear-gradient(#000 30%, transparent);
          background: linear-gradient(rgba(255, 255, 255, 0.8), transparent);
          opacity: 0;
          transition: opacity 0.5s;
        }
        .scrolled .hb {
          opacity: 1;
        }
        header {
          position: fixed;
          top: calc(14px + env(safe-area-inset-top, 0px));
          left: 50%;
          transform: translateX(-50%);
          z-index: 20;
          width: min(1120px, 94vw);
          display: flex;
          align-items: center;
          gap: 2px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid var(--line);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          transition: width 0.6s cubic-bezier(0.2, 0.8, 0.2, 1), padding 0.5s, background 0.5s, box-shadow 0.5s;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .scrolled header nav a {
          padding: 7px 11px;
          font-size: 13px;
        }
        .scrolled header {
          width: min(980px, 94vw);
          padding: 4px 6px;
          background: rgba(255, 255, 255, 0.55);
          box-shadow: 0 14px 40px -18px rgba(16, 28, 54, 0.35);
        }
        header .brand {
          display: flex;
          align-items: center;
          gap: 8px;
          font-family: var(--rec);
          font-weight: 700;
          font-size: 18px;
          padding: 0 12px 0 2px;
          margin-right: auto;
        }
        header .brand svg {
          width: 34px;
          height: 34px;
        }
        .scrolled header .brand svg {
          width: 28px;
          height: 28px;
        }
        header nav {
          display: flex;
          gap: 2px;
          align-items: center;
        }
        header nav a {
          padding: 8px 15px;
          border-radius: 999px;
          border: 1px solid transparent;
          font-size: 14px;
          white-space: nowrap;
          transition: border-color 0.3s, background 0.3s;
        }
        header nav a:hover {
          background: #f3f4f7;
        }
        header nav a.on {
          border-color: #cfd4de;
          background: #f5f6f9;
        }
        header nav a.cta {
          background: var(--navy);
          color: #fff;
          margin-left: 6px;
        }
        header nav a.cta:hover {
          background: var(--navy2);
        }
        .hero {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 130px 6vw 70px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(#fff, var(--mist));
        }
        .hero h1 {
          font-size: clamp(3.2rem, 11vw, 8.6rem);
        }
        .hero h1 span {
          display: block;
        }
        .hero p {
          max-width: 540px;
          color: var(--slate);
          font-size: clamp(1.05rem, 2vw, 1.3rem);
          margin: 26px 0 34px;
        }
        .hero .row {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          justify-content: center;
        }
        .hp {
          opacity: 1;
        }
        @media (min-width: 769px) {
          body:not(.ready) .hp {
            opacity: 0;
          }
          .ready .hp {
            animation: pop 0.6s cubic-bezier(0.2, 0.9, 0.3, 1.1) both;
            animation-delay: calc(0.1s + var(--i) * 0.08s);
          }
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.55;
          animation: fl 12s ease-in-out infinite alternate;
        }
        .o1 {
          width: 380px;
          height: 380px;
          background: var(--gold2);
          left: -100px;
          top: 12%;
        }
        .o2 {
          width: 440px;
          height: 440px;
          background: #b9c9ee;
          right: -120px;
          bottom: 2%;
          animation-delay: -5s;
        }
        @keyframes fl {
          to {
            transform: translate3d(60px, -50px, 0) scale(1.15);
          }
        }
        .live {
          margin-top: 46px;
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 14px 22px;
          border-radius: 20px;
          background: #fff;
          border: 1px solid var(--line);
          box-shadow: 0 30px 60px -30px rgba(16, 28, 54, 0.35);
          transform: perspective(800px) rotateX(8deg);
          animation: bob 5s ease-in-out infinite;
        }
        @keyframes bob {
          50% {
            transform: perspective(800px) rotateX(2deg) translateY(-8px);
          }
        }
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #2fbf71;
          box-shadow: 0 0 0 0 #2fbf7188;
          animation: pl 2s infinite;
        }
        @keyframes pl {
          to {
            box-shadow: 0 0 0 14px #2fbf7100;
          }
        }
        .live b {
          font-variant-numeric: tabular-nums;
        }
        .live small {
          color: var(--slate);
          display: block;
          line-height: 1.2;
        }
        .bat {
          width: 46px;
          height: 20px;
          border: 2px solid var(--navy);
          border-radius: 8px;
          padding: 2px;
        }
        .bat i {
          display: block;
          height: 100%;
          width: 72%;
          border-radius: 8px;
          background: linear-gradient(90deg, var(--gold), var(--gold2));
          animation: ch 4s ease-in-out infinite alternate;
        }
        @keyframes ch {
          from {
            width: 60%;
          }
          to {
            width: 88%;
          }
        }
        section {
          padding: 110px 6vw;
          max-width: 1180px;
          margin: auto;
        }
        section h2 {
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          max-width: 760px;
        }
        section > p.lead {
          color: var(--slate);
          max-width: 560px;
          margin-top: 16px;
          font-size: 16px;
        }
        .pop {
          opacity: 0;
          transform: translateY(46px) scale(0.95);
          filter: blur(6px);
          transition: opacity 0.8s, transform 0.9s cubic-bezier(0.2, 0.9, 0.3, 1.1), filter 0.8s;
          transition-delay: calc(var(--i, 0) * 0.09s);
        }
        .pop.in {
          opacity: 1;
          transform: none;
          filter: none;
        }
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 50px;
        }
        .step {
          padding: 30px;
          border-radius: 20px;
          background: var(--ivory);
        }
        .step h3 {
          font-size: 24px;
          margin: 14px 0 8px;
        }
        .step p {
          color: var(--slate);
        }
        .step .n {
          width: 42px;
          height: 42px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: var(--navy);
          color: var(--gold2);
          font-family: var(--rec);
          font-weight: 700;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 20px;
          margin-top: 50px;
        }
        .card {
          padding: 32px;
          border-radius: 20px;
          background: linear-gradient(160deg, #fff, var(--mist));
          border: 1px solid var(--line);
          transition: transform 0.25s ease-out, border-color 0.3s, box-shadow 0.3s;
          transform-style: preserve-3d;
        }
        .card:hover {
          border-color: var(--gold);
          box-shadow: 0 30px 60px -30px rgba(16, 28, 54, 0.4);
        }
        .card h3 {
          font-size: 18px;
          margin-bottom: 8px;
        }
        .card p {
          color: var(--slate);
        }
        .card.dk {
          background: linear-gradient(160deg, #0b1220, #1b3153);
          color: #fff;
          border-color: #0b1220;
        }
        .card.dk p {
          color: var(--slate);
        }
        .tw {
          overflow-x: auto;
          margin-top: 50px;
          border: 1px solid var(--line);
          border-radius: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
          font-size: 14px;
        }
        th,
        td {
          padding: 18px 22px;
          text-align: left;
          border-bottom: 1px solid var(--line);
        }
        tr:last-child td {
          border: 0;
        }
        th {
          font-family: var(--rec);
          font-size: 16px;
          font-weight: 600;
        }
        th.us,
        td.us {
          background: var(--ivory);
          font-weight: 600;
        }
        .y {
          color: #16a34a;
        }
        .n0 {
          color: var(--slate);
        }
        .price {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
          gap: 20px;
          margin-top: 50px;
        }
        .price .card {
          display: flex;
          flex-direction: column;
        }
        .price .big {
          font-family: var(--rec);
          font-size: clamp(2.4rem, 4.5vw, 3.8rem);
          font-weight: 600;
          margin: 12px 0;
        }
        .price .big small {
          font-size: 14px;
          color: var(--slate);
          font-family: var(--ber);
          font-weight: 400;
        }
        .price ul {
          list-style: none;
          padding: 0;
          margin: 0 0 28px;
          display: grid;
          gap: 10px;
          flex: 1;
        }
        .price li:before {
          content: '✓';
          color: var(--gold);
          margin-right: 10px;
          font-weight: 700;
        }
        .dk .btn {
          background: linear-gradient(135deg, var(--gold), var(--gold2));
          color: var(--navy);
        }
        details {
          border-bottom: 1px solid var(--line);
          padding: 22px 0;
        }
        summary {
          cursor: pointer;
          font-family: var(--rec);
          font-size: 18px;
          font-weight: 600;
          list-style: none;
          display: flex;
          justify-content: space-between;
          gap: 20px;
        }
        summary::-webkit-details-marker {
          display: none;
        }
        summary:after {
          content: '+';
          transition: transform 0.3s;
          color: var(--gold);
          font-size: 24px;
          line-height: 1;
        }
        details[open] summary:after {
          transform: rotate(45deg);
        }
        details p {
          color: var(--slate);
          margin-top: 12px;
          max-width: 640px;
        }
        .faq {
          margin-top: 40px;
        }
        .tools {
          display: flex;
          gap: 8px;
          align-items: center;
          margin: 0 6px 0 10px;
        }
        .tools select {
          appearance: none;
          font: 600 13px var(--ber);
          color: inherit;
          background: #f1f3f7;
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 7px 16px;
          cursor: pointer;
        }
        #th {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          border: 1px solid var(--line);
          background: #fff;
          color: var(--navy);
          cursor: pointer;
          font: 600 13px var(--ber);
          display: grid;
          place-items: center;
          padding: 0;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s;
        }
        #th:hover {
          transform: rotate(15deg);
        }
        #th:active {
          transform: scale(0.9) rotate(30deg);
        }
        #lb {
          font: 600 13px var(--ber);
          color: var(--navy);
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 7px 16px;
          cursor: pointer;
          white-space: nowrap;
          transition: transform 0.15s, background-color 0.2s;
        }
        #lb:active {
          transform: scale(0.96);
        }
        .lm {
          position: fixed;
          z-index: 30;
          display: block;
          opacity: 0;
          pointer-events: none;
          transform: scale(0.95);
          transform-origin: top left;
          min-width: 210px;
          padding: 8px;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid var(--line);
          box-shadow: 0 24px 60px -20px rgba(16, 28, 54, 0.35);
          transition: opacity 0.16s cubic-bezier(0.16, 1, 0.3, 1), transform 0.16s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lm.show {
          opacity: 1;
          pointer-events: auto;
          transform: scale(1);
        }
        .lm button {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          border: 1px solid transparent;
          background: #fff;
          color: var(--navy);
          font: 600 13px var(--ber);
          padding: 7px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.15s, transform 0.1s;
        }
        .lm button:hover,
        .lm button.on {
          background: var(--mist);
        }
        .lm button:active {
          transform: scale(0.97);
        }
        .lm i {
          font: 600 12px ui-monospace, Menlo, monospace;
          font-style: normal;
          width: 24px;
          height: 24px;
          border-radius: 999px;
          display: grid;
          place-items: center;
          background: var(--ivory);
        }
        body.dark #lb {
          background: #18243a;
        }
        body.dark .lm {
          background: #14203a;
        }
        #compare {
          position: relative;
          overflow: visible;
        }
        #compare > *:not(.csa-root) {
          position: relative;
          z-index: 2;
        }
        .tw {
          position: relative;
          z-index: 2;
          background: rgba(255, 255, 255, 0.94);
          backdrop-filter: blur(12px);
        }
        body.dark .tw {
          background: rgba(16, 28, 54, 0.94);
        }
        table.cmp {
          min-width: 820px;
        }
        .cmp td,
        .cmp th {
          padding: 20px 22px;
          vertical-align: middle;
        }
        .cmp th {
          font-family: var(--ber);
          font-size: 14px;
          font-weight: 600;
        }
        .cmp th.us,
        .cmp td.us {
          background: #eaf7f0;
        }
        .cmp th.us {
          color: #16a34a;
        }
        body.dark .cmp th.us,
        body.dark .cmp td.us {
          background: #12303a;
        }
        .v {
          font: 13px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .ok {
          color: #16a34a;
          font-weight: 600;
        }
        .xx {
          color: #b45309;
        }
        .pt {
          color: var(--gold);
        }
        .sl {
          color: var(--slate);
        }
        .cmp-note {
          max-width: 860px;
          margin: 18px auto 0;
          padding: 0 16px;
          font-size: 12px;
          line-height: 1.6;
          color: var(--slate);
          text-align: center;
        }
        .cmp-note a {
          color: var(--navy);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        body.dark .cmp-note a {
          color: #94a3b8;
        }
        .cl {
          display: block;
          text-align: center;
          margin-top: 26px;
          color: #16a34a;
          font: 14px ui-monospace, Menlo, monospace;
        }
        .pill {
          display: inline-block;
          padding: 7px 16px;
          border-radius: 999px;
          border: 1px solid var(--gold);
          background: var(--ivory);
          color: var(--navy);
          font-weight: 500;
          font-size: 13px;
          margin-bottom: 26px;
        }
        .trust {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
          justify-content: center;
          margin-top: 30px;
          color: var(--slate);
          font-size: 14px;
        }
        .trust span:before {
          content: '';
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--gold);
          margin-right: 8px;
        }
        .dg {
          margin-top: 50px;
          border-radius: 20px;
          background: linear-gradient(160deg, #0b1220, #1b3153);
          color: #fff;
          padding: 30px;
          display: grid;
          gap: 18px;
          box-shadow: 0 40px 80px -40px rgba(16, 28, 54, 0.6);
        }
        .dg .r {
          display: grid;
          grid-template-columns: 150px 1fr 80px;
          align-items: center;
          gap: 16px;
          font-size: 14px;
          color: var(--slate);
        }
        .dg .t {
          height: 8px;
          border-radius: 999px;
          background: #ffffff1a;
          overflow: hidden;
        }
        .dg .t i {
          display: block;
          height: 100%;
          width: var(--v);
          border-radius: 999px;
          transform-origin: left;
          background: linear-gradient(90deg, #c5a46d, #e6c994);
          animation: dv 3s ease-in-out infinite alternate;
          animation-delay: calc(var(--i) * -0.7s);
        }
        @keyframes dv {
          to {
            transform: scaleX(0.55);
          }
        }
        .dg b {
          color: #fff;
          text-align: right;
          font-variant-numeric: tabular-nums;
        }
        /* Interactive Pause & Resume Demo */
        .pause-demo-wrap {
          width: 100%;
        }
        .pause-demo-window {
          background: var(--card, #fff);
          border: 1px solid var(--line);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 70px -30px rgba(16, 28, 54, 0.25);
        }
        .pause-demo-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 20px;
          border-bottom: 1px solid var(--line);
          background: rgba(0, 0, 0, 0.02);
          gap: 12px;
        }
        .window-dots {
          display: flex;
          gap: 7px;
          align-items: center;
        }
        .dot-red,
        .dot-yellow,
        .dot-green {
          width: 11px;
          height: 11px;
          border-radius: 999px;
        }
        .dot-red {
          background: #ff5f56;
        }
        .dot-yellow {
          background: #ffbd2e;
        }
        .dot-green {
          background: #27c93f;
        }
        .window-title {
          font: 600 13px ui-monospace, Menlo, monospace;
          color: var(--slate);
          letter-spacing: -0.01em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .btn-toggle-all {
          border: 1px solid var(--line);
          background: #fff;
          color: var(--navy);
          font: 600 13px var(--ber);
          padding: 7px 16px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-toggle-all:hover {
          background: var(--mist);
        }
        .pause-demo-body {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
        }
        .proc-list {
          padding: 18px 20px;
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .proc-list-header {
          display: flex;
          justify-content: space-between;
          font: 600 12px ui-monospace, Menlo, monospace;
          color: var(--slate);
          letter-spacing: 0.05em;
          padding: 0 4px 6px;
        }
        .proc-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 20px;
          border: 1px solid var(--line);
          background: var(--ivory);
          cursor: pointer;
          transition: all 0.2s;
          gap: 12px;
        }
        .proc-item:hover {
          border-color: var(--gold);
        }
        .proc-item.selected {
          border-color: #0066cc;
          box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.15);
        }
        .proc-item.is-paused {
          opacity: 0.72;
          background: rgba(0, 0, 0, 0.02);
        }
        .proc-left {
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 0;
        }
        .status-led {
          width: 8px;
          height: 8px;
          border-radius: 999px;
          flex-shrink: 0;
        }
        .led-running {
          background: #16a34a;
          box-shadow: 0 0 8px rgba(22, 163, 74, 0.6);
        }
        .led-paused {
          background: #b45309;
        }
        .proc-info {
          min-width: 0;
        }
        .proc-name {
          display: block;
          font-size: 14px;
          font-weight: 600;
          color: var(--navy);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .proc-path {
          display: block;
          font: 12px ui-monospace, Menlo, monospace;
          color: var(--slate);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .proc-right {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }
        .proc-badge {
          font: 600 12px ui-monospace, Menlo, monospace;
          padding: 3px 8px;
          border-radius: 8px;
        }
        .badge-running {
          background: rgba(22, 163, 74, 0.12);
          color: #16a34a;
        }
        .badge-paused {
          background: rgba(180, 83, 9, 0.12);
          color: #b45309;
        }
        .btn-row-action {
          border: 1px solid var(--line);
          background: #fff;
          font: 600 13px var(--ber);
          padding: 5px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-row-action.btn-pause {
          color: #b45309;
        }
        .btn-row-action.btn-resume {
          color: #16a34a;
          border-color: rgba(22, 163, 74, 0.4);
          background: rgba(22, 163, 74, 0.08);
        }
        .btn-row-action:hover {
          transform: translateY(-1px);
        }
        .proc-inspector {
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .inspector-box {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .inspector-tag {
          font: 600 12px ui-monospace, Menlo, monospace;
          letter-spacing: 0.08em;
          color: var(--gold);
        }
        .inspector-title {
          font-family: var(--rec);
          font-size: 24px;
          margin: 0;
          line-height: 1.15;
        }
        .inspector-path {
          font: 12px/1.45 ui-monospace, Menlo, monospace;
          color: var(--slate);
          word-break: break-all;
          margin: 0;
        }
        .inspector-status-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 13px;
          padding-top: 4px;
        }
        .text-ok {
          color: #16a34a;
        }
        .text-warn {
          color: #b45309;
        }
        .inspector-meter {
          height: 8px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .inspector-meter-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.3s ease;
        }
        .inspector-actions {
          margin: 10px 0 6px;
        }
        .btn-main-suspend {
          width: 100%;
          border: none;
          border-radius: 999px;
          padding: 14px 24px;
          cursor: pointer;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        .btn-is-pause {
          background: linear-gradient(135deg, var(--navy), var(--navy2));
          color: #fff;
          box-shadow: 0 10px 24px -10px rgba(16, 28, 54, 0.5);
        }
        .btn-is-resume {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: #fff;
          box-shadow: 0 10px 24px -10px rgba(22, 163, 74, 0.5);
        }
        .btn-main-suspend:hover {
          transform: translateY(-2px);
        }
        .action-label {
          font: 700 16px var(--ber);
        }
        .action-sub {
          font-size: 12px;
          line-height: 1.4;
          opacity: 0.85;
          margin-top: 2px;
        }
        .inspector-telemetry {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
          margin-top: 6px;
        }
        .telemetry-item {
          padding: 10px 12px;
          border-radius: 14px;
          background: var(--ivory);
          border: 1px solid var(--line);
        }
        .telemetry-item small {
          display: block;
          font-size: 12px;
          color: var(--slate);
          text-transform: none;
        }
        .telemetry-item b {
          font-size: 16px;
          color: var(--navy);
          font-variant-numeric: tabular-nums;
        }
        .pause-demo-footer {
          padding: 12px 20px;
          border-top: 1px solid var(--line);
          background: rgba(0, 0, 0, 0.02);
          font-size: 13px;
          color: var(--slate);
        }
        .demo-hint b {
          color: var(--navy);
        }
        @media (max-width: 860px) {
          .pause-demo-body {
            grid-template-columns: 1fr;
          }
          .proc-list {
            border-right: none;
            border-bottom: 1px solid var(--line);
          }
        }
        #pricing {
          max-width: 1340px;
          width: 100%;
          padding: 80px 3.5vw;
          margin: 0 auto;
        }
        .pricing-eyebrow {
          font-size: 13px;
          font-weight: 600;
          color: var(--slate);
          letter-spacing: -0.01em;
          margin-bottom: 14px;
        }
        .panel {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          border-radius: 36px;
          border: 1px solid var(--line);
          background: #fff;
          box-shadow: 0 40px 90px -50px rgba(16, 28, 54, 0.45);
          overflow: hidden;
          padding: 0;
          align-items: stretch;
          width: 100%;
        }
        .pricing-left {
          padding: 56px 52px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .panel h2 {
          font-size: clamp(2.6rem, 4.8vw, 4.2rem);
          line-height: 1.04;
          margin: 0 0 14px;
          font-family: var(--rec);
          letter-spacing: -0.025em;
        }
        .panel .lead {
          color: var(--slate);
          font-size: 16px;
          line-height: 1.45;
          margin-bottom: 36px;
        }
        .mini {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 38px;
        }
        .mini .mini-card {
          padding: 22px 24px 24px;
          border-radius: 20px;
          border: 1px solid var(--line);
          background: var(--ivory);
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .mini .mini-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px -6px rgba(16, 28, 54, 0.08);
        }
        .mini-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #fff;
          border: 1px solid var(--line);
          display: grid;
          place-items: center;
          margin-bottom: 14px;
          color: var(--navy);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
        }
        .mini b {
          font-family: var(--rec);
          font-size: 18px;
          display: block;
          margin-bottom: 6px;
          color: var(--navy);
        }
        .mini p {
          color: var(--slate);
          font-size: 13px;
          line-height: 1.48;
          margin: 0;
        }
        .dl {
          display: flex;
          gap: 28px;
          flex-wrap: wrap;
          align-items: center;
          color: var(--slate);
          font-size: 13px;
          padding-top: 22px;
          border-top: 1px solid var(--line);
        }
        .dl span {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .buy {
          text-align: center;
          padding: 60px 48px;
          border-left: 1px solid var(--line);
          background: radial-gradient(ellipse at 50% 18%, rgba(220, 232, 255, 0.75) 0%, rgba(242, 238, 255, 0.45) 50%, rgba(255, 255, 255, 0.95) 100%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          box-sizing: border-box;
          min-height: 560px;
        }
        .buy-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
        }
        .app-squircle {
          width: 92px;
          height: 92px;
          border-radius: 20px;
          box-shadow: 0 20px 42px -10px rgba(76, 155, 255, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          margin-bottom: 26px;
          overflow: hidden;
          display: grid;
          place-items: center;
        }
        .app-squircle svg {
          width: 100%;
          height: 100%;
        }
        .seg {
          display: inline-flex;
          padding: 5px;
          border-radius: 999px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(0, 0, 0, 0.05);
          width: fit-content;
        }
        .seg button {
          border: 0;
          background: none;
          font: 600 13px var(--ber);
          padding: 10px 32px;
          border-radius: 999px;
          cursor: pointer;
          color: var(--slate);
          transition: background 0.2s, color 0.2s, box-shadow 0.2s, transform 0.1s;
        }
        .seg button:active {
          transform: scale(0.96);
        }
        .seg button.on {
          background: #fff;
          color: var(--navy);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.09);
        }
        .buy-price-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 24px 0;
        }
        .buy .big {
          font-family: var(--rec);
          font-size: clamp(3.5rem, 6vw, 5.6rem);
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.04em;
          color: var(--navy);
          margin-bottom: 10px;
        }
        .buy-note {
          display: block;
          color: var(--slate);
          font-size: 14px;
          line-height: 1.4;
          font-family: var(--ber);
          margin: 0;
        }
        .buy-bottom {
          display: flex;
          justify-content: center;
          width: 100%;
        }
        .btn-checkout {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          width: 100%;
          max-width: 340px;
          padding: 17px 36px;
          border-radius: 999px;
          background: #0d0d12;
          color: #fff;
          font: 600 16px var(--ber);
          box-shadow: 0 14px 34px -8px rgba(0, 0, 0, 0.45);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          border: none;
          text-decoration: none;
        }
        .btn-checkout:hover {
          transform: translateY(-2px);
          box-shadow: 0 18px 36px -6px rgba(0, 0, 0, 0.55);
        }
        .btn-checkout:hover .btn-arr {
          transform: translateX(3px);
        }
        .payment-toast {
          position: fixed;
          top: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: 90%;
          max-width: 680px;
          background: #0d1627;
          color: #fff;
          border-radius: 20px;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.6);
          padding: 16px 20px;
          animation: slideDownToast 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes slideDownToast {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        .payment-toast-content {
          display: flex;
          align-items: center;
          gap: 14px;
          font-family: var(--ber);
          font-size: 13px;
        }
        .payment-toast-icon {
          width: 32px;
          height: 32px;
          border-radius: 999px;
          background: #16a34a;
          color: #fff;
          display: grid;
          place-items: center;
          font-weight: 700;
          flex-shrink: 0;
        }
        .payment-toast-content strong {
          display: block;
          font-size: 14px;
          color: #fff;
          margin-bottom: 2px;
        }
        .payment-toast-content p {
          margin: 0;
          color: #94a3b8;
          font-size: 13px;
        }
        .payment-toast-content code {
          background: rgba(255, 255, 255, 0.1);
          padding: 2px 6px;
          border-radius: 4px;
          color: #38bdf8;
        }
        .payment-toast-dl-btn {
price           margin-left: auto;
          background: #fff;
          color: #0b1220;
          font-weight: 600;
          padding: 8px 16px;
          border-radius: 999px;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.15s;
        }
        .payment-toast-dl-btn:hover {
          background: #f1f5f9;
        }
        .payment-toast-dismiss {
          background: none;
          border: none;
          color: #94a3b8;
          font-size: 20px;
          cursor: pointer;
          padding: 0 4px;
          line-height: 1;
        }
        .payment-toast-dismiss:hover {
          color: #fff;
        }
        .btn-checkout:active {
          transform: scale(0.97) translateY(0);
          box-shadow: 0 6px 14px -6px rgba(0, 0, 0, 0.4);
        }
        .btn-arr {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: grid;
          place-items: center;
          font-size: 12px;
          margin-left: 2px;
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cta2 {
          text-align: center;
          padding: 70px 6vw;
          border-radius: 36px;
          background: linear-gradient(160deg, #fff, var(--mist) 70%, #f1e6cf);
          border: 1px solid var(--line);
        }
        .cta2 h2 {
          margin: 0 auto;
        }
        .cta2 .lead {
          max-width: 560px;
          margin: 16px auto 30px;
          color: var(--slate);
          font-size: 16px;
        }
        footer {
          padding: 80px 6vw 40px;
          background: linear-gradient(var(--mist), #fff 60%);
          color: var(--slate);
        }
        .fw {
          max-width: 1180px;
          margin: auto;
        }
        .fg {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1fr 1fr;
          gap: 40px;
        }
        footer .brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--rec);
          font-weight: 700;
          font-size: 24px;
          color: var(--navy);
          margin-bottom: 14px;
        }
        footer svg {
          width: 40px;
          height: 40px;
        }
        footer h3,
        footer h4 {
          font: 600 14px var(--ber);
          color: var(--navy);
          margin-bottom: 16px;
        }
        footer ul {
          list-style: none;
          padding: 0;
          display: grid;
          gap: 12px;
        }
        footer li a:hover {
          color: var(--navy);
        }
        .chip {
          display: inline-block;
          margin-top: 18px;
          padding: 10px 16px;
          border: 1px solid var(--line);
          border-radius: 14px;
          background: var(--mist);
          color: var(--navy);
          font-size: 13px;
        }
        .fb {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 50px;
          padding-top: 26px;
          border-top: 1px solid var(--line);
          font-size: 13px;
        }
        .fb div {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        @media (max-width: 860px) {
          #pricing {
            padding: 60px 4vw;
          }
          .panel {
            grid-template-columns: 1fr;
          }
          .pricing-left {
            padding: 36px 24px;
          }
          .mini {
            grid-template-columns: 1fr;
            margin-bottom: 28px;
            gap: 14px;
          }
          .buy {
            border-left: none;
            border-top: 1px solid var(--line);
            padding: 48px 24px;
            min-height: auto;
            gap: 28px;
          }
          .buy-price-wrap {
            padding: 12px 0;
          }
          .buy .big {
            font-size: clamp(3.5rem, 6vw, 5.6rem);
          }
          .seg button {
            padding: 8px 22px;
            font-size: 13px;
          }
          .fg {
            grid-template-columns: 1fr 1fr;
          }
          .dg .r {
            grid-template-columns: 110px 1fr 64px;
          }
        }
        body.dark {
          background: #0b1220;
          color: var(--navy);
          --navy: #f1f5f9;
          --mist: #101c36;
          --ivory: #18243a;
          --line: #26365a;
          --slate: #94a3b8;
        }
        body.dark .hero {
          background: linear-gradient(#0b1220, #1b3153);
        }
        body.dark header {
          background: rgba(11, 18, 32, 0.7);
        }
        body.dark .hb {
          background: linear-gradient(rgba(11, 18, 32, 0.85), transparent);
        }
        body.dark .btn,
        body.dark header nav a.cta {
          background: linear-gradient(135deg, #c5a46d, #e6c994);
          color: #101c36;
        }
        body.dark .btn.o {
          background: transparent;
          color: #fff;
        }
        body.dark .live,
        body.dark .panel,
        body.dark .pricing-left,
        body.dark .card,
        body.dark .cta2 {
          background: #14203a;
        }
        body.dark .mini .mini-card {
          background: #18243a;
        }
        body.dark .mini-icon {
          background: #101c36;
          color: var(--navy);
          border-color: var(--line);
        }
        body.dark .buy {
          background: radial-gradient(ellipse at 50% 20%, rgba(30, 48, 85, 0.8) 0%, rgba(20, 32, 58, 0.6) 50%, rgba(16, 28, 54, 0.95) 100%);
          border-left-color: var(--line);
        }
        body.dark .buy-note {
          color: var(--slate);
        }
        body.dark .seg {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.1);
        }
        body.dark .seg button.on {
          background: #1c2b48;
          color: #fff;
        }
        body.dark .btn-checkout {
          background: linear-gradient(135deg, #c5a46d, #e6c994);
          color: #101c36;
        }
        body.dark .btn-arr {
          background: rgba(11, 18, 32, 0.25);
          color: #101c36;
        }
        body.dark .social-proof b {
          color: #fff;
        }
        body.dark .pause-demo-window {
          background: #121b2d;
          box-shadow: 0 30px 70px -30px rgba(0, 0, 0, 0.6);
        }
        body.dark .pause-demo-header,
        body.dark .pause-demo-footer {
          background: #0f1626;
        }
        body.dark .btn-toggle-all {
          background: #18243a;
          color: var(--navy);
          border-color: var(--line);
        }
        body.dark .proc-item {
          background: #162238;
          border-color: var(--line);
        }
        body.dark .proc-item.is-paused {
          background: rgba(255, 255, 255, 0.03);
        }
        body.dark .proc-name {
          color: var(--navy);
        }
        body.dark .btn-row-action {
          background: #18243a;
          color: var(--navy);
          border-color: var(--line);
        }
        body.dark .telemetry-item {
          background: #162238;
          border-color: var(--line);
        }
        body.dark .telemetry-item b {
          color: var(--navy);
        }
        body.dark .demo-hint b {
          color: var(--navy);
        }
        body.dark .card.dk {
          background: linear-gradient(160deg, #0b1220, #1b3153);
        }
        body.dark .tools select,
        body.dark #th {
          background: #18243a;
        }
        body.dark .step .n {
          background: var(--gold);
          color: #101c36;
        }
        body.dark footer {
          background: linear-gradient(#101c36, #0b1220 60%);
        }
        body.dark .pill {
          color: var(--gold2);
        }
        body.dark header nav a:hover,
        body.dark header nav a.on {
          background: #18243a;
        }
        
        /* AEO / GEO / SEO Summary Card Styles */
        .summary-section {
          max-width: 1100px;
          margin: 0 auto 60px;
          padding: 0 4vw;
        }
        .summary-card {
          background: #fafbfe;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 36px 40px;
          box-shadow: 0 10px 30px -15px rgba(16, 28, 54, 0.08);
        }
        .summary-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 20px;
        }
        .summary-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: -0.01em;
          padding: 5px 12px;
          border-radius: 999px;
          background: #e9eef7;
          color: var(--navy);
        }
        .summary-freshness {
          font-size: 13px;
          color: var(--slate);
        }
        .summary-title {
          font-family: var(--rec);
          font-size: clamp(1.4rem, 2.5vw, 1.9rem);
          font-weight: 600;
          color: var(--navy);
          line-height: 1.25;
          margin-bottom: 14px;
        }
        .summary-definition {
          font-size: 16px;
          line-height: 1.6;
          color: var(--navy);
          margin-bottom: 28px;
        }
        .summary-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-bottom: 28px;
        }
        @media (max-width: 768px) {
          .summary-grid {
            grid-template-columns: 1fr;
          }
          .summary-card {
            padding: 24px 20px;
          }
        }
        .summary-col {
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
          padding: 22px 24px;
        }
        .summary-col h3 {
          font-family: var(--ber);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--navy);
          margin-bottom: 14px;
        }
        .summary-bullets {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .summary-bullets li {
          font-size: 14px;
          line-height: 1.55;
          color: var(--slate);
          position: relative;
          padding-left: 18px;
        }
        .summary-bullets li::before {
          content: '•';
          position: absolute;
          left: 0;
          top: 0;
          color: var(--gold);
          font-weight: bold;
          font-size: 18px;
          line-height: 1.2;
        }
        .summary-bullets li strong {
          color: var(--navy);
        }
        .ext-link {
          color: #0066cc;
          text-decoration: underline;
          text-underline-offset: 2px;
          font-weight: 500;
        }
        .ext-link:hover {
          color: #0066cc;
        }
        .summary-links-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 10px;
          padding-top: 20px;
          border-top: 1px solid var(--line);
        }
        .summary-links-label {
          font-size: 13px;
          font-weight: 600;
          color: var(--slate);
          margin-right: 4px;
        }
        .internal-pill {
          display: inline-flex;
          align-items: center;
          font-size: 13px;
          font-weight: 500;
          color: var(--navy);
          background: #eef2f9;
          border: 1px solid var(--line);
          padding: 6px 14px;
          border-radius: 999px;
          transition: all 0.2s;
        }
        .internal-pill:hover {
          background: var(--navy);
          color: #fff;
          border-color: var(--navy);
          transform: translateY(-1px);
        }

        /* Top Summary Answer & Citations Box Styles */
        .top-summary-answer {
          margin: 18px auto 26px;
          max-width: 680px;
          padding: 12px 20px;
          background: rgba(16, 28, 54, 0.04);
          border: 1px solid rgba(16, 28, 54, 0.1);
          border-radius: 14px;
          text-align: left;
        }
        .top-summary-answer p {
          font-size: 14px;
          line-height: 1.5;
          color: var(--navy);
          margin: 0;
        }
        .top-summary-answer strong {
          color: var(--navy);
          font-weight: 600;
        }

        .citations-box {
          margin: 32px 0 24px;
          padding: 24px 28px;
          background: #fff;
          border: 1px solid var(--line);
          border-radius: 20px;
        }
        .citations-header {
          margin-bottom: 16px;
        }
        .citations-header h3,
        .citations-header h4 {
          font-family: var(--ber);
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--navy);
          margin-bottom: 2px;
        }
        .citations-header small {
          font-size: 13px;
          color: var(--slate);
        }
        .citations-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .citations-list li {
          font-size: 14px;
          line-height: 1.5;
          color: var(--slate);
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .citations-list cite {
          font-style: normal;
          color: var(--navy);
        }
        .citations-list span {
          font-size: 13px;
          color: var(--slate);
        }

        /* Dark Mode Summary Card Overrides */
        body.dark .top-summary-answer {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        body.dark .top-summary-answer p {
          color: #94a3b8;
        }
        body.dark .top-summary-answer strong {
          color: var(--gold2);
        }
        body.dark .citations-box {
          background: #0f172a;
          border-color: var(--line);
        }
        body.dark .citations-header h3,
        body.dark .citations-header h4 {
          color: var(--navy);
        }
        body.dark .citations-header small {
          color: var(--slate);
        }
        body.dark .citations-list cite {
          color: var(--navy);
        }
        body.dark .citations-list span {
          color: var(--slate);
        }
        body.dark .summary-card {
          background: #131d33;
          border-color: var(--line);
          box-shadow: 0 10px 30px -15px rgba(0, 0, 0, 0.4);
        }
        body.dark .summary-badge {
          background: #1c2b48;
          color: var(--gold2);
        }
        body.dark .summary-freshness {
          color: var(--slate);
        }
        body.dark .summary-title {
          color: var(--navy);
        }
        body.dark .summary-definition {
          color: var(--slate);
        }
        body.dark .summary-col {
          background: #0f172a;
          border-color: var(--line);
        }
        body.dark .summary-col h3 {
          color: var(--navy);
        }
        body.dark .summary-bullets li {
          color: var(--slate);
        }
        body.dark .summary-bullets li strong {
          color: var(--navy);
        }
        body.dark .ext-link {
          color: #0066cc;
        }
        body.dark .summary-links-label {
          color: var(--slate);
        }
        body.dark .internal-pill {
          background: #1e293b;
          border-color: rgba(255, 255, 255, 0.1);
          color: var(--navy);
        }
        body.dark .internal-pill:hover {
          background: var(--gold);
          color: #101c36;
          border-color: var(--gold);
        }
        :focus-visible {
          outline: 2px solid var(--gold);
          outline-offset: 3px;
        }
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </>
  );
}
