import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type { BookingType,TheaterFullTypeFill } from "../types/type";
import { buildApiUrl, API_CONFIG } from "./api";

interface Filter {
  name: string; 
  location: string;
}

interface FilterContextType {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filteredSearch: TheaterFullTypeFill[]; // Fixed type consistency
  allCinemas: BookingType[];
  Filters: () => void;
}

export const FilterContext = createContext<FilterContextType>({
  filter: { name: "", location: "" },
  setFilter: () => {},
  filteredSearch: [],
  allCinemas: [],
  Filters: () => {}
});

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>({ name: "", location: "" });
  const [allCinemas, setAllCinemas] = useState<BookingType[]>([]);
  const [filterTheater, setFilterTheater] = useState<TheaterFullTypeFill[]>([]);
  const [filteredSearch, setFilteredSearch] = useState<TheaterFullTypeFill[]>([]);

  const Filters = async () => {
    try {
      const response = await axios.post(`${buildApiUrl(API_CONFIG.BACKEND.CINEMA.FILTER_MOVIE)}?movie=${filter.name}`, filterTheater);
      setFilteredSearch(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (filter.name) {
      Filters();
    } else {
      setFilteredSearch(filterTheater);
    }
  }, ); 

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get<TheaterFullTypeFill[]>(buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_THEATER));
        setFilterTheater(response.data);
        setFilteredSearch(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
      }
    };

    fetchCinemas();
  }, []);
  
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get<BookingType[]>(buildApiUrl(API_CONFIG.BACKEND.CINEMA.GET_INFO_BOOKING_DATA));
        setAllCinemas(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
      }
    };

    fetchCinemas();
  }, []);

  return (
    <FilterContext.Provider value={{ filter, setFilter, filteredSearch, Filters, allCinemas }}>
      {children}
    </FilterContext.Provider>
  );
};