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

interface PartnerMerchandiseProps {
  selectedPartnerId: string | null;
  onSelectPartner: (id: string | null) => void;
}

const PartnerMerchandise = ({ selectedPartnerId, onSelectPartner }: PartnerMerchandiseProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Heart className="w-4 h-4" />
        <span>Partner Merchandise — Tap to preview</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PARTNERS.map((partner) => {
          const isSelected = selectedPartnerId === partner.id;
          return (
            <button
              key={partner.id}
              onClick={() => onSelectPartner(isSelected ? null : partner.id)}
              aria-pressed={isSelected}
              className={`group relative overflow-hidden rounded-xl border-2 bg-gradient-to-br ${partner.bgClass} p-3 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
                isSelected ? "border-primary ring-2 ring-primary/30" : partner.borderClass
              }`}
            >
              <div className="flex justify-center -space-x-3 mb-2">
                <div className="w-14 h-14 rounded-full bg-background shadow-md overflow-hidden border-2 border-background">
                  <img src={partner.guardianImage} alt={`${partner.name} Guardian`} className="w-full h-full object-contain" />
                </div>
                <div className="w-14 h-14 rounded-full bg-background shadow-md overflow-hidden border-2 border-background">
                  <img src={partner.essentialImage} alt={`${partner.name} Essential`} className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-sm font-semibold">{partner.name}</div>
                <div className="text-xs text-muted-foreground">Guardian + Essential</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerMerchandise;
