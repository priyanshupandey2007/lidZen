import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useCurrency } from '../context/CurrencyContext';
import AppleLogo from '../components/AppleLogo';

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
  ['US', 'English', 'en'],
  ['ES', 'Español', 'es'],
  ['FR', 'Français', 'fr'],
  ['DE', 'Deutsch', 'de'],
  ['JP', '日本語', 'ja'],
  ['CN', '简体中文', 'zh'],
];

const TR = [
  {
    cta: 'Get lidZen',
    nav: ['Features', 'Diagnostics', 'Clamshell', 'Pricing', 'Docs', 'Download'],
    h1: ['Your Mac, awake.', 'Lid shut.'],
    hp: 'Clamshell continuity and deep path diagnostics for Mac power users. Keep AI agents, workflows and music alive with the lid shut.',
    see: 'See diagnostics',
    tr: ['No telemetry', '18 MB install', 'macOS 15+ Sequoia'],
    clam: 'Close the lid. Keep the work.',
    feat: 'Made for the lid, built around your battery.',
    diag: 'See what your Mac is really doing.',
    cmp: 'How lidZen Compares to Default macOS, caffeinate & Amphetamine',
    sub: 'A technical side-by-side comparison of background power and sleep management capabilities on macOS 15+ Sequoia.',
    price: 'Pay once. Keep it.',
    dl: 'Reclaim your Mac’s performance today.',
  },
  {
    cta: 'Obtener lidZen',
    nav: ['Funciones', 'Diagnóstico', 'Clamshell', 'Precio', 'Docs', 'Descargar'],
    h1: ['Tu Mac, despierta.', 'Tapa cerrada.'],
    hp: 'Continuidad con la tapa cerrada y diagnóstico profundo de rutas para usuarios avanzados de Mac. Mantén agentes de IA, flujos de trabajo y música activos con la tapa cerrada.',
    see: 'Ver diagnóstico',
    tr: ['Sin telemetría', 'Instalación de 18 MB', 'macOS 15+ Sequoia'],
    clam: 'Cierra la tapa. Conserva el trabajo.',
    feat: 'Hecho para la tapa, pensado para tu batería.',
    diag: 'Mira lo que hace realmente tu Mac.',
    cmp: 'Cómo se compara lidZen con macOS, caffeinate y Amphetamine',
    sub: 'Comparación técnica de la gestión de energía en segundo plano y del reposo en macOS 15+ Sequoia.',
    price: 'Paga una vez. Es tuyo.',
    dl: 'Recupera hoy el rendimiento de tu Mac.',
  },
  {
    cta: 'Obtenir lidZen',
    nav: ['Fonctionnalités', 'Diagnostics', 'Clamshell', 'Tarifs', 'Docs', 'Télécharger'],
    h1: ['Votre Mac, éveillé.', 'Capot fermé.'],
    hp: 'Continuité capot fermé et diagnostics de chemins approfondis pour les utilisateurs avancés de Mac. Gardez agents IA, workflows et musique actifs, capot fermé.',
    see: 'Voir les diagnostics',
    tr: ['Aucune télémétrie', 'Installation de 18 Mo', 'macOS 15+ Sequoia'],
    clam: 'Fermez le capot. Gardez le travail.',
    feat: 'Conçu pour le capot, pensé pour votre batterie.',
    diag: 'Voyez ce que fait vraiment votre Mac.',
    cmp: 'lidZen face à macOS, caffeinate et Amphetamine',
    sub: 'Comparaison technique de la gestion de l’énergie en arrière-plan et de la veille sous macOS 15+ Sequoia.',
    price: 'Payez une fois. Gardez-le.',
    dl: 'Retrouvez dès aujourd’hui les performances de votre Mac.',
  },
  {
    cta: 'lidZen holen',
    nav: ['Funktionen', 'Diagnose', 'Clamshell', 'Preis', 'Doku', 'Download'],
    h1: ['Dein Mac, wach.', 'Deckel zu.'],
    hp: 'Clamshell-Betrieb und tiefe Pfad-Diagnose für Mac-Power-User. Halte KI-Agenten, Workflows und Musik bei geschlossenem Deckel am Laufen.',
    see: 'Diagnose ansehen',
    tr: ['Keine Telemetrie', '18 MB Installation', 'macOS 15+ Sequoia'],
    clam: 'Deckel zu. Arbeit läuft weiter.',
    feat: 'Für den Deckel gemacht, auf den Akku abgestimmt.',
    diag: 'Sieh, was dein Mac wirklich tut.',
    cmp: 'lidZen im Vergleich zu macOS, caffeinate und Amphetamine',
    sub: 'Technischer Vergleich der Hintergrund-Energie- und Ruhezustandsverwaltung unter macOS 15+ Sequoia.',
    price: 'Einmal zahlen. Behalten.',
    dl: 'Hol dir heute die Leistung deines Mac zurück.',
  },
  {
    cta: 'lidZen を入手',
    nav: ['機能', '診断', 'クラムシェル', '料金', 'ドキュメント', 'ダウンロード'],
    h1: ['Macは起きたまま。', 'フタは閉じたまま。'],
    hp: 'Macを使いこなす人のための、クラムシェル継続と詳細なパス診断。フタを閉じてもAIエージェントやワークフロー、音楽を動かし続けます。',
    see: '診断を見る',
    tr: ['テレメトリなし', '18 MBでインストール', 'macOS 15+ Sequoia'],
    clam: 'フタを閉じても、作業は続く。',
    feat: 'フタのために、バッテリーのために。',
    diag: 'Macが本当に何をしているか見える。',
    cmp: 'lidZen と標準 macOS、caffeinate、Amphetamine の比較',
    sub: 'macOS 15+ Sequoia における省電力とスリープ管理機能の技術比較。',
    price: '一度の支払いで、ずっと。',
    dl: '今日からMacの性能を取り戻そう。',
  },
  {
    cta: '获取 lidZen',
    nav: ['功能', '诊断', '合盖模式', '价格', '文档', '下载'],
    h1: ['你的 Mac，保持唤醒。', '合盖也不休眠。'],
    hp: '为 Mac 高级用户打造的合盖持续运行与深度路径诊断。合上盖子，AI 智能体、工作流和音乐依然运行。',
    see: '查看诊断',
    tr: ['无遥测', '18 MB 安装包', 'macOS 15+ Sequoia'],
    clam: '合上盖子，工作继续。',
    feat: '为合盖而生，为电池而设计。',
    diag: '看清你的 Mac 在做什么。',
    cmp: 'lidZen 与默认 macOS、caffeinate、Amphetamine 的对比',
    sub: 'macOS 15+ Sequoia 上后台电源与睡眠管理能力的技术对比。',
    price: '一次付费，永久使用。',
    dl: '今天就找回 Mac 的性能。',
  },
];

