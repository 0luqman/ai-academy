export default function AboutPage() {
    return (
        <div className="container max-w-3xl py-12">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
                About the People
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6 mb-8 text-lg text-muted-foreground">
                AI Academy by RiWoT is built by the RiWoT team, dedicated to opening the pathways of Machine Learning and Data Science to the world through high-quality, structured education.
            </p>

            <div className="grid gap-8 md:grid-cols-2 mt-8">
                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold text-xl leading-none tracking-tight mb-2">Mir Luqman</h3>
                    <p className="text-sm text-muted-foreground mb-4">Core Developer & Platform Architect</p>
                    <a
                        href="http://the.pop.site/"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Visit Portfolio →
                    </a>
                </div>

                <div className="rounded-xl border bg-card text-card-foreground shadow p-6">
                    <h3 className="font-semibold text-xl leading-none tracking-tight mb-2">Ibraheem Rashid</h3>
                    <p className="text-sm text-muted-foreground mb-4">Core Developer & Curriculum Engineer</p>
                    <a
                        href="https://github.com/ibraheem-rashid"
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm font-medium text-primary hover:underline"
                    >
                        Visit GitHub →
                    </a>
                </div>
            </div>
        </div>
    );
}
