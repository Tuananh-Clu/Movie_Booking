import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { type MovieApi } from "../../../types/type";

export const AddPhim = () => {
  const [moviesPlaying, setMoviesPlaying] = useState<MovieApi[]>([]);
  const IMG_PATH = "https://image.tmdb.org/t/p/original";
const slider=useRef<HTMLDivElement>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://backendformoviebooking-1.onrender.com/api/MovieNowPlaying/Show"
        );
        setMoviesPlaying(response.data);
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    };

    fetchData();
  }, []);
  const handleClickRight=()=>{
   if(slider.current){
    slider.current.scrollLeft+=400;
    slider.current.style.scrollBehavior="smooth";
   }
  }
    const handleClickLeft=()=>{
   if(slider.current){
    slider.current.scrollLeft-=400;
      slider.current.style.scrollBehavior="smooth";
   }
  }
  

  return (
    <div className="text-white w-full px-4">
      <h1 className="text-2xl font-bold mb-4">🎥 Phim Đang Chiếu</h1>
      {"//slider//"}
      <div className="flex flex-row gap-2 items-center">
        <i onClick={()=>{handleClickLeft()}} className="fa-solid p-3 cursor-pointer bg-black rounded-full fa-arrow-right fa-flip-horizontal"></i>
        <div ref={slider} className=" flex gap-4 hide-scrollbar max-w-[1350px] overflow-x-hidden pb-2 snap-x snap-mandatory">
          {moviesPlaying
            .filter((item) => item.backdrop_path)
            .map((item, index) => (
              <div
                key={index}
                className="min-w-[200px] snap-start bg-zinc-900 rounded-xl shadow-lg hover:scale-105 transition-transform duration-200"
              >
                <img
                  loading="lazy"
                  className="w-full h-60 object-cover rounded-t-xl"
                  src={IMG_PATH + item.backdrop_path}
                  alt={item.tittle}
                />
                <div className="p-5">
                  <h2 className="text-2xl text-white font-semibold line-clamp-2 text-center">
                    {item.original_title}
                  </h2>
                </div>
              </div>
            ))}
        </div>
        <i onClick={()=>{handleClickRight()}} className="fa-solid p-3 cursor-pointer bg-black rounded-full fa-arrow-right"></i>
      </div>


    </div>
  );
};
