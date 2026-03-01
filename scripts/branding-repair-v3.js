const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'public'];

function replaceInFile(filePath) {
    if (filePath.includes('branding-repair-v3.js')) return;
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Perform replacements
        // 1. Codecademy -> AI Academy by RiWoT
        content = content.replace(/Codecademy/g, 'AI Academy by RiWoT');
        content = content.replace(/codecademy/g, 'AI Academy by RiWoT');

        // 2. PyGuide -> AI Academy by RiWoT
        content = content.replace(/PyGuide\s+AI/g, 'AI Academy by RiWoT');
        content = content.replace(/PyGuide/g, 'AI Academy by RiWoT');

        // 3. AI Academy -> AI Academy by RiWoT (consistency check)
        content = content.replace(/AI Academy(?!\s+by\s+RiWoT)/g, 'AI Academy by RiWoT');

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
            if (['.md', '.mdx', '.tsx', '.ts', '.js', '.jsx', '.json', '.html', '.mhtml', '.htm'].includes(ext)) {
                replaceInFile(fullPath);
            }
        }
    }
}

console.log('Starting branding replacement v3: "Codecademy", "PyGuide" -> "AI Academy by RiWoT"');
console.log('Including .mhtml and .htm files...');
walkDir(ROOT_DIR);
console.log('Replacement complete.');
