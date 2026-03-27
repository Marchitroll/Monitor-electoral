import type { CandidateCalificacion } from "@/lib/types";
import { calificacionBadgeClass, calificacionLabel } from "@/lib/utils";

interface StatusBadgeProps {
  calificacion: CandidateCalificacion;
}

export function StatusBadge({ calificacion }: StatusBadgeProps) {
  return (
    <span
      className={[
        "px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]",
        calificacionBadgeClass(calificacion),
      ].join(" ")}
    >
      {calificacionLabel(calificacion)}
    </span>
  );
}
