import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, RefreshCw, Laptop, Shield, Zap } from 'lucide-react';
import AppleLogo from './AppleLogo';
import { useCurrency } from '../context/CurrencyContext';

export default function PricingCard() {
  const { priceOneMac, priceTwoMacs } = useCurrency();
  const [tier, setTier] = useState<'one' | 'two'>('one');

  const activePrice = tier === 'one' ? priceOneMac : priceTwoMacs;
  const selectedProductId = tier === 'one' ? 'pdt_0NsR03OW6DniKgDV9ETzC' : 'pdt_0NsR05Gvs4it4UNUGME50';
  
  const startCheckout = (e: React.MouseEvent) => {
    e.preventDefault();
    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'http://localhost:3001';
    const dynamicReturnUrl = `${origin}/?payment=success`;
    window.location.href = `https://test.checkout.dodopayments.com/buy/${selectedProductId}?quantity=1&redirect_url=${encodeURIComponent(dynamicReturnUrl)}`;
  };

  const featureCards = [
    {
      icon: (
        <span className="font-mono text-xs font-bold text-slate-900 dark:text-zinc-300 border border-black/10 dark:border-white/10 rounded-lg px-1.5 py-0.5 bg-black/5 dark:bg-white/5">
          08
        </span>
      ),
      title: 'Every feature',
      desc: 'Clamshell Continuity, Thread Suspension, Zero-Kext Radar, Thermal Guard, Power Diagnostics. Nothing held back.',
    },
    {
      icon: (
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-900 dark:text-zinc-300"
        >
          <path d="M12 12c-2-2.67-4-4-6-4a4 4 0 1 0 0 8c2 0 4-1.33 6-4Zm0 0c2 2.67 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.33-6 4Z" />
        </svg>
      ),
      title: 'Yours to keep',
      desc: 'One payment. No subscription, no renewals.',
    },
    {
      icon: <RefreshCw size={17} className="text-slate-900 dark:text-zinc-300" />,
      title: 'Free updates',
      desc: 'Every lidZen 2.x update, installed when you choose.',
    },
    {
      icon: <Laptop size={18} className="text-slate-900 dark:text-zinc-300" />,
      title: tier === 'one' ? 'One Mac' : 'Two Macs',
      desc: tier === 'one' ? 'Moving to a new Mac? Move your license in seconds.' : 'Run lidZen on both your desktop and portable Mac.',
    },
  ];

  return (
    <div className="relative mx-auto max-w-5xl">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -inset-4 rounded-2xl bg-gradient-to-b from-accent-400/10 via-transparent to-transparent blur-3xl opacity-60" />

      {/* Main Container Card matching Shoji */}
      <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-[#0c0e16]/90 backdrop-blur-2xl p-6 sm:p-10 lg:p-12 shadow-2xl">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          {/* Left Column: Heading, Subtitle & 2x2 Feature Grid */}
          <div>
            <h2 className="text-balance text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08]">
              Pay once.
              <br />
              Keep it.
            </h2>
            <p className="mt-3 text-pretty text-slate-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
              No subscription, no tiers. Every feature, on one Mac or two.
            </p>

            {/* 2x2 Feature Cards Grid */}
            <div className="mt-8 grid sm:grid-cols-2 gap-3.5">
              {featureCards.map((feat) => (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-black/[0.015] dark:bg-white/[0.02] p-4 transition-all hover:bg-black/[0.03] dark:hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="grid h-7 w-7 place-items-center rounded-lg bg-black/5 dark:bg-white/5">
                      {feat.icon}
                    </div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white">
                      {feat.title}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Shoji Style Price Card */}
          <div className="relative rounded-2xl border border-black/10 dark:border-white/10 bg-gradient-to-b from-slate-50/80 via-white to-slate-50/80 dark:from-[#131722]/80 dark:via-[#0c0f18] dark:to-[#090b12]/90 p-7 sm:p-9 text-center shadow-lg">
            {/* App Icon Glow with Official lidZen App Icon */}
            <div className="relative mx-auto h-16 w-16 mb-5">
              <div className="absolute -inset-2 rounded-2xl bg-emerald-400/25 blur-lg" />
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-black/10 dark:border-white/15 shadow-xl bg-slate-900 flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="lidZen"
                  width={48}
                  height={48}
                  className="h-12 w-12 object-contain rounded-xl"
                />
              </div>
            </div>

            {/* License Switcher Tabs: One Mac vs Two Macs */}
            <div className="inline-flex rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 p-1 backdrop-blur-md">
              <button
                type="button"
                onClick={() => setTier('one')}
                className={`btn-tab ${
                  tier === 'one'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-zinc-800 dark:text-white'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                One Mac
              </button>
              <button
                type="button"
                onClick={() => setTier('two')}
                className={`btn-tab ${
                  tier === 'two'
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-zinc-800 dark:text-white'
                    : 'text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                Two Macs
              </button>
            </div>

            {/* Price display - Auto-detected based on visitor's location */}
            <div className="mt-6">
              <span className="text-5xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white tabular-nums">
                {activePrice}
              </span>
              <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400">
                one-time purchase, plus tax where it applies
              </p>
            </div>

            {/* Primary Purchase Button - Standardized Button System */}
            <a
              href={`https://test.checkout.dodopayments.com/buy/${selectedProductId}`}
              onClick={startCheckout}
              className="btn-primary w-full mt-8"
            >
              <AppleLogo size={16} className="fill-current -mt-0.5" />
              <span>Get lidZen · {activePrice}</span>
              <ArrowRight size={15} />
            </a>
          </div>
        </div>

        {/* Bottom Trust Meta Strip */}
        <div className="mt-10 pt-6 border-t border-black/[0.08] dark:border-white/[0.08] flex flex-wrap items-center justify-center gap-6 text-xs text-slate-500 dark:text-zinc-400 font-mono">
          <span className="flex items-center gap-1.5">
            <Shield size={14} className="text-emerald-600 dark:text-emerald-400" /> Notarized by Apple
          </span>
          <span className="flex items-center gap-1.5">
            <Zap size={14} className="text-emerald-600 dark:text-emerald-400" /> 18 MB download
          </span>
          <span className="flex items-center gap-1.5">
            <AppleLogo size={14} className="text-emerald-600 dark:text-emerald-400" /> macOS 15+ Sequoia or later
          </span>
        </div>
      </div>
    </div>
  );
}
