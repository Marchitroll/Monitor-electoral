# Monitor Electoral 2026

Perú llega a las elecciones 2026 con más de 35 partidos, bicameralidad restaurada y un elector que no tiene tiempo de investigar a todos. Monitor Electoral 2026 es ese filtro: acceso directo y visual a los antecedentes y controversias de cada candidato, sin tener que perderse en la fragmentación.

## Demo

- Demo en producción: https://monitor-electoral.duckdns.org/
- Repositorio: https://github.com/Marchitroll/Monitor-electoral

## Capturas de pantalla

![Dashboard](https://private-user-images.githubusercontent.com/165957387/571678050-f98bb439-f17f-4255-b263-19810693585d.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzQ5MzExODAsIm5iZiI6MTc3NDkzMDg4MCwicGF0aCI6Ii8xNjU5NTczODcvNTcxNjc4MDUwLWY5OGJiNDM5LWYxN2YtNDI1NS1iMjYzLTE5ODEwNjkzNTg1ZC5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzMxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMzMVQwNDIxMjBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0xYTQ5MThlYWNjMTBmNGFkMDJmYTc3NTU1NWJmYjBhYzE1MmVmOWRjZmMzN2E2YjM4YjgyNGRhYWM5YzJjOTM0JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.IgkxMExTh-mISUVU1DKF2zUzMys2i-dLp5PcZ16kTOU)

![Resumen para un candidato](https://private-user-images.githubusercontent.com/165957387/571678051-556b28f6-e23f-4575-805e-5a3c376c0482.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzQ5MzExODAsIm5iZiI6MTc3NDkzMDg4MCwicGF0aCI6Ii8xNjU5NTczODcvNTcxNjc4MDUxLTU1NmIyOGY2LWUyM2YtNDU3NS04MDVlLTVhM2MzNzZjMDQ4Mi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwMzMxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDMzMVQwNDIxMjBaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01M2Y2YmI0M2UwMjNlMmJkNDllZTc3N2RhN2M1ZDFjNmU3NjkxOTExMGEzOTQ0ZmY5ODNlYjc3OWRkYjg0YTVjJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.3MBighDhyBCPx-8QrCfFTWssuCBtlWrp-eY4YSJHoiM)

## Funcionalidades principales

- Listado de candidatos con tarjetas visuales.
- Búsqueda y filtros por calificación.
- Página de detalle por candidato (SSG con slugs).
- Resumen de polémicas y listado de fuentes clickeables.
- Metadatos SEO globales y dinámicos por candidato.
- robots.txt y sitemap.xml generados por convención de App Router.

## Stack tecnico

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- ESLint
- pnpm
- Cubepath

## Arquitectura y Pivote

El concepto original era un pipeline automatizado que se ejecutaba cada 12-24 horas para mantener los expedientes actualizados. Lo descarté por una razón simple: **Monitor Electoral 2026 tiene fecha de vencimiento**. Su valor es máximo antes de las elecciones y expira el día de los comicios. Invertir en infraestructura backend pesada o APIs recurrentes para eso no tenía sentido.

En su lugar, construí un MVP de alta fidelidad a **costo cero ($0.00)**: sin riesgo de facturación inesperada, sin dependencias externas que puedan caerse justo durante el pico de tráfico electoral.

### Metodología: Consenso Multimodelo + Revisión Humana

Para reducir alucinaciones, validé cada perfil cruzando respuestas de múltiples modelos SOTA. Solo procesé información respaldada por varios modelos *y* evidencia documental. Antes del despliegue final, revisé manualmente el Master JSON para mitigar sesgos residuales.

> ⚠️ Esta metodología reduce significativamente las imprecisiones, pero no las elimina por completo. El sistema sigue sujeto a errores derivados de las fuentes originales.

## ¿Cómo se usó Cubepath?

Seguí el tutorial de midudev utilizando un VPS de CubePath con Dokploy instalado mediante “Apps de 1-click”. Luego conecté mi repositorio de GitHub, y Dokploy se encarga de automatizar el build estático de Next.js, sirviendo tanto el frontend como el Master JSON directamente desde el servidor. Esto me permite tener control total sobre la infraestructura, reducir al mínimo la latencia y no depender de plataformas externas.

## Ejecución local

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