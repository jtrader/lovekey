import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, stripe-signature",
};

// Sendle API base URL
const SENDLE_API_URL = "https://api.sendle.com/api";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[STRIPE-WEBHOOK] Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    // For now, we'll skip signature verification since we don't have webhook secret
    // In production, you should add STRIPE_WEBHOOK_SECRET and verify the signature
    const event = JSON.parse(body);

    console.log("[STRIPE-WEBHOOK] Event type:", event.type);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      
      console.log("[STRIPE-WEBHOOK] Checkout session completed:", session.id);
      console.log("[STRIPE-WEBHOOK] Shipping address:", JSON.stringify(session.shipping_details));
      console.log("[STRIPE-WEBHOOK] Metadata:", JSON.stringify(session.metadata));

      // Only process if there's shipping details
      if (session.shipping_details) {
        const sendleApiKey = Deno.env.get("SENDLE_API_KEY");
        const sendleId = Deno.env.get("SENDLE_SENDLE_ID");

        if (!sendleApiKey || !sendleId) {
          console.error("[STRIPE-WEBHOOK] Sendle credentials not configured");
          // Return 200 to acknowledge receipt - handle shipping manually
          return new Response(JSON.stringify({ received: true, error: "Sendle not configured" }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }

        // Parse items from metadata
        let items = [];
        try {
          if (session.metadata?.items) {
            items = JSON.parse(session.metadata.items);
          }
        } catch (e) {
          console.error("[STRIPE-WEBHOOK] Error parsing items:", e);
        }

        // Calculate total quantity for weight
        const totalQuantity = items.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0) || 1;

        // Create description from items or use order_details
        const description = session.metadata?.order_details || "Love Key™ Order";

        const shipping = session.shipping_details;
        const address = shipping.address;

        // Map country codes to full names for Sendle
        const countryMap: Record<string, string> = {
          AU: "Australia",
          US: "United States",
          CA: "Canada",
          GB: "United Kingdom",
          NZ: "New Zealand",
          DE: "Germany",
          FR: "France",
          NL: "Netherlands",
          BE: "Belgium",
          AT: "Austria",
          CH: "Switzerland",
          IE: "Ireland",
        };

        // Build Sendle order payload
        const sendleOrder = {
          first_mile_option: "drop off",
          description: description,
          weight: {
            value: (totalQuantity * 0.05).toFixed(2),
            units: "kg",
          },
          customer_reference: session.id,
          metadata: {
            stripe_session_id: session.id,
            stripe_payment_intent: session.payment_intent,
          },
          sender: {
            contact: {
              name: "Love Key Australia",
              phone: "0400000000",
              company: "Love Key",
            },
            address: {
              address_line1: "123 Business St",
              suburb: "Melbourne",
              state_name: "VIC",
              postcode: "3000",
              country: "Australia",
            },
            instructions: "Business hours",
          },
          receiver: {
            contact: {
              name: shipping.name || "Customer",
              email: session.customer_details?.email || "",
              phone: session.customer_details?.phone || "",
            },
            address: {
              address_line1: address.line1 || "",
              address_line2: address.line2 || "",
              suburb: address.city || "",
              state_name: address.state || "",
              postcode: address.postal_code || "",
              country: countryMap[address.country] || address.country || "Australia",
            },
            instructions: "Leave at door if no answer",
          },
        };

        // Create Basic Auth header
        const authString = btoa(`${sendleId}:${sendleApiKey}`);
        const idempotencyKey = `order-${session.id}`;

        console.log("[STRIPE-WEBHOOK] Creating Sendle order");

        const sendleResponse = await fetch(`${SENDLE_API_URL}/orders`, {
          method: "POST",
          headers: {
            "Authorization": `Basic ${authString}`,
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Idempotency-Key": idempotencyKey,
          },
          body: JSON.stringify(sendleOrder),
        });

        const sendleData = await sendleResponse.json();

        if (!sendleResponse.ok) {
          console.error("[STRIPE-WEBHOOK] Sendle API error:", JSON.stringify(sendleData));
          // Return 200 to acknowledge - handle manually
          return new Response(JSON.stringify({ received: true, sendle_error: sendleData }), {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          });
        }

        console.log("[STRIPE-WEBHOOK] Sendle order created:", sendleData.order_id);

        return new Response(
          JSON.stringify({
            received: true,
            sendle_order_id: sendleData.order_id,
            tracking_url: sendleData.tracking_url,
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      }
    }

    // Return 200 for all other events
    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[STRIPE-WEBHOOK] Error:", errorMessage);
    // Return 200 to prevent Stripe from retrying
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }
});
