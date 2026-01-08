import { ShoppingCart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { toast } from "@/hooks/use-toast";

interface AddToCartButtonProps {
  selectedVariation: string;
  selectedColor: string;
  variationName: string;
}

const AddToCartButton = ({ 
  selectedVariation,
  selectedColor,
  variationName,
}: AddToCartButtonProps) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      variationId: selectedVariation,
      variationName: variationName,
      color: selectedColor,
      quantity: 1,
    });

    toast({
      title: `${variationName} (${selectedColor}) added to cart`,
      duration: 2000,
    });
  };

  return (
    <div className="bg-secondary rounded-2xl p-6">
      <div className="text-center mb-4">
        <span className="text-3xl font-bold text-product-green">Free</span>
        <p className="text-sm text-muted-foreground mt-1">
          We ask for a donation at checkout
        </p>
      </div>

      <p className="text-sm text-muted-foreground mb-4 text-center">
        All LoveKeys include QR code and NFC technology
      </p>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-product-red text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-colors active:scale-[0.98] flex items-center justify-center gap-2"
      >
        <ShoppingCart className="w-5 h-5" />
        Add to Cart
      </button>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
        <span>✓ Free Delivery</span>
        <span>✓ NFC Enabled</span>
      </div>
    </div>
  );
};

export default AddToCartButton;
