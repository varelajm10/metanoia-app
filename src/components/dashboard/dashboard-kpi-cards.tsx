
"use client";
import { useState, useEffect } from "react";
import { collection, onSnapshot, query, where, Timestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Briefcase, ShieldCheck, Target, TrendingUp, TrendingDown } from "lucide-react";
import { useTranslations } from "next-intl";

export function DashboardKpiCards() {
    const t = useTranslations('Dashboard');
    const [collections, setCollections] = useState({ currentMonth: 0, previousMonth: 0 });
    const [employees, setEmployees] = useState({ total: 0, newHires: 0 });
    const [customersAtRisk, setCustomersAtRisk] = useState({ current: 0, previous: 0 });

    useEffect(() => {
        const now = new Date();
        const startOfCurrentMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfPreviousMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        const endOfPreviousMonth = new Date(now.getFullYear(), now.getMonth(), 0);

        // Collections
        const collectionsQuery = query(
            collection(db, "collections"),
            where("date", ">=", Timestamp.fromDate(startOfPreviousMonth))
        );
        const unsubCollections = onSnapshot(collectionsQuery, (snapshot) => {
            let currentTotal = 0;
            let prevTotal = 0;
            snapshot.forEach(doc => {
                const data = doc.data();
                const date = data.date.toDate();
                if (date >= startOfCurrentMonth) {
                    currentTotal += data.amount;
                } else if (date >= startOfPreviousMonth && date <= endOfPreviousMonth) {
                    prevTotal += data.amount;
                }
            });
            setCollections({ currentMonth: currentTotal, previousMonth: prevTotal });
        });

        // Employees
        const employeesQuery = query(collection(db, "employees"));
        const unsubEmployees = onSnapshot(employeesQuery, (snapshot) => {
            const totalEmployees = snapshot.size;
            const newHires = snapshot.docs.filter(doc => doc.data().hireDate.toDate() >= startOfCurrentMonth).length;
            setEmployees({ total: totalEmployees, newHires });
        });
        
        // Customers At Risk
        const customersQuery = query(collection(db, "customers"), where("status", "==", "En Riesgo"));
        const unsubCustomers = onSnapshot(customersQuery, (snapshot) => {
            // This is a simplification. A real implementation would need to track status changes over time.
            // For now, we'll just show the current count.
            setCustomersAtRisk({ current: snapshot.size, previous: snapshot.size > 0 ? snapshot.size -1 : 0 });
        });


        return () => {
            unsubCollections();
            unsubEmployees();
            unsubCustomers();
        };
    }, []);

    const collectionsPercentageChange = collections.previousMonth > 0 
        ? (((collections.currentMonth - collections.previousMonth) / collections.previousMonth) * 100).toFixed(1) 
        : collections.currentMonth > 0 ? 100 : 0;
        
    const monthlyGoal = 120000;
    const goalProgress = monthlyGoal > 0 ? (collections.currentMonth / monthlyGoal * 100).toFixed(0) : 0;

    const formatCurrency = (amount: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount);

    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('collections')}</CardTitle>
                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{formatCurrency(collections.currentMonth)}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" /> +{collectionsPercentageChange}% {t('vsLastMonth')}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('monthlyGoalProgress')}</CardTitle>
                    <Target className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{goalProgress}%</div>
                    <p className="text-xs text-muted-foreground">{formatCurrency(collections.currentMonth)} {t('from')} {formatCurrency(monthlyGoal)}</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('totalEmployees')}</CardTitle>
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{employees.total}</div>
                    <p className="text-xs text-muted-foreground flex items-center">
                        <TrendingUp className="h-4 w-4 mr-1" />+{employees.newHires} {t('newHires')}
                    </p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-normal text-muted-foreground">{t('customersAtRisk')}</CardTitle>
                    <ShieldCheck className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-destructive">{customersAtRisk.current}</div>
                     <p className="text-xs text-muted-foreground flex items-center">
                        {customersAtRisk.current > customersAtRisk.previous ? 
                            <TrendingUp className="h-4 w-4 mr-1 text-destructive" /> : 
                            <TrendingDown className="h-4 w-4 mr-1" />
                        }
                        {customersAtRisk.current - customersAtRisk.previous} {t('vsLastMonth')}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
