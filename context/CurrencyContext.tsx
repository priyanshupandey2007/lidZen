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
    // Primary: Real-time IP geolocation (detects VPN, proxies, and real visitor country)
    const detectRegion = async () => {
      try {
        // Allow URL testing override (e.g. ?currency=USD or ?country=US)
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

        // Fetch IP geolocation in real-time
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
        // Fallback only if network request fails (e.g. offline)
      }

      // Offline / Network Failure Fallback:
      try {
        const tz = (Intl.DateTimeFormat().resolvedOptions().timeZone || '').toLowerCase();
        const isIndiaTz =
          tz.includes('calcutta') ||
          tz.includes('kolkata') ||
          tz.includes('asia/calcutta') ||
          tz.includes('asia/kolkata');

        setCurrencyState(isIndiaTz ? 'INR' : 'USD');
      } catch {
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
