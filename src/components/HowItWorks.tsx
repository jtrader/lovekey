import { Smartphone, QrCode, ArrowRight, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: Smartphone,
    title: "NFC Tap feature",
    description: "For access to the Love Key Homepage",
  },
  {
    icon: QrCode,
    title: "Scan the QR code",
    description: "For access to the Love Key App",
  },
  {
    icon: ArrowRight,
    title: "Instantly access",
    description: "Trusted guidance and helplines",
  },
  {
    icon: CheckCircle,
    title: "Take the next step",
    description: "With clarity and confidence",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">How It Works</h2>
        <p className="text-center text-muted-foreground mb-12">Simple. Fast. Designed with care.</p>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-secondary/50 border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
