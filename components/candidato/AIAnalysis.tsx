import type { CandidateCalificacion } from "@/lib/types";

interface AIAnalysisProps {
  paragraphs: string[];
  calificacion: CandidateCalificacion;
}

const statusColorMap: Record<CandidateCalificacion, string> = {
  sentenciado: "border-l-primary",
  investigado: "border-l-[#c9962a]",
  polemico: "border-l-warning",
  sin_registros: "border-l-outline",
};

export function AIAnalysis({ paragraphs, calificacion }: AIAnalysisProps) {
  const markerClass = statusColorMap[calificacion] ?? "marker:text-primary";

  if (paragraphs.length === 0) {
    return (
      <article className="mb-16 max-w-3xl">
        <p className="text-sm text-on-surface-muted">No hay hallazgos registrados para este candidato.</p>
      </article>
    );
  }

  return (
    <article className="mb-16 max-w-3xl">
      <div className="space-y-6 text-lg leading-[1.7] text-on-background">
        {paragraphs.map((paragraph, index) => (
          <p
            key={`${paragraph.slice(0, 16)}-${index}`}
            className={`border-l-2 pl-4 ${markerClass}`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </article>
  );
}
