# API URL Migration Guide

## Tổng quan
Dự án đã được cập nhật để sử dụng cấu hình API tập trung thay vì hardcode các URL API backend.

## Thay đổi chính

### 1. File cấu hình API mới
- **File**: `src/config/api.ts`
- **Chức năng**: Chứa tất cả các endpoint API và cấu hình base URL

### 2. Base URL mới
- **Trước**: `https://backendformoviebooking-production.up.railway.app/api`
- **Sau**: `http://localhost:5000/api`

### 3. Cách sử dụng mới
```typescript
import { buildApiUrl, API_CONFIG } from "../config/api";

// Thay vì:
// axios.get("https://backendformoviebooking-production.up.railway.app/api/Client/GetUser")

// Sử dụng:
axios.get(buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_USER))
```

## Cấu trúc API_CONFIG

### Client Endpoints
```typescript
API_CONFIG.BACKEND.CLIENT = {
  ADD_USER: "/Client/AddUser",
  GET_USER: "/Client/GetUser",
  GET_ALL_USER: "/Client/GetAllUser",
  // ... và nhiều endpoint khác
}
```

### Cinema Endpoints
```typescript
API_CONFIG.BACKEND.CINEMA = {
  GET_THEATER: "/Cinema/GetTheater",
  GET_THEATER_BY_ID: "/Cinema/GetTheaterById",
  // ... và nhiều endpoint khác
}
```

### Movie Endpoints
```typescript
API_CONFIG.BACKEND.MOVIE = {
  NOW_PLAYING: "/MovieNowPlaying/Show",
  UPCOMING: "/MovieUpcoming/Show",
  RECOMMEND: "/MovieNowPlaying/Recommend"
}
```

## Lợi ích

1. **Dễ bảo trì**: Chỉ cần thay đổi base URL ở một nơi
2. **Nhất quán**: Tất cả API calls sử dụng cùng một cấu trúc
3. **Linh hoạt**: Dễ dàng chuyển đổi giữa môi trường dev, staging, production
4. **Type safety**: TypeScript hỗ trợ autocomplete cho các endpoint

## Thay đổi môi trường

Để thay đổi từ local sang production, chỉ cần sửa file `src/config/api.ts`:

```typescript
// Local development
BASE_URL: "http://localhost:5000/api"

// Production
BASE_URL: "https://backendformoviebooking-production.up.railway.app/api"

// Staging
BASE_URL: "https://your-staging-url.com/api"
```

## Các file đã được cập nhật

- ✅ `src/App.tsx`
- ✅ `src/config/FilterTheater.tsx`
- ✅ `src/config/BookingContext.tsx`
- ✅ `src/components/Navbar Components/Search.tsx`
- ✅ `src/Pages/InfoTheater.tsx`
- ✅ `src/Pages/Home.tsx`
- ✅ `src/Pages/KhoVoucher.tsx`
- ✅ Và nhiều file khác...

## Lưu ý

1. **Import statement**: Đảm bảo mỗi file sử dụng API mới đều có import statement:
   ```typescript
   import { buildApiUrl, API_CONFIG } from "../config/api";
   ```

2. **Relative path**: Điều chỉnh đường dẫn import tùy theo vị trí file:
   - File trong `src/Pages/`: `../config/api`
   - File trong `src/components/`: `../../config/api`
   - File trong `src/components/Profile/Admin/`: `../../../config/api`

3. **External APIs**: Các API bên ngoài (như TMDB) vẫn giữ nguyên URL gốc

## Kiểm tra

Để kiểm tra xem tất cả URL đã được thay thế thành công:

```bash
# Tìm kiếm URL cũ
grep -r "backendformoviebooking-production.up.railway.app" src/

# Tìm kiếm API calls mới
grep -r "buildApiUrl(API_CONFIG" src/
```

## Hỗ trợ

Nếu gặp vấn đề hoặc cần thêm endpoint mới, hãy cập nhật file `src/config/api.ts` và sử dụng pattern đã có sẵn.
