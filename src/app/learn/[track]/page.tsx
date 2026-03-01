import { getTrack, getCoursesInTrack } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function TrackPage({ params }: { params: { track: string } }) {
    const track = getTrack(params.track);
    if (!track) return notFound();

    const courses = getCoursesInTrack(params.track);

    return (
        <div className="container max-w-4xl py-12">
            <Link href="/learn" className="text-sm font-medium text-muted-foreground hover:text-foreground mb-8 inline-flex items-center">
                ← Back to Paths
            </Link>

            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl my-6">
                {track.trackTitle}
            </h1>
            <p className="text-lg text-muted-foreground mb-12">
                {track.description}
            </p>

            <div className="grid gap-4">
                {courses.map((course: any) => (
                    <div key={course.courseId} className="flex flex-col justify-between rounded-xl border p-5 sm:flex-row sm:items-center bg-card hover:border-primary transition-all shadow-sm">
                        <div className="flex-1 pr-6">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className="font-semibold text-lg">{course.courseTitle}</h3>
                                <span className="text-[10px] uppercase tracking-widest bg-muted px-2 py-0.5 rounded text-muted-foreground">
                                    {course.difficulty}
                                </span>
                            </div>
                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                {course.description}
                            </p>
                        </div>
                        <Link
                            href={`/learn/${track.trackId}/${course.courseSlug}`}
                            className="mt-4 sm:mt-0 inline-flex h-9 items-center justify-center rounded-lg bg-primary px-6 text-xs font-semibold text-primary-foreground shadow transition-colors hover:bg-primary/90"
                        >
                            Enter
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
