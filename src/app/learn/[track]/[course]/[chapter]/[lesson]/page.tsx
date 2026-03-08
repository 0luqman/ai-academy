import { getLesson, getCourse, getChapter, getLessonsInChapter, getChaptersInCourse } from "@/lib/content";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/components/mdx-components";
import Link from "next/link";
import { ChevronRight, ChevronLeft, BookOpen, Clock, BarChart3, Menu, X, Rocket, Loader2 } from "lucide-react";
import { ContentErrorBoundary } from "@/components/ContentErrorBoundary";
import { Suspense } from "react";

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

    const currentLessonIndex = lessons.findIndex(l => l.lessonSlug === params.lesson);
    const prevLesson = currentLessonIndex > 0 ? lessons[currentLessonIndex - 1] : null;
    const nextLesson = currentLessonIndex < lessons.length - 1 ? lessons[currentLessonIndex + 1] : null;

    return (
        <div className="flex min-h-screen bg-background/50 backdrop-blur-3xl">
            {/* Sidebar Navigation */}
            <aside className="hidden w-[320px] flex-col border-r bg-card/30 backdrop-blur-xl md:flex">
                <div className="sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
                    <Link href={`/learn/${params.track}/${params.course}`} className="text-sm font-bold text-muted-foreground hover:text-primary mb-8 inline-flex items-center gap-2 transition-colors group">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Course Overview
                    </Link>

                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            <BookOpen size={16} />
                        </div>
                        <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                            {chapter.chapterTitle}
                        </h4>
                    </div>

                    <nav className="flex flex-col space-y-1 ml-1 border-l border-white/5 pl-4">
                        {lessons.map((l: any, index: number) => {
                            const isActive = l.lessonSlug === params.lesson;
                            return (
                                <Link
                                    key={`${l.lessonId}-${index}`}
                                    href={`/learn/${params.track}/${params.course}/${params.chapter}/${l.lessonSlug}`}
                                    prefetch={false}
                                    className={`relative text-sm rounded-xl px-4 py-3 transition-all duration-300 group ${isActive
                                        ? "font-bold text-primary bg-primary/10 shadow-sm"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                                        }`}
                                >
                                    {isActive && (
                                        <div className="absolute left-[-17px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-full shadow-[0_0_12px_rgba(59,130,246,0.5)]" />
                                    )}
                                    <span className="opacity-40 font-mono mr-2 text-[10px]">{String(index + 1).padStart(2, '0')}</span>
                                    {l.lessonTitle}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="mt-12 pt-8 border-t border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <BarChart3 size={16} />
                            </div>
                            <div className="font-bold text-xs uppercase tracking-[0.2em] text-muted-foreground/60">
                                Modules
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2 ml-1">
                            {getChaptersInCourse(params.course)
                                .map((c: any) => (
                                    <Link
                                        key={c.chapterId}
                                        href={`/learn/${params.track}/${params.course}/${c.chapterSlug}`}
                                        className={`text-sm px-4 py-2 rounded-lg transition-colors border ${c.chapterSlug === params.chapter
                                            ? "border-primary/20 bg-primary/5 text-primary font-bold"
                                            : "border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30"}`}
                                    >
                                        {c.chapterTitle}
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 w-full relative">
                <div className="max-w-4xl px-6 py-12 md:px-16 md:py-20 mx-auto">
                    {/* Breadcrumbs */}
                    <nav className="mb-12 flex items-center space-x-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground/40">
                        <Link href="/learn" className="hover:text-primary transition-colors">Academy</Link>
                        <ChevronRight size={12} className="opacity-50" />
                        <Link href={`/learn/${params.track}`} className="hover:text-primary transition-colors">{params.track.replace(/-/g, ' ')}</Link>
                        <ChevronRight size={12} className="opacity-50" />
                        <span className="text-muted-foreground/80">{course.courseTitle}</span>
                    </nav>

                    {/* Header */}
                    <header className="mb-16">
                        <h1 className="scroll-m-20 text-4xl font-black tracking-tight lg:text-6xl mb-8 leading-[1.1]">
                            {lesson.frontmatter.lessonTitle}
                        </h1>
                        <div className="flex flex-wrap items-center gap-4">
                            <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest border border-primary/20">
                                <Rocket size={14} />
                                {lesson.frontmatter.difficulty}
                            </div>
                            <div className="flex items-center gap-2 bg-muted/50 text-muted-foreground px-4 py-1.5 rounded-full text-xs font-bold border border-white/5">
                                <Clock size={14} />
                                ~{lesson.frontmatter.estimatedMinutes} mins
                            </div>
                        </div>

                        {lesson.frontmatter.learningObjectives && lesson.frontmatter.learningObjectives.length > 0 && (
                            <div className="mt-12 group">
                                <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-card to-card/50 p-8 shadow-2xl transition-all hover:border-primary/20">
                                    <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                                        <BookOpen size={120} />
                                    </div>
                                    <h4 className="font-bold text-xs uppercase tracking-[0.3em] text-primary mb-6 flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                        Learning Objectives
                                    </h4>
                                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {lesson.frontmatter.learningObjectives.map((obj, i) => (
                                            <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                                <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/40" />
                                                {obj}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </header>

                    {/* MDX Content */}
                    <article className="prose prose-invert prose-blue max-w-none
                        prose-headings:font-black prose-headings:tracking-tight
                        prose-h2:text-4xl prose-h2:mt-20 prose-h2:mb-8
                        prose-h3:text-2xl prose-h3:mt-12
                        prose-p:text-lg prose-p:leading-relaxed prose-p:text-muted-foreground
                        prose-a:text-primary prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-foreground prose-strong:font-bold
                        prose-img:rounded-[2rem] prose-img:border prose-img:border-white/10 prose-img:shadow-2xl">
                        <ContentErrorBoundary>
                            <Suspense fallback={
                                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                    <Loader2 className="w-8 h-8 text-primary animate-spin" />
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Loading interactive content...</p>
                                </div>
                            }>
                                <MDXRemote
                                    source={lesson.content}
                                    components={mdxComponents}
                                />
                            </Suspense>
                        </ContentErrorBoundary>
                    </article>

                    {/* Navigation Footer */}
                    <nav className="mt-24 pt-12 border-t border-white/5 flex flex-col sm:flex-row justify-between items-stretch gap-6">
                        {prevLesson ? (
                            <Link
                                href={`/learn/${params.track}/${params.course}/${params.chapter}/${prevLesson.lessonSlug}`}
                                className="group flex-1 flex flex-col p-6 rounded-[2rem] border border-white/5 bg-muted/20 hover:bg-muted/40 transition-all hover:border-primary/20"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground mb-2 flex items-center gap-2">
                                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                    Previous Lesson
                                </span>
                                <span className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{prevLesson.lessonTitle}</span>
                            </Link>
                        ) : <div className="flex-1" />}

                        {nextLesson ? (
                            <Link
                                href={`/learn/${params.track}/${params.course}/${params.chapter}/${nextLesson.lessonSlug}`}
                                className="group flex-1 flex flex-col items-end text-right p-6 rounded-[2rem] border border-primary/10 bg-primary/5 hover:bg-primary/10 transition-all hover:border-primary/40 shadow-xl shadow-primary/5"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary mb-2 flex items-center gap-2">
                                    Next Lesson
                                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </span>
                                <span className="text-lg font-bold group-hover:text-primary transition-colors line-clamp-1">{nextLesson.lessonTitle}</span>
                            </Link>
                        ) : (
                            <Link
                                href={`/learn/${params.track}/${params.course}`}
                                className="group flex-1 flex flex-col items-end text-right p-6 rounded-[2rem] border border-emerald-500/10 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all hover:border-emerald-500/40"
                            >
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2 flex items-center gap-2">
                                    Course Complete
                                    <Rocket size={14} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                                </span>
                                <span className="text-lg font-bold group-hover:text-emerald-400 transition-colors">Return to Overview</span>
                            </Link>
                        )}
                    </nav>
                </div>
            </main>
        </div>
    );
}
