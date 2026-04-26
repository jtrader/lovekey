import { Button } from "@/components/ui/button";
import heartLogo from "@/assets/heart-logo.png";

const HeroSection = () => {
  const scrollToProduct = () => {
    document.getElementById('product-section')?.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return <section className="text-center sm:py-10 px-4 py-1">
      {/* Heart logo at top */}
      <div className="w-full max-w-[120px] sm:max-w-[160px] mx-auto mt-8 sm:mt-12 mb-8 sm:mb-10">
        <img 
          src={heartLogo} 
          alt="Love Key heart logo" 
          className="w-full h-auto object-contain"
        />
      </div>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 max-w-4xl mx-auto leading-tight">
        <span className="text-primary">Love</span> Key – A Small Keyring That Can Make a Big Difference
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-2">
        Because sometimes, the fastest way to help is simply knowing where to go.
      </p>
      <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-4">With one tap or scan, <span className="text-primary font-medium">Love</span> Key connects you to personal safety and wellbeing support when it matters most. It's a quiet promise that you, or someone you love, is never truly alone in a moment of need.</p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={scrollToProduct} className="text-base px-8 py-6">
          Get Your <span className="font-bold">Love</span> Key Today
        </Button>
        <Button size="lg" variant="outline" asChild className="text-base px-8 py-6">
          <a href="https://lovekeyring.org" target="_blank" rel="noopener noreferrer">
            View the <span className="text-primary">Love</span> Key App Now
          </a>
        </Button>
      </div>
    </section>;
};
export default HeroSection;