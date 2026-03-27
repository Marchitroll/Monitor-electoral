import candidatesJson from "@/app/data/candidates.json";
import type { Candidate, CandidateRaw } from "@/lib/types";
import { normalizeCalificacion } from "@/lib/utils";

const PHOTO_FALLBACK = "/images/placeholders/candidato.svg";
const PARTY_LOGO_FALLBACK = "/images/placeholders/partido.svg";

const PHOTO_BY_SLUG: Record<string, string> = {
  "alex-gonzales-castillos": "/images/candidatos/alex-gonzales.jpg",
  "alfonso-carlos-espa-garces-alvear": "/images/candidatos/alfonso-espa.jpg",
  "alvaro-paz-de-la-barra": "/images/candidatos/alvaro-paz-de-la-barra.jpg",
  "antonio-ortiz-villano": "/images/candidatos/antonio-ortiz.jpg",
  "armando-joaquin-masse-fernandez": "/images/candidatos/armando-masse.jpg",
  "carlos-gonsalo-alvarez-loayza": "/images/candidatos/carlos-alvarez.jpg",
  "carlos-ernesto-jaico-carranza": "/images/candidatos/carlos-jaico.jpg",
  "cesar-acuna-peralta": "/images/candidatos/cesar-acuna.jpg",
  "charlie-carrasco-salazar": "/images/candidatos/charlie-carrasco.jpg",
  "fiorella-molinelli-aristondo": "/images/candidatos/fiorella-molinelli.jpg",
  "francisco-diez-canseco-tavara": "/images/candidatos/francisco-diez-canseco.jpg",
  "francisco-ernesto-diez-canseco-tavara": "/images/candidatos/francisco-diez-canseco.jpg",
  "george-patrick-forsyth-sommer": "/images/candidatos/george-forsyth.jpg",
  "herbert-caller-gutierrez": "/images/candidatos/herbert-caller.jpg",
  "jorge-nieto-montesinos": "/images/candidatos/jorge-nieto.jpg",
  "jose-daniel-williams-zapata": "/images/candidatos/jose-williams.jpg",
  "jose-leon-luna-galvez": "/images/candidatos/jose-luna.jpg",
  "keiko-fujimori": "/images/candidatos/keiko-fujimori.jpg",
  "luis-fernando-olivera-vega": "/images/candidatos/luis-olivera.jpg",
  "maria-soledad-perez-tello-de-rodriguez": "/images/candidatos/maria-perez.jpg",
  "mario-vizcarra-cornejo": "/images/candidatos/mario-vizcarra.jpg",
  "mesias-antonio-guevara-amasifuen": "/images/candidatos/mesias-guevara.jpg",
  "pablo-alfonso-lopez-chau-nava": "/images/candidatos/pablo-lopez-chau.jpg",
  "paul-davis-jaimes-blanco": "/images/candidatos/paul-jaimes.jpg",
  "pitter-enrique-valderrama-penata": "/images/candidatos/pitter-valderrama.jpg",
  "rafael-jorge-belaunde-llosa": "/images/candidatos/rafael-belaunde.jpg",
  "rafael-lopez-aliaga": "/images/candidatos/rafael-lopez-aliaga.jpg",
  "ricardo-pablo-belmont-cassinellita": "/images/candidatos/ricardo-belmont.jpg",
  "roberto-enrique-chiabra-leon": "/images/candidatos/roberto-chiabra.jpg",
  "roberto-helbert-sanchez-palomino": "/images/candidatos/roberto-sanchez.jpg",
  "ronald-atencio-sotomayor": "/images/candidatos/ronald-atencio.jpg",
  "rosario-del-pilar-fernandez-bazan": "/images/candidatos/rosario-fernandez.jpg",
  "vladimir-cerron": "/images/candidatos/vladimir-cerron.jpg",
  "walter-gilmer-chirinos-purizaga": "/images/candidatos/walter-chirinos.jpg",
  "wolfgang-mario-grozo-costa": "/images/candidatos/wolfgang-grozo.jpg",
  "yonhy-lescano-ancieta": "/images/candidatos/yonhy-lescano.jpg",
};

