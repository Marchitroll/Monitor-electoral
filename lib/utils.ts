import type { CandidateCalificacion } from "@/lib/types";

const CALIFICACION_LABELS: Record<CandidateCalificacion, string> = {
  sentenciado: "Sentenciado",
  investigado: "Investigado",
  polemico: "Polémico",
  sin_registros: "Sin registros",
};

const CALIFICACIONES_VALIDAS = [
  "investigado",
  "polemico",
  "sentenciado",
] as const;

type CalificacionValida = (typeof CALIFICACIONES_VALIDAS)[number];

function isCandidateCalificacion(value: string): value is CalificacionValida {
  return CALIFICACIONES_VALIDAS.includes(value as CalificacionValida);
}

const CALIFICACION_BADGE_CLASSES: Record<CandidateCalificacion, string> = {
  sentenciado:
    "bg-primary text-white border border-primary/90 shadow-lg shadow-primary/40 text-[11px] tracking-[0.12em]",
  investigado:
    "bg-[#a87c1a]/20 text-[#c9962a] border border-[#a87c1a]/50 text-[10px] tracking-[0.10em]",
  polemico:
    "bg-surface-container-high text-on-background border border-outline text-[10px] tracking-[0.08em]",
  sin_registros:
    "bg-surface-container text-on-surface-muted border border-outline text-[9px] tracking-[0.08em]",
};

export function normalizeCalificacion(value: unknown): CandidateCalificacion {
  if (typeof value !== "string") return "sin_registros";

  const normalized = value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  return isCandidateCalificacion(normalized)
    ? normalized
    : "sin_registros";
}

export function calificacionLabel(
  calificacion: CandidateCalificacion
): string {
  return CALIFICACION_LABELS[calificacion];
}

export function calificacionBadgeClass(
  calificacion: CandidateCalificacion
): string {
  return CALIFICACION_BADGE_CLASSES[calificacion];
}

export function calificacionLabelPlural(
  calificacion: CandidateCalificacion
): string {
  if (calificacion === "sin_registros") return "Sin registros";
  return `${CALIFICACION_LABELS[calificacion]}s`;
}

export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Fuente";
  }
}