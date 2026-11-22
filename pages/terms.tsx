import Head from 'next/head';
import Link from 'next/link';
import { FileText, CheckCircle2, ShieldAlert, RefreshCw, ArrowLeft, HelpCircle, Scale, CreditCard } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms & Conditions — lidZen</title>
        <meta
          name="description"
          content="lidZen Terms & Conditions: License grants, system requirements, Dodo Payments merchant of record, 14-day refund policy, governing law, and consumer rights."
        />
        <link rel="canonical" href="https://lidzenmac.vercel.app/terms" />
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
              <FileText size={14} /> Legal Agreement
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Terms & Conditions
            </h1>
            <p className="mt-3 text-sm text-slate-600 dark:text-zinc-400 font-mono">
              Last updated: November 22, 2026 · Effective Date: November 22, 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
            {/* 1. Introduction & Contracting Parties */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <Scale size={18} className="text-emerald-600 dark:text-emerald-400" />
                1. Agreement & Contracting Parties
              </h2>
              <p>
                These Terms and Conditions (&quot;Terms&quot;) constitute a legally binding agreement between you (&quot;Licensee&quot;, &quot;User&quot;, or &quot;you&quot;) and <strong>lidZen Systems</strong> (&quot;Licensor&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). 
                By purchasing, downloading, installing, or running the lidZen macOS application, or using <strong>lidzenmac.vercel.app</strong>, you agree to be bound by these Terms.
              </p>
            </section>

            {/* 2. License Grant */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                2. Software License Grant & Scope
              </h2>
              <p>
                Upon purchasing a lifetime license, lidZen grants you a non-exclusive, non-transferable, perpetual, revocable license to install and run the application binaries on your personal or corporate Mac hardware in accordance with your chosen tier:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><strong>Single Mac Lifetime License:</strong> Valid for activation and concurrent operation on up to <strong>one (1) Mac</strong> machine owned or controlled by you.</li>
                <li><strong>Two Macs Lifetime License:</strong> Valid for activation and concurrent operation on up to <strong>two (2) Mac</strong> machines owned or controlled by you.</li>
              </ul>
              <p className="mt-3">
                You may not decompile, reverse-engineer, redistribute, lease, sublicense, or resell the application binaries without express prior written consent.
              </p>
            </section>

            {/* 3. Merchant of Record & Billing */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <CreditCard size={18} className="text-emerald-600 dark:text-emerald-400" />
                3. Merchant of Record (Dodo Payments)
              </h2>
              <p>
                Our order process and billing are conducted by our online reseller and Merchant of Record, <strong>Dodo Payments Inc.</strong> (or its local operating entities). Dodo Payments is responsible for payment collection, invoice generation, cardholder disputes, and the calculation and remittance of indirect consumption taxes (GST, VAT, Sales Tax).
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-zinc-400">
                All purchases are one-time lifetime license fees. There are no hidden recurring subscriptions, automatic debits, or surprise renewal charges.
              </p>
            </section>

            {/* 4. System Compatibility & Operating Limits */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <ShieldAlert size={18} className="text-emerald-600 dark:text-emerald-400" />
                4. System Compatibility & Physical Operating Limits
              </h2>
              <p>
                lidZen is engineered exclusively for <strong>Apple Silicon (M1, M2, M3, M4)</strong> and <strong>Intel-based MacBooks</strong> running <strong>macOS 15.0 (Sequoia) or later</strong>.
              </p>
              <p className="mt-3">
                Running continuous compute workloads with the laptop lid closed generates thermal heat. You agree to ensure that your Mac&apos;s physical ventilation exhaust (along the display hinge) remains unblocked by fabrics, thick sleeves, or enclosed bags during heavy processing. lidZen includes built-in Thermal Guard mechanisms that automatically allow macOS to enter normal sleep if user-configured thermal thresholds are reached.
              </p>
            </section>

            {/* 5. 14-Day Money-Back Guarantee */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <RefreshCw size={18} className="text-emerald-600 dark:text-emerald-400" />
                5. 14-Day Money-Back Guarantee (Refund Policy)
              </h2>
              <p>
                We stand behind our software. If lidZen does not work smoothly on your compatible Mac hardware, or if you are not completely satisfied, you may request a full 100% refund within <strong>14 days of purchase</strong> by emailing{' '}
                <a
                  href="mailto:support@lidzen.com?subject=lidZen%20Refund%20Inquiry"
                  className="text-emerald-600 dark:text-emerald-400 hover:underline font-mono font-medium"
                >
                  support@lidzen.com
                </a>{' '}
                with your order or payment ID. Refunds are issued through Dodo Payments back to your original payment method.
              </p>
            </section>

            {/* 6. Limitation of Liability */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <FileText size={18} className="text-emerald-600 dark:text-emerald-400" />
                6. Limitation of Liability & Consumer Rights
              </h2>
              <p>
                To the maximum extent permitted by applicable law, lidZen Systems and its developers shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or loss of profits, data, or hardware downtime resulting from software usage.
              </p>
              <p className="mt-3">
                In any circumstance, our aggregate liability arising out of or related to this agreement shall not exceed the total amount actually paid by you for your lidZen license in the twelve (12) months preceding the claim. Nothing in these Terms limits or excludes consumer statutory rights that cannot be waived under mandatory local consumer protection laws (including the Consumer Protection Act 2019 in India and consumer rights directives in the EU/UK).
              </p>
            </section>

            {/* 7. Governing Law & Dispute Resolution */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <Scale size={18} className="text-emerald-600 dark:text-emerald-400" />
                7. Governing Law & Jurisdiction
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of the Republic of India. Subject to mandatory local statutory consumer forums, any dispute arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in New Delhi, India.
              </p>
            </section>

            {/* 8. Grievance Redressal & Customer Support */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <HelpCircle size={18} className="text-emerald-600 dark:text-emerald-400" />
                8. Grievance Redressal & Customer Support
              </h2>
              <p>
                For customer support, technical assistance, or statutory grievance redressal under the Information Technology (Intermediary Guidelines) Rules 2021:
              </p>
              <div className="mt-3 p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 text-xs font-mono space-y-1.5">
                <div><strong>Business Name:</strong> lidZen Systems</div>
                <div><strong>Support &amp; Inquiries:</strong> <a href="mailto:support@lidzen.com?subject=lidZen%20Support" className="text-emerald-600 dark:text-emerald-400 hover:underline">support@lidzen.com</a></div>
                <div><strong>Grievance Officer:</strong> Grievance Redressal Officer, New Delhi, India</div>
                <div><strong>SLA:</strong> Grievances acknowledged within 48 hours; resolved within 30 days.</div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
