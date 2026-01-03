// Stripe price IDs mapped to product variations
export const STRIPE_PRICES = {
  lightweight: "price_1SlWgoIc1upzIn0vR9gu0Ruf",
  metal: "price_1SlWh7Ic1upzIn0vCLAZl3t6",
} as const;

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.lightweight;
};
