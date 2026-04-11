import fs from 'fs';
import path from 'path';

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else {
      results.push(file);
    }
  });
  return results;
};

const srcFiles = walk('./src').filter(f => f.endsWith('.jsx') || f.endsWith('.js'));

srcFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Replace AuthContext import with authStore import
  if (content.includes("import { useAuth } from")) {
    content = content.replace(/import { useAuth } from '.*context\/AuthContext';/g, "import { useAuthStore } from '../../store/authStore';");
    
    // Replace const { user } = useAuth();
    content = content.replace(/const { user } = useAuth\(\);/g, "const user = useAuthStore(state => state.user);");
    // Replace const { user: authUser } = useAuth();
    content = content.replace(/const { user: authUser } = useAuth\(\);/g, "const authUser = useAuthStore(state => state.user);");
    
    // In dispatch job detail
    content = content.replace(/const { useAuth: _useAuth, \.\.\.rest } = {};\n/g, "");

    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Updated', file);
  }
});
