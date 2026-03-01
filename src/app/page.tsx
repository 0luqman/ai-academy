import Link from 'next/link';

export default function Home() {
    return (
        <div className="relative isolate min-h-screen bg-background text-foreground overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl -z-10 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-purple-500/10 blur-[100px] rounded-full" />
            </div>

            {/* Hero Section */}
            <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
                <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
                    <div className="flex">
                        <div className="relative rounded-full px-4 py-1.5 text-sm leading-6 text-primary border border-primary/20 glass hover:border-primary/40 transition-all font-medium">
                            Designed for Excellence by RiWoT
                            <Link href="/about" className="ml-3 font-semibold text-foreground/80 hover:text-primary transition-colors">
                                <span className="absolute inset-0" aria-hidden="true" />
                                Learn More <span aria-hidden="true">&rarr;</span>
                            </Link>
                        </div>
                    </div>

                    <h1 className="mt-10 text-5xl font-extrabold hero-gradient sm:text-7xl leading-[1.1]">
                        AI Academy by RiWoT
                    </h1>

                    <p className="mt-8 text-xl leading-relaxed text-muted-foreground/90 max-w-2xl">
                        Master the complex world of Artificial Intelligence, Machine Learning, and Data Science.
                        A high-fidelity learning platform designed by **Mir Luqman** and **Ibraheem Rashid**
                        to build the architects of tomorrow.
                    </p>

                    <div className="mt-12 flex flex-wrap items-center gap-6">
                        <Link
                            href="/learn"
                            className="rounded-xl bg-primary px-8 py-4 text-sm font-bold text-primary-foreground shadow-2xl shadow-primary/30 hover:bg-primary/90 transition-all hover:scale-105"
                        >
                            Start Learning Now
                        </Link>
                        <Link
                            href="/learn"
                            className="text-sm font-bold leading-6 text-foreground hover:text-primary transition-all flex items-center gap-2"
                        >
                            View Course Tracks <span aria-hidden="true">→</span>
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/5 pt-10">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50">Primary Architect</p>
                            <p className="mt-2 text-lg font-semibold border-l-2 border-primary pl-4">Mir Luqman</p>
                        </div>
                        <div>
                            <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground/50">Co-Developer</p>
                            <p className="mt-2 text-lg font-semibold border-l-2 border-primary pl-4">Ibraheem Rashid</p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 sm:mt-24 lg:mt-0 lg:flex-shrink-0 lg:flex-grow">
                    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
                        <div className="absolute -inset-2 rounded-3xl bg-primary/10 blur-2xl" />
                        <div className="relative glass-card rounded-3xl p-8 border border-white/10 shadow-3xl bg-[#0a0a0b]/80 backdrop-blur-3xl float text-white">
                            <div className="flex items-center space-x-2 mb-8">
                                <div className="h-3.5 w-3.5 rounded-full bg-red-500/20 border border-red-500/40" />
                                <div className="h-3.5 w-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                                <div className="h-3.5 w-3.5 rounded-full bg-green-500/20 border border-green-500/40" />
                                <span className="ml-4 text-xs font-mono text-white/30">riwot_ai_engine.py</span>
                            </div>
                            <div className="space-y-4 font-mono text-[13px] leading-relaxed">
                                <p className="text-primary italic"># Initializing AI Academy by RiWoT</p>
                                <p className="text-blue-400">import ml_architect as riwot</p>
                                <p className="text-purple-400">from riwot_ai import Tutor</p>
                                <p className="text-white">academy = riwot.create_platform(&quot;AI Academy&quot;)</p>
                                <p className="text-white">tutor = Tutor(vision=&quot;Excellence&quot;)</p>
                                <p className="text-green-400">tutor.guide(student=&quot;Your Potential&quot;)</p>
                                <p className="text-white/40">&gt; Status: Launching Future.exe</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Track Highlights */}
            <div className="mx-auto max-w-7xl px-6 lg:px-8 pb-32">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
                    {[
                        { title: 'Machine Learning', desc: 'Deep dive into neural networks, regression, and scaling AI.', color: 'from-primary/20' },
                        { title: 'Data Science', desc: 'Master the data lifecycle, from SQL exploration to visualization.', color: 'from-blue-600/20' },
                        { title: 'Practical AI', desc: 'Build and deploy real-world production applications.', color: 'from-emerald-600/20' },
                    ].map((track, i) => (
                        <Link
                            key={i}
                            href="/learn"
                            className={`group relative overflow-hidden rounded-3xl p-8 glass-card border-white/5 bg-gradient-to-br ${track.color} to-transparent hover:scale-[1.02] transition-all`}
                        >
                            <h3 className="text-2xl font-bold mb-4">{track.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed mb-6">{track.desc}</p>
                            <span className="text-sm font-bold text-primary group-hover:translate-x-2 transition-transform inline-block">
                                Explore Track &rarr;
                            </span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
