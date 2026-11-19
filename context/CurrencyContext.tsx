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
    try {
      const stored = localStorage.getItem('lidzen_currency');
      if (stored === 'INR' || stored === 'USD') {
        setCurrencyState(stored);
        return;
      }
      const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
      const locale = (navigator.language || '').toLowerCase();
      const allLocales = (navigator.languages || []).map((l) => l.toLowerCase());

      // Precise location detection: India = INR (₹599 / ₹999), Rest of world = USD ($6.99 / $11.99)
      const isIndia =
        tz.includes('calcutta') ||
        tz.includes('kolkata') ||
        tz.includes('asia/calcutta') ||
        tz.includes('asia/kolkata') ||
        locale.includes('-in') ||
        locale === 'hi' ||
        locale === 'en-in' ||
        allLocales.some((l) => l.includes('-in') || l === 'hi');

      if (isIndia) {
        setCurrencyState('INR');
      } else {
        setCurrencyState('USD');
      }
    } catch {
      setCurrencyState('USD');
    }
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
  const priceOneMac = isINR ? '₹599' : '$6.99';
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
