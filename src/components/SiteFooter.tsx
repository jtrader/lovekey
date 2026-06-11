import { Link } from "react-router-dom";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import rspLogo from "@/assets/optimized/rsp_logo.webp";

const SELF_SITE = "lovekeyring";

type NetworkSite = {
  id: string;
  label: string;
  description: string;
  stage: string;
  href: string;
};

const NETWORK_SITES: NetworkSite[] = [
  { id: "firstaidangel", label: "First Aid Angel", description: "Quick first aid guidance and support", stage: "PREPARE", href: "https://firstaidangel.org" },
  { id: "crisiscompass", label: "Crisis Compass",  description: "Emergency guidance for active crises", stage: "Respond", href: "https://crisis-compass.org" },
  { id: "aidangel",      label: "Aid Angel",        description: "Recovery support after disaster",     stage: "Recover", href: "https://aidangel.app" },
  { id: "guardianguide", label: "Guardian Guide",   description: "Mental health and emotional support", stage: "Heal",    href: "https://guardianguide.org" },
  { id: "lovekey",       label: "Love Key",         description: "Connect with the HELP Network",        stage: "Coordinate", href: "https://lovekeyring.org" },
  { id: "lovekeyring",   label: "Love Key Ring",    description: "A gentle way to reach help when you need it most", stage: "REACH", href: "/" },
];

const SiteFooter = () => {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <nav aria-label="HELP Network">
          <h2 className="text-xs font-semibold tracking-wide text-foreground mb-3 text-center">
            Love Key HELP Network
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NETWORK_SITES.map((site) => {
              const isSelf = site.id === SELF_SITE;
              return (
                <li key={site.id}>
                  <a
                    href={site.href}
                    target={isSelf ? undefined : "_blank"}
                    rel={isSelf ? undefined : "noopener noreferrer"}
                    className={[
                      "block rounded-md border px-3 py-2 transition-colors",
                      isSelf
                        ? "bg-primary/5 border-primary/50 ring-1 ring-primary/40 hover:bg-primary/10"
                        : "bg-background border-border hover:bg-secondary hover:border-primary/40",
                    ].join(" ")}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-semibold text-foreground">{site.label}</span>
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        {site.stage}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{site.description}</p>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <nav className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[11px] text-muted-foreground">
          <Link to="/privacy" className="hover:text-foreground hover:underline">Privacy Policy</Link>
          <span aria-hidden>·</span>
          <Link to="/terms" className="hover:text-foreground hover:underline">Terms and Conditions</Link>
          <span aria-hidden>·</span>
          <Link to="/disclaimer" className="hover:text-foreground hover:underline">Disclaimer</Link>
        </nav>

        <div className="mt-6 flex flex-col items-center gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                aria-label="View Respectful Synchronised Protocol logo"
                className="rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 hover:opacity-90 transition-opacity"
              >
                <img src={rspLogo} alt="Respectful Synchronised Protocol" className="h-16 w-auto object-contain" loading="lazy" decoding="async" />
              </button>
            </DialogTrigger>
            <DialogContent className="w-[calc(100vw-2rem)] max-w-md sm:max-w-lg flex flex-col items-center overflow-hidden rounded-2xl bg-card border border-border shadow-xl ring-1 ring-border/50 p-5 sm:p-6 motion-reduce:animate-none [&>button.right-4.top-4]:hidden">
              <img src={rspLogo} alt="Respectful Synchronised Protocol" className="w-full h-auto max-h-[70vh] rounded-2xl object-contain ring-1 ring-primary/40" loading="lazy" decoding="async" />
              <DialogClose asChild>
                <button
                  type="button"
                  aria-label="Close"
                  className="absolute top-3 right-3 inline-flex items-center justify-center w-14 h-14 rounded-full bg-muted text-muted-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                  <X className="h-7 w-7" aria-hidden="true" />
                </button>
              </DialogClose>
            </DialogContent>
          </Dialog>
          <p className="text-[11px] text-center">
            <a
              href="https://lovekeylink.com/rsp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:opacity-90 transition-opacity"
            >
              Love Key RSP-aligned
            </a>
            <span className="text-muted-foreground"> — Ethical, privacy-conscious help routing under the Respectful Synchronised Protocol.</span>
          </p>
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground text-center">
          © 2026 Love Key. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default SiteFooter;
