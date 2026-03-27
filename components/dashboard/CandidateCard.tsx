import Image from "next/image";
import Link from "next/link";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Candidate } from "@/lib/types";

interface CandidateCardProps {
  candidate: Candidate;
  prioritizeImage?: boolean;
}

export function CandidateCard({ candidate, prioritizeImage = false }: CandidateCardProps) {
  return (
    <Link
      href={`/candidatos/${candidate.slug}`}
      className={[
        "group flex w-full flex-col overflow-hidden bg-surface-container",
        candidate.calificacion === "sentenciado"
          ? "border-l-2 border-primary"
          : "border-l-2 border-transparent",
        "hover:bg-[#201f1f]",
      ].join(" ")}
      aria-label={`Ver perfil de ${candidate.nombre}`}
    >
      <div
        className={[
          "relative h-44 w-full overflow-hidden sm:h-48",
          candidate.calificacion === "sentenciado"
            ? "ring-1 ring-primary/70 ring-inset"
            : "ring-1 ring-transparent ring-inset",
        ].join(" ")}
      >
        <Image
          src={candidate.foto}
          alt={`Retrato de ${candidate.nombre}`}
          fill
          priority={prioritizeImage}
          loading={prioritizeImage ? "eager" : "lazy"}
          sizes="(min-width: 1536px) 16vw, (min-width: 1280px) 20vw, (min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover grayscale transition-all duration-300 group-hover:scale-[1.03] group-hover:grayscale-0"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
        <div className="absolute right-3 top-3 h-12 w-12 overflow-hidden border border-white/15 bg-black/55 p-1 backdrop-blur-sm">
          <Image
            src={candidate.logoPartido}
            alt={`Logo de ${candidate.partido}`}
            width={48}
            height={48}
            className="h-full w-full object-contain"
          />
        </div>
        <div className="absolute bottom-3 left-3 right-3 min-w-0">
          <h2 className="text-2xl font-bold leading-[1.05] text-white drop-shadow-sm">{candidate.nombre}</h2>
          <span className="mt-2 block text-[11px] uppercase tracking-[0.18em] text-white/80">
            {candidate.partido}
          </span>
        </div>
      </div>

      <div className="p-4 pt-3">
        <div className="flex flex-wrap gap-2">
          <StatusBadge calificacion={candidate.calificacion} />
          {candidate.tags.slice(0, 2).map((tag) => (
            <span
              key={`${candidate.id}-${tag}`}
              className="bg-surface-container-high px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-on-surface-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
