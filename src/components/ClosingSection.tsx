import { Facebook, Instagram, Mail } from "lucide-react";
import heartLogo from "@/assets/heart-logo.png";

const ClosingSection = () => {
  return (
    <section className="py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-muted-foreground mb-2">Sometimes love is not loud.</p>
        <p className="text-lg text-muted-foreground mb-2">Sometimes it looks like preparation.</p>
        <p className="text-lg text-muted-foreground mb-6">Sometimes it fits quietly on your keyring.</p>
        
        <div className="flex items-center justify-center gap-2 mt-8">
          <img src={heartLogo} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
          <p className="text-xl font-semibold">
            <span className="text-primary">Love</span> Key is a reminder that care is always close.
          </p>
          <img src={heartLogo} alt="" aria-hidden="true" className="w-5 h-5 object-contain" />
        </div>

        <a
          href="mailto:support@lovekey.com.au"
          className="inline-flex items-center gap-2 mt-8 px-6 py-2.5 rounded-full border border-border text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
        >
          <Mail className="w-4 h-4" />
          Contact Us
        </a>

        <div className="flex items-center justify-center gap-4 mt-4">
          <a href="#" aria-label="Facebook" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href="#" aria-label="Instagram" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
        </div>

      </div>
    </section>
  );
};

export default ClosingSection;
