import React, { useState } from 'react';
import { Info, AlertTriangle, CheckCircle, Lightbulb, Copy, Check } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'success';
  title?: string;
  children: React.ReactNode;
}

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const styles = {
    info: {
      border: 'border-cool-500/25 bg-cool-500/5',
      icon: <Info size={18} className="text-cool-500 shrink-0 mt-0.5" />,
      titleColor: 'text-cool-600 dark:text-cool-300',
    },
    warning: {
      border: 'border-signal-500/25 bg-signal-500/5',
      icon: <AlertTriangle size={18} className="text-signal-500 shrink-0 mt-0.5" />,
      titleColor: 'text-signal-600 dark:text-signal-400',
    },
    tip: {
      border: 'border-accent-500/25 bg-accent-500/5',
      icon: <Lightbulb size={18} className="text-accent-500 shrink-0 mt-0.5" />,
      titleColor: 'text-accent-700 dark:text-accent-300',
    },
    success: {
      border: 'border-emerald-500/25 bg-emerald-500/5',
      icon: <CheckCircle size={18} className="text-emerald-500 shrink-0 mt-0.5" />,
      titleColor: 'text-emerald-700 dark:text-emerald-400',
    },
  }[type];

  return (
    <div className={`my-6 rounded-2xl border p-4.5 ${styles.border} backdrop-blur-sm`}>
      <div className="flex items-start gap-3">
        {styles.icon}
        <div className="min-w-0 flex-1 text-sm text-slate-700 dark:text-zinc-300 leading-relaxed">
          {title && <h5 className={`font-bold mb-1 ${styles.titleColor}`}>{title}</h5>}
          {children}
        </div>
      </div>
    </div>
  );
}

interface CodeBlockProps {
  code: string;
  language?: string;
  fileName?: string;
}

export function CodeBlock({ code, language = 'bash', fileName }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-slate-950 text-white shadow-lg">
      {fileName && (
        <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-mono text-zinc-400">
          <span>{fileName}</span>
          <span className="text-xs uppercase text-zinc-500">{language}</span>
        </div>
      )}
      <div className="relative p-4 font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto">
        <button
          onClick={handleCopy}
          aria-label="Copy code"
          className="absolute right-3 top-3 rounded-xl border border-white/10 bg-white/5 p-1.5 text-zinc-400 hover:bg-white/10 hover:text-white transition"
        >
          {copied ? <Check size={14} className="text-accent-400" /> : <Copy size={14} />}
        </button>
        <pre className="pr-10">{code}</pre>
      </div>
    </div>
  );
}
