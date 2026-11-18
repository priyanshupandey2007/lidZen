import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { useLanguage, LANGUAGES, LanguageOption } from '../context/LanguageContext';

export default function LanguageSelector() {
  const { language, setLanguage, currentOption } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSelect = (option: LanguageOption) => {
    setLanguage(option.code);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Trigger Button Matching User's Screenshot: "US English ^" */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        title="Select language"
        className="group relative flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-zinc-300 transition-all hover:bg-black/5 dark:hover:bg-white/10 hover:text-black dark:hover:text-white active:scale-95"
      >
        <span className="font-mono font-bold uppercase text-[11px] text-slate-600 dark:text-zinc-300 group-hover:text-emerald-500 transition-colors">
          {currentOption.countryCode}
        </span>
        <span className="text-xs font-medium">{currentOption.label}</span>
        <ChevronDown
          size={13}
          className={`text-slate-400 dark:text-zinc-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180 text-emerald-500' : ''
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 origin-top-right rounded-2xl border border-black/10 dark:border-white/10 bg-white/95 dark:bg-[#0c0e16]/95 backdrop-blur-2xl p-1.5 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150">
          <div className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-zinc-400 border-b border-black/5 dark:border-white/5 mb-1">
            Choose Language
          </div>

          <div className="space-y-0.5">
            {LANGUAGES.map((option) => {
              const isSelected = option.code === language;
              return (
                <button
                  key={option.code}
                  type="button"
                  onClick={() => handleSelect(option)}
                  className={`flex w-full items-center justify-between gap-2.5 rounded-xl px-2.5 py-2 text-left text-xs transition-colors ${
                    isSelected
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold'
                      : 'text-slate-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`font-mono font-bold text-[11px] w-6 text-center rounded px-1 py-0.5 ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                          : 'bg-black/5 dark:bg-white/5 text-slate-500 dark:text-zinc-400'
                      }`}
                    >
                      {option.countryCode}
                    </span>
                    <span>{option.label}</span>
                  </div>

                  {isSelected && <Check size={14} className="text-emerald-500 dark:text-emerald-400 shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
