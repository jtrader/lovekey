import { Heart } from "lucide-react";

const PurposeSection = () => {
  return (
    <section className="py-16 px-4 bg-primary/5">
      <div className="max-w-3xl mx-auto text-center">
        <Heart className="w-12 h-12 text-primary mx-auto mb-6" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-6">Your Purchase Has Purpose</h2>
        <p className="text-lg text-muted-foreground mb-4">
          Every Love Key represents compassion in action.
        </p>
        <p className="text-base text-muted-foreground mb-8">
          It encourages awareness, readiness, and connection to support services that save lives.
        </p>
        <div className="bg-background rounded-xl p-6 border border-border">
          <p className="text-base mb-2">You are not just buying a product.</p>
          <p className="text-lg font-semibold text-primary">
            You are sharing safety, dignity, and hope.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
