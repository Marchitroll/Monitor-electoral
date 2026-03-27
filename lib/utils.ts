import type { CandidateCalificacion } from "@/lib/types";

export function normalizeCalificacion(value: string): CandidateCalificacion {
  const normalized = value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

  if (normalized === "investigado") return "investigado";
  if (normalized === "polemico") return "polemico";
  if (normalized === "sentenciado") return "sentenciado";
  return "sin_registros";
}

export function calificacionLabel(calificacion: CandidateCalificacion): string {
  if (calificacion === "investigado") return "Investigado";
  if (calificacion === "polemico") return "Polemico";
  if (calificacion === "sentenciado") return "Sentenciado";
  return "Sin registros";
}

export function calificacionBadgeClass(calificacion: CandidateCalificacion): string {
  if (calificacion === "sentenciado") return "bg-primary text-white";
  if (calificacion === "investigado") return "bg-[#8A6800] text-black";
  if (calificacion === "polemico") return "bg-surface-container-high text-on-background";
  return "bg-surface-container-high text-on-surface-muted";
}

export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "Fuente";
  }
}
