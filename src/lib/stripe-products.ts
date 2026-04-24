// Stripe price IDs mapped to product variations (AUD)
export const STRIPE_PRICES = {
  lightweight: "price_1TPgWwIc1upzIn0vongHo8hm", // A$1.00
  metal: "price_1TPgQEIc1upzIn0vtL59dFZY", // A$5.00
} as const;

export const CURRENCY = "AUD";
export const CURRENCY_SYMBOL = "$";

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.lightweight;
};
