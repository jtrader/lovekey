import { Heart, Facebook, Instagram } from "lucide-react";

const ClosingSection = () => {
  return (
    <section className="py-16 px-4 text-center">
      <div className="max-w-2xl mx-auto">
        <p className="text-lg text-muted-foreground mb-2">Sometimes love is not loud.</p>
        <p className="text-lg text-muted-foreground mb-2">Sometimes it looks like preparation.</p>
        <p className="text-lg text-muted-foreground mb-6">Sometimes it fits quietly on your keyring.</p>
        
        <div className="flex items-center justify-center gap-2 mt-8">
          <Heart className="w-5 h-5 text-primary" />
          <p className="text-xl font-semibold">
            Love Key™ is a reminder that care is always close.
          </p>
          <Heart className="w-5 h-5 text-primary" />
        </div>

        <div className="flex items-center justify-center gap-4 mt-8">
          <a href="#" aria-label="Facebook" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
          <a href="#" aria-label="Instagram" className="p-2 hover:bg-secondary rounded-full transition-colors">
            <Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground mt-6">© {new Date().getFullYear()} Love Key™. All rights reserved.</p>
      </div>
    </section>
  );
};

export default ClosingSection;