export default function Home() {
  const [isReady, setIsReady] = useState(false);
  const [sceneOpen, setSceneOpen] = useState(false);
  const [sceneZoom, setSceneZoom] = useState(false);
  const [sceneStyle, setSceneStyle] = useState<React.CSSProperties>({});
  const [isDark, setIsDark] = useState(false);
  const [currentLang, setCurrentLang] = useState(0);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [langMenuPos, setLangMenuPos] = useState<React.CSSProperties>({});
  const [plan, setPlan] = useState<'One Mac' | 'Two Macs'>('One Mac');
  const [activeNav, setActiveNav] = useState('');
  const [uptime, setUptime] = useState('02:14:37');
  const [isMounted, setIsMounted] = useState(false);
  const isDoneRef = useRef(false);

  const { priceOneMac, priceTwoMacs } = useCurrency();
  const planPrice = plan === 'One Mac' ? priceOneMac : priceTwoMacs;

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

  const finish = () => {
    if (isDoneRef.current) return;
    isDoneRef.current = true;
    setIsReady(true);
    document.body.classList.add('ready');
  };

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
    setTimeout(finish, 1100);
  };

  useEffect(() => {
    setIsMounted(true);

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      finish();
    } else {
      const t1 = setTimeout(() => setSceneOpen(true), 500);
      const t2 = setTimeout(() => {
        if (!isDoneRef.current) zoom();
      }, 4700);
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

  const curTR = TR[currentLang];

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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
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
                <h1 className="m" style={{ '--i': 1 } as any}>
                  Your Mac, awake.
                  <br />
                  <span className="shine">Lid shut.</span>
                </h1>
                <p className="m" style={{ '--i': 2 } as any}>
                  Close the lid. Your Mac keeps working.
                </p>
                <span
                  className="b m"
                  style={
                    {
                      '--i': 3,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45em',
                    } as any
                  }
                >
                  <AppleLogo size="1.05em" style={{ verticalAlign: '-0.08em' }} />
                  Get lidZen · {priceOneMac}
                </span>
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
        <div className="hb"></div>
        <div className={`lm ${langMenuOpen ? 'show' : ''}`} id="lm" role="listbox" style={langMenuPos}>
          {LG.map((l, i) => (
            <button
              key={l[2]}
              className={i === currentLang ? 'on' : ''}
              onClick={() => {
                setCurrentLang(i);
                setLangMenuOpen(false);
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
            {curTR.nav.map((item, idx) => {
              const hash = ['features', 'diagnostics', 'clamshell', 'pricing', 'docs', 'download'][idx];
              return (
                <a
                  key={item}
                  href={`#${hash}`}
                  className={activeNav === item ? 'on' : ''}
                  onClick={() => setActiveNav(item)}
                >
                  {item}
                </a>
              );
            })}
          </nav>
          <div className="tools">
            <button id="lb" aria-haspopup="listbox" onClick={toggleLangMenu}>
              {LG[currentLang][0]} {LG[currentLang][1]}
            </button>
            <button id="th" aria-label="Toggle dark mode" onClick={toggleDark}>
              {isDark ? '☀' : '☾'}
            </button>
          </div>
          <nav>
            <a
              className="cta"
              href="#pricing"
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
              v2.4 · Universal binary for macOS 15+
            </div>
            <h1 className="hp" style={{ '--i': 0 } as any}>
              <span>{curTR.h1[0]}</span>
              <span className="shine">{curTR.h1[1]}</span>
            </h1>
            <p className="hp" style={{ '--i': 1 } as any}>{curTR.hp}</p>

            {/* AEO / AI Overview Immediate Top Summary Answer */}
            <div className="top-summary-answer hp" style={{ '--i': 1 } as any}>
              <p>
                <strong>Top Summary Answer:</strong> <b>lidZen</b> is a lightweight macOS utility (18 MB) that keeps your MacBook awake and running AI agents, local servers, or audio with the lid closed—consuming 0W on the display backlight without requiring an external monitor or wall charger.
              </p>
            </div>

            <div className="row hp" style={{ '--i': 2 } as any}>
              <a
                className="btn"
                href="#pricing"
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
              {curTR.tr.map((text) => (
                <span key={text}>{text}</span>
              ))}
            </div>
            <div className="live hp" style={{ '--i': 3 } as any}>
              <span className="dot"></span>
              <div>
                <b id="up">{uptime}</b>
                <small>Awake with the lid closed</small>
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
                <span className="summary-badge">Direct Answer &amp; Overview</span>
                <span className="summary-freshness">
                  Verified by <b>lidZen Systems Engineering</b> · Tested on macOS 15.2 Sequoia · Last Updated: November 2026
                </span>
              </div>

              <h2 className="summary-title">
                What is lidZen and how does it keep a Mac awake with the lid closed?
              </h2>

              <p className="summary-definition">
                <strong>lidZen</strong> is a specialized macOS utility (18 MB, universal binary for Apple Silicon M1–M4 &amp; Intel) that enables MacBooks to execute continuous background tasks, AI agents, local servers, and audio playback with the laptop lid shut—without requiring an external display or power adapter.
              </p>

              <div className="summary-grid">
                <div className="summary-col">
                  <h3>Key Takeaways</h3>
                  <ul className="summary-bullets">
                    <li>
                      <strong>Zero-Display Power (0W Backlight):</strong> Shuts off the internal Liquid Retina display backlight completely, eliminating screen battery drain and heat generation while keeping the CPU/GPU active.
                    </li>
                    <li>
                      <strong>Native IOKit Assertions:</strong> Uses official Apple userspace power assertions (<a href="https://developer.apple.com/documentation/iokit" target="_blank" rel="noopener noreferrer" className="ext-link">Apple IOKit Power Management API ↗</a>) instead of risky kernel extensions (kexts).
                    </li>
                    <li>
                      <strong>Autonomous Protection:</strong> Built-in Thermal Guard automatically sleeps before overheating, and Battery Guard pauses at your custom percentage threshold.
                    </li>
                  </ul>
                </div>

                <div className="summary-col">
                  <h3>Audience &amp; Supported Use Cases</h3>
                  <ul className="summary-bullets">
                    <li>
                      <strong>Developers &amp; Engineers:</strong> Run Docker containers, Vite dev servers, long builds, and Git workflows with the lid closed on battery.
                    </li>
                    <li>
                      <strong>AI Practitioners:</strong> Execute local Ollama models, Claude Code / Cursor agent loops, and ML training scripts uninterrupted.
                    </li>
                    <li>
                      <strong>Media &amp; Mobile Pros:</strong> Stream audio, render videos, or maintain persistent SSH and remote connections in transit.
                    </li>
                  </ul>
                </div>
              </div>

              {/* GEO / AEO Credible Sources & Official Documentation Citations */}
              <div className="citations-box">
                <div className="citations-header">
                  <h4>Credible Sources &amp; Official Documentation</h4>
                  <small>Technical citations and official Apple developer reference specifications</small>
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
                <span className="summary-links-label">Supporting Guides:</span>
                <Link href="/docs/getting-started" className="internal-pill">
                  Getting Started Guide →
                </Link>
                <Link href="/docs/features" className="internal-pill">
                  Core Features →
                </Link>
                <Link href="/docs/installation" className="internal-pill">
                  Installation Guide →
                </Link>
                <Link href="/docs/faq" className="internal-pill">
                  Docs &amp; Architecture FAQ →
                </Link>
              </div>
            </div>
          </section>

          <section id="clamshell">
            <h2 className="pop">How Do I Keep My Mac Awake with the Lid Closed?</h2>
            <p className="lead pop" style={{ '--i': 1 } as any}>
              Three simple steps to enable headless clamshell mode without an external display or charger:
            </p>
            <div className="steps">
              <div className="step pop" style={{ '--i': 1 } as any}>
                <div className="n">1</div>
                <h3>Switch lidZen on</h3>
                <p>Click the menu bar icon, or let an automated trigger enable it when background tasks begin.</p>
              </div>
              <div className="step pop" style={{ '--i': 2 } as any}>
                <div className="n">2</div>
                <h3>Close the lid</h3>
                <p>The screen turns off completely (0W backlight). Your Mac stays fully awake, executing all threads and network connections.</p>
              </div>
              <div className="step pop" style={{ '--i': 3 } as any}>
                <div className="n">3</div>
                <h3>Open it when you are done</h3>
                <p>lidZen automatically releases its power assertion and your Mac resumes standard macOS sleep behavior.</p>
              </div>
            </div>
          </section>

          <section id="features">
            <h2 className="pop">What Core Features Does lidZen Provide for Mac Power Users?</h2>
            <p className="lead pop" style={{ '--i': 1 } as any}>
              Engineered specifically for closed-lid continuity with zero display draw, intelligent thermal mitigation, and deep diagnostic visibility.
            </p>
            <div className="grid">
              <div className="card dk pop" style={{ '--i': 0 } as any}>
                <h3>Clamshell Continuity</h3>
                <p>Your Mac keeps running when you shut the lid. No external display or keyboard needed.</p>
              </div>
              <div className="card pop" style={{ '--i': 1 } as any}>
                <h3>Thread Suspension</h3>
                <p>Pause the heavy background threads you pick, so your Mac runs cooler and quieter.</p>
              </div>
              <div className="card pop" style={{ '--i': 2 } as any}>
                <h3>Zero-Kext Radar</h3>
                <p>See which kernel extensions are loaded and what each one is doing.</p>
              </div>
              <div className="card pop" style={{ '--i': 3 } as any}>
                <h3>Thermal Guard</h3>
                <p>Watch temperatures with the lid closed, and let your Mac rest before it overheats.</p>
              </div>
              <div className="card pop" style={{ '--i': 4 } as any}>
                <h3>Power Diagnostics</h3>
                <p>Find what is keeping your Mac awake and why your battery drains.</p>
              </div>
              <div className="card dk pop" style={{ '--i': 5 } as any}>
                <h3>Path Tracing</h3>
                <p>Follow a process from launch to the files and ports it touches.</p>
              </div>
            </div>
          </section>

          <section id="diagnostics">
            <h2 className="pop">How Can I Inspect Background Tasks and Freeze Runaway Threads?</h2>
            <p className="lead pop" style={{ '--i': 1 } as any}>
              Live, path-level process attribution with interactive Mach thread suspension (SIGSTOP/SIGCONT) to cool down your Mac immediately.
            </p>
            <div className="dg pop">
              <div className="r">
                Clamshell
                <div className="t">
                  <i style={{ '--v': '92%', '--i': 0 } as any}></i>
                </div>
                <b>Closed</b>
              </div>
              <div className="r">
                Thermal
                <div className="t">
                  <i style={{ '--v': '48%', '--i': 1 } as any}></i>
                </div>
                <b>41 °C</b>
              </div>
              <div className="r">
                Wake blockers
                <div className="t">
                  <i style={{ '--v': '20%', '--i': 2 } as any}></i>
                </div>
                <b>0</b>
              </div>
              <div className="r">
                Idle CPU
                <div className="t">
                  <i style={{ '--v': '12%', '--i': 3 } as any}></i>
                </div>
                <b>0.2%</b>
              </div>
              <div className="r">
                Kernel extensions
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
                    lidZen · Process Inspector &amp; Thread Suspension (Interactive Example)
                  </div>
                  <div className="window-actions">
                    <button
                      type="button"
                      className="btn-toggle-all"
                      onClick={toggleAll}
                    >
                      {activeCount > 0 ? '⏸ Pause All (SIGSTOP)' : '▶ Resume All (SIGCONT)'}
                    </button>
                  </div>
                </div>

                <div className="pause-demo-body">
                  {/* Left Column: Process List */}
                  <div className="proc-list">
                    <div className="proc-list-header">
                      <span>BACKGROUND THREAD</span>
                      <span>CPU LOAD</span>
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
                              {proc.paused ? 'FROZEN' : `${proc.cpu}%`}
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
                              {proc.paused ? '▶ Resume' : '⏸ Pause'}
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
                              <span className="action-label">▶ Resume Process (SIGCONT)</span>
                              <span className="action-sub">Instantly resumes compute with zero data loss</span>
                            </>
                          ) : (
                            <>
                              <span className="action-label">⏸ Pause Process (SIGSTOP)</span>
                              <span className="action-sub">Freezes CPU usage &amp; stops heat immediately</span>
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
              How Does lidZen Compare to macOS Default, caffeinate, and Amphetamine?
            </h2>
            <p className="lead pop" style={{ margin: '16px auto 0', textAlign: 'center' }}>
              Direct Answer: lidZen is the only utility that provides native closed-lid clamshell execution on battery without an external display, turns off the display panel completely (0W backlight), and offers non-destructive thread freezing.
            </p>
            <div className="tw pop">
              <table className="cmp">
                <thead>
                  <tr>
                    <th>Feature / Metric</th>
                    <th className="us">lidZen</th>
                    <th>macOS Default</th>
                    <th>CLI caffeinate</th>
                    <th>Amphetamine</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      Run with Lid Closed
                      <br />
                      (No External Display)
                    </td>
                    <td className="us v ok">✓ Supported natively</td>
                    <td className="v xx">✗ Forces sleep</td>
                    <td className="v xx">✗ Forces sleep</td>
                    <td className="v pt">Requires Display Clamshell</td>
                  </tr>
                  <tr>
                    <td>Display Backlight Power Consumption</td>
                    <td className="us v ok">0W (Display off)</td>
                    <td className="v sl">0W (System asleep)</td>
                    <td className="v pt">Display active (~8W)</td>
                    <td className="v pt">Partial support</td>
                  </tr>
                  <tr>
                    <td>Exact Binary File Path Attribution</td>
                    <td className="us v ok">✓ Full path &amp; PID</td>
                    <td className="v xx">✗ App name only</td>
                    <td className="v xx">✗ None</td>
                    <td className="v xx">✗ None</td>
                  </tr>
                  <tr>
                    <td>
                      Non-Destructive
                      <br />
                      Freeze (SIGSTOP/SIGCONT)
                    </td>
                    <td className="us v ok">✓ Zero data loss</td>
                    <td className="v xx">✗ Force kill only</td>
                    <td className="v xx">✗ None</td>
                    <td className="v xx">✗ None</td>
                  </tr>
                  <tr>
                    <td>Apple Silicon &amp; Intel Universal Binary</td>
                    <td className="us v ok">✓ M1/M2/M3/M4 &amp; Intel</td>
                    <td className="v ok">✓ Native</td>
                    <td className="v ok">✓ Native CLI</td>
                    <td className="v ok">✓ Native</td>
                  </tr>
                  <tr>
                    <td>Kernel Extensions (kexts) &amp; Privacy</td>
                    <td className="us v ok">Zero Kexts · 0 Telemetry</td>
                    <td className="v sl">Apple Diagnostics</td>
                    <td className="v sl">No telemetry</td>
                    <td className="v sl">Zero Kexts</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a className="cl pop" href="#docs">
              Read detailed architecture and diagnostics comparison in the documentation →
            </a>
          </section>

          <section id="pricing">
            <div className="panel pop">
              <div>
                <div className="pricing-eyebrow">PRICING</div>
                <h2>Pay once.<br />Keep it.</h2>
                <p className="lead">No subscription, no tiers. Every feature, on one Mac or two.</p>
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
                    <b>Every feature</b>
                    <p>
                      Clamshell Continuity, Thread Suspension, Zero-Kext Radar, Thermal Guard, Power Diagnostics. Nothing held back.
                    </p>
                  </div>
                  <div className="mini-card">
                    <div className="mini-icon" aria-hidden="true">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18.178 8c5.096 0 5.096 8 0 8-2.688 0-4.408-2.222-6.178-4-1.77-1.778-3.49-4-6.178-4-5.096 0-5.096 8 0 8 2.688 0 4.408-2.222 6.178-4 1.77-1.778 3.49-4 6.178-4z" />
                      </svg>
                    </div>
                    <b>Yours to keep</b>
                    <p>One payment. No subscription, no renewals.</p>
                  </div>
                  <div className="mini-card">
                    <div className="mini-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                      </svg>
                    </div>
                    <b>Free updates</b>
                    <p>Every lidZen 2.x update, installed when you choose.</p>
                  </div>
                  <div className="mini-card">
                    <div className="mini-icon" aria-hidden="true">
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="12" rx="2" />
                        <line x1="2" y1="20" x2="22" y2="20" />
                      </svg>
                    </div>
                    <b>One Mac</b>
                    <p>Moving to a new Mac? Move your license in seconds.</p>
                  </div>
                </div>
              </div>

              <div className="buy">
                <div className="app-squircle" aria-hidden="true">
                  <svg width="84" height="84" viewBox="0 0 100 100">
                    <use href="#lg" />
                  </svg>
                </div>

                <div className="seg">
                  <button
                    type="button"
                    className={plan === 'One Mac' ? 'on' : ''}
                    onClick={() => setPlan('One Mac')}
                  >
                    One Mac
                  </button>
                  <button
                    type="button"
                    className={plan === 'Two Macs' ? 'on' : ''}
                    onClick={() => setPlan('Two Macs')}
                  >
                    Two Macs
                  </button>
                </div>

                <div className="big" id="pr">
                  {planPrice}
                </div>
                <small>one-time purchase, plus tax where it applies</small>

                <a
                  className="btn-checkout"
                  id="bb"
                  href="#download"
                >
                  <AppleLogo size={18} style={{ verticalAlign: '-1px' }} />
                  <span>{curTR.cta} · {planPrice}</span>
                  <span className="btn-arr">→</span>
                </a>

                <div className="social-proof">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                  <span>Join <b>1,200+</b> people who bought lidZen</span>
                </div>

                <p className="fine-print">
                  Sales are final, so try lidZen free for 2 days first. Secure checkout by Dodo Payments. By buying you agree to the Terms and Refund Policy.
                </p>
              </div>

              <div className="dl">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1f9d5c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                  </svg>
                  Notarized by Apple
                </span>
                <span>
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  18 MB download
                </span>
                <span>
                  <AppleLogo size={15} style={{ verticalAlign: '-1px' }} />
                  macOS 15 or later
                </span>
              </div>
            </div>
          </section>

          <section id="faq">
            <h2 className="pop">Frequently Asked Questions About Closed-Lid Clamshell Mode</h2>
            <p className="lead pop" style={{ margin: '0 auto 36px', textAlign: 'center' }}>
              Concise answers to high-intent questions about macOS power assertions, battery consumption, and thermal safety.
            </p>
            <div className="faq pop">
              <details open>
                <summary>What is lidZen and how does it keep a Mac awake with the lid closed?</summary>
                <p>
                  lidZen is an Apple-notarized macOS utility that issues targeted userspace power assertions via the official Apple IOKit Power Management API. It bypasses default macOS sleep triggers when the lid shuts, keeping AI workflows, local dev servers, and music active while turning off the internal screen backlight to draw 0W display power.
                </p>
              </details>
              <details>
                <summary>Will my Mac overheat when running in a bag with the lid closed?</summary>
                <p>
                  lidZen includes an automated Thermal Guard that continuously reads Apple Silicon SoC temperature sensors. If temperatures exceed user-configured limits, it safely allows macOS to enter normal sleep. For active compute workloads, keeping the MacBook in an unzipped sleeve or on a desk is recommended.
                </p>
              </details>
              <details>
                <summary>Does running with the lid closed drain the MacBook battery?</summary>
                <p>
                  Because lidZen turns off the Liquid Retina display backlight completely, it saves approximately 8W compared to keeping the screen on. In addition, Battery Guard automatically halts execution if the battery drops to your chosen threshold (e.g. 20%), preventing unexpected battery depletion.
                </p>
              </details>
              <details>
                <summary>Do I need an external display or power adapter connected?</summary>
                <p>
                  No. macOS standard clamshell mode requires both an external display and AC power. lidZen eliminates both restrictions, allowing true headless clamshell continuity on battery power wherever you are.
                </p>
              </details>
              <details>
                <summary>How do I turn lidZen off or restore default sleep?</summary>
                <p>
                  Simply open your MacBook lid, or click the menu bar icon. lidZen immediately releases its power assertion and your Mac resumes its default energy saver sleep timer.
                </p>
              </details>
            </div>
          </section>

          <section id="download">
            <div className="cta2 pop">
              <div className="pill">v2.4 · Universal binary for macOS 15+</div>
              <h2>{curTR.dl}</h2>
              <p className="lead">
                Join thousands of power users running cooler, quieter Macs with the lid closed and full path-level
                visibility.
              </p>
              <a
                className="btn"
                href="#pricing"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <AppleLogo size={16} style={{ verticalAlign: '-1px' }} />
                {curTR.cta} · {planPrice}
              </a>
              <div className="trust">
                <span>No telemetry</span>
                <span>18 MB install</span>
                <span>macOS 15+ Sequoia</span>
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
              </div>
              <div>
                <h4>Product</h4>
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
                <h4>Documentation</h4>
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
                <h4>Resources</h4>
                <ul>
                  <li>
                    <Link href="/docs/settings">Settings &amp; Config</Link>
                  </li>
                  <li>
                    <a href="#diagnostics">Process Diagnostics</a>
                  </li>
                  <li>
                    <Link href="/docs/faq">FAQ</Link>
                  </li>
                  <li>
                    <Link href="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link href="/terms">Terms &amp; Conditions</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="fb">
              <span>© 2026 lidZen. All rights reserved.</span>
              <div>
                <span>Zero telemetry</span>
                <span>18 MB Universal binary</span>
                <span>0.2% Idle CPU</span>
              </div>
            </div>
          </div>
        </footer>
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
        body:not(.ready) {
          overflow: hidden;
          height: 100vh;
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
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 34px -12px rgba(16, 28, 54, 0.7);
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
          border-radius: 2% 2% 5% 5%/2% 2% 4% 4%;
          background: linear-gradient(#eceef2, #cdd1d9);
          box-shadow: 0 50px 90px -10px rgba(16, 28, 54, 0.4), inset 0 0 0 1px #fff;
        }
        .base:before {
          content: '';
          position: absolute;
          inset: 8% 6% 32%;
          border-radius: 6px;
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
          border-radius: 2.2%/3.4%;
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
          border-radius: 1.2%;
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
          border-radius: 0 0 1.2cqw 1.2cqw;
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
          border-radius: 99px;
          background: #ffffffcc;
          font-size: 1.9cqw;
          white-space: nowrap;
        }
        .mh svg {
          width: 4cqw;
          height: 4cqw;
        }
        .mh b {
          font-family: var(--rec);
        }
        .disp h1 {
          font-size: 10.5cqw;
          margin-top: 4cqw;
        }
        .disp p {
          font-size: 2.3cqw;
          color: var(--slate);
          margin: 2cqw 0 3cqw;
        }
        .disp .b {
          font-size: 2.3cqw;
          padding: 1.3cqw 3.4cqw;
          border-radius: 99px;
          background: linear-gradient(135deg, var(--navy), var(--navy2));
          color: #fff;
        }
        .skip {
          position: fixed;
          bottom: calc(22px + env(safe-area-inset-bottom, 0px));
          left: 50%;
          transform: translateX(-50%);
          z-index: 60;
          font: 500 14px var(--ber);
          color: var(--slate);
          border: 1px solid var(--line);
          border-radius: 99px;
          padding: 8px 18px;
          cursor: pointer;
          background: #fff;
        }
        .ready .skip {
          display: none;
        }

        /* ===== Site ===== */
        .site {
          opacity: 0;
          transition: opacity 0.9s 0.2s;
        }
        .ready .site {
          opacity: 1;
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
          font-size: 13.5px;
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
          font-size: 19px;
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
          border-radius: 99px;
          border: 1px solid transparent;
          font-size: 14.5px;
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
          opacity: 0;
        }
        .ready .hp {
          animation: pop 1s cubic-bezier(0.2, 0.9, 0.3, 1.1) both;
          animation-delay: calc(0.3s + var(--i) * 0.15s);
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
          border-radius: 22px;
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
          border-radius: 6px;
          padding: 2px;
        }
        .bat i {
          display: block;
          height: 100%;
          width: 72%;
          border-radius: 2px;
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
          font-size: 1.1rem;
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
          border-radius: 28px;
          background: var(--ivory);
        }
        .step h3 {
          font-size: 1.5rem;
          margin: 14px 0 8px;
        }
        .step p {
          color: var(--slate);
        }
        .step .n {
          width: 42px;
          height: 42px;
          border-radius: 50%;
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
          border-radius: 26px;
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
          font-size: 1.4rem;
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
          color: #b8c2d6;
        }
        .tw {
          overflow-x: auto;
          margin-top: 50px;
          border: 1px solid var(--line);
          border-radius: 26px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
          font-size: 15.5px;
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
          font-size: 1.15rem;
          font-weight: 600;
        }
        th.us,
        td.us {
          background: var(--ivory);
          font-weight: 600;
        }
        .y {
          color: #1f9d5c;
        }
        .n0 {
          color: #b0b6c3;
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
          font-size: 3.4rem;
          font-weight: 600;
          margin: 12px 0;
        }
        .price .big small {
          font-size: 1rem;
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
          font-size: 1.3rem;
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
          font-size: 1.6rem;
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
          font: 500 13px var(--ber);
          color: inherit;
          background: #f1f3f7;
          border: 1px solid var(--line);
          border-radius: 99px;
          padding: 7px 14px;
          cursor: pointer;
        }
        #th {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--line);
          background: #f1f3f7;
          color: inherit;
          cursor: pointer;
          font-size: 16px;
          display: grid;
          place-items: center;
        }
        #lb {
          font: 500 13px var(--ber);
          color: inherit;
          background: #f1f3f7;
          border: 1px solid var(--line);
          border-radius: 99px;
          padding: 7px 14px;
          cursor: pointer;
          white-space: nowrap;
        }
        .lm {
          position: fixed;
          z-index: 30;
          display: none;
          min-width: 210px;
          padding: 8px;
          border-radius: 18px;
          background: #fff;
          border: 1px solid var(--line);
          box-shadow: 0 24px 60px -20px rgba(16, 28, 54, 0.35);
        }
        .lm.show {
          display: block;
        }
        .lm button {
          display: flex;
          align-items: center;
          gap: 12px;
          width: 100%;
          border: 0;
          background: none;
          color: var(--navy);
          font: 500 15px var(--ber);
          padding: 10px 12px;
          border-radius: 12px;
          cursor: pointer;
        }
        .lm button:hover,
        .lm button.on {
          background: var(--mist);
        }
        .lm i {
          font: 600 12px ui-monospace, Menlo, monospace;
          font-style: normal;
          width: 30px;
          height: 30px;
          border-radius: 50%;
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
          font-size: 1rem;
          font-weight: 600;
        }
        .cmp th.us,
        .cmp td.us {
          background: #eaf7f0;
        }
        .cmp th.us {
          color: #1f9d5c;
        }
        body.dark .cmp th.us,
        body.dark .cmp td.us {
          background: #12303a;
        }
        .v {
          font: 13.5px/1.4 ui-monospace, SFMono-Regular, Menlo, monospace;
        }
        .ok {
          color: #1f9d5c;
          font-weight: 600;
        }
        .xx {
          color: #c0394b;
        }
        .pt {
          color: #a8672a;
        }
        .sl {
          color: var(--slate);
        }
        .cl {
          display: block;
          text-align: center;
          margin-top: 26px;
          color: #1f9d5c;
          font: 14px ui-monospace, Menlo, monospace;
        }
        .pill {
          display: inline-block;
          padding: 7px 16px;
          border-radius: 99px;
          border: 1px solid var(--gold);
          background: var(--ivory);
          color: #8a6d3b;
          font-size: 13.5px;
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
          border-radius: 28px;
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
          font-size: 14.5px;
          color: #b8c2d6;
        }
        .dg .t {
          height: 8px;
          border-radius: 9px;
          background: #ffffff1a;
          overflow: hidden;
        }
        .dg .t i {
          display: block;
          height: 100%;
          width: var(--v);
          border-radius: 9px;
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
          border-radius: 24px;
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
          border-radius: 50%;
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
          font: 600 12px var(--ber);
          padding: 6px 14px;
          border-radius: 99px;
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
          font: 600 11px ui-monospace, Menlo, monospace;
          color: var(--slate);
          letter-spacing: 0.05em;
          padding: 0 4px 6px;
        }
        .proc-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          border-radius: 14px;
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
          border-color: #2f7bff;
          box-shadow: 0 0 0 3px rgba(47, 123, 255, 0.15);
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
          border-radius: 50%;
          flex-shrink: 0;
        }
        .led-running {
          background: #22c55e;
          box-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
        }
        .led-paused {
          background: #f59e0b;
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
          font: 11px ui-monospace, Menlo, monospace;
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
          border-radius: 6px;
        }
        .badge-running {
          background: rgba(34, 197, 94, 0.12);
          color: #16a34a;
        }
        .badge-paused {
          background: rgba(245, 158, 11, 0.12);
          color: #d97706;
        }
        .btn-row-action {
          border: 1px solid var(--line);
          background: #fff;
          font: 600 11.5px var(--ber);
          padding: 5px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .btn-row-action.btn-pause {
          color: #b45309;
        }
        .btn-row-action.btn-resume {
          color: #15803d;
          border-color: rgba(34, 197, 94, 0.4);
          background: rgba(34, 197, 94, 0.08);
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
          font: 600 11px ui-monospace, Menlo, monospace;
          letter-spacing: 0.1em;
          color: var(--gold);
        }
        .inspector-title {
          font-family: var(--rec);
          font-size: 1.4rem;
          margin: 0;
          line-height: 1.15;
        }
        .inspector-path {
          font: 11.5px ui-monospace, Menlo, monospace;
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
          color: #d97706;
        }
        .inspector-meter {
          height: 8px;
          border-radius: 99px;
          background: rgba(0, 0, 0, 0.06);
          overflow: hidden;
        }
        .inspector-meter-fill {
          height: 100%;
          border-radius: 99px;
          transition: width 0.3s ease;
        }
        .inspector-actions {
          margin: 10px 0 6px;
        }
        .btn-main-suspend {
          width: 100%;
          border: none;
          border-radius: 14px;
          padding: 14px 18px;
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
          font: 700 15px var(--ber);
        }
        .action-sub {
          font-size: 11.5px;
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
          border-radius: 10px;
          background: var(--ivory);
          border: 1px solid var(--line);
        }
        .telemetry-item small {
          display: block;
          font-size: 11px;
          color: var(--slate);
          text-transform: uppercase;
        }
        .telemetry-item b {
          font-size: 15px;
          color: var(--navy);
          font-variant-numeric: tabular-nums;
        }
        .pause-demo-footer {
          padding: 12px 20px;
          border-top: 1px solid var(--line);
          background: rgba(0, 0, 0, 0.02);
          font-size: 12.5px;
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
        .pricing-eyebrow {
          font-size: 13px;
          font-weight: 600;
          color: var(--slate);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          margin-bottom: 12px;
        }
        .panel {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 40px;
          padding: 48px;
          border-radius: 36px;
          border: 1px solid var(--line);
          background: #fff;
          box-shadow: 0 40px 90px -50px rgba(16, 28, 54, 0.5);
        }
        .panel h2 {
          font-size: clamp(2.6rem, 5.5vw, 4.2rem);
          line-height: 1.04;
        }
        .panel .lead {
          color: var(--slate);
          margin-top: 14px;
          font-size: 1.1rem;
        }
        .mini {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-top: 36px;
        }
        .mini .mini-card {
          padding: 22px;
          border-radius: 20px;
          border: 1px solid var(--line);
          background: var(--ivory);
          text-align: left;
        }
        .mini-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
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
          font-size: 1.15rem;
          display: block;
          margin-bottom: 6px;
        }
        .mini p {
          color: var(--slate);
          font-size: 13.5px;
          line-height: 1.5;
        }
        .buy {
          text-align: center;
          padding: 40px 32px;
          border-radius: 28px;
          border: 1px solid var(--line);
          background: radial-gradient(ellipse at 50% 12%, rgba(230, 238, 255, 0.7), rgba(245, 240, 255, 0.4) 60%, rgba(255, 255, 255, 0.95));
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .app-squircle {
          width: 82px;
          height: 82px;
          border-radius: 22px;
          box-shadow: 0 16px 36px -10px rgba(76, 155, 255, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.8) inset;
          margin-bottom: 22px;
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
          padding: 4px;
          border-radius: 99px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: rgba(0, 0, 0, 0.04);
          margin-bottom: 20px;
        }
        .seg button {
          border: 0;
          background: none;
          font: 600 14px var(--ber);
          padding: 8px 24px;
          border-radius: 99px;
          cursor: pointer;
          color: var(--slate);
          transition: all 0.2s;
        }
        .seg button.on {
          background: #fff;
          color: var(--navy);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
        }
        .buy .big {
          font-family: var(--rec);
          font-size: 4.4rem;
          font-weight: 700;
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .buy small {
          display: block;
          color: var(--slate);
          font-size: 13.5px;
          margin: 10px 0 24px;
        }
        .btn-checkout {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: 100%;
          max-width: 320px;
          padding: 14px 24px;
          border-radius: 999px;
          background: #0d0d12;
          color: #fff;
          font: 600 15.5px var(--ber);
          box-shadow: 0 10px 24px -8px rgba(0, 0, 0, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
          border: none;
          text-decoration: none;
        }
        .btn-checkout:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px -6px rgba(0, 0, 0, 0.5);
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
        }
        .social-proof {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          font-size: 13.5px;
          color: var(--slate);
          margin: 18px 0 12px;
        }
        .social-proof b {
          color: var(--navy);
        }
        .fine-print {
          font-size: 11.5px;
          line-height: 1.5;
          color: var(--slate);
          max-width: 330px;
          margin: 0 auto;
          opacity: 0.85;
        }
        .dl {
          display: flex;
          gap: 32px;
          flex-wrap: wrap;
          justify-content: flex-start;
          padding-top: 26px;
          border-top: 1px solid var(--line);
          grid-column: 1 / -1;
          color: var(--slate);
          font-size: 13.5px;
        }
        .dl span {
          display: inline-flex;
          align-items: center;
          gap: 7px;
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
          font-size: 1.1rem;
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
          font-size: 13.5px;
        }
        .fb {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
          margin-top: 50px;
          padding-top: 26px;
          border-top: 1px solid var(--line);
          font-size: 13.5px;
        }
        .fb div {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        @media (max-width: 860px) {
          .panel {
            grid-template-columns: 1fr;
            padding: 26px;
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
          color: #e8ecf5;
          --navy: #e8ecf5;
          --mist: #101c36;
          --ivory: #18243a;
          --line: #26365a;
          --slate: #b8c2d6;
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
          color: #0b1220;
        }
        body.dark .btn.o {
          background: transparent;
          color: #fff;
        }
        body.dark .live,
        body.dark .panel,
        body.dark .card,
        body.dark .cta2 {
          background: #14203a;
        }
        body.dark .mini .mini-card {
          background: #18243a;
        }
        body.dark .mini-icon {
          background: #101c36;
          color: #e8ecf5;
          border-color: var(--line);
        }
        body.dark .buy {
          background: radial-gradient(ellipse at 50% 12%, rgba(30, 48, 85, 0.8), rgba(20, 32, 58, 0.6) 60%, rgba(16, 28, 54, 0.95));
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
          color: #0b1220;
        }
        body.dark .btn-arr {
          background: rgba(11, 18, 32, 0.25);
          color: #0b1220;
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
          color: #e8ecf5;
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
          color: #e8ecf5;
        }
        body.dark .btn-row-action {
          background: #18243a;
          color: #e8ecf5;
          border-color: var(--line);
        }
        body.dark .telemetry-item {
          background: #162238;
          border-color: var(--line);
        }
        body.dark .telemetry-item b {
          color: #e8ecf5;
        }
        body.dark .demo-hint b {
          color: #e8ecf5;
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
          color: #0b1220;
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
          border-radius: 28px;
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
          text-transform: uppercase;
          letter-spacing: 0.06em;
          padding: 5px 12px;
          border-radius: 99px;
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
          font-size: 16.5px;
          line-height: 1.6;
          color: #2b354f;
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
          border-radius: 18px;
          padding: 22px 24px;
        }
        .summary-col h3 {
          font-family: var(--ber);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
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
          color: #404b66;
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
          color: #004499;
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
          font-size: 13.5px;
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
          border-radius: 99px;
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
          color: #2b354f;
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
        .citations-header h4 {
          font-family: var(--ber);
          font-size: 14px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--navy);
          margin-bottom: 2px;
        }
        .citations-header small {
          font-size: 12.5px;
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
          font-size: 13.5px;
          line-height: 1.5;
          color: #475569;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .citations-list cite {
          font-style: normal;
          color: var(--navy);
        }
        .citations-list span {
          font-size: 12.5px;
          color: var(--slate);
        }

        /* Dark Mode Summary Card Overrides */
        body.dark .top-summary-answer {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.1);
        }
        body.dark .top-summary-answer p {
          color: #cbd5e1;
        }
        body.dark .top-summary-answer strong {
          color: var(--gold2);
        }
        body.dark .citations-box {
          background: #0f172a;
          border-color: var(--line);
        }
        body.dark .citations-header h4 {
          color: #f1f5f9;
        }
        body.dark .citations-header small {
          color: #94a3b8;
        }
        body.dark .citations-list cite {
          color: #f1f5f9;
        }
        body.dark .citations-list span {
          color: #94a3b8;
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
          color: #94a3b8;
        }
        body.dark .summary-title {
          color: #f1f5f9;
        }
        body.dark .summary-definition {
          color: #cbd5e1;
        }
        body.dark .summary-col {
          background: #0f172a;
          border-color: var(--line);
        }
        body.dark .summary-col h3 {
          color: #f1f5f9;
        }
        body.dark .summary-bullets li {
          color: #94a3b8;
        }
        body.dark .summary-bullets li strong {
          color: #f1f5f9;
        }
        body.dark .ext-link {
          color: #60a5fa;
        }
        body.dark .summary-links-label {
          color: #94a3b8;
        }
        body.dark .internal-pill {
          background: #1e293b;
          border-color: rgba(255, 255, 255, 0.1);
          color: #f1f5f9;
        }
        body.dark .internal-pill:hover {
          background: var(--gold);
          color: #0b1220;
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
