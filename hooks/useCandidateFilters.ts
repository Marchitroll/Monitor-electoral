"use client";

import { useMemo, useState } from "react";

import type { Candidate, CandidateCalificacion } from "@/lib/types";

const ALL_CALIFICACIONES = "todas" as const;
const CALIFICACION_ORDER: CandidateCalificacion[] = [
  "sentenciado",
  "investigado",
  "polemico",
  "sin_registros",
];

type CalificacionFilterOption = CandidateCalificacion | typeof ALL_CALIFICACIONES;

export function useCandidateFilters(candidates: Candidate[]) {
  const [selectedCalificacion, setSelectedCalificacion] =
    useState<CalificacionFilterOption>(ALL_CALIFICACIONES);
  const [query, setQuery] = useState("");

  const calificaciones = useMemo<CalificacionFilterOption[]>(
    () => [
      ALL_CALIFICACIONES,
      ...CALIFICACION_ORDER.filter((calificacion) =>
        candidates.some((candidate) => candidate.calificacion === calificacion),
      ),
    ],
    [candidates],
  );

  const filteredCandidates = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return candidates.filter((candidate) => {
      const calificacionMatches =
        selectedCalificacion === ALL_CALIFICACIONES ||
        candidate.calificacion === selectedCalificacion;
      const searchMatches =
        normalizedQuery.length === 0 ||
        candidate.nombre.toLowerCase().includes(normalizedQuery) ||
        candidate.tags.some((tag) => tag.toLowerCase().includes(normalizedQuery));

      return calificacionMatches && searchMatches;
    });
  }, [candidates, query, selectedCalificacion]);

  const calificacionCounts = useMemo(() => {
    const base = {
      sentenciado: 0,
      investigado: 0,
      polemico: 0,
      sin_registros: 0,
    } as Record<CandidateCalificacion, number>;

    candidates.forEach((candidate) => {
      if (base[candidate.calificacion] !== undefined) {
        base[candidate.calificacion] += 1;
      } else {
        base.sin_registros += 1;
      }
    });

    return base;
  }, [candidates]);

  function clearFilters() {
    setSelectedCalificacion(ALL_CALIFICACIONES);
    setQuery("");
  }

  function setSelectedCalificacionFromInput(value: string) {
    if (value === ALL_CALIFICACIONES || CALIFICACION_ORDER.includes(value as CandidateCalificacion)) {
      setSelectedCalificacion(value as CalificacionFilterOption);
    }
  }

  return {
    calificaciones,
    allCalificacionesOption: ALL_CALIFICACIONES,
    selectedCalificacion,
    setSelectedCalificacion,
    setSelectedCalificacionFromInput,
    query,
    setQuery,
    filteredCandidates,
    clearFilters,
    calificacionCounts,
  };
}