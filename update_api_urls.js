const fs = require('fs');
const path = require('path');

// API URL mappings
const apiMappings = {
  // Client endpoints
  'https://backendformoviebooking-production.up.railway.app/api/Client/AddUser': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.ADD_USER)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetUser': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_USER)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetAllUser': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_ALL_USER)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetFavoriteMovies': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_FAVORITE_MOVIES)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetFavouriteMovieByUser': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_FAVOURITE_MOVIE_BY_USER)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/DeleteUserFavorite': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.DELETE_USER_FAVORITE)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetMovieByUserId': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_MOVIE_BY_USER_ID)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetQuantityTIcketBuyByUserId': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_QUANTITY_TICKET_BUY_BY_USER_ID)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetPointId': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_POINT_ID)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetRapPhimYeuThichNhat': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_RAP_PHIM_YEU_THICH_NHAT)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetTicketsDaXem': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_TICKETS_DA_XEM)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetTicketsSapChieu': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_TICKETS_SAP_CHIEU)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetMemberShip': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_MEMBER_SHIP)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetVoucher': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_VOUCHER)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetVoucherByCode': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_VOUCHER_BY_CODE)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/AddVoucher': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.ADD_VOUCHER)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/Up': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.UP)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/Used': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.USED)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetQuantityTicket': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_QUANTITY_TICKET)',
  'https://backendformoviebooking-production.up.railway.app/api/Client/GetDoanhthuTicket': 'buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_DOANHTHU_TICKET)',
  
  // Cinema endpoints
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/DeleteSHowTimeOld': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.DELETE_SHOW_TIME_OLD)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/Filter_movie': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.FILTER_MOVIE)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetTheater': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_THEATER)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetInfoBookingData': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_INFO_BOOKING_DATA)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetTheaterById': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_THEATER_BY_ID)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetDanhSachChieu': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_DANH_SACH_CHIEU)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/Update': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.UPDATE)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetSeat': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_SEAT)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/LayThongTinRap': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.LAY_THONG_TIN_RAP)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/AddShowTime': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.ADD_SHOW_TIME)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetSoLuongVeBan': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_SO_LUONG_VE_BAN)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/MovieBooking': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.MOVIE_BOOKING)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetShowTimeById': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_SHOW_TIME_BY_ID)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/DeleteShowTime': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.DELETE_SHOW_TIME)',
  'https://backendformoviebooking-production.up.railway.app/api/Cinema/GetDoanhThuRap': 'buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_DOANH_THU_RAP)',
  
  // Movie endpoints
  'https://backendformoviebooking-production.up.railway.app/api/MovieNowPlaying/Show': 'buildApiUrl(API_CONFIG.BACKEND.MOVIE.NOW_PLAYING)',
  'https://backendformoviebooking-production.up.railway.app/api/MovieUpcoming/Show': 'buildApiUrl(API_CONFIG.BACKEND.MOVIE.UPCOMING)',
  'https://backendformoviebooking-production.up.railway.app/api/MovieNowPlaying/Recommend': 'buildApiUrl(API_CONFIG.BACKEND.MOVIE.RECOMMEND)',
  
  // Storage Movie endpoints
  'https://backendformoviebooking-production.up.railway.app/api/StorageMovie/ShowAll': 'buildApiUrl(API_CONFIG.BACKEND.STORAGE_MOVIE.SHOW_ALL)',
  
  // Article endpoints
  'https://backendformoviebooking-production.up.railway.app/api/Article/Show': 'buildApiUrl(API_CONFIG.BACKEND.ARTICLE.SHOW)',
  
  // Voucher endpoints
  'https://backendformoviebooking-production.up.railway.app/api/Voucher/AddVoucher': 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.ADD_VOUCHER)',
  'https://backendformoviebooking-production.up.railway.app/api/Voucher/GetVoucher': 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.GET_VOUCHER)',
  'https://backendformoviebooking-production.up.railway.app/api/Voucher/GetVoucherActive': 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.GET_VOUCHER_ACTIVE)',
  'https://backendformoviebooking-production.up.railway.app/api/Voucher/Change': 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.CHANGE)',
  'https://backendformoviebooking-production.up.railway.app/api/Voucher/LayGiaSauGiam': 'buildApiUrl(API_CONFIG.BACKEND.VOUCHER.LAY_GIA_SAU_GIAM)',
};

// Function to add import statement if not present
function addImportIfNeeded(content, filePath) {
  const importStatement = "import { buildApiUrl, API_CONFIG } from \"../config/api\";";
  const relativeImportStatement = "import { buildApiUrl, API_CONFIG } from \"../../config/api\";";
  
  if (content.includes('buildApiUrl') || content.includes('API_CONFIG')) {
    return content; // Already has the import
  }
  
  // Check if it's a component file (in components folder)
  if (filePath.includes('/components/')) {
    // Count how many levels up we need to go
    const levels = filePath.split('/').filter(part => part === 'components').length;
    const relativePath = '../'.repeat(levels) + 'config/api';
    const newImportStatement = `import { buildApiUrl, API_CONFIG } from "${relativePath}";`;
    
    // Add import after the first import statement
    const lines = content.split('\n');
    let importIndex = -1;
    
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].trim().startsWith('import ')) {
        importIndex = i;
        break;
      }
    }
    
    if (importIndex !== -1) {
      lines.splice(importIndex + 1, 0, newImportStatement);
      return lines.join('\n');
    }
  }
  
  return content;
}

// Function to process a single file
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;
    
    // Add import if needed
    const contentWithImport = addImportIfNeeded(content, filePath);
    if (contentWithImport !== content) {
      content = contentWithImport;
      hasChanges = true;
    }
    
    // Replace API URLs
    for (const [oldUrl, newUrl] of Object.entries(apiMappings)) {
      if (content.includes(oldUrl)) {
        content = content.replace(new RegExp(oldUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newUrl);
        hasChanges = true;
      }
    }
    
    // Write back to file if changes were made
    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
    } else {
      console.log(`⏭️  No changes: ${filePath}`);
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
console.log('🚀 Starting API URL replacement...');
console.log(`📁 Processing directory: ${srcPath}`);

if (fs.existsSync(srcPath)) {
  processDirectory(srcPath);
  console.log('✨ API URL replacement completed!');
} else {
  console.error('❌ src directory not found!');
}
