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
  lifestyleImage: { src: string; alt: string };
}

const ProductGallery = ({ 
  selectedColor, 
  selectedVariation, 
  onColorSelect, 
  lifestyleImage,
}: ProductGalleryProps) => {
  const productImages = selectedVariation === "metal" ? metalImages : lightweightImages;
  const thumbnailImages = selectedVariation === "metal" ? metalImages : lightweightImages;
  
  // Show lifestyle image by default, product image when color is selected
  const showingLifestyle = selectedColor === null;
  const currentImage = showingLifestyle 
    ? lifestyleImage.src 
    : productImages[selectedColor] || productImages.pink;
  const currentAlt = showingLifestyle 
    ? lifestyleImage.alt 
    : `Love Key™ - ${selectedColor} ${selectedVariation}`;

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      <div className="bg-secondary rounded-2xl overflow-hidden flex items-center justify-center p-2 sm:p-3 relative">
        <img
          src={currentImage}
          alt={currentAlt}
          className={`w-full transition-all duration-300 rounded-lg ${
            showingLifestyle 
              ? "aspect-[4/3] object-cover" 
              : "max-h-[280px] sm:max-h-[360px] lg:max-h-[440px] object-contain"
          }`}
        />
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {Object.entries(thumbnailImages).map(([color, img]) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`aspect-[4/3] rounded-xl overflow-hidden bg-secondary cursor-pointer focus:outline-none transition-all duration-200 ${
              selectedColor === color 
                ? "ring-2 ring-accent" 
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={img}
              alt={`${color} keyring`}
              className="w-full h-full object-cover rounded-lg hover:scale-110 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
