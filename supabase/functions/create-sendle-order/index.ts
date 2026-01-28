import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Sendle API base URL (use sandbox for testing, production for live)
const SENDLE_API_URL = "https://api.sendle.com/api";

interface ShippingAddress {
  name: string;
  email?: string;
  phone?: string;
  address_line1: string;
  address_line2?: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

interface OrderItem {
  variation: string;
  color: string;
  quantity: number;
}

interface SendleOrderRequest {
  stripeSessionId: string;
  receiver: ShippingAddress;
  items: OrderItem[];
  customerReference?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log("[CREATE-SENDLE-ORDER] Function started");

    const sendleApiKey = Deno.env.get("SENDLE_API_KEY");
    const sendleId = Deno.env.get("SENDLE_SENDLE_ID");

    if (!sendleApiKey || !sendleId) {
      throw new Error("Sendle credentials are not configured");
    }

    const { stripeSessionId, receiver, items, customerReference }: SendleOrderRequest = await req.json();
    
    console.log("[CREATE-SENDLE-ORDER] Creating order for session:", stripeSessionId);
    console.log("[CREATE-SENDLE-ORDER] Receiver:", JSON.stringify(receiver));
    console.log("[CREATE-SENDLE-ORDER] Items:", JSON.stringify(items));

    // Calculate total quantity for weight estimation
    const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0);
    
    // Create description from items
    const description = items
      .map((item) => `${item.quantity}x Love Key™ ${item.variation} (${item.color})`)
      .join(", ");

    // Build Sendle order payload
    const sendleOrder = {
      first_mile_option: "drop off", // Using drop-off to avoid pickup scheduling
      description: description,
      weight: {
        value: (totalQuantity * 0.05).toFixed(2), // ~50g per keyring
        units: "kg",
      },
      customer_reference: customerReference || stripeSessionId,
      metadata: {
        stripe_session_id: stripeSessionId,
        items: JSON.stringify(items),
      },
      sender: {
        contact: {
          name: "Love Key Australia",
          phone: "0400000000", // Update with actual phone
          company: "Love Key",
        },
        address: {
          address_line1: "123 Business St", // Update with actual address
          suburb: "Melbourne",
          state_name: "VIC",
          postcode: "3000",
          country: "Australia",
        },
        instructions: "Business hours pickup",
      },
      receiver: {
        contact: {
          name: receiver.name,
          email: receiver.email || "",
          phone: receiver.phone || "",
        },
        address: {
          address_line1: receiver.address_line1,
          address_line2: receiver.address_line2 || "",
          suburb: receiver.city,
          state_name: receiver.state,
          postcode: receiver.postcode,
          country: receiver.country,
        },
        instructions: "Leave at door if no answer",
      },
    };

    // Create Basic Auth header
    const authString = btoa(`${sendleId}:${sendleApiKey}`);
    
    // Generate idempotency key from stripe session ID
    const idempotencyKey = `order-${stripeSessionId}`;

    console.log("[CREATE-SENDLE-ORDER] Sending request to Sendle API");

    const response = await fetch(`${SENDLE_API_URL}/orders`, {
      method: "POST",
      headers: {
        "Authorization": `Basic ${authString}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Idempotency-Key": idempotencyKey,
      },
      body: JSON.stringify(sendleOrder),
    });

    const responseData = await response.json();

    if (!response.ok) {
      console.error("[CREATE-SENDLE-ORDER] Sendle API error:", JSON.stringify(responseData));
      throw new Error(`Sendle API error: ${JSON.stringify(responseData)}`);
    }

    console.log("[CREATE-SENDLE-ORDER] Order created successfully:", responseData.order_id);

    return new Response(
      JSON.stringify({
        success: true,
        orderId: responseData.order_id,
        sendle_reference: responseData.sendle_reference,
        tracking_url: responseData.tracking_url,
        labels: responseData.labels,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("[CREATE-SENDLE-ORDER] Error:", errorMessage);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
