import { useEffect, useMemo, useState } from "react";
import {
  formatMoney as formatCurrency,
  getActiveLocale,
  getLocalePricing,
  LOCALE_CHANGE_EVENT,
  resolveActiveLocale,
  type LocalePricing,
  type SupportedLocale,
} from "@/lib/stripe-products";

export const useLocalePricing = () => {
  const [locale, setLocale] = useState<SupportedLocale>(() => getActiveLocale());

  useEffect(() => {
    let isMounted = true;

    const handleLocaleChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ locale?: SupportedLocale }>;
      if (customEvent.detail?.locale) {
        setLocale(customEvent.detail.locale);
      }
    };

    window.addEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);

    resolveActiveLocale().then((resolvedLocale) => {
      if (isMounted) {
        setLocale(resolvedLocale);
      }
    });

    return () => {
      isMounted = false;
      window.removeEventListener(LOCALE_CHANGE_EVENT, handleLocaleChange);
    };
  }, []);

  return useMemo(() => {
    const pricing: LocalePricing = getLocalePricing(locale);

    return {
      locale,
      pricing,
      formatMoney: (amount: number) => formatCurrency(amount, locale),
    };
  }, [locale]);
};