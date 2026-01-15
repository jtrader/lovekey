// Bundle configurations for color combo discounts
export interface Bundle {
  id: string;
  name: string;
  colors: string[]; // Colors that need to be in cart together
  discountPercent: number;
  stripeCouponId: string;
}

export const BUNDLES: Bundle[] = [
  {
    id: "aussie-pack",
    name: "Aussie Pack",
    colors: ["green", "yellow"],
    discountPercent: 20,
    stripeCouponId: "GQPRDALv",
  },
  {
    id: "true-blue",
    name: "True Blue",
    colors: ["blue", "aqua"],
    discountPercent: 20,
    stripeCouponId: "GQPRDALv",
  },
  {
    id: "love-u",
    name: "Love U",
    colors: ["red", "white"],
    discountPercent: 20,
    stripeCouponId: "GQPRDALv",
  },
];

// Map color variations to canonical color names
const colorMapping: Record<string, string> = {
  "light-blue": "blue",
  blue: "blue",
  aqua: "aqua",
};

export const normalizeColor = (color: string): string => {
  return colorMapping[color] || color;
};

export interface DetectedBundle {
  bundle: Bundle;
  matchedItems: Array<{ variationId: string; color: string }>;
}

/**
 * Detects which bundles are complete in the cart
 */
export const detectBundles = (
  cartItems: Array<{ variationId: string; color: string; quantity: number }>
): DetectedBundle[] => {
  const detectedBundles: DetectedBundle[] = [];
  
  // Get all unique colors in cart (normalized)
  const colorsInCart = new Set(
    cartItems.map((item) => normalizeColor(item.color))
  );

  for (const bundle of BUNDLES) {
    const bundleColors = bundle.colors;
    
    // Check if all bundle colors are present in cart
    const allColorsPresent = bundleColors.every((color) =>
      colorsInCart.has(color)
    );

    if (allColorsPresent) {
      // Find the matching items for this bundle
      const matchedItems = bundleColors.map((bundleColor) => {
        const item = cartItems.find(
          (cartItem) => normalizeColor(cartItem.color) === bundleColor
        );
        return item ? { variationId: item.variationId, color: item.color } : null;
      }).filter((item): item is { variationId: string; color: string } => item !== null);

      if (matchedItems.length === bundleColors.length) {
        detectedBundles.push({ bundle, matchedItems });
      }
    }
  }

  return detectedBundles;
};

/**
 * Calculate the discount amount based on detected bundles
 */
export const calculateBundleDiscount = (
  cartItems: Array<{ variationId: string; color: string; quantity: number; pricePerUnit: number }>,
  detectedBundles: DetectedBundle[]
): number => {
  if (detectedBundles.length === 0) return 0;

  // For simplicity, apply the highest discount percentage once to the subtotal
  // This could be made more sophisticated (e.g., per-bundle discounts)
  const highestDiscount = Math.max(
    ...detectedBundles.map((db) => db.bundle.discountPercent)
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.pricePerUnit,
    0
  );

  return (subtotal * highestDiscount) / 100;
};
