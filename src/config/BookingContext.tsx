import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Movies, SeatProp } from "../types/type";
import axios from "axios";
import { useAuth } from "./AuthContext";
import { buildApiUrl, API_CONFIG } from "./api";

type Booking = {
  movie: Movies;
  seats: SeatProp[];
  times: string[];
  date: string;
};

type BookingContextType = {
  bookingData: Booking | null;
  favoriteMovies: Movies[];
  setBookingData: React.Dispatch<React.SetStateAction<Booking | null>>;
  setFavoriteMovies: React.Dispatch<React.SetStateAction<Movies[]>>;
};

export const BookingContext = createContext<BookingContextType>({
  bookingData: {
    date: "",
    times: [],
    seats: [],
    movie: {
      title: "",
      duration: 0,
      poster: "",
      id: "",
    },
  },
  setBookingData: () => {},
  favoriteMovies: [],
  setFavoriteMovies: () => {},
});

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [favoriteMovies, setFavoriteMovies] = useState<Movies[]>([]);
  const { isSignedIn } = useAuth();
  
  const fetchMovie = async () => {
    if (!isSignedIn) return;
    
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      
      await axios.post(
        buildApiUrl(API_CONFIG.BACKEND.CLIENT.GET_FAVORITE_MOVIES),
        favoriteMovies,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log("Token:", token);
    
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  
  useEffect(() => {
    fetchMovie();
  }, [favoriteMovies, isSignedIn]);
 
  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, favoriteMovies, setFavoriteMovies }}
    >
      {children}
    </BookingContext.Provider>
  );
};
