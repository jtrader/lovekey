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
  selectedColor: string;
  selectedVariation: string;
  onColorSelect: (color: string) => void;
  overrideImage?: { src: string; alt: string } | null;
}

const ProductGallery = ({ selectedColor, selectedVariation, onColorSelect, overrideImage }: ProductGalleryProps) => {
  const images = selectedVariation === "metal" ? metalImages : lightweightImages;
  const currentImage = overrideImage?.src || images[selectedColor] || images.pink;
  const currentAlt = overrideImage?.alt || `Love Key - ${selectedColor} ${selectedVariation}`;
  const thumbnailImages = selectedVariation === "metal" ? metalImages : lightweightImages;

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      <div className="bg-secondary rounded-2xl overflow-hidden flex items-center justify-center p-4 sm:p-6">
        <img
          src={currentImage}
          alt={currentAlt}
          className={`max-h-[240px] sm:max-h-[320px] lg:max-h-[400px] transition-all duration-300 rounded-lg ${
            overrideImage 
              ? "w-full object-cover" 
              : "w-auto h-auto object-contain"
          }`}
        />
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
