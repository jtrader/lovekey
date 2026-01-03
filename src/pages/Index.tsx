import { useState } from "react";
import Header from "@/components/Header";
import ProductGallery from "@/components/ProductGallery";
import FeatureBox from "@/components/FeatureBox";
import VariationSelector, { variations } from "@/components/VariationSelector";
import ColorSelector from "@/components/ColorSelector";
import QuantitySelector from "@/components/QuantitySelector";

const Index = () => {
  const [selectedVariation, setSelectedVariation] = useState("lightweight");
  const [selectedColor, setSelectedColor] = useState("pink");
  const [quantity, setQuantity] = useState(1);
  const [cartCount] = useState(0);

  const currentVariation = variations.find((v) => v.id === selectedVariation);

  return (
    <div className="min-h-screen bg-background">
      <Header cartCount={cartCount} />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Left Column - Product Gallery */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery selectedColor={selectedColor} />
          </div>
          
          {/* Right Column - Product Details */}
          <div className="space-y-6">
            <div className="animate-fade-up">
              <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">
                Love Key
              </h1>
              <p className="text-lg text-muted-foreground">
                NFC-enabled keyring for life-saving connections
              </p>
            </div>
            
            <FeatureBox />
            
            <VariationSelector
              selected={selectedVariation}
              onSelect={setSelectedVariation}
            />
            
            <ColorSelector
              selected={selectedColor}
              onSelect={setSelectedColor}
            />
            
            {currentVariation && (
              <QuantitySelector
                quantity={quantity}
                pricePerUnit={currentVariation.price}
                onQuantityChange={setQuantity}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
