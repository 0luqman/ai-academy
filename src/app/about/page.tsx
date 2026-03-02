import { Brain, Rocket, Code, Github, Linkedin, Globe, Zap, Heart } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AboutPage() {
    return (
        <div className="relative isolate min-h-screen bg-background overflow-hidden pb-32">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] left-[-5%] w-[40%] h-[40%] bg-purple-500/10 blur-[100px] rounded-full" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32">
                <div className="mx-auto max-w-2xl text-center mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h2 className="text-primary font-bold tracking-[0.3em] uppercase text-sm mb-4">Our Mission</h2>
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8 hero-gradient">
                        Built for the Architects <br /> of Tomorrow
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        AI Academy by RiWoT is a production-grade educational platform dedicated to democratizing
                        high-end Machine Learning, AI Engineering, and Data Science.
                        We combine cutting-edge technology with world-class curriculum.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {[
                        {
                            name: "Mir Luqman",
                            role: "Platform Architect & Lead Designer",
                            description: "Visionary behind the AI Academy ecosystem. Specialized in high-fidelity UI/UX and scalable platform architecture. Mir ensures every pixel serves a purpose in the learning journey.",
                            portfolio: "http://the.pop.site/",
                            github: "https://github.com/mirluqman",
                            icon: <Zap className="text-primary" size={24} />,
                            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mir"
                        },
                        {
                            name: "Ibraheem Rashid",
                            role: "Full-Stack Architect & Curriculum Lead",
                            description: "Mastermind behind the technical curriculum and robust backend integrations. Ibraheem bridges the gap between complex AI concepts and interactive learning experiences.",
                            portfolio: "https://github.com/ibraheem-rashid",
                            github: "https://github.com/ibraheem-rashid",
                            icon: <Rocket className="text-purple-500" size={24} />,
                            image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ibraheem"
                        }
                    ].map((person, i) => (
                        <div
                            key={i}
                            className="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-muted/20 p-8 shadow-2xl transition-all duration-500 hover:border-primary/20 hover:bg-muted/30 animate-in fade-in zoom-in duration-1000 delay-200"
                        >
                            <div className="absolute top-0 right-0 p-8 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                                <Brain size={200} />
                            </div>

                            <div className="relative z-10">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-[2rem] bg-background border border-white/10 overflow-hidden shadow-xl shadow-black/20 group-hover:scale-110 transition-transform duration-500">
                                        <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black tracking-tight">{person.name}</h3>
                                        <p className="text-primary text-xs font-bold uppercase tracking-widest">{person.role}</p>
                                    </div>
                                </div>

                                <p className="text-muted-foreground leading-relaxed mb-8 text-sm group-hover:text-foreground/80 transition-colors">
                                    {person.description}
                                </p>

                                <div className="flex gap-4">
                                    <a
                                        href={person.portfolio}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 shadow-lg"
                                    >
                                        <Globe size={20} />
                                    </a>
                                    <a
                                        href={person.github}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all duration-300 shadow-lg"
                                    >
                                        <Github size={20} />
                                    </a>
                                    <div className="ml-auto w-12 h-12 rounded-2xl bg-muted/50 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all">
                                        {person.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Tech Stack */}
                <div className="mt-32 text-center">
                    <h3 className="text-xs font-black uppercase tracking-[0.4em] text-muted-foreground/40 mb-12">Powered by Modern Engineering</h3>
                    <div className="flex flex-wrap justify-center gap-12 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
                        {['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Monaco Editor', 'Pyodide', 'Google Gemini'].map((tech, i) => (
                            <span key={i} className="text-xl font-bold tracking-tighter">{tech}</span>
                        ))}
                    </div>
                </div>

                {/* Closing */}
                <div className="mt-32 p-12 rounded-[4rem] bg-gradient-to-tr from-primary/10 to-purple-500/10 border border-white/5 text-center max-w-4xl mx-auto shadow-3xl">
                    <Heart className="mx-auto text-primary mb-6 animate-bounce" fill="currentColor" />
                    <p className="text-lg font-medium italic text-muted-foreground/80 leading-relaxed">
                        &quot;Education is the foundation upon which we build our future. <br />
                        AI Academy by RiWoT is our contribution to that foundation.&quot;
                    </p>
                    <div className="mt-8 flex justify-center gap-4">
                        <Link href="/learn" className="px-8 py-3 rounded-2xl bg-primary text-primary-foreground font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all">
                            Start Learning
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
