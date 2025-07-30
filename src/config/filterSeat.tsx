
import { createContext, useState } from "react";
import type { ReactNode } from "react";

export type Seat = {
  isSelected: boolean;
  id: string;             // ID ghế (A1, B2...)
  time: string;           // Suất chiếu
  roomId?: string;        // ID phòng
  movieTitle?: string;    // Tên phim
  date?: string; 
  price:number,               // Giá vé
  quantity:number; 
  image?: string;   
  seatType:string,
  Location:string,
  city:string      // Hình ảnh ghế     
};
export type Store={
 isSelected: boolean;
  id: string;             // ID ghế (A1, B2...)
  time: string;           // Suất chiếu
  roomId?: string;        // ID phòng
  movieTitle?: string;    // Tên phim
  date?: string; 
  price:number,               // Giá vé
  quantity:number; 
  image?: string;   
  seatType:string,
  Location:string,
  city:string
}

export type SeatsContextType = {
  seat: Seat[]; 
  store:Seat[][]
  setSeat: React.Dispatch<React.SetStateAction<Seat[]>>;
  setStore:React.Dispatch<React.SetStateAction<Seat[][]>>;
};


export const SeatsContext = createContext<SeatsContextType>({
  store:[],
  seat: [],
  setSeat: () => {},
  setStore:()=>{},
});

export const SeatsProvider = ({ children }: { children: ReactNode }) => {
  const [seat, setSeat] = useState<Seat[]>([]);
  const [store,setStore]=useState<Seat[][]>([]);

  return (
    <SeatsContext.Provider value={{ seat, setSeat,setStore,store }}>
      {children}
    </SeatsContext.Provider>
  );
};
