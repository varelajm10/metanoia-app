
'use server';
/**
 * @fileOverview Schemas for the Firebase application audit flow.
 * Defines the input structure for the audit and the expected structured output.
 */

import { z } from 'zod';

const ModuleImprovementSchema = z.object({
  moduleName: z.string().describe("The name of the module being analyzed (e.g., 'Firestore Rules', 'Authentication')."),
  diagnosis: z.string().describe("A brief diagnosis of the module's current state."),
  proposedOptimization: z.string().describe("Specific proposed improvements for security, performance, or maintainability."),
  optimizedCode: z.string().optional().describe("A snippet or full content of the optimized code, if applicable."),
});

export const FirebaseAuditInputSchema = z.object({
  firestoreRules: z.string().optional().describe("The full content of the firestore.rules file."),
  firebaseJson: z.string().optional().describe("The full content of the firebase.json file."),
  firestoreStructure: z.string().optional().describe("A JSON string representing the Firestore collection structure."),
  codeSnippets: z.string().optional().describe("Optional code snippets from the frontend or backend (e.g., UI queries, Cloud Functions).")
});
export type FirebaseAuditInput = z.infer<typeof FirebaseAuditInputSchema>;


export const FirebaseAuditOutputSchema = z.object({
  overallDiagnosis: z.string().describe("A high-level executive summary of the application's state, including critical issues."),
  securityLevel: z.number().min(0).max(1).describe("An overall security score from 0 (critically insecure) to 1 (production-ready)."),
  improvements: z.array(ModuleImprovementSchema).describe("A list of detailed improvements for each analyzed module."),
  updatedFiles: z.array(z.object({
    fileName: z.string().describe("The name of the file to be updated (e.g., 'firestore.rules', 'firebase.json')."),
    content: z.string().describe("The full, updated content for the file."),
  })).optional().describe("A list of files with their proposed updated content."),
});
export type FirebaseAuditOutput = z.infer<typeof FirebaseAuditOutputSchema>;
