import type React from "react";
import Theaterlist from "../../assets/asd_showtimes_rich_poster_fixed.json";
import { useContext, useState } from "react";
import { FilterContext } from "../../config/FilterTheater";

export interface MenuProps {
  setState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Menu:React.FC<MenuProps> = ({ setState }) => {
  const [searchBar, setSearchBar] = useState("");
  const data=Theaterlist as any[];
  const {setFilter}=useContext(FilterContext);
  const uniqueCities = [...new Set(data.map((item) => item.city))];
  const filterSearch = uniqueCities.filter((item) =>
    item.toLowerCase().includes(searchBar.toLowerCase())
  );
const handleClick=(item:string)=>{
  setState(false);
  setFilter({name:item,location:""})
}

  return (
    <>
      <div className="fixed inset-0 w-full bg-black/50 backdrop-blur-sm z-10"></div>
      <div className="fixed top-1/2 left-1/2 z-1000 transform -translate-x-1/2 -translate-y-1/2 p-4 rounded-xl shadow-lg w-[400px] text-white bg-white/5 backdrop-blur ring-1 ring-white/10">
        <i
          onClick={() => {
            setState(false);
          }}
          className="fa-solid fa-x w-full flex items-end justify-end mb-5 cursor-pointer"
        ></i>
        <div className="flex items-center gap-2 mb-4 rounded px-3 py-2 bg-white/5 ring-1 ring-white/10">
          <input
            onChange={(e) => {
              setSearchBar(e.target.value);
            }}
            value={searchBar}
            type="text"
            placeholder="Tìm rạp phim..."
            className="flex-1 outline-none bg-transparent text-white placeholder-gray-300"
          />
          <i className="fa-solid fa-magnifying-glass text-gray-300"></i>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filterSearch.map((item, index) => (
            <div
            onClick={()=>{handleClick(item)}}
              key={index}
              className="p-3 rounded cursor-pointer bg-white/5 ring-1 ring-white/10 hover:bg-white/10"
            >
              <h1 className="text-lg font-semibold">{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
