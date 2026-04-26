import { Heart } from "lucide-react";

// Partner product images
import cvgtEssential from "@/assets/products/partners/cvgt-essential.png";
import cvgtGuardian from "@/assets/products/partners/cvgt-guardian.png";
import bchsEssential from "@/assets/products/partners/bchs-essential.png";
import bchsGuardian from "@/assets/products/partners/bchs-guardian.png";
import bendigoEssential from "@/assets/products/partners/bendigo-health-essential.png";
import bendigoGuardian from "@/assets/products/partners/bendigo-health-guardian.png";

export interface PartnerProduct {
  id: string;
  name: string;
  shortName: string;
  essentialImage: string;
  guardianImage: string;
  bgClass: string;
  borderClass: string;
}

export const PARTNERS: PartnerProduct[] = [
  {
    id: "cvgt",
    name: "CVGT",
    shortName: "CVGT",
    essentialImage: cvgtEssential,
    guardianImage: cvgtGuardian,
    bgClass: "from-product-blue/20 to-product-orange/20",
    borderClass: "border-product-blue/30",
  },
  {
    id: "bchs",
    name: "BCHS",
    shortName: "BCHS",
    essentialImage: bchsEssential,
    guardianImage: bchsGuardian,
    bgClass: "from-product-aqua/20 to-product-green/20",
    borderClass: "border-product-aqua/30",
  },
  {
    id: "bendigo-health",
    name: "Bendigo Health",
    shortName: "Bendigo",
    essentialImage: bendigoEssential,
    guardianImage: bendigoGuardian,
    bgClass: "from-product-blue/20 to-product-white/20",
    borderClass: "border-product-blue/30",
  },
];

// Lookup table consumed by the cart drawer to render the correct partner
// image based on the synthetic "color" identifier used at add-to-cart time.
export const PARTNER_PRODUCT_IMAGES: Record<string, { lightweight: string; metal: string }> = PARTNERS.reduce(
  (acc, p) => {
    acc[p.id] = { lightweight: p.essentialImage, metal: p.guardianImage };
    return acc;
  },
  {} as Record<string, { lightweight: string; metal: string }>
);

export const PARTNER_COLOR_IDS = new Set(PARTNERS.map((p) => p.id));

interface PartnerMerchandiseProps {
  selectedPartnerId: string | null;
  onSelectPartner: (id: string | null) => void;
  selectedVariation: string;
}

const PartnerMerchandise = ({ selectedPartnerId, onSelectPartner, selectedVariation }: PartnerMerchandiseProps) => {
  const isGuardian = selectedVariation === "metal";
  const variationLabel = isGuardian ? "Guardian" : "Essential";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Heart className="w-4 h-4" />
        <span>Partner Merchandise — Tap to preview the {variationLabel}</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PARTNERS.map((partner) => {
          const isSelected = selectedPartnerId === partner.id;
          const img = isGuardian ? partner.guardianImage : partner.essentialImage;
          return (
            <button
              key={partner.id}
              onClick={() => onSelectPartner(isSelected ? null : partner.id)}
              aria-pressed={isSelected}
              aria-label={`${partner.name} Love Key ${variationLabel}`}
              className={`aspect-[4/3] rounded-xl overflow-hidden bg-secondary cursor-pointer focus:outline-none transition-all duration-200 ${
                isSelected
                  ? "ring-2 ring-accent"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`${partner.name} Love Key ${variationLabel}`}
                className="w-full h-full object-cover rounded-lg hover:scale-110 transition-transform duration-300"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerMerchandise;
