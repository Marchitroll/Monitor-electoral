import Image from "next/image";
import Link from "next/link";

import { CopyCandidateLinkButton } from "@/components/candidato/CopyCandidateLinkButton";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Candidate } from "@/lib/types";

interface CandidateSidebarProps {
  candidate: Candidate;
}

export function CandidateSidebar({ candidate }: CandidateSidebarProps) {
  return (
    <aside className="w-full border-r border-outline bg-[#171717] p-5 sm:p-6 lg:w-[22rem] lg:p-8">
      <div className="mb-8">
        <div className="relative mb-5 h-[320px] w-full overflow-hidden border border-outline bg-outline sm:h-[360px] lg:h-[420px]">
          <Image
            src={candidate.foto}
            alt={`Retrato de ${candidate.nombre}`}
            fill
            priority
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 22rem"
            className="object-cover"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/55 to-transparent p-4">
            <h1 className="text-xl font-bold uppercase leading-tight text-white sm:text-2xl">{candidate.nombre}</h1>
            <div className="mt-2 flex items-center justify-between gap-3">
              <span className="text-[10px] uppercase tracking-[0.16em] text-on-surface-muted">{candidate.partido}</span>
              <div className="h-14 w-14 overflow-hidden border border-outline bg-surface-container-high p-2">
                <Image
                  src={candidate.logoPartido}
                  alt={`Logo de ${candidate.partido}`}
                  width={56}
                  height={56}
                  className="h-full w-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <StatusBadge calificacion={candidate.calificacion} />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-muted">Etiquetas clave</h2>
          <div className="flex flex-wrap gap-2">
            {candidate.tags.length > 0 ? (
              candidate.tags.map((tag) => (
                <span
                  key={`${candidate.id}-${tag}`}
                  className="bg-surface-container-high px-2 py-1 text-[10px] font-bold uppercase tracking-[0.08em] text-white"
                >
                  {tag}
                </span>
              ))
            ) : (
              <p className="text-sm text-on-surface-muted">Sin etiquetas registradas.</p>
            )}
          </div>
        </section>
      </div>

      <div>
        <CopyCandidateLinkButton slug={candidate.slug} />
      </div>

      <div className="pt-10">
        <Link href="/" className="text-xs font-bold uppercase tracking-[0.12em] text-on-surface-muted hover:text-white">
          ← Volver al indice
        </Link>
      </div>
    </aside>
  );
}
