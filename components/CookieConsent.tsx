import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('lidzen_cookie_consent');
      if (!dismissed) {
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {}
  }, []);

  const handleDismiss = () => {
    try {
      localStorage.setItem('lidzen_cookie_consent', 'true');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Privacy guarantee"
      className="cookie-pill-wrap"
    >
      <div className="cookie-pill">
        <span className="cookie-icon" aria-hidden="true">🔒</span>
        <span className="cookie-msg">Zero tracking cookies · Essential storage only</span>
        <Link href="/privacy" className="cookie-link">
          Privacy Policy
        </Link>
        <button
          type="button"
          onClick={handleDismiss}
          className="cookie-close-btn"
          aria-label="Acknowledge and dismiss privacy notice"
          title="Acknowledge"
        >
          Got it
        </button>
      </div>

      <style jsx>{`
        .cookie-pill-wrap {
          position: fixed;
          bottom: calc(20px + env(safe-area-inset-bottom, 0px));
          right: 24px;
          z-index: 99;
          animation: fadeSlideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fadeSlideIn {
          from {
            opacity: 0;
            transform: translateY(12px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .cookie-pill {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 5px 8px 5px 12px;
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(16, 28, 54, 0.12);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          box-shadow: 0 10px 28px -6px rgba(16, 28, 54, 0.16), 0 2px 6px rgba(0, 0, 0, 0.04);
          white-space: nowrap;
          font-family: var(--ber, system-ui, sans-serif);
        }
        .cookie-icon {
          font-size: 12px;
          line-height: 1;
        }
        .cookie-msg {
          font-size: 12px;
          font-weight: 500;
          color: var(--navy, #101c36);
          letter-spacing: -0.01em;
        }
        .cookie-link {
          font-size: 12px;
          font-weight: 600;
          color: #0066cc;
          text-decoration: underline;
          text-underline-offset: 2px;
          padding: 2px 4px;
          transition: color 0.15s;
        }
        .cookie-link:hover {
          color: #0066cc;
        }
        .cookie-close-btn {
          display: inline-grid;
          place-items: center;
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 1px solid var(--line, #dde1ea);
          background: rgba(16, 28, 54, 0.06);
          color: var(--slate, #737b8c);
          font-size: 12px;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, transform 0.1s;
        }
        .cookie-close-btn:hover {
          background: rgba(16, 28, 54, 0.14);
          color: #0f172a;
        }
        .cookie-close-btn:active {
          transform: scale(0.9);
        }

        :global(body.dark) .cookie-pill {
          background: rgba(15, 23, 42, 0.9);
          border-color: rgba(255, 255, 255, 0.15);
          box-shadow: 0 10px 28px -6px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.3);
        }
        :global(body.dark) .cookie-msg {
          color: #e2e8f0;
        }
        :global(body.dark) .cookie-link {
          color: #60a5fa;
        }
        :global(body.dark) .cookie-close-btn {
          background: rgba(255, 255, 255, 0.1);
          color: #94a3b8;
        }
        :global(body.dark) .cookie-close-btn:hover {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }

        @media (max-width: 640px) {
          .cookie-pill-wrap {
            right: 12px;
            bottom: calc(14px + env(safe-area-inset-bottom, 0px));
            max-width: calc(100vw - 24px);
          }
          .cookie-pill {
            gap: 7px;
            padding: 4px 6px 4px 10px;
          }
          .cookie-msg {
            font-size: 12px;
          }
          .cookie-link {
            font-size: 12px;
          }
        }
      `}</style>
    </aside>
  );
}
