// Metal images
import metalLightBlue from "@/assets/products/metal/light-blue.png";
import metalGreen from "@/assets/products/metal/green.png";
import metalOrange from "@/assets/products/metal/orange.png";
import metalPink from "@/assets/products/metal/pink.png";
import metalAqua from "@/assets/products/metal/aqua.png";
import metalRed from "@/assets/products/metal/red.png";
import metalWhite from "@/assets/products/metal/white.png";
import metalYellow from "@/assets/products/metal/yellow.png";

const metalImages: Record<string, string> = {
  green: metalGreen,
  blue: metalLightBlue,
  orange: metalOrange,
  pink: metalPink,
  aqua: metalAqua,
  red: metalRed,
  white: metalWhite,
  yellow: metalYellow,
};

import { PARTNERS } from "@/components/PartnerMerchandise";

interface ProductGalleryProps {
  selectedColor: string | null;
  selectedVariation: string;
  onColorSelect: (color: string) => void;
  lifestyleImage: { src: string; alt: string };
  selectedPartnerId?: string | null;
}

const ProductGallery = ({
  selectedColor,
  onColorSelect,
  lifestyleImage,
  selectedPartnerId,
}: ProductGalleryProps) => {
  const productImages = metalImages;
  const thumbnailImages = metalImages;

  const activePartner = selectedPartnerId
    ? PARTNERS.find((p) => p.id === selectedPartnerId) ?? null
    : null;

  // Show lifestyle image by default, product image when color is selected,
  // partner image when a partner is selected.
  const showingPartner = activePartner !== null;
  const showingLifestyle = !showingPartner && selectedColor === null;
  const currentImage = showingLifestyle
    ? lifestyleImage.src
    : productImages[selectedColor as string] || productImages.pink;
  const currentAlt = showingLifestyle
    ? lifestyleImage.alt
    : `Love Key Guardian - ${selectedColor}`;

  return (
    <div className="flex flex-col gap-3 animate-fade-up">
      <div className="bg-white border border-border rounded-2xl shadow-lg overflow-hidden flex items-center justify-center p-2 sm:p-3 relative">
        {showingPartner && activePartner ? (
          <img
            key={activePartner.id}
            src={activePartner.guardianImage}
            alt={`${activePartner.name} Love Key Guardian`}
            className="w-full max-h-[280px] sm:max-h-[360px] lg:max-h-[440px] object-contain rounded-lg animate-fade-in"
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        ) : (
          <img
            src={currentImage}
            alt={currentAlt}
            className={`w-full transition-all duration-300 rounded-lg ${
              showingLifestyle
                ? "aspect-[4/3] object-cover"
                : "max-h-[280px] sm:max-h-[360px] lg:max-h-[440px] object-contain"
            }`}
            loading="lazy"
            decoding="async"
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        )}
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
              loading="lazy"
              decoding="async"
              sizes="(min-width: 1024px) 12vw, 25vw"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
