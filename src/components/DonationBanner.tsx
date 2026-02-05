import lifeline from "@/assets/partners/lifeline.jpg";
import bendigoHealth from "@/assets/partners/bendigo-health-foundation.png";

const DonationBanner = () => {
  return (
    <section className="py-12 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-8">
          <span className="font-bold text-primary">50%</span> of all profits from every Love Key™ sold is donated to:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 sm:gap-8">
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm w-full sm:w-64 flex flex-col items-center justify-center">
            <img 
              src={lifeline} 
              alt="Lifeline" 
              className="h-28 sm:h-36 object-contain"
            />
            <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
              Proud Partner
            </p>
          </div>
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm w-full sm:w-64 flex flex-col items-center justify-center">
            <img 
              src={bendigoHealth} 
              alt="Bendigo Health Foundation" 
              className="h-28 sm:h-36 object-contain"
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
