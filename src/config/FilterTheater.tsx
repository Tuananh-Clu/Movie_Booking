import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import axios from "axios";
import type {  Cinema, TheaterFullTypeFill } from "../types/type";


interface Filter {
  name: string; 
  location: string;
}

interface FilterContextType {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filteredSearch: any[];
  allCinemas: Cinema[];

  Filters:()=>void
}


export const FilterContext = createContext<FilterContextType>({
  filter: { name: "", location: "" },
  setFilter: () => {},
  filteredSearch: [],
  allCinemas: [],
  Filters:()=>{}
});


export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>({ name: "", location: "" });
    const [allCinemas, setAllCinemas] = useState<Cinema[]>([]);
    const [filterTheater, setFilterTheater] = useState<TheaterFullTypeFill[]>([]);
  const [filteredSearch, setFilteredSearch] = useState<TheaterFullTypeFill[]>(filterTheater);
  const Filters=async()=>{
    try{
      var response=await axios.post(`https://backendformoviebooking-1.onrender.com/api/Cinema/Filter_movie?movie=${filter.name}`,allCinemas)
      setFilteredSearch(response.data);
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    if(filter.name){
         Filters() 
    }
    setFilteredSearch(filterTheater);

  },[])

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get<TheaterFullTypeFill[]>("https://backendformoviebooking-1.onrender.com/api/Cinema/GetTheater");
        setFilterTheater(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
;
      }
    };

    fetchCinemas();

  }, []);
  
  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get<Cinema[]>("https://backendformoviebooking-1.onrender.com/api/Cinema");
        setAllCinemas(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
      }
    };

    fetchCinemas();

  }, []);


  return (
    <FilterContext.Provider value={{ filter, setFilter, filteredSearch,Filters,allCinemas }}>
      {children}
    </FilterContext.Provider>
  );
};
