"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, Code2, Trash2, User, Bot, Loader2, Plus, MessageSquare, Menu, X, ChevronRight, Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface Message {
    id: string;
    role: 'user' | 'model';
    text: string;
    timestamp: number;
}

interface Conversation {
    id: string;
    title: string;
    messages: Message[];
    updatedAt: number;
}

export default function ChatPage() {
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Initialize from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('ai-academy-chats');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setConversations(parsed);
                if (parsed.length > 0) {
                    setActiveId(parsed[0].id);
                }
            } catch (e) {
                console.error("Failed to parse saved chats", e);
            }
        }
    }, []);

    // Save to localStorage
    useEffect(() => {
        if (conversations.length > 0) {
            localStorage.setItem('ai-academy-chats', JSON.stringify(conversations));
        }
    }, [conversations]);

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [conversations, activeId, isLoading]);

    const activeConversation = conversations.find(c => c.id === activeId);

    const startNewChat = () => {
        const newChat: Conversation = {
            id: Date.now().toString(),
            title: 'New Conversation',
            messages: [],
            updatedAt: Date.now()
        };
        setConversations([newChat, ...conversations]);
        setActiveId(newChat.id);
    };

    const deleteConversation = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const filtered = conversations.filter(c => c.id !== id);
        setConversations(filtered);
        if (activeId === id) {
            setActiveId(filtered.length > 0 ? filtered[0].id : null);
        }
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        let currentId = activeId;
        let updatedConversations = [...conversations];

        if (!currentId) {
            const newChat: Conversation = {
                id: Date.now().toString(),
                title: input.slice(0, 30) + (input.length > 30 ? '...' : ''),
                messages: [],
                updatedAt: Date.now()
            };
            updatedConversations = [newChat, ...conversations];
            currentId = newChat.id;
            setActiveId(currentId);
        }

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            text: input,
            timestamp: Date.now()
        };

        const convoIndex = updatedConversations.findIndex(c => c.id === currentId);
        const convo = { ...updatedConversations[convoIndex] };

        // Update title if it's the first message
        if (convo.messages.length === 0) {
            convo.title = input.slice(0, 40) + (input.length > 40 ? '...' : '');
        }

        convo.messages = [...convo.messages, userMsg];
        convo.updatedAt = Date.now();

        updatedConversations[convoIndex] = convo;
        setConversations(updatedConversations);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prompt: input,
                    context: "Premium full-screen AI Tutor interface.",
                    history: convo.messages.slice(0, -1).map(m => ({
                        role: m.role,
                        parts: [{ text: m.text }]
                    }))
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            const currentConversations = [...updatedConversations];
            const idx = currentConversations.findIndex(c => c.id === currentId);
            if (idx !== -1) {
                const updatedConvo = { ...currentConversations[idx] };
                const modelMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    text: data.content,
                    timestamp: Date.now()
                };
                updatedConvo.messages = [...updatedConvo.messages, modelMsg];
                updatedConvo.updatedAt = Date.now();
                currentConversations[idx] = updatedConvo;
                setConversations(currentConversations);
            }
        } catch (error) {
            console.error(error);
            const currentConversations = [...updatedConversations];
            const idx = currentConversations.findIndex(c => c.id === currentId);
            if (idx !== -1) {
                const updatedConvo = { ...currentConversations[idx] };
                const errorMsg: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'model',
                    text: "I encountered an error. Please check your connection or API configuration.",
                    timestamp: Date.now()
                };
                updatedConvo.messages = [...updatedConvo.messages, errorMsg];
                currentConversations[idx] = updatedConvo;
                setConversations(currentConversations);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen bg-[#0a0a0b] text-foreground overflow-hidden">
            {/* Sidebar */}
            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-72 bg-[#0d0d0e] border-r border-white/5 transition-transform duration-300 transform md:relative md:translate-x-0",
                !isSidebarOpen && "-translate-x-full md:-ml-72"
            )}>
                <div className="flex flex-col h-full p-4">
                    <div className="flex items-center justify-between mb-8 px-2">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="font-black text-sm tracking-tight group-hover:text-primary transition-colors uppercase">AI ACADEMY</span>
                        </Link>
                        <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-muted-foreground">
                            <X size={20} />
                        </button>
                    </div>

                    <button
                        onClick={startNewChat}
                        className="flex items-center gap-3 w-full p-4 mb-6 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
                    >
                        <Plus size={18} className="text-primary group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-bold">New Chat</span>
                    </button>

                    <div className="flex-1 overflow-y-auto space-y-2 pr-2 scrollbar-thin scrollbar-thumb-white/5">
                        <div className="px-2 mb-2">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50">Recent Conversations</span>
                        </div>
                        {conversations.map(convo => (
                            <button
                                key={convo.id}
                                onClick={() => setActiveId(convo.id)}
                                className={cn(
                                    "flex items-center justify-between w-full p-3 rounded-xl transition-all group",
                                    activeId === convo.id ? "bg-primary/10 text-primary border border-primary/20" : "hover:bg-white/5 text-muted-foreground border border-transparent"
                                )}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <MessageSquare size={16} className={cn("shrink-0", activeId === convo.id ? "text-primary" : "text-muted-foreground/40")} />
                                    <span className="text-sm font-medium truncate">{convo.title}</span>
                                </div>
                                <Trash2
                                    size={14}
                                    onClick={(e) => deleteConversation(convo.id, e)}
                                    className="opacity-0 group-hover:opacity-40 hover:!opacity-100 hover:text-red-500 transition-all shrink-0"
                                />
                            </button>
                        ))}
                    </div>

                    <div className="mt-auto pt-4 border-t border-white/5">
                        <Link href="/learn" className="flex items-center gap-3 w-full p-3 rounded-xl text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all">
                            <Code2 size={18} />
                            <span className="text-sm font-bold">Return to Lessons</span>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative min-w-0 h-full">
                {/* Header */}
                <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-[#0a0a0b]/50 backdrop-blur-xl z-10">
                    <div className="flex items-center gap-4">
                        {!isSidebarOpen && (
                            <button onClick={() => setIsSidebarOpen(true)} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                                <Menu size={20} />
                            </button>
                        )}
                        <div className="flex items-center gap-2">
                            <Sparkles size={16} className="text-primary animate-pulse" />
                            <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">Gemma 3 Architecture</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">System Online</span>
                        </div>
                    </div>
                </header>

                {/* Messages Container */}
                <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 md:px-0">
                    <div className="max-w-3xl mx-auto py-12 space-y-12">
                        {(!activeConversation || activeConversation.messages.length === 0) ? (
                            <div className="h-full flex flex-col items-center justify-center text-center space-y-8 py-20">
                                <div className="space-y-4">
                                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">How can I help you <br/><span className="hero-gradient italic uppercase">Architect the Future?</span></h1>
                                    <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                                        Your premium AI engineering partner, powered by Gemma 3. Optimized for code, math, and data science.
                                    </p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-xl px-4">
                                    {[
                                        "Explain Backpropagation in simple terms",
                                        "Optimize this Python snippet",
                                        "Draft a data visualization plan",
                                        "Help me debug my ML model"
                                    ].map((suggestion, i) => (
                                        <button
                                            key={i}
                                            onClick={() => setInput(suggestion)}
                                            className="text-left p-4 rounded-2xl border border-white/5 bg-white/5 hover:bg-primary/5 hover:border-primary/20 transition-all group"
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="text-xs font-bold">{suggestion}</span>
                                                <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all text-primary" />
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            activeConversation.messages.map((m) => (
                                <div key={m.id} className={cn(
                                    "flex gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500",
                                    m.role === 'user' ? "flex-row-reverse" : ""
                                )}>
                                    <div className={cn(
                                        "w-10 h-10 rounded-xl shrink-0 flex items-center justify-center shadow-lg",
                                        m.role === 'user' ? "bg-primary text-white" : "bg-muted border border-white/5"
                                    )}>
                                        {m.role === 'user' ? <User size={18} /> : <Bot size={18} className="text-primary" />}
                                    </div>
                                    <div className={cn(
                                        "flex-1 min-w-0 space-y-2",
                                        m.role === 'user' ? "text-right" : ""
                                    )}>
                                        <div className={cn(
                                            "inline-block px-6 py-4 rounded-[2rem] text-sm md:text-base leading-relaxed max-w-full",
                                            m.role === 'user'
                                                ? "bg-primary text-white"
                                                : "bg-[#0d0d0e] border border-white/5 text-foreground/90 prose prose-invert prose-p:leading-relaxed prose-pre:bg-black/50 prose-pre:border prose-pre:border-white/5"
                                        )}>
                                            {m.text}
                                        </div>
                                        <div className="flex items-center gap-2 text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest px-2">
                                            {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                        {isLoading && (
                            <div className="flex gap-6 animate-pulse">
                                <div className="w-10 h-10 rounded-xl bg-muted border border-white/5 flex items-center justify-center">
                                    <Bot size={18} className="text-primary/40" />
                                </div>
                                <div className="bg-[#0d0d0e] border border-white/5 rounded-[2rem] px-8 py-5 flex items-center gap-3">
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.3s]" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:-0.15s]" />
                                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-primary/60">Gemma is thinking...</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Input Area */}
                <div className="p-6 md:pb-12 bg-gradient-to-t from-[#0a0a0b] via-[#0a0a0b] to-transparent">
                    <div className="max-w-3xl mx-auto relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-purple-500/20 blur opacity-0 group-focus-within:opacity-100 transition-opacity rounded-[2.5rem]" />
                        <div className="relative flex items-end gap-3 bg-[#0d0d0e] border border-white/10 rounded-[2.5rem] p-2 pr-4 shadow-2xl transition-all focus-within:border-primary/50">
                            <textarea
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSend();
                                    }
                                }}
                                placeholder="Message Gemma 3..."
                                rows={1}
                                className="flex-1 bg-transparent border-none focus:ring-0 text-sm md:text-base py-4 px-6 max-h-40 resize-none scrollbar-none placeholder:text-muted-foreground/30"
                                style={{ height: 'auto' }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={isLoading || !input.trim()}
                                className="mb-1 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg shadow-primary/20 hover:scale-110 active:scale-95 disabled:opacity-50 transition-all shrink-0"
                            >
                                <Send size={20} />
                            </button>
                        </div>
                        <div className="mt-3 flex items-center justify-center gap-4">
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">
                                <Command size={10} />
                                <span>Enter to Send</span>
                            </div>
                            <div className="w-1 h-1 rounded-full bg-white/5" />
                            <div className="flex items-center gap-1.5 text-[9px] font-bold text-muted-foreground/30 uppercase tracking-[0.2em]">
                                <Plus size={10} />
                                <span>Shift + Enter for new line</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
