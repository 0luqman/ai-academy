import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

export interface Track {
    trackId: string;
    trackTitle: string;
    description: string;
    courseOrder: string[];
    externalUrl?: string;
}

export interface Course {
    courseId: string;
    courseSlug: string;
    courseTitle: string;
    track: string;
    description: string;
    difficulty: string;
    estimatedHours: number;
    chapterOrder: string[];
}

export interface Chapter {
    chapterId: string;
    courseId: string;
    chapterSlug: string;
    chapterTitle: string;
    order: number;
    lessonOrder: string[];
    estimatedMinutes: number;
}

export interface LessonFrontmatter {
    lessonId: string;
    courseId: string;
    chapterId: string;
    lessonSlug: string;
    lessonTitle: string;
    order: number;
    difficulty: string;
    estimatedMinutes: number;
    prerequisites: string[];
    learningObjectives: string[];
    sourceFiles: string[];
    practiceExercises: string[];
    quiz: any[];
}

export interface Lesson {
    frontmatter: LessonFrontmatter;
    content: string;
}

export function getAllTracks(): Track[] {
    const tracksDir = path.join(contentDir, 'tracks');
    if (!fs.existsSync(tracksDir)) return [];
    const files = fs.readdirSync(tracksDir);
    return files.map(file => {
        const raw = fs.readFileSync(path.join(tracksDir, file), 'utf-8');
        return JSON.parse(raw);
    });
}

export function getTrack(trackId: string): Track | null {
    const file = path.join(contentDir, 'tracks', `${trackId}.json`);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function getCourse(courseSlug: string): Course | null {
    const file = path.join(contentDir, 'courses', courseSlug, 'course.json');
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function getCoursesInTrack(trackId: string): Course[] {
    const track = getTrack(trackId);
    if (!track) return [];
    return track.courseOrder.map(courseSlug => getCourse(courseSlug)).filter(Boolean) as Course[];
}

export function getChapter(courseSlug: string, chapterSlug: string): Chapter | null {
    const file = path.join(contentDir, 'courses', courseSlug, 'chapters', chapterSlug, 'chapter.json');
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

export function getChaptersInCourse(courseSlug: string): Chapter[] {
    const course = getCourse(courseSlug);
    if (!course) return [];
    return course.chapterOrder.map(chapterSlug => getChapter(courseSlug, chapterSlug)).filter(Boolean) as Chapter[];
}

const lessonFrontmatterCache = new Map<string, LessonFrontmatter>();

export function getLessonFrontmatter(courseSlug: string, chapterSlug: string, lessonSlug: string): LessonFrontmatter | null {
    const cacheKey = `${courseSlug}-${chapterSlug}-${lessonSlug}`;
    if (lessonFrontmatterCache.has(cacheKey)) {
        return lessonFrontmatterCache.get(cacheKey)!;
    }

    const file = path.join(contentDir, 'courses', courseSlug, 'chapters', chapterSlug, `${lessonSlug}.mdx`);
    if (!fs.existsSync(file)) {
        // Fallback to legacy location for now during migration
        const legacyFile = path.join(contentDir, 'mdx', `${lessonSlug}.mdx`);
        if (!fs.existsSync(legacyFile)) return null;

        const raw = fs.readFileSync(legacyFile, 'utf-8');
        const { data } = matter(raw);
        const frontmatter = data as LessonFrontmatter;
        lessonFrontmatterCache.set(cacheKey, frontmatter);
        return frontmatter;
    }

    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = matter(raw);
    const frontmatter = data as LessonFrontmatter;

    lessonFrontmatterCache.set(cacheKey, frontmatter);
    return frontmatter;
}

export function getLesson(courseSlug: string, chapterSlug: string, lessonSlug: string): Lesson | null {
    let file = path.join(contentDir, 'courses', courseSlug, 'chapters', chapterSlug, `${lessonSlug}.mdx`);
    if (!fs.existsSync(file)) {
        file = path.join(contentDir, 'mdx', `${lessonSlug}.mdx`);
        if (!fs.existsSync(file)) return null;
    }

    const raw = fs.readFileSync(file, 'utf-8');
    const { data, content } = matter(raw);

    const frontmatter = data as LessonFrontmatter;
    const cacheKey = `${courseSlug}-${chapterSlug}-${lessonSlug}`;
    lessonFrontmatterCache.set(cacheKey, frontmatter);

    return { frontmatter, content };
}

export function getLessonsInChapter(courseSlug: string, chapterSlug: string): LessonFrontmatter[] {
    const chapter = getChapter(courseSlug, chapterSlug);
    if (!chapter) return [];
    return chapter.lessonOrder.map(lessonSlug => {
        return getLessonFrontmatter(courseSlug, chapterSlug, lessonSlug);
    }).filter(Boolean) as LessonFrontmatter[];
}
