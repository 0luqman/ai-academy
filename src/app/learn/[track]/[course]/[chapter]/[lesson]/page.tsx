import { getLesson, getCourse, getChapter, getLessonsInChapter, getChaptersInCourse } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import Link from "next/link";

export default function LessonPage({
    params
}: {
    params: { track: string, course: string, chapter: string, lesson: string }
}) {
    const course = getCourse(params.course);
    const chapter = getChapter(params.course, params.chapter);
    const lesson = getLesson(params.course, params.chapter, params.lesson);

    const lessons = getLessonsInChapter(params.course, params.chapter);

    if (!course || !chapter || !lesson) return notFound();

    return (
        <div className="flex min-h-screen">
            {/* Sidebar Navigation */}
            <aside className="hidden w-72 flex-col border-r bg-muted/20 md:flex">
                <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-6">
                    <Link href={`/learn/${params.track}/${params.course}`} className="text-sm font-medium text-muted-foreground hover:text-foreground mb-6 inline-flex items-center">
                        ← Course Overview
                    </Link>
                    <h4 className="font-semibold mb-4 text-xs uppercase tracking-wider text-muted-foreground">
                        {chapter.chapterTitle}
                    </h4>
                    <nav className="flex flex-col space-y-1">
                        {lessons.map((l: any, index: number) => (
                            <Link
                                key={`${l.lessonId}-${index}`}
                                href={`/learn/${params.track}/${params.course}/${params.chapter}/${l.lessonSlug}`}
                                className={`text-sm rounded-md px-3 py-2 transition-colors ${l.lessonSlug === params.lesson
                                    ? "font-medium text-primary bg-primary/10 border-l-2 border-primary"
                                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                                    }`}
                            >
                                {index + 1}. {l.lessonTitle}
                            </Link>
                        ))}
                    </nav>

                    <div className="mt-8 pt-6 border-t font-semibold text-xs uppercase text-muted-foreground mb-4">
                        Other Modules
                    </div>
                    <div className="flex flex-col space-y-1">
                        {getChaptersInCourse(params.course)
                            .filter(c => c.chapterSlug !== params.chapter)
                            .map((c: any) => (
                                <Link
                                    key={c.chapterId}
                                    href={`/learn/${params.track}/${params.course}/${c.chapterSlug}`}
                                    className="text-sm text-muted-foreground hover:text-foreground px-3 py-1"
                                >
                                    {c.chapterTitle}
                                </Link>
                            ))}
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full max-w-4xl px-4 py-8 md:px-12 md:py-12 mx-auto">
                <div className="mb-8">
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-4">
                        <span>{params.track.replace('-', ' ')}</span>
                        <span>/</span>
                        <span>{course.courseTitle}</span>
                        <span>/</span>
                        <span className="font-medium text-foreground">{chapter.chapterTitle}</span>
                    </div>
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl mt-2 mb-4">
                        {lesson.frontmatter.lessonTitle}
                    </h1>
                    <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider border border-primary/20">
                            {lesson.frontmatter.difficulty}
                        </span>
                        <span className="bg-muted px-3 py-1 rounded-full border">
                            ~{lesson.frontmatter.estimatedMinutes} mins
                        </span>
                    </div>

                    {lesson.frontmatter.learningObjectives && lesson.frontmatter.learningObjectives.length > 0 && (
                        <div className="mt-8 bg-card border rounded-lg p-5">
                            <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-3">Learning Objectives</h4>
                            <ul className="list-disc pl-5 text-sm space-y-1">
                                {lesson.frontmatter.learningObjectives.map((obj, i) => (
                                    <li key={i}>{obj}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="prose prose-invert max-w-none mt-10">
                    {/* Render the MDX using next-mdx-remote and inject custom components */}
                    <MDXRemote
                        source={lesson.content}
                        components={mdxComponents}
                    />
                </div>

                <div className="mt-16 pt-8 border-t flex justify-between items-center">
                    <button className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-50">
                        ← Previous Lesson
                    </button>
                    <button className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 disabled:opacity-50">
                        Mark Complete & Next →
                    </button>
                </div>
            </main>
        </div>
    );
}
