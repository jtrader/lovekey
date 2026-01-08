import { Heart, ExternalLink } from "lucide-react";

const foundations = [
  {
    id: "lifeline",
    name: "Lifeline Australia",
    description: "24/7 crisis support and suicide prevention",
    url: "https://www.lifeline.org.au",
    color: "bg-[#00A651]",
  },
  {
    id: "beyondblue",
    name: "Beyond Blue",
    description: "Anxiety, depression and suicide prevention support",
    url: "https://www.beyondblue.org.au",
    color: "bg-[#1E3A8A]",
  },
  {
    id: "kidshelpline",
    name: "Kids Helpline",
    description: "Free counselling service for young people aged 5-25",
    url: "https://www.kidshelpline.com.au",
    color: "bg-[#E91E63]",
  },
  {
    id: "mensline",
    name: "MensLine Australia",
    description: "Support for men with family and relationship concerns",
    url: "https://www.mensline.org.au",
    color: "bg-[#0EA5E9]",
  },
];

interface DonationSelectorProps {
  selectedVariation: string;
  selectedColor: string;
  variationName: string;
}

const DonationSelector = ({ 
  selectedVariation,
  selectedColor,
  variationName,
}: DonationSelectorProps) => {
  const handleDonate = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="bg-secondary rounded-2xl p-6">
      <div className="text-center mb-6">
        <Heart className="w-8 h-8 text-product-red mx-auto mb-2" />
        <h3 className="text-xl font-bold mb-2">LoveKeys are Free</h3>
        <p className="text-sm text-muted-foreground">
          We ask that you consider making a donation to one of these amazing mental health foundations
        </p>
      </div>

      <div className="space-y-3 mb-6">
        {foundations.map((foundation) => (
          <button
            key={foundation.id}
            onClick={() => handleDonate(foundation.url)}
            className="w-full text-left p-4 rounded-xl border-2 border-border hover:border-primary transition-all duration-200 bg-background group"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full ${foundation.color} flex items-center justify-center flex-shrink-0`}>
                <Heart className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm flex items-center gap-2">
                  {foundation.name}
                  <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                </h4>
                <p className="text-xs text-muted-foreground truncate">{foundation.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="text-center">
        <p className="text-xs text-muted-foreground mb-4">
          Your selected LoveKey: <span className="font-medium">{variationName}</span> in <span className="font-medium capitalize">{selectedColor}</span>
        </p>
        <p className="text-xs text-muted-foreground">
          All LoveKeys include QR code and NFC technology
        </p>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
        <span>✓ Free Delivery</span>
        <span>✓ NFC Enabled</span>
      </div>
    </div>
  );
};

export default DonationSelector;
