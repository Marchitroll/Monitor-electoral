export type CandidateCalificacion = "investigado" | "polemico" | "sentenciado" | "sin_registros";

export interface CandidateFuente {
  medio: string;
  url: string;
}

export interface CandidateRaw {
  id: string;
  slug: string;
  nombre: string;
  partido: string;
  foto: string;
  calificacion: string;
  resumen_polemicas: string[];
  fuentes: CandidateFuente[];
  tags: string[];
}

export interface Candidate {
  id: string;
  slug: string;
  nombre: string;
  partido: string;
  foto: string;
  logoPartido: string;
  calificacion: CandidateCalificacion;
  resumen_polemicas: string[];
  fuentes: CandidateFuente[];
  tags: string[];
}
