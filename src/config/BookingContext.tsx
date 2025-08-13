import React, {
  createContext,
 
  useState,
  type ReactNode,
} from "react";
import type { MovieApi, Movies, SeatProp } from "../types/type";


type Booking = {
  movie: Movies;
  seats: SeatProp[];
  times: string[];
  date: string;
};

type BookingContextType = {
  bookingData: Booking | null;
  favoriteMovies: MovieApi[];
  setBookingData: React.Dispatch<React.SetStateAction<Booking | null>>;
  setFavoriteMovies: React.Dispatch<React.SetStateAction<MovieApi[]>>;
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
  const [favoriteMovies, setFavoriteMovies] = useState<MovieApi[]>([]);
 
  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, favoriteMovies, setFavoriteMovies }}
    >
      {children}
    </BookingContext.Provider>
  );
};
