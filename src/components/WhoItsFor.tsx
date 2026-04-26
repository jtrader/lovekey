import { Gift, Building, Sparkles, type LucideIcon } from "lucide-react";
import heartLogo from "@/assets/heart-logo.png";

type Audience = {
  icon?: LucideIcon;
  image?: string;
  text: string;
};

const audiences: Audience[] = [
  {
    image: heartLogo,
    text: "Parents who want their children to feel supported",
  },
  {
    icon: Gift,
    text: "Friends looking for a thoughtful, protective gift",
  },
  {
    icon: Building,
    text: "Schools and workplaces that care about wellbeing",
  },
  {
    icon: Sparkles,
    text: "Anyone who believes preparedness is an act of love",
  },
];

const WhoItsFor = () => {
  return (
    <section className="py-16 px-4 bg-secondary/30">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">Who It's For</h2>
        
        <div className="space-y-4">
          {audiences.map((item, index) => (
            <div 
              key={index}
              className="flex items-center gap-4 p-4 bg-background rounded-xl border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                {item.image ? (
                  <img src={item.image} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
                ) : item.icon ? (
                  <item.icon className="w-5 h-5 text-primary" />
                ) : null}
              </div>
              <p className="text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhoItsFor;
