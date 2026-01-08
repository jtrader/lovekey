import { useState } from "react";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import FeatureBox from "@/components/FeatureBox";
import VariationSelector, { variations } from "@/components/VariationSelector";
import ColorSelector from "@/components/ColorSelector";
import AddToCartButton from "@/components/AddToCartButton";
import RealLifeGallery, { realLifeImages } from "@/components/RealLifeGallery";

const Index = () => {
  const [selectedVariation, setSelectedVariation] = useState("lightweight");
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [lifestyleImageIndex, setLifestyleImageIndex] = useState(0);

  const currentVariation = variations.find((v) => v.id === selectedVariation);
  
  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };
  
  const handleLifestyleSelect = (index: number | null) => {
    if (index !== null) {
      setLifestyleImageIndex(index);
      setSelectedColor(null); // Clear product color when selecting lifestyle image
    }
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
              lifestyleImages={realLifeImages}
              lifestyleImageIndex={lifestyleImageIndex}
              onLifestyleNavigate={setLifestyleImageIndex}
            />
            <RealLifeGallery 
              selectedIndex={selectedColor === null ? lifestyleImageIndex : null}
              onSelect={handleLifestyleSelect}
            />
          </div>
          
          {/* Right Column - Product Details */}
          <div className="space-y-4 sm:space-y-6">
            <VariationSelector
              selected={selectedVariation}
              onSelect={setSelectedVariation}
            />
            
            {currentVariation && (
              <AddToCartButton
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
