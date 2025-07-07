
"use client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users, TrendingUp, Heart, PlusCircle } from 'lucide-react';
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const recentCustomers = [
    { name: 'Tech Solutions Inc.', status: 'Active', lastContact: '2024-05-20', value: '$50,000' },
    { name: 'Innovate Corp.', status: 'New', lastContact: '2024-05-22', value: '$75,000' },
    { name: 'Global Enterprises', status: 'At Risk', lastContact: '2024-04-15', value: '$120,000' },
    { name: 'Future Systems Ltd.', status: 'Active', lastContact: '2024-05-18', value: '$30,000' },
];

export default function CustomerManagementClient() {
  const t = useTranslations("CustomerManagement");

  const statusVariant = {
    'Active': 'default',
    'New': 'secondary',
    'At Risk': 'destructive',
  } as const;

  const getStatusTranslation = (status: 'Active' | 'New' | 'At Risk') => {
    const key = `status${status.replace(' ', '')}` as 'statusActive' | 'statusNew' | 'statusAtRisk';
    return t(key);
  }

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
                    <div className="text-2xl font-bold">1,254</div>
                    <p className="text-xs text-muted-foreground">+20 {t('sinceLastMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('retentionRate')}</CardTitle>
                    <Heart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">95.2%</div>
                    <p className="text-xs text-muted-foreground">{t('target')}: 95%</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('lifetimeValue')}</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">$8,430</div>
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
                        {recentCustomers.map(customer => (
                             <TableRow key={customer.name}>
                                <TableCell className="font-medium">{customer.name}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant[customer.status as keyof typeof statusVariant] || 'default'}>
                                        {getStatusTranslation(customer.status as keyof typeof statusVariant)}
                                    </Badge>
                                </TableCell>
                                <TableCell>{customer.lastContact}</TableCell>
                                <TableCell>{customer.value}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
        <AIChatBox />
    </div>
  );
}
