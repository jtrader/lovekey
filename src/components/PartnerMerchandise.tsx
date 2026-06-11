import heartLogo from "@/assets/heart-logo.png";

// Partner product images (Guardian only)
import cvgtGuardian from "@/assets/products/partners/cvgt-guardian.png";
import bchsGuardian from "@/assets/products/partners/bchs-guardian.png";
import bendigoGuardian from "@/assets/products/partners/bendigo-health-guardian.png";

export interface PartnerProduct {
  id: string;
  name: string;
  shortName: string;
  guardianImage: string;
  bgClass: string;
  borderClass: string;
}

export const PARTNERS: PartnerProduct[] = [
  {
    id: "cvgt",
    name: "CVGT",
    shortName: "CVGT",
    guardianImage: cvgtGuardian,
    bgClass: "from-product-blue/20 to-product-orange/20",
    borderClass: "border-product-blue/30",
  },
  {
    id: "bchs",
    name: "BCHS",
    shortName: "BCHS",
    guardianImage: bchsGuardian,
    bgClass: "from-product-aqua/20 to-product-green/20",
    borderClass: "border-product-aqua/30",
  },
  {
    id: "bendigo-health",
    name: "Bendigo Health",
    shortName: "Bendigo",
    guardianImage: bendigoGuardian,
    bgClass: "from-product-blue/20 to-product-white/20",
    borderClass: "border-product-blue/30",
  },
];

// Lookup table consumed by the cart drawer to render the correct partner
// image based on the synthetic "color" identifier used at add-to-cart time.
export const PARTNER_PRODUCT_IMAGES: Record<string, { metal: string }> = PARTNERS.reduce(
  (acc, p) => {
    acc[p.id] = { metal: p.guardianImage };
    return acc;
  },
  {} as Record<string, { metal: string }>
);

export const PARTNER_COLOR_IDS = new Set(PARTNERS.map((p) => p.id));

interface PartnerMerchandiseProps {
  selectedPartnerId: string | null;
  onSelectPartner: (id: string | null) => void;
}

const PartnerMerchandise = ({ selectedPartnerId, onSelectPartner }: PartnerMerchandiseProps) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <img src={heartLogo} alt="" aria-hidden="true" className="w-4 h-4 object-contain" loading="lazy" decoding="async" />
        <span>Partner Merchandise — All merchandise profits go to these community focused organisations</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {PARTNERS.map((partner) => {
          const isSelected = selectedPartnerId === partner.id;
          return (
            <button
              key={partner.id}
              onClick={() => onSelectPartner(isSelected ? null : partner.id)}
              aria-pressed={isSelected}
              aria-label={`${partner.name} Love Key Guardian`}
              className={`aspect-[4/3] rounded-xl overflow-hidden bg-white border border-border shadow-lg cursor-pointer focus:outline-none transition-all duration-200 ${
                isSelected
                  ? "ring-2 ring-accent"
                  : "opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={partner.guardianImage}
                alt={`${partner.name} Love Key Guardian`}
                className="w-full h-full object-contain p-2 rounded-lg hover:scale-110 transition-transform duration-300"
                loading="lazy"
                decoding="async"
                sizes="(min-width: 768px) 33vw, 33vw"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerMerchandise;
