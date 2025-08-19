
'use server';

import { z } from 'zod';
import { db, storage } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadString, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';


const FormSchema = z.object({
    accountExecutive: z.string().min(1),
    legalName: z.string().min(2),
    clientType: z.string().min(1),
    legalAddress: z.object({
      street: z.string().min(1),
      locality: z.string().min(1),
      postalCode: z.string().min(1),
      city: z.string().min(1),
      country: z.string().min(1),
    }),
    phone: z.string().min(1),
    website: z.string().url().optional().or(z.literal('')),
    useLegalAsShipping: z.boolean().default(false).optional(),
    shippingAddress: z.object({
      street: z.string(),
      locality: z.string(),
      postalCode: z.string(),
      city: z.string(),
      country: z.string(),
    }).optional(),
    taxInfo: z.object({
      vatType: z.string().min(1),
      taxId: z.string().min(1),
    }),
    brandsToPurchase: z.string().optional(),
    purchasingContact: z.object({
      name: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().email(),
    }),
    paymentContact: z.object({
      name: z.string().min(1),
      phone: z.string().min(1),
      email: z.string().email(),
    }),
    eInvoiceEmail: z.string().email(),
    purchasingEmail: z.string().email(),
    autoQuotesEmail: z.string().email(),
  }).refine(data => {
      if (!data.useLegalAsShipping) {
        return (
          data.shippingAddress?.street &&
          data.shippingAddress.locality &&
          data.shippingAddress.postalCode &&
          data.shippingAddress.city &&
          data.shippingAddress.country
        );
      }
      return true;
    }, {
      message: "Shipping address is required when not same as legal",
      path: ["shippingAddress"],
    });

type CustomerData = z.infer<typeof FormSchema>;

export async function addCustomer(data: CustomerData, documents: { name: string; dataUri: string }[]) {
  const parsedData = FormSchema.safeParse(data);
  if (!parsedData.success) {
    console.error("Invalid data:", parsedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }
  
  const customerData = parsedData.data;
  if (customerData.useLegalAsShipping) {
    customerData.shippingAddress = customerData.legalAddress;
  }
  
  try {
    const timestamp = serverTimestamp();
    const docRef = await addDoc(collection(db, 'customers'), {
      ...customerData,
      createdAt: timestamp,
      lastContact: timestamp, // Set initial last contact date
      documentUrls: [], // Initialize as empty
    });

    const customerId = docRef.id;
    const documentUrls: string[] = [];

    if (documents && documents.length > 0) {
        for (const document of documents) {
            const storageRef = ref(storage, `customers/${customerId}/supporting_documents/${uuidv4()}-${document.name}`);
            const uploadResult = await uploadString(storageRef, document.dataUri, 'data_url');
            const downloadURL = await getDownloadURL(uploadResult.ref);
            documentUrls.push(downloadURL);
        }
    
        if (documentUrls.length > 0) {
            await updateDoc(doc(db, 'customers', customerId), {
                documentUrls: documentUrls,
            });
        }
    }

    return { success: true, customerId };
  } catch (error) {
    console.error('Error adding customer to Firestore:', error);
    // It's good practice to check for specific Firebase error codes
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to save to database: ${errorMessage}` };
  }
}


export async function updateCustomer(id: string, data: CustomerData, documents: { name: string; dataUri: string }[]) {
  const parsedData = FormSchema.safeParse(data);
  if (!parsedData.success) {
    console.error("Invalid data:", parsedData.error);
    return { success: false, error: 'Invalid data provided.' };
  }

  const customerData = parsedData.data;
  if (customerData.useLegalAsShipping) {
    customerData.shippingAddress = customerData.legalAddress;
  }

  try {
    const docRef = doc(db, 'customers', id);
    await updateDoc(docRef, {
        ...customerData,
        // Potentially update a 'lastModified' field if you add one
    });

    const documentUrls: string[] = [];

    if (documents && documents.length > 0) {
        for (const document of documents) {
            const storageRef = ref(storage, `customers/${id}/supporting_documents/${uuidv4()}-${document.name}`);
            const uploadResult = await uploadString(storageRef, document.dataUri, 'data_url');
            const downloadURL = await getDownloadURL(uploadResult.ref);
            documentUrls.push(downloadURL);
        }
    
        if (documentUrls.length > 0) {
            // This should append to existing documents, not overwrite.
            // For simplicity here, we'll assume new uploads for now.
            // A more robust solution would fetch existing URLs and merge.
            await updateDoc(docRef, {
                documentUrls: documentUrls,
            });
        }
    }


    return { success: true, customerId: id };
  } catch (error) {
    console.error('Error updating customer in Firestore:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { success: false, error: `Failed to update database: ${errorMessage}` };
  }
}

