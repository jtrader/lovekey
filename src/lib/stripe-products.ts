// Stripe price IDs mapped to product variations (AUD)
export const STRIPE_PRICES = {
  lightweight: "price_1TPh5nIc1upzIn0vW2BBxIdN", // A$0.00 (FREE)
  metal: "price_1TPhHLIc1upzIn0vGdZR5W0w", // A$9.00
} as const;

export const CURRENCY = "AUD";
export const CURRENCY_SYMBOL = "$";

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.lightweight;
};
