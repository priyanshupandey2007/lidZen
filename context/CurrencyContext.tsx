import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'INR' | 'USD';

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
    // Check previously saved user preference with strict allowlist
    try {
      const stored = localStorage.getItem('lidzen_currency');
      if (stored === 'USD' || stored === 'INR') {
        setCurrencyState(stored as Currency);
        return;
      }
    } catch {}

    // Check timezone first (zero network calls, instant on-device detection)
    try {
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

    // Secondary: Non-tracking IP geolocation fallback
    const detectRegion = async () => {
      try {
        if (typeof window !== 'undefined') {
          const params = new URLSearchParams(window.location.search);
          const forceCur = params.get('currency')?.toUpperCase();
          if (forceCur === 'USD' || forceCur === 'INR') {
            setCurrencyState(forceCur as Currency);
            return;
          }
          const forceCountry = (params.get('country') || params.get('geo'))?.toUpperCase();
          if (forceCountry) {
            setCurrencyState(forceCountry === 'IN' ? 'INR' : 'USD');
            return;
          }
        }

        // Ephemeral geolocation lookup for localized currency presentation
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
        // Fallback gracefully
        setCurrencyState('USD');
      }
    };

    detectRegion();
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    try {
      localStorage.setItem('lidzen_currency', c);
    } catch {}
  };

  const toggleCurrency = () => {
    setCurrency(currency === 'INR' ? 'USD' : 'INR');
  };

  const isINR = currency === 'INR';
  const priceOneMac = isINR ? '₹699' : '$6.99';
  const priceTwoMacs = isINR ? '₹999' : '$11.99';
  const buttonLabel = `Get lidZen · ${priceOneMac}`;
  const currencySymbol = isINR ? '₹' : '$';

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
