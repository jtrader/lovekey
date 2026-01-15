import { useState } from "react";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import FeatureBox from "@/components/FeatureBox";
import VariationSelector, { variations } from "@/components/VariationSelector";
import ColorSelector from "@/components/ColorSelector";
import QuantitySelector from "@/components/QuantitySelector";

// Lifestyle images for the main gallery slider
import keyring1 from "@/assets/gallery/keyring-1.png";
import keyring2 from "@/assets/gallery/keyring-2.png";
import keyring3 from "@/assets/gallery/keyring-3.jpeg";
import keyring4 from "@/assets/gallery/keyring-4.png";

const lifestyleImages = [
  { src: keyring1, alt: "Love Key on keys" },
  { src: keyring2, alt: "Love Key lifestyle" },
  { src: keyring3, alt: "Love Key in use" },
  { src: keyring4, alt: "Love Key collection" },
];

const Index = () => {
  const [selectedVariation, setSelectedVariation] = useState("lightweight");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [lifestyleImageIndex, setLifestyleImageIndex] = useState(0);

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
              lifestyleImages={lifestyleImages}
              lifestyleImageIndex={lifestyleImageIndex}
              onLifestyleNavigate={setLifestyleImageIndex}
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
            
            <FeatureBox />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
