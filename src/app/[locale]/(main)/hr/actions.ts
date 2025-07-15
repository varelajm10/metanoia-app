'use server';

import { z } from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const EmployeeSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  position: z.string().min(2, "Position is required"),
  department: z.string().min(1, "Department is required"),
  hireDate: z.string(), // ISO string from the client
  salary: z.coerce.number().positive("Salary must be a positive number"),
});

type EmployeeData = z.infer<typeof EmployeeSchema>;

export async function addEmployee(data: EmployeeData, documents: { name: string; dataUri: string }[]) {
  const parsedData = EmployeeSchema.safeParse(data);
  if (!parsedData.success) {
    console.error("Invalid employee data:", parsedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }

  const { hireDate, ...employeeData } = parsedData.data;

  try {
    const docRef = await addDoc(collection(db, 'employees'), {
      ...employeeData,
      hireDate: new Date(hireDate),
      createdAt: serverTimestamp(),
      documentUrls: [],
    });

    const employeeId = docRef.id;
    const documentUrls: string[] = [];

    if (documents && documents.length > 0) {
      for (const document of documents) {
        const storageRef = ref(storage, `employees/${employeeId}/documents/${uuidv4()}-${document.name}`);
        const uploadResult = await uploadString(storageRef, document.dataUri, 'data_url');
        const downloadURL = await getDownloadURL(uploadResult.ref);
        documentUrls.push(downloadURL);
      }

      if (documentUrls.length > 0) {
        await updateDoc(doc(db, 'employees', employeeId), {
          documentUrls: documentUrls,
        });
      }
    }

    return { success: true, employeeId };
  } catch (error) {
    console.error('Error adding employee to Firestore:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to save employee: ${errorMessage}` };
  }
}
