import bchsLogo from "@/assets/partners/bchs.svg";
// import cvgtLogo from "@/assets/optimized/partners/cvgt.webp";
import bendigoHealthLogo from "@/assets/optimized/partners/bendigo-health-foundation.webp";

const partners = [
  // CVGT hidden — not active yet
  // {
  //   name: "CVGT",
  //   logo: cvgtLogo,
  //   href: "https://www.cvgt.com.au",
  //   label: "CVGT Love Key",
  //   alt: "CVGT partner",
  // },
  {
    name: "Bendigo Community Health Services",
    logo: bchsLogo,
    href: "https://www.bchs.com.au",
    label: "Bendigo Community Health Services Love Key",
    alt: "Bendigo Community Health Services partner",
  },
  {
    name: "Bendigo Health",
    logo: bendigoHealthLogo,
    href: "https://www.bendigohealth.org.au",
    label: "Bendigo Health Love Key",
    alt: "Bendigo Health partner",
  },
];

const DonationBanner = () => {
  return (
    <section className="py-12 px-4 bg-secondary/50">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-lg font-semibold mb-8">
          Our Distribution Partners:
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
                aria-label={p.label}
                className="flex items-center justify-center w-full h-24 sm:h-28 lg:h-36"
              >
                <img
                  src={p.logo}
                  alt={p.alt}
                  className="max-h-full max-w-full w-auto h-auto object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationBanner;