import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: 'How is clamshell continuity different from closing the lid normally?',
    answer:
      'lidZen holds your session in an active continuity state. It keeps power, network, and I/O execution paths awake for agents, compiles, and media streams when your display turns off — without fighting sleep assertions or heating up unventilated displays.',
  },
  {
    question: 'Does path tracing need Full Disk Access or kernel extensions?',
    answer:
      'No kernel extensions (kexts) are needed whatsoever. lidZen is an 18 MB universal binary using standard macOS userland APIs. To trace system-level helper paths and browser sub-processes, standard system diagnostic permissions are requested during initial onboarding.',
  },
  {
    question: 'Will pausing rogue processes cause data corruption or lost work?',
    answer:
      'No. Unlike destructive termination (SIGKILL), lidZen uses non-destructive Mach task suspension (SIGSTOP). It freezes thread execution and CPU consumption completely while preserving all memory allocations, unsaved window state, and socket connections—allowing you to safely resume (SIGCONT) whenever you need.',
  },
  {
    question: 'Which Mac models and macOS versions are supported?',
    answer:
      'macOS 15 (Sequoia) or later is required. Both Apple Silicon (M1, M2, M3, M4) and recent Intel MacBook models are natively supported. External display clamshell setups and standalone lid-shut workflows are first-class citizens.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {faqData.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div
            key={idx}
            className="rounded-2xl border border-black/[0.08] dark:border-white/[0.08] bg-white/70 dark:bg-zinc-900/40 hover:border-black/15 dark:hover:border-white/15 shadow-sm backdrop-blur-xl transition-all overflow-hidden"
          >
            <button
              type="button"
              onClick={() => toggle(idx)}
              className="flex w-full items-center justify-between gap-4 p-5 text-left transition hover:bg-black/[0.02] dark:hover:bg-white/[0.03]"
            >
              <span className="font-semibold text-slate-900 dark:text-white text-sm sm:text-base">
                {item.question}
              </span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0 text-emerald-600 dark:text-emerald-400"
              >
                <ChevronDown size={18} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {open && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p className="border-t border-black/[0.06] dark:border-white/[0.06] px-5 pb-5 pt-3 text-sm leading-relaxed text-slate-600 dark:text-zinc-300">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
