import React from 'react';

interface MacWindowButtonsProps {
  className?: string;
  onClose?: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
}

/**
 * Authentic macOS window control buttons (traffic lights).
 * Colors: Close (#FF5F56), Minimize (#FFBD2E), Maximize (#27C93F)
 * Exact dimensions: 12px circular with border and hover glyph symbols.
 */
export default function MacWindowButtons({
  className = '',
  onClose,
  onMinimize,
  onMaximize,
}: MacWindowButtonsProps) {
  const isInteractive = Boolean(onClose || onMinimize || onMaximize);

  if (!isInteractive) {
    return (
      <div
        className={`flex items-center gap-2 select-none ${className}`}
        aria-hidden="true"
      >
        <span className="h-3 w-3 rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm inline-block" />
        <span className="h-3 w-3 rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm inline-block" />
        <span className="h-3 w-3 rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm inline-block" />
      </div>
    );
  }

  return (
    <div
      className={`group/mac-controls flex items-center gap-2 select-none ${className}`}
      role="group"
      aria-label="Window controls"
    >
      {/* Close button (Red) */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close window"
        title="Close"
        className="relative grid h-3 w-3 place-items-center rounded-full bg-[#FF5F56] border border-[#E0443E] shadow-sm transition-all duration-150 hover:brightness-95 active:scale-90 focus:outline-none"
      >
        <svg
          viewBox="0 0 12 12"
          className="h-full w-full opacity-0 group-hover/mac-controls:opacity-100 transition-opacity duration-150 pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M3.5 3.5l5 5M8.5 3.5l-5 5"
            stroke="#4D0000"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Minimize button (Yellow) */}
      <button
        type="button"
        onClick={onMinimize}
        aria-label="Minimize window"
        title="Minimize"
        className="relative grid h-3 w-3 place-items-center rounded-full bg-[#FFBD2E] border border-[#DEA123] shadow-sm transition-all duration-150 hover:brightness-95 active:scale-90 focus:outline-none"
      >
        <svg
          viewBox="0 0 12 12"
          className="h-full w-full opacity-0 group-hover/mac-controls:opacity-100 transition-opacity duration-150 pointer-events-none"
          aria-hidden="true"
        >
          <path
            d="M2.5 6h7"
            stroke="#5F3A00"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {/* Maximize / Zoom button (Green) */}
      <button
        type="button"
        onClick={onMaximize}
        aria-label="Zoom / Fullscreen window"
        title="Full Screen"
        className="relative grid h-3 w-3 place-items-center rounded-full bg-[#27C93F] border border-[#1AAB29] shadow-sm transition-all duration-150 hover:brightness-95 active:scale-90 focus:outline-none"
      >
        <svg
          viewBox="0 0 12 12"
          className="h-full w-full opacity-0 group-hover/mac-controls:opacity-100 transition-opacity duration-150 pointer-events-none fill-[#004000]"
          aria-hidden="true"
        >
          {/* Authentic macOS full screen glyph: opposing corner triangles */}
          <polygon points="3.2,3.2 6.5,3.2 3.2,6.5" />
          <polygon points="8.8,8.8 5.5,8.8 8.8,5.5" />
        </svg>
      </button>
    </div>
  );
}
