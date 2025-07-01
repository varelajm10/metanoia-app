"use client";
import { useState } from "react";
import { financialAnalysis, FinancialAnalysisOutput } from "@/ai/flows/financial-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, FileText, Scale } from "lucide-react";

export default function FinancialAnalysisClient() {
  const [financialData, setFinancialData] = useState("");
  const [result, setResult] = useState<FinancialAnalysisOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await financialAnalysis({ financialData });
      setResult(output);
    } catch (err) {
      setError("Ocurrió un error al analizar los datos. Por favor, inténtalo de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Análisis Financiero con IA</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ingresa tus datos financieros en texto plano. Nuestra IA generará automáticamente balances y reportes para un análisis rápido y preciso.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Datos Financieros</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Pega aquí tus datos financieros, por ejemplo: ingresos, egresos, activos, pasivos..."
                value={financialData}
                onChange={(e) => setFinancialData(e.target.value)}
                rows={10}
                className="resize-none"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !financialData.trim()} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  "Generar Análisis"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {result && (
          <div className="mt-10 grid gap-8 md:grid-cols-2">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Scale className="h-6 w-6 text-accent" />
                <CardTitle>Balances Generados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{result.balances}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <FileText className="h-6 w-6 text-accent" />
                <CardTitle>Reportes Generados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{result.reports}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
