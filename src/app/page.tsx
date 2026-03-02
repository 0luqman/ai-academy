import Link from 'next/link';
import { ArrowRight, Code2, Database, Rocket, Sparkles, Terminal } from 'lucide-react';

export default function Home() {
    return (
        <div className="relative isolate min-h-screen bg-background text-foreground overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[140px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full" />
            </div>

            {/* Hero Section */}
            <div className="mx-auto max-w-7xl px-6 py-32 lg:flex lg:items-center lg:gap-x-12 lg:px-8 lg:py-48">
                <div className="mx-auto max-w-3xl lg:mx-0 lg:flex-auto">
                    <div className="flex">
                        <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-primary border border-primary/20 bg-primary/5 backdrop-blur-md hover:border-primary/40 transition-all font-medium flex items-center gap-2">
                            <Sparkles size={14} className="animate-pulse" />
                            Designed for Excellence by RiWoT
                            <Link href="/about" className="ml-3 font-semibold text-foreground/80 hover:text-primary transition-colors flex items-center gap-1">
                                Learn More <ArrowRight size={14} />
                            </Link>
                        </div>
                    </div>

                    <h1 className="mt-10 text-6xl font-extrabold tracking-tighter text-balance hero-gradient sm:text-8xl leading-[1.05]">
                        AI Academy by RiWoT
                    </h1>

                    <p className="mt-8 text-xl leading-relaxed text-muted-foreground/90 max-w-2xl text-pretty font-medium">
                        Master the complex world of Artificial Intelligence, Machine Learning, and Data Science.
                        A high-fidelity learning platform designed by <span className="text-foreground font-bold">Mir Luqman</span> and <span className="text-foreground font-bold">Ibraheem Rashid</span>
                        to build the architects of tomorrow.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center gap-6">
                        <Link
                            href="/learn"
                            className="rounded-xl bg-primary px-10 py-5 text-sm font-bold text-primary-foreground shadow-2xl shadow-primary/40 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                        >
                            <Rocket size={18} />
                            Start Learning Now
                        </Link>
                        <Link
                            href="/learn"
                            className="text-sm font-bold leading-6 text-foreground hover:text-primary transition-all flex items-center gap-2 px-6 py-5 rounded-xl border border-border/50 hover:bg-muted/50"
                        >
                            View Course Tracks <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 gap-10 border-t border-white/5 pt-12">
                        <div className="relative pl-6">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30 rounded-full" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Platform Architect</p>
                            <p className="text-xl font-bold tracking-tight text-foreground">Mir Luqman</p>
                        </div>
                        <div className="relative pl-6">
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary/30 rounded-full" />
                            <p className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground/60 mb-2">Full-Stack Architect</p>
                            <p className="text-xl font-bold tracking-tight text-foreground">Ibraheem Rashid</p>
                        </div>
                    </div>
                </div>

                <div className="mt-20 lg:mt-0 lg:flex-shrink-0 lg:flex-grow flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-md">
                        <div className="absolute -inset-4 rounded-[2.5rem] bg-primary/20 blur-3xl animate-pulse" />
                        <div className="relative glass-card rounded-3xl p-8 border border-white/10 shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)] bg-[#050505]/90 backdrop-blur-3xl float ring-1 ring-white/10">
                            <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                                <div className="flex items-center space-x-2">
                                    <div className="h-3 w-3 rounded-full bg-red-500/40 border border-red-500/60" />
                                    <div className="h-3 w-3 rounded-full bg-yellow-500/40 border border-yellow-500/60" />
                                    <div className="h-3 w-3 rounded-full bg-green-500/40 border border-green-500/60" />
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                                    <Terminal size={12} />
                                    riwot_engine.py
                                </div>
                            </div>
                            <div className="space-y-4 font-mono text-sm leading-relaxed">
                                <p className="text-primary italic opacity-70"># Initializing AI Academy by RiWoT</p>
                                <div className="flex gap-3">
                                    <span className="text-blue-400">import</span>
                                    <span className="text-white">ml_architect</span>
                                    <span className="text-blue-400">as</span>
                                    <span className="text-white">riwot</span>
                                </div>
                                <div className="flex gap-3">
                                    <span className="text-blue-400">from</span>
                                    <span className="text-white">riwot_ai</span>
                                    <span className="text-blue-400">import</span>
                                    <span className="text-white">Tutor</span>
                                </div>
                                <p className="text-white/90">academy = riwot.create_platform(<span className="text-emerald-400">&quot;AI Academy&quot;</span>)</p>
                                <p className="text-white/90">tutor = Tutor(vision=<span className="text-emerald-400">&quot;Excellence&quot;</span>)</p>
                                <p className="text-primary/90 mt-6">tutor.guide(student=<span className="text-emerald-400">&quot;Your Future&quot;</span>)</p>
                                <div className="pt-4 flex items-center gap-2 text-white/20 text-xs">
                                    <span className="animate-pulse">●</span>
                                    <span>Status: Ready to Build</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Track Highlights */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-40">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    {[
                        { title: 'Machine Learning', desc: 'Deep dive into neural networks, regression, and scaling AI.', color: 'from-primary/20', icon: Rocket },
                        { title: 'Data Science', desc: 'Master the data lifecycle, from SQL exploration to visualization.', color: 'from-blue-600/20', icon: Database },
                        { title: 'Practical AI', desc: 'Build and deploy real-world production applications.', color: 'from-emerald-600/20', icon: Code2 },
                    ].map((track, i) => (
                        <Link
                            key={i}
                            href="/learn"
                            className={`group relative overflow-hidden rounded-[2rem] p-10 glass-card border border-white/5 bg-gradient-to-br ${track.color} to-transparent hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500`}
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-white/5 w-fit group-hover:bg-primary/20 transition-colors">
                                <track.icon className="text-white group-hover:scale-110 transition-transform" size={28} />
                            </div>
                            <h3 className="text-2xl font-bold mb-4 tracking-tight">{track.title}</h3>
                            <p className="text-muted-foreground/80 text-sm leading-relaxed mb-8 text-pretty">{track.desc}</p>
                            <div className="flex items-center gap-2 text-sm font-bold text-primary">
                                Explore Track <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
