import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

// Webhooks are server-to-server — no CORS needed
const jsonHeaders = { "Content-Type": "application/json" };

// Shippo API base URL
const SHIPPO_API_URL = "https://api.goshippo.com";

serve(async (req) => {
  // Webhooks only accept POST
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      headers: jsonHeaders,
      status: 405,
    });
  }

  try {
    console.log("[STRIPE-WEBHOOK] Webhook received");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("[STRIPE-WEBHOOK] STRIPE_SECRET_KEY is not set");
      return new Response(JSON.stringify({ error: "Configuration error" }), {
        headers: jsonHeaders,
        status: 500,
      });
    }

    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");
    if (!webhookSecret) {
      console.error("[STRIPE-WEBHOOK] STRIPE_WEBHOOK_SECRET is not set");
      return new Response(JSON.stringify({ error: "Configuration error" }), {
        headers: jsonHeaders,
        status: 500,
      });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Get the raw body for signature verification
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (!signature) {
      console.error("[STRIPE-WEBHOOK] No stripe-signature header");
      return new Response(JSON.stringify({ error: "No signature" }), {
        headers: jsonHeaders,
        status: 400,
      });
    }

    // Verify the webhook signature
    let event;
    try {
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
      console.log("[STRIPE-WEBHOOK] Signature verified successfully");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error("[STRIPE-WEBHOOK] Signature verification failed:", errorMessage);
      return new Response(JSON.stringify({ error: "Invalid signature" }), {
        headers: jsonHeaders,
        status: 400,
      });
    }

    console.log("[STRIPE-WEBHOOK] Event type:", event.type);

    if (event.type === "checkout.session.completed") {
      const eventSession = event.data.object;
      
      console.log("[STRIPE-WEBHOOK] Checkout session completed:", eventSession.id);
      
      // Retrieve the full session with all details
      const session = await stripe.checkout.sessions.retrieve(eventSession.id);
      
      // Try multiple locations for shipping details
      const shippingDetails = session.shipping_details || 
        (session as any).collected_information?.shipping_details;
      
      console.log("[STRIPE-WEBHOOK] Shipping details:", JSON.stringify(shippingDetails));
      console.log("[STRIPE-WEBHOOK] Customer details:", JSON.stringify(session.customer_details));
      console.log("[STRIPE-WEBHOOK] Metadata:", JSON.stringify(session.metadata));

      // Get shipping address from shipping_details or fall back to customer_details.address
      const shippingAddress = shippingDetails?.address || session.customer_details?.address;
      const shippingName = shippingDetails?.name || session.customer_details?.name;

      // Only process if there's an address
      if (shippingAddress) {
        const shippoToken = Deno.env.get("SHIPPO_API_TOKEN");

        if (!shippoToken) {
          console.error("[STRIPE-WEBHOOK] Shippo API token not configured");
          return new Response(JSON.stringify({ received: true, error: "Shipping not configured" }), {
            headers: jsonHeaders,
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

        const address = shippingAddress;

        // Build Shippo shipment payload
        const shippoShipment = {
          address_from: {
            name: "Love Key Australia",
            company: "Love Key",
            street1: "47B Little Breen Street",
            city: "Quarry Hill",
            state: "VIC",
            zip: "3550",
            country: "AU",
            phone: "0497347456",
            email: "hello@lovekey.com.au",
          },
          address_to: {
            name: shippingName || "Customer",
            street1: address.line1 || "",
            street2: address.line2 || "",
            city: address.city || "",
            state: address.state || "",
            zip: address.postal_code || "",
            country: address.country || "AU",
            phone: session.customer_details?.phone || "",
            email: session.customer_details?.email || "",
          },
          parcels: [
            {
              length: "15",
              width: "10",
              height: "3",
              distance_unit: "cm",
              weight: (totalQuantity * 50).toString(),
              mass_unit: "g",
            },
          ],
          async: false,
          metadata: `Stripe: ${session.id}`,
        };

        console.log("[STRIPE-WEBHOOK] Creating Shippo shipment");

        // Create shipment in Shippo
        const shipmentResponse = await fetch(`${SHIPPO_API_URL}/shipments`, {
          method: "POST",
          headers: {
            "Authorization": `ShippoToken ${shippoToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(shippoShipment),
        });

        const shipmentData = await shipmentResponse.json();

        if (!shipmentResponse.ok) {
          console.error("[STRIPE-WEBHOOK] Shippo shipment error:", JSON.stringify(shipmentData));
          return new Response(JSON.stringify({ received: true }), {
            headers: jsonHeaders,
            status: 200,
          });
        }

        console.log("[STRIPE-WEBHOOK] Shippo shipment created:", shipmentData.object_id);

        // Get rates and select the cheapest one
        const rates = shipmentData.rates || [];
        if (rates.length === 0) {
          console.error("[STRIPE-WEBHOOK] No shipping rates available");
          return new Response(JSON.stringify({ received: true }), {
            headers: jsonHeaders,
            status: 200,
          });
        }

        // Sort rates by price and pick the cheapest
        const sortedRates = rates.sort((a: { amount: string }, b: { amount: string }) => 
          parseFloat(a.amount) - parseFloat(b.amount)
        );
        const selectedRate = sortedRates[0];

        console.log("[STRIPE-WEBHOOK] Selected rate:", selectedRate.object_id, "Price:", selectedRate.amount, selectedRate.currency);

        // Purchase the label (create transaction)
        const transactionResponse = await fetch(`${SHIPPO_API_URL}/transactions`, {
          method: "POST",
          headers: {
            "Authorization": `ShippoToken ${shippoToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rate: selectedRate.object_id,
            label_file_type: "PDF",
            async: false,
          }),
        });

        const transactionData = await transactionResponse.json();

        if (!transactionResponse.ok || transactionData.status === "ERROR") {
          console.error("[STRIPE-WEBHOOK] Shippo transaction error:", JSON.stringify(transactionData));
          return new Response(JSON.stringify({ received: true }), {
            headers: jsonHeaders,
            status: 200,
          });
        }

        console.log("[STRIPE-WEBHOOK] Shippo label purchased:", transactionData.object_id);
        console.log("[STRIPE-WEBHOOK] Tracking number:", transactionData.tracking_number);
        console.log("[STRIPE-WEBHOOK] Label URL:", transactionData.label_url);

        return new Response(
          JSON.stringify({ received: true }),
          { headers: jsonHeaders, status: 200 }
        );
      }
    }

    // Return 200 for all other events
    return new Response(JSON.stringify({ received: true }), {
      headers: jsonHeaders,
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[STRIPE-WEBHOOK] Error:", errorMessage);
    // Return 200 to prevent Stripe from retrying
    return new Response(JSON.stringify({ received: true }), {
      headers: jsonHeaders,
      status: 200,
    });
  }
});
