# Monitor Electoral 2026

Proyecto presentado para la Hackaton CubePath 2026.

Monitor Electoral 2026 es una plataforma web que centraliza perfiles de candidatos presidenciales, resumen de controversias y fuentes periodisticas verificables en una experiencia visual clara, rapida y mobile-first.

## Demo

- Demo en CubePath: PENDIENTE_DE_URL_PUBLICA
- Repositorio: https://github.com/USER/monitor-electoral

## Problema que resuelve

La informacion electoral suele estar dispersa, sin contexto y con baja trazabilidad de fuentes. Este proyecto busca:

- Unificar perfiles de candidatos en una sola vista.
- Mostrar resumenes de controversias en lenguaje claro.
- Mantener trazabilidad mediante enlaces a medios y fuentes.
- Mejorar la consulta en movil y desktop con una UI priorizada por lectura.

## Funcionalidades principales

- Listado de candidatos con tarjetas visuales.
- Busqueda y filtros por calificacion.
- Pagina de detalle por candidato (SSG con slugs).
- Resumen de polemicas y listado de fuentes clickeables.
- Metadatos SEO globales y dinamicos por candidato.
- robots.txt y sitemap.xml generados por convencion de App Router.

## Stack tecnico

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint
- pnpm

## Estructura del proyecto

- app/: rutas y layout principal
- components/: UI reusable (dashboard, detalle, layout)
- lib/: logica de datos y tipos
- public/: imagenes, placeholders y favicon
- app/data/candidates.json: dataset consolidado por slug

## Ejecucion local

Requisitos:

- Node.js 20+
- pnpm

Pasos:

```bash
pnpm install
pnpm dev
```

Validaciones recomendadas:

```bash
pnpm lint
pnpm build
pnpm start
```

## Como se ha utilizado CubePath

Enfoque de despliegue para cumplir la Hackaton CubePath 2026:

1. La aplicacion se despliega en CubePath como servicio web Node.js.
2. Se publica una URL accesible de demo en produccion.
3. Se configura la variable de entorno NEXT_PUBLIC_SITE_URL con el dominio final de CubePath para canonical, Open Graph y JSON-LD correctos.
4. Se valida post-deploy:
	 - / responde 200
	 - /robots.txt responde 200
	 - /sitemap.xml responde 200
	 - /candidatos/[slug] responde 200
5. Se registra la participacion mediante issue en el repositorio oficial de la hackaton.

## SEO y rendimiento

- Metadata base y social tags (Open Graph / Twitter).
- Metadata dinamica por candidato.
- JSON-LD tipo Person en el detalle de candidato.
- Imgenes optimizadas con componente Image de Next.js.
- Priorizacion de imagenes criticas para mejorar LCP.

## Checklist de entrega Hackaton CubePath 2026

- Proyecto desplegado en CubePath.
- Repositorio publico.
- README con descripcion, demo, capturas y uso de CubePath.
- Proyecto funcional al momento de revision.
- Registro del proyecto via issue oficial:
	https://github.com/midudev/hackaton-cubepath-2026/issues/new?template=project.yml

## Roadmap corto

- Completar URL publica definitiva de CubePath.
- Añadir capturas/GIFs reales en esta documentacion.
- Añadir tests basicos de integracion para flujos criticos.

## Licencia

Uso academico y demostrativo para Hackaton CubePath 2026.
