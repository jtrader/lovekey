import { X, Minus, Plus, Trash2, ShoppingBag, Loader2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const CartDrawer = () => {
  const { items, isCartOpen, setIsCartOpen, updateQuantity, removeItem, totalPrice, clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      const lineItems = items.map((item) => ({
        priceId: item.priceId,
        quantity: item.quantity,
        color: item.color,
        variationName: item.variationName,
      }));

      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { lineItems },
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, "_blank");
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
                  <div className="flex-1">
                    <h4 className="font-medium">{item.variationName}</h4>
                    <p className="text-sm text-muted-foreground">
                      Color: {formatColor(item.color)}
                    </p>
                    <p className="text-sm font-medium mt-1">
                      ${item.pricePerUnit.toFixed(2)} each
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

                    <p className="text-sm font-semibold">
                      ${(item.pricePerUnit * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-xl font-bold">${totalPrice.toFixed(2)}</span>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Shipping calculated at checkout
              </p>

              <Button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full py-6 text-lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Checkout — $${totalPrice.toFixed(2)}`
                )}
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
