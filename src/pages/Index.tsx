import { useState, useEffect } from "react";
import { trackViewItem } from "@/lib/analytics";
import { useLocalePricing } from "@/hooks/useLocalePricing";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LifestyleShowcase from "@/components/LifestyleShowcase";
import DonationBanner from "@/components/DonationBanner";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import ProductGallery from "@/components/ProductGallery";

import VariationSelector, { getVariations, variations } from "@/components/VariationSelector";
import ColorSelector from "@/components/ColorSelector";
import QuantitySelector from "@/components/QuantitySelector";

import WhoItsFor from "@/components/WhoItsFor";
import Testimonials from "@/components/Testimonials";
import PurposeSection from "@/components/PurposeSection";
import TrustBadges from "@/components/TrustBadges";
import FAQ from "@/components/FAQ";
import ClosingSection from "@/components/ClosingSection";
import SupportPartners from "@/components/SupportPartners";
import Seo from "@/components/Seo";

const HOMEPAGE_JSONLD = [
  {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Love Key Guardian",
    description:
      "Crafted with a polished metal frame for strength, beauty, and permanence. The Love Key Guardian is a premium NFC keyring that connects you to safety and wellbeing support with one tap.",
    brand: { "@type": "Brand", name: "Love Key" },
    offers: {
      "@type": "Offer",
      url: "https://lovekey.com.au/",
      priceCurrency: "AUD",
      price: "9.00",
      availability: "https://schema.org/InStock",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: { "@type": "MonetaryAmount", value: "9.95", currency: "AUD" },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: { "@type": "QuantitativeValue", minValue: 2, maxValue: 5 },
        },
      },
    },
    category: "Safety & Wellbeing",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What happens when I tap or scan it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You're instantly taken to a page with clear guidance, emergency steps, and mental health support resources.",
        },
      },
      {
        "@type": "Question",
        name: "Is it complicated to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Not at all. If you can tap your phone or scan a QR code, you can use Love Key.",
        },
      },
      {
        "@type": "Question",
        name: "Does it work without an app?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. No app required. Just your phone." },
      },
      {
        "@type": "Question",
        name: "Is it suitable as a gift?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Absolutely. Many people give Love Key to those they care about most.",
        },
      },
    ],
  },
];


// Lifestyle image for the main gallery
import keyring1 from "@/assets/optimized/gallery/keyring-1.webp";


const lifestyleImage = { src: keyring1, alt: "Love Key on keys" };

const DEFAULT_VARIATION = "metal";

const COLOR_QUERY_ALIASES: Record<string, string> = {
  green: "green",
  blue: "blue",
  "light-blue": "blue",
  orange: "orange",
  pink: "pink",
  aqua: "aqua",
  red: "red",
  white: "white",
  yellow: "yellow",
};

const getProductQueryParam = (name: string) => {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get(name);
};

const getInitialVariation = () => {
  const requestedVariation = getProductQueryParam("variant");
  return variations.some((variation) => variation.id === requestedVariation)
    ? requestedVariation
    : DEFAULT_VARIATION;
};

const getInitialColor = () => {
  const requestedColor = getProductQueryParam("color")?.toLowerCase();
  return requestedColor ? COLOR_QUERY_ALIASES[requestedColor] ?? null : null;
};

const Index = () => {
  const { pricing } = useLocalePricing();
  const localizedVariations = getVariations(pricing.productPrice);
  const [selectedVariation, setSelectedVariation] = useState(getInitialVariation);
  const [selectedColor, setSelectedColor] = useState<string | null>(getInitialColor);
  const [quantity, setQuantity] = useState(1);
  

  const currentVariation = localizedVariations.find((v) => v.id === selectedVariation);

  // Fire GA4 view_item when user selects a variation/color (debounced)
  useEffect(() => {
    if (!currentVariation || !selectedColor) return;
    const timeout = setTimeout(() => {
      trackViewItem({
        variationId: selectedVariation,
        variationName: currentVariation.name,
        color: selectedColor,
        pricePerUnit: currentVariation.price,
      });
    }, 400);
    return () => clearTimeout(timeout);
  }, [selectedVariation, selectedColor, currentVariation]);

  const handleColorSelect = (color: string) => {
    setSelectedColor(color);
  };


  return (
    <div className="min-h-screen bg-background">
      <Seo
        title="Love Key – NFC Keyring for Safety & Wellbeing Support"
        description="Love Key Guardian is an NFC keyring that connects you to mental health support and emergency helplines with one tap. 50% of profits donated to Lifeline."
        path="/"
        jsonLd={HOMEPAGE_JSONLD}
      />
      <Header />

      
      <main className="pt-24">
        {/* Hero Section */}
        <HeroSection />
        
        {/* NFC Keyring Video */}
        <div className="flex justify-center py-8">
          <div className="w-full max-w-lg mx-auto">
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.youtube.com/embed/QG21RTlAGyA"
                title="Love Key NFC Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
        
        {/* Why Section */}
        <WhySection />
        
        {/* How It Works */}
        <HowItWorks />
        
        {/* Lifestyle Showcase */}
        <LifestyleShowcase />
        
        {/* Product Section */}
        <section id="product-section" className="container mx-auto px-4 py-12 sm:py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Choose Your <span className="text-primary">Love</span> Key</h2>
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
            {/* Left Column - Color Selector & Product Gallery */}
            <div className="lg:sticky lg:top-24 lg:self-start space-y-4">
              <ColorSelector
                selected={selectedColor}
                onSelect={handleColorSelect}
              />
              <ProductGallery 
                selectedColor={selectedColor} 
                selectedVariation={selectedVariation}
                onColorSelect={handleColorSelect}
                lifestyleImage={lifestyleImage}
                selectedPartnerId={null}
              />
            </div>
            
            {/* Right Column - Product Details */}
            <div className="space-y-4 sm:space-y-6">
              <VariationSelector
                selected={selectedVariation}
                onSelect={setSelectedVariation}
              />
              
              {currentVariation && (
                <QuantitySelector
                  quantity={quantity}
                  pricePerUnit={currentVariation.price}
                  onQuantityChange={setQuantity}
                  selectedVariation={selectedVariation}
                  selectedColor={selectedColor || "pink"}
                  variationName={currentVariation.name}
                  colorLabel={selectedColor ? selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1) : "Pink"}
                />
              )}
            </div>
          </div>
        </section>
        
        {/* Donation Banner */}
        <DonationBanner />
        
        {/* Who It's For */}
        <WhoItsFor />
        
        {/* Testimonials */}
        <Testimonials />
        
        {/* Purpose Section */}
        <PurposeSection />
        
        {/* Trust Badges */}
        <TrustBadges />
        
        {/* FAQ */}
        <FAQ />
        
        {/* Closing Section */}
        <ClosingSection />
        
        {/* Support Partners */}
        <SupportPartners />
      </main>
    </div>
  );
};

export default Index;