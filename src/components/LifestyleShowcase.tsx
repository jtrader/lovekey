import metalKeyring from "@/assets/lifestyle/metal-keyring.jpeg";

const LifestyleShowcase = () => {
  return (
    <section className="py-12 sm:py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">Your <span className="text-primary">Love</span> Key Options</h2>
        <div className="text-center mb-10 sm:mb-14 text-xl font-medium text-muted-foreground space-y-6 sm:space-y-8">
          <p>One mission.</p>
          <p>Always there when you need it.</p>
        </div>

        <div className="grid md:grid-cols-1 gap-6 lg:gap-10 max-w-md mx-auto">
          {/* Metal Edition Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={metalKeyring} 
                alt="Love Key Guardian Edition metal keyring with chrome bezel and QR code for mental health support" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 sm:p-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                Premium Finish
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Guardian Edition
              </h3>
              <p className="text-white/80 text-sm mt-2 max-w-xs">
                Sleek chrome bezel with domed resin finish
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleShowcase;
