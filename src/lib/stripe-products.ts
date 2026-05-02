// Stripe price IDs mapped to product variations (AUD)
export const STRIPE_PRICES = {
  metal: "price_1TShAEIc1upzIn0vbptxPZVB", // A$5.00
} as const;

export const CURRENCY = "AUD";
export const CURRENCY_SYMBOL = "$";

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.metal;
};
