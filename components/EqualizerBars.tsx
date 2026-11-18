const DELAYS = ['0ms', '120ms', '60ms', '180ms', '90ms', '150ms', '30ms'];

export default function EqualizerBars({ className = '' }: { className?: string }) {
  return (
    <div className={`flex h-6 items-end gap-[3px] ${className}`} aria-hidden>
      {DELAYS.map((delay, i) => (
        <span
          key={i}
          className="w-[3px] origin-bottom rounded-full bg-accent animate-eq-bar"
          style={{ animationDelay: delay, height: `${10 + (i % 3) * 6}px` }}
        />
      ))}
    </div>
  );
}