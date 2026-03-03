import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDir = path.join(process.cwd(), 'content');

function getTrack(trackId) {
    const file = path.join(contentDir, 'tracks', `${trackId}.json`);
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function getCourse(courseSlug) {
    const file = path.join(contentDir, 'courses', courseSlug, 'course.json');
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function getChapter(courseSlug, chapterSlug) {
    const file = path.join(contentDir, 'courses', courseSlug, 'chapters', chapterSlug, 'chapter.json');
    if (!fs.existsSync(file)) return null;
    return JSON.parse(fs.readFileSync(file, 'utf-8'));
}

function getLessonTitle(lessonSlug) {
    const file = path.join(contentDir, 'mdx', `${lessonSlug}.mdx`);
    if (!fs.existsSync(file)) return lessonSlug;
    const raw = fs.readFileSync(file, 'utf-8');
    const { data } = matter(raw);
    return data.lessonTitle || lessonSlug;
}

function generateIndex() {
    const tracksDir = path.join(contentDir, 'tracks');
    const trackFiles = fs.readdirSync(tracksDir);

    const curriculum = trackFiles.map(file => {
        const trackId = path.basename(file, '.json');
        const track = getTrack(trackId);

        return {
            trackId: track.trackId,
            trackTitle: track.trackTitle,
            externalUrl: track.externalUrl,
            courses: track.courseOrder.map(courseSlug => {
                const course = getCourse(courseSlug);
                if (!course) return null;

                return {
                    courseId: course.courseId,
                    courseTitle: course.courseTitle,
                    chapters: course.chapterOrder.map(chapterSlug => {
                        const chapter = getChapter(courseSlug, chapterSlug);
                        if (!chapter) return null;

                        return {
                            chapterId: chapter.chapterId,
                            chapterTitle: chapter.chapterTitle,
                            lessons: chapter.lessonOrder.map(lessonSlug => ({
                                lessonSlug,
                                lessonTitle: getLessonTitle(lessonSlug)
                            }))
                        };
                    }).filter(Boolean)
                };
            }).filter(Boolean)
        };
    });

    fs.writeFileSync(
        path.join(contentDir, 'content-index.json'),
        JSON.stringify(curriculum, null, 2)
    );
    console.log('Curriculum index generated successfully!');
}

generateIndex();
