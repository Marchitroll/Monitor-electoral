import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col items-start justify-center gap-4 px-6 py-16">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-warning">404</p>
      <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
        Página no encontrada
      </h1>
      <p className="max-w-xl text-sm text-on-surface-muted">
        La ruta solicitada no existe o fue movida. Puedes volver al inicio para continuar navegando.
      </p>
      <Link
        href="/"
        className="mt-2 inline-flex min-h-10 items-center border border-outline px-4 text-xs font-bold uppercase tracking-[0.16em] text-on-surface-muted transition-colors hover:text-white"
      >
        Volver al índice
      </Link>
    </main>
  );
}
