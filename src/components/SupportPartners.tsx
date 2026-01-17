import lifelineLogo from "@/assets/partners/lifeline.jpg";
import menslineLogo from "@/assets/partners/mensline.png";
import beyondBlueLogo from "@/assets/partners/beyond-blue.svg";
import kidsHelplineLogo from "@/assets/partners/kids-helpline.png";
import headspaceLogo from "@/assets/partners/headspace.png";

const partners = [
  { name: "Lifeline", logo: lifelineLogo, url: "https://www.lifeline.org.au" },
  { name: "MensLine Australia", logo: menslineLogo, url: "https://mensline.org.au" },
  { name: "Beyond Blue", logo: beyondBlueLogo, url: "https://www.beyondblue.org.au" },
  { name: "Kids Helpline", logo: kidsHelplineLogo, url: "https://kidshelpline.com.au" },
  { name: "Headspace", logo: headspaceLogo, url: "https://headspace.org.au" },
];

const SupportPartners = () => {
  return (
    <section className="py-12 border-t border-border">
      <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
        Our Support Partners
      </h2>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
        {partners.map((partner) => (
          <a
            key={partner.name}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all duration-300"
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-10 md:h-12 w-auto object-contain"
            />
          </a>
        ))}
      </div>
    </section>
  );
};

export default SupportPartners;
