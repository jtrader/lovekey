import { Button } from "@/components/ui/button";
import keyringHero from "@/assets/keyring-hero.png";

const HeroSection = () => {
  const scrollToProduct = () => {
    document.getElementById('product-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="text-center sm:py-24 px-4 py-[4px]">
      {/* Cropped keyring image at top */}
      <div className="w-full max-w-xs sm:max-w-sm mx-auto mb-6">
        <img 
          src={keyringHero} 
          alt="Love Key keyring with QR code" 
          className="w-full h-auto"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
        Love Key™ – A Small Keyring That Can Make a Big Difference
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
        Because sometimes, the fastest way to help is simply knowing where to go.
      </p>
      <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-8">With one tap or scan, Love Key™ connects you to personal safety and wellbeing support when it matters most. It's a quiet promise that you, or someone you love, is never truly alone in a moment of need.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={scrollToProduct} className="text-base px-8 py-6">
          Get Your Love Key™ Today
        </Button>
        <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
          <a href="https://unit.link/love-key" target="_blank" rel="noopener noreferrer">
            View the Love Key™ App Now
          </a>
        </Button>
      </div>
    </section>;
};
export default HeroSection;