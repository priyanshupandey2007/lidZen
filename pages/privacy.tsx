import Head from 'next/head';
import Link from 'next/link';
import { ShieldCheck, Lock, EyeOff, Server, HardDrive, ArrowLeft, UserCheck, FileText, Globe } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy — lidZen</title>
        <meta
          name="description"
          content="lidZen Privacy Policy: Zero telemetry, zero tracking cookies, 100% on-device macOS execution, Dodo Payments merchant of record disclosure, and GDPR/DPDP user rights."
        />
        <link rel="canonical" href="https://lidzenmac.vercel.app/privacy" />
      </Head>

      <Header />

      <main className="min-h-screen bg-slate-50 dark:bg-[#07090e] pt-28 pb-20 text-slate-900 dark:text-zinc-100 transition-colors">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          {/* Breadcrumb / Back */}
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white mb-6 transition"
          >
            <ArrowLeft size={13} /> Back to Home
          </Link>

          {/* Header Card */}
          <div className="relative overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-white/80 dark:bg-zinc-900/60 p-8 sm:p-10 backdrop-blur-xl shadow-xl mb-10">
            <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 font-mono mb-4">
              <ShieldCheck size={14} /> Zero-Telemetry Commitment
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Privacy Policy
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400 font-mono">
              Last updated: November 22, 2026 · Effective Date: November 22, 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
            {/* 1. Core Principle */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <Lock size={18} className="text-emerald-600 dark:text-emerald-400" />
                1. Our Core Principle: Zero App Telemetry
              </h2>
              <p>
                lidZen Systems (&quot;lidZen&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) builds software under a strict <strong>zero-telemetry, offline-first</strong> architecture.
                The lidZen macOS desktop application does <strong>not</strong> collect, transmit, log, or store your personal files, background process names, command-line arguments, environment variables, shell history, IP addresses, or hardware serial identifiers.
              </p>
              <div className="mt-4 grid sm:grid-cols-3 gap-3 text-xs font-mono">
                <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">0% Telemetry</span>
                  No background phone-home or pingbacks.
                </div>
                <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">100% On-Device</span>
                  All power assertions execute in local macOS user-space.
                </div>
                <div className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/5 dark:border-white/5">
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">No Account Needed</span>
                  No user registration, mandatory login, or behavioral profiling.
                </div>
              </div>
            </section>

            {/* 2. What the macOS App Does Locally */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <HardDrive size={18} className="text-emerald-600 dark:text-emerald-400" />
                2. macOS Application Local Execution
              </h2>
              <p>
                To provide clamshell continuity and live process diagnostics, the lidZen macOS application interfaces strictly with native Apple APIs:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><strong>IOKit Power Assertions:</strong> Issues temporary <code>kIOPMAssertionTypePreventSystemSleep</code> requests via the Apple IOKit Power Management framework to maintain background task execution while the laptop lid is shut.</li>
                <li><strong>Diagnostic Process Inspection:</strong> Queries active CPU, memory, and thermal state locally solely to present live statistics in the Menu Bar companion.</li>
                <li><strong>Credential Scrubbing:</strong> Any transient command line strings inspected for diagnostics undergo local 50-pattern redaction (masking tokens, passwords, and bearer secrets) before display.</li>
                <li><strong>Volatile Memory Eviction:</strong> All process diagnostics stay in volatile memory (RAM) and are permanently purged upon app termination.</li>
              </ul>
            </section>

            {/* 3. Website & Third-Party Service Providers */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <Server size={18} className="text-emerald-600 dark:text-emerald-400" />
                3. Website Data Collection & Service Providers
              </h2>
              <p>
                When you visit our website (<strong>lidzenmac.vercel.app</strong>) or purchase a software license:
              </p>
              <div className="mt-4 space-y-3">
                <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block mb-1">A. Payment Processing & Merchant of Record (Dodo Payments)</strong>
                  All license checkout transactions, billing, tax calculation (GST / VAT / Sales Tax), and invoice issuance are conducted by our Merchant of Record, <strong>Dodo Payments Inc.</strong> (or its affiliates). lidZen never receives, views, or stores your credit card number, debit card number, or bank authentication credentials. Dodo Payments complies with PCI-DSS Level 1 standards.
                </div>
                <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block mb-1">B. Localized Currency Detection</strong>
                  To present prices in your native currency (INR ₹ for visitors in India, USD $ internationally), the browser performs an ephemeral IP geolocation lookup via privacy-focused lookup services (<code>api.country.is</code> or <code>ipwho.is</code>). Your IP address is evaluated on-the-fly and is never stored, tracked, or associated with your identity.
                </div>
                <div className="p-3.5 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/5 dark:border-white/5">
                  <strong className="text-slate-900 dark:text-white block mb-1">C. Browser Local Storage (No Tracking Cookies)</strong>
                  We do not deploy marketing cookies, advertising pixels, or cross-site tracking tags. We utilize standard browser <code>localStorage</code> solely for functional interface preferences:
                  <ul className="list-disc pl-5 mt-1.5 space-y-1 text-xs font-mono">
                    <li><code>theme</code>: Remembers light or dark display mode.</li>
                    <li><code>lidzen_currency</code>: Stores your chosen currency preference (INR or USD).</li>
                    <li><code>lidzen_cookie_consent</code>: Tracks cookie banner acknowledgment.</li>
                    <li><code>sessionStorage</code>: Ephemerally tracks your completed checkout session key to start your direct app download automatically without double-triggering.</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* 4. Legal Bases & User Rights (GDPR / DPDP Act / CCPA) */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <UserCheck size={18} className="text-emerald-600 dark:text-emerald-400" />
                4. Data Protection Rights (GDPR, DPDP Act 2023, CCPA)
              </h2>
              <p>
                Depending on your location (including the European Economic Area, United Kingdom, India, and California), you possess statutory rights regarding your personal information:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><strong>Right of Access & Portability:</strong> You may request a summary of any transactional data associated with your order.</li>
                <li><strong>Right to Rectification & Erasure:</strong> You may request correction or complete deletion of your customer records held by our payment reseller.</li>
                <li><strong>Right to Withdraw Consent:</strong> Where processing relies on consent, you may withdraw it at any time without penalty.</li>
                <li><strong>Do Not Sell or Share (CCPA/CPRA):</strong> We do <strong>not</strong> sell, rent, or share personal data with data brokers or third-party advertisers.</li>
              </ul>
              <p className="mt-3">
                To exercise any of these statutory rights, submit your request to{' '}
                <a href="mailto:support@lidzen.com?subject=Data%20Privacy%20Request" className="text-emerald-600 dark:text-emerald-400 hover:underline font-mono font-medium">
                  support@lidzen.com
                </a>. We verify identity and respond within statutory deadlines (30 days under GDPR and DPDP Act).
              </p>
            </section>

            {/* 5. Grievance Redressal Officer */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <FileText size={18} className="text-emerald-600 dark:text-emerald-400" />
                5. Statutory Grievance Redressal Officer
              </h2>
              <p>
                In compliance with the Information Technology Act 2000, Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules 2021, and Consumer Protection (E-Commerce) Rules 2020:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-xs font-mono space-y-1.5">
                <div><strong>Designation:</strong> Grievance Redressal Officer, lidZen Systems</div>
                <div><strong>Contact Email:</strong> <a href="mailto:support@lidzen.com?subject=Grievance%20Redressal" className="text-emerald-600 dark:text-emerald-400 hover:underline">support@lidzen.com</a></div>
                <div><strong>Response SLA:</strong> Acknowledged within 48 hours; resolved within 30 days.</div>
                <div><strong>Registered Region:</strong> New Delhi, India</div>
              </div>
            </section>

            {/* 6. Contact & Updates */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <EyeOff size={18} className="text-emerald-600 dark:text-emerald-400" />
                6. Policy Changes & Open Source Verification
              </h2>
              <p>
                We may revise this Privacy Policy periodically to reflect legal or operational updates. Material modifications will be posted with an updated Effective Date. You can also inspect our open-source codebase and architecture documentation at:
              </p>
              <p className="mt-3 font-mono text-xs">
                <a
                  href="https://github.com/priyanshupandey2007/lidZen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline inline-flex items-center gap-1"
                >
                  github.com/priyanshupandey2007/lidZen ↗
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
