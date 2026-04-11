"use client";

import Link from "next/link";
import { useEffect } from "react";

interface CandidateErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function CandidateError({ error, reset }: CandidateErrorProps) {
  useEffect(() => {
    console.error("[candidate-page]", error);
  }, [error]);

  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center gap-4 px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-warning">Error</p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        No pudimos cargar este perfil
      </h1>
      <p className="max-w-xl text-sm text-on-surface-muted">
        Ocurrió un problema inesperado al cargar la información del candidato.
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-10 items-center border border-outline px-4 text-xs font-bold uppercase tracking-[0.16em] text-on-surface-muted transition-colors hover:text-white"
        >
          Reintentar
        </button>
        <Link
          href="/"
          className="inline-flex min-h-10 items-center border border-outline px-4 text-xs font-bold uppercase tracking-[0.16em] text-on-surface-muted transition-colors hover:text-white"
        >
          Volver al índice
        </Link>
      </div>
    </main>
  );
}
