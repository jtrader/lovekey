import { useState } from "react";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import FeatureBox from "@/components/FeatureBox";
import VariationSelector, { variations } from "@/components/VariationSelector";
import ColorSelector from "@/components/ColorSelector";
import QuantitySelector from "@/components/QuantitySelector";
import BundlePromos from "@/components/BundlePromos";
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
      
      <main className="container mx-auto px-4 pt-20 sm:pt-24 pb-8 sm:pb-12">
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
            
            <FeatureBox />
          </div>
        </div>
        
        <SupportPartners />
      </main>
    </div>
  );
};

export default Index;
