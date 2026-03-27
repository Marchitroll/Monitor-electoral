import type { MetadataRoute } from "next";

import { getAllCandidates } from "@/lib/candidates";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const candidateRoutes = getAllCandidates().map((candidate) => ({
    url: `${siteUrl}/candidatos/${candidate.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    ...candidateRoutes,
  ];
}