import { Gift } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { variations } from "@/components/VariationSelector";
import { getStripePrice } from "@/lib/stripe-products";
import { toast } from "@/hooks/use-toast";

// Product images for bundle display
import greenImg from "@/assets/products/green.png";
import yellowImg from "@/assets/products/yellow.png";
import blueImg from "@/assets/products/light-blue.png";
import aquaImg from "@/assets/products/aqua.png";
import redImg from "@/assets/products/red.png";
import whiteImg from "@/assets/products/white.png";

const bundlePromos = [
  {
    id: "aussie-pack",
    name: "Aussie Pack",
    tagline: "Green & Yellow",
    colors: ["green", "yellow"],
    images: [greenImg, yellowImg],
    emoji: "🦘",
    bgClass: "from-product-green/20 to-product-yellow/20",
    borderClass: "border-product-green/30",
  },
  {
    id: "true-blue",
    name: "True Blue",
    tagline: "Blue & Aqua",
    colors: ["blue", "aqua"],
    images: [blueImg, aquaImg],
    emoji: "🌊",
    bgClass: "from-product-blue/20 to-product-aqua/20",
    borderClass: "border-product-blue/30",
  },
  {
    id: "love-u",
    name: "Love U",
    tagline: "Red & White",
    colors: ["red", "white"],
    images: [redImg, whiteImg],
    emoji: "❤️",
    bgClass: "from-product-red/20 to-white/20",
    borderClass: "border-product-red/30",
  },
];

interface BundlePromosProps {
  selectedVariation: string;
}

const BundlePromos = ({ selectedVariation }: BundlePromosProps) => {
  const { addItem, setIsCartOpen } = useCart();

  const handleAddBundle = (colors: string[]) => {
    const variation = variations.find((v) => v.id === selectedVariation);
    if (!variation) return;

    colors.forEach((color) => {
      addItem({
        variationId: selectedVariation,
        variationName: variation.name,
        color,
        pricePerUnit: variation.price,
        priceId: getStripePrice(selectedVariation),
        quantity: 1,
      });
    });

    setIsCartOpen(true);
    toast({
      title: "Bundle added to cart!",
      description: "20% discount applied automatically",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <Gift className="w-4 h-4" />
        <span>Bundle & Save 20%</span>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {bundlePromos.map((promo) => (
          <button
            key={promo.id}
            onClick={() => handleAddBundle(promo.colors)}
            className={`group relative overflow-hidden rounded-xl border ${promo.borderClass} bg-gradient-to-br ${promo.bgClass} p-3 text-left transition-all hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
          >
            {/* Discount badge */}
            <div className="absolute top-2 right-2 bg-product-red text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              20% OFF
            </div>
            
            {/* Product images */}
            <div className="flex justify-center -space-x-4 mb-2">
              {promo.images.map((img, idx) => (
                <div
                  key={idx}
                  className="w-12 h-12 rounded-full bg-background shadow-md overflow-hidden border-2 border-background"
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {/* Text */}
            <div className="text-center">
              <div className="text-sm font-semibold flex items-center justify-center gap-1">
                <span>{promo.emoji}</span>
                <span>{promo.name}</span>
              </div>
              <div className="text-xs text-muted-foreground">{promo.tagline}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BundlePromos;
