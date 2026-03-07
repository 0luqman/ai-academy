const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const coursesDir = path.join(process.cwd(), 'content', 'courses');

function cleanup() {
    const courses = fs.readdirSync(coursesDir);
    courses.forEach(courseSlug => {
        const coursePath = path.join(coursesDir, courseSlug);
        if (!fs.statSync(coursePath).isDirectory()) return;

        const chaptersDir = path.join(coursePath, 'chapters');
        if (!fs.existsSync(chaptersDir)) return;

        const chapters = fs.readdirSync(chaptersDir);
        chapters.forEach(chapterSlug => {
            const chapterPath = path.join(chaptersDir, chapterSlug);
            const chapterJsonPath = path.join(chapterPath, 'chapter.json');
            if (!fs.existsSync(chapterJsonPath)) return;

            const chapter = JSON.parse(fs.readFileSync(chapterJsonPath, 'utf-8'));
            const lessonsDir = path.join(chapterPath, 'lessons');
            if (!fs.existsSync(lessonsDir)) return;

            const actualLessons = fs.readdirSync(lessonsDir)
                .filter(f => f.endsWith('.mdx'))
                .map(f => f.replace('.mdx', ''));

            // Sync lessonOrder with actual files
            const newLessonOrder = chapter.lessonOrder.filter(slug => actualLessons.includes(slug));

            // Add any missing lessons that are on disk but not in lessonOrder
            actualLessons.forEach(slug => {
                if (!newLessonOrder.includes(slug)) {
                    newLessonOrder.push(slug);
                }
            });

            chapter.lessonOrder = newLessonOrder;
            fs.writeFileSync(chapterJsonPath, JSON.stringify(chapter, null, 4));

            // Standardize MDX frontmatter
            newLessonOrder.forEach((lessonSlug, index) => {
                const lessonPath = path.join(lessonsDir, `${lessonSlug}.mdx`);
                if (!fs.existsSync(lessonPath)) return;

                const raw = fs.readFileSync(lessonPath, 'utf-8');
                const { data, content } = matter(raw);

                // Add or update common fields
                data.courseId = courseSlug;
                data.chapterId = chapterSlug;
                data.lessonSlug = lessonSlug;
                data.order = index + 1;

                // Set type based on slug or content
                if (lessonSlug.includes('quiz')) {
                    data.type = 'exercise';
                } else if (lessonSlug.includes('project') || lessonSlug.includes('challenge') || lessonSlug === 'code') {
                    data.type = 'exercise';
                } else if (lessonSlug.includes('snippet')) {
                    data.type = 'snippet';
                } else {
                    data.type = 'lesson';
                }

                const newMdx = matter.stringify(content, data);
                fs.writeFileSync(lessonPath, newMdx);
            });
        });
    });
}

cleanup();
