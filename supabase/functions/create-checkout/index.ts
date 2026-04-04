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

    // Price map for each variation
    const priceMap: Record<string, number> = {
      "Love Key Guardian": 995,  // $9.95 in cents
      "Love Key Essential": 495, // $4.95 in cents
    };

    // Build line items with price_data
    const stripeLineItems = lineItems.map((item) => ({
      price_data: {
        currency: "aud",
        unit_amount: priceMap[item.variationName] || 995,
        product_data: {
          name: `${item.variationName} - ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`,
          metadata: {
            variation: item.variationName,
            color: item.color,
          },
        },
      },
      quantity: item.quantity,
    }));

    // Build metadata string for order details
    const orderDetails = lineItems.map(
      (item) => `${item.quantity}x ${item.variationName} (${item.color})`
    ).join(", ");

    // Build individual item metadata as JSON for easier parsing
    const itemsJson = JSON.stringify(
      lineItems.map((item) => ({
        variation: item.variationName,
        color: item.color,
        quantity: item.quantity,
      }))
    );

    const origin = req.headers.get("origin") || "http://localhost:3000";

    // Build session config
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${origin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "AU", "DE", "FR", "NL", "BE", "AT", "CH", "IE", "NZ"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 995,
              currency: "aud",
            },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 2,
              },
              maximum: {
                unit: "business_day",
                value: 5,
              },
            },
          },
        },
      ],
      metadata: {
        order_details: orderDetails,
        items: itemsJson,
      },
    };



    // Create checkout session (guest checkout - no auth required)
    const session = await stripe.checkout.sessions.create(sessionConfig);

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
