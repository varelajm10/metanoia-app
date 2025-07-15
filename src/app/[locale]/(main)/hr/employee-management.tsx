
"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useTranslations } from "next-intl";
import { NewEmployeeForm } from "./new-employee-form";
import { RetentionAnalysis, Employee } from "./retention-analysis";

const employees: Employee[] = [
    { id: 'emp_001', name: 'Juan Pérez', position: 'Senior Developer', department: 'Tecnología', hireDate: '2021-03-15', salary: 75000, performance: 4.5 },
    { id: 'emp_002', name: 'Ana Gómez', position: 'Marketing Lead', department: 'Marketing', hireDate: '2022-08-01', salary: 62000, performance: 4.8 },
    { id: 'emp_003', name: 'Carlos Sánchez', position: 'Junior Accountant', department: 'Finanzas', hireDate: '2023-11-20', salary: 45000, performance: 3.9 },
    { id: 'emp_004', name: 'Sofía Rodriguez', position: 'Sales Executive', department: 'Ventas', hireDate: '2020-01-10', salary: 85000, performance: 4.2 },
];

export function EmployeeManagement() {
    const t = useTranslations("HR");
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

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
                                {employees.map(employee => (
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
                                        <TableCell>{employee.hireDate}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <RetentionAnalysis employee={selectedEmployee} />
            </div>
        </div>
    )
}
