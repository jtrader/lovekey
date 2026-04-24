import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@18.5.0";

const ALLOWED_ORIGINS = [
  "https://lovekey.lovable.app",
  "https://id-preview--6799dfb0-ac44-4c03-8c4d-55e3d0d2a793.lovable.app",
  "https://6799dfb0-ac44-4c03-8c4d-55e3d0d2a793.lovableproject.com",
  "https://checkout.lovekey.com.au",
  "https://www.lovekey.com.au",
  "https://lovekey.com.au",
  "http://localhost:3000",
  "http://localhost:8080",
  "http://localhost:5173",
];

function getCorsHeaders(origin: string | null) {
  const allowedOrigin =
    origin && ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Credentials": "true",
  };
}

// Validation constants
const ALLOWED_COLORS = [
  "green", "blue", "light-blue", "orange", "pink", "aqua", "red", "white", "yellow",
];
const ALLOWED_VARIATIONS = ["Love Key Guardian", "Love Key Essential"];
const MAX_QUANTITY_PER_ITEM = 100;
const MAX_LINE_ITEMS = 50;
const MAX_TOTAL_ITEMS = 500;

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
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Origin validation for non-preflight requests
  if (origin && !ALLOWED_ORIGINS.includes(origin)) {
    console.error("[CREATE-CHECKOUT] Blocked origin:", origin);
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      headers: { "Content-Type": "application/json" },
      status: 403,
    });
  }
  console.log("[CREATE-CHECKOUT] Origin:", origin || "none");

  try {
    console.log("[CREATE-CHECKOUT] Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      console.error("[CREATE-CHECKOUT] STRIPE_SECRET_KEY is not set");
      return new Response(
        JSON.stringify({ error: "Payment system temporarily unavailable.", code: "CONFIG_ERROR" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const body = await req.json();
    const lineItems: LineItem[] = body?.lineItems;

    // Input validation
    if (!Array.isArray(lineItems) || lineItems.length === 0) {
      return new Response(
        JSON.stringify({ error: "Your cart is empty.", code: "EMPTY_CART" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (lineItems.length > MAX_LINE_ITEMS) {
      return new Response(
        JSON.stringify({ error: "Too many items in cart.", code: "CART_LIMIT" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    let totalQuantity = 0;
    for (const item of lineItems) {
      if (!ALLOWED_COLORS.includes(item.color)) {
        return new Response(
          JSON.stringify({ error: "Invalid color selection.", code: "INVALID_COLOR" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      if (!ALLOWED_VARIATIONS.includes(item.variationName)) {
        return new Response(
          JSON.stringify({ error: "Invalid product selection.", code: "INVALID_VARIATION" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      if (typeof item.quantity !== "number" || item.quantity < 1 || item.quantity > MAX_QUANTITY_PER_ITEM || !Number.isInteger(item.quantity)) {
        return new Response(
          JSON.stringify({ error: "Invalid quantity.", code: "INVALID_QUANTITY" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
        );
      }
      totalQuantity += item.quantity;
    }

    if (totalQuantity > MAX_TOTAL_ITEMS) {
      return new Response(
        JSON.stringify({ error: "Cart total exceeds maximum.", code: "CART_LIMIT" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    console.log("[CREATE-CHECKOUT] Validated line items:", JSON.stringify(lineItems));

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Price map for each variation
    const priceMap: Record<string, number> = {
      "Love Key Guardian": 500,  // $5.00 in cents
      "Love Key Essential": 100, // $1.00 in cents
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

    const requestOrigin = origin || "https://lovekey.lovable.app";

    // Calculate subtotal in cents to determine if free shipping applies
    const subtotalCents = lineItems.reduce(
      (sum, item) => sum + (priceMap[item.variationName] || 995) * item.quantity,
      0
    );
    const FREE_SHIPPING_THRESHOLD_CENTS = 2500; // $25.00 AUD
    const qualifiesForFreeShipping = subtotalCents >= FREE_SHIPPING_THRESHOLD_CENTS;

    console.log(
      `[CREATE-CHECKOUT] Subtotal: $${(subtotalCents / 100).toFixed(2)} | Free shipping: ${qualifiesForFreeShipping}`
    );

    const shippingRateData: Stripe.Checkout.SessionCreateParams.ShippingOption["shipping_rate_data"] = qualifiesForFreeShipping
      ? {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "aud" },
          display_name: "Free Shipping (orders over $25)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        }
      : {
          type: "fixed_amount",
          fixed_amount: { amount: 995, currency: "aud" },
          display_name: "Standard Shipping",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        };

    // Build session config
    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      line_items: stripeLineItems,
      mode: "payment",
      success_url: `${requestOrigin}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${requestOrigin}/`,
      shipping_address_collection: {
        allowed_countries: [
          "AC","AD","AE","AF","AG","AI","AL","AM","AO","AQ","AR","AT","AU","AW","AX","AZ",
          "BA","BB","BD","BE","BF","BG","BH","BI","BJ","BL","BM","BN","BO","BQ","BR","BS","BT","BV","BW","BY","BZ",
          "CA","CD","CF","CG","CH","CI","CK","CL","CM","CN","CO","CR","CV","CW","CY","CZ",
          "DE","DJ","DK","DM","DO","DZ",
          "EC","EE","EG","EH","ER","ES","ET",
          "FI","FJ","FK","FO","FR",
          "GA","GB","GD","GE","GF","GG","GH","GI","GL","GM","GN","GP","GQ","GR","GS","GT","GU","GW","GY",
          "HK","HN","HR","HT","HU",
          "ID","IE","IL","IM","IN","IO","IQ","IS","IT",
          "JE","JM","JO","JP",
          "KE","KG","KH","KI","KM","KN","KR","KW","KY","KZ",
          "LA","LB","LC","LI","LK","LR","LS","LT","LU","LV","LY",
          "MA","MC","MD","ME","MF","MG","MK","ML","MM","MN","MO","MQ","MR","MS","MT","MU","MV","MW","MX","MY","MZ",
          "NA","NC","NE","NG","NI","NL","NO","NP","NR","NU","NZ",
          "OM",
          "PA","PE","PF","PG","PH","PK","PL","PM","PN","PR","PS","PT","PY",
          "QA",
          "RE","RO","RS","RU","RW",
          "SA","SB","SC","SE","SG","SH","SI","SJ","SK","SL","SM","SN","SO","SR","SS","ST","SV","SX","SZ",
          "TA","TC","TD","TF","TG","TH","TJ","TK","TL","TM","TN","TO","TR","TT","TV","TW","TZ",
          "UA","UG","US","UY","UZ",
          "VA","VC","VE","VG","VN","VU",
          "WF","WS",
          "XK",
          "YE","YT",
          "ZA","ZM","ZW"
        ],
      },
      shipping_options: [{ shipping_rate_data: shippingRateData }],
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

    // Return safe user-facing message
    return new Response(
      JSON.stringify({ error: "Unable to process checkout. Please try again.", code: "CHECKOUT_FAILED" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
