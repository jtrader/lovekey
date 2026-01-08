import { Minus, Plus, Trash2, ShoppingBag, Heart, ExternalLink, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { variations } from "@/components/VariationSelector";
import { toast } from "@/hooks/use-toast";

// Product image imports - Lightweight
import lightweightGreen from "@/assets/products/green.png";
import lightweightLightBlue from "@/assets/products/light-blue.png";
import lightweightOrange from "@/assets/products/orange.png";
import lightweightPink from "@/assets/products/pink.png";
import lightweightPurple from "@/assets/products/purple.png";
import lightweightRed from "@/assets/products/red.png";
import lightweightWhite from "@/assets/products/white.png";
import lightweightYellow from "@/assets/products/yellow.png";

// Product image imports - Metal
import metalGreen from "@/assets/products/metal/green.png";
import metalLightBlue from "@/assets/products/metal/light-blue.png";
import metalOrange from "@/assets/products/metal/orange.png";
import metalPink from "@/assets/products/metal/pink.png";
import metalPurple from "@/assets/products/metal/purple.png";
import metalRed from "@/assets/products/metal/red.png";
import metalWhite from "@/assets/products/metal/white.png";
import metalYellow from "@/assets/products/metal/yellow.png";

const productImages: Record<string, Record<string, string>> = {
  lightweight: {
    green: lightweightGreen,
    blue: lightweightLightBlue,
    "light-blue": lightweightLightBlue,
    orange: lightweightOrange,
    pink: lightweightPink,
    purple: lightweightPurple,
    red: lightweightRed,
    white: lightweightWhite,
    yellow: lightweightYellow,
  },
  metal: {
    green: metalGreen,
    blue: metalLightBlue,
    "light-blue": metalLightBlue,
    orange: metalOrange,
    pink: metalPink,
    purple: metalPurple,
    red: metalRed,
    white: metalWhite,
    yellow: metalYellow,
  },
};

const getProductImage = (variationId: string, color: string): string => {
  return productImages[variationId]?.[color] || lightweightWhite;
};

const colorOptions = [
  { id: "green", name: "Green", className: "bg-product-green" },
  { id: "blue", name: "Light Blue", className: "bg-product-blue" },
  { id: "orange", name: "Orange", className: "bg-product-orange" },
  { id: "pink", name: "Pink", className: "bg-product-pink" },
  { id: "purple", name: "Purple", className: "bg-product-purple" },
  { id: "red", name: "Red", className: "bg-product-red" },
  { id: "white", name: "White", className: "bg-product-white border border-border" },
  { id: "yellow", name: "Yellow", className: "bg-product-yellow" },
];

const donationAmounts = [10, 25, 50, 100];

const foundations = [
  {
    id: "lifeline",
    name: "Lifeline Australia",
    url: "https://www.lifeline.org.au/donate",
    color: "bg-[#00A651]",
  },
  {
    id: "beyondblue",
    name: "Beyond Blue",
    url: "https://www.beyondblue.org.au/donate",
    color: "bg-[#1E3A8A]",
  },
  {
    id: "kidshelpline",
    name: "Kids Helpline",
    url: "https://www.kidshelpline.com.au/donate",
    color: "bg-[#E91E63]",
  },
  {
    id: "mensline",
    name: "MensLine Australia",
    url: "https://www.mensline.org.au/donate",
    color: "bg-[#0EA5E9]",
  },
];

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, clearCart, addItem } = useCart();
  const [quickAddVariation, setQuickAddVariation] = useState("lightweight");
  const [quickAddColor, setQuickAddColor] = useState("pink");
  const [selectedDonation, setSelectedDonation] = useState<number>(25);
  const [showCheckout, setShowCheckout] = useState(false);

  const formatColor = (color: string) => {
    return color.charAt(0).toUpperCase() + color.slice(1);
  };

  const handleQuickAdd = () => {
    const variation = variations.find((v) => v.id === quickAddVariation);
    if (!variation) return;

    addItem({
      variationId: quickAddVariation,
      variationName: variation.name,
      color: quickAddColor,
      quantity: 1,
    });

    toast({
      title: `1x ${variation.name} (${formatColor(quickAddColor)}) added to cart`,
      duration: 2000,
    });
  };

  const handleDonate = (foundation: typeof foundations[0]) => {
    window.open(foundation.url, "_blank", "noopener,noreferrer");
    toast({
      title: "Thank you for your generosity!",
      description: `Redirecting to ${foundation.name} to complete your $${selectedDonation} donation.`,
      duration: 4000,
    });
  };

  const handleBackToCart = () => {
    setShowCheckout(false);
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            {showCheckout ? (
              <>
                <Heart className="w-5 h-5 text-product-red" />
                Choose a Donation
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                Your Cart
              </>
            )}
          </SheetTitle>
        </SheetHeader>

        {showCheckout ? (
          <div className="flex-1 flex flex-col py-4">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              LoveKeys are free! We ask that you consider making a donation to one of these amazing mental health foundations.
            </p>

            {/* Donation Amount Selection */}
            <div className="mb-6">
              <label className="text-sm font-medium mb-3 block">Select donation amount</label>
              <div className="grid grid-cols-4 gap-2">
                {donationAmounts.map((amount) => (
                  <button
                    key={amount}
                    onClick={() => setSelectedDonation(amount)}
                    className={`py-3 px-2 rounded-xl font-semibold text-sm transition-all ${
                      selectedDonation === amount
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
            </div>

            {/* Foundation Selection */}
            <div className="flex-1 space-y-3">
              <label className="text-sm font-medium block">Choose a foundation to support</label>
              {foundations.map((foundation) => (
                <button
                  key={foundation.id}
                  onClick={() => handleDonate(foundation)}
                  className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary transition-all duration-200 bg-background group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${foundation.color} flex items-center justify-center flex-shrink-0`}>
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm flex items-center gap-2">
                        {foundation.name}
                        <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                      </h4>
                    </div>
                    <span className="text-sm font-semibold text-primary">${selectedDonation}</span>
                  </div>
                </button>
              ))}
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <Button
                variant="outline"
                onClick={handleBackToCart}
                className="w-full"
              >
                Back to Cart
              </Button>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add some LoveKeys to get started!
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={`${item.variationId}-${item.color}`}
                  className="flex gap-4 p-4 bg-secondary rounded-xl"
                >
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-background flex-shrink-0">
                    <img
                      src={getProductImage(item.variationId, item.color)}
                      alt={`${item.variationName} - ${item.color}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium">{item.variationName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Color: {formatColor(item.color)}
                    </p>
                    <p className="text-sm font-medium text-product-green mt-1">
                      Free
                    </p>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.variationId, item.color)}
                      className="p-1 hover:bg-background rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-muted-foreground" />
                    </button>

                    <div className="flex items-center bg-background rounded-lg border border-border">
                      <button
                        onClick={() =>
                          updateQuantity(item.variationId, item.color, item.quantity - 1)
                        }
                        className="p-2 hover:bg-secondary transition-colors rounded-l-lg"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.variationId, item.color, item.quantity + 1)
                        }
                        className="p-2 hover:bg-secondary transition-colors rounded-r-lg"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Section */}
            <div className="border-t border-border pt-4 pb-2">
              <h4 className="text-sm font-semibold mb-3">Add another LoveKey</h4>
              
              {/* Variation Toggle */}
              <div className="flex gap-2 mb-3">
                {variations.map((variation) => (
                  <button
                    key={variation.id}
                    onClick={() => setQuickAddVariation(variation.id)}
                    className={`flex-1 py-2 px-3 rounded-lg text-xs font-medium transition-all ${
                      quickAddVariation === variation.id
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary hover:bg-secondary/80"
                    }`}
                  >
                    {variation.name}
                  </button>
                ))}
              </div>

              {/* Color Swatches */}
              <div className="flex gap-1.5 mb-3 flex-wrap">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setQuickAddColor(color.id)}
                    title={color.name}
                    className={`w-7 h-7 rounded-full ${color.className} flex items-center justify-center transition-all ${
                      quickAddColor === color.id
                        ? "ring-2 ring-offset-1 ring-primary scale-110"
                        : "hover:scale-105"
                    }`}
                  >
                    {quickAddColor === color.id && (
                      <Check className={`w-3 h-3 ${color.id === "white" || color.id === "yellow" ? "text-foreground" : "text-white"}`} />
                    )}
                  </button>
                ))}
              </div>

              {/* Quick Add Button */}
              <Button
                onClick={handleQuickAdd}
                variant="outline"
                className="w-full"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add {variations.find((v) => v.id === quickAddVariation)?.name} ({formatColor(quickAddColor)})
              </Button>
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <Button
                onClick={() => setShowCheckout(true)}
                className="w-full py-6 text-lg bg-product-red hover:bg-product-red/90"
              >
                <Heart className="w-5 h-5 mr-2" />
                Checkout & Donate
              </Button>

              <button
                onClick={clearCart}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear cart
              </button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
