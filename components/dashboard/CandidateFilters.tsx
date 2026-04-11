"use client";

import { useCallback, useRef, useState } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { CALIFICACION_ORDER, type CandidateCalificacion } from "@/lib/types";
import { calificacionBadgeClass, calificacionLabel, calificacionLabelPlural } from "@/lib/utils";

type CalificacionCounts = Record<CandidateCalificacion, number>;

interface CandidateFiltersProps {
  calificaciones: (CandidateCalificacion | "todas")[];
  allCalificacionesOption: "todas";
  selectedCalificacion: CandidateCalificacion | "todas";
  setSelectedCalificacionFromInput: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
  clearFilters: () => void;
  resultCount: number;
  calificacionCounts: CalificacionCounts;
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
  calificacionCounts,
}: CandidateFiltersProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback(() => setDropdownOpen(false), []);
  useClickOutside(dropdownRef, closeDropdown);

  const selectedLabel =
    selectedCalificacion === allCalificacionesOption
      ? "Todas las calificaciones"
      : calificacionLabel(selectedCalificacion as CandidateCalificacion);

  const isFiltered =
    query.trim().length > 0 || selectedCalificacion !== allCalificacionesOption;

  function handleOptionSelect(value: string) {
    setSelectedCalificacionFromInput(value);
    setDropdownOpen(false);
  }

  function handleOptionKeyDown(event: React.KeyboardEvent, value: string) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOptionSelect(value);
      return;
    }

    if (event.key !== "ArrowDown" && event.key !== "ArrowUp") {
      return;
    }

    const options = Array.from(
      event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="option"]') ?? [],
    );

    if (options.length === 0) {
      return;
    }

    event.preventDefault();
    const currentIndex = options.indexOf(event.currentTarget as HTMLElement);
    const delta = event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (currentIndex + delta + options.length) % options.length;
    options[nextIndex]?.focus();
  }

  return (
    <nav className="fixed top-16 z-40 w-full border-b border-outline bg-surface">
      {/* Filter controls row */}
      <div className="flex min-h-12 flex-wrap items-center gap-4 px-4 py-2 sm:px-6">
        <span className="shrink-0 text-[12px] font-bold uppercase tracking-[0.2em] text-primary">
          Filtros
        </span>

        {/* Search */}
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
            className="w-full bg-transparent text-xs tracking-[0.08em] text-on-background placeholder:text-on-surface-muted"
            placeholder="Buscar candidato o tag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Calificación dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            className="flex min-h-8 items-center gap-2 border border-outline bg-surface-container px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-muted transition-colors hover:border-on-surface-muted hover:text-white"
            onClick={() => setDropdownOpen((prev) => !prev)}
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
              aria-hidden="true"
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
              aria-label="Filtrar por calificación"
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
                    tabIndex={0}
                    className={`flex cursor-pointer items-center justify-between px-4 py-2.5 text-xs uppercase tracking-[0.12em] transition-colors ${
                      isSelected
                        ? "bg-surface-container-high text-white"
                        : "text-on-surface-muted hover:bg-surface-container hover:text-white"
                    }`}
                    onClick={() => handleOptionSelect(option)}
                    onKeyDown={(e) => handleOptionKeyDown(e, option)}
                  >
                    {label}
                    {isSelected && (
                      <svg
                        className="h-3 w-3 shrink-0 text-primary"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                      >
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
            className="text-[10px] font-bold uppercase tracking-[0.12em] text-on-surface-muted transition-colors hover:text-white"
            onClick={clearFilters}
          >
            Limpiar
          </button>
        )}

        {/* Stats right */}
        <div className="ml-auto flex items-center gap-3">
          <p className="text-[10px] uppercase tracking-[0.16em] text-on-surface-muted">
            {resultCount} candidatos encontrados
          </p>
          <div className="flex flex-wrap gap-2">
            {CALIFICACION_ORDER.map((cal) => (
              <span
                key={cal}
                className={`px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.10em] ${calificacionBadgeClass(cal)}`}
              >
                {calificacionCounts[cal]} {calificacionLabelPlural(cal)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}