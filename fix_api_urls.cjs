const fs = require('fs');
const path = require('path');

// Fix incorrect API URL replacements
const fixes = [
  // Remove quotes around buildApiUrl calls
  { 
    pattern: /"buildApiUrl\(([^)]+)\)"/g, 
    replacement: 'buildApiUrl($1)' 
  },
  // Fix specific broken patterns
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.VOUCHER\.GET_VOUCHER\)Active"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.GET_VOUCHER_ACTIVE)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_VOUCHER\)ByCode/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_VOUCHER_BY_CODE' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.UP\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.UP),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.USED\)\?code=/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.USED)?code=' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.VOUCHER\.LAY_GIA_SAU_GIAM\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.LAY_GIA_SAU_GIAM),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_USER\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_USER),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.UPDATE\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.UPDATE),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_ALL_USER\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_ALL_USER),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_QUANTITY_TICKET\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_QUANTITY_TICKET),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_DOANHTHU_TICKET\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_DOANHTHU_TICKET),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_MEMBER_SHIP\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_MEMBER_SHIP),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_MOVIE_BY_USER_ID\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_MOVIE_BY_USER_ID),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_QUANTITY_TICKET_BUY_BY_USER_ID\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_QUANTITY_TICKET_BUY_BY_USER_ID),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_POINT_ID\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_POINT_ID),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_RAP_PHIM_YEU_THICH_NHAT\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_RAP_PHIM_YEU_THICH_NHAT),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.MOVIE\.RECOMMEND\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.MOVIE.RECOMMEND)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_TICKETS_DA_XEM\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_TICKETS_DA_XEM),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_TICKETS_SAP_CHIEU\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_TICKETS_SAP_CHIEU),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_MEMBER_SHIP\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_MEMBER_SHIP),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.DELETE_USER_FAVORITE\)\?movieTitle=/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.DELETE_USER_FAVORITE)?movieTitle=' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_FAVOURITE_MOVIE_BY_USER\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_FAVOURITE_MOVIE_BY_USER),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_VOUCHER\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_VOUCHER),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.ARTICLE\.SHOW\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.ARTICLE.SHOW)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.MOVIE\.NOW_PLAYING\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.MOVIE.NOW_PLAYING)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.ADD_SHOW_TIME\)\?movieId=/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.ADD_SHOW_TIME)?movieId=' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.GET_DOANH_THU_RAP\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_DOANH_THU_RAP)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.VOUCHER\.ADD_VOUCHER\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.ADD_VOUCHER),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.VOUCHER\.CHANGE\)\?VoucherCode=/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.CHANGE)?VoucherCode=' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.VOUCHER\.GET_VOUCHER\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.GET_VOUCHER)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.GET_SO_LUONG_VE_BAN\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_SO_LUONG_VE_BAN)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.MOVIE_BOOKING\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.MOVIE_BOOKING)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.GET_SHOW_TIME_BY_ID\)\?movieTitle=/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_SHOW_TIME_BY_ID)?movieTitle=' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.DELETE_SHOW_TIME\)\?movieId=/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.DELETE_SHOW_TIME)?movieId=' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.STORAGE_MOVIE\.SHOW_ALL\)"/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.STORAGE_MOVIE.SHOW_ALL)' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CLIENT\.GET_FAVOURITE_MOVIE_BY_USER\)",/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_FAVOURITE_MOVIE_BY_USER),' 
  },
  { 
    pattern: /"buildApiUrl\(API_CONFIG\.BACKEND\.CINEMA\.GET_DANH_SACH_CHIEU\)\?movieid=/g, 
    replacement: 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_DANH_SACH_CHIEU)?movieid=' 
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
console.log('🚀 Starting API URL fixes...');
console.log(`📁 Processing directory: ${srcPath}`);

if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
  console.log('✨ API URL fixes completed!');
} else {
  console.error('❌ src directory not found!');
}
