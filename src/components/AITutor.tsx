"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code2, X, Brain, Trash2, User, Bot, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

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
    const pathname = usePathname();

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input };
        const newMessages = [...messages, userMessage];
        setMessages(newMessages);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    context: `The user is on the page: ${pathname}. Help them with any questions regarding AI, ML, or Data Science based on the curriculum.`,
                    history: messages.map(m => ({
                        role: m.role,
                        parts: [{ text: m.text }]
                    }))
                })
            });

            const data = await response.json();

            if (data.error) throw new Error(data.error);

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: data.content
            }]);
        } catch (error: any) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "I'm having trouble connecting right now. Please ensure your API key is configured correctly in the environment variables."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "fixed bottom-8 right-8 w-16 h-16 rounded-2xl shadow-2xl flex items-center justify-center transition-all z-50 group overflow-hidden",
                    isOpen ? "bg-background border border-border" : "bg-primary text-primary-foreground hover:scale-110 active:scale-95 shadow-primary/30"
                )}
            >
                {!isOpen && <Sparkles className="relative z-10 animate-pulse" size={28} fill="currentColor" />}
                {isOpen && <X className="text-foreground" size={24} />}
                {!isOpen && <div className="absolute inset-0 bg-gradient-to-tr from-primary via-primary to-purple-400 group-hover:rotate-12 transition-transform scale-150" />}
            </button>

            {/* Chat Window */}
            <div className={cn(
                "fixed bottom-28 right-8 w-[440px] h-[650px] bg-background border border-white/10 rounded-[2.5rem] shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] z-50 flex flex-col overflow-hidden transition-all transform origin-bottom-right duration-500 backdrop-blur-3xl",
                isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none"
            )}>
                {/* Header */}
                <div className="p-6 border-b border-white/5 bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
                            <Brain className="text-white" size={20} />
                        </div>
                        <div>
                            <h3 className="text-sm font-black uppercase tracking-tighter">AI Tutor</h3>
                            <div className="flex items-center gap-1.5">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Online & Ready</span>
                            </div>
                        </div>
                    </div>
                    <button
                        onClick={() => setMessages([])}
                        className="p-2 hover:bg-red-500/10 rounded-xl text-muted-foreground hover:text-red-500 transition-colors"
                        title="Clear History"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                            <div className="w-20 h-20 rounded-[2rem] bg-muted/50 flex items-center justify-center mb-4">
                                <Code2 size={40} className="text-primary/20" />
                            </div>
                            <h4 className="font-bold text-lg">How can I help you today?</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                I'm your RiWoT AI Tutor. I can explain complex formulas, debug your Python code, or help you understand Data Science concepts.
                            </p>
                            <div className="grid grid-cols-1 gap-2 w-full pt-4">
                                {[
                                    "Explain the Normal Distribution",
                                    "How do Python lists work?",
                                    "Help me debug my code"
                                ].map((suggestion, i) => (
                                    <button
                                        key={i}
                                        onClick={() => { setInput(suggestion); }}
                                        className="text-xs font-bold p-3 rounded-xl border border-white/5 bg-muted/30 hover:bg-primary/5 hover:border-primary/20 transition-all text-left"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {messages.map((m) => (
                        <div key={m.id} className={cn(
                            "flex gap-3 max-w-[90%]",
                            m.role === 'user' ? "ml-auto flex-row-reverse" : ""
                        )}>
                            <div className={cn(
                                "w-8 h-8 rounded-lg shrink-0 flex items-center justify-center",
                                m.role === 'user' ? "bg-primary text-primary-foreground" : "bg-muted border border-white/10"
                            )}>
                                {m.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                            </div>
                            <div className={cn(
                                "px-4 py-3 rounded-2xl text-sm leading-relaxed",
                                m.role === 'user'
                                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/10"
                                    : "bg-muted/50 border border-white/5 text-foreground/90"
                            )}>
                                {m.text}
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-3">
                            <div className="w-8 h-8 rounded-lg bg-muted border border-white/10 flex items-center justify-center animate-pulse">
                                <Bot size={14} className="text-primary" />
                            </div>
                            <div className="bg-muted/30 border border-white/5 rounded-2xl px-6 py-4">
                                <Loader2 className="animate-spin text-primary" size={18} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-6 border-t border-white/5 bg-muted/20">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message..."
                            className="flex-1 bg-background border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
