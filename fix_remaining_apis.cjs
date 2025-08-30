const fs = require('fs');
const path = require('path');

// Fix remaining API URL issues
const fixes = [
  // Fix axios calls that are missing proper function calls
  { 
    pattern: /axios\(buildApiUrl\(([^)]+)\)/g, 
    replacement: 'axios.get(buildApiUrl($1))' 
  },
  { 
    pattern: /axios\.get\(buildApiUrl\(([^)]+)\)/g, 
    replacement: 'axios.get(buildApiUrl($1))' 
  },
  { 
    pattern: /axios\.post\(buildApiUrl\(([^)]+)\)/g, 
    replacement: 'axios.post(buildApiUrl($1))' 
  },
  { 
    pattern: /axios\.delete\(buildApiUrl\(([^)]+)\)/g, 
    replacement: 'axios.delete(buildApiUrl($1))' 
  },
  { 
    pattern: /axios\.put\(buildApiUrl\(([^)]+)\)/g, 
    replacement: 'axios.put(buildApiUrl($1))' 
  },
  
  // Fix specific broken patterns
  { 
    pattern: /`buildApiUrl\(([^)]+)\)\?/g, 
    replacement: '`${buildApiUrl($1)}?' 
  },
  { 
    pattern: /"buildApiUrl\(([^)]+)\)"/g, 
    replacement: 'buildApiUrl($1)' 
  },
  { 
    pattern: /'buildApiUrl\(([^)]+)\)'/g, 
    replacement: 'buildApiUrl($1)' 
  },
];

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Apply all fixes
    for (const fix of fixes) {
      if (content.match(fix.pattern)) {
        content = content.replace(fix.pattern, fix.replacement);
        hasChanges = true;
      }
    }
    
    // Write back to file if changes were made
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Fixed: ${filePath}`);
    } else {
      console.log(`⏭️  No fixes needed: ${filePath}`);
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

// Function to recursively find and process TypeScript/JavaScript files
function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  
  for (const file of files) {
    const filePath = path.join(dirPath, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      processDirectory(filePath);
    } else if (file.match(/\.(ts|tsx|js|jsx)$/)) {
      processFile(filePath);
    }
  }
}

// Start processing from src directory
const srcPath = path.join(__dirname, 'src');
console.log('🚀 Starting remaining API URL fixes...');
console.log(`📁 Processing directory: ${srcPath}`);

if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
  console.log('✨ Remaining API URL fixes completed!');
} else {
  console.error('❌ src directory not found!');
}
