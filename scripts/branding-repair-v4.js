const fs = require('fs');
const path = require('path');

const ROOT_DIR = process.cwd();
const EXCLUDE_DIRS = ['node_modules', '.next', '.git', 'public'];

function replaceInFile(filePath) {
    if (filePath.includes('branding-repair')) return;
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Perform replacements
        // 1. Codecademy -> AI Academy by RiWoT
        content = content.replace(/Codecademy/gi, 'AI Academy by RiWoT');
        content = content.replace(/codecademy\.com/gi, 'ai-academy.riwot.com');
        content = content.replace(/codecademy/gi, 'AI Academy by RiWoT');

        // 2. PyGuide -> AI Academy by RiWoT
        content = content.replace(/PyGuide\s+AI/gi, 'AI Academy by RiWoT');
        content = content.replace(/PyGuide/gi, 'AI Academy by RiWoT');

        // 3. AI Academy -> AI Academy by RiWoT (consistency check)
        // Avoid double suffixing
        content = content.replace(/AI Academy by RiWoT by RiWoT/g, 'AI Academy by RiWoT');
        content = content.replace(/AI Academy(?!\s+by\s+RiWoT)/g, 'AI Academy by RiWoT');

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated branding in: ${filePath}`);
        }
    } catch (err) {
        // console.error(`Error processing ${filePath}: ${err.message}`);
    }
}

function walkDir(dir) {
    let files;
    try {
        files = fs.readdirSync(dir);
    } catch (err) {
        return;
    }

    for (const file of files) {
        const fullPath = path.join(dir, file);
        let stat;
        try {
            stat = fs.statSync(fullPath);
        } catch (err) {
            continue;
        }

        if (stat.isDirectory()) {
            if (!EXCLUDE_DIRS.includes(file)) {
                walkDir(fullPath);
            }
        } else {
            const ext = path.extname(file).toLowerCase();
            // Aggressively check almost everything that could be text-based
            if (['.md', '.mdx', '.tsx', '.ts', '.js', '.jsx', '.json', '.html', '.mhtml', '.htm', '.txt', '.css', '.scss'].includes(ext)) {
                replaceInFile(fullPath);
            }
        }
    }
}

console.log('Starting Aggressive Branding Replacement v4');
walkDir(ROOT_DIR);
console.log('Finished.');
