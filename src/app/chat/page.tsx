"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Brain, Trash2, Loader2, User, Bot, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

export default function FullChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initial persistence load
    useEffect(() => {
        const savedMessages = localStorage.getItem('ai_academy_full_chat');
        if (savedMessages) {
            try {
                setMessages(JSON.parse(savedMessages));
            } catch (e) {
                console.error("Failed to parse saved full-chat messages", e);
            }
        }
    }, []);

    // Persist messages
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('ai_academy_full_chat', JSON.stringify(messages));
        }
    }, [messages]);

    // Auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isLoading]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    context: "The student is in a dedicated full-screen AI chat interface. Provide helpful, comprehensive, and high-quality educational guidance across any AI, Machine Learning, or Data Science topic.",
                    history: messages.map(m => ({ role: m.role, text: m.text }))
                }),
            });

            if (!response.ok) throw new Error("Failed to fetch AI response");

            const data = await response.json();
            const text = data.content;

            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text,
                timestamp: Date.now()
            }]);
        } catch (error) {
            console.error(error);
            setMessages(prev => [...prev, {
                id: (Date.now() + 1).toString(),
                role: 'model',
                text: "My neural network is experiencing a temporary outage. Please try asking again in a few moments.",
                timestamp: Date.now()
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const clearChat = () => {
        if (window.confirm("Are you sure you want to clear your conversation history?")) {
            setMessages([]);
            localStorage.removeItem('ai_academy_full_chat');
        }
    };

    return (
        <div className="flex h-[calc(100vh-3.5rem)] flex-col bg-background">
            {/* Top Bar */}
            <header className="flex items-center justify-between border-b px-6 py-3 bg-muted/20 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 hover:bg-muted rounded-full text-muted-foreground transition-all active:scale-90"
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded-xl">
                            <Brain className="text-primary" size={24} />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold leading-none">AI Study Hub</h1>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Gemma 27B Powered Tutor</p>
                        </div>
                    </div>
                </div>
                <button
                    onClick={clearChat}
                    className="flex items-center gap-2 px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-all"
                >
                    <Trash2 size={14} />
                    Clear History
                </button>
            </header>

            {/* Chat Area */}
            <main ref={scrollRef} className="flex-1 overflow-y-auto p-4 sm:p-8 space-y-8 max-w-4xl mx-auto w-full scroll-smooth">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-6">
                        <div className="w-20 h-20 bg-muted/50 rounded-3xl flex items-center justify-center mb-8 border border-border shadow-xl">
                            <Sparkles size={40} className="text-primary/50" />
                        </div>
                        <h2 className="text-3xl font-extrabold tracking-tight mb-4">Your Personal AI Mentor</h2>
                        <p className="text-muted-foreground text-lg max-w-lg mb-10">
                            Ask anything about Machine Learning, Python programming, or career advice in the AI field. I'm here to help you master the material.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                            {[
                                "Explain Backpropagation simply",
                                "What is the difference between supervised and unsupervised learning?",
                                "How do I start a career in AI Engineering?",
                                "Write a Python script for a simple linear regression"
                            ].map((suggestion, i) => (
                                <button
                                    key={i}
                                    onClick={() => setInput(suggestion)}
                                    className="p-4 border rounded-xl bg-card hover:bg-muted hover:border-primary/40 text-sm font-medium transition-all text-left group"
                                >
                                    {suggestion}
                                    <ArrowLeft size={14} className="inline ml-2 rotate-180 opacity-0 group-hover:opacity-100 transition-all text-primary" />
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    messages.map((m) => (
                        <div key={m.id} className={cn(
                            "flex items-start gap-4 animate-in fade-in slide-in-from-bottom-3 duration-300",
                            m.role === 'user' ? "flex-row-reverse" : "flex-row"
                        )}>
                            <div className={cn(
                                "w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm",
                                m.role === 'user' ? "bg-primary/10 border-primary/20" : "bg-muted border-border"
                            )}>
                                {m.role === 'user' ? <User size={18} className="text-primary" /> : <Bot size={18} />}
                            </div>
                            <div className={cn(
                                "flex flex-col max-w-[85%] sm:max-w-[75%]",
                                m.role === 'user' ? "items-end" : "items-start"
                            )}>
                                <div className={cn(
                                    "px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-lg whitespace-pre-wrap",
                                    m.role === 'user'
                                        ? "bg-primary text-primary-foreground rounded-tr-none"
                                        : "bg-card border border-border/50 rounded-tl-none"
                                )}>
                                    {m.text}
                                </div>
                                <span className="text-[10px] text-muted-foreground mt-2 px-1 uppercase tracking-widest font-bold opacity-60">
                                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
                {isLoading && (
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border bg-muted border-border">
                            <Bot size={18} className="animate-pulse" />
                        </div>
                        <div className="bg-card border border-border/50 rounded-2xl rounded-tl-none px-6 py-4 shadow-lg flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                            </div>
                            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-widest animate-pulse">Gemma Thinking...</span>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Bar */}
            <footer className="p-4 sm:p-8 bg-background/50 backdrop-blur-md border-t">
                <div className="max-w-4xl mx-auto flex gap-3 relative">
                    <div className="flex-1 bg-muted/30 border border-border rounded-2xl overflow-hidden focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary/40 transition-all group shadow-inner">
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSend();
                                }
                            }}
                            placeholder="Type your message here... (Press Enter to send)"
                            className="w-full bg-transparent border-none px-5 py-4 text-sm focus:outline-none placeholder:text-muted-foreground/50 resize-none h-14 min-h-[56px]"
                            rows={1}
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        disabled={isLoading || !input.trim()}
                        className="bg-primary text-primary-foreground h-14 w-14 rounded-2xl flex items-center justify-center disabled:opacity-50 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-primary/25 border border-primary/20"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                    </button>
                </div>
                <p className="text-[10px] text-center text-muted-foreground mt-4 font-medium uppercase tracking-[0.2em] opacity-40">
                    AI Academy by RiWoT • Premium Learning Experience
                </p>
            </footer>
        </div>
    );
}
