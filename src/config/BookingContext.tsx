import React, { createContext, useState ,type ReactNode } from "react";


type Booking = {
  movieId: string;
  seats: string[];
  time: string;
  date: string;
};

type BookingContextType = {
  bookingData: Booking | null;
  setBookingData: React.Dispatch<React.SetStateAction<Booking | null>>;
};


const BookingContext = createContext<BookingContextType | undefined>(undefined);


export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [bookingData, setBookingData] = useState<Booking | null>(null);

  return (
    <BookingContext.Provider value={{ bookingData, setBookingData }}>
      {children}
    </BookingContext.Provider>
  );
};
