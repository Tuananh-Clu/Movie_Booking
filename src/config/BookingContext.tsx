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
  tokens: string;
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
  tokens: "",
});


export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<Booking | null>(null);
  const [favoriteMovies, setFavoriteMovies] = useState<Movies[]>([]);
  const [tokens,setTokens]=useState<string>("");
   const { getToken } = useAuth();
   const fetchMovie = async () => {
    try {
      const tokensa = await getToken();
      setTokens(tokensa ?? "");
      const response = await axios.post(
        "https://backendformoviebooking-production.up.railway.app/api/Client/GetFavoriteMovies",
        favoriteMovies,
        {
          headers: {
            authorization: `Bearer ${tokens}`,
            "Content-Type": "application/json"
          },
        }
      );
      console.log(tokens);
      console.log("Movies fetched successfully:", response.data);
      console.log("Favorite movies:", favoriteMovies);

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  useEffect(()=>{
    fetchMovie();
  },[favoriteMovies])
 
  return (
    <BookingContext.Provider
      value={{ bookingData, setBookingData, favoriteMovies, setFavoriteMovies,tokens }}
    >
      {children}
    </BookingContext.Provider>
  );
};
