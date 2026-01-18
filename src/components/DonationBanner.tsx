import bendigoHealthFoundation from "@/assets/partners/bendigo-health-foundation.png";

const DonationBanner = () => {
  return (
    <section className="py-12 px-4 bg-background">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-lg text-muted-foreground mb-6">
          A portion of the profits from every Love Key™ sold is donated to
        </p>
        <div className="flex justify-center">
          <img 
            src={bendigoHealthFoundation} 
            alt="Bendigo Health Foundation" 
            className="h-20 sm:h-24 object-contain"
          />
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;
