"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, User, Bot, Loader2, Sparkles, ChevronLeft, Brain } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export default function ChatPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Persistence
    useEffect(() => {
        const saved = localStorage.getItem('ai-tutor-history');
        if (saved) {
            try {
                setMessages(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to load chat history", e);
            }
        }
    }, []);

    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('ai-tutor-history', JSON.stringify(messages));
        }
    }, [messages]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages, isLoading]);

    const clearHistory = () => {
        setMessages([]);
        localStorage.removeItem('ai-tutor-history');
    };

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
                    context: "The user is in the full-screen AI Tutor chat interface. Provide deep technical guidance on AI, Machine Learning, and Data Science.",
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
                text: "I'm having trouble connecting right now. Please ensure your API key is configured correctly."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar */}
            <aside className="hidden md:flex w-80 flex-col border-r bg-card/30 backdrop-blur-xl">
                <div className="p-6 border-b border-white/5">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
                            <Brain size={20} />
                        </div>
                        <div>
                            <h1 className="font-black text-sm uppercase tracking-tighter">AI Academy</h1>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Personal Tutor</p>
                        </div>
                    </Link>
                </div>

                <div className="flex-1 p-6 space-y-8">
                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Quick Actions</h3>
                        <div className="space-y-2">
                            <button
                                onClick={clearHistory}
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-muted-foreground hover:text-red-500 hover:bg-red-500/5 border border-transparent hover:border-red-500/10 transition-all"
                            >
                                <Trash2 size={16} />
                                Clear Conversation
                            </button>
                            <Link
                                href="/learn"
                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
                            >
                                <ChevronLeft size={16} />
                                Back to Courses
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/60 mb-4">Support</h3>
                        <a
                            href="https://discord.gg/qMd7jwV7UG"
                            target="_blank"
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-muted-foreground hover:text-primary hover:bg-primary/5 border border-transparent hover:border-primary/10 transition-all"
                        >
                            <Sparkles size={16} />
                            Join Community
                        </a>
                    </div>
                </div>

                <div className="p-6 border-t border-white/5">
                    <p className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.3em] text-center">Powered by RiWoT AI Core</p>
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col relative">
                {/* Header */}
                <header className="h-20 border-b bg-background/50 backdrop-blur-md flex items-center justify-between px-8">
                    <div className="flex items-center gap-4">
                        <div className="md:hidden">
                           <Link href="/" className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                                <Brain size={20} />
                            </Link>
                        </div>
                        <div>
                            <h2 className="text-lg font-black uppercase tracking-tight">Interactive Session</h2>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em]">Neural Engine Active</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Messages */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 md:px-24 space-y-8 scroll-smooth">
                    {messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-6 animate-in fade-in zoom-in duration-700">
                            <div className="w-24 h-24 rounded-[2.5rem] bg-muted/50 flex items-center justify-center border border-white/5 shadow-2xl">
                                <Sparkles size={48} className="text-primary/20" />
                            </div>
                            <div className="max-w-md space-y-2">
                                <h3 className="text-2xl font-black italic">How can I assist your learning journey?</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    I am your personal AI Architect. Ask me anything about Python, Machine Learning, or Advanced Data Science.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full max-w-2xl pt-8">
                                {[
                                    { t: "Neural Networks", d: "Explain backpropagation" },
                                    { t: "Data Analysis", d: "What is a P-value?" },
                                    { t: "Python Core", d: "Decorators vs Generators" }
                                ].map((s, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setInput(s.d)}
                                        className="p-4 rounded-2xl border border-white/5 bg-muted/30 hover:bg-primary/5 hover:border-primary/20 transition-all text-left group"
                                    >
                                        <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">{s.t}</p>
                                        <p className="text-sm font-bold text-muted-foreground group-hover:text-foreground">{s.d}</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {messages.map((m) => (
                        <div key={m.id} className={cn(
                            "flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
                            m.role === 'user' ? "flex-row-reverse" : ""
                        )}>
                            <div className={cn(
                                "w-10 h-10 rounded-2xl shrink-0 flex items-center justify-center shadow-lg",
                                m.role === 'user' ? "bg-primary text-primary-foreground shadow-primary/20" : "bg-muted border border-white/10"
                            )}>
                                {m.role === 'user' ? <User size={18} /> : <Bot size={18} />}
                            </div>
                            <div className={cn(
                                "max-w-[75%] px-6 py-4 rounded-[2rem] leading-relaxed shadow-sm",
                                m.role === 'user'
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted/50 border border-white/5 text-foreground/90 rounded-tl-none"
                            )}>
                                <p className="text-[15px]">{m.text}</p>
                            </div>
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex gap-6 animate-pulse">
                            <div className="w-10 h-10 rounded-2xl bg-muted border border-white/10 flex items-center justify-center">
                                <Bot size={18} className="text-primary" />
                            </div>
                            <div className="bg-muted/30 border border-white/5 rounded-[2rem] rounded-tl-none px-8 py-5">
                                <Loader2 className="animate-spin text-primary" size={20} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-8 md:px-24 border-t bg-background/50 backdrop-blur-md">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSend();
                        }}
                        className="max-w-4xl mx-auto flex gap-4"
                    >
                        <div className="flex-1 relative group">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ask your AI Architect..."
                                className="w-full bg-muted/50 border border-white/10 rounded-[2rem] px-8 py-5 text-base focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all placeholder:text-muted-foreground/40 shadow-inner"
                            />
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                                <div className="h-8 w-[1px] bg-white/5 mx-2" />
                                <button
                                    type="submit"
                                    disabled={isLoading || !input.trim()}
                                    className="bg-primary text-primary-foreground p-3 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </form>
                    <p className="mt-4 text-center text-[10px] text-muted-foreground/30 uppercase tracking-[0.2em]">
                        AI may provide inaccurate info. Verify important facts.
                    </p>
                </div>
            </main>
        </div>
    );
}
