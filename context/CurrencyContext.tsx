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
  en: 'USD',
  us: 'USD',
  in: 'INR',
  'en-in': 'INR',
  es: 'EUR',
  fr: 'EUR',
  de: 'EUR',
  ja: 'JPY',
  zh: 'CNY',
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
  const [currency, setCurrencyState] = useState<Currency>('USD');

  useEffect(() => {
    try {
      // 1. If user previously chose a language, align currency to that language
      const savedLang = localStorage.getItem('lidzen-lang');
      if (savedLang && LANG_TO_CURRENCY[savedLang]) {
        setCurrencyState(LANG_TO_CURRENCY[savedLang]);
        return;
      }

      // 2. Check previously saved currency
      const stored = localStorage.getItem('lidzen_currency');
      if (stored && stored in CURRENCY_CONFIG) {
        setCurrencyState(stored as Currency);
        return;
      }

      // 3. Timezone detection (zero network calls)
      const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
      const isIndiaTz =
        tz.includes('calcutta') ||
        tz.includes('kolkata') ||
        tz.includes('asia/calcutta') ||
        tz.includes('asia/kolkata');

      if (isIndiaTz) {
        setCurrencyState('INR');
        try {
          localStorage.setItem('lidzen_currency', 'INR');
        } catch {}
        return;
      }
    } catch {}

    // 4. Secondary fallback: Non-tracking IP geolocation
    const detectRegion = async () => {
      try {
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const forceCur = params.get('currency')?.toUpperCase() as Currency;
          if (forceCur && forceCur in CURRENCY_CONFIG) {
            setCurrencyState(forceCur);
            return;
          }
        }

        const res = await Promise.any([
          fetch('https://api.country.is/').then((r) => {
            if (!r.ok) throw new Error();
            return r.json();
          }),
          fetch('https://ipwho.is/').then((r) => {
            if (!r.ok) throw new Error();
            return r.json();
          }).then((d) => ({ country: d.country_code })),
        ]);

        const country = String(res?.country || '').toUpperCase();
        if (country) {
          const isIndia = country === 'IN';
          const detectedCurrency: Currency = isIndia ? 'INR' : 'USD';
          setCurrencyState(detectedCurrency);
          try {
            localStorage.setItem('lidzen_currency', detectedCurrency);
          } catch {}
          return;
        }
      } catch {
        setCurrencyState('USD');
      }
    };

    detectRegion();
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

  const cfg = CURRENCY_CONFIG[currency] || CURRENCY_CONFIG.USD;
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
