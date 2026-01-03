import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LineItem {
  priceId: string;
  quantity: number;
  color: string;
  variationName: string;
}

interface CheckoutRequest {
  lineItems: LineItem[];
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CREATE-CHECKOUT] Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const { lineItems }: CheckoutRequest = await req.json();
    console.log("[CREATE-CHECKOUT] Received line items:", JSON.stringify(lineItems));

    if (!lineItems || lineItems.length === 0) {
      throw new Error("No items in cart");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Build line items for Stripe with metadata for color
    const stripeLineItems = lineItems.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    }));

    // Build metadata string for order details
    const orderDetails = lineItems.map(
      (item) => `${item.quantity}x ${item.variationName} (${item.color})`
    ).join(", ");

    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Create checkout session (guest checkout - no auth required)
    const session = await stripe.checkout.sessions.create({
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "NL", "BE", "AT", "CH", "IE", "NZ"],
      },
      metadata: {
        order_details: orderDetails,
      },
    });

    console.log("[CREATE-CHECKOUT] Session created:", session.id);

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-CHECKOUT] Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
