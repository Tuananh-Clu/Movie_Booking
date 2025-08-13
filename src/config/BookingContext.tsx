import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { MovieApi, Movies, SeatProp } from "../types/type";
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
const { getToken } = useAuth();
const token = await getToken();

export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [favoriteMovies, setFavoriteMovies] = useState<MovieApi[]>([]);
  const fetchMovie = async () => {
    try {
      const response = await axios.post(
        "https://backendformoviebooking-production.up.railway.app/api/Client/GetFavoriteMovies",
        favoriteMovies,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Movies fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(() => {
    fetchMovie();
  });

  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, favoriteMovies, setFavoriteMovies }}
    >
      {children}
    </BookingContext.Provider>
  );
};
