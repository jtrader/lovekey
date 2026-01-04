import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getStripePrice, CURRENCY_SYMBOL } from "@/lib/stripe-products";
import { toast } from "@/hooks/use-toast";

interface QuantitySelectorProps {
  quantity: number;
  pricePerUnit: number;
  onQuantityChange: (quantity: number) => void;
  selectedVariation: string;
  selectedColor: string;
  variationName: string;
}

const QuantitySelector = ({ 
  quantity, 
  pricePerUnit, 
  onQuantityChange,
  selectedVariation,
  selectedColor,
  variationName,
}: QuantitySelectorProps) => {
  const { addItem } = useCart();
  const totalPrice = quantity * pricePerUnit;

  const handleAddToCart = () => {
    addItem({
      variationId: selectedVariation,
      variationName: variationName,
      color: selectedColor,
      pricePerUnit: pricePerUnit,
      priceId: getStripePrice(selectedVariation),
      quantity: quantity,
    });

    toast({
      title: "Added to cart",
      description: `${quantity}x ${variationName} (${selectedColor}) added to your cart.`,
    });

    // Reset quantity after adding
    onQuantityChange(1);
  };

  return (
    <div className="bg-secondary rounded-2xl p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-3xl font-bold">{CURRENCY_SYMBOL}{pricePerUnit}</span>
          <span className="text-muted-foreground ml-1">per unit</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">All key rings include QR code and NFC technology</p>

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
            = {quantity} {variationName} ({selectedColor}) keyring{quantity > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-product-red text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart — {CURRENCY_SYMBOL}{totalPrice.toFixed(2)}
      </button>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
        <span>✓ Fast Delivery</span>
        <span>✓ Secure Payment</span>
        <span>✓ {CURRENCY_SYMBOL}4.95 Shipping</span>
      </div>
    </div>
  );
};

export default QuantitySelector;
