import { ChevronLeft, ChevronRight } from "lucide-react";

// Lightweight images
import lightweightLightBlue from "@/assets/products/light-blue.png";
import lightweightGreen from "@/assets/products/green.png";
import lightweightOrange from "@/assets/products/orange.png";
import lightweightPink from "@/assets/products/pink.png";
import lightweightPurple from "@/assets/products/purple.png";
import lightweightRed from "@/assets/products/red.png";
import lightweightWhite from "@/assets/products/white.png";
import lightweightYellow from "@/assets/products/yellow.png";

// Metal images
import metalLightBlue from "@/assets/products/metal/light-blue.png";
import metalGreen from "@/assets/products/metal/green.png";
import metalOrange from "@/assets/products/metal/orange.png";
import metalPink from "@/assets/products/metal/pink.png";
import metalPurple from "@/assets/products/metal/purple.png";
import metalRed from "@/assets/products/metal/red.png";
import metalWhite from "@/assets/products/metal/white.png";
import metalYellow from "@/assets/products/metal/yellow.png";

const lightweightImages: Record<string, string> = {
  green: lightweightGreen,
  blue: lightweightLightBlue,
  orange: lightweightOrange,
  pink: lightweightPink,
  purple: lightweightPurple,
  red: lightweightRed,
  white: lightweightWhite,
  yellow: lightweightYellow,
};

const metalImages: Record<string, string> = {
  green: metalGreen,
  blue: metalLightBlue,
  orange: metalOrange,
  pink: metalPink,
  purple: metalPurple,
  red: metalRed,
  white: metalWhite,
  yellow: metalYellow,
};

interface ProductGalleryProps {
  selectedColor: string | null;
  selectedVariation: string;
  onColorSelect: (color: string) => void;
  lifestyleImages: { src: string; alt: string }[];
  lifestyleImageIndex: number;
  onLifestyleNavigate: (index: number) => void;
}

const ProductGallery = ({ 
  selectedColor, 
  selectedVariation, 
  onColorSelect, 
  lifestyleImages,
  lifestyleImageIndex,
  onLifestyleNavigate
}: ProductGalleryProps) => {
  const productImages = selectedVariation === "metal" ? metalImages : lightweightImages;
  const thumbnailImages = selectedVariation === "metal" ? metalImages : lightweightImages;
  
  // Show lifestyle image by default, product image when color is selected
  const showingLifestyle = selectedColor === null;
  const currentImage = showingLifestyle 
    ? lifestyleImages[lifestyleImageIndex]?.src 
    : productImages[selectedColor] || productImages.pink;
  const currentAlt = showingLifestyle 
    ? lifestyleImages[lifestyleImageIndex]?.alt 
    : `Love Key - ${selectedColor} ${selectedVariation}`;

  const goToPrevious = () => {
    const newIndex = lifestyleImageIndex === 0 ? lifestyleImages.length - 1 : lifestyleImageIndex - 1;
    onLifestyleNavigate(newIndex);
  };

  const goToNext = () => {
    const newIndex = lifestyleImageIndex === lifestyleImages.length - 1 ? 0 : lifestyleImageIndex + 1;
    onLifestyleNavigate(newIndex);
  };

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      <div className="bg-secondary rounded-2xl overflow-hidden flex items-center justify-center p-2 sm:p-3 relative">
        {showingLifestyle && lifestyleImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          </>
        )}
        
        <img
          src={currentImage}
          alt={currentAlt}
          className={`w-full transition-all duration-300 rounded-lg ${
            showingLifestyle 
              ? "aspect-[4/3] object-cover" 
              : "max-h-[280px] sm:max-h-[360px] lg:max-h-[440px] object-contain"
          }`}
        />
        
        {showingLifestyle && lifestyleImages.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {lifestyleImages.map((_, index) => (
              <button
                key={index}
                onClick={() => onLifestyleNavigate(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === lifestyleImageIndex ? "bg-accent" : "bg-background/60"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(thumbnailImages).map(([color, img]) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 flex items-center justify-center bg-secondary p-2 cursor-pointer hover:opacity-100 ${
              selectedColor === color 
                ? "border-accent ring-2 ring-accent/20" 
                : "border-transparent opacity-70 hover:border-border"
            }`}
          >
            <img
              src={img}
              alt={`${color} keyring`}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
