import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  BatteryWarning,
  Flame,
  Fan,
  FolderOpen,
  LocateFixed,
  Pause,
  Play,
  RotateCcw,
} from 'lucide-react';

type TabId = 'heat' | 'fan' | 'battery';

type ProcessRow = {
  id: string;
  name: string;
  path: string;
  detail: string;
  load: number;
  severity: 'high' | 'medium';
};

const TAB_META: Record<TabId, { label: string; icon: typeof Flame }> = {
  heat: { label: 'Thermal', icon: Flame },
  fan: { label: 'Fans', icon: Fan },
  battery: { label: 'Power', icon: BatteryWarning },
};

const DATA: Record<TabId, ProcessRow[]> = {
  heat: [
    {
      id: 'chrome-tab',
      name: 'Google Chrome Helper',
      path: '/Applications/Google Chrome.app/Contents/Frameworks/.../tab-4821',
      detail: '142 tabs · ML model tab',
      load: 94,
      severity: 'high',
    },
    {
      id: 'docker',
      name: 'com.docker.backend',
      path: '/Applications/Docker.app/Contents/MacOS/com.docker.backend',
      detail: 'Build cache · 8 containers',
      load: 71,
      severity: 'medium',
    },
    {
      id: 'xcode',
      name: 'SourceKitService',
      path: '/Applications/Xcode.app/Contents/SharedFrameworks/SourceKit.framework/...',
      detail: 'Indexing workspace',
      load: 58,
      severity: 'medium',
    },
  ],
  fan: [
    {
      id: 'fan-chrome',
      name: 'Google Chrome Helper',
      path: '/Users/you/Library/Application Support/Google/Chrome/Default',
      detail: 'Spike correlated @ 14:02',
      load: 88,
      severity: 'high',
    },
    {
      id: 'fan-obs',
      name: 'OBS',
      path: '/Applications/OBS.app/Contents/MacOS/OBS',
      detail: 'NVENC preview active',
      load: 62,
      severity: 'medium',
    },
  ],
  battery: [
    {
      id: 'bat-slack',
      name: 'Slack Helper (Renderer)',
      path: '/Applications/Slack.app/Contents/Frameworks/Slack Helper (Renderer).app',
      detail: '47 background webviews',
      load: 76,
      severity: 'high',
    },
    {
      id: 'bat-node',
      name: 'node',
      path: '~/Projects/api/node_modules/.bin/ts-node',
      detail: 'Dev server + watchers',
      load: 44,
      severity: 'medium',
    },
  ],
};

