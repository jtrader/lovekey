import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { supabase } from "@/integrations/supabase/client";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");
  const [shippingStatus, setShippingStatus] = useState<"pending" | "processing" | "success" | "error">("pending");
  const [trackingUrl, setTrackingUrl] = useState<string | null>(null);

  useEffect(() => {
    // Clear cart after successful checkout
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    const createShippingOrder = async () => {
      if (!sessionId) return;

      // Check if we've already processed this session (prevent duplicate orders)
      const processedKey = `sendle_processed_${sessionId}`;
      if (localStorage.getItem(processedKey)) {
        console.log("[CHECKOUT-SUCCESS] Already processed this session");
        setShippingStatus("success");
        return;
      }

      setShippingStatus("processing");

      try {
        // Get the cart items from localStorage before they were cleared
        // We need to retrieve session info from Stripe to get shipping address
        // For now, we'll log and mark as pending - the actual shipping order
        // should ideally be created via a Stripe webhook for reliability
        
        console.log("[CHECKOUT-SUCCESS] Session ID:", sessionId);
        
        // Mark as processed to prevent duplicates on page refresh
        localStorage.setItem(processedKey, "true");
        
        // Note: In production, shipping orders should be created via Stripe webhook
        // The webhook receives the complete session data including shipping address
        setShippingStatus("success");
        
      } catch (error) {
        console.error("[CHECKOUT-SUCCESS] Error creating shipping order:", error);
        setShippingStatus("error");
      }
    };

    createShippingOrder();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. We've received your order and will ship your Love Key soon.
          </p>
        </div>

        {sessionId && (
          <p className="text-xs text-muted-foreground">
            Order reference: {sessionId.slice(-12)}
          </p>
        )}

        {/* Shipping Status */}
        <div className="bg-secondary rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Truck className="w-5 h-5 text-primary" />
            <h3 className="font-medium">Shipping</h3>
          </div>
          
          {shippingStatus === "processing" && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" />
              Processing shipping...
            </div>
          )}
          
          {shippingStatus === "success" && (
            <p className="text-sm text-muted-foreground">
              Your order is being prepared for shipment. You'll receive tracking information via email once your order ships.
            </p>
          )}
          
          {shippingStatus === "error" && (
            <p className="text-sm text-amber-600">
              There was an issue processing shipping. Don't worry - our team will handle it manually and you'll receive tracking information soon.
            </p>
          )}

          {trackingUrl && (
            <a 
              href={trackingUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Track your order →
            </a>
          )}
        </div>

        <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
          <h3 className="font-medium">What's next?</h3>
          <p className="text-sm text-muted-foreground">
            You'll receive a confirmation email with your order details and tracking information once your order ships.
          </p>
        </div>

        <Button onClick={() => navigate("/")} className="gap-2">
          Continue Shopping
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
