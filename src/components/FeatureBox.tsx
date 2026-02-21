import { Smartphone, QrCode } from "lucide-react";

const FeatureBox = () => {
  return (
    <div className="bg-accent-soft rounded-2xl p-6 animate-fade-up delay-100">
      <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
        Love Key smart NFC-enabled keyrings that connect people to life-saving resources.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-accent-soft-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">NFC Tap Feature</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              Tap with phone to access basic emergency first aid training
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shrink-0">
            <QrCode className="w-5 h-5 text-accent-soft-foreground" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">QR Code Scan</h4>
            <p className="text-xs text-muted-foreground mt-0.5">Scan QR code for mental health emergency support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBox;
