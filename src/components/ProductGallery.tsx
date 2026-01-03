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
}

const ProductGallery = ({ selectedColor, selectedVariation }: ProductGalleryProps) => {
  const images = selectedVariation === "metal" ? metalImages : lightweightImages;
  const currentImage = images[selectedColor] || images.pink;
  const thumbnailImages = selectedVariation === "metal" ? metalImages : lightweightImages;

  return (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="aspect-square bg-secondary rounded-2xl overflow-hidden flex items-center justify-center p-8">
        <img
          src={currentImage}
          alt={`Love Key - ${selectedColor} ${selectedVariation}`}
          className="w-full h-full object-contain transition-all duration-300"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {Object.entries(thumbnailImages).map(([color, img]) => (
          <div
            key={color}
            className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all duration-200 flex items-center justify-center bg-secondary p-1 ${
              selectedColor === color 
                ? "border-accent ring-2 ring-accent/20" 
                : "border-transparent opacity-60"
            }`}
          >
            <img
              src={img}
              alt={`${color} keyring`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
