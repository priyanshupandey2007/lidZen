import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ExternalLink, X } from 'lucide-react';

interface ContactModalProps {
  email?: string;
  defaultSubject?: string;
}

export function openContactModal(subject?: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('lidzen-open-contact-modal', { detail: { subject } }));
  }
}

export default function ContactModal({
  email = 'support@lidzen.com',
  defaultSubject = 'lidZen Support & Inquiry',
}: ContactModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [subject, setSubject] = useState(defaultSubject);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleOpen = (e: any) => {
      if (e.detail?.subject) {
        setSubject(e.detail.subject);
      } else {
        setSubject(defaultSubject);
      }
      setIsOpen(true);
      setCopied(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('lidzen-open-contact-modal', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('lidzen-open-contact-modal', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [defaultSubject]);

  if (!isOpen) return null;

  const encodedSub = encodeURIComponent(subject);
  const mailtoUrl = `mailto:${email}?subject=${encodedSub}`;
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}&su=${encodedSub}`;
  const outlookUrl = `https://outlook.live.com/mail/0/deeplink/compose?to=${encodeURIComponent(email)}&subject=${encodedSub}`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="relative w-full max-w-md rounded-3xl bg-white dark:bg-[#0e1320] border border-black/10 dark:border-white/10 p-6 sm:p-7 shadow-2xl text-slate-900 dark:text-zinc-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close dialog"
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 h-8 w-8 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
        >
          <X size={16} />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-5">
          <div className="h-11 w-11 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Mail size={22} />
          </div>
          <div>
            <h3 id="contact-modal-title" className="text-lg font-bold tracking-tight">
              Contact lidZen Support
            </h3>
            <p className="text-xs text-slate-500 dark:text-zinc-400 font-mono mt-0.5">
              {email}
            </p>
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-zinc-400 leading-relaxed mb-4">
          Choose your preferred way to send your query. We typically reply within 24 hours.
        </p>

        {/* Action Options */}
        <div className="space-y-2.5">
          {/* 1. Gmail Web */}
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between w-full p-3.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] transition group text-left"
          >
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center text-xs font-bold font-mono">
                M
              </span>
              <div>
                <div className="text-sm font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  Open in Gmail (Web)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Opens compose window directly in your browser
                </div>
              </div>
            </div>
            <ExternalLink size={15} className="text-slate-400 group-hover:translate-x-0.5 transition" />
          </a>

          {/* 2. Default Email App (mailto) */}
          <a
            href={mailtoUrl}
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between w-full p-3.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] transition group text-left"
          >
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
                <Mail size={16} />
              </span>
              <div>
                <div className="text-sm font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  Default Mail App
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Apple Mail, Windows Mail, Outlook, or Thunderbird
                </div>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400 group-hover:translate-x-0.5 transition">→</span>
          </a>

          {/* 3. Outlook Web */}
          <a
            href={outlookUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between w-full p-3.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] transition group text-left"
          >
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center text-xs font-bold font-mono">
                O
              </span>
              <div>
                <div className="text-sm font-semibold group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition">
                  Open in Outlook (Web)
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400">
                  Hotmail, Live, or Office 365 webmail
                </div>
              </div>
            </div>
            <ExternalLink size={15} className="text-slate-400 group-hover:translate-x-0.5 transition" />
          </a>

          {/* 4. Copy Email Address */}
          <button
            type="button"
            onClick={copyToClipboard}
            className="flex items-center justify-between w-full p-3.5 rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-slate-50 hover:bg-slate-100 dark:bg-white/[0.03] dark:hover:bg-white/[0.07] transition group text-left"
          >
            <div className="flex items-center gap-3">
              <span className="h-8 w-8 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs">
                {copied ? <Check size={16} /> : <Copy size={16} />}
              </span>
              <div>
                <div className="text-sm font-semibold">
                  {copied ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                      Copied {email} to clipboard!
                    </span>
                  ) : (
                    'Copy Email Address'
                  )}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-zinc-400 font-mono">
                  {email}
                </div>
              </div>
            </div>
            <span className="text-xs text-slate-400">
              {copied ? '✓' : 'Copy'}
            </span>
          </button>
        </div>

        <div className="mt-5 pt-4 border-t border-black/[0.06] dark:border-white/[0.06] text-center">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-zinc-300 transition font-mono"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
