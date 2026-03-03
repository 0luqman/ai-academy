import { getAllTracks, Track } from "@/lib/content";
import Link from "next/link";
import { Brain, Database, LineChart, Cpu, ArrowRight, Sparkles, Rocket } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LearnPage() {
    let tracks: Track[] = [];
    try {
        tracks = getAllTracks();
    } catch (e) {
        console.error("Failed to load tracks:", e);
    }

    const order = ['ai-for-beginners', 'machine-learning', 'data-science'];

    const displayTracks: (Track & { icon: any, color: string })[] = (tracks.length > 0 ? tracks : [
        { trackId: 'ai-for-beginners', trackTitle: 'AI For Beginners', description: 'Built for beginners to learn Neural Networks, Computer Vision, NLP, and more.', courseOrder: [], externalUrl: 'https://ai-route.vercel.app/en/docs/0-course-setup/setup' },
        { trackId: 'machine-learning', trackTitle: 'Machine Learning', description: 'The comprehensive path for modern AI architects. Master neural networks, scaling models, and production AI.', courseOrder: [] },
        { trackId: 'data-science', trackTitle: 'Data Science', description: 'Master the data lifecycle, from SQL exploration to advanced predictive modeling and visualization.', courseOrder: [] }
    ]).sort((a, b) => order.indexOf(a.trackId) - order.indexOf(b.trackId))
        .map(t => {
            if (t.trackId === 'machine-learning') return { ...t, icon: Cpu, color: "text-primary bg-primary/10 border-primary/20" };
            if (t.trackId === 'data-science') return { ...t, icon: Database, color: "text-blue-500 bg-blue-500/10 border-blue-500/20" };
            return { ...t, icon: Brain, color: "text-purple-500 bg-purple-500/10 border-purple-500/20" };
        });

    return (
        <div className="relative isolate min-h-screen bg-background overflow-hidden pb-32">
            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-purple-500/5 blur-[100px] rounded-full" />
            </div>

            <div className="mx-auto max-w-7xl px-6 lg:px-8 pt-24 sm:pt-32">
                <header className="max-w-2xl mb-24 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-primary/20 mb-8 w-fit">
                        <Sparkles size={12} fill="currentColor" />
                        Explore Curriculum
                    </div>
                    <h1 className="text-5xl sm:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                        Architect Your <br />
                        <span className="hero-gradient">Future in AI</span>
                    </h1>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        Select a specialized learning track to begin your journey.
                        Each path is designed to take you from fundamentals to
                        production-ready expertise.
                    </p>
                </header>

                <div className="grid gap-8 md:grid-cols-2 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                    {displayTracks.map((track) => {
                        const Icon = track.icon;
                        const isExternal = !!track.externalUrl;
                        return (
                            <Link
                                key={track.trackId}
                                href={isExternal ? track.externalUrl! : `/learn/${track.trackId}`}
                                target={isExternal ? "_blank" : undefined}
                                rel={isExternal ? "noopener noreferrer" : undefined}
                                className="group relative rounded-[3rem] border border-white/5 bg-muted/20 p-10 transition-all duration-500 hover:border-primary/20 hover:bg-muted/30 shadow-2xl block overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-700">
                                    <Icon size={180} />
                                </div>

                                <div className="relative z-10">
                                    <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-8 border transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6", track.color)}>
                                        <Icon size={28} />
                                    </div>

                                    <h3 className="text-3xl font-black tracking-tight mb-4 group-hover:text-primary transition-colors">
                                        {track.trackTitle}
                                    </h3>

                                    <p className="text-muted-foreground leading-relaxed mb-10 text-lg group-hover:text-foreground/80 transition-colors">
                                        {track.description}
                                    </p>

                                    <div className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-primary opacity-60 group-hover:opacity-100 transition-all group-hover:translate-x-2">
                                        Enter Path
                                        <ArrowRight size={18} />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}

                    <div className="relative rounded-[3rem] border border-dashed border-white/10 p-10 flex flex-col justify-center items-center text-center group bg-card/10 hover:border-primary/20 transition-all">
                        <div className="w-14 h-14 rounded-2xl bg-muted/50 flex items-center justify-center mb-6 text-muted-foreground/30">
                            <Rocket size={28} />
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-muted-foreground/50">More Paths Coming</h3>
                        <p className="text-sm text-muted-foreground/30 max-w-[200px]">We are constantly building new curricula for the AI era.</p>
                    </div>
                </div>

                {/* FAQ/Info */}
                <div className="mt-40 grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-white/5 pt-20">
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-4">Production Grade</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">Our curriculum is built for real-world application, focusing on tools like Pyodide, Gemini API, and Modern ML Frameworks.</p>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-4">Hands-On Projects</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">Every track concludes with a portfolio project designed to showcase your architectural decisions and coding prowess.</p>
                    </div>
                    <div>
                        <h4 className="font-black text-xs uppercase tracking-widest text-primary mb-4">AI-Powered Support</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">Integrated AI tutors provide context-aware assistance throughout your learning journey, mirroring a real mentorship experience.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
