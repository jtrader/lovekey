import bchsLogo from "@/assets/partners/bchs.svg";
import cvgtLogo from "@/assets/partners/cvgt.png";
import bendigoHealthLogo from "@/assets/partners/bendigo-health-foundation.png";

const partners = [
  {
    name: "CVGT",
    logo: cvgtLogo,
    href: "https://lovekeyring.org/?partner=cvgt",
    label: "CVGT Love Key",
    alt: "CVGT partner",
  },
  {
    name: "Bendigo Health Community Services",
    logo: bchsLogo,
    href: "https://lovekeyring.org/?partner=bchs",
    label: "Bendigo Health Community Services Love Key",
    alt: "Bendigo Health Community Services partner",
  },
  {
    name: "Bendigo Health",
    logo: bendigoHealthLogo,
    href: "https://lovekeyring.org/?partner=bendigo-health",
    label: "Bendigo Health Love Key",
    alt: "Bendigo Health partner",
  },
];

const DonationBanner = () => {
  return (
    <section className="py-12 px-4 bg-secondary/50">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-lg font-semibold mb-8">
          Our Merchandise Partners:
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-stretch gap-6 sm:gap-8">
          {partners.map((p) => (
            <div
              key={p.name}
              className="bg-background rounded-2xl p-6 sm:p-8 border border-border shadow-sm w-full sm:w-64 flex flex-col items-center justify-center"
            >
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full h-24 sm:h-28 lg:h-36"
              >
                <img
                  src={p.logo}
                  alt={p.alt}
                  className="max-h-full max-w-full w-auto h-auto object-contain"
                  loading="lazy"
                />
              </a>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs font-semibold tracking-[0.2em] text-primary uppercase hover:underline text-center"
              >
                {p.label}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;
