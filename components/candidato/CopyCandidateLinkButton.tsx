"use client";

import { useState } from "react";

interface CopyCandidateLinkButtonProps {
  slug: string;
}

export function CopyCandidateLinkButton({ slug }: CopyCandidateLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const onClick = async () => {
    const url = `${window.location.origin}/candidatos/${slug}`;

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (error) {
      console.error("Error copying link:", error);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-3 w-full rounded-md border border-outline bg-surface px-3 py-2 text-xs font-bold uppercase tracking-wide text-on-surface transition-all duration-200 ease-out hover:-translate-y-0.5 hover:bg-surface-hover hover:shadow-md active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      aria-label="Copiar enlace del candidato"
    >
      {copied ? "Enlace copiado" : "Copiar enlace del candidato"}
    </button>
  );
}
