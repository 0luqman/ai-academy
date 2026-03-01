"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code2, Volume2, X, Brain, Settings, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleGenerativeAI } from "@google/generative-ai";

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export default function AITutor() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // In a real app, this would call an API route to keep the key safe
            const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const chat = model.startChat({
                history: messages.map(m => ({
                    role: m.role,
                    parts: [{ text: m.text }],
                })),
                generationConfig: {
                    maxOutputTokens: 1000,
                },
            });

            const result = await chat.sendMessage(input);
            const response = await result.response;
            const text = response.text();

            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: "Sorry, I encountered an error. Please check your API key." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group"
            >
                <Sparkles className={cn("transition-all", isOpen ? "rotate-90 scale-0" : "scale-100")} />
                <X className={cn("absolute transition-all", isOpen ? "scale-100" : "scale-0 -rotate-90")} />
            </button>

            {/* Chat Window */}
            <div className={cn(
                "fixed bottom-24 right-6 w-[400px] h-[600px] bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all transform origin-bottom-right",
                isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
            )}>
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-2 font-semibold">
                        <Brain className="text-primary" size={18} />
                        <span>AI Academy by RiWoT Tutor</span>
                    </div>
                    <button onClick={() => setMessages([])} className="p-1 hover:bg-muted rounded text-muted-foreground">
                        <Trash2 size={16} />
                    </button>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-6 text-muted-foreground">
                            <Code2 size={40} className="mb-4 opacity-20" />
                            <p className="text-sm font-medium">Hello! I'm your AI tutor. Ask me anything about your current lesson.</p>
                        </div>
                    )}
                    {messages.map((m) => (
                        <div key={m.id} className={cn(
                            "flex flex-col max-w-[85%]",
                            m.role === 'user' ? "ml-auto items-end" : "items-start"
                        )}>
                            <div className={cn(
                                "px-4 py-2 rounded-2xl text-sm",
                                m.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted border"
                            )}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-muted border rounded-2xl px-4 py-2 w-fit animate-pulse">
                            ...
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-muted/10">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question..."
                            className="flex-1 bg-background border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="bg-primary text-primary-foreground p-2 rounded-xl disabled:opacity-50"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
