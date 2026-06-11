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
const ALLOWED_VARIATIONS = ["Love Key Guardian"];
const MAX_QUANTITY_PER_ITEM = 100;
const MAX_LINE_ITEMS = 50;
const MAX_TOTAL_ITEMS = 500;

type SupportedLocale = "AU" | "GB" | "US" | "CA" | "NZ";

interface LocalePricing {
  currency: "aud" | "gbp" | "usd" | "cad" | "nzd";
  productAmountCents: number;
  shippingAmountCents: number;
  freeShippingThresholdCents: number;
  freeShippingLabel: string;
}

const DEFAULT_LOCALE: SupportedLocale = "AU";

const LOCALE_PRICING: Record<SupportedLocale, LocalePricing> = {
  AU: {
    currency: "aud",
    productAmountCents: 500,
    shippingAmountCents: 995,
    freeShippingThresholdCents: 2500,
    freeShippingLabel: "A$25",
  },
  GB: {
    currency: "gbp",
    productAmountCents: 500,
    shippingAmountCents: 995,
    freeShippingThresholdCents: 2500,
    freeShippingLabel: "£25",
  },
  US: {
    currency: "usd",
    productAmountCents: 500,
    shippingAmountCents: 995,
    freeShippingThresholdCents: 2500,
    freeShippingLabel: "US$25",
  },
  CA: {
    currency: "cad",
    productAmountCents: 500,
    shippingAmountCents: 995,
    freeShippingThresholdCents: 2500,
    freeShippingLabel: "CA$25",
  },
  NZ: {
    currency: "nzd",
    productAmountCents: 500,
    shippingAmountCents: 995,
    freeShippingThresholdCents: 2500,
    freeShippingLabel: "NZ$25",
  },
};

const LOCALE_ALIASES: Record<string, SupportedLocale> = {
  au: "AU",
  aus: "AU",
  australia: "AU",
  gb: "GB",
  uk: "GB",
  unitedkingdom: "GB",
  "united-kingdom": "GB",
  britain: "GB",
  greatbritain: "GB",
  "great-britain": "GB",
  us: "US",
  usa: "US",
  unitedstates: "US",
  "united-states": "US",
  ca: "CA",
  canada: "CA",
  nz: "NZ",
  newzealand: "NZ",
  "new-zealand": "NZ",
};

const normalizeLocale = (value?: string | null): SupportedLocale => {
  if (!value) return DEFAULT_LOCALE;

  const normalized = value.trim().toLowerCase().replace(/[_\s]+/g, "-");
  const compact = normalized.replace(/[^a-z0-9]/g, "");
  const region = normalized.split("-").pop() || normalized;

  return (
    LOCALE_ALIASES[normalized] ??
    LOCALE_ALIASES[compact] ??
    LOCALE_ALIASES[region] ??
    DEFAULT_LOCALE
  );
};

interface LineItem {
  priceId: string;
  quantity: number;
  color: string;
  variationName: string;
}

interface CheckoutRequest {
  lineItems: LineItem[];
  locale?: string;
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

    const body: CheckoutRequest = await req.json();
    const lineItems: LineItem[] = body?.lineItems;
    const locale = normalizeLocale(body?.locale);
    const pricing = LOCALE_PRICING[locale];

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
    console.log("[CREATE-CHECKOUT] Locale:", locale, "Currency:", pricing.currency);

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    // Price map for each variation in the active locale's minor currency units.
    const priceMap: Record<string, number> = {
      "Love Key Guardian": pricing.productAmountCents,
    };

    // Build line items with price_data
    const stripeLineItems = lineItems.map((item) => ({
      price_data: {
        currency: pricing.currency,
        unit_amount: priceMap[item.variationName] || pricing.productAmountCents,
        product_data: {
          name: `${item.variationName} - ${item.color.charAt(0).toUpperCase() + item.color.slice(1)}`,
          metadata: {
            variation: item.variationName,
            color: item.color,
            locale,
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
      (sum, item) => sum + (priceMap[item.variationName] || pricing.productAmountCents) * item.quantity,
      0
    );
    const qualifiesForFreeShipping = subtotalCents >= pricing.freeShippingThresholdCents;

    console.log(
      `[CREATE-CHECKOUT] Subtotal: ${(subtotalCents / 100).toFixed(2)} ${pricing.currency.toUpperCase()} | Free shipping: ${qualifiesForFreeShipping}`
    );

    const shippingRateData: Stripe.Checkout.SessionCreateParams.ShippingOption["shipping_rate_data"] = qualifiesForFreeShipping
      ? {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: pricing.currency },
          display_name: `Free Shipping (orders over ${pricing.freeShippingLabel})`,
          delivery_estimate: {
            minimum: { unit: "business_day", value: 2 },
            maximum: { unit: "business_day", value: 5 },
          },
        }
      : {
          type: "fixed_amount",
          fixed_amount: { amount: pricing.shippingAmountCents, currency: pricing.currency },
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
        allowed_countries: ["AU", "GB", "US", "CA", "NZ"],
      },
      shipping_options: [{ shipping_rate_data: shippingRateData }],
      metadata: {
        order_details: orderDetails,
        items: itemsJson,
        locale,
        currency: pricing.currency.toUpperCase(),
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
