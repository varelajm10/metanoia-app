
"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { predictRetention, RetentionPredictionOutput } from "@/ai/flows/retention-prediction";
import { BrainCircuit, Loader2 } from "lucide-react";

export interface Employee {
    id: string;
    name: string;
    position: string;
    department: string;
    hireDate: string; // ISO Date
    salary: number;
    performance: number; // Score out of 5
}

interface RetentionAnalysisProps {
    employee: Employee | null;
}

export function RetentionAnalysis({ employee }: RetentionAnalysisProps) {
    const t = useTranslations("HR");
    const [analysis, setAnalysis] = useState<RetentionPredictionOutput | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (employee) {
            const getAnalysis = async () => {
                setIsLoading(true);
                setError(null);
                setAnalysis(null);
                try {
                    const result = await predictRetention(employee);
                    setAnalysis(result);
                } catch (err) {
                    setError(t('errorGeneratingAnalysis'));
                } finally {
                    setIsLoading(false);
                }
            };
            getAnalysis();
        }
    }, [employee, t]);

    const riskLevelColor = {
        Bajo: "text-green-400",
        Medio: "text-yellow-400",
        Alto: "text-red-400",
    };

    return (
        <Card className="sticky top-20">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="text-primary"/>
                    {t('retentionAnalysisTitle')}
                </CardTitle>
                <CardDescription>{t('retentionAnalysisSubtitle')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 min-h-[200px]">
                {!employee ? (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                        <p>{t('selectEmployee')}</p>
                    </div>
                ) : isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <Loader2 className="h-8 w-8 animate-spin text-primary"/>
                    </div>
                ) : error ? (
                    <div className="text-destructive-foreground bg-destructive/80 p-3 rounded-md">
                        {error}
                    </div>
                ) : analysis && (
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold">{t('riskLevel')}</h4>
                            <p className={riskLevelColor[analysis.riskLevel as keyof typeof riskLevelColor] || 'text-foreground'}>
                                {analysis.riskLevel}
                            </p>
                        </div>
                         <div>
                            <h4 className="font-semibold">{t('keyFactors')}</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap">{analysis.keyFactors}</p>
                        </div>
                         <div>
                            <h4 className="font-semibold">{t('recommendations')}</h4>
                            <p className="text-muted-foreground whitespace-pre-wrap">{analysis.recommendations}</p>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
