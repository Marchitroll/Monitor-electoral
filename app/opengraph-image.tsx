import { ImageResponse } from "next/og";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://monitor-electoral.duckdns.org";
const baseHost = siteUrl.replace(/^https?:\/\//, "");

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "#0a0a0a",
          color: "#e5e2e1",
          fontFamily: "sans-serif",
          padding: 0,
          position: "relative",
        }}
      >
        {/* Red accent bar — top */}
        <div style={{ width: "100%", height: 8, background: "#d91023", flexShrink: 0 }} />

        {/* Yellow warning strip */}
        <div
          style={{
            width: "100%",
            padding: "10px 56px",
            background: "#eab308",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#0a0a0a",
            }}
          >
            Resumen generado por IA · Verifica las fuentes antes de compartir
          </span>
        </div>

        {/* Main content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "48px 56px",
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: "0.24em",
              textTransform: "uppercase",
              color: "#d91023",
              marginBottom: 20,
            }}
          >
            Monitor Electoral 2026
          </div>

          <div
            style={{
              fontSize: 56,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "#ffffff",
              marginBottom: 24,
              maxWidth: 900,
            }}
          >
            Candidatos presidenciales bajo lupa
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 400,
              color: "#a8a29e",
              maxWidth: 780,
              lineHeight: 1.5,
            }}
          >
            Controversias verificadas · Fuentes citadas · Datos públicos
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            width: "100%",
            padding: "14px 56px",
            borderTop: "1px solid #262626",
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14, letterSpacing: "0.12em", color: "#6b6b6b", textTransform: "uppercase" }}>
            {baseHost}
          </span>
        </div>
      </div>
    ),
    { width: size.width, height: size.height },
  );
}