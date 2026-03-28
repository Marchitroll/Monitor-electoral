export type CandidateCalificacion =
  | "investigado"
  | "polemico"
  | "sentenciado"
  | "sin_registros";

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