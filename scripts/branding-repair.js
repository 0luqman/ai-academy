const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'public'];

function replaceInFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Perform replacements
        // 1. AI Academy by RiWoT -> AI Academy by RiWoT
        content = content.replace(/AI Academy by RiWoT/g, 'AI Academy by RiWoT');
        content = content.replace(/AI Academy by RiWoT/g, 'AI Academy by RiWoT');

        // 2. AI Academy by RiWoT -> AI Academy by RiWoT (to ensure consistency)
        // We avoid replacing it if it already has "by RiWoT"
        content = content.replace(/AI Academy by RiWoT(?!\s+by\s+RiWoT)/g, 'AI Academy by RiWoT');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated: ${filePath}`);
        }
    } catch (err) {
        // Skip binary files or errors
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(file)) {
                walkDir(fullPath);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            if (['.md', '.mdx', '.tsx', '.ts', '.js', '.jsx', '.json', '.html'].includes(ext)) {
                replaceInFile(fullPath);
            }
        }
    }
}

console.log('Starting branding replacement: "AI Academy by RiWoT" -> "AI Academy by RiWoT"');
walkDir(ROOT_DIR);
console.log('Replacement complete.');
