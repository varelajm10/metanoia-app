'use server';

import { z } from 'zod';
import { db } from '@/lib/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const collectionSchema = z.object({
  country: z.string().min(1),
  amount: z.number().positive(),
  date: z.date(),
});

const projectionSchema = z.object({
  analystName: z.string().min(2),
  projectedAmount: z.number().positive(),
  weekOf: z.date(),
});

export async function addCollectionEntry(data: z.infer<typeof collectionSchema>) {
  const parsedData = collectionSchema.safeParse(data);
  if (!parsedData.success) {
    return { success: false, error: 'Invalid data' };
  }

  try {
    await addDoc(collection(db, 'collections'), {
      ...parsedData.data,
      date: Timestamp.fromDate(parsedData.data.date),
      createdAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error adding collection entry to Firestore:', error);
    return { success: false, error: 'Failed to save to database' };
  }
}

export async function addProjectionEntry(data: z.infer<typeof projectionSchema>) {
    const parsedData = projectionSchema.safeParse(data);
    if (!parsedData.success) {
      return { success: false, error: 'Invalid data' };
    }
  
    try {
      await addDoc(collection(db, 'projections'), {
        ...parsedData.data,
        weekOf: Timestamp.fromDate(parsedData.data.weekOf),
        createdAt: Timestamp.now(),
      });
      return { success: true };
    } catch (error) {
      console.error('Error adding projection entry to Firestore:', error);
      return { success: false, error: 'Failed to save to database' };
    }
  }