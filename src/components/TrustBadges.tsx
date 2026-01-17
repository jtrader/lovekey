import { ShieldCheck, MapPin, Link, RefreshCcw } from "lucide-react";

const badges = [
  { icon: ShieldCheck, text: "Secure checkout" },
  { icon: MapPin, text: "Australian-based support" },
  { icon: Link, text: "Designed to connect with trusted national resources" },
  { icon: RefreshCcw, text: "30-day peace-of-mind guarantee" },
];

const TrustBadges = () => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold text-center mb-8">Trust & Safety</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {badges.map((badge, index) => (
            <div 
              key={index}
              className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full border border-border"
            >
              <badge.icon className="w-4 h-4 text-primary" />
              <span className="text-sm">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
