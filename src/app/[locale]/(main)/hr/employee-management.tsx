
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { NewEmployeeForm } from "./new-employee-form";
import { RetentionAnalysis, Employee } from "./retention-analysis";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Skeleton } from "@/components/ui/skeleton";


export function EmployeeManagement() {
    const t = useTranslations("HR");
    const tCommon = useTranslations("Common");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "employees"), orderBy("hireDate", "desc"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const employeesData: Employee[] = [];
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                employeesData.push({
                    id: doc.id,
                    name: data.fullName,
                    position: data.position,
                    department: data.department,
                    hireDate: data.hireDate.toDate().toISOString(),
                    salary: data.salary,
                    performance: data.performance || 4.0, // Default performance
                });
            });
            setEmployees(employeesData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="space-y-8">
            <NewEmployeeForm />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>{t('employeeList')}</CardTitle>
                        <CardDescription>{t('employeeListSubtitle')}</CardDescription>
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
                                {loading ? (
                                    Array.from({ length: 3 }).map((_, index) => (
                                        <TableRow key={index}>
                                            <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                                            <TableCell><Skeleton className="h-8 w-full" /></TableCell>
                                        </TableRow>
                                    ))
                                ) : employees.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">No hay empleados registrados.</TableCell>
                                    </TableRow>
                                ) : (
                                    employees.map(employee => (
                                        <TableRow 
                                            key={employee.id} 
                                            onClick={() => setSelectedEmployee(employee)}
                                            className="cursor-pointer hover:bg-muted"
                                        >
                                            <TableCell className="font-medium flex items-center gap-2">
                                                <Avatar className="h-8 w-8">
                                                    <AvatarImage data-ai-hint="person" src={`https://placehold.co/40x40.png`} />
                                                    <AvatarFallback>{employee.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                {employee.name}
                                            </TableCell>
                                            <TableCell>{employee.position}</TableCell>
                                            <TableCell>{employee.department}</TableCell>
                                            <TableCell>{new Date(employee.hireDate).toLocaleDateString()}</TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <RetentionAnalysis employee={selectedEmployee} />
            </div>
        </div>
    )
}
