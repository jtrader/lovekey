import metalKeyring from "@/assets/lifestyle/metal-keyring.jpeg";
import lightweightKeyring from "@/assets/lifestyle/lightweight-keyring.jpeg";

const LifestyleShowcase = () => {
  return (
    <section className="py-12 sm:py-20 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <p className="text-center text-muted-foreground mb-10 sm:mb-14 text-xl sm:text-2xl font-medium tracking-wide">
          Two styles. One mission. Always there when you need it.
        </p>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
          {/* Metal Edition Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={metalKeyring} 
                alt="Love Key Metal Edition with QR code" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
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

          {/* Lightweight Edition Card */}
          <div className="group relative overflow-hidden rounded-3xl bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="aspect-[4/5] overflow-hidden">
              <img 
                src={lightweightKeyring} 
                alt="Love Key Lightweight Edition with QR code" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6 sm:p-8">
            <span className="text-xs font-semibold tracking-[0.2em] text-white/80 uppercase">
                Everyday Carry
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Essential Edition
              </h3>
              <p className="text-white/80 text-sm mt-2 max-w-xs">
                Durable acrylic with smooth matte finish
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LifestyleShowcase;
