const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('client/src', function(filePath) {
    if (filePath.endsWith('.jsx')) {
        let content = fs.readFileSync(filePath, 'utf-8');
        if (content.includes('inset-0-[100]')) {
            // Replace inset-0-[100] with inset-0 z-[100] overflow-y-auto
            let newContent = content.replace(/inset-0-\[100\]/g, 'inset-0 z-[100] overflow-y-auto');
            fs.writeFileSync(filePath, newContent, 'utf-8');
            console.log(`Fixed ${filePath}`);
        }
    }
});
