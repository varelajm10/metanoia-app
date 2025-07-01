"use client";
import { useState } from "react";
import { generateBusinessIntelligence, BusinessIntelligenceOutput } from "@/ai/flows/business-intelligence";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Lightbulb, BarChartBig } from "lucide-react";

export default function BusinessIntelligenceClient() {
  const [formData, setFormData] = useState({
    financialData: "",
    marketTrends: "",
    customerData: "",
  });
  const [result, setResult] = useState<BusinessIntelligenceOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const output = await generateBusinessIntelligence(formData);
      setResult(output);
    } catch (err) {
      setError("Ocurrió un error al generar el dashboard. Por favor, inténtalo de nuevo.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.financialData.trim() && formData.marketTrends.trim() && formData.customerData.trim();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Business Intelligence con IA</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Combina datos financieros, de mercado y de clientes para obtener un resumen ejecutivo y recomendaciones accionables generadas por IA.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-4xl">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Fuentes de Datos</CardTitle>
              <CardDescription>Proporciona la información para cada categoría.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="financialData" className="font-medium">Datos Financieros</label>
                <Textarea
                  id="financialData"
                  name="financialData"
                  placeholder="Ej: Reportes de ventas, P&L, flujo de caja..."
                  value={formData.financialData}
                  onChange={handleInputChange}
                  rows={6}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="marketTrends" className="font-medium">Tendencias de Mercado</label>
                <Textarea
                  id="marketTrends"
                  name="marketTrends"
                  placeholder="Ej: Análisis de competidores, noticias del sector, informes de mercado..."
                  value={formData.marketTrends}
                  onChange={handleInputChange}
                  rows={6}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="customerData" className="font-medium">Datos de Clientes</label>
                <Textarea
                  id="customerData"
                  name="customerData"
                  placeholder="Ej: Encuestas de satisfacción, feedback de soporte, datos demográficos..."
                  value={formData.customerData}
                  onChange={handleInputChange}
                  rows={6}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading || !isFormValid} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando Insights...
                  </>
                ) : (
                  "Generar Dashboard"
                )}
              </Button>
            </CardContent>
          </Card>
        </form>

        {error && <p className="mt-4 text-center text-red-500">{error}</p>}

        {result && (
          <div className="mt-10 grid gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <BarChartBig className="h-6 w-6 text-accent" />
                <CardTitle>Dashboard Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{result.dashboardSummary}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-2">
                <Lightbulb className="h-6 w-6 text-accent" />
                <CardTitle>Recomendaciones Accionables</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-sm">{result.recommendations}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
