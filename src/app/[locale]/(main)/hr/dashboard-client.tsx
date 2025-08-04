
"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts';
import { Users, Briefcase, Clock, Star } from "lucide-react";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";

interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    date: string;
}

export default function HRDashboardClient() {
  const t = useTranslations("HR");
  const [kpis, setKpis] = useState({ total: 0, avgSalary: 0, avgTenure: 0, avgPerformance: 0 });
  const [newHires, setNewHires] = useState<Employee[]>([]);
  const [departmentData, setDepartmentData] = useState<any[]>([]);

  useEffect(() => {
    const employeesQuery = query(collection(db, "employees"));
    const unsubEmployees = onSnapshot(employeesQuery, (snapshot) => {
        const employees = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const total = employees.length;

        if (total > 0) {
            const totalSalary = employees.reduce((acc, emp) => acc + (emp.salary || 0), 0);
            const totalTenure = employees.reduce((acc, emp) => {
                const tenure = (new Date().getTime() - emp.hireDate.toDate().getTime()) / (1000 * 60 * 60 * 24 * 365.25);
                return acc + tenure;
            }, 0);
            const totalPerformance = employees.reduce((acc, emp) => acc + (emp.performance || 0), 0);
            
            setKpis({
                total: total,
                avgSalary: totalSalary / total,
                avgTenure: totalTenure / total,
                avgPerformance: totalPerformance / total,
            });

            // Department Distribution
            const deptCounts: { [key: string]: number } = {};
            employees.forEach(emp => {
                deptCounts[emp.department] = (deptCounts[emp.department] || 0) + 1;
            });
            const deptData = Object.keys(deptCounts).map(key => ({ name: key, count: deptCounts[key] }));
            setDepartmentData(deptData);
        }
    });

    const newHiresQuery = query(collection(db, "employees"), orderBy("hireDate", "desc"), limit(5));
    const unsubNewHires = onSnapshot(newHiresQuery, (snapshot) => {
        const hires = snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.fullName,
                position: data.position,
                department: data.department,
                date: data.hireDate.toDate().toLocaleDateString(),
            };
        });
        setNewHires(hires);
    });

    return () => {
        unsubEmployees();
        unsubNewHires();
    }
  }, []);

  const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('totalHeadcount')}</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpis.total}</div>
                    <p className="text-xs text-muted-foreground">+0 {t('vsPreviousMonth')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('avgSalary')}</CardTitle>
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{formatCurrency(kpis.avgSalary)}</div>
                    <p className="text-xs text-muted-foreground">{t('monthlyAvg')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('avgTenure')}</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpis.avgTenure.toFixed(1)} {t('years')}</div>
                    <p className="text-xs text-muted-foreground">{t('companyWide')}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{t('avgPerformance')}</CardTitle>
                    <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{kpis.avgPerformance.toFixed(1)}/5</div>
                    <p className="text-xs text-muted-foreground">{t('lastReviewCycle')}</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
            <Card className="lg:col-span-3">
                <CardHeader>
                    <CardTitle>{t('newHires')}</CardTitle>
                    <CardDescription>{t('newHiresSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>{t('tableName')}</TableHead>
                                <TableHead>{t('tablePosition')}</TableHead>
                                <TableHead>{t('tableDepartment')}</TableHead>
                                <TableHead>{t('tableHireDate')}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {newHires.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">No hay nuevos ingresos.</TableCell>
                                </TableRow>
                            ) : (
                                newHires.map(hire => (
                                    <TableRow key={hire.id} className="hover:bg-muted">
                                        <TableCell className="font-medium flex items-center gap-2">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage data-ai-hint="person" src={`https://placehold.co/40x40.png`} />
                                                <AvatarFallback>{hire.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            {hire.name}
                                        </TableCell>
                                        <TableCell>{hire.position}</TableCell>
                                        <TableCell>{hire.department}</TableCell>
                                        <TableCell>{hire.date}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>{t('distributionByDepartment')}</CardTitle>
                    <CardDescription>{t('distributionByDepartmentSubtitle')}</CardDescription>
                </CardHeader>
                <CardContent className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={departmentData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} angle={-45} textAnchor="end" height={50} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <Tooltip cursor={{ fill: 'hsl(var(--primary) / 0.1)' }} contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', borderRadius: 'var(--radius)' }}/>
                            <Bar dataKey="count" name="Empleados" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
        <AIChatBox dashboardContext={t('dashboardTab')} />
    </div>
  );
}
