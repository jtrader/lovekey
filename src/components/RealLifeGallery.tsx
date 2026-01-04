import keyring1 from "@/assets/gallery/keyring-1.png";
import keyring2 from "@/assets/gallery/keyring-2.png";
import keyring3 from "@/assets/gallery/keyring-3.jpeg";
import keyring4 from "@/assets/gallery/keyring-4.png";

export const realLifeImages = [
  { src: keyring1, alt: "Metal keyring with heart logo" },
  { src: keyring4, alt: "Metal keyring with QR code" },
  { src: keyring3, alt: "Red keyring with NFC symbol" },
  { src: keyring2, alt: "Red keyring with QR code" },
];

interface RealLifeGalleryProps {
  selectedIndex: number | null;
  onSelect: (index: number | null) => void;
}

const RealLifeGallery = ({ selectedIndex, onSelect }: RealLifeGalleryProps) => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3 text-foreground">See them in action</h3>
      <div className="grid grid-cols-4 gap-2">
        {realLifeImages.map((image, index) => (
          <button
            key={index}
            onClick={() => onSelect(selectedIndex === index ? null : index)}
            className={`aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer focus:outline-none transition-all duration-200 ${
              selectedIndex === index 
                ? "ring-2 ring-accent" 
                : "opacity-70 hover:opacity-100"
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default RealLifeGallery;
