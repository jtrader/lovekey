import { Button } from "@/components/ui/button";
import heroKeyring from "@/assets/hero-keyring.png";

const HeroSection = () => {
  const scrollToProduct = () => {
    document.getElementById('product-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="text-center py-16 sm:py-24 px-4">
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
        Love Key™ – A Small Keyring That Can Make a Big Difference
      </h1>
      <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-4">
        Because sometimes, the fastest way to help is simply knowing where to go.
      </p>
      <p className="text-base text-muted-foreground max-w-3xl mx-auto mb-8">
        With one tap or scan, Love Key™ connects you to first aid guidance and trusted mental health support when it matters most. It's a quiet promise that you, or someone you love, is never truly alone in a moment of need.
      </p>
      <Button size="lg" onClick={scrollToProduct} className="text-base px-8 py-6">
        Get Your Love Key™ Today
      </Button>
      <div className="mt-10">
        <img 
          src={heroKeyring} 
          alt="Love Key keyring in hand" 
          className="mx-auto max-w-md w-full"
        />
      </div>
    </section>
  );
};

export default HeroSection;
