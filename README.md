# metanoia-app — Prototipo SaaS con asistentes de IA (Next.js + Firebase + Genkit)

Prototipo de una plataforma de gestión para pymes con dashboards por área (clientes, créditos, finanzas, RR. HH., inventario) y asistentes de IA basados en Gemini.

> **Estado:** prototipo. El historial de commits muestra que la aplicación se construyó iterando instrucciones en **Firebase Studio** (asistente de IA de Google): muchos mensajes de commit son los pedidos y correcciones enviados al asistente. Este README describe lo que se observa en el código; no implica uso en producción.

## Qué problema aborda

Explorar cómo combinar un panel de gestión (clientes, cobranzas, personal) con análisis generado por IA a partir de los datos cargados.

## Qué hay en el código

| Área | Evidencia | Grado de avance observado |
|---|---|---|
| Alta y edición de clientes | `src/app/[locale]/(main)/customer-management` con lectura/escritura en Firestore | Implementado en código |
| Dashboard principal | KPIs que leen las colecciones `customers`, `collections` y `employees` de Firestore | Implementado en código |
| RR. HH. | Alta de empleados en Firestore y flujo de IA de predicción de retención (`src/ai/flows/retention-prediction.ts`) | Implementado en código |
| Registro de cobranzas y proyecciones | Formularios que guardan en las colecciones `collections` y `projections` (`financial-analysis/actions.ts`) | Implementado en código |
| Análisis financiero e inteligencia de negocio | Flujos Genkit en `src/ai/flows/financial-analysis.ts` y `business-intelligence.ts` | Implementado en código |
| Generador de cotizaciones | `src/ai/flows/quotation-generator.ts` | Implementado en código |
| Asistente conversacional | `src/ai/flows/main-assistant.ts` con una herramienta que consulta datos de clientes | Implementado en código |
| Gestión de créditos | Página con tablas y gráficos | **Solo interfaz:** los datos están vacíos y no se conectan a Firestore |
| Atención al cliente, documentos, automatización, reportes | Páginas en `src/app/[locale]/(main)/` | Interfaz; conexión a datos no verificada |

La descripción funcional ampliada del proyecto está en [`docs/blueprint.md`](./docs/blueprint.md) y en el README anterior (ver historial). Ambas incluyen funcionalidades planificadas.

## Tecnologías verificadas en `package.json`

Next.js (App Router), React, TypeScript, Tailwind CSS, componentes Radix UI / shadcn, Firebase (Firestore, Auth, Storage), Genkit con Google AI (modelo configurado: `gemini-2.0-flash`), next-intl (español e inglés), React Hook Form + Zod, Recharts.

## Cómo ejecutarlo

> Basado en `package.json` y `src/lib/firebase.ts`. **No fue ejecutado durante esta revisión** y el repositorio no incluye un archivo de ejemplo de variables de entorno.

1. Crear un proyecto propio en Firebase y definir las variables `NEXT_PUBLIC_FIREBASE_API_KEY`, `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`, `NEXT_PUBLIC_FIREBASE_PROJECT_ID`, `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`, `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` y `NEXT_PUBLIC_FIREBASE_APP_ID`.
2. Configurar una clave de API de Google AI para Genkit (requerida por los flujos de IA).
3. Instalar y ejecutar:

```bash
npm install
npm run dev          # aplicación Next.js
npm run genkit:dev   # entorno de desarrollo de Genkit (opcional)
```

## Limitaciones conocidas

- El módulo de créditos y varios dashboards muestran interfaz sin datos reales conectados.
- No hay pruebas automatizadas.
- Los mensajes de commit no describen los cambios, porque son las instrucciones enviadas al asistente.

## Próximos pasos (no implementados)

- Conectar el módulo de créditos a datos de Firestore.
- Agregar un archivo de ejemplo de variables de entorno.
