"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

const statusVariants = {
  active: 'default',
  inactive: 'secondary',
  suspended: 'destructive',
};

export default function ClientList({ clients, onEdit }: { clients: any[], onEdit: (client: any) => void }) {
  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
      <CardHeader>
        <CardTitle>Cartera de Clientes</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Razón Social</TableHead>
              <TableHead>ID Fiscal</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {clients.map(client => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.businessName}</TableCell>
                <TableCell>{client.taxId}</TableCell>
                <TableCell>{client.country}</TableCell>
                <TableCell>
                  <Badge variant={statusVariants[client.status as keyof typeof statusVariants] || 'default'}>
                    {client.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                   <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Abrir menú</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-zinc-900 border-white/10">
                      <DropdownMenuItem onClick={() => onEdit(client)}>
                        Editar Cliente
                      </DropdownMenuItem>
                      <DropdownMenuItem>Ver Estado de Cuenta</DropdownMenuItem>
                      <DropdownMenuItem>Analizar Crédito</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
