// Pricing and currency configuration by supported customer locale.

export type SupportedLocale = "AU" | "GB" | "US" | "CA" | "NZ";
export type SupportedCurrency = "AUD" | "GBP" | "USD" | "CAD" | "NZD";

export interface LocalePricing {
  locale: SupportedLocale;
  countryName: string;
  currency: SupportedCurrency;
  currencySymbol: string;
  formatterLocale: string;
  productPrice: number;
  shippingPrice: number;
  freeShippingThreshold: number;
}

export const DEFAULT_LOCALE: SupportedLocale = "AU";
export const LOCALE_CHANGE_EVENT = "lovekey:localechange";

export const LOCALE_PRICING: Record<SupportedLocale, LocalePricing> = {
  AU: {
    locale: "AU",
    countryName: "Australia",
    currency: "AUD",
    currencySymbol: "$",
    formatterLocale: "en-AU",
    productPrice: 9,
    shippingPrice: 9.95,
    freeShippingThreshold: 25,
  },
  GB: {
    locale: "GB",
    countryName: "United Kingdom",
    currency: "GBP",
    currencySymbol: "£",
    formatterLocale: "en-GB",
    productPrice: 9,
    shippingPrice: 9.95,
    freeShippingThreshold: 25,
  },
  US: {
    locale: "US",
    countryName: "United States",
    currency: "USD",
    currencySymbol: "$",
    formatterLocale: "en-US",
    productPrice: 9,
    shippingPrice: 9.95,
    freeShippingThreshold: 25,
  },
  CA: {
    locale: "CA",
    countryName: "Canada",
    currency: "CAD",
    currencySymbol: "$",
    formatterLocale: "en-CA",
    productPrice: 9,
    shippingPrice: 9.95,
    freeShippingThreshold: 25,
  },
  NZ: {
    locale: "NZ",
    countryName: "New Zealand",
    currency: "NZD",
    currencySymbol: "$",
    formatterLocale: "en-NZ",
    productPrice: 9,
    shippingPrice: 9.95,
    freeShippingThreshold: 25,
  },
};

const PRODUCT_LOCALE_STORAGE_KEY = "lovekey-locale";
const GEO_TARGETING_ENDPOINT = "https://ipapi.co/json/";
const GEO_TARGETING_TIMEOUT_MS = 2500;

const LOCALE_ALIASES: Record<string, SupportedLocale> = {
  au: "AU",
  aus: "AU",
  australia: "AU",
  gb: "GB",
  uk: "GB",
  unitedkingdom: "GB",
  "united-kingdom": "GB",
  britain: "GB",
  greatbritain: "GB",
  "great-britain": "GB",
  us: "US",
  usa: "US",
  unitedstates: "US",
  "united-states": "US",
  ca: "CA",
  canada: "CA",
  nz: "NZ",
  newzealand: "NZ",
  "new-zealand": "NZ",
};

type GeoTargetingResponse = {
  country?: string;
  country_code?: string;
  country_code_iso3?: string;
};

let geoLocalePromise: Promise<SupportedLocale | null> | null = null;

export const normalizeLocale = (value?: string | null): SupportedLocale | null => {
  if (!value) return null;

  const normalized = value.trim().toLowerCase().replace(/[_\s]+/g, "-");
  const compact = normalized.replace(/[^a-z0-9]/g, "");
  const region = normalized.split("-").pop() || normalized;

  return (
    LOCALE_ALIASES[normalized] ??
    LOCALE_ALIASES[compact] ??
    LOCALE_ALIASES[region] ??
    null
  );
};

const getLocaleFromQuery = (): SupportedLocale | null => {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  return (
    normalizeLocale(params.get("locale")) ??
    normalizeLocale(params.get("country")) ??
    normalizeLocale(params.get("region"))
  );
};

const getStoredLocale = (): SupportedLocale | null => {
  if (typeof window === "undefined") return null;

  try {
    return normalizeLocale(window.localStorage.getItem(PRODUCT_LOCALE_STORAGE_KEY));
  } catch {
    return null;
  }
};

