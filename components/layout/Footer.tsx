import { AIDisclaimerText } from "@/components/layout/AIDisclaimerText";

export function Footer() {
  return (
    <footer className="mt-auto w-full border-t border-outline bg-background">
      <div className="flex flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row">
        {/* Brand mark */}
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-on-surface-muted">
            Monitor Electoral
          </span>
          <div className="h-3 w-px bg-outline" />
          <span className="text-[10px] uppercase tracking-[0.14em] text-on-surface-subtle">
            Hackaton Cubepath · Marchitroll
          </span>
        </div>

        {/* Disclaimer */}
        <p className="text-[10px] uppercase tracking-[0.12em] text-on-surface-subtle">
          <AIDisclaimerText />
        </p>
      </div>
    </footer>
  );
}