export default function DiagnosticPreview() {
  const [tab, setTab] = useState<TabId>('heat');
  const [selected, setSelected] = useState<string | null>(null);
  const [traced, setTraced] = useState<string | null>(null);
  const [pausedIds, setPausedIds] = useState<Set<string>>(new Set());

  const rows = useMemo(() => DATA[tab], [tab]);
  const currentTabPausedCount = useMemo(
    () => rows.filter((r) => pausedIds.has(r.id)).length,
    [rows, pausedIds]
  );

  const handleTrace = (id: string) => {
    setSelected(id);
    setTraced(null);
    window.setTimeout(() => setTraced(id), 450);
  };

  const handleTogglePause = (id: string) => {
    setPausedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id); // SIGCONT (Resume)
      } else {
        next.add(id); // SIGSTOP (Pause)
      }
      return next;
    });
  };

  const handleResumeAll = () => {
    setPausedIds(new Set());
  };

  return (
    <div className="glass-strong overflow-hidden rounded-3xl">
      <div className="flex flex-col gap-4 border-b border-white/[0.06] p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-accent">Live diagnostics</p>
          <h3 className="mt-1 text-lg font-semibold text-white">Smart Process Suspension (SIGSTOP)</h3>
        </div>

        <div className="flex items-center gap-2">
          {currentTabPausedCount > 0 && (
            <button
              type="button"
              onClick={handleResumeAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500/25 transition shadow-sm active:scale-95"
            >
              <Play size={12} className="fill-current" />
              <span>Resume All ({currentTabPausedCount})</span>
            </button>
          )}

          <div className="flex gap-1 rounded-xl bg-black/30 p-1">
          {(Object.keys(TAB_META) as TabId[]).map((id) => {
            const { label, icon: Icon } = TAB_META[id];
            const active = tab === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => {
                  setTab(id);
                  setSelected(null);
                  setTraced(null);
                }}
                className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition ${
                  active ? 'bg-white/10 text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>

      <div className="grid gap-0 lg:grid-cols-5">
        <div className="border-b border-white/[0.06] p-4 lg:col-span-3 lg:border-b-0 lg:border-r">
          <div className="mb-3 flex items-center justify-between text-xs text-zinc-500">
            <span>Culprits ranked by impact</span>
            <span className="flex items-center gap-1 text-accent">
              <Activity size={12} /> Real-time
            </span>
          </div>

          <ul className="space-y-2">
            <AnimatePresence mode="popLayout">
              {rows.map((row, idx) => {
                const isPaused = pausedIds.has(row.id);
                return (
                  <motion.li
                    key={row.id}
                    layout
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleTrace(row.id)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        selected === row.id
                          ? isPaused
                            ? 'border-amber-500/40 bg-amber-500/10'
                            : 'border-accent/40 bg-accent/5'
                          : isPaused
                          ? 'border-white/[0.04] bg-white/[0.01] opacity-75'
                          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-zinc-100">{row.name}</p>
                            {isPaused && (
                              <span className="rounded-full border border-amber-500/40 bg-amber-500/10 px-2 py-0.2 text-[9px] font-mono font-semibold text-amber-300">
                                PAUSED
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-zinc-500">{row.detail}</p>
                        </div>
                        <span
                          className={`shrink-0 rounded-md px-2 py-0.5 text-xs font-semibold ${
                            isPaused
                              ? 'bg-zinc-800 text-zinc-500 line-through'
                              : row.severity === 'high'
                              ? 'bg-red-500/15 text-red-400'
                              : 'bg-amber-500/15 text-amber-300'
                          }`}
                        >
                          {isPaused ? '0%' : `${row.load}%`}
                        </span>
                      </div>
                      <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/5">
                        <motion.div
                          className={`h-full rounded-full ${
                            isPaused
                              ? 'bg-zinc-600'
                              : row.severity === 'high'
                              ? 'bg-red-400'
                              : 'bg-amber-400'
                          }`}
                          initial={{ width: 0 }}
                          animate={{ width: isPaused ? '0%' : `${row.load}%` }}
                          transition={{ duration: 0.6 }}
                        />
                      </div>
                    </button>
                  </motion.li>
                );
              })}
            </AnimatePresence>
          </ul>
        </div>

        <div className="p-4 lg:col-span-2">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-zinc-500">Path trace & Mach state</p>

          {!selected && (
            <div className="flex h-full min-h-[200px] flex-col items-center justify-center rounded-xl border border-dashed border-white/10 bg-black/20 px-4 text-center">
              <LocateFixed className="mb-2 text-zinc-600" size={28} />
              <p className="text-sm text-zinc-500">Select a process to reveal exact paths and actions</p>
            </div>
          )}

          <AnimatePresence mode="wait">
            {selected && (
              <motion.div
                key={selected}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {rows
                  .filter((r) => r.id === selected)
                  .map((row) => {
                    const isPaused = pausedIds.has(row.id);
                    return (
                      <div key={row.id}>
                        <motion.div
                          className="rounded-xl border border-white/[0.08] bg-black/40 p-3 font-mono text-[11px] leading-relaxed text-zinc-400"
                          animate={{
                            borderColor: traced === row.id ? 'rgba(94, 234, 212, 0.45)' : 'rgba(255,255,255,0.08)',
                          }}
                        >
                          <div className="mb-2 flex items-center justify-between text-xs text-zinc-300">
                            <span className="flex items-center gap-2">
                              <FolderOpen size={14} className="text-accent" />
                              Binary path
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded border ${
                              isPaused
                                ? 'text-amber-300 border-amber-500/30 bg-amber-500/10'
                                : 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
                            }`}>
                              {isPaused ? 'TASK_SUSPENDED' : 'TASK_RUNNING'}
                            </span>
                          </div>
                          <motion.p
                            initial={{ opacity: 0.4 }}
                            animate={{ opacity: traced === row.id ? 1 : 0.55 }}
                          >
                            {row.path}
                          </motion.p>
                          {traced === row.id && (
                            <motion.p
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              className="mt-2 border-t border-white/5 pt-2 text-accent"
                            >
                              ↔ Parent: launchd → user/501 → {row.name}
                            </motion.p>
                          )}
                        </motion.div>

                        <motion.button
                          type="button"
                          disabled={traced !== row.id}
                          onClick={() => handleTogglePause(row.id)}
                          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40 ${
                            isPaused
                              ? 'border border-emerald-500/40 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                              : 'border border-amber-500/40 bg-amber-500/15 text-amber-300 hover:bg-amber-500/25'
                          }`}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isPaused ? (
                            <>
                              <Play size={16} className="fill-current" />
                              Resume process (SIGCONT)
                            </>
                          ) : (
                            <>
                              <Pause size={16} />
                              Pause process (SIGSTOP)
                            </>
                          )}
                        </motion.button>
                      </div>
                    );
                  })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}