import { useEffect } from "react";
import Seo from "@/components/Seo";

const LAST_UPDATED = "9 June 2026";
const ENTITY = "Streamline Direct";
const CONTACT = "support@lovekey.com.au";

const Disclaimer = () => {
  useEffect(() => {
    document.title = "Disclaimer — Love Key";
  }, []);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <Seo
        title="Disclaimer — Love Key"
        description="Important safety notice: Love Key is a support tool that connects to helplines and resources; it does not replace emergency services."
        path="/disclaimer"
      />
      <h1 className="text-3xl font-bold text-foreground mb-1">Disclaimer</h1>
      <p className="text-sm text-muted-foreground mb-8">Last updated: {LAST_UPDATED}</p>

      <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none">
        <h2>In an emergency, call Triple Zero (000)</h2>
        <p>
          If you or someone else is in danger, call your local emergency number immediately — in
          Australia, <a href="tel:000">Triple Zero (000)</a>. If you need to talk to someone, you
          can contact a crisis support line such as Lifeline on <a href="tel:131114">13 11 14</a>.
          <strong> The Love Key Ring does not contact anyone for you and is not a substitute for
          emergency services or crisis support.</strong>
        </p>

        <h2>Not a medical or emergency device</h2>
        <p>
          Love Key (the &ldquo;Service&rdquo;), operated by <strong>{ENTITY}</strong> as part of
          the Love Key HELP Network, provides a wellbeing and preparedness product and general
          information. The Love Key Ring is <strong>not</strong> a medical device, personal alarm,
          or monitoring service, does not detect emergencies, and does not automatically alert
          anyone. Information provided through the Service is general only and is not professional,
          medical, legal, or financial advice.
        </p>

        <h2>No guarantee of outcomes</h2>
        <p>
          We do not guarantee that the Service or product will prevent harm or produce any
          particular outcome. Always follow the directions of official authorities and qualified
          professionals, and verify important information through official sources.
        </p>

        <h2>Third-party organisations and links</h2>
        <p>
          The Service references and links to independent third-party organisations and support
          services that we do not control or endorse. We are not responsible for their content,
          availability, conduct, or practices. Contact those services directly for support.
        </p>

        <h2>Reliance is at your own risk</h2>
        <p>
          Any reliance you place on information from the Service is at your own risk. To the
          fullest extent permitted by law — and without excluding any rights you have under the
          Australian Consumer Law — {ENTITY} accepts no liability for loss or damage arising from
          use of, or reliance on, the Service or its content.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this disclaimer? Contact {ENTITY} at{" "}
          <a href={`mailto:${CONTACT}`}>{CONTACT}</a>.
        </p>
      </article>
    </main>
  );
};

export default Disclaimer;
