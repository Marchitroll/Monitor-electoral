import candidatesJson from "@/app/data/candidates.json";
import type { Candidate } from "@/lib/types";
import { parseCandidates } from "@/lib/candidate.mapper";

const candidates: Candidate[] = parseCandidates(candidatesJson);

export function getAllCandidates(): Candidate[] {
  return candidates.map((candidate) => ({ ...candidate }));
}

export function getCandidateBySlug(slug: string): Candidate | undefined {
  return candidates.find((candidate) => candidate.slug === slug);
}

export function getAllSlugs(): string[] {
  return candidates.map((candidate) => candidate.slug);
}

export function getAllPartidos(): string[] {
  return [...new Set(candidates.map((candidate) => candidate.partido))].sort((a, b) =>
    a.localeCompare(b, "es"),
  );
}

