import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import AITutor from '@/components/AITutor';

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
        <html lang="en" className="dark">
            <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
                <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container flex h-14 max-w-screen-2xl items-center">
                        <Link href="/" className="mr-6 flex items-center space-x-2">
                            <span className="font-bold sm:inline-block">
                                AI Academy by RiWoT
                            </span>
                        </Link>
                        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
                            <nav className="flex items-center space-x-6 text-sm font-medium">
                                <Link href="/learn" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    Courses
                                </Link>
                                <Link href="/setup" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    Local Setup
                                </Link>
                                <Link href="/about" className="transition-colors hover:text-foreground/80 text-foreground/60">
                                    About
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>
                <main className="flex-1">
                    {children}
                </main>
                <AITutor />
                <footer className="border-t py-6 md:py-0">
                    <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
                        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
                            Built by RiWoT. Developed by Mir Luqman & Ibraheem Rashid.
                        </p>
                    </div>
                </footer>
            </body>
        </html>
    );
}
