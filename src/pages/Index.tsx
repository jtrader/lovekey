import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LifestyleShowcase from "@/components/LifestyleShowcase";
import DonationBanner from "@/components/DonationBanner";
import WhySection from "@/components/WhySection";
import HowItWorks from "@/components/HowItWorks";
import WhoItsFor from "@/components/WhoItsFor";
import Testimonials from "@/components/Testimonials";
import PurposeSection from "@/components/PurposeSection";
import TrustBadges from "@/components/TrustBadges";
import FAQ from "@/components/FAQ";
import ClosingSection from "@/components/ClosingSection";
import SupportPartners from "@/components/SupportPartners";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-24">
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

        <WhySection />
        <HowItWorks />
        <LifestyleShowcase />
        <DonationBanner />
        <WhoItsFor />
        <Testimonials />
        <PurposeSection />
        <TrustBadges />
        <FAQ />
        <ClosingSection />
        <SupportPartners />
      </main>
    </div>
  );
};

export default Index;
