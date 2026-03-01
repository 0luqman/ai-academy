import { getAllTracks, Track } from "@/lib/content";
import Link from "next/link";

export default function LearnPage() {
    let tracks: Track[] = [];
    try {
        tracks = getAllTracks();
    } catch (e) {
        console.error("Failed to load tracks:", e);
    }

    // Default tracks if library fails or returns nothing
    const displayTracks: Track[] = tracks.length > 0 ? tracks : [
        { trackId: 'machine-learning', trackTitle: 'Machine Learning', description: 'Comprehensive path for machine learning and AI architecture.', courseOrder: [] },
        { trackId: 'data-science', trackTitle: 'Data Science', description: 'Master the data lifecycle, from SQL to advanced analysis.', courseOrder: [] }
    ];

    return (
        <div className="container max-w-5xl py-12">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mb-8">
                Learning Paths
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
                Choose a path below to start your journey into AI Academy by RiWoT.
            </p>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {displayTracks.map((track) => (
                    <Link key={track.trackId} href={`/learn/${track.trackId}`} className="group relative rounded-xl border p-6 hover:border-primary transition-colors block bg-card transition-all hover:scale-[1.02]">
                        <h3 className="font-semibold leading-none tracking-tight mb-3 text-xl font-bold">{track.trackTitle}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{track.description}</p>
                        <div className="mt-6 flex items-center text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                            View Path →
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
