
'use server';
/**
 * @fileOverview A Genkit tool for fetching real-time customer data from Firestore.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';

const CustomerDataSchema = z.object({
    totalCustomers: z.number().describe('The total number of customers.'),
    retentionRate: z.number().describe('The customer retention rate as a percentage.'),
    lifetimeValue: z.number().describe('The total lifetime value (LTV) of all customers.'),
});

export const getCustomerDataTool = ai.defineTool(
    {
        name: 'getCustomerData',
        description: 'Get real-time metrics about the customer base from the Firestore database.',
        outputSchema: CustomerDataSchema,
    },
    async () => {
        const customersRef = collection(db, 'customers');
        const snapshot = await getDocs(customersRef);

        if (snapshot.empty) {
            return { totalCustomers: 0, retentionRate: 0, lifetimeValue: 0 };
        }

        const customers = snapshot.docs.map(doc => doc.data());
        const totalCustomers = customers.length;
        
        const activeCustomers = customers.filter(c => c.status !== 'En Riesgo' && c.status !== 'Inactivo').length;
        const retentionRate = totalCustomers > 0 ? (activeCustomers / totalCustomers) * 100 : 0;

        const lifetimeValue = customers.reduce((acc, c) => acc + (c.value || 0), 0);
        
        return {
            totalCustomers,
            retentionRate: parseFloat(retentionRate.toFixed(1)),
            lifetimeValue,
        };
    }
);
