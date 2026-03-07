const fs = require('fs');
const path = require('path');

const contentDir = path.join(process.cwd(), 'content');
const mdxDir = path.join(contentDir, 'mdx');
const coursesDir = path.join(contentDir, 'courses');

function migrate() {
    // 1. Get all courses
    const courses = fs.readdirSync(coursesDir);

    courses.forEach(courseSlug => {
        const coursePath = path.join(coursesDir, courseSlug);
        if (!fs.statSync(coursePath).isDirectory()) return;

        // 2. Get course metadata
        const courseJsonPath = path.join(coursePath, 'course.json');
        if (!fs.existsSync(courseJsonPath)) return;
        const course = JSON.parse(fs.readFileSync(courseJsonPath, 'utf-8'));

        // 3. Process chapters
        const chaptersDir = path.join(coursePath, 'chapters');
        if (!fs.existsSync(chaptersDir)) return;

        const chapters = fs.readdirSync(chaptersDir);
        chapters.forEach(chapterSlug => {
            const chapterPath = path.join(chaptersDir, chapterSlug);
            if (!fs.statSync(chapterPath).isDirectory()) return;

            const chapterJsonPath = path.join(chapterPath, 'chapter.json');
            if (!fs.existsSync(chapterJsonPath)) return;
            const chapter = JSON.parse(fs.readFileSync(chapterJsonPath, 'utf-8'));

            // 4. Move lessons
            chapter.lessonOrder.forEach(lessonSlug => {
                const sourceMdx = path.join(mdxDir, `${lessonSlug}.mdx`);
                const destChapterDir = path.join(chapterPath, 'lessons');

                if (!fs.existsSync(destChapterDir)) {
                    fs.mkdirSync(destChapterDir, { recursive: true });
                }

                const destMdx = path.join(destChapterDir, `${lessonSlug}.mdx`);

                if (fs.existsSync(sourceMdx)) {
                    console.log(`Moving ${lessonSlug}.mdx to ${courseSlug}/${chapterSlug}`);
                    fs.copyFileSync(sourceMdx, destMdx);
                    // fs.unlinkSync(sourceMdx); // Delete after verification or do it manually
                } else {
                    console.warn(`Source MDX not found: ${sourceMdx}`);
                }
            });
        });
    });
}

migrate();
