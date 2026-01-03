import { useState } from "react";
import productCoral from "@/assets/product-coral.png";
import productColors from "@/assets/product-colors.png";

const images = [productCoral, productColors];

const ProductGallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col gap-4 animate-fade-up">
      <div className="aspect-square bg-secondary rounded-2xl overflow-hidden">
        <img
          src={images[activeIndex]}
          alt="Love Key Product"
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      </div>
      
      <div className="flex gap-3">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              activeIndex === index 
                ? "border-accent ring-2 ring-accent/20" 
                : "border-transparent hover:border-border"
            }`}
          >
            <img
              src={img}
              alt={`Product view ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
