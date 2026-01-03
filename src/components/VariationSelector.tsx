import { Check } from "lucide-react";

interface Variation {
  id: string;
  name: string;
  description: string;
  price: number;
  units: number;
}

const variations: Variation[] = [
  {
    id: "lightweight",
    name: "Lightweight",
    description: "NFC-enabled, budget-friendly option",
    price: 100,
    units: 100,
  },
  {
    id: "lightweight-mix",
    name: "Lightweight Mix Pack",
    description: "All 8 colors (10 each), budget-friendly",
    price: 100,
    units: 80,
  },
  {
    id: "metal",
    name: "Metal",
    description: "NFC-enabled, premium durable finish",
    price: 200,
    units: 100,
  },
  {
    id: "metal-mix",
    name: "Metal Mix Pack",
    description: "All 8 colors (10 each), premium quality",
    price: 200,
    units: 80,
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
      <div className="grid grid-cols-2 gap-3">
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
            <h4 className="font-medium text-sm mb-1">{variation.name}</h4>
            <p className="text-xs text-muted-foreground mb-2">{variation.description}</p>
            <p className="text-sm font-semibold">
              ${variation.price} <span className="text-muted-foreground font-normal">/ {variation.units} units</span>
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
