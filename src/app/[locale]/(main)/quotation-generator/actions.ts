
'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { GenerateQuotationInputSchema } from '@/ai/schemas/quotation-schema';

// We can reuse the same Zod schema for validation before saving to the DB.
const QuotationSchema = GenerateQuotationInputSchema.extend({
    totalAmount: z.number(),
    quotationText: z.string(),
});

type QuotationData = z.infer<typeof QuotationSchema>;

export async function saveQuotation(data: QuotationData) {
  const parsedData = QuotationSchema.safeParse(data);

  if (!parsedData.success) {
    console.error("Invalid quotation data:", parsedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }
  
  try {
    const docRef = await addDoc(collection(db, 'quotations'), {
      ...parsedData.data,
      createdAt: serverTimestamp(),
      status: 'generated', // Default status
    });
    
    return { success: true, quotationId: docRef.id };
  } catch (error) {
    console.error('Error adding quotation to Firestore:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to save quotation to database: ${errorMessage}` };
  }
}
