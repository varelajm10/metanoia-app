"use client";
import { useState } from "react";
import { financialAnalysis, FinancialAnalysisOutput } from "@/ai/flows/financial-analysis";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, FileText, Scale, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";
import { CollectionsForm } from "./collections-form";
import { ProjectionsForm } from "./projections-form";

function AIAnalysis() {
  const t = useTranslations("FinancialAnalysis");
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
      setError(t('error'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <form onSubmit={handleSubmit}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary"/>
              {t('enterFinancialData')}
            </CardTitle>
            <CardDescription>
              {t('enterFinancialDataSubtitle')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={t('placeholder')}
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
                  {t('analyzing')}
                </>
              ) : (
                <>
                  {t('generateAnalysis')} <ArrowRight className="ml-2 h-5 w-5" />
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
                  <p className="text-muted-foreground">{t('processing')}</p>
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
              <CardTitle className="text-2xl font-semibold">{t('generatedBalances')}</CardTitle>
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
              <CardTitle className="text-2xl font-semibold">{t('generatedReports')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base text-muted-foreground leading-relaxed">{result.reports}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  )
}


export default function FinancialAnalysisClient() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="space-y-8"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <CollectionsForm />
        <ProjectionsForm />
      </div>
      
      <AIAnalysis />

      <AIChatBox />
    </motion.div>
  );
}
