import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import AITutor from '@/components/AITutor';
import { Sparkles, Brain } from 'lucide-react';

export const metadata: Metadata = {
    title: 'AI Academy by RiWoT | Built by RiWoT',
    description: 'A modern, production-ready educational platform for AI, Machine Learning, and Data Science.',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark scroll-smooth">
            <body className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-primary/30 selection:text-primary-foreground">
                <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/40 transition-all duration-300 hover:bg-background/95">
                    <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-8">
                        <Link href="/" className="group flex items-center space-x-3 transition-transform active:scale-95">
                            <div className="relative w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-transform">
                                <Brain className="text-white" size={24} />
                                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
                            </div>
                            <div className="flex flex-col -space-y-1">
                                <span className="text-lg font-black tracking-tighter uppercase group-hover:text-primary transition-colors">
                                    AI Academy
                                </span>
                                <span className="text-[10px] font-bold text-muted-foreground/60 tracking-[0.3em] uppercase">
                                    by RiWoT
                                </span>
                            </div>
                        </Link>

                        <nav className="hidden md:flex items-center gap-10">
                            {[
                                { name: 'Courses', href: '/learn' },
                                { name: 'Setup', href: '/setup' },
                                { name: 'About', href: '/about' }
                            ].map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-xs font-black uppercase tracking-[0.2em] text-muted-foreground/80 hover:text-primary transition-all relative group py-2"
                                >
                                    {link.name}
                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center gap-4">
                             <a
                                href="https://discord.gg/qMd7jwV7UG"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hidden sm:flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-foreground border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                            >
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Community
                            </a>
                            <Link
                                href="/learn"
                                className="flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-xs font-black uppercase tracking-widest text-primary-foreground shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                <Sparkles size={14} fill="currentColor" />
                                Start
                            </Link>
                        </div>
                    </div>
                </header>

                <main className="flex-1 relative">
                    {children}
                </main>

                <AITutor />
            </body>
        </html>
    );
}
