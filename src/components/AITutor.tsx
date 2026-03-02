"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code2, X, Brain, Trash2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    context: "Student is currently browsing the AI Academy course platform.",
                    history: messages.map(m => ({ role: m.role, text: m.text }))
                }),
            });

            if (!response.ok) throw new Error("Failed to fetch AI response");

            const data = await response.json();
            const text = data.content;

            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'model', text: "Sorry, I encountered an error. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group border border-primary-foreground/20"
            >
                <Sparkles className={cn("transition-all duration-300", isOpen ? "rotate-90 scale-0" : "scale-100")} />
                <X className={cn("absolute transition-all duration-300", isOpen ? "scale-100" : "scale-0 -rotate-90")} />
            </button>

            {/* Chat Window */}
            <div className={cn(
                "fixed bottom-24 right-6 w-[380px] h-[550px] sm:w-[420px] sm:h-[650px] bg-background border border-border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all transform origin-bottom-right duration-300 ease-out",
                isOpen ? "translate-y-0 scale-100 opacity-100" : "translate-y-10 scale-95 opacity-0 pointer-events-none"
            )}>
                <div className="p-4 border-b bg-muted/30 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-semibold">
                        <div className="bg-primary/10 p-2 rounded-lg">
                            <Brain className="text-primary" size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm leading-none">AI Tutor</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">AI Academy by RiWoT</span>
                        </div>
                    </div>
                    <button
                        onClick={() => setMessages([])}
                        className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-colors"
                        title="Clear Conversation"
                    >
                        <Trash2 size={16} />
                    </button>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 scroll-smooth">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center px-10">
                            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-6">
                                <Code2 size={32} className="text-muted-foreground/40" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">How can I help you?</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                I'm your dedicated AI tutor. Ask me about Python, Data Science, or anything you're currently learning!
                            </p>
                        </div>
                    )}
                    {messages.map((m) => (
                        <div key={m.id} className={cn(
                            "flex flex-col",
                            m.role === 'user' ? "items-end" : "items-start"
                        )}>
                            <div className={cn(
                                "max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                                m.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted border border-border/50 rounded-tl-none"
                            )}>
                                {m.text}
                            </div>
                            <span className="text-[10px] text-muted-foreground mt-1.5 px-1 uppercase tracking-tighter opacity-50">
                                {m.role === 'user' ? 'You' : 'Tutor'}
                            </span>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex flex-col items-start">
                            <div className="bg-muted border border-border/50 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                                <Loader2 size={16} className="animate-spin text-primary" />
                            </div>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-muted/20 backdrop-blur-xl">
                    <div className="flex gap-2 bg-background border rounded-xl p-1.5 shadow-inner focus-within:ring-1 focus-within:ring-primary/30 transition-all">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Ask a question..."
                            className="flex-1 bg-transparent border-none px-3 py-1.5 text-sm focus:outline-none placeholder:text-muted-foreground/50"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="bg-primary text-primary-foreground p-2 rounded-lg disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20"
                        >
                            <Send size={18} />
                        </button>
                    </div>
                    <p className="text-[9px] text-center text-muted-foreground mt-3 uppercase tracking-widest opacity-40">
                        Powered by RiWoT AI Engine
                    </p>
                </div>
            </div>
        </>
    );
}
