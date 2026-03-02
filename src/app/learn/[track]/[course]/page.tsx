import { getCourse, getChaptersInCourse, getLessonsInChapter } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function CoursePage({ params }: { params: { track: string, course: string } }) {
    const course = getCourse(params.course);
    if (!course) return notFound();

    const chapters = getChaptersInCourse(params.course);

    return (
        <div className="container max-w-4xl py-12">
            <Link href={`/learn/${params.track}`} className="text-sm font-medium text-muted-foreground hover:text-foreground mb-8 inline-flex items-center">
                ← Back to {params.track.replace('-', ' ')}
            </Link>

            <div className="mb-12 border-b pb-8">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-2 mb-4">
                    {course.courseTitle}
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                    {course.description}
                </p>
                <div className="flex gap-4 text-sm font-medium text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase text-xs tracking-wider">
                        {course.difficulty}
                    </span>
                    <span className="bg-muted px-3 py-1 rounded-full text-xs tracking-wider">
                        ~{course.estimatedHours} hours
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-12">
                <div className="space-y-12">
                    {chapters.map((chapter: any) => {
                        const lessons = getLessonsInChapter(course.courseSlug, chapter.chapterSlug);

                        return (
                            <div key={chapter.chapterId} id={chapter.chapterSlug} className="relative pl-8 border-l-2 border-muted scroll-mt-24">
                                <div className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-background bg-muted"></div>
                                <h3 className="text-2xl font-semibold tracking-tight mb-6">
                                    {chapter.chapterTitle}
                                </h3>

                                <div className="grid gap-3 mt-6">
                                    {lessons.map((lesson: any, index: number) => (
                                        <Link
                                            key={`${lesson.lessonId}-${index}`}
                                            href={`/learn/${params.track}/${course.courseSlug}/${chapter.chapterSlug}/${lesson.lessonSlug}`}
                                            prefetch={false}
                                            className="group border rounded-xl p-4 hover:border-primary/50 transition-all bg-card/40 backdrop-blur-sm glass-card flex justify-between items-center"
                                        >
                                            <div className="flex items-center gap-4">
                                                <span className="text-[10px] font-bold text-muted-foreground bg-muted w-7 h-7 flex items-center justify-center rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                                                    {(index + 1).toString().padStart(2, '0')}
                                                </span>
                                                <h4 className="font-semibold text-sm group-hover:text-primary transition-colors">
                                                    {lesson.lessonTitle}
                                                </h4>
                                            </div>
                                            <div className="text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-1 group-hover:translate-x-0">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <aside className="hidden md:block">
                    <div className="sticky top-24 space-y-4">
                        <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground px-2">
                            Modules
                        </h4>
                        <nav className="flex flex-col space-y-1">
                            {chapters.map((chapter) => (
                                <a
                                    key={chapter.chapterId}
                                    href={`#${chapter.chapterSlug}`}
                                    className="text-sm text-muted-foreground hover:text-primary hover:bg-muted/50 px-2 py-1.5 rounded-md transition-all"
                                >
                                    {chapter.chapterTitle}
                                </a>
                            ))}
                        </nav>
                    </div>
                </aside>
            </div>
        </div>
    );
}
