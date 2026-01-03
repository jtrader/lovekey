import { Minus, Plus } from "lucide-react";

interface QuantitySelectorProps {
  quantity: number;
  pricePerUnit: number;
  onQuantityChange: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, pricePerUnit, onQuantityChange }: QuantitySelectorProps) => {
  const totalPrice = quantity * pricePerUnit;

  return (
    <div className="bg-secondary rounded-2xl p-6">
      <div className="flex items-baseline justify-between mb-4">
        <div>
          <span className="text-3xl font-bold">${pricePerUnit}</span>
          <span className="text-muted-foreground ml-1">per unit</span>
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4">All Love Keys include NFC + QR code technology</p>

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
            = {quantity} keyring{quantity > 1 ? "s" : ""}
          </span>
        </div>
      </div>

      <button className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-lg hover:bg-primary/90 transition-colors active:scale-[0.98]">
        Add to Cart — ${totalPrice.toFixed(2)}
      </button>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
        <span>✓ Fast Delivery</span>
        <span>✓ Secure Payment</span>
        <span>✓$4.95 Shipping + Handling</span>
      </div>
    </div>
  );
};

export default QuantitySelector;
