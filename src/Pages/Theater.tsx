import { Navbar } from "../components/Navbar";
import { TheaterCard } from "../components/Theater Components/TheaterCard";
import { useContext, useEffect, useState } from "react";
import { Menu } from "../components/Theater Components/menu";
import { FilterContext } from "../config/FilterTheater";
import { useNavigate } from "react-router";

export const Theater = () => {
  const navigate = useNavigate();
  const [PopupMenu, setPopupMenu] = useState(false);
  const { filteredSearch, filter, setFilter,Filters } = useContext(FilterContext);
  const setDefaultLocation = () => {
    setFilter({ name: "", location: "" });
  };
  useEffect(() => {
    console.log(PopupMenu);
    Filters();
  });
  return (
    <div className=" w-full flex    z-0 bg-gradient-to-br from-cyan-200 via-neutral-200 to-pink-300">
      <Navbar />
      <div className=" w-full ">
        <div className=" pt-40 h-full w-full md:px-20 px-10  flex flex-col  items-center justify-between">
        <div className="flex md:flex-row flex-col  w-full justify-between">
          <h1 className="text-2xl font-bold text-white">
            Danh Sách Các Rạp Phim Trên Toàn Quốc
          </h1>
          <div className="flex flex-row text-white gap-2">
            <span
              
              className="flex flex-row items-center border gap-3 p-2 border-white rounded-2xl"
            >
              <i onClick={() => {
                setPopupMenu((prev) => !prev);
              }} className="fa-solid fa-location-dot"></i>
              {filter.name.length === 0 ? (
                "Địa Điểm"
              ) : (
                <h1 className="bg-red-400 p-2 rounded-2xl" onClick={()=>{setDefaultLocation()}}>{filter.name}</h1>
              )}
            </span>
          </div>
        </div>

        <div className="  py-10 grid grid-cols-1 md:grid-cols-2 w-full  lg:grid-cols-3 gap-6">
          {filteredSearch.map((item, index) => {
            return (
              <div
                onClick={() => {
                  navigate(`/Theater/${item.id}`);
                }}
                key={index}
              >
                <TheaterCard name={item.name} img={item.image} />
              </div>
            );
          })}
        </div>
        {PopupMenu ? <Menu setState={setPopupMenu} /> : ""}
      </div>
      </div>
      
    </div>
  );
};
