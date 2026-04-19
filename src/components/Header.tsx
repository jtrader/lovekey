import { Heart, ShoppingBag, Facebook, Instagram } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

const Header = () => {
  const { totalItems, setIsCartOpen } = useCart();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border" role="banner">
      <div className="bg-product-red text-white text-center text-xs sm:text-sm py-1.5 px-4 font-medium">
        🚚 FREE delivery on all orders over $25
      </div>
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Main navigation">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-product-red fill-product-red" />
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
            <span className="text-lg sm:text-xl font-semibold tracking-tight leading-tight">Love Key</span>
            <span className="text-[10px] sm:text-xs text-muted-foreground leading-tight">A gentle way to reach help when you need it most</span>
          </div>
        </div>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <a href="#" aria-label="Facebook" className="hidden sm:block p-2 hover:bg-secondary rounded-lg transition-colors">
            <Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href="#" aria-label="Instagram" className="hidden sm:block p-2 hover:bg-secondary rounded-lg transition-colors">
            <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
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
      </nav>
    </header>
  );
};

export default Header;