const PARTY_LOGO_BY_SLUG: Record<string, string> = {
  "alex-gonzales-castillos": "/images/logos/alex-gonzales-partido-democrata-verde.jpg",
  "alfonso-carlos-espa-garces-alvear": "/images/logos/alfonso-espa-partido-sicreo.jpg",
  "alvaro-paz-de-la-barra": "/images/logos/alvaro-paz-de-la-barra-fe-en-el-peru.jpg",
  "antonio-ortiz-villano": "/images/logos/antonio-ortiz-salvemos-al-peru.jpg",
  "armando-joaquin-masse-fernandez": "/images/logos/armando-masse-partido-democratico-federal.jpg",
  "carlos-gonsalo-alvarez-loayza": "/images/logos/carlos-alvarez-partido-pais-para-todos.jpg",
  "carlos-ernesto-jaico-carranza": "/images/logos/carlos-jaico-peru-moderno.jpg",
  "cesar-acuna-peralta": "/images/logos/cesar-acuna-alianza-para-el-progreso.jpg",
  "charlie-carrasco-salazar": "/images/logos/charlie-carrasco-partido-democrata-unido-peru.jpg",
  "fiorella-molinelli-aristondo": "/images/logos/fiorella-molinelli-fuerza-y-libertad.jpg",
  "francisco-diez-canseco-tavara": "/images/logos/francisco-diez-canseco-partido-politico-peru-accion.jpg",
  "francisco-ernesto-diez-canseco-tavara":
    "/images/logos/francisco-diez-canseco-partido-politico-peru-accion.jpg",
  "george-patrick-forsyth-sommer": "/images/logos/george-forsyth-partido-democratico-somos-peru.jpg",
  "herbert-caller-gutierrez": "/images/logos/herbert-caller-partido-patriotico-del-peru.jpg",
  "jorge-nieto-montesinos": "/images/logos/jorge-nieto-partido-del-buen-gobierno.jpg",
  "jose-daniel-williams-zapata":
    "/images/logos/jose-williams-avanza-pais-partido-de-integracion-social.jpg",
  "jose-leon-luna-galvez": "/images/logos/jose-luna-podemos-peru.jpg",
  "keiko-fujimori": "/images/logos/keiko-fujimori-fuerza-popular.jpg",
  "luis-fernando-olivera-vega": "/images/logos/luis-olivera-partido-frente-de-la-esperanza-2021.jpg",
  "maria-soledad-perez-tello-de-rodriguez":
    "/images/logos/maria-perez-primero-la-gente-comunidad-ecologia-libertad-y-progreso.jpg",
  "mario-vizcarra-cornejo": "/images/logos/mario-vizcarra-partido-politico-peru-primero.jpg",
  "mesias-antonio-guevara-amasifuen": "/images/logos/mesias-guevara-partido-morado.jpg",
  "pablo-alfonso-lopez-chau-nava": "/images/logos/pablo-lopez-chau-ahora-nacion-an.jpg",
  "paul-davis-jaimes-blanco": "/images/logos/paul-jaimes-progresemos.jpg",
  "pitter-enrique-valderrama-penata": "/images/logos/pitter-valderrama-partido-aprista-peruano.jpg",
  "rafael-jorge-belaunde-llosa": "/images/logos/rafael-belaunde-libertad-popular.jpg",
  "rafael-lopez-aliaga": "/images/logos/rafael-lopez-aliaga-renovacion-popular.jpg",
  "ricardo-pablo-belmont-cassinellita": "/images/logos/ricardo-belmont-partido-civico-obras.jpg",
  "roberto-enrique-chiabra-leon": "/images/logos/roberto-chiabra-unidad-nacional.jpg",
  "roberto-helbert-sanchez-palomino": "/images/logos/roberto-sanchez-juntos-por-el-peru.jpg",
  "ronald-atencio-sotomayor": "/images/logos/ronald-atencio-alianza-electoral-venceremos.jpg",
  "rosario-del-pilar-fernandez-bazan": "/images/logos/rosario-fernandez-un-camino-diferente.jpg",
  "vladimir-cerron": "/images/logos/vladimir-cerron-partido-politico-nacional-peru-libre.jpg",
  "walter-gilmer-chirinos-purizaga": "/images/logos/walter-chirinos-partido-politico-prin.jpg",
  "wolfgang-mario-grozo-costa": "/images/logos/wolfgang-grozo-partido-politico-integridad-democratica.jpg",
  "yonhy-lescano-ancieta": "/images/logos/yonhy-lescano-partido-politico-cooperacion-popular.jpg",
};

function getAssetPathFromSlug(
  map: Record<string, string>,
  slug: string,
  fallbackPath: string
): string {
  return map[slug] ?? fallbackPath;
}

const candidates: Candidate[] = (candidatesJson as CandidateRaw[]).map((candidate) => ({
  ...candidate,
  foto: getAssetPathFromSlug(PHOTO_BY_SLUG, candidate.slug, PHOTO_FALLBACK),
  logoPartido: getAssetPathFromSlug(PARTY_LOGO_BY_SLUG, candidate.slug, PARTY_LOGO_FALLBACK),
  calificacion: normalizeCalificacion(candidate.calificacion),
}));

export function getAllCandidates(): Candidate[] {
  return candidates;
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