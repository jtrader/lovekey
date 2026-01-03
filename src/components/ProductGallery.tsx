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
}

const ProductGallery = ({ selectedColor, selectedVariation, onColorSelect }: ProductGalleryProps) => {
  const images = selectedVariation === "metal" ? metalImages : lightweightImages;
  const currentImage = images[selectedColor] || images.pink;
  const thumbnailImages = selectedVariation === "metal" ? metalImages : lightweightImages;

  return (
    <div className="flex gap-2 animate-fade-up">
      <div className="flex-1 bg-secondary rounded-2xl overflow-hidden flex items-center justify-center">
        <img
          src={currentImage}
          alt={`Love Key - ${selectedColor} ${selectedVariation}`}
          className="w-auto h-auto max-h-[240px] sm:max-h-[320px] lg:max-h-[400px] object-contain transition-all duration-300"
        />
      </div>
      
      <div className="flex flex-col gap-2">
        {Object.entries(thumbnailImages).map(([color, img]) => (
          <button
            key={color}
            onClick={() => onColorSelect(color)}
            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 flex items-center justify-center bg-secondary p-1 cursor-pointer ${
              selectedColor === color 
                ? "border-accent ring-2 ring-accent/20" 
                : "border-transparent opacity-60 hover:opacity-100"
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
