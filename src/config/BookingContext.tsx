import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Movies, SeatProp } from "../types/type";
import axios from "axios";
import { useAuth} from "@clerk/clerk-react";

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
   const { getToken } = useAuth();
   const fetchMovie = async () => {
   
    try {
      const token = await getToken();
       await axios.post(
        "https://backendformoviebooking-production.up.railway.app/api/Client/GetFavoriteMovies",
        favoriteMovies,
        {
          headers: {
            Authorization: `Bearer ${token}`,
           "Content-Type":"application/json"
          },
        }
      );
      console.log(token);
    
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(()=>{
      fetchMovie();
  },[favoriteMovies]);
 
  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, favoriteMovies, setFavoriteMovies }}
    >
      {children}
    </BookingContext.Provider>
  );
};
