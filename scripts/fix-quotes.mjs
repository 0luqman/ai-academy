import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const mdxDir = path.join(process.cwd(), 'content/mdx');

async function fixQuotes() {
  const files = fs.readdirSync(mdxDir);

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const filePath = path.join(mdxDir, file);
    let rawContent = fs.readFileSync(filePath, 'utf-8');

    // Check if the title has a colon and is NOT quoted
    const titleMatch = rawContent.match(/^lessonTitle: (.*)$/m);
    if (titleMatch) {
        const title = titleMatch[1];
        if (title.includes(':') && !title.startsWith('"') && !title.startsWith("'")) {
            console.log(`Fixing title in ${file}: ${title}`);
            const fixedTitle = `"${title.replace(/"/g, '\\"')}"`;
            rawContent = rawContent.replace(`lessonTitle: ${title}`, `lessonTitle: ${fixedTitle}`);
            fs.writeFileSync(filePath, rawContent);
        }
    }
  }
}

fixQuotes().catch(console.error);
