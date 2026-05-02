import { ArrowRight, Shield, Compass, HeartPulse } from "lucide-react";
import { Link } from "react-router-dom";
import heroHeart from "@/assets/hub/hero-heart.png";
import aidAngelLogo from "@/assets/hub/aid-angel-logo.png";
import guardianGuideLogo from "@/assets/hub/guardian-guide-logo.png";
import crisisCompassLogo from "@/assets/hub/crisis-compass-logo.png";

type Resource = {
  name: string;
  description: string;
  url: string;
  logo: string;
  Icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const RESOURCES: Resource[] = [
  {
    name: "Aid Angel",
    description: "Aid Angel gently guides you to financial support and services",
    url: "https://aidangel.app",
    logo: aidAngelLogo,
    Icon: HeartPulse,
    color: "#3DA5D9",
  },
  {
    name: "Guardian Guide",
    description: "Find the right mental health support for you",
    url: "https://guardianguide.org",
    logo: guardianGuideLogo,
    Icon: Shield,
    color: "#009092",
  },
  {
    name: "Crisis Compass",
    description: "Navigate natural disasters and emergencies",
    url: "https://crisiscompassvictoria.org",
    logo: crisisCompassLogo,
    Icon: Compass,
    color: "#dc2626",
  },
];

const Hub = () => {
  return (
    <main className="min-h-screen bg-background flex flex-col items-center px-4 py-10 sm:py-16">
      {/* Logo */}
      <Link to="/" aria-label="Love Key home" className="mb-8">
        <img
          src={heroHeart}
          alt="Love Key"
          className="h-24 w-24 sm:h-28 sm:w-28 object-contain"
        />
      </Link>

      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">
        <span className="text-primary">Love</span> Key Hub
      </h1>
      <p className="text-center text-muted-foreground max-w-md mb-10 sm:mb-12">
        Tap into the support you need. Choose a resource below.
      </p>

      {/* Resource cards */}
      <div className="w-full max-w-md space-y-4">
        {RESOURCES.map(({ name, description, url, logo, Icon, color }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-2xl bg-card p-4 shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5"
          >
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-background overflow-hidden"
              style={{ boxShadow: "0 4px 12px -4px hsl(0 0% 0% / 0.2)" }}
            >
              {logo ? (
                <img
                  src={logo}
                  alt={`${name} logo`}
                  className="h-12 w-12 object-contain"
                  loading="eager"
                />
              ) : (
                <Icon className="h-8 w-8" style={{ color }} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-card-foreground truncate">{name}</p>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {description}
              </p>
            </div>
            <span
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-primary-foreground transition-transform group-hover:translate-x-1"
              style={{ backgroundColor: color }}
              aria-hidden
            >
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        ))}
      </div>

      {/* Footer link */}
      <Link
        to="/"
        className="mt-12 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        ← Back to lovekey.com.au
      </Link>
    </main>
  );
};

export default Hub;
