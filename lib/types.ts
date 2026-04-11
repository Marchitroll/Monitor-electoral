export const CANDIDATE_CALIFICACIONES = [
  "sentenciado",
  "investigado",
  "polemico",
  "sin_registros",
] as const;

export type CandidateCalificacion = (typeof CANDIDATE_CALIFICACIONES)[number];

export const ALL_CALIFICACIONES_OPTION = "todas" as const;

export type CalificacionFilterOption =
  | CandidateCalificacion
  | typeof ALL_CALIFICACIONES_OPTION;

export const CALIFICACION_ORDER: CandidateCalificacion[] = [...CANDIDATE_CALIFICACIONES];

export interface CandidateFuente {
  medio: string;
  url: string;
}

export interface CandidateRaw {
  id: string;
  slug: string;
  nombre: string;
  partido: string;
  calificacion: unknown;
  resumen_polemicas: string[];
  fuentes: CandidateFuente[];
  tags: string[];
}

export interface Candidate extends Omit<CandidateRaw, "calificacion"> {
  foto: string;
  logoPartido: string;
  calificacion: CandidateCalificacion;
}