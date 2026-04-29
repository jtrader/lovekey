import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { CURRENCY_SYMBOL } from "@/lib/stripe-products";

const LK = () => (
  <>
    <span className="text-primary font-medium">Love</span> Key
  </>
);

interface Variation {
  id: string;
  name: string;
  displayName: ReactNode;
  description: ReactNode;
  price: number;
  units: number;
}

const variations: Variation[] = [
  {
    id: "metal",
    name: "Love Key Guardian",
    displayName: <><LK /> Guardian</>,
    description: <>Crafted with a polished metal frame for strength, beauty, and permanence. The <LK /> Guardian is a premium reminder that care is always close.</>,
    price: 9.00,
    units: 1,
  },
];

interface VariationSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
}

const VariationSelector = ({ selected, onSelect }: VariationSelectorProps) => {
  return (
    <div className="animate-fade-up delay-200">
      <h3 className="text-base font-semibold mb-3">Select Variation</h3>
      <div className="grid grid-cols-1 gap-3">
        {variations.map((variation) => (
          <button
            key={variation.id}
            onClick={() => onSelect(variation.id)}
            className={`relative text-left p-4 rounded-xl border-2 transition-all duration-200 ${
              selected === variation.id
                ? "border-primary bg-secondary"
                : "border-border hover:border-muted-foreground/30"
            }`}
          >
            {selected === variation.id && (
              <div className="absolute top-3 right-3 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-primary-foreground" />
              </div>
            )}
            <h4 className="font-medium text-sm mb-1">{variation.displayName}</h4>
            <p className="text-xs text-muted-foreground mb-2">{variation.description}</p>
            <p className="text-sm font-semibold text-primary">
              {variation.price === 0 ? "FREE" : `${CURRENCY_SYMBOL}${variation.price.toFixed(2)}`}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VariationSelector;
export { variations };
export type { Variation };
