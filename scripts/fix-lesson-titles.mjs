import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const mdxDir = path.join(process.cwd(), 'content/mdx');

function toHumanReadable(slug) {
  const acronyms = ['AI', 'ML', 'DS', 'GDP', 'US', 'SQL', 'IDE', 'Jupyter', 'Frida', 'Kahlo', 'API'];

  return slug
    .split(/[-._ ]/)
    .filter(Boolean)
    .map(word => {
      const upperWord = word.toUpperCase();
      if (acronyms.includes(upperWord)) return upperWord;
      if (word.toLowerCase() === 'dsf') return 'DSF';
      if (word.toLowerCase() === 'dscp') return 'DSCP';
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

async function fixTitles() {
  const files = fs.readdirSync(mdxDir);

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const filePath = path.join(mdxDir, file);
    let rawContent = fs.readFileSync(filePath, 'utf-8');

    // Manual fix for problematic YAML if detected
    if (rawContent.includes('lessonTitle: Python Lists Project: Medical Insurance')) {
        rawContent = rawContent.replace('lessonTitle: Python Lists Project: Medical Insurance', 'lessonTitle: "Python Lists Project: Medical Insurance"');
    }

    let data, content;
    try {
        const result = matter(rawContent);
        data = result.data;
        content = result.content;
    } catch (e) {
        console.error(`Error parsing ${file}:`, e.message);
        continue;
    }

    const currentTitle = data.lessonTitle || '';

    if (currentTitle.includes('-') || currentTitle.includes('_') || (currentTitle === currentTitle.toLowerCase() && currentTitle.length > 0)) {
      const newTitle = toHumanReadable(currentTitle);
      console.log(`Fixing: "${currentTitle}" -> "${newTitle}"`);
      data.lessonTitle = newTitle;

      const newContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newContent);
    }
  }
}

fixTitles().catch(console.error);
