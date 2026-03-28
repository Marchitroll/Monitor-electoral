"use client";

import { CandidateFilters } from "@/components/dashboard/CandidateFilters";
import { CandidateGrid } from "@/components/dashboard/CandidateGrid";
import { Footer } from "@/components/layout/Footer";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { useCandidateFilters } from "@/hooks/useCandidateFilters";
import { getAllCandidates } from "@/lib/candidates";

export default function Home() {
  const candidates = getAllCandidates();
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
    <div className="flex min-h-full flex-1 flex-col bg-background text-on-background">
      <TopAppBar />

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

      <main className="flex-1 px-4 pb-12 pt-48 sm:px-6">
        <CandidateGrid candidates={filteredCandidates} />
      </main>

      <Footer />
    </div>
  );
}
