import { Check } from "lucide-react";

interface ColorOption {
  id: string;
  name: string;
  className: string;
}

const colors: ColorOption[] = [
  { id: "green", name: "Green", className: "bg-product-green" },
  { id: "blue", name: "Blue", className: "bg-product-blue" },
  { id: "orange", name: "Orange", className: "bg-product-orange" },
  { id: "pink", name: "Pink", className: "bg-product-pink" },
  { id: "purple", name: "Purple", className: "bg-product-purple" },
  { id: "red", name: "Red", className: "bg-product-red" },
  { id: "white", name: "White", className: "bg-product-white border border-border" },
  { id: "yellow", name: "Yellow", className: "bg-product-yellow" },
];

interface ColorSelectorProps {
  selected: string;
  onSelect: (id: string) => void;
  disabled?: boolean;
}

const ColorSelector = ({ selected, onSelect, disabled }: ColorSelectorProps) => {
  return (
    <div className={`animate-fade-up delay-300 ${disabled ? "opacity-50 pointer-events-none" : ""}`}>
      <h3 className="text-base font-semibold mb-3">Select Color</h3>
      <div className="flex gap-2 flex-wrap">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelect(color.id)}
            title={color.name}
            className={`w-10 h-10 rounded-full ${color.className} flex items-center justify-center transition-all duration-200 ${
              selected === color.id
                ? "ring-2 ring-offset-2 ring-primary scale-110"
                : "hover:scale-105"
            }`}
          >
            {selected === color.id && (
              <Check className={`w-5 h-5 ${color.id === "white" || color.id === "yellow" ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        ))}
      </div>
      {disabled && (
        <p className="text-xs text-muted-foreground mt-2">Color selection disabled for mix packs</p>
      )}
    </div>
  );
};

export default ColorSelector;
