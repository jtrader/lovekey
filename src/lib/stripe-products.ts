// Stripe price IDs mapped to product variations (AUD)
export const STRIPE_PRICES = {
  lightweight: "price_1SyYOoEtxQvmQqaOM2bm9oJT", // A$9.95
  metal: "price_1SyYP3EtxQvmQqaOeAN7XZSv", // A$19.95
} as const;

export const CURRENCY = "AUD";
export const CURRENCY_SYMBOL = "A$";

export type VariationId = keyof typeof STRIPE_PRICES;

export const getStripePrice = (variationId: string): string => {
  return STRIPE_PRICES[variationId as VariationId] || STRIPE_PRICES.lightweight;
};
