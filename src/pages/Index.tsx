import { useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import DonationBanner from "@/components/DonationBanner";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import ProductGallery from "@/components/ProductGallery";

import VariationSelector, { variations } from "@/components/VariationSelector";
import ColorSelector from "@/components/ColorSelector";
import QuantitySelector from "@/components/QuantitySelector";
import BundlePromos from "@/components/BundlePromos";
import WhoItsFor from "@/components/WhoItsFor";
import Testimonials from "@/components/Testimonials";
import PurposeSection from "@/components/PurposeSection";
import TrustBadges from "@/components/TrustBadges";
import FAQ from "@/components/FAQ";
import ClosingSection from "@/components/ClosingSection";
import SupportPartners from "@/components/SupportPartners";

// Lifestyle image for the main gallery
import keyring1 from "@/assets/gallery/keyring-1.png";

const lifestyleImage = { src: keyring1, alt: "Love Key on keys" };

const Index = () => {
  const [selectedVariation, setSelectedVariation] = useState("metal");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const currentVariation = variations.find((v) => v.id === selectedVariation);
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Donation Banner */}
        <DonationBanner />
        
        {/* Why Section */}
        <WhySection />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Product Section */}
        <section id="product-section" className="container mx-auto px-4 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Choose Your Love Key™</h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left Column - Color Selector & Product Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <ColorSelector
                selected={selectedColor}
                onSelect={handleColorSelect}
              />
              <ProductGallery 
                selectedColor={selectedColor} 
                selectedVariation={selectedVariation}
                onColorSelect={handleColorSelect}
                lifestyleImage={lifestyleImage}
              />
            </div>
            
            {/* Right Column - Product Details */}
            <div className="space-y-4 sm:space-y-6">
              <VariationSelector
                selected={selectedVariation}
                onSelect={setSelectedVariation}
              />
              
              {currentVariation && (
                <QuantitySelector
                  quantity={quantity}
                  pricePerUnit={currentVariation.price}
                  onQuantityChange={setQuantity}
                  selectedVariation={selectedVariation}
                  selectedColor={selectedColor || "pink"}
                  variationName={currentVariation.name}
                />
              )}
              
              <BundlePromos selectedVariation={selectedVariation} />
            </div>
          </div>
        </section>
        
        {/* Who It's For */}
        <WhoItsFor />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Purpose Section */}
        <PurposeSection />
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* FAQ */}
        <FAQ />
        
        {/* Closing Section */}
        <ClosingSection />
        
        {/* Support Partners */}
        <SupportPartners />
      </main>
    </div>
  );
};

export default Index;
