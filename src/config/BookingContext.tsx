import React, { createContext, useState ,type ReactNode } from "react";
import type { Movies, SeatProp} from "../types/type";


type Booking = {
  movie: Movies;
  seats: SeatProp[];
  times: string[];
  date: string;
};

type BookingContextType = {
  bookingData: Booking | null;
  setBookingData: React.Dispatch<React.SetStateAction<Booking|null>>;
};


export const BookingContext = createContext<BookingContextType>({
  bookingData:{date:"",times:[],seats:[],movie:{
    title:"",
    duration:0,
    poster:"",
    id:""  
  }},
  setBookingData:()=>{}
});


export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<Booking | null>(null);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
