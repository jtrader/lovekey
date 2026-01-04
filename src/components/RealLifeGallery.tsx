import keyring1 from "@/assets/gallery/keyring-1.png";
import keyring2 from "@/assets/gallery/keyring-2.png";
import keyring3 from "@/assets/gallery/keyring-3.jpeg";
import keyring4 from "@/assets/gallery/keyring-4.png";

const images = [
  { src: keyring1, alt: "Metal keyring with heart logo" },
  { src: keyring2, alt: "Red keyring with QR code" },
  { src: keyring3, alt: "Red keyring with NFC symbol" },
  { src: keyring4, alt: "Metal keyring with QR code" },
];

const RealLifeGallery = () => {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3 text-foreground">See them in action</h3>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square rounded-xl overflow-hidden bg-secondary"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RealLifeGallery;
