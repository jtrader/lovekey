import { Minus, Plus, Trash2, ShoppingBag, Loader2, Check } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { CURRENCY_SYMBOL, getStripePrice } from "@/lib/stripe-products";
import { variations } from "@/components/VariationSelector";
import { trackAddToCart, trackBeginCheckout } from "@/lib/analytics";

// Product image imports - Lightweight
import lightweightGreen from "@/assets/products/green.png";
import lightweightLightBlue from "@/assets/products/light-blue.png";
import lightweightOrange from "@/assets/products/orange.png";
import lightweightPink from "@/assets/products/pink.png";
import lightweightAqua from "@/assets/products/aqua.png";
import lightweightRed from "@/assets/products/red.png";
import lightweightWhite from "@/assets/products/white.png";
import lightweightYellow from "@/assets/products/yellow.png";

// Product image imports - Metal
import metalGreen from "@/assets/products/metal/green.png";
import metalLightBlue from "@/assets/products/metal/light-blue.png";
import metalOrange from "@/assets/products/metal/orange.png";
import metalPink from "@/assets/products/metal/pink.png";
import metalAqua from "@/assets/products/metal/aqua.png";
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
    aqua: lightweightAqua,
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
    aqua: metalAqua,
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
  { id: "aqua", name: "Aqua", className: "bg-product-aqua" },
  { id: "red", name: "Red", className: "bg-product-red" },
  { id: "white", name: "White", className: "bg-product-white border border-border" },
  { id: "yellow", name: "Yellow", className: "bg-product-yellow" },
];

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart, addItem, detectedBundles, bundleDiscount, finalPrice } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const [quickAddVariation, setQuickAddVariation] = useState("lightweight");
  const [quickAddColor, setQuickAddColor] = useState("pink");

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      // Fire GA begin_checkout event (uses cart subtotal; shipping handled by Stripe)
      trackBeginCheckout({
        items: items.map((i) => ({
          variationId: i.variationId,
          variationName: i.variationName,
          color: i.color,
          pricePerUnit: i.pricePerUnit,
          quantity: i.quantity,
        })),
        value: totalPrice,
      });

      // Always use current price IDs to ensure prices match the latest configuration
      const lineItems = items.map((item) => ({
        priceId: getStripePrice(item.variationId),
        quantity: item.quantity,
        color: item.color,
        variationName: item.variationName,
      }));

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { lineItems },
      });

      if (error) throw error;

      if (data?.url) {
        // Stripe Checkout cannot render inside embedded/iframe previews due to Stripe security headers.
        // Open in a new tab/window; fall back to same-tab navigation if popups are blocked.
        const opened = window.open(data.url, "_blank", "noopener,noreferrer");
        if (!opened) {
          window.location.assign(data.url);
          toast({
            title: "Redirecting to Stripe",
            description: "If nothing happens, please allow pop-ups for this site and try again.",
            duration: 4000,
          });
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Checkout failed",
        description: "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      pricePerUnit: variation.price,
      priceId: getStripePrice(quickAddVariation),
      quantity: 1,
    });

    trackAddToCart({
      variationId: quickAddVariation,
      variationName: variation.name,
      color: quickAddColor,
      pricePerUnit: variation.price,
      quantity: 1,
    });

    toast({
      title: `1x ${variation.name} (${formatColor(quickAddColor)}) added to cart`,
      duration: 2000,
    });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
            <p className="text-sm text-muted-foreground">
              Add some Love Key keyrings to get started!
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
                    <p className="text-sm font-medium mt-1 text-primary">
                      {CURRENCY_SYMBOL}{item.pricePerUnit.toFixed(2)}
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

                    <p className="text-sm font-semibold text-primary">
                      {CURRENCY_SYMBOL}{(item.pricePerUnit * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Add Section */}
            <div className="border-t border-border pt-4 pb-2">
              <h4 className="text-sm font-semibold mb-3">Add another Love Key</h4>
              
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
                    {variation.name} ({CURRENCY_SYMBOL}{variation.price.toFixed(2)})
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
              {(() => {
                const FREE_SHIPPING_THRESHOLD = 25;
                const qualifiesForFreeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
                const remaining = FREE_SHIPPING_THRESHOLD - totalPrice;
                const shippingCost = qualifiesForFreeShipping ? 0 : 9.95;
                const orderTotal = totalPrice + shippingCost;

                return (
                  <>
                    {qualifiesForFreeShipping ? (
                      <div className="bg-product-green/10 border border-product-green/30 rounded-lg px-3 py-2 text-sm font-medium text-foreground flex items-center gap-2">
                        <Check className="w-4 h-4 text-product-green" />
                        You've unlocked FREE delivery!
                      </div>
                    ) : (
                      <div className="bg-secondary rounded-lg px-3 py-2 text-sm text-muted-foreground">
                        Add <span className="font-semibold text-foreground">{CURRENCY_SYMBOL}{remaining.toFixed(2)}</span> more for <span className="font-semibold text-foreground">FREE delivery</span>
                        <div className="mt-2 h-1.5 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-product-red transition-all"
                            style={{ width: `${Math.min(100, (totalPrice / FREE_SHIPPING_THRESHOLD) * 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Products</span>
                        <span className="text-primary font-medium">{CURRENCY_SYMBOL}{totalPrice.toFixed(2)}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">Delivery</span>
                        {qualifiesForFreeShipping ? (
                          <span className="font-semibold text-product-green">FREE</span>
                        ) : (
                          <span>{CURRENCY_SYMBOL}9.95</span>
                        )}
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Total</span>
                        <span className="text-xl font-bold">{CURRENCY_SYMBOL}{orderTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <Button
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full py-6 text-lg bg-product-red hover:bg-product-red/90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Checkout — ${CURRENCY_SYMBOL}${orderTotal.toFixed(2)}`
                      )}
                    </Button>
                  </>
                );
              })()}

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
