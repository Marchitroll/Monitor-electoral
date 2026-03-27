interface AIAnalysisProps {
  paragraphs: string[];
}

export function AIAnalysis({ paragraphs }: AIAnalysisProps) {
  if (paragraphs.length === 0) {
    return (
      <article className="mb-16 max-w-3xl">
        <p className="text-sm text-on-surface-muted">No hay hallazgos registrados para este candidato.</p>
      </article>
    );
  }

  return (
    <article className="mb-16 max-w-3xl">
      <ul className="list-disc space-y-6 pl-6 text-lg leading-[1.7] text-on-background marker:text-primary">
        {paragraphs.map((paragraph, index) => (
          <li key={`${paragraph.slice(0, 16)}-${index}`}>{paragraph}</li>
        ))}
      </ul>
    </article>
  );
}
