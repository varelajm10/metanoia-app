
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Heart, PlusCircle } from 'lucide-react';
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Customer {
  id: string;
  legalName: string;
  status: string;
  lastContact: string; // This should be a timestamp in a real app
  value: number;
}

export default function CustomerManagementClient() {
  const t = useTranslations("CustomerManagement");
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch and update this data from Firestore
    // For now, we will just show an empty state.
    setLoading(false);
  }, []);


  const statusVariant = {
    'Activo': 'default',
    'Nuevo': 'secondary',
    'En Riesgo': 'destructive',
  } as const;

  return (
    <div className="space-y-6">
        <div className="flex justify-end mb-4">
          <Button asChild>
            <Link href="/customer-management/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              {t('addNewClient')}
            </Link>
          </Button>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('totalClients')}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">+0 {t('sinceLastMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('retentionRate')}</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0%</div>
                    <p className="text-xs text-muted-foreground">{t('target')}: 95%</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('lifetimeValue')}</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$0</div>
                    <p className="text-xs text-muted-foreground">{t('avgPerClient')}</p>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>{t('recentClients')}</CardTitle>
                <CardDescription>{t('recentClientsSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>{t('tableName')}</TableHead>
                            <TableHead>{t('tableStatus')}</TableHead>
                            <TableHead>{t('tableLastContact')}</TableHead>
                            <TableHead>{t('tableValue')}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                           <TableRow><TableCell colSpan={4} className="h-24 text-center">{tCommon('loading')}</TableCell></TableRow>
                        ) : customers.length === 0 ? (
                           <TableRow><TableCell colSpan={4} className="h-24 text-center">No hay clientes para mostrar.</TableCell></TableRow>
                        ) : (
                          customers.map(customer => (
                             <TableRow key={customer.id} className="hover:bg-muted">
                                <TableCell className="font-medium">{customer.legalName}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[customer.status as keyof typeof statusVariant] || 'default'}>
                                        {customer.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{customer.lastContact}</TableCell>
                                <TableCell>{customer.value}</TableCell>
                            </TableRow>
                          ))
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <AIChatBox />
    </div>
  );
}
