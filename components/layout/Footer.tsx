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
            Hackaton CubePath ·
            <a
              href="https://github.com/Marchitroll"
              target="_blank"
              rel="noreferrer"
              className="ml-1 text-primary hover:underline"
            >
              Marchitroll
            </a>
          </span>
        </div>

        {/* Last update + disclaimer */}
        <div className="flex flex-col items-center text-center sm:items-end">
          <p className="text-[10px] uppercase tracking-[0.12em] text-white">
            Última actualización: 27 de marzo de 2026
          </p>
          <p className="text-[10px] uppercase tracking-[0.12em] text-on-surface-subtle">
            <AIDisclaimerText />
          </p>
        </div>
      </div>
    </footer>
  );
}