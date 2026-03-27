"use client";

import { useEffect, useRef, useState } from "react";

import type { CandidateCalificacion } from "@/lib/types";
import { calificacionLabel } from "@/lib/utils";

interface CandidateFiltersProps {
  calificaciones: (CandidateCalificacion | "todas")[];
  allCalificacionesOption: "todas";
  selectedCalificacion: CandidateCalificacion | "todas";
  setSelectedCalificacionFromInput: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
  clearFilters: () => void;
  resultCount: number;
}

export function CandidateFilters({
  calificaciones,
  allCalificacionesOption,
  selectedCalificacion,
  setSelectedCalificacionFromInput,
  query,
  setQuery,
  clearFilters,
  resultCount,
}: CandidateFiltersProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    selectedCalificacion === allCalificacionesOption
      ? "Todas las calificaciones"
      : calificacionLabel(selectedCalificacion as CandidateCalificacion);

  const isFiltered = query.trim().length > 0 || selectedCalificacion !== allCalificacionesOption;

  return (
    <nav className="fixed top-16 z-40 w-full border-b border-outline bg-surface">
      <div className="flex min-h-12 flex-wrap items-center gap-4 px-4 py-2 sm:px-6">
        <span className="shrink-0 text-[9px] font-bold uppercase tracking-[0.2em] text-primary">
          Filtros
        </span>

        <label className="sr-only" htmlFor="search-filter">
          Buscar por nombre o tag
        </label>
        <div className="group flex min-w-52 items-center gap-2">
          <svg
            className="h-3.5 w-3.5 shrink-0 text-on-surface-subtle transition-colors group-focus-within:text-primary"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="7" cy="7" r="4.75" stroke="currentColor" strokeWidth="1.5" />
            <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <input
            id="search-filter"
            type="search"
            className="w-full bg-transparent text-xs tracking-[0.08em] text-on-background placeholder:text-on-surface-muted focus:outline-none focus-visible:outline-none"
            placeholder="Buscar candidato o tag"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex min-h-8 items-center gap-2 border border-outline bg-surface-container px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-muted transition-colors hover:border-on-surface-muted hover:text-white"
            onClick={() => setDropdownOpen((previous) => !previous)}
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            <span className={selectedCalificacion !== allCalificacionesOption ? "text-white" : ""}>
              {selectedLabel}
            </span>
            <svg
              className={`h-3.5 w-3.5 shrink-0 transition-transform duration-150 ${dropdownOpen ? "rotate-180" : ""}`}
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2 4l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <ul
              role="listbox"
              className="absolute left-0 top-full z-50 mt-2 min-w-56 border border-outline bg-surface py-1 shadow-xl"
            >
              {calificaciones.map((option) => {
                const label =
                  option === allCalificacionesOption
                    ? "Todas las calificaciones"
                    : calificacionLabel(option as CandidateCalificacion);
                const isSelected = option === selectedCalificacion;

                return (
                  <li
                    key={option}
                    role="option"
                    aria-selected={isSelected}
                    className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                      isSelected
                        ? "bg-surface-container-high text-white"
                        : "text-on-surface-muted hover:bg-surface-container hover:text-white"
                    }`}
                    onClick={() => {
                      setSelectedCalificacionFromInput(option);
                      setDropdownOpen(false);
                    }}
                  >
                    {label}
                    {isSelected && (
                      <svg className="h-3 w-3 shrink-0 text-primary" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {isFiltered && (
          <button
            type="button"
            className="ml-auto text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-muted transition-colors hover:text-white"
            onClick={clearFilters}
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="border-t border-outline/30 px-4 py-1 sm:px-6">
        <p className="text-[9px] uppercase tracking-[0.16em] text-on-surface-muted">
          {resultCount} candidatos encontrados
        </p>
      </div>
    </nav>
  );
}