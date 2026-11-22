export interface TranslationSchema {
  nav: {
    features: string;
    diagnostics: string;
    clamshell: string;
    pricing: string;
    docs: string;
    download: string;
  };
  cta: string;
  see: string;
  hero: {
    pill: string;
    h1: [string, string];
    hp: string;
    topAnswerLabel: string;
    topAnswerBody: string;
    tr: [string, string, string];
    uptimeLabel: string;
  };
  summary: {
    badge: string;
    freshness: string;
    title: string;
    definition: string;
    takeawaysTitle: string;
    takeaway1Title: string;
    takeaway1Body: string;
    takeaway2Title: string;
    takeaway2Body: string;
    takeaway3Title: string;
    takeaway3Body: string;
    audienceTitle: string;
    audience1Title: string;
    audience1Body: string;
    audience2Title: string;
    audience2Body: string;
    audience3Title: string;
    audience3Body: string;
    citationsTitle: string;
    citationsSub: string;
    supportingGuides: string;
    guides: [string, string, string, string];
  };
  clamshell: {
    title: string;
    lead: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  features: {
    title: string;
    lead: string;
    f1Title: string;
    f1Desc: string;
    f2Title: string;
    f2Desc: string;
    f3Title: string;
    f3Desc: string;
    f4Title: string;
    f4Desc: string;
    f5Title: string;
    f5Desc: string;
    f6Title: string;
    f6Desc: string;
  };
  diagnostics: {
    title: string;
    lead: string;
    clamshell: string;
    closed: string;
    thermal: string;
    wakeBlockers: string;
    idleCpu: string;
    kexts: string;
    windowTitle: string;
    pauseAll: string;
    resumeAll: string;
    bgThread: string;
    cpuLoad: string;
    frozen: string;
    pauseBtn: string;
    resumeBtn: string;
    detailTitle: string;
    detailSub: string;
  };
  compare: {
    title: string;
    lead: string;
    colFeature: string;
    colLidzen: string;
    colMacos: string;
    colCaff: string;
    colAmph: string;
    row1Title: string;
    row1Lidzen: string;
    row1Macos: string;
    row1Caff: string;
    row1Amph: string;
    row2Title: string;
    row2Lidzen: string;
    row2Macos: string;
    row2Caff: string;
    row2Amph: string;
    row3Title: string;
    row3Lidzen: string;
    row3Macos: string;
    row3None: string;
    row4Title: string;
    row4Lidzen: string;
    row4Macos: string;
    row5Title: string;
    row5Lidzen: string;
    row5Native: string;
    row5NativeCli: string;
    row6Title: string;
    row6Lidzen: string;
    row6AppleDiag: string;
    row6NoTelem: string;
    row6ZeroKexts: string;
    docsLink: string;
  };
  pricing: {
    eyebrow: string;
    titleLine1: string;
    titleLine2: string;
    lead: string;
    c1Title: string;
    c1Desc: string;
    c2Title: string;
    c2Desc: string;
    c3Title: string;
    c3Desc: string;
    c4Title: string;
    c4Desc: string;
    gatekeeper: string;
    downloadSize: string;
    osVersion: string;
    planOne: string;
    planTwo: string;
    oneTimeNote: string;
  };
  faq: {
    title: string;
    lead: string;
    items: Array<{ q: string; a: string }>;
  };
  download: {
    pill: string;
    title: string;
    lead: string;
  };
  footer: {
    rights: string;
    privacy: string;
    terms: string;
    grievance: string;
    faq: string;
    trademark: string;
  };
}

export const TR_DATA: Record<string, TranslationSchema> = {
  en: {
    nav: {
      features: 'Features',
      diagnostics: 'Diagnostics',
      clamshell: 'Clamshell',
      pricing: 'Pricing',
      docs: 'Docs',
      download: 'Download',
    },
    cta: 'Get lidZen',
    see: 'See diagnostics',
    hero: {
      pill: 'v2.4 · Universal binary for macOS 15+',
      h1: ['Your Mac, awake.', 'Lid shut.'],
      hp: 'Clamshell continuity and deep path diagnostics for Mac power users. Keep AI agents, workflows and music alive with the lid shut.',
      topAnswerLabel: 'Top Summary Answer:',
      topAnswerBody:
        'lidZen is a lightweight macOS utility (18 MB) that keeps your MacBook awake and running AI agents, local servers, or audio with the lid closed—consuming 0W on the display backlight without requiring an external monitor or wall charger.',
      tr: ['No telemetry', '18 MB install', 'macOS 15+ Sequoia'],
      uptimeLabel: 'Awake with the lid closed',
    },
    summary: {
      badge: 'Direct Answer & Overview',
      freshness: 'Verified by lidZen Systems Engineering · Tested on macOS 15.2 Sequoia · Last Updated: November 2026',
      title: 'What is lidZen and how does it keep a Mac awake with the lid closed?',
      definition:
        'lidZen is a specialized macOS utility (18 MB, universal binary for Apple Silicon M1–M4 & Intel) that enables MacBooks to execute continuous background tasks, AI agents, local servers, and audio playback with the laptop lid shut—without requiring an external display or power adapter.',
      takeawaysTitle: 'Key Takeaways',
      takeaway1Title: 'Zero-Display Power (0W Backlight):',
      takeaway1Body: 'Shuts off the internal Liquid Retina display backlight completely, eliminating screen battery drain and heat generation while keeping the CPU/GPU active.',
      takeaway2Title: 'Native IOKit Assertions:',
      takeaway2Body: 'Uses official Apple userspace power assertions (Apple IOKit Power Management API) instead of risky kernel extensions (kexts).',
      takeaway3Title: 'Autonomous Protection:',
      takeaway3Body: 'Built-in Thermal Guard automatically sleeps before overheating, and Battery Guard pauses at your custom percentage threshold.',
      audienceTitle: 'Audience & Supported Use Cases',
      audience1Title: 'Developers & Engineers:',
      audience1Body: 'Run Docker containers, Vite dev servers, long builds, and Git workflows with the lid closed on battery.',
      audience2Title: 'AI Practitioners:',
      audience2Body: 'Execute local Ollama models, Claude Code / Cursor agent loops, and ML training scripts uninterrupted.',
      audience3Title: 'Media & Mobile Pros:',
      audience3Body: 'Stream audio, render videos, or maintain persistent SSH and remote connections in transit.',
      citationsTitle: 'Credible Sources & Official Documentation',
      citationsSub: 'Technical citations and official Apple developer reference specifications',
      supportingGuides: 'Supporting Guides:',
      guides: ['Getting Started Guide →', 'Core Features →', 'Installation Guide →', 'Docs & Architecture FAQ →'],
    },
    clamshell: {
      title: 'How Do I Keep My Mac Awake with the Lid Closed?',
      lead: 'Three simple steps to enable headless clamshell mode without an external display or charger:',
      step1Title: 'Switch lidZen on',
      step1Desc: 'Click the menu bar icon, or let an automated trigger enable it when background tasks begin.',
      step2Title: 'Close the lid',
      step2Desc: 'The screen turns off completely (0W backlight). Your Mac stays fully awake, executing all threads and network connections.',
      step3Title: 'Open it when you are done',
      step3Desc: 'lidZen automatically releases its power assertion and your Mac resumes standard macOS sleep behavior.',
    },
    features: {
      title: 'What Core Features Does lidZen Provide for Mac Power Users?',
      lead: 'Engineered specifically for closed-lid continuity with zero display draw, intelligent thermal mitigation, and deep diagnostic visibility.',
      f1Title: 'Clamshell Continuity',
      f1Desc: 'Your Mac keeps running when you shut the lid. No external display or keyboard needed.',
      f2Title: 'Thread Suspension',
      f2Desc: 'Pause the heavy background threads you pick, so your Mac runs cooler and quieter.',
      f3Title: 'Zero-Kext Radar',
      f3Desc: 'See which kernel extensions are loaded and what each one is doing.',
      f4Title: 'Thermal Guard',
      f4Desc: 'Watch temperatures with the lid closed, and let your Mac rest before it overheats.',
      f5Title: 'Power Diagnostics',
      f5Desc: 'Find what is keeping your Mac awake and why your battery drains.',
      f6Title: 'Path Tracing',
      f6Desc: 'Follow a process from launch to the files and ports it touches.',
    },
    diagnostics: {
      title: 'How Can I Inspect Background Tasks and Freeze Runaway Threads?',
      lead: 'Live, path-level process attribution with interactive Mach thread suspension (SIGSTOP/SIGCONT) to cool down your Mac immediately.',
      clamshell: 'Clamshell',
      closed: 'Closed',
      thermal: 'Thermal',
      wakeBlockers: 'Wake blockers',
      idleCpu: 'Idle CPU',
      kexts: 'Kernel extensions',
      windowTitle: 'lidZen · Process Inspector & Thread Suspension (Interactive Example)',
      pauseAll: '⏸ Pause All (SIGSTOP)',
      resumeAll: '▶ Resume All (SIGCONT)',
      bgThread: 'Background Thread',
      cpuLoad: 'CPU Load',
      frozen: 'FROZEN',
      pauseBtn: '⏸ Pause',
      resumeBtn: '▶ Resume',
      detailTitle: 'Live Thread Attribution & Signal Control',
      detailSub: 'Non-destructive Mach task suspension sends SIGSTOP signals to halt runaway CPU threads instantly without killing the process or corrupting open file handles.',
    },
    compare: {
      title: 'How Does lidZen Compare to macOS Default, caffeinate, and Amphetamine?',
      lead: 'Direct Answer: lidZen is the only utility that provides native closed-lid clamshell execution on battery without an external display, turns off the display panel completely (0W backlight), and offers non-destructive thread freezing.',
      colFeature: 'Feature / Metric',
      colLidzen: 'lidZen',
      colMacos: 'macOS Default',
      colCaff: 'CLI caffeinate',
      colAmph: 'Amphetamine',
      row1Title: 'Run with Lid Closed (No External Display)',
      row1Lidzen: '✓ Supported natively',
      row1Macos: '✗ Forces sleep',
      row1Caff: '✗ Forces sleep',
      row1Amph: 'Requires Display Clamshell',
      row2Title: 'Display Backlight Power Consumption',
      row2Lidzen: '0W (Display off)',
      row2Macos: '0W (System asleep)',
      row2Caff: 'Display active (~8W)',
      row2Amph: 'Partial support',
      row3Title: 'Exact Binary File Path Attribution',
      row3Lidzen: '✓ Full path & PID',
      row3Macos: '✗ App name only',
      row3None: '✗ None',
      row4Title: 'Non-Destructive Freeze (SIGSTOP/SIGCONT)',
      row4Lidzen: '✓ Zero data loss',
      row4Macos: '✗ Force kill only',
      row5Title: 'Apple Silicon & Intel Universal Binary',
      row5Lidzen: '✓ M1/M2/M3/M4 & Intel',
      row5Native: '✓ Native',
      row5NativeCli: '✓ Native CLI',
      row6Title: 'Kernel Extensions (kexts) & Privacy',
      row6Lidzen: 'Zero Kexts · 0 Telemetry',
      row6AppleDiag: 'Apple Diagnostics',
      row6NoTelem: 'No telemetry',
      row6ZeroKexts: 'Zero Kexts',
      docsLink: 'Read detailed architecture and diagnostics comparison in the documentation →',
    },
    pricing: {
      eyebrow: 'PRICING',
      titleLine1: 'Pay once.',
      titleLine2: 'Keep it.',
      lead: 'No subscription, no tiers. Every feature, on one Mac or two.',
      c1Title: 'Every feature',
      c1Desc: 'Continuity, Thread Suspension, Radar, Thermal Guard, Diagnostics. Nothing held back.',
      c2Title: 'Yours to keep',
      c2Desc: 'One payment. No subscription, no renewals.',
      c3Title: 'Free updates',
      c3Desc: 'Every lidZen 2.x update, installed when you choose.',
      c4Title: 'One Mac',
      c4Desc: 'Moving to a new Mac? Move the license in seconds.',
      gatekeeper: 'Gatekeeper Ready',
      downloadSize: '18 MB download',
      osVersion: 'macOS 15 or later',
      planOne: 'One Mac',
      planTwo: 'Two Macs',
      oneTimeNote: 'one-time purchase, plus tax where it applies',
    },
    faq: {
      title: 'Frequently Asked Questions About Closed-Lid Clamshell Mode',
      lead: 'Concise answers to high-intent questions about macOS power assertions, battery consumption, and thermal safety.',
      items: [
        {
          q: 'What is lidZen and how does it keep a Mac awake with the lid closed?',
          a: 'lidZen is a native macOS utility that issues targeted userspace power assertions via the official Apple IOKit Power Management API. It bypasses default macOS sleep triggers when the lid shuts, keeping AI workflows, local dev servers, and music active while turning off the internal screen backlight to draw 0W display power.',
        },
        {
          q: 'Will my Mac overheat when running in a bag with the lid closed?',
          a: 'lidZen includes an automated Thermal Guard that continuously reads Apple Silicon SoC temperature sensors. If temperatures exceed user-configured limits, it safely allows macOS to enter normal sleep. For active compute workloads, keeping the MacBook in an unzipped sleeve or on a desk is recommended.',
        },
        {
          q: 'Does running with the lid closed drain the MacBook battery?',
          a: 'Because lidZen turns off the Liquid Retina display backlight completely, it saves approximately 8W compared to keeping the screen on. In addition, Battery Guard automatically halts execution if the battery drops to your chosen threshold (e.g. 20%), preventing unexpected battery depletion.',
        },
        {
          q: 'Do I need an external display or power adapter connected?',
          a: 'No. macOS standard clamshell mode requires both an external display and AC power. lidZen eliminates both restrictions, allowing true headless clamshell continuity on battery power wherever you are.',
        },
        {
          q: 'How do I turn lidZen off or restore default sleep?',
          a: 'Simply open your MacBook lid, or click the menu bar icon. lidZen immediately releases its power assertion and your Mac resumes its default energy saver sleep timer.',
        },
      ],
    },
    download: {
      pill: 'v2.4 · Universal binary for macOS 15+',
      title: 'Reclaim your Mac’s performance today.',
      lead: 'Join thousands of power users running cooler, quieter Macs with the lid closed and full path-level visibility.',
    },
    footer: {
      rights: 'lidZen Systems. All rights reserved.',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      grievance: 'Grievance Officer',
      faq: 'FAQ',
      trademark: 'Apple, Mac, MacBook, MacBook Pro, MacBook Air, macOS, and Sequoia are trademarks of Apple Inc., registered in the U.S. and other countries.',
    },
  },
  es: {
    nav: {
      features: 'Funciones',
      diagnostics: 'Diagnóstico',
      clamshell: 'Clamshell',
      pricing: 'Precios',
      docs: 'Documentación',
      download: 'Descargar',
    },
    cta: 'Obtener lidZen',
    see: 'Ver diagnóstico',
    hero: {
      pill: 'v2.4 · Binario universal para macOS 15+',
      h1: ['Tu Mac, despierta.', 'Tapa cerrada.'],
      hp: 'Continuidad con la tapa cerrada y diagnóstico profundo de rutas para usuarios avanzados de Mac. Mantén agentes de IA, flujos de trabajo y música activos con la tapa cerrada.',
      topAnswerLabel: 'Respuesta Resumen Principal:',
      topAnswerBody:
        'lidZen es una utilidad ligera para macOS (18 MB) que mantiene tu MacBook despierto ejecutando agentes de IA, servidores locales o audio con la tapa cerrada, consumiendo 0 W en la retroiluminación sin necesidad de monitor externo ni cargador.',
      tr: ['Sin telemetría', 'Instalación de 18 MB', 'macOS 15+ Sequoia'],
      uptimeLabel: 'Despierto con la tapa cerrada',
    },
    summary: {
      badge: 'Respuesta Directa y Resumen',
      freshness: 'Verificado por lidZen Systems Engineering · Probado en macOS 15.2 Sequoia · Actualizado: Noviembre 2026',
      title: '¿Qué es lidZen y cómo mantiene un Mac despierto con la tapa cerrada?',
      definition:
        'lidZen es una utilidad especializada de macOS (18 MB, binario universal para Apple Silicon M1–M4 e Intel) que permite a los MacBooks ejecutar tareas en segundo plano continuas, agentes de IA, servidores locales y reproducción de audio con la tapa cerrada, sin necesidad de pantalla externa ni adaptador de corriente.',
      takeawaysTitle: 'Puntos Clave',
      takeaway1Title: 'Consumo de Pantalla Cero (Retroiluminación 0W):',
      takeaway1Body: 'Apaga por completo la retroiluminación Liquid Retina, eliminando el consumo de batería y el calor de la pantalla mientras la CPU/GPU permanece activa.',
      takeaway2Title: 'Aserciones Nativas IOKit:',
      takeaway2Body: 'Utiliza las aserciones de energía oficiales de Apple en espacio de usuario (API IOKit) en lugar de extensiones de kernel (kexts) riesgosas.',
      takeaway3Title: 'Protección Autónoma:',
      takeaway3Body: 'Protección térmica integrada que activa el reposo antes de sobrecalentarse, y Battery Guard que pausa al umbral de batería configurado.',
      audienceTitle: 'Casos de Uso y Audiencia',
      audience1Title: 'Desarrolladores e Ingenieros:',
      audience1Body: 'Ejecuta contenedores Docker, servidores Vite, compilaciones y flujos de Git con la tapa cerrada en batería.',
      audience2Title: 'Profesionales de IA:',
      audience2Body: 'Ejecuta modelos locales Ollama, bucles de agentes Claude Code / Cursor y entrenamientos de ML sin interrupciones.',
      audience3Title: 'Profesionales Multimedia y Móviles:',
      audience3Body: 'Transmite audio, renderiza videos o mantén sesiones SSH y remotas activas mientras te trasladas.',
      citationsTitle: 'Fuentes Confiables y Documentación Oficial',
      citationsSub: 'Citas técnicas y especificaciones de referencia para desarrolladores de Apple',
      supportingGuides: 'Guías de Apoyo:',
      guides: ['Guía de Inicio →', 'Funciones Principales →', 'Guía de Instalación →', 'Preguntas Frecuentes →'],
    },
    clamshell: {
      title: '¿Cómo mantengo mi Mac despierto con la tapa cerrada?',
      lead: 'Tres sencillos pasos para activar el modo clamshell sin pantalla externa ni cargador:',
      step1Title: '1. Activa lidZen',
      step1Desc: 'Haz clic en el icono de la barra de menús o deja que un disparador automático lo active al iniciar tareas en segundo plano.',
      step2Title: '2. Cierra la tapa',
      step2Desc: 'La pantalla se apaga por completo (0W de luz). Tu Mac permanece totalmente despierto, procesando hilos y conexiones de red.',
      step3Title: '3. Ábrelo cuando termines',
      step3Desc: 'lidZen libera automáticamente la aserción de energía y tu Mac reanuda el comportamiento de reposo estándar de macOS.',
    },
    features: {
      title: '¿Qué funciones principales ofrece lidZen para usuarios avanzados?',
      lead: 'Diseñado específicamente para la continuidad con la tapa cerrada, cero consumo de pantalla, control térmico inteligente y diagnósticos profundos.',
      f1Title: 'Continuidad Clamshell',
      f1Desc: 'Tu Mac sigue funcionando cuando cierras la tapa. Sin pantalla externa ni teclado adicional.',
      f2Title: 'Suspensión de Hilos',
      f2Desc: 'Pausa los procesos pesados en segundo plano que elijas para que tu Mac funcione más fresco y silencioso.',
      f3Title: 'Radar Cero Kexts',
      f3Desc: 'Visualiza qué extensiones del sistema están activas y qué recursos consume cada una.',
      f4Title: 'Thermal Guard',
      f4Desc: 'Monitorea temperaturas con la tapa cerrada y permite que tu Mac descanse antes de sobrecalentarse.',
      f5Title: 'Diagnóstico Energético',
      f5Desc: 'Descubre qué procesos impiden el reposo de tu Mac y consumen tu batería.',
      f6Title: 'Rastreo de Rutas',
      f6Desc: 'Rastrea un proceso desde su inicio hasta los archivos binarios y puertos que utiliza.',
    },
    diagnostics: {
      title: '¿Cómo inspeccionar tareas en segundo plano y pausar procesos desbocados?',
      lead: 'Atribución de procesos a nivel de ruta en vivo con suspensión interactiva de hilos Mach (SIGSTOP/SIGCONT) para enfriar tu Mac de inmediato.',
      clamshell: 'Clamshell',
      closed: 'Cerrado',
      thermal: 'Térmico',
      wakeBlockers: 'Bloqueadores de reposo',
      idleCpu: 'CPU en reposo',
      kexts: 'Extensiones de kernel',
      windowTitle: 'lidZen · Inspector de Procesos y Suspensión de Hilos (Ejemplo Interactivo)',
      pauseAll: '⏸ Pausar Todo (SIGSTOP)',
      resumeAll: '▶ Reanudar Todo (SIGCONT)',
      bgThread: 'Hilo en segundo plano',
      cpuLoad: 'Carga de CPU',
      frozen: 'CONGELADO',
      pauseBtn: '⏸ Pausar',
      resumeBtn: '▶ Reanudar',
      detailTitle: 'Atribución de Hilos y Control de Señales en Vivo',
      detailSub: 'La suspensión no destructiva envía señales SIGSTOP para detener hilos desbocados al instante sin forzar el cierre ni dañar archivos abiertos.',
    },
    compare: {
      title: '¿Cómo se compara lidZen con macOS por defecto, caffeinate y Amphetamine?',
      lead: 'Respuesta Directa: lidZen es la única utilidad que ofrece ejecución clamshell nativa con tapa cerrada en batería sin pantalla externa, apaga la pantalla por completo (0W) y permite congelar hilos de forma no destructiva.',
      colFeature: 'Función / Métrica',
      colLidzen: 'lidZen',
      colMacos: 'macOS por Defecto',
      colCaff: 'CLI caffeinate',
      colAmph: 'Amphetamine',
      row1Title: 'Funcionar con Tapa Cerrada (Sin Pantalla Externa)',
      row1Lidzen: '✓ Soportado nativamente',
      row1Macos: '✗ Fuerza el reposo',
      row1Caff: '✗ Fuerza el reposo',
      row1Amph: 'Requiere Clamshell con Pantalla',
      row2Title: 'Consumo de Retroiluminación de Pantalla',
      row2Lidzen: '0W (Pantalla apagada)',
      row2Macos: '0W (Sistema en reposo)',
      row2Caff: 'Pantalla activa (~8W)',
      row2Amph: 'Soporte parcial',
      row3Title: 'Atribución de Ruta Exacta del Binario',
      row3Lidzen: '✓ Ruta completa y PID',
      row3Macos: '✗ Solo nombre de la app',
      row3None: '✗ Ninguna',
      row4Title: 'Congelamiento No Destructivo (SIGSTOP/SIGCONT)',
      row4Lidzen: '✓ Cero pérdida de datos',
      row4Macos: '✗ Solo cierre forzoso',
      row5Title: 'Binario Universal Apple Silicon e Intel',
      row5Lidzen: '✓ M1/M2/M3/M4 e Intel',
      row5Native: '✓ Nativo',
      row5NativeCli: '✓ CLI nativo',
      row6Title: 'Extensiones de Kernel (kexts) y Privacidad',
      row6Lidzen: 'Cero Kexts · 0 Telemetría',
      row6AppleDiag: 'Diagnósticos de Apple',
      row6NoTelem: 'Sin telemetría',
      row6ZeroKexts: 'Cero Kexts',
      docsLink: 'Lee la comparativa técnica detallada en la documentación →',
    },
    pricing: {
      eyebrow: 'PRECIOS',
      titleLine1: 'Paga una vez.',
      titleLine2: 'Consérvalo siempre.',
      lead: 'Sin suscripciones, sin niveles ocultos. Todas las funciones, para uno o dos Mac.',
      c1Title: 'Todas las funciones',
      c1Desc: 'Continuidad, Suspensión de Hilos, Radar, Thermal Guard y Diagnósticos completos.',
      c2Title: 'Tuyo para siempre',
      c2Desc: 'Un único pago. Sin suscripciones ni renovaciones periódicas.',
      c3Title: 'Actualizaciones gratuitas',
      c3Desc: 'Todas las actualizaciones de lidZen 2.x, instaladas cuando tú elijas.',
      c4Title: 'Licencia transferible',
      c4Desc: '¿Cambias a un nuevo Mac? Transfiere tu licencia en cuestión de segundos.',
      gatekeeper: 'Listo para Gatekeeper',
      downloadSize: 'Descarga de 18 MB',
      osVersion: 'macOS 15 o posterior',
      planOne: 'Un Mac',
      planTwo: 'Dos Macs',
      oneTimeNote: 'pago único, impuestos incluidos donde aplique',
    },
    faq: {
      title: 'Preguntas Frecuentes sobre el Modo Clamshell con Tapa Cerrada',
      lead: 'Respuestas claras a las dudas más comunes sobre consumo de batería, seguridad térmica y aserciones en macOS.',
      items: [
        {
          q: '¿Qué es lidZen y cómo mantiene un Mac despierto con la tapa cerrada?',
          a: 'lidZen es una utilidad nativa de macOS que emite aserciones de energía mediante la API oficial IOKit de Apple. Evita la suspensión por defecto al cerrar la tapa, manteniendo activos modelos de IA, servidores locales y música mientras apaga la pantalla por completo (0W).',
        },
        {
          q: '¿Se sobrecalentará mi Mac al estar en una mochila con la tapa cerrada?',
          a: 'lidZen incluye Thermal Guard, que monitorea constantemente los sensores del SoC Apple Silicon. Si la temperatura excede los límites seguros, permite que macOS entre en reposo. Para cargas de trabajo pesadas, se recomienda mantener el MacBook sobre un escritorio o funda abierta.',
        },
        {
          q: '¿Usar el Mac con la tapa cerrada agota la batería?',
          a: 'Al apagar por completo la retroiluminación Liquid Retina, lidZen ahorra unos 8W en comparación con tener la pantalla encendida. Además, Battery Guard detiene la ejecución si la batería alcanza tu umbral preferido (ej. 20%), evitando descargas inesperadas.',
        },
        {
          q: '¿Necesito tener un monitor externo o cargador conectado?',
          a: 'No. El modo clamshell nativo de macOS exige pantalla externa y cargador conectado. lidZen elimina ambas limitaciones, permitiendo una verdadera continuidad con batería dondequiera que estés.',
        },
        {
          q: '¿Cómo desactivo lidZen o restauro el reposo habitual?',
          a: 'Simplemente abre la tapa de tu MacBook o haz clic en el icono de la barra de menús. lidZen libera al instante la aserción y tu Mac reanuda sus temporizadores estándar de reposo.',
        },
      ],
    },
    download: {
      pill: 'v2.4 · Binario universal para macOS 15+',
      title: 'Recupera el rendimiento de tu Mac hoy mismo.',
      lead: 'Únete a miles de usuarios avanzados que disfrutan de Macs más frescos y silenciosos con la tapa cerrada.',
    },
    footer: {
      rights: 'lidZen Systems. Todos los derechos reservados.',
      privacy: 'Política de Privacidad',
      terms: 'Términos de Servicio',
      grievance: 'Responsable de Reclamaciones',
      faq: 'Preguntas Frecuentes',
      trademark: 'Apple, Mac, MacBook, MacBook Pro, MacBook Air, macOS y Sequoia son marcas comerciales de Apple Inc., registradas en EE.UU. y otros países.',
    },
  },
  fr: {
    nav: {
      features: 'Fonctionnalités',
      diagnostics: 'Diagnostics',
      clamshell: 'Clamshell',
      pricing: 'Tarifs',
      docs: 'Documentation',
      download: 'Télécharger',
    },
    cta: 'Obtenir lidZen',
    see: 'Voir les diagnostics',
    hero: {
      pill: 'v2.4 · Binaire universel pour macOS 15+',
      h1: ['Votre Mac, éveillé.', 'Capot fermé.'],
      hp: 'Continuité capot fermé et diagnostics de chemins approfondis pour les utilisateurs avancés de Mac. Gardez agents IA, workflows et musique actifs, capot fermé.',
      topAnswerLabel: 'Réponse Résumée Principale :',
      topAnswerBody:
        'lidZen est un utilitaire léger pour macOS (18 Mo) qui maintient votre MacBook actif pour exécuter agents IA, serveurs locaux ou audio avec le capot fermé, consommant 0 W sur le rétroéclairage sans écran externe ni chargeur.',
      tr: ['Aucune télémétrie', 'Installation de 18 Mo', 'macOS 15+ Sequoia'],
      uptimeLabel: 'Éveillé avec le capot fermé',
    },
    summary: {
      badge: 'Réponse Directe & Vue d\'Ensemble',
      freshness: 'Vérifié par lidZen Systems Engineering · Testé sur macOS 15.2 Sequoia · Mis à jour : Novembre 2026',
      title: 'Qu\'est-ce que lidZen et comment maintient-il un Mac éveillé capot fermé ?',
      definition:
        'lidZen est un utilitaire macOS spécialisé (18 Mo, binaire universel pour Apple Silicon M1–M4 et Intel) qui permet aux MacBooks d\'exécuter des tâches en arrière-plan ininterrompues, des agents IA, des serveurs locaux et de la musique capot fermé, sans écran externe ni adaptateur secteur.',
      takeawaysTitle: 'Points Essentiels',
      takeaway1Title: 'Consommation d\'Écran Nulle (Rétroéclairage 0W) :',
      takeaway1Body: 'Éteint totalement le rétroéclairage Liquid Retina interne, supprimant la consommation de batterie et la chaleur tout en maintenant le CPU/GPU actif.',
      takeaway2Title: 'Assertions Natives IOKit :',
      takeaway2Body: 'Utilise les assertions d\'alimentation officielles d\'Apple en espace utilisateur (API Apple IOKit) au lieu d\'extensions de noyau risquées (kexts).',
      takeaway3Title: 'Protection Autonome :',
      takeaway3Body: 'Protection thermique intégrée qui met le Mac en veille avant toute surchauffe, et Battery Guard qui suspend selon votre seuil de batterie.',
      audienceTitle: 'Cas d\'Usage & Public Cible',
      audience1Title: 'Développeurs & Ingénieurs :',
      audience1Body: 'Exécutez conteneurs Docker, serveurs Vite, compilations lourdes et flux Git sur batterie avec le capot fermé.',
      audience2Title: 'Praticiens de l\'IA :',
      audience2Body: 'Exécutez modèles locaux Ollama, boucles d\'agents Claude Code / Cursor et scripts d\'entraînement ML sans coupure.',
      audience3Title: 'Pros des Médias & Nomades :',
      audience3Body: 'Diffusez de la musique, effectuez des rendus vidéo ou conservez vos sessions SSH lors de vos déplacements.',
      citationsTitle: 'Sources Fiables & Documentation Officielle',
      citationsSub: 'Citations techniques et spécifications de référence Apple Developer',
      supportingGuides: 'Guides Associés :',
      guides: ['Guide de Démarrage →', 'Fonctionnalités Clés →', 'Guide d\'Installation →', 'FAQ Technique →'],
    },
    clamshell: {
      title: 'Comment garder mon Mac éveillé avec le capot fermé ?',
      lead: 'Trois étapes simples pour activer le mode clamshell sans écran externe ni chargeur :',
      step1Title: '1. Activez lidZen',
      step1Desc: 'Cliquez sur l\'icône de la barre des menus ou laissez un déclencheur automatique l\'activer au lancement de tâches lourdes.',
      step2Title: '2. Fermez le capot',
      step2Desc: 'L\'écran s\'éteint complètement (0W). Votre Mac reste totalement éveillé, exécutant tous ses calculs et connexions réseau.',
      step3Title: '3. Ouvrez quand vous avez terminé',
      step3Desc: 'lidZen libère automatiquement son assertion d\'alimentation et votre Mac reprend son comportement de veille standard.',
    },
    features: {
      title: 'Quelles fonctionnalités clés lidZen offre-t-il aux experts Mac ?',
      lead: 'Conçu sur mesure pour la continuité capot fermé avec consommation d\'écran nulle, gestion thermique intelligente et diagnostic approfondi.',
      f1Title: 'Continuité Clamshell',
      f1Desc: 'Votre Mac continue de fonctionner capot fermé. Aucun écran externe ni clavier requis.',
      f2Title: 'Suspension de Threads',
      f2Desc: 'Mettez en pause les processus d\'arrière-plan de votre choix pour un Mac plus frais et silencieux.',
      f3Title: 'Radar Zéro Kext',
      f3Desc: 'Voyez quelles extensions de noyau sont chargées et ce que chacune consomme.',
      f4Title: 'Thermal Guard',
      f4Desc: 'Surveillez la température capot fermé et laissez votre Mac souffler avant toute surchauffe.',
      f5Title: 'Diagnostic Énergie',
      f5Desc: 'Identifiez avec certitude ce qui empêche votre Mac de dormir et vide votre batterie.',
      f6Title: 'Traçage de Chemins',
      f6Desc: 'Suivez un processus depuis son lancement jusqu\'aux fichiers et ports réseau ouverts.',
    },
    diagnostics: {
      title: 'Comment inspecter les tâches de fond et geler les processus bloquants ?',
      lead: 'Attribution précise des processus par chemin en direct avec suspension interactive des threads Mach (SIGSTOP/SIGCONT) pour refroidir immédiatement votre Mac.',
      clamshell: 'Clamshell',
      closed: 'Fermé',
      thermal: 'Thermique',
      wakeBlockers: 'Bloqueurs de veille',
      idleCpu: 'CPU inactif',
      kexts: 'Extensions de noyau',
      windowTitle: 'lidZen · Inspecteur de Processus & Suspension de Threads (Exemple Interactif)',
      pauseAll: '⏸ Tout suspendre (SIGSTOP)',
      resumeAll: '▶ Tout reprendre (SIGCONT)',
      bgThread: 'Processus en arrière-plan',
      cpuLoad: 'Charge CPU',
      frozen: 'GELÉ',
      pauseBtn: '⏸ Suspendre',
      resumeBtn: '▶ Reprendre',
      detailTitle: 'Attribution en Direct et Contrôle des Signaux',
      detailSub: 'La suspension Mach non destructrice envoie des signaux SIGSTOP pour interrompre les processus gourmands sans forcer la fermeture ni corrompre les fichiers.',
    },
    compare: {
      title: 'Comment lidZen se compare-t-il à macOS, caffeinate et Amphetamine ?',
      lead: 'Réponse Directe : lidZen est le seul utilitaire offrant une exécution clamshell native sur batterie sans écran externe, éteignant l\'écran à 0W et proposant le gel de threads non destructif.',
      colFeature: 'Fonctionnalité / Métrique',
      colLidzen: 'lidZen',
      colMacos: 'macOS par Défaut',
      colCaff: 'CLI caffeinate',
      colAmph: 'Amphetamine',
      row1Title: 'Fonctionnement Capot Fermé (Sans Écran Externe)',
      row1Lidzen: '✓ Supporté nativement',
      row1Macos: '✗ Veille forcée',
      row1Caff: '✗ Veille forcée',
      row1Amph: 'Nécessite Clamshell avec Écran',
      row2Title: 'Consommation Rétroéclairage Écran',
      row2Lidzen: '0W (Écran éteint)',
      row2Macos: '0W (Système en veille)',
      row2Caff: 'Écran actif (~8W)',
      row2Amph: 'Support partiel',
      row3Title: 'Attribution Précise du Chemin Binaire',
      row3Lidzen: '✓ Chemin complet & PID',
      row3Macos: '✗ Nom de l\'app seulement',
      row3None: '✗ Aucun',
      row4Title: 'Gel Non Destructif (SIGSTOP/SIGCONT)',
      row4Lidzen: '✓ Zéro perte de données',
      row4Macos: '✗ Arrêt forcé seulement',
      row5Title: 'Binaire Universel Apple Silicon & Intel',
      row5Lidzen: '✓ M1/M2/M3/M4 & Intel',
      row5Native: '✓ Natif',
      row5NativeCli: '✓ CLI natif',
      row6Title: 'Extensions de Noyau (kexts) & Confidentialité',
      row6Lidzen: 'Zéro Kext · 0 Télémétrie',
      row6AppleDiag: 'Diagnostics Apple',
      row6NoTelem: 'Aucune télémétrie',
      row6ZeroKexts: 'Zéro Kext',
      docsLink: 'Consultez la comparaison détaillée dans la documentation →',
    },
    pricing: {
      eyebrow: 'TARIFS',
      titleLine1: 'Payez une fois.',
      titleLine2: 'Gardez-le à vie.',
      lead: 'Aucun abonnement, aucun palier caché. Toutes les fonctionnalités pour un ou deux Mac.',
      c1Title: 'Toutes les fonctionnalités',
      c1Desc: 'Continuité, Suspension de Threads, Radar, Thermal Guard et Diagnostics complets.',
      c2Title: 'À vous pour toujours',
      c2Desc: 'Un paiement unique. Aucun abonnement ni renouvellement périodique.',
      c3Title: 'Mises à jour gratuites',
      c3Desc: 'Toutes les mises à jour lidZen 2.x incluses, installées quand vous le voulez.',
      c4Title: 'Licence transférable',
      c4Desc: 'Nouveau Mac ? Déplacez votre licence en quelques secondes.',
      gatekeeper: 'Compatible Gatekeeper',
      downloadSize: 'Téléchargement de 18 Mo',
      osVersion: 'macOS 15 ou ultérieur',
      planOne: 'Un Mac',
      planTwo: 'Deux Macs',
      oneTimeNote: 'achat unique, taxes incluses si applicables',
    },
    faq: {
      title: 'Foire Aux Questions sur le Mode Clamshell Capot Fermé',
      lead: 'Des réponses claires sur la consommation de batterie, la sécurité thermique et les assertions sous macOS.',
      items: [
        {
          q: 'Qu\'est-ce que lidZen et comment maintient-il un Mac éveillé capot fermé ?',
          a: 'lidZen est un utilitaire macOS natif qui utilise l\'API officielle Apple IOKit. Il contourne la mise en veille automatique lors de la fermeture du capot, permettant à vos serveurs locaux, scripts IA et musiques de continuer tout en éteignant l\'écran pour économiser 0W.',
        },
        {
          q: 'Mon Mac risque-t-il de surchauffer dans un sac avec le capot fermé ?',
          a: 'lidZen intègre Thermal Guard, qui surveille en continu la température du processeur Apple Silicon. Si la chaleur dépasse le seuil défini, le Mac se met automatiquement en veille sécurisée. Pour les calculs intensifs, nous recommandons de laisser le Mac sur un bureau.',
        },
        {
          q: 'Faire tourner le Mac capot fermé vide-t-il rapidement la batterie ?',
          a: 'En coupant totalement le rétroéclairage de l\'écran Liquid Retina, lidZen économise environ 8W par rapport à un écran allumé. De plus, Battery Guard suspend l\'activité si la batterie tombe sous le seuil choisi (ex: 20%).',
        },
        {
          q: 'Dois-je brancher un écran externe ou un chargeur secteur ?',
          a: 'Non. Le mode clamshell officiel d\'Apple requiert un écran et une alimentation secteur. lidZen lève ces deux contraintes pour vous offrir une vraie liberté sur batterie en déplacement.',
        },
        {
          q: 'Comment désactiver lidZen ou retrouver la veille normale ?',
          a: 'Ouvrez simplement le capot de votre Mac ou cliquez sur l\'icône de la barre des menus. lidZen relâche immédiatement son assertion d\'alimentation et macOS reprend ses cycles habituels.',
        },
      ],
    },
    download: {
      pill: 'v2.4 · Binaire universel pour macOS 15+',
      title: 'Retrouvez dès aujourd\'hui les performances de votre Mac.',
      lead: 'Rejoignez des milliers d\'utilisateurs exigeants avec un Mac plus frais et silencieux, capot fermé.',
    },
    footer: {
      rights: 'lidZen Systems. Tous droits réservés.',
      privacy: 'Politique de Confidentialité',
      terms: 'Conditions d\'Utilisation',
      grievance: 'Délégué aux Réclamations',
      faq: 'FAQ',
      trademark: 'Apple, Mac, MacBook, MacBook Pro, MacBook Air, macOS et Sequoia sont des marques déposées d\'Apple Inc. aux États-Unis et dans d\'autres pays.',
    },
  },
  de: {
    nav: {
      features: 'Funktionen',
      diagnostics: 'Diagnose',
      clamshell: 'Clamshell',
      pricing: 'Preise',
      docs: 'Dokumentation',
      download: 'Download',
    },
    cta: 'lidZen holen',
    see: 'Diagnose ansehen',
    hero: {
      pill: 'v2.4 · Universal-Binary für macOS 15+',
      h1: ['Dein Mac, wach.', 'Deckel zu.'],
      hp: 'Clamshell-Betrieb und tiefe Pfad-Diagnose für Mac-Power-User. Halte KI-Agenten, Workflows und Musik bei geschlossenem Deckel am Laufen.',
      topAnswerLabel: 'Wichtigste Kurzantwort:',
      topAnswerBody:
        'lidZen ist ein schlankes macOS-Dienstprogramm (18 MB), das dein MacBook bei geschlossenem Deckel wach hält, um KI-Agenten, lokale Server oder Audio auszuführen – bei 0 W Bildschirmverbrauch und ohne externen Monitor oder Netzteil.',
      tr: ['Keine Telemetrie', '18 MB Installation', 'macOS 15+ Sequoia'],
      uptimeLabel: 'Wach bei geschlossenem Deckel',
    },
    summary: {
      badge: 'Direkte Antwort & Überblick',
      freshness: 'Verifiziert durch lidZen Systems Engineering · Getestet auf macOS 15.2 Sequoia · Aktualisiert: November 2026',
      title: 'Was ist lidZen und wie hält es einen Mac bei geschlossenem Deckel wach?',
      definition:
        'lidZen ist ein spezialisiertes macOS-Tool (18 MB, universelle Binärdatei für Apple Silicon M1–M4 und Intel), mit dem MacBooks Hintergrundaufgaben, KI-Workflows, lokale Entwicklerserver und Audiowiedergabe bei geschlossenem Deckel ohne externen Monitor oder Stromanschluss ausführen können.',
      takeawaysTitle: 'Die wichtigsten Erkenntnisse',
      takeaway1Title: 'Null Bildschirmstrom (0W Display):',
      takeaway1Body: 'Schaltet die Liquid Retina Hintergrundbeleuchtung komplett ab, spart Akku und verhindert Displaywärme, während CPU und GPU aktiv bleiben.',
      takeaway2Title: 'Native Apple IOKit Assertions:',
      takeaway2Body: 'Nutzt offizielle Apple Userspace Power Assertions (IOKit API) statt riskanter Kernel-Erweiterungen (kexts).',
      takeaway3Title: 'Autonomer Schutz:',
      takeaway3Body: 'Integrierter Thermal Guard schützt vor Überhitzung; Battery Guard pausiert automatisch bei frei gewähltem Akkustand.',
      audienceTitle: 'Zielgruppen & Anwendungsbereiche',
      audience1Title: 'Entwickler & Engineers:',
      audience1Body: 'Führe Docker-Container, Vite-Server, Builds und Git-Pipelines mobil mit geschlossenem Deckel aus.',
      audience2Title: 'KI-Anwender:',
      audience2Body: 'Lass lokale Ollama-Modelle, Claude Code / Cursor Loops und ML-Trainings ohne Unterbrechung durchlaufen.',
      audience3Title: 'Kreative & Reisende:',
      audience3Body: 'Audio streamen, Videos rendern oder stabile SSH- und Remote-Verbindungen unterwegs aufrechterhalten.',
      citationsTitle: 'Geprüfte Quellen & Offizielle Dokumentation',
      citationsSub: 'Technische Referenzen und Spezifikationen von Apple Developer',
      supportingGuides: 'Weiterführende Anleitungen:',
      guides: ['Erste Schritte →', 'Kernfunktionen →', 'Installationsanleitung →', 'Architektur & FAQ →'],
    },
    clamshell: {
      title: 'Wie halte ich meinen Mac bei geschlossenem Deckel wach?',
      lead: 'Drei einfache Schritte zum echten Clamshell-Modus ohne externen Monitor oder Ladegerät:',
      step1Title: '1. lidZen aktivieren',
      step1Desc: 'Klicke auf das Symbol in der Menüleiste oder lasse es automatisch bei Hintergrundaufgaben starten.',
      step2Title: '2. Deckel schließen',
      step2Desc: 'Das Display schaltet sich komplett aus (0W). Dein Mac bleibt voll aktiv und führt alle Prozesse und Netzwerkverbindungen weiter.',
      step3Title: '3. Nach getaner Arbeit öffnen',
      step3Desc: 'lidZen gibt die Power Assertion frei und dein Mac kehrt zum gewohnten Ruhezustand zurück.',
    },
    features: {
      title: 'Welche Kernfunktionen bietet lidZen für Mac-Power-User?',
      lead: 'Maßgeschneidert für geschlossenen Betrieb mit 0W Bildschirmverbrauch, intelligenter Temperaturüberwachung und tiefer Pfad-Diagnose.',
      f1Title: 'Clamshell-Kontinuität',
      f1Desc: 'Dein Mac läuft weiter, wenn du den Deckel schließt – ohne externen Monitor oder Tastatur.',
      f2Title: 'Thread-Aussetzung',
      f2Desc: 'Pausiere gezielt ressourcenhungrige Hintergrundprozesse, damit dein Mac kühler und leiser bleibt.',
      f3Title: 'Zero-Kext Radar',
      f3Desc: 'Sieh sofort, welche Kernel-Erweiterungen aktiv sind und wie viele Ressourcen sie beanspruchen.',
      f4Title: 'Thermal Guard',
      f4Desc: 'Überwache Temperaturen bei geschlossenem Deckel und lass deinen Mac abkühlen, bevor er überhitzt.',
      f5Title: 'Power-Diagnose',
      f5Desc: 'Finde genau heraus, welche Prozesse den Ruhezustand blockieren und den Akku leeren.',
      f6Title: 'Pfad-Rückverfolgung',
      f6Desc: 'Verfolge einen Prozess vom Start bis zu den geöffneten Systemdateien und Ports.',
    },
    diagnostics: {
      title: 'Hintergrundprozesse analysieren und Ausreißer sicher anhalten',
      lead: 'Echtzeit-Attribution auf Binärpfad-Ebene mit interaktiver Mach-Thread-Aussetzung (SIGSTOP/SIGCONT) zum sofortigen Abkühlen deines Mac.',
      clamshell: 'Clamshell',
      closed: 'Geschlossen',
      thermal: 'Temperatur',
      wakeBlockers: 'Ruhe-Blocker',
      idleCpu: 'Leerlauf-CPU',
      kexts: 'Kernel-Erweiterungen',
      windowTitle: 'lidZen · Prozess-Inspektor & Thread-Aussetzung (Interaktives Beispiel)',
      pauseAll: '⏸ Alle pausieren (SIGSTOP)',
      resumeAll: '▶ Alle fortsetzen (SIGCONT)',
      bgThread: 'Hintergrund-Thread',
      cpuLoad: 'CPU-Last',
      frozen: 'EINGEFROREN',
      pauseBtn: '⏸ Pausieren',
      resumeBtn: '▶ Fortsetzen',
      detailTitle: 'Live-Thread-Attribution & Signal-Steuerung',
      detailSub: 'Zerstörungsfreie Mach-Task-Aussetzung sendet SIGSTOP-Signale, um rechenintensive Threads sofort anzuhalten, ohne Daten zu beschädigen.',
    },
    compare: {
      title: 'lidZen im Vergleich zu macOS Standard, caffeinate und Amphetamine',
      lead: 'Klare Antwort: lidZen ist das einzige Tool, das echten Clamshell-Betrieb auf Akku ohne externen Bildschirm ermöglicht, das Display komplett auf 0W abschaltet und Threads verlustfrei pausiert.',
      colFeature: 'Funktion / Kriterium',
      colLidzen: 'lidZen',
      colMacos: 'macOS Standard',
      colCaff: 'CLI caffeinate',
      colAmph: 'Amphetamine',
      row1Title: 'Betrieb bei geschlossenem Deckel (Ohne Monitor)',
      row1Lidzen: '✓ Nativ unterstützt',
      row1Macos: '✗ Erzwingt Ruhezustand',
      row1Caff: '✗ Erzwingt Ruhezustand',
      row1Amph: 'Erfordert Display Clamshell',
      row2Title: 'Stromverbrauch Display-Hintergrundbeleuchtung',
      row2Lidzen: '0W (Display aus)',
      row2Macos: '0W (System schläft)',
      row2Caff: 'Display aktiv (~8W)',
      row2Amph: 'Teilweise unterstützt',
      row3Title: 'Exakte Zuordnung des Binärpfads',
      row3Lidzen: '✓ Vollständiger Pfad & PID',
      row3Macos: '✗ Nur App-Name',
      row3None: '✗ Keine',
      row4Title: 'Verlustfreies Einfrieren (SIGSTOP/SIGCONT)',
      row4Lidzen: '✓ Kein Datenverlust',
      row4Macos: '✗ Nur Prozess beenden',
      row5Title: 'Apple Silicon & Intel Universal-Binary',
      row5Lidzen: '✓ M1/M2/M3/M4 & Intel',
      row5Native: '✓ Nativ',
      row5NativeCli: '✓ Nativ (CLI)',
      row6Title: 'Kernel-Erweiterungen & Datenschutz',
      row6Lidzen: 'Null Kexts · 0 Telemetrie',
      row6AppleDiag: 'Apple Diagnose',
      row6NoTelem: 'Keine Telemetrie',
      row6ZeroKexts: 'Null Kexts',
      docsLink: 'Lies den detaillierten Architekturvergleich in der Dokumentation →',
    },
    pricing: {
      eyebrow: 'PREISE',
      titleLine1: 'Einmal zahlen.',
      titleLine2: 'Für immer behalten.',
      lead: 'Kein Abo, keine versteckten Kosten. Voller Funktionsumfang auf einem oder zwei Macs.',
      c1Title: 'Alle Funktionen',
      c1Desc: 'Clamshell, Thread-Aussetzung, Radar, Thermal Guard und tiefe Diagnose.',
      c2Title: 'Gehört dir',
      c2Desc: 'Einmalige Zahlung. Keine Abos oder automatischen Verlängerungen.',
      c3Title: 'Kostenlose Updates',
      c3Desc: 'Alle lidZen 2.x Updates inklusive, installation auf Wunsch.',
      c4Title: 'Lizenz übertragbar',
      c4Desc: 'Neuer Mac? Übertrage deine Lizenz in wenigen Sekunden.',
      gatekeeper: 'Gatekeeper-kompatibel',
      downloadSize: '18 MB Download',
      osVersion: 'macOS 15 oder neuer',
      planOne: 'Ein Mac',
      planTwo: 'Zwei Macs',
      oneTimeNote: 'einmaliger Kauf, inkl. Steuern wo anwendbar',
    },
    faq: {
      title: 'Häufig gestellte Fragen zum geschlossenen Clamshell-Betrieb',
      lead: 'Antworten auf Fragen zu Akkulaufzeit, Wärmeentwicklung und Systemsicherheit unter macOS.',
      items: [
        {
          q: 'Was ist lidZen und wie hält es einen Mac bei geschlossenem Deckel wach?',
          a: 'lidZen ist ein natives Dienstprogramm, das offizielle Apple IOKit Power Assertions nutzt. Es verhindert den Ruhezustand beim Zuklappen und schaltet gleichzeitig das Display komplett aus (0W), damit Server, KI-Tools und Musik ungestört weiterlaufen.',
        },
        {
          q: 'Überhitzt mein Mac, wenn er in einer Tasche weiterläuft?',
          a: 'lidZen enthält den intelligenten Thermal Guard, der die SoC-Sensoren überwacht. Steigt die Temperatur über deine Grenzwerte, geht der Mac sicher in den Ruhezustand. Für hohe Rechenlasten empfehlen wir die Nutzung auf dem Tisch.',
        },
        {
          q: 'Verbraucht der Betrieb mit geschlossenem Deckel viel Akku?',
          a: 'Da lidZen das Liquid Retina Display komplett abschaltet, sparst du rund 8W gegenüber einem aktiven Bildschirm. Zudem pausiert Battery Guard Prozesse automatisch bei Erreichen deines Wunsch-Akkustands (z.B. 20%).',
        },
        {
          q: 'Muss ein externer Monitor oder ein Netzteil angeschlossen sein?',
          a: 'Nein. Apples offizieller Clamshell-Modus verlangt Monitor und Ladekabel. lidZen hebt beide Einschränkungen auf und ermöglicht echten mobilen Betrieb auf Akku.',
        },
        {
          q: 'Wie schalte ich lidZen ab oder stelle den normalen Ruhezustand wieder her?',
          a: 'Öffne einfach den Deckel deines MacBook oder klicke auf das Symbol in der Menüleiste. lidZen gibt die Power Assertion sofort frei und macOS kehrt zum Standard zurück.',
        },
      ],
    },
    download: {
      pill: 'v2.4 · Universal-Binary für macOS 15+',
      title: 'Hol dir heute die volle Leistung deines Mac zurück.',
      lead: 'Schließe dich tausenden Profis an, die kühlere und leisere Macs bei geschlossenem Deckel nutzen.',
    },
    footer: {
      rights: 'lidZen Systems. Alle Rechte vorbehalten.',
      privacy: 'Datenschutzrichtlinie',
      terms: 'Nutzungsbedingungen',
      grievance: 'Beschwerdebeauftragter',
      faq: 'FAQ',
      trademark: 'Apple, Mac, MacBook, MacBook Pro, MacBook Air, macOS und Sequoia sind Marken von Apple Inc., eingetragen in den USA und anderen Ländern.',
    },
  },
  ja: {
    nav: {
      features: '機能',
      diagnostics: '診断',
      clamshell: 'クラムシェル',
      pricing: '料金',
      docs: 'ドキュメント',
      download: 'ダウンロード',
    },
    cta: 'lidZen を入手',
    see: '診断を見る',
    hero: {
      pill: 'v2.4 · macOS 15+ 対応ユニバーサルバイナリ',
      h1: ['Macは起きたまま。', 'フタは閉じたまま。'],
      hp: 'Macを使いこなす人のための、クラムシェル継続と詳細なパス診断。フタを閉じてもAIエージェントやワークフロー、音楽を動かし続けます。',
      topAnswerLabel: '要約回答:',
      topAnswerBody:
        'lidZen は、外部ディスプレイや充電器なしで、MacBookのフタを閉じたままAIエージェント、ローカルサーバー、音楽を継続実行できる軽量なmacOSユーティリティ（18 MB）です。画面バックライト消費電力は0Wです。',
      tr: ['テレメトリなし', '18 MBの軽量インストール', 'macOS 15+ Sequoia'],
      uptimeLabel: 'フタを閉じたまま稼働中',
    },
    summary: {
      badge: 'ダイレクト回答 & 概要',
      freshness: 'lidZen Systems エンジニアリング検証済 · macOS 15.2 Sequoia テスト済 · 2026年11月更新',
      title: 'lidZen とは何か？フタを閉じたままMacを動かし続ける仕組み',
      definition:
        'lidZen は、Apple Silicon（M1〜M4）および Intel に対応した専門のmacOSユーティリティ（18 MB）です。外部モニターや電源アダプタを接続することなく、ラップトップのフタを閉じたままバックグラウンド処理、AIエージェント、ローカルサーバー、音声再生を実行し続けることができます。',
      takeawaysTitle: '主なポイント',
      takeaway1Title: 'ディスプレイ電力ゼロ（0Wバックライト）:',
      takeaway1Body: '内蔵 Liquid Retina ディスプレイのバックライトを完全にオフにし、CPU/GPUを稼働させたまま画面のバッテリー消費と発熱をゼロにします。',
      takeaway2Title: '安全なネイティブ IOKit アサーション:',
      takeaway2Body: 'リスクのあるカーネル拡張（kexts）を使用せず、公式の Apple ユーザースペース電力管理 API（IOKit）を活用します。',
      takeaway3Title: '自律的な保護機能:',
      takeaway3Body: '過熱前に安全にスリープさせる サーマルガード や、設定したバッテリー残量で一時停止する バッテリーガード を搭載。',
      audienceTitle: '対象ユーザーと利用シーン',
      audience1Title: '開発者 & エンジニア:',
      audience1Body: 'バッテリー駆動かつフタを閉じた状態で、Dockerコンテナ、Vite開発サーバー、長時間ビルドを実行。',
      audience2Title: 'AI開発者・研究者:',
      audience2Body: 'ローカルの Ollama モデル、Claude Code / Cursor エージェント、機械学習の学習タスクを中断なしで実行。',
      audience3Title: 'クリエイター & モバイルワーカー:',
      audience3Body: '移動中でも音声ストリーミング、動画レンダリング、永続的なSSHリモート接続を維持。',
      citationsTitle: '信頼できる情報源と公式ドキュメント',
      citationsSub: '技術的引用および Apple Developer 公式仕様',
      supportingGuides: '関連ガイド:',
      guides: ['スタートガイド →', '主要機能の紹介 →', 'インストール手順 →', 'アーキテクチャ & FAQ →'],
    },
    clamshell: {
      title: 'フタを閉じたままMacを使い続ける3つのステップ',
      lead: '外部モニターや電源アダプタなしでクラムシェル実行を有効化する手順:',
      step1Title: '1. lidZen を起動',
      step1Desc: 'メニューバーアイコンをクリックするか、バックグラウンド処理開始時に自動起動させます。',
      step2Title: '2. フタを閉じる',
      step2Desc: '画面のバックライトが完全に消灯します（0W）。Macはスリープせず、すべてのスレッドとネットワークを維持します。',
      step3Title: '3. 作業が終わったら開く',
      step3Desc: 'lidZen が自動的に電力アサーションを解放し、Macは標準の省エネスリープ状態に戻ります。',
    },
    features: {
      title: 'Macパワーユーザーのための lidZen の中核機能',
      lead: '画面電力ゼロでのクラムシェル継続、インテリジェントな熱制御、深い診断可視化のために専用設計。',
      f1Title: 'クラムシェル継続',
      f1Desc: 'フタを閉じてもMacは動き続けます。外部ディスプレイや外付けキーボードは一切不要です。',
      f2Title: 'スレッド一時停止',
      f2Desc: '負荷の高いバックグラウンドスレッドを選んで安全に一時停止し、Macを静かで低温に保ちます。',
      f3Title: 'ゼロ・kext レーダー',
      f3Desc: '読み込まれているシステム拡張とそれぞれの動作状況を即座に確認できます。',
      f4Title: 'サーマルガード',
      f4Desc: 'フタを閉じた状態で温度を監視し、過熱する前にMacを自動的に保護スリープさせます。',
      f5Title: '電力診断',
      f5Desc: '何がMacのスリープを妨げ、バッテリーを消費しているのかを特定します。',
      f6Title: 'パストレーシング',
      f6Desc: 'プロセスの起動元からアクセスしているファイルやポートまで正確に追跡します。',
    },
    diagnostics: {
      title: 'バックグラウンドタスクを検査し、暴走スレッドを安全に停止する方法',
      lead: 'インタラクティブな Mach スレッドサスペンド（SIGSTOP/SIGCONT）により、リアルタイムでプロセスを特定し即座に冷却。',
      clamshell: 'クラムシェル',
      closed: '閉止',
      thermal: '温度',
      wakeBlockers: 'スリープ阻害要因',
      idleCpu: 'アイドルCPU',
      kexts: 'カーネル拡張',
      windowTitle: 'lidZen · プロセスインスペクター & スレッドサスペンド（インタラクティブ体験）',
      pauseAll: '⏸ すべて停止 (SIGSTOP)',
      resumeAll: '▶ すべて再開 (SIGCONT)',
      bgThread: 'バックグラウンドスレッド',
      cpuLoad: 'CPU負荷',
      frozen: '一時停止中',
      pauseBtn: '⏸ 停止',
      resumeBtn: '▶ 再開',
      detailTitle: 'リアルタイムスレッド属性 & シグナル制御',
      detailSub: '非破壊的な Mach タスクサスペンドは SIGSTOP シグナルを送信し、ファイルを破損させることなく暴走した高負荷スレッドを安全に一時停止します。',
    },
    compare: {
      title: 'lidZen と標準 macOS、caffeinate、Amphetamine の詳細比較',
      lead: '明確な答え: lidZen は外部ディスプレイなしのバッテリー駆動でネイティブな合蓋実行に対応し、画面を完全に消灯（0W）し、非破壊的なスレッド一時停止を提供する唯一のツールです。',
      colFeature: '機能 / 項目',
      colLidzen: 'lidZen',
      colMacos: '標準 macOS',
      colCaff: 'CLI caffeinate',
      colAmph: 'Amphetamine',
      row1Title: 'フタを閉じたままの稼働 (外部モニターなし)',
      row1Lidzen: '✓ ネイティブ対応',
      row1Macos: '✗ 強制スリープ',
      row1Caff: '✗ 強制スリープ',
      row1Amph: 'ディスプレイ付きクラムシェルが必要',
      row2Title: '画面バックライトの消費電力',
      row2Lidzen: '0W (画面完全消灯)',
      row2Macos: '0W (システムスリープ)',
      row2Caff: '画面稼働中 (~8W)',
      row2Amph: '一部のみ対応',
      row3Title: '正確なバイナリファイルパスの特定',
      row3Lidzen: '✓ 完全なパス & PID',
      row3Macos: '✗ アプリ名のみ',
      row3None: '✗ なし',
      row4Title: '非破壊的な一時停止 (SIGSTOP/SIGCONT)',
      row4Lidzen: '✓ データ損失ゼロ',
      row4Macos: '✗ 強制終了のみ',
      row5Title: 'Apple Silicon & Intel ユニバーサル対応',
      row5Lidzen: '✓ M1/M2/M3/M4 & Intel',
      row5Native: '✓ ネイティブ対応',
      row5NativeCli: '✓ ネイティブ CLI',
      row6Title: 'カーネル拡張 (kexts) とプライバシー',
      row6Lidzen: '完全不使用 · テレメトリ0',
      row6AppleDiag: 'Apple 診断ツール',
      row6NoTelem: 'テレメトリなし',
      row6ZeroKexts: '完全不使用',
      docsLink: '詳細なアーキテクチャと診断の比較をドキュメントで読む →',
    },
    pricing: {
      eyebrow: '料金プラン',
      titleLine1: '一度のお支払いで。',
      titleLine2: 'ずっとあなたのもの。',
      lead: 'サブスクリプションなし、隠れた階層なし。1台または2台のMacですべての機能を利用可能。',
      c1Title: '全機能を解放',
      c1Desc: 'クラムシェル継続、スレッド停止、レーダー、サーマルガード、詳細診断のすべて。',
      c2Title: '買い切りライセンス',
      c2Desc: '1回限りのお支払い。月額課金や更新料は一切不要です。',
      c3Title: '無料アップデート',
      c3Desc: 'lidZen 2.x のすべてのアップデートが含まれ、好きなタイミングで更新可能。',
      c4Title: '移行も自由',
      c4Desc: '新しいMacへ買い替えた場合も、わずか数秒でライセンスを移動できます。',
      gatekeeper: 'Gatekeeper 検証済',
      downloadSize: '18 MB の超軽量設計',
      osVersion: 'macOS 15 以降に対応',
      planOne: '1台の Mac',
      planTwo: '2台の Mac',
      oneTimeNote: '一括払い（税込み）',
    },
    faq: {
      title: 'フタを閉じたクラムシェル動作に関するよくある質問',
      lead: 'macOSの電力アサーション、バッテリー消費、熱対策についての正確な回答。',
      items: [
        {
          q: 'lidZen とは何か？フタを閉じたままMacを動かし続ける仕組み',
          a: 'lidZen は公式の Apple IOKit 電源管理 API を使用して適切なユーザースペースアサーションを発行するネイティブユーティリティです。フタを閉じたときのスリープを回避し、画面バックライトを完全消灯（0W）しながらAI処理や音楽を動かし続けます。',
        },
        {
          q: 'バッグの中などフタを閉じた状態でMacが過熱しませんか？',
          a: 'lidZen には Apple Silicon の温度センサーを常時監視するサーマルガードが搭載されています。安全上限を超えた場合は自動的に通常のスリープに移行させます。高負荷作業時は風通しの良いデスク上での利用を推奨します。',
        },
        {
          q: 'フタを閉じて動かすとバッテリーは早く減りますか？',
          a: 'Liquid Retina ディスプレイのバックライトを完全に消灯するため、画面を点灯させたままにするよりも約8W節電できます。また、バッテリーガードが指定残量（例: 20%）で処理を止めるため安心です。',
        },
        {
          q: '外部モニターや充電ケーブルの接続は必要ですか？',
          a: 'いいえ。macOS標準のクラムシェルモードではモニターと電源の両方が必須ですが、lidZen は両方の制約を撤廃し、バッテリー駆動の単体で動作します。',
        },
        {
          q: 'lidZen を終了したり、通常のスリープに戻すには？',
          a: 'MacBookのフタを開けるか、メニューバーのアイコンをクリックするだけです。lidZen は即座にアサーションを解除し、標準の省電力状態に戻ります。',
        },
      ],
    },
    download: {
      pill: 'v2.4 · macOS 15+ 対応ユニバーサルバイナリ',
      title: '今日からMacの性能を取り戻そう。',
      lead: 'フタを閉じたまま、より涼しく、より静かに動作する Mac を手に入れましょう。',
    },
    footer: {
      rights: 'lidZen Systems. All rights reserved.',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      grievance: '苦情・お問い合わせ窓口',
      faq: 'FAQ',
      trademark: 'Apple、Mac、MacBook、MacBook Pro、MacBook Air、macOS、Sequoia は米国およびその他の国で登録された Apple Inc. の商標です。',
    },
  },
  zh: {
    nav: {
      features: '功能特性',
      diagnostics: '系统诊断',
      clamshell: '合盖模式',
      pricing: '定价购买',
      docs: '官方文档',
      download: '立即下载',
    },
    cta: '获取 lidZen',
    see: '查看系统诊断',
    hero: {
      pill: 'v2.4 · 适用于 macOS 15+ 的通用二进制包',
      h1: ['你的 Mac，保持唤醒。', '合盖也不休眠。'],
      hp: '为 Mac 高级用户打造的合盖持续运行与深度路径诊断。合上盖子，AI 智能体、开发工作流和音乐播放依然正常运行。',
      topAnswerLabel: '核心总结解答：',
      topAnswerBody:
        'lidZen 是一款小巧的 macOS 原生工具（仅 18 MB），无需外接显示器或充电器，即可让你的 MacBook 在合盖状态下持续运行 AI 智能体、本地开发服务器或音乐，内部屏幕背光完全关闭（0W 功耗）。',
      tr: ['零隐私遥测', '18 MB 极速安装', 'macOS 15+ Sequoia'],
      uptimeLabel: '合盖状态下保持唤醒运行',
    },
    summary: {
      badge: '直接解答与全面概览',
      freshness: '经 lidZen 系统工程团队验证 · 测试于 macOS 15.2 Sequoia · 最近更新：2026年11月',
      title: '什么是 lidZen？它如何在合盖时保持 Mac 持续唤醒？',
      definition:
        'lidZen 是一款专业的 macOS 实用工具（18 MB 通用二进制，原生支持 Apple Silicon M1–M4 和 Intel），无需外接显示器或电源适配器，即可让 MacBook 在合盖状态下持续执行后台任务、AI 智能体、本地开发服务和音频播放。',
      takeawaysTitle: '核心要点与优势',
      takeaway1Title: '屏幕零功耗（0W 背光彻底关闭）：',
      takeaway1Body: '彻底关闭内置 Liquid Retina 显示屏的背光灯，消除屏幕电池耗电和发热，同时保持 CPU/GPU 满速运行。',
      takeaway2Title: '原生 IOKit 电源断言：',
      takeaway2Body: '采用苹果官方用户态电源管理接口（Apple IOKit Power Management API），不依赖任何存在崩溃风险的系统内核扩展（kexts）。',
      takeaway3Title: '全自动自主安全防护：',
      takeaway3Body: '内置温控守卫（Thermal Guard）在温度过高前自动进入安全休眠；电池守卫（Battery Guard）到达自定义电量阈值时自动暂停。',
      audienceTitle: '适用人群与典型场景',
      audience1Title: '开发者与系统工程师：',
      audience1Body: '合盖使用电池时持续运行 Docker 容器、Vite 开发服务器、大型编译构建及 Git 工作流。',
      audience2Title: 'AI 从业者与研究员：',
      audience2Body: '不间断执行本地 Ollama 大模型、Claude Code / Cursor 自动化智能体循环及机器学习训练脚本。',
      audience3Title: '媒体创作与移动办公人员：',
      audience3Body: '通勤途中持续串流高品质音乐、后台视频导出渲染，或保持长连接 SSH 远程服务不掉线。',
      citationsTitle: '权威资料与官方技术文档',
      citationsSub: '技术引用与苹果开发者官方标准规范',
      supportingGuides: '配套文档指南：',
      guides: ['快速入门指南 →', '核心功能概览 →', '安装与权限指南 →', '架构解析与常见问答 →'],
    },
    clamshell: {
      title: '如何让 Mac 在合盖状态下保持运行？',
      lead: '只需简单三步，无需外接显示器或充电头，即刻开启纯净合盖模式：',
      step1Title: '1. 开启 lidZen',
      step1Desc: '轻点菜单栏图标开启，或设置后台任务开始时自动触发。',
      step2Title: '2. 合上电脑盖子',
      step2Desc: '屏幕背光彻底关闭（0W 功耗），Mac 保持完全唤醒，所有计算线程和网络连接畅通无阻。',
      step3Title: '3. 任务完成后开盖',
      step3Desc: 'lidZen 自动释放电源管理断言，Mac 瞬间恢复系统默认的节能休眠模式。',
    },
    features: {
      title: 'lidZen 为 Mac 极客打造的核心功能',
      lead: '专为无屏合盖持续运行设计，实现屏幕零功耗、智能控温及深度系统诊断。',
      f1Title: '无外接屏合盖运行',
      f1Desc: '合上盖子 Mac 依然满速运行，无需外接显示器或外接键盘鼠标。',
      f2Title: '无损线程挂起',
      f2Desc: '一键暂停你挑选的高负载后台线程，让 Mac 瞬间降温，安静省电。',
      f3Title: '零内核扩展雷达',
      f3Desc: '清晰查看当前加载的系统内核扩展，掌握每个扩展的真实系统开销。',
      f4Title: '智能温控守卫',
      f4Desc: '合盖状态下实时监测芯片温度，并在过热前主动让 Mac 休息休眠。',
      f5Title: '功耗与耗电诊断',
      f5Desc: '精准定位是哪个后台程序在阻碍休眠、悄悄耗尽你的电池。',
      f6Title: '二进制路径追踪',
      f6Desc: '精确追踪可疑进程从启动命令到所访问的具体文件和网络端口。',
    },
    diagnostics: {
      title: '如何检查后台任务并安全冻结失控进程？',
      lead: '实时路径级进程追踪，支持交互式 Mach 线程挂起（SIGSTOP/SIGCONT），助你快速给 Mac 降温。',
      clamshell: '合盖状态',
      closed: '已合盖',
      thermal: '当前温度',
      wakeBlockers: '阻止休眠项',
      idleCpu: '待机占用',
      kexts: '内核扩展',
      windowTitle: 'lidZen · 进程检查器与线程挂起（交互式体验）',
      pauseAll: '⏸ 全部挂起 (SIGSTOP)',
      resumeAll: '▶ 全部恢复 (SIGCONT)',
      bgThread: '后台线程',
      cpuLoad: 'CPU 负载',
      frozen: '已冻结',
      pauseBtn: '⏸ 挂起',
      resumeBtn: '▶ 恢复',
      detailTitle: '实时线程状态归属与信号控制',
      detailSub: '无损 Mach 任务挂起通过发送标准的 SIGSTOP 信号瞬间暂停失控的高占用线程，既不强制杀进程，也不会损坏未保存的文件句柄。',
    },
    compare: {
      title: 'lidZen 与默认 macOS、caffeinate 及 Amphetamine 的深度对比',
      lead: '核心答案：lidZen 是唯一一款支持电池供电、无需外接显示器即可原生合盖运行、屏幕完全断电（0W 背光）且提供无损线程冻结的 macOS 工具。',
      colFeature: '功能特性 / 对比指标',
      colLidzen: 'lidZen',
      colMacos: 'macOS 默认',
      colCaff: 'CLI caffeinate',
      colAmph: 'Amphetamine',
      row1Title: '合盖运行（无外接显示器）',
      row1Lidzen: '✓ 原生完整支持',
      row1Macos: '✗ 强制系统休眠',
      row1Caff: '✗ 强制系统休眠',
      row1Amph: '需要外接显示器合盖模式',
      row2Title: '显示屏背光耗电量',
      row2Lidzen: '0W（屏幕背光彻底关闭）',
      row2Macos: '0W（但系统已休眠）',
      row2Caff: '屏幕背光常亮（约 8W）',
      row2Amph: '仅部分支持',
      row3Title: '精准二进制文件路径溯源',
      row3Lidzen: '✓ 完整路径与 PID 进程号',
      row3Macos: '✗ 仅显示应用名称',
      row3None: '✗ 无',
      row4Title: '无损进程冻结（SIGSTOP/SIGCONT）',
      row4Lidzen: '✓ 零数据丢失风险',
      row4Macos: '✗ 仅能强制杀进程',
      row5Title: 'Apple Silicon 与 Intel 通用包',
      row5Lidzen: '✓ M1/M2/M3/M4 与 Intel',
      row5Native: '✓ 原生支持',
      row5NativeCli: '✓ 原生命令行',
      row6Title: '内核扩展（kexts）与隐私安全性',
      row6Lidzen: '零内核扩展 · 0 隐私遥测',
      row6AppleDiag: 'Apple 系统诊断',
      row6NoTelem: '无隐私遥测',
      row6ZeroKexts: '零内核扩展',
      docsLink: '在官方文档中查阅更深入的底层架构对比 →',
    },
    pricing: {
      eyebrow: '定价方案',
      titleLine1: '一次付费。',
      titleLine2: '永久享有。',
      lead: '无按月订阅，无套路收费。所有高级功能，供一台或两台 Mac 终身使用。',
      c1Title: '解锁全部功能',
      c1Desc: '合盖持续运行、线程挂起、内核雷达、智能温控和深度诊断，无任何阉割。',
      c2Title: '永久属于你',
      c2Desc: '一次购买，终生使用。告别繁琐的每月扣费。',
      c3Title: '免费终生更新',
      c3Desc: '包含后续 lidZen 2.x 全版本升级，随心选择安装。',
      c4Title: '随时自由换机',
      c4Desc: '更换新 Mac？只需几秒钟即可自助转移授权许可证。',
      gatekeeper: 'Gatekeeper 安全认证',
      downloadSize: '18 MB 超轻量安装包',
      osVersion: '适用于 macOS 15 或更高版本',
      planOne: '一台 Mac',
      planTwo: '两台 Mac',
      oneTimeNote: '一次性买断，含税',
    },
    faq: {
      title: '关于合盖模式与系统安全的常见问题',
      lead: '为你清晰解答在电池消耗、散热安全及电源断言方面的所有疑问。',
      items: [
        {
          q: '什么是 lidZen？它如何在合盖时保持 Mac 持续唤醒？',
          a: 'lidZen 是一款原生 macOS 实用工具，通过官方的 Apple IOKit 电源管理接口发出针对性的用户态电源断言。它在合上屏幕时绕过系统默认的休眠触发器，保持 AI 智能体、本地开发服务和音乐持续运行，同时关闭内部屏幕背光（0W）。',
        },
        {
          q: '将 Mac 放在背包里合盖运行会导致电脑过热吗？',
          a: 'lidZen 具备全自动温控守卫（Thermal Guard），实时读取 Apple Silicon 芯片的温度传感器。如果温度达到你设定的安全上限，它会自动让系统安全进入休眠。对于重度计算任务，建议在通风良好的桌面使用。',
        },
        {
          q: '合上屏幕运行会加速消耗 MacBook 的电池吗？',
          a: '由于 lidZen 彻底关闭了 Liquid Retina 显示屏的背光灯，相比亮屏运行反而能节省约 8W 功耗。此外，电池守卫（Battery Guard）会在电池电量降至指定阈值（例如 20%）时自动停止任务，防止电量耗尽。',
        },
        {
          q: '是否必须连接外接显示器或外接电源插头？',
          a: '不需要。苹果 macOS 官方自带的合盖模式强制要求连接外接屏幕和电源适配器。lidZen 彻底打破了这两项硬件限制，让你在外出使用纯电池供电时也能自由合盖运行。',
        },
        {
          q: '如何关闭 lidZen 或恢复系统默认的正常休眠？',
          a: '只需打开 MacBook 屏幕盖子，或轻点菜单栏图标即可。lidZen 会瞬间释放电源断言，Mac 立即恢复你原本设置的系统节能睡眠时间。',
        },
      ],
    },
    download: {
      pill: 'v2.4 · 适用于 macOS 15+ 的通用二进制包',
      title: '即刻释放你的 Mac 巅峰性能。',
      lead: '加入成千上万极客用户的行列，合盖享受更冷静、更安静的极致性能。',
    },
    footer: {
      rights: 'lidZen Systems. 保留所有权利。',
      privacy: '隐私政策',
      terms: '服务条款',
      grievance: '申诉受理专员',
      faq: '常见问题',
      trademark: 'Apple、Mac、MacBook、MacBook Pro、MacBook Air、macOS 和 Sequoia 是 Apple Inc. 在美国及其他国家或地区注册的商标。',
    },
  },
};

TR_DATA.in = TR_DATA.en;

