import Link from "next/link";

interface TopAppBarProps {
  subtitle?: string;
  offsetClassName?: string;
  showNav?: boolean;
}

export function TopAppBar({
  subtitle,
  offsetClassName = "top-0",
  showNav = false,
}: TopAppBarProps) {
  return (
    <header
      className={[
        "fixed z-50 flex h-[var(--topbar-h)] w-full items-center justify-between border-b border-outline bg-background/95 px-4 backdrop-blur-xl sm:px-6",
        offsetClassName,
      ].join(" ")}
    >
      {/* Left: wordmark + subtitle */}
      <div className="flex items-center gap-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white transition-opacity hover:opacity-80 sm:text-2xl"
          aria-label="Ir al inicio de Monitor Electoral"
        >
          Monitor Electoral
        </Link>

        {subtitle && (
          <>
            <div className="hidden h-3.5 w-px bg-outline md:block" />
            <span className="hidden text-[10px] uppercase tracking-[0.2em] text-on-surface-muted md:block">
              {subtitle}
            </span>
          </>
        )}
      </div>

      {/* Right: nav links (optional) */}
      {showNav && (
        <nav className="hidden items-center gap-6 md:flex">
          {[
            { label: "Candidatos", href: "/" },
            { label: "Partidos", href: "/partidos" },
            { label: "Plan de gobierno", href: "/plan-de-gobierno" },
          ].map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="text-[10px] font-bold uppercase tracking-[0.18em] text-on-surface-muted transition-colors hover:text-white"
            >
              {label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}