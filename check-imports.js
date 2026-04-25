import fs from 'fs';
import path from 'path';

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(fullPath);
    }
  });
  return results;
};

const srcFiles = walk('./src').filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

srcFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const importLines = content.match(/from\s+['"](.*?)['"]/g);
  if (importLines) {
    importLines.forEach(line => {
      const importPath = line.match(/['"](.*?)['"]/)[1];
      if (importPath.startsWith('.')) {
        const absolutePath = path.resolve(path.dirname(file), importPath);
        const extensions = ['', '.jsx', '.js', '.css', '.svg', '.png', '.jpg'];
        let found = false;
        for (const ext of extensions) {
          const p = absolutePath + ext;
          if (fs.existsSync(p)) {
            // Check case sensitivity
            const actualDir = path.dirname(p);
            const actualFile = path.basename(p);
            const filesInDir = fs.readdirSync(actualDir);
            if (!filesInDir.includes(actualFile)) {
              console.error(`Case mismatch in ${file}: expected ${actualFile} but found something else?`);
            }
            found = true;
            break;
          }
        }
        if (!found) {
          console.error(`Missing import in ${file}: ${importPath}`);
        }
      }
    });
  }
});
