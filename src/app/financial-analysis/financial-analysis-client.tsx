"use client";
import { useState } from "react";
import { financialAnalysis, FinancialAnalysisOutput } from "@/ai/flows/financial-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, FileText, Scale, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

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
    <div className="container mx-auto px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mx-auto max-w-3xl text-center"
      >
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 !leading-tight text-glow">
          Análisis Financiero con IA
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Ingresa tus datos financieros en texto plano. Nuestra IA generará automáticamente balances y reportes para un análisis rápido y preciso.
        </p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="mx-auto mt-12 max-w-4xl"
      >
        <form onSubmit={handleSubmit}>
          <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-primary"/>
                Ingresar Datos Financieros
              </CardTitle>
              <CardDescription>
                Pega aquí tus datos financieros en texto plano: ingresos, egresos, activos, pasivos, etc.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Ejemplo:
Ingresos Enero: $50,000
Costos de Ventas Enero: $20,000
Gastos Operativos Enero: $15,000
..."
                value={financialData}
                onChange={(e) => setFinancialData(e.target.value)}
                rows={10}
                className="bg-black/20 border-white/10 focus:ring-primary resize-none font-mono text-sm"
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading || !financialData.trim()} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analizando...
                  </>
                ) : (
                  <>
                    Generar Análisis <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </form>

        {error && <p className="mt-6 text-center text-red-400 bg-red-500/10 p-3 rounded-lg">{error}</p>}

        {isLoading && !result && (
             <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-10 text-center"
            >
                <div className="flex justify-center items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="text-muted-foreground">Procesando números y generando reportes...</p>
                </div>
            </motion.div>
        )}

        {result && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="mt-12 grid gap-8 md:grid-cols-2"
          >
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center gap-3">
                 <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <Scale className="h-6 w-6 text-primary" />
                 </div>
                <CardTitle className="text-2xl font-semibold">Balances Generados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-base text-muted-foreground leading-relaxed">{result.balances}</p>
              </CardContent>
            </Card>
            <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
              <CardHeader className="flex flex-row items-center gap-3">
                 <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                    <FileText className="h-6 w-6 text-accent" />
                 </div>
                <CardTitle className="text-2xl font-semibold">Reportes Generados</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap text-base text-muted-foreground leading-relaxed">{result.reports}</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}