
"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, CalendarClock, CheckCircle, Clock, Edit, FileText, PlusCircle, Send, Trash2, XCircle } from "lucide-react";
import { useTranslations } from "next-intl";

const myReports: any[] = [];
const scheduledReports: any[] = [];
const reportAnalyticsData: any[] = [];

export default function ReportsClient() {
  const t = useTranslations('Reporting');
  
  const statusVariant = {
    'Activo': 'default',
    'Inactivo': 'secondary',
  } as const;

  return (
    <Tabs defaultValue="my-reports" className="space-y-4">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="my-reports"><FileText className="mr-2 h-4 w-4" /> {t('myReports')}</TabsTrigger>
        <TabsTrigger value="scheduled"><CalendarClock className="mr-2 h-4 w-4" /> {t('scheduled')}</TabsTrigger>
        <TabsTrigger value="analytics"><BarChart3 className="mr-2 h-4 w-4" /> {t('analytics')}</TabsTrigger>
      </TabsList>

      <TabsContent value="my-reports">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>{t('myReportsTitle')}</CardTitle>
                <CardDescription>{t('myReportsSubtitle')}</CardDescription>
            </div>
            <Button><PlusCircle className="mr-2 h-4 w-4"/> {t('createReport')}</Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('tableName')}</TableHead>
                  <TableHead>{t('tableCategory')}</TableHead>
                  <TableHead>{t('tableLastExecuted')}</TableHead>
                  <TableHead>{t('tableFormat')}</TableHead>
                  <TableHead className="text-right">{t('tableActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {myReports.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">No hay reportes creados.</TableCell>
                    </TableRow>
                ) : (
                    myReports.map((report) => (
                      <TableRow key={report.id} className="hover:bg-muted">
                        <TableCell className="font-medium">{report.name}</TableCell>
                        <TableCell><Badge variant="outline">{report.category}</Badge></TableCell>
                        <TableCell>{report.lastExecuted}</TableCell>
                        <TableCell>{report.format}</TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button variant="outline" size="sm"><Send className="mr-2 h-4 w-4"/> {t('actionExecute')}</Button>
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>
      
      <TabsContent value="scheduled">
        <Card>
           <CardHeader>
                <CardTitle>{t('scheduledReportsTitle')}</CardTitle>
                <CardDescription>{t('scheduledReportsSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('tableReport')}</TableHead>
                  <TableHead>{t('tableFrequency')}</TableHead>
                  <TableHead>{t('tableNextExecution')}</TableHead>
                  <TableHead>{t('tableRecipients')}</TableHead>
                  <TableHead>{t('tableStatus')}</TableHead>
                  <TableHead className="text-right">{t('tableActions')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scheduledReports.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">No hay reportes programados.</TableCell>
                    </TableRow>
                ) : (
                    scheduledReports.map((schedule) => (
                      <TableRow key={schedule.id} className="hover:bg-muted">
                        <TableCell className="font-medium">{schedule.reportName}</TableCell>
                        <TableCell>{schedule.frequency}</TableCell>
                        <TableCell>{schedule.nextExecution}</TableCell>
                        <TableCell className="font-mono text-xs">{schedule.recipients}</TableCell>
                         <TableCell>
                             <Badge variant={statusVariant[schedule.status as keyof typeof statusVariant] || 'default'}>
                                {schedule.status}
                             </Badge>
                         </TableCell>
                        <TableCell className="text-right space-x-2">
                            <Button variant="ghost" size="icon"><Edit className="h-4 w-4"/></Button>
                            <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4"/></Button>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

       <TabsContent value="analytics">
        <div className="grid gap-6 md:grid-cols-3">
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('generatedReportsMonth')}</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0</div>
                    <p className="text-xs text-muted-foreground">+0% {t('vsPreviousMonth')}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('successfulDeliveryRate')}</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0%</div>
                    <p className="text-xs text-muted-foreground">{t('emailsAndWebhooks')}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('avgExecutionTime')}</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">0s</div>
                    <p className="text-xs text-muted-foreground">-0s {t('vsPreviousMonth')}</p>
                </CardContent>
            </Card>
        </div>
        <Card className="mt-6">
            <CardHeader>
                <CardTitle>{t('reportExecutionsByMonth')}</CardTitle>
                <CardDescription>{t('reportExecutionsByMonthSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] w-full">
                <ResponsiveContainer>
                    <BarChart data={reportAnalyticsData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                        <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                        <Bar dataKey="executions" name={t('executions')} fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}
