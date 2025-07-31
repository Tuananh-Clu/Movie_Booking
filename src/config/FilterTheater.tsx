import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import Theaterlist from "../assets/asd_showtimes_rich_poster_fixed.json";
import axios from "axios";


interface Filter {
  name: string; // city
  location: string;
}

interface FilterContextType {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filteredSearch: any[];
  Filters:()=>void
}


export const FilterContext = createContext<FilterContextType>({
  filter: { name: "", location: "" },
  setFilter: () => {},
  filteredSearch: [],
  Filters:()=>{}
});


export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [filter, setFilter] = useState<Filter>({ name: "", location: "" });
  const [allCinemas, setAllCinemas] = useState<any[]>(Theaterlist);
  const [filteredSearch, setFilteredSearch] = useState<any[]>(Theaterlist);
  const Filters=async()=>{
    try{
      var response=await axios.post(`https://backendformoviebooking-1.onrender.com/api/Cinema/Filter_movie?movie=${filter.name}`,allCinemas)
      setFilteredSearch(response.data);
    }
    catch(error){
      console.log(error);
      setFilteredSearch(allCinemas)
    }
  }
  useEffect(()=>{
    if(filter.name){
         Filters() 
    }
    setFilteredSearch(allCinemas)

  },[])

  useEffect(() => {
    const fetchCinemas = async () => {
      try {
        const response = await axios.get("https://backendformoviebooking-1.onrender.com/api/Cinema");
        setAllCinemas(response.data);
        setFilteredSearch(response.data);
      } catch (error) {
        console.error("Lỗi khi fetch dữ liệu Cinema:", error);
        setAllCinemas(Theaterlist);
        setFilteredSearch(Theaterlist);
      }
    };

    fetchCinemas();

  }, []);

  return (
    <FilterContext.Provider value={{ filter, setFilter, filteredSearch,Filters }}>
      {children}
    </FilterContext.Provider>
  );
};
