import Head from 'next/head';
import Link from 'next/link';
import { FileText, CheckCircle2, ShieldAlert, RefreshCw, ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function TermsOfService() {
  return (
    <>
      <Head>
        <title>Terms & Conditions — lidZen</title>
        <meta
          name="description"
          content="lidZen Terms & Conditions: License grant, compatibility requirements, refund policy, and terms of service."
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
              Last updated: November 19, 2026 · Effective Date: November 19, 2026
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8 text-sm leading-relaxed text-slate-700 dark:text-zinc-300">
            {/* 1. License Grant */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                1. Software License Grant
              </h2>
              <p>
                Upon purchasing a license for lidZen, you are granted a non-exclusive, non-transferable, perpetual license to download, install, and run lidZen on your personal or company Mac hardware in accordance with your license tier:
              </p>
              <ul className="mt-3 list-disc pl-5 space-y-2">
                <li><strong>Single License:</strong> Valid for activation on up to 1 Mac owned or controlled by you.</li>
                <li><strong>Dual / Power Bundle:</strong> Valid for activation on up to 2 Macs owned or controlled by you.</li>
              </ul>
              <p className="mt-3">
                You may not reverse-engineer, decompile, redistribute, resell, or lease the application binaries without prior written authorization.
              </p>
            </section>

            {/* 2. System Compatibility */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <ShieldAlert size={18} className="text-emerald-600 dark:text-emerald-400" />
                2. System Compatibility & Operating Limits
              </h2>
              <p>
                lidZen is designed specifically for <strong>Apple Silicon (M1, M2, M3, M4)</strong> and <strong>Intel-based MacBooks</strong> running <strong>macOS 15.0 (Sequoia) or later</strong>. 
              </p>
              <p className="mt-3">
                While lidZen includes built-in thermal protection to safeguard your system, running sustained, high-intensity compute jobs in clamshell mode generates thermal heat. You agree to ensure that your Mac’s physical ventilation vents (located along the rear display hinge) remain unblocked by soft surfaces or sleeves during intensive operations.
              </p>
            </section>

            {/* 3. Refund Policy */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <RefreshCw size={18} className="text-emerald-600 dark:text-emerald-400" />
                3. 14-Day Money-Back Guarantee
              </h2>
              <p>
                We stand behind our software. If lidZen does not work smoothly on your compatible Mac hardware, or if you are not completely satisfied, you may request a full refund within <strong>14 days of purchase</strong> by emailing support or contacting us with your order confirmation.
              </p>
            </section>

            {/* 4. Disclaimer of Warranties */}
            <section className="rounded-2xl border border-black/5 dark:border-white/5 bg-white/60 dark:bg-zinc-900/40 p-6 sm:p-8 backdrop-blur-md">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2.5 mb-3">
                <FileText size={18} className="text-emerald-600 dark:text-emerald-400" />
                4. Disclaimer & Limitation of Liability
              </h2>
              <p className="text-xs uppercase tracking-wider text-slate-500 dark:text-zinc-400 font-mono mb-2">
                As-Is Provision
              </p>
              <p>
                lidZen is provided &quot;as is&quot; without warranties of any kind, either express or implied. In no event shall the authors or copyright holders be liable for any claim, damages, or other liability, whether in an action of contract, tort, or otherwise, arising from, out of, or in connection with the software or the use or other dealings in the software.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
