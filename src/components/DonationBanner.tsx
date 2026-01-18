import bendigoHealthFoundation from "@/assets/partners/bendigo-health-foundation.png";

const DonationBanner = () => {
  return (
    <section className="py-12 px-4 bg-secondary/50">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-6">
          A portion of the profits from every Love Key™ sold is donated to
        </p>
        <div className="bg-background rounded-2xl p-8 border border-border shadow-sm inline-block">
          <img 
            src={bendigoHealthFoundation} 
            alt="Bendigo Health Foundation" 
            className="h-20 sm:h-24 object-contain mx-auto"
          />
          <p className="mt-4 text-xs font-semibold tracking-[0.2em] text-primary uppercase">
            Proud Partner
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;
