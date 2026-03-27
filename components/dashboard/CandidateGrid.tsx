import type { Candidate } from "@/lib/types";

import { CandidateCard } from "./CandidateCard";

const PRIORITY_CARD_COUNT = 8;

interface CandidateGridProps {
  candidates: Candidate[];
}

export function CandidateGrid({ candidates }: CandidateGridProps) {
  if (candidates.length === 0) {
    return (
      <div className="mx-auto max-w-[1800px] border border-outline bg-surface-container p-6 text-sm text-on-surface-muted">
        No hay resultados para los filtros seleccionados.
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-[1800px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
      {candidates.map((candidate, index) => (
        <CandidateCard key={candidate.id} candidate={candidate} prioritizeImage={index < PRIORITY_CARD_COUNT} />
      ))}
    </div>
  );
}