const storeActiveLocale = (locale: SupportedLocale, source: "query" | "geo") => {
  if (typeof window === "undefined") return;

  const previousLocale = getStoredLocale();

  try {
    window.localStorage.setItem(PRODUCT_LOCALE_STORAGE_KEY, locale);
  } catch {
    // Ignore storage errors; the in-memory React state still updates.
  }

  if (previousLocale !== locale) {
    window.dispatchEvent(
      new CustomEvent(LOCALE_CHANGE_EVENT, {
        detail: { locale, source },
      })
    );
  }
};

const getBrowserLocale = (): SupportedLocale | null => {
  if (typeof navigator === "undefined") return null;

  const languages = navigator.languages?.length ? navigator.languages : [navigator.language];
  for (const language of languages) {
    const locale = normalizeLocale(language);
    if (locale) return locale;
  }

  return null;
};

const fetchGeoTargetedLocale = async (): Promise<SupportedLocale | null> => {
  if (typeof fetch === "undefined") return null;

  const controller = typeof AbortController !== "undefined" ? new AbortController() : null;
  const timeoutId = controller
    ? window.setTimeout(() => controller.abort(), GEO_TARGETING_TIMEOUT_MS)
    : null;

  try {
    const response = await fetch(GEO_TARGETING_ENDPOINT, {
      cache: "no-store",
      signal: controller?.signal,
    });

    if (!response.ok) return null;

    const data = (await response.json()) as GeoTargetingResponse;
    return (
      normalizeLocale(data.country_code) ??
      normalizeLocale(data.country) ??
      normalizeLocale(data.country_code_iso3)
    );
  } catch {
    return null;
  } finally {
    if (timeoutId !== null) {
      window.clearTimeout(timeoutId);
    }
  }
};

const getGeoTargetedLocale = () => {
  geoLocalePromise ??= fetchGeoTargetedLocale();
  return geoLocalePromise;
};

export const getActiveLocale = (): SupportedLocale => {
  const queryLocale = getLocaleFromQuery();
  if (queryLocale) {
    try {
      window.localStorage.setItem(PRODUCT_LOCALE_STORAGE_KEY, queryLocale);
    } catch {
      // Ignore storage errors; query param still wins for this page load.
    }
    return queryLocale;
  }

  return getStoredLocale() ?? getBrowserLocale() ?? DEFAULT_LOCALE;
};

export const resolveActiveLocale = async (): Promise<SupportedLocale> => {
  const queryLocale = getLocaleFromQuery();
  if (queryLocale) {
    storeActiveLocale(queryLocale, "query");
    return queryLocale;
  }

  const geoLocale = await getGeoTargetedLocale();
  if (geoLocale) {
    storeActiveLocale(geoLocale, "geo");
    return geoLocale;
  }

  return getStoredLocale() ?? getBrowserLocale() ?? DEFAULT_LOCALE;
};

export const getLocalePricing = (locale: string | null = getActiveLocale()): LocalePricing => {
  const normalizedLocale = normalizeLocale(locale) ?? DEFAULT_LOCALE;
  return LOCALE_PRICING[normalizedLocale];
};

export const formatMoney = (amount: number, locale: string | null = getActiveLocale()): string => {
  const pricing = getLocalePricing(locale);

  try {
    return new Intl.NumberFormat(pricing.formatterLocale, {
      style: "currency",
      currency: pricing.currency,
    }).format(amount);
  } catch {
    return `${pricing.currencySymbol}${amount.toFixed(2)} ${pricing.currency}`;
  }
};

// Legacy Stripe price IDs mapped to product variations. Checkout uses dynamic
// price_data so it can present the correct locale currency.
export const STRIPE_PRICES = {
  metal: "price_1TShAEIc1upzIn0vbptxPZVB",
} as const;

export const CURRENCY = LOCALE_PRICING[DEFAULT_LOCALE].currency;
export const CURRENCY_SYMBOL = LOCALE_PRICING[DEFAULT_LOCALE].currencySymbol;

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.metal;
};