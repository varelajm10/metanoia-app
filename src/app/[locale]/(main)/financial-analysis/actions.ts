'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

// Schema for data received from the client (date as string)
const clientCollectionSchema = z.object({
  country: z.string().min(1),
  amount: z.number().positive(),
  date: z.string(), // Date is passed as an ISO string
});

// Schema for data received from the client (date as string)
const clientProjectionSchema = z.object({
  analystName: z.string().min(2),
  projectedAmount: z.number().positive(),
  weekOf: z.string(), // Date is passed as an ISO string
});

export async function addCollectionEntry(data: z.infer<typeof clientCollectionSchema>) {
  const parsedData = clientCollectionSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, error: 'Invalid data' };
  }

  const dateObject = new Date(parsedData.data.date);

  try {
    await addDoc(collection(db, 'collections'), {
      country: parsedData.data.country,
      amount: parsedData.data.amount,
      date: Timestamp.fromDate(dateObject),
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding collection entry to Firestore:', error);
    return { success: false, error: 'Failed to save to database' };
  }
}

export async function addProjectionEntry(data: z.infer<typeof clientProjectionSchema>) {
    const parsedData = clientProjectionSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, error: 'Invalid data' };
    }
  
    const dateObject = new Date(parsedData.data.weekOf);

    try {
      await addDoc(collection(db, 'projections'), {
        analystName: parsedData.data.analystName,
        projectedAmount: parsedData.data.projectedAmount,
        weekOf: Timestamp.fromDate(dateObject),
        createdAt: Timestamp.now(),
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding projection entry to Firestore:', error);
      return { success: false, error: 'Failed to save to database' };
    }
  }
