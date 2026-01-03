import lightBlue from "@/assets/products/light-blue.png";
import green from "@/assets/products/green.png";
import orange from "@/assets/products/orange.png";
import pink from "@/assets/products/pink.png";
import purple from "@/assets/products/purple.png";
import red from "@/assets/products/red.png";
import white from "@/assets/products/white.png";
import yellow from "@/assets/products/yellow.png";

const productImages: Record<string, string> = {
  green,
  blue: lightBlue,
  orange,
  pink,
  purple,
  red,
  white,
  yellow,
};

interface ProductGalleryProps {
  selectedColor: string;
}

const ProductGallery = ({ selectedColor }: ProductGalleryProps) => {
  const currentImage = productImages[selectedColor] || pink;

  return (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
        <img
          src={currentImage}
          alt={`Love Key - ${selectedColor}`}
          className="w-full h-full object-contain transition-opacity duration-300"
        />
      </div>
      
      <div className="flex gap-2 flex-wrap">
        {Object.entries(productImages).map(([color, img]) => (
          <div
            key={color}
            className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              selectedColor === color 
                ? "border-accent ring-2 ring-accent/20" 
                : "border-transparent opacity-60"
            }`}
          >
            <img
              src={img}
              alt={`${color} keyring`}
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
