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
      <div className="fixed top-1/2 left-1/2 z-1000 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-xl shadow-lg w-[400px]">
        <i
          onClick={() => {
            setState(false);
          }}
          className="fa-solid fa-x w-full flex items-end justify-end mb-5 cursor-pointer"
        ></i>
        <div className="flex items-center gap-2 mb-4 border border-gray-300 rounded px-3 py-2">
          <input
            onChange={(e) => {
              setSearchBar(e.target.value);
            }}
            value={searchBar}
            type="text"
            placeholder="Tìm rạp phim..."
            className="flex-1 outline-none"
          />
          <i className="fa-solid fa-magnifying-glass text-gray-500"></i>
        </div>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filterSearch.map((item, index) => (
            <div
            onClick={()=>{handleClick(item)}}
              key={index}
              className="p-3 border rounded hover:bg-gray-100 cursor-pointer"
            >
              <h1 className="text-lg font-semibold">{item}</h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
