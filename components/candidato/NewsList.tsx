import type { CandidateFuente } from "@/lib/types";
import { getDomainFromUrl } from "@/lib/utils";

interface NewsListProps {
  news: CandidateFuente[];
}

export function NewsList({ news }: NewsListProps) {
  return (
    <section>
      <h3 className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-on-surface-muted">
        Fuentes consultadas
      </h3>

      {news.length === 0 ? (
        <p className="text-sm text-on-surface-muted">Sin fuentes registradas.</p>
      ) : (
        <ol className="space-y-2">
          {news.map((item, index) => (
            <li key={`${item.medio}-${index}`}> 
              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group block rounded-lg border border-outline/30 bg-surface p-3 shadow-sm transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md hover:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label={`Ver fuente: ${item.medio}`}
              >
                <div className="flex items-center gap-2">
                  <span className="w-5 shrink-0 text-[10px] font-bold tabular-nums text-on-surface-subtle">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="flex-1 text-sm font-medium leading-snug text-on-surface-muted transition-colors group-hover:text-white">
                    {item.medio}
                  </span>

                  <span className="shrink-0 text-[11px] text-on-surface-subtle transition-colors group-hover:text-primary">
                    ↗
                  </span>
                </div>

                <p className="mt-0.5 pl-7 text-[10px] uppercase tracking-[0.1em] text-on-surface-subtle">
                  {getDomainFromUrl(item.url)}
                </p>
              </a>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
