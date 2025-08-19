
"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useTranslations } from 'next-intl';
import { NewCustomerForm } from '../new/new-customer-form';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditCustomerPage() {
  const t = useTranslations("NewCustomerForm");
  const params = useParams();
  const id = params.id as string;
  const [customer, setCustomer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const docRef = doc(db, 'customers', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCustomer({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError('No se encontró el cliente.');
        }
      } catch (err) {
        setError('Error al cargar los datos del cliente.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id]);

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{customer?.legalName || t('title')}</h2>
          <p className="text-muted-foreground">{customer ? `Editando cliente: ${customer.legalName}` : t('subtitle')}</p>
        </div>
      </div>
      {loading && (
        <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-48 w-full" />
        </div>
      )}
      {error && <p className="text-destructive">{error}</p>}
      {!loading && customer && <NewCustomerForm customer={customer} />}
    </div>
  );
}
