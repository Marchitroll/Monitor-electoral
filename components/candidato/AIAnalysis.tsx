interface AIAnalysisProps {
  paragraphs: string[];
  calificacion: "sentenciado" | "investigado" | "polemico" | "limpio" | string;
}

const statusColorMap: Record<string, string> = {
  sentenciado: "marker:text-red-500",
  investigado: "marker:text-orange-500",
  polemico: "marker:text-yellow-500",
  limpio: "marker:text-emerald-500",
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
      <ul className={`list-disc space-y-6 pl-6 text-lg leading-[1.7] text-on-background ${markerClass}`}>
        {paragraphs.map((paragraph, index) => (
          <li key={`${paragraph.slice(0, 16)}-${index}`}>{paragraph}</li>
        ))}
      </ul>
    </article>
  );
}
