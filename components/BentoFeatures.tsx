import { motion } from 'framer-motion';
import { Clapperboard, Crosshair, Laptop, Pause, Sparkles, Waves, Zap } from 'lucide-react';

const cards = [
  {
    title: 'Clamshell continuity',
    description:
      'Keep AI agents, automated workflows, and music streaming alive even with your MacBook lid completely shut.',
    icon: Laptop,
    className: 'md:col-span-2 md:row-span-2',
    highlight: true,
  },
  {
    title: 'Deep path diagnostics',
    description:
      'See exactly what is making your Mac hot, loud, or draining battery—down to the file path and parent process.',
    icon: Crosshair,
    className: 'md:col-span-1',
    highlight: false,
  },
  {
    title: 'Smart pause & suspend',
    description: 'Non-destructive SIGSTOP suspension halts runaway helpers without losing unsaved documents or state.',
    icon: Pause,
    className: 'md:col-span-1',
    highlight: false,
  },
  {
    title: 'Tidy control center',
    description: 'Group background apps, dock web tabs, and docker stacks into a single power-user dashboard.',
    icon: Clapperboard,
    className: 'md:col-span-2',
    highlight: false,
  },
];

export default function BentoFeatures() {
  return (
    <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <motion.article
            key={card.title}
            className={`group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-card p-6 ${card.className} ${
              card.highlight
                ? 'bg-gradient-to-br from-white/[0.06] to-transparent'
                : 'glass hover:border-white/15'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: idx * 0.08, duration: 0.5 }}
            whileHover={{ y: -4 }}
          >
            {card.highlight && (
              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl" />
            )}
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-accent ring-1 ring-white/10">
              <Icon size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{card.description}</p>
            {card.highlight && (
              <div className="mt-6 flex items-center gap-4 text-xs text-zinc-500">
                <span className="flex items-center gap-1.5">
                  <Waves size={14} className="text-emerald-400" />
                  Audio keeps playing
                </span>
                <span className="flex items-center gap-1.5">
                  <Sparkles size={14} className="text-violet-400" />
                  Agents stay live
                </span>
              </div>
            )}
          </motion.article>
        );
      })}
    </div>
  );
}