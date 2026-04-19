// Google Analytics (gtag) helper. The gtag.js script is loaded in index.html.

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

type GtagItem = {
  item_id: string;
  item_name: string;
  item_variant?: string;
  price: number;
  quantity: number;
};

const safeGtag = (...args: unknown[]) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag === "function") {
    window.gtag(...args);
  }
};

export const trackAddToCart = (params: {
  variationId: string;
  variationName: string;
  color: string;
  pricePerUnit: number;
  quantity: number;
}) => {
  const item: GtagItem = {
    item_id: `${params.variationId}-${params.color}`,
    item_name: params.variationName,
    item_variant: params.color,
    price: params.pricePerUnit,
    quantity: params.quantity,
  };

  safeGtag("event", "add_to_cart", {
    currency: "AUD",
    value: params.pricePerUnit * params.quantity,
    items: [item],
  });
};

export const trackBeginCheckout = (params: {
  items: Array<{
    variationId: string;
    variationName: string;
    color: string;
    pricePerUnit: number;
    quantity: number;
  }>;
  value: number;
}) => {
  const items: GtagItem[] = params.items.map((i) => ({
    item_id: `${i.variationId}-${i.color}`,
    item_name: i.variationName,
    item_variant: i.color,
    price: i.pricePerUnit,
    quantity: i.quantity,
  }));

  safeGtag("event", "begin_checkout", {
    currency: "AUD",
    value: params.value,
    items,
  });
};

export const trackPurchase = (params: {
  transactionId: string;
  value: number;
  currency: string;
  shipping?: number;
  tax?: number;
  items: GtagItem[];
}) => {
  safeGtag("event", "purchase", {
    transaction_id: params.transactionId,
    value: params.value,
    currency: params.currency,
    shipping: params.shipping ?? 0,
    tax: params.tax ?? 0,
    items: params.items,
  });
};
