import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goToPrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const goToNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-3 text-foreground">See them in action</h3>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => openLightbox(index)}
            className="aspect-square rounded-xl overflow-hidden bg-secondary cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
          </button>
        ))}
      </div>

      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogContent className="max-w-4xl w-[95vw] p-0 bg-background border-border overflow-hidden">
          <button
            onClick={closeLightbox}
            className="absolute top-3 right-3 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5 text-foreground" />
          </button>

          {selectedIndex !== null && (
            <div className="relative flex items-center justify-center">
              <button
                onClick={goToPrevious}
                className="absolute left-2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                aria-label="Previous image"
              >
                <ChevronLeft className="h-6 w-6 text-foreground" />
              </button>

              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain"
              />

              <button
                onClick={goToNext}
                className="absolute right-2 z-10 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
                aria-label="Next image"
              >
                <ChevronRight className="h-6 w-6 text-foreground" />
              </button>
            </div>
          )}

          <div className="flex justify-center gap-2 p-3 bg-secondary/50">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? "bg-accent" : "bg-muted-foreground/30"
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default RealLifeGallery;
