"use client";

import { CandidateFilters } from "@/components/dashboard/CandidateFilters";
import { CandidateGrid } from "@/components/dashboard/CandidateGrid";
import { useCandidateFilters } from "@/hooks/useCandidateFilters";
import type { Candidate } from "@/lib/types";

interface CandidateDashboardProps {
  candidates: Candidate[];
}

export function CandidateDashboard({ candidates }: CandidateDashboardProps) {
  const {
    calificaciones,
    allCalificacionesOption,
    selectedCalificacion,
    setSelectedCalificacionFromInput,
    query,
    setQuery,
    filteredCandidates,
    clearFilters,
    calificacionCounts,
  } = useCandidateFilters(candidates);

  return (
    <>
      <CandidateFilters
        calificaciones={calificaciones}
        allCalificacionesOption={allCalificacionesOption}
        selectedCalificacion={selectedCalificacion}
        setSelectedCalificacionFromInput={setSelectedCalificacionFromInput}
        query={query}
        setQuery={setQuery}
        clearFilters={clearFilters}
        resultCount={filteredCandidates.length}
        calificacionCounts={calificacionCounts}
      />

      <div className="px-4 pb-12 pt-48 sm:px-6">
        <CandidateGrid candidates={filteredCandidates} />
      </div>
    </>
  );
}
