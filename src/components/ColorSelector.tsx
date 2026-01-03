import { Check } from "lucide-react";

interface ColorOption {
  id: string;
  name: string;
  className: string;
}

const colors: ColorOption[] = [
  { id: "green", name: "Green", className: "bg-product-green" },
  { id: "blue", name: "Light Blue", className: "bg-product-blue" },
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
}

const ColorSelector = ({ selected, onSelect }: ColorSelectorProps) => {
  return (
    <div className="animate-fade-up delay-300">
      <h3 className="text-base font-semibold mb-3">Select Color</h3>
      <div className="flex justify-between w-full">
        {colors.map((color) => (
          <button
            key={color.id}
            onClick={() => onSelect(color.id)}
            title={color.name}
            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${color.className} flex items-center justify-center transition-all duration-200 ${
              selected === color.id
                ? "ring-2 ring-offset-1 ring-primary scale-110"
                : "hover:scale-105"
            }`}
          >
            {selected === color.id && (
              <Check className={`w-3.5 h-3.5 ${color.id === "white" || color.id === "yellow" ? "text-foreground" : "text-white"}`} />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelector;
