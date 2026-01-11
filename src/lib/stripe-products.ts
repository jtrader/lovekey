// Stripe price IDs mapped to product variations (AUD)
export const STRIPE_PRICES = {
  lightweight: "price_1SlWkWIc1upzIn0vMFQh6Ptl",
  metal: "price_1SlWkmIc1upzIn0vOhaToRSq",
} as const;

export const CURRENCY = "AUD";
export const CURRENCY_SYMBOL = "A$";

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.lightweight;
};
