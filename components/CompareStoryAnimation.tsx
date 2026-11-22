import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

export default function CompareStoryAnimation() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const [tabVisible, setTabVisible] = useState(true);
  const [scrolledPastFirstPage, setScrolledPastFirstPage] = useState(false);

  useEffect(() => {
    // Visibility change: pause when tab is inactive to save CPU/battery
    const handleVisibility = () => {
      setTabVisible(!document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (typeof window === 'undefined') return;
      // On the home page, the first page is the hero fold (~700px)
      // Strictly do not show on the first page; reveal only after scrolling past it
      if (router.pathname === '/') {
        const threshold = Math.max(480, window.innerHeight * 0.65);
        setScrolledPastFirstPage(window.scrollY > threshold);
      } else {
        const threshold = Math.max(160, window.innerHeight * 0.22);
        setScrolledPastFirstPage(window.scrollY > threshold);
      }
    };

    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [router.pathname]);

  const isPlaying = tabVisible && scrolledPastFirstPage;

  return (
    <div
      ref={containerRef}
      className={`csa-root ${isPlaying ? 'csa-running' : 'csa-paused'} ${scrolledPastFirstPage ? 'csa-visible' : 'csa-hidden'}`}
      aria-hidden="true"
    >
      {/* Ambient background glow & heat shimmer */}
      <div className="csa-shimmer" />

      {/* lidZen sweeping light line */}
      <div className="csa-lid-sweep" />

      {/* Corner lidZen active mark */}
      <div className="csa-lidzen-marker">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="4" width="20" height="12" rx="2" />
          <path d="M6 20h12" />
          <path d="M10 16v4" />
          <path d="M14 16v4" />
        </svg>
        <span>lidZen Active</span>
      </div>

      {/* Status telemetry widget (Fan + CPU Gauge) */}
      <div className="csa-telemetry">
        <div className="csa-fan-wrap">
          <svg className="csa-fan-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 12c2.5-3 6.5-1.5 6 2s-4 3.5-6-2z" />
            <path d="M12 12c-3-2.5-1.5-6.5 2-6s3.5 4-2 6z" />
            <path d="M12 12c-2.5 3-6.5 1.5-6-2s4-3.5 6 2z" />
            <path d="M12 12c3 2.5 1.5 6.5-2 6s-3.5-4 2-6z" />
          </svg>
          <span className="csa-fan-label">Cooling</span>
        </div>
        <div className="csa-gauge-wrap">
          <div className="csa-gauge-header">
            <span>Core Load</span>
            <span className="csa-gauge-pct">96%</span>
          </div>
          <div className="csa-gauge-bar">
            <div className="csa-gauge-fill" />
          </div>
        </div>
      </div>

      {/* Alert & Fix-It Process Cards */}
      {/* Left Column Cards */}
      <div className="csa-card csa-card-1">
        <div className="csa-card-top">
          <div className="csa-status-icon alert">!</div>
          <div className="csa-status-icon paused">❚❚</div>
          <div className="csa-status-icon resolved">✓</div>
          <span className="csa-process">swift-frontend</span>
          <span className="csa-tag alert">312% CPU</span>
          <span className="csa-tag paused">Paused</span>
          <span className="csa-tag resolved">Resolved</span>
        </div>
        <div className="csa-card-path">~/Developer/MyProject</div>
        <div className="csa-card-sub">High CPU · Thermal throttle risk</div>
      </div>

      <div className="csa-card csa-card-2">
        <div className="csa-card-top">
          <div className="csa-status-icon alert">!</div>
          <div className="csa-status-icon paused">❚❚</div>
          <div className="csa-status-icon resolved">✓</div>
          <span className="csa-process">node</span>
          <span className="csa-tag alert">188% CPU</span>
          <span className="csa-tag paused">Paused</span>
          <span className="csa-tag resolved">Resolved</span>
        </div>
        <div className="csa-card-path">file watcher daemon</div>
        <div className="csa-card-sub">Rapid loop · Battery drain</div>
      </div>

      <div className="csa-card csa-card-3">
        <div className="csa-card-top">
          <div className="csa-status-icon alert">!</div>
          <div className="csa-status-icon paused">❚❚</div>
          <div className="csa-status-icon resolved">✓</div>
          <span className="csa-process">Docker</span>
          <span className="csa-tag alert">High Load</span>
          <span className="csa-tag paused">Paused</span>
          <span className="csa-tag resolved">Resolved</span>
        </div>
        <div className="csa-card-path">postgres-dev</div>
        <div className="csa-card-sub">Indexing in background</div>
      </div>

      {/* Right Column Cards */}
      <div className="csa-card csa-card-4">
        <div className="csa-card-top">
          <div className="csa-status-icon alert">!</div>
          <div className="csa-status-icon paused">❚❚</div>
          <div className="csa-status-icon resolved">✓</div>
          <span className="csa-process">mdworker_shared</span>
          <span className="csa-tag alert">94% CPU</span>
          <span className="csa-tag paused">Paused</span>
          <span className="csa-tag resolved">Resolved</span>
        </div>
        <div className="csa-card-path">Spotlight index cache</div>
        <div className="csa-card-sub">Continuous disk write wakeups</div>
      </div>

      <div className="csa-card csa-card-5">
        <div className="csa-card-top">
          <div className="csa-status-icon alert">!</div>
          <div className="csa-status-icon paused">❚❚</div>
          <div className="csa-status-icon resolved">✓</div>
          <span className="csa-process">rustc</span>
          <span className="csa-tag alert">64% CPU</span>
          <span className="csa-tag paused">Paused</span>
          <span className="csa-tag resolved">Resolved</span>
        </div>
        <div className="csa-card-path">cargo build --release</div>
        <div className="csa-card-sub">Heavy background compile</div>
      </div>

      <div className="csa-card csa-card-6">
        <div className="csa-card-top">
          <div className="csa-status-icon alert">!</div>
          <div className="csa-status-icon paused">❚❚</div>
          <div className="csa-status-icon resolved">✓</div>
          <span className="csa-process">Xcode</span>
          <span className="csa-tag alert">Not Responding</span>
          <span className="csa-tag paused">Paused</span>
          <span className="csa-tag resolved">Resolved</span>
        </div>
        <div className="csa-card-path">SourceKit-LSP bridge</div>
        <div className="csa-card-sub">UI process unresponsive</div>
      </div>

      <style jsx>{`
        /* Global Viewport Background Canvas - Strictly behind all content */
        .csa-root {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 1;
          overflow: hidden;
          user-select: none;
          background: transparent;
          border: none;
          box-shadow: none;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease;
        }

        .csa-root.csa-hidden {
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
        }

        .csa-root.csa-visible {
          opacity: 1;
          visibility: visible;
        }

        /* Running vs Paused execution */
        .csa-paused * {
          animation-play-state: paused !important;
        }

        /* Ambient Heat & Calm Shimmer - Edge to Edge coverage */
        .csa-shimmer {
          position: absolute;
          inset: 0;
          width: 100vw;
          height: 100vh;
          opacity: 0.7;
          animation: csaShimmerLoop 14s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes csaShimmerLoop {
          0%, 5% {
            background: radial-gradient(circle at 12% 40%, rgba(239, 68, 68, 0.18) 0%, transparent 50%),
                        radial-gradient(circle at 88% 55%, rgba(239, 68, 68, 0.16) 0%, transparent 50%);
            opacity: 0.6;
          }
          25%, 35% {
            background: radial-gradient(circle at 10% 38%, rgba(239, 68, 68, 0.28) 0%, transparent 55%),
                        radial-gradient(circle at 90% 58%, rgba(239, 68, 68, 0.26) 0%, transparent 55%);
            opacity: 0.9;
          }
          40% {
            background: radial-gradient(circle at 10% 40%, rgba(239, 68, 68, 0.32) 0%, transparent 60%),
                        radial-gradient(circle at 90% 50%, rgba(239, 68, 68, 0.3) 0%, transparent 60%);
            opacity: 0.95;
          }
          48% {
            background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.22) 0%, transparent 70%);
            opacity: 0.7;
          }
          58%, 85% {
            background: radial-gradient(circle at 12% 40%, rgba(56, 189, 248, 0.14) 0%, transparent 60%),
                        radial-gradient(circle at 88% 60%, rgba(37, 99, 235, 0.14) 0%, transparent 60%);
            opacity: 0.6;
          }
          95%, 100% {
            background: transparent;
            opacity: 0;
          }
        }

        /* Sweeping Lid Light Line - sweeps full screen edge-to-edge */
        .csa-lid-sweep {
          position: absolute;
          top: 0;
          bottom: 0;
          width: 35vw;
          min-width: 400px;
          transform: translateX(-40vw) skewX(-20deg);
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(56, 189, 248, 0.05) 20%,
            rgba(56, 189, 248, 0.65) 50%,
            rgba(255, 255, 255, 0.95) 52%,
            rgba(56, 189, 248, 0.65) 54%,
            transparent 100%
          );
          filter: blur(14px);
          animation: csaSweepLoop 14s cubic-bezier(0.16, 1, 0.3, 1) infinite;
          opacity: 0;
        }

        @keyframes csaSweepLoop {
          0%, 35% {
            transform: translateX(-40vw) skewX(-20deg);
            opacity: 0;
          }
          36% {
            opacity: 0.85;
          }
          48% {
            transform: translateX(125vw) skewX(-20deg);
            opacity: 0.95;
          }
          55%, 100% {
            transform: translateX(135vw) skewX(-20deg);
            opacity: 0;
          }
        }

        /* Corner lidZen Marker (lights up 5s-9s) */
        .csa-lidzen-marker {
          position: absolute;
          top: 75px;
          right: max(20px, calc((100vw - 1240px) / 2 - 260px));
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 12px;
          font-weight: 600;
          color: #0284c7;
          background: rgba(224, 242, 254, 0.88);
          border: 1px solid rgba(56, 189, 248, 0.5);
          box-shadow: 0 4px 16px rgba(56, 189, 248, 0.25);
          animation: csaMarkerLoop 14s ease-in-out infinite;
          opacity: 0;
          z-index: 1;
        }
        :global(body.dark) .csa-lidzen-marker {
          color: #38bdf8;
          background: rgba(14, 30, 56, 0.88);
          border-color: rgba(56, 189, 248, 0.4);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.35);
        }

        @keyframes csaMarkerLoop {
          0%, 37% {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          40%, 75% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
          85%, 100% {
            opacity: 0;
            transform: translateY(-4px) scale(0.95);
          }
        }

        /* Status Telemetry Widget (Fan + CPU) */
        .csa-telemetry {
          position: absolute;
          top: 75px;
          left: max(20px, calc((100vw - 1240px) / 2 - 260px));
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(226, 232, 240, 0.9);
          border-radius: 14px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
          backdrop-filter: blur(10px);
          animation: csaTelemetryFade 14s ease-in-out infinite;
          z-index: 1;
        }
        :global(body.dark) .csa-telemetry {
          background: rgba(16, 28, 54, 0.88);
          border-color: rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
        }

        @keyframes csaTelemetryFade {
          0%, 5% {
            opacity: 0;
            transform: translateY(10px);
          }
          10%, 85% {
            opacity: 1;
            transform: translateY(0);
          }
          95%, 100% {
            opacity: 0;
            transform: translateY(-10px);
          }
        }

        .csa-fan-wrap {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 600;
          color: #64748b;
        }
        :global(body.dark) .csa-fan-wrap {
          color: #94a3b8;
        }

        .csa-fan-icon {
          animation: csaFanSpin 14s linear infinite;
          transform-origin: center;
          color: #ef4444;
          transition: color 0.5s;
        }
        @keyframes csaFanSpin {
          0%, 36% {
            transform: rotate(2800deg);
            color: #ef4444;
          }
          45% {
            transform: rotate(3800deg);
            color: #38bdf8;
          }
          65%, 100% {
            transform: rotate(4100deg);
            color: #0ea5e9;
          }
        }

        .csa-gauge-wrap {
          display: flex;
          flex-direction: column;
          gap: 4px;
          min-width: 90px;
        }
        .csa-gauge-header {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 600;
          color: #64748b;
        }
        :global(body.dark) .csa-gauge-header {
          color: #94a3b8;
        }

        .csa-gauge-bar {
          height: 5px;
          background: rgba(148, 163, 184, 0.25);
          border-radius: 999px;
          overflow: hidden;
        }
        .csa-gauge-fill {
          height: 100%;
          border-radius: 999px;
          animation: csaGaugeLoop 14s ease-in-out infinite;
        }
        @keyframes csaGaugeLoop {
          0% {
            width: 35%;
            background: #f59e0b;
          }
          15%, 36% {
            width: 96%;
            background: #ef4444;
          }
          45% {
            width: 80%;
            background: #0ea5e9;
          }
          55%, 90% {
            width: 4%;
            background: #10b981;
          }
          100% {
            width: 15%;
            background: #10b981;
          }
        }

        /* Generic Notification Cards */
        .csa-card {
          position: absolute;
          width: 250px;
          padding: 12px 14px;
          border-radius: 14px;
          backdrop-filter: blur(12px);
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          box-shadow: 0 10px 25px -4px rgba(0, 0, 0, 0.08);
          animation-duration: 14s;
          animation-iteration-count: infinite;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
          opacity: 0;
          z-index: 1;
        }

        /* Light mode card base */
        .csa-card {
          background: rgba(255, 255, 255, 0.88);
          border: 1px solid rgba(239, 68, 68, 0.35);
        }
        /* Dark mode card base */
        :global(body.dark) .csa-card {
          background: rgba(18, 28, 52, 0.88);
          border: 1px solid rgba(239, 68, 68, 0.45);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5), 0 0 15px rgba(239, 68, 68, 0.2);
        }

        .csa-card-top {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 6px;
        }

        .csa-status-icon {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          flex-shrink: 0;
        }
        .csa-status-icon.alert {
          background: #fee2e2;
          color: #dc2626;
        }
        :global(body.dark) .csa-status-icon.alert {
          background: rgba(239, 68, 68, 0.25);
          color: #f87171;
        }

        .csa-status-icon.paused {
          display: none;
          background: #e0f2fe;
          color: #0284c7;
          font-size: 8px;
        }
        :global(body.dark) .csa-status-icon.paused {
          background: rgba(56, 189, 248, 0.25);
          color: #38bdf8;
        }

        .csa-status-icon.resolved {
          display: none;
          background: #dcfce7;
          color: #16a34a;
        }
        :global(body.dark) .csa-status-icon.resolved {
          background: rgba(34, 197, 94, 0.25);
          color: #4ade80;
        }

        .csa-process {
          font-size: 12px;
          font-weight: 700;
          color: #0f172a;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          flex: 1;
        }
        :global(body.dark) .csa-process {
          color: #f8fafc;
        }

        .csa-tag {
          font-size: 10px;
          font-weight: 600;
          padding: 2px 7px;
          border-radius: 999px;
          letter-spacing: 0.02em;
        }
        .csa-tag.alert {
          background: #fef2f2;
          color: #b91c1c;
          border: 1px solid #fecaca;
        }
        :global(body.dark) .csa-tag.alert {
          background: rgba(239, 68, 68, 0.18);
          color: #fca5a5;
          border-color: rgba(239, 68, 68, 0.4);
        }

        .csa-tag.paused {
          display: none;
          background: #e0f2fe;
          color: #0369a1;
          border: 1px solid #bae6fd;
        }
        :global(body.dark) .csa-tag.paused {
          background: rgba(56, 189, 248, 0.18);
          color: #7dd3fc;
          border-color: rgba(56, 189, 248, 0.4);
        }

        .csa-tag.resolved {
          display: none;
          background: #dcfce7;
          color: #15803d;
          border: 1px solid #bbf7d0;
        }
        :global(body.dark) .csa-tag.resolved {
          background: rgba(34, 197, 94, 0.18);
          color: #86efac;
          border-color: rgba(34, 197, 94, 0.4);
        }

        .csa-card-path {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 10.5px;
          color: #475569;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        :global(body.dark) .csa-card-path {
          color: #94a3b8;
        }

        .csa-card-sub {
          font-size: 10.5px;
          color: #dc2626;
          margin-top: 3px;
          font-weight: 500;
          transition: color 0.4s;
        }
        :global(body.dark) .csa-card-sub {
          color: #f87171;
        }

        /* Positioning of Cards: Gutter-pinned framing around the content */
        /* Left Column */
        .csa-card-1 {
          top: 170px;
          left: max(16px, calc((100vw - 1240px) / 2 - 260px));
          animation-name: csaCardAnim1;
        }
        .csa-card-2 {
          top: 320px;
          left: max(16px, calc((100vw - 1240px) / 2 - 260px));
          animation-name: csaCardAnim2;
        }
        .csa-card-3 {
          top: 470px;
          left: max(16px, calc((100vw - 1240px) / 2 - 260px));
          animation-name: csaCardAnim3;
        }

        /* Right Column */
        .csa-card-4 {
          top: 170px;
          right: max(16px, calc((100vw - 1240px) / 2 - 260px));
          animation-name: csaCardAnim4;
        }
        .csa-card-5 {
          top: 320px;
          right: max(16px, calc((100vw - 1240px) / 2 - 260px));
          animation-name: csaCardAnim5;
        }
        .csa-card-6 {
          top: 470px;
          right: max(16px, calc((100vw - 1240px) / 2 - 260px));
          animation-name: csaCardAnim6;
        }

        /* Keyframes for Staggered Trouble -> Icy Blue Paused -> Resolved shrink */
        @keyframes csaCardAnim1 {
          0%, 3% {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          4%, 35% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(239, 68, 68, 0.45);
          }
          38%, 48% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(56, 189, 248, 0.6);
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
          }
          52% {
            opacity: 0.9;
            transform: scale(0.85);
          }
          56%, 100% {
            opacity: 0;
            transform: scale(0.7) translateY(-10px);
          }
        }

        @keyframes csaCardAnim2 {
          0%, 7% {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          9%, 35% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(239, 68, 68, 0.45);
          }
          39%, 50% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(56, 189, 248, 0.6);
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
          }
          54% {
            opacity: 0.9;
            transform: scale(0.85);
          }
          58%, 100% {
            opacity: 0;
            transform: scale(0.7) translateY(-10px);
          }
        }

        @keyframes csaCardAnim3 {
          0%, 12% {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          14%, 35% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(239, 68, 68, 0.45);
          }
          40%, 52% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(56, 189, 248, 0.6);
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
          }
          56% {
            opacity: 0.9;
            transform: scale(0.85);
          }
          60%, 100% {
            opacity: 0;
            transform: scale(0.7) translateY(-10px);
          }
        }

        @keyframes csaCardAnim4 {
          0%, 5% {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          7%, 35% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(239, 68, 68, 0.45);
          }
          38%, 49% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(56, 189, 248, 0.6);
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
          }
          53% {
            opacity: 0.9;
            transform: scale(0.85);
          }
          57%, 100% {
            opacity: 0;
            transform: scale(0.7) translateY(-10px);
          }
        }

        @keyframes csaCardAnim5 {
          0%, 9% {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          11%, 35% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(239, 68, 68, 0.45);
          }
          40%, 51% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(56, 189, 248, 0.6);
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
          }
          55% {
            opacity: 0.9;
            transform: scale(0.85);
          }
          59%, 100% {
            opacity: 0;
            transform: scale(0.7) translateY(-10px);
          }
        }

        @keyframes csaCardAnim6 {
          0%, 14% {
            opacity: 0;
            transform: translateY(16px) scale(0.92);
          }
          16%, 35% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(239, 68, 68, 0.45);
          }
          41%, 53% {
            opacity: 1;
            transform: translateY(0) scale(1);
            border-color: rgba(56, 189, 248, 0.6);
            box-shadow: 0 10px 25px rgba(56, 189, 248, 0.25);
          }
          57% {
            opacity: 0.9;
            transform: scale(0.85);
          }
          61%, 100% {
            opacity: 0;
            transform: scale(0.7) translateY(-10px);
          }
        }

        /* Alert -> Paused -> Resolved toggles */
        @keyframes csaAlertToggle {
          0%, 36% { display: flex; opacity: 1; }
          37%, 100% { display: none; opacity: 0; }
        }
        @keyframes csaPausedToggle {
          0%, 36% { display: none; opacity: 0; }
          37%, 52% { display: flex; opacity: 1; }
          53%, 100% { display: none; opacity: 0; }
        }
        @keyframes csaResolvedToggle {
          0%, 52% { display: none; opacity: 0; }
          53%, 68% { display: flex; opacity: 1; }
          69%, 100% { display: none; opacity: 0; }
        }

        .csa-status-icon.alert,
        .csa-tag.alert {
          animation: csaAlertToggle 14s step-end infinite;
        }
        .csa-status-icon.paused,
        .csa-tag.paused {
          animation: csaPausedToggle 14s step-end infinite;
        }
        .csa-status-icon.resolved,
        .csa-tag.resolved {
          animation: csaResolvedToggle 14s step-end infinite;
        }

        @keyframes csaSubTextChange {
          0%, 36% {
            color: #dc2626;
          }
          37%, 68% {
            color: #0284c7;
          }
          69%, 100% {
            color: #16a34a;
          }
        }
        :global(body.dark) .csa-card-sub {
          animation: csaSubTextChangeDark 14s ease infinite;
        }
        .csa-card-sub {
          animation: csaSubTextChange 14s ease infinite;
        }

        @keyframes csaSubTextChangeDark {
          0%, 36% {
            color: #f87171;
          }
          37%, 68% {
            color: #38bdf8;
          }
          69%, 100% {
            color: #4ade80;
          }
        }

        /* RESPONSIVE: On screens narrower than 1200px, hide side cards so content is 100% clean,
           while keeping the ambient heat shimmer and sweeping light beam */
        @media (max-width: 1200px) {
          .csa-card,
          .csa-telemetry,
          .csa-lidzen-marker {
            display: none !important;
          }
        }

        /* ACCESSIBILITY: prefers-reduced-motion */
        @media (prefers-reduced-motion: reduce) {
          .csa-shimmer,
          .csa-lid-sweep,
          .csa-card,
          .csa-telemetry,
          .csa-lidzen-marker {
            animation: none !important;
            transition: none !important;
          }
          .csa-shimmer {
            background: radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 70%);
            opacity: 0.5;
          }
          .csa-lid-sweep {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
