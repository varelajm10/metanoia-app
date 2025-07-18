
'use server';
/**
 * @fileOverview Firebase application audit AI agent.
 *
 * - auditFirebaseApp: Analyzes Firebase configuration and code to identify issues and propose improvements.
 */

import { ai } from '@/ai/genkit';
import { FirebaseAuditInput, FirebaseAuditInputSchema, FirebaseAuditOutput, FirebaseAuditOutputSchema } from '@/ai/schemas/firebase-audit-schema';

export async function auditFirebaseApp(input: FirebaseAuditInput): Promise<FirebaseAuditOutput> {
  return firebaseAuditFlow(input);
}

const prompt = ai.definePrompt({
  name: 'firebaseAuditPrompt',
  input: { schema: FirebaseAuditInputSchema },
  output: { schema: FirebaseAuditOutputSchema },
  config: {
    model: 'googleai/gemini-pro',
    temperature: 0.2,
  },
  prompt: `Actúa como un arquitecto senior de Firebase y experto en seguridad. Tu tarea es auditar la configuración de una aplicación Firebase basada en los archivos y datos proporcionados. Sé riguroso, técnico y accionable.

**Contexto de la Auditoría:**
La aplicación es Metanoia.click, una plataforma SaaS B2B con múltiples módulos. El objetivo es asegurar que esté lista para producción.

**Análisis a Realizar:**

1.  **Diagnóstico General:** Proporciona un resumen ejecutivo. ¿Cuál es el estado general? ¿Hay vulnerabilidades críticas?
2.  **Nivel de Seguridad:** Basado en tu análisis (especialmente de las reglas de Firestore), asigna un puntaje de 0 a 1.
    -   `0.0 - 0.3`: Críticamente inseguro (reglas abiertas, `allow read, write: if true;`).
    -   `0.4 - 0.6`: Parcialmente seguro (requiere autenticación pero sin validación de datos o roles).
    -   `0.7 - 0.9`: Seguro (requiere autenticación, validación de datos, defensivo).
    -   `1.0`: Ideal (reglas granulares por rol, validación estricta, listo para producción).
3.  **Mejoras por Módulo:**
    -   **Firestore Rules:** Revisa la seguridad. ¿Son las reglas demasiado permisivas? ¿Faltan validaciones (`request.resource.data`)? ¿Protegen contra escritura/lectura no autorizada? Genera reglas optimizadas y seguras (denegar por defecto, abrir por colección).
    -   **firebase.json:** ¿Está configurado correctamente para desplegar reglas e índices?
    -   **Estructura Firestore:** ¿Es escalable? ¿Hay "code smells" como anidamiento excesivo o fan-out innecesario?
    -   **Código General:** Si se proveen snippets, ¿realizan queries seguras y performantes? ¿Manejan bien los errores de permisos?
4.  **Archivos Actualizados:** Proporciona el contenido completo de los archivos que necesitan ser corregidos, como `firestore.rules` o un nuevo `firestore.indexes.json` si es necesario.

**Input del Usuario:**
-   **firestore.rules:**
\`\`\`
{{{firestoreRules}}}
\`\`\`
-   **firebase.json:**
\`\`\`json
{{{firebaseJson}}}
\`\`\`
-   **Estructura Firestore:**
\`\`\`json
{{{firestoreStructure}}}
\`\`\`
-   **Fragmentos de Código Adicionales:**
\`\`\`
{{{codeSnippets}}}
\`\`\`

Realiza el análisis ahora y devuelve el output en el formato JSON estructurado solicitado.
`,
});

const firebaseAuditFlow = ai.defineFlow(
  {
    name: 'firebaseAuditFlow',
    inputSchema: FirebaseAuditInputSchema,
    outputSchema: FirebaseAuditOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
