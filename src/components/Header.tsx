import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-product-red fill-product-red" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-lg sm:text-xl font-semibold tracking-tight leading-tight">Love Key™</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">NFC-enabled life-saving connections</span>
          </div>
        </div>
        
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ShoppingBag className="w-6 h-6" />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-product-red text-white text-xs font-medium rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
