import { Heart } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { getStripePrice, CURRENCY_SYMBOL } from "@/lib/stripe-products";
import { toast } from "@/hooks/use-toast";
import { trackAddToCart } from "@/lib/analytics";

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
  // Color tokens used as a unique identifier in the cart so partner items
  // group separately and the cart can render the correct artwork.
  essentialColorId: string;
  guardianColorId: string;
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
    essentialColorId: "cvgt",
    guardianColorId: "cvgt",
    bgClass: "from-product-blue/20 to-product-orange/20",
    borderClass: "border-product-blue/30",
  },
  {
    id: "bchs",
    name: "BCHS",
    shortName: "BCHS",
    essentialImage: bchsEssential,
    guardianImage: bchsGuardian,
    essentialColorId: "bchs",
    guardianColorId: "bchs",
    bgClass: "from-product-aqua/20 to-product-green/20",
    borderClass: "border-product-aqua/30",
  },
  {
    id: "bendigo-health",
    name: "Bendigo Health",
    shortName: "Bendigo",
    essentialImage: bendigoEssential,
    guardianImage: bendigoGuardian,
    essentialColorId: "bendigo-health",
    guardianColorId: "bendigo-health",
    bgClass: "from-product-blue/20 to-product-white/20",
    borderClass: "border-product-blue/30",
  },
];

// Lookup table consumed by the cart drawer to render the correct partner
// image based on the synthetic "color" identifier used at add-to-cart time.
export const PARTNER_PRODUCT_IMAGES: Record<string, { lightweight: string; metal: string }> = PARTNERS.reduce(
  (acc, p) => {
    acc[p.essentialColorId] = { lightweight: p.essentialImage, metal: p.guardianImage };
    return acc;
  },
  {} as Record<string, { lightweight: string; metal: string }>
);

export const PARTNER_COLOR_IDS = new Set(PARTNERS.map((p) => p.essentialColorId));

const PartnerMerchandise = () => {
  const { addItem, setIsCartOpen } = useCart();

  const handleAddPair = (partner: PartnerProduct) => {
    const guardianName = `${partner.name} Love Key Guardian`;
    const essentialName = `${partner.name} Love Key Essential`;

    addItem({
      variationId: "metal",
      variationName: guardianName,
      color: partner.guardianColorId,
      pricePerUnit: 9.0,
      priceId: getStripePrice("metal"),
      quantity: 1,
    });

    addItem({
      variationId: "lightweight",
      variationName: essentialName,
      color: partner.essentialColorId,
      pricePerUnit: 0,
      priceId: getStripePrice("lightweight"),
      quantity: 1,
    });

    trackAddToCart({
      variationId: "metal",
      variationName: guardianName,
      color: partner.guardianColorId,
      pricePerUnit: 9.0,
      quantity: 1,
    });

    setIsCartOpen(true);
    toast({
      title: `${partner.name} pack added`,
      description: `Guardian + Essential added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Heart className="w-4 h-4" />
        <span>Partner Merchandise — Add a themed pair to your cart</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PARTNERS.map((partner) => (
          <button
            key={partner.id}
            onClick={() => handleAddPair(partner)}
            className={`group relative overflow-hidden rounded-xl border ${partner.borderClass} bg-gradient-to-br ${partner.bgClass} p-3 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
          >
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {CURRENCY_SYMBOL}9
            </div>

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
        ))}
      </div>
    </div>
  );
};

export default PartnerMerchandise;
