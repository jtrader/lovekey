import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";

const CheckoutSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // Clear cart after successful checkout
    clearCart();
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. We've received your order and will ship your LoveKeys soon.
          </p>
        </div>

        {sessionId && (
          <p className="text-xs text-muted-foreground">
            Order reference: {sessionId.slice(-12)}
          </p>
        )}

        <div className="bg-secondary rounded-xl p-4 space-y-2">
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
