import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Monitor Electoral | Plataforma 2026",
    template: "%s | Monitor Electoral",
  },
  description:
    "Plataforma de monitoreo electoral 2026 con perfiles de candidatos, controversias y fuentes periodisticas verificables.",
  applicationName: "Monitor Electoral",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: "/",
    siteName: "Monitor Electoral",
    title: "Monitor Electoral | Plataforma 2026",
    description:
      "Perfiles de candidatos presidenciales 2026, resumen de controversias y acceso a fuentes periodisticas.",
    images: [
      {
        url: "/opengraph-image",
        alt: "Monitor Electoral 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Monitor Electoral | Plataforma 2026",
    description:
      "Perfiles de candidatos presidenciales 2026 con controversias y fuentes periodisticas verificables.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.ico?v=20260327" }],
    shortcut: [{ url: "/favicon.ico?v=20260327" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-on-background">
        {children}
      </body>
    </html>
  );
}
