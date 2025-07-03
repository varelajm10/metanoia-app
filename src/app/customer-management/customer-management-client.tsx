"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowLeft } from 'lucide-react';
import ClientList from './client-list';
import ClientForm from './client-form';

const mockClients = [
  { id: '1', businessName: 'Tech Solutions SRL', taxId: '30-12345678-5', country: 'AR', status: 'active' },
  { id: '2', businessName: 'Inversiones Andinas SpA', taxId: '76.543.210-K', country: 'CL', status: 'active' },
  { id: '3', businessName: 'Comercial del Plata SA', taxId: '210987654321', country: 'UY', status: 'inactive' },
  { id: '4', businessName: 'Logística Peruana SAC', taxId: '20123456789', country: 'PE', status: 'active' },
  { id: '5', businessName: 'Global Corp LLC', taxId: '12-3456789', country: 'US', status: 'suspended' },
];


export default function CustomerManagementClient() {
  const [clients, setClients] = useState(mockClients);
  const [selectedClient, setSelectedClient] = useState(null);
  const [view, setView] = useState<'list' | 'add' | 'edit'>('list');

  const handleAddNew = () => {
    setSelectedClient(null);
    setView('add');
  };

  const handleEdit = (client: any) => {
    setSelectedClient(client);
    setView('edit');
  };

  const handleBack = () => {
    setView('list');
    setSelectedClient(null);
  }

  const handleSave = (clientData: any) => {
    // Lógica para guardar (crear o editar)
    console.log('Saving client:', clientData);
    // Aquí iría la lógica de Firestore
    setView('list');
  };

  return (
    <div>
      {view === 'list' && (
        <div className="flex justify-end mb-4">
          <Button onClick={handleAddNew}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nuevo Cliente
          </Button>
        </div>
      )}

      {view !== 'list' && (
         <div className="flex justify-start mb-4">
          <Button onClick={handleBack} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al Listado
          </Button>
        </div>
      )}

      {view === 'list' && <ClientList clients={clients} onEdit={handleEdit} />}
      {view === 'add' && <ClientForm mode="create" onSave={handleSave} onCancel={handleBack} />}
      {view === 'edit' && <ClientForm mode="edit" client={selectedClient} onSave={handleSave} onCancel={handleBack} />}
    </div>
  );
}
