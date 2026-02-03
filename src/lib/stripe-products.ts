// Stripe price IDs mapped to product variations (AUD)
export const STRIPE_PRICES = {
  lightweight: "price_1SwYRoIc1upzIn0vYE9yNGfi", // A$14.95
  metal: "price_1SwYRcIc1upzIn0vl44oqBBX", // A$29.95
} as const;

export const CURRENCY = "AUD";
export const CURRENCY_SYMBOL = "A$";

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.lightweight;
};
