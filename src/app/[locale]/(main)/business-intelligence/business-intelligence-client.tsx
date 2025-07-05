
"use client";
import { useState } from "react";
import { generateBusinessIntelligence, BusinessIntelligenceOutput } from "@/ai/flows/business-intelligence";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Lightbulb, BarChartBig, ArrowRight, BookOpen, TrendingUp, Users } from "lucide-react";
import { motion } from "framer-motion";
import { AIChatBox } from "@/components/ai-chat-box";
import { useTranslations } from "next-intl";

export default function BusinessIntelligenceClient() {
  const t = useTranslations("BusinessIntelligence");

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
      setError(t('error'));
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const isFormValid = formData.financialData.trim() && formData.marketTrends.trim() && formData.customerData.trim();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
      className="mx-auto max-w-4xl"
    >
      <form onSubmit={handleSubmit}>
        <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold">{t('dataSources')}</CardTitle>
            <CardDescription>{t('dataSourcesSubtitle')}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="financialData" className="font-medium flex items-center gap-2 text-muted-foreground">
                <TrendingUp className="h-5 w-5 text-accent"/>
                {t('financialData')}
              </label>
              <Textarea
                id="financialData"
                name="financialData"
                placeholder={t('financialDataPlaceholder')}
                value={formData.financialData}
                onChange={handleInputChange}
                rows={6}
                disabled={isLoading}
                className="bg-black/20 border-white/10 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="marketTrends" className="font-medium flex items-center gap-2 text-muted-foreground">
                <BookOpen className="h-5 w-5 text-accent"/>
                {t('marketTrends')}
              </label>
              <Textarea
                id="marketTrends"
                name="marketTrends"
                placeholder={t('marketTrendsPlaceholder')}
                value={formData.marketTrends}
                onChange={handleInputChange}
                rows={6}
                disabled={isLoading}
                 className="bg-black/20 border-white/10 focus:ring-primary"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="customerData" className="font-medium flex items-center gap-2 text-muted-foreground">
                <Users className="h-5 w-5 text-accent"/>
                {t('customerData')}
              </label>
              <Textarea
                id="customerData"
                name="customerData"
                placeholder={t('customerDataPlaceholder')}
                value={formData.customerData}
                onChange={handleInputChange}
                rows={6}
                disabled={isLoading}
                className="bg-black/20 border-white/10 focus:ring-primary"
              />
            </div>
            <Button type="submit" disabled={isLoading || !isFormValid} size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-base font-semibold shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-105">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('generatingInsights')}
                </>
              ) : (
                <>
                  {t('generateDashboard')} <ArrowRight className="ml-2 h-5 w-5" />
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
                  <p className="text-muted-foreground">{t('analyzing')}</p>
              </div>
          </motion.div>
      )}

      {result && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="mt-12 grid gap-8"
        >
          <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                <BarChartBig className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl font-semibold">{t('dashboardSummary')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base text-muted-foreground leading-relaxed">{result.dashboardSummary}</p>
            </CardContent>
          </Card>
          <Card className="bg-white/5 border-white/10 backdrop-blur-lg">
            <CardHeader className="flex flex-row items-center gap-3">
              <div className="p-2 bg-accent/10 rounded-lg border border-accent/20">
                  <Lightbulb className="h-6 w-6 text-accent" />
              </div>
              <CardTitle className="text-2xl font-semibold">{t('actionableRecommendations')}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-base text-muted-foreground leading-relaxed">{result.recommendations}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <AIChatBox />
    </motion.div>
  );
}
