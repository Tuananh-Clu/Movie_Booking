// API Configuration
export const API_CONFIG = {
  // Base URL for backend API
  BASE_URL: "https://localhost:7083/api",
  
  // Backend endpoints
  BACKEND: {
    // Client endpoints
    CLIENT: {
      ADD_USER: "/Client/AddUser",
      GET_USER: "/Client/GetUser",
      GET_ALL_USER: "/Client/GetAllUser",
      GET_FAVORITE_MOVIES: "/Client/GetFavoriteMovies",
      GET_FAVOURITE_MOVIE_BY_USER: "/Client/GetFavouriteMovieByUser",
      DELETE_USER_FAVORITE: "/Client/DeleteUserFavorite",
      GET_MOVIE_BY_USER_ID: "/Client/GetMovieByUserId",
      GET_QUANTITY_TICKET_BUY_BY_USER_ID: "/Client/GetQuantityTIcketBuyByUserId",
      GET_POINT_ID: "/Client/GetPointId",
      GET_RAP_PHIM_YEU_THICH_NHAT: "/Client/GetRapPhimYeuThichNhat",
      GET_TICKETS_DA_XEM: "/Client/GetTicketsDaXem",
      GET_TICKETS_SAP_CHIEU: "/Client/GetTicketsSapChieu",
      GET_MEMBER_SHIP: "/Client/GetMemberShip",
      GET_VOUCHER: "/Client/GetVoucher",
      GET_VOUCHER_BY_CODE: "/Client/GetVoucherByCode",
      ADD_VOUCHER: "/Client/AddVoucher",
      UP: "/Client/Up",
      USED: "/Client/Used",
      GET_QUANTITY_TICKET: "/Client/GetQuantityTicket",
      GET_DOANHTHU_TICKET: "/Client/GetDoanhthuTicket",
    },
    
    // Cinema endpoints
    CINEMA: {
      DELETE_SHOW_TIME_OLD: "/Cinema/DeleteSHowTimeOld",
      FILTER_MOVIE: "/Cinema/Filter_movie",
      GET_THEATER: "/Cinema/GetTheater",
      GET_INFO_BOOKING_DATA: "/Cinema/GetInfoBookingData",
      GET_THEATER_BY_ID: "/Cinema/GetTheaterById",
      GET_DANH_SACH_CHIEU: "/Cinema/GetDanhSachChieu",
      UPDATE: "/Cinema/Update",
      GET_SEAT: "/Cinema/GetSeat",
      LAY_THONG_TIN_RAP: "/Cinema/LayThongTinRap",
      ADD_SHOW_TIME: "/Cinema/AddShowTime",
      GET_SO_LUONG_VE_BAN: "/Cinema/GetSoLuongVeBan",
      MOVIE_BOOKING: "/Cinema/MovieBooking",
      GET_SHOW_TIME_BY_ID: "/Cinema/GetShowTimeById",
      DELETE_SHOW_TIME: "/Cinema/DeleteShowTime",
      GET_DOANH_THU_RAP: "/Cinema/GetDoanhThuRap",
    },
    
    // Movie endpoints
    MOVIE: {
      NOW_PLAYING: "/MovieNowPlaying/Show",
      UPCOMING: "/MovieUpcoming/Show",
      RECOMMEND: "/MovieNowPlaying/Recommend",
    },
    
    // Storage Movie endpoints
    STORAGE_MOVIE: {
      SHOW_ALL: "/StorageMovie/ShowAll",
    },
    
    // Article endpoints
    ARTICLE: {
      SHOW: "/Article/Show",
    },
    
    // Voucher endpoints
    VOUCHER: {
      ADD_VOUCHER: "/Voucher/AddVoucher",
      GET_VOUCHER: "/Voucher/GetVoucher",
      GET_VOUCHER_ACTIVE: "/Voucher/GetVoucherActive",
      CHANGE: "/Voucher/Change",
      LAY_GIA_SAU_GIAM: "/Voucher/LayGiaSauGiam",
    },
  },
  
  // External APIs (keep as is)
  EXTERNAL: {
    TMDB: {
      BASE_URL: "https://api.themoviedb.org/3",
      IMAGE_BASE_URL: "https://image.tmdb.org",
      API_KEY: "f0ab50cc5acff8fa95bb6bda373e8aa9",
    },
  },
};

// Helper function to build full API URL
export const buildApiUrl = (endpoint: string): string => {
  return `${API_CONFIG.BASE_URL}${endpoint}`;
};

// Helper function to build TMDB API URL
export const buildTmdbUrl = (endpoint: string): string => {
  return `${API_CONFIG.EXTERNAL.TMDB.BASE_URL}${endpoint}`;
};
