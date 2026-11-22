import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CNY' | 'INR';

export interface CurrencyConfig {
  priceOneMac: string;
  priceTwoMacs: string;
  symbol: string;
}

export const CURRENCY_CONFIG: Record<Currency, CurrencyConfig> = {
  USD: { priceOneMac: '$6.99', priceTwoMacs: '$11.99', symbol: '$' },
  EUR: { priceOneMac: '€6.99', priceTwoMacs: '€11.99', symbol: '€' },
  GBP: { priceOneMac: '£5.99', priceTwoMacs: '£9.99', symbol: '£' },
  JPY: { priceOneMac: '¥1,080', priceTwoMacs: '¥1,850', symbol: '¥' },
  CNY: { priceOneMac: '¥49', priceTwoMacs: '¥85', symbol: '¥' },
  INR: { priceOneMac: '₹699', priceTwoMacs: '₹999', symbol: '₹' },
};

export const LANG_TO_CURRENCY: Record<string, Currency> = {
  in: 'INR',
  'en-in': 'INR',
  en: 'USD',
  us: 'USD',
  es: 'EUR',
  fr: 'EUR',
  de: 'EUR',
  ja: 'JPY',
  zh: 'CNY',
};

export const isIndiaRegion = (): boolean => {
  try {
    const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
    const offset = new Date().getTimezoneOffset();
    return (
      offset === -330 ||
      tz.includes('calcutta') ||
      tz.includes('kolkata') ||
      tz.includes('asia/calcutta') ||
      tz.includes('asia/kolkata') ||
      tz.includes('ist')
    );
  } catch {
    return false;
  }
};

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  toggleCurrency: () => void;
  priceOneMac: string;
  priceTwoMacs: string;
  buttonLabel: string;
  currencySymbol: string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() => (isIndiaRegion() ? 'INR' : 'USD'));

  useEffect(() => {
    try {
      const isInd = isIndiaRegion();

      // If user is in Indian region:
      if (isInd) {
        const savedLang = localStorage.getItem('lidzen-lang');
        const storedCur = localStorage.getItem('lidzen_currency');

        // If on default, or language is in/en, prioritize INR
        if (!savedLang || savedLang === 'in' || savedLang === 'en' || !storedCur || storedCur === 'INR' || storedCur === 'USD') {
          setCurrencyState('INR');
          try {
            localStorage.setItem('lidzen_currency', 'INR');
          } catch {}
          return;
        }

        // If user explicitly chose another language like ja, zh, es, etc.
        if (savedLang && LANG_TO_CURRENCY[savedLang]) {
          setCurrencyState(LANG_TO_CURRENCY[savedLang]);
          return;
        }
      }

      // Non-India users:
      const savedLang = localStorage.getItem('lidzen-lang');
      if (savedLang && LANG_TO_CURRENCY[savedLang]) {
        setCurrencyState(LANG_TO_CURRENCY[savedLang]);
        return;
      }

      const stored = localStorage.getItem('lidzen_currency');
      if (stored && stored in CURRENCY_CONFIG) {
        setCurrencyState(stored as Currency);
        return;
      }

      setCurrencyState('USD');
    } catch {}
  }, []);

  const setCurrency = (c: Currency) => {
    if (c in CURRENCY_CONFIG) {
      setCurrencyState(c);
      try {
        localStorage.setItem('lidzen_currency', c);
      } catch {}
    }
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'INR' ? 'USD' : 'INR');
  };

  const cfg = CURRENCY_CONFIG[currency] || (isIndiaRegion() ? CURRENCY_CONFIG.INR : CURRENCY_CONFIG.USD);
  const priceOneMac = cfg.priceOneMac;
  const priceTwoMacs = cfg.priceTwoMacs;
  const buttonLabel = `Get lidZen · ${priceOneMac}`;
  const currencySymbol = cfg.symbol;

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        toggleCurrency,
        priceOneMac,
        priceTwoMacs,
        buttonLabel,
        currencySymbol,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}
