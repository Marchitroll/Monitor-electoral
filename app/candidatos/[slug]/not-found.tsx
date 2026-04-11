import Link from "next/link";

export default function CandidateNotFound() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-3xl flex-col items-start justify-center gap-4 px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-warning">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Candidato no encontrado
      </h1>
      <p className="max-w-xl text-sm text-on-surface-muted">
        No existe un perfil para esta ruta o el contenido fue retirado.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-10 items-center border border-outline px-4 text-xs font-bold uppercase tracking-[0.16em] text-on-surface-muted transition-colors hover:text-white"
      >
        Volver al indice
      </Link>
    </main>
  );
}
