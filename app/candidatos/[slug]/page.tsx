import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { AIAnalysis } from "@/components/candidato/AIAnalysis";
import { CandidateSidebar } from "@/components/candidato/CandidateSidebar";
import { AIDisclaimerText } from "@/components/layout/AIDisclaimerText";
import { NewsList } from "@/components/candidato/NewsList";
import { Footer } from "@/components/layout/Footer";
import { TopAppBar } from "@/components/layout/TopAppBar";
import { getAllSlugs, getCandidateBySlug } from "@/lib/candidates";

interface CandidateDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const dynamicParams = false;
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: CandidateDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const candidate = getCandidateBySlug(slug);

  if (!candidate) {
    return {
      title: "Candidato no encontrado",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const description = `Perfil de ${candidate.nombre} (${candidate.partido}) con resumen de controversias y fuentes periodisticas verificables.`;
  const metadataTitle = `${candidate.nombre} - Perfil y controversias`;
  const metadataDescription = description.slice(0, 160);

  const canonicalUrl = `${baseUrl}/candidatos/${candidate.slug}`;
  const candidateOgImage = candidate.foto.startsWith("http")
    ? candidate.foto
    : `${baseUrl}${candidate.foto}`;

  return {
    title: metadataTitle,
    description: metadataDescription,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      locale: "es_PE",
      url: canonicalUrl,
      title: metadataTitle,
      description: metadataDescription,
      images: [
        {
          url: candidateOgImage,
          alt: `Retrato de ${candidate.nombre}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metadataTitle,
      description: metadataDescription,
      images: [candidateOgImage],
    },
  };
}

export default async function CandidateDetailPage({ params }: CandidateDetailPageProps) {
  const { slug } = await params;
  const candidate = getCandidateBySlug(slug);

  if (!candidate) {
    notFound();
  }

  const candidateJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: candidate.nombre,
    image: `${baseUrl}${candidate.foto}`,
    affiliation: {
      "@type": "Organization",
      name: candidate.partido,
      logo: `${baseUrl}${candidate.logoPartido}`,
    },
    url: `${baseUrl}/candidatos/${candidate.slug}`,
    description: `Resumen de controversias y fuentes de ${candidate.nombre}.`,
  };

  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-on-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(candidateJsonLd) }}
      />
      <div className="sticky top-0 z-[60] flex h-[var(--banner-h)] items-center justify-center bg-warning px-4 text-center text-[10px] font-bold uppercase tracking-[0.18em] text-background md:text-xs">
        <AIDisclaimerText />
      </div>

      <div className="relative z-50">
        <TopAppBar offsetClassName="top-[var(--banner-h)]" />
      </div>

      <main className="flex flex-col pt-[var(--topbar-h)] lg:flex-row">
        <CandidateSidebar candidate={candidate} />

        <section className="flex-1 bg-background p-6 sm:p-10 lg:p-12">
          {/* Page header */}
          <header className="mb-10">
            <h2 className="mb-1 text-2xl font-bold tracking-tight text-white">
              Resumen de controversias
            </h2>
            <p className="text-sm text-on-surface-muted">
              Análisis de las polémicas más relevantes asociadas a {candidate.nombre}, basado en información pública y fuentes periodísticas.
            </p>
          </header>

          {/* Two-column layout: analysis (main) + sources (sidebar) */}
          <div className="flex flex-col gap-10 xl:flex-row xl:gap-16 xl:items-start">
            {/* Analysis — main column */}
            <div className="flex-1 min-w-0">
              <AIAnalysis paragraphs={candidate.resumen_polemicas} calificacion={candidate.calificacion} />
            </div>

            {/* Sources — sticky right panel */}
            <div className="w-full xl:w-64 xl:shrink-0 xl:sticky xl:top-[calc(var(--detail-header-offset)+1.5rem)]">
              <NewsList news={candidate.fuentes} />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
