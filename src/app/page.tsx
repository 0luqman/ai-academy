import Link from 'next/link';
import { Rocket, Brain, Code, Cpu, ArrowRight, ShieldCheck, Users, Zap, Github, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Home() {
    return (
        <div className="relative isolate min-h-screen bg-background text-foreground overflow-x-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-blue-500/10 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            </div>

            {/* Hero Section */}
            <section className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-12 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                    <div className="flex animate-in fade-in slide-in-from-bottom-4 duration-1000">
                        <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-primary border border-primary/20 bg-primary/5 backdrop-blur-sm hover:border-primary/40 transition-all font-medium flex items-center gap-2">
                            <Zap size={14} className="fill-primary" />
                            <span>Designed for Excellence by RiWoT</span>
                            <div className="w-[1px] h-3 bg-primary/20 mx-2" />
                            <Link href="/about" className="font-semibold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                                About Us <ArrowRight size={12} />
                            </Link>
                        </div>
                    </div>

                    <h1 className="mt-10 text-6xl font-extrabold hero-gradient sm:text-8xl leading-[1.05] tracking-tight animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                        AI Academy <br />
                        <span className="text-foreground/90 font-medium text-5xl sm:text-7xl">by RiWoT</span>
                    </h1>

                    <p className="mt-8 text-xl leading-relaxed text-muted-foreground/90 max-w-2xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        The ultimate high-fidelity learning platform for the next generation of
                        <span className="text-foreground font-semibold px-1">AI Architects</span>,
                        <span className="text-foreground font-semibold px-1">ML Engineers</span>, and
                        <span className="text-foreground font-semibold px-1">Data Scientists</span>.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center gap-6 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-300">
                        <Link
                            href="/learn"
                            className="group relative rounded-2xl bg-primary px-10 py-5 text-base font-bold text-primary-foreground shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden"
                        >
                            <span className="relative z-10">Start Learning Now</span>
                            <Rocket size={18} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </Link>
                        <Link
                            href="/learn"
                            className="text-base font-bold leading-6 text-foreground hover:text-primary transition-all flex items-center gap-2 group"
                        >
                            View Course Tracks <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="mt-20 grid grid-cols-2 gap-12 border-t border-white/5 pt-12 animate-in fade-in slide-in-from-bottom-20 duration-1000 delay-400">
                        <div className="group cursor-default">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-primary transition-colors">Platform Architect</p>
                            <p className="mt-3 text-2xl font-bold tracking-tight">Mir Luqman</p>
                            <div className="mt-2 h-0.5 w-8 bg-primary/40 group-hover:w-full transition-all duration-500" />
                        </div>
                        <div className="group cursor-default">
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/50 group-hover:text-primary transition-colors">Full-Stack Architect</p>
                            <p className="mt-3 text-2xl font-bold tracking-tight">Ibraheem Rashid</p>
                            <div className="mt-2 h-0.5 w-8 bg-primary/40 group-hover:w-full transition-all duration-500" />
                        </div>
                    </div>
                </div>

                <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow animate-in fade-in zoom-in duration-1000 delay-500">
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-primary/20 via-purple-500/10 to-blue-500/20 blur-2xl opacity-50" />
                        <div className="relative glass-card rounded-[2rem] p-1 border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden float">
                            <div className="bg-[#0a0a0b]/90 backdrop-blur-3xl p-8 rounded-[1.9rem]">
                                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-3 w-3 rounded-full bg-red-500/40" />
                                        <div className="h-3 w-3 rounded-full bg-yellow-500/40" />
                                        <div className="h-3 w-3 rounded-full bg-green-500/40" />
                                    </div>
                                    <div className="px-3 py-1 rounded-md bg-white/5 border border-white/10">
                                        <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">riwot_ai_core.py</span>
                                    </div>
                                </div>
                                <div className="space-y-5 font-mono text-[14px] leading-relaxed">
                                    <div className="flex gap-4">
                                        <span className="text-white/20 select-none">01</span>
                                        <p className="text-primary italic"># Initializing AI Academy by RiWoT</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-white/20 select-none">02</span>
                                        <p className="text-blue-400">import ml_architect as riwot</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-white/20 select-none">03</span>
                                        <p className="text-purple-400">from riwot_ai import Tutor</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-white/20 select-none">04</span>
                                        <p className="text-white">academy = riwot.init(<span className="text-emerald-400">&quot;Future&quot;</span>)</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-white/20 select-none">05</span>
                                        <p className="text-white">tutor = Tutor(vision=<span className="text-emerald-400">&quot;Excellence&quot;</span>)</p>
                                    </div>
                                    <div className="flex gap-4">
                                        <span className="text-white/20 select-none">06</span>
                                        <p className="text-green-400">tutor.guide(target=<span className="text-emerald-400">&quot;The Architects&quot;</span>)</p>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <span className="text-white/20 select-none">07</span>
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                            <p className="text-white/40 italic">Status: Excellence.exe running...</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 py-32 border-t border-white/5">
                <div className="text-center max-w-3xl mx-auto mb-24">
                    <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">Core Capabilities</h2>
                    <p className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-6 italic">Built for the next decade of AI engineering.</p>
                    <p className="text-muted-foreground text-lg">A curriculum designed by experts, powered by the latest in WebAssembly and Generative AI technologies.</p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {[
                        {
                            icon: <Code className="text-primary" />,
                            title: 'Python Playground',
                            desc: 'Write and execute production Python code directly in your browser with our built-in WASM runtime. No installation required.',
                            color: 'from-primary/20'
                        },
                        {
                            icon: <Brain className="text-purple-500" />,
                            title: 'Interactive Learning',
                            desc: 'Master complex concepts through interactive quizzes and hands-on projects that provide real-time feedback and validation.',
                            color: 'from-purple-500/20'
                        },
                        {
                            icon: <Cpu className="text-blue-500" />,
                            title: 'AI Personal Tutor',
                            desc: 'Stuck on a problem? Our integrated AI tutor, powered by Google Gemini, is available 24/7 to guide you through difficult topics.',
                            color: 'from-blue-500/20'
                        },
                        {
                            icon: <Rocket className="text-emerald-500" />,
                            title: 'Project-Based',
                            desc: 'Build a professional portfolio as you learn. From predictive models to data visualization dashboards, you build what matters.',
                            color: 'from-emerald-500/20'
                        },
                        {
                            icon: <ShieldCheck className="text-orange-500" />,
                            title: 'Certified Excellence',
                            desc: 'Follow structured tracks from Foundations to Advanced Engineering, ensuring no gaps in your technical knowledge.',
                            color: 'from-orange-500/20'
                        },
                        {
                            icon: <Users className="text-pink-500" />,
                            title: 'Global Community',
                            desc: 'Join a network of ambitious developers and researchers. Collaborate, review code, and grow together in our Discord.',
                            color: 'from-pink-500/20'
                        },
                    ].map((feature, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-[2rem] p-8 glass-card border-white/5 bg-gradient-to-br from-transparent to-transparent hover:to-white/5 transition-all duration-500"
                        >
                            <div className={cn("w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500", feature.color)}>
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 tracking-tight">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6 group-hover:text-foreground/80 transition-colors">{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section className="mx-auto max-w-7xl px-6 lg:px-8 py-32">
                <div className="relative overflow-hidden rounded-[3rem] bg-primary px-12 py-24 text-center shadow-3xl shadow-primary/20">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)]" />
                    <h2 className="relative text-4xl sm:text-6xl font-extrabold text-primary-foreground mb-8 tracking-tighter">
                        Ready to shape the future?
                    </h2>
                    <p className="relative text-primary-foreground/80 text-lg mb-12 max-w-2xl mx-auto font-medium">
                        Join AI Academy by RiWoT today and start your journey towards becoming a world-class AI Architect.
                    </p>
                    <div className="relative flex flex-wrap justify-center gap-6">
                        <Link
                            href="/learn"
                            className="rounded-2xl bg-white px-12 py-5 text-lg font-bold text-primary shadow-xl hover:bg-zinc-100 transition-all hover:scale-105 active:scale-95"
                        >
                            Get Started
                        </Link>
                        <a
                            href="https://discord.gg/qMd7jwV7UG"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="rounded-2xl bg-black/20 backdrop-blur-md px-12 py-5 text-lg font-bold text-white border border-white/10 hover:bg-black/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            Join Discord
                        </a>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="mx-auto max-w-7xl px-6 lg:px-8 py-12 border-t border-white/5">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-col items-center md:items-start gap-2">
                        <span className="font-black text-2xl tracking-tighter">AI Academy by RiWoT</span>
                        <p className="text-sm text-muted-foreground">© 2024 RiWoT. All rights reserved.</p>
                    </div>
                    <div className="flex gap-8 text-sm font-bold text-muted-foreground">
                        <Link href="/learn" className="hover:text-primary transition-colors">Courses</Link>
                        <Link href="/about" className="hover:text-primary transition-colors">About</Link>
                        <a href="https://discord.gg/qMd7jwV7UG" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Discord</a>
                        <Link href="/setup" className="hover:text-primary transition-colors">Setup</Link>
                    </div>
                    <div className="flex gap-4">
                        {[Github, Twitter, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/5 flex items-center justify-center hover:bg-white/5 hover:border-white/10 transition-all">
                                <Icon size={18} />
                            </a>
                        ))}
                    </div>
                </div>
                <div className="mt-8 text-center">
                    <p className="text-[10px] text-muted-foreground/30 uppercase tracking-[0.5em]">Developed by Mir Luqman & Ibraheem Rashid</p>
                </div>
            </footer>
        </div>
    );
}
