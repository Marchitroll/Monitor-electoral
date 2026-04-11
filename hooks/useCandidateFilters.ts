"use client";

import { useMemo, useState } from "react";

import {
  ALL_CALIFICACIONES_OPTION,
  CALIFICACION_ORDER,
  type Candidate,
  type CalificacionFilterOption,
  type CandidateCalificacion,
} from "@/lib/types";

export function useCandidateFilters(candidates: Candidate[]) {
  const [selectedCalificacion, setSelectedCalificacion] =
    useState<CalificacionFilterOption>(ALL_CALIFICACIONES_OPTION);
  const [query, setQuery] = useState("");

  const calificaciones = useMemo<CalificacionFilterOption[]>(
    () => [
      ALL_CALIFICACIONES_OPTION,
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
        selectedCalificacion === ALL_CALIFICACIONES_OPTION ||
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
    setSelectedCalificacion(ALL_CALIFICACIONES_OPTION);
    setQuery("");
  }

  function setSelectedCalificacionFromInput(value: string) {
    if (
      value === ALL_CALIFICACIONES_OPTION ||
      CALIFICACION_ORDER.includes(value as CandidateCalificacion)
    ) {
      setSelectedCalificacion(value as CalificacionFilterOption);
    }
  }

  return {
    calificaciones,
    allCalificacionesOption: ALL_CALIFICACIONES_OPTION,
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