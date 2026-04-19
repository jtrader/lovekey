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

serve(async (req) => {
  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const sessionId = url.searchParams.get("session_id");

    if (!sessionId || !/^cs_(test|live)_[A-Za-z0-9]+$/.test(sessionId)) {
      return new Response(
        JSON.stringify({ error: "Invalid session ID" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: "Payment system unavailable" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
      );
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-08-27.basil" });

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return new Response(
        JSON.stringify({ paid: false }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    const lineItems = session.line_items?.data ?? [];
    const items = lineItems.map((li) => {
      const product = li.price?.product as Stripe.Product | undefined;
      const md = product?.metadata ?? {};
      const variation = md.variation || "Love Key";
      const color = md.color || "";
      return {
        item_id: `${variation}-${color}`,
        item_name: variation,
        item_variant: color,
        price: (li.price?.unit_amount ?? 0) / 100,
        quantity: li.quantity ?? 1,
      };
    });

    return new Response(
      JSON.stringify({
        paid: true,
        transaction_id: session.id,
        currency: (session.currency || "aud").toUpperCase(),
        value: (session.amount_total ?? 0) / 100,
        shipping: (session.shipping_cost?.amount_total ?? 0) / 100,
        tax: (session.total_details?.amount_tax ?? 0) / 100,
        items,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[VERIFY-CHECKOUT-SESSION] Error:", msg);
    return new Response(
      JSON.stringify({ error: "Unable to verify session" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
