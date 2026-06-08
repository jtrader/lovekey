import { useEffect } from "react";

const LAST_UPDATED = "9 June 2026";
const ENTITY = "Streamline Direct";
const CONTACT = "support@lovekey.com.au";

const Privacy = () => {
  useEffect(() => {
    document.title = "Privacy Notice — Love Key";
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-foreground mb-1">Privacy Notice</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {LAST_UPDATED}</p>

      <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
        <h2>1. Who we are</h2>
        <p>
          Love Key (the &ldquo;Service&rdquo;), at lovekey.com.au, is operated by{" "}
          <strong>{ENTITY}</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) as
          part of the Love Key HELP Network. We sell the Love Key Ring and related products. {ENTITY}{" "}
          is the data controller for personal data processed through the Service. Contact us at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>

        <h2>2. What we collect</h2>
        <ul>
          <li><strong>Order &amp; contact data:</strong> when you place an order, the name, email address, and shipping address you provide at checkout, together with order and fulfilment details, so we can process and deliver your purchase and provide support.</li>
          <li><strong>Payment data:</strong> card payments are processed by our payment provider, <strong>Stripe</strong>. We do not receive or store your full card number; we receive confirmation of payment and limited transaction details.</li>
          <li><strong>Email &amp; marketing:</strong> if you contact us or opt in, your email address. You can unsubscribe at any time via the link in our emails or our <a href="/unsubscribe">unsubscribe page</a>.</li>
          <li><strong>Analytics:</strong> we use Google Analytics 4 to understand traffic and measure purchases. This includes a purchase event recorded after checkout.</li>
          <li><strong>Cart data:</strong> the contents of your cart are stored in your browser.</li>
          <li><strong>Technical data:</strong> standard request metadata (such as IP address and request headers) processed by our hosting and content-delivery providers.</li>
        </ul>
        <p>We do not sell personal data.</p>

        <h2>3. Purposes and legal bases</h2>
        <table>
          <thead>
            <tr><th>Purpose</th><th>Legal basis</th></tr>
          </thead>
          <tbody>
            <tr><td>Processing, fulfilling, and shipping your orders, and providing support</td><td>Performance of a contract</td></tr>
            <tr><td>Payment processing and fraud prevention</td><td>Performance of a contract / Legitimate interests</td></tr>
            <tr><td>Analytics and improving the Service</td><td>Legitimate interests</td></tr>
            <tr><td>Marketing emails (where you have opted in)</td><td>Consent (withdrawable at any time)</td></tr>
            <tr><td>Compliance with tax, accounting, and other legal obligations</td><td>Legal obligation</td></tr>
          </tbody>
        </table>

        <h2>4. Who we share data with</h2>
        <ul>
          <li><strong>Stripe</strong> — payment processing. See Stripe&rsquo;s <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">privacy policy</a>.</li>
          <li><strong>Shipping and fulfilment providers</strong> — to deliver your order and provide tracking.</li>
          <li><strong>Google Analytics</strong> — anonymous traffic and conversion measurement.</li>
          <li><strong>Service providers / sub-processors</strong> — cloud hosting and database (Supabase / AWS) and email delivery.</li>
          <li><strong>Authorities</strong> — where required by law, court order, or to protect rights, safety, and property.</li>
        </ul>

        <h2>5. International transfers</h2>
        <p>
          Some providers are located outside your country of residence, including in the United
          States and the European Economic Area. Where data is transferred outside the UK or EEA,
          we rely on appropriate safeguards such as Standard Contractual Clauses, UK International
          Data Transfer Addenda, or adequacy decisions where available.
        </p>

        <h2>6. Data retention</h2>
        <p>
          Order, billing, and tax records are retained for the period required by applicable tax
          and accounting law (typically 7 years). Marketing data is kept until you unsubscribe.
          Analytics data is retained in aggregated form. We keep personal data only as long as
          necessary for the purposes described here.
        </p>

        <h2>7. Your rights</h2>
        <p>
          Depending on where you live, you may have rights to access, rectify, erase, restrict, or
          port your data, to object to processing, to withdraw consent, and to lodge a complaint
          with your local supervisory authority. To exercise any right, email{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>

        <h2>8. Cookies and similar technologies</h2>
        <p>
          We use essential storage to operate the cart and checkout, and Google Analytics cookies
          to measure usage and purchases. You can manage cookies through your browser settings.
        </p>

        <h2>9. Security</h2>
        <p>
          We use appropriate technical and organisational measures designed to protect personal
          data, including TLS encryption in transit, encryption at rest, and access controls.
          Card data is handled by Stripe under PCI-DSS. No method of transmission or storage is
          completely secure; we work to continuously improve our safeguards.
        </p>

        <h2>10. Children</h2>
        <p>
          The Service is not directed to children under 13 (or the equivalent minimum age in your
          jurisdiction), and we do not knowingly collect personal data from children.
        </p>

        <h2>11. Changes &amp; contact</h2>
        <p>
          We may update this notice from time to time; material changes will be reflected by
          updating the date above. {ENTITY} — <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
      </article>
    </main>
  );
};

export default Privacy;
