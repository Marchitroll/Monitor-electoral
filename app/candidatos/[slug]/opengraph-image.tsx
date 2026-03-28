/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { getCandidateBySlug } from "@/lib/candidates";
import { calificacionLabel } from "@/lib/utils";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Badge background colors for OG (inline styles only, no Tailwind)
const CALIFICACION_OG_STYLES: Record<string, { bg: string; color: string; border: string }> = {
  sentenciado: { bg: "#d91023", color: "#ffffff", border: "#d91023" },
  investigado:  { bg: "rgba(168,124,26,0.2)", color: "#c9962a", border: "#a87c1a" },
  polemico:     { bg: "#2a2a2a", color: "#e5e2e1", border: "#262626" },
  sin_registros:{ bg: "#1c1b1b", color: "#a8a29e", border: "#262626" },
};

interface Params {
  params: Promise<{ slug: string }>;
}

export default async function CandidateOpenGraphImage({ params }: Params) {
  const { slug } = await params;
  const candidate = getCandidateBySlug(slug);

  if (!candidate) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0a0a0a",
            color: "#6b6b6b",
            fontFamily: "sans-serif",
            fontSize: 32,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Candidato no encontrado
        </div>
      ),
      { width: size.width, height: size.height },
    );
  }

  const badge = CALIFICACION_OG_STYLES[candidate.calificacion] ?? CALIFICACION_OG_STYLES.sin_registros;
  const photoUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}${candidate.foto}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#0a0a0a",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Red accent bar — left edge */}
        <div style={{ width: 8, height: "100%", background: "#d91023", flexShrink: 0 }} />

        {/* Candidate photo — right half, faded */}
        <img
          src={photoUrl}
          alt={`Retrato de ${candidate.nombre}`}
          width={560}
          height={630}
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 560,
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
          }}
        />

        {/* Gradient overlay over photo */}
        <div
          style={{
            position: "absolute",
            right: 0,
            top: 0,
            width: 560,
            height: "100%",
            background: "linear-gradient(to right, #0a0a0a 0%, rgba(10,10,10,0.7) 40%, rgba(10,10,10,0.1) 100%)",
          }}
        />

        {/* Text content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: "44px 48px",
            position: "relative",
            zIndex: 1,
            maxWidth: 720,
          }}
        >
          {/* Top: brand + badge */}
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span
              style={{
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "#d91023",
              }}
            >
              Monitor Electoral
            </span>
            <div style={{ width: 1, height: 14, background: "#262626" }} />
            <span
              style={{
                fontSize: 11,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#6b6b6b",
              }}
            >
              2026
            </span>
          </div>

          {/* Center: name + party */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {/* Calificación badge */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "fit-content",
                padding: "4px 12px",
                background: badge.bg,
                border: `1px solid ${badge.border}`,
                color: badge.color,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              {calificacionLabel(candidate.calificacion)}
            </div>

            <div
              style={{
                fontSize: 60,
                fontWeight: 700,
                lineHeight: 1.05,
                color: "#ffffff",
                letterSpacing: "-0.01em",
              }}
            >
              {candidate.nombre}
            </div>

            <div
              style={{
                fontSize: 20,
                fontWeight: 400,
                color: "#a8a29e",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              {candidate.partido}
            </div>
          </div>

          {/* Bottom: disclaimer */}
          <div
            style={{
              fontSize: 12,
              color: "#6b6b6b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Controversias · Fuentes citadas · Datos públicos
          </div>
          <div
            style={{
              fontSize: 12,
              color: "#9ca3af",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginTop: 6,
            }}
          >
            {`${process.env.NEXT_PUBLIC_SITE_URL ?? "https://monitor-electoral.duckdns.org"}/candidatos/${slug}`}
          </div>        </div>

        {/* Yellow warning bar — bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 8,
            right: 0,
            height: 6,
            background: "#eab308",
          }}
        />
      </div>
    ),
    { width: size.width, height: size.height },
  );
}