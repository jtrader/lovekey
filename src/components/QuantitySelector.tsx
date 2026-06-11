import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getStripePrice } from "@/lib/stripe-products";
import { useLocalePricing } from "@/hooks/useLocalePricing";
import { toast } from "@/hooks/use-toast";
import { trackAddToCart } from "@/lib/analytics";

interface QuantitySelectorProps {
  quantity: number;
  pricePerUnit: number;
  onQuantityChange: (quantity: number) => void;
  selectedVariation: string;
  selectedColor: string;
  variationName: string;
  /** Optional human label for the color/edition shown in the UI and toast. */
  colorLabel?: string;
}

const QuantitySelector = ({ 
  quantity, 
  pricePerUnit, 
  onQuantityChange,
  selectedVariation,
  selectedColor,
  variationName,
  colorLabel,
}: QuantitySelectorProps) => {
  const { addItem } = useCart();
  const { pricing, formatMoney } = useLocalePricing();
  const displayLabel = colorLabel ?? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);

  const handleAddToCart = () => {
    addItem({
      variationId: selectedVariation,
      variationName: variationName,
      color: selectedColor,
      pricePerUnit: pricePerUnit,
      priceId: getStripePrice(selectedVariation),
      quantity: quantity,
    });

    trackAddToCart({
      variationId: selectedVariation,
      variationName,
      color: selectedColor,
      pricePerUnit,
      quantity,
    });

    toast({
      title: `${quantity}x ${variationName} (${displayLabel}) added to cart`,
      duration: 2000,
    });

    // Reset quantity after adding
    onQuantityChange(1);
  };

  return (
    <div className="bg-secondary rounded-2xl p-6">
      <div className="flex items-baseline justify-between mb-2">
        <div>
          <span className="text-3xl font-bold text-primary">{formatMoney(pricePerUnit)}</span>
          <span className="text-muted-foreground ml-2 text-sm">+ {formatMoney(pricing.shippingPrice)} delivery</span>
        </div>
      </div>

      <div className="mb-4 inline-flex items-center gap-2 bg-product-green/10 border border-product-green/30 text-foreground text-xs font-medium px-3 py-1.5 rounded-full">
        🚚 FREE delivery on orders over {formatMoney(pricing.freeShippingThreshold)}
      </div>

      

      <div className="mb-4">
        <label className="text-sm text-muted-foreground mb-2 block">Quantity</label>
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-background rounded-lg border border-border">
            <button
              onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
              className="p-3 hover:bg-secondary transition-colors rounded-l-lg disabled:opacity-50"
              disabled={quantity <= 1}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-semibold">{quantity}</span>
            <button
              onClick={() => onQuantityChange(quantity + 1)}
              className="p-3 hover:bg-secondary transition-colors rounded-r-lg"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          <span className="text-muted-foreground">
            {variationName} - {displayLabel}
          </span>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-product-red text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart — {formatMoney(quantity * pricePerUnit)}
      </button>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
        <span>✓ Fast Delivery</span>
        <span>✓ Secure Payment</span>
        <span>✓ FREE delivery over {formatMoney(pricing.freeShippingThreshold)}</span>
      </div>
    </div>
  );
};

export default QuantitySelector;