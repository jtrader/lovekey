import cvgtLogo from "@/assets/partners/cvgt.png";
import bendigoHealth from "@/assets/partners/bendigo-health-foundation.png";

const DonationBanner = () => {
  return (
    <section className="py-12 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg font-semibold mb-8">
          Our Major Partners:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 sm:gap-8">
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm w-full sm:w-64 flex flex-col items-center justify-center">
            <img 
              src={cvgtLogo} 
              alt="CVGT Employment partner" 
              className="h-28 sm:h-36 object-contain"
              loading="lazy"
            />
            <a href="https://lovekeyring.org/?partner=cvgt" target="_blank" rel="noopener noreferrer" className="mt-4 text-xs font-semibold tracking-[0.2em] text-primary uppercase hover:underline">
              View the CVGT Love Key
            </a>
          </div>
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm w-full sm:w-64 flex flex-col items-center justify-center">
            <img 
              src={bendigoHealth} 
              alt="Bendigo Health Foundation healthcare partner" 
              className="h-28 sm:h-36 object-contain"
              loading="lazy"
            />
            <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Proud Partner
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;
