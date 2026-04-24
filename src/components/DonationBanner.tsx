import bchsLogo from "@/assets/partners/bchs.svg";

const DonationBanner = () => {
  return (
    <section className="py-12 px-4 bg-secondary/50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-lg font-semibold mb-8">
          Our Merchandise Partners:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 sm:gap-8">
          <div className="bg-background rounded-2xl p-8 border border-border shadow-sm w-full sm:w-64 flex flex-col items-center justify-center">
            <a href="https://lovekeyring.org/?partner=bchs" target="_blank" rel="noopener noreferrer">
              <img 
                src={bchsLogo} 
                alt="Bendigo Health Community Services partner" 
                className="h-28 sm:h-36 object-contain"
                loading="lazy"
              />
            </a>
            <a href="https://lovekeyring.org/?partner=bchs" target="_blank" rel="noopener noreferrer" className="mt-4 text-xs font-semibold tracking-[0.2em] text-primary uppercase hover:underline">
              Bendigo Health Community Services Love Key
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;
