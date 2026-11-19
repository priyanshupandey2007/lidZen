import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh';

export interface LanguageOption {
  code: LanguageCode;
  countryCode: string;
  label: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'en', countryCode: 'US', label: 'English' },
  { code: 'es', countryCode: 'ES', label: 'Español' },
  { code: 'fr', countryCode: 'FR', label: 'Français' },
  { code: 'de', countryCode: 'DE', label: 'Deutsch' },
  { code: 'ja', countryCode: 'JP', label: '日本語' },
  { code: 'zh', countryCode: 'CN', label: '简体中文' },
];

export const translations = {
  en: {
    nav: {
      features: 'Features',
      diagnostics: 'Diagnostics',
      clamshell: 'Clamshell',
      docs: 'Docs',
      download: 'Download',
    },
    hero: {
      badge: 'New: Clamshell Continuity Engine',
      titleLine1: 'Keep your Mac',
      titleLine2: 'alive, lid shut.',
      subtitle:
        'lidZen bypasses macOS clamshell limits so AI agents, automated workflows, and music keep running with the lid closed — while deep path diagnostics pinpoint exactly what\'s making your Mac hot, loud, and drained.',
      downloadCta: 'Download for macOS',
      demoCta: 'Try the live demo',
      silicon: 'Apple Silicon & Intel native',
      os: 'macOS 15+ Sequoia',
      zeroKexts: 'Zero kexts · 18 MB install',
    },
    hud: {
      title: 'MacBook Pro · lidZen Control',
      continuityActive: 'Continuity Active',
      terminalTitle: 'lidZen Terminal',
      readyTasks: 'Ready: Closing lid will not interrupt tasks',
      clamshellActive: 'Clamshell Active',
      lidClosedPill: 'Lid closed · Tasks still running at 100% speed',
      lidOpenPill: 'Lid open · Tasks dispatched',
      clickMacbook: 'Click MacBook to toggle clamshell state',
      sleepSaved: '0 sleep interruptions · Display off (0W saved)',
      powerDraw: 'POWER DRAW',
      socTemp: 'SOC TEMP',
      fanSpeed: 'FAN SPEED',
      silent: 'Silent',
      agentTitle: 'Agent · refactor-auth',
      agentRole: 'Background Worker',
      agentActiveClosed: 'Active · lid closed',
      agentActiveOpen: 'Active · task assigned',
      nowPlaying: 'M83 · Now playing',
      speakersActive: 'Streaming · speakers active',
      streamingClosed: 'Streaming · lid closed',
    },
    features: {
      tag: 'Everything in one tool',
      heading: 'Built for power users who push their Mac',
      subheading:
        'Clamshell continuity, path-level diagnostics, and instant control over the rogue processes stealing your performance.',
      c1Title: 'Keep AI agents, workflows, and music alive — lid fully shut.',
      c1Desc:
        'macOS normally suspends background work when you close the lid. lidZen\'s continuity engine keeps your session powered so long-running agents, renders, and streams never miss a beat.',
      c2Title: 'Trace heat & drain to the exact file path.',
      c2Desc: 'No more guessing. See the precise process, tab, or container behind the heat.',
      c3Badge: 'Smart Pause & Suspend',
      c3Title: 'Freeze rogue apps without losing state.',
      c3Desc:
        'Non-destructive Mach task suspension halts CPU and battery drain instantly via SIGSTOP — safely resume anytime with zero data loss.',
      c3Action: 'Pause culprits',
      c4Title: 'Real-time thermal map',
      c5Title: 'Reclaim your Mac today.',
      c5Desc: 'Universal binary, 18 MB. No kernel extensions, zero telemetry.',
    },
    diagnostics: {
      tag: 'Live interactive preview',
      heading: 'Point at the culprit. Pause it instantly.',
      subheading:
        'This is the real lidZen inspector — running on live interactive simulation. Click any process to trace its binary path, then suspend it safely with Mach SIGSTOP signals and resume whenever you\'re ready.',
      windowTitle: 'lidZen Inspector',
      resumeAll: 'Resume All',
      pauseAll: 'Pause All',
      tasksSuspended: 'All tasks suspended',
      scanning: 'Scanning…',
      activeTasks: 'active',
      pausedTasks: 'paused',
      binaryTrace: 'Binary Path Trace',
      machState: 'Mach Thread State',
      suspendedBadge: 'Suspended (SIGSTOP)',
      thermalCulpritBadge: 'Thermal Culprit (Active)',
      pauseBtn: 'Pause process (SIGSTOP)',
      resumeBtn: 'Resume process (SIGCONT)',
      resetBtn: 'Reset',
      aggregateCpu: 'Aggregate CPU',
      maxTemp: 'Max Temp',
      fan: 'Fan',
      discharge: 'Discharge',
    },
    clamshell: {
      tag: 'Clamshell mode',
      heading: 'Close the lid. Your Mac keeps working.',
      subheading:
        'lidZen holds your session in an active continuity state — no sleep assertions fighting, no suspension, no external monitor required. Whatever you left running stays running.',
      agentsTitle: 'AI coding agents',
      agentsDesc: 'Let long-running agents finish refactors overnight with the lid shut.',
      musicTitle: 'Music & streams',
      musicDesc: 'Spotify, Apple Music, and YouTube keep playing to your speakers.',
      automationTitle: 'Automation & CI',
      automationDesc: 'Builds, renders, and pipelines run uninterrupted in the background.',
      uploadsTitle: 'Large uploads',
      uploadsDesc: 'Cloud syncs and exports complete without keeping the lid open.',
      notifsTitle: 'Notifications',
      notifsDesc: 'Slack, email, and calendar stay live so you never miss a ping.',
      anythingTitle: 'Anything you run',
      anythingDesc: 'If it runs on your Mac, lidZen keeps it running — lid or no lid.',
    },
    faq: {
      tag: 'Frequently asked questions',
      heading: 'Everything you need to know about lidZen',
      subheading: 'Clear answers about sleep states, permissions, thermal management, and Mac support.',
    },
    download: {
      version: 'v2.4 · Universal binary for macOS 15+',
      heading: 'Reclaim your Mac\'s performance today.',
      subheading:
        'Join thousands of power users running cooler, quieter Macs with the lid closed and full path-level visibility.',
      cta: 'Download for macOS',
      buyNow: 'Buy now · $29',
      noTelemetry: 'No telemetry',
      size: '18 MB install',
      sequoia: 'macOS 15+ Sequoia',
    },
    footer: {
      rights: 'All rights reserved.',
      zeroTelemetry: 'Zero telemetry',
      binary: '18 MB Universal binary',
      idle: '0.2% Idle CPU',
    },
  },
  es: {
    nav: {
      features: 'Características',
      diagnostics: 'Diagnóstico',
      clamshell: 'Clamshell',
      docs: 'Documentación',
      download: 'Descargar',
    },
    hero: {
      badge: 'Nuevo: Motor de Continuidad Clamshell',
      titleLine1: 'Mantén tu Mac activo,',
      titleLine2: 'con la tapa cerrada.',
      subtitle:
        'lidZen supera los límites de clamshell de macOS para que tus agentes de IA, flujos de trabajo y música sigan funcionando con la tapa cerrada, con diagnósticos precisos de calor y batería.',
      downloadCta: 'Descargar para macOS',
      demoCta: 'Probar demo en vivo',
      silicon: 'Nativo Apple Silicon e Intel',
      os: 'macOS 15+ Sequoia',
      zeroKexts: 'Sin kexts · Instalador 18 MB',
    },
    hud: {
      title: 'MacBook Pro · Control lidZen',
      continuityActive: 'Continuidad Activa',
      terminalTitle: 'Terminal lidZen',
      readyTasks: 'Listo: Cerrar la tapa no interrumpirá las tareas',
      clamshellActive: 'Clamshell Activo',
      lidClosedPill: 'Tapa cerrada · Tareas al 100% de velocidad',
      lidOpenPill: 'Tapa abierta · Tareas asignadas',
      clickMacbook: 'Haz clic en el MacBook para alternar el estado',
      sleepSaved: '0 interrupciones de suspensión · Pantalla apagada (0W)',
      powerDraw: 'CONSUMO',
      socTemp: 'TEMP SOC',
      fanSpeed: 'VENTILADOR',
      silent: 'Silencioso',
      agentTitle: 'Agente · refactor-auth',
      agentRole: 'Proceso en segundo plano',
      agentActiveClosed: 'Activo · tapa cerrada',
      agentActiveOpen: 'Activo · tarea asignada',
      nowPlaying: 'M83 · Reproduciendo ahora',
      speakersActive: 'Transmitiendo · altavoces activos',
      streamingClosed: 'Transmitiendo · tapa cerrada',
    },
    features: {
      tag: 'Todo en una sola herramienta',
      heading: 'Creado para usuarios avanzados que exprimen su Mac',
      subheading:
        'Continuidad clamshell, diagnósticos a nivel de ruta y control instantáneo sobre los procesos que consumen tu rendimiento.',
      c1Title: 'Mantén agentes IA, flujos y música vivos con la tapa cerrada.',
      c1Desc:
        'macOS normalmente suspende el trabajo al cerrar la tapa. El motor lidZen mantiene tu sesión activa para que nada se interrumpa.',
      c2Title: 'Rastrea el calor y consumo hasta la ruta exacta del archivo.',
      c2Desc: 'Sin conjeturas. Identifica el proceso, pestaña o contenedor causante del calor.',
      c3Badge: 'Pausa Inteligente y Suspensión',
      c3Title: 'Congela aplicaciones rebeldes sin perder datos.',
      c3Desc:
        'La suspensión no destructiva de tareas Mach detiene el consumo de CPU y batería al instante mediante SIGSTOP.',
      c3Action: 'Pausar procesos',
      c4Title: 'Mapa térmico en tiempo real',
      c5Title: 'Recupera tu Mac hoy mismo.',
      c5Desc: 'Binario universal, 18 MB. Sin extensiones del kernel, cero telemetría.',
    },
    diagnostics: {
      tag: 'Vista previa interactiva',
      heading: 'Señala al culpable. Paúsalo al instante.',
      subheading:
        'Este es el inspector real de lidZen en simulación interactiva. Haz clic en cualquier proceso para ver su ruta y suspéndelo con SIGSTOP.',
      windowTitle: 'Inspector lidZen',
      resumeAll: 'Reanudar Todo',
      pauseAll: 'Pausar Todo',
      tasksSuspended: 'Todas las tareas suspendidas',
      scanning: 'Escaneando…',
      activeTasks: 'activas',
      pausedTasks: 'pausadas',
      binaryTrace: 'Rastreo de Ruta Binaria',
      machState: 'Estado del Hilo Mach',
      suspendedBadge: 'Suspendido (SIGSTOP)',
      thermalCulpritBadge: 'Culpable Térmico (Activo)',
      pauseBtn: 'Pausar proceso (SIGSTOP)',
      resumeBtn: 'Reanudar proceso (SIGCONT)',
      resetBtn: 'Reiniciar',
      aggregateCpu: 'CPU Total',
      maxTemp: 'Temp Máx',
      fan: 'Ventilador',
      discharge: 'Descarga',
    },
    clamshell: {
      tag: 'Modo Clamshell',
      heading: 'Cierra la tapa. Tu Mac sigue trabajando.',
      subheading:
        'lidZen mantiene tu sesión en estado activo de continuidad, sin luchar contra bloqueos de energía ni necesitar un monitor externo.',
      agentsTitle: 'Agentes de programación IA',
      agentsDesc: 'Deja agentes trabajando en refactorizaciones complejas toda la noche.',
      musicTitle: 'Música y transmisiones',
      musicDesc: 'Spotify, Apple Music y YouTube siguen sonando en tus altavoces.',
      automationTitle: 'Automatización y CI',
      automationDesc: 'Compilaciones y pipelines se ejecutan sin interrupción.',
      uploadsTitle: 'Subidas pesadas',
      uploadsDesc: 'Sincronizaciones y exportaciones completan sin dejar la tapa abierta.',
      notifsTitle: 'Notificaciones',
      notifsDesc: 'Slack, correo y calendario siguen activos para no perder nada.',
      anythingTitle: 'Cualquier cosa que ejecutes',
      anythingDesc: 'Si se ejecuta en tu Mac, lidZen lo mantiene en marcha con o sin tapa.',
    },
    faq: {
      tag: 'Preguntas frecuentes',
      heading: 'Todo lo que necesitas saber sobre lidZen',
      subheading: 'Respuestas claras sobre estados de suspensión, permisos y compatibilidad Mac.',
    },
    download: {
      version: 'v2.4 · Binario universal para macOS 15+',
      heading: 'Recupera el rendimiento de tu Mac hoy mismo.',
      subheading:
        'Únete a miles de usuarios que disfrutan de Macs más frescos y silenciosos con la tapa cerrada.',
      cta: 'Descargar para macOS',
      buyNow: 'Comprar ahora · $29',
      noTelemetry: 'Cero telemetría',
      size: 'Instalación 18 MB',
      sequoia: 'macOS 15+ Sequoia',
    },
    footer: {
      rights: 'Todos los derechos reservados.',
      zeroTelemetry: 'Cero telemetría',
      binary: 'Binario Universal 18 MB',
      idle: '0.2% CPU Inactivo',
    },
  },
  fr: {
    nav: {
      features: 'Fonctionnalités',
      diagnostics: 'Diagnostics',
      clamshell: 'Clamshell',
      docs: 'Documentation',
      download: 'Télécharger',
    },
    hero: {
      badge: 'Nouveau: Moteur de Continuité Clamshell',
      titleLine1: 'Gardez votre Mac éveillé,',
      titleLine2: 'capot fermé.',
      subtitle:
        'lidZen contourne les limites du mode clamshell de macOS pour que vos agents IA, automatisations et musiques s\'exécutent capot fermé avec des diagnostics thermiques précis.',
      downloadCta: 'Télécharger pour macOS',
      demoCta: 'Essayer la démo en direct',
      silicon: 'Natif Apple Silicon & Intel',
      os: 'macOS 15+ Sequoia',
      zeroKexts: 'Zéro kext · Installateur 18 Mo',
    },
    hud: {
      title: 'MacBook Pro · Contrôle lidZen',
      continuityActive: 'Continuité Active',
      terminalTitle: 'Terminal lidZen',
      readyTasks: 'Prêt: Fermer le capot n\'interrompra pas les tâches',
      clamshellActive: 'Clamshell Actif',
      lidClosedPill: 'Capot fermé · Tâches à 100% de vitesse',
      lidOpenPill: 'Capot ouvert · Tâches assignées',
      clickMacbook: 'Cliquez sur le MacBook pour basculer l\'état',
      sleepSaved: '0 mise en veille · Écran éteint (0W économisé)',
      powerDraw: 'PUISSANCE',
      socTemp: 'TEMP SOC',
      fanSpeed: 'VENTILATEUR',
      silent: 'Silencieux',
      agentTitle: 'Agent · refactor-auth',
      agentRole: 'Processus en tâche de fond',
      agentActiveClosed: 'Actif · capot fermé',
      agentActiveOpen: 'Actif · tâche assignée',
      nowPlaying: 'M83 · En cours de lecture',
      speakersActive: 'Diffusion · haut-parleurs actifs',
      streamingClosed: 'Diffusion · capot fermé',
    },
    features: {
      tag: 'Tout en un seul outil',
      heading: 'Conçu pour les utilisateurs intensifs qui poussent leur Mac',
      subheading:
        'Continuité capot fermé, diagnostics de chemins précis et contrôle instantané des processus énergivores.',
      c1Title: 'Agents IA, workflows et musique continuent capot fermé.',
      c1Desc:
        'macOS suspend le travail à la fermeture du capot. lidZen maintient votre session active sans interruption.',
      c2Title: 'Localisez chaleur et batterie jusqu\'au chemin exact du fichier.',
      c2Desc: 'Fini les devinettes. Identifiez le processus précis ou conteneur responsable de la surchauffe.',
      c3Badge: 'Pause Intelligente & Suspension',
      c3Title: 'Gelez les applications indisciplinées sans perte d\'état.',
      c3Desc:
        'La suspension non destructive Mach stoppe l\'utilisation du processeur et de la batterie immédiatement via SIGSTOP.',
      c3Action: 'Mettre en pause',
      c4Title: 'Carte thermique en temps réel',
      c5Title: 'Reprenez le contrôle dès aujourd\'hui.',
      c5Desc: 'Binaire universel, 18 Mo. Zéro extension noyau, zéro télémétrie.',
    },
    diagnostics: {
      tag: 'Aperçu interactif',
      heading: 'Pointez le coupable. Mettez-le en pause instantanément.',
      subheading:
        'Voici l\'inspecteur lidZen en direct. Cliquez sur un processus pour tracer son binaire et le suspendre sans risque.',
      windowTitle: 'Inspecteur lidZen',
      resumeAll: 'Tout reprendre',
      pauseAll: 'Tout suspendre',
      tasksSuspended: 'Toutes les tâches suspendues',
      scanning: 'Analyse…',
      activeTasks: 'actives',
      pausedTasks: 'en pause',
      binaryTrace: 'Chemin du binaire',
      machState: 'État du thread Mach',
      suspendedBadge: 'Suspendu (SIGSTOP)',
      thermalCulpritBadge: 'Coupable Thermique (Actif)',
      pauseBtn: 'Mettre en pause (SIGSTOP)',
      resumeBtn: 'Reprendre (SIGCONT)',
      resetBtn: 'Réinitialiser',
      aggregateCpu: 'CPU Total',
      maxTemp: 'Temp Max',
      fan: 'Ventilateur',
      discharge: 'Décharge',
    },
    clamshell: {
      tag: 'Mode Clamshell',
      heading: 'Fermez le capot. Votre Mac continue de travailler.',
      subheading:
        'lidZen maintient votre session active sans conflits d\'alimentation et sans écran externe requis.',
      agentsTitle: 'Agents de code IA',
      agentsDesc: 'Laissez vos agents terminer les refactorisations toute la nuit.',
      musicTitle: 'Musique et flux',
      musicDesc: 'Spotify, Apple Music et YouTube continuent sur vos enceintes.',
      automationTitle: 'Automatisation & CI',
      automationDesc: 'Builds et pipelines continuent sans interruption.',
      uploadsTitle: 'Téléchargements volumineux',
      uploadsDesc: 'Exports et synchronisations cloud se terminent sans ouvrir le capot.',
      notifsTitle: 'Notifications',
      notifsDesc: 'Slack, courriels et calendriers restent synchronisés.',
      anythingTitle: 'Tout ce que vous lancez',
      anythingDesc: 'Si cela tourne sur Mac, lidZen le fait tourner avec ou sans capot ouvert.',
    },
    faq: {
      tag: 'Foire aux questions',
      heading: 'Tout ce que vous devez savoir sur lidZen',
      subheading: 'Réponses claires sur les états de veille, autorisations et compatibilité Mac.',
    },
    download: {
      version: 'v2.4 · Binaire universel pour macOS 15+',
      heading: 'Retrouvez les performances de votre Mac dès aujourd\'hui.',
      subheading:
        'Rejoignez des milliers d\'utilisateurs profitant d\'un Mac plus frais et silencieux.',
      cta: 'Télécharger pour macOS',
      buyNow: 'Acheter · 29 $',
      noTelemetry: 'Zéro télémétrie',
      size: 'Installation 18 Mo',
      sequoia: 'macOS 15+ Sequoia',
    },
    footer: {
      rights: 'Tous droits réservés.',
      zeroTelemetry: 'Zéro télémétrie',
      binary: 'Binaire Universel 18 Mo',
      idle: '0.2% CPU Inactif',
    },
  },
  de: {
    nav: {
      features: 'Funktionen',
      diagnostics: 'Diagnose',
      clamshell: 'Clamshell',
      docs: 'Dokumentation',
      download: 'Download',
    },
    hero: {
      badge: 'Neu: Clamshell-Kontinuitäts-Engine',
      titleLine1: 'Halte deinen Mac aktiv,',
      titleLine2: 'bei geschlossenem Deckel.',
      subtitle:
        'lidZen umgeht die macOS-Clamshell-Grenzen, sodass KI-Agenten, Workflows und Musik bei geschlossenem Deckel weiterlaufen — mit präziser Pfaddiagnose zu Hitze und Akku.',
      downloadCta: 'Für macOS herunterladen',
      demoCta: 'Live-Demo ausprobieren',
      silicon: 'Nativ für Apple Silicon & Intel',
      os: 'macOS 15+ Sequoia',
      zeroKexts: 'Keine Kexts · 18 MB Installation',
    },
    hud: {
      title: 'MacBook Pro · lidZen Steuerung',
      continuityActive: 'Kontinuität Aktiv',
      terminalTitle: 'lidZen Terminal',
      readyTasks: 'Bereit: Deckel schließen unterbricht keine Aufgaben',
      clamshellActive: 'Clamshell Aktiv',
      lidClosedPill: 'Deckel zu · Aufgaben laufen mit 100% Tempo',
      lidOpenPill: 'Deckel offen · Aufgaben gestartet',
      clickMacbook: 'MacBook anklicken, um Deckelstatus zu wechseln',
      sleepSaved: '0 Ruhezustand-Unterbrechungen · Display aus (0W)',
      powerDraw: 'STROMBEDARF',
      socTemp: 'SOC TEMP',
      fanSpeed: 'LÜFTER',
      silent: 'Lautlos',
      agentTitle: 'Agent · refactor-auth',
      agentRole: 'Hintergrund-Prozess',
      agentActiveClosed: 'Aktiv · Deckel geschlossen',
      agentActiveOpen: 'Aktiv · Aufgabe zugewiesen',
      nowPlaying: 'M83 · Aktueller Titel',
      speakersActive: 'Streaming · Lautsprecher aktiv',
      streamingClosed: 'Streaming · Deckel geschlossen',
    },
    features: {
      tag: 'Alles in einem Tool',
      heading: 'Entwickelt für Power-User, die ihren Mac fordern',
      subheading:
        'Clamshell-Kontinuität, Pfaddiagnose und sofortige Kontrolle über ressourcenhungrige Prozesse.',
      c1Title: 'KI-Agenten, Workflows und Musik weiterlaufen lassen — Deckel zu.',
      c1Desc:
        'macOS pausiert Hintergrundarbeit beim Schließen. lidZens Engine hält die Session aktiv.',
      c2Title: 'Hitze und Akkuverbrauch bis zum genauen Dateipfad aufspüren.',
      c2Desc: 'Kein Raten mehr. Finde den exakten Prozess hinter der Erwärmung.',
      c3Badge: 'Smart Pause & Suspendierung',
      c3Title: 'Rücksichtslose Prozesse einfrieren ohne Datenverlust.',
      c3Desc:
        'Nicht-destruktive Mach-Aufgabensuspendierung stoppt CPU-Last sofort via SIGSTOP.',
      c3Action: 'Prozesse pausieren',
      c4Title: 'Echtzeit-Wärmekarte',
      c5Title: 'Hole dir die Mac-Leistung zurück.',
      c5Desc: 'Universal-Binary, 18 MB. Keine Kernel-Erweiterungen, null Telemetrie.',
    },
    diagnostics: {
      tag: 'Interaktive Live-Vorschau',
      heading: 'Auf den Verursacher zeigen. Sofort pausieren.',
      subheading:
        'Der echte lidZen-Inspektor in interaktiver Simulation. Klicke auf Prozesse, um ihren Pfad zu sehen und sie sicher zu pausieren.',
      windowTitle: 'lidZen Inspektor',
      resumeAll: 'Alle fortsetzen',
      pauseAll: 'Alle pausieren',
      tasksSuspended: 'Alle Aufgaben pausiert',
      scanning: 'Scanne…',
      activeTasks: 'aktiv',
      pausedTasks: 'pausiert',
      binaryTrace: 'Binärpfad-Rückverfolgung',
      machState: 'Mach-Thread-Status',
      suspendedBadge: 'Pausiert (SIGSTOP)',
      thermalCulpritBadge: 'Wärmeverursacher (Aktiv)',
      pauseBtn: 'Prozess pausieren (SIGSTOP)',
      resumeBtn: 'Prozess fortsetzen (SIGCONT)',
      resetBtn: 'Zurücksetzen',
      aggregateCpu: 'Gesamt-CPU',
      maxTemp: 'Max Temp',
      fan: 'Lüfter',
      discharge: 'Entladung',
    },
    clamshell: {
      tag: 'Clamshell-Modus',
      heading: 'Schließe den Deckel. Dein Mac arbeitet weiter.',
      subheading:
        'lidZen hält deine Session aktiv — ohne störende Schlaf-Zustände und ohne externen Monitor.',
      agentsTitle: 'KI-Coding-Agenten',
      agentsDesc: 'Lass komplexe Refactorings über Nacht bei geschlossenem Deckel laufen.',
      musicTitle: 'Musik & Streams',
      musicDesc: 'Spotify, Apple Music und YouTube spielen weiter über deine Lautsprecher.',
      automationTitle: 'Automatisierung & CI',
      automationDesc: 'Builds und Renderings laufen ungestört im Hintergrund.',
      uploadsTitle: 'Große Uploads',
      uploadsDesc: 'Cloud-Syncs und Exporte schließen ohne offenen Deckel ab.',
      notifsTitle: 'Benachrichtigungen',
      notifsDesc: 'Slack, E-Mail und Kalender bleiben aktiv.',
      anythingTitle: 'Alles was läuft',
      anythingDesc: 'Wenn es auf dem Mac läuft, hält lidZen es am Laufen.',
    },
    faq: {
      tag: 'Häufig gestellte Fragen',
      heading: 'Alles was du über lidZen wissen musst',
      subheading: 'Klare Antworten zu Schlafmodi, Berechtigungen und Mac-Kompatibilität.',
    },
    download: {
      version: 'v2.4 · Universal-Binary für macOS 15+',
      heading: 'Hole dir noch heute die volle Leistung zurück.',
      subheading:
        'Schließe dich tausenden Power-Usern an, die kühlere, leisere Macs mit geschlossenem Deckel nutzen.',
      cta: 'Für macOS herunterladen',
      buyNow: 'Jetzt kaufen · $29',
      noTelemetry: 'Null Telemetrie',
      size: '18 MB Installation',
      sequoia: 'macOS 15+ Sequoia',
    },
    footer: {
      rights: 'Alle Rechte vorbehalten.',
      zeroTelemetry: 'Null Telemetrie',
      binary: '18 MB Universal-Binary',
      idle: '0.2% Leerlauf-CPU',
    },
  },
  ja: {
    nav: {
      features: '機能',
      diagnostics: '診断',
      clamshell: 'クラムシェル',
      docs: 'ドキュメント',
      download: 'ダウンロード',
    },
    hero: {
      badge: '新機能: クラムシェル継続エンジン',
      titleLine1: '蓋を閉じても、',
      titleLine2: 'Macを動かし続ける。',
      subtitle:
        'lidZenはmacOSの制限を解除し、蓋を閉じたままでもAIエージェント、自動ワークフロー、音楽再生を100%継続。発熱とバッテリー消費の正確な原因も特定します。',
      downloadCta: 'macOS版をダウンロード',
      demoCta: 'ライブデモを試す',
      silicon: 'Apple Silicon & Intel ネイティブ',
      os: 'macOS 15+ Sequoia',
      zeroKexts: 'kext不要 · 18 MB インストール',
    },
    hud: {
      title: 'MacBook Pro · lidZen コントロール',
      continuityActive: '継続機能 有効',
      terminalTitle: 'lidZen ターミナル',
      readyTasks: '準備完了: 蓋を閉じてもタスクは中断されません',
      clamshellActive: 'クラムシェル稼働中',
      lidClosedPill: '蓋クローズ · 100%フルスピード稼働中',
      lidOpenPill: '蓋オープン · タスク割り当て済み',
      clickMacbook: 'MacBookをクリックして蓋の開閉を切り替え',
      sleepSaved: 'スリープ中断ゼロ · 画面オフ (0W節約)',
      powerDraw: '消費電力',
      socTemp: 'SOC温度',
      fanSpeed: 'ファン速度',
      silent: '静音',
      agentTitle: 'Agent · refactor-auth',
      agentRole: 'バックグラウンド作業員',
      agentActiveClosed: '稼働中 · 蓋クローズ',
      agentActiveOpen: '稼働中 · タスク実行中',
      nowPlaying: 'M83 · 再生中',
      speakersActive: '再生中 · スピーカー出力',
      streamingClosed: '再生中 · 蓋クローズ',
    },
    features: {
      tag: 'すべての機能を1つのツールで',
      heading: 'Macの性能を極限まで引き出すパワーユーザーのために',
      subheading:
        'クラムシェル継続、パス階層診断、そしてパフォーマンスを奪う暴走プロセスの即時制御。',
      c1Title: '蓋を閉じたまま、AIエージェントや音楽を止めない。',
      c1Desc:
        'macOSは通常、蓋を閉じると作業を休止させます。lidZenならセッションを維持し、長時間のレンダリングも継続します。',
      c2Title: '発熱と電力消費の根本原因をファイルパス単位で追跡。',
      c2Desc: '推測は不要。温度上昇を引き起こしている正確なプロセスやタブを特定します。',
      c3Badge: 'スマート一時停止 & サスペンド',
      c3Title: '状態を保持したまま暴走アプリをフリーズ。',
      c3Desc:
        'Machタスクサスペンド機能によりSIGSTOPでCPU消費を即座に停止。いつでもデータ損失なく再開できます。',
      c3Action: '原因プロセスを一時停止',
      c4Title: 'リアルタイム熱マップ',
      c5Title: '今すぐMac本来の性能を取り戻す。',
      c5Desc: 'ユニバーサルバイナリ、18 MB。カーネル拡張なし、テレメトリ完全ゼロ。',
    },
    diagnostics: {
      tag: 'リアルタイム体験シミュレーション',
      heading: '原因を特定し、瞬時に一時停止。',
      subheading:
        '本物のlidZenインスペクターのシミュレーションです。プロセスをクリックしてバイナリパスを確認し、安全に停止できます。',
      windowTitle: 'lidZen インスペクター',
      resumeAll: 'すべて再開',
      pauseAll: 'すべて停止',
      tasksSuspended: 'すべてのタスクを一時停止済み',
      scanning: 'スキャン中…',
      activeTasks: '件 稼働中',
      pausedTasks: '件 停止中',
      binaryTrace: 'バイナリパス追跡',
      machState: 'Machスレッド状態',
      suspendedBadge: '停止中 (SIGSTOP)',
      thermalCulpritBadge: '熱発生源 (稼働中)',
      pauseBtn: 'プロセスを一時停止 (SIGSTOP)',
      resumeBtn: 'プロセスを再開 (SIGCONT)',
      resetBtn: 'リセット',
      aggregateCpu: '合計CPU',
      maxTemp: '最高温度',
      fan: 'ファン',
      discharge: '放電率',
    },
    clamshell: {
      tag: 'クラムシェルモード',
      heading: '蓋を閉じても、あなたのMacは働き続けます。',
      subheading:
        '外部ディスプレイがなくても、スリープ競合なしにセッションを継続。実行中のタスクはそのまま動き続けます。',
      agentsTitle: 'AIコーディングエージェント',
      agentsDesc: '夜間の大規模リファクタリングを蓋を閉じたまま完了。',
      musicTitle: '音楽 & ストリーミング',
      musicDesc: 'SpotifyやApple Musicをスピーカーで途切れず再生。',
      automationTitle: '自動化 & CI',
      automationDesc: 'ビルドやパイプライン処理をバックグラウンドで完遂。',
      uploadsTitle: '大容量アップロード',
      uploadsDesc: 'クラウド同期や書き出しを蓋を開けたまま待つ必要はありません。',
      notifsTitle: '通知の受信',
      notifsDesc: 'Slack、メール、カレンダーの通知を逃しません。',
      anythingTitle: '実行中のあらゆる作業',
      anythingDesc: 'Mac上で動くタスクなら、lidZenが確実に継続させます。',
    },
    faq: {
      tag: 'よくある質問',
      heading: 'lidZenに関するすべて',
      subheading: 'スリープ状態、権限、互換性についての疑問を解決します。',
    },
    download: {
      version: 'v2.4 · macOS 15+ 対応ユニバーサルバイナリ',
      heading: '今すぐMacの本来のパフォーマンスを取り戻しましょう。',
      subheading:
        '何千人ものプロユーザーが、蓋を閉じたまま静かで低温のMac環境を実現しています。',
      cta: 'macOS版をダウンロード',
      buyNow: '今すぐ購入 · $29',
      noTelemetry: 'テレメトリ完全ゼロ',
      size: '18 MB 軽量設計',
      sequoia: 'macOS 15+ Sequoia',
    },
    footer: {
      rights: '無断転載を禁じます。',
      zeroTelemetry: 'テレメトリ完全ゼロ',
      binary: '18 MB ユニバーサルバイナリ',
      idle: 'アイドル時CPU 0.2%',
    },
  },
  zh: {
    nav: {
      features: '功能特性',
      diagnostics: '实时诊断',
      clamshell: '合盖续航',
      docs: '文档指南',
      download: '立即下载',
    },
    hero: {
      badge: '全新：合盖持续引擎',
      titleLine1: '合上屏幕，',
      titleLine2: 'Mac 任务依旧奔腾。',
      subtitle:
        'lidZen 突破 macOS 合盖休眠限制，让 AI 代理、自动化工作流和音乐播放合盖无间断运行，同时深度定位发热与电量消耗根源。',
      downloadCta: '下载 macOS 版',
      demoCta: '体验实时演示',
      silicon: '原生支持 Apple Silicon 与 Intel',
      os: 'macOS 15+ Sequoia',
      zeroKexts: '无需内核扩展 · 18 MB 轻量安装',
    },
    hud: {
      title: 'MacBook Pro · lidZen 控制中心',
      continuityActive: '持续引擎已启动',
      terminalTitle: 'lidZen 终端',
      readyTasks: '已就绪：合上屏幕不会中断后台任务',
      clamshellActive: '合盖模式运行中',
      lidClosedPill: '屏幕已合上 · 任务以 100% 速度全速运行',
      lidOpenPill: '屏幕开启 · 任务已分派',
      clickMacbook: '点击 MacBook 切换合盖状态',
      sleepSaved: '零休眠中断 · 屏幕已熄灭（节能 0W）',
      powerDraw: '实时功耗',
      socTemp: '芯片温度',
      fanSpeed: '风扇转速',
      silent: '静音运行',
      agentTitle: 'Agent · refactor-auth',
      agentRole: '后台工作代理',
      agentActiveClosed: '运行中 · 合盖状态',
      agentActiveOpen: '运行中 · 任务执行中',
      nowPlaying: 'M83 · 正在播放',
      speakersActive: '音频推流 · 扬声器激活',
      streamingClosed: '音频推流 · 合盖播放',
    },
    features: {
      tag: '强大功能，一体掌控',
      heading: '为追求极限性能的 Mac 极客打造',
      subheading:
        '合盖无休眠、文件路径级精准诊断，以及对肆虐后台进程的秒级掌控。',
      c1Title: '合上屏幕，AI 代理、脚本与音乐持久运行。',
      c1Desc:
        'macOS 默认在合盖时挂起任务。lidZen 保持会话全速运行，让长耗时渲染和代理任务不掉线。',
      c2Title: '顺藤摸瓜，准确定位发热与耗电的具体文件路径。',
      c2Desc: '告别盲目猜测。一眼看穿到底是哪个具体进程、网页标签或容器在发烫。',
      c3Badge: '智能暂停与进程挂起',
      c3Title: '冻结失控应用，数据状态丝毫不丢。',
      c3Desc:
        '通过非破坏性 Mach 任务挂起（SIGSTOP）秒级切断 CPU 与电池消耗，随时无损恢复。',
      c3Action: '一键暂停失控进程',
      c4Title: '实时核心温度拓扑',
      c5Title: '即刻释放您的 Mac 巅峰性能。',
      c5Desc: '通用二进制，仅 18 MB。无内核驱动注入，零隐私数据上传。',
    },
    diagnostics: {
      tag: '实时互动模拟体验',
      heading: '精准锁定元凶，瞬间挂起暂停。',
      subheading:
        '这是运行在浏览器中的真实 lidZen 诊断模拟器。点击任意进程查看可执行文件路径，并随时用 SIGSTOP 挂起。',
      windowTitle: 'lidZen 诊断控制台',
      resumeAll: '全部恢复',
      pauseAll: '全部暂停',
      tasksSuspended: '所有失控任务已安全暂停',
      scanning: '扫描中…',
      activeTasks: '个运行中',
      pausedTasks: '个已暂停',
      binaryTrace: '二进制可执行路径追踪',
      machState: 'Mach 线程状态',
      suspendedBadge: '已挂起 (SIGSTOP)',
      thermalCulpritBadge: '发热源 (运行中)',
      pauseBtn: '暂停进程 (SIGSTOP)',
      resumeBtn: '恢复进程 (SIGCONT)',
      resetBtn: '重置模拟',
      aggregateCpu: '总计 CPU',
      maxTemp: '最高温',
      fan: '风扇',
      discharge: '放电率',
    },
    clamshell: {
      tag: '合盖工作模式',
      heading: '合上盖子，你的 Mac 依然动力全开。',
      subheading:
        'lidZen 保持后台会话常驻，无需外接显示器，彻底告别休眠中断烦恼。',
      agentsTitle: 'AI 编程代理',
      agentsDesc: '整夜合盖运行，任由智能体自主重构大型代码库。',
      musicTitle: '音乐与广播流',
      musicDesc: 'Spotify、Apple Music 及视频音频持续推送到音响。',
      automationTitle: '自动化构建与 CI',
      automationDesc: '大型编译、3D 渲染与打包流水线在后台平稳推进。',
      uploadsTitle: '大文件云同步',
      uploadsDesc: '网盘同步与视频导出无需强撑开启屏幕。',
      notifsTitle: '重要通知常驻',
      notifsDesc: 'Slack、邮件及日历通知随时响应。',
      anythingTitle: '你运行的任何程序',
      anythingDesc: '只要 Mac 能跑，盖上屏幕 lidZen 就能让它继续跑。',
    },
    faq: {
      tag: '常见问答',
      heading: '关于 lidZen 的一切',
      subheading: '解答您在休眠状态、系统权限与兼容性方面的所有疑问。',
    },
    download: {
      version: 'v2.4 · 适用于 macOS 15+ 的通用二进制包',
      heading: '即刻释放您的 Mac 巅峰性能。',
      subheading:
        '加入成千上万的高级用户行列，合盖享受更冷静、更安静的高性能 Mac。',
      cta: '下载 macOS 版',
      buyNow: '立即购买 · $29',
      noTelemetry: '零隐私遥测',
      size: '18 MB 极速安装',
      sequoia: 'macOS 15+ Sequoia',
    },
    footer: {
      rights: '保留所有权利。',
      zeroTelemetry: '零隐私遥测',
      binary: '18 MB 通用二进制',
      idle: '0.2% 极低待机 CPU',
    },
  },
};

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: typeof translations['en'];
  currentOption: LanguageOption;
}

const LanguageContext = createContext<LanguageContextType>({
  language: 'en',
  setLanguage: () => {},
  t: translations.en,
  currentOption: LANGUAGES[0],
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('lidzen-lang') as LanguageCode;
      // Strict allowlist validation prevents prototype poisoning and crash via 'toString' or '__proto__'
      if (saved && LANGUAGES.some((l) => l.code === saved)) {
        setLanguageState(saved);
      } else {
        // Detect browser language
        const browserLang = navigator.language?.toLowerCase() || '';
        if (browserLang.startsWith('es')) setLanguageState('es');
        else if (browserLang.startsWith('fr')) setLanguageState('fr');
        else if (browserLang.startsWith('de')) setLanguageState('de');
        else if (browserLang.startsWith('ja')) setLanguageState('ja');
        else if (browserLang.startsWith('zh')) setLanguageState('zh');
      }
    } catch {}
  }, []);

  const setLanguage = useCallback((lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('lidzen-lang', lang);
    } catch {}
  }, []);

  const currentOption = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const t = translations[language] || translations.en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, currentOption }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
