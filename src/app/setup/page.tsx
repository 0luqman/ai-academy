import { Terminal, Download, Laptop, Code2, CheckCircle2, AlertCircle, Info, Rocket } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SetupPage() {
    return (
        <div className="relative isolate min-h-screen bg-background overflow-hidden pb-32">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="mx-auto max-w-5xl px-6 lg:px-8 pt-24 sm:pt-32">
                {/* Header */}
                <header className="max-w-3xl mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5 border border-primary/20">
                            <Laptop size={24} />
                        </div>
                        <h2 className="text-primary font-black tracking-[0.3em] uppercase text-xs">Environment Guide</h2>
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                        Local Python <br />
                        <span className="hero-gradient">Setup Guide</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed max-w-2xl">
                        AI Academy by RiWoT emphasizes practical, hands-on coding.
                        While our in-browser playground is perfect for quick tasks, larger projects
                        require a robust local environment.
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
                    {/* Main Content */}
                    <div className="lg:col-span-8 space-y-20 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">

                        {/* Step 1 */}
                        <section className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-muted flex items-center justify-center font-black text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-12 group-hover:scale-110">
                                01
                            </div>
                            <div className="absolute left-5 top-10 w-[2px] h-[calc(100%+80px)] bg-gradient-to-b from-primary/20 to-transparent" />

                            <h3 className="text-2xl font-black mb-4 tracking-tight">Install Python Runtime</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Download the latest version of Python (3.12+) from the official <a href="https://www.python.org/downloads/" target="_blank" rel="noreferrer" className="text-primary font-bold underline decoration-primary/20 underline-offset-4 hover:decoration-primary">Python website</a>.
                            </p>

                            <div className="p-6 rounded-[2rem] bg-orange-500/5 border border-orange-500/20 flex gap-4 items-start">
                                <AlertCircle className="text-orange-500 shrink-0 mt-1" size={20} />
                                <div className="text-sm leading-relaxed text-orange-200/80">
                                    <strong className="text-orange-500 font-black uppercase tracking-widest text-[10px] block mb-1">Crucial Note (Windows)</strong>
                                    Make sure to check the box that says <span className="text-foreground font-bold italic">&quot;Add Python to PATH&quot;</span> during the installation process.
                                </div>
                            </div>
                        </section>

                        {/* Step 2 */}
                        <section className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-muted flex items-center justify-center font-black text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-12 group-hover:scale-110">
                                02
                            </div>
                            <div className="absolute left-5 top-10 w-[2px] h-[calc(100%+80px)] bg-gradient-to-b from-primary/20 to-transparent" />

                            <h3 className="text-2xl font-black mb-4 tracking-tight">Choose Your IDE</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                We highly recommend <span className="text-foreground font-bold">VS Code (Visual Studio Code)</span>.
                                It provides industry-standard support for Python and Jupyter Notebooks.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="p-5 rounded-2xl border border-white/5 bg-card/50 flex items-center gap-4 group/item hover:bg-white/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover/item:scale-110 transition-transform">
                                        <Code2 size={20} />
                                    </div>
                                    <span className="text-sm font-bold">Python Extension</span>
                                </div>
                                <div className="p-5 rounded-2xl border border-white/5 bg-card/50 flex items-center gap-4 group/item hover:bg-white/5 transition-all">
                                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500 group-hover/item:scale-110 transition-transform">
                                        <Info size={20} />
                                    </div>
                                    <span className="text-sm font-bold">Jupyter Extension</span>
                                </div>
                            </div>
                        </section>

                        {/* Step 3 */}
                        <section className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-muted flex items-center justify-center font-black text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:rotate-12 group-hover:scale-110">
                                03
                            </div>
                            <div className="absolute left-5 top-10 w-[2px] h-[calc(100%+80px)] bg-gradient-to-b from-primary/20 to-transparent" />

                            <h3 className="text-2xl font-black mb-4 tracking-tight">Setup Virtual Environments</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Prevent dependency conflicts by using virtual environments for every project.
                            </p>

                            <div className="rounded-3xl border border-white/10 bg-[#0c0c0d] overflow-hidden shadow-2xl">
                                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-muted/30">
                                    <Terminal size={14} className="text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Shell Interface</span>
                                </div>
                                <div className="p-6 font-mono text-sm space-y-2">
                                    <p className="text-muted-foreground/40"># Create environment</p>
                                    <p className="text-emerald-400">python -m venv venv</p>
                                    <p className="pt-4 text-muted-foreground/40"># Activate environment (Windows)</p>
                                    <p className="text-emerald-400">.\venv\Scripts\activate</p>
                                    <p className="pt-4 text-muted-foreground/40"># Activate environment (Mac/Linux)</p>
                                    <p className="text-emerald-400">source venv/bin/activate</p>
                                </div>
                            </div>
                        </section>

                        {/* Step 4 */}
                        <section className="relative pl-12 group">
                            <div className="absolute left-0 top-0 w-10 h-10 rounded-2xl bg-primary flex items-center justify-center font-black text-white shadow-lg shadow-primary/20 rotate-12 transition-all">
                                04
                            </div>

                            <h3 className="text-2xl font-black mb-4 tracking-tight text-primary">Install Core Toolset</h3>
                            <p className="text-muted-foreground leading-relaxed mb-6">
                                Install the standard libraries for Data Science and Machine Learning.
                            </p>

                            <div className="rounded-3xl border border-white/10 bg-[#0c0c0d] overflow-hidden shadow-2xl">
                                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-muted/30">
                                    <Download size={14} className="text-primary" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Pip Package Manager</span>
                                </div>
                                <div className="p-8 font-mono text-sm">
                                    <p className="text-emerald-400 leading-relaxed break-all">
                                        pip install pandas numpy matplotlib scikit-learn jupyter
                                    </p>
                                </div>
                            </div>

                            <div className="mt-12 flex items-center gap-3 p-6 rounded-[2rem] bg-emerald-500/5 border border-emerald-500/10">
                                <CheckCircle2 className="text-emerald-500 shrink-0" />
                                <p className="text-sm font-bold text-emerald-200/80 tracking-tight">You are now ready to build at AI Academy standards.</p>
                            </div>
                        </section>
                    </div>

                    {/* Sidebar / Quick Links */}
                    <div className="lg:col-span-4 sticky top-32 space-y-8 animate-in fade-in slide-in-from-right-8 duration-1000 delay-500">
                        <div className="p-8 rounded-[2.5rem] border border-white/5 bg-card/30 backdrop-blur-xl">
                            <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary mb-6">Resources</h4>
                            <div className="space-y-4">
                                {[
                                    { name: "Python Docs", url: "https://docs.python.org" },
                                    { name: "VS Code Setup", url: "https://code.visualstudio.com/docs/python" },
                                    { name: "Jupyter Guide", url: "https://jupyter.org/install" },
                                    { name: "Pip Help", url: "https://pip.pypa.io" }
                                ].map((res) => (
                                    <a
                                        key={res.name}
                                        href={res.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-between group/link"
                                    >
                                        <span className="text-sm font-bold text-muted-foreground group-hover/link:text-foreground transition-colors">{res.name}</span>
                                        <ChevronRight size={14} className="text-muted-foreground/30 group-hover/link:translate-x-1 group-hover/link:text-primary transition-all" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        <div className="p-8 rounded-[2.5rem] bg-primary group overflow-hidden relative shadow-2xl shadow-primary/20">
                            <Rocket className="absolute -bottom-4 -right-4 w-32 h-32 opacity-10 -rotate-12 group-hover:translate-x-4 group-hover:-translate-y-4 transition-transform duration-700" />
                            <h4 className="relative z-10 text-white font-black text-xl mb-4">Stuck?</h4>
                            <p className="relative z-10 text-white/70 text-sm mb-6 leading-relaxed">
                                Join our Discord community or ask the AI Tutor for immediate help.
                            </p>
                            <Link
                                href="https://discord.gg/qMd7jwV7UG"
                                target="_blank"
                                className="relative z-10 inline-flex items-center justify-center w-full py-3 rounded-2xl bg-white text-primary font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                            >
                                Get Support
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ChevronRight({ size, className }: { size: number, className: string }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            <path d="m9 18 6-6-6-6"/>
        </svg>
    );
}
