import { useEffect } from "react";
import Seo from "@/components/Seo";

const LAST_UPDATED = "9 June 2026";
const ENTITY = "Streamline Direct";
const CONTACT = "support@lovekey.com.au";

const Terms = () => {
  useEffect(() => {
    document.title = "Terms and Conditions — Love Key";
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Seo
        title="Terms and Conditions — Love Key"
        description="Terms governing purchases, shipping, refunds, and use of the Love Key website and products."
        path="/terms"
      />
      <h1 className="text-3xl font-bold text-foreground mb-1">Terms and Conditions</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {LAST_UPDATED}</p>

      <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
        <h2>1. Who you are contracting with</h2>
        <p>
          These Terms govern your use of lovekey.com.au and your purchase of Love Key products
          (together, the &ldquo;Service&rdquo;), provided by <strong>{ENTITY}</strong>{" "}
          (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) as part of the Love Key HELP
          Network. By using the Service or placing an order, you agree to these Terms.
        </p>

        <h2>2. The Love Key Ring is not a medical or emergency device</h2>
        <p>
          The Love Key Ring is a wellbeing and preparedness product that helps you reach support
          information. It is <strong>not</strong> a medical device, personal alarm, or emergency
          monitoring service; it does not detect emergencies and does not automatically contact
          anyone on your behalf. <strong>In an emergency, call your local emergency number — in
          Australia, <a href="tel:000">Triple Zero (000)</a>.</strong> If you need to talk to
          someone, you can also contact a crisis line such as Lifeline on{" "}
          <a href="tel:131114">13 11 14</a>.
        </p>

        <h2>3. Orders and payment</h2>
        <p>
          Prices are shown at checkout in the currency indicated and may change over time. Card
          payments are processed by our payment provider, <strong>Stripe</strong>; by placing an
          order you also agree to Stripe&rsquo;s terms. An order is accepted once payment is
          confirmed. We may decline or cancel an order — for example due to a pricing or stock
          error, suspected fraud, or inability to ship to your location — and where payment was
          taken we will refund it.
        </p>

        <h2>4. Shipping and delivery</h2>
        <p>
          We ship physical goods to the addresses we support. Delivery timeframes shown are
          estimates and are not guaranteed. Title and risk of loss pass to you on delivery. Please
          ensure your shipping details are correct; we are not responsible for delays or
          non-delivery caused by incorrect address information.
        </p>

        <h2>5. Returns, refunds and your consumer rights</h2>
        <p>
          Our goods come with guarantees that cannot be excluded under the{" "}
          <strong>Australian Consumer Law</strong>. You are entitled to a replacement or refund
          for a major failure and to compensation for any other reasonably foreseeable loss or
          damage. You are also entitled to have goods repaired or replaced if they fail to be of
          acceptable quality and the failure does not amount to a major failure. For returns,
          faults, or refund requests, contact us at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>

        <h2>6. Acceptable use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Service unlawfully or to facilitate unlawful activity;</li>
          <li>Commit fraud, send spam, or impersonate others;</li>
          <li>Infringe any intellectual property, privacy, or publicity right;</li>
          <li>Interfere with the Service&rsquo;s security or integrity, including by introducing malware, probing for vulnerabilities, scraping at scale, or circumventing technical limits.</li>
        </ul>

        <h2>7. Intellectual property</h2>
        <p>
          The Service, its software, content, branding, and product designs are owned by {ENTITY}{" "}
          or its licensors and protected by intellectual property laws. Subject to these Terms, we
          grant you a limited, non-exclusive, non-transferable, revocable licence to use the
          Service for its intended purpose. All rights not expressly granted are reserved.
        </p>

        <h2>8. Availability and modifications</h2>
        <p>
          We strive to keep the Service available but do not guarantee it will be uninterrupted,
          timely, secure, or error-free, and we may modify or discontinue features or products at
          any time.
        </p>

        <h2>9. Disclaimers and limitation of liability</h2>
        <p>
          Nothing in these Terms excludes, restricts, or modifies any consumer guarantee, right,
          or remedy you have under the Australian Consumer Law or other law that cannot be
          excluded. Subject to that, and to the fullest extent permitted by law, the Service and
          content (other than the goods themselves) are provided &ldquo;as is&rdquo;, we disclaim
          implied warranties, and {ENTITY.toUpperCase()} WILL NOT BE LIABLE FOR INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES. Where liability cannot be
          excluded but can be limited, our liability is limited, at our option, to resupplying the
          goods or paying the cost of resupply.
        </p>

        <h2>10. Governing law</h2>
        <p>
          These Terms are governed by the laws of the State of Victoria, Australia. The courts of
          Victoria, Australia have exclusive jurisdiction, except where mandatory consumer
          protection laws give you the right to bring proceedings in your place of residence.
        </p>

        <h2>11. Changes &amp; contact</h2>
        <p>
          We may update these Terms from time to time; material changes will be reflected by
          updating the date above, and continued use constitutes acceptance. {ENTITY} —{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
      </article>
    </main>
  );
};

export default Terms;
