
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Bot, Send, User, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { mainAssistant } from "@/ai/flows/main-assistant";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useLocale, useTranslations } from "next-intl";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export function AIChatBox() {
    const t = useTranslations('AIChatBox');
    const locale = useLocale();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const scrollableNode = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollableNode) {
            scrollableNode.scrollTo({
                top: scrollableNode.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const history = messages.map(msg => ({ role: msg.role, content: msg.content }));
            const result = await mainAssistant({ history, query: currentInput, locale });
            const assistantMessage: Message = { role: 'assistant', content: result.response };
            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error("Error calling AI assistant:", error);
            const errorMessage: Message = { role: 'assistant', content: t('error') };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    }

  return (
    <Card className="bg-white/5 border-white/10 backdrop-blur-lg mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-primary" />
          <span>{t('title')}</span>
        </CardTitle>
        <CardDescription>
          {t('subtitle')}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ScrollArea className="h-64 w-full pr-4" ref={scrollAreaRef}>
             <div className="space-y-4">
                {messages.length === 0 && (
                    <div className="text-center text-muted-foreground py-10">
                        <p>{t('noMessages')}</p>
                        <p className="text-sm">{t('startQuestion')}</p>
                    </div>
                )}
                {messages.map((message, index) => (
                    <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : '')}>
                         {message.role === 'assistant' && (
                            <div className="p-2 bg-primary/10 rounded-full border border-primary/20 shrink-0">
                                <Bot className="h-5 w-5 text-primary" />
                            </div>
                         )}
                         <div className={cn("rounded-lg px-4 py-2 max-w-[80%]", message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted')}>
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                         </div>
                         {message.role === 'user' && (
                            <div className="p-2 bg-muted rounded-full border shrink-0">
                                <User className="h-5 w-5 text-muted-foreground" />
                            </div>
                         )}
                    </div>
                ))}
                {isLoading && (
                     <div className="flex items-start gap-3">
                        <div className="p-2 bg-primary/10 rounded-full border border-primary/20">
                            <Bot className="h-5 w-5 text-primary" />
                        </div>
                        <div className="rounded-lg px-4 py-2 bg-muted flex items-center">
                           <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                        </div>
                    </div>
                )}
            </div>
        </ScrollArea>
        <div className="flex gap-2 items-start">
          <Textarea
            placeholder={t('placeholder')}
            className="bg-black/20 border-white/10 focus:ring-primary flex-1 resize-none"
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <Button className="bg-primary hover:bg-primary/90" onClick={handleSendMessage} disabled={isLoading || !input.trim()}>
            {isLoading ? <Loader2 className="h-5 w-5 animate-spin"/> : <Send className="h-5 w-5" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
